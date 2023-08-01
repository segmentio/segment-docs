---
title: Connections Overview
---

Connections is Segment's core product offering: you can collect event data from your mobile apps, websites, and servers with one API, then pull in contextual data from cloud apps like your CRM, payment systems, and internal databases to build a unified picture of your customers.

## Sources

{% include content/whats-a-source.md %}

Learn more about sources from the [sources overview page](/docs/connections/sources/).


## Destinations

{% include content/whats-a-destination.md %}

## Warehouses

{% include content/whats-a-warehouse.md %}

### Reverse ETL
With [Reverse ETL](/docs/connections/reverse-etl/), your data warehouse acts as your source, enabling you to send data from your warehouse to your destinations. 

## Information on sources and destinations pages

The Sources and Destinations pages allow each user to decide what information appears in their personal view for each page.

On both pages, you can click the stack icon in the upper right-hand corner of the table to see and select Source properties to show. You can select up to five columns of properties.

The following information is available for Sources:

- Status
- Environment
- Destinations
- Type
- Category
- Created At
- Created By

On the Destinations page, you can choose among the following properties:

- Status
- Created At
- Type
- Sources
- Category

You can then sort or filter each column to just the values you care about, by clicking on the arrow next to each displayed column.

## FAQs

### My source was disabled and it wasn't done by anyone in my workspace

Segment disables sources that don't have enabled destinations after 14 days, and emails you before disabling any sources. Disabling these sources helps maintain a clean workspace.

Segment understands there maybe cases to keep a source active. If you'd like to add your source(s) to an exception list, you can do so by filling out this [Airtable form](https://airtable.com/shr7V9LFDZh31cYWW){:target="_blank"}.

### Why is a Webhooks (Actions) Destination helpful with end-to-end tests?
The easiest way to test whether a source's events are sending through the Segment pipeline is with an end-to-end test, triggering the event to send to the Source which sends the event to its connected Destination. By following the steps below you'll understand how to monitor the events arriving to your Segment source and whether they're successfully sending to your destinations. Connecting a Webhooks (Actions) Destination to your sources makes these requests easy to see. For example, if you were to connect a Webhooks Destination (Webhook Actions Destination) to your source, you'd be able to easily see the events received by that source and sent to that destination, proving the events have made it successfully end-to-end.
# Steps to get a Webhook Actions destination connected to your workspace.
1. Add a new Webhook (Actions) destination to your source : [link to add Webhooks Actions destination]([url](https://app.segment.com/goto-my-workspace/destinations/catalog/actions-webhook)). Make sure you select the intended source to connect this destination to.
2. Visit the Webhook's site, and copy the Webhook's endpoint to clipboard : a simple example site you can use is [https://webhook.site/#!/]([url](https://webhook.site/#!/)), but use whichever Webhooks site you prefer.
3. Add a mapping to the Webhook Actions destination, and configure Step 1's conditions to allow for all types of events that you're currently sending through that source.
4. Add the endpoint you copied from Step 2, to the Webhook Actions Mapping's URL in Step 3.
5. Enable the Mapping.
6. Enable the Webhook Actions destination.
7. Begin sending events to the Source, and verifying those events throughout the Segment pipeline (source debugger / event delivery), and finally at the webhook's website, which will show the raw JSON for all of the events that were successfully received by your Segment Source and its Webhooks Actions destination.
