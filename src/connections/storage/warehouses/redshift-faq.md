---
title: Redshift cluster and Redshift connector limitations
redirect_from: '/connections/warehouses/redshift-faq/'
---

> "Are there limitations of Redshift clusters and our Redshift connector?"

While Redshift clusters are incredibly scalable and efficient, limitations are imposed to ensure that clusters maintain performance.

## Reserved words

Redshift does not allow you to create tables or columns using reserved words. To avoid naming convention issues, we prepend a `_` to any reserved word names. If you're having trouble finding a column or table, you can check the list of [Redshift reserved words](http://docs.aws.amazon.com/redshift/latest/dg/r_pg_keywords.html) or search for the table with a prepended underscore like `_open`.

## Table count limitations

Redshift sets the maximum number of tables you can create in a cluster to 9,900 including temporary tables. While it's rare to reach that limit, we recommend keeping an eye on the number of tables our warehouse connector is creating in your cluster. Keep in mind that a new table is created for each unique event you send to Segment, which becomes an issue if events are being dynamically generated.

## Cluster node limitations

When setting up your Redshift cluster, you can select between dense storage (ds2) and dense compute (dc1) cluster types. Dense compute nodes are SSD based which allocates only 200GB per node, but results in faster queries. Dense storage nodes are hard disk based which allocates 2TB of space per node, but result in slower queries. When scaling up your cluster by adding nodes, it's important to remember that adding more nodes will not add space linearly. As you add more dc1 nodes, the amount of preallocated space for each table increases. For example, if you have a table with 10 columns, Redshift will preallocate 20mb of space (10 columns X 2 slices) per node. That means that the same table will preallocate 20mb of space in a single ds2 cluster, and 200mb in a 10 node dc1 cluster.

## Column type changes

Like with most data warehouses, column data types (string, integer, float, etc.) must be defined at the time the column is created. Unlike most data warehouses, Redshift does not allow for easy column type changes after the column has been created. Additionally, we store a record of what the tables and column types should be set to in a local database, and validate the structure on each connector run. Currently, column type changes (i.e. change an integer column to float) are only available to our business tier customers on an ad-hoc basis.

## VARCHAR size limits

All Segment-managed schemas have a default VARCHAR size of 512 in order to keep performance high. If you wish to increase the VARCHAR size, you can run the following query.

```sql
  ALTER TABLE table_name ALTER COLUMN column_name column_type;
```

Example:
```sql
  ALTER TABLE segment_prod.identifies ALTER COLUMN account_id TYPE VARCHAR(1024);
```
> warning ""
> Increasing the default size can impact query performance as it needs to process more data to accomodate the increased column size. See [Amazon's Redshift Documentation](https://docs.aws.amazon.com/redshift/latest/dg/c_best-practices-smallest-column-size.html) for more details.

## Blocklisted track call properties

While almost all event properties are valid, we are unable to pass through properties that have naming conflicts with the default key/value pairs included in a standard raw JSON call. For example, if you send through a property in a track call named "timestamp" or "event", it will cause a conflict and you likely wont see it appear in your warehouse. To be more specific, if you send the following track call, {'event':'birthday'} will likely be dropped when syncing the data to your data warehouse.

`analytics.track('selected gift', {'event':'birthday', 'type':'cake'})`
