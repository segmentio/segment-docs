---
title: Willow Destination
rewrite: true
id: 620ebe78b4e75580b6e6b72a
---

[Willow](https://heywillow.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a customer support platform for early stage startups. It focuses on getting your whole team (even engineering) to solve issues together with commenting and tagging, shows you everything in one place from customer messages to in-app actions, and it shows your entire customer's journey in one continuous feed from day one to today.

Willow maintains this destination. For any issues with the destination, [contact the Willow Support team](mailto:help@heywillow.io).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **Willow** in the Destinations Catalog, and select the **Willow** destination.
3. Choose which Source should send data to the Willow destination.
4. Select the team from your [Willow workspace](https://heywillow.io/a/workspace){:target="\_blank"}.
5. Go to your team's settings page and select **API Keys**, and copy the **API key**.
6. Enter the **API Key** in the Willow destination settings in Segment.
## Supported methods

Willow supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to Willow to see what pages a customer has visited to get more context around their issues. For example:

```js
analytics.page();
```

Segment sends Page calls to Willow as a `Viewed Screen`.

### Screen

Send [Screen](/docs/connections/spec/screen) calls to Willow to see what screens a customer has navigated to. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Willow as a `Viewed Page`.

### Identify

Send [Identify](/docs/connections/spec/identify) calls to Willow to add traits to the customer. You can view these in the lifetime view and customer overview. For example:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
});
```

Segment sends Identify calls to Willow as an `identify` event.

### Track

Send [Track](/docs/connections/spec/track) calls to Willow to record an event in a customer's lifetime view. For example:

```js
analytics.track("Login Button Clicked");
```

Segment sends Track calls to Willow as a `track` event.

