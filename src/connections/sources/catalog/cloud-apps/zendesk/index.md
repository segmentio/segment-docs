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

| Property    | Description                                  |
| ----------- | -------------------------------------------- |
| id          | Automatically assigned when creating groups. |
| url         | The API URL of this group.                   |
| deleted     | Deleted groups get marked as such.           |
| name        | The name of the group.                       |
| created_at  | The date and time the group was created.     |
| updated_at  | The date and time of the last update of the group. |
| received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |

### users

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | Automatically assigned when the user is created.                  |
| url             | Segment sets the “url” field users see in their Warehouse to equal the “id” from Zendesk, rather than the “url” field. |
| name            | The name of the user.                                             |
| email           | The primary email address of the user.                            |
| time_zone       | The time-zone of this user.                                       |
| phone           | The primary phone number of this user.                            |
| locale_id       | The language identifier of this user.                             |
| locale          | The locale for this user.                                         |
| organization_id | The ID of the organization that this user is associated with.     |
| role            | The role of the user. Possible values: "end-user", "agent", "admin". |
| verified        | The user's primary identity is verified or not.                   |
| external_id     | A unique identifier from another system. The API treats the ID as case insensitive. Example: ian1 and Ian1 are the same user. |
| alias           | An alias displayed to end users.                                  |
| active          | This is set to false if the user has been deleted.                |
| shared          | If the user is a shared agent from different Zendesk Support instance. Ticket sharing accounts only. |
| last_login_at   | The last time the user signed in to Zendesk Support.              |
| two_factor_auth_enabled | If two factor authentication is enabled.                  |
| signature       | The user's signature. Only agents and admins can have signatures. |
| details         | Any details you want to store about the user, such as an address. |
| notes           | Any notes you want to store about the user.                       |
| custom_role_id  | A custom role if the user is an agent on the Enterprise plan.     |
| moderator       | Designates whether the user has forum moderation capabilities.    |
| ticket_restriction | Specifies which tickets the user has access to. Possible values are: “organization”, “groups”, “assigned”, “requested”, null. |
| only_private_comments | This is set to true if the user can only create private comments. |
| restricted_agent | If the agent has any restrictions: This is set to false for admins and unrestricted agents, true for other agents. |
| suspended        | If the agent is suspended. Tickets from suspended users are also suspended, and these users cannot sign in to the end user portal. |
| chat_only        | Whether or not the user is a chat-only agent.                    |
| updated_at       | The date and time of the user's last update.                     |
| received_at      | This timestamp is added to incoming messages as soon as they hit Segment API. | 

### tickets

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | Automatically assigned when the ticket is created.                |
| url             | The API URL of this ticket.                                       |
| external_id     | An ID you can use to link Zendesk Support tickets to local records. |
| type            | The type of this ticket. Possible values: “problem”, “incident”, “question” or “task”. |
| subject         | The value of the subject field for this ticket.                   |
| raw_subject     | The dynamic content placeholder, if present, or the "subject" value, if not. |
| description     | The first comment on the ticket.                                  |
| priority        | The urgency with which the ticket should be addressed. Possible values: “urgent”, “high”, “normal”, “low”. |
| status          | The state of the ticket. Possible values: “new”, “open”, “pending”, “hold”, “solved”, “closed”. |
| recipient       | The original recipient e-mail address of the ticket. |
| requester_id    | The user who requested this ticket.                               |
| submitter_id    | The user who submitted the ticket. The submitter always becomes the author of the first comment on the ticket. |
| assignee_id     | The agent currently assigned to the ticket.                       |
| organization_id | The organization of the requester. You can only specify the ID of an organization associated with the requester. |
| group_id        | The group this ticket is assigned to.                             |
| collaborator_ids | The IDs of users currently cc’ed on the ticket.                  |
| forum_topic_id  | The topic this ticket originated from, if any.                    |
| problem_id      | For tickets of type "incident," The ID of the problem the incident is linked to. |
| has_incidents   | Is true of this ticket has been marked as a problem, false otherwise. |
| due_at          | If this is a ticket of type "task" it has a due date. Due date format uses ISO 8601 format. | 
| tags            | The array of tags applied to this ticket.                         |
| sharing_agreement_ids | The IDs of sharing agreements used for this ticket.         |
| created_at      | The date and time this record was created.                        |
| updated_at      | The date and time this record was last updated.                   |
| received_at     | This timestamp is added to incoming messages as soon as they hit Segment API. |
| ticket_form_id  | The ID of the ticket form to render the ticket (Enterprise only). |

### ticket_fields

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | Automatically assigned upon creation.                             |
| url             | The URL for this resource.                                        |
| type            | The type of the ticket field: “checkbox”, “date”, “decimal”, “integer”, “regexp”, “tagger”, “text”, or “textarea”. _*Type is not editable once created._ |
| slug            | The title of the ticket field separated by _.                     |
| title           | The title of the ticket field.                                    |
| raw_title       | The dynamic content placeholder, if present, or the "title" value, if not. |
| description     | The description of the purpose of this ticket field shown to users. |
| raw_description | The dynamic content placeholder, if present, or the “description” value, if not. |
| position        | A relative position for the ticket fields that determines the order of ticket fields on a ticket. Note that positions 0 to 7 are reserved for system fields. |
| active          | Whether this field is available.                                  |
| required        | If it’s required for this field to have a value when updated by agents.|
| collapsed_for_agents | If this field should be shown to agents by default or be hidden alongside infrequently used fields. Classic interface only. |
| regexp_for_validation | Regular expression field only. The validation pattern for a field value to be deemed valid. |
| title_in_portal | The title of the ticket field when shown to end users.            |
| raw_title_in_portal | The dynamic content placeholder, if present, or the “title_in_portal” value, if not. |
| visible_in_portal | Whether this field is available to end users.                   |
| editable_in_portal | Whether this field is editable by end users.                   |
| required_in_portal | If it’s required for this field to have a value when updated by end users. |
| tag             | A tag value to set for checkbox fields when checked.              |
| removable      | If this field is not a system basic field that must be present for all tickets on the account. | 
| created_at      | The date and time the ticket field was created.                   |
| updated_at      | The date and time of the last update of the ticket field.         |
| received_at     | This timestamp is added to incoming messages as soon as they hit Segment API. |

### ticket_metrics

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | Automatically assigned.                                           |
| ticket_id       | ID of the associated ticket.                                      |
| group_stations  | Number of groups this ticket passed through.                      |
| assignee_stations | Number of assignees this ticket had.                            |
| reopens         | Total number of times the ticket was reopened.                    |
| replies         | Total number of times ticket was replied to.                      |
| reply_time_in_minutes_calendar | Number of minutes to the first reply outside of business hours. |
| reply_time_in_minutes_business | Number of minutes to the first reply during business hours. |
| first_resolution_time_in_minutes_calendar | Number of minutes to the first resolution time outside of business hours. |
| first_resolution_time_in_minutes_business | Number of minutes to the first resolution time during business hours. |
| full_resolution_time_in_minutes_calendar | Number of minutes to the full resolution outside of business hours. |
| full_resolution_time_in_minutes_business | Number of minutes to the full resolution during business hours. |
| agent_wait_time_in_minutes_calendar | Number of minutes the agent spent waiting outside of business hours. |
| agent_wait_time_in_minutes_business | Number of minutes the agent spent waiting during business hours. |
| requester_wait_time_in_minutes_calendar | Number of minutes the requester spent waiting outside of business hours. |
| requester_wait_time_in_minutes_business | Number of minutes the requester spent waiting during business hours. |
| on_hold_time_in_minutes_calendar | Number of minutes the ticket was on hold outside of business hours. |
| on_hold_time_in_minutes_business | Number of minutes the ticket was on hold during business hours. |
| created_at    | The date and time this record was created.                          |
| updated_at    | The date and time this record was last updated.                     |
| assignee_updated_at | The date and time the assignee last updated the ticket.       |
| requester_updated_at | The date and time the requester last updated the ticket.     |
| status_updated_at   | The date and time the status was last updated.                |
| initially_assigned_at | The date and time the ticket was initially assigned.        |
| assigned_at  | The date and time the ticket was last assigned.                      |
| latest_comment_added_at | The date and time the latest comment was added.           |
| received_ at | This timestamp is added to incoming messages as soon as they hit Segment API. |

### ticket_events

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | Automatically assigned.                                           |
| ticket_event_id | Automatically assigned when the ticket is updated.                |
| ticket_id       | The ID of the associated ticket.                                  |
| timestamp       | The time when the ticket was updated.                             |
| updater_id      | The ID of the user who updated the ticket.                        |
| ticket_event_via | How the event was created.                                       |
| context_client  | This refers to the “client” used to submit this ticket change (for example, browser name and type). |
| context_location | The plain text name of where the request was made, if available (for example, country, city). |
| context_latitude | Latitude of the location where the ticket was changed.           |
| context_longitude | Longitude of the location where the ticket was changed.         |
| via             | How the event was created.                                        |


### activities

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | Automatically assigned upon creation.                             |
| url             | The API URL of this activity.                                     |
| verb            | The type of activity. Can be "tickets.assignment," "tickets.comment," or "tickets.priority_increase." |
| title           | Description of this activity.                                     |
| created_at      | The date and time this record was created.                        |
| updated_at      | The date and time this record was last updated.                   |

### attachments

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | Automatically assigned upon creation.                             |
| file_name       | The name of the image file.                                       |
| content_url     | A full URL where the attachment image file can be downloaded.     |
| content_type    | The content type of the image. Example value: image/png.          |
| inline          | If true, the attachment is excluded from the attachment list and the attachment’s URL can be referenced within the comment of a ticket. Default is false. |
| size            | The size of the image file in bytes.                              |
| recieved_at     | This timestamp is added to incoming messages as soon as they hit Segment API. |

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