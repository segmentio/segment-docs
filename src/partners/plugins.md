---
title: Building a Plugin
---

> info ""
> The Developer Center currently only supports the [Subscription](/docs/partners/subscriptions) component in _Developer Preview_. Include [your information here](https://airtable.com/shrT3b4C7agUEBKVS) and we'll contact you once _Plugins_ are made available!

SDK Plugins are used to augment traditional Destination and Source components ([Subscriptions](/docs/partners/subscriptions/) and [Streams](/docs/partners/streams/)) by shipping code to the End User's Device. You can use this mechanism to enable customers to dynamically include your libraries or SDKs and to wire up the Segment SDK to invoke them directly when your plugin is enabled. This pattern is most commonly used to build what we call "Device-mode Destinations".

Segment's Client SDKs (analytics.js, analytics-ios, and analytics-android) serve as "microcosms" of the Segment Customer Data Infrastructure runtime — they enable the dynamic orchestration of event collection, cleaning and validation, transforming, and delivery to collection endpoints right from inside the SDK.

SDK Plugins are an appropriate component for your App if your source or destination requires client-side side effects, such as collecting ambient data in the client (Heatmapping, Error & Performance Monitoring tools), relying on device-native context such as third party cookies (Advertising pixels), or needs to actively modify the Client UI (e.g. A/B testing, Push Notification, In-App Messaging and LiveChat).


## Getting Started

Review the steps outlined in the [Developer Center Overview](/docs/partners). This document outlines specific details for Step 4 as it relates to building a plugin.

1. Understand Segment's [Conceptual Model](/docs/partners/conceptual-model) and [Spec](https://segment.com/docs/connections/spec).
2. Follow Segment's security guidance.
3. Request [access to the Segment Developer Center](https://segment.com/partners/developer-center/).
4. Create an App.
5. Build and test your Component(s).
6. Publish documentation.
7. Submit your App for review.
8. Launch into _Public Beta_!


## Build & Test

Once you've created an App, you're ready to starting building your Plugin. Refer to the documentation and examples in these repositories to learn how to build and initialize your plugins for the appropriate libraries.

* [Analytics.js Plugin Docs](https://github.com/segmentio/analytics.js/wiki/Writing-Integrations) + [Mixpanel Analytics.js Plugin Example](https://github.com/segment-integrations/analytics.js-integration-mixpanel)

* [Android Plugin Docs](https://github.com/segmentio/analytics-android/wiki/Writing-Integrations) + [Mixpanel Android Plugin Example](https://github.com/segment-integrations/analytics-android-integration-mixpanel)

* [iOS Plugin Docs](https://github.com/segmentio/analytics-ios/wiki/Writing-Integrations) + [Mixpanel iOS Plugin Example](https://github.com/segment-integrations/analytics-ios-integration-mixpanel)

As with all partner contributions, only those which follow the Segment [Spec](/docs/connections/spec) will be approved. Once you've finished building your plugin, make sure to reference the above wikis to test your plugin locally. Before reviewing, we'll need to see a full suite of cross-device tests.

## Next Steps

Complete the remaining steps as outlined in the [Developer Center Overview](/docs/partners/#5-document)
