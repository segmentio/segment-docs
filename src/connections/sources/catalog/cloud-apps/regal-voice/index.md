---
title: Regal Voice Source
source-type: event
---

[Regal Voice](https://regalvoice.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a next-gen customer engagement platform built for B2C services brands to proactively reach out to customers on voice and sms before they buy elsewhere.

This source is maintained by Regal Voice. For any issues with the source, [contact the Regal Voice Support team](mailto:support@regalvoice.com).

> success ""
> **Good to know**: This page is about the Regal Voice Segment source, which sends data _into_ Segment. There's also a page about the [Regal Voice Segment destination](/docs/connections/destinations/catalog/regal-voice/), which receives data from Segment!

## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "Regal Voice" in the Sources Catalog, select click Regal Voice, and click **Add Source**.
3. On the next screen, give the Source a nickname and configure any other settings.

   The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse.  The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
5. Click **Add Source** to save your settings.
6. Copy the Write key from the Segment UI and email it to support@regalvoice.com.

## Events

The table below lists events that Regal Voice sends to Segment. These events appear as tables in your warehouse and as regular events in other Destinations. Regal Voice includes the `userId` if available.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>contact.subscribed</td>
   <td>A contact was subscribed to a marketing channel</td>
  </tr>
  <tr>
   <td>contact.unsubscribed</td>
   <td>A contact was unsubscribed from a marketing channel</td>
  </tr>
    <tr>
   <td>sms.queued</td>
   <td>An sms was queued to be sent from RegalVoice to contact</td>
  </tr>
    <tr>
   <td>sms.sent</td>
   <td>An sms was sent from RegalVoice to contact</td>
  </tr>
    <tr>
   <td>sms.undelivered</td>
   <td>An sms was undelivered from RegalVoice to contact</td>
  </tr>
    <tr>
   <td>sms.received</td>
   <td>An sms was received from a contact</td>
  </tr>
    <tr>
   <td>task.created</td>
   <td>A call or sms task was created</td>
  </tr>
    <tr>
   <td>sms.conversation_completed</td>
   <td>An SMS conversation between a contact and an agent was completed in the Regal Voice agent desktop</td>
  </tr>
    <tr>
   <td>call.completed</td>
   <td>An inbound or outbound call with a contact was completed. This includes calls that were not answered</td>
  </tr>
</table>

## Event Properties

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`call_id`</td>
   <td>Task Id for the call</td>
  </tr>
  <tr>
   <td>`campaign_id`</td>
   <td>Campaign Id</td>
  </tr>
  <tr>
   <td>`campaign_friendly_id`</td>
   <td>Campaign Friendly Id as seen in the App</td>
  </tr>
  <tr>
   <td>`campaign_name`</td>
   <td>Campaign Name</td>
  </tr>
  <tr>
   <td>`channel`</td>
   <td>The marketing channel: "voice" or "sms"</td>
  </tr>
  <tr>
   <td>`completed_at`</td>
   <td>UTC Timestamp when the task was completed</td>
  </tr>
  <tr>
   <td>`contact_phone`</td>
   <td>Phone number of the contact</td>
  </tr>
  <tr>
   <td>`content`</td>
   <td>Content of the message</td>
  </tr>
  <tr>
   <td>`direction`</td>
   <td>INBOUND or OUTBOUND</td>
  </tr>
  <tr>
   <td>`disposition`</td>
   <td>Task disposition</td>
  </tr>
  <tr>
   <td>`email`</td>
   <td>The last email associated with the contact</td>
  </tr>
  <tr>
   <td>`ended_at`</td>
   <td>UTC timestamp when the conversation was ended</td>
  </tr>
  <tr>
   <td>`from_number`</td>
   <td>Phone number that sent the message</td>
  </tr>
  <tr>
   <td>`handle_time`</td>
   <td>Full duration task was being handled, including talk time and wrap time (completed_at - started_at<td>
  </tr>
  <tr>
   <td>`ip`</td>
   <td>The IP address from where the subscription update was initiated.</td>
  </tr>
  <tr>
   <td>`media_url`</td>
   <td>Media URL (if it was an MMS)</td>
  </tr>
  <tr>
   <td>`notes`</td>
   <td>Task notes</td>
  </tr>
  <tr>
   <td>`objections`</td>
   <td>Task objections</td>
  </tr>
  <tr>
   <td>`phone`</td>
   <td>The phone number the subscription update was applied to. Phone number is the unique identifier for a contact in Regal Voice</td>
  </tr>
  <tr>
   <td>`queue`</td>
   <td>Task Queue</td>
  </tr>
  <tr>
   <td>`regal_voice_phone`</td>
   <td>RegalVoice phone number</td>
  </tr>
  <tr>
   <td>`scheduling_agent_fullname`</td>
   <td>Full name of the agent who scheduled the Callback</td>
  </tr>
  <tr>
   <td>`scheduling_agent_id`</td>
   <td>Email of the agent who scheduled the Callback</td>
  </tr>
  <tr>
   <td>`sms_conversation_id`</td>
   <td>Task ID for the conversation. (If the sms was part of a two-way conversation with an Agent, rather than just an automated outbound sms)</td>
  </tr>
  <tr>
   <td>`source`</td>
   <td>Source of the subscription update.
   A source value that starts with "Brand." indicates that the subscription update was initiated by the Brand (outside of the Regal Voice platform).
   A source value that starts with "RegalVoice." indicates that the supscription update was initiated through the Regal Voice platform. </td>
  </tr>
  <tr>
   <td>`started_at`</td>
   <td>UTC timestamp when the conversation was started<td>
  </tr>  
  <tr>
   <td>`talk_time`</td>
   <td>Duration of conversation (ended_at - started_at)<td>
  </tr>
  <td>`target_agent_fullname`</td>
   <td>Full name of the agent who contact (and all contact’s tasks) are assigned to</td>
  </tr>
  <tr>
   <td>`target_agent_id`</td>
   <td>Email of the agent who contact (and all contact’s tasks) are assigned to</td>
  </tr>
  <tr>
   <td>`task_id`</td>
   <td>Unique identifier for the task. Will match the call_id or sms_conversation_id of a completed task event.</td>
  </tr>
  <tr>
   <td>`text`</td>
   <td>The exact text the contact was presented for opt in</td>
  </tr>
  <tr>
   <td>`timestamp`</td>
   <td>Unix timestamp for when the event took place</td>
  </tr>
  <tr>
   <td>`to_number`</td>
   <td>Phone number to which the message was sent</td>
  </tr>
  <tr>
   <td>`type`</td>
   <td>Task Type</td>
  </tr>
  <tr>
   <td>`wrapup_time`</td>
   <td>Duration task was in wrap up (completed_at - ended_at)</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Regal Voice support team](mailto:support@regalvoice.com).
