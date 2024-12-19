---
title: Auto-Instrumentation Setup
hidden: true
---

This guide outlines the steps required to set up the Signals SDK in your Apple OS applications using Swift. 

You'll learn how to add Auto-Instrumentation sources, integrate dependencies, and ensure that your setup captures and processes data as intended.  

> info "Auto-Instrumentation Pilot"
> Auto-Instrumentation is currently in pilot and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}. Segment doesn't recommend Auto-Instrumentation for use in a production environment, as Segment is actively iterating on and improving the user experience.

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

Next, you'll need to add the Signals SDKs to your Swift applicatiion.

1. Use Swift Package Manager to add the Signals SDK from the following repository:

    ```zsh
    https://github.com/segmentio/Signals-swift.git
    ```

2. Add the initialization code and configuration options:

> success ""
> see [configuration options](#configuration-options) for a complete list.

    ```swift
    // Configure Analytics with your settings
    {... <analytics config>....} 

    // Set up the Signals SDK configuration
    let config = Signals.Configuration(
        writeKey: "<WRITE_KEY>",          // Replace <WRITE_KEY> with the write key you previously copied
        maximumBufferSize: 100,
        useSwiftUIAutoSignal: true,
        useNetworkAutoSignal: true
    )

    // Locate and set the fallback JavaScript file for edge functions
    let fallbackURL = Bundle.main.url(forResource: "MyEdgeFunctions", withExtension: "js")

    // Apply the configuration and add the Signals plugin
    Signals.shared.useConfiguration(config)
    Analytics.main.add(plugin: LivePlugins(fallbackFileURL: fallbackURL))
    Analytics.main.add(plugin: Signals.shared)
    ```

Verify that you replaced `<WRITE_KEY>` with the actual write key you copied in Step 1.

#### SwiftUI projects

If your app is written in SwiftUI, you'll need to add a `TypeAlias.swift` file to your project that captures interaction and navigation Signals, like in this example:

```swift
import Foundation
import Signals

typealias Button = SignalButton
typealias NavigationStack = SignalNavigationStack
typealias NavigationLink = SignalNavigationLink
typealias TextField = SignalTextField
typealias SecureField = SignalSecureField
```
## Step 3: Verify and deploy events

Next, you'll need to verify signal emission and [create rules](/docs/connections/auto-instrumentation/configuration/#example-rule-implementations) to convert those signals into events:

1. In your Segment workspace, return to **Connections > Auto-Instrumentation** and click on the new source you created. 
2. Verify that signals appear as expected on the dashboard.

    ![Signals successfully appearing in the Segment UI](images/autoinstrumentation_signals.png "Signals successfully appearing in the Segment UI")

3. Click **Create Rules**.
4. In the Rules Editor, add a rule that converts signal data into an event.
5. Click **Preview**, then click **Save & Deploy**.

Segment displays `Rule updated successfully` to verify that it saved your rule.

## Configuration Options

Using the Signals Configuration object, you can control the destination, frequency, and types of signals that Segment automatically tracks within your application. The following table details the configuration options for Signals-Swift.

| `Option`               | Required | Value                      | Description                                                                                                                                                                                            |
| ---------------------- | -------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `writeKey`             | Yes      | String                     | Source write key                                                                                                                                                                                       |
| `maximumBufferSize`    | No       | Integer                    | The number of signals to be kept for JavaScript inspection. This buffer is first-in, first-out. Default is `1000`.                                                                                     |
| `relayCount`           | No       | Integer                    | Relays signals to Segment every Xth event. Default is `20`.                                                                                                                                            |
| `relayInterval`        | No       | TimeInterval  | Relays signals to segment every X seconds. Default is `60`.                                                                                                                                            |
| `broadcasters`         | No       | `SignalBroadcaster`        | An array of broadcasters. These objects forward signal data to their destinations, like `WebhookBroadcaster` or  `DebugBroadcaster` writing to the developer console. Default is `SegmentBroadcaster`. |
| `useUIKitAutoSignal`   | No       | Bool                       | Tracks UIKit component interactions automatically. Default is `false`.                                                                                                                                 |
| `useSwiftUIAutoSignal` | No       | Bool                       | Tracks SwiftUI component interactions automatically. Default is `false`.                                                                                                                               |
| `useNetworkAutoSignal` | No       | Bool                       | Tracks network events automatically. Default is `false`.                                                                                                                                               |
| `allowedNetworkHosts`  | No       | Array                      | An array of allowed network hosts.                                                                                                                                                                     |
| `blockedNetworkHosts`  | No       | Array                      | An array of blocked network hosts.                                                                                                                                                

## Next steps

This guide walked you through initial Signals SDK/Auto-Instrumentation setup. Next, read the [Auto-Instrumentation Signals Implementation Guide](/docs/connections/auto-instrumentation/configuration/), which dives deeper into Signals and offers example rules. 
