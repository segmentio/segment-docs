---
title: Lou Destination
rewrite: true
id: 5fac1adf1aa5eb4a01168950
---
[Lou](https://wwww.louassist.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) turns new users into power users with self-serve onboarding, personalized product tours, and feature announcements. Launch in just minutes with no dev time required.

This destination is maintained by Lou. For any issues with the destination, [contact the Lou Support team](mailto:support@louassist.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Lou" in the Destinations Catalog, and select the Lou destination.
3. Choose which Source should send data to the Lou destination.
4. Go to the [Lou dashboard](https://dashboard.louassist.com/integrations), add Segment as a new integration, and click **Generate API Key**
5. Enter the "API Key" in the Lou destination settings in Segment.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  company: 'Company A',
  permissions: 'admin',
});
```

Segment sends traits in Identify calls to Lou as properties that can be used in [Custom Segments](https://dashboard.louassist.com/segments) to group users into different audiences.

Lou does not accept any personally identifiable information (PII) fields from Identify calls. These fields are automatically filtered out so they do not reach Lou's servers. For a full list of PII fields that Lou removes from Identify calls, see [Lou's Segment integration documentation](https://www.louassist.com/docs/integrations/segment).

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Lou as Events that can be used to define [Goals](https://dashboard.louassist.com/goals).
