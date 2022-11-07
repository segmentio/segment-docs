---
title: Engage Events Source
plan: engage-foundations
hidden: true
---

> info ""
> The Engage Events Source is in beta.

Use the Engage Events Source to sync Engage subscription states to downstream Destinations.

## Update downstream subscription states

With Twilio Engage, you can [set and update user subscription states](/docs/engage/user-subscriptions/set-user-subscriptions/) with a [CSV file upload](/docs/engage/profiles/csv-upload/) or, programmatically, [using Segment APIs](/docs/engage/user-subscriptions/set-user-subscriptions/#manage-user-subscriptions-with-segment-apis).

As part of Engage, Segment creates an Engage Events Source that lets you sync subscription states [to connected Destinations](/docs/connections/destinations/). When a subscription state changes, Segment sends an update to the Destination. As a result, the subscription states stored in your Destination(s) can serve as a single source of truth for managing user consent in other tools that you may have connected to the Destination.

## Working with Engage Events Sources

Segment generates Engage Sources automatically. If you're using Engage, you can find the Source in your Segment space by navigating to **Connections > Sources**. Segment sets a `Generated` status to Engage Sources in the **Statuses** column of the **My Sources** table.

From the **My Sources** table, you can select the Engage Source to add a Destination and configure the Source's settings. If you have more than one Engage space, Segment creates a separate Source for each space.
