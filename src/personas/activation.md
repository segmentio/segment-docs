---
title: 'Personas Activation'
---

## Activation

Computed Traits are always sent to **Event Destinations** destinations through the identify call as a user trait, or additionally as a group call for account-level computed traits. With Audiences, we can send the audience either as a boolean user property to **Event Destinations**, or as a user list to **List Destinations**. Note that for account-level audiences syncing to list destinations, we will send the list of all users within an account that satisfies your audience criteria.

#### Event Destinations

For event destinations, you can send an audience as an [identify](/docs/spec/identify) call and/or [track](/docs/spec/identify) call to the destination for each user being added and removed. For identify calls, the trait name will be the snake_cased version of the audience name you provide with a true/false value. For example, when a user first completes an order in the last 30 days, we will send an identify call with the property `order_completed_last_30days: true`, and when this user no longer satisfies we will set that value to `false`. For track calls, we will send two events, `Audience Entered` and `Audience Exited`, with the event property `order_completed_last_30days` equal to true and false, respectively.

When the audience is first created an identify or track call is sent for every user in the audience. Subsequent syncs will only send updates for those users which were added or removed since the last sync.

The following event destinations below are supported. Note that some destinations do not support flexible schemas and require you to create the `audience_name` field before Personas can update those values. Check the specific destination's docs for more details.

- [ActiveCampaign](https://segment.com/docs/destinations/activecampaign)
- [Akita](https://segment.com/docs/destinations/akita)
- [All Aboard](https://segment.com/docs/destinations/all-aboard)
- [Amazon Kinesis Firehose](https://segment.com/docs/destinations/amazon-kinesis-firehose)
- [Amazon Kinesis](https://segment.com/docs/destinations/amazon-kinesis)
- [Amazon S3](https://segment.com/docs/destinations/amazon-s3)
- [Amplitude](https://segment.com/docs/destinations/amplitude)
- [Appcues](https://segment.com/docs/destinations/appcues)
- [AppsFlyer](https://segment.com/docs/destinations/appsflyer)
- [Attribution](https://segment.com/docs/destinations/attribution)
- [AutopilotHQ](https://segment.com/docs/destinations/autopilothq)
- [Azure SQL Data Warehouse](https://segment.com/docs/destinations/azuresqldw/)
- [BigQuery](https://segment.com/docs/destinations/bigquery/)
- [Blueshift](https://segment.com/docs/destinations/blueshift)
- [Braze](https://segment.com/docs/destinations/appboy)
- [Calq](https://segment.com/docs/destinations/calq)
- [Castle](https://segment.com/docs/destinations/castle)
- [Chameleon](https://segment.com/docs/destinations/chameleon)
- [Chango](https://segment.com/docs/destinations/chango)
- [CleverTap](https://segment.com/docs/destinations/clevertap)
- [ClientSuccess](https://segment.com/docs/destinations/clientsuccess)
- [Customer.io](https://segment.com/docs/destinations/customer.io)
- [Delighted](https://segment.com/docs/destinations/delighted)
- [Drift](https://segment.com/docs/destinations/drift)
- [Drip](https://segment.com/docs/destinations/drip)
- [Eloqua](https://segment.com/docs/destinations/eloqua)
- [Emarsys](https://segment.com/docs/destinations/emarsys)
- [Freshsales](https://segment.com/docs/destinations/freshsales)
- [FullContact](https://segment.com/docs/destinations/fullcontact)
- [Gainsight](https://segment.com/docs/destinations/gainsight)
- [GoSquared](https://segment.com/docs/destinations/gosquared)
- [Goedle](https://segment.com/docs/destinations/goedle)
- [Google Analytics](https://segment.com/docs/destinations/google-analytics)
- [Google Cloud PubSub](https://segment.com/docs/destinations/google-cloud-pubsub)
- [HasOffers](https://segment.com/docs/destinations/hasoffers)
- [Heap](https://segment.com/docs/destinations/heap)
- [Help Scout](https://segment.com/docs/destinations/help-scout)
- [HubSpot](https://segment.com/docs/destinations/hubspot)
- [Hull](https://segment.com/docs/destinations/hull)
- [IBM Db2 Warehouse](https://segment.com/docs/destinations/db2/)
- [Indicative](https://segment.com/docs/destinations/indicative)
- [Infinario](https://segment.com/docs/destinations/infinario)
- [Intellimize](https://segment.com/docs/destinations/intellimize)
- [Intercom](https://segment.com/docs/destinations/intercom)
- [Iron.io](https://segment.com/docs/destinations/iron.io)
- [Iterable](https://segment.com/docs/destinations/iterable)
- [KISSmetrics](https://segment.com/docs/destinations/kissmetrics)
- [Kahuna](https://segment.com/docs/destinations/kahuna)
- [Keen IO](https://segment.com/docs/destinations/keen-io)
- [Klaviyo](https://segment.com/docs/destinations/klaviyo)
- [Knowtify](https://segment.com/docs/destinations/knowtify)
- [Kochava](https://segment.com/docs/destinations/kochava)
- [Leanplum](https://segment.com/docs/destinations/leanplum)
- [Lytics](https://segment.com/docs/destinations/lytics)
- [Madkudu](https://segment.com/docs/destinations/madkudu)
- [MailChimp](https://segment.com/docs/destinations/mailchimp)
- [Mailjet](https://segment.com/docs/destinations/mailjet)
- [Marketo V2](https://segment.com/docs/destinations/marketo-v2)
- [Mixpanel](https://segment.com/docs/destinations/mixpanel)
- [MoEngage](https://segment.com/docs/destinations/moengage)
- [Nanigans](https://segment.com/docs/destinations/nanigans)
- [Natero](https://segment.com/docs/destinations/natero)
- [Nudgespot](https://segment.com/docs/destinations/nudgespot)
- [Optimizely X](https://segment.com/docs/destinations/optimizelyx)
- [Outbound](https://segment.com/docs/destinations/outbound)
- [Pardot](https://segment.com/docs/destinations/pardot)
- [Planhat](https://segment.com/docs/destinations/planhat)
- [Postgres](https://segment.com/docs/destinations/postgres/)
- [Promoter.io](https://segment.com/docs/destinations/promoter.io)
- [QuanticMind](https://segment.com/docs/destinations/quanticmind)
- [Redshift](https://segment.com/docs/destinations/redshift/)
- [Repeater](https://segment.com/docs/destinations/repeater)
- [Responsys](https://segment.com/docs/destinations/responsys)
- [Sailthru](https://segment.com/docs/destinations/sailthru)
- [Salesforce DMP](https://segment.com/docs/destinations/salesforce-dmp)
- [Salesforce Marketing Cloud](https://segment.com/docs/destinations/salesforce-marketing-cloud)
- [Salesforce](https://segment.com/docs/destinations/salesforce)
- [SatisMeter](https://segment.com/docs/destinations/satismeter)
- [Selligent](https://segment.com/docs/destinations/selligent)
- [Sendwithus](https://segment.com/docs/destinations/sendwithus)
- [Smyte](https://segment.com/docs/destinations/smyte)
- [Snowflake](https://segment.com/docs/destinations/snowflake/)
- [Stitch Data](https://segment.com/docs/destinations/stitch-data)
- [Stitch](https://segment.com/docs/destinations/stitch)
- [TUNE](https://segment.com/docs/destinations/tune)
- [Totango](https://segment.com/docs/destinations/totango)
- [Tractionboard](https://segment.com/docs/destinations/tractionboard)
- [tray.io](https://segment.com/docs/destinations/tray.io)
- [UserEngage](https://segment.com/docs/destinations/userengage)
- [Vero](https://segment.com/docs/destinations/vero)
- [WebEngage](https://segment.com/docs/destinations/webengage)
- [Webhooks](https://segment.com/docs/destinations/webhooks)
- [Wishpond](https://segment.com/docs/destinations/wishpond)
- [Woopra](https://segment.com/docs/destinations/woopra)
- [Zaius](https://segment.com/docs/destinations/zaius)
- [Zendesk](https://segment.com/docs/destinations/zendesk)

#### List Destinations

When syncing to a list destination Personas will upload lists of users directly to the destination. When an audience is first created the entire list of audience users will be uploaded to the destination. Subsequent syncs will only upload the users added or removed since the last sync.

Note that different user-list destinations have limits on how often we can sync. For example, AdWords recommends only updating user lists once every 6 hours. An AdWords audience would be updated every 6 hours if the sync rate was once an hour and every 8 hours if the sync rate was every 4 hours. Facebook supports syncing audiences every hour.

We support the following user-list destinations:

- [Facebook Custom Audiences](https://segment.com/docs/destinations/personas-facebook-ads)
- [AdWords Remarketing Lists](https://segment.com/docs/destinations/adwords-remarketing-lists)
- [Marketo Static Lists]((https://segment.com/docs/destinations/marketo-static-lists)

### Profile API

You can also access your computed traits and audiences programmatically via the Profile API. Consult the [Profile API documentation](https://segment.com/docs/personas/profile-api/) for full details.
