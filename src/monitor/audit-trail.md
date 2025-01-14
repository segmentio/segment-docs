---
title: Audit Trail
plan: audit-trail
---


The Audit Trail allows you to view the last 90 days of user and system activity, filter activity for specific actions or actors, and export your data to an event streams source or CSV file. 

For any requests exceeding the 90-day timeframe, contact [Segment Support](https://segment.com/help/contact/){:target="_blank”} for assistance.

> info "Viewing the Audit Trail requires Workspace Owner permissions"
> You must have the Workspace Owner role to view the Audit Trail page. For more information about roles and permissions within Segment, see the [Roles documentation](/docs/segment-app/iam/roles/). 

To view the Audit Trail:
1. From the Segment app, select **Settings**. 
2. From the Settings tab, select **Admin**. 

> success ""
> HIPAA-eligible workspaces have additional audit information available upon request. For more information, see the [HIPAA Eligible Segment](/docs/privacy/hipaa-eligible-segment/#hipaa-auditing) documentation. 

## Audit Trail events

The Audit Trail returns information about the following Segment product areas: 

- Sources
- Functions
- Warehouses
- Destinations
- Storage
- Consent Management
- Tracking Plans
- Destination Filters
- Transformations
- Audiences
- Computed Traits
- Engage Warehouse Sources
- Profiles Sync
- Spaces
- Users
- Journeys
- Broadcasts 
- Workspace

To view a list of all events Segment surfaces in the Audit Trail, open the Audit Trail, click **Filters**, and select the **Events** dropdown. 

<!--- IG, 11/2023: PM for CX suggested directing to the Filter part in the app for a full list of events. PAPI support for a list of all events is on the roadmap, so at some point we can probably build a list automagically instead of using the Filters workaround --->

## Filtering events

Use the Filters dropdown to refine your search results and filter by actions or actors to see who made changes on specific resources in the app. Actors include both logged-in users and access tokens. 

## Audit forwarding

You can forward events in your workspace to an [event streams source](/docs/connections/sources/#event-streams-sources) to set up real-time alerts and quickly revert changes (like a user unintentionally disabling a warehouse) that could cause unwanted downstream effects.

> info "Segment recommends creating a dedicated source for Audit Trail events"
> Segment recommends forwarding all events to an instance of the [HTTP API](/docs/connections/sources/catalog/libraries/server/http-api/) source.  Segment passes all forwarded events through its entire processing pipeline. This ensures that Tracking Plans, Filters, and other features work with the audit events, and also ensures you can send those events to multiple downstream destinations.

To forward Audit Trail events to an event streams source:
1. Navigate to **Settings > Workspace Settings > Audit Forwarding**.
2. Select or create an [event streams source](/docs/connections/sources/#event-streams-sources) to which you'll forward workspace events.
3. Toggle the setting to **On** and click **Save Changes**.

When you forward audit events to a source, Segment passes those events through its entire processing pipeline. This ensures that tracking plans, filters, and other features work with the audit events, and also ensures you can send those events to multiple downstream destinations.

## Frequently asked questions

### Engage 

### Why am I getting alerts about an audience/computed trait sync failure, but when I look at the specific audience/computed trait it shows a successful sync?

An audience/computed trait Run or a Sync may fail on its first attempt, but Engage will retry up to 5 times before considering it a hard failure and display on that audience/compute trait's Overview page. As long as the runs/syncs within the specific Audience's Overview page say they are successful, then these can be safely ignored. 

**How things work internally:**
Segment Engage scheduler fetches audiences/traits from compute service and then handles the logic of generating tasks. These compute/sync tasks get scheduled and executed by another worker. Essentially, these tasks are a list of steps to be executed. Each task has a series of steps that are marked as complete by saving a timestamp for the completion. If the worker is disrupted, it picks up at the latest step, which has no completed_at timestamp. In some cases, the step may fail or the entire task may fail (for example, due to timeout or the worker disruption as there are many moving parts). In either case, these failures will be retried.
 
These tasks are a part of internal Segment process, and there are systems in place to retry failed tasks. In most cases, it is not necessary to track these failures, as long as there are no actual computation or sync failures.

The Audit Trail logic, however, is configured to notify you about every task failure, even if it then later succeeds.

If you would like to avoid receiving the notifications for transient failures, **[reach out to support](https://segment.com/help/contact/)** to request enabling a setting to reduce the number of notifications your workspace receives.
