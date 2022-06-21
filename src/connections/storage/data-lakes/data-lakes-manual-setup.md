---
hidden: true
title: Configure the Data Lakes AWS Environment
---
{% include content/plan-grid.md name="data-lakes" %}


The instructions below will guide you through the process required to configure the environment required to begin loading data into your Segment Data Lake. For a more automated process, see [Set Up Segment Data Lakes](/docs/connections/storage/catalog/data-lakes).

As a best practice, Segment recommends that you consult with your network and security teams before you configure your EMR cluster.

## Step 1 - Create a VPC and an S3 bucket 

In this step, you'll create a Virtual Private Cloud (VPC) to securely launch your AWS resources into and an S3 bucket that will store both the intermediate and final data. 

To create a VPC, follow the instructions outlined in Amazon's documentation, [Create and configure your VPC](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/gsg_create_vpc.html){:target="_blank"}.

To create an S3 bucket, see Amazon's [Create your first S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html){:target="_blank"} instructions.

> info ""
> Take note of the S3 bucket name you set in this step, as the rest of the set up flow requires it. 

After you create an S3 bucket, configure a lifecycle rule for the bucket and set it to expire staging data after **14 days**. For instructions on configuring lifecycle rules, see Amazon's documentation, [Setting lifecycle configuration on a bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/how-to-set-lifecycle-configuration-intro.html){:target="_blank"}.

Apply the following lifecycle settings to your staging data:
* **Expire after:** 14 days
* **Permanently delete after:** 14 days
* **Clean up incomplete multipart uploads:** after 14 days

## Step 2 - Configure an EMR cluster

Segment requires access to an EMR cluster to perform necessary data processing. For best results, start with a small cluster and add more compute resources as required.

### Configure the hardware and networking configuration

1. In the AWS console, navigate to **Services > Analytics > EMR**.
2. Click **Create Cluster**. On the Create Cluster - Quick Options page, click **Go to advanced options**.
3. In Advanced Options, on Step 1: Software and Steps, select both the `emr-5.33.0` release and the following applications:
    - Hadoop 2.10.1
    - Hive 2.3.7
    - Hue 4.9.0
    - Spark 2.4.7
    - Pig 0.17.0
 4. In the AWS Glue Data Catalog settings, select the following options:
    - Use for Hive table metadata
    - Use for Spark table metadata
5. Select **Next** to proceed to Step 2: Hardware.
6.In the Networking section, select a Network (the VPC you created in [Step 1](#step-1---create-a-vpc-and-an-s3-bucket)) and EC2 Subnet for your EMR instance.

    Creating the cluster in a private subnet is more secure, but requires additional configuration. Creating the cluster in a public subnet leaves it accessible from the Internet, but requires less up front configuration. 
  
    If you create clusters in public subnets, you can configure strict security groups to prevent unauthorized inbound EMR cluster access. See Amazon's document, [Amazon VPC Options - Amazon EMR](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-clusters-in-a-vpc.html){:target="_blank"} for more information.

7. In the Cluster Nodes and Instances section, create a cluster that includes the following on-demand nodes:
   - **1** master node
   - **2** core nodes
   - **2** task nodes
  
    Each node should meet or exceed the following specifications:
    * Instance type: mx5.xlarge
    * Number of vCores: 4
    * Memory: 16 GiB
    * EBS Storage: 64 GiB, EBS only storage

    For more information about configuring cluster hardware and networking, see Amazon's documentation, [Configure Cluster Hardware and Networking](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-instances.html){:target="_blank"}.

8. Click **Next** to proceed to Step 3: General Cluster Settings.

### Configure logging

9. On Step 3: General Cluster Settings, configure logging to use the same S3 bucket you configured as the destination for the final data. Once configured, logs are assigned a new prefix and separated from the final processed data.

10. Add a new key-value pair to the Tags section, a `vendor` key with a value of `segment`. The IAM policy uses this tag to provide Segment access to submit jobs in the EMR cluster.

11. Click **Next** to proceed to Step 4: Security.

### Secure the cluster
12. On Step 4: Security, in the Security Options section, create or select an **EC2 key pair**.
13. Choose the appropriate roles in the **EC2 instance profile**.
14. Expand the EC2 security groups section and select the appropriate security groups for the Master and Core & Task types.
15. Select **Create cluster**.

> note ""
> If you update the EMR cluster of existing Data Lakes instance, take note of the EMR cluster ID on the confirmation page.

## Step 3 - Create an Access Management role and policy

The following steps provide examples of the IAM Role and IAM Policy.

### IAM role

Create a `segment-data-lake-role` for Segment to assume. The trust relationship document you attach to the role will be different depending on your workspace region. 

#### IAM role for Data Lakes created in US workspaces:

Attach the following trust relationship document to the role to create a `segment-data-lake-role` role for Segment:

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
            "WORKSPACE_ID"
          ]
        }
      }
    }
  ]
}
```

> note ""
> Replace the `ExternalID` list with the Segment `WorkspaceID` that contains the sources to sync to the Data Lake.

#### IAM role for Data Lakes created in EU workspaces:

> info ""
> EU workspaces are currently in beta. If you would like to learn more about the beta, please contact your account manager. 

Attach the following trust relationship document to the role to create a `segment-data-lake-role` role for Segment.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "arn:aws:iam::595280932656:role/segment-datalakes-production-access",
        ]
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": [
            "WORKSPACE_ID"
          ]
        }
      }
    }
  ]
}
```

> note ""
> **NOTE:** Replace the `ExternalID` list with the Segment `WorkspaceID` that contains the sources to sync to the Data Lake.

### IAM policy

Add a policy to the role created above to give Segment access to the relevant Glue databases and tables, EMR cluster, and S3.

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
        },
        {
            "Sid": "",
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": [
                "arn:aws:iam::$ACCOUNT_ID:role/EMR_DefaultRole",
                "arn:aws:iam::$ACCOUNT_ID:role/EMR_AutoScaling_DefaultRole",
                "arn:aws:iam::$ACCOUNT_ID:role/EMR_EC2_DefaultRole"
            ]
        }
    ]
}
```

> note ""
> The policy above grants full access to Athena, but the individual Glue and S3 policies determine which table is queried. Segment queries for debugging purposes, and notifies you before running any queries.

## Debugging

Segment requires access to the data and schema for debugging data quality issues. The modes available for debugging are:
- Access the individual objects stored in S3 and the associated schema to understand data discrepancies
- Run an Athena query on the underlying data stored in S3
  - Ensure Athena uses Glue as the data catalog. Older accounts may not have this configuration, and may require some additional steps to complete the upgrade. The Glue console typically displays a warning and provides a link to instructions on how to complete the upgrade. The warning reads: <br/> **Upgrade to the AWS Glue Data Catalog** <br/> To use the AWS Glue Data Catalog with Amazon Athena and Amazon Redshift Spectrum, you must upgrade your Athena Data Catalog to the AWS Glue Data Catalog. Without the upgrade, tables and partitions created by AWS Glue cannot be queried with Amazon Athena or Redshift Spectrum. Start the upgrade in the [Athena console](https://console.aws.amazon.com/athena/){:target="_blank"}.
  - An easier alternative is to create a new account that has Athena backed by Glue as the default.

## Updating EMR clusters
You can update your existing Data Lake destination to EMR version 5.33.0 by creating a new v5.33.0 cluster in AWS and associating it with your existing Data Lake. After you update the EMR cluster, your Segment Data Lake continues to use the Glue data catalog you initially configured.

When you update an EMR cluster to 5.33.0, you can participate in [AWS Lake Formation](https://aws.amazon.com/lake-formation/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc){:target="_blank"}, use dynamic auto-scaling, and experience faster Parquet jobs.  

> info ""
> Your Segment Data Lake does not need to be disabled during the update process, and any ongoing syncs will complete on the old cluster. Any syncs that fail while you are updating the cluster ID field will be restarted on the new cluster.

## Prerequisites
* An EMR v5.33.0 cluster
* An existing Segment Data Lakes destination

## Procedure
1. Open your Segment app workspace and select the Data Lakes destination.
2. On the Settings tab, select the EMR Cluster ID field and replace the existing ID with the ID of your v5.33.0 EMR cluster. For help finding the cluster ID in AWS, see Amazon's [View cluster status and details](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-manage-view-clusters.html){:target="_blank"}. You don't need to update the Glue Catalog ID, IAM Role ARN, or S3 Bucket name fields.
3. Click **Save**.
4. In the AWS EMR console, view the Events tab for your cluster to verify it is receiving data.

You can delete the old EMR cluster from AWS after the following conditions have been met:
* You have updated all Data Lakes to use the EMR cluster
* A sync has successfully completed in the new cluster 
* Data is synced into the new cluster
* There are no ongoing jobs in the old cluster
