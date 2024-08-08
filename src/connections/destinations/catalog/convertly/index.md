---
title: Convertly Destination
id: 65e8b496eec9c40dbccbf749
---

[Convertly](https://www.tryconvertly.com){:target="\_blank”} lets you run AI on your product analytics. Create and generate charts and analyze data in minutes.

This destination is maintained by Convertly. For any issues with the destination, contact the [Convertly support team](mailto:support@tryconvertly.com).

## Getting started

1. From the Destination catalog page in the Segment app, search for Convertly.
2. Select and click **Add Destination**.
3. Select an existing Source to connect to.
4. In Convertly, navigate to your [API Keys](https://www.app.tryconvertly.com/account/apikeys){:target="\_blank"} page.
5. Copy your API key.
6. Return to Segment and enter the API key in the destination settings for your Convertly destination.

## Supported methods

Convertly supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send Page calls to Convertly, for example:

```js
analytics.page();
```

Page calls are used in Convertly to analyze drop off and build user funnels.

### Identify

Send Identify calls to Convertly, for example:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com"
});
```

Identify calls are used in Convertly to recognize users with a unique ID. This allows Convertly to generate charts and tables, providing insights into how users interact with data—all in natural language.

### Track

Send Track calls to Convertly, for example:

```js
analytics.track("Login Button Clicked");
```

Track calls, along with event names, are used in Convertly to track user events. Once a track event is sent, Convertly can query the data using natural language.
