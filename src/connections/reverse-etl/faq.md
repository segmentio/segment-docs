---
title: Reverse ETL FAQ
beta: false
---

Get answers to some frequently asked Reverse ETL questions. 

## Why do my sync results show *No records extracted* when I select *Updated records* after I enable the mapping? 
It's expected that when you select **Updated records**, the records do not change after the first sync. During the first sync, the reverse ETL system calculates a snapshot of all the results and creates records in the `_segment_reverse_etl` schema. All the records are considered as *Added records* instead of *Updated records* at this time. The records can only meet the *Updated records* condition when the underlying values change after the first sync completes.

## Can I be notified when Reverse ETL syncs fail?
Yes, you can sign up for Reverse ETL sync notifications.

To receive Reverse ETL sync notifications: 
1. Navigate to **Settings > User Preferences**.
2. Select **Reverse ETL** in the **Activity Notifications** section.
3. Enable the toggle for **Reverse ETL Sync Failed**.

In case of consecutive failures, Segment sends notifications for every sync failure. Segment doesn't send notifications for partial failures.

## Does Segment use Transport Layer Security (TLS) for the connection between Snowflake and Segment?
Segment uses the [gosnowflake library](https://pkg.go.dev/github.com/snowflakedb/gosnowflake#pkg-variables){:target="_blank"} to connect with Snowflake, which internally uses TLS for the HTTP transport.

## Can I have multiple queries in the Query Builder?
No. In Reverse ETL, Segment executes queries in a [common table expression](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#with_clause){:target="_blank”}, which can only bind the results from **one single** subquery. If there are multiple semicolons `;` in the query, they'll be treated as several subqueries (even if the second part is only an inline comment) and cause syntax errors.

## Can I use functions with Reverse ETL?
Functions aren't supported by Reverse ETL. As a workaround, instead of using the [Segment Connections](/docs/connections/destinations/catalog/actions-segment/) integration, use the [Webhook (Actions)](/docs/connections/destinations/catalog/actions-webhook/) integration behind your Reverse ETL extraction. With that in place, you can send data to [Source Functions](/docs/connections/functions/source-functions/). You can write the code in that function to do the work you had wanted to do in the Insert Function. From there, the data your code allows to move on, flows into a Segment source just like it would if you were using Segment Connections.