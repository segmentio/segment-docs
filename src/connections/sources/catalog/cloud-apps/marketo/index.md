---
title: Marketo Source
rewrite: true
source-type: object
strat: adobe
id: VOXa199Bdm
---
<!-- Marketo is listed as an object source, but doesn't appear in our configapi source catalog, so leave the "source-type" set here -->


[Marketo](https://www.marketo.com/){:target="_blank"} is a leader in marketing automation. Use the Marketo source to load your campaigns, emails, leads, and other collections into your data warehouse.

This will allow you to write SQL to analyze your email marketing campaigns ROI, or join your email data to other data sources like web and mobile events, Salesforce, and Zendesk to tie nurture emails to re-activation rates in your app.

## Getting started

### Permissions

You will need Admin permissions to your Marketo account.

### Add a new Marketo source

1. From your workspace's `sources` page, click `add source`.
2. Choose Marketo.
3. Give the source a nickname and a schema name. The nickname is a label used in the Segment interface, and the schema name is the namespace you query against in your warehouse. Both can be whatever you like, but Segment recommends that you stick to something that reflects the source itself, like Marketo for nickname and marketo or marketo_prod for the schema name.
4. Configure your Marketo source with the required settings (see section below for details)
![Screenshot of the set up flow for the Marketo source.](images/add-source.png)

> warning "Lead Activity Type IDs"
> In Marketo's settings, the Lead Activity Type IDs field is labeled as optional, but is required to see the `lead_activities` table. Segment recommends that you complete this field to see all available data.  By default the activity type IDs 12,13,32,37 are used to sync data to the `leads` table and `leads_activity_attributes` table.


### Configure your Marketo source

1. Open Marketo.
2. Go to **Admin > Munchkin** to find your Munchkin Account ID.
![Screenshot of the Tracking Code section of Marketo's Munchkin page.](images/Image2018-04-30at5.28.54PM.png)
3. Go to Admin > LaunchPoint
  a. If you don't already have a REST service setup, follow [these steps](http://developers.marketo.com/rest-api/custom-services/){:target="_blank"}.
  b. Then, copy the "Client ID" and "Client Secret" parameters.
  ![Screenshot of the Details section of the LaunchPoint page.](images/Image2018-04-30at5.29.32PM.png)
  c. Paste the "Client ID" and "Client Secret" into the Segment Marketo source settings.

Data should start flowing into your warehouse in the next few hours.


## Components

### Sync


The Marketo source is built with a sync component, which means Segment makes requests to Marketo's API on your behalf on a 3 hour interval to pull the latest data into Segment. In the initial sync, Segment grabs all the Marketo objects (and their corresponding properties) according to the Collections Table below. The objects will be written into a separate schema, corresponding to the source instance's schema name you designated upon creation (for example, `my_source.charges`).

The sync component uses an upsert API, so the data in your warehouse loaded using sync will reflect the latest state of the corresponding resource in Marketo. For example, if `first_name` goes from `Jess` to `Jessica` between syncs, on its next sync that field will be `Jessica`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources will sync with Segment every three hours. Depending on your Warehouses plan, Segment pushes the Source data to your warehouse on the interval associated with your billing plan.

## Collections

Collections are the groupings of resources Segment pulls from your source. In your warehouse, each collection gets its own table.

| Collection                    | Type   | Description                                                                 |
| ----------------------------- | ------ | --------------------------------------------------------------------------- |
| `leads`                         | object | All available leads.                                                        |
| `campaigns`                     | object | All available campaigns.                                                    |
| `email`                         | object | All available emails.                                                       |
| `landing_pages`                 | object | All available landing pages.                                                |
| `lists`                         | object | A set of static list records.                                               |
| `lead_activities`               | object | Activities performed by leads.                                              |
| `lead_activity_attributes`      | object | Attributes found for each individual Lead Activity.                         |
| `lead_activity_types`           | object | Available lead activity types, along with associated metadata of each type. |
| `lead_activity_type_attributes` | object | Attributes found for each individual Lead Activity Type.                    |
| `programs`                      | object | All available programs.                                                     |
| `segmentation`                  | object | Accessible segmentations (subgroups based on a Smart List rule).            |
| `segments`                      | object | Segments inside a given segmentation.                                       |


## Collection properties

### Leads

| Property Name      | Description                |
| ------------------ | -------------------------- |
| `id`                 | Lead id                    |
| `email`              | Lead email                 |
| `first_name`         | Lead First Name            |
| `last_name`          | Lead Last Name             |
| `created_at`         | Date Lead created          |
| `updated_at`         | Date Lead last updated     |
| `deleted_at`         | Date Lead deleted          |
| `custom_lead_fields` | * Added during set up flow |


### Campaigns

| Property Name  | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `id`             | Campaign id                                                          |
| `name`           | Campaign name                                                        |
| `active`         | Whether the Campaign is active. Only applicable to trigger campaigns |
| `type`           | Type of the Campaign (['batch', 'trigger'])                          |
| `workspace_name` | Name of the parent workspace if applicable                           |
| `created_at`     | Date Campaign created                                                |
| `updated_at`     | Date Campaign last updated                                           |


### Email

| Property Name | Description                                                 |
| ------------- | ----------------------------------------------------------- |
| `id`            | Email id                                                    |
| `name`          | Email name                                                  |
| `status`        | Status filter for draft or approved versions                |
| `url`           | URL of the Email in the Marketo UI                          |
| `description`   | Description of the Email                                    |
| `operational`   | Whether the email is operational                            |
| `template`      | Id of the parent template                                   |
| `text_only`     | Setting to include text-only version of email when sent     |
| `web_view`      | Whether 'View as Webpage' function is enabled for the email |
| `workspace`     | Name of the workspace                                       |
| `version`       | Version/Revision of the Email                               |
| `subject`       | Subject Line of the Email                                   |
| `from_name`     | From-name of the Email                                      |
| `from_email`    | From-address of the Email                                   |
| `reply_email`   | Reply-To address of the Email                               |
| `folder_type`   | Folder type of the Email                                    |
| `folder_value`  | Folder value of the Email                                   |
| `folder_name`   | Folder name of the Email                                    |
| `created_at`    | Date Email created                                          |
| `updated_at`    | Date Email last updated                                     |


### Landing pages

| Property Name    | Description                                                       |
| ---------------- | ----------------------------------------------------------------- |
| `id`               | Landing Page id                                                   |
| `name`             | Landing Page name                                                 |
| `status`           | Status filter for draft or approved versions                      |
| `workspace`        | Name of the workspace                                             |
| `url`              | URL of the Landing Page in the Marketo UI                         |
| `computed_url`     | -                                                                 |
| `mobile_enabled`   | Whether the page has mobile viewing enabled                       |
| `robots`           | Robots directives to apply to the pages meta tags                 |
| `keywords`         | -                                                                 |
| `title`            | Title element of the Landing Page                                 |
| `template`         | Id of the template used                                           |
| `custom_head_html` | Any custom HTML to embed in the tag of the page                   |
| `description`      | Description of the asset                                          |
| `facebook_og_tags` | Any Facebook OpenGraph meta tags to apply to the page             |
| `form_prefill`     | Boolean to toggle whether forms embedded in the page will prefill |
| `folder_type`      | Folder type of the Landing Page                                   |
| `folder_value`     | Folder value of the Landing Page                                  |
| `folder_name`      | Folder name of the Landing Page                                   |
| `created_at`       | Date Landing Page created                                         |
| `updated_at`       | Date Landing Page last updated                                    |


### Lists

| Property Name  | Description             |
| -------------- | ----------------------- |
| `id`             | List id                 |
| `name`           | List name               |
| `description`    | Description of the list |
| `program_name`   | Program name            |
| `workspace_name` | Name of the workspace   |
| `created_at`     | Date List created       |
| `updated_at`     | Date List last updated  |


### Lead activities

| Property Name              | Description                                  |
| -------------------------- | -------------------------------------------- |
| `id`                         | Lead Activity id                             |
| `activity_id`                | Legacy Id of the activity (Deprecated)       |
| `lead_id`                    | Id of the lead associated to the activity    |
| `campaign_id`                | Id of the associated Campaign, if applicable |
| `primary_attribute_value_id` | Id of the primary attribute                  |
| `primary_attribute_value`    | Value of the primary attribute               |
| `activity_type_id`           | Id of the activity type                      |
| `activity_date`              | Datetime of the activity type                |


### Lead activity attributes

| Property Name              | Description                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------- |
| `id`                         | Combination of Lead Activity id, Lead Activity Type id and Lead Activity Attribute name |
| `activity_id`                | Id of the lead activity associated to the attribute                                     |
| `activity_type_id`           | Id of the lead activity type associated to the attribute                                |
| `activity_type_attribute_id` | Combination of the attributes associated activity type id and attribute name            |
| `name`                       | name of the Attribute                                                                   |
| `value`                      | value of the Attribute                                                                  |


### Lead activity types

| Property Name               | Description                    |
| --------------------------- | ------------------------------ |
| `id`                          | Lead Activity Type id          |
| `name`                        | Lead Activity Type name        |
| `description`                 | Lead Activity Type description |
| `primary_attribute_name`      | Value of the primary attribute |
| `primary_attribute_data_type` | Type of the primary attribute  |


### Lead activity type attributes

| Property Name    | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `id`               | Combination of Lead Activity Type id and attribute name  |
| `activity_type_id` | Id of the lead activity type associated to the attribute |
| `name`             | Name of the Attribute                                    |
| `data_type`        | Data Type of the Attribute                               |


### Programs

| Property Name | Description                                               |
| ------------- | --------------------------------------------------------- |
| `id`            | Program id                                                |
| `name`          | Program name                                              |
| `description`   | Program description                                       |
| `url`           | URL of the Program in the Marketo UI                      |
| `type`          | Program type (['program', 'event', 'webinar', 'nurture']) |
| `channel`       | Program channel                                           |
| `status`        | Program status (['locked', 'unlocked', 'on', 'off'])      |
| `workspace`     | Name of the workspace                                     |
| `sfdc_id`       | SFDC id of the program if linked to an SFDC campaign      |
| `sfdc_name`     | Name of the linked SFDC campaign if applicable            |
| `folder_value`  | Folder value                                              |
| `folder_name`   | Folder name                                               |
| `folder_type`   | Folder type                                               |
| `created_at`    | Date Program created                                      |
| `updated_at`    | Date Program last updated                                 |


### Segmentations

| Property Name | Description                                  |
| ------------- | -------------------------------------------- |
| `id`            | Segmentation id                              |
| `name`          | Segmentation name                            |
| `url`           | URL of the Segmentation in the Marketo UI    |
| `description`   | Description of the asset                     |
| `status`        | Status filter for draft or approved versions |
| `workspace`     | Name of the workspace                        |
| `folder_value`  | Folder value                                 |
| `folder_name`   | Folder name                                  |
| `folder_type`   | Folder type                                  |
| `created_at`    | Date Segmentation created                    |
| `updated_at`    | Date Segmentation last updated               |


### Segments

| Property Name   | Description                        |
| --------------- | ---------------------------------- |
| `id`              | Segment id                         |
| `name`            | Segment name                       |
| `segmentation_id` | Id of the related Segmentation     |
| `description`     | Description of the asset           |
| `url`             | Url of the asset in the Marketo UI |
| `created_at`      | Date Segment created               |
| `updated_at`      | Date Segment last updated          |



## Adding Destinations

Currently, Warehouses are the only supported destination for object-cloud sources.


## FAQs

### How many API calls will the Segment source use to sync all my data?

Segment doesn't provide statistics for these consumed API calls, since Segment systems only log the number of objects pulled from Marketo as throughput.

### Can I limit API usage on the source?

Yes. You can specific a daily limit to the API calls the source will consume. If you don't set a limit, Segment will, by default, consume as many API calls as are available in the limit you agreed to with Marketo to sync the entire source.

Segment also uses the `Lead` and `Activity` [Bulk Extract APIs](https://developers.marketo.com/rest-api/bulk-extract/){:target="_blank"} to reduce the number of requests needed to sync the data. For these syncs, Segment has a limit of 500 MB worth of files downloaded per day.

### What if my daily Marketo API quota isn't enough?

If your source needs more than 10,000 REST API calls or more than 500 MB of data to sync, Segment will continue the sync when a new batch of API calls is available.

Marketo's API quota applies across your subscription. If other applications share the quota, it could interfere with Segment's ability to sync the source.

### Why can't I find the `lead_activities` table in my data warehouse? does Segment not ingest it?

You first need to enable the **Activity Type IDs (optional)** setting in the Marketo source, which must be enabled for Segment to pull the `lead_activities` collection source. Once Segment pulls the data, it will be available in your data warehouses.

### Can I get other collections synced by the source?

[Contact Support](https://segment.com/help/contact/){:target="_blank"} to get additional collections added to your source.

### Can I get other columns synced by the source?

Yes. For `leads` and `activities`, choose **Custom Lead Fields (optional)**, which lets you enter comma-separated custom files that will be synced by Marketo's REST API name.

View [Marketo's List of Standard Fields documentation](http://developers.marketo.com/rest-api/lead-database/fields/list-of-standard-fields/){:target="_blank"} for a complete list of standard fields and Marketo's REST API names. [Reach out to Segment support](https://segment.com/help/contact/){:target="_blank"} if you're interested in other fields.
