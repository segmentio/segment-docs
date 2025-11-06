---
title: Auto-Instrumentation Setup
---

This guide outlines the steps required to set up the Signals SDK in your Apple OS applications using Swift. 

Learn how to connect an existing source, integrate dependencies, turn on Auto-Instrumentation, and verify that your setup captures and processes data as intended. 

> info "Auto-Instrumentation in public beta"
> Auto-Instrumentation is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

> info "Regional availability"
> Auto-Instrumentation isn't supported in EU workspaces.

## Before you start

You need the `writeKey` from an existing Segment source. To find it:

1. In your Segment workspace, go to **Connections > Sources**.
2. Select your source.
3. From the source's overview tab, go to **Settings > API Keys**.
4. Copy the `writeKey` shown in the code block.

Segment recommends testing in a development environment before deploying Signals in production. For more information, see [Debug mode](#step-3-enable-debug-mode).

## Prerequisites

Auto-Instrumentation (aka Signals) works on top of Analytics. Make sure to add the following dependency to your project if you don't have analytics-swift already.

```swift
dependencies: [
    .package(url: "https://github.com/segmentio/analytics-swift.git", from: "1.9.1")
]
```

## Step 1: Getting started

1. Add AnalyticsLive to your Swift Package dependencies:
    ```swift
    dependencies: [
        .package(url: "https://github.com/segmentio/analytics-live-swift.git", from: "3.2.1")
    ]
    ```

2. Import and initialize with your Analytics instance:
   
> success ""
> See [configuration options](#configuration-options) for a complete list.
> 
    ```swift
    import Segment
    import AnalyticsLive
    
    let analytics = Analytics(configuration: Configuration(writeKey: "YOUR_WRITE_KEY"))
    
    // Add LivePlugins first
    analytics.add(plugin: LivePlugins())
    
    // Add Signals
    analytics.add(plugin: Signals.shared)
    
    // Configure Signals
    Signals.shared.useConfiguration(SignalsConfiguration(
        writeKey: "YOUR_WRITE_KEY", // Same writeKey as Analytics
        useUIKitAutoSignal: true,
        useSwiftUIAutoSignal: true,
        useNetworkAutoSignal: true,
        #if DEBUG
        // NOTE: See section below on using these flags appropriately.
        sendDebugSignalsToSegment: true, // Only true for development
        obfuscateDebugSignals: false // Only false for development
        #endif
        // ... other options
    ))
    ```

3. Set up capture for the UI framework(s) you're using:
     * [Capture SwiftUI Interactions](#swiftui)
     * [Capture UIKit Interactions](#uikit)
     * [Capture Network Activity](#capture-network)


## Step 2: Additional setup

### Capture Interactions

#### SwiftUI

SwiftUI automatic signal capture requires adding typealiases to your code. This is necessary because SwiftUI doesn't provide hooks for automatic instrumentation.

1. Enable SwiftUI auto-signals in your configuration:
    ```swift
    Signals.shared.useConfiguration(SignalsConfiguration(
        writeKey: "YOUR_WRITE_KEY",
        useSwiftUIAutoSignal: true
        // ... other options
    ))
    ```

2. Add the following typealiases to your SwiftUI views or in a shared file:
    ```swift
    import SwiftUI
    import AnalyticsLive
    
    // Navigation
    typealias NavigationLink = SignalNavigationLink
    typealias NavigationStack = SignalNavigationStack // iOS 16+
    
    // Selection & Input Controls
    typealias Button = SignalButton
    typealias TextField = SignalTextField
    typealias SecureField = SignalSecureField
    typealias Picker = SignalPicker
    typealias Toggle = SignalToggle
    typealias Slider = SignalSlider // Not available on tvOS
    typealias Stepper = SignalStepper // Not available on tvOS
    
    // List & Collection Views
    typealias List = SignalList
    ```

3. Use the controls normally in your SwiftUI code:
    ```swift
    struct ContentView: View {
        var body: some View {
            NavigationStack {
                VStack {
                    Button("Click Me") {
                        // Button tap will automatically generate a signal
                    }
                    
                    TextField("Enter text", text: $text)
                    // Text changes will automatically generate signals
                }
            }
        }
    }
    ```

> **Note:** The typealiases replace SwiftUI's native controls with signal-generating versions. Your code remains unchanged, but interactions are now automatically captured.

#### UIKit

UIKit automatic signal capture uses method swizzling and requires no code changes.

1. Enable UIKit auto-signals in your configuration:
    ```swift
    Signals.shared.useConfiguration(SignalsConfiguration(
        writeKey: "YOUR_WRITE_KEY",
        useUIKitAutoSignal: true
        // ... other options
    ))
    ```

2. That's it! The following UIKit interactions and navigation events are automatically captured via method swizzling:

    **Interactions:**
    - `UIButton` taps
    - `UISlider` value changes
    - `UIStepper` value changes
    - `UISwitch` toggle events
    - `UITextField` text changes
    - `UITableViewCell` selections
    
    **Navigation:**
    - `UINavigationController` push/pop operations
    - `UIViewController` modal presentations and dismissals
    - `UITabBarController` tab switches

### Capture Navigation

Navigation capture is handled automatically when you enable SwiftUI or UIKit auto-signals:

- **SwiftUI**: Captured through `SignalNavigationLink` and `SignalNavigationStack` when you add the typealiases
- **UIKit**: Captured automatically via `UINavigationController`, `UIViewController`, and `UITabBarController` swizzling

No additional setup required beyond enabling the appropriate auto-signal flags.

### Capture Network

Network capture automatically tracks URLSession requests and responses.

1. Enable network auto-signals in your configuration:
    ```swift
    Signals.shared.useConfiguration(SignalsConfiguration(
        writeKey: "YOUR_WRITE_KEY",
        useNetworkAutoSignal: true,
        allowedNetworkHosts: ["*"], // Allow all hosts (default)
        blockedNetworkHosts: [] // Block specific hosts (optional)
        // ... other options
    ))
    ```

2. Network requests made via URLSession are automatically captured, including:
   - Request URL, method, headers, and body
   - Response status, headers, and body
   - Request/response correlation via request ID

> **Note:** Third-party networking libraries that use URLSession underneath (like Alamofire) should work automatically. Segment API endpoints are automatically blocked to prevent recursive tracking.

#### Configuring Network Hosts

You can control which network requests are tracked:

```swift
SignalsConfiguration(
    writeKey: "YOUR_WRITE_KEY",
    useNetworkAutoSignal: true,
    allowedNetworkHosts: ["api.myapp.com", "*.example.com"], // Only track these hosts
    blockedNetworkHosts: ["analytics.google.com"] // Exclude these hosts
)
```

- `allowedNetworkHosts`: Array of host patterns to track. Use `"*"` to allow all hosts (default).
- `blockedNetworkHosts`: Array of host patterns to exclude from tracking.

The following hosts are automatically blocked to prevent recursive tracking:
- `api.segment.com`
- `cdn-settings.segment.com`
- `signals.segment.com`
- `api.segment.build`
- `cdn.segment.build`
- `signals.segment.build`

## Step 3: Enable debug mode

By default, Signals stores captured data on the device and doesn't forward it to Segment. This process prevents unnecessary bandwidth use and helps support privacy compliance requirements.

To view captured signals in the Event Builder and create event generation rules, you need to enable `sendDebugSignalsToSegment`. This setting temporarily lets the SDK send signal data to Segment while you're testing.

In addition, the SDK obfuscates signals sent to Segment by default. To view the completed data, you need to turn off `obfuscateDebugSignals`.

> warning ""
> Only enable `sendDebugSignalsToSegment` in development environments. Avoid using `sendDebugSignalsToSegment` in production apps.

You can enable `sendDebugSignalsToSegment` and turn off `obfuscateDebugSignals` in one of three ways.

### Option 1: Use Build Configurations to Toggle Debug Mode
  
  1. Define different configurations in your project settings (Debug, Release, etc.)
  
  2. Use compiler flags to control the setting:
      ```swift
      Signals.shared.useConfiguration(SignalsConfiguration(
          writeKey: "YOUR_WRITE_KEY",
          // ... other config options
          #if DEBUG
          sendDebugSignalsToSegment: true,
          obfuscateDebugSignals: false
          #else
          sendDebugSignalsToSegment: false,
          obfuscateDebugSignals: true
          #endif
      ))
      ```

### Option 2: Use a Feature Flag System
 If you're using Firebase Remote Config or a similar feature flag system, you can dynamically control `sendDebugSignalsToSegment` and `obfuscateDebugSignals` without requiring a new app build:
  ```swift
  let remoteConfig = RemoteConfig.remoteConfig()
  
  Signals.shared.useConfiguration(SignalsConfiguration(
      writeKey: "YOUR_WRITE_KEY",
      // ... other config options
      sendDebugSignalsToSegment: remoteConfig["sendDebugSignalsToSegment"].boolValue,
      obfuscateDebugSignals: remoteConfig["obfuscateDebugSignals"].boolValue
  ))
  ```

### Option 3: Use Environment Variables (for debugging/testing)
 You can check for environment variables or launch arguments during development:
  ```swift
  let isDebugEnabled = ProcessInfo.processInfo.environment["SIGNALS_DEBUG"] != nil
  
  Signals.shared.useConfiguration(SignalsConfiguration(
      writeKey: "YOUR_WRITE_KEY",
      // ... other config options
      sendDebugSignalsToSegment: isDebugEnabled,
      obfuscateDebugSignals: !isDebugEnabled
  ))
  ```

## Step 4: Turn on Auto-Instrumentation in your source

Next, return to the source settings to turn on Auto-Instrumentation:

1. Go to **Connections > Sources**.
2. Select the source you used in Step 1.
3. From the source's overview tab, go to **Settings > Advanced**.
4. Toggle Auto-Instrumention on.

## Step 5: Verify and deploy events

After integrating the SDK and running your app, verify that Segment is collecting signals:

1. In your Segment workspace, go to **Connections > Sources** and select the source you used for Auto-Instrumentation.
2. In the source overview, look for the **Event Builder** tab. If the tab doesn’t appear:
  - Make sure you've installed the SDK correctly.
  - Reach out to your Segment CSM to confirm that your workspace has the necessary feature flags enabled.
3. If `sendDebugSignalsToSegment` is enabled, Signals appear in real time in the Event Builder as you interact with the app.
4. Use the app as a user would: navigate between screens, tap buttons, trigger network requests. Signals appear in real time as you interact with the app.
5. In the Event Builder, find a signal and click **Configure event** to define a new event. After configuring the event, click **Publish event rules**.

## Configuration options

Using the Signals Configuration object, you can control the destination, frequency, and types of signals that Segment automatically tracks within your application. The following table details the configuration options for Signals-Swift.


| OPTION            | REQUIRED | VALUE                     | DESCRIPTION |
|------------------|----------|---------------------------|-------------|
| **writeKey** | Yes | String | Your Segment write key. Should match your Analytics instance writeKey. |
| **maximumBufferSize** | No  | Int                   | The number of signals to be kept for JavaScript inspection. This buffer is first-in, first-out. Default is **1000**. |
| **relayCount** | No  | Int                   | Relays every X signals to Segment. Default is **20**. |
| **relayInterval** | No  | TimeInterval                   | Relays signals to Segment every X seconds. Default is **60**. |
| **broadcasters**  | No      | [SignalBroadcaster]    | An array of broadcasters. These objects forward signal data to their destinations, like **WebhookBroadcaster**, or you could write your own **DebugBroadcaster** that writes logs to the developer console. **SegmentBroadcaster** is always added by the SDK when `sendDebugSignalsToSegment` is true. |
| **sendDebugSignalsToSegment**      | No      | Bool                    | Turns on debug mode and allows the SDK to relay Signals to Segment server. Default is **false**. It should only be set to true for development purposes. |
| **obfuscateDebugSignals**      | No      | Bool                    | Obfuscates signals being relayed to Segment. Default is **true**. |
| **apiHost** | No | String | API host for signal relay. Default is **"signals.segment.io/v1"**. |
| **useUIKitAutoSignal** | No | Bool | Enables automatic UIKit signal capture via method swizzling. Default is **false**. |
| **useSwiftUIAutoSignal** | No | Bool | Enables automatic SwiftUI signal capture (requires typealiases). Default is **false**. |
| **useNetworkAutoSignal** | No | Bool | Enables automatic network signal capture for URLSession. Default is **false**. |
| **allowedNetworkHosts** | No | [String] | Array of host patterns to track. Use `["*"]` for all hosts. Default is **["*"]**. |
| **blockedNetworkHosts** | No | [String] | Array of host patterns to exclude from tracking. Default is **[]**. |

## Next steps

This guide walked you through initial Signals SDK/Auto-Instrumentation setup. Next, read the [Auto-Instrumentation Signals Implementation Guide](/docs/connections/auto-instrumentation/configuration/), which dives deeper into Signals and offers example rules. 
