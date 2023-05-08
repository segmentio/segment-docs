---
title: Analytics React Native Adjust Plugin
strat: react-native
---

[Adjust](https://adjust.com){:target="_blank"} is the mobile attribution provider of choice for hundreds of organizations across the globe. They unify all your marketing activities into one powerful platform, giving you the insights you need to scale your business. The Adjust Destination is open-source. You can browse the code on GitHub [here](https://github.com/segmentio/analytics-react-native/tree/master/packages/plugins/plugin-adjust).

## Getting started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Adjust" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. You don't need to include Adjust's SDK natively, as this prevent you from successfully implementing the Adjust.
4. Depending on the source you've selected, include Adjust's library by adding the following lines to your dependency configuration.

## Adding the dependencies

You need to install the `@segment/analytics-react-native-plugin-adjust` and the `react-native-adjust` dependency.

Using NPM:
```bash
npm install --save @segment/analytics-react-native-plugin-adjust react-native-adjust
```

Using Yarn:
```bash
yarn add @segment/analytics-react-native-plugin-adjust react-native-adjust
```

Run `pod install` after the installation to autolink the Adjust SDK.

See [React Native SDK of Adjust](https://github.com/adjust/react_native_sdk) for more details of this dependency.


## Using the Plugin in your App

Follow the [instructions for adding plugins](https://github.com/segmentio/analytics-react-native#adding-plugins) on the main Analytics client:

In your code where you initialize the analytics client call the `.add(plugin)` method with an `AdjustPlugin` instance:

```ts
import { createClient } from '@segment/analytics-react-native';

import { AdjustPlugin } from '@segment/analytics-react-native-plugin-adjust';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY'
});

segmentClient.add({ plugin: new AdjustPlugin() });
```

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```ts
const { identify } = useAnalytics();

identify('user-123', {
  username: 'MisterWhiskers',
  email: 'hello@test.com',
  plan: 'premium',
});
```

When you call `identify`, Segment will call Adjust's [addSessionPartnerParameter](https://github.com/adjust/ios_sdk#session-partner-parameters){:target="_blank"} method and set the `userId` and/or `anonymousId`. This will set these values within Adjust, and allow Adjust to send back attribution data from their servers.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```ts
const { track } = useAnalytics();

track('View Product', {
  productId: 123,
  productName: 'Striped trousers',
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