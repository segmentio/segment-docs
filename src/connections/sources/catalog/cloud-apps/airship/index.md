---
title: Airship Source
beta: true
id: 85V0O2lkFs
---
{% include content/source-region-unsupported.md %}

[Airship](https://www.airship.com) gives brands the data, channels, orchestration and services they need to deliver push notifications, emails, SMS, in-app messages, and more to the right person at the right moment — building trust, boosting engagement, driving action and growing value.

Real-Time Data Streaming automatically collects user-level data and sends the data to Segment for analysis or action through other Destination integrations. At Airship, we understand that seamlessly tying data across platforms can be a complex task. This integration removes the development so users can get back to understanding their audience and reaching them on their preferred channel.

This Source integration is maintained by Airship. For any issues with the source, [contact the Airship Support team](mailto:support@airship.com).

> success ""
> **Good to know**: This page is about the Airship Segment source, which sends data _into_ Segment. There's also a page about the [Airship Segment destination](/docs/connections/destinations/catalog/airship/), which receives data from Segment!

{% include content/beta-note.md %}



## Getting Started

1. From your Segment UI's Sources page click on "Add Source".
2. Search for Airship within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the set up flow to "Add Source". The nickname will be used to designate the source in the Segment interface, and Segment will create a related schema name. The schema name is the namespace you'll be querying against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Copy the Write key from the Segment UI and log in to your Airship account - navigate to Settings > Real-Time Data Stream > Segment and follow the steps for configuration.


## Events

Below is a table of events that Airship sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations. Airship will send through the `userId` if available.

<table>
  <tr>
    <td>Attribute Operation</td>
    <td>Indicates a change in the device's attributes. Because attribute operations are related to a device they have a *device* field.</td>
  </tr>
  <tr>
   <td>Open</td>
   <td>Occurs when a user opens your app.</td>
  </tr>
  <tr>
   <td>Close</td>
   <td>Occurs when a user closes the app. Close events are often latent, as they aren't sent back to Airship until the user activates the app again.</td>
  </tr>
  <tr>
   <td>Custom Event</td>
   <td>Represents custom events that are either emmitted from the Airship SDK or submitted through the Custom Events API. </td>
  </tr>
  <tr>
   <td>Screen Viewed</td>
   <td>Occurs when a user has finished viewing a screen within the app.</td>
  </tr>
  <tr>
   <td>Send</td>
   <td>Occurs whenever a push notification is sent to a device identified in the audience selector of a message.</td>
  </tr>
  <tr>
   <td>Control</td>
   <td>Occurs when a device is excluded from a push because it was arbitrarily selected as a member of a control group.</td>
  </tr>
  <tr>
   <td>Tag Change</td>
   <td>Occurs when tags are added or removed for a user.</td>
  </tr>
   <tr>
   <td>First Open</td>
   <td>This event occurs when a user opens an Airship-integrated app for the first time.</td>
  </tr>
   <tr>
   <td>First Opt-in</td>
   <td>This event appears in the stream when a channel is first opted in. This event is specific to email (commercial), sms and open channels.</td>
  </tr>
    <tr>
   <td>Uninstall</td>
   <td>Occurs when a user uninstalls an Airship-integrated app in response to a push.</td>
  </tr>
    <tr>
   <td>In-App Message Expiration, Resolution, Display Events</td>
   <td>Occurs when an in-app message expires, resolved, and displayed to a user. </td>
  </tr>
   <tr>
   <td>Message Center Read, Delivery, Delete Events</td>
   <td>Occurs when a Message Center message is read, deleted, or delivered to a users inbox. </td>
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
   <td>`airship_offset`</td>
   <td>An identifier of a location in the stream; used to resume the stream after severing a connection.</td>
  </tr>
  <tr>
    <td>`anonymousId`</td>
    <td>The channel identifier.</td>
  </tr>
  <tr>
   <td>`background_push_enabled`</td>
   <td>Indicates whether or not the device has background push notifications enabled.</td>
  </tr>
  <tr>
   <td>`body_session_id`</td>
   <td>Represents the "session" of user activity. Absent if the application was initialized while backgrounded.</td>
  </tr>
  <tr>
   <td>`body_source`</td>
   <td>The event source. Possible values: `SDK`, `API`. The event source. `SDK` indicates an event sent from the UA SDK. `API` indicates an event created by request against the Server Side Custom Events API.</td>
  </tr>
  <tr>
   <td>`location_permission`</td>
   <td>Possible values: `SYSTEM_LOCATION_DISABLED`, `NOT_ALLOWED`, `ALWAYS_ALLOWED`, `FOREGROUND_ALLOWED`, `UNPROMPTED`</td>
  </tr>
  <tr>
   <td>`messageId`</td>
   <td>Uniquely identifies the Airship event.</td>
  </tr>
  <tr>
   <td>`push_opt_in`</td>
   <td>Indicates whether or not the device is opted into push notifications.</td>
  </tr>
  <tr>
   <td>`ua_sdk_version`</td>
   <td>The version of the Airship SDK used in the app.</td>
  </tr>
  <tr>
   <td>`userId`</td>
   <td>The named user identifier for the device.</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

For any issues with the Source events, [contact the Airship team](mailto:partner-integration-ua@airship.com).
