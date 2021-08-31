---
title: ProsperStack Destination
rewrite: true
beta: true
---

[ProsperStack](https://prosperstack.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the hosted cancellation flow for subscription businesses that automatically prevents churn. Retain customers with targeted offers and interventions designed to prevent cancellations and increase customer lifetime value.

ProsperStack maintains this destination. For any issues with the ProsperStack Destination, [contact the ProsperStack Support team](mailto:support@prosperstack.com).

> The ProsperStack Destination is currently in beta, and is actively developing.  To join the beta program, or if you have any feedback to help improve the ProsperStack Destination and its documentation, [contact the ProsperStack support team](mailto:support@prosperstack.com).

## Getting Started

{% include content/connection-modes.md %}

### Automated setup

1. Log in to the [ProsperStack dashboard](https://app.prosperstack.com){:target="\_blank"}.
2. Navigate to **Settings** > **Manage integrations**.
3. Click **Configure** in the Segment integration section.
4. Click **Connect Segment**.
5. Select a Segment workspace and source to send to the ProsperStack Destination.

To add additional sources, click the **Connect a source** link.

### Manual setup

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "ProsperStack" in the Destinations Catalog, and select the "ProsperStack" destination.
3. Choose which Source should send data to the "ProsperStack" destination.
4. Create a new API key from the [ProsperStack API keys settings screen](https://app.prosperstack.com/settings/api-keys){:target="\_blank"}.
5. Enter the "API Key" in the "ProsperStack" destination settings in Segment.

## Supported methods

ProsperStack supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to ProsperStack to update subscriber custom properties in ProsperStack. For example:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
  traits: {
    "Number of contacts": 5800,
    "Is professional": true,
    "Last contacted": "2021-05-04",
    "Preferred name": "Johnny",
  },
});
```

Segment sends Identify calls to ProsperStack as an `identify` event.

Custom traits specified in an Identify call will update [custom properties](https://prosperstack.com/docs/custom-properties/){:target="\_blank"} for a corresponding subscriber in ProsperStack. An `email` must be specified in an Identify call in order for a ProsperStack subscriber to be matched with the Identify call.

Custom properties in ProsperStack that match the exact key of a trait will be updated automatically, otherwise additional trait mappings can be configured in the [ProsperStack configuration dashboard](https://app.prosperstack.com/settings/integrations/segment){:target="\_blank"}.
