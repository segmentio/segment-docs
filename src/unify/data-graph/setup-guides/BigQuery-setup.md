---
title: BigQuery Data Graph Setup
beta: true
plan: unify
redirect_from:
  - '/unify/linked-profiles/setup-guides/BigQuery-setup'
---

> warning ""
> Data Graph, Reverse ETL, and Profiles Sync require different warehouse permissions.

Set up your BigQuery data warehouse to Segment for the [Data Graph](/docs/unify/data-graph/data-graph/).  

## Step 1: Roles and permissions
> warning ""
> You need to be an account admin to set up the Segment BigQuery connector as well as write permissions for the `__segment_reverse_etl` dataset.

To set the roles and permissions: 
1. Navigate to **IAM & Admin > Service Accounts** in BigQuery.
2. Click **+ Create Service Account** to create a new service account.
3. Enter your Service account name and a description of what the account will do.
4. Click **Create and Continue**.
5. Click **+ Add another role** and add the *[BigQuery User](https://cloud.google.com/bigquery/docs/access-control#bigquery.user){:target="_blank"}* role.
6. Click **Continue**, then click **Done**.
7. Search for the service account you just created.
8. From your service account, click the three dots under **Actions** and select **Manage keys**.
9. Navigate to **Add Key > Create new key**.
10. In the pop-up window, select **JSON** for the key type, and click **Create**. The file will download. 
11. Copy all the content in the JSON file you created in the previous step, and save it for Step 5. 


## Step 2: Create a dataset for Segment to store checkpoint tables
Create a new dataset as Segment requires write access to the dataset for internal bookkeeping and to store checkpoint tables for the queries that are executed. 

Segment recommends you to create a new dataset for the Data Graph. If you choose to use an existing dataset that has also been used for [Segment Reverse ETL](/docs/connections/reverse-etl/), you must follow the [additional instructions](/docs/unify/data-graph/setup-guides/bigquery-setup/#update-user-access-for-segment-reverse-etl-dataset) to update user access for the Segment Reverse ETL catalog.

To create your dataset, navigate to the BigQuery SQL editor and create a dataset that will be used by Segment. 

```
CREATE SCHEMA IF NOT EXISTS `__segment_reverse_etl`;
GRANT `roles/bigquery.dataEditor` ON SCHEMA `__segment_reverse_etl` TO "serviceAccount:<YOUR SERVICE ACCOUNT EMAIL>";
```

## Step 3: Grant read-only access for the Data Graph 
Grant the [BigQuery Data Viewer](https://cloud.google.com/bigquery/docs/access-control#bigquery.dataViewer){:target="_blank"} role to the service account at the project level. Make sure to grant read-only access to the Profiles Sync project in case you have a separate project.

To grant read-only access for the Data Graph: 
1. Navigate to **IAM & Admin > IAM** in BigQuery.
2. Search for the service account you just created.
3. From your service account, click the **Edit principals pencil**.
4. Click **ADD ANOTHER ROLE**.
5. Select the **BigQuery Data Viewer role**.
6. Click **Save**.

## *(Optional)* Step 4: Restrict read-only access
If you want to restrict access to specific datasets, grant the BigQuery Data Viewer role on datasets to the service account. Make sure to grant read-only access to the Profiles Sync dataset.

To restrict read-only access:
1. In the Explorer pane in BigQuery, expand your project and select a dataset.
2. Navigate to **Sharing > Permissions**.
3. Click **Add Principal**.
4. Enter your service account in the New principals section.
5. Select the **BigQuery Data Viewer** role in the **Select a role** section.
6. Click **Save**.

You can also run the following command:

```
GRANT `roles/bigquery.dataViewer` ON SCHEMA `YOUR_DATASET_NAME` TO "serviceAccount:<YOUR SERVICE ACCOUNT EMAIL>";
```

## Step 5: Validate permissions
1. Navigate to **IAM & Admin > Service Accounts** in BigQuery.
2. Search for the service account you’ve just created.
3. From your service account, click the three dots under **Actions** and select **Manage permissions**.
4. Click **View Access** and click **Continue**.
5. Select a box with List resources within resource(s) matching your query.
6. Click **Analyze**, then click **Run query**.

## Step 6: Connect your warehouse to Segment
1. Navigate to **Unify > Data Graph** in Segment. This should be a Unify space with Profiles Sync already set up.
2. Click **Connect warehouse**.
3. Select *BigQuery* as your warehouse type.
4. Enter your warehouse credentials. Segment requires the following settings to connect to your BigQuery warehouse:
   * **Service Account Credentials:** JSON credentials for a GCP Service Account that has BigQuery read/write access. This is the credential created in Step 1.
   * **Data Location:** This specifies the primary data location. This can be either region or multi-region.
5. Test your connection, then click **Save**.

## Update user access for Segment Reverse ETL dataset
If you ran Segment Reverse ETL in the project you are configuring as the Segment connection project, a Segment-managed dataset is already created and you need to provide the new Segment user access to the existing dataset. 

If you run into an error on the Segment app indicating that the user doesn’t have sufficient privileges on an existing `__segment_reverse_etl` dataset, grant the [BigQuery Data Editor](https://cloud.google.com/bigquery/docs/access-control#bigquery.dataEditor){:target="_blank"} role on the `__segment_reverse_etl` dataset to the service account . Note that the `__segment_reverse_etl` dataset is hidden in the console. Run the following SQL command:  

```
GRANT `roles/bigquery.dataEditor` ON SCHEMA `__segment_reverse_etl` TO "serviceAccount:<YOUR SERVICE ACCOUNT EMAIL>";
```
