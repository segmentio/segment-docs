---
title: Profiles Sync Setup
beta: true
plan: profiles
---

> info "Profiles Sync Beta"
> Profiles Sync is in beta and Segment is actively working on this feature. Segment's [First-Access and Beta terms](https://segment.com/legal/first-access-beta-preview/) govern this feature. To learn more, reach out to your CSM, AE, or SE.

Profiles Sync connects identity-resolved customer profiles to a data warehouse of your choice.

With a continual flow of synced Profiles, teams can enrich and use these data sets as the basis for new audiences and models. Profiles Sync addresses a number of use cases, with applications for machine learning, identity graph monitoring, and attribution analysis. View [Profiles Sync Sample Queries](/docs/profiles/profiles-sync/sample-queries) for an in-depth guide to Profiles Sync applications.

On this page, you’ll learn how to set up Profiles Sync, enable historical backfill, and adjust settings for warehouses that you’ve connected to Profiles Sync.

## Initial Profiles Sync setup

> info "Identity Resolution Setup"
> To use Profiles Sync, you must first set up [Identity Resolution](/docs/profiles/identity-resolution/).

To set up Profiles Sync, you’ll first create a warehouse, then connect the warehouse within the Segment app.

Before you begin, prepare for setup with these tips:

- To connect your warehouse to Segment, you must have read and write permissions with the warehouse Destination you choose.
- During Step 2, you’ll copy credentials between Segment and your warehouse Destination. To streamline setup, open your Segment workspace in one browser tab and open another with your warehouse account.
- Make sure to copy any IP addresses Segment asks you to allowlist in your warehouse Destination.

### Step 1: Create a warehouse

You’ll first choose the Destination warehouse to which Segment will sync Profiles. Profiles Sync supports the Snowflake, Redshift, BigQuery, Azure, and Postgres warehouse Destinations. Your initial setup will depend on the warehouse you choose.

The following table shows the supported Profiles Sync warehouse Destinations and the corresponding required steps for each. Select a warehouse, view its Segment documentation, then carry out the warehouse’s required steps before moving to Step 2 of Profiles Sync setup:

| Warehouse Destination                                                     | Required steps                                                                                                                                                   |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Snowflake](/docs/connections/storage/catalog/snowflake/#getting-started) | 1. Create virtual warehouse. <br> 2. Create a database. <br> 3. Create role for Segment. <br> 4. Create user for Segment. <br> 5. Test the user and credentials. |
| [Redshift](/docs/connections/storage/catalog/redshift/#getting-started)   | 1. Choose an instance. <br> 2. Provision a new Redshift cluster.                                                                                                 |
| [BigQuery](/docs/connections/storage/catalog/bigquery/)                   | 1. Create a project and enable BigQuery. <br> 2. Create a service account for Segment.                                                                           |
| [Azure](/docs/connections/storage/catalog/azuresqldw/)                    | 1. Sign up for an Azure subscription. <br> 2. Provision a dedicated SQL pool.                                                                                     |
| [Postgres](/docs/connections/storage/catalog/postgres/)                   | 1. Follow the steps in the [Postgres getting started](/docs/connections/storage/catalog/postgres/) section.                                                      |

Once you’ve finished the required steps for your chosen warehouse, you’re ready to connect your warehouse to Segment. Because you’ll next enter credentials from the warehouse you just created, **leave the warehouse tab open to streamline setup.**

### Step 2: Connect the warehouse and enable Profiles Sync

With your warehouse configured, you can now connect it to Segment.

During this step, you’ll copy credentials from the warehouse you just set up and enter them into the Segment app. The specific credentials you’ll enter depend on the warehouse you chose during Step 1.

Segment may also display IP addresses you’ll need to allowlist in your warehouse. Make sure to copy the IP addresses and enter them into your warehouse account.

Follow these steps to connect your warehouse:

1. In your Segment workspace, navigate to **Profiles > Profiles Sync**.
2. Select **Add warehouse**, choose the warehouse you just set up, then select **Next**.
3. Segment shows an IP address to allowlist.  Copy it to your warehouse Destination.
4. Segment prompts you to enter specific warehouse credentials. Enter them, then select **Test Connection**.
5. If the connection test succeeds, Segment enables the **Next** button. Select it.
  * If the connection test fails, verify that you’ve correctly entered the warehouse credentials, then try again.
6. Select **Next** on the **Sync schedule** page. Segment displays the Profiles Sync overview page.

At this point, Segment enables live syncs for your account.

#### Using historical backfill

Profiles Sync sends Profiles to your warehouse on an hourly basis, beginning after you complete setup. You can use backfill, however, to sync historical Profiles to your warehouse, as well.

By default, Segment includes identity graph updates, external ID mapping tables, and two months of the events table in the initial warehouse sync made during setup. Reach out to Segment support if your use case exceeds the scope of the initial setup backfill.

## Working with synced warehouses

<!-- add transition line here -->

### Monitor Profiles Sync

You can view warehouse sync information in the overview section of the Profiles Sync page. Segment displays the dates and times of the last and next syncs, as well as your sync frequency.

In the Syncs table, you’ll find reports on individual syncs. Segment lists your most recent syncs first. The following table shows the information Segment tracks for each sync:

| DATA TYPE   | DEFINITION                                                                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sync status | - `Success`, which indicates that all rows synced correctly; <br> - `Partial success`, indicating that some rows synced correctly <br> - `Failed`, indicating that no rows synced correctly |
| Duration    | Length of sync time, in minutes                                                                                                                                                             |
| Start time  | The date and time when the sync began                                                                                                                                                       |
| Synced rows | The number of rows synced to the warehouse                                                                                                                                                  |

Selecting a row from the Syncs table opens a pane that contains granular sync information. In this view, you’ll see the sync’s status, duration, and start time. Segment also displays a nuanced breakdown of the total rows synced, sorting them into identity graph tables, event type tables, and event tables.

If the sync failed, Segment shows any available error messages in the sync report.

### Settings and maintenance

The **Settings** tab of the Profiles Sync page contains tools that can help you monitor and maintain your synced warehouse.

#### Disable or delete a warehouse

In the **Basic settings** tab, you can disable warehouse syncs or delete your connected warehouse altogether.

To disable syncs, toggle **Sync status** to off. Segment retains your warehouse credentials but stops further Profiles syncs. Toggle Sync status back on at any point to continue syncs.

To delete your warehouse, toggle **Sync status** to off, then select **Delete warehouse**. Segment doesn’t retain credentials for deleted warehouses; to reconnect a deleted warehouse, you must set it up as a new warehouse.

#### Connection settings

In the **Connection settings** tab, you can verify your synced warehouse’s credentials and view IP addresses you’ll need to allowlist so that Segment can successfully sync Profiles.

If you have write access, you can verify that your warehouse is successfully connected to Segment by entering your password and then selecting **Test Connection**.

> info "Changing your synced warehouse"
> If you’d like to change the warehouse connected to Profiles Sync, reach out to Segment support.

<!-- Verify that this doesn't need to be changed -->

#### Sync schedule

Segment supports hourly syncs.
