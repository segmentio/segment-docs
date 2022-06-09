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
|  [ticket_forms](#ticket_forms) | object | Ticket forms allow an admin to define a subset of ticket fields for display to both agents and end users. **Note**: This feature requires a Zendesk Enterprise account. |
|  [ticket_skips](#ticket_skips) | object | A skip is a record of when an agent skips over a ticket without responding to the end user.  |
|  [organization_memberships](#organization_memberships) | object | An organization_membership links a user to an organization. Organizations can have many users. Users can be in many organizations if the account supports multiple organizations. |
|  [group_memberships](#group_memberships) | object | A group_membership links an agent to a group. Groups can have many agents, as agents can be in many groups. |
|  [audit_logs](#audit_logs) | object | The audit log shows various changes in your instance of Zendesk since the account was created.  **Note**: This collection is not included by default. To request it, [contact Segment support](https://segment.com/help/contact/). |


In your warehouse, each collection gets its own table. Find below a list of the properties Segment automatically fetches for each collection.

> note "Standard properties"
> The list in this document includes the standard properties only, but doesn't include _your_ custom fields. (Don't worry, they'll be there in your warehouse.)

### groups

| Property    | Description                                  |
| ----------- | -------------------------------------------- |
| id          | This is automatically assigned when creating groups. |
| url         | The API URL of this group.                   |
| deleted     | Deleted groups get marked as such.           |
| name        | The name of the group.                       |
| created_at  | The date and time the group was created.     |
| updated_at  | The date and time of the last update of the group. |
| received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |

### users

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | This is automatically assigned when the user is created.          |
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
| id              | This is automatically assigned when the ticket is created.        |
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
| collaborator_ids | The IDs of users currently cc'ed on the ticket.                  |
| forum_topic_id  | The topic this ticket originated from, if any.                    |
| problem_id      | For tickets of type "incident," The ID of the problem the incident is linked to. |
| has_incidents   | Is true of this ticket has been marked as a problem, false otherwise. |
| due_at          | If this is a ticket of type "task" it has a due date. Due date format uses ISO 8601 format. | 
| tags            | The array of tags applied to this ticket.                         |
| sharing_agreement_ids | The IDs of sharing agreements used for this ticket.         |
| created_at      | The date and time this record was created.                        |
| updated_at      | The date and time this record was last updated.                   |
| received_at     | This timestamp is added to incoming messages as soon as they hit Segment API. |
| ticket_form_id  | The ID of the ticket form to render the ticket.                   |

### ticket_fields

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | This is automatically assigned upon creation.                     |
| url             | The URL for this resource.                                        |
| type            | The type of the ticket field: “checkbox”, “date”, “decimal”, “integer”, “regexp”, “tagger”, “text”, or “textarea”. _*Type is not editable once created._ |
| slug            | The title of the ticket field separated by _.                     |
| title           | The title of the ticket field.                                    |
| raw_title       | The dynamic content placeholder, if present, or the "title" value, if not. |
| description     | The description of the purpose of this ticket field shown to users. |
| raw_description | The dynamic content placeholder, if present, or the “description” value, if not. |
| position        | A relative position for the ticket fields that determines the order of ticket fields on a ticket. Note that positions 0 to 7 are reserved for system fields. |
| active          | Whether this field is available.                                  |
| required        | If it's required for this field to have a value when updated by agents.|
| collapsed_for_agents | If this field should be shown to agents by default or be hidden alongside infrequently used fields. Classic interface only. |
| regexp_for_validation | Regular expression field only. The validation pattern for a field value to be deemed valid. |
| title_in_portal | The title of the ticket field when shown to end users.            |
| raw_title_in_portal | The dynamic content placeholder, if present, or the “title_in_portal” value, if not. |
| visible_in_portal | Whether this field is available to end users.                   |
| editable_in_portal | Whether this field is editable by end users.                   |
| required_in_portal | If it's required for this field to have a value when updated by end users. |
| tag             | A tag value to set for checkbox fields when checked.              |
| removable      | If this field is not a system basic field that must be present for all tickets on the account. | 
| created_at      | The date and time the ticket field was created.                   |
| updated_at      | The date and time of the last update of the ticket field.         |
| received_at     | This timestamp is added to incoming messages as soon as they hit Segment API. |

### ticket_metrics

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | This is automatically assigned.                                   |
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
| id              | This is automatically assigned.                                   |
| ticket_event_id | This is automatically assigned when the ticket is updated.        |
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
| id              | This is automatically assigned upon creation.                     |
| url             | The API URL of this activity.                                     |
| verb            | The type of activity. Can be "tickets.assignment," "tickets.comment," or "tickets.priority_increase." |
| title           | Description of this activity.                                     |
| created_at      | The date and time this record was created.                        |
| updated_at      | The date and time this record was last updated.                   |

### attachments

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | This is automatically assigned upon creation.                     |
| file_name       | The name of the image file.                                       |
| content_url     | A full URL where the attachment image file can be downloaded.     |
| content_type    | The content type of the image. Example value: image/png.          |
| inline          | If true, the attachment is excluded from the attachment list and the attachment's URL can be referenced within the comment of a ticket. Default is false. |
| size            | The size of the image file in bytes.                              |
| received_at     | This timestamp is added to incoming messages as soon as they hit Segment API. |

### organizations

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | This is automatically assigned when the organization is created.  |
| external_id     | A unique external ID to associate organizations to an external record. |
| url             | The API URL of this organization.                                 |
| name            | A unique name for the organization.                               |
| details         | This includes any details about the organization, such as the address. |
| notes           | Any notes you have about the organization.                        |
| group_id        | New tickets from users in this organization are automatically put in this group. |
| shared_tickets  | End users in this organization are able to see each other's tickets. |
| shared_comments | End users in this organization are able to see each other's comments on tickets. |
| created_at | The date and time that the organization was created.                   |
| updated_at      | The date and time that the organization was last updated.         |
| received_at     | This timestamp is added to incoming messages as soon as they hit Segment API. |

### ticket_comments

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | This is automatically assigned when the comment is created.       |
| ticket_event_id | This is automatically assigned when the comment is created.       |
| ticket_id       | The ID of the ticket being commented.                             |
| type            | Comment or VoiceComment. The JSON object for voice comments is different.  |
| body            | The comment string.                                               |
| public          | true if a public comment; false if an internal note. The initial value set on ticket creation persists for any additional comment unless you change it. |
| author_id       | The ID of the comment author.                                     |
| via             | How the comment was created.                                      |
| created_at      | The time the comment was created.                                 |
| received_at     | This timestamp is added to incoming messages as soon as they hit Segment API. |

### ticket_forms
> warning "This collection requires Zendesk Enterprise access"
> Segment's Zendesk source connector only fetches data for the ticket_forms collection if the associated Zendesk account is an Zendesk Enterprise account. For more information, please see [ Zendesk's ticket_forms documentation](https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_forms/){:target="_blank"}.


| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | The ID of the ticket form.                                        |
| active          | If set to true, this shows that the form is active.               |
| end_user_visible | If set to true, this shows that the form is visible to end users.|
| name            | The name of the form.                                             |
| restricted_brand_ids | The IDs of all brands that this ticket form is restricted to. |
| ticket_field_ids | The IDs of all ticket fields which are in this ticket form.      |
| updated_at      | The date and time the ticket form was last updated.               |
| url             | The URL of the ticket form.                                       |
| created_at      | The date and time the ticket form was created.                    |
| display_name    | The name of the form that displays to the end user.               |
| in_all_brands   | This shows if the form is available for use in all brands on this account. |
| position         | The position of this form among other forms in the account (for example, dropdown) |
| raw_display_name | The dynamic content placeholder (if available,) or the “display_name” value, if the dynamic content placeholder is unavailable. |
| raw_name       | The dynamic content placeholder (if available,) or the “name” value, if the dynamic content placeholder is unavailable. |
| default        | If set to true, this shows that the form is the default form for this account. |

### ticket_skips

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | The ID of the ticket skip record.                                 |
| ticket_id       | The ID of the skipped ticket.                                     |
| user_id         | The ID of the skipping agent.                                     |
| reason          | The reason for skipping the ticket.                               |
| created_at      | The date and time the skip was created.                           |
| updated_at      | The date and time the skip was last updated.                      |

### organization_memberships

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | The ID of the organization membership.                            |
| url             | The API URL of the membership.                                    |
| user_id         | The ID of the user for whom this membership belongs.              |
| organization_id | The ID of the organization associated with the selected user, in this membership. |
| created_at      | The date and time this record was created.                        |
| updated_at      | The date and time this record was last updated.                   |
| organization_name | The name of the organization associated with the selected user, in this membership. |

### group_memberships

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | The ID of the group membership.                                   |
| url             | The API URL of this group.                                        |
| created_at      | The date and time the group was created.                          |
| group_id        | The ID of the group.                                              |
| updated_at      | The date and time the group was last updated.                     |
| user_id         | The ID of an agent.                                               |

### audit_logs

| Property        | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| id              | The ID of the audit log.                                          |
| url             | The URL to access the audit log.                                  |
| created_at      | The date and time that the audit was created.                     |
| actor_id        | The ID of the user creating the ticket.                           |
| source_id       | The ID of the item being audited.                                 |
| source_type     | The item type being audited.                                      |
| source_label    | The name of the item being audited.                               |
| action          | The action a user performed. Either “login”, “create”, “update”, or “destroy”. |
| change_description | The description of the change that occurred.                   |
| ip_address      | The IP address of the user performing the audit.                  |
| action_label    | A localized string of action field.                               |

## Adding Destinations
Currently only Warehouses are supported for object-cloud sources.
