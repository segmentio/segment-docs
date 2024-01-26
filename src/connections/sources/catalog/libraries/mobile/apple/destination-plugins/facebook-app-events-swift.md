---
title: Analytics Swift Facebook App Events Plugin
strat: swift
---

## Getting Started



1. From the Segment web app, click **Catalog**.
2. Search for "Facebook App Events" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Facebook App ID which can be retrieved from your [Facebook Apps dashboard](https://developers.facebook.com/apps/).
4. Add the Plugin to your project. 

## Adding the dependency

> warning ""
> the Facebook App Events library itself will be installed as an additional dependency.

### through Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repository.

https://github.com/segment-integrations/analytics-swift-facebook-app-events{:target="_blank"}

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### through Package.swift

Open your Package.swift file and add the following do your the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-facebook-app-events.git",
            from: "1.1.3"
        ),
```


*Note the Facebook library itself will be installed as an additional dependency.*


## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentFacebook // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: FacebookAppEventsDestination())
```

Your events will now begin to flow to AppsFlyer in device mode.

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An example call would look like:

```swift
analytics.screen(title: "SomeScreen")
```

This integration also supports using Segment `screen` events as `track` events. For example, if you had a `screen` event named `Confirmation` you could map the invocation of this to a Facebook app event as you would with Segment `track` events.

To use this functionality you must opt into it using the integration setting named **Use Screen Events as Track Events**. Once enabled, you should start seeing `screen` events populate in Facebook App Events. The screen name you provide will be surrounded with the words **Viewed** and **Screen**. So, if you have a `screen` event with the name property set to `Welcome`, it will show up in Facebook as an event called **Viewed Welcome Screen**.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```swift
struct TrackProperties: Codable {
        let someValue: String
}

analytics.track(name: "My Event", properties: TrackProperties(someValue: "Hello"))
```

When you call `track` Segment sends that event and it's properties to Facebook. In the Facebook analytics interface you'll be able to use the event properties to segment your data.

Facebook App Events doesn't like events with periods in the name so if you send an event with periods in the name, Segment converts all periods to underscores. So if your event is `friend.added`, Segment sends that to Facebook as `friend_added`. Segment also truncates events that are longer than 40 characters long due to Facebook's API constraints.

### Facebook Parameters

Segment translates [spec-matching properties](/docs/connections/spec/track/#properties) `revenue` and `currency` to the appropriate Facebook parameters (`valueToSum` and `FBSDKAppEventParameterNameCurrency`), and also send events with revenue to Facebook's purchase logging method (`logPurchase`).

If you don't provide a `currency` explicitly, Segment sends `USD`. If any properties don't match the below, Segment passes them on as they were sent.

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

You will have to be sure that the [IDFA](/docs/connections/sources/catalog/libraries/mobile/ios/#idfa) is working within your app, which involves adding the [iAD framework](/docs/connections/sources/catalog/libraries/mobile/ios/#idfa).

Once you've added these, you will start to see the `context.device.advertisingId` populate and the `context.device.adTrackingEnabled` flag set to `true` unless the user has ad tracking limited or is using a mobile ad blocker.

> note ""
> While the network is deprecated, the relevant iOS [framework](https://developer.apple.com/reference/iad) is not.

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