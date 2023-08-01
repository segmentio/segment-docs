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

{% include components/actions-fields.html settings="true"%}

## FAQs

### Why is a Webhooks (Actions) Destination helpful with end-to-end tests?
The easiest way to test whether a source's events are sending through the Segment pipeline is with an end-to-end test, triggering the event to send to the Source which sends the event to its connected Destination. By following the steps below you'll understand how to monitor the events arriving to your Segment source and whether they're successfully sending to your destinations. Connecting a Webhooks (Actions) Destination to your sources makes these requests easy to see. For example, if you were to connect a Webhooks Destination (Webhook Actions Destination) to your source, you'd be able to easily see the events received by that source and sent to that destination, proving the events have made it successfully end-to-end.
# Steps to get a Webhook Actions destination connected to your workspace.
1. Add a new Webhook (Actions) destination to your source : [link to add Webhooks Actions destination]([url](https://app.segment.com/goto-my-workspace/destinations/catalog/actions-webhook)). Make sure you select the intended source to connect this destination to.
2. Visit the Webhook's site, and copy the Webhook's endpoint to clipboard : a simple example site you can use is [https://webhook.site/#!/]([url](https://webhook.site/#!/)), but use whichever Webhooks site you prefer.
3. Add a mapping to the Webhook Actions destination, and configure Step 1's conditions to allow for all types of events that you're currently sending through that source.
4. Add the endpoint you copied from Step 2, to the Webhook Actions Mapping's URL in Step 3.
5. Enable the Mapping.
6. Enable the Webhook Actions destination.
7. Begin sending events to the Source, and verifying those events throughout the Segment pipeline (source debugger / event delivery), and finally at the webhook's website, which will show the raw JSON for all of the events that were successfully received by your Segment Source and its Webhooks Actions destination.
