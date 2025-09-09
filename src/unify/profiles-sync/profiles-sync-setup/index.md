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
- During Step 2 of the setup process, you’ll copy credentials between Segment and your warehouse destination. To streamline the process, open your Segment workspace in one browser tab and your warehouse account in another.
- Make sure to copy any IP addresses Segment asks you to allowlist in your warehouse destination.

### Step 1: Select a warehouse 

Choose the warehouse where Segment will sync profiles. Profiles Sync supports Snowflake, Redshift, BigQuery, Azure, Postgres, and Databricks. Your initial depends on the warehouse you choose.

The following table shows the supported Profiles Sync warehouse destinations and their setup instructions. Select a warehouse, view its Segment documentation, and complete the required steps before moving to Step 2 of Profiles Sync setup:

| Warehouse Destination                                                                 | Required steps                                                                                                             |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [Snowflake](/docs/connections/storage/catalog/snowflake/#getting-started)             | See [Snowflake Getting Started](/docs/connections/storage/catalog/snowflake/#getting-started).                             |
| [Redshift](/docs/connections/storage/catalog/redshift/#getting-started)               | See [Redshift Getting Started](/docs/connections/storage/catalog/redshift/#getting-started).                               |
| [BigQuery](/docs/connections/storage/catalog/bigquery/)                               | See [BigQuery Getting Started](/docs/connections/storage/catalog/bigquery/#getting-started).                               |
| [Azure](/docs/connections/storage/catalog/azuresqldw/)                                | See [Azure Synapse Analytics Getting Started](/docs/connections/storage/catalog/azuresqldw/#getting-started).              |
| [Postgres](/docs/connections/storage/catalog/postgres/)                               | See [Postgres Getting Started](/docs/connections/storage/catalog/postgres/).                                               |
| [Databricks](/docs/unify/profiles-sync/profiles-sync-setup/databricks-profiles-sync/) | See [Databricks Getting Started](/docs/unify/profiles-sync/profiles-sync-setup/databricks-profiles-sync/#getting-started). |

After you’ve finished the required steps for your chosen warehouse, connect your warehouse to Segment. Leave the warehouse tab open; you'll need its credentials in the next step.

#### Profiles Sync permissions

To allow Segment to write to the warehouse you're using for Profiles Sync, you'll need to set up specific permissions.

For example, if you're using BigQuery, [create a service account](/docs/connections/storage/catalog/bigquery/#create-a-service-account-for-segment) for Segment and assign the following roles:
- `BigQuery Data Owner`
- `BigQuery Job User`

Check the documentation for your chosen warehouse in the previous table to identify required permissions.

#### Profiles Sync roles

The following Segment access [roles](/docs/segment-app/iam/roles/) apply to Profiles Sync:

**Unify and Engage read-only**: Grants read-only access to Profiles Sync, including sync history and configuration settings. These roles don't allow downloading PII or editing settings.

**Unify and Engage admin**: Grants full access to view and edit Profiles Sync, including sync history and configuration settings.

### Step 2: Connect the warehouse and turn on Profiles Sync

After selecting your warehouse, connect it to Segment.

During this step, copy credentials from the warehouse you set up in Step 1 and enter them into into Segment. The required credentials depend on the warehouse you selected.

Segment may also display IP addresses that you need to allowlist in your warehouse. Copy these IP addresses and add them to your warehouse account.

To connect your warehouse:

1. Configure your database.  
   - Log in with a user who has read and write permissions so Segment can write to your database.  
   - Segment may show one or more IP addresses to allowlist. Copy them into your warehouse account.  
2. Enter a schema name to identify the data space in the warehouse, or use the default name provided.  
   - You can’t change the schema name after connecting the warehouse.  
3. Enter your warehouse credentials, then select **Test Connection**.  
4. If the connection test succeeds, Segment enables the **Next** button. Click it.  
   - If the test fails, verify the credentials and try again.


### Step 3: Turn on Selective Sync

Use Selective Sync to control the tables and columns that Segment syncs to your connected data warehouse.

> info ""
> Segment backfills data to your warehouse based on the last two months of history.

You can sync the following tables:

| Type                                                                                         | Tables                                                                                                                                                                                     | Backfill |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| [Profile raw tables](/docs/unify/profiles-sync/tables/#profile-raw-tables)                   | - `external_id_mapping_updates` <br> - `id_graph_updates` <br> - `profile_traits_updates`                                                                                                  | Complete |
| [Profile materialized tables](/docs/unify/profiles-sync/tables/#tables-segment-materializes) | - `user_identifier` <br> - `user_traits` <br> - `profile_merges`                                                                                                                           | Complete |
| [Event type tables](/docs/unify/profiles-sync/tables/#event-type-tables)                     | - `Identify` <br> - `Page` <br> - `Group` <br> - `Screen` <br> - `Alias` <br> - `Track`                                                                                                    | 2 months |
| [Track event tables](/docs/unify/profiles-sync/tables/#track-event-tables)                   | To view and select individual track event tables, don’t sync them during initial setup. Edit your sync settings after turning on Profiles Sync and waiting for the first sync to complete. | 2 months |

#### Using Selective Sync

Selective Sync lets you choose which tables and columns (also called properties) to sync. Syncing fewer tables and properties reduces sync times, improves query performance, and uses less disk space.

You can access Selective Sync in two ways:
- From the Set Selective Sync page when you connect your warehouse to Profiles Sync.
- From Profiles Sync settings (**Profiles Sync** > **Settings** > **Selective Sync**).

You’ll see a list of event type tables, event tables, and [tables Segment materializes](/docs/unify/profiles-sync/tables/#tables-segment-materializes). Select the tables and properties to sync, and clear the ones you don’t want to sync.

Regardless of schema size, only the first 5,000 collections and 5,000 properties per collection can be managed in your Segment space. To edit Selective Sync settings for collections that exceed this limit, [contact Segment support](https://app.segment.com/workspaces?contact=1){:target="_blank"}.

> info ""
> You must be a workspace owner to change Selective Sync settings.

#### When to use Selective Sync

Use Selective Sync to prevent specific tables and properties from syncing to your warehouse. Segment stops syncing from tables or properties you turn off, but it doesn’t delete historical data from your warehouse.

If you turn a table or property back on, only new data will sync. Segment doesn’t backfill data that was omitted with Selective Sync.

#### Using historical backfill

Profiles Sync sends profiles to your warehouse hourly once setup completes. Setup is complete after an initial automated backfill syncs all profile data. To initiate the backfill, Profiles Sync requires live data flowing into your workspace. If live data isn’t available, send test data to trigger the backfill. Backfill can also sync historical profiles to your warehouse.

> info ""
> You can only use historical backfill for tables you turn on with [Selective Sync](#using-selective-sync) during setup. Segment doesn’t backfill tables you turn off with Selective Sync.

When Segment runs historical backfills:

- Profile raw and materialized tables sync your entire historical data to your warehouse.  
- For event type and Track event tables, Profiles Sync syncs the last two months of events.  

Segment first stages the data internally and removes the backfill banner, then syncs the data to your warehouse.

Reach out to [Segment support](https://app.segment.com/workspaces?contact=1){:target="_blank"} if your use case exceeds the scope of the initial setup backfill.

> success ""
> While historical backfill is running, you can start building [materialized views](/docs/unify/profiles-sync/tables/#tables-you-materialize) and running [sample queries](/docs/unify/profiles-sync/sample-queries).    


### Step 4 (Optional): Materialize key views using a SQL automation tool

During setup, you can materialize key views in one of two ways:

- **Use `profiles raw tables`**: Materialize views on your own. This option is useful if you need to transform additional data or join Segment profile data with external data before materialization.  
- **Use Segment’s open-source dbt models with `profiles materialized` tables**: Prebuilt models maintained by Segment.  
> success ""
> You can also use [tables that Segment materializes](/docs/unify/profiles-sync/tables/#tables-segment-materializes) and syncs to your data warehouse. 

To see unified profiles in your warehouse and build attribution models, materialize the tables that Profiles Sync lands into three key views:

- `id_graph`: the current state of relationships between Segment IDs  
- `external_id_mapping`: the mapping between each external identifier you’ve observed and its corresponding, fully merged `canonical_segment_id`  
- `profile_traits`: the last seen value for all custom traits, computed traits, SQL traits, audiences, and journeys associated with a profile in a single row  

See [Tables you materialize](/docs/unify/profiles-sync/tables/#tables-you-materialize) for details on how to materialize these views on your own or with [Segment’s open-source dbt models](https://github.com/segmentio/profiles-sync-dbt){:target="_blank"}.

> warning ""
> The dbt models are in beta and require modifications to run efficiently on BigQuery, Synapse, and Postgres warehouses.


## Profiles Sync limits

As you use Profiles Sync, keep the following limits in mind:

- For event tables, Segment can backfill up to 2,000 tables per workspace.  
- Segment initiates backfills only after a successful sync with at least one row.  
- Each sync is limited to 20 TB of data.  

## Working with synced warehouses

Once your warehouse is connected, you can monitor syncs and review their details in the Segment app.  

### Monitor Profiles Sync

You can view warehouse sync information in the Overview section of the Profiles Sync page. Segment displays the dates and times of the last and next syncs, as well as your sync frequency.

In the Syncs table, you’ll find reports on individual syncs. Segment lists the most recent syncs first. The following table shows the information Segment tracks for each sync:

| Data type   | Definition                                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Sync status | - `Success`: All rows synced correctly <br> - `Partial success`: Some rows synced correctly <br> - `Failed`: No rows synced correctly |
| Duration    | Sync time, in minutes                                                                                                                 |
| Start time  | The date and time when the sync began                                                                                                 |
| Synced rows | The number of rows synced to the warehouse                                                                                            |

Selecting a row from the Syncs table opens a pane with detailed sync information. This view shows the sync’s status, duration, and start time. Segment also shows a detailed breakdown of the total rows synced, grouped into identity graph tables, event type tables, and event tables.

If the sync failed, Segment shows any available error messages in the sync report.


### Settings and maintenance

The **Settings** tab of the Profiles Sync page contains tools to help you monitor and maintain your synced warehouse.

#### Turn off or delete a warehouse

In the **Basic settings** tab, you can turn off warehouse syncs or delete your connected warehouse.

To turn off syncs, toggle **Sync status** to off. Segment retains your warehouse credentials but stops further syncs. Turn Sync status back on at any point to continue syncs.

To delete your warehouse, first turn off **Sync status**, then select **Delete warehouse**. Segment doesn’t retain credentials for deleted warehouses. To reconnect, set it up as a new warehouse.

#### Connection settings

In the **Connection settings** tab, you can verify your warehouse credentials and view IP addresses to allowlist so Segment can sync profiles.

If you have write access, you can verify that your warehouse is connected to Segment by entering your password and selecting **Test Connection**.

> info "Changing your synced warehouse"
> To change the warehouse connected to Profiles Sync, [reach out to Segment support](https://segment.com/help/contact/){:target="_blank"}.

#### Sync schedule

Profiles Sync runs on an hourly schedule.