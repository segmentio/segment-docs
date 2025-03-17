---
title: Connect HubSpot to Segment Profiles
plan: unify
redirect_from:
  - '/unify/hubspot-unify'
---

This guide explains how to set up HubSpot as a source and connect it to Segment Profiles. 

Once configured, this integration lets you send HubSpot data directly to Segment Profiles, eliminating the need for a data warehouse and enabling faster data synchronization and profile enrichment.

> info "Sync date and collections"
> - Changing the start date after the first sync has no effect unless you initiate a full manual sync.
> - Changes to synced collections apply only to future syncs. Data already synced from removed collections remains in the warehouse.

## Prerequisites

Before you begin, make sure that you have the following:

- A Segment workspace with [Unify](/docs/unify/) enabled and [Identity Resolution](/docs/unify/identity-resolution/) configured.
- Administrator access to your HubSpot account.

## Integration steps

Follow these steps to connect HubSpot to Segment Profiles.

### 1. Add HubSpot as a source

To start syncing HubSpot data, first add it as a source:

1. From your Segment workspace, go to **Connections > Catalog** and search for **HubSpot**.
2. Select **HubSpot**, then click **Add Source**.
3. Enter a name for your HubSpot source and add an optional label.
4. Log in to HubSpot and choose the account you want to sync data from.
5. Once you've authenticated, return to Segment and click **Next**.
6. Verify the **Schema name**, then click **Next**.
7. In the **Selective Sync** settings:
   - Set a start date for the initial sync (or leave it blank for a full historical sync).
   - Keep the default sync frequency (every three hours) or adjust it.
   - Choose the collections to sync.

After adding the source, go to **Settings > Basic settings** and toggle **Enable source**. The first sync begins immediately.

### 2. Add a Segment Profiles destination

Next, add a Segment Profiles destination:

1. From your HubSpot source, go to the **Models** tab and click **Add destination**.
2. Select **Segment Profiles**, then click **Add destination**.
3. Enter a name for the destination, then click **Create destination**.

### 3. Create a data model

A data model defines how HubSpot data maps to Segment Profiles.

1. In the HubSpot source, go to the **Models** tab and click **Create Model**.
2. Select the collections and columns to sync.
3. Preview the data in real time and validate the schema.
4. Name the model and click **Next** to save it.

### 4. Map HubSpot data to Segment Profiles

Now, configure mappings to determine how HubSpot data updates Segment Profiles.

1. In the **Models** tab of your HubSpot source, click **Add mapping**.
2. Segment redirects you to the Segment Profiles destination. Click **Add mapping**.
3. Select your data model and define the mapping rules:
   - Choose the Profile Space to update.
   - Map HubSpot fields to Segment Profile fields.
   - **You must map either a User ID, Anonymous ID, or Group ID.**
4. Test the mapping with real HubSpot data.
5. Save the configuration.


### 5. Enable destination mapping and finish setup

Finish by enabling the destination mapping:

1. From the **Overview** tab of the Segment Profiles destination, toggle **Mapping Status** to **Enabled**.
2. Return to your HubSpot source and verify that **Settings > Basic settings** is enabled.

Once complete, HubSpot data syncs to Segment Profiles automatically.

## Data synchronization

After connecting HubSpot to the Segment Profiles destination, the integration begins syncing data:

- New or updated records in HubSpot get sent to Segment Profiles based on your mapping configuration.
- The first sync includes historical data based on your selected start date.
- Future syncs run at the default interval of every three hours.

## Best practices

Keep the following in mind when working with the HubSpot/Segment Profiles integration:

- Start with a small dataset to validate mappings before expanding to all HubSpot objects.
- Regularly review your mappings to make sure they reflect any schema changes in HubSpot or Segment Profiles.
- Monitor both your HubSpot source and Segment Profiles destination for errors and data discrepancies.

Each data model supports mapping from one HubSpot collection at a time. For complex use cases requiring multiple collections, create separate data models and mappings.
