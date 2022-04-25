---
title: Impact Partnership Cloud Destination
rewrite: true
id: 5ed96e0b97e7ba0c0346cc04
---
[Impact Partnership Cloud](https://impact.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) lets you expand your program and scale every type of partnership by managing the partnership lifecycle - from discovery, contracting and payments through tracking and optimization.

This destination is maintained by Impact. For any issues with the destination, contact the [Impact Partnership Cloud team](https://app.impact.com/) or check out [Impact Partnership Cloud's documentation](https://app.impact.com/secure/agency/support/customer-support-portal-flow.ihtml?execution=e3s1).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Impact Partnership Cloud" in the Destinations Catalog, and select the Impact Partnership Cloud destination.
3. Choose which Source should send data to the Impact Partnership Cloud destination.
4. Go to the [Impact Partnership Cloud Settings](https://app.impact.com), find and copy the "Account SID", "Auth Token", and "Campaign ID".
5. Back in the Impact Partnership Cloud destination settings in Segment, enter the "Account SID", "Auth Token", and "Campaign ID".

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page("Home")
```

Segment sends Page calls to Impact Partnership Cloud as a `Clicks` event, if they fit the definition of a unique click, or as a `Page Load` event.

> success ""
> **Tip!** To accurately track and attribute actions, send a Page call with every page load.

Read [Impact Partnership Cloud's documentation](https://impact-helpdesk.freshdesk.com/en/support/solutions/articles/48001173251) to learn more about how Page properties are mapped.

## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```
Segment sends Screen calls to Impact Partnership Cloud as a `Clicks` event if they fit the definition of a unique click, or as a `Page Load` event.


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn more about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```
Segment sends Identify calls to Impact Partnership Cloud as a `Page Load` event which allows you to update user identifiers.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn more about what it does. An example call would look like:

```js
analytics.track('Order Completed', {
  checkout_id: 'fksdjfsdjfisjf9sdfjsd9f',
  order_id: '50314b8e9bcf000000000000',
  affiliation: 'Google Store',
  total: 27.50,
  subtotal: 22.50,
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

Segment sends Track calls to Impact Partnership Cloud as a `Conversion` or `Page Load` event.

`Conversion` events appear as `Actions` on Impact Partnership Cloud's Dashboard.

`Page Load` events appear as `Clicks` on Impact Partnership Cloud's Dashboard if they fit the definition of a unique click.

Read [Impact Partnership Cloud's documentation](https://impact-helpdesk.freshdesk.com/en/support/solutions/articles/48001173251) to learn more about how Track properties are mapped.
