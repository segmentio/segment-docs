---
title: Upollo Source
id: 9TYqEh3nMe
beta: true
---

[Upollo](https://upollo.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} gives unique and actionable insights that lead to conversion, retention, and expansion.

This source is maintained by Upollo. For any issues with the source, [contact Upollo's Support team](mailto:support@upollo.ai).

> info ""
> The Upollo Source is currently in beta, which means that Upollo still actively developing the source. If you are interested in joining the beta program or have any feedback to help improve the Upollo Source and its documentation, [let the Upollo team know](mailto:support@upollo.ai).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Upollo" in the Sources Catalog, select Upollo, and click **Add Source**.
3. On the next screen, give the Source a nickname and configure any other settings.

   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (for example, Upollo_Prod, Upollo_Staging, Upollo_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your Upollo account and navigate to [Connections](https://upollo.ai/app/settings/connections). Connect the Segment Source and paste the Write key to connect.


## Stream

Upollo uses server-side `identify` calls to send information about users. The table below describes the fields.
Upollo uses a stream Source component to send Segment event data. It uses a server-side `identify` method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

The default behavior is for Upollo to pass the userId associated with the email recipient as the userId. There are cases in which Upollo does not have an associated userId, in which case the email address will be passed in as the anonymousId.

## Event properties

The table below list the properties included in the events. Learn more about different properties in the Upollo [documentation](https://upollo.ai/docs/reference?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”}

| Property Name                           | Description                                               |
| --------------------------------------- | --------------------------------------------------------- |
| `traits.predictions`                    | An array of predictions about the user                    |
| `traits.predictions[*].name`            | The name of the prediction                                |
| `traits.predictions[*].score`           | A percentage of how likely the prediction is to come true |
| `traits.predictions[*].timestamp`       | When the prediction was calculated                        |
| `traits.flags`                          | An array of the users flags                               |
| `traits.flags[*].type`                  | The type of this flag                                     |
| `traits.flags[*].first_flagged`         | When this flag was first triggered                        |
| `traits.flags[*].most_recently_flagged` | When this flag was last triggered                         |

For example
```json
{
  "type": "identify",
  "userId": "97980cfea0067",
  "traits": {
    "email": "peter@example.com",
    "predictions": [{
      "name": "conversion",
      "score": 0.98,
      "timestamp": "2023-09-05T04:30:11Z"
    }, {
      "name": "expansion",
      "score": 0.78,
      "timestamp": "2023-09-05T04:30:11Z"
    }, {
      "name": "churn",
      "score": 0.12,
      "timestamp": "2023-09-05T04:30:11Z"
    }],
    "flags": [{
      "type": "MULTIPLE_ACCOUNTS",
      "first_flagged": "2023-09-05T04:30:11Z",
      "most_recently_flagged": "2023-09-05T04:30:11Z"
    }]
  }
}
```

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Upollo support team](mailto:support@upollo.ai).
