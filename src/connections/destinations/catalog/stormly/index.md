---
rewrite: true
title: Stormly Destination
---

[Stormly](https://www.stormly.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides easy-to-use building blocks to quickly create tailor-made analytics solutions using AI, in the form of reusable Templates. Or use ready Templates available on the platform like retention, segmentation, sales forecasting and more.

This destination is maintained by Stormly. For any issues with the destination, [contact their support team](mailto:support@stormly.com).

> note "Note:"
> The Stormly Destination is currently in beta, which means that they are still actively developing the destination. To join the Stormly beta program, or if you have any feedback to help improve the Stormly Destination and its documentation, [contact the Stormly support team](mailto:support@stormly.com)!

## Getting Started

{% include content/connection-modes.md %} 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Stormly" in the Destinations Catalog, and select the Stormly destination.
3. Choose which Source should send data to the Stormly destination.
4. Go to the [Stormly projects](https://www.stormly.com/projects) page, click "Set-Up Data" and under "Use tracking code from:" pick "Segment.com". Copy the "API key".
5. Enter the "API Key" in the "Stormly" destination settings in Segment.

_Note:_ Tracked data becomes available in Stormly within seconds usually, but new projects become "active" only once at least 50 unique users are tracked.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Stormly as a `pageview`. 


## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](https://segment.com/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Stormly as a `screen`. 


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Stormly as an `identify` event.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Stormly as an `event`.

## Arrays

Stormly doesn't support arrays in traits or properties. In the example below the `products` property will be ignored:

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

Stormly supports everything else such as nested properties.
