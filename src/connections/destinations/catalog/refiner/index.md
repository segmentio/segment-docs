---
rewrite: true
title: Refiner Destination
id: 5c9a968bd217dc000108159a
---
[Refiner](https://refiner.io?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a user qualification and lead scoring platform for B2B SaaS companies with a free trial or freemium model. Refiner helps self-service SaaS providers to identify and convert more high-revenue accounts.

This destination is maintained by Refiner. For any issues with the destination, [contact the Refiner Support team](mailto:contact@refiner.io).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Refiner" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter your Refiner "API Key" into the Segment Settings. You can find this key in on the [Refiner dashboard](https://app.refiner.io) settings under Integrations > Segment.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

Segment sends page() calls to Refiner as a `pageview` event.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends identify() calls to Refiner as an `identify` event.

## Group

If you haven't had a chance to review our spec, take a look tounderstand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

Group calls are the equivalent of providing an account object in a `identifyUser` call in Refiner.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends track() calls to Refiner as a `trackEvent` event. Note that Refiner doesn't store the attributes sent alongside an event.
