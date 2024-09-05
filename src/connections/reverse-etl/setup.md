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
A source is where your data originates from. Traditionally in Segment, a [source](/docs/connections/sources/#what-is-a-source) is a website, server library, mobile SDK, or cloud application which can send data into Segment. In Reverse ETL, your data warehouse is the source.

> warning ""
> You need to be a user that has both read and write access to the warehouse.

To add your warehouse as a source:

1. Navigate to **Connections > Sources** and select the **Reverse ETL** tab in the Segment app.
2. Click **+ Add Reverse ETL source**.
3. Select the source you want to add. 
4. Follow the corresponding setup guide for your Reverse ETL source:
  - [Azure Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/azure-setup)
  - [BigQuery Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/bigquery-setup)
  - [Databricks Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/databricks-setup)
  - [Postgres Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/postgres-setup)
  - [Redshift Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/redshift-setup)
  - [Snowflake Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/snowflake-setup)

After you add your data warehouse as a source, you can [add a model](#step-2-add-a-model) to your source.

## Step 2: Add a model
Models are SQL queries that define sets of data you want to synchronize to your Reverse ETL destinations. After you add your source, you can add a model.

> info "Use Segment's dbt extension to centralize model management and versioning"
> Users who set up a BigQuery, Databricks, Postgres, Redshift, or Snowflake source can use Segment's [dbt extension](/docs/segment-app/extensions/dbt/) to centralize model management and versioning, reduce redundancies, and run CI checks to prevent breaking changes. 
>
> Extensions is currently in public beta and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}. During Public Beta, Extensions is available for Team and Developer plans only. [Reach out to Segment](mailto:friends@segment.com) if you're on a Business Tier plan and would like to participate in the Public Beta.

To add your first model:
1. Navigate to **Connections > Sources** and select the **Reverse ETL** tab. Select your source and click **Add Model**.
2. Click **SQL Editor** as your modeling method. (Segment will add more modeling methods in the future.)
3. Enter the SQL query that’ll define your model. Your model is used to map data to your Reverse ETL destinations.
4. Choose a column to use as the unique identifier for each record in the **Unique Identifier column** field.
    * The Unique Identifier should be a column with unique values per record to ensure checkpointing works as expected. It can potentially be a primary key. This column is used to detect new, updated, and deleted records.
5. Click **Preview** to see a preview of the results of your SQL query. The data from the preview is extracted from the first 10 records of your warehouse.
    * Segment caches preview queries and result sets in the UI, and stores the preview cache at the source level. If you make two queries for the same source, Segment returns identical preview results. However, during the next synchronization, the latest data will be sent to the connected destinations.
6. Click **Next**.
7. Enter your **Model Name**.
8. Click **Create Model**.

To add multiple models to your source, repeat steps 1-8 above.

### Edit your model

To edit your model:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the source and the model you want to edit.
3. On the overview tab, click **Edit** to edit your query.
4. Click the **Settings** tab to edit the model name or change the schedule settings.  

## Step 3: Add a destination
Once you’ve added a model, you need to add a destination. In Reverse ETL, destinations are the business tools or apps you use that Segment syncs the data from your warehouse to.

Reverse ETL supports 30+ destinations: see all destinations listed in the [Reverse ETL catalog](/docs/connections/reverse-etl/reverse-etl-catalog/). If the destination you want to send data to is not listed in the Reverse ETL catalog, use the [Segment Connections Destination](/docs/connections/reverse-etl/reverse-etl-catalog/#segment-connections-destination) to send data from your Reverse ETL warehouse to your destination.

Engage users can use the [Segment Profiles Destination](/docs/connections/destinations/catalog/actions-segment-profiles/) to create and update [Profiles](/docs/unify/) that can then be accessed through [Profile API](/docs/unify/profile-api/) and activated within [Twilio Engage](/docs/engage). 

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
After you’ve added a destination, you can create mappings from your warehouse to the destination. Mappings enable you to map the data you extract from your warehouse to the fields in your destination.

To create a mapping:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the destination that you want to create a mapping for.  
3. Click **Add Mapping**.
4. Select the model to sync from.
5. Select the **Action** you want to sync and click **Next**.
      * Actions determine the information sent to the destination. The list of Actions will be unique to each destination.
6. Add the mapping's name. The initial name will default to the Action's name (for example, 'Track Event') but is completely customizable. It will allow you to identify the mapping amongst others.
7. In the **Select record to map and send** section, select which records to send to your destination after Segment completes extracting data based on your model. You can choose from:
      * Added records
      * Updated records
      * Added or updated records
      * Deleted records
8. Select a test record to preview the fields that you can map to your destination in the **Add test record** field.
9. Select the Schedule type for the times you want the model’s data to be extracted from your warehouse. You can choose from:
    * **Interval**: Extractions perform based on a selected time cycle.
    * **Day and time**: Extractions perform at specific times on selected days of the week.
10. Select how often you want the schedule to sync in **Schedule configuration**.
    * For an **Interval** schedule type, you can choose from: 15 minutes, 30 minutes, 1 hour, 2 hours, 4 hours, 6 hours, 8 hours, 12 hours, 1 day.
        * 15 minutes is considered real-time for warehouse syncs
    * For a **Day and time** schedule type, you can choose the day(s) you’d like the schedule to sync as well as the time.
        * You can only choose to start the extraction at the top of the hour.
        * Scheduling multiple extractions to start at the same time inside the same data warehouse causes extraction errors.
11. Define how to map the record columns from your model to your destination in the **Select Mappings** section.
    * You map the fields that come from your source to fields that the destination expects to find. Fields on the destination side depend on the type of action selected.
    * If you're setting up a destination action, depending on the destination, some mapping fields may require data to be in the form of an object or array. See the [supported objects and arrays for mapping](/docs/connections/reverse-etl/manage-retl/#supported-object-and-arrays).
    * *(Optional)* Click **Suggest Mappings** to get suggested mappings. Learn more about [suggested mappings](#suggested-mappings).
12. *(Optional)* Send a test record to verify the mappings correctly send to your destination.
13. Click **Create Mapping**.
14. Select the destination you’d like to enable on the **My Destinations** page under **Reverse ETL > Destinations**.
15. Turn the toggle on for the **Mapping Status**. Events that match the trigger condition in the mapping will be sent to the destination.
    * If you disable the mapping state to the destination, events that match the trigger condition in the mapping won’t be sent to the destination.

To add multiple mappings from your warehouse to your destination, repeat steps 1-13 above.

### Suggested mappings

> info ""
> Suggested mappings is fully available for RETL mappings. 

Segment offers suggested mappings that automatically propose relevant destination fields for both model columns and payload elements. For example, if your model includes a column or payload field named `transaction_amount`, the feature might suggest mapping it to a destination field like `Amount` or `TransactionValue`. This automation, powered by intelligent autocompletion, matches and identifies near-matching field names to streamline the setup. For more information, see [Segment's suggested mappings blogpost](https://segment.com/blog/ai-assisted-magical-mappings/){:target="_blank”} and the [Suggested Mappings Nutrition Label](/docs/connections/reverse-etl/suggested-mappings-nutrition-facts). 

> warning ""
> Review the suggested mappings for accuracy before finalizing them as the suggestions aren't guaranteed to be 100% accurate. 

### Edit your mapping

To edit your mapping:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the destination and the mapping you want to edit.
3. Select the **...** three dots and click **Edit mapping**. If you want to delete your mapping, select **Delete**.

## Using Reverse ETL
After you've set up your source, model, destination, and mappings for Reverse ETL, your data will extract and sync to your destination(s) right away if you chose an interval schedule. If you set your data to extract at a specific day and time, the extraction will take place then.