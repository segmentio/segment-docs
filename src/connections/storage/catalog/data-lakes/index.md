---
hidden: true
title: Data Lakes (Beta)
redirect_from: '/connections/destinations/catalog/data-lakes/'
---

Segment Data Lakes provide a way to collect large quantities of data in a format that's optimized for targeted data science and data analytics workflows. You can read [more information about Data Lakes](/docs/connections/storage/data-lakes/) and learn [how they differ from warehouses](/docs/connections/storage/data-lakes/comparison/) in our documentation.

> info ""
> Segment Data Lakes is available to Business tier customers only.

## Pre-Requisites

Before you set up Segment Data Lakes, you need the following resources:

- An authorized [AWS account](https://aws.amazon.com/account/)
- An [Amazon S3 bucket](https://github.com/terraform-aws-modules/terraform-aws-s3-bucket) to send data to and store logs
- A subnet within a VPC for the EMR cluster to run in

## Step 1 - Set Up AWS Resources

You can use the [open source Terraform module](https://github.com/segmentio/terraform-aws-data-lake) to automate much of the set up work to get Data Lakes up and running. If you’re familiar with Terraform, you can modify the module to meet your organization’s needs, however we can only guarantee support for the template as provided. The Terraform version should be > 0.12.

You can also use our [manual set up instructions](https://docs.google.com/document/d/1GlWzS5KO4QaiVZx9pwfpgF-N-Xy2e_QQcdYSX-nLMDU/view) to configure these AWS resources if you prefer.

The Terraform module and manual set up instructions both provide a base level of permissions to Segment (for example, the correct IAM role to allow Segment to create Glue databases on your behalf). If you want stricter permissions, or other custom configurations, you can customize these manually.

## Step 2 - Enable Data Lakes Destination

After you set up the necessary AWS resources:

1. [Contact the Support team](https://segment.com/help/contact/) to receive a link to the Data Lakes landing page in your workspace.

2. Click the link provided, and from the Data Lakes landing page, click **Configure Data Lakes**.

3. Select the source to connect to the Data Lakes destination.

   Each source must be individually connected to the Data Lakes destination. However, you can copy the settings from another source by clicking the “…” button (next to the button for “Setup Guide”).

   > **Note**: You must include all source ids in the external ID list in the IAM policy, or else the source data cannot be synced to S3.

4. In the Settings tab, enter and save the following connection settings:
   - **AWS Region**: The AWS Region where your EMR cluster, S3 Bucket and Glue DB reside.
   - **EMR Cluster ID**: The EMR Cluster ID where the Data Lakes jobs will be run.
   - **Glue Catalog ID**: The Glue Catalog ID (this must be the same as your AWS account ID).
   - **IAM Role ARN**: The ARN of the IAM role that Segment will use to connect to Data Lakes.
   - **S3 Bucket**: Name of the S3 bucket used by Data Lakes. The EMR cluster will store logs in this bucket.

5. _(Optional)_ **Date Partition**: Optional setting to change the date partition structure, with a default structure `day=<YYYY-MM-DD>/hr=<HH>`. To use the default, leave this setting unchanged. To partition the data by a different date structure, choose one of the following options:
  - Day/Hour [YYYY-MM-DD/HH] (Default)
  - Year/Month/Day/Hour [YYYY/MM/DD/HH]
  - Year/Month/Day [YYYY/MM/DD]
  - Day [YYYY-MM-DD]

6. Enable the Data Lakes destination by toggling the switch next to the “Setup Guide” button to on.

Once the Data Lakes destination is enabled, the first sync will begin approximately 2 hours later.


## (Optional) Step 3 - Replay Historical Data

If you want to add historical data to your data set using a [replay of historical data](/docs/guides/what-is-replay/) into Data Lakes, [contact the Segment Support team](https://segment.com/help/contact/) to request one.

The time needed to process a Replay can vary depending on the volume of data and number of events in each source. If you decide to run a Replay, we recommend that you start with data from the last six months to get started, and then replay additional data if you find you need more.

Segment uses a creates a separate EMR cluster to run replays, then destroys it when the replay finished. This ensures that regular Data Lakes syncs are not interrupted, and helps the replay finish faster.

# Common Questions

## Data Lakes Set Up

##### Do I need to create Glue databases?

No, Data Lakes automatically creates one Glue database per source. This database uses the source slug as its name.

##### What IAM role do I use in the Settings page?

If setting up Data Lakes using Terraform, you will see that four roles are created. The role to add to the Data Lakes Settings page in-app is `arn:aws:iam::$ACCOUNT_ID:role/segment-data-lake-iam-role`.

##### What level of access does the roles have?

There are four roles which Data Lakes assigns during set up:

- **`segment-datalake-iam-role`** - This is the role that Segment assumes to access S3, Glue and the EMR cluster. It allows Segment access to:
  - Get, create, delete access to the Glue catalog. Note that this does not provide access to Glue ETL or Glue crawlers.
  - Access only to the specific S3 bucket used for Data Lakes.
  - EMR access only to the clusters having the `vendor=segment` tag

- **`segment_emr_service_role`** - Restricted role that can only be assumed by the EMR service. This is set up based on [AWS best practices](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-iam-role.html).

- **`segment_emr_instance_profile_role`** - Role that is assumed by the applications running on the EMR cluster. Based on [AWS best practices](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-iam-role-for-ec2.html), it allows Segment access to:
  - Get, create, delete access to the Glue catalog. Note that this does not provide access to Glue ETL or Glue crawlers.
  - Access only to the specific S3 bucket used for Data Lakes.

- **`segment_emr_autoscaling_role`** - Restricted role that can only be assumed by EMR and EC2. This is set up based on [AWS best practices](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-iam-role-automatic-scaling.html).

##### Why doesn't the Data Lakes Terraform module create an S3 bucket?

The module doesn't create a new S3 bucket so you can re-use an existing bucket for your Data Lakes.

##### Does my S3 bucket need to be in the same region as the other infrastructure?

Yes, the S3 bucket and the EMR cluster must be in the same region.

##### How do I connect a new source to Data Lakes?

To connect a new source to Data Lakes:

1. Add the `source_id` found in the Segment workspace into the list of [external ids](https://github.com/segmentio/terraform-aws-data-lake/tree/master/modules/iam#external_ids) in the IAM policy. You can either update this from the AWS console, or re-run the [Terraform](https://github.com/segmentio/terraform-aws-data-lake) job.
2. From your Segment workspace, connect the source to the Data Lakes destination.

##### Can I configure multiple sources to use the same EMR cluster?

Yes, you can configure multiple sources to use the same EMR cluster. We recommend that the EMR cluster only be used for Data Lakes to ensure there aren't interruptions from non-Data Lakes jobs.


 ## Post-Set Up

 ##### Why don't I see any data in S3 or Glue after enabling a source?

If you don't see data after enabling a source, check the following:
- Is the EMR cluster running?
- Is the correct IAM role and S3 bucket configured in the settings?
- Does the IAM role have the Segment account ID and source IDs as the external IDs?

If all of these look correct and you're still not seeing any data, please [contact the Support team](https://segment.com/help/contact/).

##### What are "Segment Output" tables in S3?

The `output` tables are temporary tables Segment creates when loading data. They are deleted after each sync.

##### Can I make additional directories in the S3 bucket Data Lakes is using?

Yes, you can create new directories in S3 without interfering with Segment data.
Do not modify, or create additional directories with the following names:
- `logs/`
- `segment-stage/`
- `segment-data/`
- `segment-logs/`

##### What does "partitioned" mean in the table name?

`Partitioned` just means that the table has partition columns (day and hour). All tables are partitioned, so you should see this on all table names.

##### Why are the Filters, Event Tester and Event Delivery tabs in-app empty?

Data Lakes does not currently support these features. Sync history information will be available soon.

##### How can I use AWS Spectrum to access Data Lakes tables in Glue, and join it with Redshift data?

You can use the following command to create external tables in Spectrum to access tables in Glue and join the data with Redshift:

Run the `CREATE EXTERNAL SCHEMA` command:

```sql
create external schema `spectrum_schema_name`
from data catalog
database `glue_db_name`
iam_role `arn:aws:iam::123456789012:role/MySpectrumRole`
create external database if not exists;
```

Replace:
- `glue_db_name` = The Glue database created by Data Lakes which is named after the source slug
- `spectrum_schema_name` = The schema name in Redshift you want to map to
