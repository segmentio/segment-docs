---
title: Inleads AI Destination
id: 6627b0208bbe1699ca06eef8
---

[Inleads.ai](http://Inleads.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is an AI-driven sales intelligence and analytics platform designed to empower startups and enterprises with comprehensive tools for growth.

Using Inleads, you can gain deeper insights into your customer journey and drive smarter decisions with the Inleads.ai and Segment integration. With this integration, seamlessly map Segment events to Inleads.ai events, enabling you to track deals, leads and customer activities across every touchpoint. Dive into real-time sales, product, and revenue insights, powered by advanced analytics and machine learning algorithms. With Inleads.ai and Segment, unlock the full potential of your customer data to fuel your business success.

This destination is maintained by [Inleads.ai](http://Inleads.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”}. For any issues with the destination, [contact the Inleads Support team](mailto:info@inleads.ai).

## Getting Started

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **Inleads** in the Destinations Catalog, and select the **Inleads** destination.
3. Choose which Source should send data to the Inleads destination.
4. Go to the [Inleads dashboard](https://app.inleads.ai/#/settings){:target="_blank"} and find the **API Key** in Settings API Keys tab.
5. Enter the **API Key** in the Inleads destination settings in Segment.

## Supported methods

Inleads supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to create new user profile or update existing users with new trait values. For example:

```js
analytics.identify("inleadsUser123", {
  email: "test@example.com",
});
```

Segment sends Identify calls to Inleads as an `identify` event.

### Track

Send [Track](/docs/connections/spec/track) calls to record user behavior in your app. For example:

```js
analytics.track("New lead created");
```

Segment sends Track calls to Inleads as a `track` event.

### Group

Send [Group](/docs/connections/spec/group) calls to associate an individual user to group. For example:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

{% include components/actions-fields.html %}
