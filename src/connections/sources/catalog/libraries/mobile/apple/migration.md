---
title: Analytics for Swift Migration Guide
strat: swift
---

> info ""
> Analytics Swift supports [these destinations](/docs/connections/sources/catalog/libraries/mobile/apple/destination-plugins) with more to come.

## Getting Started 

If you're using a different mobile library such as Analytics-iOS, follow these steps to migrate to the Analytics-Swift library.

> success ""
> This guide assumes you already have a Source in your Segment workspace. If you are creating a new one you can reference the [Source Overview Guide](/docs/connections/sources/)

> warning ""
> Segment no longer supports installing Analytics-Swift through Cocoapods.


## Add the SDK as a Dependency

1. Open your project in Xcode.
2. If using Xcode 12, go to **File > Swift Packages > Add Package Dependency…**. If using Xcode 13, go to **File > Add Packages…**
3. Enter the git path `git@github.com:segmentio/analytics-swift.git` for the Package Repository and click **Next**.
4. Select the version rules for your application and click **Next**.
5. Make sure the Segment Library checkbox is selected.
6. Click **Finish**.

<br> You have now added Analytics-Swift to your project. Segment and Sovran show as Swift package dependencies.

## Modify your initialized instance.

{% codeexample %}
{% codeexampletab Swift%}
```swift
    let configuration = Configuration(writeKey: "YOUR_WRITE_KEY")
    .configuration.trackApplicationLifecycleEvents = true
    .configuration.flushAt = 3
    .configuration.flushInterval = 10
    
    analytics = Analytics(configuration: configuration)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}

```objc
    SEGConfiguration *config = [[SEGConfiguration alloc] initWithWriteKey:@"<WRITE KEY>"];
    config.trackApplicationLifecycleEvents = YES;
    config.flushAt = 1;
    
    _analytics = [[SEGAnalytics alloc] initWithConfiguration: config];
```
{% endcodeexampletab %}
{% endcodeexample %}

## Convert Middlewares to Plugins

Middlewares are a powerful mechanism that can augment events collected by the Analytics iOS (Classic) SDK. A middleware is a simple function that is invoked by the Segment SDK and can be used to monitor, modify, augment or reject events. Analytics Swift replaces the concept of middlewares with Enrichment Plugins to give you even more control over your event data. Refer to the [Plugin Architecture Overview](/docs/connections/sources/catalog/libraries/mobile/swift/plugin-architecture) for more information. 

### Source middleware

**Before example**
<br>

{% codeexample %}
{% codeexampletab Swift%}
```swift
    let customizeAllTrackCalls = BlockMiddleware { (context, next) in
        if context.eventType == .track {
            next(context.modify { ctx in
                guard let track = ctx.payload as? TrackPayload else {
                    return
                }
                let newEvent = "[New] \(track.event)"
                var newProps = track.properties ?? [:]
                newProps["customAttribute"] = "Hello"
                ctx.payload = TrackPayload(
                    event: newEvent,
                    properties: newProps,
                    context: track.context,
                    integrations: track.integrations
                )
            })
        } else {
            next(context)
        }
    }

    analytics.sourceMiddleware = [customizeAllTrackCalls]
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    SEGBlockMiddleware *customizeAllTrackCalls = [[SEGBlockMiddleware alloc] initWithBlock:^(SEGContext * _Nonnull context, SEGMiddlewareNext  _Nonnull next) {
        if ([context.payload isKindOfClass:[SEGTrackPayload class]]) {
            SEGTrackPayload *track = (SEGTrackPayload *)context.payload;
            next([context modify:^(id<SEGMutableContext> _Nonnull ctx) {
                NSString *newEvent = [NSString stringWithFormat:@"[New] %@", track.event];
                NSMutableDictionary *newProps = (track.properties != nil) ? [track.properties mutableCopy] : [@{} mutableCopy];
                newProps[@"customAttribute"] = @"Hello";
                ctx.payload = [[SEGTrackPayload alloc] initWithEvent:newEvent
                                                      properties:newProps
                                                        context:track.context
                                                    integrations:track.integrations];
        }]);
    } else {
        next(context);
    }
}];
```
{% endcodeexampletab %}
{% endcodeexample %}

**After example**
<br>

{% codeexample %}
{% codeexampletab Swift%}
```swift
    let customizeAllTrackCalls: EnrichmentClosure = { event in
        guard let event = event as? TrackEvent else { return event }
        var workingEvent = event
        workingEvent.event = "[New] \(event.event)"
        workingEvent.properties?[keyPath: "customAttribute"] = "Hello"
        return workingEvent
    }

    analytics.add(plugin: customizeAllTrackCalls())
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    SEGBlockPlugin *customizeAllTrackCalls = [[SEGBlockPlugin alloc] initWithBlock:^id<SEGRawEvent> _Nullable(id<SEGRawEvent> _Nullable event) {
        if ([event isKindOfClass: [SEGTrackEvent class]]) {
            SEGTrackEvent *track = (SEGTrackEvent *)event;
            NSString *newName = [NSString stringWithFormat: @"[New] %@", track.event];
            track.event = newName;
            NSMutableDictionary *newProps = (track.properties != nil) ? [track.properties mutableCopy] : [@{} mutableCopy];
            newProps[@"customAttribute"] = @"Hello";
            track.properties = newProps;
            
            return track;
        }
        return event;
    }];
    
    [self.analytics addPlugin:customizeAllTrackCalls];
```
{% endcodeexampletab %}
{% endcodeexample %}

### Destination middleware
If you don't need to transform all of your Segment calls, and only want to transform the calls going to specific, device-mode destinations, use Destination plugins.

**Before example**
<br>
{% codeexample %}
{% codeexampletab Swift%}

```swift
     // define middleware we'll use for Amplitude

       let customizeAmplitudeTrackCalls = BlockMiddleware { (context, next) in
        if context.eventType == .track {
            next(context.modify { ctx in
                guard let track = ctx.payload as? TrackPayload else {
                    return
                }
                let newEvent = "[Amplitude] \(track.event)"
                var newProps = track.properties ?? [:]
                newProps["customAttribute"] = "Hello"
                ctx.payload = TrackPayload(
                    event: newEvent,
                    properties: newProps,
                    context: track.context,
                    integrations: track.integrations
                )
            })
        } else {
            next(context)
        }
    }

    // configure destination middleware for amplitude

    let amplitude = SEGAmplitudeIntegrationFactory.instance()
    config.use(amplitude)
    config.destinationMiddleware = [DestinationMiddleware(key: amplitude.key(), middleware:[customizeAmplitudeTrackCalls])]
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    // define middleware we'll use for amplitude
    SEGBlockMiddleware *customizeAmplitudeTrackCalls = [[SEGBlockMiddleware alloc] initWithBlock:^(SEGContext * _Nonnull context, SEGMiddlewareNext  _Nonnull next) {
        if ([context.payload isKindOfClass:[SEGTrackPayload class]]) {
            SEGTrackPayload *track = (SEGTrackPayload *)context.payload;
            next([context modify:^(id<SEGMutableContext> _Nonnull ctx) {
                NSString *newEvent = [NSString stringWithFormat:@"[Amplitude] %@", track.event];
                NSMutableDictionary *newProps = (track.properties != nil) ? [track.properties mutableCopy] : [@{} mutableCopy];
                newProps[@"customAttribute"] = @"Hello";
                ctx.payload = [[SEGTrackPayload alloc] initWithEvent:newEvent
                                                      properties:newProps
                                                         context:track.context
                                                    integrations:track.integrations];
            }]);
        } else {
            next(context);
        }
    }];
...
    // configure destination middleware for amplitude
    id<SEGIntegrationFactory> amplitude = [SEGAmplitudeIntegrationFactory instance];
    [config use:amplitude];
    config.destinationMiddleware = [SEGDestinationMiddleware alloc] initWithKey:amplitude.key middleware:@[customizeAmplitudeTrackCalls]];  
```
{% endcodeexampletab %}
{% endcodeexample %}


**After example**
<br>
{% codeexample %}
{% codeexampletab Swift%}

```swift
    let customizeAmplitudeTrackCalls: EnrichmentClosure = { event in
        guard let event = event as? TrackEvent else { return event }
        var workingEvent = event
        workingEvent.event = "[New] \(event.event)"
        workingEvent.properties?[keyPath: "customAttribute"] = "Hello"
        return workingEvent
    }

    // create an instance of the Amplitude plugin

    let amplitudeDestination = AmplitudeDestination()

    // add our enrichment plugin to amplitude

    amplitudeDestination.add(plugin: customizeAmplitudeTrackCalls())

    // add amplitude to analytics instance.

    analytics.add(plugin: amplitudeDestination)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    SEGBlockPlugin *customizeAmplitudeTrackCalls = [[SEGBlockPlugin alloc] initWithBlock:^id<SEGRawEvent> _Nullable(id<SEGRawEvent> _Nullable event) {
        if ([event isKindOfClass: [SEGTrackEvent class]]) {
            SEGTrackEvent *track = (SEGTrackEvent *)event;
            NSString *newName = [NSString stringWithFormat: @"[New] %@", track.event];
            track.event = newName;
            NSMutableDictionary *newProps = (track.properties != nil) ? [track.properties mutableCopy] : [@{} mutableCopy];
            newProps[@"customAttribute"] = @"Hello";
            track.properties = newProps;
            
            return track;
        }
        return event;
    }];
    
    [self.analytics addPlugin:customizeAmplitudeTrackCalls destinationKey:@"Amplitude"];
```
{% endcodeexampletab %}
{% endcodeexample %}


### Update your config options 

Segment changed these config options:

| Before                   | After                             |
| ------------------------ | --------------------------------- |
| `defaultProjectSettings` | Name changed to `defaultSettings` |

Segment added these options:

| Name                        | Details                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoAddSegmentDestination` | The analytics client automatically adds the Segment Destination. Set this to `false` if you want to customize the initialization of the Segment Destination, such as, add destination middleware. |
| `apiHost` | Sets an alternative API host. This is useful when a proxy is in use or when events need to be routed to certain locales (such as the EU). |
| `cdnHost`| Sets an alternative CDN host for settings retrieval. This is useful when a proxy is in use or when settings need to be queried from certain locales (such as the EU). |
| `requestFactory` | Sets a block to be used when generating outgoing HTTP requests. Useful in proxying, or adding additional header information for outbound traffic. |
| `errorHandler` | Sets an error handler to be called when errors are encountered by the Segment library.  See [AnalyticsError](https://github.com/segmentio/analytics-swift/blob/c7e3c1c31a5a281e94116852ef59e8221837dbb6/Sources/Segment/Errors.swift) for a list of possible error messages. |
| `flushPolicies` | Add more granular control for how and when to flush events. |

Segment removed these options:


| Deprecated Option           | Details                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `enableAdvertisingTracking` | Removed                                                                                                     |
| `launchOptions`             | Removed in favor of the enrichment plugin that adds the default data to the event payloads.              |
| `maxQueueSize`              | Removed                                                                                                     |
| `recordScreenViews`         | Removed in favor of a plugin that provides the same functionality. Use the [UIKitScreenTracking plugin](https://github.com/segmentio/analytics-swift/blob/main/Examples/other_plugins/UIKitScreenTracking.swift). |
| `shouldUseBluetooth`        | Removed                                                                                                     |
| `shouldUseLocationServices` | Removed                                                                                                     |
| `trackAttributionData`      | Removed                                                                                                     |
| `trackInAppPurchases`       | Removed                                                                                                     |
| `trackPushNotifications`    | Removed in favor of a plugin the provides the same functionality. Use the [Notification Tracking plugin](https://github.com/segmentio/analytics-swift/blob/main/Examples/other_plugins/NotificationTracking.swift).                                                                                            |

### Add destination plugins

> warning ""
> You should remove all of your Analytics iOS (Classic) device-mode destinations as they are not compatible with Analytics Swift

Segment previously used Factories to initialize destinations. With Analytics Swift, Segment treats destinations similar to plugins and simplifies the process in adding them. Refer to the [Plugin Architecture Overview](/docs/connections/sources/catalog/libraries/mobile/swift/plugin-architecture) for more information. 

**Before example**
<br> 
{% codeexample %}
{% codeexampletab Swift%}

```swift
    analyticsConfig.use(FooIntegrationFactory.instance()
    let analytics = Analytics.setup(with: analyticsConfig)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    SEGConfiguration *config = [[SEGConfiguration alloc] initWithWriteKey:@"<WRITE KEY>"];
   
    _analytics = [[SEGAnalytics alloc] initWithConfiguration: config];
```
{% endcodeexampletab %}
{% endcodeexample %}

**After example**
<br> 
{% codeexample %}
{% codeexampletab Swift%}

```swift  
    let destination = /* initialize your desired destination */
    analytics.add(plugin: destination)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    SEGTestDestination *destination = [[SEGDestination alloc] init];
    [self.analytics addPlugin:destination];
```
{% endcodeexampletab %}
{% endcodeexample %}
## Modify your tracking methods 

### Identify

**Before example**
<br> 
{% codeexample %}
{% codeexampletab Swift%}

```swift  
    Analytics.shared().identify("a user's id", traits: ["email": "sloth@segment.com"], options: ["anonymousId" : "test_anonymousId"]);
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    [[SEGAnalytics sharedAnalytics] identify:@"a user's id"
                            traits:@{ @"email": @"sloth@segment.com" }];
```
{% endcodeexampletab %}
{% endcodeexample %}
**After example**
<br> 

{% codeexample %}
{% codeexampletab Swift%}

```swift  
    // The newer APIs promote the use of strongly typed structures to keep codebases legible

    struct UserTraits(
     let email: String
    )


    analytics.identify("a user's id", UserTraits(email:"sloth@segment.com"))

    // or, if you prefer not to use strongly typed structures

    analytics.identify("a user's id", ["email": "sloth@segment.com"])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}

```objc
    [self.analytics identify:@"testTraits" traits:@{@"email": @"sloth@segment.com"}];
```
{% endcodeexampletab %}
{% endcodeexample %}
### Track

**Before example**
<br> 

{% codeexample %}
{% codeexampletab Swift%}

```swift  
    Analytics.shared().track("Item Purchased", properties: ["item": "Sword of Heracles", "revenue": 2.95])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    [[SEGAnalytics sharedAnalytics] track:@"Item Purchased"
                        properties:@{ @"item": @"Sword of Heracles", @"revenue": @2.95 }];

```
{% endcodeexampletab %}
{% endcodeexample %}

**After example**
<br> 

{% codeexample %}
{% codeexampletab Swift%}

```swift  
    // The newer APIs promote the use of strongly typed structures to keep codebases legible

    struct TrackProperties(
        let item: String,
        let revenue: Double
    )

    analytics.track(name: "Item Purchased", properties: TrackProperties(item: "Sword of Heracles", revenue: 2.95))

    // or, if you prefer not to use strongly typed structures

    analytics.track("Item Purchased", ["item": "Sword of Heracles", revenue: 2.95])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    [self.analytics track:@"Item Purchased"
                        properties:@{ @"item": @"Sword of Hercules", @"revenue": 2.95 }];
```
{% endcodeexampletab %}
{% endcodeexample %}
### Group

**Before example**
<br> 

{% codeexample %}
{% codeexampletab Swift%}

```swift  
    Analytics.shared().group("group123", traits: ["name": "Initech", "description": "Accounting Software"])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    [[SEGAnalytics sharedAnalytics] group:@"group123"
                                traits:@{ @"name": @"Initech", @"description": @"Accounting Software" }];

```
{% endcodeexampletab %}
{% endcodeexample %}

**After example**
<br> 

{% codeexample %}
{% codeexampletab Swift%}

```swift  
    // The newer APIs promote the use of strongly typed structures to keep codebases legible

    struct GroupTraits(
        let name: String
        let description: String
    )
        
    analytics.group(groupId: "group123", traits: GroupTraits(name = "Initech", description = "Accounting Software"))

    // or, if you prefer not to use strongly typed structures

    analytics.group("group123", ["name": "Initech", description: "Accounting Software"])

```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
     [self.analytics group:@"group123" properties:@{@"name": @"Initech", @"description": @"Accounting Software"}];
```
{% endcodeexampletab %}
{% endcodeexample %}
### Screen 

**Before example**
<br> 

{% codeexample %}
{% codeexampletab Swift%}

```swift  
    Analytics.shared().screen("Photo Feed", properties: ["feedType": "private"])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] screen:@"Photo Feed"
                            properties:@{ @"feedType": @"private" }];
```
{% endcodeexampletab %}
{% endcodeexample %}

**After example**
<br> 

{% codeexample %}
{% codeexampletab Swift%}

```swift  
    // The newer APIs promote the use of strongly typed structures to keep codebases legible

   struct ScreenProperties(
        feedType: String
    )
        
    analytics.screen(title: "Photo Feed", properties: ScreenProperties("feedType": "private"))

    // or, if you prefer not to use strongly typed structures

    analytics.screen("Photo Feed", ["feedType": "private"])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    [self.analytics screen:@"SomeScreen"
                        properties:@{ @"feedType": @"private" }];
```
{% endcodeexampletab %}
{% endcodeexample %}
### Alias

**Before example**
<br> 
{% codeexample %}
{% codeexampletab Swift%}

```swift  
    [[SEGAnalytics sharedAnalytics] alias:@"some new id"];
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    Analytics.shared().alias("some new id")
```
{% endcodeexampletab %}
{% endcodeexample %}

**After example**
<br> 

{% codeexample %}
{% codeexampletab Swift%}

```swift  
    analytics.alias(newId: "some new id")
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
   [self.analytics alias:@"some new id"];
```
{% endcodeexampletab %}
{% endcodeexample %}
