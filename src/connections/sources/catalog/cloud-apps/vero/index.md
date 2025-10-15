---
title: 'Vero Source'
id: FOkpxVzfJJ
---
{% include content/source-region-unsupported.md %}

[Vero](http://getvero.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is an email marketing tool that lets you set up automated emails to your users that get sent after they've completed certain actions.

Take your company's email analysis to the next level by **adding Vero as a source to Segment**. Segment automatically collects email events like `Email Delivered` and `Email Opened`, forwards them to your destinations, and loads them into your data warehouse. 

In a BI or analytics tool, you can analyze your email campaigns in SQL or through drag-and-drop reports. You're also able to join your Vero data with the event data that you're already sending through Segment to analyze the down-funnel effects of your emails. 

## Getting started

If you have previously enabled sending email events using the Vero destination during beta (using a project write key), you do not need to create new Vero source. Your email data will continue to flow as normal.

1. From your Segment workspace, go to **Connections > Catalog**, search for "Vero" and click **Add Source**.
2. Give the source a name and add any labels to help you organize and filter your sources. You can give the source any name, but Segment recommends a name that reflects the source itself, as this name autopopulates the schema name. For example, the source name `Vero` creates the schema `vero`.
3. In the **Overview** page, find your **Segment write key** for Vero and copy it.
4. To finish the setup, go to your Vero account, navigate to **[Integrations](https://app.getvero.com/settings/integrations?integrations=all){:target="_blank”} > Segment** and enter this Segment write key.
5. Click **Save**.
6. In Segment, click into your Vero source. Here, you can add destinations where you want to see email events.

As you send emails, events are sent to your destinations and automatically loaded into any warehouses you have enabled. 

## Components

**Stream**

Vero uses Segment's stream source component to send Segment email events. It uses a server-side `track` method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL. 

The default behavior is for Vero to pass the `userId` associated with the email recipient as the `userId`. There are cases in which Vero does not have an associated `userId`, in which case the email address will be passed in as the `anonymousId`. 

## Collections

Collections are the groupings of data pulled from your Source. In your warehouse, each collection gets its own table, as well as a `tracks` table that aggregates all the events into a single table. 

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

The Vero source works best when you also connect Vero as a destination. With the Vero destination, you can use Segment to send Vero user and event data from which you trigger email campaigns. To start sending website or mobile data to Vero, see the [Vero destination docs](/docs/connections/destinations/catalog/vero/).
