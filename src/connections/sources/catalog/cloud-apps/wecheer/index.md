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
| CardReceived                           | User receives a loyalty card                     |
| CardGiven                              | Card issued to user                              |
| NoCampaignJoined                       | User has no active campaign                      |
| Consumption                            | General consumption event                        |
| ConsumptionMatch                       | Consumption matches criteria                     |
| FirstConsumption                       | User's first purchase                            |
| AnyConsumption                         | Any consumption occurred                         |
| FirstConsumptionGiven                  | First purchase reward given                      |
| AnyConsumptionGiven                    | Any consumption reward given                     |
| ScanReceipt                            | Receipt scan initiated                           |
| ReceiptScanned                         | Receipt successfully scanned                     |
| ReceiptTriaged                         | Receipt moved to triage                          |
| ReceiptFailed                          | Receipt processing failed                        |
| ReceiptFraud                           | Fraudulent receipt detected                      |
| ReceiptIncomplete                      | Receipt data incomplete                          |
| ReceiptNoReward                        | Receipt doesn't qualify for reward               |
| ReceiptManualReviewLimitExceeded       | Manual review queue full                         |
| StampsGiven                            | Stamps awarded to user                           |
| ManualGiveStamps                       | Stamps manually added                            |
| PunchcardStampsReceived                | User receives punchcard stamps                   |
| StampsLimitReached                     | User reached stamp limit                         |
| StampsOverflow                         | Stamps exceed limit                              |
| PunchcardCompleted                     | Punchcard fully completed                        |
| PunchcardStepCompleted                 | Punchcard step achieved                          |
| PunchcardAlreadyCompleted              | Duplicate completion attempt                     |
| RewardReceived                         | User receives reward                             |
| BirthdayRewardReceived                 | Birthday reward given                            |
| LevelUnlockRewardReceived              | Level-up reward given                            |
| ValidateReward                         | Reward validation performed                      |
| PointsReceived                         | User receives points                             |
| NoPointReceived                        | No points awarded                                |
| LuckyDrawReceived                      | User receives lucky draw entry                   |
| UserDataShared                         | User shares personal data                        |
| GameTriggered                          | Game initiated                                   |
| GameCompleted                          | Game finished                                    |
| LevelUnlocked                          | User unlocks new level                           |
| SafeBoxGenerated                       | SafeBox created                                  |
| SafeBoxRead                            | SafeBox accessed                                 |
| SafeBoxRedeemed                        | SafeBox redeemed                                 |
| CatalogRedeem                          | Catalog item redeemed                            |
| ProductsLimitReached                   | Product limit hit                                |
| StaffProductsGiven                     | Staff issues product                             |
| ManualVerificationRequested            | Manual review requested                          |
| ManualVerificationApproved             | Manual review approved                           |
| ManualVerificationRejected             | Manual review rejected                           |
| ConsumerReferralInviteGenerated        | Consumer referral created                        |
| StaffReferralInviteGenerated           | Staff referral created                           |
| InitStaffPointCard                     | Staff point card initialized                     |
| HandshakeQRValid                       | Valid QR code scanned                            |
| HandshakeQRInValid                     | Invalid QR code scanned                          |
| DataConsumerSync                       | Consumer data synchronized                       |
| AdvertiserConsumptionTransaction       | Transaction recorded                             |

## Event Properties

The table below lists the properties included in the events listed above.

| Property Name  | Description        |
| -------------- | ------------------ |
| `UserId`       | ID of the user     |
| `AdvertiserId` | Brand Id           |
| `CampaignId`   | Campaign Id        |


## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Wecheer support team](mailto:support@wecheer.io).