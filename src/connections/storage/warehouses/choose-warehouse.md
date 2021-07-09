---
title: Choosing a Warehouse
redirect_from: '/connections/warehouses/choose-warehouse/'
---

## Comparing Redshift and Postgres

In most cases, you will get a much better price-to-performance ratio with Redshift for typical analyses.

Redshift lacks some [features](http://docs.aws.amazon.com/redshift/latest/dg/c_unsupported-postgresql-features.html), [datatypes](http://docs.aws.amazon.com/redshift/latest/dg/c_unsupported-postgresql-datatypes.html), and [functions](http://docs.aws.amazon.com/redshift/latest/dg/c_unsupported-postgresql-functions.html) supported by Postgres and also implements [some features](http://docs.aws.amazon.com/redshift/latest/dg/c_redshift-sql-implementated-differently.html) differently. If you need any of the features or functions missing in Redshift and BigQuery, choose Postgres. If not (or you're not sure), Segment recommends choosing Redshift.

If you'd like more information, Amazon wrote [about this in their documentation](http://docs.aws.amazon.com/redshift/latest/dg/c_redshift-and-postgres-sql.html).

## Comparing Redshift and BigQuery

Both Redshift and BigQuery are attractive cloud-hosted, affordable, and performant analytical databases. The differences between the two are around their architecture and pricing.

## Architecture

When you provision a Redshift cluster, you're renting a server from Amazon Web Services. Your cluster consists of [nodes](http://docs.aws.amazon.com/redshift/latest/dg/c_high_level_system_architecture.html), each with dedicated memory, CPU, and disk storage. These nodes handle data storage, query execution, and - if your cluster contains multiple nodes - a leader node will handle coordination across the cluster.

Redshift performance and storage capacity is a function of cluster size and cluster type. As your storage or performance requirements change, you can scale up or down your cluster as needed.

With BigQuery, you're not constrained by the storage capacity or compute resources of a given cluster. Instead, you can load large amounts of data into BigQuery without running out of memory, and execute complex queries without maxing out CPU.

This is possible because BigQuery takes advantage of distributed storage and networking to separate data storage from compute power. Google's[Colossus distributed file system](https://cloud.google.com/blog/big-data/2016/01/bigquery-under-the-hood) distributes data across many servers in the Google cloud. When you execute a query, the [Dremel query engine](https://cloud.google.com/blog/big-data/2016/01/bigquery-under-the-hood) splits the query into smaller sub-tasks, distributes the sub-tasks to computers across Google data centers, and then re-assembles them into your results.

## Pricing

The difference in architecture translates into differences in pricing.

[Redshift prices](https://aws.amazon.com/redshift/pricing/) are based on an hourly rate determined by the number and types of nodes in your cluster. They offer dense storage - optimized for storage - and dense compute nodes - optimized for query performance.

BigQuery has two [pricing options](https://cloud.google.com/bigquery/pricing): variable and fixed pricing. With the variable, pay-as-you-go plan, you pay for the data you load into BigQuery, and then pay for the amount of data you query. BigQuery allows you to set up [Cost Controls and Alerts](https://cloud.google.com/bigquery/cost-controls) to help control and monitor costs.

Fixed-price plans are more for high-volume customers and allow you to rent a fixed amount of compute power.

## Resource Management

Redshift does require you to create a cluster, choose sort and distribution keys, and resize your cluster as storage and performance needs change over time.

BigQuery is "fully-managed", which means that you'll never have to resize or adjust distribution or sort keys. BigQuery handles all of that.
