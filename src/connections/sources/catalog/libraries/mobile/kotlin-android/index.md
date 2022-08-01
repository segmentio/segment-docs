---
title: Analytics for Kotlin (Android)
strat: kotlin
redirect_from:
  - '/connections/sources/catalog/cloud-apps/kotlin-android/'
id: 9EMcTqiKok
---
With Analytics-Kotlin, you can send data using Kotlin applications to any analytics or marketing tool without having to learn, test, or implement a new API every time. Analytics-Kotlin enables you to process and track the history of a payload, while Segment controls the API and prevents unintended operations.

> info ""
> Segment supports [these destinations](#supported-destinations) in device-mode, with more to follow. Cloud-mode destinations are also supported. If you don't see your destination, you can [build your own](#build-your-own-destination).

> success ""
> You can choose to set up your Analytics Kotlin source on [mobile](/docs/connections/sources/catalog/libraries/mobile/kotlin-android) or on the [server](/docs/connections/sources/catalog/libraries/server/kotlin). Segment doesn't support device-mode destinations on the server-side.

If you're migrating to Analytics-Kotlin from a different mobile library, you can skip to the [migration guide](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/migration/).


## Getting Started

To get started with the Analytics-Kotlin mobile library:

1. Create a Source in Segment.
    1. Go to **Connections > Sources > Add Source**.
    2. Search for **Kotlin (Android)** and click **Add source**.
2. Add the Analytics dependency to your build.gradle.

    Segment recommends you to install the library with a build system like Gradle, as it simplifies the process of upgrading versions and adding integrations. The library is distributed through [Maven Central](https://repo1.maven.org/maven2/com/segment/analytics/kotlin/android/){:target="_blank"}. Add the analytics module to your build.gradle as a dependency as shown in the code sample below, and replace `<latest_version>` with the latest version listed on Segment's [releases page](https://github.com/segmentio/analytics-kotlin/releases){:target="_blank"}

    ```
    repositories {
      mavenCentral()
    }
    dependencies {
        implementation 'com.segment.analytics.kotlin:android:<latest_version>'
    }
    ```

3. Initialize and configure the client.

    Segment recommends you to install the client in your application subclass.

    ```java
      // Add required imports
      import com.segment.analytics.kotlin.android.Analytics
      import com.segment.analytics.kotlin.core.*

      // Create an analytics client with the given application context and Segment write key.
      // NOTE: in android, application context is required to pass as the second parameter.
      Analytics("YOUR_WRITE_KEY", applicationContext) {
          // Automatically track Lifecycle events
          trackApplicationLifecycleEvents = true
          flushAt = 3
          flushInterval = 10
      }
    ```

    **Note: If you're on an Android platform, you must add the application context as the second parameter.**
    <br>Automatically tracking lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) is optional, but Segment highly recommends you to configure these options in order to track core events.

    <br>**Note:** Unlike the Analytics-Android SDK, the Analytics-Kotlin SDK doesn't provide a singleton instance and relies on you to keep track of the instance.

    <br>These are the options you can apply to configure the client:

    Option Name | Description
    ----------- | -----------
    `writeKey` *required* | This is your Segment write key. |
    `application` | Default set to `null`. <br> The application specific object (in the case of `Android: ApplicationContext`).
    `apiHost` | Default set to `api.segment.io/v1`. <br> This sets a default API Host to which Segment sends events. |
    `autoAddSegmentDestination` | Default set to `true`. <br> This automatically adds the Segment Destination plugin. You can set this to `false` if you want to manually add the Segment Destination plugin. |
    `collectDeviceId` | Default set to `false`. <br> Set to `true` to automatically collect the device Id. <br> The [DRM API](https://source.android.com/devices/drm) generates the device ID. If the ID didn't generate previously (for example, because the app was newly installed), an empty string shows before the ID generation completes. You can overwrite the device ID with a custom ID by writing your own [`plugin`](#plugin) |
    `defaultSettings` | Default set to `{}`. <br> The settings object used as fallback in case of network failure. |
    `flushAt` | Default set to `20`. <br> The count of events at which Segment flushes events. |
    `flushInterval` | Default set to `30` (seconds). <br> The interval in seconds at which Segment flushes events. |
    `recordScreenViews` | Default set to `false`. <br> Set to `true` to automatically trigger screen events on Activity Start. |
    `storageProvider` | Default set to `ConcreteStorageProvider`. <br> In Android, this must be set to `AndroidStorageProvider`. The `Analytics` constructors configure this automatically. |
    `trackApplicationLifecycleEvents` | Default set to `false`. <br> Set to `true` to automatically track Lifecycle events. |
    `trackDeepLinks` | Default set to `false`. <br> Set to `true` to automatically track opened Deep Links based on intents. |
    `useLifecycleObserver` | Default set to `false`. <br> Set to `true` to use `LifecycleObserver` to track Application lifecycle events. |

4. Add Permissions to `AndroidManifest.xml`.

    Add these permissions to your `AndroidManifest.xml`:

    ```java
    <!-- Required for internet. -->
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    ```

5. Enable Java 8+ API desugaring.

    The SDK internally uses a number of Java 8 language APIs through desugaring. Make sure your project either [enables desugaring](https://developer.android.com/studio/write/java8-support#library-desugaring)) or requires a minimum API level of 26.

## Tracking Methods

Once you've installed the mobile or server Analytics-Kotlin library, you can start collecting data through Segment's tracking methods:
- [Identify](#identify)
- [Track](#track)
- [Screen](#screen)
- [Group](#group)

> info ""
> For any of the different methods described, you can replace the properties and traits in the code samples with variables that represent the data collected.

### Identify
The [Identify](/docs/connections/spec/identify/) method lets you tie a user to their actions and record traits about them. This includes a unique user ID and any optional traits you know about them like their email, name, address. The traits option can include any information you want to tie to the user. When using any of the reserved traits, be sure the information reflects the name of the trait. For example, `email`  should always be a string of the user's email address.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun identify(userId: String, traits: JsonObject = emptyJsonObject)

// If <T> is annotated with @Serializable you will not need to provide a serializationStrategy
fun <T> identify(userId: String, traits: T, serializationStrategy: KSerializer<T>)
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
analytics.identify("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```
{% endcodeexampletab %}
{% endcodeexample %}

### Track
The [Track](/docs/connections/spec/track/) method lets you record the actions your users perform. Every action triggers an event, which also has associated properties that the track method records.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun track(name: String, properties: JsonObject = emptyJsonObject)

// If <T> is annotated with @Serializable you will not need to provide a serializationStrategy
fun <T> track(name: String, properties: T, serializationStrategy: KSerializer<T>)
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
analytics.track("View Product", buildJsonObject {
    put("productId", 123)
    put("productName" "Striped trousers")
});
```
{% endcodeexampletab %}
{% endcodeexample %}

### Screen
The [Screen](/docs/connections/spec/screen/) method lets you record whenever a user sees a screen in your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Not all integrations support screen, so when it's not supported explicitly, the screen method tracks as an event with the same parameters.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun screen(screenTitle: String, properties: JsonObject = emptyJsonObject, category: String = "")

// If <T> is annotated with @Serializable you will not need to provide a serializationStrategy
fun <T> screen(screenTitle: String, properties: T, category: String = "", serializationStrategy: KSerializer<T>)
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
analytics.screen("ScreenName", buildJsonObject {
    put("productSlug", "example-product-123")
});
```
{% endcodeexampletab %}
{% endcodeexample %}

> info ""
> Add the `AndroidRecordScreenPlugin` to enable automatic screen tracking.

### Group
The [Group](/docs/connections/spec/group/) method lets you associate an individual user with a group— whether it's a company, organization, account, project, or team. This includes a unique group identifier and any additional group traits you may have, like company name, industry, number of employees. You can include any information you want to associate with the group in the traits option. When using any of the reserved group traits, be sure the information reflects the name of the trait. For example, email should always be a string of the user's email address.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun group(groupId: String, traits: JsonObject = emptyJsonObject)

// If <T> is annotated with @Serializable you will not need to provide a serializationStrategy
fun <T> group(groupId: String, traits: T, serializationStrategy: KSerializer<T>)
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
analytics.group("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```
{% endcodeexampletab %}
{% endcodeexample %}

## Plugin Architecture
Segment's plugin architecture enables you to modify and augment how the analytics client works. From modifying event payloads to changing analytics functionality, plugins help to speed up the process of getting things done.

Plugins are run through a timeline, which executes in order of insertion based on their entry types. Segment has these 5 entry types:

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

### Example projects using Analytics-Kotlin
See how different platforms and languages use Analytics-Kotlin in different [example projects](https://github.com/segmentio/analytics-kotlin/tree/main/samples).
The example projects contain sample [plugins](https://github.com/segmentio/analytics-kotlin/tree/main/samples/kotlin-android-app/src/main/java/com/segment/analytics/next/plugins) and [destination plugins](https://github.com/segmentio/analytics-kotlin/tree/main/samples/kotlin-android-app-destinations/src/main/java/com/segment/analytics/destinations/plugins) you can utilize.

## Utility Methods
The Analytics-Kotlin utility methods help you work with plugins from the analytics timeline. They include:
- [Add](#add)
- [Find](#find)
- [Remove](#remove)
- [Reset](#reset)

There's also the [Flush](#flush) method to help you manage the current queue of events.

### Add
The Add method lets you add a plugin to the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun add(plugin: Plugin): Analytics
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
val plugin = object: Plugin {
    override val type = Plugin.Type.Enrichment
    override val name = "SomePlugin"
    override var lateinit analytics: Analytics
}
analytics.add(plugin)
```
{% endcodeexampletab %}
{% endcodeexample %}

### Find
The Find method lets you find a registered plugin from the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun find(pluginName: String): Plugin
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
val plugin = analytics.find("SomePlugin")
```
{% endcodeexampletab %}
{% endcodeexample %}

### Remove
The Remove methods lets you remove a registered plugin from the analytics timeline.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun remove(pluginName: String): Analytics
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
analytics.remove("SomePlugin")
```
{% endcodeexampletab %}
{% endcodeexample %}

### Flush
The Flush method lets you force flush the current queue of events regardless of what the `flushAt` and `flushInterval` is set to.

{% codeexample %}
{% codeexampletab Method signature %}
```java
public fun flush()
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
analytics.flush("SomePlugin")
```
{% endcodeexampletab %}
{% endcodeexample %}

### Reset
The `reset` method clears the SDK’s internal stores for the current user and group. This is useful for apps where users log in and out with different identities on the same device over time.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun reset()
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```java
analytics.reset()
```
{% endcodeexampletab %}
{% endcodeexample %}

## Build Your Own Destination

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

## Compatibility
If you use a Java codebase, please refer to the [Java Compatibility docs](https://github.com/segmentio/analytics-kotlin/blob/main/JAVA_COMPAT.md){:target="_blank"} for sample uses.

## Supported Destinations
Segment currently supports these destinations for Analytics Kotlin and is actively adding more:
* [Amplitude](https://github.com/segment-integrations/analytics-kotlin-amplitude)
* [Appsflyer](https://github.com/segment-integrations/analytics-kotlin-appsflyer)
* [Firebase](https://github.com/segment-integrations/analytics-kotlin-firebase)
* [Mixpanel](https://github.com/segment-integrations/analytics-kotlin-mixpanel)

## FAQs
### Can I use the catalog of device-mode destinations from Analytics-Android?
No, only the plugins listed above are supported in device-mode for Analytics-Kotlin.
### Will I still see device-mode integrations listed as `false` in the integrations object?
When you successfully package a plugin in device-mode, you will no longer see the integration listed as `false` in the integrations object for a Segment event. This logic is now packaged in the event metadata, and is not surfaced in the Segment debugger.

## Changelog
[View the Analytics-Kotlin changelog on GitHub](https://github.com/segmentio/analytics-kotlin/releases).
