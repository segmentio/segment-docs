---
title: FoxMetrics Destination
rewrite: true
id: 54521fd625e721e32a72eeb2
---
[FoxMetrics](https://www.foxmetrics.com/) is a personalization platform that allows users to collect & analyze customer actions through computers, mobile, and web applications. The `analytics.js` FoxMetrics destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-foxmetrics).

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "FoxMetrics" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Add your FoxMetrics `App ID`
4. When you enable FoxMetrics from the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading
 FoxMetrics's JavaScript onto your page.

Remember to remove FoxMetrics's native snippet from your page.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page();
```

When you call [`page`](/docs/connections/spec/page/), we call FoxMetrics' `record` with the exact same parameters.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@example.com",
  plan: "premium",
  logins: 5
});
```

When you call `identify` on `analytics.js`, we call FoxMetrics' `_fxm.visitor.Profile` to store all traits provided.


## Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track("Registered", {
  plan: "Pro Annual",
  accountType: "Facebook"
});
```

When you call `track` on `analytics.js`, we push your event and properties onto the `_fxm` object.
