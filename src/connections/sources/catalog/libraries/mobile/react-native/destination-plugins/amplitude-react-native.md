---
title: Analytics React Native Amplitude Plugin
strat: react-native
---

[Amplitude](https://amplitude.com/){:target="_blank"} is an event tracking and segmentation platform for your web and mobile apps. By analyzing the actions your users perform, you can gain a better understanding to drive retention, engagement, and conversion.

## Getting started

1. Before you start, go to your [Amplitude workspace](https://analytics.amplitude.com){:target="_blank"}. Click **Settings** in the bottom left, then click **Projects** in the left menu. Select your **Project**. Copy the Amplitude API Key and Secret Key for the project.
2. From the Segment web app, click **Catalog**, then click **Destinations**.
3. Find the Destinations Actions item in the left navigation, and click it.
4. Click the "Amplitude" item to select it and click **Configure**.
5. Choose which of your sources to connect the destination to. (You can connect more sources to the destination later.)

Once you have a mapping, you can follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).

The Amplitude React Native plugin doesn't send events to Amplitude from the client side. It instead adds Amplitude session data and then sends it server side from the Amplitude Actions destination.

## Adding the dependency

Using NPM:
```bash
npm install --save @segment/analytics-react-native-plugin-amplitude-session
```

Using Yarn:
```bash
yarn add @segment/analytics-react-native-plugin-amplitude-session
```

## Using the Plugin in your App 

Follow the [instructions for adding plugins](https://github.com/segmentio/analytics-react-native#adding-plugins) on the main Analytics client:

In your code where you initialize the analytics client call the `.add(plugin)` method with an `AmplitudeSessionPlugin` instance:

```ts
import { createClient } from '@segment/analytics-react-native';

import { AmplitudeSessionPlugin } from '@segment/analytics-react-native-plugin-amplitude-session';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY'
});

segmentClient.add({ plugin: new AmplitudeSessionPlugin() });
```

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

The Amplitude (actions) destination does not offer a device-mode connection mode. With the Actions-framework version of the destination, you do not need the device-mode connection.

Most previous deployments of the Amplitude Segment destination used the device-mode connection to use the `session_id` tracking feature. The new Actions-framework Amplitude destination, includes session ID tracking by default. This means you don't need to bundle any software to run on the user's device, or write any code. It also means that you can use more of the Segment platform features on data going to Amplitude, such as Protocols filtering and transformations, and Profiles Identity Resolution.

### Device ID Mappings

The Amplitude destination requires that each event include either a Device ID or a User ID. If a User ID isn't present, Amplitude uses the a Device ID, and vice versa, if a Device ID isn't present, Amplitude uses the User ID.

By default, Segment maps the Segment property `context.device.id` to the Amplitude property `Device ID`. If `context.device.id` isn't available, Segment maps the property `anonymousId` to the Amplitude `Device ID`. The Actions interface indicates this with the following contents of the Device ID field: `coalesce(` `context.device.id` `anonymousId` `)`.

{% capture log-event-details %}
#### Track Revenue Per Product

> info ""
> If you use Track Revenue Per Product, add a `revenue` property inside the `products` array of the Order Completed event.

Amplitude has two different ways to track revenue associated with a multi-product purchase. You can choose which method you want to use using the **Track Revenue Per Product** destination setting.

If you disable the setting ("off"), Segment sends a single revenue event with the total amount purchased and adds revenue data the Amplitude "Order Completed" event. The "Product Purchased" events do not contain any native Amplitude revenue data.

If you enable the setting ("on"), Segment sends a single revenue event for each purchased product and adds Revenue data to each "Product Purchased" event. The "Order Completed" event does not contain any native Amplitude revenue data.

Make sure you format your events using the [Track method spec](/docs/connections/spec/track/). You must pass a `revenue` property, a `price` property, and a `quantity` property for each product in the products list.

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

Amplitude's `batch` endpoint throttles data when the rate of events sharing the same `user_id` or `device_id` exceeds an average of 1,000/second over a 30-second period. See the Amplitude documentation for more about [429 errors and throttling in Amplitude](https://developers.amplitude.com/#429s-in-depth).
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

### Amplitude (Actions) uses Amplitude's HTTP API v2

> warning ""
> If you used Amplitude Classic in cloud-mode, you'll notice different responses from Amplitude to calls you make with the destination. Classic Amplitude was built on Amplitude's now-deprecated HTTP API v1.

You configure the Amplitude (Actions) destination through Filters and Actions. Consult the table below for information about configuring your Amplitude (Actions) destination similarly to your classic Amplitude destination.

> info ""
> Contact Segment support if you find features missing from the Amplitude (Actions) destination that were available in the classic Amplitude destination.

{% include components/actions-map-table.html name="amplitude" %}

## Advanced Amplitude (Actions) settings

### Increment Traits
The `traitsToIncrement` setting increases a user property by some numerical value. If the user property does not have a value set yet, Segment initializes it with a value of 0. The trait must have a numerical value so it can be incremented.

In the following example, the Amplitude User property `friendCount` equals 4.

``` js
"traits" : {"$add": {"friendCount": 3} }
"traits" : {"$add": {"friendCount": 1} }
```
