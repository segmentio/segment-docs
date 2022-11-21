---
# The end name should be similar to `Slack  Destination`
title: Actable Predictive Destination
hide-boilerplate: true
hide-dossier: true
---

<!-- This template is meant for Actions-based destinations that do not have an existing Classic or non-Actions-based version. For Actions Destinations that are a new version of a classic destination, see the doc-template-update.md template. -->

{% include content/plan-grid.md name="actions" %}

<!-- Include a brief description of the destination here, along with a link to your website. -->

Actable Predictive is a standalone marketing-specific customer prediction tool. It trains models on your customer’s behavioral data, and provides regular automated scoring of new data against those models. The scoring output is tailored to drive higher levels of customer engagement, lower levels of churn, and increased incidence of purchases. 

Read more at [actable.com](https://actable.com/predictive-suite).

<!-- This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component. -->

{% include content/ajs-upgrade.md %}

<!-- In the section below, explain the value of this actions-based destination. If you don't have a classic version of the destination, remove this section. -->

## Benefits of Actable Predictive (Actions)

Actable Predictive (Actions) provides the following benefits:

- **Unlock the value of using Segment’s event specification by generating powerful customer predictions.**  The Actable Segment Destination provides a low friction way to pipeline data to Actable for customer predictions.
- **Unlock the value of using Segment’s event specification by generating powerful customer predictions.** Use Actable’s models to create intelligent marketing campaigns powered by ML by using Segment to send scored customer records to operational destinations. Or, pair it with Segment Personas to combine those scores with other traits, and sync audiences to outbound destinations. 

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure Actable Predictive**.
4. Configure the applicable Sources to connect to Actable Predictive (Actions). Actable requires email engagement data, web/app activity data, and purchase data to generate scores. There is a bespoke action for each data source, as well as a generic action to permit adhoc mapping of events. 

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

## Stream Key and Custom Events

Each Action Destination mapping includes a `stream_key` field to indicate which type of event is being sent from Segment. These should be left alone, except in cases involving the Custom Event Action. The Custom Event Action is for writing interaction, messaging engagement, or transaction data in cases where the mapping options available cannot transform the data as it exists in Segment.

An example of this is if your Segment implementation contains transaction/purchase events that do not leverage the [eCommerce V2 Spec](https://segment.com/docs/connections/spec/ecommerce/v2/). The Send Transaction Event Action expects that the `properties.products` key contains an array of products the customer has purchased, each with a SKU or ID.

 If, instead of an array, this value is already flattened into a list, you could use the Send Custom Event Action to send transaction events to Actable by changing the `stream_key` to `transaction`, in addition to sending other required fields (`userId`, `timestamp`, `amount`).