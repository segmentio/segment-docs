---
title: Salesforce Source
strat: salesforce
id: 2baks93n
---

[Salesforce](http://salesforce.com){:target="_blank"} is a leader in on-demand customer relationship management.

Take your company's analysis to the next level by **adding Salesforce as a Source to Segment.** Segment automatically collects objects like `Accounts`, `Campaigns`, and `Tasks` and loads them into your data warehouse. 

> info "Salesforce version upgrade to 58.0"
> On March 25, 2024, the Salesforce source upgraded to use Salesforce's API version 58.0. See the [version upgrade changes](#version-upgrade-changes) to learn more.

## Getting started
> info ""
> You can add multiple instances of this source if you have more than one Salesforce account. 

1. From the `/sources` page in your Workspace, click `Add Source`.

2. Choose Salesforce.

3. Give the source a name, add labels, if applicable, and select the Salesforce environment you'd like to pull data from. To use data from a Salesforce sandbox environment, select **Sandbox** from the Salesforce Environment dropdown and [contact Segment Support](https://segment.com/help/contact/){:target="_blank"}. The support team will configure your source to use sandbox data.

4. Connect Segment to your Salesforce environment and authorize Segment to connect to it. In order for Segment to collect and sync your Salesforce data, you must enable API access for the user that you are connecting to Segment with. For more information on how to confirm or change API access for a Salesforce user, follow Salesforce's [recommended documentation](https://help.salesforce.com/articleView?id=admin_userperms.htm){:target="_blank"}.   

5. Choose a data warehouse to connect Salesforce to.

6. In the Salesforce source settings you can customize the source nickname and schema name. The nickname is a label used in the Segment interface, and the schema name is the namespace you query against in your warehouse. Both can be whatever you like, but Segment recommends that you use something that reflects the source itself, like `Salesforce` for nickname and `sfdc`, `salesforce`, or `sfdc_prod` for the schema name. Configure Selective Sync to retrieve only specific objects and properties from Salesforce.

## Components

### Sync

The Salesforce source contains a sync component, which means Segment makes requests to the Salesforce API on your behalf on a 3 hour interval to pull the latest data into Segment. In the initial sync, by default Segment downloads all the Salesforce objects (and their corresponding properties) according to the Collections Table below. Segment writes the objects into a separate schema, that corresponds to the source instance's schema name you designated upon creation. For example, you name the schema `sfdc_prod`, the `leads` collection is accessible at `sfdc_prod.leads` in SQL.

If you configure Selective Sync, Segment only retrieves the objects and properties you specify. Use Selective Sync to avoid unnecessary Salesforce API consumption.

> info "A note about Selective Sync"
> The Salesforce Selective Sync feature is separate from the [Segment Warehouse Selective Sync](/docs/connections/storage/warehouses/warehouse-syncs/#warehouse-selective-sync). Both features enable you to choose what to sync. The Salesforce Selective Sync impacts the information that Segment collects from Salesforce.

The sync component uses an upsert API, so the data in your warehouse loaded using sync will reflect the latest state of the corresponding resource in Salesforce. For example, if `ticket_status` goes from `open` to `closed` between syncs, on its next sync that tickets status will be `closed`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources will sync with Segment every three hours. Depending on your Warehouses plan, Segment pushes the Source data to your warehouse on the interval associated with your billing plan.

## Collections

Collections are the groupings of resources Segment pulls from your source. In your warehouse, each collection gets its own table.


| Collection                        | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accounts`                        | object | An individual account, which is an organization involved with your business (such as customers, competitors, and partners). Corresponds to [Account](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_account.htm){:target="_blank”} resource in Salesforce                                                                                                                      |
| `account_contact_roles`           | object | The role that a given Contact plays on an Account. Corresponds to [AccountContactRole](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_accountcontactrole.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                         |
| `account_tags`                    | object | Associates a word or short phrase with an Account. Corresponds to [AccountTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_accounttag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                         |
| `campaigns`                       | object | A marketing campaign, such as a direct mail promotion, webinar, or trade show. Corresponds to [Campaign](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_campaign.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                 |
| `campaign_members`                | object | The association between a Campaign and either a Lead or Contact. Corresponds to [CampaignMember](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_campaignmember.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                   |
| `campaign_shares`                 | object | Represents a list of access levels to a Campaign along with an explanation of the access level. For example, if you have access to a record because you own it, the Access Level value is Full and Reason for Access value is Owner. Corresponds to [CampaignShare](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_campaignshare.htm){:target="_blank”} resource in Salesforce |
| `campaign_tags`                   | object | Associates a word or short phrase with a Campaign. Corresponds to [CampaignTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_campaigntag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                       |
| `cases`                           | object | A customer issue such as a customer's feedback, problem, or question. Corresponds to [Case](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_case.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                  |
| `case_comments`                   | object | A comment that provides additional information about the associated Case. Corresponds to [CaseComment](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_casecomment.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                |
| `case_contact_role`               | object | The role that a given Contact plays on a Case. Corresponds to [CaseContactRole](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_casecontactrole.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                   |
| `case_solution`                   | object | The association between a particular Case and a particular Solution. Corresponds to [CaseSolution](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_casesolution.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                   |
| `case_tags`                       | object | Associates a word or short phrase with a Case Corresponds to [CaseTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_casetag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                                    |
| `contacts`                        | object | A contact, which is an individual associated with an Account. Corresponds to [Contact](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_contact.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                    |
| `contact_tags`                    | object | Associates a word or short phrase with a Contact. Corresponds to [ContactTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_contacttag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                          |
| `contracts`                       | object | A contract (a business agreement) associated with an Account. Corresponds to [Contract](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_contract.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                  |
| `contract_tags`                   | object | Associates a word or short phrase with a Contract. Corresponds to [ContractTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_contracttag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                       |
| `dashboards`                      | object | Represents a dashboard, which shows data from custom reports as visual components. Access is read-only. This object is available in API version 20.0 and later. Corresponds to [Dashboard](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_dashboard.htm){:target="_blank”} resource in Salesforce                                                                              |
| `dashboard_tags`                  | object | Associates a word or short phrase with a Dashboard. This object is available inAPI version 20.0 and later. Corresponds to [DashboardTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_dashboardtag.htm){:target="_blank”} resource in Salesforce                                                                                                                             |
| `documents`                       | object | A file that a user has uploaded. Unlike Attachment objects, Documents are not attached to a parent object. Corresponds to [Document](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_document.htm){:target="_blank”} resource in Salesforce                                                                                                                                     |
| `document_tags`                   | object | Associates a word or short phrase with a Document. Corresponds to [DocumentTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_documenttag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                       |
| `events`                          | object | A calendar appointment event. Corresponds to [Event](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_event.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                                                        |
| `event_tags`                      | object | Associates a word or short phrase with an Event. Corresponds to [EventTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_eventtag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                               |
| `_group`                          | object | A set of User records. Corresponds to [Group](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_group.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                                                               |
| `leads`                           | object | A lead, which is a prospect or potential Opportunity. Corresponds to [Lead](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_lead.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                                  |
| `lead_tags`                       | object | Associates a word or short phrase with a Lead. Corresponds to [LeadTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_leadtag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                                   |
| `names`                           | object | Non-queryable object that provides information about foreign key traversals when the foreign key has more than one parent. Corresponds to [Name](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_name.htm){:target="_blank”} resource in Salesforce                                                                                                                             |
| `notes`                           | object | A note, which is text associated with an Attachment, Contact, Contract, Opportunity, or custom object. Corresponds to [Note](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_note.htm){:target="_blank”} resource in Salesforce                                                                                                                                                  |
| `note_tags`                       | object | Associates a word or short phrase with a Note. Corresponds to [NoteTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_notetag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                                   |
| `opportunities`                   | object | An opportunity, which is a sale or pending deal. Corresponds to [Opportunity](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_opportunity.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                         |
| `opportunity_competitor`          | object | A competitor on an Opportunity. Corresponds to [OpportunityCompetitor](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_opportunitycompetitor.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                      |
| `opportunity_contact_role`        | object | The role that a Contact plays on an Opportunity. Corresponds to [OpportunityContactRole](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_opportunitycontactrole.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                   |
| `opportunity_field_history`       | object | Represents the history of changes to the values in the fields of an opportunity. Corresponds to [OpportunityFieldHistory](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_opportunityfieldhistory.htm){:target="_blank”} resource in Salesforce                                                                                                                                 |
| `opportunity_product`             | object | An opportunity line item, which is a member of the list of Product2 records associated with an Opportunity, along with other information about those products on that opportunity. Corresponds to [OpportunityLineItem](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_opportunitylineitem.htm){:target="_blank”} resource in Salesforce                                       |
| `opportunity_line_item_schedules` | object | Information about the quantity, revenue distribution, and delivery dates for a particular OpportunityLineItem. Corresponds to [OpportunityLineItemSchedule](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_opportunitylineitemschedule.htm){:target="_blank”} resource in Salesforce                                                                                           |
| `opportunity_stage`               | object | The stage of an Opportunity in the sales pipeline, such as New Lead, Negotiating, Pending, Closed, and so on. Corresponds to [OpportunityStage](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_opportunitystage.htm){:target="_blank”} resource in Salesforce                                                                                                                  |
| `opportunity_tag`                 | object | Associates a word or short phrase with an Opportunity. Corresponds to [OpportunityTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_opportunitytag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                             |
| `period`                          | object | A fiscal period. Corresponds to [Period](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_period.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                                                                   |
| `price_books`                     | object | A price book that contains the list of products (Product2 records) that your organization sells. Corresponds to [Pricebook2](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_pricebook2.htm){:target="_blank”} resource in Salesforce                                                                                                                                           |
| `price_book_entries`              | object | A product entry (an association between a Pricebook2 and Product2) in a price book. Corresponds to [PricebookEntry](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_pricebookentry.htm){:target="_blank”} resource in Salesforce                                                                                                                                                |
| `products`                        | object | A product that your organization sells. A product is member of the list of items in a Pricebook2. Corresponds to [Product2](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_product2.htm){:target="_blank”} resource in Salesforce                                                                                                                                              |
| `profile`                         | object | A profile, which defines a set of user permissions for performing different operations, such as querying, adding, updating, or deleting information. Corresponds to [Profile](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_profile.htm){:target="_blank”} resource in Salesforce                                                                                             |
| `solutions`                       | object | A detailed description of a customer issue and the resolution of that issue. Corresponds to [Solution](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_solution.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                   |
| `solution_tags`                   | object | Associates a word or short phrase with a Solution. Corresponds to [SolutionTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_solutiontag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                       |
| `tasks`                           | object | An activity or to-do item to perform or that has been performed. Corresponds to [Task](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_task.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                       |
| `task_tags`                       | object | Associates a word or short phrase with a Task. Corresponds to [TaskTag](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_tasktag.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                                   |
| `users`                           | object | A user in your organization. Corresponds to [User](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_user.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                                                           |
| `user_login`                      | object | Represents the settings that affect a user's ability to log into an organization. This object is available in API version 29.0 and later. Corresponds to [UserLogin](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_userlogin.htm){:target="_blank”} resource in Salesforce                                                                                                    |
| `role`                            | object | A role in your organization. Corresponds to [UserRole](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_userrole.htm){:target="_blank”} resource in Salesforce                                                                                                                                                                                                                   |

### Custom objects

Select and add custom objects from the Selective Sync page in the Salesforce source settings. 

### Deleting records

Segment supports the use of soft deletes in Salesforce. If you perform a soft delete on a record in Salesforce, your next one to two warehouses syncs will change the value of `is_deleted` for the associated record to `True`.

Segment does not support hard deletes in Salesforce. Use of hard deletes will result in the data remaining in the warehouse with `is_deleted` set to `False`.

## Collection properties

Segment performs a one-to-one mapping of all publicly available fields (standard and custom) from Salesforce. To see the full list of the standard fields refer to the Salesforce field documentation linked in each collection above. 

## Adding destinations

Warehouses are the only supported destination for object-cloud sources.

## Historical data
When a new Object/Collection is enabled, Segment automatically runs a full historical re-sync on that Object.

However, for custom properties/columns, Segment only populates the custom property with data that comes in after the custom field was enabled. In order to populate the new custom field(s) for records that have previously been synced, you need to initiate a manual re-sync. 

> info ""
> Initiating a full re-sync might impact your workspace's [API calls + Object](https://segment.com/docs/guides/usage-and-billing/mtus-and-throughput/#how-is-object-throughput-calculated){:target="_blank"} usage. 

For Salesforce, Segment uses the `SystemModstamp`(system_modstamp) field to checkpoint collections that sync incrementally. When enabled, Segment syncs collections incrementally. When disabled, Segment syncs collections fully. If you'd like to force a collection to sync fully on the next run to bring in historical data, you can disable the `SystemModstamp` field on the collection, allow the next sync to complete and then re-enable `SystemModstamp` so the collection syncs incrementally in the coming syncs. 

If you've added and selected custom fields to an existing collection and would not like to use `SystemModstamp` to bring in historical data, [contact Segment Support](https://segment.com/help/contact/){:target="_blank"} to configure them to sync. You do not need to include the field names.

## Version upgrade changes

On March 25, 2024, Segment upgraded the Salesforce source integration from version 39.0 to Salesforce's API version 58.0. With the upgrade, there are [deleted fields](#deleted-fields) and [added fields](#added-fields). 

> info ""
> All new Salesforce sources created on or after March 25, 2024 use version 58.0. 

### Deleted fields

Change | Fields
---- | ------------
Collections deprecated | `AssistantRecommendationShare`, `AssistantRecommendation` 
Columns deprecated from the collections (Column name, Collection) | (`ForeignKeyAssetId, CustomBrandAsset`), (`UserPermissionsMobileUser, User`), (`OptionsRequireHttps, Site`), (`UniqueKey, LoginEvent`), (`OptionsExternalHttps, Domain`) 


### Added fields
Salesforce version 58 has between 350 to 550 newly added collections and between 800 to 1000 new columns. To see which collections and fields you can access in Salesforce version 58, refer to the [Salesforce documentation](https://help.salesforce.com/s/articleView?id=release-notes.rn_api_nc.htm&release=244&type=5){:target="_blank"}.


## Troubleshooting

If you are syncing data from a Salesforce sandbox environment and see an "Invalid credentials" error, [contact Segment Support](https://segment.com/help/contact/){:target="_blank"} to configure your Segment source to use sandbox data. 
