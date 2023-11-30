---
title: 'CDPResolution Source'
hidden: true
---


[CDP Resolution](https://cdpresolution.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} helps customers identify their target audience for the purpose of activation, ongoing engagement, and conversion.  You can find a [list of the different attributes](https://www.cdpresolution.com/resources/UPID?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} you can collect with CDP Resolution Enrichment.

This source is maintained by CDP Resolution. For any issues with the destination, [contact the CDP Resolution support team](mailto:support@cdpresolution.com).

{% include content/ajs-upgrade.md %}

How this works: A user is logged into CDP Resolution UI application.  They are performing a segmentation operation of identifying their total addressable market and enriching their Segment.IO workspace with data from CDP Resolution.

## Getting started

To set up your CDP Resolution Enrichment source:
1. Navigate to **Connections > Sources** and click **Add source** in the Segment app. 
2. Search for *CDP Resolution Enrichment* in the Sources Catalog and click **Add Source**..
3. Give the Source a nickname and click **Add Source**.
   The nickname is used as a label for the source in your Segment interface, and Segment creates a related schema name. The schema name is the namespace you'll query against in a warehouse. The nickname can be anything, but Segment recommends sticking to something that reflects the source itself and distinguishes amongst your environments (for example, `cdpresolution enrichment`).
4. Copy the **Write Key** on the Overview page.
5.	To finish the setup, Go to the CDP Resolution UI. 
6. Go to the [CDP Resolution Connectors](https://app.cdpresolution.com/administration/cdp-connections?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} page and select the Segment IO connector.
7.	Paste your Write Key into CDP Resolution's Enrichment connection configuration.
8.	Click **Upload Key**.

Further documentation can be found on the [CDP documentation site](https://docs.cdpresolution.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}.

If you have configured your CDP Resolution Source correctly, and if you've also configured CDP Resolution to send user profile data to a Segment Source, you should start to see user profile data shown in the Segment Source debugger as identify() and group() calls.

{% include components/actions-fields.html %}
