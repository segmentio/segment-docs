---
title: Engage Events Source
plan: engage-premier
---

Use the Engage Events Source to sync Engage subscription states to downstream Destinations.

## Update downstream subscription states

With Twilio Engage, you can [set and update user subscription states](/docs/engage/user-subscriptions/set-user-subscriptions/) with a [CSV file upload](/docs/engage/profiles/csv-upload/) or, programmatically, [using Segment APIs](/docs/engage/user-subscriptions/set-user-subscriptions/#manage-user-subscriptions-with-segment-apis).

As part of Engage, Segment creates an Engage Events Source that lets you sync subscription states and marketing analytics events [to connected Destinations](/docs/connections/destinations/). When a subscription state changes, Segment sends an update to the Destination. As a result, the subscription states stored in your Destination(s) can serve as a single source of truth for managing user consent in other tools that you may have connected to the Destination.

## Working with Engage Events Sources

Segment generates Engage Sources automatically. To find your Engage Events Sources in your workspace navigate to **Connections > Sources** and select **Engage Events**.

If you have Engage messaging services set up, you can also find Engage sources in two ways:

- Navigate to **Engage > Audiences** and click **Add a destination** from the Audiences overview page.
- Navigate to **Engage > Channels Settings** and add your Engage source from the **Engage Events source** section.


 Segment sets a `Generated` status to Engage Sources in the **Statuses** column of the **My Sources** table. <br />From the **My Sources** table, you can select the Engage Source to add a Destination and configure the Source's settings. If you have more than one Engage space, Segment creates a separate Source for each space.
