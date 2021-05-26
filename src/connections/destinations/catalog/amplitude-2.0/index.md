---
title: Amplitude 2.0 Destination
hide-boilerplate: true
---

[Amplitude](https://amplitude.com/) is an event tracking and segmentation
platform for your web and mobile apps. By analyzing the actions your users
perform, you can gain a better understanding to drive retention, engagement,
and conversion.


> success ""
> **Good to know**: This page is about the Amplitude Segment destination, which receives data _from_ Segment. There's also a page about the [Amplitude Engage Segment source](/docs/connections/sources/catalog/cloud-apps/amplitude-cohorts/), which sends data _to_ Segment!



{% include components/reference-button.html href="https://segment.com/recipes/amplitude-historical-count-analysis/" icon="media/academy.svg" title="Identify high-value users with Historical Count analysis" description="Examine the exact moment in the customer journey that converts new users into high-value customers." %}


## Connection Modes for Destination 2.0 Amplitude

The Destinations 2.0 version of the Amplitude destination does not offer a device-mode connection mode. However with this new version, you do not need it.

Most previous deployments of the Amplitude Segment destination only used the device-mode connection to get use the `session_id` tracking feature. In the new Destinations 2.0 version of the Amplitude destination, session ID tracking is built in. This means you don’t need to bundle any software to run on the user’s device, or write any code. It also means that you can use more of the Segment platform features on data going to Amplitude, such as Protocols filtering and transformations,  and Personas identity resolution.


> info ""
> If you’re using Analytics.js 2.0, the `session_id` is tracked automatically. On iOS, you’ll need to include a [middleware](/sources/catalog/libraries/mobile/ios/middleware/). Session tracking for Android is coming soon.



## Getting Started

1. Before you start, go to your [Amplitude project settings](https://analytics.amplitude.com/settings/projects), and locate the project that you'll be sending Segment data to. Copy the Amplitude API Key and Secret key for the project.
1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
2. Click the "Amplitude" item to select it and click **Configure**.
3. Choose which of your sources to connect the destination to. (You can connect more sources to the destination later.)
3. On the next page enter your Amplitude API key and Secret key and click **Verify credentials**.
4. Next, choose how to create the mapping. You can click Quick Setup to use the defaults provided by Segment, or click Customized Setup to start from a blank mapping.
