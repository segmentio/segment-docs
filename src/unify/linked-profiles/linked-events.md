---
title: Linked Events
beta: true
plan: unify
---

> info "Linked Events is in private beta"
> Linked Events is in private beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.
 

Use Linked Events to enrich real-time event streams flowing from your data warehouse to your destinations. Insert additional event context for downstream applications for richer data about each event. 

On this page, you'll learn how to get started with Linked Events.

## Use cases

With Linked Events, you can:

- **Add details to events for precise targeting**. Enable targeting based on appending product events that just have `product_id` with full product SKU details from your warehouse.
- **Sync enriched data**. Add a loyalty ID to event payloads before sending it downstream to destinations such as Amplitude, Mixpanel, and more.
- **Reduce load times**. Enrich page view events with products and subscriptions connected to that view, and send that to Google Analytics 4 to lighten the front end and reduce page loading time.

## Requirements

Before getting started, note the following requirements for Linked Events: 

1. Snowflake or BigQuery data warehouse support and write access.
- View the [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery-setup/) and [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/) setup guides. 
2. Access to Unify in your workspace. 
3. Access to the Destination you'll be using with Linked Events. This helps you validate your data. 

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

> success ""
> Linked Events uses Segment's [Reverse ETL](/docs/connections/reverse-etl/) infrastructure for pulling in data from your warehouse. 

To get started, you'll need to connect a data warehouse. Linked Events supports [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery/) and [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake/) data warehouses.

1. Navigate to **Unify > Data graph** and click **Add warehouse**. 
2. Select a warehouse to connect from the [supported warehouse Destinations](#supported-warehouse-destinations). 
3. [Connect your warehouse](#connect-your-warehouse).  
3. Click **Test Connection** to be sure your warehouse is connected.
4. After a successful test, click **Save**.  

### Schema

For Linked Events, the sync destination is an internal Segment data store. To track the data you send to Segment, you can view deltas/diffs in tables within a single schema Segment creates called `_segment_reverse_etl`. 

You can choose which database within your warehouse this data lives in. 

### Supported warehouse Destinations

The table below shows the warehouse Destinations Linked Events supports. View the Segment docs for your warehouse, then carry out the corresponding steps. 

| **Table**              |      **Steps**          |
|------------------------|-------------------------|
| [Snowflake](docs/unify/linked-profiles/setup-guides/snowflake-setup/)              | 1. Configure your snowflake database. <br> 2. Enter your credentials. <br> 3. Test the Connection. <br> 4. Click **Save**. |
| [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery-setup/)           | 1. Add your credentials to the database that has tables with the Entities you want to enrich your event with. <br> 2. Test your connection. | 

<!-- 
| [Redshift](/docs/connections/storage/catalog/redshift/#getting-started)           | 1. Choose an instance. <br> 2. Provision a new Redshift cluster. |
| [Azure](/docs/connections/storage/catalog/azuresqldw/)              | 1. Sign up for an Azure subscription. 2. Provision a dedicated SQL pool.                     |
| [Postgres](/docs/connections/storage/catalog/postgres/)           | 1. Follow the steps in the Postgres getting started section. 
-->

## Step 2: Add a model

After you connect your warehouse, use the Data graph overview screen (**Unify > Data graph**) to view models that Segment has synced from your data warehouse, add a new model, and view data warehouse settings. 

You can select a model to view the table schema including columns, column type, primary key, and sync information.

To add a new model:
1. Click **Add model**.
2. Select the table(s) from your warehouse that you'll use as a model. 
3. For each table you select, choose a primary key from the drop-down menu.
- The primary key uniquely identifies rows in your table.
4. Click **Add model**.

Once you've added a model, visit the Data graph overview page and select the model to view table columns, data type, and sync status information. 

## Step 3: Add a Destination

To use Linked Events, you'll need to add a destination to send enriched events to.
Navigate to **Connections > Destinations**. Select an existing destination, or click **+ Add destination** to add a new destination.  

> info ""
> For Linked Events, Segment supports [Destination Actions](/docs/connections/destinations/actions/).


## Step 4: Create an event enrichment
With Linked Events, you can select models and properties from your data warehouse, then add enrichments to map properties to your connected destination.

You can add data models and enrichments from the destination Mappings tab:

1. Navigate to **Connections > Destinations > Event streams**
2. Select the destination you'd like to create an enrichment on.
3. From the Destination overview page, click **Mappings**.
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
> For Linked Events, Segment doesn't provide a preview of the enriched payloads.

### Test and save your Enrichments

After you’ve added Enrichments, you’ll want to test and save your enrichments.

5. Test the mapping with data from a sample event.
- The edit panel shows you the mapping output in the format for the destination tool. You can change your mapping as needed and re-test.
6. When you're satisfied with the mapping, click **Save**. Segment returns you to the Mappings table.


## Frequently asked questions

{% faq %}
{% faqitem What data warehouse permissions does Segment require? %}

To use Linked Events, be sure that you have proper permissions for the Data Warehouse you're using. Visit the [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery/) and [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake/) setup guides to learn more about updating permissions.

{% endfaqitem %}

{% faqitem How often do syncs occur? %}

Segment currently syncs once every hour.

{% endfaqitem %}


{% faqitem Which Action Destinations does Linked Events support? %}

For Linked Events, Segment supports all Actions Destinations. 

{% endfaqitem %}

{% faqitem Why aren't test events working? %}

Test events don't send Linked Events, it only sends the test events that come from the source debugger, which is ahead of the event enrichment.

{% endfaqitem %}

{% faqitem Can I view my Linked Events Audit Trail? %}

Linked Events uses the existing Audit Trail in your Segment workspace. To view your Audit Trail, navigate to **Settings > Admin > Audit Trail**.

{% endfaqitem %}

{% faqitem How can I refresh linked data from my warehouse? %}

You can define a schedule for refreshing the linked data from your data warehouse.

{% endfaqitem %}
{% endfaq %}


