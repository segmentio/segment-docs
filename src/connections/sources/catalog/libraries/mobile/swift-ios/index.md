---
title: 'Analytics for Swift'
strat: swift
redirect_from:
  - '/connections/sources/catalog/cloud-apps/swift/'
id: dZeHygTSD4
---
With Analytics-Swift, you can send data from iOS, tvOS, iPadOS, WatchOS, macOS and Linux applications to any analytics or marketing tool without having to learn, test, or implement a new API every time. Analytics-Swift enables you to process and track the history of a payload, while Segment controls the API and prevents unintended operations. Analytics-Swift also offers default implementations to help you maintain destinations and integrations.

If you're migrating to Analytics-Swift from a different mobile library, you can skip to the [migration guide](/docs/connections/sources/catalog/libraries/mobile/swift-ios/migration/).

> info ""
> Analytics-Swift currently supports [these destinations](#supported-destinations) in device-mode, with more to follow. Cloud-mode destinations are also supported.


## Getting Started
To get started with the Analytics-Swift mobile library:

1. Create a Source in Segment.
    1. Go to **Connections > Sources > Add Source**.
    2. Search for **Swift** and click **Add source**.

2. Add the Analytics dependency to your application.
    Add the Swift package, `git@github.com:segmentio/analytics-swift.git` as a dependency through either of these 2 options:
    1. Your package.swift file
    2. Xcode
        1. Xcode 12: **File > Swift Packages > Add Package Dependency**
        2. Xcode 13: **File > Add Packages…**

    After installing the package, you can reference Analytics Swift by importing Segment's Analytics package with `import Segment`.

3. Initialize and configure the Analytics-Swift client.
    For example, in a lifecycle method such as `didFinishLaunchingWithOptions` in iOS:

    ```swift
    var analytics: Analytics? = nil
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
            // Override point for customization after application launch.
            let configuration = Configuration(writeKey: "WRITE_KEY")
                .trackApplicationLifecycleEvents(true)
                .flushInterval(10)

            analytics = Analytics(configuration: configuration)
    }
    ```

    These are the options you can apply to configure the client:

    Option Name | Description
    ----------- | ------------
    `writeKey` *required* | This is your Segment write key.
    `apiHost` | The default is set to `api.segment.io/v1`. <br> This sets a default API Host to which Segment sends event.
    `autoAddSegmentDestination` | The default is set to `true`. <br> This automatically adds the Segment Destination plugin. Set to `false` if you want to add plugins to the Segment Destination.
    `cdnHost` | The default is set to `cdn-settings.segment.com/v1`. <br> This sets a default CDN Host from which Segment retrieves settings.
    `defaultSettings`| The default is set to `{}`. <br> This is the settings object used as fallback in case of network failure.
    `flushAt`| The default is set to `20`. <br> The count of events at which Segment flushes events.
    `flushInterval`| The default is set to `30` (seconds). <br> The interval in seconds at which Segment flushes events.
    `trackApplicationLifecycleEvents`| The default is set to `true`. <br> This automatically tracks lifecycle events. Set to `false` to stop tracking lifecycle events.
    `trackDeepLinks` | The default is set to `true`. <br> This automatically track deep links. Set to `false` to stop tracking Deep Links.

    > info ""
    > Configuration options such as IDFA collection and automatic screen tracking are found in Segment's [Plugin Examples repo](https://github.com/segmentio/analytics-example-plugins/tree/main/plugins/swift){:target="_blank"}.

## Tracking Methods
Once you've installed the Analytics-Swift library, you can start collecting data through Segment's tracking methods:
- [Identify](#identify)
- [Track](#track)
- [Screen](#screen)
- [Group](#group)

### Identify
The [Identify](/docs/connections/spec/identify/) method lets you tie a user to their actions and record traits about them. This includes a unique user ID and any optional traits you know about them like their email, name, address. The traits option can include any information you want to tie to the user. When using any of the reserved traits, be sure the information reflects the name of the trait. For example, `email`  should always be a string of the user's email address.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
// These signatures provide for a typed version of user traits
func identify<T: Codable>(userId: String, traits: T)
func identify<T: Codable>(traits: T)
func identify(userId: String)
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```swift
struct MyTraits: Codable {
        let favoriteColor: String
}

// ...

analytics.identify(userId: "someone@segment.com", MyTraits(favoriteColor: "fuscia"))
```
{% endcodeexampletab %}
{% endcodeexample %}

### Track
The [Track](/docs/connections/spec/track/) method lets you record the actions your users perform. Every action triggers an event, which also has associated properties that the track method records.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
func track(name: String)
// This signature provides a typed version of properties.
func track<P: Codable>(name: String, properties: P?)
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```swift
struct TrackProperties: Codable {
        let someValue: String
}

// ...

analytics.track(name: "My Event", properties: TrackProperties(someValue: "Hello"))
```
{% endcodeexampletab %}
{% endcodeexample %}

The Track method has these fields:

Field | Details
----- | -------
`name` *required* | The name of the event. Segment recommends you to use human-readable names like *Song Played* or *Status Updated*.
`properties` *optional* | The structure of properties for the event. If the event was Product Added to cart, it may have properties like `price` and `productType`.

### Screen
The [Screen](/docs/connections/spec/screen/) method lets you record whenever a user sees a screen in your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Not all integrations support screen, so when it's not supported explicitly, the screen method tracks as an event with the same parameters.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
func screen(title: String, category: String? = nil)
func screen<P: Codable>(title: String, category: String? = nil, properties: P?)
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```swift
analytics.screen(title: "SomeScreen")
```
{% endcodeexampletab %}
{% endcodeexample %}

You can enable automatic screen tracking by using this [example plugin](https://github.com/segmentio/analytics-swift/blob/main/Examples/other_plugins/UIKitScreenTracking.swift){:target="_blank"}.

Once you add the plugin to your project, add it to your Analytics instance:

```swift
 analytics.add(plugin: UIKitScreenTracking())
```

### Group
The [Group](/docs/connections/spec/group/) method lets you associate an individual user with a group— whether it's a company, organization, account, project, or team. This includes a unique group identifier and any additional group traits you may have, like company name, industry, number of employees. You can include any information you want to associate with the group in the traits option. When using any of the reserved group traits, be sure the information reflects the name of the trait. For example, email should always be a string of the user's email address.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
func group(groupId: String)
func group<T: Codable>(groupId: String, traits: T?)
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```swift
struct MyTraits: Codable {
        let username: String
        let email: String
        let plan: String
}

// ...

analytics.group(groupId: "user-123", traits: MyTraits(
        username: "MisterWhiskers",
        email: "hello@test.com",
        plan: "premium"))
```
{% endcodeexampletab %}
{% endcodeexample %}

## Plugin Architecture
Segment's plugin architecture enables you to modify and augment how the analytics client works. From modifying event payloads to changing analytics functionality, plugins help to speed up the process of getting things done.

Plugins are run through a timeline, which executes in order of insertion based on their entry types. Segment has these 5 entry types:

| Type  | Details                                                                                        |
|------ | -------- |
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

        override fun execute(event: BaseEvent): BaseEvent? {
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

## Utility Methods
The Analytics Swift utility methods help you work with [plugins](#plugin-architecture) from the analytics timeline. They include:
- [Add](#add)
- [Find](#find)
- [Remove](#remove)

There's also the [Flush](#flush) method to help you manage the current queue of events.

### Add
The Add method allows you to add a plugin to the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
@discardableResult func add(plugin: Plugin) -> String
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```swift
analytics.add(plugin: UIKitScreenTracking(name: "ScreenTracking"))
```
{% endcodeexampletab %}
{% endcodeexample %}

### Find
The Find method lets you find a registered plugin from the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
func find<T: Plugin>(pluginType: T.Type) -> Plugin?
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
let plugin = analytics.find(SomePlugin.self)
```
{% endcodeexampletab %}
{% endcodeexample %}

### Remove
The Remove methods lets you remove a registered plugin from the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
func remove(plugin: Plugin)
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```swift
analytics.remove(somePluginInstance)
```
{% endcodeexampletab %}
{% endcodeexample %}

### Flush
The Flush method lets you force flush the current queue of events regardless of what the `flushAt` and `flushInterval` is set to.

{% codeexample %}
{% codeexampletab Method signature %}
```swift
public func flush()
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```swift
analytics.flush()
```
{% endcodeexampletab %}
{% endcodeexample %}

## Ad Tracking and IDFA
[Segment no longer automatically collects IDFA](/docs/connections/sources/catalog/libraries/mobile/ios/ios14-guide/#segment-no-longer-automatically-collects-idfa). If you need to collect the user's IDFA to pass it to specific destinations, or for other uses, [you can manually pass the IDFA to the Segment SDK](/docs/connections/sources/catalog/libraries/mobile/ios/ios14-guide/#you-can-manually-pass-the-idfa-to-the-segment-sdk).

Copy the IDFACollection plugin to your project. You can also use this [IDFACollection example plugin](https://github.com/segmentio/analytics-swift/blob/main/Examples/other_plugins/IDFACollection.swift){:target="_blank"}.

```swift
let idfaPlugin = IDFACollection()
analytics.add(plugin: idfaPlugin)
```

## Supported Destinations
Segment supports these destinations for Analytics Swift, with more to come:
* [Amplitude](https://github.com/segment-integrations/analytics-swift-amplitude)
* [Appsflyer](https://github.com/segment-integrations/analytics-swift-appsflyer)
* [Facebook App Events](https://github.com/segment-integrations/analytics-swift-facebook-app-events)
* [Firebase](https://github.com/segment-integrations/analytics-swift-firebase)
* [Mixpanel](https://github.com/segment-integrations/analytics-swift-mixpanel)

## FAQs
### Can I use the catalog of device-mode destinations from Analytics-iOS?
No, only the plugins listed above are supported in device-mode for Analytics-Swift.
### Will I still see device-mode integrations listed as `false` in the integrations object?
When you successfully package a plugin in device-mode, you will no longer see the integration listed as `false` in the integrations object for a Segment event. This logic is now packaged in the event metadata, and is not surfaced in the Segment debugger.

## Changelog
[View the Analytics-Swift changelog on GitHub](https://github.com/segmentio/analytics-swift/releases).  
