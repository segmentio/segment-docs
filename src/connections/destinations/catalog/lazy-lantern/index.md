---
title: Lantern Destination
rewrite: true
redirect_from: '/connections/destinations/catalog/lazy-lantern/'
---
[Lantern](https://lazylantern.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides autonomous anomaly detection for all your product metrics. It only takes a minute to enable with Segment, no coding involved.

We ingest your analytics through Segment, perform state-of-the-art anomaly detection on each of your metrics, and  alert you on Slack when something doesn't look right. You get full-coverage over your product and the confidence that you will be notified of any significant variation.

This destination is maintained by Lantern. For any issues with the destination, contact [Lantern's support](mailto:support@lazylantern.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

### Automated Setup
1. Log into your [Lantern dashboard](https://app.lazylantern.com).
2. Click on the "Enable with Segment" button.
3. Pick a workspace and a source.
4. Click "Allow".

### Manual Setup

1. From the Segment web app, click **Catalog**.
2. Search for "Lantern" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your Lantern dashboard [settings page](https://app.lazylantern.com).

### Next Steps
 - Lantern needs one week of training on your data before it can perform accurate anomaly detection. The countdown on the Lantern dashboard lets you know when the training period will be completed.
 - During the training period, a debug view on the dashboard will let you verify your data is flowing correctly from Segment to Lantern.
 - Alerts will be delivered by the Lantern Slack bot. Follow the easy instructions on the dashboard to add Lantern to Slack.



## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page();
```

Lantern will monitor `page` events and send you alerts when an anomaly occurs (sudden change in level, trend or periodicity of the metric).


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. An iOS example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Lantern will monitor `screen` events and send you alerts when an anomaly occurs (sudden change in level, trend or periodicity of the metric).


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Lantern does not store any information that links to a user's personal identity. The `userId` field and `traits` object are systematically dropped and not stored in Lantern's warehouse. We only analyse the volume of identify calls to detect anomalies related to the total number of unique users.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Products Searched', {
  query: 'blue hotpants'
});
```

Lantern will monitor `track` events and send you alerts when an anomaly occurs (sudden change in level, trend or periodicity of the metric).
