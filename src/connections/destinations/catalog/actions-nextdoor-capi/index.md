---
title: Nextdoor Conversions API Destination
id: 66cc76e29693c9e5591bf029
beta: true
---

{% include content/plan-grid.md name="actions" %}

[Nextdoor Conversion API](https://yourintegration.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} allows advertisers to track and send conversion events directly to the platform. This API provides a programmatic way to record and attribute conversions, enabling advertisers to measure the effectiveness of their advertising campaigns.

This destination is maintained by Nextdoor. For any issues with the destination, [contact their Support team](mailto:ads-api@nextdoor.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Nextdoor".
2. Select Nextdoor Conversions API and click **Add Destination**.
3. Select an existing Source to connect to Nextdoor Conversions API.
4. Go to the [Nextdoor Ads Manager](https://ads.nextdoor.com/v2/manage/api){:target="_blank"}, then find and copy the **API key**, **Nextdoor Advertiser ID** and **Nextdoor Pixel Id** values. If these values are not visible in the Ads Manager, you may need to contact your Nextdoor Account Manager to ensure that your Nextdoor account has been whitelisted for the (Ads API) functionality. 
5. Enter the **API key**, **Nextdoor Advertiser ID** and **Nextdoor Pixel Id** values in the Nextdoor Conversions API destination settings in Segment.
6. In the Mappings tab, configure the Actions to send data to Nextdoor Conversions API. 
7. Enable the Destination and Actions. 
8. See [Nextdoor's documentation](https://developer.nextdoor.com/reference/conversion-api){:target="_blank”} for additional instructions.   

{% include components/actions-fields.html %}

## Nextdoor Browser Plugin Action
When the **Nextdoor Conversions API** destination receives website data from a Segment JavaScript source, the **Nextdoor Browser Plugin** automatically grabs the **Nextdoor click ID** / **ndclid** from the querystirng in the page URL, and passes it to the **Send Conversion** Action. Supplying the **ndclid** boosts attribution accuracy and is strongly recommended for website tracking. The plugin is enabled by default as soon as the destination is created.
