---
title: Analytics React Native Clevertap Plugin
strat: react-native
---

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "CleverTap" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the Destination Settings, add the **Account Id**.

## Adding the dependency

You need to install the `@segment/analytics-react-native-plugin-clevertap` and the `clevertap-react-native` dependency.

Using NPM:
```bash
npm install --save @segment/analytics-react-native-plugin-clevertap clevertap-react-native
```

Using Yarn:
```bash
yarn add @segment/analytics-react-native-plugin-clevertap clevertap-react-native
```

Run `pod install` after the installation to autolink the Clevertap SDK.

See [CleverTap React Native SDK](https://github.com/CleverTap/clevertap-react-native/blob/master/docs/install.md) for more details of this dependency.
## Usage

Follow the [instructions for adding plugins](https://github.com/segmentio/analytics-react-native#adding-plugins) on the main Analytics client:

In your code where you initialize the analytics client call the `.add(plugin)` method with an `ClevertapPlugin` instance:

```ts
import { createClient } from '@segment/analytics-react-native';

import { ClevertapPlugin } from '@segment/analytics-react-native-plugin-clevertap';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY'
});

segmentClient.add({ plugin: new ClevertapPlugin() });
```

## Identify

When you identify a user, Segment passes that user's information to CleverTap with `userId` as CleverTap's Identity value. A number of Segment's special traits map to CleverTap's standard user profile fields.  You'll pass the key on the left into Segment and Segment transforms it to the key on the right before sending to CleverTap.

- `name` maps to `Name`
- `birthday` maps to `DOB`
- `avatar` maps to `Photo`
- `gender` maps to `Gender`
- `phone` maps to `Phone`
- `email` maps to `Email`

All other traits will be sent to CleverTap as custom attributes. The default logic will lower case and snake_case any user traits - custom or special - passed to CleverTap.


> info ""
> In device mode, CleverTap ignores the anonymous ID and CleverTap injects it's own ID

## Track

When you `track` an event, Segment sends that event to CleverTap as a custom event.  Note that CleverTap does not support arrays or nested objects for custom track event properties.

> note ""
> CleverTap requires `identify` traits such as `userId` or `email` to record and associate the Track event. Without these traits, the Track event does not appear in CleverTap.

The device mode connection will not lower case or snake_case any event properties passed directly to CleverTap from the client.

### Order Completed

When you `track` an event using the server-side destination with the name `Order Completed` using the [e-commerce tracking API](/docs/connections/spec/ecommerce/v2/), Segment maps that event to CleverTap's [Charged](https://support.clevertap.com/docs/working-with-events.html#recording-customer-purchases){:target="_blank"} event.
