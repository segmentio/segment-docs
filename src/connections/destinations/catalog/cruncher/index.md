---
title: Cruncher Destination
rewrite: true
id: 5c785483f45dbc00017f0731
---
[Cruncher](https://cruncherlabs.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides an end-to-end data crunching platform with a focus on data science and advanced analytics for analysts and business people. It lets you bring all your siloed data sources in one place and empowers you to extract deep insights using a powerful, yet simple interface.

This destination is maintained by Cruncher. For any issues with the destination, [contact the Cruncher Support team](mailto:support@cruncherlabs.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Cruncher" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Cruncher dashboard](https://tower.cruncherlabs.com/connectors).

Alternatively, you can connect Segment to Cruncher directly from your [Cruncher dashboard](https://tower.cruncherlabs.com/connectors). For more information, visit [Cruncher Documentation](https://docs.cruncherlabs.com/connectors/saas/segment).

_Optional:_ If you would like to sync your past events which were sent through Segment into your Cruncher instance as a Business Tier customer, you have the option of leveraging [Segment Replay](/docs/connections/data-export-options/#business-plan-customers).

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Cruncher as a `pageview`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to Cruncher as a `screenview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to Cruncher as an `identify` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Cruncher as a `track` event.
