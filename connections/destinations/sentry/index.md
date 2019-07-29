---
rewrite: true
---

[Sentry](https://sentry.io) is open-source error tracking that helps developers monitor and fix crashes in real time. Iterate continuously. Boost efficiency. Improve user experience. The `analytics.js` Sentry Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-sentry).

This document was last updated on October 16, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI’s Destinations page click on “Add Destination”.
2. Search for “Sentry” within the Destinations Catalog and confirm the Source you’d like to connect to.
3. Drop in your "Public DSN" into the Sentry destination settings.
4. We’ll automatically initialize Sentry with your "Public DSN" upon loading analytics.js.
5. Sentry will automatically start tracking errors in your app's javascript.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123');
```

When you call `identify` we call `Raven.setUserContext` by passing in the `traits` you provided. We will map the `userId` you provide as `traits.id`.
