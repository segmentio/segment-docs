---
title: Warehouses and Data Storage
redirect_from:
- /warehouses/
- '/sql/common-queries/defining-user-sessions/'
- '/sql/common-queries/events-over-time-period/'
- '/sql/common-queries/groups-to-orgs/'
- '/sql/common-queries/identifies-to-users/'
- '/sql/common-queries/traits-by-user/'
- '/warehouses/common-queries/'
---


## What's a Warehouse?

{% include content/whats-a-warehouse.md %}


## Warehouse Schemas

The table below describes the schema in Segment Warehouses:

<table>
  <tr>
    <td>`<source>.aliases`</td>
    <td>A table with all of your `alias` method calls. This table will include all of the `traits` you identify users by as top-level columns, for example `<source>.aliases.email`.</td>
  </tr>
  <tr>
    <td>`<source>.groups`</td>
    <td>A table with all of your `group` method calls. This table will include all of the `traits` you record for groups as top-level columns, for example `<source>.groups.employee_count`.</td>
  </tr>
  <tr>
    <td>`<source>.accounts`</td>
    <td>*CURRENTLY IN BETA* A table with unique `group` method calls. Group calls are upserted into this table (updated if an existing entry exists, appended otherwise). This table holds the latest state of a group.</td>
  </tr>
  <tr>
    <td>`<source>.identifies`</td>
    <td>A table with all of your `identify` method calls. This table will include all of the `traits` you identify users by as top-level columns, for example `<source>.identifies.email`.</td>
  </tr>
  <tr>
    <td>`<source>.users`</td>
    <td>A table with unique `identify` calls. `identify` calls are upserted on `user_id` into this table (updated if an existing entry exists, appended otherwise). This table holds the latest state of of a user. The `id` column in the users table is equivalent to the `user_id` column in the identifies table. Also note that this table won't have an `anonymous_id` column since a user can have multiple anonymousIds. To get at a user's anonymousIds, you'll need to query the identifies table. *If you observe any duplicates in the users table, please [contact us](/contact/).*</td>
  </tr>
  <tr>
    <td>`<source>.pages`</td>
    <td>A table with all of your `page` method calls. This table will include all of the `properties` you record for pages as top-level columns, for example `<source>.pages.title`.</td>
  </tr>
  <tr>
    <td>`<source>.screens`</td>
    <td>A table with all of your `screen` method calls. This table will include all of the `properties` you record for screens as top-level columns, for example `<source>.screens.title`.</td>
  </tr>
  <tr>
    <td>`<source>.tracks`</td>
    <td>A table with all of your `track` method calls. This table will only include a few standardized properties that are all common to all events: `anonymous_id`, `context_*`, `event`, `event_text`, `received_at`, `sent_at`, and `user_id`.  This is because every event that you send to Segment has completely different properties.  For querying by the custom properties, use the `<source>.<event>` tables instead.</td>
  </tr>
  <tr>
    <td>`<source>.<event>`</td>
    <td>For `track` calls, each event like `Signed Up` or `Order Completed` also has it's own table (eg. `initech.clocked_in`) with columns for each of the event's distinct `properties` (eg. `initech.clocked_in.time`).</td>
  </tr>
</table>


### Identifies

Your `identifies` table is where all of your `.identify()` method calls are stored. Query it to find out user-level information. It has the following columns:

<table>
  <tr>
    <td>`anonymous_id`</td>
    <td>The anonymous ID of the user.</td>
  </tr>
  <tr>
    <td>`context_<key>`</td>
    <td>Non-user-related context fields sent with each identify call.</td>
  </tr>
  <tr>
    <td>`id`</td>
    <td>The unique ID of the identify call itself.</td>
  </tr>
  <tr>
    <td>`received_at`</td>
    <td>When the identify call was received by Segment.</td>
  </tr>
  <tr>
    <td>`sent_at`</td>
    <td>When the identify call was triggered by the user.</td>
  </tr>
  <tr>
    <td>`user_id`</td>
    <td>The unique ID of the user.</td>
  </tr>
  <tr>
    <td>`<trait>`</td>
    <td>Each trait of the user you record is created as it's own column, and the column type is automatically inferred from your data. For example, you might have columns like `email` and `first_name`.</td>
  </tr>
</table>

To see a list of the columns in the `identifies` table for your `<source>` run:

```sql
SELECT column_name AS Columns
FROM columns
WHERE schema_name = '<source>'
AND table_name = 'identifies'
ORDER by column_name
```


<table>
  <thead>
    <tr><td>**Columns**</td></tr>
  </thead>
  <tbody>
    <tr><td>anonymous_id</td></tr>
    <tr><td>context_ip</td></tr>
    <tr><td>email</td></tr>
    <tr><td>...</td></tr>
  </tbody>
</table>

Your `identifies` table is where you can do all sorts of querying about your users and their traits. For example, if you wanted to see the number of unique users you've seen on your site each day:

```sql
SELECT DATE(sent_at) AS Day, COUNT(DISTINCT(user_id)) AS Users
FROM <source>.identifies
GROUP BY day
ORDER BY day
```


### Groups

Your `groups` table is where all of your `group` method calls are stored. Query it to find out group-level information. It has the following columns:

<table>
  <tr>
    <td>`anonymous_id`</td>
    <td>The anonymous ID of the user.</td>
  </tr>
  <tr>
    <td>`context_<key>`</td>
    <td>Non-user-related context fields sent with each group call.</td>
  </tr>
  <tr>
    <td>`group_id`</td>
    <td>The unique ID of the group.</td>
  </tr>
  <tr>
    <td>`id`</td>
    <td>The unique ID of the group call itself.</td>
  </tr>
  <tr>
    <td>`received_at`</td>
    <td>When the group call was received by Segment.</td>
  </tr>
  <tr>
    <td>`sent_at`</td>
    <td>When the group call was triggered by the user.</td>
  </tr>
  <tr>
    <td>`user_id`</td>
    <td>The unique ID of the user.</td>
  </tr>
  <tr>
    <td>`<trait>`</td>
    <td>Each trait of the group you record is created as it's own column, and the column type is automatically inferred from your data. For example, you might have columns like `email` and `name`.</td>
  </tr>
</table>

To see a list of the columns in the `groups` table for your `<source>` run:

```sql
SELECT column_name AS Columns
FROM columns
WHERE schema_name = '<source>'
AND table_name = 'groups'
ORDER by column_name
```


<table>
  <thead>
    <tr><td>**Columns**</td></tr>
  </thead>
  <tbody>
    <tr><td>anonymous_id</td></tr>
    <tr><td>context_ip</td></tr>
    <tr><td>...</td></tr>
  </tbody>
</table>

To see a list of all of the groups using your product run:

```sql
SELECT name AS Company
FROM <source>.groups
GROUP BY name
```


<table>
  <thead>
    <tr><td>**Company**</td></tr>
  </thead>
  <tbody>
    <tr><td>Comcast</td></tr>
    <tr><td>Rdio</td></tr>
    <tr><td>Warner Brothers</td></tr>
    <tr><td>...</td></tr>
  </tbody>
</table>


### Pages & Screens

Your `pages` and `screens` tables are where all of your `page` and `screen` method calls are stored. Query it to find out information about page views or screen views. It has the following columns:

<table>
  <tr>
    <td>`anonymous_id`</td>
    <td>The anonymous ID of the user.</td>
  </tr>
  <tr>
    <td>`context_<key>`</td>
    <td>Non-user-related context fields sent with each page or screen call.</td>
  </tr>
  <tr>
    <td>`id`</td>
    <td>The unique ID of the page or screen call itself.</td>
  </tr>
  <tr>
    <td>`received_at`</td>
    <td>When the page or screen call was received by Segment.</td>
  </tr>
  <tr>
    <td>`sent_at`</td>
    <td>When the page or screen call was triggered by the user.</td>
  </tr>
  <tr>
    <td>`user_id`</td>
    <td>The unique ID of the user.</td>
  </tr>
  <tr>
    <td>`<property>`</td>
    <td>Each property of your pages or screens is created as it's own column, and the column type is automatically inferred from your data. For example, you might have columns like `referrer` and `title`.</td>
  </tr>
</table>

To see a list of the columns in the `pages` table for your `<source>` run:

```sql
SELECT column_name AS Columns
FROM columns
WHERE schema_name = '<source>'
AND table_name = 'pages'
ORDER by column_name
```


<table>
  <thead>
    <tr><td>**Columns**</td></tr>
  </thead>
  <tbody>
    <tr><td>`anonymous_id`</td></tr>
    <tr><td>`context_ip`</td></tr>
    <tr><td>`referrer`</td></tr>
    <tr><td>`...`</td></tr>
  </tbody>
</table>

The pages table can give you interesting information about page views that happen on your site, for example you can see the number of page views grouped by day:

```sql
SELECT DATE(sent_at) AS Day, COUNT(*) AS Views
FROM <source>.pages
GROUP BY day
ORDER BY day
```

<table>
  <thead>
    <tr>
      <td>**Day**</td>
      <td>**Views**</td>
    </tr>
  </thead>
  <tr>
    <td>2015-01-14</td>
    <td>2,203,198</td>
  </tr>
  <tr>
    <td>2015-01-15</td>
    <td>2,393,020</td>
  </tr>
  <tr>
    <td>2015-07-21</td>
    <td>1,920,290</td>
  </tr>
  <tr>
    <td>...</td>
    <td>...</td>
  </tr>
</table>


### Tracks

Your `tracks` table is where all of your `track` method calls are stored. Query it to find out information about the events your users have triggered. It has the following columns:

<table>
  <tr>
    <td>`anonymous_id`</td>
    <td>The anonymous ID of the user.</td>
  </tr>
  <tr>
    <td>`context_<key>`</td>
    <td>Non-user-related context fields sent with each track call.</td>
  </tr>
  <tr>
    <td>`event`</td>
    <td>The slug of the event name, mapping to an event-specific table.</td>
  </tr>
  <tr>
    <td>`event_text`</td>
    <td>The name of the event.</td>
  </tr>
  <tr>
    <td>`id`</td>
    <td>An ID attached to the event at execution time and used for deduplication at the server level. </td>
  </tr>
  <tr>
    <td>`received_at`</td>
    <td>When the track call was received by Segment.</td>
  </tr>
  <tr>
    <td>`sent_at`</td>
    <td>When the track call was triggered by the user.</td>
  </tr>
  <tr>
    <td>`user_id`</td>
    <td>The unique ID of the user.</td>
  </tr>
</table>

Your `tracks` table is a rollup of all of the different event-specific tables, for quick querying of just a single type. For example, you could see the count of how many unique users signed up each day:

```sql
SELECT DATE(sent_at) AS Day, COUNT(DISTINCT(user_id)) AS Users
FROM segment.tracks
WHERE event = 'signed_up'
GROUP BY day
ORDER BY day
```


<table>
  <thead>
    <tr>
      <td>**Day**</td>
      <td>**Users**</td>
    </tr>
  </thead>
  <tr>
    <td>2015-01-14</td>
    <td>25,198</td>
  </tr>
  <tr>
    <td>2015-01-15</td>
    <td>31,020</td>
  </tr>
  <tr>
    <td>2015-07-21</td>
    <td>19,290</td>
  </tr>
  <tr>
    <td>...</td>
    <td>...</td>
  </tr>
</table>


### Event Tables

Your event tables are a series of table for each custom event you record to Segment. We break them out into their own tables because the properties, and thus the columns, differ for each event. Query these tables to find out information about specific properties of your custom events. They have the following columns:

<table>
  <tr>
    <td>`anonymous_id`</td>
    <td>The anonymous ID of the user.</td>
  </tr>
  <tr>
    <td>`context_<key>`</td>
    <td>Non-user-related context fields sent with each track call.</td>
  </tr>
  <tr>
    <td>`event`</td>
    <td>The slug of the event name, so you can join the `tracks` table.</td>
  </tr>
  <tr>
    <td>`event_text`</td>
    <td>The name of the event.</td>
  </tr>
  <tr>
    <td>`id`</td>
    <td>The unique ID of the track call itself.</td>
  </tr>
  <tr>
    <td>`received_at`</td>
    <td>When the track call was received by Segment.</td>
  </tr>
  <tr>
    <td>`sent_at`</td>
    <td>When the track call was triggered by the user.</td>
  </tr>
  <tr>
    <td>`user_id`</td>
    <td>The unique ID of the user.</td>
  </tr>
    <td>`<property>`</td>
    <td>Each property of your track calls is created as it's own column, and the column type is automatically inferred from your data.</td>
  </tr>
</table>

To see a list of all of the event tables for a given `<source>` you can run:

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


<table>
  <thead>
    <tr>
      <td>**source**</td>
      <td>**Event**</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>production</td>
      <td>signed_up</td>
    </tr>
    <tr>
      <td>production</td>
      <td>completed_order</td>
    </tr>
    <tr>
      <td>...</td>
      <td>...</td>
    </tr>
  </tbody>
</table>

To see a list of the columns in one of your event tables run:

```sql
SELECT column_name AS Columns
FROM columns
WHERE schema_name = '<source>'
AND table_name = '<event>'
ORDER by column_name
```


<table>
  <thead>
    <tr><td>**Columns**</td></tr>
  </thead>
  <tbody>
    <tr><td>anonymous_id</td></tr>
    <tr><td>context_ip</td></tr>
    <tr><td>...</td></tr>
  </tbody>
</table>

**Note:** If you send us an array, we will stringify it in Redshift. That way you don't end up having to pollute your events. It won't work perfectly if you have a lot of array elements but should work decently to store and query those. We also flatten nested objects. 

### Tracks vs. Events Tables

To see all of the tables for your organization, you can run this query:

```sql
SELECT schema || '.' || "table" AS table, rows
FROM disk
ORDER BY 1
```

The  source.event tables have all of the same columns as the source.track tables, but they also include columns specific to the properties of each event.

So if you're recording an event like:

```js
analytics.track('Register', {
  plan: 'Pro Annual',
  accountType: 'Facebook'
});
```

Then you can expect to see columns named `plan` and `account_type` as well as the default `event`, `id`, etc. That way you can write queries against any of the custom data send in track calls.

**Note:** Because `properties` and `traits` are added as un-prefixed columns to your tables, there is a chance of collision with our reserved column names. For this reason, properties with the same name as reserved column name (eg. `user_id`) will be discarded.

Your event tables are one of the more powerful datasets in Segment SQL. They allow you to clearly see which actions users are performing when interacting with your product.

Because every source has different events, what you can do with them will vary. Here's an example where you can see how many "Enterprise" users signed up for each day:

```sql
SELECT DATE(sent_at) AS Day, COUNT(DISTINCT(user_id)) AS Users
FROM <source>.signed_up
WHERE account_type = 'Enterprise'
GROUP BY day
ORDER BY day
```


<table>
  <thead>
    <tr>
      <td>**Day**</td>
      <td>**Users**</td>
    </tr>
  </thead>
  <tr>
    <td>2015-01-14</td>
    <td>258</td>
  </tr>
  <tr>
    <td>2015-01-15</td>
    <td>320</td>
  </tr>
  <tr>
    <td>2015-07-21</td>
    <td>190</td>
  </tr>
  <tr>
    <td>...</td>
    <td>...</td>
  </tr>
</table>

Here's an example that queries the daily revenue for an ecommerce store:

```sql
SELECT DATE(sent_at) AS Day, SUM(total) AS Revenue
FROM <source>.completed_order
GROUP BY day
ORDER BY day
```


<table>
  <thead>
    <tr>
      <td>**Day**</td>
      <td>**Revenue**</td>
    </tr>
  </thead>
  <tr>
    <td>2014-07-19</td>
    <td>$2,630</td>
  </tr>
  <tr>
    <td>2014-07-20</td>
    <td>$1,595</td>
  </tr>
  <tr>
    <td>2014-07-21</td>
    <td>$2,350</td>
  </tr>
</table>

#### New Columns

Columns are created for new event properties and traits. We process the incoming data to Segment in batches, based on either data size or an interval of time. If the table doesn't exist we lock and create the table. If the table exists but new columns need to be created, we perform a diff and alter the table to append new columns.

**Note:** We create tables for each of your custom events, and columns for each event's custom properties. Redshift itself has limits on how many can be created, so we do not allow unbounded event or property spaces in your data. Instead of recording events like "Ordered Product 15", use a single property of "Product Number" or similar._

When we process a new batch and discover a new column needs to be added, we take the most recent occurrence of a column and choose its datatype.

The datatypes that we support right now are: 

-`timestamp`
-`integer` 
-`float`
-`boolean`
-`varchar`

### Column Sizing

After analyzing the data from dozens of customers we set the string column length limit at 512 characters. Longer strings are truncated. We found this was the sweet spot for good performance and ignoring non-useful data.

We special-case compression for some known columns like event names and timestamps. The others default to LZO. We may add look-ahead sampling down the road, but from inspecting the datasets today this would be unnecessary complexity.

After a column is created, Redshift doesn't allow altering. Swapping and renaming may work down the road, but this would likely cause thrashing and performance issues. If you would like to change the column size, see our [docs here](/docs/faqs/warehouses/redshift-limitations/#varchar-size-limits-).

### Timestamps

There are four timestamps associated with every Segment API call: `timestamp`, `original_timestamp`, `sent_at` and `received_at`.

All four timestamps are passed through to your Warehouse for every ETL'd event. In most cases the timestamps are fairly close together, but they have different meanings which are important.

`timestamp` is the UTC-converted timestamp which is set by the Segment library. If you are importing historical events via a server-side library, this is the timestamp you'll want to reference in your queries!

`original_timestamp` is the original timestamp set by the Segment library at the time the event is created.  Keep in mind, this timestamp can be affected by device clock skew. You can override this value by manually passing in a value for `timestamp` which will then be relabed as `original_timestamp`. Generally, this timestamp should be ignored in favor of the `timestamp` column.

`sent_at` is the UTC timestamp set by library when the Segment API call was sent.  This timestamp can also be affected by device clock skew.

`received_at` is UTC timestamp set by the Segment API when the API receives the payload from client or server. All tables use `received_at` for the sort key.

**IMPORTANT:** We highly recommend using the `received_at` timestamp for all queries based on time. The reason for this is two-fold. First, the `sent_at` timestamp relies on a client's device clock being accurate, which is generally unreliable. Secondly, we set `received_at` as the sort key in Redshift schemas, which means queries will execute much faster when using `received_at`. You can continue to use `timestamp` or `sent_at` timestamps in queries if `received_at` doesn't work for your analysis, but the queries will take longer to complete.

However, `received_at` does not ensure chronology of events.  For queries based on event chronology, `timestamp` should be used.

[Here's additional documentation](/docs/spec/common/#timestamps) on timestamps in the context of our spec.

### id

Each row in your database will have an `id` which is equivalent to the messageId which is passed through in the raw JSON events. The `id` is a unique message id associated with the row.

### uuid and uuid_ts

The `uuid` column is used to prevent duplicates. You can ignore this column.

The `uuid_ts` column is used to keep track of when the specific event was last processed by our connector, specifically for deduping and debugging purposes. You can generally ignore this column.

### Sort Key

All tables use `received_at` for the sort key. Amazon Redshift stores your data on disk in sorted order according to the sort key. The Redshift query optimizer uses sort order when it determines optimal query plans.

### More Help

[How do I send custom data to my warehouse?](/docs/faqs/warehouses/custom-data)

[How do I give users permissions to my warehouse?](/docs/faqs/warehouses/add-users)

Check out our [Frequently Asked Questions about Warehouses](/docs/connections/warehouses/faq/) and [a list of helpful queries to get you started](https://help.segment.com/hc/en-us/articles/205577035-Common-Segment-SQL-Queries).



## FAQs

[How do I decide between Redshift, Postgres, and BigQuery?](/docs/guides/warehouses/redshift-v-postgres-v-bigquery)

[What do you recommend for Postgres: Amazon or Heroku?](/docs/guides/warehouses/postgres-amazon-v-heroku)

[How do I give users permissions?](/docs/guides/warehouses/add-users)

[What are the limitations of Redshift clusters and our warehouses connector?](/docs/guides/warehouses/redshift-limitations)

[Where do I find my source slug?](/docs/guides/warehouses/source-slug)

### Setting up a warehouse


[How do I create a user, grant usage on a schema and then grant the privileges that the user will need to interact with that schema?](/docs/guides/warehouses/add-users)

[Which IPs should I whitelist?](/docs/guides/warehouses/whitelist-ip-addresses)

[Will Segment sync my historical data?](/docs/guides/warehouses/replay)

[Can I load in my own data into my warehouse?](/docs/guides/warehouses/custom-data)

[Can I control what data is sent to my warehouse?](/docs/guides/warehouses/data-to-warehouses)

### Managing a warehouse

[How fresh is the data in my warehouse?](/docs/guides/warehouses/fresh-data)

[Can I add, tweak, or delete some of the tables?](/docs/guides/warehouses/changing-tables)

[Can I transform or clean up old data to new formats or specs?](/docs/guides/warehouses/can-we-clean-up-old-data)

[What are common errors and how do I debug them?](/docs/guides/warehouses/errors-and-debugging)

[How do I speed up my queries?](/docs/guides/warehouses/improve-query-speeds)

### Analyzing with SQL

[How do I forecast LTV with SQL and Excel for e-commerce businesses?](/docs/guides/warehouses/how-to-forecast-ltv-with-sql-and-excel)

[How do I measure the ROI of my Marketing Campaigns?](/docs/guides/warehouses/how-to-measure-roi-of-marketing-campaigns)
