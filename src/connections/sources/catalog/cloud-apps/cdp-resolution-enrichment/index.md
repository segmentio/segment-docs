---
title: Delivr.ai Enrich Source
id: HoFsjsDOW2
hidden: true
---

[Delivr.ai](https://delivr.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} helps customers identify their target audience for the purpose of activation, ongoing engagement, and conversion.  You can find a [list of the different attributes](https://delivr.ai/resources/UPID?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} you can collect with Delivr.ai Enrich.

This source is maintained by Delivr.ai. For any issues with the destination, [contact the Delivr.ai support team](mailto:support@delivr.ai).

Here's how it works: When a user logs into the Delivr.ai UI application, they engage in a segmentation operation to identify their total addressable market. Concurrently, they enhance their Segment workspace by incorporating data sourced from Delivr.ai.

## Getting started

To set up your Delivr.ai Enrich source:
1. Navigate to **Connections > Sources** and click **Add source** in the Segment app. 
2. Search for *Delivr.ai Enrich* in the Sources Catalog and click **Add source**.
3. Give the source a nickname and click **Add source**.
   The nickname is used as a label for the source in your Segment interface, and Segment creates a related schema name. The schema name is the namespace you'll query against in a warehouse. The nickname can be anything, but Segment recommends sticking to something that reflects the source itself and distinguishes amongst your environments (for example, `delivr.ai enrich`).
4. Copy the **Write Key** on the Overview page.
5. Go to the Delivr.ai UI. 
6. Go to the [Delivr.ai Connectors](https://app.cdpresolution.com/administration/cdp-connections?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} page and select the *Segment IO* connector.
7.	Paste your Write Key into Delivr.ai's Enrichment connection configuration.
8.	Click **Upload Key**.

Further documentation can be found on the [Delivr.ai documentation site](https://docs.delivr.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}.

## Events 

If you've correctly set up your Delivr.ai Source and configured Delivr.ai to transmit user profile data to a Segment source, user profile data will begin to populate in the Segment Source debugger as Identify and Group calls.
