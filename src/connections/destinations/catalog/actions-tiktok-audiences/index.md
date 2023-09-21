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

### Note

- If you created a TikTok Audiences destination instance before September 18th your instance and all subsequent new instances are considered _legacy_. Therefore, follow the documentation labeled as such. Newer instances are considered _native_.
- Both versions offer the same set of features, the difference sits in the way to configure them. For legacy, you are required to create an audience manually whereas native will do that automatically. Additionally, manual configuration is required per action when using legacy, native will perform this configuration as well.
- For more information about how to update from _legacy_ to _native_ reach out to [friends@segment.com](mailto:friends@segment.com).

### Prerequisites

1. Before connecting to the TikTok Audiences destination, you must have a [TikTok Ads Manager](https://www.tiktok.com/business/en-US/solutions/ads-manager){:target="_blank"} account. 

### TikTok Audience Segments

You must create an audience segment in your TikTok Advertising account. You can send Engage audiences to an existing audience segment, or create a new audience. Please note the `audience_id` as this is required to send Engage audiences to TikTok. 

> warning ""
> You can only send audience data from Segment to a "Partner audience" custom audience in TikTok Ads Manager. While TikTok's UI doesn't allow you to select this custom audience type, you can use this destination's **Create Audience** mapping to create "Partner audience" custom audiences in TikTok.

#### create a tiktok audience (_legacy_)

to create an audience in segment: 

1. navigate to new mapping and select **create audience**. 
2. on the add test event panel, click **load sample event**.
3. fill in the mappings on the select mappings panel accordingly.
4. on the send test event panel, click **test mapping**.
5. you've created your audience. take note of the `audience_id` from the response as you will need it when you create additional mappings. 

you can use the same mapping to create as many audiences as you would like. you just need to change the audience name and click **test mapping** again.

you can create a duplicate audience since tiktok doesn't restrict users from having multiple audiences with the same name. if you click **test mapping** multiple times, you will create audiences with the same name. however, each audience will have its own unique `audience_id`. 

you do not need to update the status of the mapping to `enabled`.

see tiktok's [create/delete an audience segment](https://ads.tiktok.com/marketing_api/docs?id=1739940583739393){:target="_blank"} for instructions on how to create a tiktok audience segment. 

### Connect the TikTok Audiences destination (_legacy_)

**add user and remove user are considered legacy actions**

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

### Configure the TikTok Audiences destination (_native_)

1. From the Segment web app, navigate to **Engage > Audiences**. Ensure you are in the Engage space you plan to use with the TikTok Audiences destination. Either choose an existing Engage audience or create a new one. This is the audience you plan to send to TikTok.

2. Navigate to **Engage > Engage Settings** and click **Destinations**. Please ensure you are still in the correct Engage space.

3. Search for “TikTok Audiences” and select the destination. Click **Configure TikTok Audiences**.

4. On the Select Source screen, your Engage space should already be selected as the source. Click **Confirm Source**.

5. On the Destination **Settings** tab, name your destination and authenticate with TikTok Audiences using OAuth.

6. Once authenticated, toggle “Enable Destination” on and click  **Save Changes**.

7. Navigate to the **Mappings** tab, click **New Mapping**, and select **Add to Audience**.

8. Repeat Steps 6 and 7 to also set up a **Remove from Audience** mapping.

9. Navigate back to **Engage > Audiences** and click on the audience from Step 1.

10. Click **Add Destinations** and select the TikTok Audiences destination you just created. 
    In the settings that appear in the side panel, toggle the **Send Track** option on and do **not** change the Audience Entered/Audience Exited event names. 
    Provide the [**Advertiser ID**](https://ads.tiktok.com/help/article/ad-account-information-faq?lang=en){:target="_blank”} linked to the TikTok account that will receive the audience data, as well as the **ID Type** of data you'll be sending. Click **Save Settings**.

The setup is complete and the audience will start syncing to TikTok. The audience will appear in your [TikTok Ads Manager](https://www.tiktok.com/business/en-US/solutions/ads-manager){:target="_blank"} account under **Assets > Audiences**. Please note that it can take 24-48 hours for users to appear in TikTok.

To sync additional audiences from your Engage space, create a separate mapping in the TikTok Audiences destination. Navigate to **Connections > Destinations**, search and select the TikTok Audiences destination, and follow Steps 7-11 above.

{% include components/actions-fields.html %}
