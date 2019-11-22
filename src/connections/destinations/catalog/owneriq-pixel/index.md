---
rewrite: true
title: OwnerIQ Destination
---

## OwnerIQ Destination

[OwnerIQ](https://www.owneriq.com/platform-coex) allows marketers to leverage transparent, directly sourced, deterministic, shopping and purchasing data from retailers and brands.

This destination is maintained by OwnerIQ. For any issues with the destination, please [reach out to their team](mailto:coex-support@owneriq.com).

_**NOTE:** The OwnerIQ Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on September 20, 2019. If you are interested in joining their beta program or have any feedback to help improve the OwnerIQ Destination and its documentation, please [let their team know](mailto:coex-support@owneriq.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "OwnerIQ" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the `dataGroupId`,`analyticsTagId`,`dctTagId` into your Segment Settings UI which you can find from  [My Data Tab under My Audience in CoEx](https://coex.owneriq.com/app/myaudience/data-management/datasources).

## Page

If you haven't had a chance to review Segment's spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

OwnerIQ have mapped `analytics.page()` to OwnerIQ's Website Analytics Tag method and will forward all page views accordingly. Note that the integration will ignore any parameters you pass to `analytics.page()`.

## Track

If you haven't had a chance to review Segment's spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does.

The following table shows how OwnerIQ map Segment's [semantic ecommerce](https://segment.com/docs/connections/spec/ecommerce/v2/) or custom event names to OwnerIQ's tag event:

| Segment Event Name | ownerIQ tag event |
| -------- | -------- |
| Order Completed     | Sale/Purchase (DCT)     |
| All others     |  N/A     |


The following table shows how OwnerIQ maps Segment's raw message fields or properties to OwnerIQ's semantic conversion event parameters:

| Segment Property | ownerIQ Conversion Parameters |
| -------- | -------- |
| orderId     | order_id     |
| total     |  total_cost_notax     |
| products.$.brand     |  brand     |
| products.$.sku     |  id     |
| products.$.price     |  price     |
| products.$.category     |  product_type     |
| products.$.quantity     |  quantity     |
| products.$.title     |  name     |

Since track events by default do not require you to send user metadata, it is still possible for OwnerIQ to send a conversion as long as you send a userId. However, for better attribution results, OwnerIQ recommend you send as much applicable user data through context.traits as shown in the mapping table below:

| Segment `context.traits` Properties | ownerIQ Match Key Parameters |
| -------- | -------- |
| email     | email     |
| userId     |  customer_id     |


### Order Completed
For each order completed you must include an `orderId`. All other properties are optional.

```
analytics.track({
  userId: '019mr8mf4r',
  event: 'Order Completed',
  properties: {
    orderId: '50314b8e9bcf000000000000',
    total: 27.5,
    shipping: 3,
    tax: 2,
    discount: 2.5,
    coupon: 'hasbros',
    currency: 'USD',
    repeat: true,
    products: [
      {
        id: '507f1f77bcf86cd799439011',
        sku: '45790-32',
        brand: 'Monopoly',
        name: 'Monopoly: 3rd Edition',
        price: 19,
        quantity: 1,
        category: 'Games'
      },
      {
        id: '505bd76785ebb509fc183733',
        sku: '46493-32',
        name: 'Uno Card Game',
        price: 3,
        quantity: 2,
        category: 'Games'
      }
    ]
  }
});
```

`analytics.track({event: 'Order Completed})'` calls will be sent to OwnerIQ as a  Sale/Purchase tag `conversion` event.
