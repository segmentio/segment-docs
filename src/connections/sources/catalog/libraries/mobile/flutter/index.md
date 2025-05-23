---
title: Analytics-Flutter
hidden: false
---

> info ""
> The Analytics-Flutter library is currently in public beta and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}. For more information, see the [Analytics-Flutter GitHub repository](https://github.com/segmentio/analytics_flutter){:target="_blank"}.

> warning "Updated package for pilot users"
> If you've been using Analytics-Flutter since the pilot phase, see [Upgrading from pilot](#upgrading-from-pilot) to use the updated version of Analytics-Flutter. 

Analytics-Flutter lets you add Segment analytics to your Flutter app.

### Supported platforms
Analytics-Flutter supports these platforms:

* Android
* iOS
* MacOS
* Web

Some destination plugins may not support all platform functionality. Refer to individual platform SDKs for more details.

## Getting started
To install Analytics-Flutter:

1. Add the core package as a dependency.

	```bash
	flutter pub add segment_analytics
	```

2. *(Optional)* Add any plugin that you need.

    ```bash
    flutter pub add segment_analytics_plugin_firebase
    ```

3. Import the library in your Dart code.

    ```dart
    import 'package:segment_analytics/client.dart';
    ```

4. Add permissions to `AndroidManifest.xml`. Add the line below between the `` tags.

    ```yml
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    ```

### Setting up the client
The Flutter SDK package exposes a method called `createClient` which you can use to create the Segment Analytics client. This central client manages all of the tracking events. Segment recommends that you add this as a property on your main app's state class. 

```
const writeKey = 'SEGMENT_API_KEY';
final analytics = createClient(Configuration(writeKey));
```

You must pass the `writeKey`. 

These are the options you can apply to configure the client: 


| Option Name | Default | Description |
| ----------- | --------- | --------|
| `writeKey` *(required)*  | ''        | Your Segment API key. |
| `debug`                    | false     | When this is set to `false`, it won't generate any info logs. |
| `collectDeviceId`          | false     | Set this to `true` to automatically collect the device ID from the DRM API on Android devices. |
| `flushPolicies`            | count=30, time=20s | List of flush policies controlling when to send batches of events to the plugins |
| `apiHost`                  | api.segment.io/v1 | Used to specify the regional Segment event endpoint. |
| `cdnHost`            | cdn-settings.segment.com/v1 | Used to specify the regional Segment settings endpoint. |
| `errorHandler`             | null      | Custom error handler. By default, this logs errors to the standard flutter logger. |
| `trackApplicationLifecycleEvents`  | false     | Set this to `true` to enable automatic tracking for [app lifecycle events](/docs/connections/spec/mobile/#lifecycle-events) which include, application installed, opened, updated, backgrounded. |
| `trackDeeplinks`           | false     | Set this to `true` to enable automatic tracking for when the user opens the app through a deep link. **Note**: When you send this flag, the SDK plugin_appsflyer ignores [onAppOpenAttribution](https://github.com/AppsFlyerSDK/appsflyer-flutter-plugin/blob/master/doc/Guides.md#Unified-deep-linking){:target="_blank"}. |
| `autoAddSegmentDestination`| true      | Set this to `false` to skip adding the `SegmentDestination` plugin. |
| `defaultIntegrationSettings`| null | Plugin settings that are used if the request to get the settings from Segment fails. |
| `maxBatchSize`| true      | The maximum number of events you can send to the API at once is 100. |
| `appStateStream`| null | Set this to override the stream of application foreground or background events. |
| `requestFactory`| true      | Set this to override the factory to generate HTTP requests. Type: [RequestFactory](https://github.com/segmentio/analytics_flutter/blob/master/packages/core/lib/state.dart#L546){:target="_blank"}.|

### Upgrading from pilot
If you've been using Analytics-Flutter since the pilot phase, follow these steps to use the upgraded version of Analytics-Flutter as Segment renamed the package of the library from `analytics` to `segment_analytics`. 

1. Remove the `analytics` package and use `segment_analytics` in your `pubspec.yaml` file. 

    ```diff
	-   analytics:
	-     git:
	-       url: https://github.com/segmentio/analytics_flutter
	-       ref: main
	-       path: packages/core
	+   segment_analytics: ^1.0.1
	```
2. Change the imports from `package:analytics` to `package:segment_analytics` in your dart files. 

    ```diff
	- import 'package:analytics/client.dart';
	+ import 'package:segment_analytics/client.dart';
	```

## Tracking methods
Once you’ve installed the Analytics-Flutter library, you can start collecting data through Segment’s tracking methods:
* [Track](#track)
* [Screen](#screen)
* [Identify](#identify)
* [Group](#group)

### Track
The [Track](/docs/connections/spec/track/) method is how you record any actions your users perform, along with any properties that describe the action.

{% codeexample %}
{% codeexampletab Method signature %}
```dart
Future track(String event: string, {Map<String, dynamic>? properties});
```
{% endcodeexampletab %}
{% codeexampletab Example use %}
```dart
analytics.track("View Product", properties: {
  "productId": 123,
  "productName": "Striped trousers"
});
```
{% endcodeexampletab %}
{% endcodeexample %}

### Screen
The [Screen](/docs/connections/spec/screen/) method lets you record whenever a user sees a screen in your mobile app, along with any properties about the screen.

{% codeexample %}
{% codeexampletab Method signature %}
```dart
Future screen(String name: string, {Map<String, dynamic>? properties});
```
{% endcodeexampletab %}
{% codeexampletab Example use %}
```dart
analytics.screen("ScreenName", properties: {
  "productSlug": "example-product-123",
});
```
{% endcodeexampletab %}
{% endcodeexample %}

See how to set up [automatic screen tracking](#automatic-screen-tracking).


### Identify
The [Identify](/docs/connections/spec/identify/) method lets you tie a user to their actions and record traits about them. This includes a unique user ID and any optional traits you know about them like their email, name, address. The traits option can include any information you might want to tie to the user, but when using any of the [reserved user traits](/docs/connections/spec/identify/#traits), you should make sure to only use them for their intended meaning. All reserved traits are strongly typed by the `UserTraits` class. When you use traits not listed as a reserved user trait, these go under the `custom` property.  

{% codeexample %}
{% codeexampletab Method signature %}
```dart
Future identify({String? userId, UserTraits? userTraits});
```
{% endcodeexampletab %}
{% codeexampletab Example use %}
```dart
analytics.identify(userId: "testUserId", userTraits: UserTraits(
  username: "MisterWhiskers",
  email: "hello@test.com",
  custom: {
    "plan": "premium"
  }
);
```
{% endcodeexampletab %}
{% endcodeexample %}

### Group

The [Group](/docs/connections/spec/group/) method is how you associate an individual user with a group — whether it's a company, organization, account, project, team. This includes a unique group ID and any optional group traits you know about them like the company name, industry, the number of employees. The traits option can include any information you might want to tie to the group, but when using any of the [reserved group traits](/docs/connections/spec/group/#traits), you should make sure to only use them for their intended meaning. All reserved traits are strongly typed by the ```GroupTraits``` class. When you use traits not listed as a reserved user trait, these go under the `custom` property.

{% codeexample %}
{% codeexampletab Method signature %}
```dart
Future group(String groupId, {GroupTraits? groupTraits});
```
{% endcodeexampletab %}
{% codeexampletab Example use %}
```dart
analytics.group("some-company", groupTraits: GroupTraits(
  name: 'Segment',
  custom: {
    "region": "UK"
  }
);
```
{% endcodeexampletab %}
{% endcodeexample %}

## Utility methods
The Analytics-Flutter utility methods help you work with plugins from the analytics timeline. They include:
* [Alias](#alias)
* [Reset](#reset)
* [Flush](#flush)


### Alias
The [Alias](/docs/connections/spec/alias/) method is used to merge two user identities, effectively connecting two sets of user data as one. This is an advanced method, but it's required to manage user identities successfully in some of Segment's destinations.

{% codeexample %}
{% codeexampletab Method signature %}
```dart
Future alias(String newUserId);
```
{% endcodeexampletab %}
{% codeexampletab Example use %}
```dart
analytics.alias("user-123");
```
{% endcodeexampletab %}
{% endcodeexample %}

### Reset
The Reset method clears the internal state of the library for the current user and group. This is useful for apps where users can log in and out with different identities over time.

Note: Each time you call reset, a new AnonymousId generates automatically.

{% codeexample %}
{% codeexampletab Method signature %}
```dart
void reset();
```
{% endcodeexampletab %}
{% codeexampletab Example use %}
```dart
analytics.reset();
```
{% endcodeexampletab %}
{% endcodeexample %}

### Flush
By default, the analytics send to the API after 30 seconds or when 20 items accumulate, whichever happens first, and whenever the app resumes if the user has closed the app with some events unsent. You can modify these values by the `flushAt` and `flushInterval` config options. You can also trigger a flush event manually.

{% codeexample %}
{% codeexampletab Method signature %}
```dart
Future flush();
```
{% endcodeexampletab %}
{% codeexampletab Example use %}
```dart
analytics.flush();
```
{% endcodeexampletab %}
{% endcodeexample %}

### Advanced cleanup

In case you need to reinitialize the client, because you called `createClient` more than once for the same client in your application lifecycle, use this method _on the old client_ to clear any subscriptions and timers first.

```dart
var analytics = createClient(Configuration(writeKey));

analytics.cleanup();

analytics = createClient(Configuration(writeKey));
```

If you don't do this, the old client instance still exists and retains the timers, which makes all of your events fire twice.

## Automatic screen tracking

Automatic screen tracking enables you to track navigation globally, as sending a `screen()` event with each navigation action gets tiresome quickly. To set up automatic screen tracking, you need to add the analytics navigator observer to your app's navigator observers. For example, if you're using the `MaterialApp` class, add the following:

```dart
return MaterialApp(navigatorObservers: [
  ScreenObserver()
]);
```

## Plugin architecture

Segment’s plugin architecture enables you to modify and augment how the analytics client works. You have complete control over how the events process before being uploaded to the Segment API. From modifying event payloads to changing analytics functionality, plugins help to speed up the process of getting things done.

In order to customize what happens after an event is created, you can create and place various plugins along the processing pipeline that an event goes through. This pipeline is referred to as a timeline.

As plugins run through a timeline, they execute in order of insertion based on their entry types. Segment has these 5 entry types:

| Plugin Type  | Description                                                                                             |
|--------------|---------------------------------------------------------------------------------------------------------|
| `before`       | Executes before event processing begins.                                                                |
| `enrichment`   | Executes as the first level of event processing.                                                        |
| `destination`  | Executes as events begin to pass off to destinations.                                                   |
| `after`        | Executes after all event processing completes.  This can be used to perform cleanup operations. |
| `utility`      | Executes only with manual calls such as Logging.                                                    |

Plugins can have their own native code (for example, the iOS-only `analytics_plugin_idfa`) or wrap an underlying library (such as `analytics_plugin_firebase` which uses `firebase_core` and `firebase_analytics` under the hood).

### Destination plugins

Segment is included as a `DestinationPlugin` out of the box. You can add as many destination plugins as you like and upload events and data to them.

You can pass `autoAddSegmentDestination = false` in the options when setting up your client to prevent the `SegmentDestination` plugin from being added automatically.

### Adding Plugins

You can add a plugin at any time through the Add method.

```dart
import 'package:segment_analytics/client.dart';
import 'package:segment_analytics/event.dart';
import 'package:segment_analytics/state.dart';
import 'package:segment_analytics_plugin_advertising_id/plugin_advertising_id.dart';
import 'package:segment_analytics_plugin_idfa/plugin_idfa.dart';
import 'package:segment_analytics_plugin_firebase/plugin_firebase.dart'
    show FirebaseDestination;

const writeKey = 'SEGMENT_API_KEY';

class _MyAppState extends State<MyApp> {
  final analytics = createClient(Configuration(writeKey));

  @override
  void initState() {
    super.initState();
    initPlatformState();

    analytics
        .addPlugin(FirebaseDestination(DefaultFirebaseOptions.currentPlatform));
    analytics.addPlugin(PluginAdvertisingId());
    analytics.addPlugin(PluginIdfa());
  }
}
```

### Writing your own plugins

Plugins are implemented by extending one of the provided plugin classes. The available plugin classes are:

- `Plugin`
- `EventPlugin`
- `DestinationPlugin`
- `UtilityPlugin`
- `PlatformPlugin`

Any plugin must be an extension of one of these classes.

You can then customize the functionality by overriding different methods on the base class. For example, here is a `Logger` plugin:

```dart
import 'dart:convert';

import 'package:segment_analytics/analytics.dart';
import 'package:segment_analytics/event.dart';
import 'package:segment_analytics/plugin.dart';
import 'package:segment_analytics/logger.dart';

class EventLogger extends DestinationPlugin {
  var logKind = LogFilterKind.debug;

  EventLogger() : super("event_logger");

  @override
  void configure(Analytics analytics) {
    pAnalytics = analytics;
  }

  @override
  Future<RawEvent?>? execute(RawEvent event) async {
    log("${event.type.toString().toUpperCase()} event${event is TrackEvent ? " (${event.event})" : ''} saved: \n${jsonEncode(event.toJson())}",
        kind: logKind);
    return event;
  }
}
```

As it overrides the `execute` method, this `Logger` calls `log` for every event going through the timeline.

### Supported plugins 
  
You can use these plugins to meet your tracking needs:
  
| Plugin      | Package     |
| ----------- | ----------- |
| [Adjust](https://github.com/segmentio/analytics_flutter/tree/master/packages/plugins/plugin_adjust){:target="_blank"}      | `analytics_plugin_adjust`|
| [AppsFlyer](https://github.com/segmentio/analytics_flutter/tree/master/packages/plugins/plugin_appsflyer){:target="_blank"}    | `analytics_plugin_appsflyer`|
| [Firebase](https://github.com/segmentio/analytics_flutter/tree/master/packages/plugins/plugin_firebase){:target="_blank"}      | `analytics_plugin_firebase`|
| [IDFA](https://github.com/segmentio/analytics_flutter/tree/master/packages/plugins/plugin_idfa){:target="_blank"}     | `analytics_plugin_idfa` |
| [Android Advertising ID](https://github.com/segmentio/analytics_flutter/tree/master/packages/plugins/plugin_advertising_id){:target="_blank"} | `analytics_plugin_advertising-id` |
  
  
## Controlling upload with flush policies

You can use `FlushPolicies` to more granularly control when events upload.

A flush policy defines the strategy for deciding when to flush. This can be on an interval, on a certain time of day, after receiving a certain number of events, or even after receiving a particular event. This gives you more flexibility on when to send events to Segment.

To make use of flush policies, you can set them in the configuration of the client:

```dart
import 'package:segment_analytics/flush_policies/count_flush_policy.dart';
import 'package:segment_analytics/flush_policies/timer_flush_policy.dart';

final analytics = createClient(Configuration(/*...*/, flushPolicies: [
  CountFlushPolicy(10),
  TimerFlushPolicy(100000)
]));
```

You can set several policies at a time. Whenever any policy decides it's time for a flush, it triggers an upload of the events. The rest are reset so that their logic restarts after every flush. 

This means only the first policy to reach `shouldFlush` gets to trigger a flush at a time. In the example above, when either the event count gets to 5 or the timer reaches 500ms, whatever comes first triggers a flush.

Segment has several standard FlushPolicies:
- `CountFlushPolicy` triggers whenever a certain number of events is reached.
- `TimerFlushPolicy` triggers on an interval of milliseconds.
- `StartupFlushPolicy` triggers on client startup only.

## Adding or removing policies

One of the main advantanges of `FlushPolicies` is that you can add and remove policies whenever you want. This is powerful when you want to reduce or increase the amount of flushes. 

For example, you might want to disable flushes if you detect the user has no network:

```dart
if (isConnected) {
  analytics.addFlushPolicy(policiesIfNetworkIsUp);
} else {
  analytics.removeFlushPolicy(policiesIfNetworkIsUp)
}
```

### Creating your own flush policies

You can create a custom `FlushPolicy` for your application needs by implementing the  `FlushPolicy` interface. You can also extend the `FlushPolicyBase` class that already creates and handles the `shouldFlush` value reset.

A `FlushPolicy` only needs to implement one method:
- `onEvent(RawEvent event)`: Gets called on every event tracked by your client.

A `FlushPolicy` can optionally implement:
- `reset()`: Calls after a flush is triggered either by your policy, by another policy, or manually.
- `start()`: Executes when the flush policy is enabled and added to the client. This is a good place to start background operations, make async calls, and configure things before execution.

The `FlushPolicy` should have a `shouldFlush` boolean value. When this is set to `true`, the client attempts to upload events. Each policy should reset this value to `false` according to its own logic, although it's pretty common to do it inside the `reset` method.

```dart
import 'package:segment_analytics/event.dart';
import 'package:segment_analytics/flush_policies/flush_policy.dart';

class FlushOnScreenEventsPolicy extends FlushPolicy {

  @override
  onEvent(RawEvent event) {
    // Only flush when a screen even happens
    if (event is ScreenEvent) {
      this.shouldFlush = true;
    }
  }

  @override
  reset() {
    // Superclass will reset the shouldFlush value so that the next screen event triggers a flush again
    // But you can also reset the value whenever, say another event comes in or after a timeout
    super.reset();
  }
}
```

## Custom logging

By default, any logging is done through the standard Flutter logging mechanism. To customize logging, you can build your own logger, which must implement the `LogTarget` mixin. For example:

```dart
import 'package:segment_analytics/logger.dart';

void customDebugLog(String msg) {
  // ...
}

void customWarningLog(String msg) {
  // ...
}

void customErrorLog(String msg) {
  // ...
}

class CustomLogger with LogTarget {
  @override
  void parseLog(LogMessage log) {
    switch (log.kind) {
      case LogFilterKind.debug:
        customDebugLog("Segment: ${log.message}");
        break;
      case LogFilterKind.warning:
        customWarningLog("Segment: ${log.message}");
        break;
      case LogFilterKind.error:
        customErrorLog("Segment: ${log.message}");
        break;
    }
  }
}

// Set the default logger to use the CustomLogger
LogFactory.logger = CustomLogger();
```

## Handling errors

You can handle analytics client errors through the `errorHandler` option.

The error handler configuration receives a function which gets called whenever an error happens on the analytics client. It receives an Exception that extends one of the errors from [errors.dart](https://github.com/segmentio/analytics_flutter/blob/main/packages/core/lib/errors.dart){:target="_blank"}.

You can use this error handling to trigger different behaviors in the client when a problem occurs. For example, if the client gets rate limited, you could use the error handler to swap flush policies to be less aggressive.

```dart
import 'package:segment_analytics/errors.dart';

//...

final flushPolicies = [CountFlushPolicy(5), TimerFlushPolicy(500)];

void errorHandler(Exception error) {
  if (error is NetworkServerLimited) {
    // Remove all flush policies
    analytics.removeFlushPolicy(analytics.getFlushPolicies());
    // Add less persistent flush policies
    analytics.addFlushPolicy([
      CountFlushPolicy(100),
      TimerFlushPolicy(5000)
    ]);
  }
}

final analytics = createClient(Configuration(writeKey),
  errorHandler: errorHandler,
  flushPolicies: flushPolicies);
```

### Reporting errors from plugins

Plugins can also report errors to the handler by using the [`.error`](https://github.com/segmentio/analytics_flutter/blob/main/packages/core/lib/analytics.dart#L52){:target="_blank"} function of the analytics client. Segment recommends you to use the `PluginError` for consistency, and to attach the `innerError` with the actual exception that was hit.

```dart
import 'package:segment_analytics/errors.dart';

//...

try {
  distinctId = await mixpanel.getDistinctId();
} catch (e) {
  analytics.error(
    PluginError('Error: Mixpanel error calling getDistinctId', e)
  );
}
```

## Platfom specific info

### Web

`analytics_flutter` on web checks for `Analytics.JS` userInfo cookies/localStorage and reuses the `anonymousId` data.

LocalStorage recovery only works when running in the same domain/subdomain.

## Release Notes

### Version 1.1.7

1. **Release Date** - 21<sup>st</sup> May 2025.

2. **Fixes Github Issue #144** - Up to version 1.1.6, the `setFlushPolicies` method inadvertently overwrote the `Configuration.collectDeviceId`property. This issue has been resolved in version 1.1.7.

3. **Fixes Github Issue #147** - The `compileSdkVersion` in the `build.gradle` file has been updated from 31 to 35. Previously, this caused the following error:  
`Android build error "Only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type 'android.content.pm.ApplicationInfo?"` . This update resolves the issue with `compileSdkVersion 35`.

4. **Fixes Github Issue #138** - Prior to version 1.1.7, the version field returned the browser's version string instead of the app version from `pubspec.yaml`. Since `pubspec.yaml` is a build-time configuration file and not accessible at runtime (especially in browser environments), this was expected behavior.  
As of version 1.1.7, if the following tag is added to `<project-root>/web/index.html`: `<meta name="app-version" content="1.2.3">`
the app will return the value in the `content` attribute. 
**Note:** This value should be manually synchronized with the version in `pubspec.yaml`.

5. **Fixes Github Issue #152 and #98** - Until version 1.1.6, the `integrations: {}` field was missing in the data payload sent to the Segment server. This has been addressed in version 1.1.7.

6. **Fixes Github Issue #157** - Resolves the `Concurrent modification during iteration: Instance(length: 6) of '_GrowableList'` error that occurred when multiple plugins were added simultaneously.

## Example app

See the [example app](https://github.com/segmentio/analytics_flutter/blob/main/example/README.md){:target="_blank"} to check a full test app of how to integrate Analytics-Flutter into your own Flutter app.

