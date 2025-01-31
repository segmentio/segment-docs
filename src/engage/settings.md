---
title: Engage Settings
---

The **Engage settings** tab contains key information about the services you've connected to your Engage space.

## Channels settings

The Engage settings **Channels** tab shows the credentials that you used to connect Engage with the SendGrid and Twilio services that power [Engage campaigns](/docs/engage/campaigns/).

To change the SendGrid or Twilio accounts associated with your Channels campaigns, select the pencil icon next to the service you need to modify. Engage then displays the email or SMS service setup screen with the fields that you'll need to edit.

If you see no credentials listed under the Channels tab, it means you've not yet [set up Channels](/docs/engage/#market-to-customers-with-engage-premier-and-channels); refer to the [Twilio Engage onboarding page](/docs/engage/onboarding/) for instructions on how to connect Engage to both Twilio and SendGrid.

## Destinations settings

The **Destinations** tab lists the downstream tools receiving your Engage data. Selecting a destination from the list gives you a detailed view of the audiences, computed traits, and journeys that Segment sends to the destination.

To add a destination, select the **+ Add destination** button, or navigate to **Connections > Destinations** within your Segment workspace. To learn more about sending Engage information to Segment destinations, view the [Using Engage Data](/docs/engage/using-engage-data/) documentation.

You can delete a destination from the Destinations tab in the Engage settings (**Engage > Engage settings > Destinations**). 

## Warehouse sources

By connecting your existing warehouses to Engage, you can import customer or account data and use it to build SQL traits. The Warehouse sources tab displays the warehouses sending data to Engage.

To add a new data warehouse, select the **+ Add warehouse source** button. For more information on working with your imported warehouse data in Engage, read the [Engage SQL traits](/docs/engage/audiences/sql-traits/) guide.

## Engage Events source

The Engage Events source lets you sync subscription states, messaging events, and marketing analytics to downstream destinations. To find your Engage Events source in your Segment workspace, navigate to **Connections > Sources** and select **Engage Events**.

For more information, view the [Engage Events Source documentation](/docs/connections/sources/catalog/cloud-apps/engage-events/).
