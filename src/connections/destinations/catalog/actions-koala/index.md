---
title: Koala Destination
id: 6230c835c0d6535357ee950d
---

{% include content/plan-grid.md name="actions" %}

> info "Device Mode (Web) Destination"
> This destination sends data to Koala from the browser using Koala’s SDK. Koala also offers a server-side destination that transfers data from Segment to Koala. For more information, see the [Koala (Cloud) Destination documentation](/docs/connections/destinations/catalog/actions-koala-cloud).

Koala enables you to identify website visitors with ease so you can turn traffic into actionable leads. See which companies are researching your docs, checking out your pricing page, and showing intent to buy.

Segment is the easiest way to install Koala. If you've already got Segment running on your website, Koala recommends this approach. With Segment, you can instrument Koala without code.

Koala maintains this destination. For any issues with the destination, [contact the Koala Support team](mailto:support@getkoala.com).

## Getting Started

1. From the Segment web app, navigate to **Connections > Catalog > Destinations**.
2. Search for *Koala* and select **Add Destination**.
4. Select the web source that will send data to Koala and follow the steps to name your destination. The web source chosen must use [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/).
5. On the **Settings** tab, input your **Public API Key** which can be found in your Koala workspace settings under **Settings > Install**.
6. Once connected, you can configure how you want to send data to Koala. By default, Segment forwards track events and identify events to Koala. Koala recommends sticking with the defaults.

{% include components/actions-fields.html settings="true"%}
