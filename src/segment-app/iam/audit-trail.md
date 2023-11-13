---
title: Audit Trail
plan: audit-trail
hide_toc: true
---

Workspace Owners can view user and system activity in the Audit Trail. You can filter for specific actions or actors to see who made changes to specific resources in the app. Actors can include both logged-in users as well as access tokens. 

You can export the information to a CSV for download, or [forward the activity to a Segment source](#audit-forwarding). For example, you can forward Audit Trail activity to set up real-time Slack alerts and quickly revert changes that could cause unwanted downstream effects, such as a user unintentionally disabling a warehouse.

To view the Audit Trail:
1. From the Segment app, select **Settings**. 
2. From the Settings tab, select **Admin**. 

You can find a list of all events surfaced in the Audit Trail by accessing Audit Trail, clicking **Filters**, and selecting the **Events** dropdown. 

<!--- IG, 11/2023: PM for CX suggested directing to the Filter part in the app for a full list of events. PAPI support for a list of all events is on the roadmap, so at some point we can probably build a list automagically instead of using the Filters workaround --->

## Audit forwarding

You can forward events in your workspace to an [event streams source](/docs/connections/sources/#event-streams-sources).

To forward Audit Trail events:
1. Navigate to **Settings > Workspace Settings > Audit Forwarding**.
2. Select or create an [event streams source](/docs/connections/sources/#event-streams-sources) to which you'll forward workspace events.
3. Toggle the setting to **On** and click **Save Changes**.

> info "Segment recommends creating a dedicated source for audit trail events"
> Segment recommends forwarding all events to one instance of the [HTTP API](/docs/connections/sources/catalog/libraries/server/http-api/) source.  Segment passes all forwarded events through its entire processing pipeline. This ensures that Tracking Plans, Filters, and other features work with the audit events, and also ensures you can send those events to multiple downstream destinations.
