---
title: Consent in Reverse ETL
plan: consent-management
---

With Consent Management in Reverse ETL, you can enforce your end-users' consent preferences that are captured by your consent management platform (CMP) and stored in your warehouse. 

To enforce consent stored in your warehouse, build a Reverse ETL model that identifies consent categories. You can create a "consent to" column mapping in a new data model or update an existing data model to include a "consent to" mapping. 

> info "Consent in Reverse ETL supports Reverse ETL-supported Actions destinations and Segment Connections"
> At this time, Consent in Reverse ETL does not support adding consent to Segment Profiles using the Segment Profiles destination. To enforce consent data in your classic Segment destinations, use the [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/). 

## Prerequisites

> info "Consent management edit and update capabilities limited to Workspace Owners"
> Only users with the Workspace Owner role are able to create, edit, and disable consent categories. All other users have read-only access to Consent Management features. 

Before you can enforce consent stored in your warehouse, take the following steps:
- **Set up your third-party consent management tool and create consent categories**. Take note of your consent categories and the key or ID associated with each category.
- **Know how your company uses each destination**. You need to know which destinations to map to each category. 
- **Store your end user consent in a warehouse that [Segment supports for Reverse ETL](/docs/connections/reverse-etl/#step-1-add-a-source)**. Segment supports Reverse ETL capabilities in Azure, BigQuery, Databricks, Postgres, Snowflake, and Redshift data warehouses. Other data warehouses are not supported.

## Step 1: Create consent categories in the Segment app

> info "Limited availability of destinations"
> Reverse ETL supports the Actions destinations in the [Reverse ETL catalog](/docs/connections/reverse-etl/reverse-etl-catalog/) and [Segment Connections](/docs/connections/destinations/catalog/actions-segment/). 

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent management page, click **Create categories**.
3. Confirm that you have completed the required prerequisites, and click **Next**.
4. On the Create consent categories page, add the following information to the category form:
  - **Category name**: Enter a name that describes your use case for the data sent to this destination. This field only accepts category names that are 20 characters or less.
  - **Category ID**: In OneTrust, this is a string of up to five alphanumeric characters, but other CMPs may have a different format. This field is case sensitive.
  - **Mapped destinations**: Select one or more of your Reverse ETL destinations to map to this category. Category mappings apply to all instances of a destination. 
5. After you've finished setting up your category or categories, click **Save**.

> warning "Segment recommends mapping all Reverse ETL destinations to a category"
> Segment assumes all destinations without a mapping do not require user consent and will receive all events containing a consent object. If a destination is mapped to multiple categories, a user must consent to all categories for data to flow to the destination.

To edit or disable consent categories, view the [Configure Consent Management](/docs/privacy/consent-management/configure-consent-management/) documentation. 

## Step 2: Add your Reverse ETL source

> success ""
> If you've already added a [Reverse ETL source](/docs/connections/reverse-etl/#step-1-add-a-source) to your workspace, you can proceed to [Step 3: Identify consent columns](#step-3-identify-consent-columns). 

If you haven't already configured a Reverse ETL source in your workspace, follow the instructions in the [Reverse ETL: Add a source](/docs/connections/reverse-etl/#step-1-add-a-source) documentation to add your warehouse as a data source. When you've configured your Reverse ETL source, proceed to [Step 3: Identify consent columns](#step-3-identify-consent-columns). 

## Step 3: Identify consent columns

After you set up consent categories in the Segment app, you must identify the columns in your data warehouse that store end user consent by creating a *model*, or SQL query that defines the set of data you want to synchronize to your Reverse ETL destinations. When building your data model, Segment recommends that you represent consent as a boolean `true` or `false` value and map one consent category to one column.

> error "Creating a data model that does not include information about consent preferences results in no consent enforcement"
> If you create consent categories in your workspace but fail to identify columns that contain consent preferences in your data model, events flow to all destinations in your workspace regardless of end user consent preferences.

### Identify consent when building your model
To identify consent when building your model:
1. Navigate to **Connections > Sources** and select the Reverse ETL tab. Select your source and click **Add Model**.
2. Click **SQL Editor** as your modeling method.
3. Create the SQL query that’ll define your model. Your model is used to map data to your Reverse ETL destinations.
4. Choose a column to use as the unique identifier for each record in the Unique Identifier column field.
    The Unique Identifier should be a column with unique values per record to ensure checkpointing works as expected. It can be a primary key. This column is used to detect new, updated, and deleted records.
5. Click **Preview** to see a preview of the results of your SQL query. The data from the preview is extracted from the first 10 records of your warehouse.
6. Click **Next**.
7. Enter your Model Name.
8. Click **Create Model**.
9. Select **Add consent mapping**. 
10. On the **Add consent mapping** popup, identify the column in your model that holds the consent preferences for the consent category. 
11. Select **Add consent mapping** to identify columns for all of your consent categories. 
12. When you're satisfied with your consent mappings, click **Save**. 

### Update your Reverse ETL model to include consent
To update an existing Reverse ETL model to include consent enforcement:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the source and the model you want to edit.
3. Select the **Query Builder** tab to edit your query. When you're editing your query, include columns that store information about end user consent preferences. When you've finished making changes, click **Save Query**.
4. Navigate to **Settings > Consent settings**. 
5. Select **Add consent mapping**.
6. On the **Add consent mapping** popup, identify the column in your model that holds the consent preferences for the consent category. 
7. Select **Add consent mapping** to identify columns for all of your consent categories. 
8. When you're satisfied with your consent mappings, click **Save**. 

You can select the **Settings** tab and click **Consent settings** to verify that the consent categories in your model match the consent categories you configured in your workspace. 

You can store each consent category in its own column in your warehouse, or store your consent information in one single blob column. Segment requires your consent categories to be in their own column in your data model.

The following sample model maps consent categories from each column in your database:

``` sql
select 
  USERID, 
  name, 
  email, 
  distinctid,
  Ads, 
  Personalization, 
  Analytics, 
  
from CONSENT_PREFERENCES;
```

The following sample model maps consent categories from one blob column in your database:

```sql
select 
  USERID, 
  name, 
  email, 
  distinctid, 
  CAST(CONSENT_OBJ:consent.cookie.Advertising as Boolean) as Ads,  
  CAST(CONSENT_OBJ:consent.cookie.Personalization as Boolean) as Personalization, 
  CAST(CONSENT_OBJ:consent.cookie.Analytics as Boolean) as Analytics, 
   
from CONSENT_PREFERENCES;
```

> warning "Failing to identify consent columns in your warehouse might lead to unintentional data loss"
> If you have destinations mapped to consent categories in the Segment app but fail to identify a column in your warehouse that stores consent for a category, then consent preference for that category will be considered to be false and **no data will flow to destinations mapped to the category**.

## Step 4: Connect your downstream destinations

After you set up categories in the Segment app and create a SQL model that extracts consent information, connect your downstream destinations to complete the consent enforcement process. 

> info "Consent in Reverse ETL supports Reverse ETL-supported Actions destinations and Segment Connections"
> At this time, Consent in Reverse ETL does not support enforcing consent in the Segment Profiles destination. To enforce consent data in your classic Segment destinations, use the [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/). 

To add your first destination:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Click **Add Reverse ETL destination**.
3. Select the destination you want to connect to and click **Configure**.
4. Select the Reverse ETL source you want to connect the destination to.
5. Enter the **Destination name** and click **Create Destination**.
6. Enter the required information on the **Settings** tab of the destination.
7. Navigate to the destination settings tab and enable the destination. If the destination is disabled, then Segment won't be able to start a sync.

> info "Segment does not count Reverse ETL records filtered by Consent Management toward your Reverse ETL limits"
> Records filtered out by Consent Management are not counted as part of your Reverse ETL limits. For more information about Reverse ETL limits, see the [Reverse ETL Limits](/docs/connections/reverse-etl/#limits) documentation.

## Validate your consent mapping

You can validate that you successfully created your consent mapping in Segment Connections or supported Reverse ETL Actions destinations using the following methods. 

### Segment Connections destination

Segment automatically adds the [consent object](/docs/privacy/consent-management/consent-in-segment-connections/#consent-object) to every event that's routed downstream to your Segment Connections destination. [Consent enforcement in Connections](/docs/privacy/consent-management/consent-in-segment-connections/) validates that only consenting data flows downstream to any classic Segment destinations connected to your Segment Connections instance.

Open the Source Debugger for your Reverse ETL source and confirm that the [consent object](/docs/privacy/consent-management/consent-in-segment-connections/#consent-object) appears on every event and that the consent object has the categories you mapped in [Step 2: Identify consent columns](#step-2-identify-consent-columns).

<!--- ### Segment Profiles
Open the [Profile Explorer](/docs/unify/#profile-explorer) and verify that your profiles contain the [Segment Consent Preference Updated](/docs/privacy/consent-management/consent-in-unify/#segment-consent-preference-updated-event) event. --->

### Reverse ETL Actions destinations
Segment automatically filters out data from users who have not consented to the category mapped to your destination. 

To verify that this behavior is working as intended, open [Delivery Overview](/docs/connections/delivery-overview) for a RETL-supported Actions destination and view the events that were successfully delivered to the destination. The events in your destination should only come from users that consented to send data to the category that your supported Actions destination belongs to.