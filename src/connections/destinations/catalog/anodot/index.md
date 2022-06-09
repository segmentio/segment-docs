---
title: Anodot Destination
rewrite: true
id: 5feb4422ecbab07ade913573
---
[Anodot](https://www.anodot.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) rapidly identifies revenue-critical issues by leveraging AI to constantly monitor and correlate business performance, providing real-time alerts and forecasts.

This destination is maintained by Anodot. For any issues with the destination, [contact the Anodot Support team](mailto:support@anodot.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Anodot" in the Destinations Catalog, and select the Anodot destination.
3. Choose which Source should send data to the Anodot destination.
4. Go to Anodot's [Data Management Page](https://app.anodot.com/#!/r/bc/data-manager), create a new "Segment" Source, and copy the Integration Token.
5. Enter the Integration Token into the "API Key" field in the Anodot Destination settings in Segment.
6. [Create a Stream in Anodot](https://support.anodot.com/hc/en-us/articles/360018508380-Segment-Integration). Choose which Segment Methods and which [Dimensions](https://support.anodot.com/hc/en-us/articles/360009537879-Mapping-Dimensions-to-Measures-BETA-) to track.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Anodot as a `pageview`.

## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

``` obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Anodot as a `screenview`.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Anodot as an `identify` event.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Anodot as a `track` event.
