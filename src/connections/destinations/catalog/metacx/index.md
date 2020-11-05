---
rewrite: true
title: MetaCX Destination
---

[MetaCX](https://www.metacx.com) is a digital success layer that brings suppliers and buyers of SaaS together for better collaboration and outcome management, offering real-time visibility into customer success.

This destination is maintained by MetaCX. For any issues with the destination, contact their [success team](mailto:support@metacx.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "MetaCX" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Segment IO connection](https://app.metacx.com/app/connections).
4. If you do not already have a Segment IO connection, create one by clicking the Add Connection button at the bottom right of the page.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to the SegmentIO connection with event key `page`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to the SegmentIO connection with event key `screenview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to the SegmentIO connection with eventKey `identify`.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to the SegmentIO connection with event key `track`.
