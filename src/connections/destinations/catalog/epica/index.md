---
title: EPICA Destination
rewrite: true
id: 5c6dca8369c83b0001d6b868
---
[EPICA](https://www.epica.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the world's first Prediction-as-a-Service platform. Powered by AI, EPICA captures, processes and analyses online data sources to accurately predict customer behavior. EPICA provides predictive analytics for growth marketers, leveraging machine learning to automate audience insights and recommendations.

This destination is maintained by EPICA. For any issues with the destination, [contact the Epica Support team](mailto:support@epica.ai).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "EPICA" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your EPICA [Account settings](https://platform.epica.ai/account).


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to EPICA as a `page`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to EPICA as a `screen`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  firstName: 'Peter',
  lastName: 'Gibbons',
  phone: '888-8880'
});
```

Identify calls will be sent to EPICA as an `identify` event. Traits are optional but EPICA recommends the following:`email`,`firstName`,`lastName` and`phone`.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button', {
  color: 'Red',
  size: 'Large'
})
```

Track calls will be sent to EPICA as a `track` event and can be seen populated in the `Data Platform > Personas` section of EPICA [admin panel](https://platform.epica.ai/personas), which includes unified profiles across a single customer journey.

There are two types of Personas:

- Anonymous - events triggered by a visitor who only has an `anonymousId`
- Identified - events triggered by an identified user with a `userId`, `email` or `phone`
