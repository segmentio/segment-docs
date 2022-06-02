---
title: 'Klaviyo Source'
id: EfKbe2yt0J
---
{% include content/source-region-unsupported.md %}

Klaviyo is an email marketing platform that helps companies make more money. It lets you send personalized newsletters, triggered emails, product recommendations, push notifications and sync your data to facebook custom audiences. [Visit Website](https://www.klaviyo.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners)

Take your company's email analysis to the next level by **adding Klaviyo as a Source to Segment.** Segment automatically  collects email events like `Email Delivered` and `Email Opened`, forward them to your destinations, and load them into your data warehouse. 

In your favorite BI or analytics tool, you'll be able to analyze your email campaigns in SQL or through drag-and-drop reports. And, you'll be able to join your Klaviyo data with the event data you're already sending through Segment to analyze the down-funnel effects of your emails. 


## Getting Started

If you have previously enabled sending email events using the Klaviyo destination during our beta (using a project write key), you do not need to create new Klaviyo source. Your email data will continue to flow as normal.

1. From your workspace's `segment.com/<your-workspace>/sources page`, click `Add source`.

2. Choose Klaviyo.

3. Give the Source a nickname and a schema name. The nickname is a label used in the Segment interface, and the schema name is the namespace you query against in your warehouse. You can name them however you'd like, but we recommend sticking to something that reflects the Source itself, like `Klaviyo` for nickname and `klaviyo` for the schema name.

4. The next page ("Overview") will surface your **Segment write key for Klaviyo.** Copy this write key. 

5. To finish the setup, you'll have to go into your Klaviyo account and enter this Segment write key in their integrations settings. Find the right place in Klaviyo by clicking [Integrations > Segment](https://www.klaviyo.com/integration/segment_io).

6. Click **Save**.

7. In Segment, click into your Klaviyo Source in `segment.com/<your-workspace>/sources`. From there you'll be able to add Destinations where you want to see email events.

That's it! As you send emails, events will now be sent to your destinations and automatically loaded into any warehouses you have enabled. 

## Components

**Stream**

Klaviyo uses our stream Source component to send Segment email events. It uses a server-side `track` method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL. 

The default behavior is for Klaviyo to pass the `userId` associated with the email recipient as the `userId`. There are cases in which Klaviyo does not have an associated `userId`, in which case the email address will be passed in as the `anonymousId`. 

## Collections

Collections are the groupings of data we pull from your Source. In your warehouse, each collection gets its own table, as well as a `tracks` table that aggregates all the events into a single table. 

<table>
  <tr>
    <td>**Collection**</td>
    <td>**Type**</td>
    <td>**Description**</td>
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
from klaviyo.email_delivered
```


<table>
</table> -->

## Send data to Klaviyo

The Klaviyo Source works better when you also connect Klaviyo as a destination. With the Klaviyo **Destination**, you can use Segment to send Klaviyo user and event data from which you trigger email campaigns. Want to start sending website or mobile data **_TO_** Klaviyo? Head on over to our [Klaviyo destination docs](/docs/connections/destinations/catalog/klaviyo/).

## Preventing Duplication in Segment

Navigate to the integration settings for the Segment Integration in [Klaviyo](https://www.klaviyo.com/integrations).

Here is where you also have the ability to limit the data you pass back to Segment, by checking the box next to Do not sync profiles that are not updated by the Klaviyo Destination.

As noted in the Overview, this integration now supports the ability to pass information back and forth between Segment and Klaviyo, using a unique ID to keep track of which profiles are originally from Segment. If you have multiple integrations enabled in Klaviyo, there is a possibility that the same customer will interact with you from two separate sources, and as a result, this customer will end up with duplicated profiles in Klaviyo.

To help avoid this duplication of profiles in Segment, you can check the box above, which will limit the profiles Klaviyo syncs with Segment to only the profiles originally created in Segment.

Once you've selected the settings you would like to enable, click Update Segment Settings to complete the integration.