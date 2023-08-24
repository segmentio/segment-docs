---
title: Unlocking Simulation Source
id: l5eaZFs2Mj
private: true
hidden: true
---


Unlocking Simulation(https://unlockingproducts.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} lets you create realistic simulated Segment events that mirror customer interactions with your application. This can help you analyze user behavior, test various scenarios, and optimize your tracking and analytics setup.


This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) that can not only export data into your Segment warehouse but also federate the exported data into your other enabled Segment Destinations.


[Unlocking Growth](https://unlockinggrowth.co){:target="_blank"} maintains this destination. For any issues with the source, [contact their Support team](mailto:support@unlockinggrowth.co).

> info "Beta source"
> The Unlocking Simulation Source is currently in beta, which means that they are still actively developing the source. If you're interested in joining their beta program or have any feedback to help improve the Unlocking Simulation Source and its documentation, [let their team know](mailto:support@unlockinggrowth.co).

## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"}, click **Add Source**.
2. Search for **Unlocking Simulation** in the Sources Catalog, select Unlocking Simulation, and click **Add Source**.
3. On the next screen, give the source a nickname name and configure any other settings.
   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommend using something that reflects the source itself and distinguishes amongst your environments (for example, `SourceName_Prod`, `SourceName_Staging`, `SourceName_Dev`).
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to your Unlocking Simulation account. 
6. Navigate to **Settings > Integrations > Segment Integration** and paste the key to connect.

## Stream

Unlocking Simulation uses the stream source component to send Segment event data. The source uses server-side (`track`, `identify`, `page`, `group`) method(s) to send data to Segment. These events are then available in any destination that accepts server-side events, as well as in a data warehouse schema that you can query against using SQL.

As part of the simulated events, Unlocking Simulation generates fake userIds and emails and includes them in the relevant traits and track events.

## Events

The events generated into Segment are based on what you configure within Unlocking Simulation.  If, for example, you have set up Unlocking Simulation to generate a "Login" event for each new user on a daily basis, then that event will be generated into Segment.

## Event Properties

Similarly to Events, the Event Properties that Unlocking Simulation generates are entirely based on what you configure within the simulator.  All property types are supported.

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools to verify that your events appear as expected and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the destination docs for each tool for troubleshooting.

If you experience issues with how events arrive to Segment, [contact the Unlocking Simulation support team](mailto:support@Unlocking Simulation.com).