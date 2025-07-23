---
title: Produktly Source
---

[Produktly](https://produktly/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is an all-in-one platform for product-led growth. Produktly provides a suite of tools such as product tours, checklists, feedback widgets, NPS, announcements, changelogs, roadmaps and much more, that drive growth by helping you improve onboarding, effectively communicate with customers, and by helping you gather actionable feedback.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which enables you to export data into your Segment warehouse, and also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Produktly. For any issues with the source, [contact the Produktly Support team](mailto:support@produktly.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for *Produktly* in the Sources Catalog, select **Produktly**, and click **Add Source**.
3. Give the Source a name and configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key.
6. Log in to your Produktly account and navigate to [Integrations](https://produktly.com/app/integrations){:target="_blank”}.
7. Click **Segment**.
8. Paste the write key in **Segment write key**.
9. Click **Activate**.

## Stream 

Produktly uses Segment's stream Source component to send Segment event data. It uses a server-side Track method to send data to Segment. These events are then available in any destination that accepts server-side events, and are available in a schema in your data warehouse so you can query using SQL.

Produktly passes the associated userId when you're using [the identifyUser feature](https://produktly.com/docs/docs/integration/identify-users){:target="_blank”}. If the user is not identified then a Produktly generated UUID will be used instead. This UUID will stay the same for the user as long as they are using the same browser.


## Events

The table below lists events that Produktly sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Produktly includes the `userId` if available.

| Event Name                    | Description                                 |
| ----------------------------- | ------------------------------------------- |
| `Tour Available`              | Tour was available for user                 |     
| `Tour Start`                  | Tour was started by user                    | 
| `Tour Auto Start`             | Tour was automatically started              |       
| `Tour Continue`               | Tour was continued by user                  |     
| `Tour Finish`                 | Tour was finished by user                   |   
| `Tour Step`                   | User saw a specific step of a tour          | 
| `Checklist Step Completed`    | User completed a step of a checklist        |               
| `Checklist Finished`          | User completed all the steps in a checklist |         
| `Smart Tip Available`         | Smart tip was available for user            |           
| `Smart Tip Open`              | Smart tip was opened                        |     
| `Announcement Shown`          | Announcement was shown to user              |         
| `Announcement Action Clicked` | User clicked on announcement action         |                   
| `Announcement Closed`         | Announcement was closed by user             |           
| `Nps Widget Shown`            | NPS widget was shown to user                |       



## Event Properties

See the list of event properties.

#### Tour Available

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `tour_id`          | Id of the tour           |

#### Tour Start

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `tour_id`          | Id of the tour           |

#### Tour Auto Start

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `tour_id`          | Id of the tour           |

#### Tour Continue

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `tour_id`          | Id of the tour           |

#### Tour Finish

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `tour_id`          | Id of the tour           |

#### Tour Step

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `tour_id`          | Id of the tour           |
| `metadata`        | Object that contains `stepIndex` of the tour that was viewed, and `type` either "next" or "previous" telling whether the user moved forward or backwards | 

#### Checklist Step Completed

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `checklist_id`     | Id of the checklist      |
| `metadata`        | Object that contains `stepId` of the checklist that was completed | 

#### Checklist Finished

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `checklist_id`     | Id of the checklist      |

#### Smart Tip Available

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `smart_tip_id`      | Id of the smart tip      |

#### Smart Tip Open

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `smart_tip_id`      | Id of the smart tip      |

#### Announcement Shown

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `announcement_id`  | Id of the announcement   |

#### Announcement Action Clicked

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `announcement_id`  | Id of the announcement   |

#### Announcement Closed

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `announcement_id`  | Id of the announcement   |

#### Nps Widget Shown

| Property Name     | Description              |
| ----------------- | ------------------------ |
| `nps_widget_id`     | Id of the NPS widget     |



## Adding destinations

Once your Source is set up, you can connect it with Destinations.

Log in to your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Produktly support team](mailto:support@produktly.com).
