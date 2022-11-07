---
title: BigQuery Destination
rewrite: true
redirect_from:
  - '/connections/warehouses/catalog/bigquery/'
---

Segment's [BigQuery](https://cloud.google.com/bigquery/){:target="_blank"} connector makes it easy
to load web, mobile, and third-party source data like Salesforce, Zendesk, and
Google AdWords into a BigQuery data warehouse.  When you integrate BigQuery with Segment you get a fully managed data pipeline loaded into a powerful and cost-effective data warehouse.

The Segment warehouse connector runs a periodic ETL (Extract - Transform - Load) process to pull raw events and objects from your sources and load them into your BigQuery cluster. 
For more information about the ETL process, including how it works and common ETL use cases, refer to [Google Cloud's ETL documentation](https://cloud.google.com/learn/what-is-etl){:target="_blank"}.

## Getting Started

To store your Segment data in BigQuery, complete the following steps:
1. [Create a project and enable BigQuery](#create-a-project-and-enable-bigquery)
2. [Create a service account for Segment](#create-a-service-account-for-segment)
3. [Create the warehouse in Segment](#create-the-warehouse-in-segment)

### Create a Project and Enable BigQuery

To create a project and enable BigQuery:
1. Navigate to the [Google Developers Console](https://console.developers.google.com/){:target="_blank"}.
2. Configure the [Google Cloud Platform](https://console.cloud.google.com/){:target="_blank"}:
  - If you don't have a project already, [create one](https://support.google.com/cloud/answer/6251787?hl=en&ref_topic=6158848){:target="_blank"}.
  - If you have an existing project, [enable the BigQuery API](https://cloud.google.com/bigquery/quickstart-web-ui){:target="_blank"}. Once you've done so, you should see BigQuery in the "Resources" section of Cloud Platform.
3. Copy the project ID. You'll need it when you create a warehouse source in the Segment app.

> note "Enable billing"
> When you create your project, you must [enable billing](https://support.google.com/cloud/answer/6293499#enable-billing){:target="_blank"} so Segment can write into the cluster.

### Create a service account for Segment

To create a service account for Segment: 
1. From the Navigation panel on the left, select **IAM & admin** > **Service accounts**.
2. Click **Create Service Account**.
3. Enter a name for the service account (for example, `segment-warehouses`) and click **Create**.
4. Assign the service account the following roles:
    - `BigQuery Data Owner`
    - `BigQuery Job User`
5. [Create a JSON key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys){:target="_blank"}.
The downloaded file will be used to create your warehouse in the Segment app.

If you have trouble creating a new service account, refer to [Google Cloud's documentation about service accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts){:target="_blank"} for more information.

### Create the Warehouse in Segment

To create the warehouse in Segment: 
1. From the homepage of the Segment app, select **Connections > Add Destination** and search for **BigQuery**.
2. Click **BigQuery**.
3. Select the source(s) you'd like to sync with the BigQuery destination, and click **Next**.
3. Enter a name for your destination in the **Name your destination** field.
4. Enter your Project ID in the **Project ID** field.
  <br/>*Optional:* Enter a [region code](https://cloud.google.com/compute/docs/regions-zones/){:target="_blank"} in the **Location** field (the default is *US*.)
5. Copy the contents of the JSON key that you created for the Segment service account into the **Credentials** field.
6. Click **Connect**.

If Segment is able to connect to your project, a warehouse will be created and your first sync will begin shortly.

## Schema

BigQuery datasets are broken down into [**tables**](#partitioned-tables) and [**views**](#views). **Tables**
contain duplicate data, **views** do _not_ contain duplicate data.

### Partitioned Tables

The Segment connector uses [partitioned
tables](https://cloud.google.com/bigquery/docs/partitioned-tables){:target="_blank"}. Partitioned
tables allow you to query a subset of data, which increases query performance
and decreases costs.

To query a full table, use the following command:

```sql
select *
from <project-id>.<source-name>.<collection-name>
```

To query a specific partitioned table, use the following command:


```sql
select *
from <project-id>.<source-name>.<collection-name>$20160809
```

### Views

A [view](https://cloud.google.com/bigquery/querying-data#views){:target="_blank"} is a virtual
table defined by a SQL query. Segment uses views in the de-duplication process to
ensure that events that you are querying are unique events and contain the latest objects
from third-party data. All Segment views are set up to show information from the last
60 days. [Segment recommends querying from these views when possible](#use-views) to avoid duplicate events and historical objects.

Views are appended with `_view` , which you can query using this format:

```sql
select *
from <project-id>.<source-name>.<collection-name>_view
```

## Security

For early customers using BigQuery with Segment, rather than providing Segment
with credentials, access was granted to a shared Service Account
(`connector@segment-1119.iam.gserviceaccount.com`). While convenient for early
adopters, this presented potential security risks.

Segment now requires BigQuery customers to
create their own Service Accounts and provide the app with those credentials instead.
In addition, any attempts to update warehouse connection settings will also
require these credentials. This effectively deprecates the shared Service
Account.

Migrate your warehouse from a shared Service Account to a dedicated Service Account 
by creating a new Service Account using the [Create a Service Account for Segment](#create-a-service-account-for-segment) section.
Then, head to your warehouse's connection settings and update with the
credentials you created. Once you've verified that data is loading properly 
to your warehouse, [remove access to the shared Service Account](#remove-access-to-the-shared-service-account).

### Remove access to the shared Service Account
You can remove access to the shared Service Account 
(`connector@segment-1119.iam.gserviceaccount.com`) using the following instructions:

To remove access to the shared Service Account: 
1. Create a [new Service Account for Segment](#create-a-service-account-for-segment) using the linked instructions.
2. Verify that the data is loading into your warehouse. 
3. Sign in to the [Google Developers Console](https://console.developers.google.com){:target="_blank"}.
4. Open the IAM & Admin product, and select **IAM**.
5. From the list of projects, select the project that has BigQuery enabled.
6. On the project's page, select the **Permissions** tab, and then click **view by PRINCIPALS**. 
7. Select the checkbox for the `connector@segment-1119.iam.gserviceaccount.com` account and then click **Remove** to remove access to this shared Service Account.

For more information about managing IAM access, refer to Google's documentation, [Manage access to projects, folders, and organization](https://cloud.google.com/iam/docs/granting-changing-revoking-access){:target="_blank"}.


## Best Practices

### Use views

BigQuery charges based on the amount of data scanned by your queries. Views are
a derived view over your tables that Segment uses for de-duplication of events.
Therefore, Segment recommends you query a specific view whenever possible to avoid
duplicate events and historical objects. It's important to note that BigQuery
views aren't cached.
  
> note "Understanding BigQuery views"
> BigQuery's views are logical views, not materialized views, which means that the query that defines the view is re-executed every time the view is queried. Queries are billed according to the total amount of data in all table fields referenced directly or indirectly by the top-level query.

To save money, you can query the view and set a [destination
table](https://cloud.google.com/bigquery/docs/tables){:target="_blank"}, and then query the
destination table.

### Query structure

If you start exploratory data analysis with `SELECT *`, consider
specifying the fields to reduce costs.

Refer to the section on [partitioned tables](#partitioned-tables) for details on
querying sub-sets of tables.


## FAQs

### I need more than 60 days of data in my views. Can I change the view definition?

Yes! You just need to modify one of the references to `60` in the view
definition to the number of days of your choosing. You can update the definition of the view as long as the name stays
the same.

Here is the base query Segment uses when first setting up your views. Included in the base query are the placeholders (`%s.%s.%s`) that you would want to include the project,
dataset and table (in that order).

```sql
SELECT * EXCEPT (ROW_NUMBER) FROM (
 SELECT *, ROW_NUMBER() OVER (PARTITION BY id ORDER BY loaded_at DESC) ROW_NUMBER
  FROM ` + "`%s.%s.%s`" + `
  WHERE _PARTITIONTIME BETWEEN
    TIMESTAMP_TRUNC(TIMESTAMP_MICROS(UNIX_MICROS(CURRENT_TIMESTAMP()) - 60 * 60 * 60 * 24 * 1000000), DAY, 'UTC')
    AND TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), DAY, 'UTC')
 )
WHERE ROW_NUMBER = 1
```

### How does BigQuery pricing work?

BigQuery offers both a scalable, pay-as-you-go pricing plan based on the amount
of data scanned, or a flat-rate monthly cost. You can learn more about BigQuery
pricing [on Google Cloud's BigQuery pricing page](https://cloud.google.com/bigquery/pricing){:target="_blank"}.

BigQuery allows you to set up [Cost Controls and
Alerts](https://cloud.google.com/bigquery/cost-controls){:target="_blank"} to help control and
monitor costs. If you want to learn more about the costs associated with BigQuery,
Google Cloud provides [a
calculator](https://cloud.google.com/products/calculator/){:target="_blank"} to estimate your
costs.

### How do I query my data in BigQuery?

You can connect a BI tool like Mode or Looker to BigQuery, or query
directly from the BigQuery console.

BigQuery supports standard SQL, which you can enable [using Google Cloud's query UI](https://cloud.google.com/bigquery/docs/reference/standard-sql/introduction#changing_from_the_default_dialect){:target="_blank"}. 
This doesn't work with views, or with a query that uses table range 
functions.

### Does Segment support streaming inserts?

Segment's connector doesn't support streaming inserts at this time. If you have
a need for streaming data into BigQuery, [contact Segment support](https://segment.com/requests/integrations/){:target="_blank"}.

### Can I customize my sync schedule?

{% include content/warehouse-sync-sched.md %}

## Troubleshooting

### I see duplicates in my tables.

This behavior is expected. Segment only de-duplicates data in your views. Refer to the [schema section](#schema) for more details.