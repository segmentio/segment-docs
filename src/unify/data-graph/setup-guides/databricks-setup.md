---
title: Databricks Data Graph Setup
plan: unify
redirect_from:
  - '/unify/linked-profiles/setup-guides/databricks-setup'
---

> warning ""
> Data Graph, Reverse ETL, and Profiles Sync require different warehouse permissions.

On this page, you'll learn how to connect your Databricks data warehouse to Segment for the [Data Graph](/docs/unify/data-graph/data-graph/). 

## Databricks credentials

Segment assumes that you already have a workspace that includes the datasets you'd like to use for the Data Graph. Sign in to Databricks with admin permissions to create new resources and provide the Data Graph with the necessary permissions. 

## Step 1: Create a new Service Principal user
Segment recommends setting up a new Service Principal user and only giving this user permissions to access the required catalogs and schemas. 

If you already have a Service Principal user you'd like to use, grant it "Can use" permissions for your data warehouse and proceed to [Step 2](#step-2-create-a-catalog-for-segment-to-store-checkpoint-tables).

### 1a) Create a new Service Principal user
1. Log in to the Databricks UI as an Admin.
2. Click **User Management**. 
3. Select the **Service principals** tab. 
4. Click **Add Service Principal**.
5. Enter a Service Principal user name and click **Add**. 
6. Select the Service Principal user you just created and click **Generate secret**.
7. Save the **Secret** and **Client ID** to a safe place. You'll need these values to connect your Databricks warehouse to Segment. 
8. Navigate to Workspaces and select your Workspace. 
9. Select the “Permissions” tab and click **Add Permissions**. 
10. Add the newly created Service Principal user and click **Save**. 

### 1b) Add your Service Principal user to Warehouse User Lists 
1. Log in to the Databricks UI as an Admin.
2. Navigate to SQL Warehouses. 
3. Select your warehouse and click **Permissions**. 
4. Add the Service Principal user and grant them “Can use” access. 
5. Click **Add**. 

## Step 2: Create a catalog for Segment to store checkpoint tables

**Segment requires write access to this catalog for internal bookkeeping and to store checkpoint tables for the queries that are executed. Therefore, Segment recommends creating a new catalog for this purpose.** This is also the catalog you'll be required to specify when connecting Databricks with the Segment app.

> info ""
> Segment recommends creating a new database for the Data Graph.
> If you choose to use an existing database that has also been used for [Segment Reverse ETL](/docs/connections/reverse-etl/), you must follow the [additional instructions](#update-user-access-for-segment-reverse-etl-catalog) to update user access for the Segment Reverse ETL catalog.

```sql
CREATE CATALOG IF NOT EXISTS `SEGMENT_LINKED_PROFILES_DB`;
-- Copy the saved Client ID from previously generated secret
GRANT USAGE ON CATALOG `SEGMENT_LINKED_PROFILES_DB` TO `${client_id}`;
GRANT CREATE ON CATALOG `SEGMENT_LINKED_PROFILES_DB` TO `${client_id}`;
GRANT SELECT ON CATALOG `SEGMENT_LINKED_PROFILES_DB` TO `${client_id}`;
```

## Step 3: Grant read-only access to the Profiles Sync catalog

Run the following SQL to grant the Data Graph read-only access to the Profiles Sync catalog:

```sql
GRANT USAGE, SELECT, USE SCHEMA ON CATALOG `${profiles_sync_catalog}` TO `${client_id}`;
```

## Step 4: Grant read-only access to additional catalogs for the Data Graph
Run the following SQL to grant your Service Principal user read-only access to any additional catalogs you want to use for the Data Graph.

```sql 
-- ********** REPEAT THIS COMMAND FOR EACH CATALOG YOU WANT TO USE FOR THE DATA GRAPH **********
GRANT USAGE, SELECT, USE SCHEMA ON CATALOG `${catalog}` TO `${client_id}`;
```

## (Optional) Step 5: Restrict read-only access to schemas

Restrict access to specific schemas by running the following SQL:

```sql
GRANT USAGE ON CATALOG `${catalog}` TO `${client_id}`;
USE CATALOG `${catalog}`;
GRANT USAGE, SELECT ON SCHEMA `${schema_1}` TO `${client_id}`;
GRANT USAGE, SELECT ON SCHEMA `${schema_2}` TO `${client_id}`;
...
```

## Step 6: Validate the permissions of your Service Principal user

Sign in to the [Databricks CLI with your Client ID secret](https://docs.databricks.com/en/dev-tools/cli/authentication.html#oauth-machine-to-machine-m2m-authentication){:target="_blank"} and run the following SQL to verify the Service Principal user has the correct permissions for a given table. 

> success ""
> If this command succeeds, you can view the table. 

```sql
USE DATABASE ${linked_read_only_database} ;
SHOW SCHEMAS;
SELECT * FROM ${schema}.${table} LIMIT 10;
```

## Step 7: Connect your warehouse to Segment

To connect your warehouse to the Data Graph:

1. Navigate to **Unify > Data Graph**. This should be a Unify space with Profiles Sync already set up.
2. Click Connect warehouse.
3. Select Databricks as your warehouse type. 
4. Enter your warehouse credentials. You can find these details in your Databricks workspace by navigating to **SQL Warehouse > Connection details**. Segment requires the following settings to connect to your Databricks warehouse:
- **Hostname**: The address of your Databricks server
- **Http Path**: The address of your Databricks compute resources
- **Port**: The port used to connect to your Databricks warehouse. The default port is 443, but your port might be different 
- **Catalog**: The catalog you designated in [Step 2](#step-2-create-a-catalog-for-segment-to-store-checkpoint-tables)
- **Service principal client ID**: The client ID used to access to your Databricks warehouse
- **OAuth secret**: The OAuth secret used to connect to your Databricks warehouse

5. Test your connection, then click Save. 

## Update user access for Segment Reverse ETL catalog
If Segment Reverse ETL has ever run in the catalog you are configuring as the Segment connection catalog, a Segment-managed schema is already created and you need to provide the new Segment user access to the existing catalog. Run the following SQL if you run into an error on the Segment app indicating that the user doesn’t have sufficient privileges on an existing `_segment_reverse_etl` catalog.

```sql
GRANT ALL PRIVILEGES ON SCHEMA ${segment_internal_catalog}.__segment_reverse_etl TO `${client_id}`;
```
