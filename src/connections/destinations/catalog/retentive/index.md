---
title: Retentive Destination
id: 6205293e7095075d8ce71a74
---
[Retentive](https://retentive.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="blank"} makes your help docs searchable in product so go-to-market teams can act on data that each customer struggles with.

Retentive maintains this destination. For any issues with the destination, [contact the Retentive Support team](mailto:help@retentive.io).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. In the Destinations Catalog, search for "Retentive" and select the Retentive destination.
3. Choose which source should send data to the Retentive destination.
4. Navigate to the [Retentive integrations tab](https://app.retentive.io/integrations){:target="blank"}.
5. Toggle the Segment integration on, and copy the API key presented.
6. In the Retentive destination settings in Segment, enter the API key.

## Supported methods

Retentive supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to track user metadata alongside their search queries in the Retentive dashboard. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Customer data only displays once customers perform searches on Retentive.

### Alias

Send [Alias](/docs/connections/spec/alias) calls to merge customers from different destinations into a single customer in Retentive. For example:

```js
analytics.alias(
    'primaryId',
    'previousId' // optional
);
```
