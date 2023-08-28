---
title: Inflection Source
id: glwy6LwOVo
---
[Inflection](https://inflection.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} provides a B2B marketing automation platform for product-led growth companies.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Inflection. For any issues with the source, [contact their Support team](mailto:support@inflection.io).

## Getting Started

1. From the [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) in your workspace, click **Add Source**.
2. Search for "Inflection" in the Sources Catalog, select Inflection, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings.
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to your Inflection account - navigate to Connections > Add a new connection > Segment Integration > Select Source > and paste the write key in the Segment as Destination Field.

## Stream 

Inflection uses its stream Source component to send Segment event data. It uses a server-side (select from `track`, `identify`, `page`, `group`) methods to send data to Segment. 

Inflection passes the `userId` associated with the email recipient as the `userId`. In cases where Inflection does not have an associated `userId` value, Inflection passes `personId` to Segment as an `anonymousId`. When Inflection receives the `userId` for the email it sends an Identify call with both the `personId` and `userId` to Segment.

## Events

The table below lists events that Inflection sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Inflection includes the `userId` if available.

| Event Name                        | Description                                              |
| --------------------------------- | -------------------------------------------------------- |
| Email Delivered                   | Email was sent successfully                              |
| Email Opened                      | Prospect opened the email                                |
| Email Unique Opens                | Unique email open by a prospect                          |
| Email Bounced                     | Email servers rejected the email                         |
| Email Reported as Spam            | Prospect reported the email as spam                      |
| Link Clicked                      | Prospect clicked the tracking link                       |
| Unique Link Click                 | Unique tracking link click by a prospect                 |
| Unique Link Click per Unique Open | Unique tracking link click per unique open by a prospect |
| Email Unsubscribed                | Prospect clicked the unsubscribe link                    |

## Event Properties

The table below list the properties included in the events listed above.

| Property Name     | Description                                        |
| ----------------- | -------------------------------------------------- |
| `event`           | Email event type                                   |
| `userId`          | Prospect email ID                                  |
| `email_id`        | ID of the email                                    |
| `campaign_id`     | Campaign ID                                        |
| `campaign_run_id` | Campaign Run ID                                    |
| `campaign_name`   | Campaign Name                                      |
| `email_subject`   | Subject line of the email                          |
| `email_link_url`  | URL of the link clicked                            |
| `is_unique_open`  | Unique email open by a prospect (true or false)    |
| `is_unique_click` | Unique tracking link by a prospect (true or false) |

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Inflection support team](mailto:support@inflection.io).
