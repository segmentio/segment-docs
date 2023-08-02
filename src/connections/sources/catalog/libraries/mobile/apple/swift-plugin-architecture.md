---
title: Analytics-Swift Plugin Architecture
strat: swift
---

## Plugin Architecture
Segment's plugin architecture enables you to modify and augment how the analytics client works. From modifying event payloads to changing analytics functionality, plugins help to speed up the process of getting things done.

Plugins are run through a timeline, which executes in order of insertion based on their types. Segment has these 5 types:

| Type          | Details                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `before`      | Executes before event processing begins.                                                       |
| `enrichment`  | Executes as the first level of event processing.                                               |
| `destination` | Executes as events begin to pass off to destinations.                                          |
| `after`       | Executes after all event processing completes. You can use this to perform cleanup operations. |
| `utility`     | Executes only with manual calls such as Logging.                                               |

### Fundamentals
There are 3 basic types of plugins that you can use as a foundation for modifying functionality. They are: [`Plugin`](#plugin), [`EventPlugin`](#eventplugin), and [`DestinationPlugin`](#destinationplugin).

#### Plugin
`Plugin` acts on any event payload going through the timeline.

For example, if you want to add something to the context object of any event payload as an enrichment:

```swift
class SomePlugin: Plugin {
        let type: PluginType = .enrichment
        let name: String
        let analytics: Analytics

        init(name: String) {
                self.name = name
        }

        override func execute(event: BaseEvent): BaseEvent? {
                var workingEvent = event
                if var context = workingEvent?.context?.dictionaryValue {
                        context[keyPath: "foo.bar"] = 12
                        workingEvent?.context = try? JSON(context)
                }
                return workingEvent
        }
}
```

#### EventPlugin
`EventPlugin` is a plugin interface that acts on specific event types. You can choose the event types by only overriding the event functions you want.

For example, if you only want to act on `track` & `identify` events:

```swift
class SomePlugin: EventPlugin {
        let type: PluginType = .enrichment
        let name: String
        let analytics: Analytics

        init(name: String) {
                self.name = name
        }

        func identify(event: IdentifyEvent) -> IdentifyEvent? {
                // code to modify identify event
                return event
        }

        func track(event: TrackEvent) -> TrackEvent? {
                // code to modify track event
                return event
        }
}
```

#### DestinationPlugin
The `DestinationPlugin` interface is commonly used for device-mode destinations. This plugin contains an internal timeline that follows the same process as the analytics timeline, enabling you to modify and augment how events reach a particular destination.

For example, if you want to implement a device-mode destination plugin for AppsFlyer, you can use this:

```swift
internal struct AppsFlyerSettings: Codable {
    let appsFlyerDevKey: String
    let appleAppID: String
    let trackAttributionData: Bool?
}

@objc
class AppsFlyerDestination: UIResponder, DestinationPlugin, UserActivities, RemoteNotifications {

    let timeline: Timeline = Timeline()
    let type: PluginType = .destination
    let name: String
    var analytics: Analytics?

    internal var settings: AppsFlyerSettings? = nil

     required init(name: String) {
        self.name = name
        analytics?.track(name: "AppsFlyer Loaded")
    }

    public func update(settings: Settings) {

        guard let settings: AppsFlyerSettings = settings.integrationSettings(name: "AppsFlyer") else {return}
        self.settings = settings


        AppsFlyerLib.shared().appsFlyerDevKey = settings.appsFlyerDevKey
        AppsFlyerLib.shared().appleAppID = settings.appleAppID
        AppsFlyerLib.shared().isDebug = true
        AppsFlyerLib.shared().deepLinkDelegate = self

        // additional update logic
  }

// ...

analytics.add(plugin: AppsFlyerPlugin(name: "AppsFlyer"))
analytics.track("AppsFlyer Event")
```

### Advanced concepts
- `update(settings:)` Use this function to react to any settings updates. This implicitly calls when settings update.
- OS Lifecycle hooks Plugins can also hook into lifecycle events by conforming to the platform appropriate protocol. These functions call implicitly as the lifecycle events process such as:  `iOSLifecycleEvents` , `macOSLifecycleEvents`, `watchOSLifecycleEvents`, and `LinuxLifecycleEvents`.

## Adding a plugin
Adding plugins enable you to modify your analytics implementation to best fit your needs. You can add a plugin using this:

```swift
analytics.add(plugin: yourIntegration)
```

Though you can add plugins anywhere in your code, it's best to implement your plugin when you configure the client.
