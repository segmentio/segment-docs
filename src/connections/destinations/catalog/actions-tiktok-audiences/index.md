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

- If you created a TikTok Audiences destination instance before September 25th, 2023, your instance(s) and all subsequent instances are considered _legacy_ instances. To create a new _legacy_ instance, see the [Create a TikTok audience (Legacy)](#create-a-tiktok-audience-legacy) documentation. Users who created their first instance after September 25, 2023 are considered to have _native_ instances. To create a new _native_ instance, see the [Configure the TikTok Audiences destination (Native)](#configure-the-tiktok-audiences-destination-native) documentation.
- Both _legacy_ and _native_ instances have the same set of features, but are configured differently. Legacy instances require you to create an audience or action manually, but native instances automatically create audiences and actions.
- For more information about how to update from _legacy_ to _native_, reach out to [friends@segment.com](mailto:friends@segment.com).

### Prerequisites

Before connecting to the TikTok Audiences destination, you must have a [TikTok Ads Manager](https://www.tiktok.com/business/en-US/solutions/ads-manager){:target="_blank"} account. 

### TikTok Audience Segments

You must create an audience segment in your TikTok Advertising account. You can send Engage audiences to an existing audience segment, or create a new audience. Please note the `audience_id` as this is required to send Engage audiences to TikTok. 

> warning ""
> You can only send audience data from Segment to a "Partner audience" custom audience in TikTok Ads Manager. While TikTok's UI doesn't allow you to select this custom audience type, you can use this destination's **Create Audience** mapping to create "Partner audience" custom audiences in TikTok.

#### Create a TikTok Audience (_Legacy_)

To create an audience in Segment: 

1. Navigate to New Mapping and select **Create Audience**. 
2. On the Add test event panel, click **Load Sample Event**.
3. Fill in the mappings on the Select mappings panel accordingly.
4. On the Send test event panel, click **Test Mapping**.
5. You've created your audience. Copy the `audience_id` from the response as you will need it to create additional mappings. 

You can use the same mapping to create as many audiences as you'd like. To create another audience, change the audience name and click **Test Mapping**.

You can create a duplicate audience since TikTok doesn't restrict users from having multiple audiences with the same name. If you click **Test Mapping** multiple times, you will create audiences with the same name. However, each audience will have its own unique `audience_id`. 

You do not need to update the status of the mapping to `enabled`.

For instructions on how to create a TikTok audience segment, see TikTok's [Create/Delete an audience segment](https://ads.tiktok.com/marketing_api/docs?id=1739940583739393){:target="_blank"} docs. 

### Connect the TikTok Audiences (_Legacy_) destination

> info ""
> Add User and Remove User are considered legacy actions.

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

### Configure the TikTok Audiences (_Native_) destination

1. From the Segment web app, navigate to **Engage > Audiences**. Choose an existing Engage audience or create a new one. Ensure you are in the Engage space you plan to use with the TikTok Audiences destination.

2. Navigate to **Engage > Engage Settings** and click **Destinations**. 

3. Search for “TikTok Audiences” and select the destination. Click **Configure TikTok Audiences**.

4. On the Select Source screen, your Engage space should already be selected as the source. Click **Confirm Source**.

5. On the **Settings** tab for the TikTok Audiences destination, name your destination and authenticate with TikTok Audiences using OAuth.

6. Once authenticated, toggle “Enable Destination” on and click **Save Changes**.

7. Navigate to the **Mappings** tab, click **New Mapping**, and select **Add to Audience**.

8. Navigate to the **Mappings** tab, click **New Mapping**,  and select **Remove from Audience**.

9. Navigate back to **Engage > Audiences** and click on the audience from Step 1.

10. Click **Add Destinations** and select the TikTok Audiences destination you just created. 
    In the settings that appear in the side panel, toggle the **Send Track** option on and **Send Identify** option off. Provide the [**Advertiser ID**](https://ads.tiktok.com/help/article/ad-account-information-faq?lang=en){:target="_blank”} linked to the TikTok account that will receive the audience data, as well as the **ID Type** of data you'll be sending. Click **Save Settings**.
    
> info " "
> If you update the events names from the default Audience Entered/Audience Exited, please make sure to also update it in the "Add to Audience" and "Remove from Audience" mappings under step 1 (Select events to map and Send)

The setup is complete and the audience will start syncing to TikTok. The audience will appear in your [TikTok Ads Manager](https://www.tiktok.com/business/en-US/solutions/ads-manager){:target="_blank"} account under **Assets > Audiences**. Please note that it can take 24-48 hours for users to appear in TikTok.

To sync additional audiences from your Engage space, create a separate mapping in the TikTok Audiences destination. Navigate to **Connections > Destinations**, search and select the TikTok Audiences destination, and follow Steps 7-11 above.

{% include components/actions-fields.html %}
