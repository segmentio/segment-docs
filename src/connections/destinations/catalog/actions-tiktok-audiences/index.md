---
title: TikTok Audiences Destination
id: 63d2e550fb90f1632ed8820a
hide-personas-partial: true
hide-boilerplate: true
hide-dossier: false
---

TikTok Audiences enables advertisers to send Segment Engage Audiences to Tiktok as Custom Audiences using [TikTok's Segment API](https://ads.tiktok.com/marketing_api/docs?id=1739940504185857){:target="_blank"}.

By using Segment's Engage Audiences with TikTok, you can increase traffic and drive conversions with hyper-relevant ads that promote product discovery.

> info ""
> The TikTok Audiences destination is in beta and is in active development. Some functionality may change before it becomes generally available.

## Getting started

Before connecting to the TikTok Audiences destination, you must have a [TikTok Ads Manager](https://www.tiktok.com/business/en-US/solutions/ads-manager){:target="_blank"} account.

To connect the TikTok Audiences destination:

1. From the Segment web app, navigate to **Engage > Audiences**. Ensure you are in the Engage space you plan to use with the TikTok Audiences destination. Either choose an existing Engage Audience or create a new one. This is the Audience you plan to send to TikTok.

2. Within the Audience, click **Settings** and copy the Audience Key. You'll need this key later.

3. Navigate to **Engage > Engage Settings** and click **Destinations**. Please ensure you are still in the correct Engage space.

4. Before setting up your destination, you must have an audience created in your TikTok Advertising Account. This [documentation](https://ads.tiktok.com/marketing_api/docs?id=1739940583739393) will walk you through how to create a TikTok Audience Segment. Be sure to use the Segment Audience Key as the "custom_audience_name" when creating your audience.

4. Search for “TikTok Audiences” and select the destination.

5. Click **Configure TikTok Audiences**.

6. On the Select Source screen, your Engage space should already be selected as the source. Click **Confirm Source**.

7. On the Destination **Settings** tab, name your destination and authenticate with TikTok Audiences using OAuth.

8. Once authenticated, toggle “Enable Destination” on and click  **Save Changes**.

9. Navigate to the **Mappings** tab, click **New Mapping**, and select **Add Users**.

10. Under Select mappings, select the Advertiser ID that your audience is apart of. Also, input the Audience Key you copied in Step 2 as the “Segment Engage Audience Key.” Click **Save** and toggle to enable the mapping.
    * **Note:** The Audience Key must be manually entered to ensure users in the Engage Audience are sent to the correct Audience Segment in TikTok. For every Engage Audience you want to send to your TikTok Ads Account, a separate **Add User** mapping must be created. You can create up to 50 mappings within an instance of the LinkedIn Audiences destination.

11. Repeat Step 9 and 10 to also set up a **Remove Users** mapping.
     
12. Navigate back to **Engage > Audiences** and click on the Audience from Step 1. 

13. Click **Add Destinations** and select the TikTok Audiences destination you just created. In the settings that appear in the side panel, toggle the **Send Track** option on and do **not** change the Audience Entered/Audience Exited event names. Click **Save Settings**.

The setup is complete and the Audience will start syncing to TikTok Audiences. Segment will add/remove users to/from the audience accordingly. The Audience appears in your [TikTok Ads Manager](https://www.tiktok.com/business/en-US/solutions/ads-manager){:target="_blank"}, account under **Assets > Audiences**.

To sync additional Audiences from your Engage space, create a separate mapping in the TikTok Audiences destination. Navigate to **Connections > Destinations**, search and select the TikTok Audiences destination, and follow Steps 9-11 above.

{% include components/actions-fields.html settings="true"%}
