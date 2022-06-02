---
rewrite: true
title: Insider Destination
id: 5f2cf019edbedc752d668f69
---
[Insider](https://useinsider.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) Growth Management Platform (GMP) helps digital marketers drive growth across the funnel. Insider GMP helps marketers deliver personalized journeys across the web, mobile web, mobile apps, messaging, email, and ad channels using the unified data.

This destination is maintained by Insider. For any issues with the destination, [contact the Insider Support team](mailto:pst@useinsider.com).

{% include content/beta-note.md %}

## Getting Started

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Insider" in the Destinations Catalog, and select the Insider destination.
3. Choose which Source should send data to the Insider destination.
4. Go to the [Insider dashboard](https://inone.useinsider.com/), navigate to **Settings > Integration Settings**, then find and copy the **Segment.com API Key**.
5. Enter your **Partner Name** and API Key in the Insider destination settings in Segment.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page("Home", {
    url: "https://useinsider.com",
    referrer: "http://google.com"
});
```

Segment sends Page calls to Insider as a `page view` event with the following event parameters.

```json
"page_name": "Home",
"url": "https://useinsider.com",
"referrer": "http://google.com"
```

## Identify

If you aren't familiar with the Segment Spec,  take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
  name: "John Doe",
  address: {
      city: "San Francisco",
      country: "USA"
    }
});
```

Segment sends Identify calls to Insider as a user insert or update request for the `userId123` with the following attributes:

```json
"uuid": "userId123",
"email": "john.doe@example.com",
"name": "John Doe",
"city": "San Francisco",
"country": "USA"
```

Insider uses `userId`, `anonymousId`, `email` and `phone number` as identifiers.

## Track

If you aren't familiar with the Segment Spec,  take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Product Viewed', {
  product_id: '507f1f77bcf86cd799439011',
  name: 'Monopoly: 3rd Edition',
  price: 18.99,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg'
});
```

Segment sends Track calls to Insider as a custom event. Only the following Page views are mapped automatically to Insider's default events:
- Product List Viewed
- Product Viewed
- Cart Viewed
- Order Completed.

```json
"product_id": "507f1f77bcf86cd799439011"
"name": "Monopoly: 3rd Edition",
"price": 18.99,
"url": "https://www.example.com/product/path",
"product_imgage_url": "https://www.example.com/product/path.jpg"
```

Some Segment Track methods map to Insider's predefined events. These are detected using the event name in the Track event. The table below lists these event names and their Insider mappings.

| Segment event name  | Insider predefined event |
| ------------------- | ------------------------ |
| Product List Viewed | Listing Page View        |
| Product Viewed      | Product Detail Page View |
| Cart Viewed         | Cart Page View           |
| Order Completed     | Purchase                 |
