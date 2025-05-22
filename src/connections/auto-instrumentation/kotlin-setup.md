---
title: Auto-Instrumentation Setup
hidden: true
---

This guide explains how to set up Auto-Instrumentation for Android apps using Segment’s Signals library. 

This page covers the installation steps, configuration options, and how to use optional plugins to extend tracking.

> info "Auto-Instrumentation Private Beta"
> Auto-Instrumentation is currently in Private Beta and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}. Segment is actively iterating on and improving the Auto-Instrumentation user experience.

> success "Enable Auto-Instrumentation"
> To enable Auto-Instrumentation in your Segment workspace, reach out to your dedicated account manager.

## Before you begin

To use Signals with Android, you need:

- An active Segment workspace with auto-instrumentation enabled
- A Kotlin-based Android project
- Android Gradle Plugin version 7.0 or later
- A minimum compile SDK version of 21

Signals supports [Jetpack Compose](https://developer.android.com/compose){:target="_blank"} and traditional Android UI frameworks. It also includes optional plugins for network tracking using [OkHttp3](https://square.github.io/okhttp/){:target="_blank"}, [Retrofit](https://square.github.io/retrofit/){:target="_blank"}, or `HttpURLConnection`.

Segment recommends testing in a development environment before deploying Signals in production. For more information, see [Debug mode](#debug-mode).

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

The core libraries are required to enable Signals and real-time analytics. Use the optional plugins to track additional activity based on your app's architecture:

- Compose plugin, which tracks user interface events in Jetpack Compose.
- OkHttp3 plugin, which captures requests sent through OkHttp3 or Retrofit.
- Navigation plugin, which tracks route changes when using Jetpack Navigation.
- JavaNet plugin, which tracks network activity sent through `HttpURLConnection`.

Only add the plugins you plan to use. You can add or remove them later without reinitializing your source.

## Step 2: Initialize the SDK

After you add dependencies, you'll need to initialize the Analytics client and configure the Signals plugin. 

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

- You'll need to replace <WRITE_KEY> with the key from your Android Source in Segment.
- `debugMode` sends signals to Segment for use in the Event Builder. Only enable it in development environments.
- If your app doesn't use Jetpack Compose or Navigation, you can skip those plugin lines.

For more options, see [Configuration options reference].

<!-->
2. Add the initialization code and configuration options:

> success ""
> see [configuration options](#configuration-options) for a complete list.

    ```kotlin
    // Configure Analytics with your settings
    {... <analytics config>....} 

    // Add live plugins for real-time analytics
    analytics.add(LivePlugins())

    // Configure and add the Signals plugin
    Signals.configuration = Configuration(
        writeKey = "<WRITE_KEY>",  // Replace <WRITE_KEY> with the write key you previously copied
        maximumBufferSize = 1000,
        broadcasters = listOf(SegmentBroadcaster(analytics))
    )

    // Add the Compose plugin for UI events and screen tracking
    analytics.add(SignalsComposeTrackingPlugin())
    ```

3. (Optional:) If you want to track network activity, configure your OkHttpClient to use the Signals OkHttp3 plugin:

    ```kotlin
    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(SignalsOkHttp3TrackingPlugin())
        .build()
    ```

4. Build and run your app.

## Step 3: Verify and deploy events

After integrating the SDK and running your app, verify that Segment is collecting signals:

1. In your Segment workspace, go to **Connections > Sources** and select the source you created for Auto-Instrumentation.
2. In the source overview, look for the **Event Builder** tab. If the tab doesn’t appear:
  - Make sure you've installed the SDK correctly.
  - Reach out to your Segment CSM to confirm that your workspace has the necessary feature flags enabled.
3. Launch your app [in debug mode](https://github.com/segmentio/analytics-next/tree/master/packages/signals/signals#sending-and-viewing-signals-on-segmentcom-debug-mode){:target="_blank"}, for example, by running the app from Android Studio on a simulator or test device. This enables signal collection so you can see activity in the Event Builder.
4. Use the app as a user would: navigate between screens, tap buttons, trigger network requests. Signals appear in real time as you interact with the app.
5. In the Event Builder, find a signal and click **Configure event** to define a new event. After configuring the event, click **Publish event rules**.

## Configuration Options

Using the Signals Configuration object, you can control the destination, frequency, and types of signals that Segment automatically tracks within your application. The following table details the configuration options for Signals-Kotlin.

| `Option`            | Required | Value                     | Description                                                                                                                                                                                           |
| ------------------- | -------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `writeKey`          | Yes      | String                    | Source write key                                                                                                                                                                                      |
| `maximumBufferSize` | No       | Integer                   | The number of signals to be kept for JavaScript inspection. This buffer is first-in, first-out. Default is `1000`.                                                                                    |
| `broadcastInterval` | No       | Integer                   | Broadcasts signals to Segment every X event. Default is `60`.                                                                                                                                         |
| `broadcasters`      | No       | `List<SignalBroadcaster>` | An array of broadcasters. These objects forward signal data to their destinations, like `WebhookBroadcaster` or `DebugBroadcaster` writing to the developer console. Default is `SegmentBroadcaster`. |


## Next steps

This guide walked you through initial Signals SDK/Auto-Instrumentation setup. Next, read the [Auto-Instrumentation Signals Implementation Guide](/docs/connections/auto-instrumentation/configuration/), which dives deeper into Signals and offers example rules. 
