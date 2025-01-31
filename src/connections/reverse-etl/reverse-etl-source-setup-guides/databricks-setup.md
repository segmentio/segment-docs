---
title: Databricks Reverse ETL Setup
---

Set up Databricks as your Reverse ETL source. 

At a high level, when you set up Databricks for Reverse ETL, the configured service-principal needs read permissions for any resources (databases, schemas, tables) the query needs to access. Segment keeps track of changes to your query results with a managed schema (`__SEGMENT_REVERSE_ETL`), which requires the configured service-principal to allow write permissions for that schema. Segment supports only OAuth (M2M) authentication. To generate a client ID and Secret, follow the steps listed in Databricks' [OAuth machine-to-machine (M2M) authentication](https://docs.databricks.com/en/dev-tools/auth/oauth-m2m.html){:target="_blank"} documentation.

> info "Databricks Reverse ETL sources support Segment's dbt extension"
> If you have an existing dbt account with a Git repository, you can use [Segment's dbt extension](/docs/segment-app/extensions/dbt/) to centralize model management and versioning, reduce redundancies, and run CI checks to prevent breaking changes.

## Required permissions
* Make sure the service principal you use to connect to Segment has permissions to use that warehouse. In the Databricks console go to **SQL warehouses** and select the warehouse you're using. Navigate to **Overview > Permissions** and make sure the service principal you use to connect to Segment has *can use* permissions.

* To grant access to read data from the tables used in the model query, run: 

    ```
    GRANT USAGE ON SCHEMA <schema_name> TO `<service principal you are using to connect to Segment>`; 
    GRANT SELECT, READ_METADATA ON SCHEMA <schema_name> TO `<service principal you are using to connect to Segment>`; 
    ```

* To grant Segment access to create a schema to keep track of the running syncs, run: 

    ```
    GRANT CREATE on catalog <name of the catalog, usually hive_metastore or main if using unity-catalog> TO `<service principal you are using to connect to Segment>`;
    ```

* If you want to create the schema yourself instead and then give Segment access to it, run:

    ```
    CREATE SCHEMA IF NOT EXISTS __segment_reverse_etl; 
    GRANT ALL PRIVILEGES ON SCHEMA __segment_reverse_etl TO `<service principal you are using to connect to Segment>`;
    ```

## Set up guide

To set up Databricks as your Reverse ETL source:

1. Log in to your Databricks account.
2. Navigate to **Workspaces** and select the workspace you want to use. 
3. Select **SQL** in the main navigation. 
4. Select **SQL Warehouses** and select the warehouse you want to use. Note that Segment doesn't support the `Compute` connection parameters.
5. Go to the **Connection details** tab and **keep** this page open.
6. Open [your Segment workspace](https://app.segment.com/workspaces){:target="_blank”}. 
7. Navigate to **Connections > Sources** and select the **Reverse ETL** tab.
8. Click **+ Add Reverse ETL source**. 
9. Select **Databricks** and click **Add Source**. 
10. Enter the configuration setting for your Databricks source based on information from step 5
    * Hostname: `adb-xxxxxxx.azuredatabricks.net`
    * Http Path: `/sql/1.0/warehouses/xxxxxxxxx`
    * Port: `443` (default)
    * Service principal client ID: `<your client ID>`
    * OAuth secret: `<OAuth secret used during connection>`
    * Catalog [optional]: If not specified, Segment will use the default catalog
11. Click **Test Connection** to see if the connection works. If the connection fails, make sure you have the right permissions and credentials, then try again.
12. Click **Add source** if the test connection is successful. 

> warning ""
> Segment previously supported token-based authentication, but now uses OAuth (M2M) authentication at the recommendation of Databricks.
> If you previously set up your source using token-based authentication, Segment will continue to support it. If you want to create a new source or update the connection settings of an existing source, Segment only supports [OAuth machine-to-machine (M2M) authentication](https://docs.databricks.com/en/dev-tools/auth/oauth-m2m.html){:target="_blank"}.

After you've successfully added your Databricks source, [add a model](/docs/connections/reverse-etl/setup/#step-2-add-a-model) and follow the rest of the steps in the Reverse ETL setup guide. 
