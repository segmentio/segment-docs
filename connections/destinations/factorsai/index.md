---
rewrite: true
---
[FactorsAI](https://www.factors.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides advanced and intuitive analytics for marketers and product managers, to help drive growth. With FactorsAI you get immediate insights to optimize marketing campaigns, improve conversions and understand user behaviours that drive feature adoption and retention.

This destination is maintained by FactorsAI. For any issues with the destination, please [reach out to their team](mailto:support@factors.ai).

_**NOTE:** The FactorsAI Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on July 23, 2019. If you are interested in joining their beta program or have any feedback to help improve the FactorsAI Destination and its documentation, please [let  their team know](mailto:support@factors.ai)!_

## Getting Started

<!-- {{>connection-modes}} --> 

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "FactorsAI" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [FactorsAI dashboard](https://app.factors.ai/#/settings/segment).

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to FactorsAI as an auto tracked `pageview`. 


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to FactorsAI as a track event with name `screenname`. 


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to FactorsAI as an `identify` event.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Product Viewed')
```

Track calls will be sent to FactorsAI as a `track` event.

---