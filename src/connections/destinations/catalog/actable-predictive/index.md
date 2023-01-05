---
title: Actable Predictive Destination
hide-boilerplate: true
hide-dossier: true
id: 6388fddea33fcc69c0f8d9ce
private: true
---

{% include content/plan-grid.md name="actions" %}

[Actable Predictive](https://actable.com/predictive-suite){:target="_blank"} is a standalone marketing-specific customer prediction tool. It trains models on your customer’s behavioral data, and provides regular automated scoring of new data against those models. The scoring output is tailored to drive higher levels of customer engagement, lower levels of churn, and increased incidence of purchases.

{% include content/ajs-upgrade.md %}

## Benefits of Actable Predictive (Actions)

Actable Predictive (Actions) provides the following benefits:

- **Unlock the value of using Segment’s event specification by generating powerful customer predictions.**  The Actable Segment Destination provides a low friction way to pipeline data to Actable for customer predictions.
- **Unlock the value of using Segment’s event specification by generating powerful customer predictions.** Use Actable’s models to create intelligent marketing campaigns powered by ML by using Segment to send scored customer records to operational destinations. Or, pair it with Segment Personas to combine those scores with other traits, and sync audiences to outbound destinations.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for *Actable Predictive (Actions)* and select it.
3. Click **Configure Actable Predictive**.
4. Select the source to connect to Actable Predictive (Actions).
5. Enter the configuration settings. Actable requires email engagement data, web/app activity data, and purchase data to generate scores. There is a bespoke action for each data source, as well as a generic action to permit ad hoc mapping of events.

{% include components/actions-fields.html %}

## Stream Key and Custom Events

Each Action Destination mapping includes a `stream_key` field to indicate which type of event Segment sends. These should be left alone, except in cases involving the Custom Event Action. The Custom Event Action is for writing interaction, messaging engagement, or transaction data in cases where the mapping options available cannot transform the data as it exists in Segment.

An example of this is if your Segment implementation contains transaction/purchase events that do not use the [eCommerce V2 Spec](/docs/connections/spec/ecommerce/v2/). The Send Transaction Event Action expects that the `properties.products` key contains an array of products the customer has purchased, each with a SKU or ID.

 If, instead of an array, this value is already flattened into a list, use the Send Custom Event Action to send transaction events to Actable by changing the `stream_key` to `transaction`, in addition to sending other required fields (`userId`, `timestamp`, `amount`).
