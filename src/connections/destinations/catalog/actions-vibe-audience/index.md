---
title: Vibe Audiences (Actions)
engage: true
---

{% include content/plan-grid.md name="actions" %}

[Vibe](https://www.vibe.co/){:target="\_blank"} is a streaming TV advertising platform that helps brands reach their audiences on the big screen. Vibe makes TV ads as easy to launch and measure as digital campaigns, with full transparency on performance. Advertisers of all sizes use Vibe to drive awareness, engagement, and growth through premium CTV inventory.

This destination is maintained by **Vibe**. For any issues with the destination, contact the [Vibe Support team](mailto:team-integration@vibe.co){:target="\_blank"}.

## Getting started

> info "Prerequisites"
> Before connecting to the [Vibe Audiences (Actions) destination](/docs/connections/destinations/catalog/actions-vibe-audiences/), you must first enable the integration in Vibe and retrieve your **Advertiser ID** and **Vibe Token**.

To do so:

1. Log in to your Vibe account and navigate to **Settings**.
2. Select **Custom Audiences**.
3. Click **New Audience**.
4. Choose **Segment** as your source.
5. Select the relevant advertiser.
6. Copy your **Advertiser ID** and your **Vibe Token**.

### Add the Vibe Audiences destination in Segment

1. From your Segment workspace, go to **Connections > Catalog** and select the **Destinations** tab.
2. Search for **Vibe Audiences** and select the destination.
3. Click **Add Destination**.
4. Select the Engage space you want to use as the Source (note: this destination only supports sending Engage Audiences to Vibe).
5. Name your destination in the Settings tab.
6. Enter the following settings:
   - **Advertiser ID**: Your Vibe Advertiser ID
   - **Vibe Token**: Your Vibe API token
7. Click **Save Changes**.
8. In the **Mappings** tab, click **New Mapping** and select **Sync Engage Audience to Vibe**.
9. Go to the **Settings** tab and enable the destination.

Your Vibe destination is now ready to receive audiences. Once synced, your Segment audiences will appear in Vibe under **Custom Audiences**. You can then select the synced audiences for use in your Vibe campaigns.

Note: Audience population may take some time to fully process.

{% include components/actions-fields.html %}