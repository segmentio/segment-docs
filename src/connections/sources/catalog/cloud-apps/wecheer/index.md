---
title: Wecheer Source
---

[Wecheer](https://wecheer.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a customer-engagement platform for consumer goods brands selling through third-party points of sale.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.


This source is maintained by Wecheer. For any issues with the source, [contact Wecheer Support team](mailto:support@wecheer.io).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Wecheer" in the Sources Catalog, select Wecheer, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your Wecheer **Campaigns** -> navigate to **Advertisers** > **Advertiser Details** > **Advertiser Settings** → **Outbound Events** → Choose Provider **Segment** and paste the key to connect. And then you need to select the list of event that you want to subscribe.
7. Click Save configuration.

## Stream

Wecheer uses this Segment Event Cloud Source to send Wecheer event data to Segment in near real time from our backend services. Events are sent using Segment’s server-side methods (such as `track`, `identify`, `page`, and `group`), depending on the type of data being recorded.

Each event includes the identifiers described in the Event Properties section (for example UserId, AdvertiserId, and CampaignId), so that downstream tools and your data warehouse can reliably join Wecheer activity back to your own users, brands, and campaigns.

Once events are delivered to Segment, they are:

Forwarded to any Destinations that support server-side events, and  

Written into the schema that Segment creates for this Source in your data warehouse, so you can query them using SQL.

## Events

The table below lists all event types that Wecheer Campaigns can send to Segment when you configure outbound events at Advertiser or Campaign level.  
Each of these events is sent as a Segment track call with the Event Name as the event value.

| Event Name                             | Description                                      |
| -------------------------------------- | ------------------------------------------------ |
| Card Received                          | User receives a loyalty card                     |
| Card Given                             | Card issued to user                              |
| No Campaign Joined                     | User has no active campaign                      |
| Consumption                            | General consumption event                        |
| Consumption Match                      | Consumption matches criteria                     |
| First Consumption                      | User's first purchase                            |
| Any Consumption                        | Any consumption occurred                         |
| First Consumption Given                | First purchase reward given                      |
| Any Consumption Given                  | Any consumption reward given                     |
| Scan Receipt                           | Receipt scan initiated                           |
| Receipt Scanned                        | Receipt successfully scanned                     |
| Receipt Triaged                        | Receipt moved to triage                          |
| Receipt Failed                         | Receipt processing failed                        |
| Receipt Fraud                          | Fraudulent receipt detected                      |
| Receipt Incomplete                     | Receipt data incomplete                          |
| Receipt No Reward                      | Receipt doesn't qualify for reward               |
| Receipt Manual Review Limit Exceeded   | Manual review queue full                         |
| Stamps Given                           | Stamps awarded to user                           |
| Manual Give Stamps                     | Stamps manually added                            |
| Punchcard Stamps Received              | User receives punchcard stamps                   |
| Stamps Limit Reached                   | User reached stamp limit                         |
| Stamps Overflow                        | Stamps exceed limit                              |
| Punchcard Completed                    | Punchcard fully completed                        |
| Punchcard Step Completed               | Punchcard step achieved                          |
| Punchcard Already Completed            | Duplicate completion attempt                     |
| Reward Received                        | User receives reward                             |
| Birthday Reward Received               | Birthday reward given                            |
| Level Unlock Reward Received           | Level-up reward given                            |
| Validate Reward                        | Reward validation performed                      |
| Points Received                        | User receives points                             |
| No Point Received                      | No points awarded                                |
| Lucky Draw Received                    | User receives lucky draw entry                   |
| User Data Shared                       | User shares personal data                        |
| Game Triggered                         | Game initiated                                   |
| Game Completed                         | Game finished                                    |
| Level Unlocked                         | User unlocks new level                           |
| Safe Box Generated                     | SafeBox created                                  |
| Safe Box Read                          | SafeBox accessed                                 |
| Safe Box Redeemed                      | SafeBox redeemed                                 |
| Catalog Redeem                         | Catalog item redeemed                            |
| Products Limit Reached                 | Product limit hit                                |
| Staff Products Given                   | Staff issues product                             |
| Manual Verification Requested          | Manual review requested                          |
| Manual Verification Approved           | Manual review approved                           |
| Manual Verification Rejected           | Manual review rejected                           |
| Consumer Referral Invite Generated     | Consumer referral created                        |
| Staff Referral Invite Generated        | Staff referral created                           |
| Init Staff Point Card                  | Staff point card initialized                     |
| Handshake QR Valid                     | Valid QR code scanned                            |
| Handshake QR Invalid                   | Invalid QR code scanned                          |
| Data Consumer Sync                     | Consumer data synchronized                       |
| Advertiser Consumption Transaction     | Transaction recorded                             |

## Event Properties

The table below lists the properties included in the events listed above.

| Property Name    | Description        |
| ---------------- | ------------------ |
| `user_id`        | ID of the user     |
| `advertiser_id`  | Brand Id           |
| `campaign_id`    | Campaign Id        |


## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Wecheer support team](mailto:support@wecheer.io).