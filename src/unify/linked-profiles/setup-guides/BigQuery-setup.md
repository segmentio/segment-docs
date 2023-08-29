---
title: BigQuery Setup
beta: true
---

On this page, you'll learn how to connect your BigQuery data warehouse to Segment. 

> warning ""
> You need to be an account admin to set up the Segment BigQuery connector as well as write permissions for the `__segment_reverse_etl` dataset. 

To setup the Segment BigQuery connector:

1. Navigate to **IAM & Admin > Service Accounts** in BigQuery.  
2. Click **+ Create Service Account** to create a new service account.
3. Enter your **Service account name** and a description of what the account will do.
4. Click **Create and Continue**.
5. In the **Grant this service account access to project** section, select the [*BigQuery User*](https://cloud.google.com/bigquery/docs/access-control#bigquery.user) role to add.
6. Click **+ Add another role** and add the *BigQuery Job User* role.
7. Click **+ Add another role** and add the [*BigQuery Metadata Viewer*](https://cloud.google.com/bigquery/docs/access-control#bigquery.metadataViewer) role. 
8. Click **Continue**, then click **Done**.
9. Search for the service account you just created.
11. From your service account, click the three dots under **Actions** and select **Manage keys**.
12. Click **Add Key > Create new key**.
13. In the pop-up window, select **JSON** for the key type, and click **Create**. The file will download.
14. Copy all the content within the file you've created and downloaded.
15. Navigate to Segment and paste all the credentials you copied from step 13 into the **Enter your credentials** section as you connect your warehouse destination.

## Grant access to datasets and tables for enrichment

Grant access to datasets and tables so that Segment can list datasets, tables, and columns, and create Linked Events.

Grant
- [BigQuery Data Viewer](https://cloud.google.com/bigquery/docs/access-control#bigquery.dataViewer) role
OR
- Permissions:
    - bigquery.datasets.get
    - bigquery.tables.list
    - bigquery.tables.get
    - bigquery.tables.getData

These can be scoped to projects or [datasets](https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset). 

<!--

Add the following or any predefined role that contains below permissions to:
`__segment_reverse_etl` dataset:
- bigquery.tables.create
- bigquery.tables.getData
- bigquery.tables.update
- bigquery.tables.updateData

Visit the [BigQuery docs](https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset) to learn more. 

-->

> info ""
> If you've provided a [BigQuery User role](https://cloud.google.com/bigquery/docs/access-control#bigquery.user) at project level following general setup, you've already given `bigquery.datasets.get` and `bigquery.tables.list` at project level. 
> Segment needs to list tables which is only allowed at dataset level. As a result, Segment needs `bigquery.tables.get` and `bigquery.tables.getData` at dataset level so that you can create Linked Events on all listed tables. However, you can still scope `bigquery.tables.get` and `bigquery.tables.getData` to specific tables. See BigQuery's [docs](https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_table_or_view) for more info.


<!--
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

-->

