---
title: Warehouse Selective sync
hidden: true
---

[Warehouse Selective Sync](https://segment.com/docs/connections/warehouses/faq/#can-i-control-what-data-is-sent-to-my-warehouse/) allows you to manage the data that you send to your warehouses. You can use this feature to stop syncing specific events (also known as collections) or properties that aren’t relevant, and could be slowing down your warehouse syncs.

> info ""
> This feature is available to Business Tier customers only.**

With Selective Sync, you can configure which collections and properties from a source sync to each warehouse. This allows you to send different sets of data to each warehouse.

Note: This feature only affects warehouses, and does not prevent data from going to any other destinations.

**When to use Selective Sync**

By default, all sources and their collections and properties are enabled, and no data is prevented from reaching warehouses.

When you disable sources, collections or properties using Selective Sync, Segment stops sending new data for these sources/collections/properties to your warehouse, however it doesn’t delete any existing data in the warehouse. If you later re-enable a source to begin syncing again, Segment loads all data that arrived since the last sync into the warehouse, but doesn’t backfill data that was omitted while these were disabled. Note: When a collection or property is re-enabled, data will only sync going forward, it will not be loaded from the last sync.

**How to use Selective Sync**

To utilize Selective Sync, go to the Overview page in the Segment app and select the warehouse you want to manage from the list of Destinations. From here, you can access the Selective Sync feature from two places within the app - from the (1) warehouse level which makes it quicker to manage multiple sources at once, or from the (2) warehouse / source connection if you only want to manage data from one source.

(1) **To manage multiple sources for an individual warehouse**: Click **Settings**, and click **Selective Sync** in the left menu. This may be valuable if you’re looking to make changes in bulk, such as when setting up a new warehouse.

![](/images/WH_SS_WH.png)


(2) **To manage data from one source to an individual warehouse**: From the Warehouse Overview page, click the Schema (source) you want to manage, and then click **Settings**. This can be valuable when are making smaller changes (e.g., disabling all properties from one unnecessary collection).

![](/images/WH_SS_Source.png)


All changes made through Selective Sync only impact an individual warehouse - they do **not** propagate to multiple warehouses at once. To make changes to multiple warehouses, you need to enable/disable data for each individual warehouse.

Note: Selective Sync is only modifiable for Workspace and Warehouse Admins.
