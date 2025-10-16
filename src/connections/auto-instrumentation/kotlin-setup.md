---
title: Auto-Instrumentation Setup
hidden: true
---

Segment’s Signals library powers [Auto-Instrumentation](/docs/connections/auto-instrumentation/) in Android apps, capturing user interactions and behavior without manual event tracking.

This guide shows how to install and configure the library, as well as how to enable optional plugins for screen views, network activity, and more.

> info "Auto-Instrumentation in public beta"
> Auto-Instrumentation is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

> info "Regional availability"
> Auto-Instrumentation isn't supported in EU workspaces.

## Before you start

To use Signals with Android, you need:

- An active Segment workspace with Auto-Instrumentation enabled.
- A Kotlin-based Android project.
- Android Gradle Plugin version 7.0 or later.
- A minimum compile SDK version of 21.

Signals supports [Jetpack Compose](https://developer.android.com/compose){:target="_blank"} and traditional Android UI frameworks. It also includes optional plugins for network tracking using [OkHttp3](https://square.github.io/okhttp/){:target="_blank"}, [Retrofit](https://square.github.io/retrofit/){:target="_blank"}, or [HttpURLConnection](https://developer.android.com/reference/java/net/HttpURLConnection){:target="_blank"}.

Segment recommends testing in a development environment before deploying Signals in production. For more information, see [Debug mode](#step-4-enable-debug-mode).

## Step 1: Install dependencies

To install Signals, add the following dependencies to your app-level Gradle build file.

```groovy
dependencies {
  // Core Analytics Kotlin library
  implementation("com.segment.analytics.kotlin:android:1.19.1")

  // Live plugin for real-time analytics
  implementation("com.segment.analytics.kotlin:analytics-kotlin-live:1.1.0")

  // Signals core library
  implementation("com.segment.analytics.kotlin.signals:core:0.5.0")

  // Optional: Jetpack Compose UI tracking
  implementation("com.segment.analytics.kotlin.signals:compose:0.5.0")

  // Optional: OkHttp3 network request tracking
  implementation("com.segment.analytics.kotlin.signals:okhttp3:0.5.0")

  // Optional: Screen and route tracking for Navigation components
  implementation("com.segment.analytics.kotlin.signals:navigation:0.5.0")

  // Optional: HttpURLConnection tracking
  implementation("com.segment.analytics.kotlin.signals:java-net:0.5.0")
}
```

The core libraries are required to enable Signals and real-time analytics. Use the following optional plugins to track additional activity based on your app's architecture:

- **Compose**: Tracks user interface events in Jetpack Compose.
- **OkHttp3**: Captures requests sent through OkHttp3 or Retrofit.
- **Navigation**: Tracks route changes when using Jetpack Navigation.
- **JavaNet**: Tracks network activity sent through `HttpURLConnection`.

Only add the plugins you plan to use. You can add or remove them later without reinitializing your source.

## Step 2: Initialize the SDK

After you add dependencies, you need to initialize the Analytics client and configure the Signals plugin. 

Start by creating the `Analytics` instance using your source's write key. Then add the Signals plugin and configure its settings separately.

```kotlin
// Create the Analytics instance with your configuration
val analytics = Analytics(Configuration(writeKey = "<WRITE_KEY>"))

// Add the live plugin for real-time event handling
analytics.add(LivePlugins())

// Add the Signals plugin
analytics.add(Signals)

// Configure Signals settings
Signals.configuration = Configuration(
  maximumBufferSize = 1000, // Number of signals to keep in memory
  broadcastInterval = 60, // Send signals every 60 seconds
  broadcasters = listOf(WebhookBroadcaster("YOUR_WEBHOOK")), // Optional
  debugMode = true // For development use only
)

// Optional: Add the Compose plugin to track UI events and interactions
analytics.add(SignalsComposeTrackingPlugin())

// Optional: Track screen transitions using Navigation
analytics.add(SignalsActivityTrackingPlugin())
navController.turnOnScreenTracking()
```

When you run this code, keep the following in mind:

- You need to replace `<WRITE_KEY>` with the key from your Android Source in Segment.
- `debugMode` sends signals to Segment for use in the Event Builder. Only enable it in development environments.
- If your app doesn't use Jetpack Compose or Navigation, you can skip those plugin lines.

For more options, see [Configuration options reference](#configuration-options).

## Step 3: Track network requests

Signals supports automatic tracking of network activity for apps that use OkHttp3, Retrofit, or `HttpURLConnection`.

Add the relevant plugin based on your network stack.

### OkHttp3

1. Add the dependency to your Gradle file:

    ```groovy
    implementation("com.segment.analytics.kotlin.signals:okhttp3:0.5.0")
    ```

2. Add the tracking plugin to your `OkHttpClient`:

    ```kotlin
    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(SignalsOkHttp3TrackingPlugin())
        .build()
    ```

### Retrofit

Retrofit is built on top of OkHttp, so the setup is similar.

1. Add the same OkHttp3 plugin shown in the previous sectiion:

    ```groovy
    implementation("com.segment.analytics.kotlin.signals:okhttp3:0.5.0")
    ```

2. Attach the plugin through your Retrofit client configuration:

    ```kotlin
    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(SignalsOkHttp3TrackingPlugin())
        .build()

    val retrofit = Retrofit.Builder()
        .client(okHttpClient)
        .baseUrl("https://your.api.endpoint")
        .build()
    ```

### HttpURLConnection

1. Add the JavaNet plugin dependency:

    ```groovy
    implementation("com.segment.analytics.kotlin.signals:java-net:0.5.0")
    ```

2. Install the plugin at runtime:

    ```kotlin
    JavaNetTrackingPlugin.install()
    ```

Depending on your app’s network stack, you may only need one plugin. If your app uses multiple clients, you can install more than one plugin.

## Step 4: Enable debug mode

By default, Signals stores captured data on the device and doesn't forward it to Segment. This process prevents unnecessary bandwidth use and helps support privacy compliance requirements.

To view captured signals in the Event Builder and create event generation rules, you need to enable `debugMode`. This setting temporarily lets the SDK send signal data to Segment while you're testing.

> warning ""
> Only enable `debugMode` in development environments. Avoid using `debugMode` in production apps.

You can enable `debugMode` in one of two ways.

### Option 1: Use build flavors

Configure `debugMode` at build time using [Android product flavors](https://developer.android.com/build/build-variants#product-flavors){:target="_blank"}.

1. In your `build.gradle` file, define two flavors:

    ```groovy
    android {
      ...
      productFlavors {
        prod {
          buildConfigField "boolean", "DEBUG_MODE", "false"
        }
        dev {
          buildConfigField "boolean", "DEBUG_MODE", "true"
        }
      }
    }
    ```

2. Update the Signals configuration to use the flag:

    ```kotlin
    Signals.configuration = Configuration(
      ...
      debugMode = BuildConfig.DEBUG_MODE
    )
    ```

### Option 2: Use a feature flag

If your app uses [Firebase Remote Config](https://firebase.google.com/docs/remote-config){:target="_blank"} or a similar system, you can control `debugMode` remotely.

```kotlin
Signals.configuration = Configuration(
  ...
  debugMode = remoteConfig.getBoolean("debug_mode")
)
```

## Step 5: Verify event collection

After you build and run your app, use the [Event Builder](/docs/connections/auto-instrumentation/event-builder/) to confirm that Signals are being collected correctly.

1. In your Segment workspace, go to **Connections > Sources** and select the Android Source you configured.
2. Open the **Event Builder** tab.
3. Interact with your app on a simulator or test device:
   - Navigate between screens.
   - Tap buttons and UI elements.
   - Trigger network requests.

If `debugMode` is enabled, Signals appear in real time as you interact with the app.

4. In the Event Builder, select a signal and click **Configure event** to define a new event.
5. After you add any event mappings, click **Publish event rules** to save them.

> info "What if I don't see the Event Builder tab?"
> If you don't see the Event Builder tab, confirm that the SDK is installed correctly and make sure `debugMode` is enabled. Verify that Auto-Instrumentation is enabled in **Settings > Advanced**. If you still don't see it, reach out to your CSM.

## Configuration options

Use the `Signals.configuration` object to control how captured signals are stored, relayed, and displayed.

The following table lists the available options:

| Option              | Required | Type                      | Default | Description                                                                                                                                                                                         |
| ------------------- | -------- | ------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maximumBufferSize` | No       | `Int`                     | `1000`  | The number of captured signals to keep in memory before relaying them. Signals get stored in a first-in, first-out buffer.                                                                          |
| `broadcastInterval` | No       | `Int` (seconds)           | `60`    | The interval, in seconds, at which buffered signals are sent to broadcasters.                                                                                                                       |
| `broadcasters`      | No       | `List<SignalBroadcaster>` | N/A     | A list of broadcasters that forward signal data to external destinations. `SegmentBroadcaster` is included by default, and you can add others like `WebhookBroadcaster` or a custom implementation. |
| `debugMode`         | No       | `Boolean`                 | `false` | When `true`, relays signals to Segment so they appear in the Event Builder. Only enable this in development environments.                                                                           |

## Next steps

After you've confirmed that signals show up in the Event Builder, use the [Generate Events from Signals](/docs/connections/auto-instrumentation/configuration/) guide to configure how signals get translated into analytics events.
