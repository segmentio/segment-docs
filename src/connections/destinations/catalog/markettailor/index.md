---
title: Markettailor destination
rewrite: true
id: 6096714984bdd26c427c9250
---
[Markettailor](https://www.markettailor.io/), helps B2B marketers create personalized websites without code, leveraging company data, audience insights, and recommendations.

Markettailor maintains this destination. For any issues with the destination, contact the Markettailor Support team.

## Getting Started
{% include content/connection-modes.md %}

1. From the destinations catalog page in the Segment App, click **Add destination**.
2. Search for “Markettailor” in the destinations Catalog, and select the Markettailor destination.
3. Choose which Source should send data to the Markettailor destination.
4. Go to the [Markettailor Integrations page](https://app.markettailor.io/integrations), find the Segment integration, click **Authorize**, and copy the API key.
5. Enter the API Key in the Markettailor destination settings in Segment.

## Supported methods

Markettailor supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to Markettailor. For example:

```js
analytics.page()
```

Segment sends Page calls to Markettailor as a `page view`.

### Identify
Send [Identify](/docs/connections/spec/identify) calls to Markettailor. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
  });
```

Segment sends Identify calls to Markettailor as an `identify` event.

### Track
Send [Track](/docs/connections/spec/track) calls to Markettailor. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Markettailor as a `track` event.


