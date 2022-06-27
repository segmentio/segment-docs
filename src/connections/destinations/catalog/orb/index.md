---
title: Orb Destination
id: 625ed45387dd6603f5380424
---
[Orb](https://www.withorb.com/) provides scalable, reliable, and flexible billing infrastructure for usage based revenue models at companies of all sizes.

This destination is maintained by Orb. For any issues with the destination, [Contact the Orb support team](mailto:support@withorb.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Orb" in the Destinations Catalog, and select the "Orb" destination.
3. Choose which Source should send data to the "Orb" destination.
4. Go to the [Orb dashboard](https://app.billwithorb.com), create a new API key from the configuration's page or reuse an existing one. We recommend creating a new API key for this integration.
5. Enter the "API Key" in the "Orb" destination settings in Segment.
6. Fill out the settings for properties' mapping fields, external customer Id, Idempotency key (optional), and event name (optional).

## Supported methods

Orb currently supports track calls, as specified in the [Segment Spec](/docs/connections/spec).

### Track

Use [Track](/docs/connections/spec/track) calls to automatically send usage events based on your customer's interactions with your application. Any Segment track call will be ingested through [Orb's ingestion pipeline](https://docs.withorb.com/docs/orb-docs/event-ingestion) and usage information will be used to calculate billable totals. For example:
```js
analytics.track({
  event: "payment_confirmed",
  userId: "external_customer_id",
  properties: {
    amount: 100.00,
    currency: "USD",
    confirmation_time: "2022-05-11T21:33:13.1652304793Z"
  }
});
```
Similar to Segment, Orb supports a flexible event schema in the `properties` dictionary, which should be non-null and not contain nested objects. Within Orb, you can configure metrics by filtering and aggregating events. When you configure the Orb destination, you will be required to specify a mapping of keys from the original Segment event to Orb’s usage event. You’ll also be able to configure keys corresponding to Orb’s required fields such as `event_name` , `idempotency_key`, and `external_customer_id`. 

Events ingested via the track spec will be available on the Orb admin dashboard, specifically on the [Events page](https://app.billwithorb.com/events).