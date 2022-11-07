---
title: Customer.io (Actions) Destination
hide-personas-partial: true
hide-boilerplate: true
redirect_from:
- '/connections/destinations/catalog/actions-customerio/'
- '/connections/destinations/catalog/actions-customer-io/'
- '/connections/destinations/catalog/vendor-customerio'
versions:
  - name: Customer.io (Classic)
    link: /docs/connections/destinations/catalog/customer-io
id: 5f7dd78fe27ce7ff2b8bfa37
---
{% include content/plan-grid.md name="actions" %}

[Customer.io](https://customer.io/){:target="_blank"} lets you send automated email, push, SMS, letters, and webhooks based on your customer's activities in your app or product. It makes conversion tracking, optimization and remarketing easier. 

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

{% include components/actions-fields.html settings="true"%}

{% include components/actions-fields.html %}


## Migration from Customer.io classic

{% include content/ajs-upgrade.md %}


Keep the following in mind if you plan to move to Customer.io (Actions) from the classic Customer.io destination.
{% include components/actions-map-table.html name="customer-io" %}

## Convert timestamps

When you map some actions, you'll see a **Convert Timestamps** setting. This setting is on by default, and converts traits containing ISO-8601 timestamps to Unix timestamps (seconds since epoch). Segment recommends that you leave this setting enabled. While Segment does support ISO-8601 timestamps in liquid, you must use Unix timestamps to take advantage of timestamp conditions when segmenting your audience in Customer.io.

For example, if you send an event with a `purchase_time` trait of `2006-01-02T18:04:07Z`, Customer.io converts it to `1136253847`. If the timestamp is *not* in ISO-8601 format, Customer.io doesn't convert it. This avoids inadvertently converting values like phone numbers or IDs. 

Customer.io makes an exception for the `created_at` trait, converting ISO-8601 timestamps or any values supported by JavaScript `Date` objects to Unix timestamps.

