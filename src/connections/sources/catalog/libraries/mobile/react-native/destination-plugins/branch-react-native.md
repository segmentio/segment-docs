---
title: Analytics React Native Branch Plugin
strat: react-native
---

[Branch](https://branch.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) empowers you to increase mobile revenue with enterprise-grade links built to acquire, engage, and measure across all devices, channels, and platforms. An industry-leading mobile measurement and deep linking platform, trusted by the most top ranking apps to increase efficiency and revenue.

## Getting Started

  1. From the Segment web app, click **Catalog**.
  2. Search for "Branch Metrics" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. On Branch side you will need to [sign up for a free Branch account](http://branch.io/signup?bmp=segment) and follow the steps on their Dashboard to complete set up.
  4. Copy your `Branch Key` from the Settings page of your [Branch dashboard](https://dashboard.branch.io/#/settings).
  5. Paste the Branch Key in the destination settings and click **Save**.
## Installation

You need to install the `@segment/analytics-react-native-plugin-branch` and the `react-native-branch` dependency.

Using NPM:
```bash
npm install --save @segment/analytics-react-native-plugin-branch react-native-branch
```

Using Yarn:
```bash
yarn add @segment/analytics-react-native-plugin-branch react-native-branch
```

Run `pod install` after the installation to autolink the Branch SDK.

See [`Branch React Native SDK`](https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution) for more details of this dependency.
## Usage

Follow the [instructions for adding plugins](https://github.com/segmentio/analytics-react-native#adding-plugins) on the main Analytics client:

In your code where you initialize the analytics client call the `.add(plugin)` method with an `BranchPlugin` instance:

```ts
import { createClient } from '@segment/analytics-react-native';

import { BranchPlugin } from '@segment/analytics-react-native-plugin-branch';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY'
});

segmentClient.add({ plugin: new BranchPlugin() });
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

When you call `.identify('userId')`, Segment uses Branch's `setIdentity(userId)` method to send the `userId` that was passed in.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```ts
const { track } = useAnalytics();

track('View Product', {
  productId: 123,
  productName: 'Striped trousers',
});
```

When you call `track`, Segment translates it automatically and sends the event to Branch's `logEvent()` endpoint. 

## Screen
If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```ts
const { screen } = useAnalytics();

screen('ScreenName', {
  productSlug: 'example-product-123',
});
```
Segment sends Screen Events to Branch's `logEvent()` endpoint. 