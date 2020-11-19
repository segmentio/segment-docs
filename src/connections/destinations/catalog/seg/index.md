---
title: Seg Destination
---

This destination is maintained by Seg.

### Identify

When you call identify on analytics.js, we pass all traits into Seg. You must provide a `traits.email` for Seg to `identify` your customers, otherwise they are effectively anonymous until a `traits.email` is specified.

### Track

When you call track, Seg looks for standard [Segment e-commerce event names](/docs/connections/spec/ecommerce/v2/) and they get mapped to standard Seg ecommerce event names as follows:

- `Viewed Product Category` is mapped to [`RangeView`](http://support.segapp.com/knowledge_base/topics/range-view-event)
- `Viewed Product` is mapped to [`ProductView`](http://support.segapp.com/knowledge_base/topics/product-view-event)
- `Added Product` is mapped to [`AddedToBasket`](http://support.segapp.com/knowledge_base/topics/added-to-basket-event)
- `Order Completed` is mapped to [`OrderPlaced`](http://support.segapp.com/knowledge_base/topics/order-placed-event)

All other event names are ignored by Seg as there is no logical map.

#### Augmenting the Segment Ecommerce Spec for Seg
Seg requires some extra information on the above events for full functionality (although Seg will remain nearly fully functional if not further changes are made).

The changes that are recommended are as follows:

- Include "Brands" and/or "Categories" arrays to *all events*, for example

```javascript
analytics.track('Viewed Product Category', {
category: 'Games',
categories: ['Games', 'Board Games'], // This would be all categories (and parent categories) that the product exists in
brands: ['Hasbro']
});
```

- Include extra properties to `Order Completed` , for example

```javascript
analytics.track('Order Completed', {
orderId: '50314b8e9bcf000000000000',
total: 30,
revenue: 25,
shipping: 3,
tax: 2,
discount: 2.5,
coupon: 'hasbros',
currency: 'USD',
repeat: true,
delivery_method: 'Standard shipping',
_p: 15, // This is the (estimated) profit for the order
products: [
{
id: '507f1f77bcf86cd799439011',
sku: '45790-32',
name: 'Monopoly: 3rd Edition',
price: 19,
quantity: 1,
category: 'Games',
categories: ['Games', 'Board Games'],
brands: ['Hasbro'],
image_url: 'http://example.com/url-to-product-image';,
original_price: 19.99,
variant_name: 'Product Variant Name'
}
]
});
```

- Include an extra 5 properties to `Viewed Product`, `Added Product` and `Order Completed`, for example

```js
analytics.track('Viewed Product', {
id: '507f1f77bcf86cd799439011',
sku: '45790-32',
name: 'Monopoly: 3rd Edition',
price: 18.99,
category: 'Games',
categories: ['Games', 'Board Games'],
brands: ['Hasbro'],
image_url: 'http://example.com/url-to-product-image';,
original_price: 19.99,
variant_name: 'Product Variant Name'
});
```

--- or ---

```js
analytics.track('Order Completed', {
orderId: '50314b8e9bcf000000000000',
total: 30,
revenue: 25,
shipping: 3,
tax: 2,
discount: 2.5,
coupon: 'hasbros',
currency: 'USD',
repeat: true,
delivery_method: 'Standard shipping',
_p: 15,
products: [
{
id: '507f1f77bcf86cd799439011',
sku: '45790-32',
name: 'Monopoly: 3rd Edition',
price: 19,
quantity: 1,
category: 'Games',
categories: ['Games', 'Board Games'],
brands: ['Hasbro'],
image_url: 'http://example.com/url-to-product-image';,
original_price: 19.99,
variant_name: 'Product Variant Name'
}
]
});
```

### Page
When you call track, Seg will augment the Segment track call with the page url and title. Events will be matched to the current user.

### Alias
Our alias method can be used from your server to "re-identify" an existing user identity to a new one. Most of the time this happens when you identify a visitor changes their email address after they opt in.

To connect the two identities you'll need to alias their current identity to their new one.

Here's an example of using alias to update the identity from an old email address to a new email address:

```javascript
analytics.alias('old-email@segment.com','new-email@segment.com')
```

If both parameters are not email address types, the call is ignored in Seg.
