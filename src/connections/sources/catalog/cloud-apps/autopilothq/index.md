---
title: Autopilot Source
---
[Autopilot](https://autopilothq.com/) makes automating customer journeys as simple as drawing on a whiteboard. Engage at just the right time with personalized emails, in-app messages, SMS, and postcards.

Take your company's email analysis to the next level by adding Autopilot as a Source to Segment. We'll automatically collect email events like Email Delivered and Email Opened, forward them to your destinations, and load them into your data warehouse.

This source is maintained by Autopilot. For any issues with the source, you may [contact their team](mailto:support@autopilothq.com).

This document was last updated on October 19, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!

## Getting Started

1. From your Segment UI's Sources page click on "Add Source".
2. Search for AutopilotHQ within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the set up flow to "Add Source". The nickname is a label used in the Segment interface, and Segment creates a related schema name, which you query against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (Eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Sign in to your Autopilot account and visit the [Segment destination](https://app.autopilothq.com/#settings/app-connections/segment-sync) to connect.

![](/docs/connections/destinations/catalog/autopilothq/images/4764ec5d9aeb26bd0e503604db243dae.gif)

## Components
**Stream**

Autopilot uses our stream Source component to send events to Segment. These events are then available in any Destination that accepts server-side events, including your data warehouse.

## Events

Below is a table of events that Autopilot sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations.

Autopilot will send the `userID` if the contact has passed through the system before using Segment; otherwise Autopilot will send the email of the contact through as `anonymousID`.

Additionally, Autopilot also sends `email` and `contact_id` under `context.traits`.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>Email Bounced</td>
   <td>Receiving server could not or would not accept message</td>
  </tr>
  <tr>
   <td>Email Delivered</td>
   <td>Message has been successfully delivered to the receiving server</td>
  </tr>
  <tr>
   <td>Email Clicked</td>
   <td>Recipient clicked on a link within the message</td>
  </tr>
  <tr>
   <td>Email Marked as Spam</td>
   <td>Recipient marked message as spam
  </td>
  </tr>
  <tr>
   <td>Email Opened</td>
   <td>Recipient has opened the HTML message</td>
  </tr>
  <tr>
   <td>Email Unsubscribed</td>
   <td>Recipient clicked on message's subscription management link</td>
  </tr>
  <tr>
   <td>Email Replied</td>
   <td>Recipient replied to the message</td>
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
   <td>`event`</td>
   <td>The email event type</td>
  </tr>
  <tr>
   <td>`campaign_id`</td>
   <td>The ID of the journey</td>
  </tr>
  <tr>
   <td>`campaign_name`</td>
   <td>The name of the journey</td>
  </tr>
  <tr>
   <td>`email_id`</td>
   <td>The ID of the  email</td>
  </tr>
  <tr>
   <td>`email_subject`</td>
   <td>The subject line of the email</td>
  </tr>
  <tr>
   <td>`transactional`</td>
   <td>Defines the email as transactional or a one time send</td>
  </tr>
  <tr>
   <td>`link_id`</td>
   <td>The ID of the link clicked in an email</td>
  </tr>
  <tr>
   <td>`link_url`</td>
   <td>The URL of the link clicked in an email</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the Autopilot team](mailto:support@autopilothq.com).

## Sending data to AutopilotHQ

The AutopilotHQ Source works better when you also connect AutopilotHQ as a Destination. With the AutopilotHQ Destination, you can use Segment to send Identify and Track calls to AutopilotHQ. Want to start sending website, mobile or server data TO AutopilotHQ? Head on over to our [AutopilotHQ destination](https://segment.com/docs/connections/destinations/catalog/autopilothq/).
