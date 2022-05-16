---
Blitzllama
rewrite: true
id: 616d3b0494950977f91f81a4
---

[Blitzllama](https://blitzllama.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a toolbox to collect and analyse in-app user feedback in real time. Highly contextual and continuous user insights help product teams and leaders to build products faster with their users.

This destination is maintained by Blitzllama. For any issues with the destination, [contact the Blitzllama Support team](mailto:tech@blitzllama.com).

## Getting Started

{% include content/connection-modes.md %} 


1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Blitzllama" in the Destinations Catalog, and select the "Blitzllama" destination.
3. Choose which Source should send data to the "Blitzllama" destination.
4. Go to the [Blitzllama dashboard](https://app.blitzllama.com/), navigate to the Connections tab, search for Segment, click on the card to find and copy the "API key".
5. Enter the "API Key" in the "Blitzllama" destination settings in Segment.

## Supported methods

Blitzllama supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to to identify users in Blitzllama. A trait in the Identify method maps to single Attribute in Blitzllama. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Blitzllama as an `identify` event.


### Group

Send [Group](/docs/connections/spec/group) calls to associate users with an existing or new cohorts in Blitzllama. For example:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  employees: 329
});
```

Segment sends Groups calls to Blitzllama as a `group` event.