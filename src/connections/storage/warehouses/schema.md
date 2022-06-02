---
title: Warehouse Schemas
---

A **schema** describes the way that the data in a warehouse is organized. Segment stores data in relational schemas, which organize data into the following template:
`<source>.<collection>.<property>`, for example `segment_engineering.tracks.user_id`, where source refers to the source or project name (segment_engineering), collection refers to the event (tracks), and the property refers to the data being collected (user_id). All schemas convert collection and property names from `CamelCase` to `snake_case`.

> note "Warehouse column creation"
> **Note:** Segment creates tables for each of your custom events in your warehouse, with columns for each event's custom properties. Segment does not allow unbounded `event` or `property` spaces in your data. Instead of recording events like "Ordered Product 15", use a single property of "Product Number" or similar.

### How warehouse tables handle nested objects and arrays

Segment's libraries pass nested objects and arrays into tracking calls as **properties**, **traits**, and **tracking calls**. To preserve the quality of your events data, Segment uses the following methods to store properties and traits in database tables: 

- The warehouse connector stringifies all **properties** that contain a nested **array**
- The warehouse connector stringifies all **context fields** that contain a nested **array**
- The warehouse connector stringifies all **traits** that contain a nested **array**
- The warehouse connector "flattens" all **properties** that contain a nested **object**
- The warehouse connector "flattens" all **traits** that contain a nested **object**
- The warehouse connector optionally stringifies **arrays** when they follow the [Ecommerce spec](/docs/connections/spec/ecommerce/v2/)
- The warehouse connector "flattens" all **context fields** that contain a nested **object** (for example, context.field.nestedA.nestedB becomes a column called context_field_nestedA_nestedB)

<table>
<thead>
<tr>
    <th> Field </th>
    <th> Code (Example) </th>
    <th> Schema (Example) </th>
</tr>
</thead>

<tr>
  <td><b>Object (Context):</b> Flatten </td>
  <td markdown="1">

``` json
context: {
  app: {
    version: "1.0.0"
  }
}
```
  </td>
  <td>
    <b>Column Name:</b><br/>
    context_app_version
    <br/><br/>
    <b>Value:</b><br/>
    "1.0.0"
  </td> 
</tr>

<tr>
    <td> <b>Object (Traits):</b> Flatten </td>
    <td markdown= "1">

```json
traits: {
  address: {
    street: "6th Street"
  }
}
```

</td>
<td>
<b>Column Name:</b><br/>
address_street<br/>
<br/>
<b>Value:</b><br/>
"6th Street"
</td>
</tr>

<tr>
<td><b>Object (Properties):</b> Flatten</td>
<td markdown="1">

```json
properties: {
  product_id: {
    sku: "G-32"
  }
}
```
</td>
<td>
    <b>Column Name:</b><br/>
    product_id_sku<br/><br/>
    <b>Value:</b><br/>
    "G-32"
</td> 
</tr>

<tr>
<td><b>Array (Any):</b> Stringify</td>
<td markdown="1">

```json
products: {
  product_id: [
    "507f1", "505bd"
  ]
}
```

</td>
<td>
    <b>Column Name:</b> <br/>
    product_id <br/><br/>
    <b>Value:</b>
    "[507f1, 505bd]"
</td> 
</tr>
</table>

## Warehouse tables

The table below describes the schema in Segment Warehouses:




| source                | property                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<source>.aliases`    | A table with your `alias` method calls. This table includes the `traits` you identify users by as top-level columns, for example `<source>.aliases.email`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `<source>.groups`     | A table with your `group` method calls. This table includes the `traits` you record for groups as top-level columns, for example `<source>.groups.employee_count`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `<source>.accounts`   | *IN BETA* A table with unique `group` method calls. Group calls are upserted into this table (updated if an existing entry exists, appended otherwise). This table holds the latest state of a group.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `<source>.identifies` | A table with your `identify` method calls. This table includes the `traits` you identify users by as top-level columns, for example `<source>.identifies.email`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `<source>.users`      | A table with unique `identify` calls. `identify` calls are upserted on `user_id` into this table (updated if an existing entry exists, appended otherwise). This table holds the latest state of a user. The `id` column in the users table is the same as the `user_id` column in the identifies table. Also note that this table won't have an `anonymous_id` column since a user can have multiple anonymousIds. To retrieve a user's `anonymousId`, query the identifies table. *If you observe any duplicates in the users table [contact Segment support](https://segment.com/help/contact/) (unless you are using BigQuery, where [this is expected](/docs/connections/storage/catalog/bigquery/#schema))*. |
| `<source>.pages`      | A table with your `page` method calls. This table includes the `properties` you record for pages as top-level columns, for example `<source>.pages.title`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `<source>.screens`    | A table with your `screen` method calls. This table includes `properties` you record for screens as top-level columns, for example `<source>.screens.title`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `<source>.tracks`     | A table with your `track` method calls. This table includes standardized properties that are all common to all events: `anonymous_id`, `context_*`, `event`, `event_text`, `received_at`, `sent_at`, and `user_id`.  This is because every event that you send to Segment has different properties.  For querying by the custom properties, use the `<source>.<event>` tables instead.                                                                                                                                                                                                                                                                                                                |
| `<source>.<event>`    | For `track` calls, each event like `Signed Up` or `Order Completed` also has it's own table (for example. `initech.clocked_in`) with columns for each of the event's distinct `properties` (for example. `initech.clocked_in.time`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |


## Identifies table

The `identifies` table stores the `.identify()` method calls. Query it to find out user-level information. It has the following columns:

| method          | property                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `anonymous_id`  | The anonymous ID of the user.                                                                                                                                                              |
| `context_<key>` | Non-user-related context fields sent with each identify call.                                                                                                                              |
| `id`            | The unique ID of the identify call itself.                                                                                                                                                 |
| `received_at`   | When Segment received the identify call.                                                                                                                                                   |
| `sent_at`       | When a user triggered the identify call.                                                                                                                                                   |
| `user_id`       | The unique ID of the user.                                                                                                                                                                 |
| `<trait>`       | Each trait of the user you record creates its own column, and the column type is automatically inferred from your data. For example, you might have columns like `email` and `first_name`. |


### Querying the Identifies table

To see a list of the columns in the `identifies` table for your `<source>`, run the following:

```sql
SELECT column_name AS Columns
FROM columns
WHERE schema_name = '<source>'
AND table_name = 'identifies'
ORDER by column_name
```

The `identifies` table is where you can query information about your users and their traits. For example, this query returns unique users you've seen on your site each day:

```sql
SELECT DATE(sent_at) AS Day, COUNT(DISTINCT(user_id)) AS Users
FROM <source>.identifies
GROUP BY day
ORDER BY day
```


## Groups table

The  `groups` table stores the `group` method calls. Query it to find out group-level information. It has the following columns:


| method          | property                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `anonymous_id`  | The anonymous ID of the user.                                                                                                                                                         |
| `context_<key>` | Non-user-related context fields sent with each group call.                                                                                                                            |
| `group_id`      | The unique ID of the group.                                                                                                                                                           |
| `id`            | The unique ID of the group call itself.                                                                                                                                               |
| `received_at`   | When Segment received the groups call.                                                                                                                                                |
| `sent_at`       | When a user triggered the group call.                                                                                                                                                 |
| `user_id`       | The unique ID of the user.                                                                                                                                                            |
| `<trait>`       | Each trait of the group you record creates its own column, and the column type is automatically inferred from your data. For example, you might have columns like `email` and `name`. |

### Querying the Groups table


To see a list of the columns in the `groups` table for your `<source>`, run the following:

```sql
SELECT column_name AS Columns
FROM columns
WHERE schema_name = '<source>'
AND table_name = 'groups'
ORDER by column_name
```

To see a list of the groups using your product, run the following:

```sql
SELECT name AS Company
FROM <source>.groups
GROUP BY name
```

## Pages and Screens tables

The `pages` and `screens` tables store the `page` and `screen` method calls. Query it to find out information about page views or screen views. It has the following columns:

| method          | property                                                                                                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `anonymous_id`  | The anonymous ID of the user.                                                                                                                                                                 |
| `context_<key>` | Non-user-related context fields sent with each page or screen call.                                                                                                                           |
| `id`            | The unique ID of the page or screen call itself.                                                                                                                                              |
| `received_at`   | When Segment received the page or screen call.                                                                                                                                                |
| `sent_at`       | When a user triggered the page or screen call.                                                                                                                                                |
| `received_at`   | When Segment received the track call.                                                                                                                                                         |
| `user_id`       | The unique ID of the user.                                                                                                                                                                    |
| `property`      | Each property of your pages or screens creates its own column, and the column type is automatically inferred from your data. For example, you might have columns like `referrer` and `title`. |


### Querying the Pages and Screens tables


To see a list of the columns in the `pages` table for your `<source>`, run the following:

```sql
SELECT column_name AS Columns
FROM columns
WHERE schema_name = '<source>'
AND table_name = 'pages'
ORDER by column_name
```

The pages table can give you interesting information about page views that happen on your site. The following query, for example, shows page views grouped by day:

```sql
SELECT DATE(sent_at) AS Day, COUNT(*) AS Views
FROM <source>.pages
GROUP BY day
ORDER BY day
```

| day        | views     |
| ---------- | --------- |
| 2015-01-14 | 2,203,198 |
| 2015-01-15 | 2,393,020 |
| 2015-07-21 | 1,920,290 |
| ...        | ...       |


## Tracks table

The `tracks` table stores the `track` method calls. Query it to find out information about the events your users have triggered. It has the following columns:

| method          | property                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------- |
| `anonymous_id`  | The anonymous ID of the user.                                                                 |
| `context_<key>` | Non-user-related context fields sent with each track call.                                    |
| `event`         | The slug of the event name, mapping to an event-specific table.                               |
| `event_text`    | The name of the event.                                                                        |
| `id`            | An ID attached to the event at execution time and used for deduplication at the server level. |
| `received_at`   | When Segment received the track call.                                                         |
| `sent_at`       | When a user triggered the track call.                                                         |
| `user_id`       | The unique ID of the user.                                                                    |


### Querying the Tracks table


Your `tracks` table is a rollup of the different event-specific tables, for quick querying of just a single type. For example, you could see the number of unique users signed up each day:

```sql
SELECT DATE(sent_at) AS Day, COUNT(DISTINCT(user_id)) AS Users
FROM segment.tracks
WHERE event = 'signed_up'
GROUP BY day
ORDER BY day
```

| day        | views  |
| ---------- | ------ |
| 2015-01-14 | 25,198 |
| 2015-01-15 | 31,020 |
| 2015-07-21 | 19,290 |
| ...        | ...    |

## Event Tables

Your event tables are a series of table for each custom event you record to Segment. We break them out into their own tables because the properties, and, as a result, the columns, differ for each event. Query these tables to find out information about specific properties of your custom events. They have the following columns:

| event           | property                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `anonymous_id`  | The anonymous ID of the user.                                                                                           |
| `context_<key>` | Non-user-related context fields sent with each track call.                                                              |
| `event`         | The slug of the event name, so you can join the `tracks` table.                                                         |
| `event_text`    | The name of the event.                                                                                                  |
| `id`            | The unique ID of the track call itself.                                                                                 |
| `received_at`   | When Segment received the track call.                                                                                   |
| `sent_at`       | When a user triggered the track call.                                                                                   |
| `user_id`       | The unique ID of the user.                                                                                              |
| `<property>`    | Each property of your track calls creates its own column, and the column type is automatically inferred from your data. |

### Querying the Events tables


To see a list of the event tables for a given `<source>`, run the following:

```sql
SELECT schema as source, "table" as Event
FROM disk
WHERE schema = '<source>'
  AND "table" != 'aliases'
  AND "table" != 'groups'
  AND "table" != 'identifies'
  AND "table" != 'pages'
  AND "table" != 'screens'
  AND "table" != 'tracks'
ORDER BY "table"
```

| source     | event             |
| ---------- | ----------------- |
| production | `signed_up`       |
| production | `completed_order` |
| ...        | ...               |


To see a list of the columns in one of your event tables, run the following:

```sql
SELECT column_name AS Columns
FROM columns
WHERE schema_name = '<source>'
AND table_name = '<event>'
ORDER by column_name
```

## Tracks vs. Events Tables

To see the tables for your organization, you can run this query:

```sql
SELECT schema || '.' || "table" AS table, rows
FROM disk
ORDER BY 1
```

The `source.event` tables have the same columns as the `source.track` tables, but they also include columns specific to the properties of each event.

If you're recording an event like:

```js
analytics.track('Register', {
  plan: 'Pro Annual',
  accountType: 'Facebook'
});
```

Then you can expect to see columns named `plan` and `account_type` as well as the default `event`, `id`, and so on. That way, you can write queries against any of the custom data sent in track calls.

> info "Note"
> Because Segment adds `properties` and `traits` as un-prefixed columns to your tables, there is a chance the names can collide with the reserved column names. For this reason, Segment discards properties with the same name as the reserved column name (for example, `user_id`).

Your event tables are one of the more powerful datasets in Segment SQL. They allow you to see which actions users perform when interacting with your product.

Because every source has different events, what you can do with them will vary. Here's an example where you can see the number of "Enterprise" users signed up for each day:

```sql
SELECT DATE(sent_at) AS Day, COUNT(DISTINCT(user_id)) AS Users
FROM <source>.signed_up
WHERE account_type = 'Enterprise'
GROUP BY day
ORDER BY day
```

| day        | users |
| ---------- | ----- |
| 2015-01-14 | 258   |
| 2015-01-15 | 320   |
| 2015-07-21 | 190   |
| ...        | ...   |

Here's an example that queries the daily revenue for an ecommerce store:

```sql
SELECT DATE(sent_at) AS Day, SUM(total) AS Revenue
FROM <source>.completed_order
GROUP BY day
ORDER BY day
```

| day        | revenue |
| ---------- | ------- |
| 2014-07-19 | $2,630  |
| 2014-07-20 | $1,595  |
| 2014-07-21 | $2,350  |

### New Columns

New event properties and traits create columns. Segment processes the incoming data in batches, based on either data size or an interval of time. If the table doesn't exist we lock and create the table. If the table exists but new columns need to be created, we perform a diff and alter the table to append new columns.

When Segment process a new batch and discover a new column to add, we take the most recent occurrence of a column and choose its datatype.


### Supported Data Types
Data types are set up in your warehouse based on the first value that comes in from a source. For example, if the first value that came in from a source was a string, Segment would set the data type in the warehouse to `string`. 

The data types that Segment currently supports include:

#### `timestamp`

#### `integer`

#### `float`

#### `boolean`

#### `varchar`

> note " "
> To change data types after they've been determined, please reach out to [Segment Support](https://segment.com/help/contact) for assistance. 

## Column Sizing

After analyzing the data from dozens of customers, we set the string column length limit at 512 characters. Longer strings are truncated. We found this was the sweet spot for good performance and ignoring non-useful data.

Segment uses special-case compression for some known columns, like event names and timestamps. The others default to LZO. Segment may add look-ahead sampling down the road, but from inspecting the datasets today this would be unnecessarily complex.

## Timestamps

The Segment API associates four timestamps with every call: `timestamp`, `original_timestamp`, `sent_at` and `received_at`.

All four timestamps pass through to your Warehouse for every ETL'd event. In most cases the timestamps are close together, but they have different meanings which are important.

`timestamp` is the UTC-converted timestamp which is set by the Segment library. If you are importing historical events using a server-side library, this is the timestamp you'll want to reference in your queries.

`original_timestamp` is the original timestamp set by the Segment library at the time the event is created.  Keep in mind, this timestamp can be affected by device clock skew. You can override this value by manually passing in a value for `timestamp` which will then be relabeled as `original_timestamp`. Generally, this timestamp should be ignored in favor of the `timestamp` column.

`sent_at` is the UTC timestamp set by library when the Segment API call was sent.  This timestamp can also be affected by device clock skew.

`received_at` is UTC timestamp set by the Segment API when the API receives the payload from client or server. All tables use `received_at` for the sort key.

> info ""
> We recommend using the `received_at` timestamp for all queries based on time. The reason for this is two-fold. First, the `sent_at` timestamp relies on a client's device clock being accurate, which is generally unreliable. Secondly, we set `received_at` as the sort key in Redshift schemas, which means queries will execute much faster when using `received_at`. You can continue to use `timestamp` or `sent_at` timestamps in queries if `received_at` doesn't work for your analysis, but the queries will take longer to complete.

`received_at` does not ensure chronology of events.  For queries based on event chronology, `timestamp` should be used.

> note ""
> **NOTE:** ISO-8601 date strings with timezones included are required when using timestamps with [Personas](/docs/personas/). Sending custom traits without a timezone included in the timestamp will result in the value not being saved. 

To learn more about timestamps in Segment, [read our timestamps overview](/docs/connections/spec/common/#timestamps) in the Segment Spec.

## id

Each row in your database will have an `id` which is equivalent to the messageId which is passed through in the raw JSON events. The `id` is a unique message id associated with the row.

## uuid, uuid_ts, and loaded_at

The `uuid` column is used to prevent duplicates. You can ignore this column.

The `uuid_ts` column is used to keep track of when the specific event was last processed by our connector, specifically for deduping and debugging purposes. You can generally ignore this column.

The `loaded_at` column contains the UTC timestamp reflecting when the data was staged by the processor. 

## Sort Key

All tables use `received_at` for the sort key. Amazon Redshift stores your data on disk in sorted order according to the sort key. The Redshift query optimizer uses sort order when it determines optimal query plans.

## More Help

[How do I send custom data to my warehouse?](/docs/connections/storage/warehouses/faq/#what-if-i-want-to-add-custom-data-to-my-warehouse)

[How do I give users permissions to my warehouse?](/docs/connections/storage/warehouses/add-warehouse-users/)

[How frequently does data sync to my warehouse?](/docs/connections/storage/warehouses/warehouse-syncs/#sync-frequency)

Check out our [Frequently Asked Questions about Warehouses](/docs/connections/storage/warehouses/faq/) and [a list of helpful Redshift queries to get you started](/docs/connections/storage/warehouses/redshift-useful-sql).
