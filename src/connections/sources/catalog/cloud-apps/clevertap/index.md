---
title: 'CleverTap Source'
hidden: true
---

[CleverTap](https://clevertap.com/){:target="_blank”} is the all-in-one customer engagement platform that helps brands personalize and optimize all consumer touch points to improve user engagement, retention, and lifetime value.

Using CleverTap as a source on Segment, you can evolve your team's engagement and marketing efforts. With CleverTap Exports, you can automatically forward your users' engagement and activity events to Segment. This will enable you to forward these events to your destinations or warehouses.

Segment allows you to move CleverTap data to your favorite BI or analytics tool in a seamless manner using which you can combine CleverTap data with the event data already flowing into Segment. This will help you get a holistic report of your engagement and marketing efforts.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can export data into your Segment warehouse and federate the exported data into your enabled Segment destinations.

This source is maintained by CleverTap. For any issues with the source, [contact their Support team]().

> info "This is a Beta source"
> The MoEngage Source is in beta, which means that they are still actively developing the source. If you're interested in joining their beta program or have any feedback to help improve the MoEngage Source and its documentation, [let their team know](https://help.clevertap.com/hc/en-us/requests/new)._

## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "CleverTap" in the Sources Catalog, select CleverTap, and click **Add Source**.
3. On the next screen, give the Source **a nickname** configure any other settings.
    - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (like `CleverTap_Prod`, `CleverTap_Staging`, or `CleverTap_Dev`).
4. Click **Add Source** to save your settings.
5. Copy the **Write key** from the Segment UI. You will need to input this key on the CleverTap > Partners Page.
6. Once you have the CleverTap Source's Write Key, go to CleverTap Dashboard > Settings > Partners. Search for Segment, and a click "Add Integration". 
7. Give your connection a name, enter your **Write Key**, select a Segment Region and, select a User Identity.
    - Note: Cross-region data is not allowed, so your events will be dropped by Segment if the region you select on the CleverTap is different from your Segment Workspace Region.
8. Go back to Segment and navigate to your CleverTap source. Click **Add Destinations** to add any destinations that you want to receive CleverTap data.

## Events

The table below lists events that CleverTap sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

| Name | Description
| --------------- | ----------- | ------------------------- |
| App Launched | This event is raised every time a user launches the application. |
| App Installed | The event is raised when the user launches the app for the first time. |
| App Uninstalled | This event is recorded when a user uninstalls your application. |
| App Version Changed | This event is raised when a user’s current app version is different from the user’s previous app version. |
| Notification Sent | The event is tracked when the notification is successfully sent from CleverTap to the communication channel you select for your campaign. |
| Notification Viewed | This event is tracked when a user views an email, in-app notification, or web notification sent from CleverTap. |
| Notification Clicked | This event is tracked only when a user clicks on a notification sent via CleverTap.Recorded when a user clicks on a mobile push, in-app, email, web popup, or web push message sent via the CleverTap dashboard or through the campaign API.|
| Push Impressions | This event is tracked when a Push notification sent from CleverTap is delivered on a user’s device. |
| Notification Replied | This event is recorded when a user replies to a WhatsApp message. |
| Control Group | The event is raised when a campaign is activated with a Control group. |
| Channel Unsubscribed | The event is raised when a user Unsubscribes to receive further communication through a channel|
| Reply Sent | This event is recorded when an agent (CleverTap user) replies to a message from the end user.|
| Webhook Delivered | This event is tracked when a Webhook is delivered from CleverTap |
| UTM Visited | This event is tracked when a user clicks on a link from a marketing campaign that has a UTM parameter defined on it. |
| AB Experiment Stopped | This event is recorded when the A/B experiment is stopped. |
| AB Experiment Rolled Out | This event is recorded when the A/B experiment is started. |
| AB Experiment Disqualified | This event is raised when the device is disqualified. |
| Geocluster Entered | This event is recorded to mark when a device enters a geofence. |
| Geocluster Exited | This event is recorded to mark when a device exits a geofence. |



## CleverTap Event Properties

The table below list the properties included in the events listed above.

| Name | Description |
| ---- | ----------- |
| CT App Version | Mobile Application version on which this event was tracked. App Version is tracked with all events. |
| CT SDK Version | CleverTap SDK version on which this event was tracked. SDK Version is tracked with all events. |
| CT Source | Source on which this event was tracked, for example -SDK, API. The source is tracked with all events. |
| Campaign Id | Id of the campaign associated with this event. |
| Campaign name | Represents the name of the campaign, the message was part of. |
| Campaign type | Represents the type of campaign, the message was part of. |
| wzrk_pivot | Tracked when a campaign is sent using A/B Testing. Represents the variation. |
| wzrk_c2a | Indicates the value of the button clicked by the user. This button can be present for the following campaign types: In-App, Push, or Mobile In-Box. |
| Journey Id | Helps uniquely identify the journey in which the campaign is present. |
| Campaign labels | Represent the labels added for the campaign. |

You can refer to CleverTap's [Derived Events & Attributes](https://docs.clevertap.com/docs/export-format){:target="_blank”} to determine which attributes CleverTap forward to Segment.

## Adding Destinations

Now that your source is set up, you can connect it with destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear as expected, check the [Event Delivery](/docs/connections/event-delivery/) tool and refer to the docs for each destination.

If there are any issues with how the events are arriving to Segment, [contact the CleverTap support team](https://help.clevertap.com/hc/en-us/requests/new).


## Send Data to CleverTap

You can take better advantage of CleverTap source when you also connect CleverTap as a destination in Segment. Using CleverTap as a destination, Segment translates your data and routes it to CleverTap in the format CleverTap understands, saving your engineering resources from a data conversion project. Learn more about how to use [CleverTap with Segment.](/docs/connections/destinations/catalog/clevertap/)

