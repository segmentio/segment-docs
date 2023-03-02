---
title: Analytics for Kotlin Implementation Guide
strat: kotlin-android
---

## Getting started

To get started with the Analytics-Kotlin mobile library:

1. Create a Source in Segment.
    1. Go to **Connections > Sources > Add Source**.
    2. Search for **Kotlin (Android)** and click **Add source**.
2. Add the Analytics dependency to your build.gradle.

    Segment recommends you to install the library with a build system like Gradle, as it simplifies the process of upgrading versions and adding integrations. The library is distributed through [Maven Central](https://central.sonatype.com/artifact/com.segment.analytics.kotlin/android/1.10.2){:target="_blank"}. Add the analytics module to your build.gradle as a dependency as shown in the code sample below, and replace `<latest_version>` with the latest version listed on Segment's [releases page.](https://github.com/segmentio/analytics-kotlin/releases){:target="_blank"}

{% codeexample %}
{% codeexampletab Kotlin%}
 ```java
    repositories {
      mavenCentral()
    }
    dependencies {
        implementation 'com.segment.analytics.kotlin:android:<latest_version>'
    }
 ```
{% endcodeexampletab %}
{% codeexampletab Java%}
```java
    repositories {
        maven { url 'https://jitpack.io' }
    }

    dependencies {
        implementation 'com.github.segmentio.analytics-kotlin:android:+'
    }
```
{% endcodeexampletab %}
{% endcodeexample %}   

3. Initialize and configure the client. Segment recommends you to install the client in your application subclass.

{% codeexample %}
{% codeexampletab Kotlin%}
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
{% endcodeexampletab %}
{% codeexampletab Java%}
```java
        AndroidAnalyticsKt.Analytics(BuildConfig.SEGMENT_WRITE_KEY,  getApplicationContext(), configuration -> {
    
        configuration.setFlushAt(1);
        configuration.setCollectDeviceId(true);
        configuration.setTrackApplicationLifecycleEvents(true);
        configuration.setTrackDeepLinks(true);
        //...other config options

        return Unit.INSTANCE;

        JavaAnalytics analyticsCompat = new JavaAnalytics(analytics);​
        });
```
{% endcodeexampletab %}
{% endcodeexample %}

> warning ""
> If you're on an Android platform, you must add the application context as the second parameter.
    
Automatically tracking lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) is optional, but Segment highly recommends you to configure these options in order to track core events. Unlike the Analytics Android SDK, the Analytics Kotlin SDK doesn't provide a singleton instance and relies on you to keep track of the instance.

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
`flushPolicies` | undefined | Add more granular control for when to flush |
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

> info ""
> You'll find configuration options such as IDFA collection and automatic screen tracking in Segment’s [Plugin Examples repository](https://github.com/segmentio/analytics-kotlin/tree/main/samples/kotlin-android-app/src/main/java/com/segment/analytics/next/plugins){:target="_blank"}.

## Tracking methods

Once you've installed the mobile or server Analytics Kotlin library, you can start collecting data through Segment's tracking methods:
- [Identify](#identify)
- [Track](#track)
- [Screen](#screen)
- [Group](#group)

> info ""
> For any of the different methods described, you can replace the properties and traits in the code samples with variables that represent the data collected.

### Identify
The [Identify](/docs/connections/spec/identify/) method lets you tie a user to their actions and record traits about them. This includes a unique user ID and any optional traits you know about them like their email, name, or address. The traits option can include any information you want to tie to the user. When using any of the reserved traits, be sure the information reflects the name of the trait. For example, `email`  should always be a string of the user's email address.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun identify(userId: String, traits: JsonObject = emptyJsonObject)

// If <T> is annotated with @Serializable you will not need to provide a serializationStrategy
fun <T> identify(userId: String, traits: T, serializationStrategy: KSerializer<T>)
```
{% endcodeexampletab %}
{% codeexampletab Kotlin %}
```java
analytics.identify("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```
{% endcodeexampletab %}
{% codeexampletab Java %}
```java
analytics.identify("user-123", Builders.buildJsonObject(o -> {
    o.put("username", "MisterWhiskers")
        .put("email", "hello@test.com")
        .put("plan", "premium");
}));

// or

analytics.identify("user-123", new YourJsonSerializable());
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

{% codeexampletab Kotlin %}
```java
analytics.track("View Product", buildJsonObject {
    put("productId", 123)
    put("productName" "Striped trousers")
});
```
{% endcodeexampletab %}
{% codeexampletab Java %}
```java
analytics.track("View Product", Builders.buildJsonObject(o -> {
   o.put("productId", 123)
    .put("productName", "Striped Trousers")
});
```
{% endcodeexampletab %}
{% endcodeexample %}

### Screen
The [Screen](/docs/connections/spec/screen/) method lets you record whenever a user sees a screen in your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event whenever the user opens a screen in your app. This could be a view, fragment, dialog, or activity depending on your app.

Not all integrations support screen, so when it's not supported explicitly, the screen method tracks as an event with the same parameters.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun screen(screenTitle: String, properties: JsonObject = emptyJsonObject, category: String = "")

// If <T> is annotated with @Serializable you will not need to provide a serializationStrategy
fun <T> screen(screenTitle: String, properties: T, category: String = "", serializationStrategy: KSerializer<T>)
```
{% endcodeexampletab %}
{% codeexampletab Kotlin %}
```java
analytics.screen("ScreenName", buildJsonObject {
    put("productSlug", "example-product-123")
});
```
{% endcodeexampletab %}
{% codeexampletab Java %}
```java
analytics.screen("ScreenName", Builders.buildJsonObject(o -> {
    o.put("productSlug", "example-product-123");
}));

// or

analytics.screen("ScreenName", new YourJsonSerializable());
```
{% endcodeexampletab %}
{% endcodeexample %}

> info ""
> Add the [AndroidRecordScreenPlugin](https://github.com/segmentio/analytics-kotlin/blob/main/samples/kotlin-android-app/src/main/java/com/segment/analytics/next/plugins/AndroidRecordScreenPlugin.kt) to enable automatic screen tracking.

### Group
The [Group](/docs/connections/spec/group/) method lets you associate an individual user with a group— whether it's a company, organization, account, project, or team. This includes a unique group identifier and any additional group traits you may have, like company name, industry, number of employees. You can include any information you want to associate with the group in the traits option. When using any of the [reserved group traits](/docs/connections/spec/group/#traits), be sure the information reflects the name of the trait. For example, email should always be a string of the user's email address.

{% codeexample %}
{% codeexampletab Method signature %}
```java
fun group(groupId: String, traits: JsonObject = emptyJsonObject)

// If <T> is annotated with @Serializable you will not need to provide a serializationStrategy
fun <T> group(groupId: String, traits: T, serializationStrategy: KSerializer<T>)
```
{% endcodeexampletab %}
{% codeexampletab Kotlin %}
```java
analytics.group("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```
{% endcodeexampletab %}
{% codeexampletab Java %}
```java
analytics.group("user-123", Builders.buildJsonObject(o -> {
    o.put("username", "MisterWhiskers")
        .put("email", "hello@test.com")
        .put("plan", "premium");
}));

// or

analytics.group("user-123", new YourJsonSerializable());
```
{% endcodeexampletab %}
{% endcodeexample %}

## Utility methods
The Analytics Kotlin utility methods help you work with plugins from the analytics timeline. They include:
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
val plugin = analytics.find(SomePlugin::class)
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
analytics.flush()
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

## Compatibility
If you use a Java codebase, please refer to the [Java Compatibility docs](https://github.com/segmentio/analytics-kotlin/blob/main/JAVA_COMPAT.md){:target="_blank"} for sample uses.

### Will I still see device-mode integrations listed as `false` in the integrations object?
When you successfully package a plugin in device-mode, you will no longer see the integration listed as `false` in the integrations object for a Segment event. This logic is now packaged in the event metadata, and is not surfaced in the Segment debugger.

## Changelog
[View the Analytics Kotlin changelog on GitHub](https://github.com/segmentio/analytics-kotlin/releases).
