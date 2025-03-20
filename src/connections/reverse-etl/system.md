---
title: Reverse ETL System
beta: false 
---

View reference information about how Segment detects data changes in your warehouse and the rate and usage limits associated with Reverse ETL. 

## Record diffing
Reverse ETL computes the incremental changes to your data directly within your data warehouse. The Unique Identifier column is used to detect the data changes, such as new, updated, and deleted records.

> info "Delete Records Payload"
> The only value passed for deleted records is their unique ID, which can be accessed as `__segment_id`. As of September 24, 2024, deleted records also contain all columns selected by your model, with `null` values in place of data.  

For Segment to compute the data changes within your warehouse, Segment needs to have both read and write permissions to the warehouse schema table. At a high level, the extract process requires read permissions for the query being executed. Segment keeps track of changes to the query results through tables that Segment manages in a dedicated schema (for example, `_segment_reverse_etl`), which requires some write permissions.

> warning ""
> There may be cost implications to having Segment query your warehouse tables.

## Reverse ETL Schema
When using Reverse ETL with Segment, several system tables are created within the `__segment_reverse_etl` schema in your warehouse. These tables are crucial for managing the sync process efficiently and tracking state information. Below are the details of the system tables in this schema:

**1. Records Table**

`records_<subscription_id>` table is located within the` __segment_reverse_etl` schema, this table contains two key columns:

`record_id`: A unique identifier for each record.

`checksum`: A checksum value that is used to detect changes to a record since the last sync.
The records table helps in determining new and updated rows by comparing the checksum values during each sync. If a record’s checksum changes, it indicates that the record has been modified and should be included in the next sync. This ensures that only the necessary updates are processed, reducing the amount of data transferred.

**2. Checkpoint Table**

The `checkpoints_<subscription_id>` tables are located within the __segment_reverse_etl schema, this table contains the following columns:

`source_id`: Identifies the source from which the data is being synced.

`model_id`: Identifies the specific model or query that is used to pull data.
checkpoint: Stores a timestamp value that represents the last sync point for a particular model.
The checkpoints table is used for timestamp-based checkpointing between syncs. This enables Segment to track the last successful sync for each model and avoid duplicating data when syncing, ensuring incremental and efficient data updates.

### Important Considerations

Do not modify or delete these tables: Altering or deleting the records and checkpoints tables can cause unpredictable behavior in the sync process. These tables are essential for maintaining the integrity of data during Reverse ETL operations.
State management: The `__segment_reverse_etl` schema and its associated tables (records and checkpoints) manage the state of each sync, ensuring that only necessary data changes are synced and that the sync process can resume where it left off.


## Limits
To provide consistent performance and reliability at scale, Segment enforces default use and rate limits for Reverse ETL.

### Usage limits
Reverse ETL usage limits are measured based on the number of records processed to each destination – this includes both successful and failed records. For example, if you processed 50K records to Braze and 50K records to Mixpanel, then your total Reverse ETL usage is 100K records.

Processed records represents the number of records Segment attempts to send to each destination. Keep in mind that not all processed records are successfully delivered, for example, such as when the destination experiences an issue.

Your plan determines how many Reverse ETL records you can process in one monthly billing cycle. When your limit is reached before the end of your billing period, your syncs will pause and then resume on your next billing cycle. To see how many records you’ve processed using Reverse ETL, navigate to **Settings > Usage & billing** and select the **Reverse ETL** tab.

Plan | Number of Reverse ETL records you can process to destinations per month | How to increase your number of Reverse ETL records
---- | --------------------------------------------------------------------------- | ---------------------------------------------------
Free | 500K | Upgrade to the Teams plan in the Segment app by navigating to **Settings > Usage & billing**.
Teams | 1 million | Contact your sales representative to upgrade your plan to Business.
Business | 50 x the number of [MTUs](/docs/guides/usage-and-billing/mtus-and-throughput/#what-is-an-mtu) <br>or .25 x the number of monthly API calls | Contact your sales rep to upgrade your plan.

If you have a non-standard or high volume usage plan, you may have unique Reverse ETL limits or custom pricing. To see your Reverse ETL limits in the Segment app, select **Settings > Usage & Billing**.

### Configuration limits

Name | Details | Limit
--------- | ------- | ------
Model query length | The maximum length for the model SQL query. | 65,535 characters
Model identifier column name length | The maximum length for the ID column name. | 191 characters
Model timestamp column name length | The maximum length for the timestamp column name. | 191 characters
Sync frequency | The shortest possible duration Segment allows between syncs. | 15 minutes

### Extract limits
The extract phase is the time spent connecting to your database, executing the model query, updating internal state tables and staging the extracted records for loading.

Name | Details | Limit
----- | ------- | ------
Record count | The maximum number of records a single sync will process. If a sync would contain more than 150 million records, Segment separates the data into multiple syncs, each containing no more than 150 million records <br><br> Note: This is the number of records extracted from the warehouse, not the limit for the number of records loaded to the destination (for example, new/update/deleted). | <sup>*</sup>150 million records
Column count | The maximum number of columns a single sync will process. | 512 columns
Column name length | The maximum length of a record column. | 128 characters
Record JSON size | The maximum size for a record when converted to JSON (some of this limit is used by Segment). | 512 KiB
Column JSON size | The maximum size of any single column value. | 128 KiB

<sup>*</sup>: _If Segment identifies a sync would be larger than 150 million records, Segment extracts 150 million of the records in the initial sync and syncs any additional records during the next scheduled or manual sync._ 

_For example, if a sync would contain 700 million records, Segment would run an initial 150 million record sync, and during the next three scheduled or manual syncs, would sync 150 million records. The fifth scheduled or manual sync would contain the remaining 100 million records._ 
