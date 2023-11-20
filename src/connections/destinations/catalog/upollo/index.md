---
title: Upollo Destination
---

[Upollo](https://upollo.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} gives unique and actionable insights that lead to conversion, retention, and expansion.

This destination is maintained by Upollo. For any issues with the destination, [contact Upollo's Support team](mailto:support@upollo.ai).

> info ""
> The Upollo Destination is currently in beta, which means that Upollo still actively developing the destination. If you are interested in joining the beta program or have any feedback to help improve the Upollo Destination and its documentation, [let the Upollo team know](mailto:support@upollo.ai).


## Getting started

1. From the [Upollo Connections screen](https://app.upollo.ai/settings/connections), in the Segment connection, click **Configure**
2. Under **I am not a Segment workspace admin**, click **Connect**
3. Choose which Source should send data to the Upollo destination.

## Supported methods

### Identify

Send [Identify](/docs/connections/spec/identify) calls to Upollo. For example:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
  name: "John Doe",
  phone: "+123456789",
});
```

Segment sends Identify calls to Upollo as an `identify` event. Upollo's unique insights are shown in the Upollo dashboard with enriched data.
