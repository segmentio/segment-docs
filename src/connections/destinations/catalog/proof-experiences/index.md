---
title: 'Proof Experiences Destination'
beta: true
rewrite: true
redirect_from: '/connections/destinations/catalog/proof/'
id: 5c4ba7167eed0c0001977f25
---
[Proof Experiences](https://useproof.com/experiences?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps B2B SaaS businesses increase new trials and demos by creating delightfully personalized experiences for their visitors and customers.

This destination is maintained by Proof. For any issues with the destination, [contact the Proof Experiences Support team](mailto:help@useproof.com).


{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Proof Experiences" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your Proof Experiences dashboard.
4. You should see data flowing into your Proof dashboard in the event debugger within 1 minute of creating your API key and activating your Proof Experiences integration.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Proof Experiences as a `pageview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  role: 'Software Engineer',
  company: 'Segment'
});
```

Identify calls will be sent to Proof Experiences as an `identify` call along with any included traits (optional).


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button', {
    btnText: 'Sign in here'
})
```

Track calls will be sent to Proof Experiences as a `track` call along with any included properties (optional).
