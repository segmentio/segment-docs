---
rewrite: true
title: MetaCX Destination
---

[MetaCX](https://www.metacx.com) is a digital success layer that brings suppliers and buyers of SaaS together for better collaboration and outcome management, offering real-time visibility into customer success.

This destination is maintained by MetaCX. For any issues with the destination, please reach out to their [success team](mailto:support@metacx.com).

_**NOTE:** The MetaCX Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on August 14, 2019. If you are interested in joining their beta program or have any feedback to help improve the MetaCX Destination and its documentation, please contact their [success team](mailto:support@metacx.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "MetaCX" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Segment IO connection](https://app.metacx.com/app/connections).
4. If you do not already have a Segment IO connection, create one by clicking the Add Connection button at the bottom right of the page.


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to the SegmentIO connection with event key `page`.


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to the SegmentIO connection with event key `screenview`.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to the SegmentIO connection with eventKey `identify`.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to the SegmentIO connection with event key `track`.
