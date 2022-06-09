---
title: Leanplum Source
beta: true
source-type: event
id: NRgENc89eR
---
{% include content/source-region-unsupported.md %}

[Leanplum](https://leanplum.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a multi-channel customer engagement platform that helps Growth and Marketing teams to achieve their engagement and revenue goals.

When you add Leanplum as a Source, Segment starts collecting Leanplum engagement events (for example, Email Open, Push Delivered), which you can then connect to a destination of your choice or load in your data warehouse.

The Leanplum source integration is an event source, which means that it sends Leanplum engagements as events.

Collections represent the different messaging events that Leanplum sends to Segment as a streaming source. In your Segment warehouse, each collection gets its own table, as well as a tracks table that aggregates all the events into a single table.

This source is maintained by Leanplum. For any issues with the source, [contact Leanplum Support](mailto:support@leanplum.com).

> success ""
> **Good to know**: This page is about the Leanplum Segment source, which sends data _into_ Segment. There's also a page about the [Leanplum Segment destination](https://segment.com/docs/connections/destinations/catalog/leanplum/), which receives data from Segment!


## Getting Started
Leanplum calls the Source integration "Segment Feed" - this is the name you will see in their dashboard and documentation.

1. From the Segment Sources page click **Add Source**.
2. Search for “Leanplum” in the Sources Catalog click “Connect”.
3. Configure your source and give it a name. This also generates a schema, which creates a namespace you can query against in a warehouse. We recommend that you name your source to represent the environment you are setting up (for example, Prod, Dev, Staging)
4. On the overview page you will see the Segment write key. Copy it.
5. Go to your Leanplum dashboard. In the navigation, under "More", find your Partner Integrations page. Open the configuration for Segment.
6. Find the "Feed" setup, paste your Segment write key there and click "Save".

Congratulations! The integration is up and running!



## Events
Below is a list of events Leanplum sends to Segment

| Collection                | Type  | Description                                    |
|:------------------------- |:----- |:---------------------------------------------- |
| Email Bounced            | Event | Fires when an email to a user has bounced      |
| Email Delivered           | Event | Fires when an email has been delivered         |
| Email Link Clicked        | Event | Fires when an email link has been clicked      |
| Email Marked as Spam      | Event | Fires when an email has been marked as spam    |
| Email Opened              | Event | Fires when an email has been opened            |
| Unsubscribed              | Event | Fires when a user unsubscribes from emails     |
| Push Notification Tapped  | Event | Fires when a push notification has been opened |
| Push Notification Bounced | Event | Fires when a push notification bounces         |
| Experiment Viewed         | Event | Fires on A/B test impression                   |

## Event properties
Below is a list of event properties, which might be associated with each Leanplum event


| Property        | Type   | Description                                                            |
| --------------- | ------ |:---------------------------------------------------------------------- |
| email_id        | String | The unique email ID                         |
| message_id        | String | The Leanplum message ID                         |
| email_subject   | String | The email subject as set up in Leanplum                                |
| campaign_id     | String | (Optional) Leanplum Campaign ID if the message is part of a campaign   |
| campaign_name   | String | (Optional) Leanplum Campaign Name if the message is part of a campaign |
| campaign.medium | String | Sent for push messages only                                            |
| experiment_id   | String | The ID of the A/B test in Leanplum                                     |
| experiment_name | String | The name of the A/B test as specified in Leanplum                      |


## Adding Destinations

Now that your Source is set up, you can connect it to Destinations.

Log into your downstream tools and check to see that your events are populating and that they contain all the properties you expect. If all your events and properties are not showing up, refer to the Source docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the Leanplum team](mailto:support@leanplum.com).

## Send data to Leanplum

Segment and Leanplum work better together when connected bi-directionally. With the Leanplum Destination, you can send client-side or server-side data, as well as connect Personas; which you can then turn into precisely targeted personalized messages. Learn more at our [Leanplum Destination docs](https://segment.com/docs/connections/destinations/catalog/leanplum/).
