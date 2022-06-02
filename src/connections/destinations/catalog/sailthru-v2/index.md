---
title: Sailthru V2 New Destination
rewrite: true
redirect_from: '/connections/destinations/catalog/sailthru/'
id: 5ee1302124d817af4c8341a2
---
[Sailthru's](https://www.sailthru.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) cross-channel marketing platform helps brands deliver personalized experiences to each and every consumer across email, web, and mobile, driving higher revenue, improving customer lifetime value, and reducing churn.

Sailthru maintains this destination. For any issues with the destination, [contact the Sailthru Support team](mailto:support@sailthru.com).


## Getting Started

{% include content/connection-modes.md %}

1. Contact the [Sailthru Support team](mailto:support@sailthru.com) to enable your account for EXTID support and request your integration-specific API Key and Secret.
2. From the Destinations catalog page in the Segment App, click **Add Destination**.
3. Search for “Sailthru” in the Destinations Catalog, and select the Sailthru destination.
4. Choose which Source should send data to the Sailthru destination.
5. Enter the API Key and Secret in the Sailthru destination settings in Segment.


## Supported methods

Sailthru supports the following methods, as specified in the [Segment Spec](/docs/connections/spec)

### Page

Send [Page](/docs/connections/spec/page) calls to Sailthru to add your pageview data to Sailthru and generate interest data, sessions, and trending data.

```js
analytics.page()
```

### Screen

Send [Screen](/docs/connections/spec/screen) calls to Sailthru as pageviews by toggling on the `Track Screen events as Pageviews` setting in your Segment destination settings.

```swift
Analytics.shared().screen("Rick's Tee", properties: [
    "url": "https://shop.com/products/ricks-tee"
])
```

Screen events require a `url` property. If Sailthru receives a Screen call without a `url` property, the call drops.

### Identify

Send [Identify](/docs/connections/spec/identify) calls to to create or update a Sailthru profile for any identified user on your site.

```js
analytics.identify("assigned-userId", {
 "name": "Stephen Noel",
 "email": "snoel@sailthru.com",
 "plan": "premium",
 "logins": 5
});
```

### Track

Send [Track](/docs/connections/spec/track) calls to:

* record purchases via “Order Completed” events
* record abandoned carts via “Product Added” and “Product Removed” events
* subscribe users via “Subscribed” events
* trigger Lifecycle Optimizer journeys with all other events

Sailthru automatically creates and maps custom fields from Segment.

#### Subscribe a User

Subscribe a user to a list programmatically with the `Subscribed` event. Sailthru adds Users to the list name passed in the `list` field and resets their opt-out status to Valid for Marketing.

```js
analytics.track("Subscribed", {
 "list": "Master List"
});
```

#### Record  a Purchase

Record purchases in Sailthru wih the `Order Completed` event to send order confirmation messages, personalize messaging, and create purchase-related audiences.

Each line-item for Sailthru purchases requires the `url` field. Send the `tags` property for each line-item for later segmentation purposes.

Sailthru automatically tracks the `shipping`, `tax`, and `discount` fields as adjustments for accurate purchase values per-user. Use `order_id`, `checkout_id`, or Segment's `messageId` as a purchase key for later lookup and deduping purposes.

```js
analytics.track("Order Completed", {
 "order_id": "smbc-3-18-1",
 "affiliation": "Google Store",
 "total": 27.50,
 "subtotal": 22.50,
 "revenue": 25.00,
 "shipping": 3,
 "tax": 2,
 "discount": 2.5,
 "coupon": "hasbros",
 "currency": "USD",
 "products": [
   {
     "product_id": "507f1f77bcf86cd799439011",
     "sku": "45790-32",
     "name": "Monopoly: 3rd Edition",
     "price": 19,
     "quantity": 1,
     "category": "Games",
     "tags": "games, monopoly, miserable-endings",
     "url": "https://www.example.com/product/path",
     "image_url": "https:///www.example.com/product/path.jpg"
   }
 ]
});

```

#### Update Cart
Send `Product Added` and `Product Removed` Track events for Sailthru's abandoned cart messaging to enable the Cart Abandonment entry in Lifecycle Optimizer.

Sailthru abandoned cart messaging requires the `url` to function properly. 

```js
analytics.track('Product Added', {
  cart_id: 'skdjsidjsdkdj29j',
  product_id: '507f1f77bcf86cd799439011',
  url: 'https://example.com/product/path',
  sku: 'G-32',
  category: 'Games',
  name: 'Monopoly: 3rd Edition',
  brand: 'Hasbro',
  variant: '200 pieces',
  price: 18.99,
  quantity: 1,
  coupon: 'MAYDEALS',
  position: 3
});
```
