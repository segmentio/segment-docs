---
title: Pendo Web (Actions) Destination
id: 6501a4325a8a629197cdd691
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}


[Pendo](http://www.pendo.io/){:target="_blank"} combines powerful software usage analytics with in-app guidance and user feedback capabilities, enabling even non-technical teams to deliver better product experiences to their customers or employees.

Pendo maintains this destination. For issues with the Pendo Web (Actions) destination, please reach out to [Pendo's support team](https://support.pendo.io/hc/en-us/articles/360034163971-Get-help-with-Pendo-from-Technical-Support){:target="_blank"}.

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Pendo Web (Actions) Segment destination. There's also a page about the [non-Actions Pendo destination](/docs/connections/destinations/catalog/pendo/). Both of these destinations receives data from Segment.

## Benefits of Pendo Web (Actions) vs Pendo Classic

Pendo Web (Actions) provides the following benefits over the classic Pendo destination:

- **Support for Track, Identify, and Group calls**. The classic Pendo destination did not support Track calls and required users to configure an additional Webhook destination.
- **Full region support**. Setup allows the destination to be configured for US, EU, US restricted, or Japan.
- **Supports CNAME for Pendo**. Works with subscriptions using Pendo's custom CNAME feature.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Pendo Web (Actions)**.
4. Click **Add destination ->**.
5. Select an existing Source to connect to Pendo Web (Actions).
6. In the destination settings, enter your Pendo API Key, which a Pendo Admin can find in the Pendo UI by going to **Settings** > [Subscription Settings](https://app.pendo.io/admin){:target="_blank"} > **Applications**, opening the relevant app, then locating the **API Key** value.
7. Select the correct region for your Pendo subscription.

{% include components/actions-fields.html %}

## Migration from the classic Pendo destination

Remove the classic Pendo destination and Webhook destination from your Segment workspace before adding the Pendo Web (Actions) destination.
