---
title: Set Up Segment Data Lakes
redirect_from: '/connections/destinations/catalog/data-lakes/'
---

Segment Data Lakes provide a way to collect large quantities of data in a format that's optimized for targeted data science and data analytics workflows. You can read [more information about Data Lakes](/docs/connections/storage/data-lakes/) and learn [how they differ from Warehouses](/docs/connections/storage/data-lakes/comparison/) in our documentation.

> info ""
> Segment Data Lakes is available to Business tier customers only.

## Pre-Requisites

Before you set up Segment Data Lakes, you need the following resources:

- An [AWS account](https://aws.amazon.com/account/)
- An [Amazon S3 bucket](https://github.com/terraform-aws-modules/terraform-aws-s3-bucket) to receive data and store logs
- A subnet within a VPC for the EMR cluster to run in

## AWS Configuration

You can use the [open source Terraform module](https://github.com/segmentio/terraform-aws-data-lake) to automate much of the set up work to get Data Lakes up and running. If you’re familiar with Terraform, you can modify the module to meet your organization’s needs, however Segment guarantees support only for the template as provided. The Data Lakes set up uses Terraform v0.11+. To support additional versions of Terraform, the aws provider must use v2, which is included in our example main.tf.

If you're not familiar with the Terraform module, and prefer to configure AWS manually, see the [Manual configuration instructions](#manual-configuration-instructions) below.

The Terraform module and manual set up instructions both provide a base level of permissions to Segment (for example, the correct IAM role to allow Segment to create Glue databases on your behalf). If you want stricter permissions, or other custom configurations, you can customize these manually.

### Step 1 - Enable Data Lakes Destination

After you set up the necessary AWS resources, the next step is to set up the Data Lakes destination within Segment:

1. In the [Segment App](https://app.segment.com/goto-my-workspace/overview), click **Add Destination**, then search for and select **Data Lakes**.

2. Click **Configure Data Lakes** and select the source to connect to the Data Lakes destination.
  **Warning**:You must include all source ids in the external ID list in the IAM policy, or else the source data cannot be synced to S3.

3. In the Settings tab, enter and save the following connection settings:
   - **AWS Region**: The AWS Region where your EMR cluster, S3 Bucket and Glue DB reside. Ex: `us-west-2`
   - **EMR Cluster ID**: The EMR Cluster ID where the Data Lakes jobs will be run.
   - **Glue Catalog ID**: The Glue Catalog ID (this must be the same as your AWS account ID).
   - **IAM Role ARN**: The ARN of the IAM role that Segment will use to connect to Data Lakes. Ex: `arn:aws:iam::000000000000:role/SegmentDataLakeRole`
   - **S3 Bucket**: Name of the S3 bucket used by Data Lakes. The EMR cluster will store logs in this bucket. Ex: `segment-data-lake`

   You must individually connect each source to the Data Lakes destination. However, you can copy the settings from another source by clicking **…** ("more") (next to the button for “Set up Guide”).

4. _(Optional)_ **Date Partition**: Optional advanced setting to change the date partition structure, with a default structure `day=<YYYY-MM-DD>/hr=<HH>`. To use the default, leave this setting unchanged. To partition the data by a different date structure, choose one of the following options:
  - Day/Hour [YYYY-MM-DD/HH] (Default)
  - Year/Month/Day/Hour [YYYY/MM/DD/HH]
  - Year/Month/Day [YYYY/MM/DD]
  - Day [YYYY-MM-DD]

5. _(Optional)_ **Glue Database Name**: Optional advanced setting to change the name of the Glue Database which is set to the source slug by default. Each source connected to Data Lakes must have a different Glue Database name otherwise data from different sources will collide in the same database.

6. Enable the Data Lakes destination by clicking the toggle near the **Set up Guide** button.

Once the Data Lakes destination is enabled, the first sync will begin approximately 2 hours later.


### Step 3 - Verify Data is Synced to S3 and Glue

You will see event data and [sync reports](https://segment.com/docs/connections/storage/data-lakes/sync-reports) populated in S3 and Glue after the first sync successfully completes. However if an [insufficient permission](https://segment.com/docs/connections/storage/data-lakes/sync-reports/#insufficient-permissions) or [invalid setting](https://segment.com/docs/connections/storage/data-lakes/sync-reports/#invalid-settings) is provided during set up, the first data lake sync will fail.

To be alerted of sync failures via email, subscribe to the `Storage Destination Sync Failed` activity email notification within the App Settings > User Preferences > [Notification Settings](https://app.segment.com/goto-my-workspace/settings/notifications).
![](images/dl_activity_notifications2.png)

`Sync Failed` emails are sent on the 1st, 5th and 20th sync failure. Learn more about the types of errors which can cause sync failures [here](https://segment.com/docs/connections/storage/data-lakes/sync-reports/#sync-errors).


### (Optional) Step 4 - Replay Historical Data

If you want to add historical data to your data set using a [replay of historical data](/docs/guides/what-is-replay/) into Data Lakes, [contact the Segment Support team](https://segment.com/help/contact/) to request one.

The time needed to process a Replay can vary depending on the volume of data and number of events in each source. If you decide to run a Replay, we recommend that you start with data from the last six months to get started, and then replay additional data if you find you need more.

Segment creates a separate EMR cluster to run replays, then destroys it when the replay finished. This ensures that regular Data Lakes syncs are not interrupted, and helps the replay finish faster.

## Manual configuration instructions

The instructions below will guide you through the process required to configure the environment required to begin loading data into your Segment Data Lake. For a more automated process, see [Step 1 - Configure AWS Resources](#step-1---configure-aws-resources) above.


### Step 1 - Create an S3 Bucket

In this step, you'll create the S3 bucket that will store both the intermediate and final data.

> info ""
> Take note of the S3 bucket name you set in this step, as the rest of the set up flow requires it. In these instructions, `segment-data-lake` is used.

During the set up process, create a Lifecycle rule and set it to expire staging data after 14 days. For more information, see Amazon's documentation, [How do I create a lifecycle?](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-lifecycle.html). 

### Step 2 - Configure an EMR cluster

Segment requires access to an EMR cluster to perform necessary data processing. We recommend starting with a small cluster, with the option to add more compute as required.

#### Configure the hardware and networking configuration

1. Locate and select EMR from the AWS console.
2. Click **Create Cluster**, and open the **Advanced Options**.
3. In the Advanced Options, on Step 1: Software and Steps, ensure the following options are selected, along with the defaults:
   - `Use for Hive table metadata`
   - `Use for Spark table metadata`
4. In the Networking setup section, select to create the cluster in either a public or private subnet. Creating the cluster in a private subnet is more secure, but requires some additional configuration. Creating a cluster in a public subnet is accessible from the internet. However, you can configure strict security groups to prevent inbound access to the cluster. See Amazon's document, [Amazon VPC Options - Amazon EMR](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-clusters-in-a-vpc.html) for more information. As a best practice, Segment recommends that you consult with your network and security before you configure your EMR cluster.
5. In the Hardware Configuration section, create a cluster with the nodes listed below. This configuration uses the default **On demand** purchasing option for the instances.
   - **1** master node
   - **2** core nodes
   - **2** task nodes
 
For more information about configuring the cluster hardware and networking, see Amazon's document, [Configure Cluster Hardware and Networking](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-instances.html).

#### Enable EMR managed scaling for the Core and Task nodes

On the **Cluster Scaling** settings, select **Use EMR-managed scaling**, and select the following number of task units:
- Minimum: **2**
- Maximum: **8**
- On-demand limit: **8**
- Maximum Core Node: **2**

#### Configure logging

On the General Options step, configure logging to use the same S3 bucket you configured as the destination for the final data (`segment-data-lakes` in this case). Once configured, logs will be written to a new prefix, and separated from the final processed data.

Set value of the **vendor** tag to `segment`.

#### Secure the cluster

On the Security step, ensure that the following steps have been completed:
1. Create or select an **EC2 key pair**.
2. Choose the appropriate roles in the **EC2 instance profile**.
3. Select the appropriate security groups for the Master and Core & Task types.

### Step 3 - Create an Access Management role and policy

The following steps provide examples of the IAM Role and IAM Policy.

#### IAM Role

Create a `segment-data-lake-role` role for Segment to assume. Attach the following trust relationship document to the role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "arn:aws:iam::294048959147:role/customer-datalakes-prod-admin",
          "arn:aws:iam::294048959147:role/datalakes-aws-worker",
          "arn:aws:iam::294048959147:role/datalakes-customer-service"
        ]
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": [
            "SOURCE_1",
            "SOURCE_N"
          ]
        }
      }
    }
  ]
}
```

> note ""
> **NOTE:** Replace the `ExternalID` list with the Segment `SourceId` values that are synced to the Data Lake.

#### IAM Policy

Add a policy to the role created above to give Segment access to the relevant Glue databases and tables, EMR cluster, and S3

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "elasticmapreduce:TerminateJobFlows",
                "elasticmapreduce:RunJobFlow",
                "elasticmapreduce:DescribeStep",
                "elasticmapreduce:DescribeCluster",
                "elasticmapreduce:CancelSteps",
                "elasticmapreduce:AddJobFlowSteps"
            ],
            "Effect": "Allow",
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "elasticmapreduce:ResourceTag/vendor": "segment"
                }
            }
        },
                {
            "Sid": "",
            "Effect": "Allow",
            "Action": [
                "glue:UpdateTable",
                "glue:UpdatePartition",
                "glue:GetTables",
                "glue:GetTableVersions",
                "glue:GetTableVersion",
                "glue:GetTable",
                "glue:GetPartitions",
                "glue:GetPartition",
                "glue:DeleteTableVersion",
                "glue:DeleteTable",
                "glue:DeletePartition",
                "glue:CreateTable",
                "glue:CreatePartition",
                "glue:CreateDatabase",
                "glue:BatchGetPartition",
                "glue:BatchDeleteTableVersion",
                "glue:BatchDeleteTable",
                "glue:BatchDeletePartition",
                "glue:BatchCreatePartition"
            ],
            "Resource": [
                "arn:aws:glue:$REGION:$YOUR_ACCOUNT:table/*",
                "arn:aws:glue:$REGION:$YOUR_ACCOUNT:database/default",
                "arn:aws:glue:$REGION:$YOUR_ACCOUNT:database/*",
                "arn:aws:glue:$REGION:$YOUR_ACCOUNT:catalog"
            ]
        },
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": [
                "arn:aws:s3:::$BUCKET_NAME/*", 
                "arn:aws:s3:::$BUCKET_NAME"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "athena:*"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

> note ""
> **NOTE:** The policy above grants full access to Athena, but the individual Glue and S3 policies decide which table can be queried. Segment queries only for debugging purposes, and will notify you be for running any queries.

### Debugging

Segment requires access to the data and schema for debugging data quality issues. The modes available for debugging are:
- Access the individual objects stored in S3 and the associated schema in order to understand data discrepancies
- Run an Athena query on the underlying data stored in S3
  - Ensure Athena uses Glue as the data catalog. Older accounts may not have this configuration, and may require some additional steps to complete the upgrade. The Glue console typically displays a warning and provides a link to instructions on how to complete the upgrade.
  - An easier alternative is to create a new account that has Athena backed by Glue as the default. 

# FAQ

## Data Lakes set up

##### Do I need to create Glue databases?

No, Data Lakes automatically creates one Glue database per source. This database uses the source slug as its name.

##### What IAM role do I use in the Settings page?

Four roles are created when you set up Data Lakes using Terraform. You add the `arn:aws:iam::$ACCOUNT_ID:role/segment-data-lake-iam-role` role to the Data Lakes Settings page in the Segment web app.

##### What level of access do the AWS roles have?

The roles which Data Lakes assigns during set up are:

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

Yes, you can configure multiple sources to use the same EMR cluster. We recommend that the EMR cluster only be used for Data Lakes to ensure there aren't interruptions from non-Data Lakes job.


## Post-Set Up

##### Why don't I see any data in S3 or Glue after enabling a source?

If you don't see data after enabling a source, check the following:
- Does the IAM role have the Segment account ID and source IDs as the external IDs?
- Is the EMR cluster running?
- Is the correct IAM role and S3 bucket configured in the settings?

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

##### How can I use AWS Spectrum to access Data Lakes tables in Glue, and join it with Redshift data?

You can use the following command to create external tables in Spectrum to access tables in Glue and join the data with Redshift:

Run the `CREATE EXTERNAL SCHEMA` command:

```sql
create external schema [spectrum_schema_name]
from data catalog
database [glue_db_name]
iam_role arn:aws:iam::[account_id]:role/MySpectrumRole
create external database if not exists;
```

Replace:
- [glue_db_name] = The Glue database created by Data Lakes which is named after the source slug
- [spectrum_schema_name] = The schema name in Redshift you want to map to
