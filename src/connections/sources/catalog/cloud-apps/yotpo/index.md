---
title: Yotpo Source
id: q4JbVJwmrg
---

[Yotpo](https://yotpo.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a retention marketing platform that helps turn one-time shoppers into customers for life and maximize customer value. It enables you to collect and showcase customer reviews, offer loyalty programs and SMS and email marketing solutions.

Take your company’s customer engagement to the next level by adding Yotpo as a Source to Segment. Segment automatically collects engagement events (like SMS sent, SMS clicked, and Email opened), forwards them to your destinations, and loads them into your data warehouse.

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add source**.
2. Search for **Yotpo** in the Sources Catalog, select Yotpo, and click **Add Source**.
2. On the next screen, give the Source a name. You can also apply labels to the source and connect the source to your warehouses. When you've finished setting up your source, click **Add Source**. 
3. Segment redirects you to the Overview page and surfaces your Segment write key for Yotpo. Copy this write key.
4. In your Yotpo integration center, search for "Segment" and click **Connect**.
5. On the Provide API Key stage of the integration process, enter the **Segment Write Key**.
6. Click **Connect**.
7. Return to Segment and click **Add Destinations** in your Yotpo source to add the destinations where you want to send your SMS and email events.

## Events

The table below lists events that Yotpo sends to Segment. These events appear as tables in your warehouse, and as regular events in other destinations. Yotpo includes the user identifier you have associated with the user as the Segment `userId` if available. Additionally, Yotpo will utilize the phone number or email address as the Segment `anonymousId`, depending on the type of event (email versus SMS).

| Event Name         | Description                                              |
|--------------------|----------------------------------------------------------|
| SMS Sent           | An SMS was sent.                                         |
| SMS Clicked        | User clicked a short link in an SMS message.             | 
| SMS Unsubscribed   | User clicked the unsubscribe link in an SMS.             | 
| SMS Subscribed     | User subscribed to receive SMS messages.                 |
| Email Sent         | An email was sent to the user.                           |
| Email Delivered    | An email was successfully delivered to the user's inbox. |
| Email Opened       | User opened an email.                                    |
| Email Clicked      | User clicked a link within an email.                     |
| Email Bounced      | An email could not be delivered to the user.             |
| Email Unsubscribed | User clicked the unsubscribe link in an email.           |
| Email Subscribed   | User subscribed to receive emails.                       |

## Event Properties

The table below list the properties included in the events listed above.

| Property Name        | Description                                      |
|----------------------|--------------------------------------------------|
| `source_name`        | The name of the source that generated the event. |
| `sub_source`         | A secondary identifier for the event source.     |
| `source_id`          | A unique identifier for the event source.        |
| `email_reference_id` | A unique ID to reference a specific email.       |
| `clicked_url`        | The URL that was clicked in the event.           |
| `store_id`           | A unique identifier for the Yotpo store.         |
| `flow_id`            | A unique identifier for the Yotpo flow.          |
| `campaign_id`        | A unique identifier for the Yotpo campaign.      |

## Adding Destinations

Now that your source is set up, you can connect it to destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the Event Delivery tool, and refer to the docs for each destination for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Yotpo support team](support@yotpo.com).
