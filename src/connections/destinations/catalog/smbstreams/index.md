---
title: 'SMBStreams Destination'
rewrite: true
beta: true
redirect_from: '/connections/destinations/catalog/smbstream/'
---

[SMBStreams](https://www.buzzboard.com/smbstreams/solutions/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides self-serve predictive analytics for growth marketers, leveraging machine learning to automate audience insights and recommendations. The most comprehensive set of data is maintained, integrated and then delivered as important insights across your sales and marketing organization.

This destination is maintained by SMBStreams. For any issues with the destination, [contact their team](mailto:support@buzzboard.com).

_**NOTE:** The SMBStreams Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 26, 2019. If you are interested in joining their beta program or have any feedback to help improve the SMBStreams Destination and its documentation, [let their team know](mailto:support@buzzboard.com)!_

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "SMBStreams" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your SMBStreams [Dashboard](https://sales.buzzboard.com/v5/stream-dashboard).


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('John123', {
  email: 'john.lewis@example.com'
});
```

**NOTE:** `userId` and `email` are required traits in order for SMBStreams to enrich your data.

Identify calls will be sent to SMBStreams with the required traits, matching and sending the full profile with enriched data downstream through Segment to all your other enabled Destinations as a new `identify` call within your Segment Source.

While your data is being enriched, a `track` call will appear in your Segment Debugger with event name `enrichment_in_progress`.

In order to send back the data to your Segment source, SMBStreams would need the write key access. For this, you would have to add the Segment write key by going into the SMBStreams [Dashboard](https://sales.buzzboard.com/v5/stream-dashboard).
