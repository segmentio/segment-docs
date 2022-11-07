---
title: Lantern Destination
rewrite: true
redirect_from: '/connections/destinations/catalog/lazy-lantern/'
id: 5d336888e0cb6900011f1188
---
[Lantern](https://lantern.so/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides autonomous anomaly detection for all your product metrics. It only takes a minute to enable with Segment, no coding involved.

Lantern is a user behavior monitoring solution for modern product teams. Lantern alerts you on Slack when something doesn't look right. You get full-coverage over your product and the confidence that you will be notified of any significant variation.

This destination is maintained by Lantern. For any issues with the destination, contact [Lantern's support](mailto:support@lantern.so).

## Getting Started

{% include content/connection-modes.md %}

### Automated Setup
1. Log into your [Lantern dashboard](https://app.lantern.so).
2. When prompted to add a source, click the Segment logo.
3. Pick a Segment workspace and source.
4. Click "Allow".

### Manual Setup

1. From the Segment web app, click **Catalog**.
2. Search for "Lantern" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find by contacting Lantern's support [settings page](https://app.lantern.so).

### Next Steps
 - That's it! Lantern is already at work and will deliver your fist insights in a few hours.
 - In the meantime, you can connect your Slack workspace to Lantern by clicking on the "Receive Insights In Slack" button from the Lantern newsfeed page.
 - Add more sources to get more insights. Go to Settings -> Sources -> Add Source to repeat the process for additional sources.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page();
```

Lantern will monitor `page` events and send you alerts when an anomaly occurs (sudden change in level, trend or periodicity of the metric).


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An iOS example call would look like:

```swift
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Lantern will monitor `screen` events and send you alerts when an anomaly occurs (sudden change in level, trend or periodicity of the metric).


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Lantern does not surface information that links to a user's personal identity. Lantern only analyses the volume of identify calls to detect anomalies related to the total number of unique users and perform various computation over aggregated data.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Products Searched', {
  query: 'blue hotpants'
});
```

Lantern will monitor `track` events and send you alerts when an anomaly occurs (sudden change in level, trend or periodicity of the metric).
