---
rewrite: true
title: Stormly Destination
id: 5f38f398c30a8412cb23b628
---
With [Stormly](https://www.stormly.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners), you can access the insights which interest you the most. The Stormly interface guides you through several questions to help define personalization options, then provides insights into behavioral patterns, forecasts, and other information you want to know about your users.

This destination is maintained by Stormly. For any issues with the destination, [contact their support team](mailto:support@stormly.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Stormly" in the Destinations Catalog, and select the Stormly destination.
3. Choose which Source should send data to the Stormly destination.
4. Go to the [Stormly projects](https://www.stormly.com/projects) page, click **Set-Up Data** and under "Use tracking code from:" choose **Segment.com**. Copy the API key that appears.
5. Enter the API Key you copied from the Stormly projects page in the Stormly destination settings in the Segment app.

> info ""
> Tracked data is usually available in Stormly within seconds. However, brand new projects are only  "active" once they have tracked at least 50 unique users.

### Arrays

Stormly _does not_ support arrays in traits or properties. In the example below the `products` property is ignored:

```js
analytics.track('View Webshop Items', {
  cartId: "cart-12345",
  products: [
    {
      productId: "1",
      price: 99.0
    },
    {
      productId: "1",
      price: 99.0
    }
  ]
});
```

Stormly supports nested properties and traits, except for nested arrays.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Stormly as a `pageview`.


## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Stormly as a `screen`.


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Stormly as an `identify` event.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Stormly as an `event`.
