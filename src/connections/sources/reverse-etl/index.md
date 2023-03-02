---
title: Reverse ETL
beta: true
---

Reverse ETL (Extract, Transform, Load) extracts data from a data warehouse and loads it into a 3rd party destination. Reverse ETL allows you to connect your data warehouse to the tools that Marketing, Sales, Support, Product, Analytics, and other business teams use. For example, with Reverse ETL, you can sync rows from Snowflake to Salesforce. Reverse ETL supports event and object data. This includes customer profile data, subscriptions, product tables, shopping cart tables, and more.

As Segment is actively developing this feature, Segment welcomes your feedback on your experience with Reverse ETL. Click the button below to submit your feedback.

{% include components/button-fill.html modifier="expand" text="Submit feedback" href=" https://airtable.com/shriQgvkRpBCDN955" %}

## Example use cases
Use Reverse ETL when you want to:
* Sync lead scores created in the warehouse to Salesforce to customize interactions with prospects and optimize sales opportunities.
* Sync audiences and other data built in the warehouse to Braze, Iterable, Hubspot, or Salesforce Marketing Cloud for personalized marketing campaigns.
* Connect Google Sheets to a view in the warehouse for other business teams to have access to up-to-date reports.
* Sync enriched data to Mixpanel for a more complete view.
* Send data in the warehouse back into Segment as events that can be activated in all supported destinations, including Twilio Engage and other platforms.
* Pass offline or enriched data to conversion APIs like Facebook, Google Ads, TikTok, or Snapchat.

## Getting started
There are four components to Reverse ETL: Sources, Models, Destinations, and Mappings.

![Reverse ETL overview image](images/RETL_Doc_Illustration.png)

Follow these 4 steps to set up Reverse ETL and learn what each component is about:
1. [Add a Source](#step-1-add-a-source)
2. [Add a Model](#step-2-add-a-model)
3. [Add a Destination](#step-3-add-a-destination)
4. [Create Mappings](#step-4-create-mappings)

### Step 1: Add a Source
A Source is where your data originates from. Traditionally in Segment, a [Source](/docs/connections/sources/#what-is-a-source) is a website, server library, mobile SDK, or cloud application which can send data into Segment. In Reverse ETL, your data warehouse is the Source.

> info ""
> Reverse ETL supports [these sources] and Segment is actively working on adding more. If you'd like to request Segment to add a particular source, please note it on the [feedback form](https://airtable.com/shriQgvkRpBCDN955){:target="_blank"}.

To add your warehouse as a source:

> warning ""
> You need to be a user that has both read and write access to the warehouse.

1. Navigate to **Connections > Sources** and select the **Reverse ETL** tab in the Segment app.
2. Click **Add Source**.
<<<<<<< HEAD:src/reverse-etl/index.md
3. Select the source you want to add. You can choose between **BigQuery**, **Snowflake**, and **Redshift**.
=======
3. Select the source you want to add. 
>>>>>>> 892582b7c (reverse etl ga edits):src/connections/sources/reverse-etl/index.md
    * If you choose to use Snowflake, run the queries listed in the [Snowflake Reverse ETL setup guide](/docs/reverse-etl/snowflake-setup/) to set up the Segment Snowflake connector. Segment recommends using the `ACCOUNTADMIN` role to execute all the commands.
    * If you choose to use BigQuery, use the permissions outlined in the [BigQuery Reverse ETL setup guide](/docs/reverse-etl/bigquery-setup/), to create a Service Account and generate JSON credentials that will then be copied into the Segment UI when creating a Reverse ETL Source.
4. Add the account information for your source.  
    * For Snowflake users: Learn more about the Snowflake Account ID [here](https://docs.snowflake.com/en/user-guide/admin-account-identifier.html){:target="_blank"}.
5. Click **Test Connection** to test to see if the connection works.
6. Click **Create Source** if the test connection is successful.

After you add your data warehouse as a source, you can [add a model](#step-2-add-a-model) to your source.

### Step 2: Add a Model
Models are SQL queries that define sets of data you want to synchronize to your Reverse ETL destinations. After you add your source, you can add a model.

To add your first model:
1. Navigate to **Connections > Sources** and select the **Reverse ETL** tab. Select your source and click **Add Model**.
2. Click **SQL Editor** as your modeling method. (Segment will add more modeling methods in the future.)
3. Enter the SQL query that’ll define your model. Your model is used to map data to your Reverse ETL destinations.
4. Choose a column to use as the unique identifier for each row in the **Unique Identifier column** field.
    * The Unique Identifier should be a column with unique values per row to ensure checkpointing works as expected. It can potentially be a primary key. This column is used to detect new, updated, and deleted rows.
5. Click **Preview** to see a preview of the results of your SQL query. The data from the preview is extracted from the first 10 rows of your warehouse.
6. Click **Next**.
7. Enter your **Model Name**.
8. Select the Schedule type for the times you want the model’s data to be extracted from your warehouse. You can choose from:
    * **Interval**: Extractions perform based on a selected time cycle.
    * **Day and time**: Extractions perform at specific times on selected days of the week.
9. Select how often you want the schedule to sync in **Schedule configuration**.
    * For an **Interval** schedule type, you can choose from: 15 minutes, 30 minutes, 1 hour, 2 hours, 4 hours, 6 hours, 8 hours, 12 hours, 1 day.
        * 15 minutes is considered real-time for warehouse syncs
    * For a **Day and time** schedule type, you can choose the day(s) you’d like the schedule to sync as well as the time. You can only choose to sync the extraction at the top of the hour.
10. Click **Create Model**.

To add multiple models to your source, repeat steps 1-10 above.

### Step 3: Add a Destination
Once you’ve added a model, you need to add a destination. In Reverse ETL, destinations are the business tools or apps you use that Segment syncs the data from your warehouse to.

> info ""
> Depending on the destination, you may need to know certain endpoints and have specific credentials to configure the destination.  
>
> If you'd like to request Segment to add a particular destination, please note it on the [feedback form](https://airtable.com/shriQgvkRpBCDN955){:target="_blank"}.  

To add your first destination:
1. Navigate to **Reverse ETL > Destinations**.
2. Click **Add Destination**.
3. Select the destination you want to connect to.
4. Select the source you want to connect the destination to.
5. Enter the **Destination name** and click **Create Destination**.
6. Enter the required information on the **Settings** tab of the destination.

### Step 4: Create Mappings
After you’ve added a destination, you can create mappings from your warehouse to the destination. Mappings enable you to map the data you extract from your warehouse to the fields in your destination.

To create a mapping:
1. Go to the **Mappings** tab of the destination and click **Add Mapping**.
2. Select the model to sync from.
3. Select the **Action** you want to sync and click **Next**.
      * Actions determine the information sent to the destination. The list of Actions will be unique to each destination.
4. In the **Select record to map and send** section, select which records to send to your destination after Segment completes extracting data based on your model. You can choose from:
      * Added records
      * Updated records
      * Added or updated records
      * Deleted records
5. Select a test record to preview the fields that you can map to your destination in the **Add test record** field.
6. Define how to map the record columns from your model to your destination in the **Select Mappings** section.
      * You map the fields that come from your source, to fields that the destination expects to find. Fields on the destination side depend on the type of action selected.
7. Click **Create Mapping**.
8. Select the destination you’d like to enable on the **My Destinations** page under **Reverse ETL > Destinations**.
9. Turn the toggle on for the **Mapping State** to enable the destination. Events that match the trigger condition in the mapping will be sent to the destination.
    * If you disable the mapping state to the destination, events that match the trigger condition in the mapping won’t be sent to the destination.

To add multiple mappings from your warehouse to your destination, repeat steps 1-9 above.

## Using Reverse ETL
After you've followed [all four steps](/docs/reverse-etl/#getting-started) and set up your source, model, destination, and mappings for Reverse ETL, your data will extract and sync to your destination(s) right away if you chose an interval schedule. If you set your data to extract at a specific day and time, the extraction will take place then.

### Runs status and observability
You can check the status of your data extractions and see details of your syncs. You can click into failed records to view additional details on the error, sample payloads to help you debug the issue, and recommended actions.

To check the status of your extractions:
1. Navigate to **Reverse ETL > Destinations**.
2. Select the destination you want to view.
3. Select the mapping you want to view.  
4. Click the sync you want to view to get details of the sync. You can view:
    * The status of the sync
    * How long it took for the sync to complete
    * The load results - how many successful records were synced as well as how many records were updated, deleted, or are new.


### Edit your model

To edit your model:
1. Navigate to **Reverse ETL > Sources**.
2. Select the source with the model you want to edit.
3. On the overview tab, click **Edit** to edit your query.
4. Click the **Settings** tab to edit the model name or change the schedule settings.  

### Edit your mapping

To edit your mapping:
1. Navigate to **Reverse ETL > Destinations**.
2. Select the destination with the mapping you want to edit.
3. Select the **...** three dots and click **Edit mapping**. If you want to delete your mapping, select **Delete**.

## Usage limits
Processed Reverse ETL records are the total number of records Segment attempts to load to your downstream destinations, including those that fail to load. Your plan determines how many Reverse ETL records you can process in one monthly billing cycle. 

Plan | Number of Reverse ETL records you can process to each destination per month | 
---- | ---------------------------------------------------------------------------
Free | 500K 
Teams | 1 million
Business | 50 x the number of [MTUs](/docs/guides/usage-and-billing/mtus-and-throughput/#what-is-an-mtu) <br>or .25 x the number of monthly API calls

When your limit is reached before the end of your billing period, your syncs will pause and then resume on your next billing cycle. To increase the number of processed Reverse ETL records, connect with your sales representative to upgrade your plan. If you're on a Free plan, upgrade to the Teams plan in the Segmet app. 

To see how many records you’ve processed using Reverse ETL, navigate to **Settings > Usage & billing** and select the **Reverse ETL** tab. 



