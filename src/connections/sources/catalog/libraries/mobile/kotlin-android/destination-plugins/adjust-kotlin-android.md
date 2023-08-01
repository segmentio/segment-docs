---
title: Analytics Kotlin Adjust Plugin
strat: kotlin-android
---
[Adjust](https://adjust.com){:target="_blank"} is the mobile attribution provider of choice for hundreds of organizations across the globe. They unify all your marketing activities into one powerful platform, giving you the insights you need to scale your business. The Adjust Destination is open-source. You can browse the code on GitHub [here](https://github.com/segmentio/analytics-kotlin).


## Getting started



1. From the Segment web app, click **Catalog**.
2. Search for "Adjust" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. You don't need to include Adjust's SDK natively, as this prevent you from successfully implementing Adjust.
4. Depending on the source you've selected, include Adjust's library by adding the following lines to your dependency configuration.

## Adding the dependency
To install the Segment-Adjust integration, simply add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:adjust:<latest_version>'
```

Or the following for Kotlin DSL

```
implementation('com.segment.analytics.kotlin.destinations:adjust:<latest_version>')
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library.  Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.adjust.AdjustDestination
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = AdjustDestination())
```

Your events will now begin to flow to Adjust in device mode.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```java
analytics.identify("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```

When you call `identify`, Segment will call Adjust's [addSessionPartnerParameter](https://github.com/adjust/ios_sdk#session-partner-parameters){:target="_blank"} method and set the `userId` and/or `anonymousId`. This will set these values within Adjust, and allow Adjust to send back attribution data from their servers.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```java
analytics.track("View Product", buildJsonObject {
    put("productId", 123)
    put("productName" "Striped trousers")
});
```


When you call `track` Segment maps the event to your pre-defined Adjust custom event. You **must** map your `track` events to your custom Adjust Event Token in your Adjust destination settings.

If you don't provide a mapping, Adjust cannot accept the event. Segment includes all the event `properties` as callback parameters on the Adjust event, and automatically translate `revenue` and `currency` to the appropriate Adjust event properties based on Segment's [spec'd properties](/docs/connections/spec/track/#properties).


## Install Attributed

### Client

Segment will trigger an `Install Attributed` event if you have **trackAttributionData** enabled in your settings and the Segment-Adjust integration installed in your app.

Using Adjust's [Attribution callback](https://github.com/adjust/ios_sdk#attribution-callback){:target="_blank"}, Segment listens for an attribution change from Adjust's SDK and triggers the call with the following Adjust attribution parameters:

| Key                 | Value                    | Description                                        |
| ------------------- | ------------------------ | -------------------------------------------------- |
| provider            | Adjust                   | hardcoded by Segment                               |
| trackerToken        | attribution.trackerToken | the tracker token of the current install           |
| trackerName         | attribution.trackerName  | the tracker name of the current install            |
| campaign.source     | attribution.network      | the network grouping level of the current install  |
| campaign.name       | attribution.campaign     | the campaign grouping level of the current install |
| campaign.content    | attribution.clickLabel   | the click label of the current install             |
| campaign.adCreative | attribution.creative     | the creative grouping level of the current install |
| campaign.adGroup    | attribution.adgroup      | the ad group grouping level of the current install |

If any value is unavailable, it will default to nil.  This call will be sent to all enabled [device and cloud mode](/docs/connections/destinations/#connection-modes) destinations.

## Additional features

### Environments

By default, Segment's destination sends data to the Adjust Sandbox Environment. When you release your app to the App Store, enable the `Production` option in the Adjust destination settings on Segment (or use two separate sources, one for dev and one for prod, with different environment settings for Adjust).

### Callback parameters

The destination sends all event `properties` as callback parameters to Adjust. To set [Partner Parameters](https://github.com/adjust/ios_sdk#partner-parameters){:target="_blank"}, you can [access the Adjust SDK directly](https://docs.adjust.com/en/special-partners/segment/){:target="_blank"}.

### Transaction deduplication

The destination will automatically recognize the spec'd `orderId` property, and send it as the transaction ID to Adjust for revenue de-duplication.

### In-app purchase receipts

The destination does not currently support in-app purchase receipts. If this is important to you, [reach out to support](https://segment.com/help/contact/).

### Push notifications

The destination automatically forwards push notification tokens through to Adjust.

### Event buffering

By default, our destination enables event buffering for Adjust. This saves your customers' battery life. However, you can disable this in the options on the Adjust destination settings on Segment.