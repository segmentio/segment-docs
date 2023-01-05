---
title: Audit Trail
---
{% include content/plan-grid.md name="audit-trail" %}

Segment offers an in-app 90 day Audit Trail for Business Tier accounts. If you are a Workspace Owner, you view user and system activity in your workspace settings, in the "Audit Trail" tab under "Admin".

You can filter for specific actions or actors to see who made changes on specific resources in the app. Actors can include both logged-in users as well as access tokens. You can export the information to a CSV for download, or forward the activity to a Segment source. For example, you can forward audit trail activity to set up real-time Slack alerts and quickly revert changes that could cause unwanted downstream effects, such as a user unintentionally disabling a warehouse.

The Audit Trail includes information on the following activity:
### Access Management
*   User Invite Sent
*   User Invite Deleted
*   User Invite Accepted
*   User Added via SSO
*   User Removed
*   User Group Created
*   User Group Updated

### Source
*   Source Created
*   Source Enabled
*   Source Disabled
*   Source Modified
*   Source Deleted

### Integrations
*   Integrations Created
*   Integrations Enabled
*   Integrations Disabled
*   Integrations Modified
*   Integrations Deleted

### Functions
*   Source Function Created
*   Source Function Deleted
*   Source Function Modified
*   Destination Function Created
*   Destination Function Deleted
*   Destination Function Modified

### Destination Filters
*   Destination Filters Created
*   Destination Filters Modified
*   Destination Filters Deleted

### Warehouses
*   Warehouses Created
*   Warehouses Enabled
*   Warehouses Disabled
*   Warehouses Modified
*   Warehouses Deleted
*   Warehouse Run Failed

### Protocols
*   Tracking Plan Created
*   Tracking Plan Modified
*   Tracking Plan Deleted
*   Source Connected to Tracking Plan
*   Source Disconnected From Tracking Plan
*   Tracking Plan Inferred
*   Tracking Plan New Event Blocked
*   Tracking Plan New Event Allowed
*   Tracking Plan New Group Trait Omitted
*   Tracking Plan New Identify Trait Omitted
*   Tracking Plan New Track Property Omitted
*   Tracking Plan Operations Updated
*   Tracking Plan Updated
*   Violations Detected

### Engage
*   Source Connected To Space
*   Source Disconnected From Space
*   Space Created
*   Space Modified
*   Space Deleted
*   Computed Trait Created
*   Computed Trait Modified
*   Computed Trait Deleted
*   Computed Trait CSV Downloaded
*   Computed Trait Run Failed
*   Computed Trait Destination Sync Failed
*   Audience Created
*   Audience Modified
*   Audience Deleted
*   Audience CSV Downloaded
*   Audience Run Failed
*   Audience Destination Sync Failed
*   Engage Warehouse Source Created
*   Engage Warehouse Source Modified
*   Engage Warehouse Source Deleted


## Audit forwarding

You can forward events in your workspace to any of the sources you have configured in the workspace.

To forward Audit Trail events:

1. Navigate to **Settings > Workspace Settings > Audit Forwarding**.
2. Select the source to which you'll forward workspace events.
3. Toggle the setting to **On** and click **Save Changes**.

When you forward audit events to a source, Segment passes those events through its entire processing pipeline. This ensures that tracking plans, filters, and other features work with the audit events, and also ensures you can send those events to multiple downstream destinations.

## Frequently asked questions
### Engage 
### Why am I getting alerts about an audience/computed trait sync failure, but when I look at the specific audience/computed trait it shows a successful sync?

An audience/computed trait Run or a Sync may fail on its first attempt, but Engage will retry up to 5 times before considering it a hard failure and display on that audience/compute trait's Overview page. As long as the runs/syncs within the specific Audience's Overview page say they are successful, then these can be safely ignored. 

**How things work internally:**
Our Engage scheduler fetches audiences/traits from compute service and then handles the logic of generating tasks. These compute/sync tasks get scheduled and executed by another worker. Essentially, these tasks are a list of steps to be executed. Each task has a series of steps which is marked as complete by saving a timestamp for the completion. If the worker be disrupted, it picks up at the latest step which has no completed_at timestamp. In some cases, the step might fail or the entire task (for example, due to timeout or the worker disruption as there are many moving parts) - in either case, these failures will be retried. 
 
These tasks are a part of internal Segment process, and there are systems in place which would retry failed tasks. In most cases, it is usually not necessary to track these failures, as long as there are no actual computation or sync failures. 

The Audit Trail logic, however, is configured in the way that it simply notifies about every task failure, even if it then later succeeds.

If your team would like to avoid receiving the notifications for transient failures, please **[reach out to support](https://segment.com/help/contact/)**, who upon request can enable a setting that will reduce the number of notifications your workspace receives.
