---
title: Factual Engine Mobile SDK Source
beta: true
source-type: event
id: n8YgCndi75
---
{% include content/source-region-unsupported.md %}

## How Engine Works
Installing the Engine SDK in your app enables you to gather and analyze information about your users' location. Engine caches the relevant portion of Factual's Global Places data on the device to determine where the user is, beyond raw location. Engine needs device location data in order to work and will use whatever location permissions your app has authorized. You can also set custom rules to trigger "actions" like push notifications or emails.

The Factual Engine Source is a cloud-mode event source. You simply include, configure, and initialize the Engine SDK as you normally would, and then add only a few lines of code to trigger correctly formatted events to Segment in response to your dynamic triggers and actions. This  event data then flows seamlessly to your downstream Segment Destinations. Once the Factual Engine Source is enabled, any Segment Destination that can accept server-to-server data can accept data from Factual Engine. The data is also automatically streamed into your next warehouse sync. The data generated from the Factual Engine can also be easily combined with other Source data collected using Segment without any additional development work on your end.

## Getting Started

While the integration is in beta, contact engine-team@factual.com for help and full documentation!
