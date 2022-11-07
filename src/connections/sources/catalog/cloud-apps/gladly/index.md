---
title: Gladly Source
id: 94LHXFps4k
---

[Gladly](https://www.gladly.com/){:target="_blank"} is the only platform purposely built to help the world's fastest growing brands deliver radically personal customer service. Designed around people and not tickets, Gladly's all-in-one platform features every channel - from voice to SMS - natively built into a single UI, allowing agents to communicate seamlessly across all channels. Rated the #1 easiest-to-use customer service platform, Gladly is empowering brands of all sizes to deliver and scale exceptional customer and agent experiences and build brand loyalty.

The Gladly Source is an [Event Cloud Source](/docs/sources#event-cloud-sources) that can be used to track when your customers open or closed a conversation with an agent. Not only can you export data into your Segment warehouse, but you can also send the exported data into your other enabled Segment Destinations.

This source is maintained by Gladly. For any issues with the source, [contact the Gladly Support team](mailto:support@gladly.com).

## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "Gladly" in the Sources Catalog, select click Gladly, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings. 
5. Click **Add Source** to save your settings.
6. Copy the `Write key` from the Segment UI
7. Log into Gladly
8. Go to Settings -> App Developer Tools -> Apps
9. Click **Add App** and select **Segment**
10. Name your app
11. Paste your `Write Key` into the **Segment Private Key** field
12. Save your app

## Events

The table below lists events that Gladly sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Gladly includes the `userId` if available.

| Event               | Description                                              |
| ------------------- | -------------------------------------------------------- |
| Conversation Opened | A conversation was opened and assigned to an agent       |
| Conversation Closed | A conversation was closed and required no further action |

## Event properties

The table below list the properties included in the events listed above.

| Property Name  | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| event          | Conversation Status                                                 |
| userId         | Customer's Gladly ID                                                |
| customerName   | Customer's Name                                                     |
| email          | Customer's Email Address                                            |
| phone          | Customer's Phone Number                                             |
| conversationId | Conversation's ID                                                   |
| status         | Conversation's Status                                               |
| topics         | List of Topic IDs for a Conversation (only for Conversation Closed) |
| agentId        | Assigned Agent's ID                                                 |
| agentName      | Assigned Agent's Name                                               |
| timestamp      | Conversation Opened/Conversation Closed time                        |

## Add Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Gladly support team](mailto:support@gladly.com).
