--- 
title: Setup complete!
---

Congratulations! You've successfully set up Reverse ETL. Your data will extract and sync to your destination(s) right away if you chose an interval schedule when creating your mapping. If you set your data to extract at a specific day and time, the extraction will take place then.

Now that you've successfully set up Reverse ETL, learn how to [manage warehouse syncs](#managing-syncs), [edit your model](#edit-your-model), and [edit your mapping](#edit-your-mapping). 

For more information about supported data types and limits, see the [Supported object and arrays](/connections/reverse-etl/index/#supported-object-and-arrays) and [Limits](/connections/reverse-etl/index/#limits) documentation. 

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

<div class="double">
  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/create-a-model/" newtab="false" icon="symbols/arrow-left.svg" title="Add a mapping" description="Map data from your warehouse to specific fields in your target destinations." variant="related" subtitle="back" %}

  {% include components/reference-button.html href="/connections/reverse-etl/" newtab="false" icon="symbols/arrow-right.svg" title="Return to the full installation guide" description="Now that you've completed the Reverse ETL quickstart guide, return to the full installation guide to learn more about how Segment's Reverse ETL product works." variant="related" subtitle="next" %}
</div>