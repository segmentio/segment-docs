---
title: Webhooks (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 614a3c7d791c91c41bae7599
versions:
  - name: 'Webhooks (Classic)'
    link: '/docs/connections/destinations/catalog/webhooks'
---

{% include content/plan-grid.md name="actions" %}

Segment's Webhooks (Actions) destination uses internet protocol and HTTP callback to submit real-time user data to your own HTTP endpoints. With this destination, you can POST, PUT, or PATCH data to any webhook URL.

## Getting Started

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for **Webhooks (Actions)** in the Destinations Catalog, and select the destination.
3. Click **Configure Webhooks (Actions)**.
4. Select the source that will send data to Webhooks (Actions) and follow the steps to name your destination.
5. If you require authentication, add in a shared secret on the **Settings** > **Advanced Settings** tab. If you provide a shared secret, Segment will sign requests with an HMAC in the "X-Signature" request header. The HMAC is a hex-encoded SHA1 hash generated using the shared secret and the request body.
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings). You can create up to 5 mappings, each of which can send to a different webhook URL.
7. Enable the destination and configured mappings.

{% include components/actions-fields.html settings="true" %}

## Batch size limits

In Webhook Actions mapping, the default value of batch size is `1000`. You can change this value, but there's a maximum batch size limit of `4000`. 

## Shared secret with batching

If you have batching enabled and are using a shared secret to authenticate your requests, Segment signs the _first_ event in the batch rather than the whole batch. When verifying the `X-Signature` header in your code, ensure you're only signing the first event in the batch to match the signature with what Segment creates. 

## FAQs

### Why is a Webhooks (Actions) Destination helpful with end-to-end tests?
The easiest way to test whether a source's events are sending through the Segment pipeline is with an end-to-end test. Use the steps below to monitor the events arriving to your Segment source and whether they're successfully sending to your destinations. Connecting a Webhooks (Actions) Destination to your sources makes these requests easy to see. For example, if you connect a Webhooks Destination (Webhook Actions Destination) to your source, you'd be able to see the events received by that source and sent to that destination.

#### Connect a Webhook Actions destination to your workspace
1. [Add a new Webhook (Actions) destination](https://app.segment.com/goto-my-workspace/destinations/catalog/actions-webhook) to your source. Make sure you select the intended source to connect this destination to.
2. Visit the webhook's site, and copy the endpoint to your clipboard. An example site you can use is [https://webhook.site/#!/](https://webhook.site/#!/), but use whichever webhooks site you prefer.
3. Add a mapping to the Webhook Actions destination, and configure Step 1's conditions to allow for all types of events that you're currently sending through that source.
4. Add the endpoint you copied from Step 2 to the Webhook Actions Mapping's URL in Step 3.
5. Enable the Mapping.
6. Enable the Webhook Actions destination.
7. Begin sending events to your source.
8. Verify those events throughout the Segment pipeline (source debugger/ event delivery).
9. Verify the webhook's website which shows the raw JSON for all of the events successfully received by your Segment source and its Webhooks Actions destination.
