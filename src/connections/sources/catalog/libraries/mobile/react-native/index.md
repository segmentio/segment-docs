---
title: Analytics for React Native 2.0
strat: react-native
id: B0X0QmvMny
---

React Native 2.0 is a major version upgrade to the [existing React Native library](/docs/connections/sources/catalog/libraries/mobile/react-native/classic) that is production-ready. With Analytics for React Native 2.0, you can collect analytics in your React Native application and send data to any analytics or marketing tool without having to learn, test, or implement a new API every time. Analytics React Native 2.0 enables you to process and track the history of a payload, while Segment controls the API and prevents unintended operations.

All of Segment's libraries are open-source, and you can view Analytics for React Native 2.0 on GitHub. For more information, see the [Analytics React Native 2.0 GitHub repository](https://github.com/segmentio/analytics-react-native){:target="_blank"}.

> info "Using Analytics for React Native Classic?"
> Analytics React Native versions 1.5.1 and older are no longer supported by Segment. You can reference the [migration guide](/docs/connections/sources/catalog/libraries/mobile/react-native/migration/) to upgrade to the latest version. 

> warning ""
> `@segment/analytics-react-native 2.0` is compatible with Expo's [Custom Dev Client](https://docs.expo.dev/development/getting-started/){:target="_blank"} and [EAS builds](https://docs.expo.dev/build/introduction/){:target="_blank"} without any additional configuration. Destination Plugins that require native modules may require custom [Expo Config Plugins](https://docs.expo.dev/guides/config-plugins/){:target="_blank"}.
>
> `@segment/analytics-react-native 2.0` isn't compatible with Expo Go.
## Getting Started

To get started with the Analytics for React Native 2.0 library:

1. Create a React Native Source in Segment.
    1. Go to **Connections > Sources > Add Source**.
    2. Search for React Native and click **Add source**.
2. Install `@segment/analytics-react-native`, [`@segment/sovran-react-native`](https://github.com/segmentio/sovran-react-native){:target="_blank"} and [`react-native-get-random-values`](https://github.com/LinusU/react-native-get-random-values){:target="_blank"}:

    ```js
    yarn add @segment/analytics-react-native @segment/sovran-react-native react-native-get-random-values
    # or
    npm install --save @segment/analytics-react-native @segment/sovran-react-native react-native-get-random-values
    ```
3. If you want to use the default persistor for the Segment Analytics client, you also have to install `react-native-async-storage/async-storage.`

    ```js
    yarn add @react-native-async-storage/async-storage 
    # or
    npm install --save @react-native-async-storage/async-storage
    ```
    > info ""
    >If you wish to use your own persistence layer you can use the storePersistor option when initializing the client. Make sure you always have a persistor (either by having AsyncStorage package installed or by explicitly passing a value), else you might get unexpected sideeffects like multiple 'Application Installed' events

4. If you're using iOS, install native modules with:

    ```js
    npx pod-install
    ```

5. If you're using Android, you need to add extra permissions to your `AndroidManifest.xml`. 

    ```js
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    ```

6. Initialize and configure the Analytics React Native 2.0 client. The package exposes a method called `createClient` which you can use to create the Segment Analytics client. This central client manages all the tracking events.

    ```js    
    import { createClient, AnalyticsProvider } from '@segment/analytics-react-native';

    const segmentClient = createClient({
      writeKey: 'SEGMENT_API_KEY'
    });
    ```

These are the options you can apply to configure the client:

| Name                       | Default   | Description                                                                                                                                    |
| -------------------------- | --------- | -----------------------------------------------------------------------------------------------------------------------------------------------|
| `writeKey` **required**  | ''        | Your Segment API key.                                                                                                                          |
| `collectDeviceId`          | false    | Set to true to automatically collect the device Id.from the DRM API on Android devices.                                           |
| `debug`                    | true\*    | When set to false, it will not generate any logs.                                                                                              |
| `logger`                   | undefined | Custom logger instance to expose internal Segment client logging.                                                                            |
| `flushAt`                  | 20        | How many events to accumulate before sending events to the backend.                                                                            |
| `flushInterval`            | 30        | In seconds, how often to send events to the backend.                                                                                           |
| `flushPolicies`            | undefined | Add more granular control for when to flush, see [Adding or removing policies](#adding-or-removing-policies)                                   |
| `maxBatchSize`             | 1000      | How many events to send to the API at once                                                                                                     |
| `trackAppLifecycleEvents`  | false     | Enable automatic tracking for [app lifecycle events](https://segment.com/docs/connections/spec/mobile/#lifecycle-events): application installed, opened, updated, backgrounded) |
| `trackDeepLinks`           | false     | Enable automatic tracking for when the user opens the app via a deep link (Note: Requires additional setup on iOS, [see instructions](#ios-deep-link-tracking-setup))                                                            |
| `defaultSettings`          | undefined | Settings that will be used if the request to get the settings from Segment fails. Type: [SegmentAPISettings](https://github.com/segmentio/analytics-react-native/blob/c0a5895c0c57375f18dd20e492b7d984393b7bc4/packages/core/src/types.ts#L293-L299)                                                               |
| `autoAddSegmentDestination`| true      | Set to false to skip adding the SegmentDestination plugin                                                                                      |
| `storePersistor`           | undefined | A custom persistor for the store that `analytics-react-native` leverages. Must match [`Persistor`](https://github.com/segmentio/analytics-react-native/blob/master/packages/sovran/src/persistor/persistor.ts#L1-L18) interface exported from [sovran-react-native](https://github.com/segmentio/analytics-react-native/blob/master/packages/sovran).|
| `proxy`                    | undefined | `proxy` is a batch url to post to instead of 'https://api.segment.io/v1/b'.                                                                    |
| `errorHandler`             | undefined | Create custom actions when errors happen, see [Handling errors](#handling-errors)                                                              |


## Adding Plugins to the Client

You can add a plugin at any time through the `segmentClient.add()` method. More information about plugins, including a detailed architecture overview and a guide to creating your own can be found [here](/docs/connections/sources/catalog/libraries/mobile/react-native/react-native-plugin-architecture/).

```js
import { createClient } from '@segment/analytics-react-native';

import { AmplitudeSessionPlugin } from '@segment/analytics-react-native-plugin-amplitude-session';
import { FirebasePlugin } from '@segment/analytics-react-native-plugin-firebase';
import { IdfaPlugin } from '@segment/analytics-react-native-plugin-idfa';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY'
});

segmentClient.add({ plugin: new AmplitudeSessionPlugin() });
segmentClient.add({ plugin: new FirebasePlugin() });
segmentClient.add({ plugin: new IdfaPlugin() });
```
## Usage
You can use Analytics React Native 2.0 with or without hooks. Detailed overviews of both implemenation options can be found below. 

### Usage with hooks
To use the `useAnalytics` hook within the application, wrap the application in an AnalyticsProvider. This uses the [Context API](https://reactjs.org/docs/context.html){:target="_blank"} which allows access to the analytics client anywhere in the application.

```js
import {
  createClient,
  AnalyticsProvider,
} from '@segment/analytics-react-native';

const segmentClient = createClient({
  writeKey: 'SEGMENT_API_KEY'
});

const App = () => (
  <AnalyticsProvider client={segmentClient}>
    <Content />
  </AnalyticsProvider>
);
```

The `useAnalytics()` hook exposes the client methods:

```js
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useAnalytics } from '@segment/analytics-react-native';

const Button = () => {
  const { track } = useAnalytics();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        track('Awesome event');
      }}
    >
      <Text style={styles.text}>Press me!</Text>
    </TouchableOpacity>
  );
};
```
### Usage without hooks
To use the tracking events without hooks, call the methods directly on the client:

```js
import {
  createClient,
  AnalyticsProvider,
} from '@segment/analytics-react-native';

// create the client once when the app loads
const segmentClient = createClient({
  writeKey: 'SEGMENT_API_KEY'
});

// track an event using the client instance
segmentClient.track('Awesome event');
```

{% codeexample %}
{% codeexampletab Method signature %}
```js
track: (event: string, properties?: JsonMap) => void;
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```js
const { track } = useAnalytics();

track('View Product', {
  productId: 123,
  productName: 'Striped trousers',
});
```
{% endcodeexampletab %}
{% endcodeexample %}
  
### Core tracking methods

Once you've installed the Analytics React Native library, you can start collecting data through Segment's tracking methods:

- [Track](/docs/connections/sources/catalog/libraries/mobile/react-native/implementation/#track)
- [Identify](/docs/connections/sources/catalog/libraries/mobile/react-native/implementation/#identify)
- [Screen](/docs/connections/sources/catalog/libraries/mobile/react-native/implementation/#screen)
- [Group](/docs/connections/sources/catalog/libraries/mobile/react-native/implementation/#group)
- [Alias](/docs/connections/sources/catalog/libraries/mobile/react-native/implementation/#alias)

## Destinations
Destinations are the business tools or apps that Segment forwards your data to. Adding Destinations allow you to act on your data and learn more about your customers in real time.

<br>Segment offers support for two different types of Destinations, learn more about the differences between the two [here]().

<div class="double">
  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/react-native/cloud-mode-destinations"
    icon="destinations-catalog/cloud-apps.svg"
    title="Cloud-mode Destinations"
    description="Destinations that can be enabled from your Segment workspace and require no additional app setup."
    newtab="false"
  %}

  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/react-native/destination-plugins"
    icon="destinations-catalog/mobile.svg"
    title="Device-mode Destinations"
    description="Destinations that require additional app setup, and limit certain Segment functionality."
    newtab="false"
  %}
</div>

## Tools and extensions

Analytics for React Native is built with extensibility in mind. Use the tools list below to improve data collection.

- [Plugin architecture](/docs/connections/sources/catalog/libraries/mobile/react-native/react-native-plugin-architecture)
- [Typewriter](/docs/connections/sources/catalog/libraries/mobile/react-native/react-native-typewriter)
- [Destination Filters](/docs/connections/sources/catalog/libraries/mobile/react-native/react-native-destination-filters)
- [Advertising ID collection](https://github.com/segmentio/analytics-react-native/tree/master/packages/plugins/plugin-advertising-id)
- [Device token collection](https://github.com/segmentio/analytics-react-native/tree/master/packages/plugins/plugin-device-token)
- [IDFA collection](https://github.com/segmentio/analytics-react-native/tree/master/packages/plugins/plugin-idfa)
- [Flush Policies](/docs/connections/sources/catalog/libraries/mobile/react-native/implementation/#control-upload-with-flush-policies)
- [Automatic screen tracking](/docs/connections/sources/catalog/libraries/mobile/react-native/implementation/#automatic-screen-tracking)
- [Error handling](/docs/connections/sources/catalog/libraries/mobile/react-native/implementation/#handling-errors)
- [Native anonymousId](/docs/connections/sources/catalog/libraries/mobile/react-native/implementation/#native-anonymousId)
- [Deep Link tracking](/docs/connections/sources/catalog/libraries/mobile/react-native/implementation/#set-up-ios-deep-link-tracking)


## Changelog
[View the Analytics React Native 2.0 changelog on GitHub](https://github.com/segmentio/analytics-react-native/releases){:target="_blank"}.
