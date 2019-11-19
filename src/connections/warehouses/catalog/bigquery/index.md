---
title: BigQuery Destination
rewrite: true
---


Segment's [BigQuery](https://cloud.google.com/bigquery/) connector makes it easy
to load web, mobile, and third-party source data like Salesforce, Zendesk, and
Google AdWords into a BigQuery data warehouse.  This guide will explain how to
set up BigQuery and start loading data into it.

The Segment warehouse connector runs a periodic ETL (Extract - Transform - Load)
process to pull raw events and objects and load them into your BigQuery cluster.

Using BigQuery through Segment means you'll get a fully managed data pipeline
loaded into one of the most powerful and cost-effective data warehouses today.

This document was last updated on March 12, 2019. If you notice any gaps,
out-dated information or simply want to leave some feedback to help us improve
our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

First, you'll want to enable BigQuery for your Google Cloud project. Then, you
will create a Service Account for Segment to use. Last, you will create the
warehouse in Segment.

### Create a Project and Enable BigQuery

1. Navigate to the [Google Developers Console](https://console.developers.google.com/)
2. Configure [Cloud Platform](https://console.cloud.google.com/):
  - If you don't have a project already, [create one](https://support.google.com/cloud/answer/6251787?hl=en&ref_topic=6158848).
  - If you have an existing project, you will need to [enable the BigQuery API](https://cloud.google.com/bigquery/quickstart-web-ui).
    Once you've done so, you should see BigQuery in the ["Resources" section](https://cl.ly/0W2i2I2B2R0M) of Cloud Platform.
  - **Note:** make sure [billing is enabled](https://support.google.com/cloud/answer/6293499#enable-billing) on your project,
    otherwise Segment will not be able to write into the cluster.
3. Copy your project ID, as you will need it later.

### Create a Service Account for Segment

Refer to [Google Cloud's documentation about service
accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts)
for more information.

1. From the Navigation panel on the left, go to **IAM & admin** > **Service accounts**
2. Click **Create Service Account** along the top
3. Enter a name (for example: "segment-warehouses") and click **Create**
4. When assigning permissions, make sure to grant the following roles:
    - `BigQuery Data Owner`
    - `BigQuery Job User`
5. [Create a JSON key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).
The downloaded file will be used to create your warehouse in the next section.

### Create the Warehouse in Segment

1. In Segment, go to **Workspace** > **Add destination** > Search for "BigQuery"
2. Select **BigQuery**
3. Enter your project ID in the **Project** field
4. Copy the contents of the credentials (the JSON key) into the **Credentials** field
5. (Optional) Enter a [region code](https://cloud.google.com/compute/docs/regions-zones/) in the **Location** field (the default will be "US")
6. Click **Connect**
7. if Segment is able to successfully connect with the **Project ID** and **Credentials**,
the warehouse will be created and your first sync should begin shortly

### Schema

BigQuery datasets are broken down into **tables** and **views**. **Tables**
contain duplicate data, **views** do _not_.

#### Partitioned Tables

The Segment connector takes advantage of [partitioned
tables](https://cloud.google.com/bigquery/docs/partitioned-tables). Partitioned
tables allow you to query a subset of data, thus increasing query performance
and decreasing costs.

To query a full table, you can query like this:

```sql
select *
from <project-id>.<source-name>.<collection-name>
```

To query a specific partitioned table, you can query like this:


```sql
select *
from <project-id>.<source-name>.<collection-name>$20160809
```

#### Views

A [view](https://cloud.google.com/bigquery/querying-data#views) is a virtual
table defined by a SQL query. We use views in our de-duplication process to
ensure that events that you are querying unique events, and the latest objects
from third-party data. All our views are setup to show information from the last
60 days. Whenever possible, we recommend that you query from these views.

Views are appended with `_view` , which you can query like this:

```sql
select *
from <project-id>.<source-name>.<collection-name>_view
```

## Security

For early customers using BigQuery with Segment, rather than providing Segment
with credentials, access was granted to a shared Service Account
(`connector@segment-1119.iam.gserviceaccount.com`). While convenient early
adopters, this presents potential security risks that we would prefer to address
proactively.

Starting in **March 2019**, we're going to start requiring BigQuery customers to
create their own Service Accounts and provide us with those credentials instead.
In addition, any attempts to update warehouse connection settings will also
require these credentials. This effectively deprecates the shared Service
Account, and in the future it will be deactivated completely.

In order to stay ahead of this, make sure to migrate your warehouse by following
the instructions in the "Create a Service Account for Segment" section above.
Then, head to your warehouse's connection settings and update with the
**Credentials** you created along the way.


## Best Practices

### Use views

BigQuery charges based on the amount of data scanned by your queries. Views are
a derived view over your tables that we use for de-duplication of events.
Therefore, we recommend you query a specific view whenever possible to avoid
duplicate events and historical objects. It's important to note that BigQuery
views are not cached:

> BigQuery's views are logical views, not materialized views, which means that
> the query that defines the view is re-executed every time the view is queried.
> Queries are billed according to the total amount of data in all table fields
> referenced directly or indirectly by the top-level query.

To save more money, you can query the view and set a [destination
table](https://cloud.google.com/bigquery/docs/tables), and then query the
destination table.

### Query structure

If you typically start exploratory data analysis with `SELECT *` consider
specifying the fields to reduce costs.

See the section on [partitioned tables](#partitioned-tables) for details on
querying sub-sets of tables.


## FAQs

### I need more than 60 days of data in my views. Can I change the view definition?

Absolutely! You will just need to modify one of the references to 60 in the view
definition to the number of days of your choosing.

We chose 60 days as it suits the needs for most of our customers. However,
you're welcome to update the definition of the view as long as the name stays
the same.

Here is the base query we use when first setting up your views. We are leaving
in the placeholders (`%s.%s.%s`) where you would want to include the project,
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
pricing [here](https://cloud.google.com/bigquery/pricing).

BigQuery allows you to setup [Cost Controls and
Alerts](https://cloud.google.com/bigquery/cost-controls) to help control and
monitor costs. If you want to learn more about what BigQuery will cost you,
they've provided [this
calculator](https://cloud.google.com/products/calculator/) to estimate your
costs.

### How do I query my data in BigQuery?

You can connect to BigQuery using a BI tool like Mode or Looker, or query
directly from the BigQuery console.

BigQuery now supports standard SQL, which you can enable via their query UI.
This does not work with views, or with a query that utilizes table range
functions.

### Does Segment support streaming inserts?

Segment's connector does not support streaming inserts at this time. If you have
a need for streaming data into BigQuery, please [contact us](/contact/requests).

### Can I customize my sync schedule?

{% include content/warehouse-sync-sched.md %}

![sync schedule image](images/syncsched.png)

## Troubleshooting

### I'm seeing duplicates in my tables.

This behavior is expected. We only de-duplicate data in your views. See the
section on [views](#views) for more details.
