---
title: FactorsAI Destination
rewrite: true
id: 5d1060c40d357d000181e92c
hide-cmodes: true
hide-components: true
---
[FactorsAI](https://www.factors.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides advanced and intuitive analytics for marketers and product managers, to help drive growth. With FactorsAI you get immediate insights to optimize marketing campaigns, improve conversions and understand user behaviours that drive feature adoption and retention.

This destination is maintained by FactorsAI. For any issues with the destination, [contact the FactorsAI Support team](mailto:support@factors.ai).

{% include content/beta-note.md %}

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "FactorsAI" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [FactorsAI dashboard](https://app.factors.ai/#/settings/segment).

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to FactorsAI as an auto tracked `pageview`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to FactorsAI as a track event with name `screenname`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to FactorsAI as an `identify` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Product Viewed')
```

Track calls will be sent to FactorsAI as a `track` event.

---
