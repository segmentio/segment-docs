---
title: Data Lakes Sync History and Health
---
{% include content/plan-grid.md name="data-lakes" %}

The Segment Data Lakes sync history and health tabs generate real-time information about data syncs so you can monitor the health and performance of your data lakes. These tools provide monitoring and debugging capabilities within the Data Lakes UI, so you can identify and proactively address data sync or data pipeline failures. 

> note "This feature is not supported for the Azure Data Lakes public beta"
> The Sync History/Sync Health tabs are currently not supported for the Azure Data Lakes public beta. For more information about Azure Data Lakes, see the [Data Lakes overview documentation](/docs/connections/storage/data-lakes/index/#how-azure-data-lakes-works).

## Sync History
The 'Sync History' table shows detailed information about the latest 100 syncs to the data lake. The table includes the following fields:
* **Sync status:** The status of the sync: either 'Success,' indicating that all rows synced correctly, 'Partial Success,' indicating that some rows synced correctly, or 'Failed,' indicating that no rows synced correctly
* **Start time:** The time the sync began
* **Duration:** How long the sync took to complete
* **Synced rows:** The number of rows that synced to the data lake
* **Notices:** Any notes or warnings about the sync

Selecting a row in the Sync History table opens a sidebar showing the number of rows from each collection that synced.

To access the Sync History page from the Segment app, open the **My Destinations** page and select the data lake. On the data lakes Settings page, select the **Sync History** tab. 

## Health
The health tab provides an overview of the rows that synced to your data lake both today and each day for the last 30 days. 

The bar chart, 'Daily Synced Rows,' shows an overview of the rows synced for each of the last 30 days. Hovering over a date shows the number of rows that were synced for that day. Selecting a date from the bar chart opens the Daily Row Volume table, which provides a breakdown of which collections synced, how many rows from each collection synced, and the percentage of all synced rows from each collection.

The Daily Row Volume table contains the following information:
* **Collections:** The name of each collection of properties synced to the data lake
* **Rows:** The number of rows synced from each collection
* **% of Total:** The percentage of the total number of rows synced that each collection represents

Above the Daily Row Volume table is an overview of the total syncs for the current day, showing the number of rows synced, the number of collections that synced, and the current date.

To access the Sync history page from the Segment app, open the **My Destinations** page and select the data lake. On the data lakes settings page, select the **Health** tab.

## Data Lakes Reports FAQ

### How long is a data point available?
The health tab shows an aggregate view of the last 30 days worth of data, while the sync history retains the last 100 syncs.

### How do sync history and health compare?
The sync history feature shows detailed information about the most recent 100 syncs to a data lake, while the health tab shows just the number of rows synced to the data lake over the last 30 days.

### What timezone is the time and date information in?
All dates and times on the sync history and health pages are in the user's local time. 

### When does the data update?
The sync data for both reports updates in real time.

### When do syncs occur?
Syncs occur approximately every two hours. Users cannot choose how frequently the data lake syncs. 