---
hidden: true
title: Updating EMR Clusters
---
{% include content/plan-grid.md name="data-lakes" %}

# Updating EMR Clusters
You can update your existing Data Lake destination to EMR version 5.33.0 by creating a new v5.33.0 cluster in AWS and associating it with your existing Data Lake. After updating your EMR cluster, your Segment Data Lake will continue to use the Glue data catalog initially configured.

By updating your EMR cluster to 5.33.0, you can participate in [AWS Lake Formation](https://aws.amazon.com/lake-formation/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc), use dynamic auto-scaling, and experience faster Parquet jobs.  

> info""
> Your Segment Data Lake does not need to be disabled during the update process, and any ongoing syncs will complete on the old cluster. Any syncs that fail while you are updating the cluster ID field will be restarted on the new cluster.

## Prerequisites
* An EMR v5.33.0 cluster (for instructions on creating an EMR cluster, see [Configure the Data Lakes AWS Environment](data-lakes-manual-setup.md))
* An existing Segment Data Lakes destination

## Procedure
1. Open your Segment app workspace and select the Data Lakes destination.
2. On the Settings tab, select the EMR Cluster ID field and replace the existing ID with the ID of your v5.33.0 EMR cluster. For help finding the cluster ID in AWS, see Amazon's [View cluster status and details](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-manage-view-clusters.html). You do not need to update the Glue Catalog ID, IAM Role ARN, and S3 Bucket name fields.
3. Select **Save**.
4. In AWS, view the Events tab for your cluster to verify it is receiving data.

You can delete the old EMR cluster from AWS after the following conditions have been met:
* You have updated all Data Lakes to use the EMR cluster
* A sync has successfully completed in the new cluster 
* Data is synced into the new cluster
* There are no ongoing jobs in the old cluster
