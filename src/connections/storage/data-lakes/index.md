---
hidden: true
title: Data Lakes (Beta)
redirect_from: '/connections/destinations/catalog/data-lakes/'
---

Segment Data Lakes lets you send Segment data to a cloud data store (for example AWS S3) in a format optimized to reduce processing for data analytics and data science workloads. Segment data is great for building machine learning models for personalization and recommendations, and for other large scale advanced analytics. However, without Data Lakes, you might need to do a lot of processing to get real value out of your data.

> info ""
> Segment Data Lakes is available to Business tier customers only.

To learn more, read our blog post on [Cultivating your Data Lake](https://segment.com/blog/cultivating-your-data-lake).


## How Segment Data Lakes Work

Data Lakes blends the experience of using our existing S3 destination and data warehouse destination to build a clean customer data lake on top of Segment to query and glean insights from. Data Engineering, Analysts, and Data Science teams can keep hot and cold data in different places, manage storage costs, remove resource contention, and have a flexible model to consume data across Parquet to build materialized views and aggregations.

![](images/dl_overview2.png)

Data Lakes makes Segment data in S3 more actionable and accessible for customers by:
- Storing Segment data in a read-optimized encoding format (Parquet initially)
- Building in logical data partitions and event tables
- Integrating metadata with existing schema management tools, such as the AWS Glue Data Catalog.

The resulting data set is optimized for use with systems like Spark, Athena, EMR, or Machine Learning vendors like DataBricks or DataRobot.

Segment sends data to S3 by orchestrating the processing in an EMR (Elastic MapReduce) cluster within your AWS account using an assumed role. Customers using Data Lakes own and pay AWS directly for these AWS services.

![](images/dl_vpc.png)


### Using a data lakes with a data warehouse

Data Lakes provides a flexible blob storage solution to Data teams as they scale.

When you use Data Lakes, you can either use Data Lakes as your _only_ source of data and query all of your data directly from S3, or you can use Data Lakes in addition to a data warehouse.

The Data Lakes and Warehouses products are compatible using a mapping, but do not maintain exact parity with each other. This mapping helps you to identify and manage the differences between the two storage solutions, so you can easily understand how the data in each is related. You can [read more about the differences between Data Lakes and Warehouses](/docs/connections/storage/data-lakes/comparison/).


## Set up Segment Data Lakes

Detailed set up instructions can be found in the [Data Lakes catalog page](/docs/connections/storage/catalog/data-lakes/).


## Data Lakes Schema

### S3 Partition Structure

Segment partitions the data in S3 by the Segment source, event type, then the day and hour an event was received by Segment, to ensure that the data is actionable and accessible.

The file path looks like:
`s3://<top-level-Segment-bucket>/data/<source-id>/segment_type=<event type>/day=<YYYY-MM-DD>/hr=<HH>`

Here are a few examples of what events look like:
![](images/dl_s3bucket.png)

By default, the date partition structure is `day=<YYYY-MM-DD>/hr=<HH>` to give you granular access to the S3 data. You can change the partition structure during the [set up process](/docs/connections/storage/catalog/data-lakes/), where you can choose from the following options:
- Day/Hour [YYYY-MM-DD/HH] (Default)
- Year/Month/Day/Hour [YYYY/MM/DD/HH]
- Year/Month/Day [YYYY/MM/DD]
- Day [YYYY-MM-DD]

### AWS Glue

#### Glue Data Catalog
Data Lakes stores the inferred schema and associated metadata of the S3 data in AWS Glue Data Catalog. This metadata includes the location of the S3 file, data converted into Parquet format, column names inferred from the Segment event, nested properties and traits which are now flattened, and the inferred data type.

![](images/dl_gluecatalog.png)

New columns are appended to the end of the table in the Glue Data Catalog as they are detected.

#### Glue Database
The Glue database stores the schema inferred by Segment. Segment stores the schema for each source in its own Glue database to organize the data so it is easier to query. To make it easier to find, Segment writes the schema to a Glue database named using the source slug.

> info ""
> The recommended IAM role permissions grant Segment access to create the Glue databases on your behalf. If you do not grant Segment these permissions, you must manually create the Glue databases for Segment to write to.

### Data Types

Data Lakes infers the data type for the event it receives. Data Lakes looks at the group of events received every hour to infer the data type for that event.

The data types supported in Glue are bigint, decimal(38,6), string, boolean, and timestamp.

#### Schema evolution
Once the data type is set, Data Lakes does not change the data type for a column in the Glue tables. If the data type seen in a sync is different from the column type set in the Glue table, Data Lakes will try to cast the column to the target data type.

If the data type in Glue is wider than the data type for a column in an on-going sync (e.g., decimal vs integer, string vs integer), then the column is casted to the wider type in the Glue table. Alternatively, if the column is narrower (e.g., integer in the table versus decimal in the data), then in the case of numbers, some data might lose precision or might get dropped if it cannot be casted at all. Note that the original data still contains this data so the types can be fixed and a replay can ensure no data is lost.

#### Changing data types
If Data Lakes sees a bad data type, for example text in place of a number or an incorrectly formatted date, it attempts a best effort conversion to cast the field to the target data type. Fields that cannot be cast may be dropped. You can also correct the data type in the schema to the desired type and Replay to ensure no data is lost. [Contact Segment Support](https://segment.com/help/contact/) if you find a data type needs to be corrected.

## EMR

Data Lakes uses an EMR cluster to run jobs which load events from all sources into Data Lakes. The set up instructions have you deploy an EMR cluster using a `m5.xlarge` node type. Currently Data Lakes keeps the cluster  always running, however the cluster auto-scales to ensure it's not always running at full capacity. Check the Terraform module documentation for the [EMR specifications](https://github.com/segmentio/terraform-aws-data-lake/tree/master/modules/emr).

## IAM

Data Lakes uses an IAM role to grant Segment secure access to your AWS account. The required inputs are:
- **external_ids**: External IDs that will be used to assume the role. Segment will currently use the source ID as the external ID when connecting to your AWS account, and this should be a list of IDs of the sources that you want to connect to your Data Lake. These IDs are generated by Segment and can be retrieved from the Segment app.
- **s3_bucket**: Name of the S3 bucket used by the Data Lake.

<!--
TODO:
add schema overview (tables/columns generated)
-->

## FAQs

##### How often is data synced to Data Lakes?

Data Lakes currently offers 12 syncs in a 24 hour period. Data Lakes does not _currently_ offer a custom sync schedule, or allow you use Selective Sync to manage what data is sent.

##### What should I expect in terms of duplicates in Data Lakes?

Segment's overall guarantee for duplicate data also applies to data in Data Lakes: 99% guarantee of no duplicates for data within a [24 hour look-back window](https://segment.com/docs/guides/duplicate-data/).

If you have advanced requirements for de-duplication, you can add de-duplication steps downstream to reduce duplicates outside this look back window.

##### Can I send all of my Segment data into Data Lakes?

Data Lakes currently supports data from all event sources, including website libraries, mobile, server and event cloud sources.

Data Lakes does not currently support loading [object cloud source data](https://segment.com/docs/connections/sources/#object-cloud-sources), as well as the users and accounts tables from event cloud sources.

##### Are user deletions and suppression supported?

User deletions are currently not supported in Data Lakes, however user suppression is supported.

#### How does Data Lakes handle schema evolution?

Any new columns detected will be appended to the end of the table in the Glue Data Catalog.

##### How does Data Lakes work with Protocols?

Data Lakes does not currently have a direct integration with [Protocols](https://segment.com/docs/protocols/).

Today, any changes to events at the source level made with Protocols also change the data for all downstream destinations, including Data Lakes.

- **Mutated events** - If Protocols mutates an event due to a rule set in the Tracking Plan, then that mutation appears in Segment's internal archives and is reflected in Data Lakes. For example, if you used Protocols to mutate the event `product_id` to be `productID`, then the event appears in both Data Lakes and Warehouses as `productID`.

- **Blocked events** - If a Protocols Tracking Plan blocks an event, the event is not forwarded to any downstream Segment destinations, including Data Lakes. However events which are only marked with a violation _are_ passed to Data Lakes.

Data types and labels available in Protocols are not currently supported by Data Lakes.

- **Data Types** - Data Lakes infers the data type for each event using its own schema inference systems, instead of using a data type set for an event in Protocols. This might lead to the data type set in a data lake being different from the data type in the tracking plan. For example, if you set `product_id` to be an integer in the Protocols Tracking Plan, but the event is sent into Segment as a string, then Data Lakes may infer this data type as a string in the Glue Data Catalog.
- **Labels** - Labels set in Protocols are not sent to Data Lakes.

##### What is the cost to use AWS Glue?

The pricing for Glue can be found [here](https://aws.amazon.com/glue/pricing/). For reference, Data Lakes creates 1 table per event type in your source and adds 1 partition per hour to the event table.

##### What limits does AWS Glue have?

AWS Glue has limits across various factors, such as number of databases per account, tables per account, etc. A full list of Glue limits can be found [here](https://docs.aws.amazon.com/general/latest/gr/glue.html#limits_glue).

The most common limits to keep in mind are:
- Databases per account: 10,000
- Tables per database: 200,000
- Characters in a column name: 250

If the limit is met or exceeded, we will skip creating the tables for the events which exceed this limit. However you can reach out to your AWS account representative to increase these limits.

Here are [additional considerations](https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-hive-metastore-glue.html) when using AWS Glue Data Catalog.
