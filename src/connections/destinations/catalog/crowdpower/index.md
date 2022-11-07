---
title: CrowdPower Destination
rewrite: true
beta: true
id: 5e59dad99437ab152550ce1f
---
[CrowdPower](https://crowdpower.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a growth marketing platform that enables businesses to track key customer actions and deliver automated tailored communications to drive sales and increase engagement.

This destination is maintained by CrowdPower. For any issues with the destination, [contact the CrowdPower Support team](mailto:support@crowdpower.io).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "CrowdPower" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the API Key into your Segment Settings UI which you can find from your [CrowdPower Project Settings](https://app.crowdpower.io).
4. To find your CrowdPower API Key, go to the CrowdPower Console and click **Settings** in the sidebar menu. Use your CrowdPower project's Public Key as the API key for Segment.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  name: 'John Doe',
  email: 'john.doe@example.com',
  signed_up_at: 1583564043,
});
```

Identify calls in Segment create or update customers and their attributes in CrowdPower. Customer attributes may be used for creating segments. Your segments may be used as audiences for your marketing campaigns.

> Date attributes should be sent as UNIX timestamps (UTC), and the keys should end in `_at`.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Purchased Item', {
    name: 'Cobb Salad',
    sku: 'ABC123',
    price: 1200,
})
```

Track calls in Segment create events for each customer in CrowdPower. Each event may have corresponding properties that may be used for creating customer segments and triggering marketing campaigns.

> Date properties should be sent as UNIX timestamps (UTC), and the keys should end in `_at`.

### Charge

To track customer revenue in CrowdPower, send the `track` event with the `revenue` key present.

```js
analytics.track('New Charge', {
    revenue: 1200,
})
```

Track calls with the revenue key are treated as a charge in CrowdPower and do not appear in the customer's event feed. The revenue is attributed to the customer, and the event name (and any other properties) are ignored.
