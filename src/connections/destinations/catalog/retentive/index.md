[Retentive](https://retentive.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) makes your help docs searchable in product so your GTM team can act on data of what each customer is struggling with.

This destination is maintained by Retentive. For any issues with the destination, [contact the Retentive Support team](mailto:help@retentive.io).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Retentive" in the Destinations Catalog, and select the "Retentive" destination.
3. Choose which Source should send data to the "Retentive" destination.
4. Go to the [Retentive integrations tab](https://app.retentive.io/integrations).
5. Toggle the Segment integration on, and copy the API key presented.
6. Enter the "API Key" in the "Retentive" destination settings in Segment.

## Supported methods

Retentive supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to track user metadata alongside their search queries in the Retentive dashboard. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Customer data will only be shown once they perform searches on Retentive.

### Alias

Send [Alias](/docs/connections/spec/alias) calls to merge customers from different destinations into a single customer in Retentive. For example:

```js
analytics.alias(
    'primaryId',
    'previousId' // optional
);
```
