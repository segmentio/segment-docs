---
title: Personas Activation - Syncing to Destinations
---

## Overview
Once you have created Computed Traits or Audiences in Personas, you can then **activate** that data by sending it to where you need it to go and putting that data to use! This page will provide an overview of activating Personas data in Segment Destinations so that you can use computed traits and audiences to personalize messages across channels, optimize ad spend, and improve targeting.

Please note that the [Profile API](docs/personas/profile-api/) is another way that you can activate Personas data programmatically.


## Compatible Personas Destinations

### Most Popular Personas Destinations

This list includes the most important Personas Destinations that we support today, and which we consider industry-standard tools that many businesses use for the personalization and marketing. We dedicate the most amount of support to these top Personas Destinations. Note: software changes quickly, and this list is subject to change.

| **Destination**                | **Category**           |
| -------------------------- | ------------------ |
| Facebook Custom Audiences  | Advertising        |
| Salesforce Marketing Cloud | Marketing Automation                   |
| Intercom                   | Customer Messaging |

### Additional Personas Destinations

In addition to the most popular Personas Destinations, Segment supports additional Destinations that you can use in conjuction with Personas. These are the full lists of Destinations that are compatible with Personas:
- [Personas Destinations (Event Type)](#Personas-Compatible-Destinations-Event-Type)
- [Personas Destinations (List Type)](#Personas-Compatible-Destinations-List-Type)


## Personas Destination Types: Event vs. List

### Overview
There are two ways to send data to Personas Destinations: as **Events** and as **Lists**.

**Event Destinations** receive data on a one by one, on a streaming basis as events, which are behaviors or occurrences tied to a user and a point in time. Every time a piece of data (track event, identify call, etc) is received in Segment — for example, from your website or your mobile app — Segment then sends this piece of data to the Destination right away.

**List Destinations** periodically receive data in batches, and these batches contain lists of users. In most cases, Segment sends data to a list destination every hour, and sends all data accumulated since the last batch was sent.

Some Destinations, such as Salesforce Marketing Cloud have both “event” and “list” destination types that you can use.

**Personas sends computed traits and audiences to destinations in different ways depending on whether the destination is an Event or List type**: 

- [Computed Traits](docs/personas/computed-traits/) are always sent to Event destinations either through the identify call as a user trait, as a group call for account-level computed traits, or as a track event. 
- With [Audiences](docs/personas/audiences/), we can send the audience either as a boolean (true or false) user property to Event Destinations, or as a user list to List Destinations. If you are a B2B company creating account audiences (where each account represents a group of users, like employees at a business) and sending them to list destinations, Personas sends the list of all users within an account that satisfies the audience criteria. 

The chart below provides an overview of differences in how computed traits and audiences each get sent to Event vs. List destinations supported by Personas.

|                               | **Event Destinations**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **List Destinations**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Computed Traits**               | - `identify` call as a user trait<br>- `group` call for account-level computed traits                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Audiences**                     | - `identify` call as a user trait. For identify calls, the trait name is the snake_cased version of the audience name you provided, and the value is a “true” if the user is part of the audience. For example, when a user first completes an order in the last 30 days, Segment sends an identify call with the property `order_completed_last_30days: true`, and when this user no longer satisfies that criteria (for example if 30 days elapses and they haven’t completed another order), Segment sets that value to `false`.<br>- `track` call as two events: `Audience Entered` and `Audience Exited`, with the event property `order_completed_last_30days` equal to true and false, respectively.<br><br>Segment sends an identify or track call for every user in the audience when the audience is first created. Later syncs only send updates for those users who were added or removed from the audience since the last sync. <br><br>Some destinations (like Braze and Iterable) allow you to send them audiences without pre-configuring a column to receive the audience data, however others require that you configure the audience column first. This depends on the individual destination, so consult the destination’s documentation for details. | - User-Level Audiences: a list of users that belong to an audience<br>- Account-Level Audiences: a list of users within an account that satisfy the audience criteria<br><br>When syncing to a list destination Personas uploads lists of users directly to the destination. When you first create an audience, Segment uploads the entire list of audience users to the destination. Later syncs only upload the users that have been added or removed since the last sync.<br><br>User-list destinations can have differing limits on how often Segment can sync with them. For example, an AdWords audience is updated once every 6 hours or more, because that is what AdWords recommends. |

## What do the payloads look like for Personas data?
The payloads being sent to your destinations from your Personas space can differ based on the type of event you have configured your destination to receive (identify vs. track) or whether the payload is coming from a computed trait or audience.

**Computed Trait Generated Events**
For identify events being generated by a computed trait, they will have the trait name set to the computed trait value:

```
    {
      "type": "identify",
      "userId": u123,
      "traits": {
         "total_revenue_180_days": 450.00 
      }
    }
```
For track events being generated by a computed trait, they will have a key for the trait name and a key for the computed trait value:
```
    {
      "type": "track",
      "event": "Trait Computed",
      "userId": u123,
      "properties": {
         "trait_key": "total_revenue_180_days",
         "total_revenue_180_days": 450.00 
      }
    }
```
Please note we will only send events to your destination if the computed trait value has changed for the user. We will not send a payload for every user in your trait every time the trait computes.

**Audience Generated Events**
For identify events being generated by an audience, they will have the audience key set to `true` or `false` based on whether the user is entering or exiting the audience:

```
    {
      "type": "identify",
      "userId": u123,
      "traits": {
         "first_time_shopper": true // false when a user exits the audience
      }
    }
```
For track events being generated by an audience, they will have a key for the audience name and a key for the audience value:

```
    {
      "type": "track",
      "userId": u123,
      "event": "Audience Entered", // "Audience Exited" when a user exits an audience
      "properties": {
         "audience_key": "first_time_shopper",
         "first_time_shopper": true // false when a user exits the audience
      }
    }
```
Some destinations require specific keys to be included on the events in order to be ingested properly by the destination (ie. Zendesk requires the “name” property). We have included logic on our end to enrich the payloads being sent to these destinations to account for the destination API requirements, but please let us know if you are sending events to a destination that requires specific enrichment we do not already include, and we will do our best to address it!


## Rate Limits on Personas Event Destinations

Many Destinations have strict rate limits that prevent Segment (and other partners) from sending too much data to a Destination at one time. Segment caps the number of requests per second to certain Destinations to avoid triggering rate limits that would cause data to be dropped.

For additional information on Destination-specific rate limits, check the documentation for that Destination. If you need a higher rate limit, [reach out to support](https://segment.com/contact) or let your CSM know which Destination you need it for and why.

| **Destination**                      | **Requests Per Second**                                                      |
| Braze                            | 100                                                                      |
| Customer.io                      | 30                                                                       |
| Hubspot                          | 5 objects sent per second (for each object, 2 calls are sent to Hubspot) |
| Intercom                         | 8                                                                        |
| Iterable                         | 500                                                                      |
| Mailchimp                        | 10                                                                       |
| Marketo                          | 5                                                                        |
| Marketo Static Lists             | 5                                                                        |
| Pardot                           | 2                                                                        |
| Resci                            | 200                                                                      |
| Responsys                        | 3                                                                        |
| Responsys Batch                  | 3                                                                        |
| Sendgrid                         | 100                                                                      |
| Sendgrid Lists                   | 100                                                                      |
| Salesforce                       | 5                                                                        |
| Salesforce Marketing Cloud       | 20                                                                       |
| Salesforce Marketing Cloud Lists | 20                                                                       |
| Zendesk                          | 50                                                                       |



## Syncing data to a new Destination for the first time

When you create a new Computed Trait or Audience in Personas, you can choose to calculate it either using all the available historical data from your Segment implementation, or only using data that arrives after you set up the trait or audience. By default, Segment opts to use historical data. 

When you connect a new Destination to a computed trait or audience, Segment sends all the historical data (backfill) to that new destination. Afterwards, Segment only sends updates to that destination.

**Note**: The Personas Facebook Custom Audiences Website destination does not accept historical data, and so only uses data from after the moment you configure it.

## Personas Compatible Destinations: Event Type

- [ActiveCampaign](https://segment.com/docs/connections/destinations/catalog/activecampaign/)
- [AdWords Remarketing Lists](https://segment.com/docs/connections/destinations/catalog/adwords-remarketing-lists/)
- [Adjust](https://segment.com/docs/connections/destinations/catalog/adjust/)
- [Adobe Analytics](https://segment.com/docs/connections/destinations/catalog/adobe-analytics/)
- [Adtriba](https://segment.com/docs/connections/destinations/catalog/adtriba/)
- [Airship](https://segment.com/docs/connections/destinations/catalog/airship/)
- [Amazon EventBridge](https://segment.com/docs/connections/destinations/catalog/amazon-eventbridge/)
- [Amazon Kinesis Firehose](https://segment.com/docs/connections/destinations/catalog/amazon-kinesis-firehose/)
- [Amazon Kinesis](https://segment.com/docs/connections/destinations/catalog/amazon-kinesis/)
- [Amazon Lambda](https://segment.com/docs/connections/destinations/catalog/amazon-lambda/)
- [Amazon Personalize](https://segment.com/docs/connections/destinations/catalog/amazon-personalize/)
- [Amazon S3](https://segment.com/docs/connections/warehouses/catalog/amazon-s3/)
- [Amplitude](https://segment.com/docs/connections/destinations/catalog/amplitude/)
- [Appcues](https://segment.com/docs/connections/destinations/catalog/appcues/)
- [AppsFlyer](https://segment.com/docs/connections/destinations/catalog/appsflyer/)
- [Attribution](https://segment.com/docs/connections/destinations/catalog/attribution/)
- [AutopilotHQ](https://segment.com/docs/connections/destinations/catalog/autopilothq/)
- [Azure Function](https://segment.com/docs/connections/destinations/catalog/azure-function/)
- [Blendo](https://segment.com/docs/connections/destinations/catalog/blendo/)
- [Blueshift](https://segment.com/docs/connections/destinations/catalog/blueshift/)
- [Branch Metrics](https://segment.com/docs/connections/destinations/catalog/branch-metrics/)
- [Braze](https://segment.com/docs/connections/destinations/catalog/braze/)
- [ByteGain](https://segment.com/docs/connections/destinations/catalog/bytegain/)
- [Callingly](https://segment.com/docs/connections/destinations/catalog/callingly/)
- [Calq](https://segment.com/docs/connections/destinations/catalog/calq/)
- [Candu](https://segment.com/docs/connections/destinations/catalog/candu/)
- [Castle](https://segment.com/docs/connections/destinations/catalog/castle/)
- [Chameleon](https://segment.com/docs/connections/destinations/catalog/chameleon/)
- [ChurnZero](https://segment.com/docs/connections/destinations/catalog/churnzero/)
- [ClearBrain](https://segment.com/docs/connections/destinations/catalog/clearbrain/)
- [Clearbit Enrichment](https://segment.com/docs/connections/destinations/catalog/clearbit-enrichment/)
- [Clearbit Reveal](https://segment.com/docs/connections/destinations/catalog/clearbit-reveal/)
- [CleverTap](https://segment.com/docs/connections/destinations/catalog/clevertap/)
- [ClientSuccess](https://segment.com/docs/connections/destinations/catalog/clientsuccess/)
- [Convertro](https://segment.com/docs/connections/destinations/catalog/convertro/)
- [Criteo](https://segment.com/docs/connections/destinations/catalog/criteo/)
- [Cruncher](https://segment.com/docs/connections/destinations/catalog/cruncher/)
- [Custify](https://segment.com/docs/connections/destinations/catalog/custify/)
- [CustomFit.ai](https://segment.com/docs/connections/destinations/catalog/customfitai/)
- [Customer.io](https://segment.com/docs/connections/destinations/catalog/customer.io/)
- [CustomerSuccessBox](https://segment.com/docs/connections/destinations/catalog/customersuccessbox/)
- [Delighted](https://segment.com/docs/connections/destinations/catalog/delighted/)
- [DoubleClick Floodlight](https://segment.com/docs/connections/destinations/catalog/doubleclick-floodlight/)
- [Dreamdata IO](https://segment.com/docs/connections/destinations/catalog/dreamdata-io/)
- [Drift](https://segment.com/docs/connections/destinations/catalog/drift/)
- [Drip](https://segment.com/docs/connections/destinations/catalog/drip/)
- [EMMA](https://segment.com/docs/connections/destinations/catalog/emma/)
- [EPICA](https://segment.com/docs/connections/destinations/catalog/epica/)
- [Eloqua](https://segment.com/docs/connections/destinations/catalog/eloqua/)
- [Emarsys](https://segment.com/docs/connections/destinations/catalog/emarsys/)
- [Facebook App Events](https://segment.com/docs/connections/destinations/catalog/facebook-app-events/)
- [Facebook Offline Conversions](https://segment.com/docs/connections/destinations/catalog/facebook-offline-conversions/)
- [FactorsAI](https://segment.com/docs/connections/destinations/catalog/factorsai/)
- [Freshmarketer](https://segment.com/docs/connections/destinations/catalog/freshmarketer/)
- [Freshsales](https://segment.com/docs/connections/destinations/catalog/freshsales/)
- [FunnelEnvy](https://segment.com/docs/connections/destinations/catalog/funnelenvy/)
- [FunnelFox](https://segment.com/docs/connections/destinations/catalog/funnelfox/)
- [Gainsight](https://segment.com/docs/connections/destinations/catalog/gainsight/)
- [GoSquared](https://segment.com/docs/connections/destinations/catalog/gosquared/)
- [Google Ads (Classic)](https://segment.com/docs/connections/destinations/catalog/adwords/)
- [Google Analytics](https://segment.com/docs/connections/destinations/catalog/google-analytics/)
- [Google Cloud Function](https://segment.com/docs/connections/destinations/catalog/google-cloud-function/)
- [Google Cloud PubSub](https://segment.com/docs/connections/destinations/catalog/google-cloud-pubsub/)
- [HasOffers](https://segment.com/docs/connections/destinations/catalog/hasoffers/)
- [Heap](https://segment.com/docs/connections/destinations/catalog/heap/)
- [Help Scout](https://segment.com/docs/connections/destinations/catalog/help-scout/)
- [HubSpot](https://segment.com/docs/connections/destinations/catalog/hubspot/)
- [Hull](https://segment.com/docs/connections/destinations/catalog/hull/)
- [IBM UBX](https://segment.com/docs/connections/destinations/catalog/ibm-ubx/)
- [Indicative](https://segment.com/docs/connections/destinations/catalog/indicative/)
- [Intellimize](https://segment.com/docs/connections/destinations/catalog/intellimize/)
- [Intercom](https://segment.com/docs/connections/destinations/catalog/intercom/)
- [Iron.io](https://segment.com/docs/connections/destinations/catalog/iron.io/)
- [Iterable](https://segment.com/docs/connections/destinations/catalog/iterable/)
- [KISSmetrics](https://segment.com/docs/connections/destinations/catalog/kissmetrics/)
- [Kahuna](https://segment.com/docs/connections/destinations/catalog/kahuna/)
- [Keen](https://segment.com/docs/connections/destinations/catalog/keen-io/)
- [Kitemetrics](https://segment.com/docs/connections/destinations/catalog/kitemetrics/)
- [Klaviyo](https://segment.com/docs/connections/destinations/catalog/klaviyo/)
- [Kochava](https://segment.com/docs/connections/destinations/catalog/kochava/)
- [Kustomer](https://segment.com/docs/connections/destinations/catalog/kustomer/)
- [Lazy Lantern](https://segment.com/docs/connections/destinations/catalog/lazy-lantern/)
- [Leanplum](https://segment.com/docs/connections/destinations/catalog/leanplum/)
- [Librato](https://segment.com/docs/connections/destinations/catalog/librato/)
- [Lytics](https://segment.com/docs/connections/destinations/catalog/lytics/)
- [Madkudu](https://segment.com/docs/connections/destinations/catalog/madkudu/)
- [MailChimp](https://segment.com/docs/connections/destinations/catalog/mailchimp/)
- [Mailjet](https://segment.com/docs/connections/destinations/catalog/mailjet/)
- [Mammoth](https://segment.com/docs/connections/destinations/catalog/mammoth/)
- [Marketo V2](https://segment.com/docs/connections/destinations/catalog/marketo-v2/)
- [Millennial Media](https://segment.com/docs/connections/destinations/catalog/millennial-media/)
- [Mixpanel](https://segment.com/docs/connections/destinations/catalog/mixpanel/)
- [MoEngage](https://segment.com/docs/connections/destinations/catalog/moengage/)
- [Moesif API Analytics](https://segment.com/docs/connections/destinations/catalog/moesif-api-analytics/)
- [Moosend](https://segment.com/docs/connections/destinations/catalog/moosend/)
- [Movable Ink](https://segment.com/docs/connections/destinations/catalog/movable-ink/)
- [Mutiny](https://segment.com/docs/connections/destinations/catalog/mutiny/)
- [Nanigans](https://segment.com/docs/connections/destinations/catalog/nanigans/)
- [Natero](https://segment.com/docs/connections/destinations/catalog/natero/)
- [New Relic](https://segment.com/docs/connections/destinations/catalog/new-relic/)
- [NorthStar by Growthhackers](https://segment.com/docs/connections/destinations/catalog/northstar-by-growthhackers/)
- [Nudgespot](https://segment.com/docs/connections/destinations/catalog/nudgespot/)
- [OneSignal](https://segment.com/docs/connections/destinations/catalog/onesignal/)
- [Optimizely Full Stack](https://segment.com/docs/connections/destinations/catalog/optimizelyx/)
- [Pardot](https://segment.com/docs/connections/destinations/catalog/pardot/)
- [Parsely](https://segment.com/docs/connections/destinations/catalog/parsely/)
- [Pendo](https://segment.com/docs/connections/destinations/catalog/pendo/)
- [PersistIQ](https://segment.com/docs/connections/destinations/catalog/persistiq/)
- [Personas Facebook Custom Audiences](https://segment.com/docs/connections/destinations/catalog/personas-facebook-ads/)
- [Personyze](https://segment.com/docs/connections/destinations/catalog/personyze/)
- [PixelMe](https://segment.com/docs/connections/destinations/catalog/pixelme/)
- [Planhat](https://segment.com/docs/connections/destinations/catalog/planhat/)
- [Podsights](https://segment.com/docs/connections/destinations/catalog/podsights/)
- [Pointillist](https://segment.com/docs/connections/destinations/catalog/pointillist/)
- [Promoter.io](https://segment.com/docs/connections/destinations/catalog/promoter.io/)
- [Proof Experiences](https://segment.com/docs/connections/destinations/catalog/proof/)
- [QuanticMind](https://segment.com/docs/connections/destinations/catalog/quanticmind/)
- [RadiumOne Connect](https://segment.com/docs/connections/destinations/catalog/radiumone-connect/)
- [Ramen](https://segment.com/docs/connections/destinations/catalog/ramen/)
- [Refersion](https://segment.com/docs/connections/destinations/catalog/refersion/)
- [Refiner](https://segment.com/docs/connections/destinations/catalog/refiner/)
- [Repeater](https://segment.com/docs/connections/destinations/catalog/repeater/)
- [Responsys](https://segment.com/docs/connections/destinations/catalog/responsys/)
- [SMBStreams](https://segment.com/docs/connections/destinations/catalog/smbstream/)
- [Sailthru](https://segment.com/docs/connections/destinations/catalog/sailthru/)
- [Salesforce Marketing Cloud](https://segment.com/docs/connections/destinations/catalog/salesforce-marketing-cloud/)
- [Salesforce](https://segment.com/docs/connections/destinations/catalog/salesforce/)
- [Salesmachine](https://segment.com/docs/connections/destinations/catalog/salesmachine/)
- [SatisMeter](https://segment.com/docs/connections/destinations/catalog/satismeter/)
- [Savio](https://segment.com/docs/connections/destinations/catalog/savio/)
- [ScopeAI](https://segment.com/docs/connections/destinations/catalog/scopeai/)
- [Seg](https://segment.com/docs/connections/destinations/catalog/seg/)
- [Serenytics](https://segment.com/docs/connections/destinations/catalog/serenytics/)
- [Sherlock](https://segment.com/docs/connections/destinations/catalog/sherlock/)
- [Singular](https://segment.com/docs/connections/destinations/catalog/singular/)
- [Slack](https://segment.com/docs/connections/destinations/catalog/slack/)
- [SlicingDice](https://segment.com/docs/connections/destinations/catalog/slicingdice/)
- [Split](https://segment.com/docs/connections/destinations/catalog/split/)
- [Stitch Data](https://segment.com/docs/connections/destinations/catalog/stitch-data/)
- [Strikedeck](https://segment.com/docs/connections/destinations/catalog/strikedeck/)
- [TUNE](https://segment.com/docs/connections/destinations/catalog/tune/)
- [Tamber](https://segment.com/docs/connections/destinations/catalog/tamber/)
- [Totango](https://segment.com/docs/connections/destinations/catalog/totango/)
- [Trackier](https://segment.com/docs/connections/destinations/catalog/trackier/)
- [Tractionboard](https://segment.com/docs/connections/destinations/catalog/tractionboard/)
- [TrafficGuard](https://segment.com/docs/connections/destinations/catalog/trafficguard/)
- [Treasure Data](https://segment.com/docs/connections/destinations/catalog/treasure-data/)
- [Trustpilot](https://segment.com/docs/connections/destinations/catalog/trustpilot/)
- [Unwaffle](https://segment.com/docs/connections/destinations/catalog/unwaffle/)
- [Upcall](https://segment.com/docs/connections/destinations/catalog/upcall/)
- [UserEngage](https://segment.com/docs/connections/destinations/catalog/userengage/)
- [UserIQ](https://segment.com/docs/connections/destinations/catalog/useriq/)
- [Userlist](https://segment.com/docs/connections/destinations/catalog/userlist/)
- [Vero](https://segment.com/docs/connections/destinations/catalog/vero/)
- [Vitally](https://segment.com/docs/connections/destinations/catalog/vitally/)
- [WalkMe](https://segment.com/docs/connections/destinations/catalog/walkme/)
- [Watchtower](https://segment.com/docs/connections/destinations/catalog/watchtower/)
- [WebEngage](https://segment.com/docs/connections/destinations/catalog/webengage/)
- [Webhooks](https://segment.com/docs/connections/destinations/catalog/webhooks/)
- [Whale Alerts](https://segment.com/docs/connections/destinations/catalog/whale-alerts/)
- [Whale Watch](https://segment.com/docs/connections/destinations/catalog/whale-watch/)
- [Wigzo](https://segment.com/docs/connections/destinations/catalog/wigzo/)
- [Wishpond](https://segment.com/docs/connections/destinations/catalog/wishpond/)
- [Woopra](https://segment.com/docs/connections/destinations/catalog/woopra/)
- [Xplenty](https://segment.com/docs/connections/destinations/catalog/xplenty/)
- [Xtremepush](https://segment.com/docs/connections/destinations/catalog/xtremepush/)
- [Zaius](https://segment.com/docs/connections/destinations/catalog/zaius/)
- [Zapier](https://segment.com/docs/connections/destinations/catalog/zapier/)
- [Zendesk Connect](https://segment.com/docs/connections/destinations/catalog/outbound/)
- [Zendesk](https://segment.com/docs/connections/destinations/catalog/zendesk/)
- [goedle.io](https://segment.com/docs/connections/destinations/catalog/goedle/)
- [hydra](https://segment.com/docs/connections/destinations/catalog/hydra/)
- [mabl](https://segment.com/docs/connections/destinations/catalog/mabl/)
- [tray.io](https://segment.com/docs/connections/destinations/catalog/tray.io/)

## Personas Compatible Destinations: List Type

- [Facebook Custom Audiences](https://segment.com/docs/connections/destinations/catalog/personas-facebook-ads/)
- [AdWords Remarketing Lists](https://segment.com/docs/connections/destinations/catalog/adwords-remarketing-lists/)
- [Marketo Static Lists](https://segment.com/docs/connections/destinations/catalog/marketo-static-lists/)
