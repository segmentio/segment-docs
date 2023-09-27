---
title: Databricks Delta Lake Destination (Azure Setup)

---

Use the Databricks destination to ingest event data from Segment into the bronze layer of your Delta Lake hosted in Databricks/Azure (ADLS Gen 2).

This page will help you connect the Databricks Destination with Azure. 

## Prerequisites
 
Please note the following pre-requisites for setup.

1. The target Databricks workspace must be Unity Catalog enabled. Segment doesn't support the Hive megastore. Visit the Databricks guide for [enabling Unity Catalog](https://learn.microsoft.com/en-us/azure/databricks/data-governance/unity-catalog/enable-workspaces){:target="_blank"} for more info.
2. The user completing setup needs the following permissions:
- **Azure**: Ability to create service principals, as well as create and manage the destination storage container and its associated role assignments.
- **Databricks**: Admin access to the account and workspace level.

## Key terms

As you set up Databricks, keep the following key terms in mind. 

1. **Databricks Workspace URL**: The base URL for your Databricks workspace.
2. **Target Unity Catalog**: The catalog where Segment lands your data.

## Set up Databricks with Azure

Use the following eight steps to setup your Databricks destination with Azure.

### Step 1: Find your Databricks Workspace URL 

Your Databricks Workspace URL is used by you and Segment to access your workspace API.

Check your browser's address bar when in your workspace. The workspace URL will look something like: `https://<workspace-deployment-name>.azuredatabricks.net`. Remove any characters after this portion and note this value for later use. 

### Step 2: Add the Segment Storage Destinations service principal to your Entra ID (Active Directory) 

The service principal is used by Segment to access your Databricks workspace APIs as well as your ADLS Gen2 storage container. You can use either Azure PowerShell or the Azure CLI. 

1. **Recommended**: Azure PowerShell
    1. Log in to the Azure console with a user allowed to add new service principals.
    2. Open a Cloud Shell (first button to the right of the top search bar).
    3. Once loaded, enter the following command in the shell:

```
New-AzADServicePrincipal -applicationId fffa5b05-1da5-4599-8360-cc2684bcdefb
```

2. **(Alternative option)** Azure CLI
    1. Log into the Azure CLI using the [az login command](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli){:target="_blank"}.
    2. Once authenticated, run the following command:

```
az ad sp create --id fffa5b05-1da5-4599-8360-cc2684bcdefb
```

### Step 3: Update or create an ADLS Gen2 storage container 

The ADLS Gen2 storage container is where Segment lands your delta lake files. 

1. In the Azure console, navigate to **Storage accounts** and locate or create a new storage account to use for your Segment data.
2. Select the account, then select **Containers**.
3. Select or create a target container.
4. On the container view, select **Access Control (IAM)**, then navigate to the Role assignments tab.
5. Click **+ Add**, then select **Add role assignment**.
6. Search for and select "Storage Blob Data Contributor", then click next.
7. For "Assign access to" select **User, group, or service principal**.
8. Click **+ Select members**, then search for and select "Segment Storage Destinations".
9. Click **Review + assign**.

### Step 4: Add the Segment Storage Destinations service pricipal to the account/workspace 

This step allows Segment to access your workspace. 
1. Follow the Databricks [guide](https://learn.microsoft.com/en-us/azure/databricks/administration-guide/users-groups/service-principals#add-service-principals-to-your-account-using-the-account-console){:target="_blank"} for adding a service principal using the account console. 
- Segment recommends using "Segment Storage Destinations" for the name, though any identifier is allowed. 
- For the **UUID** enter `fffa5b05-1da5-4599-8360-cc2684bcdefb`.
- Segment doesn't require Account admin access.
2. Follow the Databricks guide for [adding a service principal to the workspace](https://learn.microsoft.com/en-us/azure/databricks/administration-guide/users-groups/service-principals#assign-a-service-principal-to-a-workspace-using-the-account-console){:target="_blank"}
- Use the service principal created at the account level above.
- Segment doesn't require Workspace admin access.

### Step 5: Enable entitlements for the service principal on the workspace 

This step allows the Segment service principal to create and use a small SQL warehouse to create and update table schemas in the Unity Catalog.

1. Follow the [managing workspace entitlements](https://learn.microsoft.com/en-us/azure/databricks/administration-guide/users-groups/service-principals#--manage-workspace-entitlements-for-a-service-principal){:target="_blank"} instructions for a service principal. Segment requires `Allow cluster creation` and `Databricks SQL access` entitlements.

### Step 6: Create an external location and storage credentials 

This step creates the storage location where Segment lands your Delta lake and the associated credentials Segment uses to access the storage. 
1. Follow the Databricks guide for [managing external locations and storage credentials](https://learn.microsoft.com/en-us/azure/databricks/data-governance/unity-catalog/manage-external-locations-and-credentials){:target="_blank"}. 
- Use the storage container that you updated in step 3.
- For storage credentials, you can use a service principal or managed identity.
2. Once you create the external location and storage credentials in your Databricks workspace, update the permissions to allow access to the Segment service principal. 
- In your workspace, navigate to **Data > External Data > Storage Credientials**. Click the name of the credentials created above and go to the Permissions tab. Click **Grant**, then select the Segment service principal from the drop down. Select the following checkboxes:
- `CREATE EXTERNAL TABLE`
- `READ FILES`
- `WRITE FILES`
3. Click **Grant**.

### Step 7: Create a new catalog in Unity Catalog and grant Segment permissions

This catalog is the target catalog where Segment lands your schemas/tables.

1. Follow the Databricks guide for [creating a catalog](https://learn.microsoft.com/en-us/azure/databricks/data-governance/unity-catalog/create-catalogs){:target="_blank"}. 
- Select the storage location you created earlier. The catalog name can be any valid catalog name (for example, "Segment"). Note this name for later use. 
2. Select the newly-created catalog. 
    1. Click the Permissions tab, then **Grant**. 
    2. Select the Segment service principal from the dropdown.
    3. Check `ALL PRIVILEGES`, then click **Grant**.
 
### Step 8: Setup the Databricks Delta Lake destination in Segment 

This step links a Segment source to your Databricks workspace/catalog.
1. Navigate to `https://app.segment.com/<WORKSPACE_SLUG>/destinations/catalog/databricks-delta-lake`. 
2. Click **Add Destination**, select a source, then click **Next**.
3. Enter the name for your destination, then click **Create destination**.
4. Enter the connection settings using the values noted above (leave the Service Principal fields blank).