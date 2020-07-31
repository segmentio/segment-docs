---
title: AdQuick Destination
rewrite: true
---

[AdQuick](https://adquick.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) makes outdoor advertising easy to purchase and measure. By integrating with Segment you can analyze the impact of your outdoor ad campaign across all your digital channels.

This destination is maintained by AdQuick. For any issues with the destination, [contact their team](mailto:segment@adquick.com).

This document was last updated on January 8, 2020. If you notice any gaps, out-dated information, or simply want to leave some feedback to help us improve our documentation, [let their team know](mailto:segment@adquick.com)!


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "AdQuick" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Select the campaign you want to connect to Segment in your [Campaings list page](https://adquick.com/campaigns)
4. Click on the Analytics tab.
5. Drop in the "API Key" into your Segment Settings UI which you can find on the Segment API key card.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to AdQuick as a `pageview`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to AdQuick as a `screenview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to AdQuick as an `identify` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to AdQuick as a `metric` event.
