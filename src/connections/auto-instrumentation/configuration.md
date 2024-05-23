---
title: Signals Implementation Guide
hidden: true
---


## Signals Configuration

Using the Signals Configuration object, you can control the destination, frequency, and types of signals that Segment automatically tracks within your application. The following tables detail the configuration options for both Signals-Swift and Signals-Kotlin.

### Signals-Swift

| `Option`               | Required | Value                      | Description                                                                                                                                                                                            |
| ---------------------- | -------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `writeKey`             | Yes      | String                     | Source write key                                                                                                                                                                                       |
| `maximumBufferSize`    | No       | Integer                    | The number of signals to be kept for JavaScript inspection. This buffer is first-in, first-out. Default is `1000`.                                                                                     |
| `relayCount`           | No       | Integer                    | Relays signals to Segment every Xth event. Default is `20`.                                                                                                                                            |
| `relayInterval`        | No       | TimeInterval (default: 60) | Relays signals to segment every X seconds. Default is `60`.                                                                                                                                            |
| `broadcasters`         | No       | `SignalBroadcaster`        | An array of broadcasters. These objects forward signal data to their destinations, like `WebhookBroadcaster` or  `DebugBroadcaster` writing to the developer console. Default is `SegmentBroadcaster`. |
| `useUIKitAutoSignal`   | No       | Bool                       | Tracks UIKit component interactions automatically. Default is `false`.                                                                                                                                 |
| `useSwiftUIAutoSignal` | No       | Bool                       | Tracks SwiftUI component interactions automatically. Default is `false`.                                                                                                                               |
| `useNetworkAutoSignal` | No       | Bool                       | Tracks network events automatically. Default is `false`.                                                                                                                                               |
| `allowedNetworkHosts`  | No       | [String]                   |                                                                                                                                                                                                        |
| `blockedNetworkHosts`  | No       | [String]                   |                                                                                                                                                                                                        |


### Signals-Kotlin

| `Option`            | Required | Value                     | Description                                                                                                                                                                                           |
| ------------------- | -------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `writeKey`          | Yes      | String                    | Source write key                                                                                                                                                                                      |
| `maximumBufferSize` | No       | Integer                   | The number of signals to be kept for JavaScript inspection. This buffer is first-in, first-out. Default is `1000`.                                                                                    |
| `broadcastInterval` | No       | Integer                   | Broadcasts signals to Segment every X event. Default is `60`.                                                                                                                                         |
| `broadcasters`      | No       | `List<SignalBroadcaster>` | An array of broadcasters. These objects forward signal data to their destinations, like `WebhookBroadcaster` or `DebugBroadcaster` writing to the developer console. Default is `SegmentBroadcaster`. |


## Converting signals to events

After you set up the Signals SDK to capture the signals you want to target, you can create rules in your Segment workspace to translate the captured signals into traditional Segment analytics events. These rules are deployed in your application the next time a user launches your app.

### Getting started with rule creation

1. In your Segment workspace, go to to **Connections > Auto-Instrumentation** and click on a source. 
2. Click **Create Rules**.

### Using the Rules Editor

The Rules Editor is where you define rules that transform raw signal data into analytics events. In the editor, you write functions that convert signals into events and then call them in the `processSignal()` function. 

The Rules Editor also lets you test your rules with recent signals to verify that they produce the data you need before you deploy. 

The following example tracks all Screen events:

```javascript
function screenCall(currentSignal) {
  if (currentSignal.type == SignalType.Navigation && currentSignal.data.action == NavigationAction.Entering) {
    analytics.screen(currentSignal.data.screen, null, null)
  }
}

function processSignal(signal) {
	screenCall(signal)
}
```

## Signal definitions

Signals come in various types, each associated with specific data that you can use to create analytics events. This section contains code samples that detail each signal type. Because Segment has standardized these definitions across both the Signals-Swift and Signals Kotlin libraries, they're useful when you create rules in your Segment workspace.

### Base Signal

The Base Signal serves as the foundation for all other signal types. It's defined by the `RawSignal<T>` interface, where `T` represents the data type associated with the signal.

This interface ensures that every signal inherits essential properties:

```java
interface RawSignal<T> {
    var anonymousId: String    // A unique identifier for the user.
    var type: SignalType       // Specifies the signal category.
    var timestamp: String      // The exact time when the signal was generated.
    var index: Int             // An integer representing the signal's position.
    var data: T                // The specific data of type `T` associated with the signal.
}
```

### Signal Types

The Signal Type enum defines the different types of signals the SDK can collect:

```java
enum SignalType {
    Interaction,      // User interactions like clicks or touches
    Navigation,       // Navigation events.
    Network,          // Network requests and responses.
    LocalData,        // Data loaded from local or other external sources
    Instrumentation,  // Events generated from Segment Track/Screen/... events.
    UserDefined       // Custom events defined by the user.
}
```

### Interaction Signals

The SDK collects Interaction Signals when you enable one of the "UI autoSignal" options, like `useSwiftUIAutoSignal: true`. These signals primarily track user interactions with UI components:

```java
class InteractionData {
    var component: String // The type of UI component interacted with, like "Button" or "Image".
    var title: String?    // Optional title of the component, if applicable.
    var data: Object?     // Additional data related to the interaction, if any.
}

class InteractionSignal extends RawSignal<InteractionData> {
    type = SignalType.UIInteraction // Sets the signal type to UI Interaction.
}
```

### Navigation Signals

The SDK collects Navigation Signals when you enable one of the "UI autoSignal" options, like `useSwiftUIAutoSignal: true`. These signals are generated when a user interacts with navigation components in your application's UI, giving you insight into how users move through and interact with your application:

```java
enum NavigationAction {
    Forward,    // Navigation to the next item or page
    Backward,   // Navigation to the previous item or page
    Modal,      // Opening a modal window
    Entering,   // Entering a new screen 
    Leaving,    // Leaving a screen 
    Page,       // Navigation involving a full page
    Popup       // Interaction with a popup
}

class NavigationData {
    var action: NavigationAction // The type of navigation action performed
    var screen: String           // The screen or component name involved in the navigation.
}

class NavigationSignal extends RawSignal<NavigationData> {
    type = SignalType.Navigation // Sets the signal type to Navigation.
}
```

### Network Signals

The SDK collects Network Signals when you enable the `useNetworkAutoSignal` option in your Signals Configuration, like `useNetworkAutoSignal: true`. These signals are generated when your application makes network requests:

```java
enum NetworkAction {
    Request,  // A network request is made.
    Response  // A response is received.
}

class NetworkData {
    var action: NetworkAction // The type of network action, either Request or Response.
    var url: String           // The URL involved in the network action.
    var statusCode: Int?      // The HTTP status code of the response, if applicable.
    var data: Object?         // Additional data associated with the network action.
}

class NetworkSignal extends RawSignal<NetworkData> {
    type = SignalType.Network // Sets the signal type to Network.
}
```

### LocalData Signals

The SDK collects Local Data Signals when data gets loaded from local soures, like SQLite databases or local caches. These signals help track how your application manages local data:

```java
enum LocalDataAction {
    Loaded,    // Data was loaded from a local source.
    Updated,   // Existing data was updated.
    Saved,     // New data was saved locally.
    Deleted,   // Data was deleted from a local source.
    Undefined  // Any other unspecified local data action.
}

class LocalData {
    var action: LocalDataAction // The type of action performed on the local data.
    var identifier: String      // A unique identifier for the data, like "Loaded User Info".
    var data: Object?           // Additional details or data associated with the action.
}

class LocalDataSignal extends RawSignal<LocalData> {
    type = SignalType.LocalData // Sets the signal type to LocalData.
}
```

### Instrumentation Signals

### User-Defined Signals


## Example rule implementations

