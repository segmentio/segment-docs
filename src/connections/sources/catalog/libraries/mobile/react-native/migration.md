---
title: React Native 2.0 Migration Guide
strat: react-native
---

If you’re using `analytics-react-native 1.5.1` or older, follow these steps to migrate to `analytics-react-native 2.0`. You can continue to use your React Native source write key for the migration to view historical events.

1. Update the existing package:
    ```js
    yarn upgrade @segment/analytics-react-native@2.0
    ```

2. Install or update pods:
    ```js
    npx pod-install
    ```

3. Add permissions to `AndroidManifeest.xml`:
    ```js
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    ```

4. Initialize and configure the Analytics React Native 2.0 client. The package exposes a method called `createClient` which you can use to create the Segment Analytics client. This central client manages all the tracking events.
    ```js
    import { createClient } from '@segment/analytics-react-native';

    const segmentClient = createClient({
      writeKey: 'SEGMENT_API_KEY'
    });
    ```

    These are the options you can apply to configure the client:

    | Option Name                 | Description                                                                                                                                                                                |
    | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
    | `writeKey` required         | This is your Segment write key.                                                                                                                                                            |
    | `autoAddSegmentDestination` | The default is set to `true`.<br>This automatically adds the Segment Destination plugin. Set to `false` if you don’t want to add the Segment Destination.                                  |
    | `debug`                     | The default is set to `true`. <br>The default value is `false` in production.<br>When set to false, logs don’t generate.                                                                   |
    | `defaultSettings`           | The default is set to `undefined`.<br>Settings that will be used if the request to get the settings from Segment fails                                                                     |
    | `flushAt`                   | The default is set to `20`.<br>The count of events at which Segment sends to the backend.                                                                                                  |
    | `flushInterval`             | The default is set to `30`.<br>The internval in seconds at which Segment sends events to the backend.                                                                                      |
    | `maxBatchSize`              | The default is set to `1000`.<br>The maxiumum batch size of how many events to send to the API at once.                                                                                    |
    | `maxEventsToRetry`          | The default is set to `1000`.<br>The maximum number of events needed to retry sending if the initial request failed.                                                                       |
    | `retryInterval`             | The default is set to `60`.<br>The interval in seconds at which to retry sending events the request failed, for example, in case of a network failure.                                     |
    | `trackAppLifecycleEvents`   | The default is set to `false`.<br>This enables you to automatically track app lifecycle events, such as application installed, opened, updated, backgrounded. Set to `true` to track.      |
    | `trackDeepLinks`            | The default is set to `false`.<br>This automatically tracks when the user opens the app via a deep link. Set to Enable automatic tracking for when the user opens the app via a deep link. |

## Client Configuration Examples
### Example client configuration for `analytics-react-native 1.5.1`

{% codeexample %}
{% codeexampletab App.js %}
```js
import analytics from '@segment/analytics-react-native'

...

analytics.setup('WRITE_KEY', {
 debug: true,
 using: [amplitude, appsflyer],
 trackAdvertising: true,
});
```
{% endcodeexampletab %}

{% codeexampletab package.json %}
```js
"dependencies": {
   ...
  "@segment/analytics-react-native": "1.5.1"
 }
```
{% endcodeexampletab %}

{% codeexampletab podfile.lock %}
```js
PODS:
...
 - Analytics (4.1.6)
}
```
{% endcodeexampletab %}
{% endcodeexample %}

### Example client configuration for `analytics-react-native 2.0.0`

{% codeexample %}
{% codeexampletab App.tsx (or .js) %}
```js
import {
 createClient,
 AnalyticsProvider,
} from '@segment/analytics-react-native';

...

const segmentClient = createClient({
 writeKey: 'WRITE_KEY',
 trackAppLifecycleEvents: true,
});

const App = () => {
 ...
 return (
   <AnalyticsProvider client={segmentClient}>
    ...
   </AnalyticsProvider>
  );
};
```
{% endcodeexampletab %}

{% codeexampletab package.json %}
```js
"dependencies": {
  ...
 "nanoid": "^3.1.30",
 "@react-native-async-storage/async-storage": "^1.15.11",
 "@segment/analytics-react-native": "2.0.0"
}
```
{% endcodeexampletab %}

{% codeexampletab podfile.lock %}
```js
PODS:
...
- segment-analytics-react-native (2.0.0):
 - React-Core
}
```
{% endcodeexampletab %}
{% endcodeexample %}

## Tracking Implementation Examples

### Example tracking implementation for `analytics-react-native 1.5.1`

Home.js
```js
import analytics from '@segment/analytics-react-native';

...

import analytics from '@segment/analytics-react-native';
...
onSendEvent = async() => {
 let name = this.state.eventName
 let properties = this.state.props

 await analytics.track(name, properties);
}
```

### Example tracking implementation for `analytics-react-native 2.0.0`
Home.tsx

```js
import { useAnalytics } from '@segment/analytics-react-native';

...

const Home = ({ navigation }: { navigation: any }) => {
  const { screen, track, identify, group, alias, reset, flush } =
    useAnalytics();
    ...
 onPress: () => {
  track('Track pressed', { foo: 'bar' });
 };
 ...
};
```
