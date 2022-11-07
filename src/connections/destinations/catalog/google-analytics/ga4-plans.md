---
title: 'Google Analytics 4 destination'
strat: google
hide-dossier: true
published: false
---

Google introduced the new version of Google Analytics, called Google Analytics 4 (GA4), in October 2020. GA4 has some distinct differences from Universal Analytics (UA), which are important to understand before considering migration and the data schema changes that might require.

> success ""
> Segment expects to release a beta GA4 destination in Q4 2021. Segment will update this page to share the latest on the GA4 destination.


## Event-based data model vs pageview-based data model

GA4 has an event-based data model, like Segment. It is replacing Universal Analytics (UA), which has a pageview-centric data model. For more details, see Google's help center article: [Universal Analytics versus Google Analytics 4 data](https://support.google.com/analytics/answer/9964640?hl=en).

Because the data models are different, data *cannot* be migrated from Universal Analytics to GA4. Google recommends you rethink your data collection in terms of the new model, rather than port everything over from UA. If you're using UA for ecommerce, see Google's best practices guide for setting up ecommerce tracking in GA4: [Migrate ecommerce data collection from Universal Analytics](https://support.google.com/analytics/answer/10119380?hl=en&ref_topic=10270831); note this is not a simple migration.


## Support for web and mobile data streams

UA's pageview-based data model made it great for websites, but not wonderful for mobile apps, which might load content dynamically, without having “pages” the way UA defined them. GA4 has an event-based data model which improves upon this, and can serve as a single reporting destination for both your web *and* mobile sources. This means you can compare data across devices.

If you decide to use GA4 so you can compare the data, you should spend some time thinking about how to set it up. To compare data across devices, you must use the same parameters across all data streams when you create your custom events.


## New reports

GA4's out-of-the-box reports are different from UA's. GA4's reporting is much more configurable, and supports new reporting metrics like churn probability and predictive revenue estimates.

You might not be able to perfectly recreate your UA reports in GA4. One approach is to send your data to both UA and GA4 while you build out your new reports in GA4, and improve those reports over time. Once you are satisfied that your GA4 reports meet your needs, you can gradually migrate away from using the original reporting in UA.

GA4 requires that you use GA4's recommended events and properties in order to get the new reports. Segment's GA4 destination will automatically map your Segment spec events to the corresponding recommended GA4 events and properties. If your events do not follow the Segment spec exactly, don't worry; you'll be able to modify the mappings. You can also create custom events and properties.


## Cloud Mode (Server-based) first

Segment will start by supporting Cloud-mode for GA4. Note that the [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#send_an_event) that enables server-to-server data syncing for GA4 properties is [currently in alpha](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#send_an_event).

## Switching to GA4

Universal Analytics replaced Google Analytics in 2012; there is precedent for Google slowly replacing the previous generation of Google Analytics with something new. You do not need to switch to GA4 right now. Ultimately, when and how you migrate to GA4 is up to you and your team.

While Google indicates that GA4 is the future (it's the new default property type when you create a new Google Analytics account), Universal Analytics doesn't appear to be going anywhere. You can still choose to [create a new Universal Analytics property](https://support.google.com/analytics/answer/10269537) when you create your new GA4 property.
