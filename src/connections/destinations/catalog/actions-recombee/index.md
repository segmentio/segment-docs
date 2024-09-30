---
title: Recombee (Actions) Destination
hidden: true
versions:
  - name: Recombee AI
    link: /docs/connections/destinations/catalog/recombee-ai     
---

{% include content/plan-grid.md name="actions" %}

[Recombee](https://recombee.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a Recommender as a Service, offering precise content or product recommendations and personalized search based on user behavior.

Use this Segment destination to send your interaction data (views, purchases, plays, etc.) to Recombee.

This destination is maintained by Recombee. For any issues with the destination, [contact the Recombee Support team](mailto:support@recombee.com).

## Getting started

1. If you don't already have one, set up a [Recombee account](https://recombee.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}.
2. From the Segment web app, navigate to **Connections > Destinations** and click **Add Destination**.
3. Select **Recombee (Actions)** and click **Add Destination**.
4. Select an existing Source to connect to Recombee (Actions).
5. Navigate to the [Recombee Admin UI](https://admin.recombee.com){:target="_blank"} and complete the following actions:
  - Choose the Recombee Database where you want to send the interactions.
  - Click **Settings** in the menu on the left.
  - In the **API ID & Tokens** settings section, find the **Database ID** and the **Private Token** of the Database.
6. Back in the Segment app, navigate to the settings page of the Recombee destination you created.
  - Copy the **Database ID** from the Recombee Admin UI and paste it into the **Database ID** field in the destination settings.
  - Copy the **Private Token** from the Recombee Admin UI and paste it into the **Private Token** field in the destination settings.

Once you send the data from Segment to the Recombee destination you can:
  - Open the KPI console of the [Recombee Admin UI](https://admin.recombee.com){:target="_blank"} to see the numbers of the ingested interactions (updated in realtime).
  - Select the ID of an Item (or User) in the Items (or Users) catalog section in the Admin UI to view a specific ingested interaction.

{% include components/actions-fields.html %}

## Reporting successful recommendations

You can inform Recombee that a specific interaction resulted from a successful recommendation (meaning the recommendations were presented to a user, and the user clicked on one of the items) by setting the ID of the successful recommendation request in the `Recommendation ID` field of the action (this is the `recomm_id` property by default). You can read more about this setting in Recombee's [Reported Metrics documentations](https://docs.recombee.com/admin_ui.html#reported-metrics){:target="_blank"}

Sending the `Recommendation ID` gives you precise numbers about successful recommendations in the KPI section of the [Recombee Admin UI](https://admin.recombee.com){:target="_blank"}. This explicit feedback also helps improve the output of the recommendation models.

## Benefits of Recombee (Actions) vs Recombee AI Classic

Recombee (Actions) provides the following benefits over the classic Recombee destination:

- **Streamlined Configuration**. You can now create mappings in a dedicated tab in the Segment web app, as opposed to needing to edit this in the settings. This allows you to configure the mappings on a per-event basis and makes it easier to verify that they work as intended.
- **Removing Bookmarks is now possible**. You can now configure a mapping to send a *Delete Bookmark* Action, which will remove the bookmark interaction from the Recombee database.

## Migration from the classic Recombee AI destination

It is recommended that for each source, the Recombee (Actions) destination and the classic Recombee AI destination are not enabled at the same time in order to prevent errors.

### Configuration changes

Compared to the classic Recombee AI destination, the following changes were made with regards to the configuration:

- In the destination settings, the **API Key** setting has been renamed to **Private Token** to better reflect the type of token used.
- The **Track Events Mapping** setting has been removed. If you want to map custom events to Recombee interactions, make sure to create your own mappings in the Mappings tab in the Segment web app.
- The **Item ID Property Name** setting is now no longer available, as this functionality is now available in Segment's native Mappings tab. Ensure that your mappings use the desired property for the **Item ID** action field.
- *The following change only affects users that were relying on the `name` property to set their **Item ID**:* In presets, the **Item ID** property is now determined differently - in the default settings, the `asset_id` property (or `sku` for Ecommerce events) is now used as the fallback instead of `name`. The `name` property is never used by default, as it may not conform to the required **Item ID** format. Additionally, the property `content_asset_id` (or the first ID in `content_asset_ids`) is now the default **Item ID** only in Video events, where they are always present. 
