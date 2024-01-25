---
title: Analytics Kotlin Facebook App Events Plugin
strat: kotlin-android
---

## Getting Started



1. From the Segment web app, click **Catalog**.
2. Search for "Facebook App Events" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Facebook App ID which can be retrieved from your [Facebook Apps dashboard](https://developers.facebook.com/apps/).
4. Add the Plugin to your project. 

## Adding the dependency

> warning ""
> the Facebook App Events library itself will be installed as an additional dependency.

To install the Segment-Facebook App Events integration, simply add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:facebookappevents:<latest_version>'
```

Or the following for Kotlin DSL

```
implementation('com.segment.analytics.kotlin.destinations:facebookappevents:<latest_version>')
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library.  Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.facebookappevents
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = FacebookAppEvents()
```

Your events will now begin to flow to Facebook in device mode.

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An example call would look like:

```java
analytics.screen("ScreenName", buildJsonObject {
    put("productSlug", "example-product-123")
});
```

This integration also supports using Segment `screen` events as `track` events. For example, if you had a `screen` event named `Confirmation` you could map the invocation of this to a Facebook app event as you would with Segment `track` events.

To use this functionality you must opt into it using the integration setting named **Use Screen Events as Track Events**. Once enabled, you should start seeing `screen` events populate in Facebook App Events. The screen name you provide will be wrapped with the words **Viewed** and **Screen**. So, if you have a `screen` event with the name property set to `Welcome`, it will show up in Facebook as an event called **Viewed Welcome Screen**.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```java
analytics.track("View Product", buildJsonObject {
    put("productId", 123)
    put("productName" "Striped trousers")
});
```

When you call `track` Segment sends that event and it's properties to Facebook. In the Facebook analytics interface you'll be able to use the event properties to segment your data.

Segment truncates events that are longer than 40 characters long due to Facebook's API constraints.

### Facebook Parameters

Segment translates the [spec-matching properties](/docs/connections/spec/track/#properties) `revenue` and `currency` to the appropriate Facebook parameters (`valueToSum` and `FBSDKAppEventParameterNameCurrency`), and also send events with revenue to Facebook's purchase logging method (`logPurchase`).

If you don't provide a `currency` explicitly, Segment sends `USD`. If any properties don't match the below, Segment passes them as they were sent.

<table>
  <tr>
    <td>**Revenue**</td>
    <td>_valueToSum</td>
  </tr>
  <tr>
    <td>**Currency**</td>
    <td>`fb_currency`</td>
  </tr>
</table>

## Limited Data Use

{% include content/facebook-ldu-intro.md %}

> info ""
> The **Use Limited Data Use** destination setting is disabled by default for all Facebook destinations except for Facebook Pixel. This must be enabled manually from the destination settings if you're using other Facebook destinations.

{% include content/facebook-ldu-params.md %}

Facebook uses the `context.ip` to determine the geolocation of the event.

You can manually change the Data Processing parameters by adding settings to the `integrations` object.

## Troubleshooting

### Not seeing events?

Facebook requires that payloads include the following:
- `context.device.id`
- `context.device.type`
- `context.os.version`

> info ""
> The value of `context.device.type` must be either `ios` or `android`.

For example:

```json
{
  "anonymousId": "507f191e810c19729de860ea",
  "event": "Event Name",
​  "context": {
    "device": {
      "id": "B5372DB0-C21E-11E4-8DFC-AA07A5B093DB",
      "type": "ios"
    },
    "os": {
      "version": "8.1.3"
    }
  },​
  "messageId": "bbac-11e4-8dfc-aa07a53436b09b45567i8245237824",
  "type": "track",
  "userId": "97980cfea0067"
}
```

### Missing custom events

Facebook will only accept custom events with alphanumeric names (you can include spaces, "-" and "\_") that are between 2 and 40 characters in length. Otherwise, Facebook will reject the event payload with a 400 status.