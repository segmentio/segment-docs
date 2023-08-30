---
title: BigQuery Setup
beta: true
plan: unify
---

On this page, you'll learn how to connect your BigQuery data warehouse to Segment. 

> warning ""
> You need to be an account admin to set up the Segment BigQuery connector as well as write permissions for the `__segment_reverse_etl` dataset. 

To setup the Segment BigQuery connector:

1. Navigate to **IAM & Admin > Service Accounts** in BigQuery.  
2. Click **+ Create Service Account** to create a new service account.
3. Enter your **Service account name** and a description of what the account will do.
4. Click **Create and Continue**.
5. In the **Grant this service account access to project** section, select the [*BigQuery User*](https://cloud.google.com/bigquery/docs/access-control#bigquery.user){:target="_blank"} role to add.
6. Click **+ Add another role** and add the *BigQuery Job User* role.
7. Click **+ Add another role** and add the [*BigQuery Metadata Viewer*](https://cloud.google.com/bigquery/docs/access-control#bigquery.metadataViewer){:target="_blank"} role. 
8. Click **Continue**, then click **Done**.
9. Search for the service account you've just created.
11. From your service account, click the three dots under **Actions** and select **Manage keys**.
12. Click **Add Key > Create new key**.
13. In the pop-up window, select **JSON** for the key type, and click **Create**. 
14. Copy all the content within the file you've created and downloaded.
15. Navigate to Segment and paste all the credentials you copied from step 13 into the **Enter your credentials** section as you connect your warehouse destination.

## Grant access to datasets and tables for enrichment

Grant access to datasets and tables so that Segment can list datasets, tables, and columns, and create Linked Events.

Grant
- [BigQuery Data Viewer](https://cloud.google.com/bigquery/docs/access-control#bigquery.dataViewer){:target="_blank"} role
OR
- Permissions:
    - `bigquery.datasets.get`
    - `bigquery.tables.list`
    - `bigquery.tables.get`
    - `bigquery.tables.getData`

These can be scoped to projects or [datasets](https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset){:target="_blank"}. 

> info ""
> To create Linked Events on your listed tables, Segment needs `bigquery.tables.get` and `bigquery.tables.getData` at dataset level. However, you can still scope `bigquery.tables.get` and `bigquery.tables.getData` to specific tables. See BigQuery's [docs](https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_table_or_view){:target="_blank"} for more info.



