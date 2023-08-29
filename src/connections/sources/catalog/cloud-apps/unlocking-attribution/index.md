---
title: Unlocking Attribution Source
---

The [Unlocking Attribution](https://yourintegration.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) source is a powerful solution designed to model attribution data, aiding marketers in identifying the most effective inbound channels for driving conversions. This documentation will guide you through the process of setting up and utilizing the "Unlocking Attribution" source within your Twilio Segment environment.  Unlocking Attribution is built on top of your pre-existing Segment implementation, ensuring you can be up and running in under an hour.

This is an [Object Cloud Source](/docs/connections/sources/#object-cloud-sources) which can import data into your Segment warehouse.  This means it can be used both within the Unlocking Attribution tool itself, or from the analytics tools which read from your data warehouse.

This source is maintained by Unlocking Attribution. For any issues with the source, [contact their Support team](mailto:support@unlockinggrowth.co).

> info "" 
> The Unlocking Attribution Source is currently in beta. If you're interested in joining the beta program or have any feedback to help improve the Unlocking Attribution Source and its documentation, [let the team know](mailto:support@unlockinggrowth.co).

## Getting Started


1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for *Unlocking Attribution* in the Sources Catalog.
3. Select **Unlocking Attribution** and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings.

   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Select "Workplace Settings" from within the "Settings" section of the left hand side menu.
6. Select the "Access Management" section from this page.
7. Select the "Tokens" section from this page.
8. Click the "+ Create Token" button on this page
9. Enter a description such as "Unlocking Attribution", select "Workspace Owner" and click "Create"
10. Copy the token that is presented on the screen.
11. Now, switch to your account in Unlocking Attribution and within the Onboarding Wizard, paste the taken you copied in step 10.
12. Click "Connect" and then follow the remaining steps within the onboarding wizard.


### Sync

The Unlocking Attribution source is built with a sync component, which means that Unlocking Attribution writes to Segment on a regular basis, when modelling is re-performed on your customer data (typically on a daily basis).  In the initial sync, all historical modelling is performed and written according to the Collections structure below. The objects are written into a separate schema, corresponding to the source instance's schema name you designated upon creation (for example, `ug_attribution.media_spend_items`).

Segment's sync component uses an upsert API, so the data in your warehouse loaded using sync reflects the latest state of the corresponding resource in Unlocking Attribution. For example, if `conversions.value` goes from `0` to `212` between syncs, on its next sync that conversion's value will be `212`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources will sync with Segment daily. Depending on your Warehouses plan, Segment pushes the Source data to your warehouse on the interval associated with your billing plan.


## Collections
Collections are the groupings of resources that Segment pulls from your source. In your warehouse, each collection gets its own table.

| Collection                        | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `conversions`                     | object | This collection contains each identified conversion event, as configured in Unlocking Attribution and detected by the modelling.                                                                                         |
| `convresion_touch_lookup`         | object | This collection contains a cross-reference between each conversion and all the pre-conversion touches which the end-user had.                                                                                                    |
| `touches`                         | object | A touch is defined as any interaction that a user/customer/prospect had leading up to the conversion event. This generally means website visits, but can sometimes have broader definitions, based on the exact implementation.
| `media_spend_items`               | object | All cost data from the various media platforms is downloaded and stored in the the Media Spend Items and Media Spend Daily Spend collections.
| `media_spend_daily_spend`         | object | This collection captures the daily spend for each campaign (and sometimes broken down by Ad Collective or Ad Id).

## Collection Properties
Below are tables outlining the properties included in the collections listed above.

### conversions

| Property Name                 | Description                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `id`                          | The unique ID of this conversion event                                                                |
| `anonymous_id`                | If available, the anonymous_id of the user who performed the conversion event                         |
| `user_id`                     | If available, the user_id of the user who performed the conversion event                              |
| `conversiontype`              | The name of the conversion event                                                                      |
| `timestamp`                   | The date/time that the conversion event occurred                                                      |
| `value`                       | The value (typically revenue) of the conversion event                                                 |

### conversion_touch_lookup

| Property Name                 | Description                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `conversion`                  | The unique ID of the conversion event                                                                 |
| `touch_id`                    | The unique ID of the specific touch                                                                   |

### touches

| Property Name                 | Description                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `timestamp`                   | The date/time that the touch occurred                                                                 |
| `id`                          | The unique ID of this touch                                                                           |
| `context_page_url`            | The full URL of the page viewed                                                                       |
| `context_page_path`           | The path of the page viewed                                                                           |
| `context_page_title`          | The title of the page viewed                                                                          |
| `context_page_referrer`       | The referrer from where the user clicked from to get to this page                                     |
| `context_campaign_source`     | The contents of the utm_source query parameter in the URL                                             |
| `context_campaign_medium`     | The contents of the utm_medium query parameter in the URL                                             |
| `context_campaign_name`       | The contents of the utm_campaign query parameter in the URL                                           |
| `context_campaign_content`    | The contents of the utm_content query parameter in the URL                                            |
| `context_campaign_terms`      | The contents of the utm_terms query parameter in the URL                                              |
| `campaign`                    | The unique ID of the “Media Spend Item” object which this touch was mapped to                         |
| `search_narrative`            | The plain-English description of how this particular touch was mapped to campaign cost data           |


### media_spend_items
All cost data from the various media platforms is downloaded and stored in the the Media Spend Items and Media Spend Daily Spend collections. Regardless of the media platform, the data is formatted to have the following key unique identifiers/attributes:

* **Campaign Name** - The name of the campaign as defined the media platform. In some platforms, this could be derived from the “Category” field or “Campaign Group” field
* **Ad Collective Name** - The name of the Ad Collective (also known as Ad Set, or Ad Group across various platforms)
* **Campaign Id** - The unique ID of the campaign, as determined by the media platform
* **Ad Collective Id** - The unique ID of the Ad Collective, as determined by the media platform
Each row in the Media Spend Items collection represent a unique combination of the above 4 attributes. After matching a touch against a campaign, the `campaign` identifier in the `touches` collection points to a row from this collection.


| Property Name                 | Description                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `campaign_name`               | The name of the campaign                                                                              |
| `campaign_id`                 | The unique ID of the campaign, as set by the paid media platform                                      |
| `id`                          | The unique ID of this item                                                                            |
| `ad_collective_name`          | The name of the Ad Collective                                                                         |
| `ad_collective_id`            | The unique ID of the Ad Collective, as set by the paid media platform                                 |
| `media_source`                | The platform of this media item                                                                       |
| `type`                        | The type of this media item (Paid, Organic)                                                           |


### media_spend_daily_spend


| Property Name                 | Description                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `campaign`                    | The unique ID of the media_spend_items item, which this spend row corresponds to                      |
| `date_start`                  | The date of this spending item                                                                        |
| `spend`                       | The amount of spend on that day                                                                       |


---
