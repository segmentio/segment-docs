---
title: Sabil Destination
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

[Sabil](https://sabil.io?ref=segment){:target="\_blank"} helps prevent subscription abuse and account sharing with the highest accuracy and lowest effort while keeping customer satisfaction high.

## Benefits of Sabil (Actions)

Sabil (Actions) provides the following benefits:

- **Faster integration**. Using the segment integration is the fastest way to integrate Sabil to collect account sharing intelligence data.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure Sabil**.
4. Select an existing Source to connect to Sabil (Actions).
5. Go to your [Sabil dashboard](https://dashboard.sabil.io/api_keys){:target="\_blank"} and copy the `Client ID` of your **production** key.
6. Paste the client id in the field labeled `Client ID`.

{% include components/actions-fields.html %}

### Blocking Over-usage

If a user exceeds the configured limit on your dashboard, you can enable the blocking dialog from your Sabil dashboard [settings](https://dashboard.sabil.io/settings){:target="\_blank"}. However this integration does not support callbacks. So `on_current_device_logout` will not be called. So in order to actually logout the devices in real-time, you should implement webhooks on your server. Follow [this guide](https://docs.sabil.io/docs/Advanced/Handle%20webhook%20events){:target="\_blank"} to implement webhooks.
