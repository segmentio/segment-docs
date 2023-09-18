---
title: Linked Events
beta: true
plan: unify
---

> info "Linked Events is in private beta"
> Linked Events is in private beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.
 

Use Linked Events to enrich real-time event streams with entities from your data warehouse to your destinations. Insert additional event context for downstream applications for richer data about each event. 

On this page, you'll learn how to get started with Linked Events.

## Use cases

With Linked Events, you can:

- **Add details to events for precise targeting**. Enable targeting by appending product events that only have `product_id` with full product SKU details from your warehouse.
- **Sync enriched data**. Add a loyalty ID to event payloads before sending it downstream to destinations such as Amplitude, Mixpanel, and more.
- **Reduce load times**. Enrich page view events with products and subscriptions connected to that view, and send that to Google Analytics 4 to lighten the front end and reduce page loading time.

## Requirements

Before getting started with Linked Events, you'll need:

1. [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery-setup/), [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/), or [Redshift](/docs/unify/linked-profiles/setup-guides/redshift-setup/) data warehouse credentials with **write** access.
2. Access to Unify in your workspace. 
3. Access to the Destination you'll be using with Linked Events so that you can validate your data. 

> info ""
> Segment stores and processes all data in the United States.

### Linked Events roles

The following Segment access [roles](/docs/segment-app/iam/roles/) apply to Linked Events:

**Entities Admin Access**: Full CRUD (create, read, access, and delete) access to all Entities within a workspace. You can also grant or revoke user permissions.

**Entities Read-only Access**: Read-only access to all Entities models and destinations in a workspace. 

For Linked Events, you need the following roles: 
- `Workspace Owner`
- `Entities Admin`
- `Source Admin`

To use Connections with Linked Events:
- `Workspace Owner`
- `Unify Read-only or Admin`
- `Entities Admin` 
- `Source Admin`

## Step 1: Connect a data warehouse

> info ""
> Linked Events uses Segment's [Reverse ETL](/docs/connections/reverse-etl/) infrastructure for pulling in data from your warehouse. 

To get started, you'll need to connect a data warehouse. Linked Events supports [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery/), [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake/), and [Redshift](/docs/unify/linked-profiles/setup-guides/redshift-setup/).

1. Navigate to **Unify > Data graph** and click **Add warehouse**. 
2. Select a warehouse to connect from the [supported data warehouses](#supported-data-warehouses). 
3. [Connect your warehouse](#connect-your-warehouse).  
3. Click **Test Connection** to be sure your warehouse is connected.
4. After a successful test, click **Save**.  

### Schema

For Linked Events, the sync destination is an internal Segment data store. To track the data you send to Segment, you can view deltas/diffs in tables within a single schema Segment creates called `_segment_reverse_etl`. 

You can choose which database within your warehouse this data lives in. 

> info ""
> Linked Events syncs data from your warehouse approximately once every hour. 

### Supported data warehouses

The table below shows the data warehouses Linked Events supports. View the Segment docs for your warehouse, then carry out the corresponding steps. 

| Data Warehouse              |      Steps         |
|------------------------|-------------------------|
| [Snowflake](docs/unify/linked-profiles/setup-guides/snowflake-setup/)              | 1. Configure your snowflake database. <br> 2. Enter your credentials. <br> 3. Test the Connection. <br> 4. Click **Save**. |
| [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery-setup/)           | 1. Add your credentials to the database that has tables with the entities you want to enrich your event with. <br> 2. Test your connection. | 
| [Redshift](/docs/unify/linked-profiles/setup-guides/redshift-setup/)           | 1. Select the Redshift cluster you want to connect. <br> 2. [Configure](/docs/connections/storage/catalog/redshift/#networking) the correct network and security settings. |

## Step 2: Add entities

After you connect your warehouse, use the Data graph overview page (**Unify > Data graph**) to view entities Segment has synced from your data warehouse, add a new entity, and view data warehouse settings. 

To add a new entity:
1. Click **Add entity**.
2. Select the table(s) from your warehouse that you'll use as an entity. 
3. For each table you select, choose a primary key from the drop-down menu.
- The primary key uniquely identifies rows in your table.
4. Click **Add entities**.

> success ""
> If you don't see data you need, or have recently updated your warehouse, click **Refresh** to update the schema and tables list. 


## Step 3: Add a Destination

To use Linked Events, you'll need to add a destination to send enriched events to. Navigate to **Connections > Destinations**. Select an existing destination, or click **+ Add destination** to add a new destination.  

> info ""
> For Linked Events, Segment supports [Destination Actions](/docs/connections/destinations/actions/).


## Step 4: Enrich events with entities
With Linked Events, you can select entities and properties from your data warehouse, then add enrichments to map properties to your connected destination.

To enrich events with entities:

1. Navigate to **Connections > Destinations > Event streams**
2. Select the destination you'd like to create an enrichment on.
3. From the Destination overview page, click **Mappings**.
4. Click **New Mapping**, and select the type of mapping you'd like to add.
- Click the **...** icon to edit an existing mapping.
5. In the "Select Events to Map and Send", define the [conditions](/docs/connections/destinations/actions/#conditions) under which the action should run. 
6. Click **Load Sample Event**, then add your entities.

### Add entities

After you load a sample event, you can add entities from the **Enrich events with entities** section. You’ll select an entity, then an entity match property. 
- The entity match property is the property in the event that you want to match to the primary key. 

After you’ve added an entity and match property, add your event enrichments. 
 
### Add enrichments

Use enrichments to select the entity you wish to send to your downstream destination. 

In the Mappings tab, locate the **Select Mappings** section where you can enrich source properties from the entities you've selected in the previous step.

1. Select the propery field that you'd like to enrich, then select the **Enrichments** tab. 
2. Select the entity you want to send to your destination. 
- You’ll have access to all rows/columns in your data warehouse associated with the property you've selected in the previous step.
3. Add the key name on the right side, which is what Segment sends to your destination. 

> warning ""
> At this time, Linked Events doesn't support a preview of enriched payloads.

### Test and save your Enrichments

After you’ve added Enrichments, test and save your enrichments.

1. Test the mapping with data from a sample event.
- The edit panel shows you the mapping output in the format for the destination tool. You can change your mapping as needed and re-test.
2. When you're satisfied with the mapping, click **Save**. Segment returns you to the Mappings table.

> warning ""
> At this time, when you select mappings or test events, you won’t see enrichment data. Enrichment data is only available with real events.

## Frequently asked questions

#### What data warehouse permissions does Segment require? 

To use Linked Events, be sure that you have proper permissions for the Data Warehouse you're using. Visit the [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery-setup/), [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/), and [Redshift](/docs/unify/linked-profiles/setup-guides/redshift-setup/) setup guides to learn more about updating permissions.

#### How often do syncs occur? 

Segment currently syncs once every hour.

#### Which Action Destinations does Linked Events support? 

For Linked Events, Segment supports all Actions Destinations. 

#### Why aren't test events working? 

Test events don't send Linked Events. You'll only see test events that come from the source debugger, which is ahead of the event enrichment.

 #### Can I view my Linked Events Audit Trail? 

Linked Events uses the existing Audit Trail in your Segment workspace. To view your Audit Trail, navigate to **Settings > Admin > Audit Trail**.

#### How can I refresh linked data from my warehouse? 

You can define a schedule for refreshing the linked data from your data warehouse.




