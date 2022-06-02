---
title: PostHog Destination
rewrite: true
id: 5ece242d61055a0b1bb2e103
---
[PostHog](https://posthog.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is self-hosted, open-source analytics product. Get the same powerful features as other product analytics software but keep full control over your data.

This destination is maintained by PostHog. For any issues with the destination, [contact the PostHog Support team](mailto:hey@posthog.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "PostHog" in the Destinations Catalog, and select the PostHog destination.
3. Choose which Source should send data to the PostHog destination.
4. Go to your [PostHog set up page](https://app.posthog.com/setup), and find and copy the **API key**.
5. Enter the PostHog API Key that you copied in the PostHog destination settings in Segment.

> note ""
> **Note**: If you're hosting your own PostHog instance, add the URL of your instance without the trailing slash in the **PostHog instance** setting. For example, `https://posthog-example.herokuapp.com`

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to PostHog as a `$pageview`.


## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to PostHog as a `$screen` event.


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to PostHog as an `identify` event. Data from Identify calls appears in PostHog under the **People** tab.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to PostHog as a `track` event.

## Alias

If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias('507f191e81')
```

Segment sends Alias calls to PostHog as an `alias` event.
