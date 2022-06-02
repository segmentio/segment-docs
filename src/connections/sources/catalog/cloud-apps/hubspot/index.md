---
title: HubSpot Source
rewrite: true
id: 2baks93o
---
{% include content/source-region-unsupported.md %}

[HubSpot](http://www.hubspot.com) is an all-in-one marketing tool that helps attract new leads and convert them into paying customers, with features like landing page creation and email automation.

Are you trying to set up HubSpot as a destination to receive data from Segment? Go here [HubSpot Destination](https://segment.com/docs/connections/destinations/catalog/hubspot/).

## Getting Started

1. From your workspace's `/sources` page, click `add source`.

2. Choose HubSpot.

3. Give the source a nickname and a schema name. The nickname is a label used in the Segment interface, and the schema name is the namespace you query against in your warehouse. Both can be whatever you like, but we recommend sticking to something that reflects the source itself, like `HubSpot` for nickname and `hubspot`, `hub`, or `hubspot_prod` for the schema name.

   **Note**: You can add multiple instances if you have multiple HubSpot accounts. That's why we allow you to customize the source's nickname and schema name!

4. Finally, connect an account with **admin API permissions** to access your HubSpot data. This account should be an active user on a Professional or Enterprise plan. Check out [HubSpot's docs on how to get your API Key](http://knowledge.hubspot.com/articles/kcs_article/integrations/how-do-i-get-my-hubspot-api-key).

Voila! We'll begin syncing your HubSpot data into Segment momentarily, and it will be written to your warehouse at your next Warehouse run.


## Components

### Sync

The HubSpot source is built with a sync component, which means we'll make requests to their API on your behalf on a 3 hour interval to pull the latest data into Segment. In the initial sync, we'll grab all the HubSpot objects (and their corresponding properties) according to the Collections Table below. The objects will be written into a separate schema, corresponding to the source instance's schema name you designated upon creation (ie. my_source.charges).

Our sync component uses an upsert API, so the data in your warehouse loaded using sync will reflect the latest state of the corresponding resource in HubSpot. For example, if `ticket_status` goes from `open` to `closed` between syncs, on its next sync that tickets status will be `closed`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources will sync with Segment every 3 hours. Depending on your Warehouses plan, we will push the Source data to your warehouse on the interval associated with your billing plan.


## Collections

Collections are the groupings of resources we pull from your source. In your warehouse, each collection gets its own table.

### Event History

Due to HubSpot's [API Rate Limits](http://developers.hubspot.com/apps/api_guidelines), by default, the HubSpot source only syncs the past month of data for `email_events` and `email_subscription_event_changes`.


|  Collection | Type | Description |
|  ------ | ------ | ------ |
|  contacts | Object | Contacts represent people in an Organization's address book. For more info, check out [HubSpot's API docs](http://developers.hubspot.com/docs/methods/contacts/get_contacts) |
| contact_identity_profiles | Object | Contact identity profiles represent identities of a contact.
| contact_identities | Object | Contact identities represent communication methods for a contact's profile (email, lead, etc.).
| form_submissions | Event | Form submissions represent input from contacts in forms created using HubSpot
| deals | Object | Deals for HubSpot CRM.
| contact_lists | Object | Contact lists are lists of contacts in an Organization's address book. For more info, check out [HubSpot's API docs about the resource](http://developers.hubspot.com/docs/methods/lists/get_lists) |
| companies | Object | Companies visible to the portal in the HubSpot CRM. For more info, check out [HubSpot's API docs about the resource](http://developers.hubspot.com/docs/methods/companies/companies-overview) |
| email_campaigns | Object | Email campaigns for marketing automation. For more info, check out [HubSpot's API docs about the resource](http://developers.hubspot.com/docs/methods/email/get_campaigns_by_id) |
| email_events | Event | Email events based on user actions. For more info, check out [HubSpot's API docs about the resource](http://developers.hubspot.com/docs/methods/email/email_events_overview) |
| email_subscriptions | Object | Email subscriptions of campaign contacts.
| email_subscription_event_changes | Event | Email subscription event changes represent changes to a recipient's subscription that came about as a result of an email event |

## Collection Properties

Below are tables outlining the properties included in the collections listed above. To see the full description of each property, refer to the HubSpot documentation linked in the collections above.

If you have Custom Properties on any of these collections that you would like to sync, submit a ticket detailing the custom properties [here](http://segment.com/help/contact) and we can enable it for you.

### Contacts

|  Property Name | Description |
|  ------ | ------ |
|  added_at | This is a timestamp for when the email address was added. |
|  canonical_vid | vid of the primary contact (record that was merged into). |
|  email | contact's email. |
|  form_submissions | A list of form submissions for the contact. This list will be empty for records with no form submissions. |
|  is_contact | Indicates if the record is a valid contact record. Any record where this is set to false is not a valid contact. Those records will only have placeholder data and cannot be updated. |
|  lead_guid | LEAD_GUID identities are an internal reference and should not be used. |
|  list_membership | A list of objects representing the contact's membership in contact lists. This list may be empty if the record is not a member of any lists. |
|  merged_vids | vid of the primary contact (record that was merged into). |
|  portal_id | The Portal ID (Hub ID) that the record belongs to. |
|  profile_token | A unique token that can be used to view the contact without logging into HubSpot. See the profile-url below. |
|  profile_url | A URL that can be used to view the contact data without logging in. Anyone with this link would be able to view (but not edit) the record. Note: You can force a login for the public link by changing the Public View Login option in your Contact Settings. |
|  properties_company_value | The current value of the company property. |
|  properties_firstname_value | The current value of the firstname property. |
|  properties_lastmodifieddate_value | This timestamp is of the time the property was last set. |
|  properties_lastname_value | The current value of lastname the property. |
|  received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |


### Contact Identity Profiles

|  Property Name | Description |
|  ------ | ------ |
|  contact_id | The original id for this identity. |
|  deleted_changed_timestamp | DEPRECATED - This field is no longer used |
|  identities | A list of the individual identies for this pointer |
|  received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |
|  saved_at_timestamp | A timestamp of when the identity was last updated. |


### Contact Identities

|  Property Name | Description |
|  ------ | ------ |
|  contact_id | The original id for this identity. |
|  is_primary | Indicates if this is a primary contact. |
|  is_secondary | Indicates if this is a secondary contact. |
|  received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |
|  timestamp | A timestamp for when the identity was created. |
|  type | The type of the identity. |


### Form Submissions

|  Property Name | Description |
|  ------ | ------ |
|  form_id | The Hub ID that the form belongs to. |
|  form_type | This fields is deprecated and will always be HUBSPOT |
|  page_id | The id of the page. |
|  page_title | The title of the page. |
|  page_url | The URL of the page. |
|  portal_id | The Hub ID that the form belongs to. |
|  received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |
|  timestamp | A timestamp of the time the current value was set. |
|  title | The title of the form. |


### Deals

|  Property Name | Description |
|  ------ | ------ |
|  amount | The amount of the deal. |
|  associated_company_ids |  A list of integers, each one represents the companyId of a company record. Deals can only be associated with a single company, so there will only be up to one item in the list. |
|  associated_vids |  A list of integers, each one will be the vid of a contact record. |
|  dealname |  The internal name of the property |
|  dealstage | The stage of the deal. |
|  hs_* | (Specific to user) |
|  hubspot_* | (Specific to user) |
|  is_deleted | Whether or not the record is deleted. |
|  notes_* | (Specific to user) |
|  num_* | (Specific to user) |
|  pipeline | The type of pipeline for this deal. |
|  portal_id | The Portal ID (Hub ID) that the record belongs to. |
|  received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |
|  vid | The vid of the contact record. |


### Contact Lists

|  Property Name | Description |
|  ------ | ------ |
|  archived | Whether or not the list is archived. |
|  author_id | The id of the author. |
|  created_at | A timestamp for the time this contact list was created. |
|  deleteable | If this is false, this is a system list and cannot be deleted. This value may not be present for all lists. In those cases, this value may be treated as true (the list may be deleted). When this value is true, you may still get an error deleting the list if it's in use by other lists or workflows. |
|  dynamic | True if the list is a dynamic (smart) list, false if static. |
|  filters_0_0_filter_family | This is a list of filters used to determine list membership. This field may be an empty list, for lists with no criteria. |
|  internal_list_id | DEPRECATED, this is an internal field and should not be used. Use the 'listId' to reference the list. |
|  list_type | DEPRECATED, use the 'dynamic' field to determine if the list is dynamic or static. |
|  meta_data_last_processing_state_change_at | A timestamp of the last time that the processing state changed. |
|  meta_data_last_size_change_at | A timestamp of the last time that the size ofthe list changed. A value of 0 indicates that the list hasn't changed size since its creation. |
|  meta_data_processing | The number of contacts in the list. |
|  meta_data_size | DONE indicates the list has finished processing, any other value indicates that list membership is being evaluated. |
|  name | The name of the list. |
|  portal_id | The Hud ID that the list belongs to. |
|  received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |
|  updated_at | A timestamp of the time that the list was last modified. |


### Companies

|  Property Name | Description |
|  ------ | ------ |
|  country | The internal name of the property. |
|  createdate | A timestamp for when the record was created. |
|  first_contact_createdate | A timestamp for when the first contact was created. |
|  hs_* | (Specific to user) |
|  is_deleted | Whether or not the record is deleted. |
|  name | The internal name of the property |
|  num_associated_contacts | The number of associated contacts. |
|  portal_id | The Hub ID that the company belongs to. |
|  received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |


### Email Campaigns

|  Property Name | Description |
|  ------ | ------ |
|  app_id | An ID referencing the app. |
|  app_name | The name of the app. |
|  content_id | An ID referencing the content. |
|  counters_* | (Specific to user) |
|  name | The name of the campaign. |
|  received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |
|  subject | The email subject line for this campaign. |
|  type | The type of email campaign. |


### Email Subscriptions

|  Property Name | Description |
|  ------ | ------ |
|  bounced | A HubSpot employee explicitly initiated the status change to block messages to the recipient. (Note this usage has been deprecated in favor of dropping messages with a 'dropReason' of BLOCKED_ADDRESS.) |
|  email | The email address of the subscriber. |
|  marked_as_spam | Whether or not the email is marked as spam. |
|  portal_id | An ID referencing the HubSpot Portal which is associated with the item. This will correspond to your portal. |
|  received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |
|  status | The status of the subscription. (subscribed or unsubscribed) |
|  subscribed | Whether or not the status is subscribed. |
|  unsubscribe_from_portal | Whether or not the status is unsubscribed from portal. |


### Email Subscription Event Changes

|  Property Name | Description |
|  ------ | ------ |
|  caused_by_event_created | A timestamp for when the event was created. |
|  caused_by_event_id | The EventId which uniquely identifies the event which directly caused this event. If not applicable, this property is omitted. |
|  change | The change which occurred. This enumeration is specific to the 'changeType'. |
|  change_type | The type of change which occurred. |
|  email_subscription_event_id | An ID referencing the email subscription which is associated with the change. |
|  portal_id | An ID referencing the HubSpot Portal which is associated with the change. This will correspond to your portal. |
|  received_at | This timestamp is added to incoming messages as soon as they hit Segment API. |
|  source | The source of the subscription change. |
|  timestamp | A timestamp for when this change occurred. If 'causedByEvent' is present, this will be absent. |


## Adding Destinations

Currently, Warehouses are the only supported destination for object-cloud sources.
