---
title: iOS 17 & Privacy Manifests 
strat: swift
tags:
  - apple
  - swift
  - ios
---

> info ""
> iOS 17 and Xcode 15 are still in beta. The information below is subject to change as these > features become generally available. 
>

Apple has already begun to roll out new privacy features that will eventually become mandatory in iOS 17. For instance, you may have already seen or worked with [Privacy Nutrition Labels](https://www.apple.com/privacy/labels/). Privacy Nutrition Labels make it possible for users to better understand what information is being collected in your app. It is currently an optional feature but Apple expects to make this [mandatory in the Spring of 2024](https://developer.apple.com/news/?id=z6fu1dcu#:~:text=And%20starting%20in%20spring%202024,your%20app%20uses%20the%20API.). 

## Privacy Manifests 

While developers are ultimately responsible creating a Privacy Nutrition Label, it can be difficult to know exactly what all of their third-party SDKs are tracking. To make this easier, Apple is introducting Privacy Manifests in iOS 17. Over the next few months, you can expect all of the third-party SDKs in your app to include a Privacy Manifest. 

## Required Reason API

In an effort to limit fingerprinting, Apple is also making plans to have developers [delcare the reason for using specific APIs](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#overview). The Analytics-Swift library only uses the [`userDefaults`](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401) API to store user and context information. It is declared in the Privacy Manifest found in Analytics Swift. 

## Tracking Domains 

Apple is also introducing the concept of [NSPrivacyTrackingDomains](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files#4284009) to Privacy Manifests in iOS 17. This is an array of strings that lists the URLs the app connects to in order to aid in tracking. If the user has not granted tracking permission through the App Tracking Transparency framework, network requests to these domains fail and your app receives an error. The Analytics-Swift Privacy Manifest includes the endpoint Segment events are sent to. 

> info ""
> If you set NSPrivacyTracking to true then you need to provide at least one internet domain in NSPrivacyTrackingDomains; otherwise, you can provide zero or more domains.


## Analytics-Swift Privacy Manifest 

You can find the [Privacy Manifest for Analytics-Swift here](). The Segment Privacy Manifest includes an array of [Privacy Nutrition Label Types](https://developer.apple.com/app-store/app-privacy-details/#data-type) for the following automatically collected fields: 

| Data               | Linked To User | Used For Tracking | Reason for Collection |
| -------------------| ---------------| ------------------| ---------------------- |
| `Advertising Data` | No             | No                | Developer's Advertising or Marketing |
| `Precise Location` | Yes            | No                | Developer's Advertising or Marketing |
| `App Version`      | No             | No                | Developer's Advertising or Marketing |
| `App Name`         | No             | No                | Developer's Advertising or Marketing |
| `Device ID`        | Yes            | No                | Developer's Advertising or Marketing |


## Additional Privacy Manifests
- [Analytics-Swift Engage Plugin]()
- [Analytics-iOS (Classic)]()


## Generating Your Privacy Report

Follow [the steps outlined here](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests) by Apple to generate your Privacy Report. Privacy Manifests make it easier to account for the data collected by third-party SDKs, but should not be considered a comprehensive list for your Privacy Report. Your Privacy Report is also subject to your Segment tracking implementation. If you're not certain about all of the data you're collecting, [Protocols](https://segment.com/docs/protocols/) and a [Tracking Plan](https://segment.com/docs/protocols/tracking-plan/create/) can make it easy to account for everything being tracked in your app.

> success ""
> Privacy Manifests are not necessary for Device Mode Plugins as Analytics-Swift does not collect any additional information or make >any network requests to Segment endpoints in Destination Plugins. 



