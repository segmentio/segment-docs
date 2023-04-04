---
title: Analytics Kotlin Flurry Plugin
strat: kotlin-android
---

[Flurry](https://developer.yahoo.com/flurry/docs/) provides you with the tools and resources you need to gain a deep level of understanding about your users' behavior in your apps.

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Flurry" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Flurry "API Key" in Segment's Settings UI. You can retrieve this from your **Flurry Admin > Apps > API Key**. It should look like "4KKKGS3BAK4WW8WJ93DN".
4. Follow the instructions in the GitHub repos: [iOS SDK](https://github.com/segment-integrations/analytics-ios-integration-flurry) and [Android SDK](https://github.com/segment-integrations/analytics-android-integration-flurry).
5. Once the Segment library is integrated with your app, toggle Flurry on in your Segment UI.

_Note: Flurry does not always display data in real time. We've seen that it can take anywhere from a few hours to a few days for certain types of data to sync with Flurry._


## Adding the dependency
To install the Segment-Flurry integration, simply add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:flurry:<latest_version>'
```
Or the following for Kotlin DSL

```
implementation("com.segment.analytics.kotlin.destinations:flurry:<latest_version>")
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library. Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.flurry.FlurryDestination
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
    this.flushAt = 3
    this.trackApplicationLifecycleEvents = true
}
analytics.add(plugin = FlurryDestination())
```


Your events will now begin to flow to Flurry in device mode.

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does.

An example Screen call would look like:

```java
analytics.screen("ScreenName", buildJsonObject {
    put("productSlug", "example-product-123")
});
```


_Note: When you toggle the Screen Tracks As Events option on in your Flurry Segment UI - we will treat `screen` calls as events when sending them to Flurry._


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does.

An example Identify call would look like:

```java
analytics.identify("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```

When you call [`identify`](/docs/connections/spec/identify/), we'll set the user ID in Flurry, and set any special Flurry `traits` you provide, such as `gender`, or `age`.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does.

An example Track call would look like:

```java
analytics.track("View Product", buildJsonObject {
    put("productId", 123)
    put("productName" "Striped trousers")
});
```
