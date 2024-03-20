---
title: Unlocking Attribution Source
hidden: true
private: true
---

The [Unlocking Attribution](https://unlockinggrowth.co/products/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} source is a powerful solution designed to model attribution data, aiding marketers in identifying the most effective inbound channels for driving conversions. This documentation will guide you through the process of setting up and utilizing the "Unlocking Attribution" source within your Twilio Segment environment.  Unlocking Attribution is built on top of your pre-existing Segment implementation, ensuring you can be up and running in under an hour.

Additionally, it provides a way to bring in critical event and object data from key systems such as:
- Marketo Event Streaming - This ensures that all key events occurring in Marketo are fed in real-time to Segment.  These include events such as "Email Sent", "Email Opened", "Link Clicked", etc
- LinkedIn, Twitter, Capterra Paid Media Data - Similar to the Segment-provided Google and Facebook paid media sources, this brings in the paid media spend data for these other paid media networks
- SaaSOptics Object Source - Bringing in object data from SaaSOptics

This source generates both [Events and Objects](/docs/connections/sources).  Event data can be streamed into your downstream tools and written to the data warehouse while the Object sources can be written to your data warehouse.  This means this data can be used both within the Unlocking Attribution tool itself, or from reporting/analytics tools which read from your data warehouse.

This source is maintained by Unlocking Attribution. For any issues with the source, [contact the Unlocking Attribution team](mailto:support@unlockinggrowth.co).

> info ""
> The Unlocking Attribution Source is currently in beta. If you're interested in joining the beta program or have any feedback to help improve the Unlocking Attribution source and its documentation, [let the team know](mailto:support@unlockinggrowth.co).

## Getting Started
1. Navigate to **Connections > Catalog** and select the **Sources** tab of the catalog. 
2. Search for *Unlocking Attribution* in the Sources Catalog.
3. Select **Unlocking Attribution** and click **Add Source**.
4. Give the Source a nickname.
     - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
5. Enter the configuration settings.  
6. Click **Add Source** to save your settings.
7. Navigate to **Settings > Workspace Settings**
8. Select the **Access Management** tab.
7. Select the **Tokens** tab. 
8. Click **+ Create Token**.
9. Enter a description such as *Unlocking Attribution*, select **Workspace Owner** and click **Create**.
10. Copy the token that is presented on the screen.
11. Switch to your account in Unlocking Attribution and within the onboarding wizard, paste the token you copied.
12. Click **Connect** and follow the remaining steps within the onboarding wizard.


### Sync

The Unlocking Attribution source is built with a sync component, which means that Unlocking Attribution writes to Segment on a regular basis when modeling is re-performed on your customer data (typically on a daily basis).  In the initial sync, all historical modeling is performed and written according to the Collections structure below. The objects are written into a separate schema, corresponding to the source instance's schema name you designated upon creation (for example, `ug_attribution.media_spend_items`).

Segment's sync component uses an upsert API, so the data in your warehouse loaded using sync reflects the latest state of the corresponding resource in Unlocking Attribution. For example, if `conversions.value` goes from `0` to `212` between syncs, on its next sync, that conversion's value will be `212`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources sync with Segment daily. Depending on your Warehouses plan, Segment pushes the Source data to your warehouse on the interval associated with your billing plan.


## Collections
Collections are the groupings of resources that Segment pulls from your source. In your warehouse, each collection gets its own table.

Collection | Type | Description
---------- | ---- | ----------                                                                                                      
`conversions` | object | This collection contains each identified conversion event, as configured in Unlocking Attribution and detected by the modeling. 
`conversion_touch_lookup` | object | This collection contains a cross-reference between each conversion and all the pre-conversion touches the end-user had.  
`touches` | object | A touch is any interaction that a user had leading up to the conversion event. This generally means website visits, but can sometimes have broader definitions, based on the exact implementation.
`media_spend_items` | object | All cost data from the various media platforms is downloaded and stored in the the Media Spend Items and Media Spend Daily Spend collections.
`media_spend_daily_spend` | object | This collection captures the daily spend for each campaign (and is sometimes broken down by Ad Collective or Ad Id).

## Collection Properties
Below are tables outlining the properties included in the collections listed above.

### conversions

Property Name  | Description
---------------- | ------------                                                                                          
`id` | The unique ID of the conversion event.
`anonymous_id` | The `anonymous_id` of the user who performed the conversion event.                  
`user_id` | The `user_id` of the user who performed the conversion event.                            
`conversiontype` | The name of the conversion event.                                                                 
`timestamp` | The date and time that the conversion event occurred.                                             
`value` | The value of the conversion event. This is typically revenue.                                                

### conversion_touch_lookup

Property Name | Description         
--------------- | ------------
`conversion` | The unique ID of the conversion event.        
`touch_id` | The unique ID of the specific touch.

### touches

Property Name | Description
--------------- | -------------   
`timestamp` | The time that the touch occurred.                                                                 
`id` | The unique ID of the touch.                                                                           
`context_page_url` | The full URL of the page viewed.                                                                       
`context_page_path` | The path of the page viewed.                                                                           
`context_page_title` | The title of the page viewed.                                                                          
`context_page_referrer` | The referrer from where the user clicked from to get to the page.                                     
`context_campaign_source` | The contents of the `utm_source` query parameter in the URL.                                             
`context_campaign_medium` | The contents of the `utm_medium` query parameter in the URL.                                             
`context_campaign_name` | The contents of the `utm_campaign` query parameter in the URL.                                           
`context_campaign_content` | The contents of the `utm_content` query parameter in the URL.                                            
`context_campaign_terms` | The contents of the `utm_terms` query parameter in the URL.                                              
`campaign` | The unique ID of the **Media Spend Item** object which the touch was mapped to.                         
`search_narrative` | The description of how the touch was mapped to campaign cost data.           


### media_spend_items
All cost data from the various media platforms are downloaded and stored in the the Media Spend Items and Media Spend Daily Spend collections. Regardless of the media platform, the data is formatted to have a consistent set of key identifiers and attributes as shown in the table below.

Each row in the Media Spend Items collection represents a unique combination of the 4 key attributes(`campaign_name`,`ad_collective_name`, `campaign_id`, `ad_collective_id`). After matching a touch against a campaign, the `campaign` identifier in the `touches` collection points to a row from this collection.


Property Name | Description  
--------------- | --------------                                                                                         
`campaign_name` | The name of the campaign as defined the media platform. In some platforms, this could be derived from the **Category** field or **Campaign Group** field                                                                              
`campaign_id` | The unique ID of the campaign, as determined by the media platform.                                   
`id` | The unique ID of the item.                                                                            
`ad_collective_name` | The name of the Ad Collective (also known as Ad Set, or Ad Group across various platforms).
`ad_collective_id` | The unique ID of the Ad Collective. This is set by the paid media platform.                                 
`media_source` | The platform of the media item.                                                                       
`type` | The type of the media item (Paid, Organic).                                                      


### media_spend_daily_spend

Property Name | Description 
--------------- | -------------
`campaign` | The unique ID of the `media_spend_items` item, which the spend row corresponds to.   
`date_start` | The date of the spending item.                                                               
`spend` | The amount spent on that day.                                        
