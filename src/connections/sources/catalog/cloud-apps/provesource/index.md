---
title: ProveSource Source
beta: true
id: aC11S74HWK
---
{% include content/source-region-unsupported.md %}

[ProveSource](https://provesrc.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a social proof platform, that lets you show recent activities and reviews that happen on your website - signups, purchases, positive reviews and more, this helps build trust with your visitors and ultimately increases your conversions rates.

This source is maintained by ProveSource. For any issues with the source, [contact the ProveSouce Support team](mailto:support@provesrc.com).

{% include content/beta-note.md %}


## Getting Started

1. From your Segment UI's Sources page click on "Add Source".
2. Search for "ProveSource" within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the set up flow to "Add Source". The nickname will be used to designate the source in the Segment interface, and Segment will create a related schema name. The schema name is the namespace you'll be querying against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Copy the Write key from the Segment UI and log in to your ProveSource account - navigate to [Settings](https://console.provesrc.com/#/settings) > Integrations > Click Edit next to Segment Integration and paste the key to connect.


## Events

Below is a table of events that ProveSource sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations. ProveSource will send through the `userId` if available.

<table>
  <tr>
   <td>Notification Viewed</td>
   <td>A notification has been viewed</td>
  </tr>
  <tr>
   <td>Notification Hovered</td>
   <td>The user hovered his mouse over the notification</td>
  </tr>
  <tr>
   <td>Notification Clicked</td>
   <td>The user clicked the notification</td>
  </tr>
  <tr>
   <td>Goal Completed</td>
   <td>The user has completed a goal (e.g. signed up)</td>
  </tr>
</table>

## Event Properties

Below are tables outlining the properties included in the events listed above.

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`notificationId`</td>
   <td>ID of the notification viewed/hovered/clicked</td>
  </tr>
  <tr>
   <td>`notificationName`</td>
   <td>name of the notification viewed/hovered/clicked</td>
  </tr>
  <tr>
   <td>`goalId`</td>
   <td>ID of goal completed</td>
  </tr>
  <tr>
   <td>`goalName`</td>
   <td>name of the goal completed</td>
  </tr>
  <tr>
   <td>`events`</td>
   <td>Array of notification events related to Goal Complete</td>
  </tr>
  <tr>
   <td>`events.notificationId`</td>
   <td>ID of the notification for which the event occurred before Goal Complete</td>
  </tr>
  <tr>
   <td>`events.view`</td>
   <td>true/false if the notification viewed</td>
  </tr>
  <tr>
   <td>`events.hover`</td>
   <td>true/false if the notification hovered</td>
  </tr>
  <tr>
   <td>`events.click`</td>
   <td>true/false if the notification clicked</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the ProveSource team](mailto:support@provesrc.com).
