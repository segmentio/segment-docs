---
title: Amplitude Actions Destination
hide-boilerplate: true
hide-dossier: true
hidden: true
---
{% include content/plan-grid.md name="actions" %}


[Amplitude](https://amplitude.com/) is an event tracking and segmentation
platform for your web and mobile apps. By analyzing the actions your users
perform, you can gain a better understanding to drive retention, engagement,
and conversion.

> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Amplitude Segment destination, which receives data _from_ Segment. There's also a page about the [non-Actions Amplitude destination](/docs/connections/destinations/catalog/amplitude/), and the [Amplitude Engage Segment source](/docs/connections/sources/catalog/cloud-apps/amplitude-cohorts/), which sends data _to_ Segment!


## Connection Modes for Amplitude Actions destination

The Amplitude (actions) destination does not offer a device-mode connection mode. However if you are using one of Segment's new libraries ([Analytics.js 2.0](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/), [Swift](https://github.com/segmentio/analytics-swift) or [Kotlin](https://github.com/segmentio/analytics-kotlin)) with the Actions-framework version of the destination, you do not need the device-mode connection.

Most previous deployments of the Amplitude Segment destination only used the device-mode connection to get use the `session_id` tracking feature. In the new Actions-framework Amplitude destination, session ID tracking is built in. This means you don’t need to bundle any software to run on the user’s device, or write any code. It also means that you can use more of the Segment platform features on data going to Amplitude, such as Protocols filtering and transformations, and Personas identity resolution.


Session tracking is only available when using Segment's new libraries: [Analytics.js 2.0](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/), [Swift](https://github.com/segmentio/analytics-swift) or [Kotlin](https://github.com/segmentio/analytics-kotlin)



## Getting Started

1. Before you start, go to your [Amplitude project settings](https://analytics.amplitude.com/settings/projects), and locate the project that you'll be sending Segment data to. Copy the Amplitude API Key and Secret key for the project.
1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
2. Click the "Amplitude" item to select it and click **Configure**.
3. Choose which of your sources to connect the destination to. (You can connect more sources to the destination later.)
3. On the next page enter your Amplitude API key and Secret key and click **Verify credentials**.
4. Next, choose how to create the mapping. You can click Quick Setup to use the defaults provided by Segment, or click Customized Setup to start from a blank mapping.

Once you have a mapping, you can follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).


### Enable session tracking for Analytics.js 2.0

The session tracking is automatically enabled on Javascript sources.


### Enable session tracking for Swift

To enable session tracking in Amplitude when using the [Segment Swift library](https://github.com/segmentio/analytics-swift):
1. Enable `trackApplicationLifecycleEvents` in your configuration.
2. Add the [Amplitude Session plugin](https://github.com/segmentio/analytics-swift/blob/main/Examples/destination_plugins/AmplitudeSession.swift
) to your project.
3. Initialize the plugin ([example](https://github.com/segmentio/analytics-swift/blob/main/Examples/apps/DestinationsExample/DestinationsExample/AppDelegate.swift))
   ```swift
   analytics?.add(plugin: AmplitudeSession(name: "Amplitude"))
   ```

### Enable session tracking for Kotlin

To enable session tracking in Amplitude when using the [Segment Kotlin library](https://github.com/segmentio/analytics-kotlin):
1. Enable `trackApplicationLifecycleEvents` in your configuration.
2. Add the [Amplitude Session plugin](https://github.com/segmentio/analytics-kotlin/blob/main/samples/kotlin-android-app-destinations/src/main/java/com/segment/analytics/destinations/plugins/AmplitudeSession.kt) to your project.
2. Initialize the plugin
   ```kotlin
   analytics.add(AmplitudeSession())
   ```
