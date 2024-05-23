---
title: Signals Implementation Guide
hidden: true
---


## Configure Signals



### Swift


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


### Kotlin

| `Option`            | Required | Value                     | Description                                                                                                                                                                                           |
| ------------------- | -------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `writeKey`          | Yes      | String                    | Source write key                                                                                                                                                                                      |
| `maximumBufferSize` | No       | Integer                   | The number of signals to be kept for JavaScript inspection. This buffer is first-in, first-out. Default is `1000`.                                                                                    |
| `broadcastInterval` | No       | Integer                   | Broadcasts signals to Segment every X event. Default is `60`.                                                                                                                                         |
| `broadcasters`      | No       | `List<SignalBroadcaster>` | An array of broadcasters. These objects forward signal data to their destinations, like `WebhookBroadcaster` or `DebugBroadcaster` writing to the developer console. Default is `SegmentBroadcaster`. |


## Converting Signals to events



## Example rule implementations

