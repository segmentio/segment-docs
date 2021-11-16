---
rewrite: true
title: Watchtower Destination
---

[Watchtower](https://www.watchtower.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a platform to discover, classify, and protect sensitive data, like customer PII, across cloud services & data infrastructure. This enables you to identify sensitive data that you're ingesting and sending to various business-critical systems -- so you can manage the customer data you're disseminating across services.

This destination is maintained by Watchtower. For any issues with the destination, [contact the Watchtower Support team](mailto:support@watchtower.ai).

{% include content/beta-note.md %}



## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Watchtower" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find on the Settings page of your Watchtower dashboard.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Watchtower as a `pageview`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to Watchtower as a `screenview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to Watchtower as an `identify` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Watchtower as a `track` event.
