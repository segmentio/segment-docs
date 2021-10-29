---
title: Warehouse Syncs
redirect_from: '/connections/storage/warehouses/sync'
---

The Warehouse Sync process prepares the raw data coming from a source and loads it into a warehouse destination. There are two phases to the sync process:
1. **Preparation phase**: This is where Segment prepares data coming from a source.
2. **Loading phase**: This is where Segment loads data into the warehouse destination.  

Instead of constantly streaming data to the warehouse destination, Segment loads data to the warehouse in bulk at regular intervals. Before the data loads, Segment inserts and updates events and objects, and automatically adjusts the schema to make sure the data in the warehouse is inline with the data in Segment.

Warehouses sync with all data coming from your source and your data is available in your warehouse within 24-48 hours. If you'd like to manage the data you send to your warehouse, use [Warehouse Selective Sync](#warehouse-selective-sync).

## Sync History
You can use the Sync History page to see the status and history of data updates in your warehouse. The Sync History page is available for every source connected to each warehouse. This page helps you answer questions like, “Has the data from a specific source been updated recently?” “Did a sync completely fail, or only partially fail?” and “Why wasn’t this sync successful?”

The Sync History includes the following information:

* **Sync Status**: The possible statuses are:
   * *Success*: Sync run completed without any notices and all rows synced, OR no rows synced because no data was found.
   * *Partial*: Sync run completed with some notices and some rows synced.
   * *Failure*: Sync run with some notices and no rows synced.
* **Start Time**: The time at which the sync began. This is shown in your local timezone.
* **Duration**: The length of time the sync took.
* **Synced Rows**: Number of rows successfully synced from the sync run.
* **Notices**: A list of errors or warnings found, which could indicate problems with the sync run. Click a notice message to show details about the result, and any errors or warnings for each collection included in the sync run.

> info ""
> If a sync run shows a partial success or failure, the next sync attempts to sync any data that was not successfully synced in the prior run.

### View the Sync History

To view the Sync History:
1. Go to **Connections > Destinations** and choose the warehouse destination you want to view the sync history for.
2. Click the source you want to view the sync history for.
3. *(Optional)* Click on any of the rows in the Sync History table to see additional details related to that sync. You can view:
   * The **Results** of your sync which shows the number of rows synced for each collection.
   * The **Sync Duration** which shows the **Preparation** and **Loading** times of your sync.

## Warehouse Selective Sync

Warehouse Selective Sync allows you to manage the data that you send to your warehouses. You can use this feature to stop syncing specific events (also known as collections) or properties that aren’t relevant, and could be slowing down your warehouse syncs.

> info ""
> This feature is only available to Business Tier customers. <br><br>You must be a Workspace Owner to change Selective Sync settings.

With Selective Sync, you can customize which collections and properties from a source are sent to each warehouse. This helps you manage what data is sent to each individual warehouse, allowing you to sync different sets of data from the same source to different warehouses.

> note ""
> **NOTE:** This feature only affects [warehouses](/docs/connections/storage/warehouses/), and doesn't prevent data from going to any other [destinations](/docs/connections/destinations/).

Once a source, collection, or property is disabled, Segment no longer syncs data from that source. Segment won't delete any historical data from your warehouse. When a source is re-enabled, Segment syncs all events since the last sync. This does not apply when a collection or property is re-enabled. Only new data generated after re-enabling a collection or property syncs to your warehouse.

> warning ""
> For each warehouse only the first 5,000 collections per source and 5,000 properties per collection are visible in the Selective Sync user interface. [Learn more about the limits](#selective-sync-user-interface-limits).

### When to use Selective Sync

By default, all sources and their collections and properties are sent, and no data is prevented from reaching warehouses.

When you disable sources, collections, or properties using Selective Sync, Segment stops sending new data for these sources, collections, or properties to your warehouse. It doesn’t delete any existing data in the warehouse.

If you choose to re-enable a source to begin syncing again, Segment loads all data that arrived since the last sync into the warehouse, but doesn’t backfill data that was omitted while these were disabled. When a collection or property is re-enabled, data only syncs going forward. It will not be loaded from the last sync.

### Enable Selective Sync

To use Selective Sync:
1. Go to **Connections > Destinations** and select the warehouse you want to enable Selective Sync for.
2. Click the **Settings** tab and click **Selective Sync** in the left menu.
3. Select which sources, collections, and properties to sync. All that is not selected won't be synced to your warehouse.
4. Click **Save Changes**.

### Change sync settings to a single warehouse from multiple sources

To change the sync settings to a single warehouse from multiple sources, follow the same steps as [above](#enable-selective-sync).

This may be valuable if you’re looking to make changes in bulk, such as when setting up a new warehouse.


### Change sync settings on a specific Warehouse to Source connection

To manage data from one specific source to an individual warehouse:
1. Go to **Connections > Destinations** and select the warehouse you want to change the sync settings for.
2. On the **Warehouse Overview** page, click the **Schema** you want to change the sync settings for.
3. On the **Settings** tab of the **Sync History** page for that source, select the data you want synced to your warehouse, or deselect the data you don't want synced.

This may be valuable when you're making smaller changes, for example, disabling all properties from one unnecessary collection.

> info ""
> All changes made through Selective Sync only impact an individual warehouse. They don't impact multiple warehouses at once. To make changes to multiple warehouses, you need to enable/disable data for each individual warehouse.

### Selective Sync User Interface Limits

Regardless of schema size, for each warehouse only the first 5,000 collections per source and 5,000 properties per collection can be managed using the Selective Sync user interface. After you hit any of these limits, all future data is still tracked and sent to your warehouse. New collections created after hitting this limit is not displayed in the Selective Sync table.

You will see a warning in the Selective Sync user interface when the warehouse schema has reached 80% of the limit for collections and/or properties. An error message will appear when you've reached the limit.

Contact [Support](https://app.segment.com/help/contact/) to edit Selective Sync settings for any collections and/or properties which exceed the limit.

> warning ""
> Only Workspace Owners can change Selective Sync settings.
