---
title: BigQuery Reverse ETL Setup
redirect_from:
  - '/reverse-etl/bigquery-setup/'
---

Set up BigQuery as your Reverse ETL source. 

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
13. Copy all the content within the file you just created and downloaded.
14. Navigate to the Segment UI and paste all the credentials you copied from step 13 into the **Enter your credentials** section.
19. Enter your **Data Location**.
20. Click **Test Connection** to test to see if the connection works. If the connection fails, make sure you have the right permissions and credentials and try again.
6. Click **Add source** if the test connection is successful.

After you've added BigQuery as a source, you can [add a model](/docs/connections/reverse-etl#step-2-add-a-model).

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

## FAQ

### Are there any additional roles or permissions I need to add?
You shouldn’t need to grant any additional roles/permissions than the ones specified above, however, you may be able to circumvent any set-up issues by also adding the `BigQuery Data Viewer` role to the service account.  Alternatively, you can also provide `bigquery.table.getData` if `BigQuery Data Viewer` is too broad.
