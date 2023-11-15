---
title: Audit Trail
plan: audit-trail
---

The Audit Trail allows you can view user and system activity, filter activity for specific actions or actors, and export your data to an event streams source or CSV file. 

> info "Viewing the Audit Trail requires Workspace Owner permissions"
> You must have the Workspace Owner role to view the Audit Trail page. For more information about roles and permissions within Segment, see the [Roles documentation](/docs/segment-app/iam/roles/). 

To view the Audit Trail:
1. From the Segment app, select **Settings**. 
2. From the Settings tab, select **Admin**. 

## Audit Trail events

The Audit Trail returns information about the following Segment product areas: 

- Sources
- Functions
- Warehouses
- Destinations
- Storage
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
<!--- IG, 11/2023: Add consent to this list when this goes to public beta (q1 '24?)--->

To find a list of all events surfaced in the Audit Trail: open the Audit Trail, click **Filters**, and select the **Events** dropdown. 

<!--- IG, 11/2023: PM for CX suggested directing to the Filter part in the app for a full list of events. PAPI support for a list of all events is on the roadmap, so at some point we can probably build a list automagically instead of using the Filters workaround --->

## Filtering events

The Filters dropdown allows you to refine your search results by filtering by actions or actors to see who made changes on specific resources in the app. Actors include both logged-in users and access tokens. 

## Audit forwarding

You can forward events in your workspace to an [event streams source](/docs/connections/sources/#event-streams-sources) to set up real-time alerts and quickly revert changes (like a user unintentionally disabling a warehouse) that could cause unwanted downstream effects.

> info "Segment recommends creating a dedicated source for audit trail events"
> Segment recommends forwarding all events to an instance of the [HTTP API](/docs/connections/sources/catalog/libraries/server/http-api/) source.  Segment passes all forwarded events through its entire processing pipeline. This ensures that Tracking Plans, Filters, and other features work with the audit events, and also ensures you can send those events to multiple downstream destinations.

To forward Audit Trail events to an event streams source:
1. Navigate to **Settings > Workspace Settings > Audit Forwarding**.
2. Select or create an [event streams source](/docs/connections/sources/#event-streams-sources) to which you'll forward workspace events.
3. Toggle the setting to **On** and click **Save Changes**.
