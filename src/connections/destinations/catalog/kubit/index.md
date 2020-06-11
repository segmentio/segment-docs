---
title: Kubit Destination
rewrite: true
---
[Kubit](https://kubit.ai) is an analytics tool which makes deep data discovery and insights accessible for everyone. Kubit Smart Analytics help product people get clear, fast answers about user engagement and retention. When you send your events through Segment, you benefit from Kubit's AI-powered behavioral analytics, diagnostics, and collaborative workspaces.

This destination is maintained by Kubit. For any issues with the destination, contact the  [Kubit Support team](mailto:support@kubit.ai).

## Getting Started

{% include content/connection-modes.md %}

1. On Kubit's [Welcome Page](https://segment.kubit.ai/segment), click on “**Connect to Segment**”.
![](images/oauth.png)
2. Select the Source you'd like to connect to Kubit Destination and click **Allow**.

## Page

If you haven't had a chance to review Segment's spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```js
analytics.page()
```
Segment sends page() calls to Kubit as a `pageview`.

## Track

If you aren't familiar with the Segment Spec,  take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```
Segment sends Track calls to Kubit as a `track` event.
