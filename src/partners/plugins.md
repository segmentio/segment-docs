---
title: Building a Plugin
---

_**Note:** The building of Web Plugins are currently not available. Please include [your information here](https://airtable.com/shrT3b4C7agUEBKVS) and we will reach out when this is made available!_

SDK Plugins are used to augment traditional Destination and Source components ([Subscriptions](/docs/partners/subscription/) and [Streams](/docs/partners/streams/)) by shipping code to the End User's Device. You can use this mechanism to enable customers to dynamically include your libraries or SDKs and to wire up the Segment SDK to invoke them directly when your plugin is enabled. This pattern is most commonly used to build what we call "Device-mode Destinations."

Segment's Client SDKs (analytics.js, analytics-ios, and analytics-android) serve as "microcosms" of the Segment Customer Data Infrastructure runtime — they enable the dynamic orchestration of event collection, cleaning and validation, transforming, and delivery to collection endpoints right from inside the SDK.

SDK Plugins are an appropriate component for your App if your source or destination requires client-side side effects, such as collecting ambient data in the client (Heatmapping, Error & Performance Monitoring tools), relying on device-native context such as third party cookies (Advertising pixels), or needs to actively modify the Client UI (e.g. A/B testing, Push Notification, In-App Messaging and LiveChat).

_**Note:** SDK Plugins show up in our Connections Catalog as a "Device Based Destination" today, but this is subject to change, especially as we add support for more data data *collection*, *enrichment*, and *transformation* oriented primitives to plugins._

Please follow the documentation carefully. Segment will not approve submissions for SDK plugin components that don't follow best practices or don't provide any more functionality than that supported by a [subscription](/docs/partners/subscription), as customers universally prefer Cloud-mode to Device-mode when available.

## Get Access to the Developer Center

[Request access](https://segment.com/partners/integration/) so we know you're interested in building an SDK Plugin. 

We'll grant you access to our Developer Center and agree on a launch date so that we can provide a focused window of deep guidance and support.

By starting or continuing this process, you agree to the [Segment Platform Partners Agreement](https://segment.com/docs/legal/partnersagreement/).

## Create your App

Now you can create your App. Your App will ultimately represent you in the Segment Catalog, so you should name it after your company.

## Build your Plugin

_**Note:** The building of Web Plugins are currently not available. Please include [your information here](https://airtable.com/shrT3b4C7agUEBKVS) and we will reach out when this is made available!_

Once you've received approval from the team at Segment, you'll then need to write custom transformation module(s) for the appropriate Segment SDK(s). As you can host and distribute these modules in repositories and package managers yourself, you'll have no impediment from Segment in updating and releasing new versions of your plugin. For Mobile SDK plugins, customers will specify in their build phase the version of your Plugin they'd like to use. For Analytics.js Web SDK plugins, you'll be able to specify the version we should distribute in the Developer Center.

Please refer to the documentation and examples in these repositories to learn how to build and initialize your plugins for the appropriate libraries. 

* [Analytics.js Plugin Docs](https://github.com/segmentio/analytics.js/wiki/Writing-Integrations) + [Mixpanel Analytics.js Plugin Example](https://github.com/segment-integrations/analytics.js-integration-mixpanel)

* [Android Plugin Docs](https://github.com/segmentio/analytics-android/wiki/Writing-Integrations) + [Mixpanel Android Plugin Example](https://github.com/segment-integrations/analytics-android-integration-mixpanel)

* [iOS Plugin Docs](https://github.com/segmentio/analytics-ios/wiki/Writing-Integrations) + [Mixpanel iOS Plugin Example](https://github.com/segment-integrations/analytics-ios-integration-mixpanel)

Note that for now, we will only support one setting for partner-contributed SDK plugins: a *write-scoped* key such as "Client ID" or "Property ID" that dictates where to write data inside your tool (if applicable). 

As with all partner contributions, only those which follow the Segment [Spec](/docs/connections/spec) will be approved.

## Test your Plugin

Each of the wikis above reference steps for testing your plugin locally.

Before reviewing, we'll need to see a full suite of cross-device tests.

## Document your Plugin

To provide a great experience for users, and to help us test your integration, you need to document your integration. Segment expects docs both on your site about Segment, and on Segment's site about your integration. We provide templates for our docs to help you get started:

- For https://segment.com/docs/ about your integration ([HackMD template](https://hackmd.io/t7amLXluS7-39rg7ARZgSA))
- For https://segment.com/catalog/ about your integration ([Google Docs template](https://docs.google.com/document/d/1kvAvAHLyM3pOq-lBcZJhP_X_KivHlk1eiFy-5ERWDXc/edit))

## Submit your App for Review

Once you've tested your plugin successfully, reach out to partner-support@segment.com with:

* A link (and, if you insist on it remaining private, an invite) to your repo with live CI demonstrating passing tests
* The name of your settings field for your write key (Client ID, App ID, etc).
* A list of customer workspaces you intend to test your integration with.

In the near future, this process will be automated through the Segment Developer Center.

## Get Approved for the Segment Catalog

After we have reviewed and approved your application and plugin, you'll be launched in Beta. The purpose of Beta is to test the plugin with at least 3 mutual customers. You'll remain in Private Beta until you have shown that these customers are getting value out of your integration.

When you have completed the requirements of Beta, you'll be fully launched onto the platform.

## FAQ

_**Note:** The building of Web Plugins are currently not available. Please include [your information here](https://airtable.com/shrT3b4C7agUEBKVS) and we will reach out when this is made available!_

Please reach out to partner-support@segment.com with any questions.
