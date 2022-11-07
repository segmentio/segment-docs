---
title: 'Vero Source'
id: FOkpxVzfJJ
---
{% include content/source-region-unsupported.md %}

Vero is an email marketing tool that lets you set up automated emails to your users that get sent after they've completed certain actions. [Visit Website](http://getvero.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners)

Take your company's email analysis to the next level by **adding Vero as a Source to Segment.** Segment automatically  collects email events like `Email Delivered` and `Email Opened`, forward them to your destinations, and load them into your data warehouse. 

In your favorite BI or analytics tool, you'll be able to analyze your email campaigns in SQL or through drag-and-drop reports. And, you'll be able to join your Vero data with the event data you're already sending through Segment to analyze the down-funnel effects of your emails. 

## Getting Started

If you have previously enabled sending email events using the Vero destination during our beta (using a project write key), you do not need to create new Vero source. Your email data will continue to flow as normal.

1. From your workspace's `segment.com/<your-workspace>/sources page`, click `Add source`.

2. Choose Vero.

3. Give the Source a name and add any labels to help you organize and filter your sources. You can give the source any name, but Segment recommends a name that reflects the source itself, as this name autopopulates the schema name. For example, the source name  `Vero` creates the schema `vero`.

4. The next page ("Overview") will surface your **Segment write key for Vero.** Copy this write key. 

5. To finish the setup, you'll have to go into your Vero account and enter this Segment write key in their integrations settings. Find the right place in Vero by clicking [Integrations](https://app.getvero.com/settings/integrations?integrations=all) > Segment.

6. Click **Save**.

7. In Segment, click into your Vero Source in `segment.com/<your-workspace>/sources`. From there you'll be able to add Destinations where you want to see email events.

That's it! As you send emails, events will now be sent to your destinations and automatically loaded into any warehouses you have enabled. 

## Components

**Stream**

Vero uses our stream Source component to send Segment email events. It uses a server-side `track` method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL. 

The default behavior is for Vero to pass the `userId` associated with the email recipient as the `userId`. There are cases in which Vero does not have an associated `userId`, in which case the email address will be passed in as the `anonymousId`. 

## Collections

Collections are the groupings of data we pull from your Source. In your warehouse, each collection gets its own table, as well as a `tracks` table that aggregates all the events into a single table. 

<table>
  <tr>
    <td>**Collection**</td>
    <td>**Type**</td>
    <td>**Description**</td>
  </tr>
  <tr>
    <td>Email Sent</td>
    <td>Event</td>
    <td>Message has been sent from the Vero servers</td>
  </tr>
  <tr>
    <td>Email Delivered</td>
    <td>Event</td>
    <td>Message has been successfully delivered to the receiving server</td>
  </tr>
  <tr>
    <td>Email Opened</td>
    <td>Event</td>
    <td>Recipient has opened the HTML message. You need to enable Open Tracking for getting this type of event</td>
  </tr>
    <tr>
    <td>Email Link Clicked</td>
    <td>Event</td>
    <td>Recipient clicked on a link within the message. You need to enable Click Tracking for getting this type of event</td>
  </tr>
    <tr>
    <td>Email Unsubscribed</td>
    <td>Event</td>
    <td>Recipient clicked on message's subscription management link</td>
  </tr>
    <tr>
    <td>Email Bounced</td>
    <td>Event</td>
    <td>Receiving server could not or would not accept message</td>
  </tr>
    <tr>
    <td>Email Marked as Spam</td>
    <td>Event</td>
    <td>Recipient marked message as spam</td>
  </tr>
</table>

<!-- Example: To query the Email Delivered table, you'd write a query like this:

```sql
select *
from activecampaign.email_delivered
```


<table>
</table> -->

## Send data to Vero

The Vero Source works better when you also connect Vero as a destination. With the Vero **Destination**, you can use Segment to send Vero user and event data from which you trigger email campaigns. Want to start sending website or mobile data to Vero? Head on over to our [Vero destination docs](/docs/connections/destinations/catalog/vero/).
