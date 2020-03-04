---
hidden: true
title: Data Lakes (Alpha)
---

Segment Data Lakes helps you send Segment data to cloud object stores (AWS S3 to start) in a manner that is optimized for Data Analytics and Data Science workloads. Segment data is incredibly valuable for building machine learning models for personalization and recommendations as well as for other large scale advanced analytics. However for customers to get real value out of this data they often have to perform significant amounts of processing.

Segment Data Lakes blends the experience of using our existing S3 destination and data warehouse destination. It makes data in S3 more actionable and accessible for customers by building in logical data partitions, storing it in a read optimized encoding format (Parquet initially), and integrating deeply with existing schema management tools, such as the AWS Glue Data Catalog. These formats are optimized for use with systems like Spark, Athena, or Machine Learning vendors like DataBricks or DataRobot.

With Segment Data Lakes, Data Engineering, Analysts, and Data Science teams can keep hot and cold data in different places, reduce costs, remove resource contention to optimize performance, and have a flexible model to consume data across Parquet to build materialized views and aggregations.

To learn more, read our blog post on [Cultivating your Data Lake] (https://segment.com/blog/cultivating-your-data-lake).

### How Segment Data Lakes Work
Segment will build a clean Data Lake on top of what’s already in Segment today - out of the box event collection, Parquet transformations, and a logical table structure, to provide a clean Data Lake to query and gain insights from.

![](images/datalakesoverview.png)

The three tenets to create a clean and easy to use Data Lake are:
- **Fast and efficient**: All data is sent to S3 in Parquet format for easy read access.
- **Break down data in logical structure**: All data is partitioned by source, event type, day and hour. This narrows in on the data you care about when querying, and provides the same tracks and events tables that you get with Segment’s warehouse product.
- **Accessible data structure**: Data structure is fed into the Glue Data Catalog for all tools to be able to target specific pieces of data.

From here you can hook in a multitude of tools to glean insights from the S3 data - Athena, Spectrum, Databricks, EMR.

![data lakes architecture](images/data-lakes-architecture.png)

Today, Segment will land Segment event data in S3 for you by doing the processing in an EMR cluster within your AWS account. Conducting the data processing in your VPC will provide privacy and data ownership gains for you short term.

#### Using a Data Lake alongside a Data Warehouse
Data Lakes bridges the gap between today’s S3 experience and warehouse experience for Segment customers, in order to provide a flexible blob storage solution to Data teams as they scale.

When using Data Lakes, you can either solely use Data Lakes as your source of data and query all of your data directly from S3, or you can use Data Lakes alongside a data warehouse. Configuring the Glue Database name and table prefix will provide the option of being able to set up your Data Lake in a manner that’s consistent with Segment warehouse, to bridge the experience between the two.

### Data Lakes Schema

#### S3 Partition Structure
To ensure the data is actionable and accessible, Segment partitions the data in S3 by the source, event type, then the day and hour an event was received by Segment.

Here’s a sample of what this looks like:
`s3://<top-level-Segment-bucket>/data/<source-id>/segment_type=<event type>/day=<day>/hr=<hour>`

  checkout, track events
  `s3://data-lake/segment-data-lake/data/xxxxxxxxxx/segment_type=track_checkout/day=2019-10-01/hr=12`

  identify calls
  `s3://data-lake/segment-data-lake/data/xxxxxxxxxx/segment_type=identify/day=2019-10-02/hr=22`

#### Glue Database
When enabling the Data Lakes destination for a source, you will define the Glue Database name in the Settings tab. The name of the Glue Database is where your schema will be written.

Setting the Glue Database name will define whether all sources live in one Glue Database, or a different database for each source. For those looking to query data across Data Lakes and a data warehouse simultaneously, the latter option will provide this flexibility.

> info ""
> Segment will create the Glue Databases for you, as long as the proper permissions have been set in the IAM role. If the appropriate permissions haven't been assigned, then customers will need to create the database for Segment to write to.

> warning ""
> If a database name or table prefix is changed, new tables will be created which will require a replay of historical data.

##### One Glue Database for all sources
If you choose to have data across all sources live in one database, you’ll need to also define a table prefix in the Data Lakes <> Source settings. This table prefix will help separate out event tables for each source, otherwise different event types across sources will collide (it won’t be possible to tell whether a tracks table is for Source A or Source B). We recommend setting the table prefix to the source slug.

Here's an example of what the table name will look like with and without a prefix:

**With Prefix**:
- `Source A: db.iOS_prod_tracks_page_views`
- `Source B: db.android_prod_tracks_page_views`

**Without Prefix**:
- `Source A: db.tracks_page_views`
- `Source B: db.tracks_page_views `
As you can see in the latter example, the table names for the two sources are identical even though they contain track events for different sources. By adding a prefix, you can specify which source each table is referring to.

##### One Glue Database per source
Separating each source in its own Glue Database will create better organization and easier querying across your data. It is also consist with the table structure seen in Segment warehouses, so we recommend using this configuration if you’re looking to use Data Lakes alongside your data warehouse.

In this configuration, a table prefix is not needed. We recommend keeping the default setting (null). Here’s what the table names will look like:
`
**With Prefix**:
`$dbname.$tableprefix_$eventtype`
Examples: `ios_prod.ios_track_page_view`, `ios_dev.identify`

**Without Prefix**:
`$dbname.$eventtype`
Examples: `ios_prod.track_page_view`, `ios_dev.identify`

**Warehouse**:
`$source_slug.$event_type`
Examples: `ios_prod.page_view`, `ios_dev.identify`


### Getting Started

#### Step 1 - Pre-Requisites
Before starting to set up Segment Data Lakes, you’ll need to have the following resources:

- Authorized [AWS account] (https://aws.amazon.com/account/)
- [S3 bucket] (https://github.com/terraform-aws-modules/terraform-aws-s3-bucket) to send data to and store logs
- Subnet within a VPC for the EMR cluster to run in

#### Step 2 - Set Up AWS Resources
Using this open sourced [Terraform repo] (https://github.com/segmentio/terraform-aws-data-lake) will help automate a lot of the set up work for getting Segment Data Lakes up and running. We also have [UI based setup docs] (https://docs.google.com/document/d/1GlWzS5KO4QaiVZx9pwfpgF-N-Xy2e_QQcdYSX-nLMDU/edit?usp=sharing) if you prefer to use these instead.

The Terraform module and UI instructions provide a base level of permissions to Segment (e.g., IAM role to allow Segment to create Glue database on your behalf). If you want stricter permissions, or other custom configurations, you can customize these manually.

#### Step 3 - Enable Destination
Once you’ve set up the necessary AWS resources in step 2, you can visit the Segment app via the set up link below to input these settings in-app and complete the Data Lakes set up process.

1. Visit https://app.segment.com/{workspace-slug}/destinations/catalog/data-lakes (replace `{workspace-slug}` with the slug of your workspace).

2. Click “Configure Data Lakes”

3. Select the source you’d like to connect to the Data Lakes destination. Each source must be individually connected to the Data Lakes destination, however you can copy the settings from another source (“…” button next to the button for “Setup Guide”).

> note ""
> Note: All sources must be listed within the external ID list or the source data cannot be synced to S3.

4. In the Settings tab, enter and save the following connection settings:
    - **AWS Region**: The AWS Region where your EMR cluster, S3 Bucket and Glue DB reside.
    - **EMR Cluster ID**: The EMR Cluster ID where your jobs will be run.
    - **Glue Catalog ID**: The Glue Catalog ID (this must be the same as your AWS account ID).
    - **Glue Database Name**: The name of the Glue Database where your schema will be written.
    - **IAM Role ARN**: The ARN of the IAM role that Segment will use to connect to your Data Lake.
    - **S3 Bucket**: Name of the S3 bucket used by the Data Lake. The EMR cluster will be configured to store logs in this bucket.
    - _(Optional)_ **Table Prefix**: Optional prefix to use for the tables created in Glue. This configuration is useful if you prefer to use the same Glue Database for all your sources where the prefix can help separate out event tables for each source. Refer to the Glue Database section above to learn the recommended way to use the table prefix.
  > warning ""
  > Warning: Changing the table prefix will modify the table names created in Glue and will require a backfill for the older data.

5. Enable the Data Lakes destination by toggling the switch next to the “Setup Guide” button to on.

Once the Data Lakes destination is enabled, the first sync will begin ~2 hours later.

#### (Optional) Step 4 - Replay Historical Data
If you’re a Business plan customer and would like to replay historical data into your Data Lake to have a more valuable data set, please reach out to the Segment team to request a replay.
