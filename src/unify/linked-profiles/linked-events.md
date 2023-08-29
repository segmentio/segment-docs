---
title: Linked Events
beta: true
plan: unify
---

> info "Linked Events is in private beta"
> Linked Events is in private beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.


Use Linked Events, powered by Linked Profiles, to enrich events streams flowing from your data warehouse to your Destinations. Insert additional event context for downstream applications for richer data about each event. For example, append specific product details for a user who is looking to renew a subscription. 

On this page, you'll learn how to get started with Linked Events.

## Requirements

Before getting started, note the following requirements for Linked Events. 

1. Snowflake or BigQuery data warehouse support and write access.
- For more information, view the [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery/) and [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake/) setup guides. 
2. Access to Unify in your workspace. 
3. Access to the Destination you'll be using with Linked Events. This will help you to validate your data. 


#### Linked Events permissions

The following Segment access [roles](/docs/segment-app/iam/roles/) apply to Linked Events:

**Entities Admin Access**: Full CRUD access to all Entities within a workspace. You can also grant or revoke user permissions.

**Entities Read-only Access**: Read access to all Entities models and destinations in a workspace. 

Additionally you'll need the following permissions or roles to use both Connections and Linked Events.

For Connections:
- Workspace owner
- Unify Read-only or Admin
- Entities Admin 
- Source Admin

For Linked Events: 
- Workspace owner 
- Source Admin

> info "Data residency"
> For Linked Profiles, any customer data residency is ok, but your data store can only be in the United States.

## Step 1: Connect a data warehouse

> success ""
> Linked Events uses Segment's [Reverse ETL](/docs/connections/reverse-etl/) infrastructure for pulling in data from your warehouse. 

To get started, you'll need to connect a data warehouse which Segment will use for Linked Events. Linked Events supports [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery/) and [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake/) data warehouses.

1. Navigate to **Unify** > **Data graph** and click **Add warehouse**. 
2. Select a warehouse to connect from the [supported warehouse Destinations](#supported-warehouse-destinations). 
3. [Connect your warehouse](#connect-your-warehouse).  
3. Click **Test Connection** to be sure your warehouse is connected.
4. After a successful test, click **Save**.  

### Schema

For Linked Events, the sync destination is an internal Segment data store. To track the data you've previously sent to Segment, you can view deltas/diffs in tables within a single schema Segment creates called `_segment_reverse_etl`. You can choose which database within your warehouse this data lives in. 

### Supported warehouse Destinations

The table below shows the supported warehouse Destinations and the corresponding steps for each. View the Segment documentation for your warehouse, then carry out the required steps. 

| **Table**              |      **Steps**          |
|------------------------|-------------------------|
| [Snowflake](/docs/connections/storage/catalog/snowflake/#getting-started)              | 1. Configure your snowflake database. <br> 2. Enter your credentials. <br> 3. Test the Connection <br> 4. Click **Save**. |
| [BigQuery](/docs/connections/storage/catalog/bigquery/)           | 1. Add your credentials to the database that has tables with the Entities you want to enrich your event with. <br> 2. Test your connection. | 

<!-- 
| [Redshift](/docs/connections/storage/catalog/redshift/#getting-started)           | 1. Choose an instance. <br> 2. Provision a new Redshift cluster. |
| [Azure](/docs/connections/storage/catalog/azuresqldw/)              | 1. Sign up for an Azure subscription. 2. Provision a dedicated SQL pool.                     |
| [Postgres](/docs/connections/storage/catalog/postgres/)           | 1. Follow the steps in the Postgres getting started section. 
-->

## Step 2: Add a model

After you connect your warehouse, use the Data graph overview screen (**Unify** > **Data graph**) to view models that Segment has synced from your data warehouse, add a new model, and view data warehouse settings. 

You can select a model to view the table schema including columns, column type, primary key, and sync information.

To add a new model:
1. Click **Add model**.
2. Select the table(s) from your warehouse that you'll use as a model. 
3. For each table you select, choose a primary key from the drop-down menu.
- The primary key uniquely identifies rows in your table.
4. Click **Add model**.

Once you've added a model, visit the Data graph overview page and select the model to view table columns, data type, and sync status information. 


<!-- this might not be included with Private beta 
### Sync status 

For Linked Events, syncs occur roughly once every hour.  
The following table displays the sync statuses Segment displays for each model you sync from your data warehouse. 

| **Sync status**  | **Description** |
|---------|------------|
| In progress | The sync is in progress.    |
| Success | You'll see this status when Segment successfully extracts and loads all records. Segment also displays this status if no changes were detected during the sync.|
| Partial success               | While Segment synced some rows, other rows failed to sync. (Add other content here) |
| Failed            | Segment displays this status in two scenarios: <br> - **Extraction failure**: Segment failed to extract any rows from your data warehouse. <br> - **Loading failure**: Segment failed to load any rows from your data warehouse. <br><br> In both scenarios, Segment will try again on the next sync, however you won't see any diffs displayed from failed syncs. |







((((I don't think this is true for the time being)))
> success ""
> Before you set enrich events, you must first set up a data graph.
-->

## Step 3: Add a Destination

To use Linked Events, you'll need to add a destination to send enriched events to.
Navigate to **Connections > Destinations**. Select an existing destination, or click **+ Add destination** to add a new destination.  

> info ""
> For Linked Events, Segment supports [Destination Actions](/docs/connections/destinations/actions/).


## Step 4: Create an event enrichment
With Linked Events, you can select models and properties from your data warehouse, then add enrichments to map properties to your connected destination.

You can add data models and enrichments from the destination Mappings tab:

1. Navigate to **Connections** > **Destinations** > **Event streams**
2. Select the destination you'd like to create an enrichment on.
3. From the destination overview page, click **Mappings**.
4. Click **New Mapping**, and select the type of mapping you'd like to add.
- Click the **...** icon to edit an existing mapping.
5. In the "Select Events to Map and Send", define the [conditions](/docs/connections/destinations/actions/#conditions) under which the action should run. 
6. Click **Load Sample Event**, then add your data models.

### Add data models 

After you load a sample event, you can add data models from the **Enrich events with data models** section. You’ll select a data model, then a model match property. 
- The model match property is the property in the event that you want to match to the primary key. 

After you’ve added a data model and match property, add your event enrichments. 

### Add enrichments

Use enrichments to select the entity you wish to send to your downstream destination. 

In the Mappings tab, locate the **Select Mappings** section where you can enrich source properties from the data models you've selected in the previous step.

Select the property field that you'd like to enrich, then select the **Enrichments** tab. Next, select the properties you want to send to your destination. 

You’ll have access to all rows/columns in your data warehouse associated with the match property you've selected in the previous step.

You can then add the key name on the right side, which is what Segment sends to your destination. 

> info ""
> For Linked Evets, Segment doesn't provide a preview of the enriched payloads.

### Test and save your Enrichments

After you’ve added Enrichments, you’ll want to test and save your enrichments.

5. Test the mapping with data from a sample event.
- The edit panel shows you the mapping output in the format for the destination tool. You can change your mapping as needed and re-test.
6. When you're satisfied with the mapping, click **Save**. Segment returns you to the Mappings table.




## Troubleshooting and limitations

Below are some tips to help you troubleshoot common questions that come up. 

### Data Warehouse Permissions

To use Linked Events, be sure that you have proper permissions for the Data Warehouse you're using. Visit the [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery/) and [snowflake](/docs/unify/linked-profiles/setup-guides/snowflake/) setup guides to learn more about updating permissions. 

### Data Warehouse Sync

Segment currently syncs once every hour.

### Action Destinations support

For Linked Events, Segment supports all Actions Destinations. 

### Action Event Tester

Test events don't send linked events, it only sends the test events that come from the source debugger, which is ahead of the event enrichment.

### Audit logs

Linked Events uses the existing Audit Trail UI in the Settings page. Navigate to () to view more.

### Sync schedule config

You can define a schedule for refreshing the linked data from your data warehouse.



