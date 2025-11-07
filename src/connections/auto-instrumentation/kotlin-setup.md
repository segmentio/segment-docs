---
title: Auto-Instrumentation Setup
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
- Android Gradle Plugin version 7.0 or later.
- A minimum compile SDK version of 21.

Signals supports [Jetpack Compose](https://developer.android.com/compose){:target="_blank"} and traditional Android UI frameworks. It also includes optional plugins for network tracking using [OkHttp3](https://square.github.io/okhttp/){:target="_blank"}, [Retrofit](https://square.github.io/retrofit/){:target="_blank"}, or [HttpURLConnection](https://developer.android.com/reference/java/net/HttpURLConnection){:target="_blank"}.

Segment recommends testing in a development environment before deploying Signals in production. For more information, see [Debug mode](#step-3-enable-debug-mode).

## Prerequisites

Auto-Instrumentation (also known as Signals) works on top of Analytics and Live Plugins. Make sure to add the following dependencies to your module's Gradle file if you don't have them already.

```groovy
// analytics kotlin 
implementation ("com.segment.analytics.kotlin:android:1.22.0")
// live plugin 
implementation("com.segment.analytics.kotlin:analytics-kotlin-live:1.3.0")
```

## Step 1: Getting started

To get started:
1. Add Signals Core:
    ```groovy
    // signal core   
    implementation ("com.segment.analytics.kotlin.signals:core:1.0.0")
    ```
2. Initialize Signals. For a complete list, see [configuration options](#configuration-options).
  ```kotlin
    //... <analytics config>....
    analytics.add(LivePlugins()) // Make sure LivePlugins is added
    analytics.add(Signals)  // Add the signals plugin
  
    Signals.configuration = Configuration(
      // sendDebugSignalsToSegment will relay events to Segment server. Should only be true for development purposes.
      sendDebugSignalsToSegment = true
      // obfuscateDebugSignals will obfuscate sensitive data
      obfuscateDebugSignals = true
      // .. other options
    )
  ```
3. Add proper dependency and plugin as needed to: 
     * [Capture interactions](#capture-interactions).
     * [Capture navigation](#capture-navigation).
     * [Capture network](#capture-network).

## Step 2: Additional setup

### Capture interactions

#### Kotlin Compose

1. Add the dependency to your module’s Gradle build file:
    ```groovy
    implementation ("com.segment.analytics.kotlin.signals:compose:1.0.0")
    ```

2. Add `SignalsComposeTrackingPlugin` to analytics:
    ```kotlin
    analytics.add(SignalsComposeTrackingPlugin())
    ```

#### Legacy XML UI

1. Add the uitoolkit Gradle Plugin dependency to project-level `build.gradle`:
    ```groovy
    buildscript {
        dependencies {
            classpath 'com.segment.analytics.kotlin.signals:uitoolkit-gradle-plugin:1.0.0'
        }
    }
    ```
2. Apply the plugin in your app-level `build.gradle` and add the dependency:
    ```groovy
    plugins {
        // ...other plugins
        id 'com.segment.analytics.kotlin.signals.uitoolkit-tracking'
    }
    
    dependencies {
      // ..other dependencies
      implementation ("com.segment.analytics.kotlin.signals:uitoolkit:1.0.0")
    }
    ```


### Capture navigation

1. Add the navigation Gradle Plugin dependency to project-level `build.gradle`:
    ```groovy
    buildscript {
        dependencies {
            classpath 'com.segment.analytics.kotlin.signals:navigation-gradle-plugin:1.0.0'
        }
    }
    ```
2. Apply the plugin in your app-level `build.gradle` and add the dependency:
    ```groovy
    plugins {
        // ...other plugins
        id 'com.segment.analytics.kotlin.signals.navigation-tracking'
    }
    
    dependencies {
      // ..other dependencies
      implementation ("com.segment.analytics.kotlin.signals:navigation:1.0.0")
    }
    ```
3. (**Optional**): Add `SignalsActivityTrackingPlugin` to analytics to track Activity/Fragment navigation. **This is not required for Compose Navigation**.  
    ```kotlin
    analytics.add(SignalsActivityTrackingPlugin())
    ```

### Capture network

#### OkHttp
  
1. Add the dependency:
    ```groovy
    implementation ("com.segment.analytics.kotlin.signals:okhttp3:1.0.0")
    ```

2. Add `SignalsOkHttp3TrackingPlugin` as an interceptor to your OkHttpClient:
    ```kotlin
       private val okHttpClient = OkHttpClient.Builder()
           .addInterceptor(SignalsOkHttp3TrackingPlugin())
           .build()
    ```

#### Retrofit

1. Add the dependency:
    ```groovy
    implementation ("com.segment.analytics.kotlin.signals:okhttp3:1.0.0")
    ```

2. Add `SignalsOkHttp3TrackingPlugin` as an interceptor to your Retrofit client:
    ```kotlin
       private val okHttpClient = OkHttpClient.Builder()
           .addInterceptor(SignalsOkHttp3TrackingPlugin())
           .build()
       
       val retrofit = Retrofit.Builder()
           .client(okHttpClient)
           .build()
    ```

#### java.net.HttpURLConnection
 1. Add the dependency:
     ```groovy
     implementation ("com.segment.analytics.kotlin.signals:java-net:1.0.0")
     ```
 
 2. Install the `JavaNetTrackingPlugin` on where you initialize analytics:
     ```kotlin
         JavaNetTrackingPlugin.install()
     ```


## Step 3: Enable debug mode

By default, Signals stores captured data on the device and doesn't forward it to Segment. This process prevents unnecessary bandwidth use and helps support privacy compliance requirements.

To view captured signals in the Event Builder and create event generation rules, enable `sendDebugSignalsToSegment`. This setting temporarily lets the SDK send signal data to Segment while you're testing.

In addition, the SDK obfuscates signals sent to Segment by default. To view the completed data, you need to turn off `obfuscateDebugSignals`.

> warning ""
> Only enable `sendDebugSignalsToSegment` in development environments. Avoid using `sendDebugSignalsToSegment` in production apps.

You can enable `sendDebugSignalsToSegment` and turn off `obfuscateDebugSignals` in one of two ways.

### Option 1: Use build flavors

Configure `sendDebugSignalsToSegment` and `obfuscateDebugSignals` at build time using [Android product flavors](https://developer.android.com/build/build-variants#product-flavors){:target="_blank"}.

1. In your `build.gradle` file, define two flavors:

    ```groovy
    android {
      ...
      productFlavors {
        prod {
          buildConfigField "boolean", "SEND_DEBUG_SIGNALS_TO_SEGMENT", "false"
          buildConfigField "boolean", "OBFUSCATE_DEBUG_SIGNALS", "true"
        }
        dev {
          buildConfigField "boolean", "SEND_DEBUG_SIGNALS_TO_SEGMENT", "true"
          buildConfigField "boolean", "OBFUSCATE_DEBUG_SIGNALS", "false"
        }
      }
    }
    ```

2. Update the Signals configuration to use the flag:

    ```kotlin
    Signals.configuration = Configuration(
      // ... other config options
      sendDebugSignalsToSegment = BuildConfig.SEND_DEBUG_SIGNALS_TO_SEGMENT
      obfuscateDebugSignals = BuildConfig.OBFUSCATE_DEBUG_SIGNALS
    )
    ```

### Option 2: Use a feature flag

If your app uses [Firebase Remote Config](https://firebase.google.com/docs/remote-config){:target="_blank"} or a similar system, you can control `sendDebugSignalsToSegment` and `obfuscateDebugSignals` remotely.

```kotlin
Signals.configuration = Configuration(
  ...
  sendDebugSignalsToSegment = remoteConfig.getBoolean("sendDebugSignalsToSegment")
  obfuscateDebugSignals = remoteConfig.getBoolean("obfuscateDebugSignals")
)
```

## Step 4: Turn on Auto-Instrumentation in your source

Next, return to the source settings to turn on Auto-Instrumentation:

1. Go to **Connections > Sources**.
2. Select the source you used in [Step 1](#Step-1-Getting-started).
3. From the source's overview tab, go to **Settings > Advanced**.
4. Toggle Auto-Instrumention on.

## Step 5: Verify event collection

After you build and run your app, use the [Event Builder](/docs/connections/auto-instrumentation/event-builder/) to confirm that Signals are being collected correctly.

1. In your Segment workspace, go to **Connections > Sources** and select the Android Source you configured.
2. Open the **Event Builder** tab.
3. Interact with your app on a simulator or test device: 
    > - Navigate between screens. 
    > - Tap buttons and UI elements. 
    > - Trigger network requests.
    >
  > If `sendDebugSignalsToSegment` is enabled, Signals appear in real time as you interact with the app.
4. In the Event Builder, select a signal and click **Configure event** to define a new event.
5. After you add any event mappings, click **Publish event rules** to save them.

> info "What if I don't see the Event Builder tab?"
> If you don't see the Event Builder tab, confirm that the SDK is installed correctly and make sure `sendDebugSignalsToSegment` is enabled. Verify that Auto-Instrumentation is enabled in **Settings > Advanced**. If you still don't see it, reach out to your CSM.

## Configuration options

Use the `Signals.configuration` object to control how captured signals are stored, relayed, and displayed.

The following table lists the available options:

| OPTION            | REQUIRED | VALUE                     | DESCRIPTION |
|------------------|----------|---------------------------|-------------|
| **maximumBufferSize** | No  | Integer                   | The number of signals to be kept for JavaScript inspection. This buffer is first-in, first-out. Default is **1000**. |
| **relayCount** | No  | Integer                   | Relays every X signals to Segment. Default is **20**. |
| **relayInterval** | No  | Integer                   | Relays signals to Segment every X seconds. Default is **60**. |
| **broadcasters**  | No      | List<SignalBroadcaster>    | An array of broadcasters. These objects forward signal data to their destinations, like **WebhookBroadcaster**, or you could write your own **DebugBroadcaster** that writes logs to the developer console. **SegmentBroadcaster** is always added by the SDK. |
| **sendDebugSignalsToSegment**      | No      | Boolean                    | Turns on debug mode and allows the SDK to relay Signals to Segment server. Default is **false**. It should only be set to true for development purposes. |
| **obfuscateDebugSignals**      | No      | Boolean                    | Obfuscates signals being relayed to Segment. Default is **true**. |

## Next steps

After you've confirmed that signals show up in the Event Builder, use the [Generate Events from Signals](/docs/connections/auto-instrumentation/configuration/) guide to configure how signals get translated into analytics events.
