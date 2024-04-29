---
title: Consent in Reverse ETL
plan: consent-management
related:
  - "/privacy/consent-management/"
  - "/privacy/consent-management/configure-consent-management/"
  - "/privacy/consent-management/consent-in-segment-connections/"
  - "/privacy/consent-management/consent-in-unify"
---

With Consent Management in RETL, you can enforce your end-users' consent preferences that are captured by your consent management platform (CMP) and stored in your warehouse. 

You can enforce consent stored in warehouse data using one of the following methods: 
- **Filter the model based on consent preferences**: Filtering the data based on consent preferences is only possible for users who set up a model after they configured Consent Management in Segment. This method also limits how you can use your warehouse data, as the model can't be used for multiple use cases where consent flows to destinations mapped to multiple categories.
- **Build a mapping that identifies consent categories**: If you are setting up Reverse ETL or updating your mapping, you can update your mapping to identify the columns that store information about end user consent preferences and enforce these preferences in Segment's downstream destinations. 

## Prerequisites
> info "Consent management edit and update capabilities limited to Workspace Owners"
> Only users with the Workspace Owner role are able to create, edit, and disable consent categories. All other users have read-only access to Consent Management features. 

Before you can enforce consent stored in your warehouse, take the following steps:
- **Set up your third-party consent management tool and create consent categories**. Take note of your consent categories and the key or ID associated with each category.
- **Know how your company uses each destination**. You need to know which destinations to map to each category. 
- **End-user consent stored in a warehouse that [Segment supports for RETL](/docs/connections/reverse-etl/#step-1-add-a-source)**. Segment supports Reverse ETL capabilities in Azure, BigQuery, Databricks, Postgres, Snowflake, and Redshift data warehouses. Other data warehouses are not supported.

## Step 1: Create consent categories in the Segment app

> info "Limited availability of destinations"
> Reverse ETL supports the destinations in the [Reverse ETL catalog](/docs/connections/reverse-etl/reverse-etl-catalog/), [Segment Profiles](), and Segment Connections. 

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent management page, click **Create categories**.
3. Confirm that you have completed the required prerequisites, and click **Next**.
4. On the Create consent categories page, add the following information to the category form:
  - **Category name**: Enter a name that describes your use case for the data sent to this destination. This field only accepts category names that are 20 characters or less.
  - **Category ID**: In OneTrust, this is a string of up to five alphanumeric characters, but other CMPs may have a different format. This field is case sensitive.
  - **Mapped destinations**: Select one or more of your Reverse ETL destinations to map to this category. Category mappings apply to all instances of a destination. 
  <br/><br/>**Optional**: Click **Add category** to create another category.
5. Once you've finished setting up your category or categories, click **Save**.

> warning "Segment recommends mapping all Reverse ETL destinations to a category"
> Segment assumes all destinations without a mapping do not require user consent and will receive all events containing a consent object. If a destination is mapped to multiple categories, a user must consent to all categories for data to flow to the destination.

## Step 2: Identify consent columns

After you set up consent categories in the Segment app, you must identify the columns in your data warehouse that store end user consent by creating a *model*, or SQL query that defines the set of data you want to synchronize to your Reverse ETL destinations. When building your RETL data model, Segment recommends storing consent  in `true`, `false`, or `conflict` format and mapping only one consent category to each column.

> error "Creating a data mapping that does not include information about consent preferences results in no consent enforcement"
> If you create consent categories in your workspace but fail to identify columns that contain consent preferences in your data mapping, events will flow to all destinations in your workspace regardless of end user consent preferences.

To add your first model:
1. Navigate to Connections > Sources and select the Reverse ETL tab. Select your source and click **Add Model**.
2. Click **SQL Editor** as your modeling method.
3. Enter the SQL query that’ll define your model. Your model is used to map data to your Reverse ETL destinations.
4. Choose a column to use as the unique identifier for each record in the Unique Identifier column field.
    The Unique Identifier should be a column with unique values per record to ensure checkpointing works as expected. It can be a primary key. This column is used to detect new, updated, and deleted records.
5. Click **Preview** to see a preview of the results of your SQL query. The data from the preview is extracted from the first 10 records of your warehouse.
6. Click **Next**.
7. Enter your Model Name.
8. Click **Create Model**.

To edit a model: 
1. Navigate to Connections > Sources and select the Reverse ETL tab. Select your source and click **Add Model**.

<!---TODO: finish the above step when I get access to a test environment --->

> info "Consent categories in the Segment app must match consent columns identified in your data warehouse before continuing"
> If you create consent categories in the Segment app but fail to identify a column for each category you created in Segment, you will not be able to proceed until you enable a destination  mapped to a consent category not identified in the data model.

## Step 3: Send events to your downstream destinations

After you set up categories in the Segment app and create a RETL mapping that extracts consent information, you can send events to your downstream destinations. 


<!--- TODO: finish this step ^^^ --->

## Validate your consent mapping

You can validate that you successfully created your consent mapping in Segment Connections, Segment Profiles, and supported Reverse ETL Action destinations using the following methods: 

### Segment Connections
Open the Source Debugger for your Reverse ETL source and confirm that the [consent object](/docs/privacy/consent-management/consent-in-segment-connections/#consent-object) appears on every event and that the consent object has the categories you mapped in [Step 2: Identify consent columns](#step-2-identify-consent-columns).

### Segment Profiles
Open the [Profile Explorer](/docs/unify/#profile-explorer) and verify that your profiles contain the [Segment Consent Preference Updated](/docs/privacy/consent-management/consent-in-unify/#segment-consent-preference-updated-event) event.

### Supported Reverse ETL Actions destinations
Segment automatically filters out data belonging to users who have not consented to the category that a supported Actions destination is mapped to.

To verify that this is working as intended, open [Delivery Overview](/docs/connections/delivery-overview) for a [supported Actions destination](/docs/connections/reverse-etl/reverse-etl-catalog/) and view some of the events that were successfully delivered to the destination. The events in your destination should only belong to users that consented to send data to the category that your supported Actions destination belongs to. 

<!--- TODO: ^^^ rewrite that last sentence --->