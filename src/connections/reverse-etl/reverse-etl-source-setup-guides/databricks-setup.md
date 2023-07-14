---
title: Databricks Reverse ETL Setup
---

Set up Databricks as your Reverse ETL source. 

At a high level, when you set up Databricks for Reverse ETL, the configured user needs read permissions for any resources (databases, schemas, tables) the query needs to access. Segment keeps track of changes to your query results with a managed schema (`__SEGMENT_REVERSE_ETL`), which requires the configured user to allow write permissions for that schema.

## Required permissions
* To grant access to read data from the tables used in the model query, run: 

    ```
    GRANT USAGE ON SCHEMA <schema_name> TO `<user or service principal you are using to connect to Segment>`; 
    GRANT SELECT, READ_METADATA ON SCHEMA <schema_name> TO `<user or service principal you are using to connect to Segment>`; 
    ```

* To grant Segment access to create a schema to keep track of the running syncs, run: 

    ```
    GRANT CREATE on catalog <name of the catalog, usually hive_metastore or main if using unity-catalog> TO `<user or service principal you are using to connect to Segment>`;
    ```

* If you want to create the schema yourself instead and then give Segment access to it, run:

    ```
    CREATE SCHEMA IF NOT EXISTS __segment_reverse_etl; 
    GRANT ALL PRIVILEGES ON SCHEMA __segment_reverse_etl TO `<user or service principal you are using to connect to Segment>`;
    ```

## Set up guide

To set up Databricks as your Reverse ETL source:

1. Log in to your Databricks account.
2. Navigate to **Workspaces** and select the workspace you want to use. 
3. Select **SQL** in the main navigation. 
4. Select **SQL Warehouses** and select the warehouse you want to use. 
5. Go to the **Connection details** tab.
6. In a new tab on your browser, go to the Segment app. 
7. Navigate to **Connections > Sources > Reverse ETL**.
8. Click **+ Add Reverse ETL source**. 
9. Select **Databricks** and click **Add Source**. 
10. Enter the configuration settings for your Databricks source. 
    * Copy the Hostname, Http Path, and Port from the Databricks console from step 5. 
    * To generate a **Token**, follow the steps listed in the [Databricks docs](https://docs.databricks.com/dev-tools/auth.html#pat). Segment recommends you create a token with no expiration date by leaving the lifetime field empty when creating it. If you already have a token with an expiration date, be sure to keep track of the date and renew it on time.     
11. Click **Test Connection** to see if the connection works. If the connection fails, make sure you have the right permissions and credentials, then try again.
12. Click **Create Source** if the test connection is successful. 

Once you've added your Databricks source, [add a model](/docs/connections/reverse-etl/#step-2-add-a-model) and follow the rest of the steps in the Reverse ETL setup guide. 
