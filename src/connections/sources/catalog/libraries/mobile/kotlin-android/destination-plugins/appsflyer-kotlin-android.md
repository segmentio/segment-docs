---
title: Analytics Kotlin AppsFlyer Plugin
strat: kotlin-android
---

AppsFlyer is a mobile attribution and marketing analytics platform that helps app marketers around the world make better decisions. The AppsFlyer destination code is open source and [available on GitHub for iOS and Android](https://github.com/segment-integrations/analytics-kotlin-appsflyer){:target="_blank"}.

## Getting Started

  1. From the Segment web app, click **Catalog**.
  2. Search for "AppsFlyer" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. In the destination settings, enter your `AppsFlyer Dev Key`, which can be retrieved from the App Settings section of your AppsFlyer account.
  4. After you build and release to the app store, Segment starts translating and sending your data to AppsFlyer automatically.

## Adding the Dependency

> warning ""
> the AppsFlyer library itself will be installed as an additional dependency.

To install the Segment-Appsflyer integration, simply add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:appsflyer:<latest_version>'
```

Or the following for Kotlin DSL

```
implementation('com.segment.analytics.kotlin.destinations:appsflyer:<latest_version>')
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library.  Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.appsflyer.AppsflyerDestination
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = AppsflyerDestination(applicationContext))
```

Your events will now begin to flow to Appsflyer in device mode.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example Kotlin call would look like:

```java
analytics.identify("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```

When you call `.identify()`, Segment uses AppsFlyer's `setCustomerUserID` to send the `userId` that was passed in.

**Note:** `identify` calls are not supported using AppsFlyer's HTTP API at the moment. You can only send `.identify` calls if you have the AppsFlyer SDK bundled.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example Kotlin call would look like:

```kotlin
analytics.track("View Product", buildJsonObject {
    put("productId", 123)
    put("productName" "Striped trousers")
});
```

When you call `track`, Segment translates it automatically and sends the event to AppsFlyer.

Segment includes all the event properties as callback parameters on the AppsFlyer event, and automatically translate `properties.revenue` to the appropriate AppsFlyer purchase event properties based on the spec-matching properties.

## Install Attributed

Segment will automatically trigger an `Install Attributed` event if you have **trackAttributionData** enabled in your settings, and the Segment-AppsFlyer integration installed in your app. The event payload will adhere to the `Install Attributed` event specification documented [here](/docs/connections/spec/mobile/#install-attributed) and will propagate to your other downstream destinations.

This logic depends on the Appsflyer `AppsFlyerConversionListener` [interface](https://dev.appsflyer.com/hc/docs/android-sdk-reference-appsflyerconversionlistener){:target="_blank"}, and will only send when Appsflyer detects an install.

### Revenue Tracking

The destination automatically recognizes spec-matching `revenue` property and translates them to AppsFlyer's revenue tracking method.

### In-App Purchase Receipts

The destination does not currently support in-app purchase receipts. If this is important to you, email support@appsflyer.com.

### Deeplinking

The destination does not automatically support out-of-the-box deeplinking (you need to write code here regardless!).

Therefore, you can use AppsFlyer's OneLink integration which is a single, smart, tracking link that can be used to track on both Android and iOS. OneLink tracking links can launch your app when it is already installed instead of redirecting the user to the app store.

For more details, review the [AppsFlyer OneLink set up Guide](https://support.appsflyer.com/hc/en-us/articles/207032246-OneLink-Setup-Guide){:target="_blank"}. More information is available in the AppsFlyer SDK Integration Guides ( [Android](https://support.appsflyer.com/hc/en-us/articles/207032126-AppsFlyer-SDK-Integration-Android){:target="_blank"}) and Segment's mobile FAQs ([iOS](/docs/connections/sources/catalog/libraries/mobile/ios/#faq), [Android](/docs/connections/sources/catalog/libraries/mobile/android/#faq)).
