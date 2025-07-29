---
title: Salesforce Unify Direct Integration Guide
redirect_from:
  - '/unify/salesforce-unify'
  - '/connections/sources/catalog/cloud-apps/salesforce-unify/'
---

This guide outlines the process for setting up Salesforce as a data source with Segment Profiles. 

Once configured, this integration lets you send Salesforce data directly to Segment Profiles, eliminating the need for a data warehouse and enabling faster data synchronization and profile enrichment.

> info "API usage and billing"
> The Salesforce Unify Direct Profile Integration increases API usage. Verify your API limits and Segment billing before you enable the Salesforce Unify Direct Profile Integration.

## Prerequisites

Before you begin, make sure that you have the following:

- a Segment workspace with [Unify](/docs/unify/) enabled and [Identity Resolution](/docs/unify/identity-resolution/) set up.
- Administrator access to your Salesforce account.

## Integration steps

Follow the steps in this section to set up the Salesforce Unify Direct Integration.

### 1. Add Salesforce as a source

Start by setting up Salesforce as a source:

1. From your Segment workspace, go to **Connections > Catalog > Cloud App Objects**.
2. Select Salesforce as your source.
3. Name your Salesforce source and authenticate with your Salesforce credentials.
4. Once connected, use Selective Sync to choose the Salesforce collections and columns you want to sync.

After successful authentication, Segment adds the source but disables it by default. You'll enable it later. 

### 2. Add a Segment Profiles destination

Next, add a Segment Profiles destination:

1. From the overview tab of your new Salesforce source, click **Add destination**.
2. From the catalog destination page, click **Segment Profiles**, then click **Add destination**.
3. Name your destination, then click **Create**.

### 3. Create a data model

1. In the Salesforce source you created, navigate to the Models tab and click **Create Model**.
3. Select the fields you want to map to the Segment Profiles destination.
4. Preview and validate the schema with real-time Salesforce data.
5. Name your model and save it.

### 4. Configure mapping

1. In the Salesforce source, navigate to **Models > Add mapping**.
2. Segment returns you to the Segment Profiles Destination. Click **Add mapping**.
2. Select your data model and map your selected Salesforce data to fields in Segment Profiles (typically "Identify" for profile updates).
   - Select the Profile space you want to update.
   - Map Salesforce fields to Segment Profile fields. **You must map either a User ID or Anonymous ID field.**
4. Test your mapping with real data from Salesforce.
5. Save your mapping configuration.

![A screenshot of the "Select Mappings" interface in Segment, showing fields for mapping event data from a source to a destination. The interface includes options for selecting objects, customizing objects, and mapping fields such as Profile Space, User ID, Anonymous ID, Group ID, Traits, and Timestamp.](/docs/connections/sources/images/select_mappings.png)

### 5. Enable the destination mapping and Salesforce source

Finish by enabling the destination mappings and the source:

1. From the settings tab of the Segment Profiles destination you created, toggle the **Enable destination** switch to **Enabled**, then click **Save**. 
2. From the overview tab of the same Segment Profiles destination, toggle the **Mapping Status** switch to **Enabled**.
3. Return to your Salesforce source and navigate to **Settings > Basic settings**.
4. Toggle the **Enable source** switch to on.

Data now begins syncing between Salesforce and Segment.

## Data synchronization

After you've connected Salesforce and the Segment Profiles destination, the integration begins syncing data:

- New or updated records in Salesforce get sent to Segment Profiles based on your mapping configuration.
- The initial sync includes historical data within the range specified in your Selective Sync settings.
- Further syncs take place at regular intervals (typically hourly).

## Best practices

Keep the following in mind as you work with the Salesforce Unify Direct Integration:

- Start with a subset of data to test your integration before expanding to all Salesforce objects.
- Regularly review your mapping to ensure it reflects any changes in your Salesforce schema or Segment Profile needs.
- Monitor both your Salesforce source and Segment Profiles destination for errors and data discrepancies.

The Salesforce Unify Direct Integration supports mapping from a single Salesforce collection per data model. For complex use cases requiring data from multiple collections, you may need to create multiple data models and mappings.
