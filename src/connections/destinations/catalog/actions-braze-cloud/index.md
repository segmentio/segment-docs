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

Braze (Actions) Cloud provides the following benefits over Braze Classic:

- **E-commerce mappings**. Users who can't follow the e-commerce spec due to incompatible event names (for example, Trip Booked vs Order Completed) can log purchases in Braze (Actions) Cloud.

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Braze" in the Catalog, select **Braze (Actions) Cloud**, and choose which of your sources to connect the destination to.
3. Add the following Connection Settings:
   - **API Key**: Find in the Braze Dashboard in App Settings > Manage App Group.
   - **App ID**: Find in the Braze Dashboard in App Settings > Manage App Group.
   - **REST Endpoint**: Enter the value that maps to your Braze instance. For more information, see [API Overview](https://www.braze.com/docs/api/basics/){:target="_blank"} in the Braze documentation.


## Important differences from the classic Braze destination
- Braze (Actions) supports the [Web](https://github.com/segment-integrations/analytics.js-integration-appboy){:target="_blank"} integration. For other integrations, including iOS, Android, and Server, use the Braze Classic destination.

{% comment %}
## Pre-built subscriptions

| Subscription Name | Trigger                                                                                      | Braze Action        | Non-default mapped fields |
| ----------------- | -------------------------------------------------------------------------------------------- | ------------------- | ------------------------- |
| Track Event       | All **track** calls from the connected source, where the Event Name is not "Order Completed" | Track Event         |                           |
| Track Purchase    | All **track** calls from the connected source, where the Event Name is "Order Completed"     | Track Purchase      |                           |
| Identify Calls    | All **identify** calls from the connected source                                             | Update User Profile |                           |
{% endcomment %}

## Available Braze Actions

Build your own subscription. Combine the supported [triggers](/docs/connections/destinations/actions/#components-of-a-destination-action) with the following Braze-supported actions:
- [Track Event](#track-event)
- [Track Purchase](#track-event)
- [Update User Profile](#update-user-profile)
- [Debounce Middleware](#debounce-middleware)

{% include components/actions-fields.html name="braze-cloud" %}

## Migration from Braze Classic
Keep the following in mind if you plan to move to Braze (Actions) from the classic Braze destination.
{% include components/actions-map-table.html name="braze-cloud" %}

