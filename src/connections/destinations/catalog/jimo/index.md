---
title: Jimo Destination
id: 6294dd197382c750f0fe1e2d
---

[Jimo](https://yourintegration.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} enables product teams to connect with end-users in any step of the product lifecycle from ideas, shaping to release, multiplying by 5 users’ engagement and loyalty over a product.

Jimo maintains this destination. For any issues with the destination, [contact the Jimo Support team](mailto:support@usejimo.com).

## Getting started



1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for *Jimo* in the Destinations Catalog, and select the **Jimo** destination.
3. Choose which Source should send data to the Jimo destination.
4. Go to the [Jimo dashboard](https://i.usejimo.com/settings/integrations){:target="_blank"} and find and copy the API key.
5. Enter the **API Key** in the Jimo destination settings in Segment.

## Supported methods

Jimo supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to enrich your end-users data to help you target the right users based on their traits. For example:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
});
```

Segment sends Identify calls to Jimo as an `identify` event.

### Track

Send [Track](/docs/connections/spec/track) calls to help you target your end-users based on their behavior on your app. For example:

```js
analytics.track("Login Button Clicked");
```

Segment sends Track calls to Jimo as a `track` event.
