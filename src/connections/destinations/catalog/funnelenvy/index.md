---
title: FunnelEnvy Destination
rewrite: true
---

[FunnelEnvy](https://www.funnelenvy.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) Predictive Revenue Optimization (PRO) helps marketers optimize revenue by delivering hyper-personalized experiences for every customer across their unique journey.

This destination is maintained by FunnelEnvy. For any issues with the destination, please [reach out to their team](mailto:support@funnelenvy.com).

_**NOTE:** The FunnelEnvy Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on September 13, 2019. If you are interested in joining their beta program or have any feedback to help improve the FunnelEnvy Destination and its documentation, please [let  their team know](mailto:support@funnelenvy.com)!_

## Implementation Prerequisite

FunnelEnvy works differently than other Segment destinations: It requires that customers include a native FunnelEnvy snippet on their page along with the Segment snippet.

The FunnelEnvy snippet can be found in your settings within FunnelEnvy which is found in **Settings > Org Settings**


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "FunnelEnvy" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Head over to your [FunnelEnvy integration settings](https://backstage.funnelenvy.com/#/integrationsNew) and add "Segment Souce" as a source integration.
4. Copy the "API Key" from the Segment Source integration in FunnelEnvy into your Segment Settings UI.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

FunnelEnvy will use the id sent in the identify call to associate individuals to other data sources and to attribute conversions to variations. Traits passed with identify calls will be sent to FunnelEnvy as attributes in the individual profile and will be available for segmentation and prediction.
**`userId`** is a **required** field in the identify call.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to FunnelEnvy as an event, which can be used for goal tracking as well as behavioral segmentation.

---
