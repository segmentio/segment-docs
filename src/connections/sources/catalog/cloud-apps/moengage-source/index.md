---
title: MoEngage Source
id: kpDbTUR9oD
beta: true
---

[MoEngage](https://www.moengage.com/) is an Intelligent Customer Engagement Platform. MoEngage allows brands to personalize every customer interaction and drive better engagement, retention, loyalty and lifetime value.

Using MoEngage as a Source on Segment, you can evolve your team's engagement and marketing efforts. Leveraging MoEngage Streams, you can automatically forward your users' engagement and activity events to Segment. This will enable you to forward these events to your destinations or warehouses.

Segment allows you to move MoEngage data to your favorite BI or analytics tool in a seamless manner using which you can combine MoEngage data with the event data already flowing into Segment. This will help you get a holistic report of your engagement and marketing efforts.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by MoEngage. For any issues with the source, [contact their Support team](mailto:support@moengage.com).

_**NOTE:** The MoEngage Source is currently in beta, which means that they are still actively developing the source. If you are interested in joining their beta program or have any feedback to help improve the MoEngage Source and its documentation, [let  their team know](mailto:support@moengage.com)!_

## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "MoEngage" in the Sources Catalog, select MoEngage, and click **Add Source**.
3. On the next screen, give the Source **a nickname** configure any other settings.
    - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. `MoEngage_Prod`, `MoEngage_Staging`, `MoEngage_Dev`).
6. Click **Add Source** to save your settings.
7. Copy the **Write key** from the Segment UI. You will need to input this key on the MoEngage App Marketplace.
8. To finish the setup, contact MoEngage Support or your Customer Success Manager to get MoEngage Streams enabled in your account.
9. Once you have MoEngage Streams activated for your account, go to MoEngage Dashboard > App Marketplace. Search for Segment, and a click "Add Integration". 
10. Give your connection a name, enter your **Write Key**, and then select a Segment Region.
    - Note: Cross-region data is not allowed, so your events will be dropped by Segment if the region you select on the MoEngage App Marketplace is different from your Segment Workspace Region.
12. Go back to Segment and navigate to your MoEngage source. Click **Add Destinations** to add any destinations that you want to receive MoEngage data.

## Events

The table below lists events that MoEngage sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Related to Channel/Platform</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>App/Site Opened</td>
            <td>Tracked when a user session begins on the app or website. Also, this is tracked only if the time difference between the user&apos;s Last Active Time and App/Site Open Time is more than 30 min.</td>
            <td>Lifecycle</td>
            <td>Android, iOS, Web</td>
        </tr>
        <tr>
            <td>Viewed Web Page</td>
            <td>Tracked when a user visits a web page. Select page URL as an event attribute to find the number of users visiting a particular page or use it to set up a Drop-off capture&quot; Smart Trigger Web Push.</td>
            <td>Lifecycle</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>App Exit</td>
            <td>Tracked whenever App goes to background.</td>
            <td>Lifecycle</td>
            <td>Android, iOS</td>
        </tr>
        <tr>
            <td>User Logout</td>
            <td>Tracked when a user Logs out of the app/site or user reset.</td>
            <td>Lifecycle</td>
            <td>Android, iOS, Web</td>
        </tr>
        <tr>
            <td>Push ID Register Android</td>
            <td>Tracked when the MoEngage system registers the push id for Android devices. Attribute registered_by has the status.&nbsp;</td>
            <td>Lifecycle</td>
            <td>Android</td>
        </tr>
        <tr>
            <td>User Merged</td>
            <td>Tracked for a known user whenever a MoEngage user object is merged with it.&nbsp;</td>
            <td>Lifecycle</td>
            <td>User Merging</td>
        </tr>
        <tr>
            <td>App Update</td>
            <td>Tracked when a user updates the App.</td>
            <td>Lifecycle</td>
            <td>Android, iOS</td>
        </tr>
        <tr>
            <td>Install</td>
            <td>Tracked when a user installs the app on the device.</td>
            <td>Acquisition</td>
            <td>Android, iOS</td>
        </tr>
        <tr>
            <td>Device ReInstall</td>
            <td>Tracked when a reinstall is detected on a device.</td>
            <td>Uninstall</td>
            <td>Android, iOS</td>
        </tr>
        <tr>
            <td>Device Uninstall</td>
            <td>Tracked when a user uninstalls the app on a device.</td>
            <td>Uninstall</td>
            <td>Android, iOS</td>
        </tr>
        <tr>
            <td>User ReInstall</td>
            <td>Tracked when a reinstall is detected for an identified user in MoEngage.</td>
            <td>Uninstall</td>
            <td>Android, iOS</td>
        </tr>
        <tr>
            <td>Accepted Web Push Soft-ask</td>
            <td>Tracked when a user accepts the Push Permission Soft-ask on your website as part of the 2-step Push Opt-in mechanism.</td>
            <td>Reachability</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Closed Web Push Soft-ask</td>
            <td>Tracked when a user closes the Push Permission Soft-ask on your website as part of the 2-step Push Opt-in mechanism.</td>
            <td>Reachability</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Denied Web Push Subscription</td>
            <td>Tracked when a user denies receiving push notifications on the Web.</td>
            <td>Reachability</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Dismissed Web Push Subscription</td>
            <td>Tracked when a user dismisses the push subscription prompt.</td>
            <td>Reachability</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Overlay clicked in 1-click HTTP subscription</td>
            <td>Tracked when a user clicks a Subscription Message on your website as part of the HTTP Push Subscription flow.</td>
            <td>Reachability</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Overlay shown in 1-click HTTP subscription</td>
            <td>Tracked when a user views a Subscription Message on your website as part of the HTTP Push Subscription flow.</td>
            <td>Reachability</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Reachability Push Android</td>
            <td>Reachability Push Android is True (200) when the user is reachable on at least one android device.</td>
            <td>Reachability</td>
            <td>Android</td>
        </tr>
        <tr>
            <td>Reachability Push iOS</td>
            <td>Reachability Push iOS is True (200) when the user is reachable on at least one iOS device.</td>
            <td>Reachability</td>
            <td>iOS</td>
        </tr>
        <tr>
            <td>Reachability Push Web</td>
            <td>Reachability Push Web is True (200) when the user is reachable on at least one web device.</td>
            <td>Reachability</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Subscribed to Web Push</td>
            <td>Tracked when a user is subscribed to Web Push Notifications. Use it to find the day-wise count of subscribers or set up a Welcome&quot; Smart Trigger Web Push.</td>
            <td>Reachability</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Unsubscribed from Web Push</td>
            <td>Tracked when a user directly unsubscribes from the website/chrome settings or GCM communicates that a push token is invalid.</td>
            <td>Reachability</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Viewed Web Push Soft-ask</td>
            <td>Tracked when a user views the Push Permission Soft-ask on your website as part of the 2-step Push Opt-in mechanism.</td>
            <td>Reachability</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Allowed Web Push Subscription</td>
            <td>Tracked when a user allows receiving push notifications on the Web.</td>
            <td>Campaign Activity</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Displayed Web Push Subscription&nbsp;</td>
            <td>When hard ask is shown to the user.</td>
            <td>Campaign Activity</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Onsite Message Template clicked<br></td>
            <td>On clicking the Onsite Messaging template.</td>
            <td>Campaign Activity</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Onsite Message Template shown<br></td>
            <td>On a load of Onsite Messaging template.</td>
            <td>Campaign Activity</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Onsite Message Template closed<br></td>
            <td>On closing the Onsite Messaging template.</td>
            <td>Campaign Activity</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Onsite Message Template auto dismiss<br></td>
            <td>When the Onsite Messaging template closes by itself after the time duration given while creating the campaign.</td>
            <td>Campaign Activity</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Card Clicked</td>
            <td>Tracked when the user clicks the Card in the App Inbox.</td>
            <td>Campaign Activity</td>
            <td>Android, iOS</td>
        </tr>
        <tr>
            <td>Card Delivered&nbsp;</td>
            <td>Tracked when a Card is delivered to the App Inbox after the user has opened the Inbox.</td>
            <td>Campaign Activity</td>
            <td>Android, iOS</td>
        </tr>
        <tr>
            <td>Card Sent</td>
            <td>Tracked when a Card notification is sent to the user, doesn&apos;t indicate if the notification is delivered to the App Inbox.</td>
            <td>Campaign Activity</td>
            <td>Android, iOS</td>
        </tr>
        <tr>
            <td>Card Viewed</td>
            <td>Tracked when the user views a Card or scrolls down to it in the App Inbox.</td>
            <td>Campaign Activity</td>
            <td>Android, iOS</td>
        </tr>
        <tr>
            <td>Connector Sent</td>
            <td>Tracked when a connector was sent successfully.</td>
            <td>Campaign Activity</td>
            <td>Connector</td>
        </tr>
        <tr>
            <td>Email Bounced</td>
            <td>Tracked when our system finds an email is hard bounced. Typically happens when an email address doesn&apos;t exist.</td>
            <td>Campaign Activity</td>
            <td>Email</td>
        </tr>
        <tr>
            <td>Email Clicked</td>
            <td>Tracked when a user clicks on any link in the email.</td>
            <td>Campaign Activity</td>
            <td>Email</td>
        </tr>
        <tr>
            <td>Email Complained</td>
            <td>Tracked when a user marks the email as spam.</td>
            <td>Campaign Activity</td>
            <td>Email</td>
        </tr>
        <tr>
            <td>Email Dropped</td>
            <td>Tracked when an email is dropped. Email is dropped, when it&apos;s part of the bounce list, the unsubscribe list, or the spam report list.</td>
            <td>Campaign Activity</td>
            <td>Email</td>
        </tr>
        <tr>
            <td>Email Opened</td>
            <td>Tracked when a user opens an email.</td>
            <td>Campaign Activity</td>
            <td>Email</td>
        </tr>
        <tr>
            <td>Email Sent</td>
            <td>Tracked when our system sends an email to a user.</td>
            <td>Campaign Activity</td>
            <td>Email</td>
        </tr>
        <tr>
            <td>Email Soft Bounced</td>
            <td>Tracked when our system finds an email is soft bounced. Typically happens when there is a temporary delivery issue.</td>
            <td>Campaign Activity</td>
            <td>Email</td>
        </tr>
        <tr>
            <td>Email Unsubscribed</td>
            <td>Tracked when a user unsubscribes from receiving emails.</td>
            <td>Campaign Activity</td>
            <td>Email</td>
        </tr>
        <tr>
            <td>Email Unsubscribe Drop</td>
            <td>Tracked when an email is dropped because the user is part of an unsubscribe list. This is tracked at SendGrid. This event is currently under&nbsp;<em>BETA</em>.&nbsp;</td>
            <td>Campaign Activity</td>
            <td>Email</td>
        </tr>
        <tr>
            <td>Email Viewed in Browser</td>
            <td>Tracked when a user clicks on the view in the browser link present in the email.</td>
            <td>Campaign Activity</td>
            <td>Email</td>
        </tr>
        <tr>
            <td>Facebook Audience Synced</td>
            <td>Tracked when Facebook API returns 2xx response for add or delete request to an audience.</td>
            <td>Campaign Activity</td>
            <td>Facebook</td>
        </tr>
        <tr>
            <td>In-App Clicked Android</td>
            <td>Tracked when a user clicks In-App message on Android device.</td>
            <td>Campaign Activity</td>
            <td>Android</td>
        </tr>
        <tr>
            <td>In-App Clicked iOS</td>
            <td>Tracked when a user clicks In-App message on iOS device.</td>
            <td>Campaign Activity</td>
            <td>iOS</td>
        </tr>
        <tr>
            <td>In-App Clicked Windows</td>
            <td>Tracked when a user clicks In-App message on Windows device.</td>
            <td>Campaign Activity</td>
            <td>Windows</td>
        </tr>
        <tr>
            <td>In-App Closed Android</td>
            <td>Tracked when a user dismisses In-App message by clicking on the close button on an Android device.</td>
            <td>Campaign Activity</td>
            <td>Android</td>
        </tr>
        <tr>
            <td>In-App Closed iOS</td>
            <td>Tracked when a user dismisses In-App message by clicking on the close button on an iOS device.</td>
            <td>Campaign Activity</td>
            <td>iOS</td>
        </tr>
        <tr>
            <td>In-App Closed Windows</td>
            <td>Tracked when a user dismisses In-App message by clicking on the close button on Windows device.</td>
            <td>Campaign Activity</td>
            <td>Windows</td>
        </tr>
        <tr>
            <td>In-App Shown Android</td>
            <td>Tracked when an In-App message is shown to the user on an Android device.</td>
            <td>Campaign Activity</td>
            <td>Android</td>
        </tr>
        <tr>
            <td>In-App Shown iOS</td>
            <td>Tracked when an In-App message is shown to the user on an iOS device.</td>
            <td>Campaign Activity</td>
            <td>iOS</td>
        </tr>
        <tr>
            <td>In-App Shown Windows</td>
            <td>Tracked when an In-App message is shown to the user on a Windows device.</td>
            <td>Campaign Activity</td>
            <td>Windows</td>
        </tr>
        <tr>
            <td>Notification Clicked Android</td>
            <td>Tracked when a user clicks notification on an Android device.</td>
            <td>Campaign Activity</td>
            <td>Android</td>
        </tr>
        <tr>
            <td>Notification Clicked iOS</td>
            <td>Tracked when a user clicks notification on iOS device.</td>
            <td>Campaign Activity</td>
            <td>iOS</td>
        </tr>
        <tr>
            <td>Notification Clicked Web</td>
            <td>Tracked when a user clicks notification on the browser.</td>
            <td>Campaign Activity</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Notification Clicked Windows</td>
            <td>Tracked when a user clicks notification on Windows device.</td>
            <td>Campaign Activity</td>
            <td>Windows</td>
        </tr>
        <tr>
            <td>Notification Dismissed iOS</td>
            <td>Tracked when the user dismisses the notification on iOS device.</td>
            <td>Campaign Activity</td>
            <td>iOS</td>
        </tr>
        <tr>
            <td>Notification Received Android</td>
            <td>Tracked when a user receives a notification on an Android device.</td>
            <td>Campaign Activity</td>
            <td>Android</td>
        </tr>
        <tr>
            <td>Notification Received iOS App Active</td>
            <td>Tracked when App in foreground and user receives the notification on iOS.</td>
            <td>Campaign Activity</td>
            <td>iOS</td>
        </tr>
        <tr>
            <td>Notification Received iOS</td>
            <td>Tracked when a user receives a notification on an iOS device.</td>
            <td>Campaign Activity</td>
            <td>iOS</td>
        </tr>
        <tr>
            <td>Notification Received Web</td>
            <td>Tracked when a user receives a notification on a browser.</td>
            <td>Campaign Activity</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Notification Sent Windows</td>
            <td>Tracked when a user receives a notification on a Windows device.</td>
            <td>Campaign Activity</td>
            <td>Windows</td>
        </tr>
        <tr>
            <td>Notification Sent iOS</td>
            <td>Tracked when a user receives a notification on an iOS device.</td>
            <td>Campaign Activity</td>
            <td>iOS</td>
        </tr>
        <tr>
            <td>Notification Swiped Android</td>
            <td>Tracked when a notification is dismissed by the user with a swipe gesture on Android.</td>
            <td>Campaign Activity</td>
            <td>Android</td>
        </tr>
        <tr>
            <td>On-site Message Shown</td>
            <td>Tracked when an on-site messaging campaign is shown to a user.</td>
            <td>Campaign Activity</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>On-site Message Clicked</td>
            <td>Tracked when an on-site messaging campaign is clicked by a user.</td>
            <td>Campaign Activity&nbsp;</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>On-site Message Closed</td>
            <td>Tracked when an on-site messaging campaign is closed by a user.</td>
            <td>Campaign Activity</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Push Preference Changed iOS</td>
            <td>Tracked when iOS device push preference is changed. It has a modified status.</td>
            <td>Campaign Activity</td>
            <td>iOS</td>
        </tr>
        <tr>
            <td>Web Personalization Message Shown</td>
            <td>Tracked when a web personalization campaign is shown to a user.</td>
            <td>Campaign Activity&nbsp;</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Web Personalization Message Clicked</td>
            <td>Tracked when a web personalization campaign is clicked by a user.&nbsp;</td>
            <td>Campaign Activity&nbsp;</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>Web Personalization Message Closed</td>
            <td>Tracked when a web personalization campaign is closed by a user.</td>
            <td>Campaign Activity</td>
            <td>Web</td>
        </tr>
        <tr>
            <td>SMS Delivered</td>
            <td>Tracked when our system receives a delivery receipt for the SMS sent to a user.</td>
            <td>Campaign Activity</td>
            <td>SMS</td>
        </tr>
        <tr>
            <td>SMS Sent</td>
            <td>Tracked when our system sends SMS to a user.</td>
            <td>Campaign Activity</td>
            <td>
                <p>SMS</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>SMS Clicked</p>
            </td>
            <td>Tracked when a user clicks on any of the links in the SMS message body.</td>
            <td>Campaign Activity</td>
            <td>SMS</td>
        </tr>
        <tr>
            <td>
                <p>User Entered Flow</p>
            </td>
            <td>Tracked when a user falls in the target audience and has qualified for the entry in the Flow.</td>
            <td>Campaign Activity</td>
            <td>Flows</td>
        </tr>
        <tr>
            <td>User Exited Flow</td>
            <td>Tracked when a user exits from a Stop Cell of the Flow.</td>
            <td>Campaign Activity</td>
            <td>Flows</td>
        </tr>
        <tr>
            <td>User removed from campaign due to control group</td>
            <td>Generated while sending a campaign out with the control group defined.</td>
            <td>Campaign Activity</td>
            <td>Flows/Campaign Channels</td>
        </tr>
        <tr>
            <td>User added to control group</td>
            <td>Generated while creating a global control group.</td>
            <td>Campaign Activity</td>
            <td>Flows/Campaign Channels</td>
        </tr>
        <tr>
            <td>User removed from control group</td>
            <td>Generated when the global control group is updated. &nbsp;Specifically when the global control group % is reduced or the global control group is refreshed.</td>
            <td>Campaign Activity</td>
            <td>Flows/Campaign Channels</td>
        </tr>
        <tr>
            <td>WhatsApp Message Clicked</td>
            <td>Tracked when a WhatsApp Message is read by the user. It will only be available for users who have read receipts enabled.</td>
            <td>Campaign Activity</td>
            <td>Flows/Campaign Channels</td>
        </tr>
        <tr>
            <td>WhatsApp Message Delivered</td>
            <td>Tracked when a WhatsApp Message is delivered to a user.</td>
            <td>Campaign Activity</td>
            <td>Flows/Campaign Channels</td>
        </tr>
        <tr>
            <td>WhatsApp Message Delivery Failed</td>
            <td>Tracked when provider failed to send/deliver a WhatsApp Message for a user.</td>
            <td>Campaign Activity</td>
            <td>Flows/Campaign Channels</td>
        </tr>
        <tr>
            <td>WhatsApp Message Read</td>
            <td>Tracked when a WhatsApp Message is read by the user. It will only be available for users who have read receipts enabled.</td>
            <td>Campaign Activity</td>
            <td>Flows/Campaign Channels</td>
        </tr>
        <tr>
            <td>WhatsApp Message Sent</td>
            <td>Tracked when a WhatsApp message is sent to a user.</td>
            <td>Campaign Activity</td>
            <td>Flows/Campaign Channels</td>
        </tr>
        <tr>
            <td>Custom Event</td>
            <td>Custom events are events defined by you.</td>
            <td>-</td>
            <td>-</td>
        </tr>
    </tbody>
</table>

## MoEngage Event Properties

The table below list the properties included in the events listed above.

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>App Version</td>
            <td>Mobile Application version on which this event was tracked. App Version is tracked with all events.</td>
        </tr>
        <tr>
            <td>SDK Version</td>
            <td>MoEngage SDK version on which this event was tracked. SDK Version is tracked with all events.</td>
        </tr>
        <tr>
            <td>Platform</td>
            <td>OS name on which this event was tracked, for example -Android, iOS, Web. The platform is tracked with all events.</td>
        </tr>
        <tr>
            <td>Campaign Id</td>
            <td>Id of the campaign associated with this event.</td>
        </tr>
        <tr>
            <td>Campaign Name</td>
            <td>Represents the name of the campaign, the message was part of.</td>
        </tr>
        <tr>
            <td>Campaign Type</td>
            <td>Represents the type of campaign, the message was part of.</td>
        </tr>
        <tr>
            <td>Readable Campaign Id</td>
            <td>Represents the id of the campaign, the message was part of.</td>
        </tr>
        <tr>
            <td>Parent Campaign id</td>
            <td>Tracked when a periodic campaign is run. Represents the campaign id of parent periodic campaign, child instances of which are re-run on a recurring basis.</td>
        </tr>
        <tr>
            <td>Parent Flow Id</td>
            <td>Tracked when the journey campaign is run. Represents the Flow Id of the parent journey campaign.</td>
        </tr>
        <tr>
            <td>Parent Flow Name</td>
            <td>Tracked when the journey campaign is run. Represents the flow name of the parent journey campaign.</td>
        </tr>
        <tr>
            <td>Locale Id</td>
            <td>Tracked when the campaign is sent using Localization. Represents the id of message locale.</td>
        </tr>
        <tr>
            <td>Locale Name</td>
            <td>Tracked when the campaign is sent using Localization. Represents the name of the message locale.</td>
        </tr>
        <tr>
            <td>Variation Id</td>
            <td>Tracked when a campaign is sent using A/B Testing. Represents the id of message variation.</td>
        </tr>
        <tr>
            <td>URL</td>
            <td>Tracked when display filter is selected in the in-app campaign.</td>
        </tr>
        <tr>
            <td>timestamp</td>
            <td>User time while performing the event. This is in epoch time.</td>
        </tr>
        <tr>
            <td>First Session</td>
            <td>Generated for all the events tracked with MoEngage web SDK. Value is True for the first session of the user only.</td>
        </tr>
        <tr>
            <td>Logged In Status</td>
            <td>Generated for all the events tracked with MoEngage web SDK. Value is True if the user has logged in on the device.</td>
        </tr>
        <tr>
            <td>Exit Reason</td>
            <td>Tracked when a user exits the flow. This is tracked as an attribute of the &apos;User Exited Flow&apos; event.</td>
        </tr>
    </tbody>
</table>

You can refer to MoEngage's [Derived Events & Attributes](https://help.moengage.com/hc/en-us/articles/207836953-Derived-Events-Attributes) to know which attributes you can forward to Segment.


## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the MoEngage support team](mailto:support@moengage.com).


## Send Data to MoEngage

You can take better advantage of MoEngage Source when you also connect MoEngage as a Destination on Segment. Using MoEngage as a Destination, Segment will translate your data and route it to MoEngage in the format MoEngage understands so that you can save some of your engineering efforts for using MoEngage. Learn more about how to use [MoEngage with Segment.](/docs/destinations/moengage/) 