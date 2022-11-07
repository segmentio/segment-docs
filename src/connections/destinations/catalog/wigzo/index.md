---
rewrite: true
title: Wigzo Destination
id: 564e4f97e954a874ca44cbd3
---
[Wigzo](https://www.wigzo.com/) is a Contextual Marketing Platform that helps marketers send smarter communication through email or in-app, by changing content dynamically based on User behavior. Using Wigzo's predictive technologies, companies can produce Dynamic content blocks which automatically populate in emails based on User behavior and Context.

This destination is maintained by Wigzo. For any issues with the destination, [contact the Wigzo Support team](mailto:support@wigzo.com)


## Getting Started

The first step is to make sure Wigzo supports the source type and connection mode you've chosen to implement. You can learn more about what dictates the connection modes we support [here](/docs/connections/destinations/#connection-modes).

1. From the Segment web app, click **Catalog**.
2. Search for "Wigzo" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Copy, then paste in your Wigzo `Organization Token`, which you can find inside the auto generated snippet under Wigzo Settings > Integration.
4. Segment automatically initializes Wigzo with your Organization Token upon loading analytics.js.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```javascript
analytics.page();
```

When you call `.page()` in the browser, we will pass all the properties of the page such as `url`, `title`, `path` etc. If you pass a name in your `.page()` call, we will send that as title to Wigzo.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

When you call `.identify()`, user's data will be sent to Wigzo's server along with unique `userId`. We will save `email` address and `phone` also if it is provided by you under *traits* as `email` and `phone` respectively.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track('Clicked Button');
```

When you call `.track()`, user's data will be sent to Wigzo along with the unique `userId`.
Product indexing related calls (mainly `Product Viewed` and `Product Clicked`) must pass couple of more Wigzo specific properties aside from what is listed in our [Ecommerce Spec](/docs/connections/spec/ecommerce/v2/) as shown in the following example:

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

**IMPORTANT**: Make sure to follow the Segment ecommerce spec and include the `product_id` for product related events
