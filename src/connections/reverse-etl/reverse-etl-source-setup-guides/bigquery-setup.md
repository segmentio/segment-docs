---
title: BigQuery Reverse ETL Setup
redirect_from:
  - '/reverse-etl/bigquery-setup/'
---
## Constructing your own role or policy
When you construct your own role or policy, Segment needs the following permissions:

Permission | Details
---------- | --------
`bigquery.datasets.create` | This allows Segment to create/manage a `__segment_reverse_etl` dataset for tracking state between syncs.
`bigquery.datasets.get` | This allows Segment to determine if the aforementioned dataset exists.
`bigquery.jobs.create` | This allows Segment to execute queries on any datasets or tables your model query references, and also allows Segment to manage tables used for tracking.

If you don't want to grant Segment `bigquery.datasets.create` access, you can create your own `__segment_reverse_etl` dataset and give Segment the following permissions:

Permission | Details
---------- | --------
`bigquery.datasets.get` | This allows Segment to determine if the `__segment_reverse_etl` dataset exists.
`bigquery.tables.create` | This allows Segment to determine if the tables Segment uses to track state in the `__segment_reverse_etl` dataset exists.
`bigquery.jobs.create` | This allows Segment to execute queries on any datasets or tables your model query references, and also allows Segment to manage tables used for tracking.

The `bigquery.datasets.*` permissions can be scoped only to the `__segment_reverse_etl` dataset.

## Create service account 

> warning ""
> You need to be an account admin to set up the Segment BigQuery connector as well as write permissions for the `__segment_reverse_etl` dataset.

To set up the Segment BigQuery connector:
1. Navigate to **IAM & Admin > Service Accounts** in BigQuery.  
2. Click **+ Create Service Account** to create a new service account
3. Enter your **Service account name** and a description of what the account will do
4. Click **Create and Continue**.
5. In the **Grant this service account access to project** section, select the *BigQuery User* role to add.
6. Click **+ Add another role** and add the *BigQuery Job User* role.
7. Click **Continue**.
8. Click **Done**.
9. Search for the service account you just created.
10. When your service account pulls up, click the 3 dots under **Actions** and select **Manage keys**.
11. Click **Add Key > Create new key**.
12. In the pop-up window, select **JSON** for the key type and click **Create**. The file will download.

## Set up BigQuery as your Reverse ETL source
1. Copy all the content within the **JSON** file created and downloaded in previous section.
2. Navigate to the Segment UI and paste all the credentials you copied from previous step into the **Enter your credentials** section.
3. Enter your **Data Location**.
4. Click **Test Connection** to test to see if the connection works. If the connection fails, make sure you have the right permissions and credentials and try again.
5. Click **Add source** if the test connection is successful.

After you've added BigQuery as a source, you can [add a model](/docs/connections/reverse-etl/setup/#step-2-add-a-model) and follow the rest of the steps in the Reverse ETL setup guide.

> info "BigQuery Reverse ETL sources support Segment's dbt extension"
> If you have an existing dbt account with a Git repository, you can use [Segment's dbt extension](/docs/segment-app/extensions/dbt/) to centralize model management and versioning, reduce redundancies, and run CI checks to prevent breaking changes.
