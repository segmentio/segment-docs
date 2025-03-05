---
title: Linked Events Overview
plan: unify
hidden: false
---
 
Use Linked Events to enrich real-time event streams with entities from your data warehouse to your destinations. Insert additional event context for downstream applications for richer data about each event. 

> info "Consent enforcement for Linked Events"
> You can use [Consent Management](/docs/privacy/consent-management/) to enforce consent in your downstream destinations for Linked Events stamped with the [consent object](/docs/privacy/consent-management/consent-in-segment-connections/#consent-object). You must enable Consent Management and have consent stamped on events from event streaming sources to use Consent Management. You cannot use Linked Events to enrich events with consent preferences that are stored in your warehouse.    

On this page, you'll learn how to get started with Linked Events.

> info "Linked Events warehouse support"
> Linked Events supports Snowflake, BigQuery, Redshift, and Databricks.

## Use cases

With Linked Events, you can:

- **Add details to events for precise targeting**. Enable targeting by appending product events that only have `product_id` with full product SKU details from your warehouse.
- **Sync enriched data**. Add a loyalty ID to event payloads before sending it downstream to destinations such as Amplitude, Mixpanel, and more.
- **Reduce load times**. Enrich page view events with products and subscriptions connected to that view, and send that to Google Analytics 4 to lighten the front end and reduce page loading time.

## Prerequisites

To use Linked Events, you'll need the following:

1. A supported data warehouse.
2. Access to Unify in your workspace. 
3. Access to the actions-based destination you'll be using with Linked Events so that you can validate your data. 

> info ""
> Segment stores and processes all data in the United States.

> info ""
> Profiles Sync isn't required for Linked Events.

### Linked Events roles

The following Segment access [roles](/docs/segment-app/iam/roles/) apply to Linked Events:

**Entities Admin Access**: Entities Admins have the ability to view and edit entity models and connection details.

**Entities Read-only Access**: Entities Read-only users have the ability to view entity models. 

To create models and enrich events in destinations, you need to be a `Workspace Owner` or have the following roles: 

- `Unify Admin`
- `Entities Admin` 
- `Source Admin`

## Step 1: Set up your data warehouse and permissions

> info ""
> Linked Events uses Segment's [Reverse ETL](/docs/connections/reverse-etl/) infrastructure for pulling in data from your warehouse. 

To get started, you'll need to set up your data warehouse and provide the correct access detailed in the set up steps below. Linked Events supports [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery-setup/), [Databricks](/docs/unify/linked-profiles/setup-guides/databricks-setup/), [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/), and [Redshift](/docs/unify/linked-profiles/setup-guides/redshift-setup/). 

## Step 2: Connect your warehouse to the Data Graph

> success ""
> Before getting started with the Data Graph, be sure to set up your warehouse permissions.

1. Navigate to **Unify > Data graph** and click **Add warehouse**. 
2. Select a warehouse to connect from the [supported data warehouses](#supported-data-warehouses). 
3. Connect your warehouse.  
3. Click **Test Connection** to be sure your warehouse is connected.
4. After a successful test, click **Save**.  

### Schema

Linked Events uses Reverse ETL to compute the incremental changes to your data directly within your data warehouse. The Unique Identifier column detects data changes, such as new, updated, and deleted records. 

For Segment to compute data changes in your warehouse, Segment requires both read and write permissions to the warehouse schema table. At a high level, the extract process requires read permissions for the query being executed. Segment tracks changes to the query results through tables that Segment manages in a dedicated schema (for example, `_segment_reverse_etl`), which requires some write permissions.

> warning ""
> Only sync what you need for enrichment. There may be cost implications to having Segment query your warehouse tables.

> info ""
> Linked Events syncs data from your warehouse approximately once every hour. 


### Supported data warehouses

The table below shows the data warehouses Linked Events supports. View the Segment docs for your warehouse, then carry out the corresponding steps. 

| Data Warehouse              |      Steps         |
|------------------------|-------------------------|
| [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/)              | 1. Configure your snowflake database. <br> 2. Enter your credentials. <br> 3. Test the Connection. <br> 4. Click **Save**. |
| [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery-setup/)           | 1. Add your credentials to the database that has tables with the entities you want to enrich your event with. <br> 2. Test your connection. | 
| [Redshift](/docs/unify/linked-profiles/setup-guides/redshift-setup/)           | 1. Select the Redshift cluster you want to connect. <br> 2. [Configure](/docs/connections/storage/catalog/redshift/#networking) the correct network and security settings. |
| [Databricks](/docs/unify/linked-profiles/setup-guides/databricks-setup/) | 1. Configure your Databricks catalog. <br> 2. Enter your credentials. <br> 3. Test the Connection. <br> 4. Click **Save**. |


## Step 3: Build your Data Graph 
 
The Data Graph is a semantic layer that represents a subset of relevant business data that you'll use to enrich events in downstream tools. Use the configuration language spec below to add models to build out your Data Graph.

Each Unify space has one Data Graph. The current version is v0.0.6 but this may change in the future as Segment accepts feedback about the process.

> warning ""
> Deleting entities and relationships are not yet supported.
 
### Defining entities 

> warning ""
> Snowflake schemas are case sensitive, so you'll need to reflect the schema, table, and column names based on how you case them in Snowflake.

An entity is a stateful representation of a business object. The entity corresponds to a table in the warehouse that represents that entity. 


| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `entity`      | A unique slug for the entity, which is immutable and treated as a delete if you make changes. The slug must be in all lowercase, and supports dashes or underscores (for example, `account-entity` or `account_entity`).    |
| `name`        | A unique label which will display across Segment.                           |
| `table_ref`   | Defines the table reference. In order to specify a connection to your table in Snowflake, a fully qualified table reference is required: `[database name].[schema name].[table name]`. |
| `primary_key` | The unique identifier for the given table. Should be a column with unique values per row. |
| (Optional) `enrichment_enabled = true`      | Indicates if you plan to also reference the entity table for [Linked Events](/docs/unify/linked-profiles/linked-events/).                         |



```python
# Define an entity and indicate if the entity will be referenced for Linked Events (enrichment_enabled=true)

entity "account-entity" {
     name = "account"
     table_ref = "CUST.ACCOUNT"
     primary_key = "id"
     enrichment_enabled = true
}
```


## Step 4: Add an actions-based destination

To use Linked Events, you'll need to add an action destination to send enriched events to. Navigate to **Connections > Destinations**. Select an existing action destination, or click **+ Add destination** to add a new action destination.  

> info ""
> For Linked Events, Segment supports [Destination Actions](/docs/connections/destinations/actions/) in cloud-mode only.


## Step 5: Enrich events with entities
With Linked Events, you can select entities and properties from your data warehouse, then add enrichments to map properties to your connected destination.

To enrich events with entities:

1. Navigate to **Connections > Destinations > Event streams**
2. Select the destination you'd like to create an enrichment on.
3. From the Destination overview page, click **Mappings**.
4. Click **New Mapping**, and select the type of mapping you'd like to add.
- Click the **...** icon to edit an existing mapping.
5. In the "Select Events to Map and Send", define the [conditions](/docs/connections/destinations/actions/#conditions) under which the action should run. 
6. Click **Load Sample Event**, then add your entities.

### Configure the sync schedule
You can schedule how often you want Segment to cache the table data for Linked Events. 

To configure your sync schedule:
1. Navigate to **Unify > Data Graph > Entities** and select the entity you want to configure. 
2. Select the **Enrichment syncs** tab. 
3. Click **Edit** next to **Sync schedule**. 
4. Select the **Schedule type**. You can choose from: 
   * **Manual**: Trigger the sync manually or with Segment's API.
   * **Interval**: Sync based on a by-the minute, hourly, or daily cycle. For example, once every 2 hours. 
   * **Day and time**: Sync at specific times on selected days of the week. For example, Mondays at 2:00PM. 

### Add entities

After you load a sample event, you can add entities from the **Enrich events with entities** section. You’ll select an entity, then an entity match property. 
- The entity match property is the property in the event that you want to match to the primary key. 

After you’ve added an entity and match property, add your event enrichments. 
 
### Add enrichments

Use enrichments to select the entity you wish to send to your downstream destination. 

In the Mappings tab, locate the **Select Mappings** section where you can enrich source properties from the entities you've selected in the previous step.

1. Select the property field that you'd like to enrich, then select the **Enrichments** tab. 
2. Select the entity you want to send to your destination. 
- You have access to all rows/columns in your data warehouse associated with the property you've selected in the previous step.
3. Add the key name on the right side, which is what Segment sends to your destination. 
4. Click **Save**.

#### Testing with Linked Events Enrichments
The [Event Tester and Mappings Tester](/docs/connections/test-connections/#) support testing enrichments from Linked Events, allowing you to verify that entity data is correctly attached to your events before they reach destinations. When you have Linked Events configured, these enrichments appear in your test payload, showing you exactly how profile traits will add to your events.

When you test mappings with Linked Events Enrichments:
* You can view the enriched fields in the **Request** section of the test results. 
* Verify that the correct entity traits are attaching to your events based on your entity matching configuration. 
* The tester includes any configured Linked Events enrichments in the sample payload. 

This helps you confirm that the right information sends to your destinations when testing activation scenarios that rely on profile data enrichment

> info ""
> If an enriched field appears empty in your test results, this could indicate either that the entity matching failed to find a matching profile, or that the profile exists but does not have data for that specific trait.


## Enrichment observability

To verify which of your events matched one or more enrichments:
1. Navigate to [Delivery Overview](/docs/connections/delivery-overview/#actions-destinations) for your connected destination. 
2. Select the **Successfully received** step in the pipeline view.
3. Select the **Events enriched** tab. This table breaks down events into the following categories: 
     - **Successfully enriched**: Events that were enriched by all entities
     - **Partially enriched**: Events that were only enriched by only some of your entities
     - **Unenriched events**: Events that did not match any entities

## FAQs

#### What data warehouse permissions does Segment require? 

To use Linked Events, be sure that you have proper permissions for the Data Warehouse you're using. Visit the [BigQuery](/docs/unify/linked-profiles/setup-guides/bigquery-setup/), [Databricks](/docs/unify/linked-profiles/setup-guides/databricks-setup), [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/), and [Redshift](/docs/unify/linked-profiles/setup-guides/redshift-setup/) setup guides to learn more about updating permissions.

#### How often do syncs occur? 

Segment currently syncs once every hour.

#### Which Destinations does Linked Events support? 

For Linked Events, Segment supports all actions-based destinations in cloud-mode. Device-mode destinations are not supported.

#### Why aren't test events working? 

Test events don't send Linked Events. You'll only see test events that come from the source debugger, which is ahead of the event enrichment.

#### Can I view my Linked Events Audit Trail? 

Linked Events uses the existing Audit Trail in your Segment workspace. To view your Audit Trail, navigate to **Settings > Admin > Audit Trail**.

#### How can I refresh linked data from my warehouse? 

You can define a schedule for refreshing the linked data from your data warehouse.

#### How do I use entities in my data graph with Linked Events?

To use entities with Linked Events, you'll need to set the `enrichment_enabled` flag to `true`. Here's the sample code:

```python
# Define an entity and indicate if the entity will be referenced for Linked Events (enrichment_enabled=true)

entity "account-entity" {
     name = "account"
     table_ref = "CUST.ACCOUNT"
     primary_key = "id"
     enrichment_enabled = true
}
```

