---
title: Pendo Source
source-type: event
---
[Pendo](https://pendo.io) is a product cloud that helps product teams deliver software users love. With Pendo, product teams can understand product usage, collect feedback, measure NPS, onboard users, and announce new features in app—all without requiring engineering resources.

This is an [Event Cloud Source](https://segment.com/docs/connections/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other Segment Destinations.

This source is maintained by Pendo. For any issues with the source, please [reach out to their team](mailto:integrations@pendo.io).

*NOTE: The Pendo Source will continue to be adding new events sources as it is still in active development. This doc was last updated on September 13, 2019. If you have any feedback to help improve the Pendo Source and its documentation, please [let their team know](mailto:integrations@pendo.io)!*

## Getting Started

1. From your Segment UI's Sources page click on "Add Source".
2. Search for "Pendo" within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the setup flow to "Add Source". The nickname will be used to designate the source in the Segment interface, and Segment will create a related schema name. The schema name is the namespace you'll be querying against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (eg. Pendo_Prod, Pendo_Staging, Pendo_Dev).
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
| `visitorCreated`              | A new visitor was created |
| `visitorMetadataUpdated`      | Visitor metadata was updated |
| `visitorDoNotProcessUpdated`  | Flag indicating GDPR status was updated |
| `accountCreated`              | A new account was created |
| `accountMetadataUpdated`      | Account metadata was updated |
| `featureClicked`              | A feature was clicked |
| `trackEventReceived`          | A track event was received |
| `guideSeen`                   | A guide was seen |
| `pollSeen`                    | A poll was seen |
| `pollSubmitted`               | A poll was submitted |
| `pageTagged`                  | A page was tagged |
| `pageUpdated`                 | A page was updated |
| `pageDeleted`                 | A page was deleted |
| `featureTagged`               | A feature was tagged |
| `featureUpdated`              | A feature was update |
| `featureDeleted`              | A feature was deleted |
| `goalCreated`                 | A goal was created |
| `goalUpdated`                 | A goal was updated |
| `goalDeleted`                 | A goal was deleted |
| `goalStatusChanged`           | A goal status was changed |
| `NPSSeen`                     | A NPS survey was seen |
| `NPSSubmitted`                | A NPS survey was submitted |
| `NPSCreated`                  | A NPS survey was created |
| `NPSUpdated`                  | A NPS survey was updated |
| `NPSDeleted`                  | A NPS survey was deleted |
| `NPSStatusChanged`            | A NPS survey status changed |
| `pollCreated`                 | A poll was created |
| `pollUpdated`                 | A poll was updated |
| `pollDeleted`                 | A poll was deleted |
| `pathCreated`                 | A path was created |
| `pathUpdated`                 | A path was updated |
| `pathDeleted`                 | A path was deleted |
| `funnelCreated`               | A funnel was created |
| `funnelUpdated`               | A funnel was updated |
| `funnelDeleted`               | A funnel was deleted |
| `userInvited`                 | A user was invited |
| `userAdded`                   | A user was added |
| `userUpdated`                 | A user was updated |
| `userDeleted`                 | A user was deleted |

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

If there are any issues with how the events are arriving to Segment, please [contact the Pendo team](mailto:integrations@pendo.io).
