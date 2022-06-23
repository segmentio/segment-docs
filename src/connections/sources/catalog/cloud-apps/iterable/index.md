---
title: 'Iterable Source'
id: lI8p2ldOqa
---
{% include content/source-region-unsupported.md %}

Iterable is the growth marketing platform that enables brands to create, execute and optimize campaigns to power world-class customer engagement across email, push, SMS, in-app and more with unparalleled data flexibility. An integrated, cross-channel solution—built for marketers, trusted by engineers, designed with intelligence.

Take your company's marketing analysis to the next level by **adding Iterable as a Source to Segment**. Iterable will automatically collect cross-channel messaging events like `Email Delivered` and `Push Delivered`, forward them to your destinations and load them into your data warehouse.

In your favorite BI or analytics tool, you'll be able to analyze all your cross-channel marketing campaigns in SQL or through drag-and-drop reports. And you'll be able to sync your Iterable data with event data you're already sending through Segment to analyze the down-funnel effects of your messaging. 

## Getting Started

If you have previously enabled sending email events using the Iterable destination during the beta period (using a project write key), you do not need to create new Iterable source. Your email data will continue to flow as normal.

1. From your workspace's `segment.com/<your-workspace>/sources` page, click **Add source**.

2. Choose Iterable.

3. Give the Source a name and add any labels to help you organize and filter your sources. You can give the source any name, but Segment recommends a name that reflects the source itself, as this name auto-populates the schema name. For example, the source name  `Iterable` creates the schema `iterable`.

4. The next page ("Overview") will surface your **Segment write key for Iterable.** Copy this write key. 

5. To finish the setup, you'll have to go into your Iterable account and enter this Segment write key in their integrations settings. Find the right place in Iterable by clicking Integrations > Third Party > Segment.

6. Click **Save**.

7. In Segment, click into your Iterable Source in `segment.com/<your-workspace>/sources`. From there you'll be able to add Destinations where you want to see email events.

That's it! As you send emails, events will now be sent to your destinations and automatically loaded into any warehouses you have enabled. 

## Components

**Stream**

Iterable uses Segment's stream Source component to send Segment email events. It uses a server-side `track` method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL. 

The default behavior is for Iterable to pass the `userId` associated with the email recipient as the `userId`. There are cases in which Iterable does not have an associated `userId`, in which case the email address will be passed in as the `anonymousId`. 

## Collections

Collections are the groupings of data Segment pulls from your Source. In your warehouse, each collection gets its own table, as well as a `tracks` table that aggregates all the events into a single table. 

| Collection               | Type  | Description                                                                                                                               |
| ------------------------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Email Bounced            | Event | The receiving server could not or would not accept message.                                                                                   |
| Email Delivered          | Event | The message was successfully delivered to the receiving server.                                                                           |
| Email Link Clicked       | Event | The recipient clicked a link within the message. Enable Click Tracking to receive this event.                          |
| Email Marked as Spam     | Event | The recipient marked message as spam.                                                                                                          |
| Email Opened             | Event | The recipient has opened the HTML message. Enable Open Tracking to receive event                                    |
| Hosted Unsubscribe Click | Event | The user navigated to the email preference center through a `hostedUnsubscribeUrl` link.                                                           |
| In App Clicked           | Event | An in-app click event indicates that a user tapped a link or button in an in-app message.                                                  |
| In App Delivered         | Event | Indicates that an in-app message arrived on a user's device. It does not mean that the user viewed the message.                           |
| In App Opened            | Event | Indicates that an in-app message displayed in an app, either because it appeared on arrival or because the user selected it in the inbox. |
| In App Sent              | Event | Indicates that Iterable sent an in-app message to a user. It does not mean that the user received the message.                            |
| Mobile App Uninstalled   | Event | Ghost message sent 12 hours after original push delivered results in rejection from receiving server.                                      |
| Push Bounced             | Event | The receiving server could not or would not accept message.                                                                                    |
| Push Delivered           | Event | The message was successfully delivered to the receiving server.                                                                           |
| Push Opened              | Event | The user was shown a push notification by the client app.                                                                                       |
| SMS Bounced              | Event | The receiving server could not or would not accept message.                                                                                    |
| SMS Clicked              | Event | The user has clicked a link within an SMS message.                                                                                                  |
| SMS Delivered            | Event | The message was successfully delivered to the receiving server.                                                                           |
| SMS Received             | Event | The user has sent an inbound SMS that was received by server.                                                                                  |
| Subscribed               | Event | The user subscribes to a messaging channel.                                                                                                    |
| Unsubscribed             | Event | The recipient clicked a on message's subscription management link.                                                                               |
| Web Push Clicked         | Event | The user clicked on a web push notification.                                                                                                     |
| Web Push Delivered       | Event | A web Push was successfully delivered to the receiving server.                                                                          |




<!-- Example: To query the Email Delivered table, you'd write a query like this:

```sql
select *
from iterable.email_delivered
```


<table>
</table> -->

## Send data to Iterable

The Iterable Source works better when you also connect Iterable as a destination. With the Iterable **Destination**, you can use Segment to send Iterable user and event data from which you trigger email campaigns. For more information, see the [Iterable destination docs](/docs/connections/destinations/catalog/iterable/).
