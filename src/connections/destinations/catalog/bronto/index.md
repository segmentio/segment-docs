---
title: Bronto Destination
id: 54521fd525e721e32a72ee98
---
Our Bronto destination code is open-source on GitHub if you want to [check it out](https://github.com/segment-integrations/analytics.js-integration-bronto).

## Getting Started

All you need to get up and running with Bronto is your Bronto Site ID. You can find your site ID right on your Bronto Account Page.

Bronto works with our client-side JavaScript library: Analytics.js.

## Track

You can use our [track](/docs/connections/spec/track) method to send conversion events to Bronto. This event must be named `Order Completed`. We will forward Bronto the properties product SKU, description, quantity, name and price properties defined in the event.

Here's an example:

```javascript
analytics.track('Order Completed', {
  products: [{ sku: 'c546c96', quantity: 8, name: 'my-product', price: 99.99 }],
  orderId: '55c497bf'
});
```
