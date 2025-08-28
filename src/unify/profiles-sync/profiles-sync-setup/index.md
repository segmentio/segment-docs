---
title: Set up Profiles Sync
plan: unify
redirect_from:
  - '/unify/profiles-sync/'
---

On this page, you’ll learn how to set up Profiles Sync, turn on historical backfill, and adjust settings for warehouses connected to Profiles Sync.

## Set up Profiles Sync

> info "Identity Resolution setup"
> To use Profiles Sync, you must first set up [Identity Resolution](/docs/unify/identity-resolution/).

To set up Profiles Sync, first create a warehouse, then connect the warehouse in Segment.

Before you begin, prepare for setup with these tips:

- To connect your warehouse to Segment, you must have read and write permissions for the warehouse destination you choose.
- During Step 2 of setup, you’ll copy credentials between Segment and your warehouse destination. To streamline the process, open your Segment workspace in one browser tab and your warehouse account in another.
- Make sure to copy any IP addresses Segment asks you to allowlist in your warehouse destination.

### Step 1: Select a warehouse 

You’ll first choose the destination warehouse to which Segment will sync profiles. Profiles Sync supports the Snowflake, Redshift, BigQuery, Azure, Postgres, and Databricks warehouse Destinations. Your initial setup will depend on the warehouse you choose.

The following table shows the supported Profiles Sync warehouse destinations and the corresponding required steps for each. Select a warehouse, view its Segment documentation, then carry out the warehouse’s required steps before moving to step 2 of Profiles Sync setup:

| Warehouse Destination      | Required steps    
| -------------- | ----------- |
| [Snowflake](/docs/connections/storage/catalog/snowflake/#getting-started) | Follow the steps in [Snowflake Getting Started](/docs/connections/storage/catalog/snowflake/#getting-started). |
| [Redshift](/docs/connections/storage/catalog/redshift/#getting-started)   | Follow the steps in [Redshift Getting Started](/docs/connections/storage/catalog/redshift/#getting-started). |
| [BigQuery](/docs/connections/storage/catalog/bigquery/) |                  Follow the steps in [BigQuery Getting Started](/docs/connections/storage/catalog/bigquery/#getting-started).
| [Azure](/docs/connections/storage/catalog/azuresqldw/)                    | Follow the steps in [Azure Synapse Analytics Getting Started](/docs/connections/storage/catalog/azuresqldw/#getting-started).  |
| [Postgres](/docs/connections/storage/catalog/postgres/)                   | Follow the steps in [Postgres Getting Started](/docs/connections/storage/catalog/postgres/).                                                      |
| [Databricks](/docs/unify/profiles-sync/profiles-sync-setup/databricks-profiles-sync/)  | Follow the steps in the [Databricks Getting Started](/docs/unify/profiles-sync/profiles-sync-setup/databricks-profiles-sync/#getting-started).                   |

After you’ve finished the required steps for your chosen warehouse, you’re ready to connect your warehouse to Segment. Because you’ll next enter credentials from the warehouse you just created, **leave the warehouse tab open to streamline setup.**

#### Profiles Sync permissions

To allow Segment to write to the warehouse you're using for Profiles Sync, you'll need to set up specific permissions.

For example, if you're using BigQuery, you must [create a service account](/docs/connections/storage/catalog/bigquery/#create-a-service-account-for-segment) for Segment and assign the following roles:
- `BigQuery Data Owner`
- `BigQuery Job User`

Review the required steps for each warehouse in the table above to see which permissions you'll need.

#### Profiles Sync roles

The following Segment access [roles](/docs/segment-app/iam/roles/) apply to Profiles Sync:

**Unify and Engage read-only**: Read-only access to Profiles Sync, including the sync history and configuration settings. With these roles assigned, you can't download PII or edit Profiles Sync settings.

**Unify read-only and Engage user**: Read-only access to Profiles Sync, including the sync history and configuration settings. With these roles assigned, you can't download PII or edit Profiles Sync settings.

**Unify and Engage Admin access**: Full edit access to Profiles Sync, including the sync history and configuration settings.


### Step 2: Connect the warehouse and enable Profiles Sync

After selecting your warehouse, you can connect it to Segment.

During this step, you’ll copy credentials from the warehouse you just set up and enter them into the Segment app. The specific credentials you’ll enter depend on the warehouse you chose during step 1.

Segment may also display IP addresses you’ll need to allowlist in your warehouse. Make sure to copy the IP addresses and enter them into your warehouse account.

To connect your warehouse:

1. Configure your database. 
- Be sure to log in with a user who has read and write permissions so that Segment can write to your database.
- Segment shows an IP address to allowlist.  Copy it to your warehouse destination.
2. Enter a schema name to help you identify this space in the warehouse, or use the default name provided. 
- The schema name can't be changed after the warehouse is connected.
4. Enter your warehouse credentials, then select **Test Connection**.
5. If the connection test succeeds, Segment enables the **Next** button. Select it.
  * If the connection test fails, verify that you’ve correctly entered the warehouse credentials, then try again.


### Step 3: Set up Selective Sync

Set up Selective Sync to control the exact tables and columns that Segment will sync to your connected data warehouse.

> info ""
> Data will be backfilled to your warehouse based on the last two months of history.

You can sync the following tables:

| Type                                                   | Tables                 | Backfill |
| ------------------------------------------------------------------------- | ---------------------------------------------------- | --------------- |
| [Profile raw tables](/docs/unify/profiles-sync/tables/#profile-raw-tables) | - `external_id_mapping_updates` <br> - `id_graph_updates` <br> - `profile_traits_updates` | Complete |
| [Profile materialized tables](/docs/unify/profiles-sync/tables/#tables-segment-materializes) | - `user_identifier` <br> - `user_traits` <br> - `profile_merges`     | Complete |
| [Event type tables](/docs/unify/profiles-sync/tables/#event-type-tables)          |  - `Identify` <br> - `Page` <br> - `Group` <br> - `Screen` <br> - `Alias` <br> - `Track`     | 2 months |
| [Track event tables](/docs/unify/profiles-sync/tables/#track-event-tables)         |   To view and select individual track tables, don't sync track tables during the initial setup. Edit your sync settings after enabling Profiles Sync and waiting for the first sync to complete.                   | 2 months |

#### Using Selective Sync

Use Selective Sync to manage the data you send to your warehouses by choosing which tables and columns (also known as properties) to sync. Syncing fewer tables and properties will lead to faster and more frequent syncs, faster queries, and using less disk space.

You can access Selective Sync in two ways:
- From the Set Selective Sync page as you connect your warehouse to Profiles Sync.
- From the Profiles Sync settings (**Profiles Sync** > **Settings** > **Selective sync**).

You'll see a list of event type tables, event tables, and [tables Segment materializes](/docs/unify/profiles-sync/tables/#tables-segment-materializes) available to sync. Select the tables and properties that you'd like to sync, and be sure the ones you'd like to prevent from syncing aren't selected. 

Regardless of schema size, only the first 5,000 collections and 5,000 properties per collection can be managed using your Segment space. To edit Selective Sync settings for any collection which exceeds this limit, [contact Segment support](https://app.segment.com/workspaces?contact=1){:target="blank"}.

> info ""
> You must be a workspace owner to change Selective Sync settings.

#### When to use Selective Sync

Use Selective Sync when you want to prevent specific tables and properties from syncing to your warehouse. Segment stops syncing from disabled tables or properties, but will not delete any historical data from your warehouse.

If you choose to re-enable a table or property to sync again, only new data generated will sync to your warehouse. Segment doesn't backfill data that was omitted with Selective Sync.

#### Using historical backfill

Profiles Sync sends profiles to your warehouse hourly once setup completes. Setup is complete after an initial automated backfill syncs all profile data. To initiate the backfill, the Profiles Sync requires live data flowing into your workspace. If live data isn’t available, you can send test data to trigger the backfill sooner. Backfill can also sync historical profiles to your warehouse.

> info ""
> You can only use historical backfill for tables that you enable with [Selective Sync](#using-selective-sync) during setup. Segment does not backfill tables that you disable with Selective Sync.

When Segment runs historical backfills:

- Profile raw and materialized tables sync your entire historical data to your warehouse.
- Profiles Sync gathers the last two months of all events for Event type and Track event tables and syncs them to your warehouse.

Segment lands the data on an internal staging location, then removes the backfill banner. Segment then syncs the backfill data to your warehouse.

Reach out to [Segment support](https://app.segment.com/workspaces?contact=1){:target="blank"} if your use case exceeds the scope of the initial setup backfill.

> success ""
> While historical backfill is running, you can start building [materialized views](/docs/unify/profiles-sync/tables/#tables-you-materialize) and running [sample queries](/docs/unify/profiles-sync/sample-queries).   


### Step 4 (Optional): Materialize key views using a SQL automation tool

During setup, you have the option of setting up materialized key views in one of two ways:

1. You can choose to materialize views on your own by using `profiles raw tables`. 
You may want to materialize your own tables if, for example, you want to transform additional data or join Segment profile data with external data before materialization.

2. You can choose to use Segment's open source dbt models by using `profiles materialized` tables.
 
> success ""
> You can alternatively use [tables that Segment materializes](/docs/unify/profiles-sync/tables/#tables-segment-materializes) and syncs to your data warehouse. 

To start seeing unified profiles in your warehouse and build attribution models, you'll need to materialize the tables that Profiles Sync lands into three key views:

  * `id_graph`: the current state of relationships between segment ids
  * `external_id_mapping`: the current-state mapping between each external identifier you’ve observed and its corresponding, fully-merged `canonical_segment_id`
  * `profile_traits`: the last seen value for all custom traits, computed traits, SQL traits, audiences, and journeys associated with a profile in a single row

See [Tables you materialize](/docs/unify/profiles-sync/tables/#tables-you-materialize) for more on how to materialize these views either on your own, or with [Segment's open source dbt models](https://github.com/segmentio/profiles-sync-dbt){:target="blank"}.

> warning ""
> Note that dbt models are in beta and need modifications to run efficiently on BigQuery, Synapse, and Postgres warehouses. Segment is actively working on this feature.

## Profiles Sync limits

As you use Profiles Sync, keep the following limits in mind:

- For event tables, Segment can only backfill up to 2,000 tables for each workspace.
- Segment can only initiate backfills after a successful sync with > 0 rows.
- For every sync, the total dataset Segment can sync is limited to 20TB.


## Working with synced warehouses

<!-- add transition line here -->

### Monitor Profiles Sync

You can view warehouse sync information in the overview section of the Profiles Sync page. Segment displays the dates and times of the last and next syncs, as well as your sync frequency.

In the Syncs table, you’ll find reports on individual syncs. Segment lists your most recent syncs first. The following table shows the information Segment tracks for each sync:

| DATA TYPE   | DEFINITION                                                                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sync status | - `Success`, which indicates that all rows synced correctly <br> - `Partial success`, indicating that some rows synced correctly <br> - `Failed`, indicating that no rows synced correctly |
| Duration    | Length of sync time, in minutes                                                                                                                                                             |
| Start time  | The date and time when the sync began                                                                                                                                                       |
| Synced rows | The number of rows synced to the warehouse                                                                                                                                                  |

Selecting a row from the Syncs table opens a pane that contains granular sync information. In this view, you’ll see the sync’s status, duration, and start time. Segment also displays a nuanced breakdown of the total rows synced, sorting them into identity graph tables, event type tables, and event tables.

If the sync failed, Segment shows any available error messages in the sync report.

### Settings and maintenance

The **Settings** tab of the Profiles Sync page contains tools that can help you monitor and maintain your synced warehouse.

#### Disable or delete a warehouse

In the **Basic settings** tab, you can disable warehouse syncs or delete your connected warehouse altogether.

To disable syncs, toggle **Sync status** to off. Segment retains your warehouse credentials but stops further syncs. Toggle Sync status back on at any point to continue syncs.

To delete your warehouse, toggle **Sync status** to off, then select **Delete warehouse**. Segment doesn’t retain credentials for deleted warehouses; to reconnect a deleted warehouse, you must set it up as a new warehouse.

#### Connection settings

In the **Connection settings** tab, you can verify your synced warehouse’s credentials and view IP addresses you’ll need to allowlist so that Segment can successfully sync profiles.

If you have write access, you can verify that your warehouse is successfully connected to Segment by entering your password and then selecting **Test Connection**.

> info "Changing your synced warehouse"
> If you’d like to change the warehouse connected to Profiles Sync, [reach out to Segment support](https://segment.com/help/contact/){:target="blank"}.

#### Sync schedule

Segment supports hourly syncs.
