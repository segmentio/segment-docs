---
title: Perkville Destination
rewrite: true
id: 60de4ee01f55f299594f38ed
---
[Perkville](https://www.perkville.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a customer reward and referral platform - similar to airline mile programs - that integrates with e-commerce, point of sale, membership and scheduling systems to provide a seamless experience that drives referrals and loyalty.

This destination is maintained by Perkville. For any issues with the destination, [contact the Perkville Support team](mailto:support@perkville.com).

The Perkville Destination is in beta, which means that they are still actively developing the destination. To join their beta program, or if you have any feedback to help improve the Perkville Destination and its documentation, [contact the Perkville support team](mailto:support@perkville.com).


## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Perkville" in the Destinations Catalog, and select the "Perkville" destination.
3. Choose which Source should send data to the "Perkville" destination.
4. Go to [Perkville > Settings > Apps](https://www.perkville.com/settings/usr/apps/){:target="_blank"} while logged in as an admin.
5. Under Connect Segment, click "Generate Token" and then "Accept."
6. Click "Show token" under the Segment app, then copy the token.
7. Paste the token into the "API Key" field for the "Perkville" destination settings in Segment.


## Supported methods

Perkville supports the following method, as specified in the [Segment Spec](/docs/connections/spec).


### Track

Send [Track](/docs/connections/spec/track) calls to award points for allowlisted actions. For example:

```js
analytics.track('Order Completed', {
  order_id: 'o283h08fh2390f923uofu23',
  revenue: 9.99,
  email: 'example@example.com'
});
```

> warning "Important"
> You should only send the track events you need to Perkville. You may use [Segment Destination Filters](/docs/connections/destinations/destination-filters/) to prevent unwanted events being sent to Perkville. You must allowlist the names of the events you need in the Perkville destination settings in the Segment App. Segment sends those events to Perkville for you, and returns an error if the event is not allowlisted.

#### Required Values

The only required event value is `email`. This must be present within the `event`, `event.properties`, or `event.context.traits` objects.

#### Quantity Calculation

Any events that have an `order_id` will be treated as spend transactions. The quantity of points given will reflect the event's `revenue`, `value`, or `total` in that priority order. Per [the eCommerce spec](/docs/connections/spec/ecommerce/v2/#order-refunded), if the order event name includes "Refund," points will be removed from the Perkville account associated with the provided email.

All other events default to a quantity of 1.