---
title: Connections Overview
---

Connections is Segment's core product offering: you can collect event data from your mobile apps, websites, and servers with one API, then pull in contextual data from cloud apps like your CRM, payment systems, and internal databases to build a unified picture of your customers.

## Sources

{% include content/whats-a-source.md %}

Learn more about Sources from the [Sources overview page](/docs/connections/sources/).


## Destinations

{% include content/whats-a-destination.md %}

## Warehouses

{% include content/whats-a-warehouse.md %}

### Reverse ETL
With [Reverse ETL](/docs/connections/reverse-etl/), your data warehouse acts as your source, enabling you to send data from your warehouse to your destinations. 

## Information on Sources and Destinations pages

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

Sources without any enabled destinations are auto-disabled after 14 days. However, the workspace owner is notified by email before Segment disables the source. Data that flows into Segment but does not flow to any downstream tools is not valuable to you and unnecessarily takes up space. 

Segment understands there may be cases to keep a source active. If you'd like to add your sources to an exception list, you can do so by filling out this [Airtable form](https://airtable.com/shr7V9LFDZh31cYWW){:target="_blank"}.

### Can I request Segment add an integration tool?
Yes, you are able to submit an integration request [here](https://segment.com/requests/integrations/).


> warning ""
> Twilio Segment has measures in place to not provide services to U.S. sanctioned countries, including Cuba, Iran, Syria, and North Korea.