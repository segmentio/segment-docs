---
title: Analytics for Swift Migration Guide
strat: swift
tags:
  - apple
  - swift
  - ios
---

> success ""
> This guide assumes you already have a Source in your Segment workspace. If you are creating a new one you can reference the [Source Overview Guide](/docs/connections/sources/)


If you're using a previous Segment mobile library such as Analytics-iOS, follow these steps to migrate to the Analytics-Swift library. Analytics-Swift is designed to work with your Objective-C codebase as well. 

1. [Import Analytics-Swift](#1-import-analytics-swift)
2. [Upgrade your Destinations](#2-upgrade-your-destinations)
3. [Advanced: Upgrade your Middleware](#3advanced-upgrade-middleware-to-plugins)
4. [Upgrade Notes: Changes to the Config](#4-upgrade-notes-update-your-config-options)

## 1. Import Analytics-Swift

### 1.a) Add the SDK via Swift Package Manager

1. Open your project in Xcode.
2. If using Xcode 12, go to **File > Swift Packages > Add Package Dependency…**. If using Xcode 13, go to **File > Add Packages…**
3. Enter the git path `git@github.com:segmentio/analytics-swift.git` for the Package Repository and click **Next**.
4. Select the version rules for your application and click **Next**.
5. Make sure the Segment Library checkbox is selected.
6. Click **Finish**.

<br> You have now added Analytics-Swift to your project. Segment and Sovran show as Swift package dependencies.You can remove the analytics-iOS SDK from your app.

## 1.b) Modify your initialized instance.

{% codeexample %}
{% codeexampletab Swift%}
```swift
    let configuration = Configuration(writeKey: "YOUR_WRITE_KEY")
    configuration.trackApplicationLifecycleEvents = true
    configuration.flushAt = 3
    configuration.flushInterval = 10
    Analytics.setup(with: configuration)
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


> success ""
> Analytics-Swift supports running multiple instances of the analytics object, so it does not assume a singleton. However, if you’re migrating from Analytics-iOS and all your track calls are routed to the `Analytics.shared()` singleton, you can these calls to your new Analytics-swift object.

With this extension, your existing Segment calls should work with Analytics-Swift. 

```swift
@extension Analytics {
    (SegAnalytics)shared() {
        return analytics; // or whatever variable name you're using
    } 
}
```
## 2. Upgrade your Destinations 

If your app uses Segment to route data to Destinations through Segment-cloud (for example, Cloud-mode destinations), you can skip this step. Analytics-Swift treats Device-mode Destinations as [plugins](/docs/connections/sources/catalog/libraries/mobile/swift/plugin-architecture), and simplifies the process of integrating them into your app. Analytics-Swift supports these [Device-Mode Destinations](/docs/connections/sources/catalog/libraries/mobile/swift/destination-plugins). 

### 2.a) Include Plugin via SPM 

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-<destination>.git",
            from: "1.1.3"
        ),
```
### 2.b) Add Plugin to your Analytics instnace

```
import Segment
import Segment<Destination> // <-- Add this line
```

Under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: <Destination>())
```

Your events will now begin to flow to the added destination in Device-Mode.

## 3.Advanced: Upgrade Middleware to Plugins


Middlewares are a powerful mechanism that can augment events collected by the Analytics iOS (Classic) SDK. A middleware is a simple function that is invoked by the Segment SDK and can be used to monitor, modify, augment or reject events. Analytics Swift replaces the concept of middlewares with Enrichment Plugins to give you even more control over your event data. Refer to the [Plugin Architecture Overview](/docs/connections/sources/catalog/libraries/mobile/swift/plugin-architecture) for more information. 

### 3.a) Upgrading source middleware

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
    class customizeAllTrackCalls: EventPlugin {
        let type: PluginType = .enrichment
        let analytics: Analytics

        public func track(event: TrackEvent) -> TrackEvent? {
            var workingEvent = event
            workingEvent.event = "[New] \(event.event)"
            workingEvent.properties["customAttribute"] = "Hello"
            return workingEvent
        }
    }

    analytics.add(plugin: customizeAllTrackCalls())
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

###  3.b) Upgrading destination middleware
If you don't need to transform all of your Segment calls, and only want to transform the calls going to specific, device-mode destinations, use Destination plugins.

**Before example**
<br>
{% codeexample %}
{% codeexampletab Swift%}

```swift
     // define middleware we'll use for amplitude

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
    class customizeAllTrackCalls: EventPlugin {
        let type: PluginType = .enrichment
        let analytics: Analytics

        public func track(event: TrackEvent) -> TrackEvent? {
            var workingEvent = event
            workingEvent.event = "[New] \(event.event)"
            workingEvent.properties["customAttribute"] = "Hello"
            return workingEvent
        }
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


## 4. Upgrade Notes: Changes to the Configuration Object

Segment changed these config options:

| Before                   | After                             |
| ------------------------ | --------------------------------- |
| `defaultProjectSettings` | Name changed to `defaultSettings` |

Segment added these options:

| Name                        | Details                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoAddSegmentDestination` | The analytics client automatically adds the Segment Destination. Set this to `false` if you want to customize the initialization of the Segment Destination, such as, add destination middleware. |

Segment removed these options:


| Removed Option           | Details                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `enableAdvertisingTracking` | Deprecated                                                                                                  |
| `launchOptions`             | Removed in favor of the enrichment plugin that adds the default data to the event payloads.              |
| `maxQueueSize`              | Deprecated                                                                                                  |
| `recordScreenViews`         | Removed in favor of a plugin that provides the same functionality. Use the `UIKitScreenTracking` plugin. |
| `shouldUseBluetooth`        | Deprecated                                                                                                  |
| `shouldUseLocationServices` | Deprecated                                                                                                  |
| `trackAttributionData`      | This feature no longer exists.                                                                              |
| `trackInAppPurchases`       | Deprecated                                                                                                  |
| `trackPushNotifications`    | Deprecated                                                                                                  |

### Conclusion
Once you’re up and running, you can take advantage of Analytics-Swift’s additional features, such as [Destination Filters](/docs/connections/sources/catalog/libraries/mobile/apple/swift-destination-plugins), [Functions](/docs/connections/functions/), and [Typewriter](/docs/connections/sources/catalog/libraries/mobile/apple/swift-typewriter) support. 