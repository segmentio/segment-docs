---
title: Analytics Swift AppsFlyer Plugin
strat: swift
---

AppsFlyer is the world’s leading mobile attribution & marketing analytics platform, helping app marketers around the world make better decisions. The AppsFlyer destination code is open-source. You can browse the code on GitHub for iOS and Android.

Segment’s AppsFlyer destination plugin code is open source and available on GitHub. You can view it [here.](https://github.com/segment-integrations/analytics-swift-appsflyer)

## Getting Started

  1. From the Segment web app, click **Catalog**.
  2. Search for "AppsFlyer" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. In the destination settings, enter your `AppsFlyer Dev Key`, which can be retrieved from the App Settings section of your AppsFlyer account.
  4. After you build and release to the app store, Segment starts translating and sending your data to AppsFlyer automatically.

## Adding the Dependency

> warning ""
> the AppsFlyer library itself will be installed as an additional dependency.

### through Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repository.

https://github.com/segment-integrations/analytics-swift-appsflyer

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### through Package.swift

Open your Package.swift file and add the following do your the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-appsflyer.git",
            from: "1.1.3"
        ),
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentAppsFlyer // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: AppsFlyerDestination())
```

Your events will now begin to flow to AppsFlyer in device mode.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example iOS call would look like:

```swift
struct MyTraits: Codable {
        let favoriteColor: String
}

analytics.identify(userId: "a user's id", MyTraits(favoriteColor: "fuscia"))
```

When you call `.identify()`, Segment uses AppsFlyer's `setCustomerUserID` to send the `userId` that was passed in.

**Note:** `identify` calls are not supported using AppsFlyer's HTTP API at the moment. You can only send `.identify` calls if you have the AppsFlyer SDK bundled.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example iOS call would look like:

```swift
struct TrackProperties: Codable {
        let someValue: String
}

analytics.track(name: "My Event", properties: TrackProperties(someValue: "Hello"))
```

When you call `track`, Segment translates it automatically and sends the event to AppsFlyer.

Segment includes all the event properties as callback parameters on the AppsFlyer event, and translates `properties.revenue` to the appropriate AppsFlyer purchase event properties based on the spec-matching properties.

Finally, Segment uses AppsFlyer's `transactionId` deduplication when you send an `orderId` (see the [e-commerce spec](/docs/connections/spec/ecommerce/v2/)).

## Install Attributed

Segment will automatically trigger an `Install Attributed` event if you have **trackAttributionData** enabled in your settings, and the Segment-AppsFlyer integration installed in your app. The event payload will adhere to the `Install Attributed` event specification documented [here](/docs/connections/spec/mobile/#install-attributed) and will propagate to your other downstream destinations.

### Revenue Tracking

The destination automatically recognizes spec-matching `revenue` property and translates them to AppsFlyer's revenue tracking method.

### Transaction De-duplication

The destination automatically recognizes the spec-matching `orderId` property, and sends it as the Transaction ID to AppsFlyer for revenue de-duplication.

### In-App Purchase Receipts

The destination does not currently support in-app purchase receipts. If this is important to you, email support@appsflyer.com.

### Deeplinking

The destination does not automatically support out-of-the-box deeplinking (you need to write code here regardless!).

Therefore, you can use AppsFlyer's OneLink integration which is a single, smart, tracking link that can be used to track on both Android and iOS. OneLink tracking links can launch your app when it is already installed instead of redirecting the user to the app store.

For more details, review the [AppsFlyer OneLink set up Guide](https://support.appsflyer.com/hc/en-us/articles/207032246-OneLink-Setup-Guide). More information is available in the AppsFlyer SDK Integration Guides ([iOS](https://support.appsflyer.com/hc/en-us/articles/207032066-AppsFlyer-SDK-Integration-iOS), [Android](https://support.appsflyer.com/hc/en-us/articles/207032126-AppsFlyer-SDK-Integration-Android)) and Segment's mobile FAQs ([iOS](/docs/connections/sources/catalog/libraries/mobile/ios/#faq), [Android](/docs/connections/sources/catalog/libraries/mobile/android/#faq)).
