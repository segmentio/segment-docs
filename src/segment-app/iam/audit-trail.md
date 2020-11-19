---
title: "Audit Trail"
---

Segment offers an in-app 90 day Audit Trail for Business Tier accounts. If you are a workspace Owner, you view user and system activity in your workspace settings, in the "Audit Trail" tab under "Admin".

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

### Personas
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
*   Personas Warehouse Source Created
*   Personas Warehouse Source Modified
*   Personas Warehouse Source Deleted

### Schema Default
*   Schema Default Edited To Block New Events
*   Schema Default Edited To Allow New Event Properties
*   Schema Default Edited To Omit New Group Traits
*   Schema Default Edited To Allow Group Traits On Violation
*   Schema Default Edited To Omit New Event Properties
*   Schema Default Edited To Allow New Identify Traits
*   Schema Default Edited To Omit Identify Traits On Violation
*   Schema Default Edited To Allow New Events
*   Schema Event Allowed
*   Schema Event Blocked
*   Schema Identify Trait Blocked
*   Schema Event Archived
*   Schema Identify Trait Allowed
*   Schema Event Property Rule Edited To Optional
*   Schema Event Property Rule Edited To Forbidden
*   Schema Event Property Conditions Edited
*   Schema Event Property Rule Edited To Required
*   Schema Identify Trait Archived
*   Schema Default Edited To Omit New Identify Traits
*   Schema Group Property Blocked
*   Schema Group Property Allowed
*   Schema Default Edited To Omit Group Traits On Violation
*   Schema Default Edited To Allow New Group Traits
*   Schema Default Edited To Allow Identify Traits On Violation
