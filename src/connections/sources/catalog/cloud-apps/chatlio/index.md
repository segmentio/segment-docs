---
title: Chatlio Source
beta: true
id: W3065KyMWF
---
{% include content/source-region-unsupported.md %}

Chatlio is a live chat tool that allows you to talk to your customers through your existing Slack service. Chatlio provides built in support for sending [chat related events](https://segment.com/docs/connections/spec/live-chat/) to Segment to give you a full picture of activity on your site including live chat. Visit [Chatlio for more info](https://chatlio.com/).

## Getting Started

1. From your workspace's `segment.com/<your-workspace>/sources` page, click Add source.
2. Choose Chatlio.
3. Give the Source a name. The name will be used to identify this source within your workspace. You can name it however you'd like, but we recommend sticking to something that reflects the Source itself, like Chatlio.
4. The next page "Overview" will surface your Segment write key for Chatlio. Copy this write key.
5. To finish the setup, you'll have to go into your [Chatlio dashboard](https://chatlio.com/app/#/login) and enter the Segment write key in the settings towards the bottom of the page.
6. Now when you go back to Segment, click into your Chatlio Source and you'll be able to add other downstream Destinations where you want to see live chat events.

That's it! As you engage with your users, events will now be sent to your destinations and automatically loaded into any warehouses you have enabled.

## Chatlio Events

Below is a table of events that Chatlio sends to Segment. These are the events that will appear in your warehouse or your destinations, depending on what connections you enable in Segment. In your warehouse, each event will get its own table, as well as a `tracks` table that aggregates all the events into a single table.

Chatlio automatically ties these events together with other activity on your site using the visitor id.

<table>
  <tr>
    <td>**Event Name**</td>
    <td>**Description**</td>
  </tr>
  <tr>
    <td>Live Chat Conversation Started</td>
    <td>A Live Chat Conversation has started.</td>
  </tr>
  <tr>
    <td>Live Chat Conversation Ended</td>
    <td>A Live Chat Conversation has ended.</td>
  </tr>
    <tr>
    <td>Live Chat Message Sent</td>
    <td>A Live Chat Message has been sent.</td>
  </tr>
    <tr>
    <td>Live Chat Message Received</td>
    <td>The Live Chat Message was received.</td>
  </tr>
</table>

## Chatlio Event Properties

Below is a table of properties that are sent for the events above:

<table>
  <tr>
   <td>Property Name</td>
   <td>Type</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`agent_id`</td>
   <td>string</td>
   <td>The Chatlio Agent ID.</td>
  </tr>
  <tr>
   <td>`agent_name`</td>
   <td>string</td>
   <td>The Chatlio Agent Name.</td>
  </tr>
  <tr>
   <td>`agent_username`</td>
   <td>string</td>
   <td> The Chatlio Agent Username.</td>
  </tr>
  <tr>
   <td>`conversation_duration`</td>
   <td>Integer</td>
   <td>The duration of the conversation in seconds.</td>
  </tr>
  <tr>
   <td>`conversation_id`</td>
   <td>string</td>
   <td>The Chatlio conversation ID.</td>
  </tr>
  <tr>
   <td>`message_id`</td>
   <td>string</td>
   <td>The Chatlio message ID.</td>
  </tr>
</table>
