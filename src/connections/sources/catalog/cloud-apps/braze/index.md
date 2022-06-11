---
title: Braze Source
id: L8TEm5Z8UV
---
{% include content/source-region-unsupported.md %}

[Braze](https://www.braze.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a marketing automation and customer engagement platform. Growth, Engagement, and Marketing teams use Braze to build great long term relationships with their customers across key digital channels.

Take your company's marketing and customer engagement to the next level by adding Braze as a Segment Source, using Braze's Currents product. Segment automatically  collects marketing and analytics events, forwards them to your destinations, and loads them into your data warehouse.

In your favorite BI or analytics tool, you'll be able to analyze your mobile, email, and web marketing campaign data in SQL or using drag-and-drop reports. You'll be able to join your Braze data with the event data you're already sending through Segment to analyze the impacts of your marketing and engagement programs.

Braze maintains this source. For any issues with the source, you can [contact the Braze Support team](https://www.braze.com/docs/support_contact/){:target="_blank"}.

> info ""
> If you're interested in using Braze, contact your Braze Customer Success Manager. Braze Currents is only available in select Braze packages and can't be configured without assistance from the Braze team.

## Getting Started

1. Go to **Connections > Sources** and click **Add Source** in the Segment app.
2. Search for **Braze** in the Sources Catalog and click **Add Source**.
3. Give the Source a nickname and click **Add Source**.
   The nickname is used as a label for the source in your Segment interface, and Segment creates a related schema name. The schema name is the namespace you'll query against in a warehouse. The nickname can be anything, but Segment recommends sticking to something that reflects the source itself and distinguishes amongst your environments (for example, `Braze_Prod`, `Braze_Staging`, `Braze_Dev`).
4. Copy the **Write Key** on the Overview page.
5. To finish the setup, contact Braze Support or your Customer Support Manager to activate Currents in Braze.
   Braze Currents is only available in select Braze packages and can't be configured within Braze without assistance from your Braze Customer Success representative.
6. Go back to Segment and click **Add Destinations** in your Braze source to add the destinations where you want to receive your Braze data.

Events are now sent to these destinations and automatically loaded into any warehouses you enabled.

> warning ""
> The Braze Segment Currents integration doesn't isolate events by different apps in a single app group. If you create more than one of the same Currents connectors (for example, two message engagement event connectors), they must be in different app groups. If you don't do this, it leads to data deduping and lost data.

## Components

Braze uses Segment's [Stream Source component](/docs/partners/streams/) to send events to Segment. These events are then available in any Destination that accepts server-side events, including your data warehouse.

## Events

The following table lists events that Braze sends to Segment. These events show up as tables in your Warehouse and as regular events in your other Destinations.

| Event name                       | Description                                                                                                                                               |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Email Sent                       | An email was successfully sent.                                                                                                                           |
| Email Delivered                  | An email was successfully delivered to a User’s mail server.                                                                                              |
| Email Opened                     | User opened an email.                                                                                                                                     |
| Email Link Clicked               | User clicked a link in an email. Email click tracking must be enabled.                                                                                    |
| Email Bounced                    | Braze attempted to send an email, but the User’s receiving mail server did not accept it.                                                                 |
| Email Soft Bounced               | Braze attempted to send an email, but the User’s receiving mail server temporarily bounced it. (Reasons may include: inbox full, server down, and so on.) |
| Email Marked As Spam             | User marked an email as spam.                                                                                                                             |
| Email Unsubscribed               | User clicked the unsubscribe link in an email.                                                                                                            |
| Subscription Group State Changed | User’s subscription group state changed to `Subscribed` or `Unsubscribed`.                                                                                |
| Push Notification Sent           | A push notification was successfully sent                                                                                                                 |
| Push Notification Tapped         | User tapped on a push notification.                                                                                                                       |
| Push Notification Bounced        | Braze was not able to send a push notification to this User.                                                                                              |
| iOS Foreground Push Opened       | User received a push notification on iOS while the app was open.                                                                                          |
| In-App Message Viewed            | User viewed an in-app message.                                                                                                                            |
| In-App Message Clicked           | User tapped or clicked a button in an in-app message.                                                                                                     |
| News Feed Viewed                 | User viewed the native Braze News Feed.                                                                                                                   |
| News Feed Card Viewed            | User viewed a Card within the native Braze News Feed.                                                                                                     |
| News Feed Card Clicked           | User tapped or clicked on a Card within the native Braze News Feed.                                                                                       |
| Webhook Sent                     | A webhook message was sent                                                                                                                                |
| Campaign Converted               | User performed the primary conversion event for a Campaign within its conversion window.                                                                  |
| Canvas Converted                 | User performed the primary conversion event for a Canvas within its conversion window.                                                                    |
| Canvas Entered                   | User was entered into a Canvas.                                                                                                                           |
| Campaign Control Group Entered   | User was enrolled in a Campaign control group.                                                                                                            |
| Content Card Sent                | A Content Card was sent to a user's device.                                                                                                               |
| Content Card Viewed              | User viewed a Content Card.                                                                                                                               |
| Content Card Clicked             | User clicked a Content Card.                                                                                                                              |
| Content Card Dismissed           | User dismissed a Content Card.                                                                                                                            |
| SMS Sent                         | An SMS was sent.                                                                                                                                          |
| SMS Sent to Carrier              | An SMS was sent to the Carrier for delivery.                                                                                                              |
| SMS Delivered                    | An SMS was delivered successfully.                                                                                                                        |
| SMS Delivery Failed              | An SMS was unable to be delivered successfully.                                                                                                           |
| SMS Rejected                     | An SMS was rejected.                                                                                                                                      |
| SMS Inbound Received             | An inbound SMS was received.                                                                                                                              |
| Application Uninstalled          | User uninstalled the App.                                                                                                                                 |

## Braze Event Properties

The following table lists event properties included with all events Segment receives from Braze.

| Property name          | Type   | Description                                                                                                                                                                                                                                    |
| ---------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app_id`               | String | The API Identifier of the App on which a user received a message or performed an action, if applicable.                                                                                                                                        |
| `send_id`              | String | The id of the message if specified for the campaign, if applicable.                                                                                                                                                                            |
| `dispatch_id`          | String | The id of the message dispatch (unique id for each ‘transmission’ sent from the Braze platform). Users who are sent a schedule message get the same `dispatch_id`. Action-based or API-triggered messages get a unique `dispatch_id` per user. |
| `campaign_id`          | String | The API Identifier of the campaign associated with the event, if applicable.                                                                                                                                                                   |
| `campaign_name`        | String | The name of the campaign associated with the event, if applicable.                                                                                                                                                                             |
| `message_variation_id` | String | The API Identifier of the Message Variation for the campaign associated with the event, if applicable.                                                                                                                                         |
| `canvas_id`            | String | The API Identifier of the Canvas associated with the event, if applicable                                                                                                                                                                      |
| `canvas_name`          | String | The name of the Canvas associated with the event, if applicable.                                                                                                                                                                               |
| `canvas_variation_id`  | String | The API Identifier of the Canvas Variation associated with the event, if applicable.                                                                                                                                                           |
| `canvas_step_id	`      | String | The API Identifier of the Canvas Step associated with the event, if applicable.                                                                                                                                                                |

Braze will send the Braze `external_user_id` as the top level `userId` field. This is the same `userId` that Braze originally receives from the downstream destination with Segment. Braze will only send events associated with users who have an `external_user_id` set.

This table lists event-specific properties Braze sends to Segment:

| Property Name           | Type     | Description                                                                                                            |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `in_control_group`      | String | For Canvas Entered events, whether or not the user was enrolled in the control group - always either `true` or `false`. |
| `context.traits.email`  | String | For Email events, the email address that the email was sent to.                                                        |
| `link_url`              | String | For Email Clicked events, the URL of the link that the user clicked on.                                                |
| `button_id`             | String | For In-App Message Clicked events, the index of the button the user clicked on.                                        |
| `card_id`               | String | For News Feed Card and Content Card events, the API Identifier of the Card.                                            |
| `subscription_group_id` | String | For Subscription Group State Changed events, the API Identifier of the Subscription Group.                             |
| `subscription_status`   | String | For Subscription Group State Changed events, the status the user changed to, either `Subscribed` or `Unsubscribed`.    |
| `user_agent`            | String | For Email Click and Email Open events, description of the user’s system and browser for the event.                     |
| `link_id`               | String | For Email Click events, Unique value generated by Braze for the URL. Null unless Link Aliasing is enabled.             |
| `link_alias`            | String | For Email Click events, alias name set when the message was sent. Null unless Link Aliasing is enabled.                |
| `machine_open`  | String | For Email Open events, indicator of whether the email was opened by an automated process, such as Apple or Google mail pre-fetching. Currently `true` or `null`, but additional granularity (for example, "Apple" or "Google" to indicate which process made the fetch) may be added in the future. |


Refer to Braze's [Segment for Currents documentation](https://www.braze.com/docs/partners/data_and_infrastructure_agility/customer_data_platform/segment/segment_for_currents/){:target="_blank"} for more information on Braze export events and properties.

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log in to your downstream tools and make sure that the events are populating in your Debugger and that they contain all of the properties you expect. If something isn't working as you expect, see the Destination docs for troubleshooting.

If there are problems with how the events arrive to Segment, [contact the Braze team](https://www.braze.com/docs/support_contact/){:target="_blank"}.

## Sending Data To Braze

The Braze Source works better when you also connect Braze as a Destination. With the Braze Destination, you can use Segment to send event data to Braze so you can target customers with messaging campaigns. Want to start sending data to Braze? Learn how by reading the [Braze Destination docs](/docs/connections/destinations/catalog/braze/).
