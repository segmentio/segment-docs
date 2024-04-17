---
title: Use Reverse ETL
---

After you've followed [all four steps](/docs/connections/reverse-etl/set-up-retl/#getting-started) and set up your source, model, destination, and mappings for Reverse ETL, your data will extract and sync to your destination(s) right away if you chose an interval schedule. If you set your data to extract at a specific day and time, the extraction will take place then.

## Example use cases
Use Reverse ETL when you want to:
* Sync audiences and other data built in the warehouse to Braze, Hubspot, or Salesforce Marketing Cloud for personalized marketing campaigns.
* Sync enriched data to Mixpanel for a more complete view of the customer, or enrich Segment Unify with data from the warehouse.
* Send data in the warehouse back into Segment as events that can be activated in all supported destinations, including Twilio Engage and other platforms.
* Pass offline or enriched data to conversion APIs like Facebook, Google Ads, TikTok, or Snapchat.
* Connect Google Sheets to a view in the warehouse for other business teams to have access to up-to-date reports.

## Managing syncs

### Sync history and observability
Check the status of your data extractions and see details of your syncs. Click into failed records to view additional details on the error, sample payloads to help you debug the issue, and recommended actions.

To check the status of your extractions:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the destination you want to view.
3. Select the mapping you want to view.  
4. Click the sync you want to view to get details of the sync. You can view:
    * The status of the sync.
    * Details of how long it took for the sync to complete.
    * How many total records were extracted, as well as a breakdown of the number of records added, updated, and deleted.
    * The load results - how many successful records were synced as well as how many records were updated, deleted, or are new.
5. If your sync failed, click the failed reason to get more details on the error and view sample payloads to help troubleshoot the issue.

### Reset syncs
You can reset your syncs so that your data is synced from the beginning. This means that Segment resyncs your entire dataset for the model.

To reset a sync:
1. Select the three dots next to **Sync now**.
2. Select **Reset sync**. 
3. Select the checkbox that you understand what happens when a sync is reset.
4. Click **Reset sync**.

### Replays
You can choose to replay syncs. To replay a specific sync, contact [friends@segment.com](mailto:friends@segment.com). Keep in mind that triggering a replay resyncs all records for a given sync.

### Email alerts
You can opt in to receive email alerts regarding notifications for Reverse ETL. 

To subscribe to email alerts: 
1. Navigate to **Settings > User Preferences**. 
2. Select **Reverse ETL** in the **Activity Notifications** section.
3. Click the toggle on for the notifications you want to receive. You can choose from:

    Notification | Details
    ------ | -------
    Reverse ETL Sync Failed | Set toggle on to receive notification when your Reverse ETL sync fails. 
    Reverse ETL Sync Partial Success | Set toggle on to receive notification when your Reverse ETL sync is partially successful. 

## Edit your model

To edit your model:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the source and the model you want to edit.
3. On the overview tab, click **Edit** to edit your query.
4. Click the **Settings** tab to edit the model name or change the schedule settings.  

## Edit your mapping

To edit your mapping:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the destination and the mapping you want to edit.
3. Select the **...** three dots and click **Edit mapping**. If you want to delete your mapping, select **Delete**.

## Reverse ETL for Engage Premier Subscriptions
[Engage Premier Subscriptions users](/docs/engage/user-subscriptions/) can use Reverse ETL to sync subscription data from warehouses to destinations. 

To get started with using Reverse ETL for subscriptions: 
1. Navigate to **Engage > Audiences** and select the **Profile explorer** tab. 
2. Click **Manage subscription statuses** and select **Update subscription statuses**.
3. Select **Sync with RETL** as the menthod to update your subscription statuses.
4. Click **Configure**. 
5. In the Reverse ETL catalog, select the Reverse ETL source you want to use.
6. Set up the source. Refer to the [add a source](#step-1-add-a-source) section for more details on how to set up the source. 
7. Add the **Segment Profiles** destination as your Reverse ETL destination. Refer to [add a destination](#step-3-add-a-destination) for more details to set up the destination.
8. Once your destination is set, go to the **Mappings** tab of your destination and click **Add Mapping**.
9. Select the model you want to use and then select **Send Subscriptions**. 
10. Click **Create Mapping**.  
11. Follow the steps in the [create mappings](#step-4-create-mappings) section to set your mappings. 

## Record diffing
Reverse ETL computes the incremental changes to your data directly within your data warehouse. The Unique Identifier column is used to detect the data changes, such as new, updated, and deleted records.

> info "Delete Records Payload"
> The only value passed for deleted records is its unique ID which can be accessed as `__segment_id`. 

In order for Segment to compute the data changes within your warehouse, Segment needs to have both read and write permissions to the warehouse schema table. At a high level, the extract process requires read permissions for the query being executed. Segment keeps track of changes to the query results through tables that Segment manages in a dedicated schema (for example, `_segment_reverse_etl`), which requires some write permissions.

> warning ""
> There may be cost implications to having Segment query your warehouse tables.