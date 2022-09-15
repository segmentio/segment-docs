---
title: Set Up Segment Data Lakes
redirect_from: '/connections/destinations/catalog/data-lakes/'
---
{% include content/plan-grid.md name="data-lakes" %}


Segment Data Lakes provide a way to collect large quantities of data in a format that's optimized for targeted data science and data analytics workflows. You can read [more information about Data Lakes](/docs/connections/storage/data-lakes/) and learn [how they differ from Warehouses](/docs/connections/storage/data-lakes/comparison/) in Segment's Data Lakes documentation.

> note "Lake Formation"
> You can also set up your Segment Data Lakes using [Lake Formation](/docs/connections/storage/data-lakes/lake-formation/), a fully managed service built on top of the AWS Glue Data Catalog.

## Set up Segment Data Lakes

To set up Segment Data Lakes, create your AWS resources, enable the Segment Data Lakes destination in the Segment app, and verify that your Segment data synced to S3 and Glue.

### Prerequisites

Before you set up Segment Data Lakes, you need the following resources:

- An [AWS account](https://aws.amazon.com/account/){:target="_blank”}
- An [Amazon S3 bucket](https://github.com/terraform-aws-modules/terraform-aws-s3-bucket){:target="_blank”} to receive data and store logs
- A subnet within a VPC for the EMR cluster to run in

### Step 1 - Set up AWS resources

You can use the [open source Terraform module](https://github.com/segmentio/terraform-aws-data-lake){:target="_blank”} to automate much of the set up work to get Data Lakes up and running. If you’re familiar with Terraform, you can modify the module to meet your organization’s needs, however Segment guarantees support only for the template as provided. The Data Lakes set up uses Terraform v0.12+. To support more versions of Terraform, the AWS provider must use v4, which is included in the example main.tf.

You can also use Segment's [manual set up instructions](/docs/connections/storage/data-lakes/data-lakes-manual-setup) to configure these AWS resources if you prefer.

The Terraform module and manual set up instructions both provide a base level of permissions to Segment (for example, the correct IAM role to allow Segment to create Glue databases on your behalf). If you want stricter permissions, or other custom configurations, you can customize these manually.

### Step 2 - Enable Data Lakes destination

After you set up the necessary AWS resources, the next step is to set up the Data Lakes destination within Segment:

1. In the [Segment App](https://app.segment.com/goto-my-workspace/overview), click **Add Destination**, then search for and select **Data Lakes**.

2. Click **Configure Data Lakes** and select the source to connect to the Data Lakes destination.
  **Warning**:You must add the Workspace ID to the external ID list in the IAM policy, or else the source data cannot be synced to S3.

3. In the Settings tab, enter and save the following connection settings:
   - **AWS Region**: The AWS Region where your EMR cluster, S3 Bucket and Glue DB reside. Ex: `us-west-2`
   - **EMR Cluster ID**: The EMR Cluster ID where the Data Lakes jobs will be run.
   - **Glue Catalog ID**: The Glue Catalog ID (this must be the same as your AWS account ID).
   - **IAM Role ARN**: The ARN of the IAM role that Segment will use to connect to Data Lakes. Ex: `arn:aws:iam::000000000000:role/SegmentDataLakeRole`
   - **S3 Bucket**: Name of the S3 bucket used by Data Lakes. The EMR cluster will store logs in this bucket. Ex: `segment-data-lake`

   You must individually connect each source to the Data Lakes destination. However, you can copy the settings from another source by clicking **…** ("more") (next to the button for “Set up Guide”).

4. _(Optional)_ **Date Partition**: Optional advanced setting to change the date partition structure, with a default structure `day=<YYYY-MM-DD>/hr=<HH>`. To use the default, leave this setting unchanged. To partition the data by a different date structure, choose one of the following options:
  - Day/Hour [YYYY-MM-DD/HH] (Default)
  - Year/Month/Day/Hour [YYYY/MM/DD/HH]
  - Year/Month/Day [YYYY/MM/DD]
  - Day [YYYY-MM-DD]

5. _(Optional)_ **Glue Database Name**: Optional advanced setting to change the name of the Glue Database which is set to the source slug by default. Each source connected to Data Lakes must have a different Glue Database name otherwise data from different sources will collide in the same database.

6. Enable the Data Lakes destination by clicking the toggle near the **Set up Guide** button.

Once the Data Lakes destination is enabled, the first sync will begin approximately 2 hours later.


### Step 3 - Verify data is synced to S3 and Glue

You will see event data and [sync reports](/docs/connections/storage/data-lakes/sync-reports) populated in S3 and Glue after the first sync successfully completes. However if an [insufficient permission](/docs/connections/storage/data-lakes/sync-reports/#insufficient-permissions) or [invalid setting](/docs/connections/storage/data-lakes/sync-reports/#invalid-settings) is provided during set up, the first data lake sync will fail.

To be alerted of sync failures by email, subscribe to the `Storage Destination Sync Failed` activity email notification within the App Settings > User Preferences > [Notification Settings](https://app.segment.com/goto-my-workspace/settings/notifications){:target="_blank”}.


`Sync Failed` emails are sent on the 1st, 5th and 20th sync failure. Learn more about the types of errors which can cause sync failures [here](/docs/connections/storage/data-lakes/sync-reports/#sync-errors).


### (Optional) Step 4 - Replay historical data

If you want to add historical data to your data set using a [replay of historical data](/docs/guides/what-is-replay/) into Data Lakes, [contact the Segment Support team](https://segment.com/help/contact/){:target="_blank”} to request one.

The time needed to process a Replay can vary depending on the volume of data and number of events in each source. If you decide to run a Replay, Segment recommends that you start with data from the last six months to get started, and then replay additional data if you find you need more.

Segment creates a separate EMR cluster to run replays, then destroys it when the replay finishes. This ensures that regular Data Lakes syncs are not interrupted, and helps the replay finish faster.

## Set up Azure Data Lakes

> info " "
> Azure Data Lakes is currently in Public Beta.

To set up Azure Data Lakes, create your Azure resources and then enable the Data Lakes destination in the Segment app.

### Prerequisites

Before you can configure your Azure resources, you must complete the following prerequisites:
- [Create an Azure subscription](https://azure.microsoft.com/en-us/free/){:target="_blank”}
- [Create an Azure resource group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal#create-resource-groups){:target="_blank”}
- Create an account with `Microsoft.Authorization/roleAssignments/write` permissions
- Configure the [Azure Command Line Interface (Azure CLI)](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli){:target="_blank”}

### Step 1 - Create an ALDS-enabled storage account

1. Sign in to your [Azure environment](https://portal.azure.com){:target="_blank”}. 
2. From the [Azure home page](https://portal.azure.com/#home){:target="_blank”}, select **Create a resource**.
3. Search for and select **Storage account**. 
4. On the Storage account resource page, select the **Storage account** plan and click **Create**. 
5. On the **Basic** tab, select an existing subscription and resource group, give your storage account a name, and update any necessary instance details. 
6. Click **Next: Advanced**.
7. On the **Advanced Settings** tab in the Security section, select the following options:
  - Require secure transfer for REST API operations
  - Enable storage account key access
  - Minimum TLS version: Version 1.2
8. In the Data Lake Storage Gen2 section, select **Enable hierarchical namespace**. In the Blob storage selection, select the **Hot** option. 
9. Click **Next: Networking**.
10. On the **Networking** page, select **Disable public access and use private access**.
11. Click **Review + create**. Take note of your location and storage account name, and review your chosen settings. When you are satisfied with your selections, click **Create**.
12. After your resource is deployed, click **Go to resource**.
13. On the storage account overview page, select the **Containers** button in the Data storage tab.
14. Select **Container**. Give your container a name, and select the **Private** level of public access. Click **Create**. 

> warning " "
> Before continuing, note the Location, Storage account name, and the Azure storage container name: you'll need this information when configuring the Azure Data Lakes destination in the Segment app.

### Step 2 - Set up Key Vault

1. From the [home page of your Azure portal](https://portal.azure.com/#home){:target="_blank”}, select **Create a resource**.
2. Search for and select **Key Vault**.
3. On the Key Vault resource page, select the **Key Vault** plan and click **Create**. 
4. On the **Basic** tab, select an existing subscription and resource group, give your Key Vault a name, and update the **Days to retain deleted vaults** setting, if desired. 
5. Click **Review + create**. 
6. Review your chosen settings. When you are satisfied with your selections, click **Review + create**.
7. After your resource is deployed, click **Go to resource**. 
8. On the Key Vault page, select the **Access control (IAM)** tab. 
9. Click **Add** and select **Add role assignment**.
10. On the **Roles** tab, select the `Key Vault Secrets User` role. Click **Next**.
11. On the **Members** tab, select a **User, group, or service principal**.
12. Click **Select members**.
13. Search for and select the `Databricks Resource Provider` service principal. 
14. Click **Select**.
15. Under the **Members** header, verify that you selected the Databricks Resource Provider. Click **Review + assign**.

### Step 3 - Set up Azure MySQL database

1. From the [home page of your Azure portal](https://portal.azure.com/#home){:target="_blank”}, select **Create a resource**.
2. Search for and select **Azure Database for MySQL**.
3. On the Azure Database for MySQL resource page, select the **Azure Database for MySQL** plan and click **Create**.
4. Select **Single server** and click **Create**.
5. On the **Basic** tab, select an existing subscription and resource group, enter server details and create an administrator account.
6. Click **Review + create**.
7. Review your chosen settings. When you are satisfied with your selections, click **Create**.
8. After your resource is deployed, click **Go to resource**.
9. From the resource page, select the **Connection security** tab.
10. Under the Firewall rules section, select **Yes** to allow access to Azure services, and click the **Allow current client IP address (xx.xxx.xxx.xx)** button to allow access from your current IP address.
11. Click **Save** to save the changes you made on the **Connection security** page, and select the **Server parameters** tab.
12. Update the `lower_case_table_names` value to 2, and click **Save**. 
13. Select the **Overview** tab and click the **Restart** button to restart your database. Restarting your database updates the `lower_case_table_name` setting.
14. Once the server restarts successfully, open your Azure CLI.
15. Sign into the MySQL server from your command line by entering the following command:
  ```curl
  mysql --host=/[HOSTNAME] --port=3306 --user=[USERNAME] --password=[PASSWORD]
  ```
16. Run the `CREATE DATABASE` command to create your Hive Metastore:
  ```sql
  CREATE DATABASE <name>;
  ```

> warning " "
> Before continuing, note the MySQL server URL, username and password for the admin account, and your database name: you'll need this information when configuring the Azure Data Lakes destination in the Segment app.


### Step 4 - Set up Databricks

> note "Databricks pricing tier"
> If you create a Databricks instance only for Azure Data Lakes to use, only the standard pricing tier is required. However, if you use your Databricks instance for other applications, you may require premium pricing.

1. From the [home page of your Azure portal](https://portal.azure.com/#home){:target="_blank”}, select **Create a resource**.
2. Search for and select **Azure Databricks**.
3. On the Azure Database for MySQL resource page, select the **Azure Databricks** plan and click **Create**.
4. On the **Basic** tab, select an existing subscription and resource group, enter a name for your workspace, select the region you'd like to house your Databricks instance in, and select a pricing tier. For those using the Databricks instance only for Azure Data Lakes, a Standard pricing tier is appropriate. If you plan to use your Databricks instance for more than just Azure Data Lakes, you may require the premium pricing tier.
5. Click **Review + create**.
6. Review your chosen settings. When you are satisfied with your selections, click **Create**.
7. After your resource is deployed, click **Go to resource**.
8. On the Azure Databricks Service overview page, click **Launch Workspace**. 
9. On the Databricks page, select **Create a cluster**.
10. On the Compute page, select **Create Cluster**.
11. Enter a name for your cluster and select the `Standard_DS4_v2` worker type. Set the minimum number of workers to 2, and the maximum number of workers to 8. __Segment recommends deselecting the "Terminate after X minutes" setting, as the time it takes to restart a cluster may delay your Data Lake syncs.__
12. Click **Create Cluster**.
13. Open [your Azure portal](https://portal.azure.com/#home){:target="_blank”} and select the Key Vault you created in a previous step.
14. On the Key Vault page, select the JSON View link to view the Resource ID and vaultURI. Take note of these values, as you'll need them in the next step to configure your Databricks instance.
15. Open `https://<databricks-instance>#secrets/createScope` and enter the following information to connect your Databricks instance to the Key Vault you created in an earlier step:
  - **Scope Name**: Set this value to `segment`.
  - **Manage Principal**: Select **All Users**.
  - **DNS Name**: Set this value to the Vault URI of your Key Vault instance.
  - **Resource ID**: The Resource ID of your Azure Key Vault instance.
16. When you've entered all of your information, click **Create**.

> warning " "
> Before continuing, note the Cluster ID, Workspace name, Workspace URL, and the Azure Resource Group for your Databricks Workspace: you'll need this information when configuring the Azure Data Lakes destination in the Segment app.

### Step 5 - Set up a Service Principal

1. Open the Databricks instance you created in [Step 4 - Set up Databricks](#step-4---set-up-databricks). 
2. Click **Settings** and select **User settings**.
3. On the Access tokens page, click **Generate new token**. 
4. Enter a comment for your token, select the lifetime of your ticket, and click **Generate**.
5. Copy your token, as you'll use this to add your service principal to your workspace.
6. Open your Azure CLI and create a new service principal using the following commands: <br/>
``` powershell
az login
az ad sp create-for-rbac --name <ServicePrincipalName>
```
7. In your Azure portal, select the Databricks instance you created in [Step 4 - Set up Databricks](#step-4---set-up-databricks).
8. On the overview page for your Databricks instance, select **Access control (IAM)**.
9. Click **Add** and select **Add role assignment**.
10. On the **Roles** tab, select the `Managed Application Operator` role. Click **Next**.
11. On the **Members** tab, select a **User, group, or service principal**.
12. Click **Select members**.
13. Search for and select the Service Principal you created above.
14. Click **Select**.
15. Under the **Members** header, verify that you selected your Service Principal. Click **Review + assign**.
16. Return to the Azure home page. Select your storage account.
17. On the overview page for your storage account, select **Access control (IAM)**.
18. Click **Add** and select **Add role assignment**.
19. On the **Roles** tab, select the `Storage Blob Data Contributor` role. Click **Next**.
20. On the **Members** tab, select a **User, group, or service principal**.
21. Click **Select members**.
22. Search for and select the Service Principal you created above.
23. Click **Select**.
24. Under the **Members** header, verify that you selected your Service Principal. Click **Review + assign**.
25. Open your Key Vault. In the sidebar, select **Secrets**.
26. Click **Generate/Import**.
27. On the Create a secret page, select **Manual**. Enter the name `spsecret` for your secret, and enter the name of the secret you created in Databricks in the **Value** field.
28. From your Azure CLI, call the Databricks SCIM API to add your service principal to your workspace, replacing `<per-workspace-url> `with the URL of your Databricks workspace, `<personal-access-token> `with the access token you created in an earlier step, and `<application-id>` with the client ID of your service principal: <br/>
```curl
curl -X POST 'https://<per-workspace-url>/api/2.0/preview/scim/v2/ServicePrincipals' \
  --header 'Content-Type: application/scim+json' \
  --header 'Authorization: Bearer <personal-access-token>' \
  --data-raw '{
    "schemas":[
      "urn:ietf:params:scim:schemas:core:2.0:ServicePrincipal"
    ],
    "applicationId":"<application-id>",
    "displayName": "test-sp",
    "entitlements":[
      {
        "value":"allow-cluster-create"
      }
    ]
  }'
```
29. Open Databricks and navigate to your cluster. Select **Permissions**.
30. In the permissions menu, grant your service principal **Can Manage** permissions. 

> warning " "
> Before continuing, note the Client ID and Client Secret for your Service Principal: you'll need this information when configuring the Azure Data Lakes destination in the Segment app.

### Step 6 - Configure Databricks Cluster

> warning "Optional configuration settings for log4j vulnerability"
> While Databricks released a statement that clusters are likely unaffected by the log4j vulnerability, out of an abundance of caution, Databricks recommends updating to log4j 2.15+ or adding the following options to the Spark configuration: <br/> `spark.driver.extraJavaOptions "-Dlog4j2.formatMsgNoLookups=true"`<br/>`spark.executor.extraJavaOptions "-Dlog4j2.formatMsgNoLookups=true"`

1. Connect to a [Hive metastore](https://docs.databricks.com/data/metastores/external-hive-metastore.html){:target="_blank”} on your Databricks cluster.
2. Copy the following Spark configuration, replacing the variables (`<example_variable>`) with information from your workspace: <br/>
```py
## Configs so we can read from the storage account
spark.hadoop.fs.azure.account.oauth.provider.type.<storage_account_name>.dfs.core.windows.net org.apache.hadoop.fs.azurebfs.oauth2.ClientCredsTokenProvider
spark.hadoop.fs.azure.account.oauth2.client.endpoint.<storage_account_name>.dfs.core.windows.net https://login.microsoftonline.com/<azure-tenant-id>/oauth2/token
spark.hadoop.fs.azure.account.oauth2.client.secret.<storage_account_name>.dfs.core.windows.net <service-principal-secret>
spark.hadoop.fs.azure.account.auth.type.<storage_account_name>.dfs.core.windows.net OAuth
spark.hadoop.fs.azure.account.oauth2.client.id.<storage_account_name>.dfs.core.windows.net <service_principal_client_id>
##
##
spark.hadoop.javax.jdo.option.ConnectionDriverName org.mariadb.jdbc.Driver
spark.hadoop.javax.jdo.option.ConnectionURL jdbc:mysql://<db-host>:<port>/<database-name>?useSSL=true&requireSSL=false
spark.hadoop.javax.jdo.option.ConnectionUserName <database_user>
spark.hadoop.javax.jdo.option.ConnectionPassword <database_password>
##
##
##
spark.hive.mapred.supports.subdirectories true
spark.sql.storeAssignmentPolicy Legacy
mapreduce.input.fileinputformat.input.dir.recursive true
spark.sql.hive.convertMetastoreParquet false
##
datanucleus.autoCreateSchema true 
datanucleus.autoCreateTables true 
spark.sql.hive.metastore.schema.verification false 
datanucleus.fixedDatastore false
##
spark.sql.hive.metastore.version 2.3.7
spark.sql.hive.metastore.jars builtin
``` 

3. Log in to your Databricks instance and open your cluster. 
4. On the overview page for your cluster, select **Edit**. 
5. Open the **Advanced options** toggle and paste the Spark config you copied above, replacing the variables (`<example_variable>`) with information from your workspace.
6. Select **Confirm and restart**. On the popup window, select **Confirm**.
7. Log in to your Azure MySQL database using the following command: <br/>
```curl
mysql --host=[HOSTNAME] --port=3306 --user=[USERNAME] --password=[PASSWORD]
```
8. Once you've logged in to your MySQL database, run the following commands: <br/>
```sql
USE <db-name>
INSERT INTO VERSION (VER_ID, SCHEMA_VERSION) VALUES (0, '2.3.7');
```
9. Log in to your Databricks cluster.
10. Click **Create** and select **Notebook**.
11. Give your cluster a name, select **SQL** as the default language, and make sure it's located in the cluster you created in [Step 4 - Set up Databricks](#step-4---set-up-databricks). 
12. Click **Create**.
13. On the overview page for your new notebook, run the following command: <br/>
```sql
CREATE TABLE test (id string);
```
14. Open your cluster. 
15. On the overview page for your cluster, select **Edit**. 
16. Open the **Advanced options** toggle and paste the following code snippet: <br/>
```py
datanucleus.autoCreateSchema false
datanucleus.autoCreateTables false
spark.sql.hive.metastore.schema.verification true 
datanucleus.fixedDatastore true
```
17. Select **Confirm and restart**. On the popup window, select **Confirm**.

### Step 7 - Enable the Data Lakes destination in the Segment app

After you set up the necessary resources in Azure, the next step is to set up the Data Lakes destination in Segment:

1. In the [Segment App](https://app.segment.com/goto-my-workspace/overview){:target="_blank”}, click **Add Destination**.
2. Search for and select **Azure Data Lakes**.
2. Click the **Configure Data Lakes** button, and select the source you'd like to receive data from. Click **Next**.
3. In the **Connection Settings** section, enter the following values: 
  - **Azure Storage Account**: The name of the Azure Storage account that you set up in [Step 1 - Create an ALDS-enabled storage account](#step-1---create-an-alds-enabled-storage-account).
  - **Azure Storage Container**: The name of the Azure Storage Container you created in [Step 1 - Create an ALDS-enabled storage account](#step-1---create-an-alds-enabled-storage-account).
  - **Azure Subscription ID**: The ID of your [Azure subscription](https://docs.microsoft.com/en-us/azure/azure-portal/get-subscription-tenant-id){:target="_blank”}.
  - **Azure Tenant ID**: The Tenant ID of your [Azure Active directory](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-to-find-tenant){:target="_blank”}.
  - **Databricks Cluster ID**: The ID of your [Databricks cluster](https://docs.databricks.com/workspace/workspace-details.html#cluster-url-and-id){:target="_blank”}.
  - **Databricks Instance URL**: The ID of your [Databricks workspace](https://docs.databricks.com/workspace/workspace-details.html#workspace-instance-names-urls-and-ids){:target="_blank”}.
  - **Databricks Workspace Name**: The name of your [Databricks workspace](https://docs.databricks.com/workspace/workspace-details.html#workspace-instance-names-urls-and-ids){:target="_blank”}.
  - **Databricks Workspace Resource Group**: The resource group that hosts your Azure Databricks instance. This is visible in Azure on the overview page for your Databricks instance.
  - **Region**: The location of the Azure Storage account you set up in [Step 1 - Create an ALDS-enabled storage account](#step-1---create-an-alds-enabled-storage-account).
  - **Service Principal Client ID**: The Client ID of the Service Principal that you set up in [Step 5 - Set up a Service Principal](#step-5---set-up-a-service-principal).
  - **Service Principal Client Secret**: The Secret for the Service Principal that you set up in [Step 5 - Set up a Service Principal](#step-5---set-up-a-service-principal).


### (Optional) Set up your Azure Data Lake using Terraform

Instead of manually configuring your Data Lake, you can create it using the script in the [`terraform-azure-data-lake`](https://github.com/segmentio/terraform-azure-data-lakes){:target="_blank”} GitHub repository. 

> note " "
> This script requires Terraform versions 0.12+.

Before you can run the Terraform script, create a Databricks workspace in the Azure UI using the instructions in [Step 4 - Set up Databricks](#step-4---set-up-databricks). Note the **Workspace URL**, as you will need it to run the script. 

In the setup file, set the following local variables: 

```js

locals {
region         = "<segment-datlakes-region>"
resource_group = "<segment-datlakes-regource-group>"
storage_account = "<segment-datalake-storage-account"
container_name  = "<segment-datlakes-container>"
key_vault_name = "<segment-datlakes-key vault>"
server_name = "<segment-datlakes-server>"
db_name     = "<segment-datlakes-db-name>"
db_password = "<segment-datlakes-db-password>"
db_admin    = "<segment-datlakes-db-admin>"
databricks_workspace_url = "<segment-datlakes-db-worspace-url>"
cluster_name   = "<segment-datlakes-db-cluster>"
tenant_id      = "<tenant-id>"
}
```
After you've configured your local variables, run the following commands: 

```hcl
terraform init
terraform plan
terraform apply
```

Running the `plan` command gives you an output that creates 19 new objects, unless you are reusing objects in other Azure applications. Running the `apply` command creates the resources and produces a service principal password you can use to set up the destination. 


## FAQ

### Segment Data Lakes


#### Do I need to create Glue databases?
No, Data Lakes automatically creates one Glue database per source. This database uses the source slug as its name.

#### What IAM role do I use in the Settings page?
Four roles are created when you set up Data Lakes using Terraform. You add the `arn:aws:iam::$ACCOUNT_ID:role/segment-data-lake-iam-role` role to the Data Lakes Settings page in the Segment web app.

#### What level of access do the AWS roles have?
The roles which Data Lakes assigns during set up are:

- **`segment-datalake-iam-role`** - This is the role that Segment assumes to access S3, Glue and the EMR cluster. It allows Segment access to:
  - Get, create, delete access to the Glue catalog. Note that this does not provide access to Glue ETL or Glue crawlers.
  - Access only to the specific S3 bucket used for Data Lakes.
  - EMR access only to the clusters having the `vendor=segment` tag

- **`segment_emr_service_role`** - Restricted role that can only be assumed by the EMR service. This is set up based on [AWS best practices](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-iam-role.html).

- **`segment_emr_instance_profile_role`** - Role that is assumed by the applications running on the EMR cluster. Based on [AWS best practices](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-iam-role-for-ec2.html), it allows Segment access to:
  - Get, create, delete access to the Glue catalog. Note that this does not provide access to Glue ETL or Glue crawlers.
  - Access only to the specific S3 bucket used for Data Lakes.

- **`segment_emr_autoscaling_role`** - Restricted role that can only be assumed by EMR and EC2. This is set up based on [AWS best practices](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-iam-role-automatic-scaling.html).


#### Why doesn't the Data Lakes Terraform module create an S3 bucket?
The module doesn't create a new S3 bucket so you can re-use an existing bucket for your Data Lakes.

#### Does my S3 bucket need to be in the same region as the other infrastructure?
Yes, the S3 bucket and the EMR cluster must be in the same region.

#### How do I connect a new source to Data Lakes?
To connect a new source to Data Lakes:

1. Ensure that the `workspace_id` of the Segment workspace is in the list of [external ids](https://github.com/segmentio/terraform-aws-data-lake/tree/master/modules/iam#external_ids) in the IAM policy. You can either update this from the AWS console, or re-run the [Terraform](https://github.com/segmentio/terraform-aws-data-lake) job.
2. From your Segment workspace, connect the source to the Data Lakes destination.

#### Can I configure multiple sources to use the same EMR cluster?
Yes, you can configure multiple sources to use the same EMR cluster. Segment recommends that the EMR cluster only be used for Data Lakes to ensure there aren't interruptions from non-Data Lakes job.

#### Why don't I see any data in S3 or Glue after enabling a source?
If you don't see data after enabling a source, check the following:
- Does the IAM role have the Segment account ID and workspace ID as the external ID?
- Is the EMR cluster running?
- Is the correct IAM role and S3 bucket configured in the settings?

If all of these look correct and you're still not seeing any data, please [contact the Support team](https://segment.com/help/contact/).

#### What are "Segment Output" tables in S3?
The `output` tables are temporary tables Segment creates when loading data. They are deleted after each sync.

#### Can I make additional directories in the S3 bucket Data Lakes is using?
Yes, you can create new directories in S3 without interfering with Segment data.
Do not modify, or create additional directories with the following names:
- `logs/`
- `segment-stage/`
- `segment-data/`
- `segment-logs/`

#### What does "partitioned" mean in the table name?
`Partitioned` just means that the table has partition columns (day and hour). All tables are partitioned, so you should see this on all table names.

#### How can I use AWS Spectrum to access Data Lakes tables in Glue, and join it with Redshift data?
You can use the following command to create external tables in Spectrum to access tables in Glue and join the data with Redshift:

Run the `CREATE EXTERNAL SCHEMA` command:

```sql
create external schema [spectrum_schema_name]
from data catalog
database [glue_db_name]
iam_role arn:aws:iam::[account_id]:role/MySpectrumRole
create external database if not exists;
```

Replace:
- [glue_db_name] = The Glue database created by Data Lakes which is named after the source slug
- [spectrum_schema_name] = The schema name in Redshift you want to map to

### Azure Data Lakes

#### Does my ALDS-enabled storage account need to be in the same region as the other infrastructure?
Yes, your storage account and Databricks instance should be in the same region.

#### What analytics tools are available to use with my Azure Data Lake?
Azure Data Lakes supports the following post-processing tools:
  - PowerBI
  - Azure HDInsight
  - Azure Synapse Analytics
  - Databricks

#### What can I do to troubleshoot my Databricks database?
If you encounter errors related to your Databricks database, try adding the following line to the config: <br/>
```py
spark.sql.hive.metastore.schema.verification.record.version false
```
<br/>After you've added to your config, restart your cluster so that your changes can take effect. If you continue to encounter errors, [contact Segment Support](https://segment.com/help/contact/){:target="_blank"}.

#### What do I do if I get a "Version table does not exist" error when setting up the Azure MySQL database?
Check your Spark configs to ensure that the information you entered about the database is correct, then restart the cluster. The Databricks cluster automatically initializes the Hive Metastore, so an issue with your config file will stop the table from being created.  If you continue to encounter errors, [contact Segment Support](https://segment.com/help/contact/){:target="_blank"}.