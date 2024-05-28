---
title: Reverse ETL Observability
beta: false 
---

Use Segment's sync history and email alert features to get better insights about the status of your Reverse ETL syncs. 

## Sync history
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

> info "Segment automatically retries events that were extracted but failed to load"
> Segment retries events for 14 days following a total or partial sync failure. Before loading the failed records on a subsequent sync, Segment checks for the latest changes in your data to ensure the data loaded into your warehouse isn't stale. If the error causing the load failure is coming from an upstream tool, you can fix the error in the upstream tool to ensure the record loads on the next sync.  

## Email alerts
You can opt in to receive email alerts regarding notifications for Reverse ETL. 

To subscribe to email alerts: 
1. Navigate to **Settings > User Preferences**. 
2. Select **Reverse ETL** in the **Activity Notifications** section.
3. Click the toggle on for the notifications you want to receive. You can choose from:

    Notification | Details
    ------ | -------
    Reverse ETL Sync Failed | Set toggle on to receive notification when your Reverse ETL sync fails. 
    Reverse ETL Sync Partial Success | Set toggle on to receive notification when your Reverse ETL sync is partially successful. 

