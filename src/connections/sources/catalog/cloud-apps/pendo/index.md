---
title: Pendo Source
id: lWnQVj7Zo4
---
{% include content/source-region-unsupported.md %}

[Pendo](https://pendo.io) is a product cloud that helps product teams deliver software users love. With Pendo, product teams can understand product usage, collect feedback, measure NPS, onboard users, and announce new features in app—all without requiring engineering resources.

This source is maintained by Pendo. For any issues with the source, [contact the Pendo Support team](mailto:integrations@pendo.io).

*NOTE: The Pendo Source will continue to be adding new events sources as it is still in active development. If you have any feedback to help improve the Pendo Source and its documentation, [let the Pendo Support team know](mailto:integrations@pendo.io)!*

## Getting Started

1. From your Segment UI's Sources page click on "Add Source".
2. Search for "Pendo" within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the set up flow to "Add Source". The nickname will be used to designate the source in the Segment interface, and Segment will create a related schema name. The schema name is the namespace you'll be querying against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (eg. Pendo_Prod, Pendo_Staging, Pendo_Dev).
4. Copy the Write Key from the Segment UI.
5.  Log in to your Pendo subscription - navigate to Settings > Integrations > Webhooks.
6. Select "Add Webhook".
7. Give it a name, select "Segment" in the Type dropdown menu, and paste your Segment Write Key into the textbox.
8. Select the events you want to send to Segment.
9. Make sure your webhook is marked as Active and Click "Save".

## Events

Below is a table of events that Pendo can send to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations. Pendo will send through the `userId` (in Pendo this is the `visitorId`) if available.

| Event                         | Description |
|-------------------------------|-------------|
| `accountCreated`              | A new account was created (coming soon!) |
| `guideDisplayed`              | A guide was displayed |
| `npsDisplayed`                | An NPS survey was displayed |
| `npsSubmitted`                | An NPS survey was submitted |
| `pollDisplayed`               | A poll was displayed |
| `pollSubmitted`               | A poll was submitted |
| `trackEventReceived`          | A track event was received |
| `visitorCreated`              | A new visitor was created (coming soon!) |

## Event Properties

These are the common properties for all Pendo events.  The `properties` section of each event contains the detailed information specific to that event type.

| Common Properties             | Properties common to all event types |
|-------------------------------|--------------------------------------|
| `event`              | e.g. `guideSeen` |
| `userId`             | Value of the Visitor Id in Pendo |
| `properties`         | Collection of key/value data specific to each event |

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the Pendo team](mailto:integrations@pendo.io).
