---
title: Analytics-Flutter
hidden: false
---

INTRO

> info ""
> The Analytics-Flutter library is currently in public beta and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}. For more information, see the [Analytics-Flutter GitHub repository](https://github.com/segmentio/analytics_flutter){:target="_blank"}. 

## Getting started
To install Analytics-Flutter:

1. Manually add this package to your `pubspec.yaml` file: 

    ```
    dependencies: 
        flutter: 
            sdk: flutter 

        # Main package
        analytics: 
            git: 
                url: https://github.com/segmentio/analytics_flutter
                ref: main
                path: packages/core
    ```
2. *(Optional)* Add any pluging that you need.

    ```
      # Plugins
    analytics_plugin_firebase:
        git: 
            url: https://github.com/segmentio/analytics_flutter
            ref: main
            path: packages/plugins/plugin_firebase
    ```

3. Import the library in your Dart code: 

    ```
    import 'package:analytics/client.dart';
    ```

4. Add permissions to `AndroidManifest.xml`. Add the line below between the `` tags.

    ```
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
| `writeKey` **(REQUIRED)**  | ''        | Your Segment API key. |
| `debug`                    | false     | When set to false, it will not generate any info logs. |
| `collectDeviceId`          | false     | Set to true to automatically collect the device ID from the DRM API on Android devices. |
| `flushPolicies`            | count=30,time=20s | List of flush policies controlling when to send batches of events to the plugins |
| `apiHost`                  | "api.segment.io/v1" | Used to specify the regional Segment event endpoint |
| `cdnHost`            | "cdn-settings.segment.com/v1" | Used to specify the regional Segment settings endpoint |
| `errorHandler`             | null      | Custom error handler. By default logs errors to the standard flutter logger |
| `trackApplicationLifecycleEvents`  | false     | Enable automatic tracking for [app lifecycle events](https://segment.com/docs/connections/spec/mobile/#lifecycle-events): application installed, opened, updated, backgrounded) |
| `trackDeeplinks`           | false     | Enable automatic tracking for when the user opens the app via a deep link. *NOTE: when sending this flag, the sdk plugin_appsflyer will ignore [onAppOpenAttribution](https://github.com/AppsFlyerSDK/appsflyer-flutter-plugin/blob/master/doc/Guides.md#Unified-deep-linking) |
| `autoAddSegmentDestination`| true      | Set to false to skip adding the SegmentDestination plugin |
| `defaultIntegrationSettings`| null | Plugin settings that will be used if the request to get the settings from Segment fails. |
| `maxBatchSize`| true      | 100 | Maximum number of events to send to the API at once. |
| `appStateStream`| null | Set to override the stream of application foreground or background events. |
| `requestFactory`| true      | Set to override the factory to generate HTTP requests. Type: [RequestFactory](https://github.com/segmentio/analytics_flutter/blob/master/packages/core/lib/state.dart#L546) |


## Tracking methods
Once you’ve installed the Analytics-Flutter library, you can start collecting data through Segment’s tracking methods:
* Track
* Screen
* Identify
* Group

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

### Screen
The [Screen](/docs/connections/spec/screen/) call lets you record whenever a user sees a screen in your mobile app, along with any properties about the screen.

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

To set up automatic screen tracking, see the [instructions below](#automatic-screen-tracking).


### Identify
The [Identify](/docs/connections/spec/identify/) call lets you tie a user to their actions and record traits about them. This includes a unique user ID and any optional traits you know about them like their email, name, etc. The traits option can include any information you might want to tie to the user, but when using any of the [reserved user traits](/docs/connections/spec/identify/#traits), you should make sure to only use them for their intended meaning. All reserved traits are strongly typed by the ```UserTraits``` class. When using traits not listsed as a reserved user trait, these will go under the ```custom``` property.

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

### Group


* Alias
* Reset
* Flush

