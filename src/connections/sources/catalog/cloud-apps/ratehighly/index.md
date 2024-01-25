---
title: RateHighly Source
id: P1kUrzj9pv
beta: true
hidden: true
---

[RateHighly](https://ratehighly.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} gets your most engaged users to review your application on G2 and Capterra, leveraging machine learning to predict user sentiment and request reviews.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by RateHighly. For any issues with the source, [contact their Support team](mailto:support@ratehighly.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "RateHighly" in the Sources Catalog, select RateHighly, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself (eg. RateHighly).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your RateHighly account - navigate to [Account > Integrations](https://ratehighly.com/dashboard/account/integrations) > Segment and paste the key to connect.

## Stream

RateHighly uses our stream Source component to send Segment event data. It uses server-side `track` and `identify`  methods to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

RateHighly will pass the provided user_id as the Segment userId, in addition to context and user details. 

## Events

The table below lists events that RateHighly sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. RateHighly includes the customer-provided `userId` with all events. The `userId` is user-provided string used when sending any event to RateHighly.

| Event Name         | Description                            |
| ------------------ | -------------------------------------- |
| User Created       | User was detected by RateHighly        |
| Deemed Happy       | User is qualified to review your app   | 
| Messaged In-App    | User was asked to review in-app        |
| Gave Rating        | User gave a score in-app               | 
| Skipped Rating     | User closed the modal without scoring  | 
| Gave Review        | User shared a review on G2 or Capterra |
| Gave Feedback      | User wrote internal feedback           |
| Sent Email         | User received a review request email   | 
| Unsubscribed       | User clicked an unsubscribe link       | 
| Review Completed   | User completed the review sequence     | 

## Event Properties

The table below list the properties included in the events listed above.

| Property Name     | Description               |
| ----------------- | ------------------------- |
| `event`           | Event type                |
| `userId`          | User ID                   |
| `email`           | User email                |
| `score`           | User rating               |
| `predicted_score` | User predicted score      |

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the RateHighly support team](mailto:support@ratehighly.com).
