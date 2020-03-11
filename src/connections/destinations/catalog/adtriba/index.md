---
rewrite: true
title: Adriba Destination
---


[Adtriba](https://www.adtriba.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows advertisers to track, control and optimize their marketing activities across all digital marketing channels through AI and user journey analysis.

This destination is maintained by Adtriba. For any issues with the destination, please [reach out to their team](mailto:support@adtriba.com).

_**NOTE:** The Adtriba Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on Feburary 28, 2019. If you are interested in joining their beta program or have any feedback to help improve the Adtriba Destination and its documentation, please [let their team know](mailto:support@adtriba.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Adtriba" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "Project Tracker ID / API Key" into your Segment Settings UI which you can find from your [Adtriba dashboard](https://console.adtriba.com).
4. Validate the forwarded events by checking the Tracking Report under the "Tracking" tab.

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Adtriba as a `pageview`.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to Adtriba as an `identify` event.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Conversion', {
  id: 'daaa61a2-7682-4ece-9adc-6b07d8020b94',
  revenue: 19.99,
  currency: 'USD'
})
```

Track calls will be sent to Adtriba as a `track` event.

Trigger additional events by using [Semantic Events](https://segment.com/docs/connections/spec/semantic/) in order to enrich the Adtriba machine learning process.
