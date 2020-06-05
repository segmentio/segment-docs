---
hidden: true
title: Data Lakes (Beta)
redirect_from: '/connections/destinations/catalog/data-lakes/'
---

# Getting Started

## Step 1 - Pre-Requisites

Before you set up Segment Data Lakes, you’ll need the following resources:

- An authorized [AWS account](https://aws.amazon.com/account/)
- A [S3 bucket](https://github.com/terraform-aws-modules/terraform-aws-s3-bucket) to send data to and store logs
- A subnet within a VPC for the EMR cluster to run in

## Step 2 - Set Up AWS Resources

You can use this [open source Terraform repo](https://github.com/segmentio/terraform-aws-data-lake) to automate a lot of the set up work to get Segment Data Lakes up and running. We also have [UI based setup docs](https://docs.google.com/document/d/1GlWzS5KO4QaiVZx9pwfpgF-N-Xy2e_QQcdYSX-nLMDU/edit?usp=sharing) if you prefer to use these instead.

The Terraform module and UI instructions provide a base level of permissions to Segment (for example, the correct IAM role to allow Segment to create Glue databases on your behalf). If you want stricter permissions, or other custom configurations, you can customize these manually.

## Step 3 - Enable Destination

Once you’ve set up the necessary AWS resources:

1. Visit [the Data Lakes landing page in your workspace](https://app.segment.com/goto-my-workspace/destinations/catalog/data-lakes). (Make sure you're in the correct workspace before continuing.)

2. Click **Configure Data Lakes**.

3. Select the source to connect to the Data Lakes destination. Each source must be individually connected to the Data Lakes destination, however you can copy the settings from another source by clicking the “…” button (next to the button for “Setup Guide”).

   > **Note**: All sources must be included in the external ID list or else the source data cannot be synced to S3.

4. In the Settings tab, enter and save the following connection settings:
   - **AWS Region**: The AWS Region where your EMR cluster, S3 Bucket and Glue DB reside.
   - **EMR Cluster ID**: The EMR Cluster ID where your jobs will be run.
   - **Glue Catalog ID**: The Glue Catalog ID (this must be the same as your AWS account ID).
   - **Glue Database Name**: The name of the Glue Database where your schema will be written.
   - **IAM Role ARN**: The ARN of the IAM role that Segment will use to connect to your Data Lake.
   - **S3 Bucket**: Name of the S3 bucket used by the Data Lake. The EMR cluster will be configured to store logs in this bucket.
   - _(Optional)_ **Table Prefix**: Optional prefix to use for the tables created in Glue. This configuration is useful if you prefer to use the same Glue Database for all your sources where the prefix can help separate out event tables for each source. Refer to the Glue Database section above to learn the recommended way to use the table prefix.

5. Enable the Data Lakes destination by toggling the switch next to the “Setup Guide” button to on.

Once the Data Lakes destination is enabled, the first sync will begin ~2 hours later.


> warning ""
> Warning: Changing the table prefix will modify the table names created in Glue and will require a backfill for the older data.

## (Optional) Step 4 - Replay Historical Data

If you’re a Business plan customer and would like to [replay historical data](/docs/guides/what-is-replay/) into your Data Lake to have a more valuable data set, please reach out to the Segment team to request a replay.

Replays can take varying amounts of time based on the volume of data and number of events in each source. We recommend starting with a replay of data from the last six months to allow you to have a data set to get started, and then replaying more data after that.

We are able to use a separate EMR cluster for replays to ensure the regular Data Lakes syncs aren't interrupted, and the replays finish faster. To do this, Segment will spin up and down an EMR cluster to use just for replays.


# Common Questions

##### How do I connect a new source to Data Lakes?
To connect a new source to Data Lakes, you'll need to:
1. Add the source_id found in the Segment workspace into the list of [external ids] (https://github.com/segmentio/terraform-aws-data-lake/tree/master/modules/iam#external_ids) within the IAM policy. You can either update this within the AWS console, or re-run [Terraform] (https://github.com/segmentio/terraform-aws-data-lake).
2. Connect the source to the Data Lakes destination in your Segment workspace.
