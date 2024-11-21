---
title: Azure Reverse ETL Setup
---

Set up Azure as your Reverse ETL source.

At a high level, when you set up Azure dedicated SQL pools for Reverse ETL, the configured user needs read permissions for any resources (databases, schemas, tables) the query needs to access. Segment keeps track of changes to your query results with a managed schema (`__SEGMENT_REVERSE_ETL`), which requires the configured user to allow write permissions for that schema.

## Required permissions
Make sure the user you use to connect to Segment has permissions to use that warehouse. You can follow the process below to set up a new user with sufficient permissions for Segment’s use.

* To create a login in your master database, run:
    
    ```
    CREATE LOGIN <login name of your choice> WITH PASSWORD = 'Str0ng_password'; -- password of your choice
    ```
 
> info ""
> Execute the commands below in the database where your data resides. 

* To create a user for Segment, run: 

    ```
    CREATE USER <user name of your choice> FOR LOGIN <login name of your choice>;
    ```

* To grant access to the user to read data from all schemas in the database, run: 

    ```
    EXEC sp_addrolemember 'db_datareader', '<user name of your choice>';
    ```

* To grant Segment access to read from certain schemas, run: 

    ```
    CREATE ROLE <role name of your choice>;
    GRANT SELECT ON SCHEMA::[schema_name] TO <role name of your choice>;
    EXEC sp_addrolemember '<role name of your choice>', '<user name of your choice>';
    ```

* To grant Segment access to create a schema to keep track of the running syncs, run:

    ```
    GRANT CREATE SCHEMA TO <user name of your choice>;
    ```

* If you want to create the schema yourself and then give Segment access to it, run:

    ```
    CREATE SCHEMA  __segment_reverse_etl;
    GRANT CONTROL ON SCHEMA::__segment_reverse_etl TO <user name of your choice>;
    GRANT CREATE TABLE ON DATABASE::[database_name] TO <user name of your choice>;
    ```

## Set up guide
To set up Azure as your Reverse ETL source:
1. Log in to your Azure account.
2. Navigate to your **dedicated SQL pool**. Segment supports both dedicated SQL pool (formerly SQL DW) and dedicated SQL pool in Synapse workspace. 
3. Navigate to **Settings > Connection strings** and select the **JDBC** tab to find the server, port, and database name. 
4. Open [your Segment workspace](https://app.segment.com/workspaces){:target="_blank"}. 
5. Navigate to **Connections > Sources** and select the **Reverse ETL** tab. 
6. Click **+ Add Reverse ETL source**. 
7. Select **Azure** and click **Add Source**. 
8. Enter the configuration settings for your Azure source based on the information from Step 3. 
    * Hostname: 
        * Use `xxxxxxx.sql.azuresynapse.net` if you’re connecting to a dedicated SQL pool in Synapse workspace. 
        * Use `xxxxxxx.database.windows.net` if you’re connecting to a dedicated SQL pool (formerly SQL DW)
    * Port: `1433` (default)
    * Database name: The name of your dedicated SQL pool.
    * Username: The login name you created with `CREATE LOGIN` in the [required permissions](#required-permissions) section. 
    * Password: The password that's associated with the login name.
9. Click **Test Connection** to see if the connection works. If the connection fails, make sure you have the right permissions and credentials, then try again.
10. Click **Add source** if the test connection is successful. 

After you've successfully added your Azure source, [add a model](/docs/connections/reverse-etl/setup/#step-2-add-a-model) and follow the rest of the steps in the Reverse ETL setup guide. 

