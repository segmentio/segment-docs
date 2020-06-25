---
title: Comparing Data Lakes and Warehouses
---

As Segment builds new data storage products, each product evolves from prior products to best support the needs of customers. Segment Data Lakes is an evolution of the Warehouses product that meets the changing needs of customers. As such, you’ll find some areas where there are differences between the Data Lakes and Warehouses products, instead of seeing exact parity between the two.

With this, the two products are not identical, but are compatible with a configurable mapping. This mapping helps you to identify and manage the differences between the two storage solutions, so you can easily understand how the data in each is related.


## Data Freshness

Warehouses and Data Lakes currently offer different sync frequencies:

Warehouses can sync up to once an hour, with the ability to set a custom sync schedule and [selectively sync](/docs/connections/warehouses/selective-sync/) collections and properties within a source to Warehouses.

Data Lakes currently offers 12 syncs in a 24 hour period, and does not currently offer custom sync schedules or selective sync.

## Duplicates

Segment's overall guarantee for duplicate data also applies to data in Data Lakes: 99% guarantee of no duplicates for data within a [24 hour look-back window](https://segment.com/docs/guides/duplicate-data/). The guarantee remains the same for Warehouses. However, Warehouses usually contain fewer duplicates because they run an additional duplicate filtering process which is not available in Data Lakes.

Both Data Lakes and Warehouses (and all Segment destinations) rely on the [de-duplication process](/docs/guides/duplicate-data/) at time of event ingest, however Warehouses also has its own de-duplication system built in to further reduce the volume of duplicates.

To ensure Data Lakes is meeting the duplicate guarantee within a 24 hour look back window, as well as managing processing costs for customers, Data Lakes only uses the de-duplication process at time of event ingest. The result removes duplicates found within the 24 hour look back period, which is sufficient for most analytical use cases.
If you have advanced requirements for duplicates, you can add de-duplication steps downstream to reduce duplicates outside this look back window.


## Object vs Event Data

Warehouses support both event and object data today, where Data Lakes currently only support event data.

Of the different types of [sources](/docs/connections/sources/) Segment supports, the following event sources are supported by Data Lakes today:

- Website libraries
- Mobile
- Server
- Event Cloud Sources

Data Lakes does not currently support object cloud sources, but will in the future.

## Schema

### Data Types

Warehouses and Data Lakes both infer data types for the events each receives. Since events are received by Warehouses one by one, Warehouses look at the first event received every hour to infer the data type for subsequent events. Data Lakes uses a similar approach, however because it receives data every hour, Data Lakes is able to look at a group of events to infer the data type.

This approach leads to a few scenarios where the data type for an event may be different between Warehouses and Data Lakes. Those scenarios are:

- **Schema evolution** - Events are reaching Warehouses and Data Lakes at different times due to different sync schedules, and there is no way to guarantee that the data type does not change since the field may have varying data types.
- **Different data type inferred based on sample size** - Warehouses and Data Lakes use a different number of events to infer the schema. Since Warehouses only receives events one at a time, it needs to use the first event to infer the data type. However Data Lakes receives events in batches, so it’s able to use a larger number of events to infer a more accurate data type.

Variance in data types between Warehouses and Data Lakes don’t happen often for booleans, strings, and timestamps, however it can occur for decimals and integers.

If a bad data type is seen, such as text in place of a number or an incorrectly formatted date, Warehouses and Data Lakes attempt a best effort conversion to cast the fields to the target data type. Fields that cannot be casted may be dropped. Note that there is always the option to correct the data type in the schema to the desired type and perform a replay to ensure no data is lost.


### Tables

Tables between Warehouses and Data Lakes will be the same, except for in these two cases:

- `tracks` **table** - Data Lakes and Warehouses both create one table per specific `tracks` event, however Warehouses also create one `tracks` table with all of your `tracks` method calls, but Data Lakes do not. Learn more about the `tracks` table [here](/docs/connections/storage/warehouses/schema/).
- `users` **table** - Both Warehouses and Data Lakes create an  `identifies` table (as seen [here](/docs/connections/storage/warehouses/schema/)), however Warehouses also creates a `user``s` table just for user data while Data Lakes does not since it does not currently support object data. This `user``s` table is a materialized view of users in a source constructed by data infered about users from the identify calls.
- `accounts**` **table** - Group calls are used to generate the `accounts` table in Warehouses, however because this is object data which Data Lakes does not currently support, there is no `accounts` table found in Data Lakes.
- *(Redshift only)* **Table names which begin with numbers** - Table names are not allowed to begin with numbers in the Redshift Warehouse, so they are automatically given a “_” prefix. Data Lakes doesn’t need to assign a “_" prefix since Glue Data Catalog doesn’t have this restriction. For example, in Redshift a table name may be named `_101_account_update`, however in Data Lakes it would be named `101_account_update`. Note: While this nuance is specific to Redshift, other warehouses may show similar behavior for other reserved words.


### Columns

Similar to tables, columns between Warehouses and Data Lakes will be the same, except for in a few specific scenarios:

- `event` and `event_text` - Each property within an event has its own column, however the naming convention of this column differs between Warehouses and Data Lakes. Warehouses snake cases the original payload value and preserves the original text within the `event_text` column, where as Data Lakes uses the original payload value as-is for the column name, and thus does not need an `event_text` column.
- `channel`, `metadata_*`, `project_id`, `type`, `version` - These columns are Segment internal data which are not found in Warehouses, but are found in Data Lakes. The reason is that Warehouses is intentionally very detailed about it’s transformation logic so it doesn’t include any of these, where as Data Lakes does include them based on it’s more straightforward approach to flatten the whole event.
- (Redshift only) `uuid`, `uuid_ts` - Redshift customers will see columns for `uuid` and `uuid_ts`, which are used for de-duplication in Redshift; Other warehouses may have similar columns. These aren’t relevant for Data Lakes so the columns won’t appear there.
- `sent_at` - Warehouses computes the `sent_at` value based on timestamps found in the original event in order to account for clock skews and timestamps in the future. This was done when the Segment pipeline didn’t do this on it’s own, however it now calculates for this so Data Lakes does not need to do any additional computation, and will send the value as-is when computed at ingestion.
- `integrations` - Warehouses does not include the integrations object, where as Data Lakes flattens and includes the integrations object. You can read more about the `integrations` object [here](/docs/guides/#filtering-with-the-integrations-object).
