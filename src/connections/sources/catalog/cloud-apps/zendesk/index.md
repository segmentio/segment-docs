---
title: Zendesk Source
id: 3hbak7a9
---
{% include content/source-region-unsupported.md %}

[Zendesk](https://www.zendesk.com/) is a customer service platform for enterprises, which provides a customer support platform that allows quicker and easier interaction between businesses and customers.


## Getting Started

1. Go to **Connections > Sources** and click **Add Source** in the Segment app.

2. Search for **Zendesk** in the Sources Catalog and click **Add Source**.

3. Give the Source a name and add any labels to help you organize and filter your sources. You can give the source any name, but Segment recommends a name that reflects the source itself, as this name auto-populates the schema name. For example, the source name `Zendesk` creates the schema `zendesk`.

   * **Note**: You can add multiple instances if you have multiple Zendesk accounts. That's why Segment allows you to customize the source's nickname and schema name.

4. Enter your Zendesk subdomain. The subdomain you use to access your Zendesk portal (for example 'segment' for segment.zendesk.com)

   * **Note:** If you enter `segment.zendesk.com` as a subdomain instead of just `segment`, Segment tries to access the host `segment.zendesk.com.zendesk.com` and you will get a credentials error.

5. Click **Authorize** to start Zendesk's OAuth process. Sign in and grant permissions, you'll be good to go.

> success ""
> **Tip**: Segment uses the incremental export API from Zendesk, which requires Admin access. Make sure the user has Admin authorizations.


### Rate Limits

The Zendesk source uses both Zendesk's [Core API](https://developer.zendesk.com/api-reference/){:target="_blank"} and [Incremental Exports API](https://developer.zendesk.com/rest_api/docs/core/incremental_export){:target="_blank"}. The source's requests to the Incremental API don't count towards your Zendesk account's rate limits, but requests to the Core API do. By default, Segment caps requests to Zendesk's Core API to a rate of 200 requests per minute to avoid triggering [Zendesk's Rate Limits](https://developer.zendesk.com/api-reference/ticketing/account-configuration/usage_limits/){:target="_blank"}. If you'd like to increase or decrease the request rate for your source, [please reach out](https://segment.com/help/contact/). Support for this in the UI is in the works.

## Components

### Sync

The Zendesk source is built with a sync component, which means Segment makes requests to their API on your behalf on a three hour interval to pull the latest data into Segment. In the initial sync, Segment grabs all the Zendesk objects (and their corresponding properties) according to the Collections Table below. The objects are written into a separate schema, corresponding to the source instance's schema name you designated upon creation (like `zendesk_prod.users`).

The sync component uses an upsert API, so the data in your warehouse loaded using sync reflects the latest state of the corresponding resource in Zendesk.  For example, if `ticket_status` goes from `open` to `closed` between syncs, on its next sync that tickets status is `closed`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources sync with Segment every three hours. Depending on your Warehouses plan, Segment pushes the Source data to your warehouse on the interval associated with your billing plan.

At the moment, Segment doesn't support filtering which objects or properties get synced. If you're interested in this feature, [please reach out](https://segment.com/help/contact/).

## Collections

Collections are the groupings of resources Segment pulls from your source.


|  Collection | Type | Description |
|  ------ | ------ | ------ |
|  [users](#users) | object | Zendesk Support has three types of users: end-users (your customers), agents, and administrators. End-users request support through tickets. Agents work in Zendesk Support to solve tickets. Agents can be divided into multiple groups and can also belong to multiple groups. Agents don't have access to administrative configuration in Zendesk Support such as business rules or automation, but can configure their own macros and views. Administrators have all the abilities of agents, plus administrative abilities. |
|  [groups](#groups) | object | When support requests arrive in Zendesk, they can be assigned to a Group. Groups serve as the core element of ticket workflow; support agents are organized into Groups and tickets can be assigned to a Group only, or to an assigned agent within a Group. A ticket can never be assigned to an agent without also being assigned to a Group. |
|  [tickets](#tickets) | object | Tickets are the means through which your End-users (customers) communicate with Agents in Zendesk. **Note**: Segment pulls all tickets updated (or created) in the last year to start by default. If you need more, reach out to Segment support. Support can do a run to pull further back in history.  |
|  [ticket_fields](#ticket_fields) | object | Customize fields on the ticket form.  |
|  [activities](#activities) | object | The activity stream is a per agent event stream. It will give access to the most recent events that relate to the agent polling the API. |
|  [attachments](#activities) | object | This API is for attachments in tickets and forum posts in the Web portal. |
|  [organizations](#organizations) | object | Just as agents can be segmented into groups in Zendesk, your customers (end-users) can be segmented into organizations. |
|  [ticket_events](#ticket_events) | events | Returns a stream of changes that occurred on tickets. Each event is tied to an update on a ticket and contains all the fields that were updated in that change. **Note**: Segment pulls one year of ticket events to start by default. If you need more, reach out to [Segment support](https://segment.com/help/contact/). Support can do a run to pull further back in history. |
|  [ticket_metrics](#ticket_metrics) | object | All kinds of aggregate metrics about a ticket |
|  [satisfaction_ratings](#satisfaction_ratings) | object | If you have enabled satisfaction ratings for your account, this end point allows you to quickly retrieve all ratings. |
|  [ticket_comments](#ticket_comments) | object | Ticket comments represent the conversation between requesters, collaborators, and agents. It includes the full body of each comment, public and private. **Note**: This collection is not included by default. To request it, [contact Segment support](https://segment.com/help/contact/). |
|  [ticket_forms](#ticket_forms) | object | Ticket forms allow an admin to define a subset of ticket fields for display to both agents and end users. |
|  [ticket_skips](#ticket_skips) | object | A skip is a record of when an agent skips over a ticket without responding to the end user.  |
|  [organization_memberships](#organization_memberships) | object | A membership links a user to an organization. Organizations can have many users. Users can be in many organizations if the account supports multiple organizations. You can use the API to list users in an organization, and reassign organization members. |
|  [group_memberships](#group_memberships) | object | A membership links an agent to a group. Groups can have many agents, as agents can be in many groups. You can use the API to list what agents are in which groups, and reassign group members. |
|  [audit_logs](#audit_logs) | object | The audit log shows various changes in your instance of Zendesk since the account was created.  **Note**: This collection is not included by default. To request it, [contact Segment support](https://segment.com/help/contact/). |


In your warehouse, each collection gets its own table. Find below a list of the properties Segment automatically fetches for each collection.

> note "Standard properties"
> The list in this document includes the standard properties only, but doesn't include _your_ custom fields. (Don't worry, they'll be there in your warehouse.)

### groups
<table>
   <tr>
     <th>Property</th>
     <th>Description</th>
   </tr>
   <tr>
     <td>id</td>
     <td> Automatically assigned when creating groups. </td>
   </tr>
   <tr>
     <td>url</td>
     <td> The API url of this group.</td>
   </tr>
   <tr>
     <td>deleted</td>
     <td> Deleted groups get marked as such.</td>
   </tr>
   <tr>
     <td>name</td>
     <td> The name of the group.</td>
   </tr>
   <tr>
     <td>created_at</td>
     <td> The time the group was created.</td>
   </tr>
   <tr>
     <td>updated_at</td>
     <td> The time of the last update of the group.</td>
   </tr>
   <tr>
     <td>received_at</td>
     <td> This timestamp is added to incoming messages as soon as they hit Segment API.</td>
   </tr>
</table>

### users
<table>
   <tr>
     <th>Property</th>
     <th>Description</th>
   </tr>
   <tr>
     <td>id</td>
     <td> Automatically assigned when the user is created. </td>
   </tr>
   <tr>
     <td>url</td>
     <td> Segment sets the "url" field users see in their Warehouse to equal the "id" from Zendesk, rather than the "url" field.</td>
   </tr>
   <tr>
     <td>name</td>
     <td> The name of the user.</td>
   </tr>
   <tr>
     <td>email</td>
     <td> The primary email address of this user..</td>
   </tr>
   <tr>
     <td>time_zone</td>
     <td> The time-zone of this user.</td>
   </tr>
   <tr>
     <td>phone</td>
     <td> The primary phone number of this user.</td>
   </tr>
   <tr>
     <td>locale_id</td>
     <td> The language identifier for this user.</td>
   </tr>
   <tr>
     <td>locale</td>
     <td> The locale for this user.</td>
   </tr>
   <tr>
     <td>organization_id</td>
     <td> The ID of the organization this user is associated with.</td>
   </tr>
   <tr>
     <td>role</td>
     <td> The role of the user. Possible values: "end-user", "agent", "admin".</td>
   </tr>
   <tr>
     <td>verified</td>
     <td> The user's primary identity is verified or not.</td>
   </tr>
   <tr>
     <td>external_id</td>
     <td> A unique identifier from another system. The API treats the ID as case insensitive. Example: ian1 and Ian1 are the same user.</td>
   </tr>
   <tr>
     <td>alias</td>
     <td> An alias displayed to end users.</td>
   </tr>
   <tr>
     <td>active</td>
     <td> false if the user has been deleted.</td>
   </tr>
   <tr>
     <td>shared</td>
     <td> If the user is shared from a different Zendesk Support instance. Ticket sharing accounts only.</td>
   </tr>
   <tr>
     <td>shared_agent</td>
     <td> If the user is a shared agent from a different Zendesk Support instance. Ticket sharing accounts only.</td>
   </tr>
   <tr>
     <td>last_login_at</td>
     <td> The last time the user signed in to Zendesk Support.</td>
   </tr>
   <tr>
     <td>two_factor_auth_enabled</td>
     <td> If two factor authentication is enabled.</td>
   </tr>
   <tr>
     <td>signature</td>
     <td> The user's signature. Only agents and admins can have signatures.</td>
   </tr>
   <tr>
     <td>details</td>
     <td> Any details you want to store about the user, such as an address.</td>
   </tr>
   <tr>
     <td>notes</td>
     <td> Any notes you want to store about the user.</td>
   </tr>
   <tr>
     <td>custom_role_id</td>
     <td> A custom role if the user is an agent on the Enterprise plan.</td>
   </tr>
   <tr>
     <td>moderator</td>
     <td> Designates whether the user has forum moderation capabilities.</td>
   </tr>
   <tr>
     <td>ticket_restriction</td>
     <td> Specifies which tickets the user has access to. Possible values are: "organization", "groups", "assigned", "requested", null.</td>
   </tr>
   <tr>
     <td>only_private_comments</td>
     <td> true if the user can only create private comments.</td>
   </tr>
   <tr>
     <td>restricted_agent</td>
     <td> If the agent has any restrictions; false for admins and unrestricted agents, true for other agents.</td>
   </tr>
   <tr>
     <td>suspended</td>
     <td> If the agent is suspended. Tickets from suspended users are also suspended, and these users cannot sign in to the end user portal.</td>
   </tr>
   <tr>
     <td>chat_only</td>
     <td> Whether or not the user is a chat-only agent.</td>
   </tr>
   <tr>
     <td>created_at</td>
     <td> The time the user was created.</td>
   </tr>
   <tr>
     <td>suspended</td>
     <td> The time of the last update of the user.</td>
   </tr>
   <tr>
     <td>received_at</td>
     <td> This timestamp is added to incoming messages as soon as they hit Segment API.</td>
   </tr>
</table>

### tickets
<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
   <tr>
     <td>id</td>
     <td> Automatically assigned when the ticket is created.</td>
   </tr>
   <tr>
     <td>url</td>
     <td> The API url of this ticket.</td>
   </tr>
   <tr>
     <td>external_id</td>
     <td> An ID you can use to link Zendesk Support tickets to local records.</td>
   </tr>
   <tr>
     <td>type</td>
     <td> The type of this ticket. Possible values: "problem", "incident", "question" or "task".</td>
   </tr>
   <tr>
     <td>subject</td>
     <td> The value of the subject field for this ticket.</td>
   </tr>
   <tr>
     <td>raw_subject</td>
     <td> The dynamic content placeholder, if present, or the "subject" value, if not.</td>
   </tr>
   <tr>
     <td>description</td>
     <td> The first comment on the ticket.</td>
   </tr>
   <tr>
     <td>priority</td>
     <td> The urgency with which the ticket should be addressed. Possible values: "urgent", "high", "normal", "low".</td>
   </tr>
   <tr>
     <td>status</td>
     <td> The state of the ticket. Possible values: "new", "open", "pending", "hold", "solved", "closed".</td>
   </tr>
   <tr>
     <td>recipient</td>
     <td> The original recipient e-mail address of the ticket.</td>
   </tr>
   <tr>
     <td>requester_id</td>
     <td> The user who requested this ticket.</td>
   </tr>
   <tr>
     <td>submitter_id</td>
     <td> The user who submitted the ticket. The submitter always becomes the author of the first comment on the ticket.</td>
   </tr>
   <tr>
     <td>assignee_id</td>
     <td> The agent currently assigned to the ticket.</td>
   </tr>
   <tr>
     <td>organization_id</td>
     <td> The organization of the requester. You can only specify the ID of an organization associated with the requester.</td>
   </tr>
   <tr>
     <td>group_id</td>
     <td> The group this ticket is assigned to.</td>
   </tr>
   <tr>
     <td>collaborator_ids</td>
     <td> The IDs of users currently cc'ed on the ticket.</td>
   </tr>
   <tr>
     <td>forum_topic_id</td>
     <td> The topic this ticket originated from, if any.</td>
   </tr>
   <tr>
     <td>problem_id</td>
     <td> For tickets of type "incident", the ID of the problem the incident is linked to.</td>
   </tr>
   <tr>
     <td>has_incidents</td>
     <td> Is true of this ticket has been marked as a problem, false otherwise.</td>
   </tr>
   <tr>
     <td>due_at</td>
     <td> If this is a ticket of type "task" it has a due date. Due date format uses ISO 8601 format.</td>
   </tr>
   <tr>
     <td>tags</td>
     <td> The array of tags applied to this ticket.</td>
   </tr>
   <tr>
     <td>sharing_agreement_ids</td>
     <td> The IDs of the sharing agreements used for this ticket.</td>
   </tr>
   <tr>
     <td>created_at</td>
     <td> When this record was created.</td>
   </tr>
   <tr>
     <td>updated_at</td>
     <td> When this record last got updated.</td>
   </tr>
   <tr>
     <td>received_at</td>
     <td> This timestamp is added to incoming messages as soon as they hit Segment API.</td>
   </tr>
      <tr>
     <td>ticket_form_id</td>
     <td>The ID of the ticket form to render for the ticket (Enterprise only).</td>
   </tr>
</table>

### ticket_fields
<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
   <tr>
     <td>id</td>
     <td> Automatically assigned upon creation.</td>
   </tr>
   <tr>
     <td>url</td>
     <td> The URL for this resource.</td>
   </tr>
   <tr>
     <td>type</td>
     <td> The type of the ticket field: "checkbox", "date", "decimal", "integer", "regexp", "tagger", "text", or "textarea". *Type is not editable once created.</td>
   </tr>
   <tr>
     <td>slug</td>
     <td> The title of the ticket field separated by _.</td>
   </tr>
   <tr>
     <td>title</td>
     <td> The title of the ticket field.</td>
   </tr>
   <tr>
     <td>raw_title</td>
     <td> The dynamic content placeholder, if present, or the "title" value, if not.</td>
   </tr>
   <tr>
     <td>description</td>
     <td>  The description of the purpose of this ticket field, shown to users.</td>
   </tr>
   <tr>
     <td>raw_description</td>
     <td> The dynamic content placeholder, if present, or the "description" value, if not.</td>
   </tr>
   <tr>
     <td>position</td>
     <td> A relative position for the ticket fields that determines the order of ticket fields on a ticket. Note that positions 0 to 7 are reserved for system fields.</td>
   </tr>
   <tr>
     <td>active</td>
     <td> Whether this field is available.</td>
   </tr>
   <tr>
     <td>required</td>
     <td>  If it's required for this field to have a value when updated by agents.</td>
   </tr>
   <tr>
     <td>collapsed_for_agents</td>
     <td> If this field should be shown to agents by default or be hidden alongside infrequently used fields. Classic interface only.</td>
   </tr>
   <tr>
     <td>regexp_for_validation</td>
     <td>  Regular expression field only. The validation pattern for a field value to be deemed valid.</td>
   </tr>
   <tr>
     <td>title_in_portal</td>
     <td> The title of the ticket field when shown to end users.</td>
   </tr>
   <tr>
     <td>raw_title_in_portal</td>
     <td> The dynamic content placeholder, if present, or the "title_in_portal" value, if not.</td>
   </tr>
   <tr>
     <td>visible_in_portal</td>
     <td> Whether this field is available to end users.</td>
   </tr>
   <tr>
     <td>editable_in_portal</td>
     <td> Whether this field is editable by end users.</td>
   </tr>
   <tr>
     <td>required_in_portal</td>
     <td>  If it's required for this field to have a value when updated by end users.</td>
   </tr>
   <tr>
     <td>tag</td>
     <td> A tag value to set for checkbox fields when checked.</td>
   </tr>
   <tr>
     <td>removable</td>
     <td> If this field is not a system basic field that must be present for all tickets on the account.</td>
   </tr>
   <tr>
     <td>created_at</td>
     <td> The time the ticket field was created.</td>
   </tr>
   <tr>
     <td>updated_at</td>
     <td> The time of the last update of the ticket field.</td>
   </tr>
   <tr>
     <td>received_at</td>
     <td>  This timestamp is added to incoming messages as soon as they hit Segment API.</td>
   </tr>
</table>

### ticket_metrics
<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
   <tr>
     <td>id</td>
     <td> Automatically assigned.</td>
   </tr>
   <tr>
     <td>ticket_id</td>
     <td> ID of the associated ticket.</td>
   </tr>
   <tr>
     <td>group_stations</td>
     <td> Number of groups this ticket passed through.</td>
   </tr>
   <tr>
     <td>assignee_stations</td>
     <td> Number of assignees this ticket had.</td>
   </tr>
   <tr>
     <td>reopens</td>
     <td> Total number of times the ticket was reopened.</td>
   </tr>
   <tr>
     <td>replies</td>
     <td> Total number of times ticket was replied to.</td>
   </tr>
   <tr>
     <td>reply_time_in_minutes_calendar</td>
     <td> Number of minutes to the first reply outside of business hours.</td>
   </tr>
   <tr>
     <td>reply_time_in_minutes_business</td>
     <td> Number of minutes to the first reply during business hours.</td>
   </tr>
   <tr>
     <td>first_resolution_time_in_minutes_calendar</td>
     <td> Number of minutes to the first resolution time outside of business hours.</td>
   </tr>
   <tr>
     <td>first_resolution_time_in_minutes_business</td>
     <td> Number of minutes to the first resolution time during business hours.</td>
   </tr>
   <tr>
     <td>full_resolution_time_in_minutes_calendar</td>
     <td>  Number of minutes to the full resolution outside of business hours.</td>
   </tr>
   <tr>
     <td>full_resolution_time_in_minutes_business</td>
     <td> Number of minutes to the full resolution during business hours.</td>
   </tr>
   <tr>
     <td>agent_wait_time_in_minutes_calendar</td>
     <td>  Number of minutes the agent spent waiting outside of business hours.</td>
   </tr>
   <tr>
     <td>agent_wait_time_in_minutes_business</td>
     <td> Number of minutes the agent spent waiting during business hours.</td>
   </tr>
   <tr>
     <td>requester_wait_time_in_minutes_calendar</td>
     <td> Number of minutes the requester spent waiting outside of business hours.</td>
   </tr>
   <tr>
     <td>requester_wait_time_in_minutes_business</td>
     <td> Number of minutes the requester spent waiting during business hours.</td>
   </tr>
   <tr>
     <td>on_hold_time_in_minutes_calendar</td>
     <td> Number of minutes the ticket was on hold outside of business hours.</td>
   </tr>
   <tr>
     <td>on_hold_time_in_minutes_business</td>
     <td> Number of minutes the ticket was on hold during business hours.</td>
   </tr>
   <tr>
     <td>created_at</td>
     <td> When this record was created.</td>
   </tr>
   <tr>
     <td>updated_at</td>
     <td> When this record last got updated.</td>
   </tr>
   <tr>
     <td>assignee_updated_at</td>
     <td> When the assignee last updated the ticket.</td>
   </tr>
   <tr>
     <td>requester_updated_at</td>
     <td> When the requester last updated the ticket.</td>
   </tr>
   <tr>
     <td>status_updated_at</td>
     <td> When the status was last updated.</td>
   </tr>
   <tr>
     <td>initially_assigned_at</td>
     <td> When the ticket was initially assigned.</td>
   </tr>
   <tr>
    <td>assigned_at</td>
    <td> When the ticket was last assigned.</td>
  </tr>
  <tr>
    <td>solved_at</td>
    <td> When the ticket was solved.</td>
  </tr>
  <tr>
    <td>latest_comment_added_at</td>
    <td> When the latest comment was added.</td>
  </tr>
  <tr>
    <td>received_at</td>
    <td> This timestamp is added to incoming messages as soon as they hit Segment API.</td>
  </tr>
</table>

### ticket_events
<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td> Automatically assigned. </td>
  </tr>
  <tr>
    <td>ticket_event_id</td>
    <td> Automatically assigned when the ticket is updated.</td>
  </tr>
  <tr>
    <td>ticket_id</td>
    <td> The ID of the associated ticket.</td>
  </tr>
  <tr>
    <td>timestamp</td>
    <td> The time when the ticket was updated.</td>
  </tr>
  <tr>
    <td>updater_id</td>
    <td> The ID of the user who updated the ticket.</td>
  </tr>
  <tr>
    <td>ticket_event_via</td>
    <td> How the event was created.</td>
  </tr>
  <tr>
    <td>context_client</td>
    <td>  This refers to the "client" used to submit this ticket change (for example, browser name and type).</td>
  </tr>
  <tr>
    <td>context_location</td>
    <td> The plain text name of where the request was made, if available (for example, country, city).</td>
  </tr>
  <tr>
    <td>context_latitude</td>
    <td> Latitude of the location where the ticket was changed.</td>
  </tr>
  <tr>
    <td>context_longitude</td>
    <td> Longitude of the location where the ticket was changed.</td>
  </tr>
  <tr>
    <td>via</td>
    <td> How the event was created.</td>
  </tr>
</table>

### activities
<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td> Automatically assigned upon creation. </td>
  </tr>
  <tr>
    <td>url</td>
    <td> The API url of this activity.</td>
  </tr>
  <tr>
    <td>verb</td>
    <td> The type of activity. Can be tickets.assignment, tickets.comment, or tickets.priority_increase.</td>
  </tr>
  <tr>
    <td>title</td>
    <td> Description of this activity.</td>
  </tr>
  <tr>
    <td>created_at</td>
    <td> When this record was created.</td>
  </tr>
  <tr>
    <td>updated_at</td>
    <td> When this record last got updated.</td>
  </tr>
</table>

### attachments
<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td> Automatically assigned upon creation.</td>
  </tr>
  <tr>
    <td>file_name</td>
    <td> The name of the image file.</td>
  </tr>
  <tr>
    <td>content_url</td>
    <td> A full URL where the attachment image file can be downloaded.</td>
  </tr>
  <tr>
    <td>content_type</td>
    <td> The content type of the image. Example value: image/png.</td>
  </tr>
  <tr>
    <td>inline</td>
    <td> If true, the attachment is excluded from the attachment list and the attachment's URL can be referenced within the comment of a ticket. Default is false.</td>
  </tr>
  <tr>
    <td>size</td>
    <td> The size of the image file in bytes.</td>
  </tr>
  <tr>
    <td>received_at</td>
    <td> This timestamp is added to incoming messages as soon as they hit Segment API.</td>
  </tr>
</table>

### organizations
<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td> Automatically assigned when the organization is created. </td>
  </tr>
  <tr>
    <td>external_id</td>
    <td> A unique external ID to associate organizations to an external record.</td>
  </tr>
  <tr>
    <td>url</td>
    <td> The API url of this organization.</td>
  </tr>
  <tr>
    <td>name</td>
    <td> A unique name for the organization.</td>
  </tr>
  <tr>
    <td>details</td>
    <td> This includes any details about the organization, such as the address.</td>
  </tr>
  <tr>
    <td>notes</td>
    <td> Any notes you have about the organization.</td>
  </tr>
  <tr>
    <td>group_id</td>
    <td> New tickets from users in this organization are automatically put in this group.</td>
  </tr>
  <tr>
    <td>shared_tickets</td>
    <td> End users in this organization are able to see each other's tickets.</td>
  </tr>
  <tr>
    <td>shared_comments</td>
    <td> End users in this organization are able to see each other's comments on tickets.</td>
  </tr>
  <tr>
    <td>created_at</td>
    <td> The time the organization was created.</td>
  </tr>
  <tr>
    <td>updated_at</td>
    <td> The time of the last update of the organization.</td>
  </tr>
  <tr>
    <td>received_at</td>
    <td> This timestamp is added to incoming messages as soon as they hit Segment API.</td>
  </tr>
</table>

### satisfaction_ratings
<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td> Automatically assigned when the organization is created. </td>
  </tr>
  <tr>
    <td>url</td>
    <td> The API url of this rating.</td>
  </tr>
  <tr>
    <td>assignee_id</td>
    <td> The ID of agent assigned to at the time of rating.</td>
  </tr>
  <tr>
    <td>group_id</td>
    <td> The ID of group assigned to at the time of rating.</td>
  </tr>
  <tr>
    <td>requester_id</td>
    <td> The ID of ticket requester submitting the rating.</td>
  </tr>
  <tr>
    <td>ticket_id</td>
    <td>  The ID of ticket being rated.</td>
  </tr>
  <tr>
    <td>score</td>
    <td> The rating: "offered", "unoffered", "good" or "bad".</td>
  </tr>
  <tr>
    <td>created_at</td>
    <td> The time the satisfaction rating got created.</td>
  </tr>
  <tr>
    <td>updated_at</td>
    <td> The time the satisfaction rating got updated.</td>
  </tr>
  <tr>
    <td>received_at</td>
    <td> This timestamp is added to incoming messages as soon as they hit Segment API.</td>
  </tr>
</table>

### ticket_comments
  <table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td> Automatically assigned when the comment is created. </td>
  </tr>
  <tr>
    <td>ticket_event_id</td>
    <td> Automatically assigned when the comment is created.</td>
  </tr>
  <tr>
    <td>ticket_id</td>
    <td> The ID of ticket being commented.</td>
  </tr>
  <tr>
    <td>type</td>
    <td> Comment or VoiceComment. The JSON object for voice comments is different.</td>
  </tr>
  <tr>
    <td>body</td>
    <td> The comment string.</td>
  </tr>
  <tr>
    <td>public</td>
    <td>  true if a public comment; false if an internal note. The initial value set on ticket creation persists for any additional comment unless you change it.</td>
  </tr>
  <tr>
    <td>author_id</td>
    <td> The ID of the comment author.</td>
  </tr>
  <tr>
    <td>via</td>
    <td> How the comment was created.</td>
  </tr>
  <tr>
    <td>created_at</td>
    <td> The time the comment was created.</td>
  </tr>
  <tr>
    <td>received_at</td>
    <td> This timestamp is added to incoming messages as soon as they hit Segment API.</td>
  </tr>
</table>

### ticket_forms
<table>
   <tr>
     <th>Property</th>
     <th>Description</th>
   </tr>
   <tr>
     <td>id</td>
     <td>Automatically assigned when creating groups. </td>
   </tr>
   <tr>
     <td>active</td>
     <td>Shows if the form is set as active.</td>
   </tr>
   <tr>
     <td>end_user_visible</td>
     <td>This shows if the form is visible to the end user.</td>
   </tr>
   <tr>
     <td>name</td>
     <td>The name of the form.</td>
   </tr>
   <tr>
     <td>restricted_brand_ids</td>
     <td>The IDs of all brands that this ticket form is restricted to.</td>
   </tr>
   <tr>
     <td>ticket_field_ids</td>
     <td>The IDs of all ticket fields which are in this ticket form.</td>
   </tr>
   <tr>
     <td>updated_at</td>
     <td>The time of the last update of the ticket form.</td>
   </tr>
   <tr>
     <td>url</td>
     <td> The API url of this ticket.</td>
   </tr>
   <tr>
     <td>created_at</td>
     <td>The time the ticket form was created.</td>
   </tr>
   <tr>
     <td>display_name</td>
     <td>The name of the form that displays to the end user.</td>
   </tr>
   <tr>
     <td>in_all_brands</td>
     <td>This shows if the form is available for use in all brands on this account.</td>
   </tr>
   <tr>
     <td>position</td>
     <td>The position of this form among other forms in the account (for example, dropdown)</td>
   </tr>
   <tr>
     <td>raw_display_name</td>
     <td>The dynamic content placeholder (if available,) or the "display_name" value, if the dynamic content placeholder is unavailable.</td>
   </tr>
   <tr>
     <td>raw_name</td>
     <td>The dynamic content placeholder (if available,) or the "name" value, if the dynamic content placeholder is unavailable.</td>
   </tr>
   <tr>
     <td>default</td>
     <td>This shows if this form is the default form for this account.</td>
   </tr>
</table>

### ticket_skips
<table>
   <tr>
     <th>Property</th>
     <th>Description</th>
   </tr>
   <tr>
     <td>id</td>
     <td>Automatically assigned when creating groups.</td>
   </tr>
   <tr>
     <td>user_id</td>
     <td>The ID of the skipping agent.</td>
   </tr>
   <tr>
     <td>reason</td>
     <td>The reason for skipping the ticket.</td>
   </tr>
   <tr>
     <td>created_at</td>
     <td>The time the skip was created.</td>
   </tr>
   <tr>
     <td>updated_at</td>
     <td>The time the skip was last updated.</td>
   </tr>
</table>

### organization_memberships
<table>
   <tr>
     <th>Property</th>
     <th>Description</th>
   </tr>
   <tr>
     <td>id</td>
     <td>This is automatically assigned when creating groups. </td>
   </tr>
   <tr>
     <td>url</td>
     <td> The API url of this ticket.</td>
   </tr>
   <tr>
     <td>user_id</td>
     <td>The ID of the user who has this organization membership.</td>
   </tr>
   <tr>
     <td>organization_id</td>
     <td>The ID of the organization associated with this user.</td>
   </tr>
   <tr>
     <td>created_at</td>
     <td>When this record was created.</td>
   </tr>
   <tr>
     <td>updated_at</td>
     <td>When this record was last updated.</td>
   </tr>
   <tr>
     <td>organization_name</td>
     <td>The name of the organization associated with this user.</td>
   </tr>
</table>

### group_memberships
<table>
   <tr>
     <th>Property</th>
     <th>Description</th>
   </tr>
   <tr>
     <td>id</td>
     <td> Automatically assigned when creating groups. </td>
   </tr>
   <tr>
     <td>url</td>
     <td> The API url of this group.</td>
   </tr>
   <tr>
     <td>created_at</td>
     <td> The time the group was created.</td>
   </tr>
   <tr>
     <td>group_id</td>
     <td> The ID of the group assigned to at the time of rating.</td>
   </tr>
   <tr>
     <td>updated_at</td>
     <td> The time of the last update of the group.</td>
   </tr>
   <tr>
     <td>user_id</td>
     <td> The ID of an agent.</td>
   </tr>
</table>

### audit_logs
<table>
   <tr>
     <th>Property</th>
     <th>Description</th>
   </tr>
   <tr>
     <td>id</td>
     <td>Automatically assigned when creating groups. </td>
   </tr>
   <tr>
     <td>url</td>
     <td> The API url of this ticket.</td>
   </tr>
   <tr>
     <td>created_at</td>
     <td>The time the audit got created.</td>
   </tr>
   <tr>
     <td>actor_id</td>
     <td>The ID of the user creating the ticket</td>
   </tr>
   <tr>
     <td>source_id</td>
     <td>The ID of the item being audited.</td>
   </tr>
   <tr>
     <td>source_type</td>
     <td>The item type being audited.</td>
   </tr>
   <tr>
     <td>source_label</td>
     <td>The name of the item being audited.</td>
   </tr>
   <tr>
     <td>action</td>
     <td>The action a user performed. Either "login", "create", "update", or "destroy".</td>
   </tr>
   <tr>
     <td>change_description</td>
     <td>The description of the change that occurred.</td>
   </tr>
   <tr>
     <td>ip_address</td>
     <td>The IP address of the user performing the audit.</td>
   </tr>
   <tr>
     <td>action_label</td>
     <td>A localized string of action field.</td>
   </tr>
</table>

## Adding Destinations
Currently only Warehouses are supported for object-cloud sources.