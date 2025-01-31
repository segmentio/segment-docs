---
title: Databricks for Profiles Sync
plan: unify
---

With Databricks for Profiles Sync, you can use [Profiles Sync](/docs/unify/profiles-sync/overview/) to sync Segment profiles into your Databricks Lakehouse.
 

## Getting started

Before getting started with Databricks Profiles Sync, note the following prerequisites for setup.

- The target Databricks workspace must be Unity Catalog enabled. Segment doesn't support the Hive metastore. Visit the Databricks guide [enabling the Unity Catalog](https://docs.databricks.com/en/data-governance/unity-catalog/enable-workspaces.html){:target="_blank"} for more information. 
- Segment creates [managed tables](https://docs.databricks.com/en/data-governance/unity-catalog/create-tables.html#managed-tables){:target="_blank"} in the Unity catalog. 
- Segment supports only [OAuth (M2M)](https://docs.databricks.com/en/dev-tools/auth/oauth-m2m.html){:target="_blank"}  for authentication.

### Warehouse size and performance 

A SQL warehouse is required for compute. Segment recommends a warehouse with the the following characteristics:
  - **Size**: small
  - **Type** Serverless otherwise Pro
  - **Clusters**: Minimum of 2 - Maximum of 6


> success ""
> To improve the query performance of the Delta Lake, Segment recommends creating compact jobs per table using OPTIMIZE following [Databricks recommendations](https://docs.databricks.com/en/delta/optimize.html#){:target="_blank"}. 

> info ""
> Segment recommends manually starting your SQL warehouse before setting up your Databricks destination. If the SQL warehouse isn't running, Segment attempts to start the SQL warehouse to validate the connection and may experience a timeout when you hit the **Test Connection** button during setup.

 
## Set up Databricks for Profiles Sync

1. From your Segment app, navigate to **Unify > Profiles Sync**.
2. Click **Add Warehouse**.
3. Select **Databricks** as your warehouse type.
4. Use the following steps to [connect your warehouse](#connect-your-databricks-warehouse).


## Connect your Databricks warehouse

Use the five steps below to connect to your Databricks warehouse. 

> warning ""
> To configure your warehouse, you'll need read and write permissions.

### Step 1: Name your schema

Pick a name to help you identify this space in the warehouse, or use the default name provided. You can't change this name once the warehouse is connected.

### Step 2: Enter the Databricks compute resources URL

You'll use the Databricks workspace URL, along with Segment, to access your workspace API. 

Check your browser's address bar when inside the workspace. The workspace URL should resemble: `https://<workspace-deployment-name>.cloud.databricks.com`. Remove any characters after this portion and note the URL for later use.

### Step 3: Enter a Unity catalog name 

This catalog is the target catalog where Segment lands your schemas and tables. 
1. Follow the [Databricks guide for creating a catalog](https://docs.databricks.com/en/data-governance/unity-catalog/create-catalogs.html#create-a-catalog){:target="_blank"}. Be sure to select the storage location created earlier. You can use any valid catalog name (for example, "Segment"). Note this name for later use. 
2. Select the catalog you've just created. 
    1. Select the Permissions tab, then click **Grant**. 
    2. Select the Segment service principal from the dropdown, and check `ALL PRIVILEGES`.
    3. Click **Grant**.

### Step 4: Add the SQL warehouse details from your Databricks warehouse

Next, add SQL warehouse details about your compute resource. 
- **HTTP Path**: The connection details for your SQL warehouse.
- **Port**: The port number of your SQL warehouse.


### Step 5: Add the service principal client ID and client secret
 
Segment uses the service principal to access your Databricks workspace and associated APIs.

**Service principal client ID**: Follow the [Databricks guide for adding a service principal to your account](https://docs.databricks.com/en/administration-guide/users-groups/service-principals.html#manage-service-principals-in-your-account){:target="_blank"}. This name can be anything, but Segment recommends something that identifies the purpose (for example, "Segment Profiles Sync").  Segment doesn't require `Account admin` or `Marketplace admin` roles.

The service principal needs the following setup:
  - [Catalog-level privileges](https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/privileges.html#general-unity-catalog-privilege-types){:target="_blank"} which include:
    - USE CATALOG
    - USE SCHEMA
    - MODIFY
    - SELECT
    - CREATE SCHEMA
    - CREATE TABLE
  - Databricks [SQL access entitlement](https://docs.databricks.com/en/administration-guide/users-groups/service-principals.html#manage-workspace-entitlements-for-a-service-principal){:target="_blank"} at the workspace level.
  - [CAN USE permissions](https://docs.databricks.com/en/security/auth-authz/access-control/sql-endpoint-acl.html#sql-warehouse-permissions){:target="_blank"} on the SQL warehouse that will be used for the sync.


**Client secret**: Follow the [Databricks instructions to generate an OAuth secret](https://docs.databricks.com/en/dev-tools/authentication-oauth.html#step-2-create-an-oauth-secret-for-a-service-principal){:target="_blank"}.


Once you've configured your warehouse, test the connection and click **Next**.

## Set up selective sync

With selective sync, you can choose exactly which tables you want synced to the Databricks warehouse. Segment syncs materialized view tables as well by default.

Select tables to sync, then click **Next**. Segment creates the warehouse and connects databricks to your Profiles Sync space.

You can view sync status, and the tables you're syncing from the Profiles Sync overview page.


Learn more about [using selective sync](/docs/unify/profiles-sync/#using-selective-sync) with Profiles Sync.


