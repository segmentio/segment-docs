---
title: Churned Destination
id: 6638e615c59c2acad44ec223
---

[Churned](https://www.churned.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="\_blank”} is an AI-powered customer success platform for subscription businesses, eliminating the need for rule-based decision making with live AI-driven actions. It uses machine learning to predict churn and drive customer retention.

This destination is maintained by Churned. For any issues with the destination, [contact the Churned Support team](mailto:info@churned.io).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="\_blank”} search for "Churned"
2. Select "Churned" and click **Add Destination**
3. Choose which Source should send data to the "Churned" destination.
4. Enter the **API Key** you've received from Churned in the "Churned" destination settings in Segment.

## Supported methods

Churned supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls. For example:

```js
analytics.page();
```

Segment sends Page calls to Churned as a `pageview`.

### Identify

Send [Identify](/docs/connections/spec/identify) calls. For example:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
});
```

Segment sends Identify calls to Churned as an `identify` event.

### Track

Send [Track](/docs/connections/spec/track) calls. For example:

```js
analytics.track("Login Button Clicked");
```

Segment sends Track calls to Churned as a `track` event.
