---
title: iOS 17 & Privacy Manifests 
strat: swift
tags:
  - apple
  - swift
  - ios
---

> info ""
> iOS 17 and Xcode 15 are in beta. The information on this page is subject to change as these features become generally available. 
>

Apple has begun to roll out new privacy features that will eventually become mandatory in iOS 17. For instance, you may have already seen or worked with [Privacy Nutrition Labels](https://www.apple.com/privacy/labels/){:target="_blank"}. Privacy Nutrition Labels make it possible for users to better understand what information your app collects. Privacy Nutrition Labels is currently an optional feature, but Apple expects to make it [mandatory in the Spring of 2024](https://developer.apple.com/news/?id=z6fu1dcu#:~:text=And%20starting%20in%20spring%202024,your%20app%20uses%20the%20API.){:target="_blank"}. 

## Privacy manifests 

While developers are ultimately responsible for creating Privacy Nutrition Labels, it can be difficult to know exactly what their third-party SDKs track. To make this easier, Apple is introducting Privacy Manifests in iOS 17. Over the next few months, you can expect all of your app's third-party SDKs to include a Privacy Manifest. 

## Required Reason API

To limit fingerprinting, Apple plans to have developers [dclare the reason for using specific APIs](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#overview){:target="_blank"}. The Analytics-Swift library only uses the [`userDefaults`](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401){:target="_blank"} API to store user and context information. It is declared in the Privacy Manifest found in Analytics Swift. 

## Tracking domains 

Apple also introduces the concept of [NSPrivacyTrackingDomains](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files#4284009){:target="_blank"} to Privacy Manifests in iOS 17. This is an array of strings that lists the URLs the app connects to in order to aid in tracking. If the user hasn't granted tracking permission through the App Tracking Transparency framework, network requests to these domains fail and your app receives an error. The Analytics-Swift Privacy Manifest includes the endpoint Segment events are sent to. 

> info ""
> If you set NSPrivacyTracking to `true`, then you need to provide at least one internet domain in NSPrivacyTrackingDomains; otherwise, you can provide zero or more domains.


## Analytics-Swift Privacy Manifest 

The Segment [Privacy Manifest for Analytics-Swift here]() includes an array of [Privacy Nutrition Label Types](https://developer.apple.com/app-store/app-privacy-details/#data-type){:target="_blank"} for the following automatically collected fields: 

| Data               | Linked To User | Used For Tracking | Reason for Collection |
| -------------------| ---------------| ------------------| ---------------------- |
| `Advertising Data` | No             | No                | Developer's Advertising or Marketing |
| `Precise Location` | Yes            | No                | Developer's Advertising or Marketing |
| `App Version`      | No             | No                | Developer's Advertising or Marketing |
| `App Name`         | No             | No                | Developer's Advertising or Marketing |
| `Device ID`        | Yes            | No                | Developer's Advertising or Marketing |


## Additional privacy manifests
- [Analytics-Swift Engage Plugin]()
- [Analytics-iOS (Classic)]()


## Generating your privacy report

Follow the steps in Apple's [data use in privacy manifests documentation](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests){:target="_blank"} to generate your privacy report. Privacy manifests make it easier to account for the data collected by third-party SDKs but should not be considered as a comprehensive list for your privacy report. Your privacy report is also subject to your Segment tracking implementation. If you're not certain about all of the data you're collecting, [Protocols](/docs/protocols/) and a [Tracking Plan](/docs/protocols/tracking-plan/create/) can help you account for everything being tracked in your app.

> success ""
> Privacy manifests are not necessary for Device Mode Plugins, as Analytics-Swift doesn't collect any additional information or make any network requests to Segment endpoints in Destination Plugins. 



