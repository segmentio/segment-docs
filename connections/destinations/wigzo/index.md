---
rewrite: true
---

[Wigzo](https://www.wigzo.com/) is a Contextual Marketing Platform that helps marketers send Smarter Communication in Email or In-App. 
Which means changing content dynamically based on User behaviour on Website and App. 
Using Wigzo's predictive technologies companies can produce Dynamic content blocks which automatically populates in emails based on User behaviour and Context.
This destination is maintained by Wigzo. For any issues with the destination, please [reach out to their team](mailto:support@wigzo.com)

This document was last updated on November 7, 2018. 
If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, please let us know!

## Getting Started

The first step is to make sure Wigzo supports the source type and connection mode you’ve chosen to implement. You can learn more about what dictates the connection modes we support [here](https://segment.com/docs/destinations/#connection-modes).

{{>connection-modes}}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Wigzo" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Copy, then paste in your Wigzo `Organization Token`, which you can find inside the auto generated snippet under Wigzo Settings > Integration.
4. We’ll automatically initialize Wigzo with your Organization Token upon loading analytics.js.

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```javascript
analytics.page();
```

When you call `.page()` in the browser, we will pass all the properties of the page such as `url`, `title`, `path` etc. If you pass a name in your `.page()` call, we will send that as title to Wigzo. 

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

When you call `.identify()`, user's data will be sent to Wigzo's server along with unique `userId`. We will save `email` address and `phone` also if it is provided by you under *traits* as `email` and `phone` respectively.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```javascript
analytics.track('Clicked Button');
```

When you call `.track()`, user's data will be sent to Wigzo along with the unique `userId`.
Product indexing related calls (mainly `Product Viewed` and `Product Clicked`) must pass couple of more Wigzo specific properties aside from what is listed in our [Ecommerce Spec](/docs/spec/ecommerce/v2/) as shown in the following example:

```js
var productData = {
  product_id: '40',
  category: 'Mobile Phones',
  name: 'iPhone',
  brand: 'Apply',
  price: 18.99,
  currency: 'usd'
};

var options = {
  Wigzo: { // make sure this is capitalized
    imageUrl : 'https://my-site.com/image/cache/iphone_1-228x228.jpg',
    description: 'iPhone is a revolutionary new mobile phone',
    language: 'en'
  }
};
analytics.track('Product Viewed', productData, options);
```

**IMPORTANT**: Please make sure to follow the Segment ecommerce spec and include the `product_id` for product related events 
