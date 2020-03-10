---
title: 'Proof Experiences Destination'
beta: true
rewrite: true
redirect_from: 'docs/connections/destinations/proof'
---

[Proof Experiences](https://useproof.com/experiences?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps B2B SaaS businesses increase new trials and demos by creating delightfully personalized experiences for their visitors and customers.

This destination is maintained by Proof. For any issues with the destination, please [reach out to their team](mailto:help@useproof.com).

_**NOTE:** Proof Experiences is currently in beta, which means that there may still be some bugs for us to iron out. This doc was last updated on February 21, 2019, and we'd love to hear your feedback. If you are interested in joining our beta program or have any feedback to help us improve the Proof Experiences Destination and its documentation, please [let us know](mailto:help@useproof.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Proof Experiences" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Proof Experiences dashboard](https://app.proof-x.com/account/apikeys).
4. You should see data flowing into your Proof dashboard in the [event debugger](https://app.proof-x.com/settings/events) within 1 minute of creating your API key and activating your Proof Experiences integration.


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Proof Experiences as a `pageview`.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  role: 'Software Engineer',
  company: 'Segment'
});
```

Identify calls will be sent to Proof Experiences as an `identify` call along with any included traits (optional).


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button', {
    btnText: 'Sign in here'
})
```

Track calls will be sent to Proof Experiences as a `track` call along with any included properties (optional).
