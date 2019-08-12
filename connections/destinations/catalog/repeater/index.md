---
title: Repeater
---
This destination is maintained by Segment.

## Getting Started

The Repeater destination forwards events from a source back into another source, as though that event occured in the second source.

Events are not cached in the Repeater, so it only handles real-time events. You can specify multiple sources as Repeater destinatons.

*Segment does not double count MTUs for Repeater events.*

## Configuration

Add the Repeater as a destination for the source that you would like to replicate events from.

Find the source that you would like events to flow to, and copy the write key from that source.

Go back to the Repeater destination and add this write key to the write keys list for Repeater.

You can do this for as many sources as you need.

![](images/write-key-settings.png)

Repeater will replay all events it gets to the sources you specified using the write key(s) you specified.
