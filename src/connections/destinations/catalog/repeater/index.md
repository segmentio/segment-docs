---
title: Repeater Destination
id: 5850d8b680412f644ff55df2
---
This destination is maintained by Segment and is not available to customers on the free plan.

## Getting Started

The Repeater destination forwards events from a source back into another source as though that event occurred in the second source.

Events are not cached in the Repeater, so it only handles real-time events. You can specify multiple sources as Repeater destinations.

If you need to send events to a Source Function, please use the [Webhooks (Actions)](/docs/connections/destinations/catalog/actions-webhook/) destination instead. The Repeater bypasses the code of a Source Function and sends data only to the write key. The Webhook destination allows data to be sent through the Source Function code as expected.

## Configuration

Add the Repeater as a destination for the source that you want to replicate events from.

Find the source that you want events to flow to, and copy the `writeKey` from that source.

Go back to the Repeater destination's settings, and add this `writeKey` to the write keys list for Repeater.

You can do this for as many sources as you need.

![A screenshot of the Write Keys field in the Repeater destination settings page.](images/write-key-settings.png)

Repeater sends all events it receives to the sources you specified, identified by the write key(s) you added.

## Replays with a Repeater

Replays can affect your MTU count when using a Repeater destination. Notify your team before initiating a Replay if you’re using a Repeater destination. There are edge cases where the repeater would count towards MTUs, specifically when replaying historical data from the source connected to feed data into that Repeater destination. This is because userIds/anonymousIds would not have been seen by the source the Repeater sends data to. The API plans count by events sent through the pipeline; the repeater resends an event through the entire pipeline [Source → Repeater → Source → Destinations] so one event is sent through twice, and would increase the throughput count.
