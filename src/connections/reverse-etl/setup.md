---
title: Set up Reverse ETL
beta: false 
---

There are 4 components to Reverse ETL: Sources, Models, Destinations, and Mappings.

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
  - [Db2 Reverse ETL setup guide](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/db2-setup)
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
    * The Unique Identifier should be a column with unique values per record to ensure checkpointing works as expected. It can potentially be a primary key. This column is used to detect new, updated, and deleted records.
5. Click **Preview** to see a preview of the results of your SQL query. The data from the preview is extracted from the first 10 records of your warehouse.
    * Segment caches preview queries and result sets in the UI, and stores the preview cache at the source level.
6. Click **Next**.
7. Enter your **Model Name**.
8. Click **Create Model**.

### dbt model
Use Segment's dbt extension to centralize model management and versioning. Users who set up a BigQuery, Databricks, Postgres, Redshift, or Snowflake source can use Segment's [dbt extension](/docs/segment-app/extensions/dbt/) to centralize model management and versioning, reduce redundancies, and run CI checks to prevent breaking changes. 

> success " "
> If you use dbt Cloud with Reverse ETL, you can [create up to 5 mappings](#step-4-create-mappings) that use the sync strategy **dbt Cloud**, which extracts data from your warehouse and syncs it with your destination after a job in dbt Cloud is complete. 


## Step 3: Add a destination
In Reverse ETL, destinations are the business tools or apps you use that Segment syncs the data from your warehouse to. A model can have multiple destinations.

Reverse ETL supports the destinations in the [Reverse ETL catalog](/docs/connections/reverse-etl/reverse-etl-catalog/). If the destination you want to send data to is not listed in the Reverse ETL catalog, use the [Segment Connections Destination](/docs/connections/reverse-etl/reverse-etl-catalog/#segment-connections-destination) to send data from your Reverse ETL warehouse to your destination.

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
Mappings enable you to map the data you extract from your warehouse to the fields in your destination. A destination can have multiple mappings.

To create a mapping:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the destination that you want to create a mapping for.  
3. Click **Add Mapping**.
4. Select the model to sync from.
5. In the **Define sync behavior** section, select the **Action** you want to sync.
      * Actions determine the information sent to the destination. The list of Actions are unique to each destination.
6. Select which records to send to your destination after Segment completes extracting data based on your model.   
   * Some destinations have [sync modes](/docs/connections/destinations/#sync-modes), which let you specify how Segment should send data to the destination. Sync modes are unique to each destination. 
   * Destinations without sync modes let you select from the following options: 
     * Added records  
     * Updated records  
     * Added or updated records  
     * Deleted records
7. In the **Map fields** section, define how to map the record columns from your model to your destination. Map the fields that come from your source to fields that the destination expects to find. Fields on the destination side depend on the type of Action selected.  
   * If you’re setting up a Destination Action, some mapping fields might require data to be in the form of an object or array. See the [supported objects and arrays for mapping](docs/connections/reverse-etl/setup/#supported-object-and-arrays) for more information.  
   * _(Optional)_ Use the [Suggested Mappings](#suggested-mappings) feature to identify and match near-matching field names to streamline the field mapping process.
8. In the **Send test record section**, select a test record to preview the fields that you mapped to your destination. When you've verified that the records appear as expected, click **Next**. 
9. Enter a name for your mapping. The name initially defaults to the Action's name, for example, `Track Event`, but you can make changes to this default name.
10. Select how often you want Segment to sync your data under **Schedule configuration**.
    * **Interval**: Extractions perform based on a selected time cycle. Select one of the following options: 15 minutes, 30 minutes, 1 hour, 2 hours, 4 hours, 6 hours, 8 hours, 12 hours, 1 day.
    * **Day and time**: Extractions perform at specific times on selected days of the week.
11. Select the destination you’d like to enable on the **My Destinations** page under **Reverse ETL > Destinations**.
12. Turn the toggle on for the **Mapping Status**. Events that match the trigger condition in the mapping will be sent to the destination.
    * If you disable the mapping state to the destination, events that match the trigger condition in the mapping won’t be sent to the destination.

> success ""
> Use Segment's [Duplicate mappings](/docs/connections/destinations/actions/#duplicate-mappings) feature to create an exact copy of an existing mapping. The copied mapping has the same configurations and enrichments as your original mapping.

### Supported object and arrays 

When you set up destination actions in Reverse ETL, depending on the destination, some [mapping fields](/docs/connections/reverse-etl/setup/#step-4-create-mappings) may require data as an [object](/docs/connections/reverse-etl/manage-retl/#object-mapping) or [array](/docs/connections/reverse-etl/manage-retl/#array-mapping). 

#### Object mapping
You can send data to a mapping field that requires object data. An example of object mapping is an `Order completed` model with a `Products` column that’s in object format. 

Example: 

```json    
    {
        "product": {
            "id": 0001,
            "color": "pink",
            "name": "tshirt",
            "revenue": 20,
            "inventory": 500
        }
    }
```

To send data to a mapping field that requires object data, you can choose between these two options: 

Option | Details
------ | --------
Customize object | This enables you to manually set up the mapping fields with any data from the model. If the model contains some object data, you can select properties within the object to set up the mappings as well.
Select object | This enables you to send all nested properties within an object. The model needs to provide data in the format of the object. 

> success ""
> Certain object mapping fields have a fixed list of properties they can accept. If the names of the nested properties in your object don't match with the destination properties, the data won't send. Segment recommends you to use **Customize Object** to ensure your mapping is successful.


#### Array mapping
To send data to a mapping field that requires array data, the model must provide data in the format of an array of objects. An example is an `Order completed` model with a `Product purchased` column that’s in an array format.

Example: 

```json    
    [
    {
        "currency": "USD",
        "price": 40,
        "productName": "jacket",
        "purchaseTime": "2021-12-17 23:43:47.102",
        "quantity": 1
    },
    {
        "currency": "USD",
        "price": 5,
        "productName": "socks",
        "quantity": 2
    }
    ]
```    

To send data to a mapping field that requires array data, you can choose between these two options: 

Option | Details
------ | --------
Customize array | This enables you to select the specific nested properties to send to the destination. 
Select array | This enables you to send all nested properties within the array.

> success ""
> Certain array mapping fields have a fixed list of properties they can accept. If the names of the nested properties in your array don't match the destination properties, the data won't send. Segment recommends you to use the **Customize array** option to ensure your mapping is successful.

Objects in an array don't need to have the same properties. If a user selects a missing property in the input object for a mapping field, the output object will miss the property.

### Handling nested objects and arrays
Segment's warehouse pipeline flattens nested fields in context, traits, and properties. As part of this process, any nested arrays or objects within these fields are stringified when sent to downstream destinations with Reverse ETL.

If your destination expects specific fields to be formatted as arrays or objects rather than strings, you'll need to convert the data back to its original structure before mapping.

For example, in Snowflake, you can use the PARSE_JSON function to convert a stringified object or array back to proper JSON format:
```json 
SELECT PARSE_JSON(your_column) AS parsed_data
FROM your_table;
Reverse ETL supports reading data in JSON format and can properly convert it to objects or arrays for mapping. This ensures compatibility with destination schemas that require structured data.
```

### Null value management
You can choose to exclude null values from optional mapping fields in your syncs to some destinations. Excluding null values helps you maintain data integrity in your downstream destinations, as syncing a null value for an optional field may overwrite an existing value in your downstream tool.

For example, if you opt to sync null values with your destination and an end user fills out a form but chooses to leave an optional telephone number field blank, the existing telephone number you have on file in your destination could be overwritten with the null value. By opting out of null values for your downstream destination, you would preserve the existing telephone number in your destination.

By default, Segment syncs null values from mapped fields to your downstream destinations. Some destinations do not allow the syncing of null values, and will reject requests that contain them. Segment disables the option to opt out of syncing null values for these destinations.

To opt out of including null values in your downstream syncs:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the destination and the mapping you want to edit.
3. Click **Edit mapping**.
4. Under **Optional fields**, select the field you want to edit.
5. In the field dropdown selection, disable the **Sync null values** toggle.


## Initial sync for a given mapping
After you've set up your source, model, destination, and mappings for Reverse ETL, your data will extract and sync to your destination(s) right away if you chose an interval schedule. If you set your data to extract at a specific day and time, the extraction will take place then.

## Edit Reverse ETL syncs
### Edit your model

To edit your model:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the source and the model you want to edit.
3. On the overview tab, click **Edit** to edit your query.
4. Click the **Settings** tab to edit the model name or change the schedule settings.


### Suggested mappings

> info ""
> Suggested mappings is fully available for RETL mappings. 

Segment offers suggested mappings that automatically propose relevant destination fields for model columns and payload elements. For example, if your model includes a column or payload field named `transaction_amount`, the feature might suggest mapping it to a destination field like `Amount` or `TransactionValue`. This automation, powered by intelligent autocompletion, matches and identifies near-matching field names to streamline the mappings setup process. For more information, see [Segment's suggested mappings blog post](https://segment.com/blog/ai-assisted-magical-mappings/){:target="_blank”} and the [Suggested Mappings Nutrition Facts Label](/docs/connections/reverse-etl/suggested-mappings-nutrition-facts). 

> warning ""
> Review the suggested mappings for accuracy before finalizing them, as Segment can't guarantee all of the suggested mappings are accurate.

### Edit your mapping

To edit your mapping:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the destination and the mapping you want to edit.
3. Select the **...** three dots and click **Edit mapping**. If you want to delete your mapping, select **Delete**.
