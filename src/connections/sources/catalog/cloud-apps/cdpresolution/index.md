---
title: 'CDPResolution Source'
hidden: true
---


[CDP Resolution](https://cdpresolution.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} helps customers instantly match visitor website traffic to full profiles. It turns your anonymous web traffic into full company and buyer profiles — complete with PII and firmographics data, and much more. You can find a [list of the different attributes](https://cdpresolution.com/theattributes?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} you can collect with CDP Resolution.

This source is maintained by CDP Resolution. For any issues with the destination, [contact the CDP Resolution support team](mailto:support@cdpresolution.com).

{% include content/ajs-upgrade.md %}

How this works: A visitor lands on a digital property that has the segment.io analytics.js script connected to the CDP Resolution (Browser) Destination enabled.  For each session, the anonymous ID is sent to CDP Resolution to check if our cookie is present on the browser.  This allows CDP Resolution to resolve the cookie against our graph. If found, the profile and firmographics data are sent to segment.io against a source that is configured within CDP Resolution platform.

## Getting started

To set up the CDP Resolution Enrichment source:
1. Go to **Connections > Sources** and click **Add Source** in the Segment app. 
2. Search for *CDP Resolution Enrichment* in the Sources Catalog and click **Add Source**..
3. Give the Source a nickname and click **Add Source**.
   The nickname is used as a label for the source in your Segment interface, and Segment creates a related schema name. The schema name is the namespace you'll query against in a warehouse. The nickname can be anything, but Segment recommends sticking to something that reflects the source itself and distinguishes amongst your environments (for example, `cdpresolution`).
4. Copy the **Write Key** on the Overview page.
5.	To finish the setup, Go to the CDP Resolution UI. 
6. Go to the [CDP Resolution Connectors](https://app.cdpresolution.com/administration/cdp-connections?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} page and select the Segment IO connector.
7.	Paste your Write Key into CDP Resolution's connection configuration.
8.	Click **Upload Key**.

Further documentation can be found on the [CDP documentation site](https://docs.cdpresolution.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}.

If you have configured your CDP Resolution Source correctly, and if you've also configured CDP Resolution to send user profile data to a Segment Source, you should start to see user profile data shown in the Segment Source debugger as identify() and group() calls.

{% include components/actions-fields.html %}
