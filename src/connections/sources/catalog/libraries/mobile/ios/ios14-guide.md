---
title: iOS 14 Guide
strat: ios
---

> warning ""
> **Note:** You should update your `analytics-ios` and device-mode destinations to adapt to iOS 14 changes explained in this guide.

> note ""
> For information about iOS 14.5, see [What's new in iOS 14.5](#whats-new-with-ios-145) below.

In June 2020, Apple made several privacy-related announcements at WWDC20 about its upcoming iOS 14 release, including [changes to the collection and use of Identifier for Advertising (IDFA)](https://developer.apple.com/app-store/user-privacy-and-data-use/). These changes require developers to ask for user consent *before* collecting IDFA to track users across multiple applications.

Segment fundamentally agrees with Apple's stance.

Apple released iOS 14 in the autumn of 2020, but [delayed the IDFA changes until early 2021](https://developer.apple.com/news/?id=hx9s63c5&1599152522). Segment products, including Connections, Protocols, Personas (including Identity Resolution), and Privacy, Data Lakes, and Cloud Sources, do not rely on IDFA and so are not affected by these platform changes. However, Segment's iOS Source SDK (`analytics-ios`) and any destinations that previously used IDFA require that you update them so they continue to work with iOS 14.

Segment updated the iOS Source SDK (`analytics-ios`) and any affected destinations so they support Apple's iOS platform changes. The Segment iOS SDK (`analytics-ios`) has been updated to version 4 with v4.1 released as stable.

This major version release includes the following (API compatible) updates:


## Segment no longer automatically collects IDFA.

Previously, the Segment SDK collected the IDFA as the `context.device.advertisingId` value for each event if the user enabled ad-tracking. The Segment SDK no longer automatically collects the IDFA after version 4. (If your implementation requires the IDFA for compatibility with specific destinations, see the section below.)

Due to this major change, **you should upgrade to the latest stable version of `analytics-ios`**. ([v4.1](https://github.com/segmentio/analytics-ios/blob/master/CHANGELOG.md) at the time of this writing)


## You can manually pass the IDFA to the Segment SDK.


If you need to collect the user's IDFA to pass it to specific destinations, or for other uses, you can follow the steps for Ad Tracking and IDFA in the [iOS documentation](/docs/connections/sources/catalog/libraries/mobile/ios#ad-tracking-and-idfa) to collect and pass IDFA as a configuration item to the Segment SDK.

Remember, under iOS 14, applications can only collect the IDFA from a user if they consent to make it available. The Segment example code, used along with Apple's documentation, make it easy for developers to collect and pass the IDFA to the Segment SDK as a configuration item on app load.

{% comment %}
Investigate why above link doesn't work when relative.
{% endcomment %}

## All device-mode destination SDKs require an update.

Due to [major changes](https://github.com/segmentio/analytics-ios/blob/master/CHANGELOG.md) to core Segment SDKs for version 4, **all device-mode destination SDKs have been updated**. You should update all device-mode integrations and their bundled SDK packages accordingly.


## Segment's integrations have been updated to support Apple's iOS 14 changes.

Several integration partners made their own updates to support Apple's iOS 14 platform changes. Segment integrations for both device- and cloud-mode now have the most recent changes from affected integration partners:

1. [Amplitude](/docs/connections/destinations/catalog/amplitude/#troubleshooting)
2. [Braze](/docs/connections/destinations/catalog/braze/#additional-device-mode-set-up-for-ios-14-support)
3. [Adjust](/docs/connections/destinations/catalog/adjust/#additional-device-mode-set-up-for-ios-14-support)
4. [AppsFlyer](/docs/connections/destinations/catalog/appsflyer/#additional-device-mode-set-up-for-ios-14-support)
5. [Google Ads](/docs/connections/destinations/catalog/google-ads-classic/#additional-ios-cloud-mode-setup-for-ios-14)
6. [Facebook App Events](/docs/connections/destinations/catalog/facebook-app-events/#additional-ios-cloud-mode-set-up-for-ios-14)

Additional affected integration partners are in the process of making changes, and these will be included in future updates.

> info ""
> If you discover an integration affected by Apple's iOS 14 changes, but is not listed above or does not have updates, [contact customer support](https://segment.com/help/contact/).

## What's new with iOS 14.5?

On April 26, 2021, Apple released iOS 14.5 which includes the following updates that may impact your Segment implementation.

### App Tracking Transparency

With iOS 14.5, Apple is enforcing their [App Tracking Transparency privacy policy](https://developer.apple.com/app-store/user-privacy-and-data-use/). If you link user or device data collected from your application with user or device data collected from other companies' apps, websites, or offline properties for targeted advertising or measurement purposes, you will need to collect end-user permission through Apple's [AppTrackingTransparency framework](https://developer.apple.com/documentation/apptrackingtransparency).

As a first-party data pipeline, Segment helps you collect data directly from end-users that have a direct relationship with your products or services. This includes information on which products a customer views or purchases from you, how often they visit your website or mobile app, and even data that's stored in your CRM system. 

First-party data is distinct from third-party data, which is facilitated by data brokers. Apple defines a data broker as “In general, a data broker is a company that regularly collects and sells, licenses, or otherwise discloses to third parties the personal information of particular end-users with whom the business does not have a direct relationship.”

Using Segment in your mobile app does not require App Tracking Transparency (ATT). However, depending on the way you use Segment and the destinations you have configured, you may need to collect end-user permission through ATT. In particular, customers that rely on advertising, attribution, or rely on the IDFA as their primary user identifier will likely need to implement ATT. 

Please review Apple's documentation, Terms of Service, and your destinations' documentation to determine whether you need to use Apple's ATT framework in your application.


### Does Segment integrate with SKAdnetwork? 

[SKAdnetwork](https://developer.apple.com/documentation/storekit/skadnetwork) is a framework developers can use to attribute mobile app installs while maintaining user privacy.  The conversion data shared back to advertisers are received at a random interval 24-48 hours after the install occurs and contain no user or device context. 

Segment does not integrate with SKAdnetwork, but developers can integrate directly with SKAdnetwork alongside their Segment implementation. For more on how to use SKAdnetwork in your mobile app, see [Apple's documentation](https://developer.apple.com/documentation/storekit/skadnetwork). 

### Destination iOS 14.5 guides

Segment's partners have put together resources to help you navigate these changes. This list will update as more partners provide guidance:

- [Branch](https://help.branch.io/faq/docs/what-actions-do-branch-customers-need-to-take-before-the-ios-145-release)
- [Adjust](https://help.adjust.com/en/article/attribution-privacy-models)
- [Tune](https://www.tune.com/blog/what-ios-14-5-and-apples-latest-privacy-initiatives-mean-for-marketers/)
- [Kochava](https://www.kochava.com/ios-14-5-final-launch-checklist/)
