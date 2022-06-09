---
title: ByteGain Destination
rewrite: true
id: 5c9c28081e78ca0001031b81
---
[ByteGain](https://bytegain.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is an Artificial Intelligence platform that learns from online user behavior to predict and automate the exact actions needed to engage, convert, and retain customers. ByteGain's software analyzes billions of data points on a website to identify patterns in journeys enabling real-time predictions, and improves over time due to its self-learning nature. The platform then uses these predictions to intelligently automate ad retargeting, personalization, content recommendations, and more.

This destination is maintained by ByteGain. For any issues with the destination, [contact the ByteGain Support team](mailto:support@bytegain.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "ByteGain" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" which you can find from the set up tab in the ByteGain UI into your Segment Settings UI.
4. You can now start sending events to ByteGain and check the status light on the set up tab in the ByteGain UI to verify that data is flowing.
5. The ByteGain team will process your data over 2-4 weeks. Work with them directly on next steps.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to ByteGain as a `page` event.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to ByteGain as a `screen` event.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to ByteGain as an `identify` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to ByteGain as a `track` event.
