---
title: Set Up Segment Data Lakes
redirect_from: '/connections/destinations/catalog/data-lakes/'
---
{% include content/plan-grid.md name="data-lakes" %}


Segment Data Lakes provide a way to collect large quantities of data in a format that's optimized for targeted data science and data analytics workflows. You can read [more information about Data Lakes](/docs/connections/storage/data-lakes/) and learn [how they differ from Warehouses](/docs/connections/storage/data-lakes/comparison/) in Segment's Data Lakes documentation.

> note "Lake Formation"
> You can also set up your [AWS Data Lakes] using [Lake Formation](/docs/connections/storage/data-lakes/lake-formation/), a fully managed service built on top of the AWS Glue Data Catalog.

## Set up [AWS Data Lakes]

To set up [AWS Data Lakes], create your AWS resources, enable the [AWS Data Lakes] destination in the Segment app, and verify that your Segment data synced to S3 and Glue.

### Prerequisites

Before you set up [AWS Data Lakes], you need the following resources:

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

## Set up [Azure Data Lakes]

> info "[Azure Data Lakes] is currently in Public Beta"
> [Azure Data Lakes] is available in Public Beta.

To set up [Azure Data Lakes], create your [Azure resources](/docs/src/connections/storage/data-lakes/#set-up-[azure-data-lakes]) and then enable the Data Lakes destination in the Segment app.

### Prerequisites

Before you can configure your Azure resources, you must first [create an Azure subscription](https://azure.microsoft.com/en-us/free/){:target="_blank”}, create an account with `Microsoft.Authorization/roleAssignments/write` permissions, and configure the [Azure Command Line Interface (Azure CLI)](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli){:target="_blank”}.

### Step 1 - Create an ALDS-enabled storage account

1. Sign in to your [Azure environment](https://portal.azure.com){:target="_blank”}. 
2. From the [Azure home page](https://portal.azure.com/#home){:target="_blank”}, select **Create a resource**.
3. Search for and select **Storage account**. 
4. On the Storage account resource page, select the **Storage account** plan and click **Create**. 
5. On the **Basic** tab, select an existing subscription and resource group, give your storage account a name, and update any necessary instance details. 
6. Click **Next: Advanced**.
7. On the **Advanced Settings** tab in the Security section, select the following options:
  - Require secure transfer for REST API operations
  - Enable blob public access
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
> Before continuing, note the Location, Storage account name, and the Azure storage container name: you'll need these variables when configuring the Azure Data Lakes destination in the Segment app.

### Step 2 - Set up Key Vault

1. From the [home page of your Azure portal](https://portal.azure.com/#home){:target="_blank”}, select **Create a resource**.
2. Search for and select **Key Vault**.
3. On the Key Vault resource page, select the **Key Vault** plan and click **Create**. 
4. On the **Basic** tab, select an existing subscription and resource group, give your Key Vault a name, and update the **Days to retain deleted vaults** setting, if desired. 
6. Click **Review + create**. 
7. Review your chosen settings. When you are satisfied with your selections, click **Review + create**.
8. After your resource is deployed, click **Go to resource**. 
9. On the Key Vault page, select the **Access control (IAM)** tab. 
10. Click **Add** and select **Add role assignment**.
11. On the **Roles** tab, select the `Key Vault Secrets User` role. Click **Next**.
12. On the **Members** tab, assign access to a **User, group, or service principal**.
13. Click **Select members**.
14. Search for and select the `Databricks Resource Provider` service principal. 
15. 

### Step 3 - Set up Azure MySQL database

1. From the [home page of your Azure portal](https://portal.azure.com/#home){:target="_blank”}, select **Create a resource**.
2. Search for and select **Azure Database for MySQL**.
3. On the Azure Database for MySQL resource page, select the **Azure Database for MySQL** plan and click **Create**.
4. Select **Single server** and click **Create**.
5. On the **Basic** tab, select an existing subscription and resource group, enter server details and create an administrator account.
6. Click **Review + create**.
7. Review your chosen settings. When you are satisfied with your selections, click **Create**.
8. After your resource is deployed, click **Go to resource**.
9. From the resouce page, select the **Connection security** tab.
10. Under the Firewall rules section, select **Yes** to allow access to Azure services, and click the **Allow current client IP address (xx.xxx.xxx.xx)** button to allow access from your current IP address.
11. Click **Save** to save the changes you made on the **Connection security** page, and select the **Server parameters** tab.
12. Update the `lower_case_table_names` value to 2, and click **Save**. 
13. Select the **Overview** tab and click the **Restart** button to restart your database. Restarting your database updates the `lower_case_table_name` setting.
14. Once the server restarts successfully, open your Azure CLI.
15. Sign into the MySQL server from your command line by entering the following command:
  ```sql
  mysql --host=/[HOSTNAME] --port=3306 --user=[USERNAME] --password=[PASSWORD]
  ```
16. Run the `CREATE DATABASE` command to create your Hive Metastore:
  ```sql
  CREATE DATABASE <name>;
  ```

> warning " "
> Before continuing, note the MySQL server URL, username and password for the admin account, and your database name: you'll need these variables when configuring the Azure Data Lakes destination in the Segment app.


### Step 4 - Set up Databricks

> note "Databricks pricing tier"
> If you create a Databricks instance only for [Azure Data Lakes] to use, only the standard pricing tier is required. However, if you use your Databricks instance for other applications, you may require premium pricing.

> warning " "
> Before continuing, note the Cluster ID, Workspace name, Workspace URL, and the Azure Resource Group for Databricks Workspace: you'll need these variables when configuring the Azure Data Lakes destination in the Segment app.

### Step 5 - Set up a Service Principal

### Step 6 - Configure Databricks cluster

### Step 7 - Enable the Data Lakes destination in the Segment app

After you set up the necessary resources in Azure, the next step is to set up the Data Lakes destination in Segment:

<!-- TODO: Test this workflow in a staging environment to verify that the steps are correct -->

1. In the [Segment App](https://app.segment.com/goto-my-workspace/overview){:target="_blank”}, click **Add Destination**.
2. Search for and select **Azure Data Lakes**.
2. Click the **Configure Data Lakes** button, and select the source you'd like to receive data from. Click **Next**.
3. In the **Connection Settings** section, enter the following values: 
  - Azure Storage Account (The name of the Azure Storage account that you set up in [Step 1 - Create an ALDS-enabled storage account](#step-1---create-an-alds-enabled-storage-account))
  - Azure Storage Container (The name of the Azure Storage Container you created in [Step 1 - Create an ALDS-enabled storage account](#step-1---create-an-alds-enabled-storage-account))
  - Azure Subscription ID
  - Azure Tenant ID
  - Databricks Cluster ID
  - Databricks Instance URL
  - Databricks Workspace Name
  - Databricks Workspace Resource Group
  - Region (The location of the Azure Storage account you set up in [Step 1 - Create an ALDS-enabled storage account](#step-1---create-an-alds-enabled-storage-account)
  - Service Principal Client ID
  - Service Principal Client Secret


### Optional - Set up the Data Lake using Terraform

Instead of manually configuring your Data Lake, you can create a Data Lake using the script in the [`terraform-azure-data-lake`](https://github.com/segmentio/terraform-azure-data-lakes) Github repository. 

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

### [AWS Data Lakes]

{% faq %}
{% faqitem Do I need to create Glue databases? %}
No, Data Lakes automatically creates one Glue database per source. This database uses the source slug as its name.
{% endfaqitem %}

{% faqitem What IAM role do I use in the Settings page? %}
Four roles are created when you set up Data Lakes using Terraform. You add the `arn:aws:iam::$ACCOUNT_ID:role/segment-data-lake-iam-role` role to the Data Lakes Settings page in the Segment web app.
{% endfaqitem %}

{% faqitem What level of access do the AWS roles have? %}
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
{% endfaqitem %}

{% faqitem Why doesn't the Data Lakes Terraform module create an S3 bucket? %}
The module doesn't create a new S3 bucket so you can re-use an existing bucket for your Data Lakes.
{% endfaqitem %}

{% faqitem Does my S3 bucket need to be in the same region as the other infrastructure? %}
Yes, the S3 bucket and the EMR cluster must be in the same region.
{% endfaqitem %}

{% faqitem How do I connect a new source to Data Lakes? %}
To connect a new source to Data Lakes:

1. Ensure that the `workspace_id` of the Segment workspace is in the list of [external ids](https://github.com/segmentio/terraform-aws-data-lake/tree/master/modules/iam#external_ids) in the IAM policy. You can either update this from the AWS console, or re-run the [Terraform](https://github.com/segmentio/terraform-aws-data-lake) job.
2. From your Segment workspace, connect the source to the Data Lakes destination.
{% endfaqitem %}

{% faqitem Can I configure multiple sources to use the same EMR cluster? %}
Yes, you can configure multiple sources to use the same EMR cluster. Segment recommends that the EMR cluster only be used for Data Lakes to ensure there aren't interruptions from non-Data Lakes job.
{% endfaqitem %}

{% faqitem Why don't I see any data in S3 or Glue after enabling a source? %}
If you don't see data after enabling a source, check the following:
- Does the IAM role have the Segment account ID and workspace ID as the external ID?
- Is the EMR cluster running?
- Is the correct IAM role and S3 bucket configured in the settings?

If all of these look correct and you're still not seeing any data, please [contact the Support team](https://segment.com/help/contact/).
{% endfaqitem %}

{% faqitem What are "Segment Output" tables in S3? %}
The `output` tables are temporary tables Segment creates when loading data. They are deleted after each sync.
{% endfaqitem %}

{% faqitem Can I make additional directories in the S3 bucket Data Lakes is using? %}
Yes, you can create new directories in S3 without interfering with Segment data.
Do not modify, or create additional directories with the following names:
- `logs/`
- `segment-stage/`
- `segment-data/`
- `segment-logs/`
{% endfaqitem %}

{% faqitem What does "partitioned" mean in the table name? %}
`Partitioned` just means that the table has partition columns (day and hour). All tables are partitioned, so you should see this on all table names.
{% endfaqitem %}

{% faqitem How can I use AWS Spectrum to access Data Lakes tables in Glue, and join it with Redshift data? %}
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
{% endfaqitem %}
{% endfaq %}

### [Azure Data Lakes]