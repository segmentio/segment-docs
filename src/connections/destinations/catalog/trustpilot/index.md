---
rewrite: true
title: Trustpilot Destination
id: 5c6e52858392d6000101d4c1
---
[Trustpilot](https://www.trustpilot.com/) is an open and independent review platform. On Trustpilot, people can share and discover reviews of businesses, and businesses can gain insights and showcase their service and products performance through reviews.

This destination is maintained by Trustpilot. For any issues with the destination, [contact the Trustpilot Support team](https://support.trustpilot.com/hc/en-us/articles/215949867-Contact-Trustpilot-s-Support-Team).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Trustpilot" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "Integration Key" into your Segment Settings UI as "API Key" which you can find on [Trustpilot integrations page](https://businessapp.b2b.trustpilot.com/#/ecommerce/segment).


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Order Completed', {
  checkout_id: 'fksdjfsdjfisjf9sdfjsd9f',
  order_id: '50314b8e9bcf000000000000',
  email: 'test@example.com',
  name: 'John',
  surname: 'Johnson',
  affiliation: 'Google Store',
  total: 27.50,
  revenue: 25.00,
  shipping: 3,
  tax: 2,
  discount: 2.5,
  coupon: 'hasbros',
  currency: 'USD',
  products: [
    {
      product_id: '507f1f77bcf86cd799439011',
      sku: '45790-32',
      name: 'Monopoly: 3rd Edition',
      price: 19,
      quantity: 1,
      category: 'Games',
      url: 'https://www.example.com/product/path',
      image_url: 'https:///www.example.com/product/path.jpg'
    },
    {
      product_id: '505bd76785ebb509fc183733',
      sku: '46493-32',
      name: 'Uno Card Game',
      price: 3,
      quantity: 2,
      category: 'Games'
    }
  ]
});
```

Trustpilot accepts only `Order Completed` events. These Track calls will be sent to Trustpilot as a `track` event and create a review invitation.

**IMPORTANT:** Both `order_id` and `email` are required fields.
