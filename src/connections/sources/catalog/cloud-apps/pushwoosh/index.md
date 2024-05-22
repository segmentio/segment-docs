---
title: Pushwoosh Source
---

> (delete after reading) Include a 1-2 sentence introduction to your company and the value it provides to customers - updating the name and hyperlink. Please leave the utm string unchanged.

[Pushwoosh](https://pushwoosh.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} provides self-serve predictive analytics for growth marketers, leveraging machine learning to automate audience insights and recommendations.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

> (delete after reading) Update your company name and support email address.

This source is maintained by Pushwoosh. For any issues with the source, [contact their Support team](mailto:support@<integration_name>.com).

## Getting started

> (delete after reading) Include clear, succinct steps including hyperlinks to where customers can locate the place in your app to enter their Segment writekey.

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Pushwoosh" in the Sources Catalog, select Pushwoosh, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. Pushwoosh_Prod, Pushwoosh_Staging, Pushwoosh_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your Pushwoosh account and select the Application you want to connect.
7. Navigate to Settings > 3rd party integration > Segment, click Setup button and enter your write key from your Segment workspace.
8. Lists events you want to export throw `,` delimiter in field `Events` or leave it blank if you want them all, then click `Submit`

## Stream

Pushwoosh uses our stream Source component to send Segment event data. It uses a server-side `track` method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse.

Pushwoosh pass user identifier as `user_id` property by default.

## Events

The table below lists events that Pushwoosh sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. <integration_name> includes the `userId` if available.

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

| Property Name     | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `message_type`    | Contains the type of message (Push, Email, In-App or SMS)  |
| `campaign_code`   | Unique identifier of message campaign                      |
| `device_type`     | Type of the device                                         |
| `user_id`         | User associated with the message                           |

 

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Pushwoosh support team](mailto:support@<integration_name>.com).
