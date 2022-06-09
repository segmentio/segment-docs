---
title: Salesforce Marketing Cloud Source
beta: true
source-type: object
strat: salesforce
id: oQ5dZPW0Ii
---
<!-- SFMC is listed as an object source, but doesn't appear in our configapi source catalog, so leave the "source-type" set here-->

{% include content/source-region-unsupported.md %}

[Salesforce Marketing Cloud](https://www.salesforce.com/ca/products/marketing-cloud/overview/), formerly known as
ExactTarget, is a marketing automation suite with the ability to build complete customer journeys as well as creating,
targeting, tracking, and managing email and digital media campaigns.

With the Segment Salesforce Marketing Cloud Source, you can extract data from Marketing Cloud and send them
to a data warehouse such as Redshift or Big Query with ease, avoiding having to build your own expensive custom solutions.

If you are trying to set up Salesforce Marketing Cloud as a destination to receive data from Segment, check out
[Salesforce Marketing Cloud Destination](https://segment.com/docs/connections/destinations/catalog/salesforce-marketing-cloud/).

> note ""
> *NOTE:* The Salesforce Marketing Cloud Source is currently in beta. This means that component names and functionality may change. For all feedback, [send us a note](https://segment.com/help/contact).

> success ""
> **Good to know**: This page is about the Salesforce Marketing Cloud Segment source, which sends data _into_ Segment. There's also a page about the [Salesforce Marketing Cloud Segment destination](/docs/connections/destinations/catalog/salesforce-marketing-cloud/), which receives data from Segment!

## Getting Started

###  API Access

To access the Salesforce Marketing Cloud data on your behalf, Segment requires the client ID, client secret and
subdomain from your Salesforce Marketing Cloud integration. The integration must also have the following permissions:


| Category   | Collection              | Permission Needed |
| ---------- | ----------------------- | ----------------- |
| Automation | Journeys (Interactions) | Read              |
| Contacts   | Lists and Subscribers   | Read              |
| Hub        | Campaigns               | Read              |

**If you already have a Salesforce Marketing Cloud Segment Destination**, you can choose to re-use the client ID,
client secret and subdomain set up for the destination. To enable the permissions required for the source:

1. Log in to your Salesforce Marketing Cloud account.
2. Click your name in the top-right corner of the screen and select "Administration".
3. Navigate to the existing package with the the Segment destination API Integration.
4. Adjust the scope according to the permission table above.
5. Click "Save".

**If you do not have a Salesforce Marketing Cloud Segment Destination**, follow the steps below to acquire the client ID
and client secret:

1. Log in to your Salesforce Marketing Cloud account.
2. Click your name in the top-right corner of the screen and select "Administration".
3. Click the "Account" menu at the top-left corner of the page and select "Installed Packages".
4. If you want to use an existing package, click on that one or click "New" to create a new one. We recommend giving it
   a name like "Segment".
5. Click "Add Component".
6. Select "API Integration" and click "Next".
7. Select Server-to-Server
8. Enable the permissions as specified in the table above.
9. Click "Save".

You should now see a Summary page with a Components section. This section lists your _Client ID_ and _Client Secret_ settings.

### Set up your subdomain
Segment will use your unique Salesforce subdomain to make API calls to SFMC. Your subdomain is represented by a 28-character string starting with the letters "mc" in any of your base URIs. For example, in the base URI `mc563885gzs27c5t9-63k636ttgm.rest.marketingcloudapis.com`, the subdomain is `mc563885gzs27c5t9-63k636ttgm`.

### Enable the Salesforce Marketing Cloud Source

1. From your Segment workspace's `/Sources` page, click `Add Source`.
2. Under the Email Marketing category, choose Salesforce Marketing Cloud and click `Connect`.
3. Give your source a name to identify it within your workspace.
4. Select the data warehouses to connect the source to.
5. Specify the Client ID and Client Secret values acquired from the [API Access](#api-access) section above.
6. Specify the subdomain aquired from the [Set up your subdomain](#set-up-your-subdomain) section above.


## Components

### Sync

The Salesforce Marketing Cloud source is built with a sync component, which means we'll make requests to their API on
your behalf on a 3 hour interval to pull the latest data into Segment. In the initial sync, we'll grab all the
Salesforce objects (and their corresponding properties) according to the Collections Table below. The objects will be
written into a separate schema, corresponding to the source instance's schema name you designated upon creation.
For example, if you went with `sfmc_prod`, the `campaigns` collection will be accessible at `sfmc_prod.campaigns` in SQL.

Each sync will only sync the data that has been modified since the previous sync.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub,
and warehouse runs flush that data to your warehouse. Sources will sync with Segment every 3 hours. Depending on your
Warehouses plan, we will push the Source data to your warehouse on the interval associated with your billing plan.

## Collections

Collections are the groupings of resources we pull from your source. In your warehouse, each collection gets its own table.


| Collection      | Type   | Description                                                                                                                                                                                 |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| campaigns       | Object | A campaign in your account. Corresponds to [Campaigns](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/getCampaignCollection.htm)                          |
| campaign_assets | Object | The assets associated with each campaign. Corresponds to [campaign_assets](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/getCampaignAssetCollection.htm) |
| lists           | Object | A mailing list. Corresponds to [Lists](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/list.htm)                                                           |

## Collection Properties

Segment performs a one-to-one mapping of all publicly available fields from Salesforce Marketing Cloud. Below are tables
outlining the properties included in the collections listed above. To see the full description of each property,
refer to the Salesforce Marketing Cloud documentation linked in each [collection](#collections) above.

### Campaigns

| Property Name | Description                                            |
| ------------- | ------------------------------------------------------ |
| campaign_code | The campaign short code                                |
| color         | The code of the calendar color given to the campaign   |
| created_date  | Timestamp when the campaign was created                |
| description   | The campaign description                               |
| favorite      | Whether the campaign was favorited                     |
| id            | The campaign's unique ID in Salesforce Marketing Cloud |
| modified_date | Timestamp when the campaign was last modified          |
| name          | The campaign name                                      |

### Campaign Assets

| Property Name | Description |
| ------------- | ------------------------- |
| campaign_id   | The ID of the campaign this asset is associated to  |
| created_date  | Timestamp when the asset was created   |
| id            | The campaign asset ID         |
| item_id       | The asset's unique ID in Salesforce Marketing Cloud     |
| type          | The asset type. Can be one of: email, triggered send, mobile message, push message, twitter update, facebook update, facebook tab, sites, landing pages, subscriber list, subscriber group, data extension, automation, or event |


### Lists

| Property Name             | Description                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| category                  | ID of the folder containing the list                                                                                                                         |
| client_created_by         | User ID of the user who created the list                                                                                                                     |
| client_customer_key       | External key assigned to the list in Marketing Cloud                                                                                                         |
| client_id                 | ID of the owner account of the list                                                                                                                          |
| client_modified_by        | User ID of the user who last modified the list                                                                                                               |
| client_partner_client_key | User-defined partner key for owner account of the list                                                                                                       |
| client_partner_user_key   | Specifies the partner key value of a user                                                                                                                    |
| client_user_id            | User ID of the owner account of the list                                                                                                                     |
| created_date              | Timestamp when the list was created                                                                                                                          |
| customer_key              | User-supplied unique identifier for an object within an object type. This property corresponds to the external key assigned to an object in Marketing Cloud. |
| description               | The list description                                                                                                                                         |
| id                        | The list's unique ID in Salesforce Marketing Cloud                                                                                                           |
| list_classification       | Specifies the classification for a list. Valid values include: ExactTargetList, PublicationList, SuppressionList                                             |
| list_name                 | The list name                                                                                                                                                |
| modified_date             | Timestamp when the list was last modified                                                                                                                    |
| object_id                 | Auto-generated ID for the object                                                                                                                             |
| partner_key               | Unique ID provided by the partner for the object                                                                                                             |
| type                      | Indicates the list type. Valid values include Public, Private, Salesforce, GlobalUnsubscribe, and Master                                                     |

### Interactions (aka journeys)

| Property Name               | Description                                                                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key                         | The developer defined customer key (also a unique identifier within the MID) for this journey                                                                                          |
| name                        | The display name used in the Journey Builder UI for this journey, this will be visible to everyone who logs into your Marketing Cloud account                                          |
| last_published_date         |                                                                                                                                                                                        |
| description                 | The human readable description of this journey that informs others of purpose                                                                                                          |
| version                     | This number denotes the iteration of this particular journey                                                                                                                           |
| workflow_api_version        | This number represents the current release of the Journey Spec that the Journey Builder APIs will expect in order to understand how to parse and properly respond to your API requests |
| created_date                |                                                                                                                                                                                        |
| modified_date               |                                                                                                                                                                                        |
| stats_cumulative_population |                                                                                                                                                                                        |
| stats_current_population    |                                                                                                                                                                                        |
| stats_goal_performance      |                                                                                                                                                                                        |
| stats_met_goal              |                                                                                                                                                                                        |
| execution_mode              |                                                                                                                                                                                        |
| status                      |                                                                                                                                                                                        |
| definition_id               |                                                                                                                                                                                        |
| default_email               | An ordered list of email expressions used to determine which email address to use as the default, starting with the first expression                                                   |
| default_analytics_type      |                                                                                                                                                                                        |
| default_enabled             |                                                                                                                                                                                        |
|                             |                                                                                                                                                                                        |

### Goals

| Property Name                                      | Description                                                                                                     |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| interaction_id                                     | The id of the interaction that this goal is associated with                                                     |
| key                                                | The customer key for this goal                                                                                  |
| name                                               | The display name for this goal                                                                                  |
| description                                        | The description for this goal, will be displayed in the Journey Builder user interface                          |
| type                                               | The type of goal this is (only option currently is ContactEvent)                                                |
| arguments_dequeue_reason                           |                                                                                                                 |
| arguments_filter_result                            |                                                                                                                 |
| arguments_last_executed_activity_key               |                                                                                                                 |
| start_activity_key                                 |                                                                                                                 |
| config_arguments_filter_def_id                     |                                                                                                                 |
| config_arguments_criteria                          |                                                                                                                 |
| config_arguments_schema_version_id                 |                                                                                                                 |
| metadata_is_exit_criteria                          |                                                                                                                 |
| metadata_conversion_unit                           | This value is used for deterministic evaluations of the goal, can be either "percentage" or "wholenumber"       |
| metadata_conversion_value                          | Based on the conversionUnit this is the metric Journey Builder uses to determine if the goal has been satisfied |
| metadata_event_definition_id                       |                                                                                                                 |
| metadata_event_definition_key                      |                                                                                                                 |
| metadata_configuration_description                 |                                                                                                                 |
| metadata_configuration_chain_type                  |                                                                                                                 |
| metadata_configuration_required                    |                                                                                                                 |
| metadata_configuration_icon_url                    |                                                                                                                 |
| metadata_configuration_title                       |                                                                                                                 |
| schema_args_condition_outcome_access               |                                                                                                                 |
| schema_args_condition_outcome_data_type            |                                                                                                                 |
| schema_args_condition_outcome_direction            |                                                                                                                 |
| schema_args_condition_outcome_is_nullable          |                                                                                                                 |
| schema_args_condition_outcome_read_only            |                                                                                                                 |
| schema_args_dequeue_reason_access                  |                                                                                                                 |
| schema_args_dequeue_reason_type                    |                                                                                                                 |
| schema_args_dequeue_reason_direction               |                                                                                                                 |
| schema_args_dequeue_reason_is_nullable             |                                                                                                                 |
| schema_args_dequeue_reason_read_only               |                                                                                                                 |
| schema_args_filter_result_access                   |                                                                                                                 |
| schema_args_filter_result_data_type                |                                                                                                                 |
| schema_args_filter_result_direction                |                                                                                                                 |
| schema_args_filter_result_is_nullable              |                                                                                                                 |
| schema_args_filter_result_read_only                |                                                                                                                 |
| schema_args_last_executed_activity_key_access      |                                                                                                                 |
| schema_args_last_executed_activity_key_data_type   |                                                                                                                 |
| schema_args_last_executed_activity_key_direction   |                                                                                                                 |
| schema_args_last_executed_activity_key_is_nullable |                                                                                                                 |
| schema_args_last_executed_activity_key_read_only   |                                                                                                                 |
| schema_args_start_activity_key_access              |                                                                                                                 |
| schema_args_start_activity_key_data_type           |                                                                                                                 |
| schema_args_start_activity_key_direction           |                                                                                                                 |
| schema_args_start_activity_key_is_nullable         |                                                                                                                 |
| schema_args_start_activity_key_read_only           |                                                                                                                 |


## Adding Destinations
Currently, Warehouses are the only supported destination for object-cloud sources.
