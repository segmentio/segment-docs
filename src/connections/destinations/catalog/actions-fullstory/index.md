---
title: Fullstory (Actions)
hide-boilerplate: true
hide-dossier: true
---
{% include content/plan-grid.md name="actions" %}

[FullStory](https://www.fullstory.com/){:target="_blank"} lets product and support teams easily understand everything about the customer experience. The Segment integration for FullStory helps accurately identify your customers within the FullStory dashboard.

> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) FullStory Segment destination. There's also a page about the [non-Actions FullStory destination](/docs/connections/destinations/catalog/fullstory/). Both of these destinations receives data from Segment. 



## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Select FullStory (Actions), then click **Configure FullStory (Actions)**.
4. Select an existing Source to connect to FullStory (Actions).
5. Click Customized Setup to start from a blank mapping.

{% include components/actions-fields.html name="fullstory" connection="true" %}


## Pre-built subscriptions

By default a new FullStory (Actions) destination comes with the following subscriptions.

You can select these subscriptions by choosing "Quick Setup" when you first configure the destination. You can enable, edit, and disable them from the screen that appears.

| Subscription Name | Trigger                                          | FullStory Action |
| ----------------- | ------------------------------------------------ | ---------------- |
| Identify User     | All **identify** calls from the connected source | Identify User    |
| Track Event       | All **track** calls from the connected source    | Track Event      |
| Track Page Events | All **page** calls from the connected source     | Track Event      |

## Available FullStory actions

Combine the supported [triggers](/docs/connections/destinations/actions/#components-of-a-destination-action) with the following FullStory-supported actions:
- [Identify User](#identify-user)
- [Track Event](#track-event)
- [Viewed Page](#viewed-page)

{% include components/actions-fields.html name="fullstory" %}

## Migration from the classic FullStory destination

Follow the table below to map your existing FullStory destination configuration to FullStory (Actions).

{% include components/actions-map-table.html name="fullstory" %}