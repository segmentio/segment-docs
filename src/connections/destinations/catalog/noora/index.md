---
title: Noora Destination
rewrite: true
id: 5fd719e85f1569d6af775ec1
---
[Noora](https://noorahq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a customer product feedback management solution. It provides a centralized product feedback solution that gives you the tools to collect, aggregate and act on feedback from customers and internal teams.

This destination is maintained by Noora. For any issues with the destination, [contact the Noora Support team](mailto:support@noorahq.com).

## Getting Started

{% include content/connection-modes.md %}

1. Navigate to the Contacts tab while in your Noora workspace's Admin view.
2. Click **+** to add a Contact source and choose **Connect to Segment**.
3. Login and authorize the Noora Destination when routed to Segment.
4. Select a workspace and source and click **Allow**.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Noora as an `identify` event. The `name` and `email` traits are required fields.
