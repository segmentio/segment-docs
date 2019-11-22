---
title: Lazy Lantern Destination
rewrite: true
---
[Lazy Lantern](https://lazylantern.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides autonomous anomaly detection for all your product metrics. It only takes a minute to enable with Segment, no coding involved.

We ingest your analytics through Segment, perform state-of-the-art anomaly detection on each of your metrics, and  alert you on Slack when something doesn't look right. You get full-coverage over your product and the confidence that you will be notified of any significant variation.

This destination is maintained by Lazy Lantern. For any issues with the destination, please reach out to [Lazy Lantern's support](mailto:support@lazylantern.com).


_**NOTE:** The Lazy Lantern Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on July 31, 2019. If you are interested in joining their beta program or have any feedback to help improve the Lazy Lantern Destination and its documentation, please [let them know](mailto:support@lazylantern.com)!_


## Getting Started

{% include content/connection-modes.md %}

### Automated Setup
1. Log into your [Lazy Lantern dashboard](https://app.lazylantern.com).
2. Click on the "Enable with Segment" button.
3. Pick a workspace and a source.
4. Click "Allow".

### Manual Setup

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Lazy Lantern" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your Lazy Lantern dashboard [settings page](https://app.lazylantern.com).

### Next Steps
 - Lazy Lantern needs one week of training on your data before it can perform accurate anomaly detection. The countdown on the Lazy Lantern dashboard lets you know when the training period will be completed.
 - During the training period, a debug view on the dashboard will let you verify your data is flowing correctly from Segment to Lazy Lantern.
 - Alerts will be delivered by the Lazy Lantern Slack bot. Follow the easy instructions on the dashboard to add Lazy Lantern to Slack.



## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page();
```

Lazy Lantern will monitor `page` events and send you alerts when an anomaly occurs (sudden change in level, trend or periodicity of the metric).


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. An iOS example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Lazy Lantern will monitor `screen` events and send you alerts when an anomaly occurs (sudden change in level, trend or periodicity of the metric).


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Lazy Lantern does not store any information that links to a user's personal identity. The `userId` field and `traits` object are systematically dropped and not stored in Lazy Lantern's warehouse. We only analyse the volume of identify calls to detect anomalies related to the total number of unique users.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Products Searched', {
  query: 'blue hotpants'
});
```

Lazy Lantern will monitor `track` events and send you alerts when an anomaly occurs (sudden change in level, trend or periodicity of the metric).
