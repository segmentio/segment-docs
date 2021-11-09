---
title: Customer.io (Actions) Destination
hide-personas-partial: true
hide-boilerplate: true
hide-dossier: true
redirect_from:
- '/connections/destinations/catalog/customer-io-actions/'
- 'connections/destinations/catalog/actions-customerio/'
---
{% include content/plan-grid.md name="actions" %}

[Customer.io](https://customer.io/){:target="_blank"} lets you send automated email, push, SMS, letters, and webhooks based on your customer's activities in your app or product. It makes conversion tracking, optimization and remarketing easier. 

> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Customer.io Segment destination. There's also a page about the [non-Actions Customer.io destination](/docs/connections/destinations/catalog/customer-io/). Both of these destinations receives data _from_ Segment. There's also the [Customer.io source](/docs/connections/sources/catalog/cloud-apps/customer-io/), which sends data _to_ Segment!

## Benefits of Customer.io (Actions) vs Customer.io classic

- **Track an anonymous event**. Track events from users who are not yet known to Customer.io. If you have the Customer.io *event merging* feature enabled, Customer.io associates all incoming events that share an `anonymous_id` received in the last 30 days.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Select Customer.io (Actions).
4. Click **Configure Actions Customer.io**.
5. Select an existing Source to connect to Customer.io (Actions).
6. Enter the **API Key** and **Site ID**. Find these values on the [Customer.io API Credentials Page](https://fly.customer.io/settings/api_credentials){:target="_blank"}.
7. Select **Quick Setup** to start with pre-populated subscriptions, or **Customized Setup** to configure each action from scratch. Click **Configure Actions**.

## Prebuilt subscriptions

| Subscription Name       | Trigger                                                               | Customer.io Action      |
| ----------------------- | --------------------------------------------------------------------- | ----------------------- |
| Track Event             | All **Track** calls from the connected source.                        | Track Event             |
| Create or Update Person | All **Identify** calls from the connected source.                     | Create or Update Person |
| Create or Update Device | All **Track** calls where the Event Name is `Application Installed`. | Create or Update Device |

## Available Customer.io actions

Build your own subscription. Combine the supported [triggers](/docs/connections/destinations/actions/#components-of-a-destination-action) with the following Customer.io-supported actions:

- [Track Event](#track-event)
- [Create or Update Person](#create-or-update-person)
- [Create or Update Device](#create-or-update-device)
- [Track Anonymous Event](#track-anonymous-event)

{% include components/actions-fields.html name="customer-io" %}


## Migration from Customer.io classic

Keep the following in mind if you plan to move to Customer.io (Actions) from the classic Customer.io destination.
{% include components/actions-map-table.html name="customer-io" %}
