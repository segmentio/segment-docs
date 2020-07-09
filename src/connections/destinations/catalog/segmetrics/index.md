---
title: SegMetrics Destination
rewrite: true
---
[SegMetrics](https://segmetrics.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a lead and revenue attribution tool for marketers. It combines cross-platform behavioral data from the marketing tools you already use to create a holistical customer journey of your entire marketing funnel.

This destination is maintained by SegMetrics. For any issues with the destination, [contact their team](mailto:support@segmetrics.io).

## Getting Started

{% include content/connection-modes.md %}

1. Go to your [Integrations tab](https://app.segmetrics.io/a/integration) in SegMetrics, and click "Connect" for the Segment Integration.
2. From the Destinations catalog page in the Segment App, click “Add Destination”.
3. Search for “SegMetrics” in the Destinations Catalog and select the SegMetrics Destination.
4. Go to your [Account Settings](https://app.segmetrics.io/a/account/edit) and copy your SegMetrics `Account Id` and `API Key`.
5. Enter the `Account Key` and `API Key` in the SegMetrics destination settings in Segment.
6. Data is available in your dashboard depending on your [SegMetrics plan](https://segmetrics.io/pricing/).

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

Segment sends `page` calls to SegMetrics as a `view` event and are available in the analytics dashboard as a `click` event.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track("User Registered", {
  plan: "Pro Annual",
  accountType: "Facebook"
});
```

Segment sends `track` calls to SegMetrics as a `view` event and are available in the analytics dashboard as a `click` event.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends `identify` calls to SegMetrics as an `identify` event.

An email address is **required** by SegMetrics to connect a contact to your existing contacts in your CRM.

When you identify a new contact, the user's visitor tracking is connected to contacts in your CRM that share the same email address.
