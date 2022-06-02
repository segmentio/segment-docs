---
rewrite: true
title: Unwaffle Destination
id: 5c707b074876c300018c37ab
---
[Unwaffle](https://unwaffle.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps SaaS businesses improve their Free Trial conversion rates. By tracking every action that your trialers take, Unwaffle can discover patterns that lead to successful conversions and provide actionable recommendations to boost trial funnel performance.

This destination is maintained by Unwaffle. For any issues with the destination, [contact the Unwaffle Support team](mailto:info@unwaffle.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Unwaffle" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the Segment Settings UI "API Key" field, paste the "Public Key" for your Unwaffle Project, which you can find from your [Unwaffle KeyPair list](https://unwaffle.com/Setup/KeyPairManage.aspx).
4. Familiarize yourself with the [Basic Concepts](https://unwaffle.com/api/docs/#basic-concepts) section of the Unwaffle API Documentation, including the list of [Stock Labels](https://unwaffle.com/api/docs/#stock-labels) that must be implemented for the service to function.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('12345', {
  email: 'john.doe@example.com',
  name: 'John Doe'
});
```

Identify calls will be sent to Unwaffle as an [`AddParticipant`](https://unwaffle.com/api/docs/#addparticipant) event and must include a `userId`. Unwaffle does not support anonymous activity and such activity will be dropped from sending.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('TrialStart')
```

Track calls will be sent to Unwaffle as an [`AddAction`](https://unwaffle.com/api/docs/#addaction)  event.

**IMPORTANT:** Unwaffle does not support anonymous activity. Ensure that you have [identified](/docs/connections/destinations/catalog/unwaffle/#identify) the user before calling Track.
