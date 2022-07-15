---
title: Segment Data Lakes Overview
redirect_from: '/connections/destinations/catalog/data-lakes/'
---

{% include content/plan-grid.md name="data-lakes" %}

> warning "Azure Data Lakes public beta data deletion policies"
> Data deletion is not supported by the Azure Data Lakes product, as customers retain data in systems that they manage. Azure Data Lakes is not supported in EU during the public beta, so European data recency requirements do not apply.

A **data lake** is a centralized cloud storage location that holds structured and unstructured data. 

Data lakes typically have four layers: 
- **Storage layer:** Holds large files and raw data. 
- **Metadata store:** Stores the schema, or the process used to organize the files in the object store. 
- **Query layer:** Allows you to run SQL queries on the object store. 
- **Compute layer:** Allows you to write to and transform the data in the storage layer.

![A graphic showing the information flowing from the metadata into the query, compute, and metadata layers, and then into the storage layer](images/data_lakes_overview_graphic.png)

Segment Data Lakes sends Segment data to a cloud data store, either AWS S3 or Azure Data Lake Storage Gen2 (ADLS), in a format optimized to reduce processing for data analytics and data science workloads. Segment data is great for building machine learning models for personalization and recommendations, and for other large scale advanced analytics. Data Lakes reduces the amount of processing required to get real value out of your data.

> info ""
> Segment Data Lakes is available to Business tier customers only. Azure Data Lakes is currently in Public Beta. 

To learn more about Segment Data Lakes, check out the Segment blog post [Introducing Segment Data Lakes](https://segment.com/blog/introducing-segment-data-lakes/){:target="_blank"}.

## How Data Lakes work

Segment supports Data Lakes hosted on two cloud providers: Amazon Web Services (AWS) and Microsoft Azure. Each cloud provider has a similar system for managing data, but offer different query engines, post-processing systems, and analytics options. 

### How Segment Data Lakes works

Data Lakes store Segment data in S3 in a read-optimized encoding format (Parquet) which makes the data more accessible and actionable. To help you zero-in on the right data, Data Lakes also creates logical data partitions and event tables, and integrates metadata with existing schema management tools, such as the AWS Glue Data Catalog. The resulting data set is optimized for use with systems like Spark, Athena, EMR, or machine learning vendors like DataBricks or DataRobot.

![A diagram showing data flowing from Segment, through Parquet and S3, into Glue, and then into your Data Lake](images/dl_overview2.png)

Segment sends data to S3 by orchestrating the processing in an EMR (Elastic MapReduce) cluster within your AWS account using an assumed role. Customers using Data Lakes own and pay AWS directly for these AWS services.

![A diagram visualizing data flowing from a Segment user into your account and into a Glue catalog/S3 bucket](images/dl_vpc.png)

### How Azure Data Lakes works

Data Lakes store Segment data in ADLS in a read-optimized encoding format (Parquet) which makes the data more accessible and actionable. To help you zero-in on the right data, Data Lakes also creates logical data partitions and event tables, and integrates metadata with existing schema management tools, like the Hive Metastore. The resulting data set is optimized for use with systems like Power BI and Azure HDInsight or machine learning vendors like Azure Databricks or Azure Synapse Analytics.

![A diagram showing data flowing from Segment, through DataBricks, Parquet and Azure Data Lake Storage Gen2 into the Hive Metastore, and then into your post-processing systems](images/Azure_DL_setup.png)


## Set up Segment Data Lakes

For more detailed information about setting up Segment and Azure Data Lakes, please see the [Data Lakes setup page](/docs/connections/storage/catalog/data-lakes/).

### Set up Segment Data Lakes
When setting up your data lake using the [Data Lakes catalog page](/docs/connections/storage/catalog/data-lakes/), be sure to consider the EMR and AWS IAM components listed below.

#### EMR

Data Lakes uses an EMR cluster to run jobs that load events from all sources into Data Lakes. The [AWS resources portion of the set up instructions](/docs/connections/storage/catalog/data-lakes/#step-1---set-up-aws-resources) sets up an EMR cluster using the `m5.xlarge` node type. Data Lakes keeps the cluster always running, however the cluster auto-scales to ensure it's not always running at full capacity. Check the Terraform module documentation for the [EMR specifications](https://github.com/segmentio/terraform-aws-data-lake/tree/master/modules/emr){:target="_blank"}.

#### AWS IAM role

Data Lakes uses an IAM role to grant Segment secure access to your AWS account. The required inputs are:
- **external_ids**: External IDs are the part of the IAM role which Segment uses to assume the role providing access to your AWS account. You will define the external ID in the IAM role as the Segment Workspace ID in which you want to connect to  Data Lakes. The Segment Workspace ID can be retrieved from the [Segment app](https://app.segment.com/goto-my-workspace/overview){:target="_blank"} by navigating to Settings > General Settings > ID.
- **s3_bucket**: Name of the S3 bucket used by the Data Lake.

### Set up Azure Data Lakes

To connect your Azure Data Lake to Segment, you must set up the following components in your Azure environment:

- [Azure Storage Account](/docs/connections/storage/catalog/data-lakes/#step-1---create-an-alds-enabled-storage-account): An Azure storage account contains all of your Azure Storage data objects, including blobs, file shares, queues, tables, and disks.
- [Azure KeyVault Instance](/docs/connections/storage/catalog/data-lakes/#step-2---set-up-key-vault): Azure KeyVault provides a secure store for your keys, secrets, and certificates.
- [Azure MySQL Database](/docs/connections/storage/catalog/data-lakes/#step-3---set-up-azure-mysql-database): The MySQL database is a relational database service based on the MySQL Community Edition, versions 5.6, 5.7, and 8.0.
- [Databricks Instance](/docs/connections/storage/catalog/data-lakes/#step-4---set-up-databricks): Azure Databricks is a data analytics cluster that offers multiple environments (Databricks SQL, Databricks Data Science and Engineering, and Databricks Machine Learning) for you to develop data-intensive applications. 
- [Databricks Cluster](/docs/connections/storage/catalog/data-lakes/#step-6---configure-databricks-cluster): The Databricks cluster is a cluster of computation resources that you can use to run data science and analytics workloads.
- [Service Principal](/docs/connections/storage/catalog/data-lakes/#step-5---set-up-a-service-principal): Service principals are identities used to access specific resources.

For more information about configuring Azure Data Lakes, see the [Data Lakes setup page](/docs/connections/storage/catalog/data-lakes/#set-up-azure-data-lakes).

## Data Lakes schema

Segment Data Lakes applies a standard schema to make the raw data easier and faster to query. Partitions are applied to the S3 data for granular access to subsets of the data, schema components such as data types are inferred, and a map of the underlying data structure is stored in a Glue Database.
<!--
TODO:
add schema overview (tables/columns generated)
-->

### Segment Data Lakes schema

#### S3 partition structure

Segment partitions the data in S3 by the Segment source, event type, then the day and hour an event was received by Segment, to ensure that the data is actionable and accessible.

The file path looks like:
`s3://<top-level-Segment-bucket>/data/<source-id>/segment_type=<event type>/day=<YYYY-MM-DD>/hr=<HH>`

Here are a few examples of what events look like:
`s3:YOUR_BUCKET/segment-data/data/SOURCE_ID/segment_type=identify/day=2020-05-11/hr=11/`
`s3:YOUR_BUCKET/segment-data/data/SOURCE_ID/segment_type=identify/day=2020-05-11/hr=12/`
`s3:YOUR_BUCKET/segment-data/data/SOURCE_ID/segment_type=identify/day=2020-05-11/hr=13/`

`s3:YOUR_BUCKET/segment-data/data/SOURCE_ID/segment_type=page_viewed/day=2020-05-11/hr=11/`
`s3:YOUR_BUCKET/segment-data/data/SOURCE_ID/segment_type=page_viewed/day=2020-05-11/hr=12/`
`s3:YOUR_BUCKET/segment-data/data/SOURCE_ID/segment_type=page_viewed/day=2020-05-11/hr=13/`

By default, the date partition structure is `day=<YYYY-MM-DD>/hr=<HH>` to give you granular access to the S3 data. You can change the partition structure during the [set up process](/docs/connections/storage/catalog/data-lakes/), where you can choose from the following options:
- Day/Hour [YYYY-MM-DD/HH] (Default)
- Year/Month/Day/Hour [YYYY/MM/DD/HH]
- Year/Month/Day [YYYY/MM/DD]
- Day [YYYY-MM-DD]

#### AWS Glue data catalog

Data Lakes stores the inferred schema and associated metadata of the S3 data in AWS Glue Data Catalog. This metadata includes the location of the S3 file, data converted into Parquet format, column names inferred from the Segment event, nested properties and traits which are now flattened, and the inferred data type.

![A screenshot of the AWS ios_prod_identify table, displaying the schema for the table, information about the table, and the table version](images/dl_gluecatalog.png)
<!--
TODO:
add annotated glue image calling out different parts of inferred schema
-->

New columns are appended to the end of the table in the Glue Data Catalog as they are detected.

##### Glue database

The schema inferred by Segment is stored in a Glue database within Glue Data Catalog. Segment stores the schema for each source in its own Glue database to organize the data so it is easier to query. To make it easier to find, Segment writes the schema to a Glue database named using the source slug by default. The database name can be modified from the Data Lakes settings.

> info ""
> The recommended IAM role permissions grant Segment access to create the Glue databases on your behalf. If you do not grant Segment these permissions, you must manually create the Glue databases for Segment to write to.

### Azure Data Lakes schema

Azure Data Lakes applies a consistent schema to make raw data accessible for queries. A transformer automatically calculates the desired schema and uploads a schema JSON file for each event type to your Azure Data Lake Storage (ADLS) in the `/staging/` directory. 

Segment partitions the data in ALDS by the Segment source, event type, then the day and hour an event was received by Segment, to ensure that the data is actionable and accessible.

The file path looks like this:
`<storage-account-name>/<container-name>/staging/<source-id>/`

### Data types

Data Lakes infers the data type for an event it receives. Groups of events are polled every hour to infer the data type for that each event.

The data types supported in Segment Data Lakes are:
- bigint
- boolean
- decimal(38,6)
- string
- timestamp

### Schema evolution

Once Data Lakes sets a data type for a column, all subsequent data will attempt to be cast into that data type. If incoming data does not match the data type, Data Lakes tries to cast the column to the target data type.

**Size mismatch**

If the data type in Glue is wider than the data type for a column in an on-going sync (for example, a decimal vs integer, or string vs integer), then the column is cast to the wider type in the Glue table. If the column is narrower (for example, integer in the table versus decimal in the data), the data might be dropped if it cannot be cast at all, or in the case of numbers, some data might lose precision. The original data in Segment remains in its original format, so you can fix the types and [replay](/docs/guides/what-is-replay/) to ensure no data is lost. Learn more about type casting by reading the [W3School's Java Type Casting](https://www.w3schools.com/java/java_type_casting.asp){:target="_blank"} page.

**Data mismatch**

If Data Lakes sees a bad data type, for example text in place of a number or an incorrectly formatted date, it attempts a best effort conversion to cast the field to the target data type. Fields that cannot be cast may be dropped. You can also correct the data type in the schema to the desired type and Replay to ensure no data is lost. [Contact Segment Support](https://segment.com/help/contact/){:target="_blank"} if you find a data type needs to be corrected.

### Data Lake deduplication

In addition to Segment's [99% guarantee of no duplicates](/docs/guides/duplicate-data/) for data within a 24 hour look-back window, Data Lakes have another layer of deduplication to ensure clean data in your Data Lake. Segment removes duplicate events at the time your Data Lake ingests data.  Data Lakes deduplicate any data synced within the last 7 days, based on the `messageId` field.

> note "Secondary deduplication is not supported during the Azure Data Lakes public beta"
> During the Azure Data Lakes public beta, Segment's guarantee of 99% no duplicates within the 24-hour look-back window applies, but secondary deduplication is not supported.

### Using a Data Lake with a Data Warehouse

The Data Lakes and Warehouses products are compatible using a mapping, but do not maintain exact parity with each other. This mapping helps you to identify and manage the differences between the two storage solutions, so you can easily understand how the data in each is related. You can [read more about the differences between Data Lakes and Warehouses](/docs/connections/storage/data-lakes/comparison/).

When you use Data Lakes, you can either use Data Lakes as your _only_ source of data and query all of your data directly from S3 or ADLS or you can use Data Lakes in addition to a data warehouse.

## FAQ

### What are some limitations of the Azure Data Lakes public beta?
The following capabilities are not supported during the Azure Data Lakes public beta:
  - EU region support
  - Deduplication
  - Sync History and Sync Health in Segment app


#### Can I send all of my Segment data into Data Lakes?
Data Lakes supports data from all event sources, including website libraries, mobile, server and event cloud sources. Data Lakes doesn't support loading [object cloud source data](/docs/connections/sources/#object-cloud-sources), as well as the users and accounts tables from event cloud sources.


### Are user deletions and suppression supported?
Segment doesn't support User deletions in Data Lakes, but supports [user suppression](/docs/privacy/user-deletion-and-suppression/#suppressed-users).


### How does Data Lakes handle schema evolution?
As the data schema evolves and new columns are added, Segment Data Lakes will detect any new columns. New columns will be appended to the end of the table in the Glue Data Catalog.


### How does Data Lakes work with Protocols?
Data Lakes doesn't have a direct integration with [Protocols](/docs/protocols/).

Any changes to events at the source level made with Protocols also change the data for all downstream destinations, including Data Lakes.

- **Mutated events** - If Protocols mutates an event due to a rule set in the Tracking Plan, then that mutation appears in Segment's internal archives and reflects in your data lake. For example, if you use Protocols to mutate the event `product_id` to be `productID`, then the event appears in both Data Lakes and Warehouses as `productID`.

- **Blocked events** - If a Protocols Tracking Plan blocks an event, the event isn't forwarded to any downstream Segment destinations, including Data Lakes. However events which are only marked with a violation _are_ passed to Data Lakes.

Data types and labels available in Protocols aren't supported by Data Lakes.

- **Data Types** - Data Lakes infers the data type for each event using its own schema inference systems instead of using a data type set for an event in Protocols. This might lead to the data type set in a data lake being different from the data type in the tracking plan. For example, if you set `product_id` to be an integer in the Protocols Tracking Plan, but the event is sent into Segment as a string, then Data Lakes may infer this data type as a string in the Glue Data Catalog.
- **Labels** - Labels set in Protocols aren't sent to Data Lakes.


### How frequently does my Data Lake sync?
Data Lakes offers 12 syncs in a 24 hour period and doesn't offer a custom sync schedule or selective sync.


### What is the cost to use AWS Glue?
You can find details on Amazon's [pricing for Glue](https://aws.amazon.com/glue/pricing/){:target="_blank"} page. For reference, Data Lakes creates 1 table per event type in your source, and adds 1 partition per hour to the event table.

### What is the cost to use Microsoft Azure?
You can find details on Microsoft's [pricing for Azure](https://azure.microsoft.com/en-us/pricing/){:target="_blank"} page. For reference, Data Lakes creates 1 table per event type in your source, and adds 1 partition per hour to the event table.


### What limits does AWS Glue have?
AWS Glue has limits across various factors, such as number of databases per account, tables per account, and so on. See the [full list of Glue limits](https://docs.aws.amazon.com/general/latest/gr/glue.html#limits_glue){:target="_blank"} for more information.

The most common limits to keep in mind are:
- Databases per account: 10,000
- Tables per database: 200,000
- Characters in a column name: 250

Segment stops creating new tables for the events after you exceed this limit. However you can contact your AWS account representative to increase these limits.

You should also read the [additional considerations in Amazon's documentation](https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-hive-metastore-glue.html){:target="_blank"} when using AWS Glue Data Catalog.

### What analytics tools are available to use with my Azure Data Lake?
Azure Data Lakes supports the following analytics tools:
  - PowerBI
  - Azure HDInsight
  - Azure Synapse Analytics
  - Databricks

