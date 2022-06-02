---
title: SegMetrics Destination
rewrite: true
id: 5ec2b3adf7d3322ea12f3c04
---
[SegMetrics](https://segmetrics.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a lead and revenue attribution tool for marketers. It combines cross-platform behavioral data from the marketing tools you already use to create a holistical customer journey of your entire marketing funnel.

This destination is maintained by SegMetrics. For any issues with the destination, [contact the SegMetrics Support team](mailto:support@segmetrics.io).

## Getting Started

{% include content/connection-modes.md %}

1. Go to your [Integrations tab](https://app.segmetrics.io/a/integration) in SegMetrics, and click **Connect** for the Segment Integration.
2. Go to your [Account Settings](https://app.segmetrics.io/a/account/edit) and copy your SegMetrics `Account Id` and `API Key`.
3. From the Destinations catalog page in the Segment App, click **Add Destination**.
4. Search for “SegMetrics” in the Destinations Catalog and select the SegMetrics Destination.
5. Enter the `Account Key` and `API Key` in the SegMetrics destination settings in Segment.

> info ""
> Data is available in your dashboard depending on your [SegMetrics plan](https://segmetrics.io/pricing/).

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends `page` calls to SegMetrics as `view` events, which are available in the analytics dashboard as a `click` event.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track("User Registered", {
  plan: "Pro Annual",
  accountType: "Facebook"
});
```

Segment sends `track` calls to SegMetrics as `view` events, which are available in the analytics dashboard as a `click` event.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends `identify` calls to SegMetrics as `identify` events.

An email address is **required** by SegMetrics to connect a contact to your existing contacts in your CRM.

When you identify a new contact, the user's visitor tracking is connected to contacts in your CRM that share the same email address.
