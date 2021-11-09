---
title: Data Lakes Sync History and Sync Health
---
{% include content/plan-grid.md name="data-lakes" %}

Segment generates reports about each sync to your data lake so you can monitor sync performance. The sync health page provides information about trends in volume synced to your data lake over the last 30 days and the sync history provides detailed information about the syncs preformed on the data lake over the last two days. The sync data for both reports updates in real time. 

> info ""
> This feature is currently in Public Beta. Segment’s [First-Access and Beta terms](https://segment.com/legal/first-access-beta-preview/) govern the use of this feature.

## Sync history
The Sync History table shows detailed information about the most recent syncs to the data lake. The sync history table includes the following fields:
* **Sync status:** The status of the sync: either 'Success,' where all rows synced correctly, 'Partial Success,' indicating some rows synced correctly, or 'Failed,' were no rows synced correctly
* **Start time:** The time the sync began
* **Duration:** How long the sync took to complete
* **Synced rows:** The number of rows that were synced with the data lake
* **Notices:** Any notes about the sync: if no data is synced, the notices column will read "No data found"

<!--- add screenshot here showing the sync history page --->

Selecting a row in the Sync history table opens a tab with more information about the results of the sync and a detailed breakdown of sync duration. 

<!--- need to update the procedure for accessing the sync history/sync health pages --->

To access the Sync history page, open the **My Destinations** page and select the data lake. 

## Sync health
The Sync Health bar chart provides an overview of the volume of rows that synced to your data lake each day for the last 30 days. 

Selecting a bar from the bar chart opens the Daily Row Volume table, which provides a breakdown of which collections synced, how many rows from each collection were synced, and the percentage of all synced rows that each collection of properties represents.

<!--- add screenshot here/need to update the procedure for accessing the sync history/sync health pages --->

## Data Lakes Reports FAQ

##### What is the maximum sync history you can view?
The sync history shows the last 30 days worth of data. 

##### How do Sync History and Sync Health compare? 
The Sync History feature shows detailed information about most recent syncs to a data lake (spanning approximately two days,) while the sync health tab shows just the volume synced to the data lake over the last thirty days. 

##### How can I select which collections and properties are synced with the data lake?
You can select what collections and properties are synced with the data lake by updating the settings on the data lakes destination page. 

To access the settings page, select the Data Lakes destination from the My Destinations page. On the Warehouse Overview page, in the schema table, select the data lake you'd like to update. On the Sync History page, select the Settings tab. In the table, select the connections and properties you'd like to sync to the data lake. 

