---
title: Sources
sidebar: Overview
---

## Website

[Analytics.js](/docs/sources/website/analytics.js/), our Javascript library, is the most powerful way to track customer data from your website. We recommend it over server-side libraries as the default installation for any website.

## Mobile

Our Mobile SDKs are the best way to simplify your iOS, Android, and Xamarin app tracking. We recommend them over server-side sources as the default installation for any mobile app.

- [iOS SDK](/docs/sources/mobile/ios)
- [Android SDK](/docs/sources/mobile/android)
- [Android Wear SDK](/docs/sources/mobile/android/wear)
- [Xamarin SDK](/docs/sources/mobile/xamarin)
- [AMP](/docs/sources/mobile/amp)
- [React Native](/docs/sources/mobile/react-native)

## Server

Our server-side sources let you send analytics data directly from your servers. We only recommend tracking from your servers when client-side tracking won't work. Check out [our guide on server-side tracking](/docs/guides/sources/client-vs-server) if you're not sure whether it makes sense for your use case.

- [Clojure](/docs/sources/server/clojure/)
- [Go](/docs/sources/server/go/)
- [Rust](/docs/sources/server/rust/)
- [Java](/docs/sources/server/java/)
- [Node.js](/docs/sources/server/node/)
- [PHP](/docs/sources/server/php/)
- [Python](/docs/sources/server/python/)
- [Ruby](/docs/sources/server/ruby/)
- [.NET](/docs/sources/server/net/)

## Cloud Apps

Cloud app sources empower you to pull together data from all of your different third-party tools into a Segment warehouse or to your other enabled integrated tools. There are two types of Cloud Apps: **Object** and **Event** sources.

### Object Cloud Sources

These Cloud App Sources can export data from its third party tool and import it directly into your Segment warehouse. Make sure you have a Segment warehouse enabled before you enable any of the following sources:

- [Salesforce](/docs/sources/cloud-apps/salesforce/)
- [Stripe](/docs/sources/cloud-apps/stripe/)
- [Zendesk](/docs/sources/cloud-apps/zendesk/)
- [Facebook Ads](/docs/sources/cloud-apps/facebook-ads/)
- [Google Ads](/docs/sources/cloud-apps/google-ads/)
- [SendGrid](/docs/sources/cloud-apps/sendgrid/)
- [Mailchimp](/docs/sources/cloud-apps/mailchimp/)
- [Mandrill](/docs/sources/cloud-apps/mandrill/)
- [Marketo](/docs/sources/cloud-apps/marketo/)
- [Twilio](/docs/sources/cloud-apps/twilio/)
- [HubSpot](/docs/sources/cloud-apps/hubspot/)
- [Intercom](/docs/sources/cloud-apps/intercom/)
- [Salesforce Marketing Cloud](/docs/sources/cloud-apps/salesforce-marketing-cloud/)

### Event Cloud Sources

These Cloud App Sources can not only export data into your Segment warehouse, but they can **also** federate the exported data into your other enabled Segment integrations:

- [Facebook Lead Ads](/docs/sources/cloud-apps/facebook-lead-ads/)
- [Activecampaign](/docs/sources/cloud-apps/activecampaign/)
- [Customer.io](/docs/sources/cloud-apps/customer.io/)
- [Drip](/docs/sources/cloud-apps/drip/)
- [Iterable](/docs/sources/cloud-apps/iterable/)
- [Klaviyo](/docs/sources/cloud-apps/klaviyo/)
- [Mailjet](/docs/sources/cloud-apps/mailjet/)
- [Nudgespot](/docs/sources/cloud-apps/nudgespot/)
- [Vero](/docs/sources/cloud-apps/vero/)
- [Blueshift](/docs/sources/cloud-apps/blueshift/)
- [Delighted](/docs/sources/cloud-apps/delighted/)
- [Braze](/docs/sources/cloud-apps/braze/)
- [Looker](/docs/sources/cloud-apps/looker/)
- [Radar](/docs/sources/cloud-apps/radar/)
- [Autopilot](/docs/sources/cloud-apps/autopilothq/)
- [Friendbuy](/docs/sources/cloud-apps/friendbuy/)
- [Amplitude Cohorts](/docs/sources/cloud-apps/amplitude-cohorts/)
- [Klenty](/docs/sources/cloud-apps/klenty/)
- [ProveSource](/docs/sources/cloud-apps/provesource/)
- [Moesif API Analytics](/docs/sources/cloud-apps/moesif-api-analytics/)
- [Airship](/docs/sources/cloud-apps/airship/)
- [Pendo](/docs/sources/cloud-apps/pendo/)

To dig into some examples of how to pull this data together, check out our [sample queries](https://community.segment.com/category/warehouses) in the Segment Community.

### HTTP

If we don't have a library for your environment yet, you can always send your data directly to our [HTTP Tracking API](/docs/sources/server/http/). All of our other sources and platforms use the HTTP API to work their magic behind the scenes.

### Pixel

Our [Pixel Tracking API](/docs/sources/server/pixel-tracking-api/) lets you track events from environments where you can't execute code, like tracking email opens.

### Source request

We'd love to know what other sources of data you'd like to analyze. Please [log your request](/contact/requests/source/).


## Visual Tagger (Alpha)

[Getting started with Segment Visual Tagger](/docs/sources/visual-tagger)

## FAQs

[What is a source?](/docs/guides/getting-started/what-is-a-source)

[Should I track client or server-side?](/docs/guides/sources/client-vs-server/)

[What are best practices in identifying users?](/docs/guides/sources/identifying-users/)

[What events should I track?](/docs/guides/sources/what-to-track/)

[How do I join user profiles?](/docs/guides/sources/joining-user-profiles)

[How do I measure my advertising funnel?](/docs/guides/sources/how-do-i-measure-my-ad-funnel/)

### Cloud Sources

[What are cloud sources?](/docs/guides/getting-started/what-are-cloud-sources)

[How do cloud sources work?](/docs/guides/sources/how-do-sources-work)

[What can I do with cloud app source data?](/docs/guides/sources/what-can-I-do-with-cloud-sources-data/)

[What are some common cloud source errors and how do I debug them?](/docs/guides/sources/debugging-sources)

[How does Segment handle duplicate data?](https://segment.com/docs/guides/general%20/how-does-segment-handle-duplicate-data/)

### Mobile

[What is the difference between bundled SDKs and server-side destinations for mobile?](/docs/guides/sources/bundled-SDK-vs-server)

[What is the Native Mobile Spec?](/docs/guides/sources/mobile-spec-faqs)
