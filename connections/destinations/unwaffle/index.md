---
rewrite: true
---

[Unwaffle](https://unwaffle.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps SaaS businesses improve their Free Trial conversion rates. By tracking every action that your trialers take, Unwaffle can discover patterns that lead to successful conversions and provide actionable recommendations to boost trial funnel performance.

This destination is maintained by Unwaffle. For any issues with the destination, please [reach out to their team](mailto:info@unwaffle.com).

_**NOTE:** The Unwaffle Destination is currently in beta, that they are still actively developing the product. This doc was last updated on February 27, 2019. If you are interested in joining their beta program or have any feedback to help improve the Unwaffle Destination and its documentation, please [let  their team know](mailto:info@unwaffle.com)!_

## Getting Started

<!-- {{>connection-modes}} --> 

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Unwaffle" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. In the Segment Settings UI "API Key" field, paste the "Public Key" for your Unwaffle Project, which you can find from your [Unwaffle KeyPair list](https://unwaffle.com/Setup/KeyPairManage.aspx).
4. Familiarize yourself with the [Basic Concepts](https://unwaffle.com/api/docs/#basic-concepts) section of the Unwaffle API Documentation, including the list of [Stock Labels](https://unwaffle.com/api/docs/#stock-labels) that must be implemented for the service to function.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('12345', {
  email: 'john.doe@segment.com',
  name: 'John Doe'
});
```

Identify calls will be sent to Unwaffle as an [`AddParticipant`](https://unwaffle.com/api/docs/#addparticipant) event and must include a `userId`. Unwaffle does not support anonymous activity and such activity will be dropped from sending.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('TrialStart')
```

Track calls will be sent to Unwaffle as an [`AddAction`](https://unwaffle.com/api/docs/#addaction)  event.

**IMPORTANT:** Unwaffle does not support anonymous activity. Ensure that you have [identified](https://segment.com/docs/destinations/unwaffle/#identify) the user before calling Track.