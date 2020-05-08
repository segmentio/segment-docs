---
rewrite: true
title: Refiner Destination
---
[Refiner](https://refiner.io?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a user qualification and lead scoring platform for B2B SaaS companies with a free trial or freemium model. Refiner helps self-service SaaS providers to identify and convert more high-revenue accounts.

This destination is maintained by Refiner. For any issues with the destination, please [reach out to their team](mailto:contact@refiner.io).

_**NOTE:** The Refiner Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 24, 2019. If you are interested in joining their beta program or have any feedback to help improve the Refiner Destination and its documentation, please [let  their team know](mailto:contact@refiner.io)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Refiner" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find in the settings of your [Refiner dashboard](https://app.refiner.io) under Integrations > Segment..

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

Segment sends page() calls to Refiner as a `pageview` event.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends identify() calls to Refiner as an `identify` event.

## Group

If you haven’t had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like:

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

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends track() calls to Refiner as a `trackEvent` event. Please note that Refiner doesn’t store the attributes sent alongside an event.
