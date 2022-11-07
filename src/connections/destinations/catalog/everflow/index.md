---
title: Everflow Destination
rewrite: true
id: 5fdce712dc1fbc625ebd13b8
---
Everflow is the smarter Partner Marketing platform for managing all of your performance driving channels: Affiliates, Influencers, Strategic Partners, and Media Buying. Track every partner and channel, analyze performance and engagement by placement, and automate your optimization.

This destination is maintained by Everflow. For any issues with the destination, contact the [Everflow Support team](mailto:support@everflow.io).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Everflow" in the Destinations Catalog, and select the Everflow destination.
3. Choose which Source should send data to the Everflow destination.
4. Go to the My Account page in Everflow, find and copy the "API key".
5. Enter the "API Key" in the Everflow destination settings in Segment.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```json
{
  "context": {
     "referrer": {
          "type": "everflow",
          "id": EF.getAdvertiserTransactionId(7)
          },
    "ip": "23.123.123.123"
    },
  "event": "Order Completed",
  "properties": {
    "adv1": "adv1test",
    "adv3": "adv3test",
    "total": 76.0,
    "orderId": "123456789"
  },
  "type": "track",
  "userId": "a1b2c3d4"
}
```

> warning "Map your events"
> To track the event, go to the Everflow Segment destination settings, and in the Segment event name field, enter the Advertiser ID from your [Offer's Revenue & Payout card](https://helpdesk.everflow.io/en/articles/3673712-offer-revenue-payout).

### TransactionId
The TransactionId (`context.referrer.id`) and `context.referrer.type` are **required** fields. Read more about how to pass the TransactionId in [Everflow's TransactionId Documentation](https://developers.everflow.io/docs/everflow-sdk/click_tracking/)

### Property Mappings
The data type for Segment properties must match the data type set in Everflow for the corresponding property. Read more about how Everflow maps Segment properties in [Everflow's Properties Mapping documentation](https://helpdesk.everflow.io/en/articles/4785627-integrations-segment).

Custom properties are not supported at this time.
