---
title: MoEngage Source
id: kpDbTUR9oD
beta: true
---

[MoEngage](https://www.moengage.com/){:target="_blank”} is an Intelligent Customer Engagement Platform. MoEngage allows brands to personalize every customer interaction and drive better engagement, retention, loyalty and lifetime value.

Using MoEngage as a source on Segment, you can evolve your team's engagement and marketing efforts. With MoEngage Streams, you can automatically forward your users' engagement and activity events to Segment. This will enable you to forward these events to your destinations or warehouses.

Segment allows you to move MoEngage data to your favorite BI or analytics tool in a seamless manner using which you can combine MoEngage data with the event data already flowing into Segment. This will help you get a holistic report of your engagement and marketing efforts.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can export data into your Segment warehouse and federate the exported data into your enabled Segment destinations.

This source is maintained by MoEngage. For any issues with the source, [contact their Support team](mailto:support@moengage.com).

> info "This is a Beta source"
> The MoEngage Source is in beta, which means that they are still actively developing the source. If you're interested in joining their beta program or have any feedback to help improve the MoEngage Source and its documentation, [let their team know](mailto:support@moengage.com)._

## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "MoEngage" in the Sources Catalog, select MoEngage, and click **Add Source**.
3. On the next screen, give the Source **a nickname** configure any other settings.
    - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (like `MoEngage_Prod`, `MoEngage_Staging`, or `MoEngage_Dev`).
4. Click **Add Source** to save your settings.
5. Copy the **Write key** from the Segment UI. You will need to input this key on the MoEngage App Marketplace.
6. Once you have the MoEngage Source's Write Key, go to MoEngage Dashboard > App Marketplace. Search for Segment, and a click "Add Integration". 
7. Give your connection a name, enter your **Write Key**, and then select a Segment Region.
    - Note: Cross-region data is not allowed, so your events will be dropped by Segment if the region you select on the MoEngage App Marketplace is different from your Segment Workspace Region.
8. Go back to Segment and navigate to your MoEngage source. Click **Add Destinations** to add any destinations that you want to receive MoEngage data.

## Events

The table below lists events that MoEngage sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

| Name | Description | Category | Related to Channel/Platform
| --------------- | ----------- | -------- | ------------------------- |
| App/Site Opened | Tracked when a user session begins on the app or website. Also, this is tracked only if the time difference between the user's Last Active Time and App/Site Open Time is more than 30 min. | Lifecycle | Android, iOS, Web |
| Viewed Web Page | Tracked when a user visits a web page. Select page URL as an event attribute to find the number of users visiting a particular page or use it to set up a Drop-off capture "Smart Trigger Web Push." | Lifecycle | Web |
| App Exit | Tracked whenever App goes to background. | Lifecycle | Android, iOS |
| User Logout | Tracked when a user Logs out of the app/site or user reset. | Lifecycle | Android, iOS |
| Push ID Register Android | Tracked when the MoEngage system registers the push id for Android devices. Attribute `registered_by` has the status. | Lifecycle | Android |
| User Merged | Tracked for a known user whenever a MoEngage user object is merged with it. | Lifecycle | User Merging |
| App Update | Tracked when a user updates the App. | Lifecycle | Android, iOS |
| Install | Tracked when a user installs the app on the device. | Acquisition | Android, iOS |
| Device ReInstall | Tracked when a reinstall is detected on a device. | Uninstall | Android, iOS |
| Device Uninstall | Tracked when a user uninstalls the app on a device. | Uninstall | Android, iOS |
| User ReInstall | Tracked when a reinstall is detected for an identified user in MoEngage. | Uninstall | Android, iOS |
| Accepted Web Push Soft-ask | Tracked when a user accepts the Push Permission Soft-ask on your website as part of the 2-step Push Opt-in mechanism. | Reachability | Web |
| Closed Web Push Soft-ask | Tracked when a user closes the Push Permission Soft-ask on your website as part of the 2-step Push Opt-in mechanism. | Reachability | Web |
| Denied Web Push Subscription | Tracked when a user denies receiving push notifications on the Web. | Reachability | Web |
| Dismissed Web Push Subscription | Tracked when a user dismisses the push subscription prompt. | Reachability | Web |
| Overlay clicked in 1-click HTTP subscription | Tracked when a user clicks a Subscription Message on your website as part of the HTTP Push Subscription flow. | Reachability | Web |
| Overlay shown in 1-click HTTP subscription | Tracked when a user views a Subscription Message on your website as part of the HTTP Push Subscription flow. | Reachability | Web |
| Reachability Push Android | Reachability Push Android is True (200) when the user is reachable on at least one android device. | Reachability | Android |
| Reachability Push iOS | Reachability Push iOS is True (200) when the user is reachable on at least one iOS device. | Reachability | iOS |
| Reachability Push Web | Reachability Push Web is True (200) when the user is reachable on at least one web device. | Reachability | Web |
| Subscribed to Web Push | Tracked when a user is subscribed to Web Push Notifications. Use it to find the day-wise count of subscribers or set up a Welcome Smart Trigger Web Push. | Reachability | Web |
| Unsubscribed from Web Push | Tracked when a user directly unsubscribes from the website/chrome settings or GCM communicates that a push token is invalid. | Reachability | Web |
| Viewed Web Push Soft-ask | Tracked when a user views the Push Permission Soft-ask on your website as part of the 2-step Push Opt-in mechanism. | Reachability | Web |
| Allowed Web Push Subscription | Tracked when a user allows receiving push notifications on the Web. | Campaign Activity | Web |
| Displayed Web Push Subscription | When hard ask is shown to the user. | Campaign Activity | Web | 
| Onsite Message Template clicked | On clicking the Onsite Messaging template. | Campaign Activity | Web |
| Onsite Message Template shown | On a load of Onsite Messaging template. | Campaign Activity | Web |
| Onsite Message Template closed | On closing the Onsite Messaging template. | Campaign Activity | Web |
| Onsite Message Template auto dismiss | When the Onsite Messaging template closes by itself after the time duration given while creating the campaign. | Campaign Activity | Web |
| Card Clicked | Tracked when the user clicks the Card in the App Inbox. | Campaign Activity | Android, iOS |
| Card Delivered | Tracked when a Card is delivered to the App Inbox after the user has opened the Inbox. | Campaign Activity | Android, iOS |
| Card Sent | Tracked when a Card notification is sent to the user, doesn't indicate if the notification is delivered to the App Inbox. | Campaign Activity | Android, iOS |
| Card Viewed | Tracked when the user views a Card or scrolls down to it in the App Inbox. | Campaign Activity | Android, iOS |
| Connector Sent | Tracked when a connector was sent successfully. | Campaign Activity | Connector |
| Email Bounced | Tracked when MoEngage finds an email is hard bounced. Typically happens when an email address doesn't exist. | Campaign Activity | Email |
| Email Clicked | Tracked when a user clicks on any link in the email. | Campaign Activity | Email |
| Email Complained | Tracked when a user marks the email as spam. | Campaign Activity | Email |
| Email Dropped | Tracked when an email is dropped. Email is dropped, when it's part of the bounce list, the unsubscribe list, or the spam report list. | Campaign Activity | Email |
| Email Opened | Tracked when a user opens an email. | Campaign Activity | Email |
| Email Sent | Tracked when MoEngage sends an email to a user. | Campaign Activity | Email |
| Email Soft Bounced | Tracked when MoEngage finds an email is soft bounced. Typically happens when there is a temporary delivery issue. | Campaign Activity | Email |
| Email Unsubscribed | Tracked when MoEngage finds an email is soft bounced. Typically happens when there is a temporary delivery issue. | Campaign Activity | Email |
| Email Unsubscribe Drop | Tracked when an email is dropped because the user is part of an unsubscribe list. This is tracked at SendGrid. This event is currently under **BETA**. | Campaign Activity | Email |
| Email Viewed in Browser | Tracked when a user clicks on the view in the browser link present in the email. | Campaign Activity | Email |
| Facebook Audience Synced | Tracked when Facebook API returns 2xx response for add or delete request to an audience. | Campaign Activity | Facebook |
| In-App Clicked Android | Tracked when a user clicks In-App message on Android device. | Campaign Activity | Android |
| In-App Clicked iOS | Tracked when a user clicks In-App message on iOS device. | Campaign Activity | iOS |
| In-App Clicked Windows | Tracked when a user clicks In-App message on Windows device. | Campaign Activity | Windows |
| In-App Closed Android | Tracked when a user dismisses In-App message by clicking on the close button on an Android device. | Campaign Activity | Android |
| In-App Closed iOS | Tracked when a user dismisses In-App message by clicking on the close button on an iOS device. | Campaign Activity | iOS |
| In-App Closed Windows | Tracked when a user dismisses In-App message by clicking on the close button on Windows device. | Campaign Activity | Windows |
| In-App Shown Android | Tracked when an In-App message is shown to the user on an Android device. | Campaign Activity | Android |
| In-App Shown iOS | Tracked when an In-App message is shown to the user on an iOS device. | Campaign Activity | iOS |
| In-App Shown Windows | Tracked when an In-App message is shown to the user on a Windows device. | Campaign Activity | Windows |
| Notification Clicked Android | Tracked when a user clicks notification on an Android device. | Campaign Activity | Android |
| Notification Clicked iOS | Tracked when a user clicks notification on an iOS device. | Campaign Activity | iOS |
| Notification Clicked Web | Tracked when a user clicks notification on the browser. | Campaign Activity | Web |
| Notification Clicked Windows | Tracked when a user clicks notification on a Windows device. | Campaign Activity | Windows |
| Notification Dismissed iOS | Tracked when the user dismisses the notification on iOS device. | Campaign Activity | iOS |
| Notification Received Android | Tracked when a user receives a notification on an Android device. | Campaign Activity | Android |
| Notification Received iOS App Active | Tracked when App in foreground and user receives the notification on iOS. | Campaign Activity | iOS |
| Notification Received iOS | Tracked when a user receives a notification on an iOS device. | Campaign Activity | iOS |
| Notification Received Web | Tracked when a user receives a notification on a browser. | Campaign Activity | Web |
| Notification Sent Windows | Tracked when a user receives a notification on a Windows device. | Campaign Activity | Windows |
| Notification Sent iOS | Tracked when a user receives a notification on an iOS device. | Campaign Activity | iOS |
| Notification Swiped Android | Tracked when a notification is dismissed by the user with a swipe gesture on Android. | Campaign Activity | Android |
| On-site Message Shown | Tracked when an on-site messaging campaign is shown to a user. | Campaign Activity | Web |
| On-site Message Clicked | Tracked when an on-site messaging campaign is clicked by a user. | Campaign Activity | Web |
| On-site Message Closed | Tracked when an on-site messaging campaign is closed by a user. | Campaign Activity | Web |
| Push Preference Changed iOS | Tracked when iOS device push preference is changed. It has a modified status. | Campaign Activity | iOS |
| Web Personalization Message Shown | Tracked when a web personalization campaign is shown to a user. | Campaign Activity | Web |
| Web Personalization Message Clicked | Tracked when a web personalization campaign is clicked by a user. | Campaign Activity | Web |
| Web Personalization Message Closed | Tracked when a web personalization campaign is closed by a user. |  Campaign Activity | Web |
| SMS Delivered | Tracked when MoEngage receives a delivery receipt for the SMS sent to a user. | Campaign Activity | SMS |
| SMS Sent | Tracked when MoEngage sends SMS to a user. | Campaign Activity | SMS |
| SMS Clicked | Tracked when a user clicks on any of the links in the SMS message body. | Campaign Activity | SMS |
| User Entered Flow | Tracked when a user falls in the target audience and has qualified for the entry in the Flow. | Campaign Activity | Flows |
| User Exited Flow | Tracked when a user exists from a Stop Cell of the Flow. | Campaign Activity | Flows |
| User removed from campaign due to control group | Generated while sending a campaign out with the control group defined. | Campaign Activity | Flows/Campaign Channels |
| User added to control group | Generated while creating a global control group. |Campaign Activity | Flows/Campaign Channels |
| User removed from control group | Generated when the global control group is updated. Specifically when the global control group % is reduced or the global control group is refreshed. | Campaign Activity | Flows/Campaign Channels |
| WhatsApp Message Clicked | Tracked when a WhatsApp Message is read by the user. It will only be available for users who have read receipts enabled. | Campaign Activity | Flows/Campaign Channels |
| WhatsApp Message Delivered | Tracked when a WhatsApp Message is delivered to a user. | Campaign Activity | Flows/Campaign Channels |
| WhatsApp Message Delivery Failed | Tracked when provider failed to send/deliver a WhatsApp Message for a user. | Campaign Activity | Flows/Campaign Channels |
| WhatsApp Message Read | Tracked when a WhatsApp Message is read by the user. It will only be available for users who have read receipts enabled. | Campaign Activity | Flows/Campaign Channels |
| WhatsApp Message Sent | Tracked when a WhatsApp message is sent to a user. | Campaign Activity | Flows/Campaign Channels |
| Custom Event | Custom events are events defined by you. | - | - |

## MoEngage Event Properties

The table below list the properties included in the events listed above.

| Name | Description |
| ---- | ----------- |
| App Version | Mobile Application version on which this event was tracked. App Version is tracked with all events. |
| SDK Version | MoEngage SDK version on which this event was tracked. SDK Version is tracked with all events. |
| Platform | OS name on which this event was tracked, for example -Android, iOS, Web. The platform is tracked with all events. |
| Campaign Id | Id of the campaign associated with this event. |
| Campaign Name | Represents the name of the campaign, the message was part of. |
| Campaign Type | Represents the type of campaign, the message was part of. |
| Readable Campaign Id | Represents the id of the campaign, the message was part of. |
| Parent Campaign Id | Tracked when a periodic campaign is run. Represents the campaign id of parent periodic campaign, child instances of which are re-run on a recurring basis. | 
| Parent Flow Id | Tracked when the journey campaign is run. Represents the Flow Id of the parent journey campaign. |
| Parent Flow Name | Tracked when the journey campaign is run. Represents the flow name of the parent journey campaign. |
| Locale Id | Tracked when the campaign is sent using Localization. Represents the id of message locale. |
| Locale Name | Tracked when the campaign is sent using Localization. Represents the name of the message locale. |
| Variation Id | Tracked when a campaign is sent using A/B Testing. Represents the id of message variation. |
| URL | Tracked when display filter is selected in the in-app campaign. |
| Timestamp | User time while performing the event. This is in epoch time. |
| First Session | Generated for all the events tracked with MoEngage web SDK. Value is True for the first session of the user only. |
| Logged In Status | Generated for all the events tracked with MoEngage web SDK. Value is True if the user has logged in on the device. |
| Exit Reason | Tracked when a user exits the flow. This is tracked as an attribute of the "User Exited Flow" event. | 

You can refer to MoEngage's [Derived Events & Attributes](https://help.moengage.com/hc/en-us/articles/207836953-Derived-Events-Attributes){:target="_blank”} to determine which attributes you can forward to Segment.


## Adding Destinations

Now that your source is set up, you can connect it with destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear as expected, check the [Event Delivery](/docs/connections/event-delivery/) tool and refer to the docs for each destination.

If there are any issues with how the events are arriving to Segment, [contact the MoEngage support team](mailto:support@moengage.com).


## Send Data to MoEngage

You can take better advantage of MoEngage source when you also connect MoEngage as a destination in Segment. Using MoEngage as a destination, Segment translates your data and routes it to MoEngage in the format MoEngage understands, saving your engineering resources from a data conversion project. Learn more about how to use [MoEngage with Segment.](/docs/connections/destinations/catalog/moengage/)

