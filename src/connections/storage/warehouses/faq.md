---
title: Warehouse FAQs
redirect_from: '/connections/warehouses/faq/'
---

## Can I control what data is sent to my warehouse?

Yes! For those of you who are on our [Business plan](https://segment.com/pricing), you can choose which sources, collections, and properties sync to your data warehouse.

Selective Sync will help manage what data is sent to each individual warehouse, allowing you to sync different sets of data from the same source to different warehouses. Check out more information on how to use Selective Sync [here](https://segment.com/docs/guides/filtering-data/#warehouse-selective-sync).

Once a source, collection or property is disabled, we no longer sync data from that source. We will not, however, delete any historical data from your warehouse. When a source is re-enabled, we will sync all events since the last sync. Note: This does not apply when a collection or property is re-enabled - Only new data generated after re-enabling a collection or property will sync to your warehouse.

For Self-Serve and free customers, we do not currently support the ability to select which collections or properties sync to your warehouse.


## Can we add, tweak, or delete some of the tables?

You have full admin access to your Segment Warehouse. However, don't tweak or delete Segment generated tables, as this may cause problems for our systems that upload new data.

If you want to join across additional datasets, feel free to create and upload additional tables.

## Can we transform or clean up old data to new formats or specs?

This is a common question if the data you're collecting has evolved over time. For example, if you used to track the event `Signup` but now track `Signed Up`, you'd probably like to merge those two tables to make querying simple and understandable.

Segment does not have a way to update the event data in the context of your warehouse to retroactively merge the tables created from changed events. Instead, you can create a "materialized" view of the unioned events. This is supported in [Redshift](https://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_VIEW.html), [Postgres](https://www.postgresql.org/docs/9.3/rules-materializedviews.html), [Snowflake](https://docs.snowflake.net/manuals/sql-reference/sql/create-view.html), and others, but may not be available in _all_ warehouses.

Protocols customers can also use [Transformations](/docs/protocols/transform/) to change events at the source, which applies to all cloud-mode destinations (destinations that receive data from the Segment servers) _including_ your data warehouse. Protocols Transformations offer an excellent way to quickly resolve implementation mistakes and help transition events to a Segment spec.

> **Note**: Transformations are currently limited to event, property and trait name changes, and do **not** apply to historical data.


## How do I find my source slug?

Your source slug can be found in the URL when you're looking at the source destinations page or live debugger. The URL structure will look like this:

`https://segment.com/[my-workspace]/sources/[my-source-slug]/overview`


## How do I find my warehouse id?

Your warehouse id appears in the URL when you look at the [warehouse destinations page](https://app.segment.com/goto-my-workspace/warehouses/). The URL structure looks like this:

​​`app.segment.com/[my-workspace]/warehouses/[my-warehouse-id]/overview`


## How fresh is the data in Segment Warehouses?

Your data will be available in Warehouses within 24-48 hours. The underlying Redshift datastore has a subtle tradeoff between data freshness, robustness, and query speed. For the best experience we need to balance all three of these.

Real-time loading of the data into Segment Warehouses would cause significant performance degradation at query time because of the way Redshift uses large batches to optimize and compress columns. To optimize for your query speed, reliability, and robustness, our guarantee is that your data will be available in Redshift within 24 hours.

As we improve and update our ETL processes and optimize for SQL query performance downstream, the actual load time will vary, but we'll ensure it's always within 24 hours.

You can use the Sync History page to see the status and history of data updates in your warehouse. The Sync History page is available for every source connected to each warehouse. This page helps you answer questions like, "has the data from a specific source been updated recently?" "Did a sync completely fail, or only partially fail?" and "Why wasn't this sync successful?"

The Sync History includes the following information:
- **Sync Status**: The possible statuses are:
  - _Success_: Sync run completed without any notices and all rows synced, OR no rows synced because no data was found.
  - _Partial_: Sync run completed with some notices and some rows synced.
  - _Failure_: Sync run with some notices and no rows synced.
- **Start Time**: The time at which the sync began. Shown in your local timezone.
- **Duration**: Length of time this sync took.
- **Synced Rows**: Number of rows successfully synced from the sync run.
- **Notices**: A list of errors or warnings found, which could indicate problems with the sync run. Click a notice message to show details about the result, and any errors or warnings for each collection included in the sync run.

> info ""
> If a sync run shows a partial success or failure, the next sync attempts to syncing any data which was not successfully synced in the prior run.


## What if I want to add custom data to my warehouse?

You can freely load data into your Segment Warehouse to join against your source data tables.

The only restriction when loading your own data into your connected warehouse is that you should not add or remove tables within schemas generated by Segment for your sources. Those tables have a naming scheme of `<source-slug>.<table>` and should only be modified by Segment. Arbitrarily deleting columns from these tables may result in mismatches upon load.

If you want to insert custom data into your warehouse, create new schemas that are not associated with an existing source, since these may be deleted upon a reload of the Segment data in the cluster.

We highly recommend scripting any sort of additions of data you might have to warehouse, so that you aren't doing one-off tasks that can be hard to recover from in the future in the case of hardware failure.

## Which IPs should I whitelist?

You can whitelist our custom IP 52.25.130.38/32 while authorizing Segment to write in to your Redshift or Postgres port.

BigQuery does not require whitelisting an IP address. To learn how to set up BigQuery, check out our [set up guide](https://segment.com/docs/connections/storage/catalog/bigquery/#getting-started)


## Will Segment sync my historical data?

We will automatically load up to 2 months of your historical data when you connect a warehouse.

For full historical backfills you'll need to be a Segment Business plan customer. If you'd like to learn more about our Business plan and all the features that come with it, [check out our pricing page](https://segment.com/pricing).

## What do you recommend for Postgres: Amazon or Heroku?

Heroku's simple set up and administration process make it a great option to get up and running quickly.

Amazon's service has some more powerful features and will be more cost-effective for most cases. However, first time users of Amazon Web Services (AWS) will likely need to spend some time with the documentation to get set up properly.

## How do I prevent a source from syncing to some or all warehouses?

When you create a new source, the source syncs to all warehouse(s) in the workspace by default. You can prevent the source from syncing to some or all warehouses in the workspace in two ways:

- **Segment app**: When you add a source from the Workspace Overview page, deselect the warehouse(s) you don't want the source to sync to as part of the "Add Source" process. All warehouses are automatically selected by default.
- **Config API**: Send a [PATCH Connected Warehouse request](https://reference.segmentapis.com/?version=latest#ec12dae0-1a3e-4bd0-bf1c-840f43537ee2) to update the settings for the warehouse(s) you want to prevent from syncing.

After a source is created, you can enable or disable a warehouse sync within the Warehouse Settings page.
