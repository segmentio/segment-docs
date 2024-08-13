---
title: Databricks Destination 
public: true

---
{% include content/warehouse-ip.html %}

With the Databricks Destination, you can ingest event data directly from Segment into your Databricks Lakehouse.

This page will help you get started with syncing Segment events into your Databricks Lakehouse.

> success ""
> Segment has certified the destination for Databricks on AWS and Azure.

 
## Getting started

Before getting started with the Databricks Destination, note the following prerequisites.

- The target Databricks workspace must be Unity Catalog enabled. Segment doesn't support the Hive metastore. Visit the Databricks guide [enabling the Unity Catalog](https://docs.databricks.com/en/data-governance/unity-catalog/enable-workspaces.html){:target="_blank"} for more information. 
- Segment creates [managed tables](https://docs.databricks.com/en/data-governance/unity-catalog/create-tables.html#managed-tables){:target="_blank"} in the Unity catalog. The service account needs access to create schemas on the catalog and can delete, drop, or vacuum tables.
- Segment supports only [OAuth (M2M)](https://docs.databricks.com/en/dev-tools/auth/oauth-m2m.html){:target="_blank"}  for authentication.

> success ""
> Segment recommends that you enable Warehouse Selective Sync. This feature enables customization of collections and properties sent to the warehouse. By syncing only relevant and required data, it reduces sync duration and compute costs, optimizing efficiency compared to syncing everything. Learn more about [Warehouse Selective Sync](/docs/connections/storage/warehouses/warehouse-syncs/#warehouse-selective-sync).

### Warehouse size

A [SQL warehouse is required](https://docs.databricks.com/en/compute/sql-warehouse/warehouse-behavior.html#sizing-a-serverless-sql-warehouse){:target="_blank"} for compute. Segment recommends a warehouse with the following characteristics:
  - **Size**: small
  - **Type** Serverless otherwise Pro
  - **Clusters**: Minimum of 2 - Maximum of 6

> success ""
> Segment recommends manually starting your SQL warehouse before setting up your Databricks destination. If the SQL warehouse isn't running, Segment attempts to start the SQL warehouse to validate the connection and may experience a timeout when you hit the **Test Connection** button during setup.
 
## Set up Databricks in Segment

Use the following steps to set up Databricks in Segment:

1. Navigate to **Connections > Catalog**.
2. Select the **Destinations** tab.
3. Under Connection Type, select **Storage**, and click on the **Databricks storage** tile.
4. (Optional) Select a source(s) to connect to the destination.
5. Follow the steps below to [connect your Databricks warehouse](#connect-your-databricks-warehouse).

## Connect your Databricks warehouse

Use the five steps below to connect to your Databricks warehouse. 

> warning ""
> You'll need read and write warehouse permissions for Segment to write to your database.

### Step 1: Name your destination

Add a name to help you identify this warehouse in Segment. You can change this name at any time by navigating to the destination settings (**Connections > Destinations > Settings**) page.

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


### Step 5: Add the service principal client ID and OAuth secret

> warning ""
> Be sure to note the principal ID and the OAuth secret Databricks generates, as you'll need to enter them in this step.

Segment uses the service principal to access your Databricks workspace and associated APIs.
1. Follow the [Databricks guide for adding a service principal to your account](https://docs.databricks.com/en/administration-guide/users-groups/service-principals.html#manage-service-principals-in-your-account){:target="_blank"}. This name can be anything, but Segment recommends something that identifies the purpose (for example, "Segment Storage Destinations"). Note the principal application ID that Databricks generates to use in this step. Segment doesn't require Account admin or Marketplace admin roles.
2. Follow the [Databricks instructions to generate an OAuth secret](https://docs.databricks.com/en/dev-tools/authentication-oauth.html#step-2-create-an-oauth-secret-for-a-service-principal){:target="_blank"}. Note the secret generated by Databricks to use in this step. Once you navigate away from this page, the secret is no longer visible. If you lose or forget the secret, delete the existing secret and create a new one. 


Once connected, you'll see a confirmation screen with next steps and more info on using your warehouse.

{% include content/storage-do-include.md %}