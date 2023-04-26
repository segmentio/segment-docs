---
title: Analytics for Swift Migration Guide
strat: swift
---

> info ""
> Analytics Swift supports [these destinations](/docs/connections/sources/catalog/libraries/mobile/swift/destination-plugins) with more to come.

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
    configuration.trackApplicationLifecycleEvents = true
    configuration.flushAt = 3
    configuration.flushInterval = 10
    Analytics.setup(with: configuration)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
    SEGConfiguration *config = [[SEGConfiguration alloc] initWithWriteKey:@"<writekey>"];
    config.trackApplicationLifecycleEvents = YES;
    
    _analytics = [[SEGAnalytics alloc] initWithConfiguration: config];
```
{% endcodeexampletab %}
{% endcodeexample %}

## Convert Middlewares to Plugins

Middlewares are a powerful mechanism that can augment events collected by the Analytics iOS (Classic) SDK. A middleware is a simple function that is invoked by the Segment SDK and can be used to monitor, modify, augment or reject events. Analytics Swift replaces the concept of middlewares with Enrichment Plugins to give you even more control over your event data. Refer to the [Plugin Architecture Overview](/docs/connections/sources/catalog/libraries/mobile/swift/plugin-architecture) for more information. 

### Source middleware

**Before example**
<br>

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

**After example**
<br>

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
### Destination middleware
If you don't need to transform all of your Segment calls, and only want to transform the calls going to specific, device-mode destinations, use Destination plugins.

**Before example**
<br>

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


**After example**
<br>

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

### Update your config options 

Segment changed these config options:

| Before                   | After                             |
| ------------------------ | --------------------------------- |
| `defaultProjectSettings` | Name changed to `defaultSettings` |

Segment added these options:

| Name                        | Details                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoAddSegmentDestination` | The analytics client automatically adds the Segment Destination. Set this to `false` if you want to customize the initialization of the Segment Destination, such as, add destination middleware. |

Segment deprecated these options:


| Deprecated Option           | Details                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `enableAdvertisingTracking` | Deprecated                                                                                                  |
| `launchOptions`             | Deprecated in favor of the enrichment plugin that adds the default data to the event payloads.              |
| `maxQueueSize`              | Deprecated                                                                                                  |
| `recordScreenViews`         | Deprecated in favor of a plugin that provides the same functionality. Use the `UIKitScreenTracking` plugin. |
| `shouldUseBluetooth`        | Deprecated                                                                                                  |
| `shouldUseLocationServices` | Deprecated                                                                                                  |
| `trackAttributionData`      | This feature no longer exists.                                                                              |
| `trackInAppPurchases`       | Deprecated                                                                                                  |
| `trackPushNotifications`    | Deprecated                                                                                                  |

### Add destination plugins

> warning ""
> You should remove all of your Analytics iOS (Classic) device-mode destinations as they are not compatible with Analytics Swift

Segment previously used Factories to initialize destinations. With Analytics Swift, Segment treats destinations similar to plugins and simplifies the process in adding them. Refer to the [Plugin Architecture Overview](/docs/connections/sources/catalog/libraries/mobile/swift/plugin-architecture) for more information. 

**Before example**
<br> 

```swift
    analyticsConfig.use(FooIntegrationFactory.instance()
    let analytics = Analytics.setup(with: analyticsConfig)
```
**After example**
<br> 

```swift  
    let destination = /* initialize your desired destination */
    analytics.add(plugin: destination)
```

## Modify your tracking methods 

### Identify

**Before example**
<br> 

```swift
    analytics.identify(userId: "a user's id", traits: ["firstName": "John", "lastName": "Doe"])
```
**After example**
<br> 

```swift    
    // The newer APIs promote the use of strongly typed structures to keep codebases legible

    struct UserTraits(
        let firstName: String,
        let lastName: String
    )


    analytics.identify("a user's id", UserTraits(firstName = "John", lastName = "Doe"))
```
### Track

**Before example**
<br> 

```swift
      analytics.track("Item Purchased", properties: ["item": "Sword of Heracles", "revenue": 2.95])      
```

**After example**
<br> 
      
```swift    

    // The newer APIs promote the use of strongly typed structures to keep codebases legible

    struct ItemPurchasedProperties(
        let item: String
        let revenue: Double
    )

    analytics.track(
        name: "Item Purchased",
        properties: ItemPurchasedProperties(
            item = "Sword of Heracles",
            price = 2.95
        )
    )
```
### Group

**Before example**
<br> 

```swift
    analytics.identify(userId: "a user's id", traits: ["firstName": "John", "lastName": "Doe"])
```

**After example**
<br> 

```swift    
    // The newer APIs promote the use of strongly typed structures to keep codebases legible

    struct GroupTraits(
        let name: String
        let description: String
    )
        
    analytics.group(groupId: "group123", traits: GroupTraits(name = "Initech", description = "Accounting Software"))
```

### Screen 

**Before example**
<br> 

```swift
    analytics.screen("Photo Feed", properties: ["Feed Type": "private"])
```

**After example**
<br> 

```swift    
    // The newer APIs promote the use of strongly typed structures to keep codebases legible


    struct FeedScreenProperties(
        let feedType: Int
    )

    analytics.screen(title: "Photo Feed", properties: FeedScreenProperties(feedType = "private"))
```

### Alias

**Before example**
<br> 

```swift
    analytics.alias("new id");
```

**After example**
<br> 

```swift    
    analytics.alias(newId: "new id")
```
