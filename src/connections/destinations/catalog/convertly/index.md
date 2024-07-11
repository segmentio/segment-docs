---
title: Convertly Destination
id: 65e8b496eec9c40dbccbf749
beta: true
---

[Convertly](https://www.tryconvertly.com){:target="\_blank”} lets you run AI on your product analytics. Create and generate charts and analyze data in minutes.

This destination is maintained by Convertly. For any issues with the destination, contact the [Convertly support team](support@tryconvertly.com).

## Getting started

1. From the Destination catalog page in the Segment app, search for Convertly.
2. Select and click Add Destination.
3. Select an existing Source to connect to.
4. In Convertly, navigate to your [API Keys](https://www.app.tryconvertly.com/account/apikeys){:target="\_blank"} page in the Convertly app.
5. Copy your API key.
6. Enter the API key in the destination settings in Segment.

## Supported methods

Convertly supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send Page calls to ADD WHAT PAGE CALLS ARE USED FOR HERE. For example:

```js
analytics.page();
```

Segment sends Page calls to Convertly as a pageview.

### Identify

Send Identify calls to ADD WHAT IDENTIFY CALLS ARE USED FOR HERE. For example:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com"
});
```

Segment sends Identify calls to Convertly as an identify event.

### Track

Send Track calls to ADD WHAT Track CALLS ARE USED FOR HERE. For example:

```js
analytics.track("Login Button Clicked");
```

Segment sends Track calls to Convertly as a track event.
