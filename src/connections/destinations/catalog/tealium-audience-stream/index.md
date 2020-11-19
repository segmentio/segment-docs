---
beta: true
hidden: true
title: Tealium AudienceStream Destination
---

## Getting Started

When you enable the Tealium AudienceStream Destination in Segment, we'll start sending your Segment events to the Tealium Universal Data Hub account/profile of your choice. Our destination currently supports the Segment `page`, `track`, and `screen` methods, and will send data from any one of our libraries.

To enable this destination, you need to specify in your destination settings, the Tealium **account** and **profile** names that you would like to send your Segment events to. You should be able to find these values in the upper right corner of your Universal Data Hub dashboard.

## Track

Segment `track` events will pass through to Tealium AudienceStream as `link` events. Any event `properties` and the `context` object will be passed as part of the payload.

## Page / Screen

Segment `page` and `screen` events will pass through to Tealium AudienceStream as `view` events. Any event `properties` and the `context` object will be passed as part of the payload.
