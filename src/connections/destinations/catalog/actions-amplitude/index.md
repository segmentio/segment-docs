---
title: Amplitude (Actions) Destination
hide-boilerplate: true
hide-dossier: true
---
{% include content/plan-grid.md name="actions" %}

[Amplitude](https://amplitude.com/) is an event tracking and segmentation
platform for your web and mobile apps. By analyzing the actions your users
perform, you can gain a better understanding to drive retention, engagement,
and conversion.

> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Amplitude Segment destination. There's also a page about the [non-Actions Amplitude destination](/docs/connections/destinations/catalog/amplitude/). Both of these destinations receives data _from_ Segment. There's also the [Amplitude Engage Segment source](/docs/connections/sources/catalog/cloud-apps/amplitude-cohorts/), which sends data _to_ Segment!

## Benefits of Amplitude (Actions) vs Amplitude Classic

Amplitude (Actions) provides the following benefits over the classic Amplitude destination:
- **Fewer settings**. Data mapping for actions-based destinations happens in during configuration, which eliminates the need for most settings.
- **Clearer mapping of data**. Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to the destination.
- **Support for Amplitude's HTTP API v2**. Amplitude (Actions) is built on the latest version of [Amplitude's HTTP API](https://developers.amplitude.com/docs/http-api-v2){:target="_blank"}.
- **Revenue is a top-level property**. Amplitude (Actions) elevates `revenue` to a top-level property in requests sent to Amplitude. This enables inclusion of this data in Amplitude features like customer LTV reports.
- **Session tracking in cloud-mode**. Amplitude (Actions) supports sending session details from cloud-mode sources.

## Getting started

1. Before you start, go to your [Amplitude workspace](https://analytics.amplitude.com){:target="_blank"}. Click **Settings** in the bottom left, then click **Projects** in the left menu. Select your **Project**. Copy the Amplitude API Key and Secret Key for the project.
2. From the Segment web app, click **Catalog**, then click **Destinations**.
3. Find the Destinations Actions item in the left navigation, and click it.
4. Click the "Amplitude" item to select it and click **Configure**.
5. Choose which of your sources to connect the destination to. (You can connect more sources to the destination later.)
6. On the next page enter your Amplitude API key and Secret key and click **Verify credentials**.
7. Next, choose how to create the mapping. You can click Quick Setup to use the defaults provided by Segment, or click Customized Setup to start from a blank mapping.

Once you have a mapping, you can follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).

### Connection Modes for Amplitude (Actions) destination

The Amplitude (actions) destination does not offer a device-mode connection mode. If you're using one of Segment's new libraries ([Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/), [Swift](https://github.com/segmentio/analytics-swift) or [Kotlin](https://github.com/segmentio/analytics-kotlin)) with the Actions-framework version of the destination, you do not need the device-mode connection.

Most previous deployments of the Amplitude Segment destination used the device-mode connection to use the `session_id` tracking feature. The new Actions-framework Amplitude destination, includes session ID tracking by default. This means you don’t need to bundle any software to run on the user’s device, or write any code. It also means that you can use more of the Segment platform features on data going to Amplitude, such as Protocols filtering and transformations, and Personas identity resolution.

Session tracking is available with Segment's new libraries: [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/), [Swift](https://github.com/segmentio/analytics-swift) or [Kotlin](https://github.com/segmentio/analytics-kotlin)


### Device ID Mappings
The Amplitude destination requires that each event include either a Device ID or a User ID. If a User ID isn't present, Amplitude uses the a Device ID, and vice versa, if a Device ID isn't present, Amplitude uses the User ID. 

By default, Segment maps the Segment property `context.device.id` to the Amplitude property `Device ID`. If `context.device.id` isn't available, Segment maps the property `anonymousId` to the Amplitude `Device ID`. The Actions interface indicates this with the following contents of the Device ID field: `coalesce(` `context.device.id` `anonymousId` `)`. 

### Enable session tracking for Analytics.js 2.0

The session tracking is automatically enabled on Javascript sources.


### Enable Amplitude session tracking for Swift

To enable session tracking in Amplitude when using the [Segment Swift library](https://github.com/segmentio/analytics-swift):
1. Enable `trackApplicationLifecycleEvents` in your configuration.
2. Add the [Amplitude Session plugin](https://github.com/segmentio/analytics-swift/blob/main/Examples/destination_plugins/AmplitudeSession.swift
) to your project.
3. Initialize the plugin ([example](https://github.com/segmentio/analytics-swift/blob/main/Examples/apps/DestinationsExample/DestinationsExample/AppDelegate.swift))
   ```swift
   analytics?.add(plugin: AmplitudeSession(name: "Amplitude"))
   ```

### Enable Amplitude session tracking for Kotlin

To enable session tracking in Amplitude when using the [Segment Kotlin library](https://github.com/segmentio/analytics-kotlin):
1. Enable `trackApplicationLifecycleEvents` in your configuration.
2. Add the [Amplitude Session plugin](https://github.com/segmentio/analytics-kotlin/blob/main/samples/kotlin-android-app-destinations/src/main/java/com/segment/analytics/destinations/plugins/AmplitudeSession.kt) to your project.
2. Initialize the plugin
   ```kotlin
   analytics.add(AmplitudeSession())
   ```

### Enable Amplitude session tracking for iOS

To enable session tracking in Amplitude when using the [Segment iOS library](https://github.com/segmentio/analytics-ios):
1. Add the [Amplitude Session middleware](https://github.com/segment-integrations/analytics-ios-integration-amplitude/blob/amplitude-session/Pod/Classes/SEGAmplitudeSession.m) to your project.
2. Add the middleware & enable `trackApplicationLifecycleEvents` in your configuration
   ```objective-c
   	NSString *const SEGMENT_WRITE_KEY = @" ... ";
   	SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:SEGMENT_WRITE_KEY];
   	configuration.trackApplicationLifecycleEvents = true
   	configuration.sourceMiddleware = @[[[SEGAmplitudeSession alloc] init]];
   	[SEGAnalytics setupWithConfiguration:configuration];
   ```

### Enable Amplitude session tracking for Android

To enable session tracking in Amplitude when using the [Segment Android library](https://github.com/segmentio/analytics-android):
1. Add the [Amplitude Session middleware](https://github.com/segment-integrations/analytics-android-integration-amplitude/blob/master/src/main/java/com/segment/analytics/android/integrations/amplitude/AmplitudeSessionId.java) to your project.
	```gradle
	implementation 'com.segment.analytics.android.integrations:amplitude:3.1.0'
	```
3. Add the middleware & enable `trackApplicationLifecycleEvents` in your configuration
   ```java
   	String SEGMENT_WRITE_KEY = " ... ";
   	analytics = new Analytics.Builder(this, SEGMENT_WRITE_KEY)
				.trackApplicationLifecycleEvents()
				.useSourceMiddleware(new AmplitudeSessionId())
				.build();
   ```

## Important differences from the classic Amplitude destination

The classic Amplitude destination captures the following user fields in device-mode (when it runs on the user’s device):

- Device Type (for example, Mac, PC, mobile device)
- Platform (for example iOS or Android)

Amplitude (Actions) runs in cloud-mode, and does not capture these fields.

## Pre-built subscriptions

By default a new Amplitude (Actions) destination comes with the following subscriptions.

You can select these subscriptions by choosing "Quick Setup" when you first configure the destination. You can enable, edit, and disable them from the screen that appears.

| Subscription Name | Trigger                                          | Amplitude Action |
| ----------------- | ------------------------------------------------ | ---------------- |
| Track Calls       | All **track** calls from the connected source    | Log Event        |
| Page Calls        | All **page** calls from the connected source     | Log Event        |
| Screen Calls      | All **screen** calls from the connected source   | Log Event        |
| Identify Calls    | All **identify** calls from the connected source | Identify User    |

## Available Amplitude Actions

Build your own subscriptions! Combine supported [triggers](/docs/connections/destinations/actions/#components-of-a-destination-action) with the following Amplitude-supported actions:

- [Log Event](#log-event)
- [Identify User](#identify-user)
- [Map User](#map-user)
- [Group Identify User](#group-identify-user)

You can see the Segment event fields Amplitude accepts for each action in the Actions subscription set up page.

### Log Event 

The Track Calls, Page Calls, and Screen Calls default subscriptions all send Log Events to Amplitude when the Amplitude (Actions) destination receives the corresponding call.

This action enables you to define the Event Type the destination sends using a combination of plain text and information received from the received event.

{% comment %}
MZ - 7/26: NT is validating the update needed to this section based on a comment in PR 1677
### Order Completed

Use the [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) event to track revenue with Amplitude. This event records a list of products that a user purchased in a single transaction. This is the best way for sites that have a shopping cart system to track purchases.

You can use this event for data coming from a Cloud-mode [source](/docs/connections/sources/). An `Order Completed` event from mobile using the bundled Amplitude integration will work the same as the standard `track` event documented above.

The example below shows an "Order Completed" event with its properties.

```js
analytics.track({
  "userId": "e953c39d2597f0b8a79dd3c407baeb13bb58523a",
  "event": "Order Completed",
  "properties": {
    "checkoutId": "6727142daf49b93a601d3a31bc3d53aeae1d15ab",
    "orderId": "50314b8e9bcf000000000000",
    "affiliation": "Google Store",
    "total": 30,
    "revenue": 25,
    "shipping": 3,
    "tax": 2,
    "discount": 2.5,
    "coupon": "hasbros",
    "currency": "USD",
    "products": [
      {
        "productId": "507f1f77bcf86cd799439011",
        "sku": "45790-32",
        "name": "Monopoly: 3rd Edition",
        "price": 19,
        "quantity": 1,
        "category": "Games"
      },
      {
        "productId": "505bd76785ebb509fc183733",
        "sku": "46493-32",
        "name": "Uno Card Game",
        "price": 3,
        "quantity": 2,
        "category": "Games"
      }
    ]
  }
})
```

When you send an "Order Completed" event from Segment, an "Order Completed" event appears in Amplitude for that purchase. An Amplitude event called "Product Purchased" is also created for each product in the purchase. Segment sends all event properties, except `products`, as `event_properties` of the Amplitude "Order Completed" event. Information about each product is present on the individual "Product Purchased" events.
{% endcomment %}

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


If `true`, the destination sends events to Amplitude’s `batch` endpoint rather than the `httpapi` endpoint. Because Amplitude’s `batch` endpoint throttles traffic less restrictively than the Amplitude `httpapi` endpoint, enabling this setting can help to reduce 429 errors (throttling errors) from Amplitude.

Amplitude’s `batch` endpoint throttles data when the rate of events sharing the same `user_id` or `device_id` exceeds an average of 1,000/second over a 30-second period. See the Amplitude documentation for more about [429 errors and throttling in Amplitude](https://developers.amplitude.com/#429s-in-depth).

### Identify User

In the default configuration, Amplitude (Actions) triggers this mapping when it receives an Identify call.

This Action sets the user ID for a specific device ID, or updates the user properties. You can use this when you want to update user information without sending an Event to Amplitude.


### Merge users with Anonymous ID and User ID

To merge an anonymous user and known user based on `anonymousId` and `userId`, update the value of the Device ID field so that `anonymousId` is the value present.

By default, the Amplitude Device ID property receives the user's device ID from `context.device.id` and falls back to `anonymousId` if `context.device.id` is not present.

### Map User

In the default configuration, Amplitude (Actions) triggers this mapping when it receives an Alias call.

This Action merges two users together that would otherwise have different User IDs tracked in Amplitude. You can use this when you want to merge the users without sending an Event to Amplitude.

| Segment identifier name | Amplitude identifier name |
| ----------------------- | ------------------------- |
| `previousId`            | `user_id`                 |
| `userId`                | `global_user_id`          |

This kind of mapping is useful for users who have different ids across different Amplitude projects. The user’s user_ids act as child ids, which Amplitude maps to a single global_user_id. This allows you to analyze the user’s behavior in Amplitude’s Cross Portfolio view.



{% comment %}
<!-- vale off -->
#### Unmap a user

You can also unmap users, for example if you aliased them in error. To unmap a user, pass the user’s previousId as an integration-specific option. The example Alias call below sends a request to Amplitude that unlinks user 123 from all global_user_ids it was previously associated with.
<!-- vale on -->
{% endcomment %}



### Group Identify User

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

## Migration from Amplitude Classic

{% include content/ajs-upgrade.md %}

Keep the following in mind if you plan to move to Amplitude (Actions) from a classic Amplitude destination.

### Amplitude (Actions) uses Amplitude's HTTP API v2

> warning ""
> If you used Amplitude Classic in cloud-mode, you'll notice different responses from Amplitude to calls you make with the destination. Classic Amplitude was built on Amplitude's now-deprecated HTTP API v1. 

You configure the Amplitude (Actions) destination through Filters and Actions. Consult the table below for information about configuring your Amplitude (Actions) destination similarly to your classic Amplitude destination.

> info ""
> Contact Segment support if you find features missing from the Amplitude (Actions) destination that were available in the classic Amplitude destination.

{% include components/actions-map-table.html name="amplitude" %}
