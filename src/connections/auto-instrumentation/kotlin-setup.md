---
title: Auto-Instrumentation Setup
hidden: true
---

This guide outlines the steps required to set up the Signals SDK in your Android OS applications using Kotlin.

You'll learn how to add Auto-Instrumentation sources, integrate dependencies, and ensure that your setup captures and processes data as intended.  

> info "Auto-Instrumentation Pilot"
> Auto-Instrumentation is currently in pilot and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}. Segment is actively iterating on and improving the Auto-Instrumentation user experience.

> success "Enable Auto-Instrumentation"
> To enable Auto-Instrumentation in your Segment workspace, reach out to your dedicated account manager.

## Step 1: Add a source and get its write key

You'll first need to add a source and copy its write key: 

1. In your Segment workspace, navigate to **Connections > Auto-Instrumentation** and click **Add source**.
2. Select a source, give the source a name, and click **Save**.
3. Return to **Connections > Sources** to view your sources. 
4. In the **My sources** table, find and click the new source you just set up.
5. In the **Initialize the Client** section, look for and copy the `writeKey` displayed in the code block. 

## Step 2: Add dependencies and initialization code

Next, you'll need to add the Signals SDKs to your Kotlin application.

1. Update your module’s Gradle build file to add the right dependencies:

    ```kotlin
    dependencies {
        // Add the Analytics Kotlin library
        implementation("com.segment.analytics.kotlin:android:1.15.0")
        // Add a live plugin for real-time data handling
        implementation("com.segment.analytics.kotlin:analytics-kotlin-live:1.0.0")
        // Add the core Signals library
        implementation("com.segment.analytics.kotlin.signals:core:0.0.1")
        // Compose plugin for Jetpack Compose UI tracking
        implementation("com.segment.analytics.kotlin.signals:compose:0.0.1")
        // OkHttp3 plugin for network activity tracking
        implementation("com.segment.analytics.kotlin.signals:okhttp3:0.0.1")
    }
    ```

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
