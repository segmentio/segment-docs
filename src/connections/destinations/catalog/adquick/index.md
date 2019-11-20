---
title: AdQuick Destination
rewrite: true
---

[AdQuick](https://adquick.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) makes outdoor advertising easy to purchase and measure. By integrating with Segment you can analyze the impact of your outdoor ad campaign across all your digital channels.

This destination is maintained by AdQuick. For any issues with the destination, please [reach out to their team](mailto:segment@adquick.com).

_**NOTE:** The AdQuick Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on October 2, 2019. If you are interested in joining their beta program or have any feedback to help improve the AdQuick Destination and its documentation, please [let  their team know](mailto:segment@adquick.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "AdQuick" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Select the campaign you want to connect to Segment in your [Campaings list page](https://adquick.com/campaigns)
4. Click on the Analytics tab.
5. Drop in the "API Key" into your Segment Settings UI which you can find on the Segment API key card.


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to AdQuick as a `pageview`.


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to AdQuick as a `screenview`.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to AdQuick as an `identify` event.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to AdQuick as a `metric` event.
