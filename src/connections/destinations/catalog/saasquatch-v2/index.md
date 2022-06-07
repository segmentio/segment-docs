---
title: SaaSquatch v2 Destination
id: 62439b17f9f8c788769e83f6
beta: true
---

[SaaSquatch](https://saasquatch.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a loyalty, referral and rewards platform that helps companies reward their brand advocates, build loyal communities, and accelerate revenue growth.

SaaSquatch maintains this destination. For any issues with the destination, [contact the SaaSquatch Support team](mailto:support@saasquatch.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **SaaSquatch v2** in the Destinations Catalog, and select the **SaaSquatch v2** destination.
3. Choose which Source should send data to the **SaaSquatch v2** destination.
4. Log in to the [SaaSquatch portal](https://app.referralsaasquatch.com/){:target="_blank"}.
5. Navigate to the Integrations page by selecting **Settings > Integrations**.
6. Find and enable the Segment integration.
7. Within the **Segment Destination** tab, copy the API Key.
8. Enter the copied API Key in the SaaSquatch v2 destination settings in Segment.

## Supported methods

SaaSquatch v2 supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to insert and update participants in SaaSquatch. [Read more about identify calls in the SaaSquatch docs.](https://docs.saasquatch.com/integrations/segment-v2/subscription/#identify-calls){:target="_blank"}

For example:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  referredByCodes: ["SUSAN210"],
});
```

Segment sends Identify calls to SaaSquatch v2 as an `identify` event.

### Track

Send [Track](/docs/connections/spec/track) calls to log user events in SaaSquatch. [Read more about track calls in the SaaSquatch docs.](https://docs.saasquatch.com/integrations/segment-v2/subscription/#track-calls){:target="_blank"}

For example:

```js
analytics.track("Order Completed", {
  revenue: 1000, // cents
  currency: "USD",
  order_id: "ref1234",
});
```

Segment sends Track calls to SaaSquatch v2 as a `track` event.
