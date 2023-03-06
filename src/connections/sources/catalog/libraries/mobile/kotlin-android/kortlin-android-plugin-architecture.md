---
title: Analytics for Kotlin Plugin Architecture
strat: kotlin
---

## Plugin architecture
Segment's plugin architecture enables you to modify and augment how the analytics client works. From modifying event payloads to changing analytics functionality, plugins help to speed up the process of getting things done.

Plugins are run through a timeline, which executes in order of insertion based on their types. Segment has these five types:

| Type          | Details                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `before`      | Executes before event processing begins.                                                       |
| `enrichment`  | Executes as the first level of event processing.                                               |
| `destination` | Executes as events begin to pass off to destinations.                                          |
| `after`       | Executes after all event processing completes. You can use this to perform cleanup operations. |
| `utility`     | Executes only with manual calls such as Logging.                                               |

### Fundamentals
There are three basic types of plugins that you can use as a foundation for modifying functionality. They are: [`Plugin`](#plugin), [`EventPlugin`](#eventplugin), and [`DestinationPlugin`](#destinationplugin).

#### Plugin
`Plugin` acts on any event payload going through the timeline.

For example, if you want to add something to the context object of any event payload as an enrichment:

```java
class SomePlugin: Plugin {
    override val type = Plugin.Type.Enrichment
    override val name = "SomePlugin"

    override var lateinit analytics: Analytics

    override fun execute(event: BaseEvent): BaseEvent? {
        event.putInContext("foo", "bar")
        return event
    }
}
```

#### EventPlugin
`EventPlugin` is a plugin interface that acts on specific event types. You can choose the event types by only overriding the event functions you want.

For example, if you only want to act on `track` & `identify` events:

```java
class SomePlugin: EventPlugin {
    override fun track(event: TrackEvent): BaseEvent? {
        // code to modify track event
        return event
    }
    override fun identify(event: TrackEvent): BaseEvent? {
        // code to modify identify event
        return event
    }
}
```

#### DestinationPlugin
The `DestinationPlugin` interface is commonly used for device-mode destinations. This plugin contains an internal timeline that follows the same process as the analytics timeline, enabling you to modify and augment how events reach a particular destination.

For example, if you want to implement a device-mode destination plugin for Amplitude, you can use this:

```java
class AmplitudePlugin: DestinationPlugin() {
    override val key = "Amplitude" // This is the name of the destination plugin, it is used to retrieve settings internally

    val amplitudeSDK: Amplitude // This is an instance of the partner SDK

    init { // Initializing the partner SDK and setting things up
        amplitudeSDK = Amplitude.instance
        amplitudeSDK.initialize(applicationContext, "API_KEY");
    }

    /*
    * Implementing this function allows this plugin to hook into any track events
    * coming into the analytics timeline
    */
    override fun track(event: TrackEvent): BaseEvent? {
        amplitudeSDK.logEvent(event.name)
        return event
    }
}
```

### Advanced concepts

- `setup(Analytics)`: Use this function to setup your plugin. This implicitly calls once the plugin registers.
- `update(Settings)`: Use this function to react to any settings updates. This implicitly calls when settings update. You can force a settings update by calling `analytics.checkSettings()`.
- `AndroidLifecycle` hooks Plugins can also hook into `AndroidLifecycle` functions by implementing an interface. These functions call implicitly as the lifecycle events process.
- `DestinationPlugin` timeline: The destination plugin contains an internal timeline that follows the same process as the analytics timeline, enabling you to modify/augment how events reach the particular destination. For example if you only wanted to add a context key when sending an event to `Amplitude`:

```java
val amplitudePlugin = AmplitudePlugin()
analytics.add(amplitudePlugin) // add amplitudePlugin to the analytics client

val amplitudeEnrichment = object: Plugin {
    override val type = Plugin.Type.Enrichment
    override val name = "SomePlugin"

    override var lateinit analytics: Analytics

    override fun execute(event: BaseEvent): BaseEvent? {
        event.putInContext("foo", "bar")
        return event
    }
}

amplitudePlugin.add(amplitudeEnrichment) // add enrichment plugin to amplitude timeline
```

## Adding a plugin
Adding plugins enable you to modify your analytics implementation to best fit your needs. You can add a plugin using this:

```java
val yourPlugin = SomePlugin()
analytics.add(yourPlugin)
```

Though you can add plugins anywhere in your code, it's best to implement your plugin when you configure the client.

Here's an example of adding a plugin to the context object of any event payload as an enrichment:

```java
class SomePlugin: Plugin {
    override val type = Plugin.Type.Enrichment
    override val name = "SomePlugin"

    override var lateinit analytics: Analytics

    override fun execute(event: BaseEvent): BaseEvent? {
        event.putInContext("foo", "bar")
        return event
    }
}
val yourPlugin = SomePlugin()
analytics.add(yourPlugin)
```
## Build your own destination

If Segment doesn't support your Kotlin destination, you can build your own with the template Segment provides.

To build your own Kotlin destination using a plugin template:

1. Go to the [Kotlin Destination Plugin Template](https://github.com/segment-integrations/analytics-kotlin-destination-template){:target="_blank"}.
2. Click **Use this template**.
3. Enter a name for the repository.
4. Click **Create repository from template**.
5. Go to **lib > src > main > java/dmn/your/pkg/destination** in your repository.
6. Click the **MyDestination.kt**.
7. Complete the `TODO` sections in the sample code with the appropriate information for your destination. Segment recommends you to change the package name before you finalize your build.
8. Commit your changes.

You can unit test your destination to make sure it works. Segment recommends you to use the testing template as a starter and to build upon it to get test coverage of most scenarios.

To test your destination:

1. Go to **lib > src > test > java/dmn/your/pkg/destination**.
2. Click **MyDestinationTests.kt**.
3. Complete the `TODO` sections in the sample code with the appropriate information for your destination.
4. Commit your changes.

Segment recommends you to test your destination implementation end-to-end. Send some sample analytics events and ensure that they reach the destination.
