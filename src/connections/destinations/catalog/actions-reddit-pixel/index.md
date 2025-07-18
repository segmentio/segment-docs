---
title: Reddit Pixel
id: 68383577d2c19626da376944
beta: true
---

{% include content/plan-grid.md name="actions" %}

The [Reddit Pixel](https://business.reddithelp.com/s/article/reddit-pixel){:target="_blank"} destination lets advertisers send Segment events to the Reddit Pixel without any additional manual JavaScript installation. This destination has Segment events pre-mapped to Reddit Pixel events and metadata. You can edit this mapping and create new events - no custom code required.

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”}, find the Reddit Pixel destination and select **Add Destination**.
2. Select the source that you'd like to connect to the Reddit Pixel destination.
3. Open the destination settings and provide your Pixel ID. This can be found in the Reddit's [Events Manager](https://ads.reddit.com/events-manager){:target="_blank"}.
4. Configure and map the events you'd like to send to the Reddit Pixel. The destination pre-maps certain Segment events to Reddit Pixel events and metadata, but you can edit these values. You can also set up custom events.

After enabling the destination, Segment automatically initializes and loads the Reddit Pixel on each page that you'd like to track based on your mappings.


{% include components/actions-fields.html %}

## Deduplication with the Reddit Conversions API

If you implement both the [Reddit Pixel](https://business.reddithelp.com/s/article/reddit-pixel){:target="_blank"} and [Reddit Conversions API (CAPI)](https://business.reddithelp.com/s/article/Conversions-API){:target="_blank"} and the same events are shared across both sources, deduplication is necessary to ensure those events aren’t double-counted.

The integration automatically pre-maps the Segment `messageId` to the Reddit conversion ID. If you wish to change this, you can pass a different unique conversion ID for every distinct event to its corresponding Reddit Pixel and CAPI event. Reddit will determine which events are duplicates based on the conversion ID and conversion event name. This is the most accurate way to ensure proper deduplication. Reddit recommends this method since there’s less risk of incorrect integration, which can impact attribution accuracy.

To ensure your events are deduplicated:
- Create a unique conversion ID for every distinct event. You can set this as a random number or ID, or the order number when tracking purchase events, for example.
- Include the event in both the Reddit Pixel and CAPI.
- Ensure the conversion event name and conversion ID for match across the Reddit Pixel and CAPI.

For more information on deduplication, see the [Reddit Event Deduplication documentation](https://business.reddithelp.com/s/article/event-deduplication){:target="_blank"}.