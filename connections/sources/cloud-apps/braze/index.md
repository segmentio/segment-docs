---
title: Braze
---

Braze is a marketing automation and customer engagement platform. Growth, Engagement, and Marketing teams use Braze to build great long term relationships with their customers across key digital channels.  

Take your company’s marketing and customer engagement to the next level by adding Braze as a Segment Source, via Braze's Currents product. We’ll automatically collect marketing and analytics events, forward them to your destinations, and load them into your data warehouse.

In your favorite BI or analytics tool, you’ll be able to analyze your mobile, email, and web marketing campaign data in SQL or through drag-and-drop reports. You’ll be able to join your Braze data with the event data you’re already sending through Segment to analyze the impacts of your marketing and engagement programs.

## Getting Started

1. From your workspace Overview page, click Add Source.
2. Choose Braze
3. Give the Source a name. The name will be used to identify this source within your workspace. You can name it however you’d like, but we recommend sticking to something that reflects the Source itself, like Braze.
4. The next page “Overview” will surface your Segment write key for Braze. Copy this write key.
5. To finish the setup, you need to activate "Currents" in Braze which requires reaching out to Braze Support or your Customer Support Manager. Braze Currents is only available in select Braze packages and cannot be configured within Braze without assistance from your Braze Customer Success representative.  


Now when you go back to Segment, click into your Braze Source and you’ll be able to add Destinations where you want to receive your Braze data. Events will now be sent to your destinations and automatically loaded into any warehouses you have enabled.

## Braze Events

Below is a table of events that Braze sends to Segment. These are the events that will appear in your warehouse or your destinations, depending on what connections you enable in Segment:

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>Application Uninstalled</td>
   <td>User uninstalled the App.</td>
  </tr>
   <tr>
   <td>Email Sent</td>
   <td>An email was successfully sent</td>
  </tr>
  <tr>
   <td>Email Delivered</td>
   <td>An email was successfully delivered to a User's mail server.</td>
  </tr>
  <tr>
   <td>Email Opened</td>
   <td>User opened an email.</td>
  </tr>
  <tr>
   <td>Email Link Clicked</td>
   <td>User clicked a link in an email. Email click tracking must be enabled.</td>
  </tr>
  <tr>
   <td>Email Bounced</td>
   <td>Braze attempted to send an email, but the User's receiving mail server did not accept it.</td>
  </tr>
  <tr>
  <tr>
   <td>Email Soft Bounced</td>
   <td>Braze attempted to send an email, but the User’s receiving mail server temporarily bounced it. (Reasons may include: inbox full, server down, etc.)</td>
  </tr>
  <tr>
   <td>Email Marked As Spam</td>
   <td>User marked an email as spam.</td>
  </tr>
  <tr>
   <td>Email Unsubscribed</td>
   <td>User clicked the unsubscribe link in an email.</td>
  </tr>
  <tr>
   <td>Subscription Group State Changed</td>
   <td>User’s subscription group state changed to ‘Subscribed’ or ‘Unsubscribed’</td>
  </tr>
  <tr>
   <td>Push Notification Sent</td>
   <td>A push notification was successfully sent</td>
  </tr>
  <tr>
   <td>Push Notification Tapped</td>
   <td>User tapped on a push notification.</td>
  </tr>
  <tr>
   <td>Push Notification Bounced</td>
   <td>Braze was not able to send a push notification to this User.</td>
  </tr>
  <tr>
   <td>iOS Foreground Push Opened</td>
   <td>User received a push notification on iOS while the app was open.</td>
  </tr>
  <tr>
   <td>In-App Message Viewed</td>
   <td>User viewed an in-app message.</td>
  </tr>
  <tr>
   <td>In-App Message Clicked</td>
   <td>User tapped or clicked a button in an in-app message.</td>
  </tr>
  <tr>
   <td>News Feed Viewed</td>
   <td>User viewed the native Braze News Feed.</td>
  </tr>
  <tr>
   <td>News Feed Card Viewed</td>
   <td>User viewed a Card within the native Braze News Feed.</td>
  </tr>
  <tr>
   <td>News Feed Card Clicked</td>
   <td>User tapped or clicked on a Card within the native Braze News Feed.</td>
  </tr>
  <tr>
   <td>Webhook Sent</td>
   <td>A webhook message was sent.</td>
  </tr>
  <tr>
   <td>Campaign Converted</td>
   <td>User performed the primary conversion event for a Campaign within its conversion window.</td>
  </tr>
  <tr>
   <td>Canvas Converted</td>
   <td>User performed the primary conversion event for a Canvas within its conversion window.</td>
  </tr>
  <tr>
   <td>Canvas Entered</td>
   <td>User was entered into a Canvas.</td>
  </tr>
  <tr>
   <td>Campaign Control Group Entered</td>
   <td>User was enrolled in a Campaign control group.</td>
  </tr>
</table>

## Braze Event Properties

Below is a table of properties that are sent for the events above:

<table>
  <tr>
   <td>Property Name</td>
   <td>Type</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`app_id`</td>
   <td>string</td>
   <td>The API Identifier of the App on which a user received a message or performed an action, if applicable.</td>
  </tr>
  <tr>
   <td>`send_id`</td>
   <td>string</td>
   <td>The id of the message if specified for the campaign, if applicable.</td>
  </tr>
  <tr>
   <td>`campaign_id`</td>
   <td>string</td>
   <td>The API Identifier of the Campaign associated with the event, if applicable.</td>
  </tr>
  <tr>
   <td>`canvas_id`</td>
   <td>string</td>
   <td>The API Identifier of the Canvas associated with the event, if applicable.</td>
  </tr>
  <tr>
   <td>`canvas_variation_id`</td>
   <td>string</td>
   <td>The API Identifier of the Canvas Variation associated with the event, if applicable.</td>
  </tr>
  <tr>
   <td>`canvas_step_id`</td>
   <td>string</td>
   <td>The API Identifier of the Canvas Step associated with the event, if applicable.</td>
  </tr>
  <tr>
   <td>`context.traits.email`</td>
   <td>string</td>
   <td>For Email events, the email address that the email was sent to.</td>
  </tr>
  <tr>
   <td>`button_id`</td>
   <td>string</td>
   <td>For In-App Message Clicked events, the ID of the button the user clicked on.</td>
  </tr>
  <tr>
   <td>`card_id`</td>
   <td>string</td>
   <td>For News Feed Card Viewed and News Feed Card Clicked events, the API Identifier of the News Feed Card.</td>
  </tr>
</table>

*NOTE*: The Braze Source is currently in Beta. **The names of Apps, Campaigns, Canvases (including Canvas Variations and Canvas Steps), and News Feed Cards will be made available as event properties in an upcoming version of the source, in addition to the API Identifiers already listed above**.

## User Identification

Braze will send the Braze `external_user_id` as the top level `userId` field. This is the same `userId` that Braze originally receives from the downstream destination with Segment. Braze will only send events associated with users who have an `external_user_id` set.

## Send Segment Data to Braze

The entire source with Braze can be even better if you also connect to it as a downstream destination within Segment. With Segment's Braze destination, you can send user and event data to Braze in order to target customers with messaging campaigns.

Want to start sending website or mobile data to Braze? Head on over to our [Braze destination docs](https://segment.com/docs/destinations/braze/).
