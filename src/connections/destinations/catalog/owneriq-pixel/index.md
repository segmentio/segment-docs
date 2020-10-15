---
rewrite: true
title: OwnerIQ Destination
---

[OwnerIQ](https://www.owneriq.com/platform-coex) allows marketers to use transparent, directly sourced, deterministic, shopping and purchasing data from retailers and brands.

This destination is maintained by OwnerIQ. For any issues with the destination, [contact the OwnerIQ Support team](mailto:coex-support@owneriq.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "OwnerIQ" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the `dataGroupId`,`analyticsTagId`,`dctTagId` into your Segment Settings UI which you can find from  [My Data Tab under My Audience in CoEx](https://coex.owneriq.com/app/myaudience/data-management/datasources).

## Page

If you aren't familiar with the Segment Spec, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

OwnerIQ have mapped `analytics.page()` to OwnerIQ's Website Analytics Tag method and will forward all page views accordingly. Note that the integration will ignore any parameters you pass to `analytics.page()`.

## Track

If you aren't familiar with the Segment Spec, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does.

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

```js
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
