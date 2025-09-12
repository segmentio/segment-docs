---
title: Zigpoll Source
id: h00x3Ep5el
---

[Zigpoll](https://www.zigpoll.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} provides merchants with powerful post-purchase surveys, AI-powered insights, and zero-party data collection tools. With Zigpoll, you can capture customer feedback directly at the point of conversion and send it seamlessly into your marketing and analytics stack.

This source is maintained by Zigpoll. For any issues with the source, [contact the Zigpoll Support team](mailto:support@zigpoll.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Zigpoll" in the Sources Catalog, select Zigpoll, and click **Add Source**.
3. On the next screen, give the Source a name and configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (for example, Zigpoll_Prod, Zigpoll_Staging, or Zigpoll_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your Zigpoll account, navigate to **Settings > Integrations > Segment Integration**, and paste the key to connect.

## Stream

Zigpoll uses Segment’s stream Source component to send event data. It uses the Track and Identify methods to send data to Segment. These events are then available in any destination that accepts server-side events and as a schema in your data warehouse that you can query using SQL.

The default behavior is for Zigpoll to pass the survey participant’s unique ID as the `userId`. If a participant’s email is available, Zigpoll also passes it as an identifier. If no `userId` is available, Zigpoll passes the email as the `anonymousId`.

## Events

The table below lists events that Zigpoll sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Zigpoll includes the `userId` if available.

| Event Name        | Description                                      |
| ----------------- | ------------------------------------------------ |
| Survey Completed  | A customer submitted their responses             |

## Event Properties

The table below lists the properties included in the events listed above.

| Property Name         | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `poll_id`             | ID of the survey/poll                                |
| `participant_id`      | ID of the participant                                |
| `email`               | Email of the participant (if available)              |
| `metadata`            | Additional metadata such as order_id, referrer, etc. |

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Zigpoll support team](mailto:support@zigpoll.com).