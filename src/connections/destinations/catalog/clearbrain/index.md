---
title: ClearBrain Destination
rewrite: true
id: 5c412bc57526b50001622f52
---
[ClearBrain](https://clearbrain.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides self-serve predictive analytics for growth marketers, using machine learning to automate audience insights and recommendations.

This destination is maintained by ClearBrain. For any issues with the destination, [contact the ClearBrain Support team](mailto:support@clearbrain.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "ClearBrain" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [ClearBrain dashboard](https://app.clearbrain.com/connections).

> tip ""
> **Optional**: If you are on a Business tier Segment plan, you can sync past events sent through Segment to your ClearBrain instance using [Segment Replay](/docs/guides/what-is-replay/).


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to ClearBrain as a `pageview`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/page/) does. An example call would look like:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to ClearBrain as a `screenview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to ClearBrain as an `identify` event. The `userId` becomes the primary key used to identify user attributes across later user activity events. These are then used to train and personalize your ClearBrain predictions.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Clicked Login Button')
```

Segment sends Track calls to ClearBrain as a `track` event. You can use these to configure conversion goals to inform ClearBrain predictive analyses. You can use any Track call that has been instrumented for at least one week as the basis for a predictive goal in ClearBrain.
