---
rewrite: true
---

[EPICA](https://www.epica.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the world’s first Prediction-as-a-Service platform. Powered by AI, EPICA captures, processes and analyses online data sources to accurately predict customer behavior. EPICA provides predictive analytics for growth marketers, leveraging machine learning to automate audience insights and recommendations.

This destination is maintained by EPICA. For any issues with the destination, please [reach out to their team](mailto:support@epica.ai). 

_**NOTE:**_ EPICA is currently in beta, which means that they are still actively developing the product. This doc was last updated on February 22, 2019. If you are interested in joining their beta program or have any feedback to help improve the EPICA Destination and its documentation, please [let their team know](mailto:support@epica.ai)!


## Getting Started

{{>connection-modes}} 

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "EPICA" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your EPICA [Account settings](https://platform.epica.ai/account).


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to EPICA as a `page`. 


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to EPICA as a `screen`. 


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com',
  firstName: 'Peter',
  lastName: 'Gibbons',
  phone: '888-8880'
});
```

Identify calls will be sent to EPICA as an `identify` event. Traits are optional but EPICA recommends the following:`email`,`firstName`,`lastName` and`phone`.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

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
