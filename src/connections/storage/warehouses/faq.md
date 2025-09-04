---
title: Warehouse FAQs
redirect_from: '/connections/warehouses/faq/'
---

## Can I control what data is sent to my warehouse?

Yes. Customers on Segment's [Business plan](https://segment.com/pricing) can choose which sources, collections, and properties sync to your data warehouse using [Warehouse Selective Sync](/docs/connections/storage/warehouses/warehouse-syncs/#warehouse-selective-sync).

Selective Sync helps manage the data Segment sends to each warehouse, allowing you to sync different sets of data from the same source to different warehouses.

When you disable a source, Segment no longer syncs data from that source. The historical data from the source remains in your warehouse, even after you disable a source. When you re-enable a source, Segment automatically syncs all events since the last successful data warehouse sync.

When you disable and then re-enable a collection or a property, Segment doesn't automatically backfill the events since the last successful sync. The only data in the first sync following the re-enabling of a collection or property is any data generated after you re-enabled the collection or property. To recover any data generated while a collection or property was disabled, please reach out to [friends@segment.com](mailto:friends@segment.com).

You can also use the [Integration Object](/docs/guides/filtering-data/#filtering-with-the-integrations-object) to control whether or not data is sent to a specific warehouse.

### Code to not send data to any warehouse

```js
integrations: {
 All: true,
 Warehouses: {
    all: false
 }
}
```

### Code to send data to all warehouses

```js
integrations: {
 All: false,
 Warehouses: {
    all: true,
 }
}
```

### Code to send data to specific warehouses

```js
integrations: {
 All: false,
 Warehouses: {
    warehouseIds: ["<id1>", "<id2>"]
 }
}
```

## Can I add, tweak, or delete some of the tables?

You have full admin access to your Segment warehouse. However, don't tweak or delete Segment generated tables, as this may cause problems for the systems that upload new data.

If you want to join across additional datasets, feel free to create and upload additional tables.

## Can I transform or clean up old data to new formats or specs?

This is a common question if the data you're collecting has evolved over time. For example, if you used to track the event `Signup` but now track `Signed Up`, you'd probably like to merge those two tables to make querying simple and understandable.

Segment doesn't have a way to update the event data in the context of your warehouse to retroactively merge the tables created from changed events. Instead, you can create a *materialized* view of the unioned events. This is supported in [Redshift](https://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_VIEW.html){:target="_blank”}, [Postgres](https://www.postgresql.org/docs/9.3/rules-materializedviews.html){:target="_blank”}, [Snowflake](https://docs.snowflake.net/manuals/sql-reference/sql/create-view.html){:target="_blank”}, and others, but may not be available in _all_ warehouses.

Protocols customers can also use [Transformations](/docs/protocols/transform/) to change events at the source, which applies to all cloud-mode destinations (destinations that receive data from the Segment servers) _including_ your data warehouse. Protocols Transformations offer an excellent way to quickly resolve implementation mistakes and help transition events to a Segment spec.

> **Note**: Transformations are currently limited to event, property and trait name changes, and **don't** apply to historical data.

## Can I change the data type of a column in the warehouse?

Yes. Data types are initially set up in your warehouse based on the first value that comes in from a source, but you can request data type changes by reaching out to [Segment support](https://app.segment.com/workspaces?contact=1){:target="_blank”} for assistance.

Keep in mind that Segment only uses [general data types](/docs/connections/storage/warehouses/schema/#schema-evolution-and-compatibility){:target="_blank”} when loading data in your warehouse. Therefore, some of the common scenarios are changing the data type from:
- `timestamp` to `varchar` 
- `integer` to `float`
- `boolean` to `varchar`

More granular changes (such as the examples below) wouldn’t normally be handled by the Support team, thus they often need to be made within the warehouse itself:
- Expanding data type `varchar(256)` to `varchar(2048)`
- Updating data type `integer` to `bigint`
- Updating data type `float` to `float8`



## Can the data type definitions in Protocols be enforced in a warehouse schema?

The data type definitions in Protocols have no impact on the warehouse schema. 

## How do I find my source slug?

Your source slug can be found in the URL when you're looking at the source destinations page or live debugger. The URL structure will look like this:

`https://segment.com/[my-workspace]/sources/[my-source-slug]/overview`


## How do I find my warehouse ID?

Your warehouse ID appears in the URL when you look at the [warehouse destinations page](https://app.segment.com/goto-my-workspace/warehouses/). The URL structure looks like this:

`app.segment.com/[my-workspace]/warehouses/[my-warehouse-id]/overview`


## How fresh is the data in the Segment warehouses?

Data is available in warehouses within 24-48 hours, depending on your tier's sync frequency. For more information about sync frequency by tier, see [Sync Frequency](/docs/connections/storage/warehouses/warehouse-syncs/#sync-frequency).

Real-time loading of the data into Segment Warehouses would cause significant performance degradation at query time. To optimize for your query speed, reliability, and robustness, Segment guarantees that your data will be available in your warehouse within 24 hours. The underlying datastore has a subtle tradeoff between data freshness, robustness, and query speed. For the best experience, Segment needs to balance all three of these.

## What if I want to add custom data to my warehouse?

You can freely load data into your Segment warehouse to join against your source data tables.

The only restriction when loading your own data into your connected warehouse is that you should not add or remove tables within schemas generated by Segment for your sources. Those tables have a naming scheme of `<source-slug>.<table>` and should only be modified by Segment. Deleting columns from these tables may result in mismatches upon load.

If you want to insert custom data into your warehouse, create new schemas that are not associated with an existing source, since these may be deleted upon a reload of the Segment data in the cluster.

Segment recommends scripting any sort of additions of data you might have to your warehouse, so that you aren't doing one-off tasks that can be hard to recover from in the future in the case of hardware failure.

## Which IPs should I allowlist?

Segment recommends enabling IP allowlists for added security. All Segment users with workspaces hosted in the US who use allowlists in their warehouses must update those allowlists to include the following ranges:
* `52.25.130.38/32`
* `34.223.203.0/28`

Users with workspaces in the EU must allowlist `3.251.148.96/29`.


## Will Segment sync my historical data?

Segment loads up to 2 months of your historical data when you connect a warehouse.

For full historical backfills you'll need to be a Segment Business plan customer. If you'd like to learn more about our Business plan and all the features that come with it, [check out Segment's pricing page](https://segment.com/pricing).

## What do you recommend for Postgres: Amazon or Heroku?

Heroku's simple setup and administration process make it a great option to get up and running quickly.

Amazon's service has some more powerful features and will be more cost-effective for most cases. However, first time users of Amazon Web Services (AWS) will likely need to spend some time with the documentation to get set up properly.

## How do I prevent a source from syncing to some or all warehouses?

When you create a new source, the source syncs to all warehouses in the workspace by default. You can prevent the source from syncing to some or all warehouses in the workspace in 2 ways:

- **Segment app**: When you add a source from the Workspace Overview page, deselect the warehouse(s) you don't want the source to sync to as part of the *Add Source* process. All warehouses are automatically selected by default.
- **Public API**: Send a request to the [Update Warehouse](https://docs.segmentapis.com/tag/Warehouses#operation/updateWarehouse){:target="_blank”} endpoint to update the settings for the warehouse(s) you want to prevent from syncing.

After a source is created, you can enable or disable a warehouse sync within the Warehouse Settings page.

## Can I be notified when warehouse syncs fail?

If you enabled activity notifications for your storage destination, you'll receive notifications in the Segment app for the 5th and 20th consecutive warehouse failures for all incoming data. Segment doesn't track failures on a per connection (`source<>warehouse`) basis. Segment's notification structure also identifies global issues encountered when connecting to your warehouse, like bad credentials or being completely inaccessible to Segment.

To sign up for warehouse sync notifications:
1. Open the Segment app.
2. Go to **Settings > User Preferences**.
3. In the **Activity Notifications** section, select **Storage Destinations**.
4. Enable **Storage Destination Sync Failed**.

## How is the data formatted in my warehouse?

Data in your warehouse is formatted into **schemas**, which involve a detailed description of database elements (such as tables, views, indexes, synonyms)
and the relationships that exist between elements. Segment's schemas use the following template: <br/>`<source>.<collection>.<property>`, for example,
`segment_engineering.tracks.user_id`, where source refers to the source or project name (`segment_engineering`), collection refers to the event (`tracks`),
and the property refers to the data being collected (`user_id`). **Note**: It's not possible to have different sources feed data into the same schema in your warehouse. While setting up a new schema, you can't use a duplicate schema name. 

Schema data for Segment warehouses is represented in snake case.

For more information about Warehouse Schemas, see the [Warehouse Schemas](/docs/connections/storage/warehouses/schema) page.

## If my syncs fail and get fixed, do I need to ask for a backfill?

If your syncs fail, you do not need to reach out to Segment Support to request a backfill. Once a successful sync takes place,
Segment automatically loads all of the data generated since the last successful sync occurred.


## Can I change my schema names once they've been created?

Segment stores the name of your schema in the **SQL Settings** page. Changing the name of your schema in the app without updating the name in your data warehouse causes a new schema to form, one that doesn't contain historical data.

To change the name of your schema without disruptions:

1. Open the Segment app, select **Connections** and click **Destinations**.
2. Select the warehouse you'd like to rename the schema for from the list of destinations.
3. On the overview page for your source, select **Settings**.
4. Disable the **Sync Data** toggle and click **Save Settings**.
5. Select **Connections** and click **Sources**.
6. Select a source that syncs data with your warehouse from your list of sources, and select **Settings**.
7. Select **SQL Settings** and update the **Schema Name** field with the new name for your schema and click **Save Changes**.
> **Note**: This sets the schema name for all existing and future destinations. The new name must be lowercase and may include underscores. 
8. Repeat steps 6 and 7 until you rename all sources that sync data to your warehouse.
9. Open the third-party host of your database, and rename the schema.
10. Open the Segment app, select **Connections** and click **Destinations**.
11. Select the warehouse you disabled syncs for from the list of destinations.
12. On the overview page for your source, select **Settings**.
13. Enable the **Sync Data** toggle and click **Save Settings**.

## Can I selectively filter data/events sent to my warehouse based on a property?

At the moment, there isn't a way to selectively filter events that are sent to the warehouse. The warehouse connector works  differently from the streaming destinations and only has the [selective sync](/docs/connections/storage/warehouses/warehouse-syncs/#warehouse-selective-sync) functionality that allows you to enable or disable specific properties or events.

## Can data from multiple sources be synced to the same database schema?
It's not possible for different sources to sync data directly to the same schema in your warehouse. When setting up a new schema within the Segment UI, you can't use a schema name that's already in use by another source. Segment recommends syncing the data separately and then joining it downstream in your warehouse. 

For more information about Warehouse Schemas, see the [Warehouse Schemas](/docs/connections/storage/warehouses/schema) page.
