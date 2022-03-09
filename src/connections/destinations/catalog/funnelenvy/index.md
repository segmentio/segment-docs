---
title: FunnelEnvy Destination
rewrite: true
id: 5d3752aec1c95d00012c80aa
---
[FunnelEnvy](https://www.funnelenvy.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps marketers optimize revenue by delivering personalized experiences and offers for every customer across their unique journey.

This destination is maintained by FunnelEnvy. For any issues with the destination, [contact the FunnelEnvy Support team](mailto:support@funnelenvy.com).

{% include content/beta-note.md %}

## Implementation Prerequisite

FunnelEnvy works differently than other Segment destinations: It requires that customers include a native FunnelEnvy snippet on their page along with the Segment snippet.

The FunnelEnvy snippet can be found in your settings within FunnelEnvy which is found in **Settings > Org Settings**


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "FunnelEnvy" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Head over to your [FunnelEnvy integration settings](https://backstage.funnelenvy.com/#/integrationsNew) and add "Segment Souce" as a source integration.
4. Copy the "API Key" from the Segment Source integration in FunnelEnvy into your Segment Settings UI.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

FunnelEnvy will use the id sent in the identify call to associate individuals to other data sources and to attribute conversions to variations. Traits passed with identify calls will be sent to FunnelEnvy as attributes in the individual profile and will be available for segmentation and prediction.
**`userId`** is a **required** field in the identify call.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to FunnelEnvy as an event, which can be used for goal tracking as well as behavioral segmentation.

---
