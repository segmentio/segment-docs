---
hidden: true
title: Data Lakes (Beta)
redirect_from: '/connections/destinations/catalog/data-lakes/'
---

Segment Data Lakes provide a way to collect large quantities of data in a format that's optimized for targeted data science and data analytics workflows. You can read [more information about Data Lakes](/docs/connections/storage/data-lakes/) and learn [how they differ from warehouses](/docs/connections/storage/data-lakes/comparison/) in our documentation.

## Pre-Requisites

Before you set up Segment Data Lakes, you need the following resources:

- An authorized [AWS account](https://aws.amazon.com/account/)
- An [Amazon S3 bucket](https://github.com/terraform-aws-modules/terraform-aws-s3-bucket) to send data to and store logs
- A subnet within a VPC for the EMR cluster to run in

## Step 1 - Set Up AWS Resources

You can use the [open source Terraform module](https://github.com/segmentio/terraform-aws-data-lake) to automate much of the set up work to get Segment Data Lakes up and running. If you’re familiar with Terraform, you can modify the module to meet your organization’s needs. However we can only guarantee support for the template as provided.

You can also use our [manual set up instructions](https://docs.google.com/document/d/1GlWzS5KO4QaiVZx9pwfpgF-N-Xy2e_QQcdYSX-nLMDU/view) to configure these AWS resources if you prefer.

The Terraform module and manual set up instructions both provide a base level of permissions to Segment (for example, the correct IAM role to allow Segment to create Glue databases on your behalf). If you want stricter permissions, or other custom configurations, you can customize these manually.

## Step 2 - Enable Destination

Once you set up the necessary AWS resources:

1. Visit [the Data Lakes landing page in your workspace](https://app.segment.com/goto-my-workspace/destinations/catalog/data-lakes). (Make sure you're in the correct workspace before continuing.)

2. Click **Configure Data Lakes**.

3. Select the source to connect to the Data Lakes destination.

   Each source must be individually connected to the Data Lakes destination. However, you can copy the settings from another source by clicking the “…” button (next to the button for “Setup Guide”).

   > **Note**: You must include all source ids in the external ID list in the IAM policy, or else the source data cannot be synced to S3.

4. In the Settings tab, enter and save the following connection settings:
   - **AWS Region**: The AWS Region where your EMR cluster, S3 Bucket and Glue DB reside.
   - **EMR Cluster ID**: The EMR Cluster ID where your jobs will be run.
   - **Glue Catalog ID**: The Glue Catalog ID (this must be the same as your AWS account ID).
   - **Glue Database Name**: The name of the Glue Database where your schema will be written.
   - **IAM Role ARN**: The ARN of the IAM role that Segment will use to connect to your Data Lake.
   - **S3 Bucket**: Name of the S3 bucket used by the Data Lake. The EMR cluster will be configured to store logs in this bucket.
   - _(Optional)_ **Table Prefix**: Optional prefix to use for the tables created in Glue. This configuration is useful if you prefer to use the same Glue Database for all your sources where the prefix can help separate out event tables for each source. Refer to the Glue Database section above to learn the recommended way to use the table prefix.

5. Enable the Data Lakes destination by toggling the switch next to the “Setup Guide” button to on.

Once the Data Lakes destination is enabled, the first sync will begin approximately 2 hours later.


> warning ""
> Warning: Changing the table prefix will modify the table names created in Glue, and will require a backfill for the older data.

## (Optional) Step 3 - Replay Historical Data

If you’re on a Business plan and want to add historical data to your data set using a [replay of historical data](/docs/guides/what-is-replay/) into your Data Lake, [contact the Segment Support team](https://segment.com/help/contact/) to request one.

The time needed to process a Replay can vary depending on the volume of data and number of events in each source. If you decide to run a Replay, we recommend that you start with data from the last six months to get started, and then replay additional data if you find you need more.

Segment uses a creates a separate EMR cluster to run replays, then destroys it when the replay finished. This ensures that regular Data Lakes syncs are not interrupted, and helps the replay finish faster.

# Common Questions

##### How do I connect a new source to Data Lakes?

To connect a new source to Data Lakes:

1. Add the `source_id` found in the Segment workspace into the list of [external ids](https://github.com/segmentio/terraform-aws-data-lake/tree/master/modules/iam#external_ids) in the IAM policy. You can either update this from the AWS console, or re-run the [Terraform](https://github.com/segmentio/terraform-aws-data-lake) job.
2. From your Segment workspace, connect the source to the Data Lakes destination.
