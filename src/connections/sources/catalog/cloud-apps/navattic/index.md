---
title: Navattic Source
id: 8aF29Uq46F
---

[Navattic](https://navattic.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a no-code tool which enables go-to-market teams to build beautiful, interactive demos of their products to excite and engage prospects.

This source is maintained by Navattic. For any issues with the source, [contact the Navattic Support team](mailto:team@navattic.com).

## Getting Started

To get started with the Navattic source:
1. Navigate to **Connections > Sources** and click **Add Source** in the Segment App. 
2. Search for *Navattic* in the Sources Catalog, and select the Navattic tile, and click **Add Source**.
3. Give the Source a nickname and configure any other settings.
   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (for example: SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to your Navattic account. Navigate to **Integrations > Segment** and paste the key.
6. Optionally, select either the US (default) or EU region for your events.
7. Click **Save** to connect.
8. Choose which Navattic events to send to Segment, as well as which demos (projects) to activate for this integration.

## Stream

Navattic uses the stream Source component to send Segment event data. It uses server-side Track and Identify methods to send data to Segment. These events are then available both in destinations that accepts server-side events and in a schema in your data warehouse, so you can query using SQL.

Navattic generates its own ID for each visitor to your product demo. This ID passes as the `userId` when pushing Navattic events to Segment.

## Events

The table below lists possible events that Navattic sends to Segment. With the exception of IDENTIFY_USER, all events are sent to the [Tracks table in Segment](/docs/connections/storage/warehouses/schema/#tracks-table). Additionally, every Navattic event includes the `userId`, which is Navattic-generated for each user.

Event Name | Description | 
------------ | ------------|
IDENTIFY_USER | A visitor submitted an email, usually through a form fill. This sends to the [Identifies table](/docs/connections/storage/warehouses/schema/#identifies-table) in Segment.
VIEW_STEP | A visitor viewed a step in the demo.
START_FLOW | A visitor started a flow.
COMPLETE_FLOW | A visitor has completed a flow.
NAVIGATE | A visitor clicked on a link from within the demo.
OPEN_CHECKLIST | A visitor expanded a checklist.
CLOSE_CHECKLIST | A visitor collapsed a checklist.
COMPLETE_TASK | A visitor completed a checklist task.
CONVERTED | A visitor viewed a step tagged *Mark as converted*.

## Event Properties

The table below lists the properties included in the events listed above.

Property Name | Description
--------------- | ------------
project | An object containing the demo's (project's) ID and name.
checklist | An object containing the checklist's ID and name. Populated only if the demo contains a checklist.
flow | An object containing the current flow's ID and name.
step | An object containing the current flow step's ID, name, and index (`step.indx`)
session_id | A string that uniquely identifies this visitor's current session.
url | If the event is NAVIGATE, then this property contains the URL of the link that the visitor clicked on. Otherwise, it is empty.


## Adding Destinations

Once your Source is set up, you can connect it with Destinations.

Log in to your downstream tools and check to see that your events appear as expected and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Navattic support team](mailto:team@navattic.com).
