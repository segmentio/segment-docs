---
title: Facebook Custom Audiences (Actions)
id: 645d5fc12eb891cf0a93fe4b
beta: true
strat: facebook
hide_action:
  - id: 3JEx23g4qgFzSECyYopNA4
    name: "Add"
  - id: 99Dj24PD8pAweMvTnM8vD8
    name: "Sync Reverse ETL"
  - id: eG6ydbfKbfJvQZ8gQpgakz
    name: "Sync Engage"
  - id: p74MiTEFmUUeoC7SKcT7Ri
    name: "Remove"
---

Deliver effective Facebook Ads campaigns by defining and syncing [custom audiences](https://developers.facebook.com/docs/marketing-api/audiences/guides/custom-audiences){:target="_blank”} to power ad suppression, acquisition (using lookalikes), retargeting, and more.

This destination sends audiences, or lists of users, to Facebook Custom Audiences. You can connect this destination to Reverse ETL sources to sync data from your warehouse, or to Engage Audiences to sync computed audiences.

## Getting started

### Prerequisites

- A source already set up.
  - For Reverse ETL: If you don't yet have a Reverse ETL source, follow the instructions in Segment's [Reverse ETL documentation](/docs/connections/reverse-etl/#getting-started). Segment recommends setting an [External ID](#sync-audience) as the primary key for your Reverse ETL model, as you'll need an External ID to remove users from your custom audiences.
  - For Engage Audiences: An [Engage Audience](/docs/engage/audiences/) that you can connect to this destination. 
- A Facebook account with [ads_management](https://developers.facebook.com/docs/permissions#ads_management){:target="_blank”} permissions for the target Facebook Ad Account(s). The Facebook Ad Account(s) must also be associated with a [Facebook Business Account](https://www.facebook.com/business/help/407323696966570?id=649869995454285){:target="_blank”}.
- Ensure that the user connecting to the destination using OAuth has at least an *Advertiser* or *Admin* role on the ad account. To manage permissions and roles for an ad account, reference [Facebook's documentation](https://www.facebook.com/business/help/186007118118684?id=829106167281625){:target="_blank"}.

### Connect to Facebook Custom Audiences

1. From your Segment app, navigate to **Catalog > Destinations** and search for "Facebook Custom Audiences (Actions)". 
2. Select the Facebook Custom Audiences (Actions) destination and click **Add destination**. 
3. Select the source you'd like to connect to your Facebook Custom Audiences (Actions) Destination and click **Next**. 
4. Enter a name for your destination and click **Create destination**. 
5. Navigate to your destination's settings page and click **Connect to...** to authenticate with Facebook.
6. Return to the Segment app and enter your Advertiser Account ID. See Facebook's [Find your Facebook ad account ID number](https://www.facebook.com/business/help/1492627900875762){:target="_blank”} documentation for more information.
7. Save the changes you've made and **Enable** your destination.


### Add users to a Custom Audience

After you've connected your Facebook Custom Audiences destination to Segment, set up a mapping that adds users to a new or existing Custom Audience. 

1. Navigate to **Connections > Sources** and select your Reverse ETL source.
2. On the Models page, select the model you'd like to use and click **Add Mapping**. 
3. Select the Facebook Custom Audience (Actions) destination and the Sync Audience action, then click **Create Mapping**. 
4. Enter a descriptive name for your mapping. Segment recommends a name that includes both the audience name and sync mode, for example, `Loyalty Users (Add)`. 
5. Under **Select record to map and send**, select **Added or updated records**. The Added or updated records sync mode both adds new records and attempts to re-add any updated records to the custom audience. Adding updated records to your destination enables better match rates as more user identifiers are added to the source model over time.

> warning "Added or updated records is the only supported additive sync mode"
> Selecting any other sync mode might lead to sync failures with the Facebook Custom Audiences (Actions) destination. 

6. Set how often your model syncs by setting the [Sync schedule](/docs/connections/reverse-etl/#step-4-create-mappings). 
7. Select or create an audience in Facebook to sync your data with. Click the **Select or create audience in Facebook** button to save the audience ID to your mapping. 
8. Map your model columns to the appropriate Facebook Custom Audience parameters. For more context about data formatting, see the [Sync Audience](#sync-audience) and [Data processing](#data-processing) documentation. 
   - Map External ID to a unique user identifier from your system (like User ID, CRM ID, or anonymous ID.) Segment recommends using the External ID column as your primary key when setting up your Reverse ETL model so you can more easily remove users from your custom audience. External ID is the only field Facebook requires.
   - Segment recommends mapping as many parameters as you have available in your source model so that you can increase your match rates.
9. Send a test record. If successful, you should see a 200 response in Segment and one added record to your custom audience. To verify that the record was successfully added to your custom audience, open Facebook Ads Manager and navigate to **Audiences > \{Audience Name\} > History**.
10. Click **Save Mapping** and enable the mapping. 

### Remove users from a Custom Audience

1. Navigate to **Connections > Sources** and select your Reverse ETL source.
2. On the Models page, select the model you'd like to use and click **Add Mapping**. 
3. Select the Facebook Custom Audience (Actions) destination and the Sync Audience action, then click **Create Mapping**. 
4. Enter a descriptive name for your mapping. Segment recommends a name that includes both the audience name and sync mode, for example, `Loyalty Users (Remove)`. 
5. Under **Select record to map and send**, select **Deleted records**. The Deleted records sync mode removes any records from your custom audience that you deleted from your source model.
6. Set how often your model syncs by setting the [Sync schedule](/docs/connections/reverse-etl/#step-4-create-mappings). 
7. Select or create an audience in Facebook to sync your data with. Click the **Select or create audience in Facebook** button to save the audience ID to your mapping.
8. Map your model columns to the appropriate Facebook Custom Audience parameters. Only the External ID is required. When a record is deleted from your source model, only the model primary key is sent to the mapping; other columns from your source model are not sent. Segment recommends using the External ID as your primary key in your source model.
9. Send a test record. If successful, you should see a `200` response in Segment and one record removed from your custom audience. To verify that the record was successfully removed from your custom audience, open Facebook Ads Manager and navigate to **Audiences > \{Audience Name\} > History**.
10. Click **Save Mapping** and enable the mapping.

{% include components/actions-fields.html %}

## Data processing

To improve match rates, Segment built in normalization and hashing for common fields to align with [Facebook’s recommended best practices](https://developers.facebook.com/docs/marketing-api/audiences/guides/custom-audiences/#hash){:target="_blank”}.

### Normalization
Segment automatically strips whitespace and converts the following fields to lowercase:
* Email
* First name
* Last name
* First initial
* City
* State
* Country

Segment normalizes the Phone field by removing any non-numeric symbols, whitespace, and leading zeroes.

### Hashing
Facebook requires you to hash all PII before sending it to the Facebook Conversions API. 

Segment automatically hashes any of the following fields that are not already SHA256 hashed at egress:
* Email
* Phone
* First name
* Last name
* First initial
* City
* State
* Postal code
* Country
* Year of birth
* Month of birth
* Day of birth
* Gender


## Additional trait matching

Segment [Trait Enrichment](/docs/engage/trait-activation/trait-enrichment/) allows you to send an expanded list of identifiers or traits to Facebook so that Facebook can try to use these additional data points to match to their user profiles. If you have this feature enabled and implemented any of these traits in your Segment tracking, the Facebook Custom Audiences (Actions) destination can send this data to Facebook. Segment can now also sync multiple emails if the profile contains more than one. Additionally as part of this feature, Segment hashes fields before sending them downstream to Facebook as described in the [Hashing](#hashing) section.

## FAQs and troubleshooting

### Audience not creating and/or existing audience list not populating
If you’re unable to create a new audience or select existing audiences while creating a mapping, this might be due to an authentication error. Verify that you've authenticated with Facebook under Destination Settings and that the Facebook user that authenticated with Segment can access your Advertiser Account ID.

### Audience size smaller than expected
Segment sends lists of users with the identifiers you’ve mapped from your source model. The matching logic itself occurs within Facebook. Facebook is more likely to be able to match a user profile if you track as many identifiers as possible, like email, mobile advertising identifiers (IDFA, Google advertising ID), and others. If Facebook is unable to identify users based on the data that you provide, then the match rate will be low.

As an example, many B2B SaaS businesses have users that sign up for their products with a work email address, like jane.doe@segment.com. However, most Facebook users sign up for Facebook with a personal email only, like janedoe@gmail.com. If you only provide Facebook with the work email address and no other identifiers, then Facebook can’t match your user to the Jane Doe Facebook profile. This is the case for all identifiers: Facebook must have the identifier somewhere in a user’s profile or they can’t match on it.

### Do you support value-based lookalikes?
While Facebook has a feature called value-based lookalikes, where you can send an additional field like LTV to optimize campaigns based on a customer’s value, there is currently no way to sync LTV data to a value-based lookalike using the Facebook Custom Audiences (Actions) destination. 
