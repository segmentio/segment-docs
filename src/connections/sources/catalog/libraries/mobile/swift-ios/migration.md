---
title: Analytics for Swift Migration Guide
strat: swift
---

> info ""
> Analytics-Swift supports [these destinations](/docs/connections/sources/catalog/libraries/mobile/swift-ios#supported-destinations) with more to come.

If you're using a different mobile library such as Analytics-iOS, follow these steps to migrate to the Analytics-Swift library:

> success ""
> Segment no longer supports installing Analytics-Swift via Cocoapods.

1. Create a Swift Source in Segment.
    1. Go to **Connections > Sources > Add Source**.
    2. Search for **Swift** and click **Add source**.
2. Add the SDK as a dependency.
    1. Open your project in Xcode.
    2. If using Xcode 12, go to **File > Swift Packages > Add Package Dependency…**. If using Xcode 13, go to **File > Add Packages…**
    3. Enter the git path `git@github.com:segmentio/analytics-swift.git` for the Package Repository and click **Next**.
    4. Select the version rules for your application and click **Next**.
    5. Make sure the Segment Library checkbox is selected.
    6. Click **Finish**.

    <br> You have now added Analytics-Swift to your project, and Segment and Sovran show as Swift package dependencies.

3. Modify your initialized instance.

    <br>Before example:
    ```swift
    let configuration = AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")
    configuration.trackApplicationLifecycleEvents = true
    configuration.flushAt = 3
    configuration.flushInterval = 10
    Analytics.setup(with: configuration)
    ```

    <br> After example:
    ```swift
    let config = Configuration(writeKey: "YOUR_WRITE_KEY")
            .trackApplicationLifecycleEvents(true)
            .flushAt(3)
            .flushInterval(10)

    let analytics = Analytics(configuration: config)
    ```

4. Add a middleware.

    Middlewares are a powerful mechanism that can augment the events collected by the SDK. A middleware is a simple function that is invoked by the Segment SDK and can be used to monitor, modify, augment or reject events.

    <br> As middlewares have the same function as [enrichment plugins](/docs/connections/sources/catalog/libraries/mobile/swift-ios#plugin-architecture), you need to write an enrichment plugin to add a middleware.

    <br>Before example:
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

    <br> After example:
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
5. Add a destination middleware.

    If you don't need to transform all of your Segment calls, and only want to transform the calls going to specific destinations, use Destination middleware instead of Source middleware. Destination middleware is available for device-mode destinations only.

    <br>Before example:
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

    <br> After example:
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
6. Set your config options.
    <br> Segment changed these config options:

    Before | After
    ------ | ------
    `defaultProjectSettings` | Name changed to `defaultSettings`

    <br> Segment added these options:

    Name | Details
    ---- | -------
    `autoAddSegmentDestination` | The analytics client automatically adds the Segment Destination. Set this to `false` if you want to customize the initialization of the Segment Destination, such as, add destination middleware.
    `application` |

    <br> Segment deprecated these options:

    Deprecated Option | Details
    ----------------- | -------
    `enableAdvertisingTracking` | Deprecated |
    `launchOptions` | Deprecated in favor of the enrichment plugin that adds the default data to the event payloads. |
    `maxQueueSize` | Deprecated |
    `recordScreenViews` | Deprecated in favor of a plugin that provides the same functionality. Use the   `UIKitScreenTracking` plugin. |
    `shouldUseBluetooth` | Deprecated |
    `shouldUseLocationServices` | Deprecated |
    `trackAttributionData` | This feature no longer exists. |
    `trackInAppPurchases` | Deprecated |
    `trackPushNotifications` | Deprecated |

7. Add a destination.
    <br> Segment previously used Factories to initialize destinations. With Analytics Swift, Segment treats destinations similar to plugins and simplifies the process in adding them.

    <br> Before example:
    ```swift
    analyticsConfig.use(FooIntegrationFactory.instance()
    let analytics = Analytics.setup(with: analyticsConfig)
    ```

    <br> After example:
    ```swift  
    let destination = /* initialize your desired destination */
    analytics.add(plugin: destination)
    ```
8. Modify your tracking methods for Identify, Track, Group, Screen, and Alias.
    - Identify

      <br> Before example
      ```swift
      analytics.identify(userId: "a user's id", traits: ["firstName": "John", "lastName": "Doe"])
      ```

      <br> After example
      ```swift    
      // The newer APIs promote the use of strongly typed structures to keep codebases legible
      struct UserTraits(
        let firstName: String,
        let lastName: String
      )

      analytics.identify("a user's id", UserTraits(firstName = "John", lastName = "Doe"))
      ```
    - Track

      <br> Before example
      ```swift
      analytics.track("Item Purchased", properties: ["item": "Sword of Heracles", "revenue": 2.95])      ```

      <br> After example
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

    - Group

      <br> Before example
      ```swift
      analytics.identify(userId: "a user's id", traits: ["firstName": "John", "lastName": "Doe"])
      ```

      <br> After example
      ```swift    
      // The newer APIs promote the use of strongly typed structures to keep codebases legible
      struct GroupTraits(
        let name: String
        let description: String
      )
      analytics.group(groupId: "group123", traits: GroupTraits(name = "Initech", description = "Accounting Software"))
      ```

    - Screen

      <br> Before example
      ```swift
      analytics.screen("Photo Feed", properties: ["Feed Type": "private"])
      ```

      <br> After example
      ```swift    
      // The newer APIs promote the use of strongly typed structures to keep codebases legible
      struct FeedScreenProperties(
        let feedType: Int
      )

      analytics.screen(title: "Photo Feed", properties: FeedScreenProperties(feedType = "private"))
      ```

    - Alias

      <br> Before example
      ```swift
      analytics.alias("new id");
      ```

      <br> After example
      ```swift    
      analytics.alias(newId: "new id")
      ```
