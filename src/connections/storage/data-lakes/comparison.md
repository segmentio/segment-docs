---
title: Comparing Data Lakes and Warehouses
---

<!--
TODO: figure out title, add to nav.
diagrams? Illustrations?
Add sections about S3 and GCS
links to analytics academy stuff on owning your data
-->

As Segment builds new data storage products over time, each product evolves from prior products to best support the needs of customers. Segment Data Lakes is an evolution of the warehouses product that meets the changing needs of customers. As such, you’ll find some areas where there are differences between the Data Lakes and Warehouses products, instead of seeing exact parity between the two.

With this, the two products will not be in parity with each other, but instead will be compatible because there will be an understandable mapping between Data Lakes and Warehouses, which can enable you to identify and manage the differences.

For customers who are currently or have previously used Segment Warehouses, Data Lakes’s feature “Warehouse Compatibility Mode” provides a schema which minimizes the differences between Warehouses and Data Lakes. The remaining differences found between Data Lakes (with Warehouse Compatibility Mode) and Warehouses are mapped below.


## Data Freshness

Warehouses and Data Lakes currently offer different sync frequencies:

Warehouses can sync up to once an hour, with the ability to set a custom sync schedule and [selectively sync](/docs/connections/warehouses/selective-sync/) collections and properties within a source to Warehouses.

Data Lakes currently offers 12 syncs in a 24 hour period, and does not offer support for a custom sync schedule or selective sync at this time.


## Duplicates

The guarantee for duplicate data found in Data Lakes matches Segment’s overall guarantee for duplicates - 99% guarantee of no duplicates for data within a [24 hour look back window](/docs/guides/duplicate-data/).

When comparing this to Warehouses, the guarantee remains the same, however Warehouses will typically contain fewer duplicates because it has a secondary process to filter out duplicates, which Data Lakes does not have. Both Data Lakes and Warehouses (and all Segment destinations) rely on the [de-duplication process](/docs/guides/duplicate-data/) at time of event ingest, however Warehouses also has its own de-duplication system built in to further reduce the volume of duplicates.

To ensure Data Lakes is meeting the duplicate guarantee within a 24 hour look back window, as well as managing processing costs for customers, Data Lakes only uses the de-duplication process at time of event ingest. The result will remove duplicates found within the 24 hour look back period, which is sufficient for most analytical use cases. Customers who have advanced requirements for duplicates can add an additional de-duplication step downstream to further reduce duplicates beyond this look back window.


## Object vs Event Data

Warehouses support both event and object data today, whereas Data Lakes currently only supports event data.

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

- `**tracks` **table** - Data Lakes and Warehouses both create one table per specific `tracks` event, however Warehouses also creates one `tracks` table with all of your `tracks` method calls whereas Data Lakes does not. Learn more about the `tracks` table [here](/docs/connections/storage/warehouses/schema/).
- `**users` **table** - Both Warehouses and Data Lakes create an  `identifies` table (as seen [here](/docs/connections/storage/warehouses/schema/)), however Warehouses also creates a `user``s` table just for user data while Data Lakes does not since it does not currently support object data. This `user``s` table is a materialized view of users in a source constructed by data infered about users from the identify calls.
- `**accounts**` **table** - Group calls are used to generate the `accounts` table in Warehouses, however because this is object data which Data Lakes does not currently support, there is no `accounts` table found in Data Lakes.
- (Redshift only) **Table names which begin with numbers** - Table names are not allowed to begin with numbers in the Redshift Warehouse, so they are automatically given a “_” prefix. Data Lakes doesn’t need to assign a “_" prefix since Glue Data Catalog doesn’t have this restriction. For example, in Redshift a table name may be named `_101_account_update`, however in Data Lakes it would be named `101_account_update`. Note: While this nuance is specific to Redshift, other warehouses may show similar behavior for other reserved words.


### Columns

Similar to tables, columns between Warehouses and Data Lakes will be the same, except for in a few specific scenarios:

- `event` and `event_text` - Each property within an event has its own column, however the naming convention of this column differs between Warehouses and Data Lakes. Warehouses snake cases the original payload value and preserves the original text within the `event_text` column, where as Data Lakes uses the original payload value as-is for the column name, and thus does not need an `event_text` column.
- `channel`, `metadata_*`, `project_id`, `type`, `version` - These columns are Segment internal data which are not found in Warehouses, but are found in Data Lakes. The reason is that Warehouses is intentionally very detailed about it’s transformation logic so it doesn’t include any of these, where as Data Lakes does include them based on it’s more straightforward approach to flatten the whole event.
- (Redshift only) `uuid`, `uuid_ts` - Redshift customers will see columns for `uuid` and `uuid_ts`, which are used for de-duplication in Redshift; Other warehouses may have similar columns. These aren’t relevant for Data Lakes so the columns won’t appear there.
- `sent_at` - Warehouses computes the `sent_at` value based on timestamps found in the original event in order to account for clock skews and timestamps in the future. This was done when the Segment pipeline didn’t do this on it’s own, however it now calculates for this so Data Lakes does not need to do any additional computation, and will send the value as-is when computed at ingestion.
- `integrations` - Warehouses does not include the integrations object, where as Data Lakes flattens and includes the integrations object. You can read more about the `integrations` object [here](/docs/guides/#filtering-with-the-integrations-object).



## Deletion and suppression

[User deletions](/docs/privacy/user-deletion-and-suppression/) are currently not supported in Data Lakes, while they are supported in Warehouses.

User suppression is supported by both Data Lakes and Warehouses.


## Protocols

Similar to Warehouses, Data Lakes does not currently have a direct integration with Protocols. Today you can expect any changes made with Protocols to events at the source level will impact data for all downstream destinations, including Warehouses and Data Lakes.

- **Mutated events** - If Protocols mutates an event due to a rule set in the Tracking Plan, then that mutation will appear in Segment's internal archives and thus reflected in both Data Lakes and Warehouses. To illustrate this, if you were to want the event `product_id` to be reflected as `productID` and have set this in Protocols, then this event will appear in both Data Lakes and Warehouses as `productID`.
- **Blocked events** - If an event is set to be blocked in the Protocols Tracking Plan, then the event does not get forwarded to any downstream Segment destinations, including Warehouses and Data Lakes. However events marked with a violation will be passed to both Warehouses and Data Lakes.


Data types and labels available in Protocols are not currently supported by Data Lakes or Warehouses.

- **Data Types** ****- Warehouses and Data Lakes will infer the data type for each event using their own schema inference systems instead of using a data type set in Protocols for an event. This may lead to instances where the data type set in Warehouses and/or Data Lakes is different than the data type set in the tracking plan. For example, if you set `product_id` to be an integer in the Protocols Tracking Plan, if the event was sent into Segment as a string, then Data Lakes and Warehouses may infer this data type as a string in the Glue Data Catalog.
- **Labels** - Labels set in Protocols are not sent to Data Lakes.
