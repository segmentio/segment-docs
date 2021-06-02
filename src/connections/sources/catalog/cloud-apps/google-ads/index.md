---
title: Google Ads Source
rewrite: true
---

Google Ads is an online advertising service developed by Google. With Google Ads, you can take advantage of online advertising to improve your internet marketing effectiveness. [Visit Website](https://ads.google.com/home/)

This document was last updated on June 02, 2021. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!

## Getting Started

1. From your workspace's `/sources` page, click `Add Source`.

2. Choose Google Ads and click `Connect`.

   ![](images/connect.png)

3. Click `Authenticate Google Ads` and go through the authentication flow.

4. Select a Google Ads account to sync and click `Next`

5. Finally, choose a schema name. This will be the namespace you will be querying against in your warehouse. We recommend choosing a name that reflects the source itself, like `google_ads`, or `google_ads_usa`.

   ![](images/schema.png)


### Permissions

When setting up your Google Ads Source, you may notice that we don't list all Google Ads accounts your Google user can view. This is because Google Ads API does not expose a list of "managed" or sub-accounts to non-administrator using the API. That said, if you have read permissions to the account and would like to add it, please [contact us](https://segment.com/help/contact). For more information about finding your Google Ads Customer ID, see [here](https://support.google.com/google-ads/answer/1704344?co=ADWORDS.IsAWNCustomer%3Dfalse&hl=en).

### What Google Ads MCC do you sync?
By default, we sync the primary Google Ads account connected to your Google account. If you would like to override this, please [contact us](https://segment.com/help/contact).

### I'm getting an Internal Server Error!

If you're getting the error pictured below, try disabling any ad block extensions in your browser and attempting again. We find this typically resolves the set up problems.

![](images/connection_failed.png)


## Components

### Sync


The Google Ads source is built with a sync component, which means we'll make requests to their API on your behalf on a 3 hour interval to pull the latest data into Segment. In the initial sync, we'll grab all the Google Ads objects (and their corresponding properties) according to the Collections Table below. The objects will be written into a separate schema, corresponding to the source instance's schema name you designated upon creation. For example, if you went with `google-ads`, the `ads` collection will be accessible at `google-ads.ads` in SQL.

Our sync component uses an upsert API, so the data in your warehouse loaded using sync will reflect the latest state of the corresponding resource in Google Ads.  For example, if `budget` from `0` to `100` between syncs, on its next sync that tickets status will be `100`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources will sync with Segment every 3 hours. Depending on your Warehouses plan, we will push the Source data to your warehouse on the interval associated with your billing plan.


## Collections

Collections are the groupings of resources we pull from your source. In your warehouse, each collection gets its own table.


|  Collection | Type | Description |
|  ------ | ------ | ------ |
| ad_groups | object | An [ad group](https://developers.google.com/adwords/api/docs/reference/v201802/AdGroupService.AdGroup) is a set of ads that share the same daily or lifetime budget, schedule, bid type, bid info, and targeting data |
| ad_performance_report | object | [Ad Performance Report](https://developers.google.com/adwords/api/docs/appendix/reports/v201802/ad-performance-report) includes all statistics aggregated at the ad level, one row per ad. We currently pull [7 days of data.](https://developers.google.com/adwords/api/docs/guides/reporting#date_ranges)|
| ads | object | An [ad object](https://developers.google.com/adwords/api/docs/reference/v201802/AdGroupAdService.AdGroupAd) contains the data necessary to visually display an ad and associate it with a corresponding ad set. |
| campaigns | object | A [campaign](https://developers.google.com/adwords/api/docs/reference/v201802/CampaignService.Campaign) is a grouping of ad sets which are organized by the same business objective. |
| campaign_performance_report | object | [Campaign performance reports](https://developers.google.com/adwords/api/docs/appendix/reports/v201802/campaign-performance-report) include a daily snapshot of performance statistics per campaign. We currently pull [7 days of data.](https://developers.google.com/adwords/api/docs/guides/reporting#date_ranges) |
| click_performance_report | object | [Click performance Reports](https://developers.google.com/adwords/api/docs/appendix/reports/v201802/click-performance-report) include stats at the click level, including both valid and invalid clicks. We currently pull [7 days of data.](https://developers.google.com/adwords/api/docs/guides/reporting#date_ranges) |
| search_performance_report | object | **[Contact us](https://segment.com/help/contact) to have this collection added** [Search query performance Reports](https://developers.google.com/adwords/api/docs/appendix/reports/v201802/search-query-performance-report) include statistics aggregated at the search terms level, one row per combination of search terms. We currently pull [7 days of data.](https://developers.google.com/adwords/api/docs/guides/reporting#date_ranges) |
| keywords_performance_report | object | **[Contact us](https://segment.com/help/contact) to have this collection added** [Keywords Performance Report](https://developers.google.com/adwords/api/docs/appendix/reports/v201802/keywords-performance-report) includes all statistics aggregated at the keyword level, one row per keyword. We currently pull [7 days of data.](https://developers.google.com/adwords/api/docs/guides/reporting#date_ranges) |

### Video Campaign Reports

We do not pull in "Video Campaign Reports", since it is not supported using the [Google Ads API](https://developers.google.com/adwords/api/docs/guides/campaigns-overview#differences_from_the_adwords_ui).


## Collection Properties

Below are tables outlining the properties included in the collections listed above. To see the full description of each property, refer to the Google Ads documentation linked in each collection above.

### What unit is money in?
Currency values in Google Ads are in micros, or one millionth of the smallest unit. For example, in USD, the value for `campaign.budget` would be in one millionth of a cent.

### Ad Groups

|  Property Name | Description |
|  ------ | ------ |
| adwords_customer_id | The 10-digit Google Ads Customer ID. |
| campaign_id | ID of the campaign with which this ad group is associated. |
| name | Name of this ad group. |
| received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |
| status | [Status](https://developers.google.com/adwords/api/docs/reference/v201802/AdGroupService.AdGroup.Status) of this ad group. |

### Ad Performance Report

|  Property Name | Description |
|  ------ | ------ |
| account_currency_code | The currency of the Customer account. |
| account_descriptive_name | The descriptive name of the Customer account. |
| active_view_impressions | How often your ad has become viewable on a Display Network site. |
| active_view_measurability | The ratio of impressions that could be measured by Active View over the number of served impressions. |
| active_view_measurable_cost | The cost of the impressions you received that were measurable by Active View. |
| active_view_measurable_impressions | The number of times your ads are appearing on placements in positions where they can be seen. |
| active_view_viewability | The percentage of time when your ad appeared on an Active View enabled site (measurable impressions) and was viewable (viewable impressions). |
| ad_group_id | The ID of the AdGroup. |
| ad_id | The ID of the Ad. |
| adwords_customer_id | The 10-digit Google Ads Customer ID. |
| all_conversion_rate | How often a click on your ad resulted in a conversion. |
| all_conversion_value | The total value of all of your conversions, including those that are estimated. |
| all_conversions | Best estimate of the total number of conversions that Google Ads drives. Includes website, cross-device, and phone call conversions. |
| average_cost | The average amount you pay per interaction. |
| average_position | Your ad's position relative to those of other advertisers. |
| average_time_on_site | Total duration of all sessions (in seconds) / number of sessions.  |
| bounce_rate | Percentage of clicks where the user only visited a single page on your site. |
| click_assisted_conversion_value | The total value of all conversions for which this keyword, ad, ad group, or campaign triggered assisted clicks. |
| click_assisted_conversions | The total number of conversions for which this keyword, ad, ad group, or campaign contributed to one or more assisted clicks.  |
| click_assisted_conversions_over_last_click_conversions | The total number of conversions for which this keyword, ad, ad group, or campaign received in assisted clicks divided by the total number of conversions for which it triggered the last click. |
| clicks | The number of clicks. |
| conversion_value | 	The sum of conversion values for all conversions. |
| conversions | The number of conversions for all conversion actions that you have opted into optimization. |
| cost | The sum of your cost-per-click (CPC) and cost-per-thousand impressions (CPM) costs during this period.  |
| date_start | The date start formatted as yyyy-MM-dd. |
| date_stop | The date stop formatted as yyyy-MM-dd. |
| engagements | The number of engagements. An engagement occurs when a viewer expands your Lightbox ad. |
| gmail_forwards | The number of times your ad was forwarded to someone else as a message. |
| gmail_saves | The number of times someone has saved your Gmail ad to their inbox as a message. |
| gmail_secondary_clicks | The number of clicks to your landing page on the expanded state of Gmail ads. |
| impression_assisted_conversions | Total number of conversions for which this object triggered assist impressions prior to the last click. |
| impressions | Count of how often your ad has appeared on a search results page or website on the Google Network. |
| interaction_types | The types of interactions that are reflected in the Interactions, InteractionRate, and AverageCost columns. |
| interactions | The number of interactions. An interaction is the main user action associated with an ad format--clicks for text and shopping ads, views for video ads, and so on. |
| value_per_all_conversion | The value, on average, of all conversions. |
| video_quartile_100_rate | Percentage of impressions where the viewer watched all of your video. |
| video_quartile_25_rate | Percentage of impressions where the viewer watched 25% of your video. |
| video_quartile_50_rate | Percentage of impressions where the viewer watched 50% of your video. |
| video_quartile_75_rate | Percentage of impressions where the viewer watched 75% of your video. |
| video_view_rate | The number of views your TrueView video ad receives divided by its number of impressions, including thumbnail impressions for TrueView in-display ads. |
| video_views | The number of times your video ads were viewed. |
| view_through_conversions | The total number of view-through conversions. |

### Ads

|  Property Name | Description |
|  ------ | ------ |
| ad_group_id | The id of the adgroup containing this ad. |
| adwords_customer_id | The 10-digit Google Ads Customer ID. |
| final_mobile_urls | A list of final mobile landing page urls. |
| final_urls | A list of final landing page urls. |
| received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |
| status | The [status](https://developers.google.com/adwords/api/docs/reference/v201802/AdGroupAdService.AdGroupAd.Status) of the ad. |
| type | The type of this ad. |
| url | Unique identifier for this instance of UrlData. |

### Campaigns

|  Property Name | Description |
|  ------ | ------ |
| adwords_customer_id | The 10-digit Google Ads Customer ID. |
| end_date | Date the campaign ends. |
| name | Name of this campaign. |
| received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |
| serving_status | [Serving status](https://developers.google.com/adwords/api/docs/reference/v201802/CampaignService.ServingStatus) of the campaign. |
| start_date | Date the campaign begins. |
| status | [Status](https://developers.google.com/adwords/api/docs/reference/v201802/CampaignService.CampaignStatus) of the campaign. |

### Campaign Performance Report

|  Property Name | Description |
|  ------ | ------ |
| active_view_impressions | How often your ad has become viewable on a Display Network site. |
| active_view_measurability | The ratio of impressions that could be measured by Active View over the number of served impressions. |
| active_view_measurable_cost | The cost of the impressions you received that were measurable by Active View. |
| active_view_measurable_impressions | The number of times your ads are appearing on placements in positions where they can be seen. |
| active_view_viewability | The percentage of time when your ad appeared on an Active View enabled site (measurable impressions) and was viewable (viewable impressions). |
| advertising_channel_sub_type | Primary serving target for ads in the campaign. |
| adwords_customer_id | The 10-digit Google Ads Customer ID. |
| all_conversion_rate | How often a click on your ad resulted in a conversion. |
| all_conversion_value | The total value of all of your conversions, including those that are estimated. |
| all_conversions | Best estimate of the total number of conversions that Google Ads drives. Includes website, cross-device, and phone call conversions. |
| amount | The daily budget. |
| average_cost | The average amount you pay per interaction. |
| average_position | Your ad's position relative to those of other advertisers. |
| average_time_on_site | Total duration of all sessions (in seconds) / number of sessions.  |
| base_campaign_id | The ID of base campaign of trial campaigns. |
| bounce_rate | Percentage of clicks where the user only visited a single page on your site. |
| budget_id | The ID of the Budget. |
| campaign_id | The ID of the Campaign. |
| campaign_status | The status of the Campaign. |
| campaign_trial_type | The type of campaign. This shows if the campaign is a trial campaign or not. |
| click_assisted_conversion_value | The total value of all conversions for which this keyword, ad, ad group, or campaign triggered assisted clicks. |
| click_assisted_conversions | The total number of conversions for which this keyword, ad, ad group, or campaign contributed to one or more assisted clicks.  |
| click_assisted_conversions_over_last_click_conversions | The total number of conversions for which this keyword, ad, ad group, or campaign received in assisted clicks divided by the total number of conversions for which it triggered the last click. |
| clicks | The number of clicks. |
| conversion_value | 	The sum of conversion values for all conversions. |
| conversions | The number of conversions for all conversion actions that you have opted into optimization. |
| cost | The sum of your cost-per-click (CPC) and cost-per-thousand impressions (CPM) costs during this period.  |
| date_start | The date start formatted as yyyy-MM-dd. |
| date_stop | The date stop formatted as yyyy-MM-dd. |
| engagements | The number of engagements. An engagement occurs when a viewer expands your Lightbox ad. |
| gmail_forwards | The number of times your ad was forwarded to someone else as a message. |
| gmail_saves | The number of times someone has saved your Gmail ad to their inbox as a message. |
| gmail_secondary_clicks | The number of clicks to your landing page on the expanded state of Gmail ads. |
| impression_assisted_conversions | Total number of conversions for which this object triggered assist impressions prior to the last click. |
| impression_reach | Number of unique cookies that were exposed to your ad over a given time period, or the special value "< 100" if the number of cookies is less than 100. |
| impressions | Count of how often your ad has appeared on a search results page or website on the Google Network. |
| interaction_types | The types of interactions that are reflected in the Interactions, InteractionRate, and AverageCost columns. |
| interactions | The number of interactions. An interaction is the main user action associated with an ad format--clicks for text and shopping ads, views for video ads, and so on. |
| invalid_clicks | Number of clicks Google considers illegitimate and doesn't charge you for. |
| is_budget_explicitly_shared | Indicates if the budget is a shared budget (true) or specific to the campaign (false). |
| url_custom_parameters | Custom URL parameters of the main object of this row. |
| value_per_all_conversion | The value, on average, of all conversions. |
| video_quartile_100_rate | Percentage of impressions where the viewer watched all of your video. |
| video_quartile_25_rate | Percentage of impressions where the viewer watched 25% of your video. |
| video_quartile_50_rate | Percentage of impressions where the viewer watched 50% of your video. |
| video_quartile_75_rate | Percentage of impressions where the viewer watched 75% of your video. |
| video_view_rate | The number of views your TrueView video ad receives divided by its number of impressions, including thumbnail impressions for TrueView in-display ads. |
| video_views | The number of times your video ads were viewed. |
| view_through_conversions | The total number of view-through conversions. |

### Click Performance Report

|  Property Name | Description |
|  ------ | ------ |
| ad_format | The underlying media format of the ad. |
| ad_group_id | The ID of the AdGroup. |
| ad_network_type_1 | First level network type. |
| ad_network_type_2 | Second level network type (includes search partners). |
| adwords_customer_id | The 10-digit Google Ads Customer ID. |
| aoi_most_specific_target_id | The most specific location target. |
| campaign_id | The ID of the Campaign. |
| click_type | Indicates the click type for metric fields such as Impressions. |
| creative_id | ID of the ad. |
| criteria_parameters | Descriptive string for the Criterion. |
| date_start | The date start formatted as yyyy-MM-dd. |
| date_stop | The date stop formatted as yyyy-MM-dd. |
| device | Device type where the impression was shown. |
| gcl_id | The Google Click ID. |
| page | Page number in search results where the ad was shown. |
| slot | The position of the Ad. |
| user_list_id | The ID of the UserList (audience). |

### Search Performance Report

|  Property Name | Description |
|  ------ | ------ |
| ad_group_id | The ID of the AdGroup. |
| ad_group_name | The name of the AdGroup. |
| ad_group_state | Status of the ad group. |
| ad_id | The ID of the Ad. |
| adwords_customer_id | The 10-digit Google Ads Customer ID. |
| all_conversion_rate | How often a click on your ad resulted in a conversion. |
| all_conversion_value | The total value of all of your conversions, including those that are estimated. |
| all_conversions | Best estimate of the total number of conversions that Google Ads drives. Includes website, cross-device, and phone call conversions. |
| average_cost | The average amount you pay per interaction. |
| average_cpc | The total cost of all clicks divided by the total number of clicks received. |
| average_cpe | The average amount that you've been charged for an ad engagement. |
| average_cpm | Average Cost-per-thousand impressions (CPM).  |
| average_cpv | The average amount you pay each time someone views your ad. |
| average_position | Your ad's position relative to those of other advertisers. |
| campaign_id | The ID of the Campaign. |
| clicks | The number of clicks. |
| conversion_rate | The number of conversions divided by total clicks that can be tracked to conversions |
| conversion_value | The sum of conversion values for all conversions.  |
| conversions | The number of conversions for all conversion actions that you have opted into optimization. |
| cost | The sum of your cost-per-click (CPC) and cost-per-thousand impressions (CPM) costs during this period. |
| cost_per_all_conversion | Total cost divided by all conversions. |
| cost_per_conversion | The Cost attributable to conversion-tracked clicks divided by the number of conversions. |
| cross_device_conversions | Conversions from when a customer clicks on an Google Ads ad on one device, then converts on a different device or browser. |
| ctr | The number of clicks your ad receives (Clicks) divided by the number of times your ad is shown (Impressions). |
| date | The date formatted as yyyy-MM-dd. |
| device | Device type where the impression was shown. |
| engagement_rate | How often people engage with your ad after it's shown to them. |
| engagements | The number of engagements. An engagement occurs when a viewer expands your Lightbox ad. |
| external_conversion_source | The source of conversion such as website, import from calls. |
| external_customer_id | The Customer ID. |
| final_url | Final URL of the impressions. |
| impressions | Count of how often your ad has appeared on a search results page or website on the Google Network. |
| interaction_rate | How often people interact with your ad after it is shown to them. |
| interaction_types | The types of interactions that are reflected in the Interactions, InteractionRate, and AverageCost columns. |
| interactions | The number of interactions. |
| keyword_id | The ID of the Keyword that triggered the ad. |
| network | First level network type. |
| network_with_search_partners | Second level network type (includes search partners). |
| original_ad_id | - |
| query | Keyword that triggered the ad. |
| query_match_type_with_variant | Match type of the keyword that triggered the ad, including variants. |
| tracking_url_template | Tracking template of the main object of this row. |
| value_per_all_conversion | The value, on average, of all conversions. |
| value_per_conversion | The total value of your conversions divided by the total number of conversions. |
| video_quartile_100_rate | Percentage of impressions where the viewer watched all of your video. |
| video_quartile_25_rate | Percentage of impressions where the viewer watched 25% of your video. |
| video_quartile_50_rate | Percentage of impressions where the viewer watched 50% of your video. |
| video_quartile_75_rate | Percentage of impressions where the viewer watched 75% of your video. |
| video_view_rate | The number of views your TrueView video ad receives divided by its number of impressions, including thumbnail impressions for TrueView in-display ads. |
| video_views | The number of times your video ads were viewed. |
| view_through_conversions | The total number of view-through conversions. |
| week | The date for the Monday of the week, formatted as yyyy-MM-dd. |
| year | The year, formatted as yyyy. |

### Keyword Performance Report

|  Property Name | Description |
|  ------ | ------ |
| ad_group_id | The ID of the AdGroup. |
| adwords_customer_id | The 10-digit Google Ads Customer ID. |
| all_conversion_rate | How often a click on your ad resulted in a conversion. |
| all_conversion_value | The total value of all of your conversions, including those that are estimated. |
| all_conversions | Best estimate of the total number of conversions that Google Ads drives. Includes website, cross-device, and phone call conversions. |
| approval_status | Approval status of the criterion. |
| average_cost | The average amount you pay per interaction. |
| average_cpc | The total cost of all clicks divided by the total number of clicks received. |
| average_cpm | Average Cost-per-thousand impressions (CPM).  |
| average_cpv | The average amount you pay each time someone views your ad. |
| average_pageviews | Average number of pages viewed per session.  |
| average_position | Your ad's position relative to those of other advertisers. |
| average_time_on_site | Total duration of all sessions (in seconds) / number of sessions.  |
| campaign_id | The ID of the Campaign. |
| click_assisted_conversion_value | The total value of all conversions for which this keyword, ad, ad group, or campaign triggered assisted clicks. |
| click_assisted_conversions | The total number of conversions for which this keyword, ad, ad group, or campaign contributed to one or more assisted clicks.  |
| clicks | The number of clicks. |
| conversions | The number of conversions for all conversion actions that you have opted into optimization. |
| cpc_bid | Cost per click bid. |
| cpc_bid_source | Source of the CPC bid. |
| criteria | Descriptive string for the Criterion. |
| ctr | The number of clicks your ad receives (Clicks) divided by the number of times your ad is shown (Impressions). |
| date_start | The date start formatted as yyyy-MM-dd. |
| date_stop | The date stop formatted as yyyy-MM-dd. |
| impression_assisted_conversions | Total number of conversions for which this object triggered assist impressions prior to the last click. |
| impressions | Count of how often your ad has appeared on a search results page or website on the Google Network. |
| keyword_id | ID of the main object of this row. |
| original_keyword_id | - |


## Adding Destinations

Currently, Warehouses are the only supported destination for object-cloud sources.
