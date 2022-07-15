---
title: Data Lakes Sync Reports and Errors
---
{% include content/plan-grid.md name="data-lakes" %}


Segment Data Lakes generates reports with operational metrics about each sync to your data lake so you can monitor sync performance. These sync reports are stored in your S3 bucket and Glue Data Catalog. This means you have access to the raw data, so you can query it to answer questions and set up alerting and monitoring tools.

> note "This feature is not supported for the Azure Data Lakes public beta"
> The Sync Report tab is currently not supported for the Azure Data Lakes public beta. For more information about Azure Data Lakes, see the [Data Lakes overview documentation](/docs/connections/storage/data-lakes/index/#how-azure-data-lakes-works).

## Sync Report schema

Your sync_report table stores all of your sync data. You can query it to answer common questions about data synced to your data lake.
The table has the following columns in its schema:

| **Sync Metric**   | **Description**    |
| ----------------- | ------------------- |
| `workspace_id`    | Distinct ID assigned to each Segment workspace and [found in the workspace settings](https://app.segment.com/goto-my-workspace/settings/basic){:target="_blank"}. |
| `source_id`       | Distinct ID assigned to each Segment source, found in the Source Settings > API Keys > Source ID.         |
| `database`        | Name of the Glue Database used to store sync report tables. Segment automatically creates this database during the Data Lakes set up process.         |
| `emr_cluster_id`  | ID of the EMR cluster which Data Lakes uses, found in the [Data Lakes Settings page]().  |
| `s3_bucket`       | Name of the S3 bucket which Data Lakes uses, found in the [Data Lakes Settings page]().  |
| `run_id`          | ID dynamically generated and assigned to each Data Lakes sync run.   |
| `start_time`      | Time when the sync run started, in UTC.         |
| `finish_time`     | Time when the sync run finished, in UTC.        |
| `duration_mins`   | The length of the sync in minutes, calculated by the difference between the start and finish time.  |
| `status`          | Status of the sync. Values can either be `finished` for a successful sync or `failed` for a failed sync.   |
| `error_code`      | The type of error, which can include: insufficient permissions, invalid settings, or a Segment internal error.  |
| `error`           | If the sync failed, the error that describes the issue, for example “External ID is invalid”.    |
| `table_name`      | Name of the Segment event synced to S3.      |
| `row_count`       | Number of rows synced to S3 for a specific run.           |
| `partitions`      | Partitions added to the event tables during the sync.     |
| `new_columns`      | New columns inferred and added to event table during the sync.       |
| `day`             | Day on which the sync occurred.                       |
| `type`            | Defines whether the run metrics are at the source or event level. If type = source, the run aggregates data for syncs across all events within the source. If type = event, the run shows detailed sync metrics per event. |
| `replay`      | True or false value which indicates whether the sync run was a [replay](/docs/guides/what-is-replay/).     |
| `replay_from`      | Start date for the replay, if applicable.       |
| `replay_to`      | Finish date for the replay, if applicable.     |

The Glue Database named `__segment_datalake` stores the schema of the `sync_reports` table. The `__segment_datalake` database has the following format:

| Column name    | Data type   | Partition key  | Comment |
| -------------- | ----------- | -------------- | ------- |
| type           | string      |                |         |
| workspace_id   | string      |                |         |
| run_id         | string      |                |         |
| start_time     | timestamp   |                |         |
| finish_time    | timestamp   |                |         |
| duration_mins  | bigint      |                |         |
| status         | string      |                |         |
| error          | string      |                |         |
| error_code     | string      |                |         |
| table_name     | string      |                |         |
| database       | string      |                |         |
| partitions     | array       |                |         |
| new_columns    | array       |                |         |
| row_count      | bigint      |                |         |
| is_new         | boolean     |                |         |
| replay         | boolean     |                |         |
| replay_from    | timestamp   |                |         |
| replay_to      | timestamp   |                |         |
| emr_cluster_id | string      |                |         |
| s3_bucket      | string      |                |         |
| source_id      | string      | Partition (0)  |         |
| day            | string      | Partition (1)  |         |



The `sync_reports` table is available in S3 and Glue only once a sync completes. Sync reports are not available for syncs in progress.

## Data location

Data Lakes sync reports are stored in Glue and in S3.

Segment automatically creates a Glue Database and table when you set up Data Lakes to store all sync report tables. The Glue Database is named `__segment_datalake`, and the table is named `sync_reports`.

The S3 structure is:
`s3://my-bucket/segment-data/reports/day=YYYY-MM-DD/source=$SOURCE_ID/run_id=$RUN_ID/report.json`

## Data format

The data in the sync reports is stored in JSON format to ensure that it is human-readable and can be processed by other systems.

Each table involved in the sync is a separate JSON object that contains the sync metrics for the data loaded to that table.

The example below shows the raw JSON object for a **successful** sync report.

```json
  {
    "type": "source",
    "workspace_id": "P3IMS7SBDH",
    "source_id": "9IP56Shn6",
    "run_id": "1597581273464733073",
    "start_time": "2020-08-19 22:15:59.044084423",
    "finish_time": "2020-08-19 22:18:12.891",
    "duration_mins": 2,
    "status": "finished",
    "table_name": "",
    "database": "ios_prod",
    "row_count": 81020,
    "emr_cluster_id": "j-3SXSUSDNPIS",
    "s3_bucket": "my-segment-datalakes-bucket"
  }
  {
    "type": "event",
    "workspace_id": "P3IMS7SBDH",
    "source_id": "9IP56Shn6",
    "run_id": "1597581273464733073",
    "start_time": "2020-08-19 22:15:59.044084423",
    "finish_time": "2020-08-19 22:18:12.891",
    "duration_mins": 2,
    "status": "finished",
    "table_name": "track_order_completed",
    "database": "ios_prod",
    "partitions": [
      {
        "day": "2020-08-16",
        "hr": "10"
      },
      {
        "day": "2020-08-16",
        "hr": "11"
      }
    ],
   "new_columns": [
      {
        "name": "properties_billing_address",
        "type": "string"
      }
    ],
    "row_count": 20020,
    "emr_cluster_id": "j-3SXSUSDNPIS",
    "s3_bucket": "my-segment-datalakes-bucket"
  }
  {
    "type": "event",
    "workspace_id": "P3IMS7SBDH",
    "source_id": "9IP56Shn6",
    "run_id": "1597581273464733073",
    "start_time": "2020-08-19 22:15:59.044084423",
    "finish_time": "2020-08-19 22:18:12.891",
    "duration_mins": 2,
    "status": "finished",
    "table_name": "track_product_added",
    "database": "ios_prod",
    "partitions": [
      {
        "day": "2020-08-16",
        "hr": "10"
      }
    ],
    "row_count": 20260,
    "emr_cluster_id": "j-3SXSUSDNPIS",
    "s3_bucket": "my-segment-datalakes-bucket"
}
```


The example below shows the raw JSON object for a **failed** sync report.

```json
{
    "type": "source",
    "workspace_id": "P3IMS7SBDH",
    "source_id": "9IP56Shn6",
    "run_id": "1597867438900010296",
    "start_time": "2020-08-19 20:04:58.368616813",
    "finish_time": "2020-08-19 20:49:48.308318686",
    "duration_mins": 44,
    "status": "failed",
    "error": "Data Lakes Destination has invalid configuration for \"AWS Role ARN\": field is required.",
    "error_code": "Segment.Internal",
    "table_name": "",
    "database": "ios_prod",
    "emr_cluster_id": "j-3SXSUSDNPIS",
    "s3_bucket": "segment-datalakes-demo-stage"
}
```


## Querying the Sync Reports table

You can use SQL to query your Sync Reports table to explore and analyze operational sync metrics.
A few helpful and commonly used queries are included below.

#### Return row counts per day for a specific event

```sql
SELECT day,sum(row_count)
FROM "__segment_datalake"."sync_reports"
WHERE source_id='9IP56Shn6' and table_name='checkout_started'
GROUP BY day
ORDER BY day
```

#### Return row counts per day for all events in the source

```sql
SELECT day, table_name,sum(row_count)
FROM "__segment_datalake"."sync_reports"
WHERE source_id='9IP56Shn6' AND type='event'
GROUP BY day, table_name
ORDER BY day
```

#### Find the most recent successful sync

```sql
SELECT max(finish_time)
FROM "__segment_datalake"."sync_reports"
WHERE source_id='9IP56Shn6' AND status='finished' AND date(day) = CURRENT_DATE
LIMIT 1
```

#### Find all failures in the last N days

```sql
SELECT run_id, status, error, error_code
FROM "__segment_datalake"."sync_reports"
WHERE source_id='9IP56Shn6' AND status='failed' AND date(day) >= (CURRENT_DATE - interval '2' day)
```

## Sync errors

The following error types can cause your data lake syncs to fail:
- **[Insufficient permissions](#insufficient-permissions)** - Segment does not have the permissions necessary to perform a critical operation. You must grant Segment additional permissions.
- **[Invalid settings](#invalid-settings)** - The settings are invalid. This could be caused by a missing required field, or a validation check that fails. The invalid setting must be corrected before the sync can succeed.
- **[Internal error](#internal-error)** - An error occurred in Segment's internal systems. This should resolve on its own. [Contact the Segment Support team](https://segment.com/help/contact/){:target="_blank"} if the sync failure persists.

### Insufficient permissions

If Data Lakes does not have the correct access permissions for S3, Glue, and EMR, your syncs will fail.

If permissions are the problem, you might see one of the following permissions-related error messages:

- "Segment was unable to upload staging data to your S3 Bucket due to a lack of sufficient permissions".
- "Segment does not have permissions to download object from S3 Bucket".
- "Segment does not have permissions to upload object to S3 Bucket".
- "Segment does not have permissions to delete S3 objects from S3 Bucket".
- "Segment does not have permissions to submit an EMR job to cluster".
- "Segment does not have permissions to check the status of EMR Job on EMR Cluster".
- "Segment does not have permissions to delete table from Glue Catalog".
- "Segment does not have permissions to fetch schema information from Glue catalog".

[Check the set up guide](/docs/connections/storage/data-lakes/data-lakes-manual-setup/) to ensure that you set up the required permission configuration for S3, Glue and EMR.

### Invalid settings

One or more settings might be incorrectly configured in the Segment app, preventing your Data Lakes syncs from succeeding.

If you have invalid settings, you might see one of the error messages below:

- "Data Lakes Destination has invalid configuration."
- "The Table Partitions configuration for this Data Lake is invalid. The field name does not appear to map to the data being processed, which likely means it is misconfigured."
- "External ID is invalid. Please ensure the external ID in the IAM role used to connect to your Data Lake matches the source ID."
- "External ID is not set. Please ensure that the IAM role used to connect to your Data Lake has the source ID in the list of external IDs."

The most common error occurs when you do not list all Source IDs in the External ID section of the IAM role. You can find your Source IDs in the Segment workspace, and you must add each one to the list of [External IDs](https://github.com/segmentio/terraform-aws-data-lake/tree/master/modules/iam#external_ids){:target="_blank"} in the IAM policy. You can either update the IAM policy from the AWS Console, or re-run the [Data Lakes set up Terraform job](https://github.com/segmentio/terraform-aws-data-lake){:target="_blank"}.

### Internal error

Internal errors occur in Segment's internal systems, and should resolve on their own. If sync failures persist, [contact the Segment Support team](https://segment.com/help/contact/){:target="_blank"}.

## FAQ

### How are Data Lakes sync reports different from the sync data for Segment Warehouses?
Both Warehouses and Data Lakes provide similar information about syncs, including the start and finish time, rows synced, and errors.

However, Warehouse sync information is only available in the Segment app: on the Sync History page and Warehouse Health pages. With Data Lakes sync reports, the raw sync information is sent directly to your data lake. This means you can query the raw data and answer your own questions about syncs, and use the data to power alerting and monitoring tools.

### What happens if a sync is partly successful?
Sync reports are currently generated only when a sync completes, or when it fails. Partial failure reporting is not currently supported.