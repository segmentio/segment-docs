---
title: Klenty Source
beta: true
id: D6h3UEduNW
---
{% include content/source-region-unsupported.md %}

[Klenty](https://www.klenty.com/) helps sales teams to send personalized emails and automated follow-ups at scale. With Klenty, your sales team can completely automate their email outreach and focus on closing more deals.

This source is maintained by Klenty. For any issues with the destination, [contact the Klenty Support team](mailto:support@klenty.com).

{% include content/beta-note.md %}

## Getting Started

1. From your Segment UI's Sources page click on "Add Source".
2. Search for "Klenty" within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the set up flow to "Add Source". The nickname is a label used in the Segment interface, and Segment creates a related schema name which you query against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (Eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Copy the Write key from the Segment UI and log in to your Klenty account - navigate to Settings > Integrations > Segment Integration and paste the key to connect.

## Events

Below is a table of events that Klenty sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations. Klenty will send through the `userId` if available.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>Email Sent</td>
   <td>Email has been sent successfully</td>
  </tr>
  <tr>
   <td>Email Opened</td>
   <td>Prospect has opened the email</td>
  </tr>
  <tr>
   <td>Link Clicked</td>
   <td>Prospect has clicked the tracking link</td>
  </tr>
  <tr>
   <td>Email Replied</td>
   <td>Prospect has replied to the email sent</td>
  </tr>
  <tr>
   <td>Email Bounced</td>
   <td>Email was rejected by the email servers</td>
  </tr>
  <tr>
   <td>Email Unsubscribed</td>
   <td>Prospect has clicked the unsubscribe link</td>
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
   <td>Email event type</td>
  </tr>
  <tr>
   <td>`userId`</td>
   <td>Prospect email ID</td>
  </tr>
  <tr>
   <td>`email_id`</td>
   <td>ID of the email</td>
  </tr>
  <tr>
   <td>`fromId`</td>
   <td>Sender email ID</td>
  </tr>
  <tr>
   <td>`email_subject`</td>
   <td>Subject line of the email</td>
  </tr>
  <tr>
   <td>`link`</td>
   <td>URL of the link clicked</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the Klenty team](mailto:support@klenty.com).
