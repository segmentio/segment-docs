---
title: Braze Cloud Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
hidden: true
---
{% include content/plan-grid.md name="actions" %}

[Braze](https://www.braze.com/), formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Braze Segment destination. There's also a page about the [non-Actions Braze destination](/docs/connections/destinations/catalog/braze/). Both of these destinations receives data _from_ Segment. There's also the [Braze source](/docs/connections/sources/catalog/cloud-apps/braze//), which sends data _to_ Segment!

## Benefits of Braze Cloud Mode (Actions) vs Braze Classic

Braze Cloud Mode (Actions) provides the following benefit over Braze Classic:

- **E-commerce mappings**. Segment implementations that don't follow the e-commerce spec due to incompatible event names (for example, Trip Booked vs Order Completed) can use Event Triggers to log purchases in Braze Cloud Mode (Actions).

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Braze" in the Catalog, select **Braze Cloud Mode (Actions)**, and choose which of your sources to connect the destination to.
3. Add the following Connection Settings:
   - **API Key**: Created under Developer Console in the Braze Dashboard.
   - **App ID**: The app identifier used to reference specific Apps in requests made to the Braze API. Created under Developer Console in the Braze Dashboard.
   - **REST Endpoint**: Your Braze REST Endpoint. For more information, see [API Overview](https://www.braze.com/docs/api/basics/){:target="_blank"} in the Braze documentation.


{% include components/actions-fields.html %}


## Migration from Braze Classic

{% include content/ajs-upgrade.md %}

Keep the following in mind if you plan to move to Braze (Actions) from the classic Braze destination.
{% include components/actions-map-table.html name="braze-cloud" %}

