---
hidden: true
title: Data Lakes (Private Beta)
redirect_from: '/connections/destinations/catalog/data-lakes/'
---
<!-- Mallika TODO: Remove anything that's in the catalog page, make this just the overview/how it works/conceptual stuff. :) -->


Segment Data Lakes let you send Segment data to cloud data stores (for example AWS S3 to start) in a format optimized to reduce processing for data analytics and data science workloads. Segment data is great for building machine learning models for personalization and recommendations, and for other large scale advanced analytics. However, without Data Lakes, you might need to do a significant amount of processing to get real value out of this data.

Data Lakes blends the experience of using our existing S3 destination and data warehouse destination. It makes data in S3 more actionable and accessible for customers by building in logical data partitions, storing it in a read optimized encoding format (Parquet initially), and integrating deeply with existing schema management tools, such as the AWS Glue Data Catalog. These formats are optimized for use with systems like Spark, Athena, or Machine Learning vendors like DataBricks or DataRobot.

With Segment Data Lakes, Data Engineering, Analysts, and Data Science teams can keep hot and cold data in different places, reduce costs, remove resource contention to optimize performance, and have a flexible model to consume data across Parquet to build materialized views and aggregations.

To learn more, read our blog post on [Cultivating your Data Lake](https://segment.com/blog/cultivating-your-data-lake).

## How Segment Data Lakes Work

Segment builds a Data Lake on top of what’s already in Segment today - event collection, Parquet transformations, and a logical table structure, to provide a clean Data Lake to query and gain insights from.

![](images/datalakesoverview.png)

The data lakes:

- **Are fast and efficient**: All data is sent to S3 in [Parquet format](https://parquet.apache.org/) for easy read access.
- **Organize data in logical structures**: All data is partitioned by source, event type, date and hour to allow you to query a narrower scope of data, and provides the same 'events' tables that you are familiar with from Segment's warehouse product.
- **Accessible data structure**: The data structure is ingested by [Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/populate-data-catalog.html) so all of your tools can access specific pieces of data, giving you flexibility to build on top of the raw data set.

From here you can connect many tools to analyze the data - Athena, Spectrum, Databricks, EMR.

![data lakes architecture](images/data-lakes-architecture.png)

Today, Segment sends Segment event data to S3 for you by doing the processing in an EMR (Elastic MapReduce) cluster within your AWS account. You can use data lakes to process the data in your own VPC to provide privacy and data ownership gains for you short term.

### Using a Data Lake with a Data Warehouse

Data Lakes provides a flexible blob storage solution to Data teams as they scale.

When using Data Lakes, you can either solely use Data Lakes as your source of data and directly query all of your data, or you can use Data Lakes alongside a data warehouse.

The Data Lakes and Warehouses products are not in parity with each other, but instead they are compatible because there is an understandable mapping between the two. This mapping enables you to identify and manage the differences to bridge the experience between Data Lakes and Warehouses. You can see the differences between Data Lakes and Warehouses [here] ().

Additionally, Data Lakes offers the ability to configure different components of the set up to increase compatibility with Warehouses. This configuration includes the number of Glue Databases used, setting a table prefix, and selecting between two schemas. Read more information about how to set up Data Lakes to increase compatibility with Warehouses [here] ().


## Data Lakes Schema

### S3 Partition Structure

To ensure the data is actionable and accessible, Segment partitions the data in S3 by the source, event type, then the day and hour an event was received by Segment.

Here’s a sample of what this looks like:
`s3://<top-level-Segment-bucket>/data/<source-id>/segment_type=<event type>/day=<day>/hr=<hour>`

Checkout, track events
`s3://data-lake/segment-data-lake/data/xxxxxxxxxx/segment_type=track_checkout/day=2019-10-01/hr=12`

Identify calls
`s3://data-lake/segment-data-lake/data/xxxxxxxxxx/segment_type=identify/day=2019-10-02/hr=22`

### Glue Database

When you connect Data Lakes to a source, you set the Glue Database name in the **Settings** tab. The name of the Glue Database is where Segment writes your schema.

Setting the Glue Database name will define whether all sources live in one Glue Database, or a different database for each source. For those looking to query data across Data Lakes and a data warehouse simultaneously, the latter option will provide this flexibility.

> info ""
> Segment can create the Glue databases for you if you grant it the correct IAM role permissions. If you do not grant Segment the correct permissions, then you must manually create the Glue databases for Segment to write to.

> warning ""
> If you change a database name or table prefix, new tables will be created which will require a replay of historical data.

#### One Glue Database for all sources

If you choose to have data from all sources live in one database, you’ll need to also define a table prefix in the **Data Lakes > Source** settings.

This table prefix separates event tables for each source, to prevent different event types across sources from colliding, and make it be possible to tell whether a `tracks` table is for Source A or Source B. We recommend setting the table prefix to the source slug.

Here's an example of what the table name looks like with and without a prefix:

**With Prefix**:
- `Source A: db.iOS_prod_tracks_page_views`
- `Source B: db.android_prod_tracks_page_views`

**Without Prefix**:
- `Source A: db.tracks_page_views`
- `Source B: db.tracks_page_views `

As you can see in the second example, the table names for the two sources are identical even though they contain track events for different sources. By adding a prefix, you can specify which source each table is referring to.

#### One Glue Database per source

Separating each source in its own Glue Database creates better organization and easier querying across the data. It's also consistent with the table structure seen in Segment warehouses, so we recommend using this configuration if you’re looking to use Data Lakes with your data warehouse.

In this configuration, a table prefix is not needed. We recommend keeping the default setting `(null)`.

Here’s what the table names will look like:

**With Prefix**:
`$dbname.$tableprefix_$eventtype`
Examples: `ios_prod.ios_track_page_view`, `ios_dev.identify`

**Without Prefix**:
`$dbname.$eventtype`
Examples: `ios_prod.track_page_view`, `ios_dev.identify`

**Warehouse**:
`$source_slug.$event_type`
Examples: `ios_prod.page_view`, `ios_dev.identify`

### Data Types
Data Lakes infers the data type for the event it receives. Data Lakes looks at the group of events received every hour to infer the data type for that event.

If a bad data type is seen, such as text in place of a number or an incorrectly formatted date, Data Lakes attempts a best effort conversion to cast the field to the target data type. Fields that cannot be casted may be dropped. There is always the option to correct the data type in the schema to the desired type and perform a replay to ensure no data is lost. [Contact us] (https://segment.com/help/contact/) if a data type needs to be corrected.


## FAQs

##### How often is data synced to Data Lakes?
Data Lakes currently offers 12 syncs in a 24 hour period. Unlike Warehouses, Data Lakes does not offer support to customize the data sent via a custom sync schedule, or manage what data is sent using Selective Sync at this time.

##### What should I expect in terms of duplicates in Data Lakes?
The guarantee for duplicate data found in Data Lakes matches Segment’s overall guarantee for duplicates - 99% guarantee of no duplicates for data within a [24 hour look-back window] (https://segment.com/docs/guides/duplicate-data/).

Customers who have advanced requirements for duplicates can add an additional de-duplication step downstream to further reduce duplicates beyond this look back window.

##### Can I send all of my Segment data into Data Lakes?
Data Lakes currently supports data from all event sources, including website libraries, mobile, server and event cloud sources.

Data Lakes does not currently support any [object cloud sources] (https://segment.com/docs/connections/sources/#object-cloud-sources), as well as the users and accounts tables from event cloud sources.

##### Are user deletions and suppression supported?
User deletions are currently not supported in Data Lakes, however user suppression is supported.

##### How does Data Lakes work with Protocols?
Data Lakes does not currently have a direct integration with [Protocols] (https://segment.com/docs/protocols/).

Today you can expect any changes made with Protocols to events at the source level will impact data for all downstream destinations, including Data Lakes.
- *Mutated events* - If Protocols mutates an event due to a rule set in the Tracking Plan, then that mutation will appear in Segment's internal archives and thus reflected in Data Lakes. To illustrate this, if you were to want the event `product_id` to be reflected as `productID` and have set this in Protocols, then this event will appear in both Data Lakes and Warehouses as `productID`.
- *Blocked events* - If an event is set to be blocked in the Protocols Tracking Plan, then the event does not get forwarded to any downstream Segment destinations, including Data Lakes. However events marked with a violation will be passed to Data Lakes.

Data types and labels available in Protocols are not currently supported by Data Lakes.
- *Data Types* - Data Lakes will infer the data type for each event using its own schema inference systems instead of using a data type set in Protocols for an event. This may lead to instances where the data type set in Data Lakes is different than the data type set in the tracking plan. For example, if you set `product_id` to be an integer in the Protocols Tracking Plan, if the event was sent into Segment as a string, then Data Lakes may infer this data type as a string in the Glue Data Catalog.
- *Labels* - Labels set in Protocols are not sent to Data Lakes.
