---
title: TikTok Audiences Destination
id: 63d2e550fb90f1632ed8820a
hide-personas-partial: true
hide-boilerplate: true
hide-dossier: false
---

The TikTok Audiences destination enables advertisers to send Engage audiences to TikTok as Custom Audiences using [TikTok's Segment API](https://ads.tiktok.com/marketing_api/docs?id=1739940504185857){:target="_blank"}.

By using Segment's TikTok Audiences destination, you can increase traffic and drive conversions with hyper-relevant ads that promote product discovery.

## Getting started

### Prerequisites

1. Before connecting to the TikTok Audiences destination, you must have a [TikTok Ads Manager](https://www.tiktok.com/business/en-US/solutions/ads-manager){:target="_blank"} account. 

2. You must also have an audience segment created in your TikTok Advertising account. You can send Engage audiences to an existing audience segment, or you can create a new audience in TikTok. Please take note of the `audience_id` as this will be required to send Engage audiences to TikTok. See TikTok's [Create/Delete an audience segment](https://ads.tiktok.com/marketing_api/docs?id=1739940583739393){:target="_blank"} for instructions on how to create a TikTok audience segment. 

### Connect the TikTok Audiences destination

1. From the Segment web app, navigate to **Engage > Audiences**. Ensure you are in the Engage space you plan to use with the TikTok Audiences destination. Either choose an existing Engage audience or create a new one. This is the audience you plan to send to TikTok.

2. Navigate to **Engage > Engage Settings** and click **Destinations**. Please ensure you are still in the correct Engage space.

3. Search for “TikTok Audiences” and select the destination. Click **Configure TikTok Audiences**.

4. On the Select Source screen, your Engage space should already be selected as the source. Click **Confirm Source**.

5. On the Destination **Settings** tab, name your destination and authenticate with TikTok Audiences using OAuth.

6. Once authenticated, toggle “Enable Destination” on and click  **Save Changes**.

7. Navigate to the **Mappings** tab, click **New Mapping**, and select **Add Users**.

8. Under Select mappings, select the TikTok "Advertiser ID" of the audience segment you want to add users to. Input the `audience_id` of that audience segment under "Audience ID." **Note: A separate mapping must be created for each audience segment you plan to send Engage audiences to.**
> info ""
> Once you've created the audience using the name of Segment's audience key, you can get the Audience ID from TikTok's Assets>Audiences page. You'll also find the Advertised ID, noted by `aadvid`, over the TikTok URL.

9. Repeat Steps 7 and 8 to also set up a **Remove Users** mapping.
     
10.  Navigate back to **Engage > Audiences** and click on the audience from Step 1. 

11.  Click **Add Destinations** and select the TikTok Audiences destination you just created. In the settings that appear in the side panel, toggle the **Send Track** option on and do **not** change the Audience Entered/Audience Exited event names. Click **Save Settings**.

The setup is complete and the audience will start syncing to TikTok. The audience will appear in your [TikTok Ads Manager](https://www.tiktok.com/business/en-US/solutions/ads-manager){:target="_blank"} account under **Assets > Audiences**. Please note that it can take 24-48 hours for users to appear in TikTok.

To sync additional audiences from your Engage space, create a separate mapping in the TikTok Audiences destination. Navigate to **Connections > Destinations**, search and select the TikTok Audiences destination, and follow Steps 7-11 above.

{% include components/actions-fields.html %}
