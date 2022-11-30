---
title: Sabil Destination
hide-boilerplate: true
hide-dossier: true
id: 6372e18fb2b3d5d741c34bb6
hidden: true
private: true
---

{% include content/plan-grid.md name="actions" %}

[Sabil](https://sabil.io?ref=segment){:target="_blank"} helps prevent subscription abuse and account sharing with the highest accuracy and lowest effort while keeping customer satisfaction high.

## Benefits of Sabil (Actions)

Sabil (Actions) provides the following benefits:

- **Faster integration**. Using the Segment integration is the fastest way to integrate Sabil to collect account sharing intelligence data.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for *Sabil (Actions)* and select it.
3. Click **Configure Sabil**.
4. Select an existing Source to connect to Sabil (Actions).
5. Go to your [Sabil dashboard](https://dashboard.sabil.io/api_keys){:target="_blank"} and copy the `Client ID` of your **production** key.
6. Paste the client id in the **Client ID** field in the Segment UI.

{% include components/actions-fields.html %}

### Blocking Over-usage

If a user exceeds the configured limit on your dashboard, you can enable the blocking dialog from the Sabil dashboard [settings](https://dashboard.sabil.io/settings){:target="_blank"}. This integration does not support callbacks, and does not call `on_current_device_logout`. To log devices out in real-time, implement webhooks on your server, as described in [Handle webhook events](https://docs.sabil.io/docs/Advanced/Handle%20webhook%20events){:target="_blank"} in Sabil's documentation.
