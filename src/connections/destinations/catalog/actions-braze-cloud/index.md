---
title: Braze (Actions) Cloud Destination
hide-boilerplate: true
hide-dossier: true
hidden: true
---
{% include content/plan-grid.md name="actions" %}

[Braze](https://www.braze.com/), formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.


> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Braze Segment destination. There's also a page about the [non-Actions Braze destination](/docs/connections/destinations/catalog/braze/). Both of these destinations receives data _from_ Segment. There's also the [Braze source](/docs/connections/sources/catalog/cloud-apps/braze//), which sends data _to_ Segment!

## Benefits of Braze (Actions) Cloud vs Braze Classic

Braze (Actions) Cloud provides the following benefit over Braze Classic:

- **E-commerce mappings**. Segment implementations that don't follow the e-commerce spec due to incompatible event names (for example, Trip Booked vs Order Completed) can use Event Triggers to log purchases in Braze (Actions) Cloud.

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Braze" in the Catalog, select **Braze (Actions) Cloud**, and choose which of your sources to connect the destination to.
3. Add the following Connection Settings:
   - **API Key**: Created under Developer Console in the Braze Dashboard.
   - **App ID**: The app identifier used to reference specific Apps in requests made to the Braze API. Created under Developer Console in the Braze Dashboard.
   - **REST Endpoint**: Your Braze REST Endpoint. For more information, see [API Overview](https://www.braze.com/docs/api/basics/){:target="_blank"} in the Braze documentation.



## Pre-built subscriptions

| Subscription Name     | Trigger                                                                                      | Braze Web Action    |
| --------------------- | -------------------------------------------------------------------------------------------- | ------------------- |
| Track Calls           | All **track** calls from the connected source, where the Event Name is not "Order Completed" | Track Event         |
| Order Completed Calls | All **track** calls from the connected source, where the Event Name is "Order Completed"     | Track Purchase      |
| Identify Calls        | All calls where the Event Type is **Identify** or **Group**                                  | Update User Profile |


## Available Braze Actions

Build your own subscription. Combine the supported [triggers](/docs/connections/destinations/actions/#components-of-a-destination-action) with the following Braze-supported actions:
- [Track Event](#track-event)
- [Track Purchase](#track-event)
- [Update User Profile](#update-user-profile)
- [Identify Debounce](#debounce-middleware)

{% include components/actions-fields.html name="braze-cloud" %}

## Migration from Braze Classic
Keep the following in mind if you plan to move to Braze (Actions) from the classic Braze destination.
{% include components/actions-map-table.html name="braze-cloud" %}

