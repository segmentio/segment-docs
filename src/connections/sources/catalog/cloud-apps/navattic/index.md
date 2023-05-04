---
title: "Navattic Source"
hidden: true
---

[Navattic](https://navattic.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a no-code tool which enables go-to-market teams to build beautiful, interactive demos of their products to excite and engage prospects.

This source is maintained by Navattic. For any issues with the source, [contact the Navattic Support team](mailto:team@navattic.com).

## Getting Started


To get started with the Navattic source:
1. Navigate to **Connections > Sources** and click **Add Source** in the Segment App. 
2. Search for "Navattic" in the Sources Catalog, select Navattic, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings.

   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to your Navattic account - navigate to Integrations > Segment and paste the key. Hit "Save" to connect.
6. Choose which Navattic events to send to Segment, as well as which demos (projects) to activate for this integration.

## Stream

Navattic uses our stream Source component to send Segment event data. It uses a server-side `track`, and `identify` methods to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

Navattic generates its own ID for each visitor to your product demo. This ID will be passed as both the `userId` and `anonymousId` when pushing Navattic events to Segment.

## Events

The table below lists possible events that Navattic sends to Segment. With the exception of IDENTIFY_USER, all events are sent to the [Tracks table in Segment](https://segment.com/docs/connections/storage/warehouses/schema/#tracks-table). Additionally, every Navattic includes the `userId` and `anonymousId` (which are the same), which are Navattic-generated for each user.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>IDENTIFY_USER</td>
   <td>A visitor submitted an email, usually through a form fill. This sends to the <a href="https://segment.com/docs/connections/storage/warehouses/schema/#identifies-table">Identifies table in Segment</a>.</td>
  </tr>
  <tr>
   <td>VIEW_STEP</td>
   <td>A visitor viewed a step in the demo</td>
  </tr>
  <tr>
   <td>START_FLOW</td>
   <td>A visitor started a flow</td>
  </tr>
  <tr>
   <td>COMPLETE_FLOW</td>
   <td>A visitor has completed a flow</td>
  </tr>
  <tr>
   <td>NAVIGATE</td>
   <td>A visitor clicked on a link from within the demo</td>
  </tr>
  <tr>
   <td>OPEN_CHECKLIST</td>
   <td>A visitor expanded a checklist</td>
  </tr>
  <tr>
   <td>CLOSE_CHECKLIST</td>
   <td>A visitor collapsed a checklist</td>
  </tr>
  <tr>
   <td>COMPLETE_TASK</td>
   <td>A visitor completed a checklist task</td>
  </tr>
  <tr>
    <td>CONVERTED</td>
    <td>A visitor viewed a step tagged "Mark as converted"</td>
  </tr>
</table>

## Event Properties

The table below list the properties included in the events listed above.

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>project</td>
   <td>An object containing the demo's (project's) ID and name.</td>
  </tr>
  <tr>
   <td>checklist</td>
   <td>An object containing the checklist's ID and name. Populated only if the demo contains a checklist</td>
  </tr>
  <tr>
   <td>flow</td>
   <td>An object containing the current flow's ID and name.</td>
  </tr>
  <tr>
   <td>step</td>
   <td>An object containing the current flow step's ID, name, and index (<code>step.indx</code>)</td>
  </tr>
  <tr>
   <td>session_id</td>
   <td>A string that uniquely identifies this visitor's current session</td>
  </tr>
  <tr>
   <td>url</td>
   <td>If the event is NAVIGATE, then this property contains the URL of the link that the visitor clicked on. Otherwise, it is empty.</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Navattic support team](mailto:team@navattic.com).
