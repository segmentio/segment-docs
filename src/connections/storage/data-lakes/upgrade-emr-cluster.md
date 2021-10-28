---
hidden: true
title: Updating EMR Clusters
---
{% include content/plan-grid.md name="data-lakes" %}

# Updating EMR Clusters
You can manually update an existing Segment Data Lake destination to use a v5.33.0 EMR cluster.
The Segment Data Lake on the new version will continue to use the Glue data catalog you have previously configured.

By updating your EMR cluster from 5.27.0 to 5.33.0, you can participate in [AWS Lake Formation](https://aws.amazon.com/lake-formation/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc), use dynamic auto-scaling, and experience faster Parquet jobs.  

> info""
> Your Segment Data Lake does not need to be disabled during the update process, and any ongoing syncs will complete on the old cluster. Any syncs that fail while you are setting up a new EMR cluster will be restarted on the new cluster.

## Prerequisites
* S3 bucket with a lifecycle rule of 14 days 
* An EMR v5.33.0 cluster (for instructions on creating an EMR cluster, please see [Configure the Data Lakes AWS Environment](data-lakes-manual-setup.md))

## Procedure
1. Open your Segment App workspace and select the Data Lakes destination. 
2. On the Settings tab, select EMR Cluster ID field and enter the ID of your v5.33.0 EMR cluster. For help finding the cluster ID, please see Amazon's [View cluster status and details](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-manage-view-clusters.html) documentation. <br/>
**Note:** Your Glue Catalog ID, IAM Role ARN, and Glue database name fields in Segment should remain the same.
3. Select **Save**.
4. View the EMR cluster in the AWS EMR Clusters page to verify the cluster is working correctly.
5. Delete your v5.27.0 EMR cluster from AWS after the following conditions have been met:
    * You have updated all Data Lakes to use the EMR cluster
    * A sync has successfully completed in the new cluster 
    * Data is synced into the new cluster
    * There are no ongoing jobs in the old cluster
