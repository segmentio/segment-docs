---
title: Rabble AI Destination
id: 65c0426487cd2bfcaaae517c
---

[Rabble AI](https://rabble.ai){:target="_blank"} is an AI platform that helps contextualize your structured & unstructured data for AI-readiness.

Rabble AI helps organizations achieve true data readiness for the AI era. Modern enterprises have invested heavily in data infrastructure, from Snowflake and Redshift to BigQuery, but infrastructure alone doesn’t make data usable for AI. Rabble AI bridges the gap by transforming raw, fragmented datasets into AI-ready, semantically enriched data foundations that power smarter, safer, and more reliable AI applications.

This destination is maintained by Rabble AI. For any issues with the destination, [contact the Rabble AI Support team](mailto:support@rabble.ai).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for "Rabble AI".
2. Select Rabble AI and click **Add Destination**.
3. Select an existing source to connect to Rabble AI.
4. Go to the [Rabble AI](https://app.rabble.ai){:target="_blank"} to get your API key.
5. Enter the API Key in the Rabble AI destination settings in Segment.

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
