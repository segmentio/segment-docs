---
title: Metronome (Actions) Destination
hide-boilerplate: true
id: 61a8032ea5f157ee37a720be
redirect_from:
  - '/connections/destinations/catalog/vendor-metronome'
  - '/connections/destinations/catalog/actions-metronome'
---
{% include content/plan-grid.md name="actions" %}

[Metronome](https://www.metronome.com){:target="_blank"} helps software companies launch, iterate, and scale their business models with billing infrastructure that works at any size and stage. With Metronome, your team can set up a world-class billing infrastructure with minimal time and investment.

Metronome also enables product-led growth with a consistent source of truth for use and billing. Freely experiment with pricing and packaging and put iteration directly in the hands of your Product team.

## Getting Started

1. From the Segment web app, click **Catalog**, then click **Destinations**
2. Search for **Metronome (Actions)** within the Destinations Catalog and select **Metronome (Actions)**
3. Click **Configure Metronome (Actions)**.
4. Select the source you’d like to connect to and give the destination a name.
5. Enter your Metronome API Token into the Segment Connection Settings UI (save changes).

{% include components/actions-fields.html %}


## Mapping events to Metronome

Map Segment events to the [Metronome event format](https://docs.metronome.com/getting-usage-data-into-metronome/overview/){:target="_blank"}. Metronome requires the five following fields: 

Field | Type | Description
----- | ---- | ------------
`transaction_id` | (string) | The unique identifier for each event.
`customer_id` | (string) | Represents which customer in Metronome the event applies to.
`timestamp` | (string) | This is when the event happened in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt){:target="_blank"}.
`event_type` | (string) | This is the kind of event. For example, `page_view` or `cpu_used`.
`properties` | (object) | The key/value pairs with details of the event.

## Benefits of Metronome (Actions)
Metronome (Actions) provides the following benefits:

- **Streamlined Configuration**. Configure connection details on a per-event basis, rather than for the destination as a whole. 

- **Easy access to data**. The event variables picker shows you all the available data from the event you use to test the Trigger. Variables are clearly labeled to ensure they stand out from other text and markup.

- **Clear mapping of data** Actions-based destinations enable you to define the mapping between the data Segment receives from your source and the data Segment sends to Metronome.
