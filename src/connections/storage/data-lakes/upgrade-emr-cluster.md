# Upgrading Data Lakes

This document contains the instructions to manually update an existing Segment
Data Lake destination to use a new EMR cluster with version 5.33.0. The Segment Data Lake on the new version will continue to use the Glue data catalog you have previously configured. 

The Segment Data Lake does not need to be disabled during the upgrade process, and any ongoing syncs will complete on the old cluster. 

<!--- Any existing EMR clusters will 

What happens to the existing EMR cluster? If there’s an ongoing sync, what will
happen to that?
If there is an ongoing sync in the existing cluster, the sync will complete (success/
fail) in the existing cluster. If the sync ends up failing and if the cluster setting has
been updated to use the new cluster, the next retry will be performed in the new
cluster.
. Does one need to stop a sync or disable the Segment Data Lake when
performing this update?
No, on-going syncs don’t need not be stopped nor Segment Data Lake needs to be
disabled. We will automatically restart any failed sync on the new cluster so there
should not be any manual intervention required.

. When can the customer safely delete the old EMR cluster?
The old EMR cluster could be deleted after all the Segment Data Lakes have been
updated to use the new cluster and the old EMR cluster doesn’t have any on-going
syncs. General recommendation is
Update EMR cluster setting in all the Segment Data Lakes
Wait for the next sync to be started and completed in the new cluster
Confirm new data is synced using the new cluster
Confirm no on-going jobs in the old cluster
Delete the old cluster --->

## Prerequisites
* S3 bucket with a lifecycle rule of 14 days 
* An EMR cluster version 5.33.0 (for instructions)
* The ID of your EMR Cluster

## Procedure
1. Open your Segment App workspace and select your Data Lakes destination. 
2. On the Settings tab, select EMR Cluster ID field and enter your EMR ID. For more information about your EMR Cluster, please see Amazon's [View cluster status and details](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-manage-view-clusters.html) documentation. <br/>
**Note:** Your Glue Catalog ID, IAM Role ARN, and Glue database name should remain the same.
3. Select **Save**.
4. You can delete your old EMR cluster from AWS when the following conditions have been met:
    * You have updated all Data Lakes to use the EMR cluster
    * A sync has successfully completed in the new cluster 
    * Data is synced into the new cluster
    * There are no ongoing jobs in the old cluster
