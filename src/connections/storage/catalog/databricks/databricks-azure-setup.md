---
title: Databricks Destination Azure Setup

---

Use the Databricks destination to ingest event data from Segment into the bronze layer of your Delta Lake hosted in Databricks/Azure (ADLS Gen 2).

This page will help you connect the Databricks Destination with Azure. 

## Prerequisites

Please note the following pre-requisites for setup.

1. The target Databricks workspace must be Unity Catalog enabled. Segment doesn't support the Hive megastore. Visit Databrick's guide for [enabling Unity Catalog](https://learn.microsoft.com/en-us/azure/databricks/data-governance/unity-catalog/enable-workspaces){:target="_blank"} for more information.
2. The user or system completing setup needs the following permissions:
- **Azure**: Ability to create service principals, and create and manage the destination storage container and its associated role assignments.
- **Databricks**: Admin access to the account and workspace level.

## Key terms

As you go through the setup instructions below, keep the following key definititions in mind. 

1. **Databricks Workspace URL**: The base URL for your databricks workspace
2. **Target Unity Catalog**: The catalog where Segment lands your data

## Set up Databricks with Azure

Use the following steps to setup your Databricks destination with Azure.

### Find your Databricks Workspace URL 

Your Databricks Workspace URL is used by you and Segment to access your workspace API.
- Check your browser's address bar when in your workspace. The workspace URL will look something like: `https://<workspace-deployment-name>.azuredatabricks.net`. Remove any characters after this portion and note this value for later use. 
2. **Add the Segment Storage Destinations service principal to your Entra ID (Active Directory)**: This is used by Segment to access your Databricks workspace APIs as well as your ADLS Gen2 storage container. This can be done using either Azure PowerShell or the Azure CLI. 
- **Recommended**: Azure PowerShell
    - Log in to the Azure console with a user allowed to add new service principals.
    - Open a Cloud Shell (first button to the right of the top search bar)
    - Once loaded, enter the following command in the shell:
    
    ```
     New-AzADServicePrincipal -applicationId fffa5b05-1da5-4599-8360-cc2684bcdefb
    ```
- **(Alternative option)** Azure CLI
    1. Log into the Azure CLI using the [az login command](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli){:target="_blank"}.
    2. Once authenticated, run the following command:
    ```
    az ad sp create --id fffa5b05-1da5-4599-8360-cc2684bcdefb
    ```
3. **Update or create an ADLS Gen2 storage container**: This is where Segment lands your delta lake files. 
    1. In the Azure console, navigate to **Storage accounts** and locate or create a new storage account to use for your Segment data.
    2. Select the account, then select "Containers".
    3. Select or create the target container.
    4. On teh container view, select "Access Control (IAM)" and go to the Role assignments tab.
    5. Click **+ Add**, then select **Add role assignment**.
    6. Search for and select "Storage Blob Data Contributor", then click next.
    7. For "Assign access to" select "User, group, or service principal".
    8. Click **+ Select members**, search for and select "Segment Storage Destinations".
    9. Click **Review + assign**.
4. **Add the Segment Storage Destinations service pricipal to the account/workspace**: This allows Segment to access your workspace. 
    1. Follow the [Databricks guide](#){:target="_blank"} for adding a service principal using the account console. 
        - For the name, Segment recommends "Segment Storage Destinations" though any identifier is allowed. 
        - For **UUID** enter `fffa5b05-1da5-4599-8360-cc2684bcdefb`.
        - Segment doesn't require Account admin access.
    2. Follow the Databricks guide for adding a service principal to the workspace
        - Use the service principal created at the account level above.
        - Segment doesn't require Workspace admin access.
5. **Enable entitlements for the service principal on the workspace**: This allows the Segment service principal to create and use a small SQL warehouse which is used for creating and updating table schemas in the Unity Catalog.
    1. Follow the [Databricks guide](https://learn.microsoft.com/en-us/azure/databricks/administration-guide/users-groups/service-principals#--manage-workspace-entitlements-for-a-service-principal){:target="_blank"} for managing workspace entitlements for a service principal. Segment requires `Allow cluster creation` and `Databricks SQL access` entitlements.
6. **Create an external location and storage credentials**: This is the storage location where Segment lands your Delta lake and the associated credentials Segment uses to access the storage. 
    1. Follow the [Databricks guide](https://learn.microsoft.com/en-us/azure/databricks/data-governance/unity-catalog/manage-external-locations-and-credentials){:target="_blank"} for managing external locations and storage credentials. 
    - Use the storage container updated or created above.
    - For storage credentials, you can use a service principal or managed identity.
    2. Once the external location and storage credentials are created in your Databricks workspace, update the permissions to allow access to the Segment service principal.
    - In your workspace, navigate to **Data > External Data > Storage Credientials**. Click the name of the credentials created above and go to the Permissions tab. Click **Grant**, then select the Segment service principal from the drop down. Select the following checkboxes:
    - `CREATE EXTERNAL TABLE`
    - `READ FILES`
    - `WRITE FILES`
    Then click **Grant**.
7. **Create a new catalog in Unity Catalog and grant Segment permissions**: This is the target catalog where Segment lands your schemas/tables.
    1. Follow the [Databricks guide](https://learn.microsoft.com/en-us/azure/databricks/data-governance/unity-catalog/create-catalogs){:target="_blank"} for creating a catalog. 
    - Be sure to select the Storage location created earlier. The Catalog name can be any valid catalog name (for example, "Segment"). Note the catalog name for later use. 
    2. Select the newly-created catalog. Click the Permissions tab, then Grant. Select the Segment service principal from the dropdown, check `ALL PREVELEGES`, then click **Grant**.
8. **Setup the Databricks Delta Lake destination in Segment**: This links a Segment events source to your Databricks workspace/catalog.
    1. Navigate to `https://app.segment.com/<WORKSPACE_SLUG>/destinations/catalog/databricks-delta-lake`. 
    2. Click **Add Destination**, select a source, then click **Next**.
    3. Enter the name for your destination, then click **Create destination**.
    4. Enter the connection settings using the values noted above (leave the Service Principal fields blank).