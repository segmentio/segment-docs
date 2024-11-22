---
title: Account & Data Deletion
---

Segment allows you to delete specific data relating to an individual end user, all data from associated with a source, all data related to a Unify space, or all data in your entire workspace.

## Delete individual user data
To delete the data for an individual user from you workspace, follow the instructions on the [User Deletion and Suppression](/docs/privacy/user-deletion-and-suppression) page.

## Delete data from a source
To delete the data for an entire source, email the Customer Success team [(friends@segment.com)](mailto:friends@segment.com) to create a support ticket. In your email to Customer Success, include the following information:
- Your workplace slug
- The source from which you'd like to delete data
- The time frame for the data you'd like to delete*

**Due to the way Segment stores data internally, source-level deletions can only be scoped to one day in granularity. Deletion requests for smaller time frames are not supported.*

> note "Deleting source data"
> When Segment deletes your data for a particular source, the deletion is not forwarded to sources or data storage providers associated with your account: your data is only removed from Segment's S3 archive buckets. To remove your data from external sources, reach out to the individual source about their deletion practices. 

## Remove a Unify space

You can remove a Unify space from your workspace by disabling it, which hides the space from the Segment UI, or by deleting it, which removes all data about that space from Segment's servers. Disabled or deleted spaces do not count toward your [Unify limits](/docs/unify/product-limits/). 

> warning "You cannot reuse space names"
> Do not use the names of previously disabled or deleted spaces for new Unify spaces.

### Disable a Unify space

Disabled spaces are not accessible from the Segment app UI, but all data from your space remains on Segment's servers. Disabled spaces do not count toward your Unify space limit, and can be re-enabled by sending an email to the Customer Success team [(friends@segment.com)](mailto:friends@segment.com).

To disable a Unify space, email the Customer Success team [(friends@segment.com)](mailto:friends@segment.com) to create a support ticket. In your email to Customer Success, include the following information:
 - Workspace slug
 - Unify space ID

> success ""
> You can find your Unify space ID by navigating to the Unify settings page and selecting **API Access**.

### Delete a Unify space

Deleted spaces, and all data associated with a deleted space, are permanently removed from Segment's servers. You cannot recover a deleted space. 

> info " "
> Segment typically completes Unify space deletion 30-45 days after you initiate a deletion request.

#### (Optional) Remove Profiles Sync
If you enabled Profiles Sync on the Unify space you'd like to delete, you must first remove the Profiles Sync connection before deleting your Unify space. 

To delete Profiles Sync:
1. From the Segment app, navigate to the Unify tab and select Profile Sync. 
2. Select the Settings tab and click **Delete warehouse**. 
3. Follow the prompts to confirm deletion. 

To delete a Unify space, email the Customer Success team [(friends@segment.com)](mailto:friends@segment.com) to create a support ticket. In your email to Customer Success, include the following information:
 - Workspace slug
 - Unify space ID

> success ""
> You can find your Unify space ID by navigating to the Unify settings page and selecting **API Access**.


## Delete your workspace data

Workspace admins can delete all of the data associated with a workspace, including customer data. 

**To delete all data from one workspace:**

1. Sign in to the Segment app, select the workspace you'd like to delete, and click **Settings.**
2. On the General Settings page, click the **Delete Workspace** button. 
3. Follow the prompts on the pop-up to delete your workspace. 

**To delete data from all workspaces in which you have workspace admin permissions:**

1. Sign in to the Segment app. 
2. Navigate to the [User Settings page](https://app.segment.com/settings/user). 
3. Click the **Delete Account** button, located at the bottom of the page. 
4. On the popup, enter your password and select **Yep, delete my account anyway!** to delete your account.

After you delete your workspace or account, Segment removes all data associated with each workspace within 30 days in a process called a [complete data purge](#what-is-a-complete-data-purge). For a data purge status update, email the Customer Success team [(friends@segment.com)](mailto:friends@segment.com).

If you do not delete your workspace after you stop using Segment, **your data remains in Segment's internal servers until you submit a written deletion request**.

> warning "Purging data from workspaces deleted prior to March 31, 2022"
> If you deleted your workspace prior to March 31, 2022, and would like to have data associated with your workspace purged from Segment's S3 archive buckets, email the Customer Success team [(friends@segment.com)](mailto:friends@segment.com) to create a support ticket. In your email to Customer Success, include either the slug or the ID of the workspace you'd like to have purged from internal Segment servers. 

### What is a complete data purge?

A complete data purge is the way Segment removes all workspace and customer data from internal servers across all product areas. To trigger a complete data purge, either [delete your workspace](#how-can-i-delete-data-from-my-workspace) or raise a support ticket with the Customer Success team by emailing [(friends@segment.com)](mailto:friends@segment.com). In your email to Customer Success, include either the slug or the ID of the workspace that you'd like to delete. Deletions related to data purges will *not* be forwarded to your connected third-party destinations or raw data destinations. 

> error " "
> Segment waits for five calendar days before beginning a complete data purge to safeguard against malicious deletion requests. If you notice your workspace or account has been maliciously deleted, reach out to [friends@segment.com](mailto:friends@segment.com) to cancel the data purge. After the five-day grace period, the deletion will be irreversible.