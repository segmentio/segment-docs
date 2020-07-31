---
title: PostHog Destination
rewrite: true
---
[PostHog](https://posthog.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is self-hosted, open-source analytics product. Get the same powerful features as other product analytics software but keep full control over your data.

This destination is maintained by PostHog. For any issues with the destination, [contact the PostHog Support team](mailto:hey@posthog.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "PostHog" in the Destinations Catalog, and select the "PostHog" destination.
3. Choose which Source should send data to the PostHog destination.
4. Go to your PostHog setup page, find and copy the “API key”.
    - [Saas Account Setup Page](https://app.posthog.com/setup)
6. Enter the “API Key” in the “PostHog” destination settings in Segment.

**Note**: If you're hosting your own PostHog instance, add the URL of your instance without the trailing slash. Ex. `https://posthog-example.herokuapp.com`

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to PostHog as a `$pageview`.


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. An example call would look like:

```obj
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to PostHog as a `$screen` event.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to PostHog as an `identify` event. Data will appear under the People tab.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to PostHog as a `track` event.

## Alias

If you haven't had a chance to review our spec, please take a look to understand what the [Alias method](https://segment.com/docs/connections/spec/alias/) does. An example call would look like:

```js
analytics.alias('507f191e81')
```

Segment sends Alias calls to PostHog as an `alias` event.
