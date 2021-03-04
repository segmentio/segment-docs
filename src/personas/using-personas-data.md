---
title: Using your Personas data
redirect_from: '/personas/activation/'
---




You can send your Personas Computed Traits and Audiences to your Segment Destinations, which allows you to personalize messages across channels, optimize ad spend, and improve targeting. This page provides an overview of different ways to activate Personas data in Segment Destinations.

<!-- TODO: image here? -->

> success ""
> **Tip!** You can also use the [Personas Profile API](/docs/personas/profile-api/) to activate Personas data programmatically.


## Compatible Personas Destinations

The table below includes the _most important_ Personas Destinations that we support today, and which we consider industry-standard tools that most businesses use for personalization and marketing. (This list does not include warehouses.)

> info ""
> Software changes quickly, and this list is subject to change.


| **Destination**       | **Category**       |
| === | === |
| [Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/) | Advertising   |
| [Google Adwords Remarketing Lists](/docs/connections/destinations/catalog/adwords-remarketing-lists/) | Advertising   |
| [Braze](/docs/connections/destinations/catalog/braze/)   | Marketing Automation |
| [Intercom](/docs/connections/destinations/catalog/intercom/)   | Livechat |
| [Amazon Kinesis](/docs/connections/destinations/catalog/amazon-kinesis/)   | Raw Data |
| [Doubleclick Floodlight](/docs/connections/destinations/catalog/doubleclick-floodlight/)   | Advertising |
| [Oracle Responsys](/docs/connections/destinations/catalog/responsys/)   | Email Marketing |
| [Amplitude](/docs/connections/destinations/catalog/amplitude/)   | Analytics |
| [Eloqua](/docs/connections/destinations/catalog/eloqua/)   | Email Marketing |
| [Salesforce Marketing Cloud](/docs/connections/destinations/catalog/salesforce-marketing-cloud/) |  Marketing Automation |
| [Iterable](/docs/connections/destinations/catalog/iterable/)   | Email Marketing |


In addition to the most popular Personas Destinations, Segment supports additional Destinations you can use in conjunction with Personas. These are the full lists of Destinations that are compatible with Personas:
- [Personas Destinations (Event Type)](#personas-compatible-destinations-event-type)
- [Personas Destinations (List Type)](#personas-compatible-destinations-list-type)


## Personas Destination Types: Event vs. List

There are two ways to send data to Personas Destinations: as **Events** and as **Lists**.

**Event Destinations** receive data on a one by one, on a streaming basis as *events*, which are behaviors or traits tied to a user and a point in time. Every time a piece of data (track event, identify call, etc) is received in Segment — for example, from your website or your mobile app — Segment then sends this piece of data to the Destination right away.

**List Destinations** periodically receive data in batches, and these batches contain lists of users. In most cases, Segment sends data to a list destination every hour, and sends all data accumulated since the last batch was sent.

Some Destinations, such as Salesforce Marketing Cloud have both “event” and “list” destination types that you can use.

**Personas sends computed traits and audiences to destinations in different ways depending on whether the destination is an Event or List type**:

- [Computed Traits](/docs/personas/computed-traits/) are always sent to Event destinations either using an identify call for user traits, a group call for account-level computed traits, or a track event.

- With [Audiences](/docs/personas/audiences/), Personas sends the audience either as a boolean (true or false) _user property_ to Event Destinations, or as a _user list_ to List Destinations. If you are a B2B company creating account audiences (where each account represents a group of users, like employees at a business) and sending them to list destinations, Personas sends the list of all users within an account that satisfies the audience criteria.


### Event Destinations

<!-- TODO: add link when we have a real chartHere’s a list of [Chart of Personas Event Destinations](/docs/connections/destinations/cmodes-compare/) -->

**Event Destinations and Computed traits**
Computed traits can only be sent to Event destinations.
When Personas sends a computed trait to an Event destination, it uses an identify call to send user traits, or a group call to send account-level computed traits.

**Event Destinations and Audiences**

- **`identify` call as a user trait**. When you use identify calls, the trait name is the snake_cased version of the audience name you provided, and the value is “true” if the user is part of the audience. For example, when a user first completes an order in the last 30 days, Segment sends an identify call with the property `order_completed_last_30days: true`, and when this user no longer satisfies that criteria (for example if 30 days elapses and they haven’t completed another order), Segment sets that value to `false`.
- **`track` call as two events**: `Audience Entered` and `Audience Exited`, with the event property `order_completed_last_30days` equal to true and false, respectively.

Segment sends an identify or track call for every user in the audience when the audience is first created. Later syncs only send updates for those users who were added or removed from the audience since the last sync.

Most destinations require that you configure a column in your schema to receive the audience data, however, some destinations (like Braze and Iterable) allow you to send audiences without doing this. This depends on the individual destination, so consult the destination’s documentation for details.


### List Destinations

<!-- TODO: add link when we have a real chart Here’s a list of List Destinations: [Chart of Personas List Destinations](/docs/connections/destinations/cmodes-compare/)-->

List destinations can only receive Audiences, and cannot receive computed traits.

- **User-Level Audiences**: a list of users that belong to an audience
- **Account-Level Audiences**: a list of users within an account that satisfy the audience criteria

When syncing to a list destination Personas uploads lists of users directly to the destination. When you first create an audience, Segment uploads the entire list of audience users to the destination. Later syncs only upload the users that have been added or removed since the last sync.

User-list destinations can have individual limits on how often Segment can sync with them. For example, an AdWords audience is updated once every 6 hours or more, because that is what AdWords recommends.


## What do the payloads look like for Personas data?

The payloads sent from your Personas space to your destinations will be different depending on if you configured the destination to receive identify or track calls, and whether the payload is coming from a computed trait or audience. As a reminder, identify calls usually update a trait on a user profile or table, whereas track calls send a point-in-time event that can be used as a campaign trigger or a detailed record of when a user’s audience membership or computed trait value was calculated.

### Computed Trait Generated Events

`Identify` events generated by a computed trait have the trait name set to the computed trait value:

```js
{
  "type": "identify",
  "userId": u123,
  "traits": {
     "total_revenue_180_days": 450.00
  }
}
```

`Track` events generated by a computed trait have a key for the trait name, and a key for the computed trait value. The default event name is `Trait Computed`, but you can change it.

```js
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

Personas only sends events to the destination if the computed trait value has changed for the user. Personas does not send a payload for every user in your trait every time the trait computes.

### Audience Generated Events

`Identify` events generated by an audience have the audience key set to `true` or `false` based on whether the user is entering or exiting the audience:

```js
{
  "type": "identify",
  "userId": u123,
  "traits": {
     "first_time_shopper": true // false when a user exits the audience
  }
}
```

`Track` events generated by an audience have a key for the audience name, and a key for the audience value:

```js
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



## Additional identifiers

Personas has a flexible identity resolution layer that allows you to build user profiles based on multiple identifiers like `user_id`, `email`, `mobile advertisingId`, etc. However, different destinations may require different keys, so they can do their own matching and identification. For example, Zendesk requires that you include the `name` property.
Personas includes logic to automatically enrich payloads going to these destinations with the required keys.

If you send events to a destination that requires specific enrichment we do not already include, [contact us and let us know](https://segment.com/help/contact/), and we‘ll do our best to address it.

> note ""
> **Note**: Profiles with multiple identifiers (for example, `user_id` and `email`) will trigger one API call per identifier when the audience or computed trait is first synced to a destination.


## Multiple identifiers of the same type

You might also see that profiles that have multiple values for the same `external_id` type, for example a profile might have multiple email addresses. When this happens, Personas sends one event per email for each audience or computed trait event. This ensures that all downstream email-based profiles receive the complete audience or computed trait.

We understand that in some situations this behavior might cause an unexpected volume of API calls. [Contact us](https://segment.com/help/contact/) if you have a use cases which calls for an exemption from this default behavior.

## New external identifiers added to a profile

There are two situations when Personas sends an audience or computed trait to a destination.

The first is when the value of the trait or audience changes.

The second, less common case is that Personas re-syncs an audience or computed trait when a new `external_id` is added to a profile. For example, an ecommerce company has an anonymous visitor with a computed trait called `last_viewed_category = 'Shoes'`. That visitor then creates an account and an email address is added to that profile, even though the computed trait value has not changed. When that email address is added to the profile, Personas re-syncs the computed trait that includes an email to downstream tools. This allows the ecommerce company to start personalizaing the user's experience from a more complete profile.

If this behavior, re-syncing a computed trait or audience when the underlying trait or audience value hasn’t changed, is not the desired in your system, [contact us](https://segment.com/help/contact/).


## Rate Limits on Personas Event Destinations

Many Destinations have strict rate limits that prevent Segment (and other partners) from sending too much data to a Destination at one time. Personas caps the number of requests per second to certain Destinations to avoid triggering rate limits that would cause data to be dropped. The most common scenario when customers run into rate-limits is when Personas first tries to sync a large set of historical users. Once this initial sync is done, we rarely run into rate-limit issues.

For additional information on Destination-specific rate limits, check the documentation for that Destination. If you need a higher rate limit, [let us know](https://segment.com/contact) which Destination you need it for and why.

| **Destination**                  | **Requests Per Second**                |
| -------------------------------- | -------------------------------------- |
| Braze                            | 100                                    |
| Customer.io                      | 30                                     |
| Hubspot                          | 5 obj/second (2 calls send per object) |
| Intercom                         | 8                                      |
| Iterable                         | 500                                    |
| Mailchimp                        | 10                                     |
| Marketo                          | 5                                      |
| Marketo Static Lists             | 5                                      |
| Pardot                           | 2                                      |
| Resci                            | 200                                    |
| Responsys                        | 3                                      |
| Responsys Batch                  | 3                                      |
| Sendgrid                         | 100                                    |
| Sendgrid Lists                   | 100                                    |
| Salesforce                       | 5                                      |
| Salesforce Marketing Cloud       | 20                                     |
| Salesforce Marketing Cloud Lists | 20                                     |
| Zendesk                          | 50                                     |



## Syncing data to a new Destination for the first time


When you create a new Computed Trait or Audience in Personas, you can choose to calculate it either using all the available historical data from your Segment implementation, or only using data that arrives after you set up the trait or audience. By default, Segment opts to include historical data. Afterwards, Segment only sends updates to that destination.

> success ""
> **Why would I disable historical data?** You might want to disable historical data if you're sending a triggered campaign. For example, if you want to send an email confirming a purchase, you _probably_ don’t want to email users who bought something months ago, but you *do* want to target current users as they make purchases (and thus enter the audience).

**Note**: The Personas Facebook Custom Audiences Website destination does not accept historical data, and so only uses data from after the moment you configure it.

## Personas Compatible Destinations: Event Type

- [ActiveCampaign](/docs/connections/destinations/catalog/activecampaign/)
- [AdWords Remarketing Lists](/docs/connections/destinations/catalog/adwords-remarketing-lists/)
- [Adjust](/docs/connections/destinations/catalog/adjust/)
- [Adobe Analytics](/docs/connections/destinations/catalog/adobe-analytics/)
- [Adtriba](/docs/connections/destinations/catalog/adtriba/)
- [Airship](/docs/connections/destinations/catalog/airship/)
- [Amazon EventBridge](/docs/connections/destinations/catalog/amazon-eventbridge/)
- [Amazon Kinesis Firehose](/docs/connections/destinations/catalog/amazon-kinesis-firehose/)
- [Amazon Kinesis](/docs/connections/destinations/catalog/amazon-kinesis/)
- [Amazon Lambda](/docs/connections/destinations/catalog/amazon-lambda/)
- [Amazon Personalize](/docs/connections/destinations/catalog/amazon-personalize/)
- [Amazon S3](/docs/connections/storage/catalog/amazon-s3/)
- [Amplitude](/docs/connections/destinations/catalog/amplitude/)
- [Appcues](/docs/connections/destinations/catalog/appcues/)
- [AppsFlyer](/docs/connections/destinations/catalog/appsflyer/)
- [Attribution](/docs/connections/destinations/catalog/attribution/)
- [AutopilotHQ](/docs/connections/destinations/catalog/autopilothq/)
- [Azure Function](/docs/connections/destinations/catalog/azure-function/)
- [Blendo](/docs/connections/destinations/catalog/blendo/)
- [Blueshift](/docs/connections/destinations/catalog/blueshift/)
- [Branch Metrics](/docs/connections/destinations/catalog/branch-metrics/)
- [Braze](/docs/connections/destinations/catalog/braze/)
- [ByteGain](/docs/connections/destinations/catalog/bytegain/)
- [Callingly](/docs/connections/destinations/catalog/callingly/)
- [Calq](/docs/connections/destinations/catalog/calq/)
- [Candu](/docs/connections/destinations/catalog/candu/)
- [Castle](/docs/connections/destinations/catalog/castle/)
- [Chameleon](/docs/connections/destinations/catalog/chameleon/)
- [ChurnZero](/docs/connections/destinations/catalog/churnzero/)
- [ClearBrain](/docs/connections/destinations/catalog/clearbrain/)
- [Clearbit Enrichment](/docs/connections/destinations/catalog/clearbit-enrichment/)
- [Clearbit Reveal](/docs/connections/destinations/catalog/clearbit-reveal/)
- [CleverTap](/docs/connections/destinations/catalog/clevertap/)
- [ClientSuccess](/docs/connections/destinations/catalog/clientsuccess/)
- [Convertro](/docs/connections/destinations/catalog/convertro/)
- [Criteo](/docs/connections/destinations/catalog/criteo/)
- [Cruncher](/docs/connections/destinations/catalog/cruncher/)
- [Custify](/docs/connections/destinations/catalog/custify/)
- [CustomFit.ai](/docs/connections/destinations/catalog/customfit-ai/)
- [Customer.io](/docs/connections/destinations/catalog/customer-io/)
- [CustomerSuccessBox](/docs/connections/destinations/catalog/customersuccessbox/)
- [Delighted](/docs/connections/destinations/catalog/delighted/)
- [DoubleClick Floodlight](/docs/connections/destinations/catalog/doubleclick-floodlight/)
- [Dreamdata IO](/docs/connections/destinations/catalog/dreamdata-io/)
- [Drift](/docs/connections/destinations/catalog/drift/)
- [Drip](/docs/connections/destinations/catalog/drip/)
- [EMMA](/docs/connections/destinations/catalog/emma/)
- [EPICA](/docs/connections/destinations/catalog/epica/)
- [Eloqua](/docs/connections/destinations/catalog/eloqua/)
- [Emarsys](/docs/connections/destinations/catalog/emarsys/)
- [Facebook App Events](/docs/connections/destinations/catalog/facebook-app-events/)
- [Facebook Offline Conversions](/docs/connections/destinations/catalog/facebook-offline-conversions/)
- [FactorsAI](/docs/connections/destinations/catalog/factorsai/)
- [Freshmarketer](/docs/connections/destinations/catalog/freshmarketer/)
- [Freshsales](/docs/connections/destinations/catalog/freshsales/)
- [FunnelEnvy](/docs/connections/destinations/catalog/funnelenvy/)
- [FunnelFox](/docs/connections/destinations/catalog/funnelfox/)
- [Gainsight](/docs/connections/destinations/catalog/gainsight/)
- [GoSquared](/docs/connections/destinations/catalog/gosquared/)
- [Google Ads (Classic)](/docs/connections/destinations/catalog/adwords/)
- [Google Analytics](/docs/connections/destinations/catalog/google-analytics/)
- [Google Cloud Function](/docs/connections/destinations/catalog/google-cloud-function/)
- [Google Cloud PubSub](/docs/connections/destinations/catalog/google-cloud-pubsub/)
- [HasOffers](/docs/connections/destinations/catalog/hasoffers/)
- [Heap](/docs/connections/destinations/catalog/heap/)
- [Help Scout](/docs/connections/destinations/catalog/help-scout/)
- [HubSpot](/docs/connections/destinations/catalog/hubspot/)
- [Hull](/docs/connections/destinations/catalog/hull/)
- [IBM UBX](/docs/connections/destinations/catalog/ibm-ubx/)
- [Indicative](/docs/connections/destinations/catalog/indicative/)
- [Intellimize](/docs/connections/destinations/catalog/intellimize/)
- [Intercom](/docs/connections/destinations/catalog/intercom/)
- [Iron.io](/docs/connections/destinations/catalog/iron-io/)
- [Iterable](/docs/connections/destinations/catalog/iterable/)
- [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/)
- [Kahuna](/docs/connections/destinations/catalog/kahuna/)
- [Keen](/docs/connections/destinations/catalog/keen/)
- [Kitemetrics](/docs/connections/destinations/catalog/kitemetrics/)
- [Klaviyo](/docs/connections/destinations/catalog/klaviyo/)
- [Kochava](/docs/connections/destinations/catalog/kochava/)
- [Kustomer](/docs/connections/destinations/catalog/kustomer/)
- [Lantern](/docs/connections/destinations/catalog/lantern/)
- [Leanplum](/docs/connections/destinations/catalog/leanplum/)
- [Librato](/docs/connections/destinations/catalog/librato/)
- [Lytics](/docs/connections/destinations/catalog/lytics/)
- [Madkudu](/docs/connections/destinations/catalog/madkudu/)
- [MailChimp](/docs/connections/destinations/catalog/mailchimp/)
- [Mailjet](/docs/connections/destinations/catalog/mailjet/)
- [Mammoth](/docs/connections/destinations/catalog/mammoth/)
- [Marketo V2](/docs/connections/destinations/catalog/marketo-v2/)
- [Millennial Media](/docs/connections/destinations/catalog/millennial-media/)
- [Mixpanel](/docs/connections/destinations/catalog/mixpanel/)
- [MoEngage](/docs/connections/destinations/catalog/moengage/)
- [Moesif API Analytics](/docs/connections/destinations/catalog/moesif-api-analytics/)
- [Moosend](/docs/connections/destinations/catalog/moosend/)
- [Movable Ink](/docs/connections/destinations/catalog/movable-ink/)
- [Mutiny](/docs/connections/destinations/catalog/mutiny/)
- [Nanigans](/docs/connections/destinations/catalog/nanigans/)
- [Natero](/docs/connections/destinations/catalog/natero/)
- [New Relic](/docs/connections/destinations/catalog/new-relic/)
- [Experiments by Growthhackers](/docs/connections/destinations/catalog/experiments-by-growthhackers/)
- [Nudgespot](/docs/connections/destinations/catalog/nudgespot/)
- [OneSignal](/docs/connections/destinations/catalog/onesignal/)
- [Optimizely Full Stack](/docs/connections/destinations/catalog/optimizelyx/)
- [Pardot](/docs/connections/destinations/catalog/pardot/)
- [Parsely](/docs/connections/destinations/catalog/parsely/)
- [Pendo](/docs/connections/destinations/catalog/pendo/)
- [PersistIQ](/docs/connections/destinations/catalog/persistiq/)
- [Personas Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-ads/)
- [Personyze](/docs/connections/destinations/catalog/personyze/)
- [PixelMe](/docs/connections/destinations/catalog/pixelme/)
- [Planhat](/docs/connections/destinations/catalog/planhat/)
- [Podsights](/docs/connections/destinations/catalog/podsights/)
- [Pointillist](/docs/connections/destinations/catalog/pointillist/)
- [Promoter.io](/docs/connections/destinations/catalog/promoter-io/)
- [Proof Experiences](/docs/connections/destinations/catalog/proof-experiences/)
- [QuanticMind](/docs/connections/destinations/catalog/quanticmind/)
- [RadiumOne Connect](/docs/connections/destinations/catalog/radiumone-connect/)
- [Ramen](/docs/connections/destinations/catalog/ramen/)
- [Refersion](/docs/connections/destinations/catalog/refersion/)
- [Refiner](/docs/connections/destinations/catalog/refiner/)
- [Repeater](/docs/connections/destinations/catalog/repeater/)
- [Responsys](/docs/connections/destinations/catalog/responsys/)
- [SMBStreams](/docs/connections/destinations/catalog/smbstream/)
- [Sailthru](/docs/connections/destinations/catalog/sailthru/)
- [Salesforce Marketing Cloud](/docs/connections/destinations/catalog/salesforce-marketing-cloud/)
- [Salesforce](/docs/connections/destinations/catalog/salesforce/)
- [Salesmachine](/docs/connections/destinations/catalog/salesmachine/)
- [SatisMeter](/docs/connections/destinations/catalog/satismeter/)
- [Savio](/docs/connections/destinations/catalog/savio/)
- [ScopeAI](/docs/connections/destinations/catalog/scopeai/)
- [Seg](/docs/connections/destinations/catalog/seg/)
- [Serenytics](/docs/connections/destinations/catalog/serenytics/)
- [Sherlock](/docs/connections/destinations/catalog/sherlock/)
- [Singular](/docs/connections/destinations/catalog/singular/)
- [Slack](/docs/connections/destinations/catalog/slack/)
- [SlicingDice](/docs/connections/destinations/catalog/slicingdice/)
- [Split](/docs/connections/destinations/catalog/split/)
- [Stitch Data](/docs/connections/destinations/catalog/stitch-data/)
- [Strikedeck](/docs/connections/destinations/catalog/strikedeck/)
- [TUNE](/docs/connections/destinations/catalog/tune/)
- [Tamber](/docs/connections/destinations/catalog/tamber/)
- [Totango](/docs/connections/destinations/catalog/totango/)
- [Trackier](/docs/connections/destinations/catalog/trackier/)
- [Tractionboard](/docs/connections/destinations/catalog/tractionboard/)
- [TrafficGuard](/docs/connections/destinations/catalog/trafficguard/)
- [Treasure Data](/docs/connections/destinations/catalog/treasure-data/)
- [Trustpilot](/docs/connections/destinations/catalog/trustpilot/)
- [Unwaffle](/docs/connections/destinations/catalog/unwaffle/)
- [Upcall](/docs/connections/destinations/catalog/upcall/)
- [UserEngage](/docs/connections/destinations/catalog/userengage/)
- [UserIQ](/docs/connections/destinations/catalog/useriq/)
- [Userlist](/docs/connections/destinations/catalog/userlist/)
- [Vero](/docs/connections/destinations/catalog/vero/)
- [Vitally](/docs/connections/destinations/catalog/vitally/)
- [WalkMe](/docs/connections/destinations/catalog/walkme/)
- [Watchtower](/docs/connections/destinations/catalog/watchtower/)
- [WebEngage](/docs/connections/destinations/catalog/webengage/)
- [Webhooks](/docs/connections/destinations/catalog/webhooks/)
- [Whale Alerts](/docs/connections/destinations/catalog/whale-alerts/)
- [Whale Watch](/docs/connections/destinations/catalog/whale-watch/)
- [Wigzo](/docs/connections/destinations/catalog/wigzo/)
- [Wishpond](/docs/connections/destinations/catalog/wishpond/)
- [Woopra](/docs/connections/destinations/catalog/woopra/)
- [Xplenty](/docs/connections/destinations/catalog/xplenty/)
- [Xtremepush](/docs/connections/destinations/catalog/xtremepush/)
- [Zaius](/docs/connections/destinations/catalog/zaius/)
- [Zapier](/docs/connections/destinations/catalog/zapier/)
- [Zendesk Connect](/docs/connections/destinations/catalog/outbound/)
- [Zendesk](/docs/connections/destinations/catalog/zendesk/)
- [goedle.io](/docs/connections/destinations/catalog/goedle-io/)
- [hydra](/docs/connections/destinations/catalog/hydra/)
- [mabl](/docs/connections/destinations/catalog/mabl/)
- [tray.io](/docs/connections/destinations/catalog/tray-io/)

## Personas Compatible Destinations: List Type

- [Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/)
- [AdWords Remarketing Lists](/docs/connections/destinations/catalog/adwords-remarketing-lists/)
- [Marketo Static Lists](/docs/connections/destinations/catalog/marketo-static-lists/)
