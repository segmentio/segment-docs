---
title: AdQuick Destination
rewrite: true
id: 5d3638cd54d6be00014e6bf1
---
[AdQuick](https://adquick.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) makes outdoor advertising easy to purchase and measure. By integrating with Segment you can analyze the impact of your outdoor ad campaign across all your digital channels.

This destination is maintained by AdQuick. For any issues with the destination, [contact the AdQuick team](mailto:segment@adquick.com).


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "AdQuick" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Select the campaign you want to connect to Segment in your [Campaings list page](https://adquick.com/campaigns)
4. Click on the Analytics tab.
5. Enter the "API Key" into your Segment Settings UI which you can find on the Segment API key card.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to AdQuick as a `pageview`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to AdQuick as a `screenview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to AdQuick as an `identify` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to AdQuick as a `metric` event.
