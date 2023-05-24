---
title: Analytics for React Native
strat: react-native
id: B0X0QmvMny
---

With Analytics for React Native, you can collect analytics in your React Native application and send data to any analytics or marketing tool without having to learn, test, or implement a new API every time. Analytics React Native enables you to process and track the history of a payload, while Segment controls the API and prevents unintended operations.

All of Segment's libraries are open-source, and you can view Analytics for React Native on GitHub. For more information, see the [Analytics React Native GitHub repository](https://github.com/segmentio/analytics-react-native){:target="_blank"}.

> info "Using Analytics for React Native Classic?"
> Segment no longer supports Analytics React Native versions [1.5.1 and older](/docs/connections/sources/cataog/libraries/mobile/react-native/classic). Use the [implementation guide](/docs/connections/sources/catalog/libraries/mobile/react-native/implementation/) to upgrade to the latest version. 

> warning ""
> `@segment/analytics-react-native` is compatible with Expo's [Custom Dev Client](https://docs.expo.dev/development/getting-started/){:target="_blank"} and [EAS builds](https://docs.expo.dev/build/introduction/){:target="_blank"} without any additional configuration. Destination Plugins that require native modules may require custom [Expo Config Plugins](https://docs.expo.dev/guides/config-plugins/){:target="_blank"}.
>
> `@segment/analytics-react-native` isn't compatible with Expo Go.
## Getting Started

To get started with the Analytics for React Native library:

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
    
    To use your own persistence layer you can use the storePersistor option when initializing the client. Make sure you always have a persistor (either by having AsyncStorage package installed or by explicitly passing a value), else you might get unexpected side effects like multiple 'Application Installed' events

4. If you're using iOS, install native modules with:

    ```js
    npx pod-install
    ```

5. If you're using Android, you need to add extra permissions to your `AndroidManifest.xml`. 

    ```js
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    ```

6. Initialize and configure the Analytics React Native client. The package exposes a method called `createClient` which you can use to create the Segment Analytics client. This central client manages all the tracking events.

    ```js    
    import { createClient, AnalyticsProvider } from '@segment/analytics-react-native';

    const segmentClient = createClient({
      writeKey: 'SEGMENT_API_KEY'
    });
    ```

These are the options you can apply to configure the client:

| Name                        | Default   | Description                                                                                                                                                                                                                                                                                                                                           |
| --------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `writeKey` **required**     | ''        | Your Segment API key.                                                                                                                                                                                                                                                                                                                                 |
| `collectDeviceId`           | false     | Set to true to automatically collect the device Id.from the DRM API on Android devices.                                                                                                                                                                                                                                                               |
| `debug`                     | true\*    | When set to false, it will not generate any logs.                                                                                                                                                                                                                                                                                                     |
| `logger`                    | undefined | Custom logger instance to expose internal Segment client logging.                                                                                                                                                                                                                                                                                     |
| `flushAt`                   | 20        | How many events to accumulate before sending events to the backend.                                                                                                                                                                                                                                                                                   |
| `flushInterval`             | 30        | In seconds, how often to send events to the backend.                                                                                                                                                                                                                                                                                                  |
| `flushPolicies`             | undefined | Add more granular control for when to flush, see [Adding or removing policies](#adding-or-removing-policies)                                                                                                                                                                                                                                          |
| `maxBatchSize`              | 1000      | How many events to send to the API at once                                                                                                                                                                                                                                                                                                            |
| `trackAppLifecycleEvents`   | false     | Enable automatic tracking for [app lifecycle events](/docs/connections/spec/mobile/#lifecycle-events): application installed, opened, updated, backgrounded                                                                                                                                                                      |
| `trackDeepLinks`            | false     | Enable automatic tracking for when the user opens the app with a deep link. This requires additional setup on iOS, [see instructions](#ios-deep-link-tracking-setup)                                                                                                                                                                              |
| `defaultSettings`           | undefined | Settings that will be used if the request to get the settings from Segment fails. Type: [SegmentAPISettings](https://github.com/segmentio/analytics-react-native/blob/c0a5895c0c57375f18dd20e492b7d984393b7bc4/packages/core/src/types.ts#L293-L299)                                                                                                  |
| `autoAddSegmentDestination` | true      | Set to false to skip adding the SegmentDestination plugin                                                                                                                                                                                                                                                                                             |
| `storePersistor`            | undefined | A custom persistor for the store that `analytics-react-native` uses. Must match [`Persistor`](https://github.com/segmentio/analytics-react-native/blob/master/packages/sovran/src/persistor/persistor.ts#L1-L18) interface exported from [sovran-react-native](https://github.com/segmentio/analytics-react-native/blob/master/packages/sovran). |
| `proxy`                     | undefined | `proxy` is a batch url to post to instead of 'https://api.segment.io/v1/b'.                                                                                                                                                                                                                                                                           |
| `errorHandler`              | undefined | Create custom actions when errors happen, see [Handling errors](#handling-errors)                                                                                                                                                                                                                                                                     |


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
You can use Analytics React Native with or without hooks. Detailed overviews of both implementation options can be found below. 

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

{% codeexample %}
{% codeexampletab Method signature %}
```js
group: (groupId: string, groupTraits?: JsonMap) => void;
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```js
const { group } = useAnalytics();

group('some-company', {
  name: 'Segment',
});
```
{% endcodeexampletab %}
{% endcodeexample %}

## Utility Methods
The Analytics React Native 2.0 utility methods help you to manage your data. They include:
- Alias
- Reset
- Flush
- Cleanup

### Alias
The [alias](/docs/connections/spec/alias/) method is used to merge two user identities by connecting two sets of user data as one. This method is required to manage user identities in some of Segment's destinations.

{% codeexample %}
{% codeexampletab Method signature %}
```js
alias: (newUserId: string) => void;
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```js
const { alias } = useAnalytics();

alias('user-123');
```
{% endcodeexampletab %}
{% endcodeexample %}

### Reset
The reset method clears the internal state of the library for the current user and group. This is useful for apps where users can log in and out with different identities over time.

> warning ""
> **Note:** Each time you call reset, a new AnonymousId is generated automatically.

{% codeexample %}
{% codeexampletab Method signature %}
```js
reset: () => void;
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```js
const { reset } = useAnalytics();

reset();
```
{% endcodeexampletab %}
{% endcodeexample %}

### Flush
By default, the analytics client sends queued events to the API every 30 seconds or when 20 events accumulate, whichever occurs first. This also occurs whenever the app resumes if the user has closed the app with some events unsent. These values can be modified by the `flushAt` and `flushInterval` config options. You can also trigger a flush event manually.

{% codeexample %}
{% codeexampletab Method signature %}
```js
flush: () => Promise<void>;
```
{% endcodeexampletab %}

{% codeexampletab Example use %}
```js
const { flush } = useAnalytics();

flush();
```
{% endcodeexampletab %}
{% endcodeexample %}

### Cleanup
In case you need to reinitialize the client, that is, you've called createClient more than once for the same client in your application lifecycle, use this method on the old client to clear any subscriptions and timers first.

```js
let client = createClient({
  writeKey: 'KEY'
});

client.cleanup();

client = createClient({
  writeKey: 'KEY'
});
```

If you don't do this, the old client instance would still exist and retain the timers, making all your events fire twice.

Ideally, you shouldn't have to use this method, and the Segment client should be initialized only once in the application lifecycle.

## Control upload with Flush Policies
To granularly control when Segment uploads events you can use `FlushPolicies`.
A Flush Policy defines the strategy for deciding when to flush. This can be on an interval, time of day, after receiving a certain number of events, or after receiving a particular event. This gives you more flexibility on when to send event to Segment.
Set Flush Policies in the configuration of the client:
```ts
const client = createClient({
  // ...
  flushPolicies: [
    new CountFlushPolicy(5),
    new TimerFlushPolicy(500),
    new StartupFlushPolicy(),
  ],
});
```
You can set several policies at a time. When a flush occurs, it triggers an upload of the events, then resets the logic after every flush. 
As a result, only the first policy to reach `shouldFlush` will trigger a flush. In the example above either the event count reaches 5 or the timer reaches 500ms, whatever comes first will trigger a flush.
Segment has several standard Flush Policies:
- `CountFlushPolicy` triggers when you reach a certain number of events
- `TimerFlushPolicy` triggers on an interval of milliseconds
- `StartupFlushPolicy` triggers on client startup only

### Adding or removing policies
One of the main advantages of Flush Policies is that you can add and remove policies on the fly. This is very powerful when you want to reduce or increase the amount of flushes. 
For example you might want to disable flushes if you detect the user has no network:
```ts
import NetInfo from "@react-native-community/netinfo";
const policiesIfNetworkIsUp = [
  new CountFlushPolicy(5),
  new TimerFlushPolicy(500),
];
// Create our client with our policies by default
const client = createClient({
  // ...
  flushPolicies: [...policiesIfNetworkIsUp],
});
// If Segment detects the user disconnect from the network, Segment removes all flush policies. 
// That way the Segment client won't keep attempting to send events to Segment but will still 
// store them for future upload.
// If the network comes back up, the Segment client adds the policies back. 
const unsubscribe = NetInfo.addEventListener((state) => {
  if (state.isConnected) {
    client.addFlushPolicy(...policiesIfNetworkIsUp);
  } else {
    client.removeFlushPolicy(...policiesIfNetworkIsUp)
  }
});
```
### Creating your own flush policies
You can create a custom Flush Policy special for your application needs by implementing the  `FlushPolicy` interface. You can also extend the `FlushPolicyBase` class that already creates and handles the `shouldFlush` value reset.
A `FlushPolicy` only needs to implement two methods:
- `start()`: Executed when the flush policy is enabled and added to the client. This is a good place to start background operations, make async calls, configure things before execution
- `onEvent(event: SegmentEvent)`: Called on every event tracked by your client
- `reset()`: Called after a flush is triggered (either by your policy, by another policy, or manually)
Your policies also have a `shouldFlush` observable boolean value. When this is set to true the client attempts to upload events. Each policy should reset this value to `false` according to its own logic, although it's common to do it inside the `reset` method.
```ts
export class FlushOnScreenEventsPolicy extends FlushPolicyBase {
  onEvent(event: SegmentEvent): void {
    // Only flush when a screen even happens
    if (event.type === EventType.ScreenEvent) {
      this.shouldFlush.value = true;
    }
  }
  reset(): void {
    // Superclass will reset the shouldFlush value so that the next screen event triggers a flush again
    // But you can also reset the value whenever, say another event comes in or after a timeout
    super.reset();
  }
}
```

## Automatic screen tracking
As sending a screen() event with each navigation action can get tiresome, it's best to track navigation globally. The implementation is different depending on which library you use for navigation. The two main navigation libraries for React Native are [React Navigation](https://reactnavigation.org/){:target="_blank"} and [React Native Navigation](https://wix.github.io/react-native-navigation/docs/before-you-start/){:target="_blank"}.

### React Navigation
When setting up React Navigation, you'll essentially find the root level navigation container and call `screen()` whenever the user navigates to a new screen. Segment's [example app](https://github.com/segmentio/analytics-react-native/tree/master/example){:target="_blank"} is set up with screen tracking using React Navigation, so you can use it as a guide.

To set up automatic screen tracking with React Navigation:

1. Find the file where you used the `NavigationContainer`. This is the main top level container for React Navigation.
2. In the component, create a new state variable to store the current route name:

    ```js
    const [routeName, setRouteName] = useState('Unknown');
    ```
3. Create a utility function for determining the name of the selected route outside of the component:

    ```js
      const getActiveRouteName = (
        state: NavigationState | PartialState<NavigationState> | undefined
      ): string => {
        if (!state || typeof state.index !== 'number') {
          return 'Unknown';
        }

        const route = state.routes[state.index];

        if (route.state) {
          return getActiveRouteName(route.state);
        }

        return route.name;
      };
    ```
4. Pass a function in the `onStateChange` prop of your `NavigationContainer` that checks for the active route name and calls `client.screen()` if the route has changes. You can pass in any additional screen parameters as the second argument for screen calls as needed.

    ```js
    <NavigationContainer
    onStateChange={(state) => {
      const newRouteName = getActiveRouteName(state);

      if (routeName !== newRouteName) {
        segmentClient.screen(newRouteName);
        setRouteName(newRouteName);
      }
    }}
    >
```

### React Native Navigation
In order to set up automatic screen tracking while using [React Native Navigation](https://wix.github.io/react-native-navigation/docs/before-you-start/){:target="_blank"}:
1. Use an event listener at the point where you set up the root of your application (for example, `Navigation.setRoot`).
2. Access your `SegmentClient` at the root of your application.

    ```js      
      // Register the event listener for *registerComponentDidAppearListener*
      Navigation.events().registerComponentDidAppearListener(({ componentName }) => {
        segmentClient.screen(componentName);
      });
    ```

## Plugin Architecture
Segment's plugin architecture enables you to modify and augment how the events are processed before they're uploaded to the Segment API.  In order to customize what happens after an event is created, you can create and place various Plugins along the processing pipeline that an event goes through. This pipeline is referred to as a timeline.

### Plugin Types

| Plugin Type   | Description                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------- |
| `before`      | Executes before event processing begins.                                                          |
| `enrichment`  | Executes as the first level of event processing.                                                  |
| `destination` | Executes as events begin to pass off to destinations.                                             |
| `after`       | Executes after all event processing is completed. You can use this to perform cleanup operations. |
| `utility`     | Executes only with manual calls such as Logging.                                                  |

> info ""
> Plugins can have their own native code (such as the iOS-only [`IdfaPlugin`](https://github.com/segmentio/analytics-react-native/blob/829fc80bc8c4f59fa99dadd25083efa422d577f0/packages/plugins/plugin-idfa/README.md){:target="_blank"} or wrap an underlying library (such as the [`FirebasePlugin`](https://www.npmjs.com/package/@segment/analytics-react-native-plugin-firebase) which uses `react-native-firebase` under the hood).

### Destination Plugins
Segment is an out-of-the-box `DestinationPlugin`. You can add as many other destination plugins as you like and upload events and data to them.

If you don't want the Segment destination plugin, you can pass `autoAddSegmentDestination = false` in the options when setting up your client. This prevents the `SegmentDestination` plugin from being added automatically for you.

### Adding Plugins
You can add a plugin at any time through the `segmentClient.add()` method.

```js

import { createClient } from '@segment/analytics-react-native';

import { AmplitudeSessionPlugin } from '@segment/analytics-react-native-plugin-amplitude';
import { FirebasePlugin } from '@segment/analytics-react-native-plugin-firebase';
import { IdfaPlugin } from '@segment/analytics-react-native-plugin-idfa';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY'
});

segmentClient.add({ plugin: new AmplitudeSessionPlugin() });
segmentClient.add({ plugin: new FirebasePlugin() });
segmentClient.add({ plugin: new IdfaPlugin() });
```

### Writing your own Plugins
Plugins implement as ES6 Classes. To get started, familiarize yourself with the available classes in `/packages/core/src/plugin.ts`.

The available plugin classes are:
- `Plugin`
- `EventPlugin`
- `DestinationPlugin`
- `UtilityPlugin`
- `PlatformPlugin`

Any plugin must be an extension of one of these classes.
You can then customize the functionality by overriding different methods on the base class. For example, here is a simple `Logger` plugin:

```js
// logger.js

import {
  Plugin,
  PluginType,
  SegmentEvent,
} from '@segment/analytics-react-native';

export class Logger extends Plugin {

  // Note that `type` is set as a class property
  // If you do not set a type your plugin will be a `utility` plugin (see Plugin Types above)
  type = PluginType.before;

  execute(event: SegmentEvent) {
    console.log(event);
    return event;
  }
}
// app.js

import { Logger } from './logger';

segmentClient.add({ plugin: new Logger() });
```

As the plugin overrides the `execute()` method, this `Logger` calls `console.log` for every event going through the Timeline.

### Add a custom Destination Plugin 

You can add custom plugins to Destination Plugins. For example, you could implement the following logic to send events to Braze on weekends only:

```js

import { createClient } from '@segment/analytics-react-native';

import {BrazePlugin} from '@segment/analytics-react-native-plugin-braze';
import {BrazeEventPlugin} from './BrazeEventPlugin';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY'
});

const brazeplugin = new BrazePlugin();
const myBrazeEventPlugin = new BrazeEventPlugin();
brazeplugin.add(myBrazeEventPlugin);
segmentClient.add({plugin: brazeplugin});

// Plugin code for BrazeEventPlugin.ts
import {
  Plugin,
  PluginType,
  SegmentEvent,
} from '@segment/analytics-react-native';

export class BrazeEventPlugin extends Plugin {
  type = PluginType.before;

  execute(event: SegmentEvent) {
    var today = new Date();
    if (today.getDay() === 6 || today.getDay() === 0) {
      return event;
    }
  }
}
```

Segment would then send events to the Braze Destination Plugin on Saturdays and Sundays, based on device time.

### Example Plugins
These are the example plugins you can use and alter to meet your tracking needs:

| Plugin              | Package                                                      |
| ------------------- | ------------------------------------------------------------ |
| Adjust              | `@segment/analytics-react-native-plugin-adjust`              |
| Amplitude Sessions  | `@segment/analytics-react-native-plugin-amplitude-session`   |
| AppsFlyer           | `@segment/analytics-react-native-plugin-appsflyer`           |
| Braze               | `@segment/analytics-react-native-plugin-braze`               |
| Consent Manager     | `@segment/analytics-react-native-plugin-adjust`              |
| Facebook App Events | `@segment/analytics-react-native-plugin-facebook-app-events` |
| Firebase            | `@segment/analytics-react-native-plugin-consent-firebase`    |
| IDFA                | `@segment/analytics-react-native-plugin-idfa`                |

<!-- ## Destination Filters
> info ""
> Destination filters are only available to Business Tier customers.
>
> Destination filters on mobile device-mode destinations are in beta and only supports Analytics-React-Native 2.0, [Analytics-Swift](/docs/connections/sources/catalog/libraries/mobile/swift/) and [Analytics-Kotlin](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/).

Use Analytics-React-Native 2.0 to set up [destination filters](/docs/connections/destinations/destination-filters/) on your mobile device-mode destinations.

> warning ""
> You must use Analytics-React-Native version 2.9 or higher to implement destination filters.
>
> Keep [these limitations](/docs/connections/destinations/destination-filters/#limitations) in mind when using destination filters.

To get started with destination filters on mobile device-mode destinations using Analytics-React-Native 2.0:
1. Download and install the `@segment/analytics-react-native-plugin-destination-filters` package as a dependency in your project.
    * Using NPM:
      ```npm
      npm install --save @segment/analytics-react-native-plugin-destination-filters
      ```
    * Using Yarn:
      ```yarn
      yarn add @segment/analytics-react-native-plugin-destination-filters
      ```
2. Follow the instructions for [adding plugins](/docs/connections/sources/catalog/libraries/mobile/react-native/#adding-plugins) on the main Analytics client.
3. Add `DestinationFiltersPlugin` after you create your Segment client.

    ```kotlin
    import { createClient } from '@segment/analytics-react-native';

    import { DestinationFiltersPlugin } from '@segment/analytics-react-native-plugin-destination-filters';

    const segmentClient = createClient({
      writeKey: 'SEGMENT_KEY'
    });

    segmentClient.add({ plugin: new DestinationFiltersPlugin() });
    segment.add({ plugin: new FirebasePlugin() })
    ``` -->

## Supported Destinations
Segment supports a large number of [Cloud-mode](/docs/connections/destinations/#connection-modes) destinations. Segment also supports the below destinations for Analytics React Native 2.0 in device-mode, with more to follow:
- [Adjust](https://www.npmjs.com/package/@segment/analytics-react-native-plugin-adjust){:target="_blank"}
- [Amplitude Session](https://www.npmjs.com/package/@segment/analytics-react-native-plugin-amplitude-session){:target="_blank"}
- [Appsflyer](https://www.npmjs.com/package/@segment/analytics-react-native-plugin-appsflyer){:target="_blank"}
- [Braze](https://www.npmjs.com/package/@segment/analytics-react-native-plugin-braze){:target="_blank"}
- [CleverTap](https://www.npmjs.com/package/@segment/analytics-react-native-plugin-clevertap){:target="_blank"}
- [Facebook App Events](https://www.npmjs.com/package/@segment/analytics-react-native-plugin-facebook-app-events){:target="_blank"}
- [Firebase](https://www.npmjs.com/package/@segment/analytics-react-native-plugin-firebase){:target="_blank"}

## Device identifiers
On Android, Segment's React Native library generates a unique ID by using the DRM API as context.device.id. Some destinations rely on this field being the Android ID, so be sure to double-check the destination’s vendor documentation. If you choose to override the default value using a plugin, make sure the identifier you choose complies with Google’s User Data Policy. For iOS the context.device.id is set the IDFV.

To collect the Android Advertising ID provided by Play Services, Segment provides a [plugin](https://github.com/segmentio/analytics-react-native/tree/master/packages/plugins/plugin-advertising-id){:target="_blank"} that can be used to collect that value. This value is set to context.device.advertisingId. For iOS, this [plugin](https://github.com/segmentio/analytics-react-native/tree/master/packages/plugins/plugin-idfa){:target="_blank"} can be used to set the IDFA context.device.advertisingId property.

## FAQs
### Can I use the catalog of device-mode destinations from Segment's 1.X.X React-Native release?
No, only the plugins listed above are supported in device-mode for Analytics React Native 2.0.
### Will I still see device-mode integrations listed as `false` in the integrations object?
When you successfully package a plugin in device-mode, you won't see the integration listed as `false` in the integrations object for a Segment event. This logic is packaged in the event metadata, and isn't surfaced in the Segment debugger.
### Why are my IDs not set in UUID format?
Due to [limitations](https://github.com/segmentio/analytics-react-native/blob/master/packages/core/src/uuid.ts#L5){:target="_blank"} with the React Native bridge, Segment doesn't use UUID format for `anonymousId` and `messageId` values in local development. These IDs will be set in UUID format for your live app.
### How do I set a distinct writeKey for iOS and android?
You can set different writeKeys for iOS and Android. This is helpful if you want to send data to different destinations based on the client side platform. To set different writeKeys, you can dynamically set the writeKey when you initialize the Segment client:

```js
import {Platform} from 'react-native';
import { createClient } from '@segment/analytics-react-native';

const segmentWriteKey = Platform.iOS ? 'ios-writekey' : 'android-writekey';

const segmentClient = createClient({
  writeKey: segmentWriteKey
});
```
### What is the instanceId set in context?
The instanceId was introduced in [V 2.10.1](https://github.com/segmentio/analytics-react-native/releases/tag/%40segment%2Fanalytics-react-native-v2.10.1) and correlates events to a particular instance of the client in a scenario when you might have multiple instances on a single app. 

### How do I interact with the integrations object?
The integrations object is no longer part of the Segment events method signature. To access the integrations object and control what destinations the event reaches, you can use a Plugin:

```js
import {
    EventType,
    Plugin,
    PluginType,
    SegmentEvent,
  } from '@segment/analytics-react-native';
  
  export class Modify extends Plugin {
    type = PluginType.before;
  
    async execute(event: SegmentEvent) {
      if (event.type == EventType.TrackEvent) {
        let integrations = event.integrations;
        if (integrations !== undefined) {
          integrations['Appboy'] = false;
        }
      }
      //console.log(event);
      return event;
    }
  }
```
## Changelog
[View the Analytics React Native changelog on GitHub](https://github.com/segmentio/analytics-react-native/releases){:target="_blank"}.
