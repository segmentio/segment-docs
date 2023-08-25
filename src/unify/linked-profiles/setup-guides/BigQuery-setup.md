---
title: BigQuery Setup

---

On this page, you'll learn how to connect your BigQuery data warehouse to Segment. 

> warning ""
> You need to be an account admin to set up the Segment BigQuery connector as well as write permissions for the `__segment_reverse_etl` dataset. 


1. Navigate to **IAM & Admin > Service Accounts** in BigQuery.  
2. Click **+ Create Service Account** to create a new service account.
3. Enter your **Service account name** and a description of what the account will do.
4. Click **Create and Continue**.
5. In the **Grant this service account access to project** section, select the *BigQuery User* role to add.
6. Click **+ Add another role** and add the *BigQuery Job User* role.
7. Click **+ Add another role** and add the *BigQuery Metadata Viewer* role. 
8. Click **Continue**.
9. Click **Done**.
10. Search for the service account you just created.
11. When your service account pulls up, click the 3 dots under **Actions** and select **Manage keys**.
12. Click **Add Key > Create new key**.
13. In the pop-up window, select **JSON** for the key type and click **Create**. The file will download.
14. Copy all the content within the file you just created and downloaded.
15. Navigate to the Segment UI and paste all the credentials you copied from step 13 into the **Enter your credentials** section.
16. Enter your **Data Location**.
17. Click **Test Connection** to test to see if the connection works. If the connection fails, make sure you have the right permissions and credentials and try again.
18. Click **Create Source** if the test connection is successful.


## Constructing your own role or policy
When you construct your own role or policy, Segment needs the following permissions:

Permission | Details
---------- | --------
`bigquery.datasets.create` | This allows Segment to create/manage a `__segment_reverse_etl` dataset for tracking state between syncs.
`bigquery.datasets.get` | This allows Segment to determine if the aforementioned dataset exists
`bigquery.jobs.create` | This allows Segment to execute queries on any datasets/tables your model query references and manage tables that Segment uses for tracking

The `bigquery.datasets.*` permissions can be scoped only to the `__segment_reverse_etl` dataset. If you don't wish to grant `bigquery.datasets.create` access, you may create this dataset yourself, but Segment still needs  `bigquery.datasets.get` access.


## View datasets, tables, and columns

GRANT
- [BigQuery Metadata Viewer] role
OR
- Permissions:
    - bigquery.tables.get
    - bigquery.routines.get
    - bigquery.tables.list
    - bigquery.routines.list

These can be scoped to projects, [datasets](https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset), or [tables](https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_table_or_view). 

If RETL has ever run in your database (Segmnet managed dataset is created)

Add the following or any predefined role that contains below permissions to:
`__segment_reverse_etl` dataset:
- bigquery.tables.create
- bigquery.tables.getData
- bigquery.tables.update
- bigquery.tables.updateData

Visit the [BigQuery docs](https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset) to learn more. 