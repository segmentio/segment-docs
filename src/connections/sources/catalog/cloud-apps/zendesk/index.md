---
title: Zendesk Source
id: 3hbak7a9
---

<!-->

[Zendesk](https://www.zendesk.com/){:target="_blank”} is a customer support platform that helps businesses manage and respond to customer requests across channels.

## Getting started

1. Go to **Connections > Sources** and click **Add Source** in the Segment app.
2. Search for **Zendesk** in the Sources Catalog and click **Add Source**.
3. Give the source a name and add any labels to help you organize and filter your sources. You can give the source any name, but Segment recommends a name that reflects the source itself, as this name auto-populates the schema name. For example, the source name `Zendesk` creates the schema `zendesk`.
- You can add multiple instances if you have multiple Zendesk accounts. 
4. Enter your Zendesk subdomain. The subdomain you use to access your Zendesk portal (for example `segment` for segment.zendesk.com)
- If you enter `segment.zendesk.com` as a subdomain instead of just `segment`, Segment tries to access the host `segment.zendesk.com.zendesk.com` and you will get a credentials error.
5. Click **Authorize** to start Zendesk's OAuth process. Sign in and grant permissions.

> success ""
> Segment uses Zendesk's [Incremental Export API](https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/){:target="_blank”} , which requires Admin access. Make sure the user has Admin authorizations.


### Rate limits

The Zendesk source uses both Zendesk's [Core API](https://developer.zendesk.com/api-reference/){:target="_blank"} and [Incremental Exports API](https://developer.zendesk.com/rest_api/docs/core/incremental_export){:target="_blank"}. 

The source's requests to the Incremental API don't count towards your Zendesk account's rate limits, but requests to the Core API do. By default, Segment caps requests to Zendesk's Core API to a rate of 200 requests per minute to avoid triggering [Zendesk's Rate Limits](https://developer.zendesk.com/api-reference/ticketing/account-configuration/usage_limits/){:target="_blank"}. 

If you'd like to increase or decrease the request rate for your source, [reach out to Segment support](https://segment.com/help/contact/){:target="_blank”}.

## Components

### Sync

The Zendesk source is built with a sync component, which means Segment makes requests to their API on your behalf on a three hour interval to pull the latest data into Segment. In the initial sync, Segment grabs all the Zendesk objects (and their corresponding properties) according to the Collections table in this section. The objects are written into a separate schema, corresponding to the source instance's schema name you designated upon creation (like `zendesk_prod.users`).

The sync component uses an upsert API, so the data in your warehouse loaded using sync reflects the latest state of the corresponding resource in Zendesk.  For example, if `ticket_status` goes from `open` to `closed` between syncs, on its next sync that tickets status is `closed`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources sync with Segment every three hours. Depending on your Warehouses plan, Segment pushes the Source data to your warehouse on the interval associated with your billing plan.

At the moment, Segment doesn't support filtering which objects or properties get synced. If you're interested in this feature, [reach out to Segment support](https://segment.com/help/contact/){:target="_blank”}.

## Collections

Collections are the groupings of resources Segment pulls from your source.


| Collection                                            | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [users](#users)                                       | object | Zendesk Support has three types of users: end-users (your customers), agents, and administrators. End-users request support through tickets. Agents work in Zendesk Support to solve tickets. Agents can be divided into multiple groups and can also belong to multiple groups. Agents don't have access to administrative configuration in Zendesk Support such as business rules or automation, but can configure their own macros and views. Administrators have all the abilities of agents, plus administrative abilities. |
| [groups](#groups)                                     | object | When support requests arrive in Zendesk, they can be assigned to a Group. Groups serve as the core element of ticket workflow; support agents are organized into Groups and tickets can be assigned to a Group only, or to an assigned agent within a Group. A ticket can never be assigned to an agent without also being assigned to a Group.                                                                                                                                                                                  |
| [tickets](#tickets)                                   | object | Tickets are the means through which your End-users (customers) communicate with Agents in Zendesk. **Note**: Segment pulls all tickets updated (or created) in the last year to start by default. If you need more, reach out to [Segment support](https://segment.com/help/contact/){:target="_blank”}. Support can do a run to pull further back in history.                                                                                                                                                                   |
| [ticket_fields](#ticket_fields)                       | object | Customize fields on the ticket form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [activities](#activities)                             | object | The activity stream is a per agent event stream. It will give access to the most recent events that relate to the agent polling the API.                                                                                                                                                                                                                                                                                                                                                                                         |
| [attachments](#activities)                            | object | This API is for attachments in tickets and forum posts in the Web portal.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [organizations](#organizations)                       | object | Just as agents can be segmented into groups in Zendesk, your customers (end-users) can be segmented into organizations.                                                                                                                                                                                                                                                                                                                                                                                                          |
| [ticket_events](#ticket_events)                       | events | Returns a stream of changes that occurred on tickets. Each event is tied to an update on a ticket and contains all the fields that were updated in that change. **Note**: Segment pulls one year of ticket events to start by default. If you need more, reach out to [Segment support](https://segment.com/help/contact/){:target="_blank”}. Support can do a run to pull further back in history.                                                                                                                              |
| [ticket_metrics](#ticket_metrics)                     | object | All kinds of aggregate metrics about a ticket                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [satisfaction_ratings](#satisfaction_ratings)         | object | If you have enabled satisfaction ratings for your account, this end point allows you to quickly retrieve all ratings.                                                                                                                                                                                                                                                                                                                                                                                                            |
| [ticket_comments](#ticket_comments)                   | object | Ticket comments represent the conversation between requesters, collaborators, and agents. It includes the full body of each comment, public and private. **Note**: This collection is not included by default. To request it, [contact Segment support](https://segment.com/help/contact/){:target="_blank”}.                                                                                                                                                                                                                    |
| [ticket_forms](#ticket_forms)                         | object | Ticket forms allow an admin to define a subset of ticket fields for display to both agents and end users. **Note**: This feature requires a Zendesk Enterprise account. Segment fully syncs all available records in each sync run.                                                                                                                                                                                                                                                                                              |
| [ticket_skips](#ticket_skips)                         | object | A skip is a record of when an agent skips over a ticket without responding to the end user. **Note**: Segment fully syncs all available records in this collection during each sync run.                                                                                                                                                                                                                                                                                                                                         |
| [organization_memberships](#organization_memberships) | object | An organization_membership links a user to an organization. Organizations can have many users. Users can be in many organizations if the account supports multiple organizations. **Note**: Segment fully syncs all available records in this collection during each sync run.                                                                                                                                                                                                                                                   |
| [group_memberships](#group_memberships)               | object | A group_membership links an agent to a group. Groups can have many agents, as agents can be in many groups. **Note**: Segment fully syncs all available records in this collection during each sync run.                                                                                                                                                                                                                                                                                                                         |
| [audit_logs](#audit_logs)                             | object | The audit log shows various changes in your instance of Zendesk since the account was created. **Note**: This collection is not included by default. To request it, [contact Segment support](https://segment.com/help/contact/){:target="_blank”}.                                                                                                                                                                                                                                                                              |


In your warehouse, each collection is stored in its own table. The tables that follow list the standard properties Segment automatically fetches for each collection.

> info "Standard properties only"
> These tables include only standard Zendesk properties. Your custom fields will also appear in your warehouse after sync.

### groups

This collection contains information about Zendesk groups.

| Property      | Description                                        |
| ------------- | -------------------------------------------------- |
| `id`          | Automatically assigned when a group is created.    |
| `url`         | The API URL of the group.                          |
| `deleted`     | Indicates whether the group has been deleted.      |
| `name`        | The name of the group.                             |
| `created_at`  | The date and time the group was created.           |
| `updated_at`  | The date and time the group was last updated.      |
| `received_at` | Timestamp added when data reaches the Segment API. |

### users

This collection contains information about Zendesk users.

| Property                  | Description                                                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `id`                      | Automatically assigned when a user is created.                                                                                |
| `url`                     | Segment sets this field to the Zendesk `id`, not the original Zendesk `url`.                                                  |
| `name`                    | The user’s full name.                                                                                                         |
| `email`                   | The user’s primary email address.                                                                                             |
| `time_zone`               | The user’s time zone.                                                                                                         |
| `phone`                   | The user’s primary phone number.                                                                                              |
| `locale_id`               | The language identifier for the user.                                                                                         |
| `locale`                  | The user’s locale.                                                                                                            |
| `organization_id`         | The ID of the organization the user belongs to.                                                                               |
| `role`                    | The user’s role. Possible values: `end-user`, `agent`, `admin`.                                                               |
| `verified`                | Indicates whether the user’s primary identity is verified.                                                                    |
| `external_id`             | A unique identifier from another system. Treated as case-insensitive (for example, `ian1` and `Ian1` refer to the same user). |
| `alias`                   | An alias displayed to end users.                                                                                              |
| `active`                  | Set to `false` if the user has been deleted.                                                                                  |
| `shared`                  | Indicates whether the user is a shared agent from another Zendesk instance (ticket sharing accounts only).                    |
| `last_login_at`           | The date and time of the user’s last login.                                                                                   |
| `two_factor_auth_enabled` | Indicates whether two-factor authentication is enabled.                                                                       |
| `signature`               | The user’s signature (agents and admins only).                                                                                |
| `details`                 | Additional details about the user, such as an address.                                                                        |
| `notes`                   | Notes stored about the user.                                                                                                  |
| `custom_role_id`          | The custom role ID if the user is an agent on the Enterprise plan.                                                            |
| `moderator`               | Indicates whether the user has forum moderation permissions.                                                                  |
| `ticket_restriction`      | Specifies which tickets the user can access. Possible values: `organization`, `groups`, `assigned`, `requested`, or `null`.   |
| `only_private_comments`   | Set to `true` if the user can only create private comments.                                                                   |
| `restricted_agent`        | Indicates whether the agent has restrictions. `false` for admins and unrestricted agents, `true` for restricted agents.       |
| `suspended`               | Indicates whether the agent is suspended. Tickets from suspended users are also suspended.                                    |
| `chat_only`               | Indicates whether the user is a chat-only agent.                                                                              |
| `updated_at`              | The date and time the user was last updated.                                                                                  |
| `received_at`             | Timestamp added when data reaches the Segment API.                                                                            |

### tickets

This collection contains information about Zendesk tickets.

| Property                | Description                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| `id`                    | Automatically assigned when a ticket is created.                                                      |
| `url`                   | The API URL of the ticket.                                                                            |
| `external_id`           | A custom ID you can use to link Zendesk tickets to local records.                                     |
| `type`                  | The type of ticket. Possible values: `problem`, `incident`, `question`, `task`.                       |
| `subject`               | The subject line of the ticket.                                                                       |
| `raw_subject`           | The dynamic content placeholder if present, otherwise the `subject` value.                            |
| `description`           | The first comment on the ticket.                                                                      |
| `priority`              | The ticket’s urgency level. Possible values: `urgent`, `high`, `normal`, `low`.                       |
| `status`                | The current ticket status. Possible values: `new`, `open`, `pending`, `hold`, `solved`, `closed`.     |
| `recipient`             | The original recipient email address for the ticket.                                                  |
| `requester_id`          | The ID of the user who requested the ticket.                                                          |
| `submitter_id`          | The ID of the user who submitted the ticket. The submitter is always the author of the first comment. |
| `assignee_id`           | The ID of the agent currently assigned to the ticket.                                                 |
| `organization_id`       | The ID of the requester’s organization. Must be associated with the requester.                        |
| `group_id`              | The ID of the group the ticket is assigned to.                                                        |
| `collaborator_ids`      | The IDs of users currently CC'd on the ticket.                                                        |
| `forum_topic_id`        | The ID of the forum topic the ticket originated from, if any.                                         |
| `problem_id`            | For tickets of type `incident`, the ID of the related problem ticket.                                 |
| `has_incidents`         | Indicates whether the ticket has been marked as a problem.                                            |
| `due_at`                | The due date for task-type tickets (ISO 8601 format).                                                 |
| `tags`                  | The tags applied to the ticket.                                                                       |
| `sharing_agreement_ids` | The IDs of sharing agreements linked to the ticket.                                                   |
| `ticket_form_id`        | The ID of the ticket form used to render the ticket.                                                  |
| `created_at`            | The date and time the ticket was created.                                                             |
| `updated_at`            | The date and time the ticket was last updated.                                                        |
| `received_at`           | Timestamp added when data reaches the Segment API.                                                    |

### ticket_fields

This collection contains information about Zendesk ticket fields.

| Property                | Description                                                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                    | Automatically assigned when the ticket field is created.                                                                                                            |
| `url`                   | The API URL of the ticket field.                                                                                                                                    |
| `type`                  | The type of field. Possible values: `checkbox`, `date`, `decimal`, `integer`, `regexp`, `tagger`, `text`, `textarea`. This property can’t be edited after creation. |
| `slug`                  | The title of the field, with words separated by underscores.                                                                                                        |
| `title`                 | The title of the ticket field.                                                                                                                                      |
| `raw_title`             | The dynamic content placeholder if present, otherwise the `title` value.                                                                                            |
| `description`           | The purpose of the ticket field as shown to users.                                                                                                                  |
| `raw_description`       | The dynamic content placeholder if present, otherwise the `description` value.                                                                                      |
| `position`              | Determines the field’s order on the ticket. Positions 0–7 are reserved for system fields.                                                                           |
| `active`                | Indicates whether the field is active.                                                                                                                              |
| `required`              | Indicates whether agents must provide a value when updating the field.                                                                                              |
| `collapsed_for_agents`  | Indicates whether the field is shown or hidden by default in the classic interface.                                                                                 |
| `regexp_for_validation` | Validation pattern for regular expression fields.                                                                                                                   |
| `title_in_portal`       | The field title as shown to end users.                                                                                                                              |
| `raw_title_in_portal`   | The dynamic content placeholder if present, otherwise the `title_in_portal` value.                                                                                  |
| `visible_in_portal`     | Indicates whether the field is visible to end users.                                                                                                                |
| `editable_in_portal`    | Indicates whether the field is editable by end users.                                                                                                               |
| `required_in_portal`    | Indicates whether end users must provide a value when updating the field.                                                                                           |
| `tag`                   | The tag value applied when a checkbox field is checked.                                                                                                             |
| `removable`             | Indicates whether the field can be removed (system fields can’t be removed).                                                                                        |
| `created_at`            | The date and time the ticket field was created.                                                                                                                     |
| `updated_at`            | The date and time the ticket field was last updated.                                                                                                                |
| `received_at`           | Timestamp added when data reaches the Segment API.                                                                                                                  |

### ticket_metrics

This collection contains performance and timing metrics for Zendesk tickets.

| Property                                    | Description                                                 |
| ------------------------------------------- | ----------------------------------------------------------- |
| `id`                                        | Automatically assigned when the record is created.          |
| `ticket_id`                                 | The ID of the associated ticket.                            |
| `group_stations`                            | The number of groups the ticket passed through.             |
| `assignee_stations`                         | The number of assignees the ticket has had.                 |
| `reopens`                                   | The total number of times the ticket was reopened.          |
| `replies`                                   | The total number of replies to the ticket.                  |
| `reply_time_in_minutes_calendar`            | Minutes to the first reply outside business hours.          |
| `reply_time_in_minutes_business`            | Minutes to the first reply during business hours.           |
| `first_resolution_time_in_minutes_calendar` | Minutes to the first resolution outside business hours.     |
| `first_resolution_time_in_minutes_business` | Minutes to the first resolution during business hours.      |
| `full_resolution_time_in_minutes_calendar`  | Minutes to full resolution outside business hours.          |
| `full_resolution_time_in_minutes_business`  | Minutes to full resolution during business hours.           |
| `agent_wait_time_in_minutes_calendar`       | Minutes the agent spent waiting outside business hours.     |
| `agent_wait_time_in_minutes_business`       | Minutes the agent spent waiting during business hours.      |
| `requester_wait_time_in_minutes_calendar`   | Minutes the requester spent waiting outside business hours. |
| `requester_wait_time_in_minutes_business`   | Minutes the requester spent waiting during business hours.  |
| `on_hold_time_in_minutes_calendar`          | Minutes the ticket was on hold outside business hours.      |
| `on_hold_time_in_minutes_business`          | Minutes the ticket was on hold during business hours.       |
| `created_at`                                | The date and time the record was created.                   |
| `updated_at`                                | The date and time the record was last updated.              |
| `assignee_updated_at`                       | The date and time the assignee last updated the ticket.     |
| `requester_updated_at`                      | The date and time the requester last updated the ticket.    |
| `status_updated_at`                         | The date and time the ticket status was last updated.       |
| `initially_assigned_at`                     | The date and time the ticket was first assigned.            |
| `assigned_at`                               | The date and time the ticket was most recently assigned.    |
| `latest_comment_added_at`                   | The date and time the latest comment was added.             |
| `received_at`                               | Timestamp added when data reaches the Segment API.          |

### ticket_events

This collection contains details about individual updates or changes to Zendesk tickets.

| Property            | Description                                                                          |
| ------------------- | ------------------------------------------------------------------------------------ |
| `id`                | Automatically assigned when the record is created.                                   |
| `ticket_event_id`   | Automatically assigned when the ticket is updated.                                   |
| `ticket_id`         | The ID of the associated ticket.                                                     |
| `timestamp`         | The date and time the ticket was updated.                                            |
| `updater_id`        | The ID of the user who made the update.                                              |
| `ticket_event_via`  | The channel or method used to create the event.                                      |
| `context_client`    | The client used to submit the ticket change (for example, browser name and version). |
| `context_location`  | The location name, if available (for example, country or city).                      |
| `context_latitude`  | The latitude of the location where the change occurred.                              |
| `context_longitude` | The longitude of the location where the change occurred.                             |
| `via`               | The method used to create the event.                                                 |


### activities

This collection contains information about actions or updates related to Zendesk tickets.

| Property     | Description                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------ |
| `id`         | Automatically assigned when the activity is created.                                                         |
| `url`        | The API URL of the activity.                                                                                 |
| `verb`       | The type of activity. Possible values: `tickets.assignment`, `tickets.comment`, `tickets.priority_increase`. |
| `title`      | A short description of the activity.                                                                         |
| `created_at` | The date and time the activity was created.                                                                  |
| `updated_at` | The date and time the activity was last updated.                                                             |


### attachments

This collection contains information about files attached to Zendesk tickets.

| Property       | Description                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | Automatically assigned when the attachment is created.                                                                                                                  |
| `file_name`    | The name of the attached file.                                                                                                                                          |
| `content_url`  | The full URL where the attachment file can be downloaded.                                                                                                               |
| `content_type` | The MIME type of the attachment (for example, `image/png`).                                                                                                             |
| `inline`       | Indicates whether the attachment is inline. Inline attachments are excluded from the attachment list but can be referenced within a ticket comment. Default is `false`. |
| `size`         | The file size in bytes.                                                                                                                                                 |
| `received_at`  | Timestamp added when data reaches the Segment API.                                                                                                                      |

### organizations

This collection contains information about organizations in Zendesk.

| Property          | Description                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `id`              | Automatically assigned when the organization is created.                                  |
| `external_id`     | A unique external ID that links the organization to an external record.                   |
| `url`             | The API URL of the organization.                                                          |
| `name`            | The unique name of the organization.                                                      |
| `details`         | Additional details about the organization, such as its address.                           |
| `notes`           | Notes or comments about the organization.                                                 |
| `group_id`        | The group that new tickets from users in this organization are automatically assigned to. |
| `shared_tickets`  | Indicates whether end users in the organization can view each other’s tickets.            |
| `shared_comments` | Indicates whether end users in the organization can view each other’s ticket comments.    |
| `created_at`      | The date and time the organization was created.                                           |
| `updated_at`      | The date and time the organization was last updated.                                      |
| `received_at`     | Timestamp added when data reaches the Segment API.                                        |

### ticket_comments

This collection contains comments and related metadata for Zendesk tickets.

| Property          | Description                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | Automatically assigned when the comment is created.                                                                                       |
| `ticket_event_id` | Automatically assigned when the comment is created.                                                                                       |
| `ticket_id`       | The ID of the ticket the comment belongs to.                                                                                              |
| `type`            | The comment type. Possible values: `Comment` or `VoiceComment`. JSON objects for voice comments differ in structure.                      |
| `body`            | The text of the comment.                                                                                                                  |
| `public`          | Indicates whether the comment is public (`true`) or internal (`false`). The initial value set on ticket creation persists unless changed. |
| `author_id`       | The ID of the comment author.                                                                                                             |
| `via`             | How the comment was created.                                                                                                              |
| `created_at`      | The date and time the comment was created.                                                                                                |
| `received_at`     | Timestamp added when data reaches the Segment API.                                                                                        |

### ticket_forms

> info "Zendesk Enterprise required"
> The `ticket_forms` collection syncs only for Zendesk Enterprise accounts. See [Zendesk’s Ticket Forms API documentation](https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_forms/){:target="_blank"} for details.

This collection contains information about ticket forms in Zendesk.

| Property               | Description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `id`                   | The ID of the ticket form.                                                          |
| `active`               | Indicates whether the form is active.                                               |
| `end_user_visible`     | Indicates whether the form is visible to end users.                                 |
| `name`                 | The name of the form.                                                               |
| `restricted_brand_ids` | The IDs of brands that the ticket form is restricted to.                            |
| `ticket_field_ids`     | The IDs of ticket fields included in this form.                                     |
| `updated_at`           | The date and time the ticket form was last updated.                                 |
| `url`                  | The API URL of the ticket form.                                                     |
| `created_at`           | The date and time the ticket form was created.                                      |
| `display_name`         | The form name shown to end users.                                                   |
| `in_all_brands`        | Indicates whether the form is available for all brands in the account.              |
| `position`             | The form’s position among other forms in the account (for example, dropdown order). |
| `raw_display_name`     | The dynamic content placeholder, if available, or the `display_name` value if not.  |
| `raw_name`             | The dynamic content placeholder, if available, or the `name` value if not.          |
| `default`              | Indicates whether this form is the default form for the account.                    |

### ticket_skips

This collection contains information about Zendesk tickets that agents have skipped.

| Property     | Description                                    |
| ------------ | ---------------------------------------------- |
| `id`         | The ID of the ticket skip record.              |
| `ticket_id`  | The ID of the skipped ticket.                  |
| `user_id`    | The ID of the agent who skipped the ticket.    |
| `reason`     | The reason the ticket was skipped.             |
| `created_at` | The date and time the record was created.      |
| `updated_at` | The date and time the record was last updated. |


### organization_memberships

This collection contains information about relationships between users and organizations in Zendesk.

| Property            | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `id`                | The ID of the organization membership.                 |
| `url`               | The API URL of the membership.                         |
| `user_id`           | The ID of the user in the membership.                  |
| `organization_id`   | The ID of the organization associated with the user.   |
| `created_at`        | The date and time the record was created.              |
| `updated_at`        | The date and time the record was last updated.         |
| `organization_name` | The name of the organization associated with the user. |

### group_memberships

This collection contains information about agents and their group assignments in Zendesk.

| Property     | Description                                        |
| ------------ | -------------------------------------------------- |
| `id`         | The ID of the group membership.                    |
| `url`        | The API URL of the group membership.               |
| `created_at` | The date and time the membership was created.      |
| `group_id`   | The ID of the group.                               |
| `updated_at` | The date and time the membership was last updated. |
| `user_id`    | The ID of the agent in the membership.             |

### audit_logs

This collection contains records of account-level actions and configuration changes in Zendesk.

| Property             | Description                                                                    |
| -------------------- | ------------------------------------------------------------------------------ |
| `id`                 | The ID of the audit log.                                                       |
| `url`                | The API URL of the audit log.                                                  |
| `created_at`         | The date and time the audit record was created.                                |
| `actor_id`           | The ID of the user who performed the action.                                   |
| `source_id`          | The ID of the item being audited.                                              |
| `source_type`        | The type of item being audited.                                                |
| `source_label`       | The name of the item being audited.                                            |
| `action`             | The action performed. Possible values: `login`, `create`, `update`, `destroy`. |
| `change_description` | A short description of the change that occurred.                               |
| `ip_address`         | The IP address of the user who performed the action.                           |
| `action_label`       | The localized string for the `action` field.                                   |

## Adding Destinations
Currently only Warehouses are supported for object-cloud sources.
