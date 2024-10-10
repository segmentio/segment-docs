---
title: BigQuery Reverse ETL Setup
redirect_from:
  - '/reverse-etl/bigquery-setup/'
---
## Constructing your own role or policy
> warning ""
> You need to be an account admin to set up the Segment BigQuery connector as well as write permissions for the `__segment_reverse_etl` dataset.

When constructing a role and service-account we provide guidance for two approaches:
1. Grant full access - this approach gives Segment all the required permissions and is slightly faster as it also gives us to permission to automatically complete the setup for you.
2. Grant limited access - this approach is more secured, but because of the limited access we have, we require few additional one time setup steps from you.

You can choose whatever works best for you and skip the other step.


### Grant full access
With this approach we will use BigQuery predefined roles: 
1. Navigate to **IAM & Admin > Service Accounts** in BigQuery.
2. Click **+ Create Service Account** to create a new service account.
3. Enter your **Service account name** and a description of what the account will do.
4. Click **Create and Continue**. 
5. Click **+ Add another role** and add the *BigQuery User* role. 
6. Click **+ Add another role** and add the *BigQuery Data Editor* role. 
7. Click **Continue**. 
8. Click **Done**.

### Grant limited access
With this approach we will use costume role with the below permissions:

Permission | Details
---------- | --------
`bigquery.datasets.get` | This allows Segment to determine if the `__segment_reverse_etl` dataset exists.
`bigquery.tables.create` | This allows Segment to determine if the tables Segment uses to track state in the `__segment_reverse_etl` dataset exists.
`bigquery.jobs.create` | This allows Segment to execute queries on any datasets or tables your model query references, and also allows Segment to manage tables used for tracking.


1. Navigate to **IAM & Admin > Roles** in BigQuery.
2. Click **+ CREATE ROLE** to create a new role.
3. Add **title** and **Description** as you like.
4. Click **ADD PERMISSIONS** and add the permission listed in the above tables. You will to repeat that until all required permissions were added.
5. Click **CREATE**. 
6. Navigate to **IAM & Admin > Service Accounts** in BigQuery. 
7. Click **+ Create Service Account** to create a new service account. 
8. Enter your **Service account name** and a description of what the account will do. 
9. Click **Create and Continue**. 
10. In the **Grant this service account access to project** section, select the role you just created. 
11. Click **Continue**. 
12. Click **Done**. 
13. Navigate to the BigQuery SQL editor and create a dataset that will be used by Segment:
    ```
    CREATE SCHEMA IF NOT EXISTS `__segment_reverse_etl`;
    ```
14. Grant additional permissions just on the newly created dataset:
    ```
    GRANT `roles/bigquery.dataEditor` ON SCHEMA `__segment_reverse_etl` TO "serviceAccount:<YOUR SERVICE ACCOUNT EMAIL>";
    ```

## Set up BigQuery as your Reverse ETL source
1. In the BigQuery console, search for the service account you just created. 
2. When your service account pulls up, click the 3 dots under **Actions** and select **Manage keys**. 
3. Click **Add Key > Create new key**. 
4. In the pop-up window, select **JSON** for the key type and click **Create**. The file will be downloaded. 
5. Copy all the content within the **JSON** file created and downloaded in previous section. 
6. Navigate to the Segment UI and paste all the credentials you copied from previous step into the **Enter your credentials** section. 
7. Enter your **Data Location**. 
8. Click **Test Connection** to test to see if the connection works. If the connection fails, make sure you have the right permissions and credentials and try again. 
9. Click **Add source** if the test connection is successful.

After you've added BigQuery as a source, you can [add a model](/docs/connections/reverse-etl/setup/#step-2-add-a-model) and follow the rest of the steps in the Reverse ETL setup guide.

> info "BigQuery Reverse ETL sources support Segment's dbt extension"
> If you have an existing dbt account with a Git repository, you can use [Segment's dbt extension](/docs/segment-app/extensions/dbt/) to centralize model management and versioning, reduce redundancies, and run CI checks to prevent breaking changes.
