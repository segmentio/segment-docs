---
rewrite: true
---
[Cruncher](https://cruncherlabs.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides an end-to-end data crunching platform with a focus on data science and advanced analytics for analysts and business people. It lets you bring all your siloed data sources in one place and empowers you to extract deep insights using a powerful, yet simple interface. 

This destination is maintained by Cruncher. For any issues with the destination, please [reach out to their team](mailto:support@cruncherlabs.com).

_**NOTE:** Cruncher is currently in beta, which means that they are still actively developing the product. This doc was last updated on March 14, 2019. If you are interested in joining their beta program or have any feedback to help improve the Cruncher Destination and its documentation, please [let  their team know](mailto:support@cruncherlabs.com)!_


## Getting Started

{{>connection-modes}} 

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Cruncher" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Cruncher dashboard](https://tower.cruncherlabs.com/connectors).

Alternatively, you can connect Segment to Cruncher directly from your [Cruncher dashboard](https://tower.cruncherlabs.com/connectors). For more information, please visit [Cruncher Documentation](https://docs.cruncherlabs.com/connectors/saas/segment). 

_Optional:_ If you would like to sync your past events which were sent through Segment into your Cruncher instance as a Business Tier customer, you have the option of leveraging [Segment Replay](https://segment.com/docs/guides/destinations/what-are-my-data-export-options/#business-plan-customers).

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Cruncher as a `pageview`. 


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to Cruncher as a `screenview`. 


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to Cruncher as an `identify` event.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Cruncher as a `track` event.
