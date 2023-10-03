---
title: LiveLike Source
id: EjYD7n6dOa
---

[LiveLike](https://livelike.com/){:target="_blank"} is a technology company dedicated to empowering digital experiences that enable deeper fan engagement, increased retention rates, and new monetization opportunities.

This integration will enable you to receive related engagement and achievements from LiveLike into your Segment warehouse, which can enable and enhance your automated marketing tacics and capabilities as well as augment your analytics and first-party data for your users. 

This source is maintained by LiveLike. For any issues with the source, [contact the LiveLike Support team](mailto:support@livelike.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"} click **Add Source**.
2. Search for *LiveLike* in the Sources Catalog. Select **LiveLike**, and click **Add Source**.
3. Give the Source a name and configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (for example, LiveLike_Prod, LiveLike_Staging, LiveLike_Dev).

4. Click **Add Source** to save your settings.
5. Copy the **Write Key** from the Segment UI.
6. Provide the write Key to your LiveLike Account Manager so that LiveLike staff can input that write key into the platform to complete the process and enable the integration.

## Stream

LiveLike uses Segment's stream Source component to send Segment event data. It uses a server-side `track` method(s) to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

The default behavior is for LiveLike to pass the userId associated with the event, which usually is your already-known userId, as well as a LiveLike User Profile ID as livelike_profile_id inside the Properties object within the Track event payload.

## Events

The table below lists events that LiveLike sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. LiveLike includes the `userId` if available.

| Event Name                 | Description                                               |
| ------------------         | -------------------------------------                     |
| Badge Rewarded             | When a user receives a badge.                              |
| Quest Task Completed       | When a user completes a Quest Task.                        | 
| Quest Reward Awarded       | When a user receives a Reward Item via a Quest Completion. |
| Reward Item Rewarded       | When a user is rewarded via a Reward Table.                |
| User Quest Task Progressed | When a user progresses a Quest Task.                       | 
| User Quest Completed       | When a user completes a Quest.                             | 

## Event Properties for Badge Rewarded

The table below lists the properties included in Badge Rewarded event.

| Property Name            | Description                                                                  |
| ---------------          | -------------------------                                                    |
| `livelike_profile_id`    | The profile ID of the LiveLike user.                                              |
| `badge_id`               | The ID of the specific Badge the user earned.                                     |
| `badge_title`            | The title of the specific Badge the user earned.                                  |
| `description`            | The description of the specific Badge the user earned.                            |
| `earned_badge_id`        | The ID of the specific transaction of the user earning the Badge.                 |
| `image_url`              | The URL of the Badge image.                                                       |
| `reward_item_id`         | The ID of the Reward Item that's associated to the threshold to earn the Badge.   |
| `reward_item_name`       | The name of the Reward Item that's associated to the threshold to earn the Badge. |
| `reward_item_threshold`  | The threshold amount of the Reward Item that's associated to earning the Badge.   |

## Event Properties for Quest Task Completed

The table below lists the properties included in the Quest Task Completed event.

| Property Name            | Description                                                                  |
| ---------------          | -------------------------                                                    |
| `livelike_profile_id`    | The profile ID of the LiveLike user.                                              |
| `quest_id`               | The ID of the Quest.                                                              |
| `quest_name`             | The name of the Quest.                                                            |
| `quest_task_id`          | The ID of the specific Task within the Quest that was completed.                  |
| `quest_task_name`        | The name of the specific Task within the Quest that was completed.                |
| `user_quest_id`          | The ID of the specific relationship between the User and that Quest.              |
| `user_quest_task_id`     | The ID of the specific relationship between the User and that Quest Task.         |

## Event Properties for Quest Reward Awarded

The table below lists the properties included in the Quest Reward Awarded event.

| Property Name                 | Description                                                                  |
| ---------------               | -------------------------                                                    |
| `livelike_profile_id`         | The profile ID of the LiveLike user.                                              |
| `quest_id`                    | The ID of the Quest the user completed to earn Rewards (if applicable).           |
| `quest_name`                  | The name of the Quest the user completed to earn Rewards (if applicable).         |
| `reward_item_name`            | The name of the Reward Item that was rewarded.                                    |
| `reward_item_amount`          | The amount of the Reward Item that was rewarded.                                  |
| `reward_item_balance`         | The new balance of the Reward Item for the user.                              |
| `reward_item_id`              | The ID of the Reward Item that was rewarded.                                      |
| `reward_item_transaction_id`  | The ID of the transaction of the User being rewarded.                             |

## Event Properties for Reward Item Rewarded

The table below lists the properties included in the Reward Item Rewarded event.

| Property Name                 | Description                                                                  |
| ---------------               | -------------------------                                                    |
| `livelike_profile_id`         | The profile ID of the LiveLike user.                                              |
| `reward_item_name`            | The name of the Reward Item that was rewarded.                                    |
| `reward_item_amount`          | The amount of the Reward Item that was rewarded.                                  |
| `reward_item_balance`         | The new balance of the Reward Item for the user.                              |
| `reward_item_id`              | The ID of the Reward Item that was rewarded.                                      |
| `reward_item_transaction_id`  | The ID of the transaction of the User being rewarded.                             |

## Event Properties for User Quest Task Progressed

The table below lists the properties included in the User Quest Task Progressed event.

| Property Name              | Description                                                                  |
| ---------------            | -------------------------                                                    |
| `livelike_profile_id`      | The profile ID of the LiveLike user.                                              |
| `quest_id`                 | The ID of the Quest.                                                              |
| `quest_name`               | The name of the Quest.                                                            |
| `quest_task_id`            | The ID of the specific Task within the Quest that was completed.                  |
| `quest_task_name`          | The name of the specific Task within the Quest that was completed.                |
| `quest_task_target_value`  | The target number of times this Task needs to be done to complete the Task.       |
| `user_quest_id`            | The ID of the specific relationship between the User and that Quest.              |
| `user_quest_task_id`       | The ID of the specific relationship between the User and that Quest Task.         |
| `user_quest_task_progress` | The number of times this Task has been done so far.                               |

## Event Properties for User Quest Completed

The table below lists the properties included in the User Quest Completed event.

| Property Name            | Description                                                                  |
| ---------------          | -------------------------                                                    |
| `livelike_profile_id`    | The profile ID of the LiveLike user.                                              |
| `quest_id`               | The ID of the Quest.                                                              |
| `quest_name`             | The name of the Quest.                                                            |
| `user_quest_id`          | The ID of the specific relationship between the User and that Quest.              |

## Adding Destinations

Once your Source is set up, you can connect it with Destinations.

Log in to your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events arrive to Segment, [contact the LiveLike support team](mailto:support@livelike.com).
