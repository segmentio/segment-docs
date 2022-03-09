---
title: Statsig Destination
id: 613ba8c0114797213a8eff94
---
[Statsig](https://www.statsig.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps companies safely A/B test features in production before rolling them out, avoiding product debates and costly mistakes when shipping out new features. Statsig automates the grunt work so that A/B tests are always running automatically and you always know how your features are performing.

This destination is maintained by Statsig. For any issues with the destination, [contact the Statsig Support team](mailto:support@statsig.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for “Statsig” in the Destinations Catalog, and select the “Statsig” destination.
3. Choose which Source(s) should send data to the “Statsig” destination.
4. Go to the [Statsig dashboard](https://console.statsig.com/api_keys), find and copy the Statsig "Server Secret Key”.
5. Enter the Statsig “Server Secret Key” in the “Statsig” destination settings in Segment.

## Supported methods

Statsig supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to Statsig. For example:

```js
analytics.page("Home")
```

Segment sends Page calls to Statsig as:

```js
{
  "event": "segment_page:Home"
}
```

These events are included in any experiments running on Statsig and will show up in all Metrics data.

### Screen

Send [Screen](/docs/connections/spec/screen) calls to Statsig. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Statsig as:

```js
{
  "event": "segment_screen:Home"
}
```

These events are included in any experiments running on Statsig and will show up in all Metrics data.

### Track

Send [Track](/docs/connections/spec/track) calls to Statsig. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Statsig as:

```js
{
  "event": "segment_track:Login Button Clicked"
}
```

These events are included in any experiments running on Statsig and will show up in all Metrics data.
