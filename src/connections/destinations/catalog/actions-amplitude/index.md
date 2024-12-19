---
title: Amplitude (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 5f7dd6d21ad74f3842b1fc47
versions:
  - name: "Amplitude (Classic)"
    link: '/docs/connections/destinations/catalog/amplitude'
redirect_from:
  - '/connections/destinations/catalog/vendor-amplitude/'
---
{% include content/plan-grid.md name="actions" %}


[Amplitude](https://amplitude.com/){:target="_blank"} is an event tracking and segmentation platform for your web and mobile apps. By analyzing the actions your users
perform, you can gain a better understanding to drive retention, engagement, and conversion.


## Benefits of Amplitude (Actions) vs Amplitude Classic

Amplitude (Actions) provides the following benefits over the classic Amplitude destination:
- **Fewer settings**. Data mapping for actions-based destinations happens in during configuration, which eliminates the need for most settings.
- **Clearer mapping of data**. Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to the destination.
- **Support for Amplitude's HTTP API v2**. Amplitude (Actions) is built on the latest version of [Amplitude's HTTP API](https://developers.amplitude.com/docs/http-api-v2){:target="_blank"}.
- **Revenue is a top-level property**. Amplitude (Actions) elevates `revenue` to a top-level property in requests sent to Amplitude. This enables inclusion of this data in Amplitude features like customer LTV reports.
- **Tracking in cloud-mode**. Amplitude (Actions) supports sending  details from cloud-mode sources.

## Getting started

1. Before you start, go to your [Amplitude workspace](https://analytics.amplitude.com){:target="_blank"}. Click **Settings** in the top right and then click **Organization Settings** to navigate to your **Projects** in the menu. Select your **Project**. Copy the Amplitude API Key and Secret Key for the project.
2. From the Segment web app, click **Catalog**, then click **Destinations**.
3. Find the Destinations Actions item in the left navigation, and click it.
4. Click the "Amplitude" item to select it and click **Configure**.
5. Choose which of your sources to connect the destination to. (You can connect more sources to the destination later.)

Once you have a mapping, you can follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings).

### Log Purchases in existing destination instances

Initially, the Log Event Action was reporting purchases to Amplitude for all events containing a `products` array, even if the products were just added to cart. This inflated the LTV Chart in Amplitude.

To resolve this, purchase reporting takes place in a new Action called Log Purchase.

For instances created prior to before the Log Purchases action was released, you need to manually add the Log Purchases Action to report purchases to Amplitude.

To manually add the Log Purchases Action:
1. Add a new Mapping for the Log Purchases Action. The default trigger for this action is Order Completed events.
2. Modify the Trigger if you need to report purchases for any other events.
3. Modify the Trigger of Log Event to exclude these same events. This helps you to avoid sending the same event twice.
4. Enable the Log Purchases mapping.

### Connection Modes for Amplitude (Actions) destination

The Amplitude (Actions) destination does not offer a device-mode connection mode. Previous deployments of the Amplitude Segment destination required the device-mode connection to use the `session_id` tracking feature. However, the Amplitude (Actions) destination now includes session ID tracking by default when you use Segment's ([Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/) library.

### Track sessions

Session tracking is available with Segment's new libraries: [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/), [Swift](/docs/connections/sources/catalog/libraries/mobile/apple/) or [Kotlin](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/). 

When connected to the Analytics.js 2.0 source, Segment automatically loads a plugin on your website for session tracking and enrichment as an alternative to the Amplitude SDK. This means you don't need to bundle any software or write any code to run on the user's device, and can use more of the Segment platform features for data going to Amplitude, like [Protocols filtering and transformations](/docs/protocols/) and [Unify Identity Resolution](/docs/unify/identity-resolution/).

If you're using one of Segment's [Swift](/docs/connections/sources/catalog/libraries/mobile/apple/), [Kotlin](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/), or [React Native](/docs/connections/sources/catalog/libraries/mobile/react-native/) libraries, you will need to include the Amplitude destination plugin to enable session tracking. 

You can read more about Amplitude's [tracking sessions](https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions){:target="_blank”} feature in Amplitude's documentation. 

### Device ID Mappings
The Amplitude destination requires that each event include either a Device ID or a User ID. If a User ID isn't present, Amplitude uses a Device ID, and vice versa, if a Device ID isn't present, Amplitude uses the User ID.

By default, Segment maps the Segment property `context.device.id` to the Amplitude property `Device ID`. If `context.device.id` isn't available, Segment maps the property `anonymousId` to the Amplitude `Device ID`. The Actions interface indicates this with the following contents of the Device ID field: `coalesce(` `context.device.id` `anonymousId` `)`.

### Enable session tracking for Analytics.js 2.0

JavaScript sources automatically enable session tracking.

The session ID Segment passes to Amplitude stores locally in a key-value pair. View the value associated with the `analytics_session_id`key to access the session ID. The session ID is set to timeout every 30 minutes by default. 

### Enable Amplitude session tracking for Swift

To enable session tracking in Amplitude when using the [Segment Swift library](https://github.com/segmentio/analytics-swift){:target="_blank”}:
1. Enable `trackApplicationLifecycleEvents` in your configuration.
2. Add the [Amplitude Session plugin](https://github.com/segment-integrations/analytics-swift-amplitude/blob/main/Sources/SegmentAmplitude/AmplitudeSession.swift){:target="_blank”} to your project.
3. Initialize the plugin ([example](https://github.com/segmentio/analytics-swift/blob/main/Examples/apps/DestinationsExample/DestinationsExample/AppDelegate.swift){:target="_blank”})
   ```swift
   analytics?.add(plugin: AmplitudeSession(name: "Amplitude"))
   ```

### Enable Amplitude session tracking for Kotlin

To enable session tracking in Amplitude when using the [Segment Kotlin library](https://github.com/segmentio/analytics-kotlin){:target="_blank”}:
1. Enable `trackApplicationLifecycleEvents` in your configuration.
2. Add the [Amplitude Session plugin](https://github.com/segment-integrations/analytics-kotlin-amplitude/blob/main/lib/src/main/java/com/segment/analytics/kotlin/destinations/amplitude/AmplitudeSession.kt){:target="_blank”} to your project.
2. Initialize the plugin
   ```kotlin
   analytics.add(AmplitudeSession())
   ```

### Enable Amplitude session tracking for iOS

To enable session tracking in Amplitude when using the [Segment iOS library](https://github.com/segmentio/analytics-ios){:target="_blank”}:
1. Add the [Amplitude Session middleware](https://github.com/segment-integrations/analytics-ios-integration-amplitude/blob/amplitude-session/Pod/Classes/SEGAmplitudeSession.m){:target="_blank”} to your project.
2. Add the middleware & enable `trackApplicationLifecycleEvents` in your configuration:
   ```objective-c
   	NSString *const SEGMENT_WRITE_KEY = @" ... ";
   	SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:SEGMENT_WRITE_KEY];
   	configuration.trackApplicationLifecycleEvents = true
   	configuration.sourceMiddleware = @[[[SEGAmplitudeSession alloc] init]];
   	[SEGAnalytics setupWithConfiguration:configuration];
   ```

### Enable Amplitude session tracking for Android

To enable session tracking in Amplitude when using the [Segment Android library](https://github.com/segmentio/analytics-android){:target="_blank”}:
1. Add the [Amplitude Session middleware](https://github.com/segment-integrations/analytics-android-integration-amplitude/blob/master/src/main/java/com/segment/analytics/android/integrations/amplitude/AmplitudeSessionId.java){:target="_blank”} to your project.
	```gradle
	implementation 'com.segment.analytics.android.integrations:amplitude:3.1.0'
	```
3. Add the middleware & enable `trackApplicationLifecycleEvents` in your configuration:
   ```java
   	String SEGMENT_WRITE_KEY = " ... ";
   	analytics = new Analytics.Builder(this, SEGMENT_WRITE_KEY)
				.trackApplicationLifecycleEvents()
				.useSourceMiddleware(new AmplitudeSessionId())
				.build();
   ```

## Important differences from the classic Amplitude destination

The classic Amplitude destination captures the following user fields in device-mode (when it runs on the user's device):

- Device Type (for example, Mac, PC, mobile device)
- Platform (for example iOS or Android)

Amplitude (Actions) runs in cloud-mode, and does not capture these fields.
{% capture log-event-details %}
#### Track Revenue Per Product

> info ""
> If you use Track Revenue Per Product, add a `revenue` property inside the `products` array of the Order Completed event.

Amplitude has two different ways to track revenue associated with a multi-product purchase. You can choose which method you want to use using the **Track Revenue Per Product** destination setting.

If you disable the setting ("off"), Segment sends a single revenue event with the total amount purchased and adds revenue data the Amplitude "Order Completed" event. The "Product Purchased" events do not contain any native Amplitude revenue data.

If you enable the setting ("on"), Segment sends a single revenue event for each purchased product and adds Revenue data to each "Product Purchased" event. The "Order Completed" event does not contain any native Amplitude revenue data.

Make sure you format your events using the [Track method spec](/docs/connections/spec/track/). You must pass a `revenue` property, a `price` property, and a `quantity` property for each product in the products list.

#### Log Revenue v2

Segment's iOS and Android sources can send revenue using Amplitude's preferred `logRevenueV2` method. Segment sets Amplitude's special revenue properties, such as `revenueType` and `productIdentifier`, which Amplitude's Revenue Analysis uses for Revenue Analysis and Revenue LTV charts. Segment uses the Amplitude `eventProperties` field to send any properties _not_ mapped to Amplitude's special properties.

| Amplitude Property | Segment Property                                             | Description                                                                |
| ------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `productId`        | `productId`                                                  | An identifier for the product.                                             |
| `quantity`         | `quantity`                                                   | The quantity of products purchased. Note: revenue = `quantity` * `price`.  |
| `price`            | `price` or `revenue` (or `total` for mobile, see note below) | The price of the products purchased, and this can be negative.             |
| `revenueType`      | `revenueType`                                                | The revenue type (for example tax, refund, income).                        |
| `receiptSignature` | `receiptSignature` (Android)                                 | The receipt signature.                                                     |
| `receipt`          | `receipt`                                                    | Required if you want to verify the revenue event.                          |
| `eventProperties`  | Any remaining properties                                     | A NSDictionary or Map of event properties to include in the revenue event. |

<!--&ast;-->\* If `properties.price` is not present, Segment uses `revenue` instead, and sends that as `price`. In Segment's iOS and Android libraries, if `revenue` isn't present either, Segment sends the `total`.

Property names should be `camelCase` for Android implementations, and `snake_case` for iOS implementations.

> info ""
> Amplitude does not support currency conversion. You should normalize all revenue data to your currency of choice before sending it to Amplitude.

#### Send To Batch Endpoint


> info ""
> This endpoint is available when you send data in Cloud-mode.


If `true`, the destination sends events to Amplitude's `batch` endpoint rather than the `httpapi` endpoint. Because Amplitude's `batch` endpoint throttles traffic less restrictively than the Amplitude `httpapi` endpoint, enabling this setting can help to reduce 429 errors (throttling errors) from Amplitude.

Amplitude's `batch` endpoint throttles data when the rate of events sharing the same `user_id` or `device_id` exceeds an average of 1,000/second over a 30-second period. See the Amplitude documentation for more about [429 errors and throttling in Amplitude](https://developers.amplitude.com/#429s-in-depth){:target="_blank”}.
{% endcapture %}


{% capture group_identify_user_details %}
In the default configuration, Amplitude (Actions) triggers this mapping when it receives a Group call.

> warning ""
> Groups are an enterprise feature in Amplitude, and are available if you've purchased the Accounts add-on.

This Action sets or updates the properties of specific groups. You can use this when you want to update a group's information without sending an Event to Amplitude.

These Group updates affect events that occur after you set up the Amplitude mapping. You cannot use this to group historical data.

> success ""
> If you are on a Business Tier Segment plan, you can use [Replay](/docs/guides/what-is-replay/) to run historical data through the Amplitude (Actions) destination to apply the grouping.

If you don't have an enterprise Amplitude account, or don't have the Accounts add-on, Segment always adds groups as `user_properties` on a user record.  As long as you specify the Action settings below, Segment adds a "group type" user property with a value of the "group value".

To use Amplitude's groups with Segment, you must enable the following Action settings and make sure to include the data values they need to function. These settings act as a mapping from Segment group traits to Amplitude group types and values.

- **"Amplitude Group Type Trait"**: This specifies what trait in your Group calls contains the Amplitude "group type". In other words, it's how you tell Segment which trait to use as the group type.

- **"Amplitude Group Value Trait"**: This specifies what trait in your Group calls contains the Amplitude "group value". It's how you tell Segment which trait to use as the group value.
{% endcapture %}

{% include components/actions-fields.html content1=log-event-details section1="logEvent" content2=group_identify_user_details section2="groupIdentifyUser" %}

## Migration from Amplitude Classic

Keep the following in mind if you plan to move to Amplitude (Actions) from a classic Amplitude destination.

> info ""
> In some cases, Amplitude Classic uses different default mappings than Amplitude (Actions). For example, the `Viewed Home Page` event in Amplitude Classic will be `Viewed Home` in Amplitude Actions, unless you configure it as `Viewed Home Page`. Be sure to follow the steps in the Destination Actions documentation to [customize your mappings](/docs/connections/destinations/actions/#customize-mappings). Review how events appear in each destination, and configure the Actions' mappings properly to maintain continuity between Classic and Actions destinations.

### Amplitude (Actions) uses Amplitude's HTTP API v2

> warning ""
> If you used Amplitude Classic in cloud-mode, you'll notice different responses from Amplitude to calls you make with the destination. Classic Amplitude was built on Amplitude's now-deprecated HTTP API v1.

You configure the Amplitude (Actions) destination through Filters and Actions. Consult the table below for information about configuring your Amplitude (Actions) destination similarly to your classic Amplitude destination.

> info ""
> Contact Segment support if you find features missing from the Amplitude (Actions) destination that were available in the classic Amplitude destination. 

### Set Once/Set Always fields

Amplitude restricts the mixing of top-level user properties with `$set`, `$setOnce`, or `$setAlways` operations in a single request, [as outlined in Amplitude’s documentation](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/#user_properties-supported-operations){:target="_blank"}. 

To circumvent this within Segment, users can opt to exclusively map event parameters to either the **User Properties** field or to one of the user property operations (Set Once and/or Set Always) available in mappings. If you use the **Set Once** and/or **Set Always** fields, include all relevant fields in their respective mappings and do not configure mappings for **User Properties** in the same request.

Conversely, to send top-level user properties, map only to the **User Properties** field and exclude mappings for the **Set Once** and **Set Always** fields. 

{% include components/actions-map-table.html name="amplitude" %}

## Advanced Amplitude (Actions) settings

### Increment Traits
The `traitsToIncrement` setting increases a user property by some numerical value. If the user property does not have a value set yet, Segment initializes it with a value of 0. The trait must have a numerical value so it can be incremented.

In the following example, the Amplitude User property `friendCount` equals 4.

``` js
"traits" : {"$add": {"friendCount": 3} }
"traits" : {"$add": {"friendCount": 1} }
```
## FAQ and troubleshooting

### Why doesn't Segment automatically add the `session_id` to my web events?
For Segment to automatically add the `session_id` to events, your browser must allow the following request URL to load:

```
https://cdn.segment.com/next-integrations/actions/amplitude-plugins/..
```

To check if you are loading this request, [inspect the network requests](https://developer.chrome.com/docs/devtools/network){:target="_blank”} on your website and look for 'Amplitude.' If the request is not loading, confirm it is allowed on your side.
