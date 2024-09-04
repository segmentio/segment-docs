---
title: Set up Reverse ETL
beta: false 
---

There are four components to Reverse ETL: Sources, Models, Destinations, and Mappings.

![Reverse ETL overview image](images/RETL_Doc_Illustration.png)

Follow these 4 steps to set up Reverse ETL:
1. [Add a source](#step-1-add-a-source)
2. [Add a model](#step-2-add-a-model)
3. [Add a destination](#step-3-add-a-destination)
4. [Create mappings](#step-4-create-mappings)

## Step 1: Add a source
In Reverse ETL, a source is your data warehouse. 

> warning ""
> You need to be a user that has both read and write access to the warehouse.

To add your warehouse as a source:

1. Navigate to **Connections > Sources** and select the **Reverse ETL** tab in the Segment app.
2. Click **+ Add Reverse ETL source**.
3. Select the source you want to add. 
4. Follow the corresponding guide to set up the required permissions for your Reverse ETL source:
  - [Azure Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/azure-setup)
  - [BigQuery Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/bigquery-setup)
  - [Databricks Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/databricks-setup)
  - [Postgres Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/postgres-setup)
  - [Redshift Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/redshift-setup)
  - [Snowflake Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/snowflake-setup)

## Step 2: Add a model
Models define sets of data you want to sync to your Reverse ETL destinations. A source can have multiple models. Segment supports [SQL models](/docs/connections/reverse-etl/setup/#step-4-create-mappings) and [dbt models](/docs/segment-app/extensions/dbt/).

### SQL editor
1. Navigate to **Connections > Sources** and select the **Reverse ETL** tab. Select your source and click **Add Model**.
2. Click **SQL Editor** as your modeling method. (Segment will add more modeling methods in the future.)
3. Enter the SQL query that’ll define your model. Your model is used to map data to your Reverse ETL destination(s).
4. Choose a column to use as the unique identifier for each record in the **Unique Identifier column** field.
    * The Unique Identifier should be a column with unique values per record to ensure checkpointing works as expected, like a primary key. This column is used to detect new, updated, and deleted records.
5. Click **Preview** to see a preview the first 10 records for the SQL query. 
    * Segment caches preview queries and result sets in the UI, and stores the preview cache at the source level. If you make two queries for the same source, Segment returns identical preview results. However, during the next synchronization, the latest data will be sent to the connected destinations.
6. Click **Next**.
7. Enter your **Model Name**.
8. Click **Create Model**.

### dbt model
Use Segment's dbt extension to centralize model management and versioning. Users who set up a BigQuery, Databricks, Postgres, Redshift, or Snowflake source can use Segment's [dbt extension](/docs/segment-app/extensions/dbt/) to centralize model management and versioning, reduce redundancies, and run CI checks to prevent breaking changes. 

## Step 3: Add a destination
In Reverse ETL, destinations are the business tools or apps you use that Segment syncs the data from your warehouse to. A model can have multiple destinations.

Refer to the [Reverse ETL catalog](/docs/connections/reverse-etl/reverse-etl-catalog/) to view the supported actions destinations. Reverse ETL supports to unique destinations:
- **[Segment Connections Destination](/docs/connections/reverse-etl/reverse-etl-catalog/#segment-connections-destination)**: Send warehouse data back into Segment to leverage your existing mappings or access non-actions destinations in the Connections catalog.
- **[Segment Profiles Destination](/docs/connections/destinations/catalog/actions-segment-profiles/)**: Engage Premier Subscriptions users can use Reverse ETL to sync subscription data from their warehouses to destinations.

> info "Separate endpoints and credentials required to set up third party destinations"
> Before you begin setting up your destinations, note that each destination has different authentication requirements. See the documentation for your intended destination for more details.

To add your first destination:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Click **Add Reverse ETL destination**.
3. Select the destination you want to connect to and click **Configure**.
4. Select the Reverse ETL source you want to connect the destination to.
5. Enter the **Destination name** and click **Create Destination**.
6. Enter the required information on the **Settings** tab of the destination.
7. Navigate to the destination settings tab and enable the destination. If the destination is disabled, then Segment won't be able to start a sync.

## Step 4: Create mappings
Mappings enable you to map the data you extract from your warehouse to the fields in your destination. A destination can have multiple mappings.

To create a mapping:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the destination that you want to create a mapping for.  
3. Click **Add Mapping**.
4. Select the model to sync from.
5. Select the **Action** you want to sync and click **Next**.
      * Actions determine the information sent to the destination. The list of Actions will be unique to each destination.
6. Add a name for your mapping. The mapping name defaults to the Action's name (for example, 'Track Event'), but can be customized to allow you to identify the mapping across others.
7. In the **Select record to map and send** section, select which records to send to your destination after Segment completes extracting data based on your model. You can choose from:
      * Added records
      * Updated records
      * Added or updated records
      * Deleted records
8. Select a test record to preview the fields that you can map to your destination in the **Add test record** field.
9. Select how often you want Segment to sync your data under **Schedule configuration**.
    * **Interval**: Extractions perform based on a selected time cycle. Select one of the following options: 15 minutes, 30 minutes, 1 hour, 2 hours, 4 hours, 6 hours, 8 hours, 12 hours, 1 day.
    * **Day and time**: Extractions perform at specific times on selected days of the week.
10. Define how to map the record columns from your model to your destination in the **Select Mappings** section.
    * You map the fields that come from your source to fields that the destination expects to find. Fields on the destination side depend on the type of action selected.
    * If you're setting up a destination action, depending on the destination, some mapping fields may require data to be in the form of an object or array. See the [supported objects and arrays for mapping](/docs/connections/reverse-etl/manage-retl/#supported-object-and-arrays).
11. *(Optional)* Send a test record to verify the mappings correctly send to your destination.
12. Click **Create Mapping**.
13. Select the destination you’d like to enable on the **My Destinations** page under **Reverse ETL > Destinations**.
14. Turn the toggle on for the **Mapping Status**. Events that match the trigger condition in the mapping will be sent to the destination.
    * If you disable the mapping state to the destination, events that match the trigger condition in the mapping won’t be sent to the destination.

## Initial sync for a given mapping
After you've set up your source, model, destination, and mappings for Reverse ETL, your data will extract and sync to your destination(s) right away if you chose an interval schedule. If you set your data to extract at a specific day and time, the extraction will take place then.

## Edit Reverse ETL syncs
### Edit your model

To edit your model:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the source and the model you want to edit.
3. On the overview tab, click **Edit** to edit your query.
4. Click the **Settings** tab to edit the model name or change the schedule settings.

### Edit your mapping

To edit your mapping:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the destination and the mapping you want to edit.
3. Select the **...** three dots and click **Edit mapping**. If you want to delete your mapping, select **Delete**.
