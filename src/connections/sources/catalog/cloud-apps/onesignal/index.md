## OneSignal Source

[OneSignal](https://onesignal.com) is designed to help you send notifications and seamlessly manage your user communication across every channel, including mobile push notifications, web push notifications, in-app messaging, bulk SMS, and email. Our platform is quick to set up and makes it easy to customize and automate your messaging strategy without doing any development work.

This source is maintained by Onesignal. For any issues with the source, [Contact the OneSignal Support team](mailto:support@onesignal.com)


## Getting started



1. From your workspace’s [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click on “Add Source”. 
2. Search for “OneSignal” within the Sources Catalog and confirm by clicking “Add Source”
3. Give the source a nickname and a schema name. The nickname is a label used in the Segment interface, and the schema name is the namespace you query against in your warehouse. Both can be anything you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (for example, OneSignal_Prod, OneSignal_Staging). Click add source to save your settings. 
4. Copy the write key from your Segment.com workspace. 
5. Log in to the OneSignal Dashboard
6. Navigate to enable the integration: Settings -> Integrations -> Segment.com and click Activate
7. Scroll down to the "Data Out" panel
8. Enter your “Write Key” from your Segment.com workspace. [Docs](https://segment.com/docs/connections/find-writekey)
9. Select the OneSignal Events you want to have exported, and click **Save**

You are now all set to sync events from OneSignal to your Segment.com workspace. 

From your workspace's Sources catalog page click Add Source.


## Stream

OneSignal uses the stream Source component to send Segment event data. The events are generated from email, push notifications, in-app messages, and SMS messages that have been sent and the subsequent events data tied with it. 

The default behavior of is for OneSignal to pass the user-level identifiers, OneSignal ID (set by OneSignal, and External ID (set by customers), with device-level identifier, Subscription ID (set by OneSignal) with each event. Events with no External ID present are anonymous events.


## Events

The table below lists events that OneSignal sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. OneSignal includes the userId if available.


  | Event Kind                    | Event Description                                |
| ----------------------------- | ------------------------------------------------ |
| Push Sent                     | Push notification successfully sent              |
| Push Received                 | Push notification successfully received          |
| Push Clicked                  | Push notification touched on device              |
| In-App Message Displayed      | In-App Message successfully displayed on device |
| In-App Message Clicked        | In-App Message clicked on device                 |
| In-App Message Page Displayed | In-App Message page is displayed                 |
| Email Sent                    | Email successfully sent                          |
| Email Opened                  | Email opened by recipient                                  |
| Email Unsubscribed            | Email unsubscribed by recipient                              |
| Email Reported As Spam        | Email reported as Spam by recipient                           |
| Email Hardbounced             | Email returned to sender due to permanent error                                |
| Email Failed                  | Email could not deliver the email to the recipient's inbox                                     |
| SMS Sent                      | SMS sent to recipient                                        |
| SMS Delivered                 | SMS successfully Delivered                               |
| SMS Failed                    | SMS failed to send                                   |

                                  |

## Event Properties

The table below lists the properties included in the events listed above.

| Property Name     | Description                                      |
| ----------------- | ------------------------------------------------ |
| messageId         | The identifier of the discrete message           |
| campaign_id       | The identifier of the message campaign           |
| message_name      | The message name                                 |
| message_title     | The message Title                                |
| message_contents  | The message contents                             |
| message_type      | The type of message sent, push, in-app,email,SMS |
| subscription_type | The channel the message was sent through         |
| template_id       | The message template used                        |
| onesignal_id      | The OneSignal set user identifier                |



## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the Event Delivery tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [Contact the OneSignal Support team](mailto:support@onesignal.com).
