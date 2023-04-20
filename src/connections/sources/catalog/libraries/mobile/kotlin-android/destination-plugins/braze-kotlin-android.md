---
title: Analytics Kotlin Braze Plugin
strat: kotlin-android
---

[Braze](https://www.braze.com/), formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.

Braze’s destination plugin code is open source and available on GitHub. You can view it [here.](https://github.com/braze-inc/braze-segment-kotlin). This destination plugin is maintained by Braze. For any issues with the destination plugin code, please reach out to Braze's support.

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Braze" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the Destination Settings, add the **API Key**, found in the Braze Dashboard in *App Settings > Manage App Group*.
4. Set up a new App Group REST API Key in the Braze Dashboard in *App Settings > Developer Console > API Settings*. For more information, see [Creating and Managing REST API Keys](https://www.braze.com/docs/api/basics/#creating-and-managing-rest-api-keys) in the Braze documentation. 
  - Select the `users.track` endpoint in the **User Data** section.

> warning ""
> The Braze (Classic) destination is in maintenance mode except for mobile device mode implementations.

## Adding the Dependency

To install the Segment-Braze integration, simply add this line to your app's build.gradle file, replacing `<latest_version>` with the latest version number.

```
implementation 'com.braze:braze-segment-kotlin:<latest_version>'
```

Or the following for Kotlin DSL

```
implementation('com.braze:braze-segment-kotlin:<latest_version>')
```

Also add the following lines to the build.gradle file

```
repositories {
  maven { url "https://appboy.github.io/appboy-android-sdk/sdk" }
}
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library which will usually be `MainApplication.kt` Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.braze.BrazeDestination
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```java
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.collectDeviceId = true
        this.trackApplicationLifecycleEvents = true
        this.trackDeepLinks = true
        this.flushAt = 3
        this.flushInterval = 0
    }
    analytics.add(plugin = BrazeDestination(applicationContext))
```

Your events will now begin to flow to Braze in device mode.

# Identify

> info "Tip"
> Add Segment's open-source [Middleware](https://github.com/segmentio/segment-braze-mobile-middleware) tool to optimize your integration. This tool limits [Data Point](https://www.braze.com/docs/user_guide/onboarding_with_braze/data_points/) use by debouncing duplicate identify() calls from Segment. For more information, see the project's [README](https://github.com/segmentio/segment-braze-mobile-middleware/blob/master/README.md#how-does-this-work).

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```java
analytics.identify("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```

When you Identify a user, Segment passes that user's information to Braze with `userId` as Braze's External User ID.

If you're using a device-mode connection, Braze's SDK assigns a `device_id` and a backend identifier, `braze_id`, to every user. This allows Braze to capture anonymous activity from the device by matching on those identifiers instead of `userId`. This applies to _device-mode connections_.


## Track

> info "Tip"
> To lower [Data Point](https://www.braze.com/docs/user_guide/onboarding_with_braze/data_points/) use, limit the events you send to Braze to those that are relevant for campaigns and segmentation to the Braze destination. For more information, see [Schema Controls](/docs/protocols/schema/).

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call looks like:

```java
analytics.track("View Product", buildJsonObject {
    put("productId", 123)
    put("productName" "Striped trousers")
});
```
When you `track` an event, Segment sends that event to Braze as a custom event.

> note ""
> Braze requires that you include a `userId` or `braze_id` for all calls made in cloud-mode. Segment sends a `braze_id` if `userId` is missing. When you use a device-mode connection, Braze automatically tracks anonymous activity using the `braze_id` if a `userId` is missing.

### Order Completed

When you `track` an event with the name `Order Completed` using the [e-commerce tracking API](/docs/connections/spec/ecommerce/v2/), Segment sends the products you've listed to Braze as purchases.

### Purchases

When you pass [ecommerce events](/docs/connections/spec/ecommerce/v2/), the name of the event becomes the `productId` in Braze. An example of a purchase event looks like:

```java
analytics.track("Purchased Item", buildJsonObject {
    put("revenue", "50")
    put("currency", "USD")
});
```

The example above would have "Purchased Item" as its `productId` and includes two required properties that you must pass in:

- `revenue`
- `currency`

Braze supports currency codes as specified in [their Purchase Object Specification](https://www.braze.com/docs/api/objects_filters/purchase_object/). Be aware that any currency reported other than USD displays in [the Braze UI in USD based on the exchange rate on the date it was reported](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/analytics/logging_purchases/#logging-purchases).

You can add more product details in the form of key-value pairs to the `properties` object. The following reserved keys are not passed to Braze if included in your Track call's `properties` object:

- `time`
- `product_id`
- `quantity`
- `event_name`
- `price`
