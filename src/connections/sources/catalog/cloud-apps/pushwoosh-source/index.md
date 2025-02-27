---
title: Pushwoosh Source
id: MW9K4HgBZz
---

[Pushwoosh](https://pushwoosh.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} provides a comprehensive mobile engagement platform, offering advanced push notifications, and in-app messaging to enhance customer interactions and retention.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) that can  export data into your Segment warehouse, as well as federate the exported data into your other enabled Segment Destinations.

This source is maintained by Pushwoosh. If you have any issues with it, [contact their Support team](mailto:support@pushwoosh.com)

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Pushwoosh" in the Sources Catalog, select Pushwoosh, and click **Add Source**.
3. On the next screen, give the Source a name and configure any other settings.

    - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but Pushwoosh recommends using something that reflects the source itself and distinguishes among your environments (For example: Pushwoosh_Prod, Pushwoosh_Staging, Pushwoosh_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your Pushwoosh account, and select the Application you want to connect.
7. Navigate to **Settings > 3rd party integration > Segment**, click the `Configure` button, and enter your write key from your Segment workspace.
8. List the events you want to export using a `,` delimiter in the `Events` field, or leave it blank if you want to export all events, then click `Apply`.

## Stream

Pushwoosh uses our stream Source component to send Segment event data. It uses a server-side track method to send data to Segment. These events are then available in any destination that accepts server-side events, and are available in a schema in your data warehouse.

By default, Pushwoosh passes the Pushwoosh User ID as the Segment userId property. If there is no associated User ID, Pushwoosh will pass the HWID as the Segment anonymousId.

## Events

The table below lists events that Pushwoosh sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

| Event Name         | Description                                     |
| ------------------ | ----------------------------------------------- |
| Email Sent         | Email was sent successfully                     |
| Push Sent          | Push notification successfully sent             | 
| SMS Sent           | SMS sent to recipient                           | 
| Email Delivered    | Email successfully delivered                    | 
| Push Delivered     | Push notification successfully delivered        | 
| SMS Delivered      | SMS successfully delivered                      | 
| Email Bounced      | Email returned to sender due to permanent error | 


## Event Properties

The table below list the properties included in the events listed above.

| Property Name     | Description                                                                        |
| ----------------- | ---------------------------------------------------------------------------------- |
| `message_type`    | Contains the type of message (Push, Email, In-App or SMS)                          |
| `campaign_code`   | Unique identifier of the message campaign                                          |
| `device_type`     | Type of the device                                                                 |

 

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/), and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Pushwoosh support team](mailto:support@pushwoosh.com).
