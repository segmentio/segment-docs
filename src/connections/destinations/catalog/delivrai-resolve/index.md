---
title: Delivr.ai Resolve (Browser) Destination
id: 650c69e7f47d84b86c120b4c
redirect_from:
  - '/connections/destinations/catalog/actions-cdpresolution/'
---

{% include content/plan-grid.md name="actions" %}

[Delivr.ai Resolve](https://delivr.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} helps customers instantly match visitor website traffic to full profiles. It turns your anonymous web traffic into full company and buyer profiles — complete with PII and firmographics data, and much more. You can find a [list of the different attributes](https://cdpresolution.com/theattributes?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} you can collect with Delivr.ai.

This destination is maintained by Delivr.ai. For any issues with the destination, [contact the Delivr.ai support team](mailto:support@delivr.ai).

How this works: A visitor lands on a digital property that has the Segment analytics.js script connected to the Delivr.ai Resolve Destination enabled.  For each session, the anonymous ID is sent to Delivr.ai to check if our cookie is present on the browser.  This allows Delivr.ai to resolve the cookie against our graph. If found, the profile and firmographics data are sent to Segment against a source that is configured within Delivr.ai platform.

## Getting started

To set up the Delivr.ai destination:
1.	Navigate to **Connections > Catalog** in the Segment app and select the **Destinations** tab of the catalog. 
2.	Search for *Delivr.ai* and select it.
3. Choose which of your sources to connect the destination to.
4.	In the Settings, enter your Delivr.ai API key. You can find this in the CDP Connector Setting section of your [Delivr.ai Dashboard Connection Settings](https://app.cdpresolution.com/administration/cdp-connections/segment-io-f4241?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}.
5. Go to the Delivr.ai UI. 
5. Go to the [Delivr.ai Connectors](https://app.cdpresolution.com/administration/cdp-connections?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} page and select the Segment IO connector.
2.	Paste your Delivr.ai API key in Segment to generate your Write Key.
3.	Paste your Write Key into Delivr.ai's connection configuration.
4.	Click **Upload Key**.

Further documentation can be found on the [Delivr.ai documentation site](https://docs.delivr.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}.

If you have configured your Delivr.ai Destination correctly, and if you've also configured Delivr.ai to send user profile data to a Segment Source, you should start to see user profile data shown in the Segment Source debugger as identify() and group() calls.

{% include components/actions-fields.html %}

