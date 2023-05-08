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
3. If you're using iOS, install native modules with:

    ```js
    npx pod-install
    ```

4. If you're using Android, you need to add extra permissions to your `AndroidManifest.xml`.  Add the line below between the `` tags:

    ```js
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    ```

5. Initialize and configure the Analytics React Native 2.0 client. The package exposes a method called `createClient` which you can use to create the Segment Analytics client. This central client manages all the tracking events.

    ```js    
    import { createClient, AnalyticsProvider } from '@segment/analytics-react-native';

    const segmentClient = createClient({
      writeKey: 'SEGMENT_API_KEY'
    });
    ```

These are the options you can apply to configure the client:

 Option Name | Description
----------- | ------------
`writeKey` *required* | This is your Segment write key.
`autoAddSegmentDestination` | The default is set to `true`. <br> This automatically adds the Segment Destination plugin. Set to `false` if you don't want to add the Segment Destination.  
`debug` | The default is set to `true`. <br> The default value is `false` in   `defaultSettings` | The default is set to `undefined`. <br> Settings that will be used if the request to get the settings from Segment fails.
`flushAt` | The default is set to `20`. <br> The count of events at which Segment sends to the backend.
`flushInterval`| The default is set to `30`. <br> The interval in seconds at which Segment sends events to the backend.
`maxBatchSize` | The default is set to `1000`. <br> The maxiumum batch size of how many events to send to the API at once.
`trackAppLifecycleEvents` | The default is set to `false`. <br> This enables you to automatically track app lifecycle events, such as application installed, opened, updated, backgrounded. Set to true to `true` to track.
`trackDeepLinks` | The default is set to `false`. <br> This automatically tracks when the user opens the app via a deep link. Set to Enable automatic tracking for when the user opens the app via a deep link.
`proxy` | The default is set to `undefined`. <br> This is a batch url to post to instead of the default batch endpoint.
`collectDeviceId` | The default is set to `fasle`. <br> This automatically adds a `device.Id` property to the context object from the DRM API on Android devices.

## Set up iOS Deep Link Tracking
> warning ""
> This is only required for iOS if you're using the `trackDeepLinks` option. Android doesn't require any additional setup.

To track deep links in iOS, add the following to your `AppDelegate.m` file:
```js
- (BOOL)application:(UIApplication *)application
            openURL: (NSURL *)url
            options:(nonnull NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {

  [AnalyticsReactNative trackDeepLink:url withOptions:options];  
  return YES;
}
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
    href="/docs/connections/sources/catalog/libraries/mobile/swift/cloud-mode-destinations"
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
- [Advertising ID Collection](https://github.com/segmentio/analytics-react-native/tree/master/packages/plugins/plugin-advertising-id)
- [Device token Collection](https://github.com/segmentio/analytics-react-native/tree/master/packages/plugins/plugin-device-token)
- [IDFA Collection](https://github.com/segmentio/analytics-react-native/tree/master/packages/plugins/plugin-idfa)

## Changelog
[View the Analytics React Native 2.0 changelog on GitHub](https://github.com/segmentio/analytics-react-native/releases){:target="_blank"}.
