---
title: OneSignal Source
id: o9OyD6xsVJ
beta: true
---

[OneSignal](https://onesignal.com){:target="_blank"} is designed to help you send notifications and seamlessly manage your user communication across every channel, including mobile push notifications, web push notifications, in-app messaging, bulk SMS, and email. The OneSignal platform is quick to set up and makes it easy to customize and automate your messaging strategy without doing any development work.

OneSignal maintains this source. For any issues with the source, [contact the OneSignal Support team](mailto:support@onesignal.com)


## Getting started

1. From your workspace’s [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"}, search for **OneSignal** and then click on the OneSignal Source Tile. 
2. On the OneSignal Source Catalog page, click **Add Source**.
3. Give the source a name, for example `OneSignal_Prod`. The name is used in the Segment interface. Click **Add source** to save your settings. 
4. Copy the [write key](/docs/connections/find-writekey) from your Segment workspace. 
5. Log in to the OneSignal Dashboard.
6. Navigate to enable the integration: **Settings > Integrations > Segment.com** and click **Activate**.
7. Scroll down to the **Data Out** panel and enter your write key from your Segment workspace. 
9. Select the OneSignal Events you want to export, then click **Save**. 


> info ""
> Exercise caution when sending **Email Sent**, **SMS Sent**, **Push Sent** and **In App Message Displayed** events to Segment, as these events can contribute significantly to your Segment MTU usage volume. 

You are now all set to sync events from OneSignal to your Segment workspace. 

## Stream

OneSignal uses Segment’s [stream source component](/docs/partners/streams/) to send events to Segment. These events are then available in any destination that accepts server-side events, including your data warehouse.

By default, OneSignal passes the user-level identifiers OneSignal ID (set by OneSignal) and External ID (set by customers), as well as the subscription-level identifier Subscription ID (set by OneSignal) with each event. 

Events with no External ID present are anonymous events.

## Identifiers

The events OneSignal sends to Segment are identifiers with either `userId` or `anonymousId`.

OneSignal sets the Segment `userId` equal to the OneSignal External ID. If there is no OneSignal External ID for the user, OneSignal sets the Segment `anonymousId` equal to the OneSignal Subscription ID.

OneSignal doesn't send user email address or phone number details to Segment.


## Events

The following table lists the events that OneSignal sends to Segment. These events appear as tables in your warehouse and as regular events in other destinations. 

| Event Kind                    | Event Description                                    |
| ----------------------------- | ---------------------------------------------------- |
| Push Sent                     | Push notification successfully sent                  |
| Push Received                 | Push notification successfully received              |
| Push Clicked                  | Push notification touched on device                  |
| In-App Message Displayed      | In-App Message successfully displayed on device      |
| In-App Message Clicked        | In-App Message clicked on device                     |
| In-App Message Page Displayed | In-App Message page is displayed                     |
| Email Sent                    | Email successfully sent                              |
| Email Opened                  | Email opened by recipient                            |
| Email Unsubscribed            | Email unsubscribed by recipient                      |
| Email Received                | Email received by recipient                          |
| Email Reported As Spam        | Email reported as spam by recipient                  |
| Email Hardbounced             | Email returned to sender due to permanent error      |
| Email Failed                  | Could not deliver the email to the recipient's inbox |
| SMS Sent                      | SMS sent to recipient                                |
| SMS Delivered                 | SMS successfully delivered                           |
| SMS Failed                    | SMS failed to send                                   |

## Event properties

The following table lists the properties included in the events from the Events table.

| Property Name       | Description                                        |
| ------------------- | -------------------------------------------------- |
| `messageId`         | The identifier of the discrete message             |
| `campaign_id`       | The identifier of the message campaign             |
| `message_name`      | The message name                                   |
| `message_title`     | The message title                                  |
| `message_contents`  | The message contents                               |
| `message_type`      | The type of message sent, push, in-app, email, SMS |
| `subscription_type` | The channel the message was sent through           |
| `template_id`       | The message template used                          |
| `onesignal_id`      | The OneSignal set user identifier                  |



## Adding destinations

Now that your source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected. Ensure the events contain all of the properties you expect. If your events and properties don’t appear, check the Event Delivery tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the OneSignal Support team](mailto:support@onesignal.com).