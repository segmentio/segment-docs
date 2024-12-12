---
title: Rabble AI Destination
id: 65c0426487cd2bfcaaae517c
---

[Rabble AI](https://rabble.ai){:target="\_blank”} is an advanced AI platform which provides a simple and unique way for SaaS companies to understand their customers based on behavioral patterns in their existing engagement data.

Rabble securely ingests mountains of SaaS product engagement data through API or other data connections, analyzing it through hundreds of proven AI/ML models.  Our platform instantly creates an affinity map that identifies where customers are on their journeys, such as if they are product qualified for upgrade or cross-sell, or potentially at risk.

This destination is maintained by Rabble AI. For any issues with the destination, [contact the Rabble AI Support team](mailto:support@rabble.ai).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="\_blank”} search for "Rabble AI".
2. Select Rabble AI and click **Add Destination**.
3. Select an existing Source to connect to Rabble AI.
4. Go to the [Rabble AI Data Source](https://app.rabble.ai/datasources){:target="\_blank"}, click Connect on Segment Integration to find and copy the **API key**.
5. Enter the **API Key** in the Rabble AI destination settings in Segment.

## Supported methods

Rabble AI supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to Rabble AI for analysis. For example:

```js
analytics.page();
```

Segment sends Page calls to Rabble AI as a `pageview`.

### Identify

Send [Identify](/docs/connections/spec/identify) calls to Rabble AI for analysis. For example:

```js
analytics.identify("userId123", {
  company: "Sample Company, Inc.",
});
```

Segment sends Identify calls to Rabble AI as an `identify` event.

### Track

Send [Track](/docs/connections/spec/track) calls to Rabble AI for analysis. For example:

```js
analytics.track("Login Button Clicked");
```

Segment sends Track calls to Rabble AI as a `track` event.
