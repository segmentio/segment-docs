---
title: BigQuery Reverse ETL Setup
redirect_from:
  - '/reverse-etl/bigquery-setup/'
---
To set up your BigQuery source with Reverse ETL, you must [construct a BigQuery role and service account](#constructing-your-own-role-or-policy) and [create a BigQuery source in the Segment app](#set-up-bigquery-as-your-reverse-etl-source). 

> info "BigQuery Reverse ETL sources support Segment's dbt extension"
> If you have an existing dbt account with a Git repository, you can use [Segment's dbt extension](/docs/segment-app/extensions/dbt/) to centralize model management and versioning, reduce redundancies, and run CI checks to prevent breaking changes.

## Constructing your own role or policy

> warning ""
> You need to be an account admin to set up the Segment BigQuery connector as well as write permissions for the `__segment_reverse_etl` dataset.

There are two approaches you can take when granting Segment access to your BigQuery resources: 
- **Grant Full Access**: This option allows Segment to automatically complete the setup for you after you provide Segment with all the necessary permissions. This option requires less time and engineering effort on your part.
- **Grant Limited Access**: This option is more secure, as it restricts the permissions Segment has access to. However, due to the limited access, you must complete a few additional setup steps. These are one-time steps, and the documentation provides you with the information required to complete this process.

You can choose the approach that best suits your needs.

### Grant Full Access
With this approach, use BigQuery predefined roles to create a service account for Segment to assume. 
1. In BigQuery, navigate to **IAM & Admin > Service Accounts**.
2. Click **+ Create Service Account** to create a new service account.
3. Enter your **Service account name** and a description of what the service account will do.

4. Click **Create and Continue**. 
5. Click **+ Add another role** and add the [**BigQuery User**](https://cloud.google.com/bigquery/docs/access-control#bigquery.user){:target="_blank”} role. 
6. Click **+ Add another role** and add the [**BigQuery Data Editor**](https://cloud.google.com/bigquery/docs/access-control#bigquery.dataEditor){:target="_blank”} role. 
7. Click **Continue**, then click **Done**. 

### Grant Limited Access
With this approach, you can set up a custom role with the following permissions:

Permission | Details
---------- | --------
`bigquery.datasets.get` | This allows Segment to determine if the `__segment_reverse_etl` dataset exists.
`bigquery.jobs.create` | This allows Segment to execute queries on any datasets or tables your model query references, and also allows Segment to manage tables used for tracking.
`bigquery.tables.getData` | This allows Segment to run `SELECT` queries on tables that will be defined in the model. 


1. In BigQuery, navigate to **IAM & Admin > Roles**.
2. Click **+ CREATE ROLE** to create a new role.
3. Add **Title** and **Description** as you like.
4. Click **ADD PERMISSIONS** and add the permission listed in the above tables. Repeat this step until you've added all required permissions.
5. Click **CREATE**. 
6. Navigate to **IAM & Admin > Service Accounts**. 
7. Click **+ Create Service Account** to create a new service account. 
8. Enter your **Service account name** and a description of what the account will do. 
9. Click **Create and Continue**. 
10. In the **Grant this service account access to project** section, select the role you just created. 
11. Click **Continue**. 
12. Click **Done**. Copy and keep the Service Account email handy for the next steps.
13. Navigate to the BigQuery SQL editor and create a dataset that will be used by Segment:
    ```sql
    CREATE SCHEMA IF NOT EXISTS `__segment_reverse_etl`;
    ```
14. Grant limited access to the Segment Reverse ETL dataset
    ```sql
    GRANT `roles/bigquery.dataEditor` ON SCHEMA `__segment_reverse_etl` TO "serviceAccount:<YOUR SERVICE ACCOUNT EMAIL>";
    ```

### BigQuery resource location
When connecting your BigQuery warehouse to Segment, you'll need to know the location of your resources.

You can find the location of your BigQuery resources using the following method:
1. In the BigQuery console, navigate to your dataset. In the explorer panel on the left, expand the project and dataset to view the tables.
2. Click on the name of the dataset, and it opens a page showing its details.
3. The Location of the dataset (like US or EU) is displayed in the Dataset Info.

## Set up BigQuery as your Reverse ETL source
1. In the BigQuery console, search for the service account you created. 
2. When your service account pulls up, click the 3 dots under **Actions** and select **Manage keys**. 
3. Click **Add Key > Create new key**. 
4. In the pop-up window, select **JSON** for the key type and click **Create**. The file will be downloaded. 
5. Copy all the content in the JSON file you created in the previous step. 
6. Open the Segment app and navigate to **Connections > Sources**. 
7. On the My sources page, click **+ Add source**.  
8. Search for "BigQuery" and select the BigQuery source from the sources catalog. On the BigQuery overview page, click **Add Source**. 
9. On the Set up BigQuery page, enter a name for your source and paste all the credentials you copied from previous step into the **Enter your credentials** section. 
10. Enter the location of your BigQuery warehouse in the **Data Location** field. 
11. Click **Test Connection** to test to see if the connection works. If the connection fails, make sure you have the right permissions and credentials and try again. 
12. If the test connection completes successfully, click **Add source** to complete the setup process.

After you've added BigQuery as a source, you can [add a model](/docs/connections/reverse-etl/setup/#step-2-add-a-model) and follow the rest of the steps in the Reverse ETL setup guide.
