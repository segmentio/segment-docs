---
title: 'BuzzBoard Destination'
rewrite: true
beta: true
redirect_from: '/connections/destinations/catalog/smbstream/'
id: 5ca76cbb1a6b900001618e74
---
[BuzzBoard](https://www.buzzboard.com/smbstreams/solutions/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides self-serve predictive analytics for growth marketers, leveraging machine learning to automate audience insights and recommendations. The most comprehensive set of data is maintained, integrated and then delivered as important insights across your sales and marketing organization.

This destination is maintained by BuzzBoard. For any issues with the destination, [contact the BuzzBoard Support team](mailto:support@buzzboard.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "BuzzBoard" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your BuzzBoard [Dashboard](https://sales.buzzboard.com/v5/stream-dashboard).


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('John123', {
  email: 'john.lewis@example.com'
});
```

**NOTE:** `userId` and `email` are required traits in order for BuzzBoard to enrich your data.

Identify calls will be sent to BuzzBoard with the required traits, matching and sending the full profile with enriched data downstream through Segment to all your other enabled Destinations as a new `identify` call within your Segment Source.

While your data is being enriched, a `track` call will appear in your Segment Debugger with event name `enrichment_in_progress`.

In order to send back the data to your Segment source, BuzzBoard would need the write key access. For this, you would have to add the Segment write key by going into the BuzzBoard [Dashboard](https://sales.buzzboard.com/v5/stream-dashboard).
