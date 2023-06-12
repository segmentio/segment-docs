---
title: "GWEN Webhooks Source"
id: vMEJCURfHh
---

[GWEN Webhooks](https://gwenplatform.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="blank"} offers powerful gamification tools and insights to convert, engage, and retain users. With GWEN it has never been easier to understand your users behavior patterns and build better performing products with both speed and accuracy.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Insert Coin AB. For any issues with the source, [contact their Support team](mailto:support@gwenplatform.com).

> info ""
> The GWEN Webhooks Source is currently in beta, which means that the GWEN support team is actively developing the source. This doc was last updated on May 3rd, 2023. If you're interested in joining the beta program or have any feedback to help improve the GWEN Webhooks Source and its documentation, [let the GWEN support team know](mailto:tech@gwenplatform.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "GWEN Webhooks" in the Sources Catalog, select GWEN Webhooks, and click **Add Source**.
3. On the next screen, give the Source a nickname and configure any other settings.
   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (for example, SourceName_Prod, SourceName_Staging, or SourceName_Dev).
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to your GWEN account.
6. Navigate to [Setup Management > Webhooks](http://app.gwenplatform/setup-management/webhooks){:target="blank"} and click the **Set credentials** button next to **Segment Source webhooks**. Paste the key to connect.

## Stream

GWEN Webhooks uses a stream Source component to send Segment event data. It uses a server-side (select from `track`, `identify`, `page`, `group`) method(s) to send GWEN user data to Segment (Read more about GWEN webhook data [here](app.gwenplatform.com/docs/webhooks/segment)). These events are then available in any destination that accepts server-side events, and also available in a schema in your data warehouse, so you can query using SQL.

The default behavior is for GWEN Webhooks to pass the userId associated with the user who triggered the given update. This may or may not be a userId that you are keeping track of, depending on under what circumstances the user has been created within GWEN.
For example, users created anonymously by using the [GWEN Analytics script](https://app.gwenplatform.com/docs/gwen-analytics){:target="blank"} will likely have a userId unknown to you.

## Events

The table below lists events that GWEN Webhooks sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>Achievement Update</td>
   <td>Progress was made on an Achievement</td>
  </tr>
  <tr>
   <td>Progression Update</td>
   <td>Progress was made on a Progression</td>
  </tr>
  <tr>
   <td>Mission Update</td>
   <td>Progress was made on a Mission path</td>
  </tr>
  <tr>
   <td>Shop Item Update</td>
   <td>An update related to a specific shop item</td>
  </tr>
  <tr>
   <td>Wallet Update</td>
   <td>An update related to the users wallet</td>
  </tr>
  <tr>
   <td>Webhook verification</td>
   <td>An event only used for validating the connection to Segment</td>
  </tr>
</table>

## Event Properties

The table below list the properties included in the events listed above. You can read about specific GWEN mechanic states and updates under **modules** in the [GWEN platform documentation](https://app.gwenplatform.com/docs){:target="blank"}.

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`type`</td>
   <td>GWEN webhook event type</td>
  </tr>
  <tr>
   <td>`userId`</td>
   <td>GWEN user ID</td>
  </tr>
  <tr>
   <td>`timestamp`</td>
   <td>A unix timestamp from when the event was triggered</td>
  </tr>
  <tr>
   <td>`segmentId`</td>
   <td>The ID of the GWEN segment that the user belongs to. (Nothing to do with Twilio Segment)</td>
  </tr>
  <tr>
   <td>`productId`</td>
   <td>The ID of the GWEN product that the user belongs to</td>
  </tr>
  <tr>
   <td>`state`</td>
   <td>The current user state of the given mechanic the event relates to</td>
  </tr>
   <tr>
   <td>`updates`</td>
   <td>A list of updates specific to the given mechanic that the event relates to</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving in Segment, [contact the GWEN support team](mailto:support@gwenplatform.com).
