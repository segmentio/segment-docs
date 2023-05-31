---
title: 'Analytics for Kotlin (Android)'
strat: kotlin-android
redirect_from:
  - '/connections/sources/catalog/cloud-apps/kotlin/'
id: dZeHygTSD4
tags:
  - android
  - kotlin
  - android-kotlin
---
With Analytics Kotlin, you can send data using Kotlin and Java applications to any analytics or marketing tool without having to learn, test, or implement a new API every time. Analytics Kotlin enables you to process and track the history of a payload, while Segment controls the API and prevents unintended operations.

> success ""
> You can choose to set up your **Analytics Kotlin** source on [mobile](/docs/connections/sources/catalog/libraries/mobile/kotlin-android) or on the [server](/docs/connections/sources/catalog/libraries/server/kotlin). Segment doesn't support device-mode destinations on the server-side.

> warning ""
> If you're migrating to Analytics Kotlin from a different mobile library, you can skip to the [migration guide](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/migration/).

## Benefits of Analytics Kotlin

Analytics Kotlin provides several key benefits including improvements in stability, performance, and developer experience when compared to Analytics Android (Classic). 

### Stability
Analytics Kotlin uses thread-safety strategies to isolate Plugins, Device-Mode Destinations, and custom Middleware from the host app. By isolating these features from the host app we can protect the host app from any potential problems including Exceptions that would otherwise terminate the host app.

### Performance

Analytics Kotlin is a huge leap forward in terms of performance when compared to Analytics Android (Classic). For a more detailed overview, you can reference our [blog post](https://segment.com/blog/sdk-performance-improvements/). 

- Faster event processing and deliver
- Significantly lower CPU usage
- Small memory & disk usage footprint

### Developer Experience

Analytics Kotlin adds several improvements to the overall experience of using the core SDK, as well as improvements to the overall [Plugin Architecture](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-plugin-architecture)

- Ability to use Type Safe data structures rather than just dictionaries.
- Simpler syntax and more developer friendly overall.
- More customization options than ever before.

### Device Mode Transformations & Filtering
For the first time ever, developers can filter and transform their users’ events even before the events leave the mobile device. What’s more, these Filters & transformations can be applied dynamically (either via the Segment Dashboard, or via Javascript uploaded to the workspace) and do not require any app updates!

Learn more about [Destination Filters](https://github.com/segmentio/DestinationFilters-kotlin){:target="_blank"} on Mobile, and [Edge Functions](https://github.com/segmentio/EdgeFn-kotlin){:target="_blank"} on Mobile. 


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

3. Initialize and configure the client. Segment recommends you to install the    client in your application subclass.

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

    If you're on a version prior to `1.10.4`, the SDK internally uses a number of Java 8 language APIs through desugaring, which requires you to either [enable desugaring](https://developer.android.com/studio/write/java8-support#library-desugaring), have a minimum API level of 26, or upgrade to the latest version. If you're on version `1.10.4` and above, you don't need desugaring. 

> info ""
> You'll find configuration options such as IDFA collection and automatic screen tracking in Segment’s [Plugin Examples repository](https://github.com/segmentio/analytics-kotlin/tree/main/samples/kotlin-android-app/src/main/java/com/segment/analytics/next/plugins){:target="_blank"}.

## Tracking methods

Once you've installed the mobile or server Analytics Kotlin library, you can start collecting data through Segment's tracking methods:
- [Track](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/implementation/#track)
- [Identify](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/implementation/#identify)
- [Screen](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/implementation/#screen)
- [Group](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/implementation/#group)
- [Alias](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/implementation/#alias)

> info ""
> For any of the different methods described, you can replace the properties and traits in the code samples with variables that represent the data collected.

### Destinations
Destinations are the business tools or apps that Segment forwards your data to. Adding Destinations allow you to act on your data and learn more about your customers in real time.

<br>Segment offers support for two different types of Destinations, learn more about the differences between the two [here]().


<div class="double">
  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/kotlin-android/cloud-mode-destinations"
    icon="destinations-catalog/cloud-apps.svg"
    title="Cloud-mode Destinations"
    description="Destinations that can be enabled from your Segment workspace and require no additional app setup."
    newtab="false"
  %}

  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/kotlin-android/destination-plugins"
    icon="destinations-catalog/mobile.svg"
    title="Device-mode Destinations"
    description="Destinations that require additional app setup, and limit certain Segment functionality."
    newtab="false"
  %}
</div>

## Tools and extensions

Analytics for Kotlin is built with extensibility in mind. Use the tools list below to improve data collection.

- [Plugin architecture](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-plugin-architecture)
- [Typewriter](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-typewriter)
- [Destination filters](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-destination-filters)
- [Code samples](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-samples)
- [Frequently Asked Questions](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-faq)

> warning ""
> If you are using the Analytics Android (Classic) SDK, you can find [the documentation here](/docs/connections/sources/catalog/libraries/mobile/android). Many of the features available in the Analytics Kotlin SDK are not available in the Analytics Android (Classic) SDK. 
