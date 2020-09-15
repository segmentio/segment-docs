---
title: 'Analytics for Android (V1 - Deprecated)'
hidden: true
published: false
---

Analytics for Android makes it simple to send your data to any tool without having to learn, test or implement a new API every time.

Analytics for Android lets you record analytics data from your Android applications. It supports Android 2.3 (Gingerbread, API level 10) and up.

This library lets you bundle native destinations like Google Analytics or Mixpanel. For non-bundled destinations, like Customer.io or Kissmetrics, our library will send analytics requests to our servers, which then route your data to any analytics service you enable on your destinations page. You can also choose to not include any bundled destinations, in which case all the requests will be sent through our servers. The library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/analytics-android).

Analytics for Android uses a light-weight queuing mechanism to make API calls to Segment non-blocking and fast. It also batches messages and flushes asynchronously to our servers to achieve high performance and save your users' battery life.


## Getting Started

To get started head over to our [Android QuickStart](/docs/connections/sources/catalog/libraries/mobile/android/v1/quickstart) which will help you install analytics tracking on your app in just a few minutes. Once you've installed the library, read on for the detailed API reference!


## Identify

`identify` lets you tie a user to their actions and record traits about them.

You'll want to `identify` a user with any relevant information as soon as they log-in or sign-up. Learn more on the [Identify page](/docs/connections/spec/identify).

```java
Traits traits = new Traits();
traits.put("name", "Tom Smykowski");
traits.put("email", "tom.smykowski@initch.com");
traits.put("friends", 29);
Analytics.identify("019mr8mf4r", traits);
```

<table>
  <tr>
    <td>`userId` _String_</td>
    <td>Optional, this is the ID for this user in your database. If you don't have an ID for them, no worries just don't `identify` them!</td>
  </tr>
  <tr>
    <td>`traits` _Traits_</td>
    <td>A dictionary of things you know about the user. Things like: `email`, `name` or `friends`.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>An [options object](#options) allows you to set a timestamp, an anonymous cookie id, or enable specific destinations.</td>
  </tr>
</table>

If the user has not yet logged in and you don't have an ID, don't worry! We track "anonymous" users with an anonymous UUID that we generate and store. The two identities get merged so that your data is complete for each user.

You can call `Analytics.identify(...)` from anywhere, including the UI thread. We immediately change invocation to another thread, so we'll never block the calling thread.


## Group

`group` lets you associate a user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

You'll want to `group` a user after they have a joined a company or account in your database. Learn more on the [Group page](/docs/connections/spec/group).

```java
Traits traits = new Traits();
traits.put("name", "Segment");
traits.put("website", "https://segment.com");
Analytics.group("userId", "groupId", traits);
```

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`groupId` _String_</td>
    <td>The ID for this group in your database.</td>
  </tr>
  <tr>
    <td>`traits` _Traits, optional_</td>
    <td>A dictionary of traits you know about the group. Things like: <code>name</code> or <code>website</code>.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>An [options object](#options) allows you to set a timestamp, an anonymous cookie id, or enable specific destinations.</td>
  </tr>
</table>


## Track

`track` lets you record the actions your users perform.

You'll want to `track` an event whenever the user clicks, taps or submits something in your app. Learn more on the [Track page](/docs/connections/spec/track).

If you're making an exercise app, you'll want to track whenever the user starts or ends a workout. If you can buy something in your app, make sure you record when a purchase is made. A simple game to play is to ask yourself: what do you want the user to do with your app? Whatever those actions are, make sure they're instrumented.

```java
Props props = new Props();
props.put("revenue", 39.95);
props.put("shippingMethod", "2-day");
Analytics.track("Purchased Item", props);
```

<table class="api-table">
  <tr>
    <td>`event` _String_</td>
    <td>The name of the event you're tracking. We recommend human-readable names like **Played Song** or **Updated Status**.</td>
  </tr>
  <tr>
    <td>`properties` _Props_</td>
    <td>A dictionary of properties for the event. An event **Played Song** might have properties like `artist` and `length`.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>An [options object](#options) allows you to set a timestamp, an anonymous cookie id, or enable specific destinations.</td>
  </tr>
</table>

You can call `Analytics.track(...)` from anywhere, including the UI thread. We immediately change invocation to another thread, so we'll never block the calling thread.


## Screen

`screen` lets you record the app screens that your users view.

Many services let you analyze screens specially. But not all services support `screen`, so when it's not supported explicitly, the `screen` method `tracks` as an event with the same parameters. Learn more about [`screen`](/docs/connections/spec/screen/).

```java
Props props = new Props();
props.put("sku", "s28hdaujk");
props.put("name", "Macbook Pro");
Analytics.screen("Viewed Item", props);
```

<table class="api-table">
  <tr>
    <td>`name` _String_</td>
    <td>The name of the screen being viewed. We recommend human-readable names like **Photo Feed** or **Purchase Screen**.</td>
  </tr>
  <tr>
    <td>`category` _String_</td>
    <td>The optional category of the screen being viewed. We recommend human-readable names like **Authentication** or **Sports**.</td>
  </tr>
  <tr>
    <td>`properties` _Props_</td>
    <td>A dictionary of properties for the screen view. A screen **Photo Feed** might have properties like `Feed Length` or `Sort Order`.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>An [options object](#options) allows you to set a timestamp, an anonymous cookie id, or enable specific destinations.</td>
  </tr>
</table>

- - -


## Options

The `identify`, `group`, `screen`, `track`, and `alias` calls can be passed an options object.


## Destinations

You can specify which analytics providers you want each action to go to.

```java
Traits traits = new Traits();
traits.put("email", "tom@example.com");
traits.put("name", "Tom Smykowski");
Analytics.identify("hj2kf92ds212", traits,
    new Options()
        .setIntegration("all", false)
        .setIntegration("Kissmetrics", true));
```

In this case, we're specifying that we want this `identify` to only go to Kissmetrics. `"All", false` says that no destination should be enabled unless otherwise specified. `"Kissmetrics", true` turns on KissMetrics, etc.


### Destinations in Debugger

If you are seeing any of your destinations turned off in the raw version of requests in the Segment live debugger, but you haven't added those to your requests, like this:

```javascript
"integrations": {
  "Google Analytics": false,
  "Localytics": false,
  "Mixpanel": false
}
```

These flags tell the Segment servers that a request was already made directly from the device through a bundled SDK. That way we don't send a duplicate request using our servers to those services.


## Historical Import

You can import historical data by adding the `timestamp` argument to the options of your `identify` and `track` calls. _Note: If you're tracking things that are happening right now, leave out the timestamp and our servers will timestamp the requests for you._

```java
Props props = new Props();
props.put("distance", "10 miles");
props.put("city", "boston");
Analytics.track("sadi89e2jd", "Logged Workout", props,
    new Options()
        .setTimestamp(Calendar.getInstance());)
```

## Context

If you want to provide information about the device, you can send it along in the `Context` object.

```java
Context context = new Context();
context.put("app", new EasyJSONObject();
context.put("name", "Education App 2");
Props props = new Props();
props.put("title", "App Login");
Analytics.screen("019mr8mf4r", "Login", props,
    new Options().setContext(context)));
```

Learn more on the [Context page](/docs/connections/spec/common/#context).

- - -


## Development Settings

If you're writing a test to make sure this library works, remember that the flushing happens on a different thread.

You can call:

```java
boolean async = false;
Analytics.flush(async);
```

at the end of your program to make sure all the messages have been sent to the server.

If you want to check out what the library is doing, [enable debug mode](#troubleshooting), and look at LogCat for the `analytics` tag.


## Switching Write Keys

If you're using a different Segment project for development or staging, you can switch Write Keys programatically, like so:

```java
public class TrackedActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            String key = isProduction ? "prod_key" : "staging_key";
            Analytics.onCreate(this, key);
    }

    @Override
    protected void onStart() {
            super.onStart();
            Analytics.activityStart(this);
    }

    @Override
    protected void onStop() {
            super.onStop();
            Analytics.activityStop(this);
    }

}
```


## Opt Out

If you need to opt out the current user from any data collection, you can opt them out like this:

```java
Analytics.optOut();
```

It's up to you to call this after every `Analytics.initialize`.


## Advanced


### Threading Model

Analytics for Android is built to:

+ be convenient to use
+ not slow down your app
+ conserve your user's battery life

You can call `Analytics.identify` or `Analytics.track` from any of your app's threads, including the UI thread. We allow this by quickly transitioning invocation to another thread pool so that your UI thread can get back to work. That means that the majority of `Analytics` calls return in under 2 milliseconds.

The first time you call `Analytics.onCreate`, we'll start these threads:

+ **The database thread** is in charge of writing, reading, and removing actions from the database.
+ **The flushing thread** is in charge of pushing items from the database to the Segment servers.
+ **The flush timer thread** is in charge of flushing the database every `10 seconds`, which is [change-able](#configuration) using the `flushAfter` option.
+ **The settings cache refresh thread** is in charge of download your project's destination settings every `1 hour`, which is [change-able](#configuration) using the `analytics_settings_cache_expiry` option.

When you call `Analytics.identify`, we'll first validate that all your arguments are valid. Then we'll call `identify` into the [bundled providers](/docs/connections/sources/catalog/libraries/mobile/android/#about-mobile-connection-modes), Finally we'll immediately move execution to the database thread, which will attempt to enqueue the action into our sql-lite database.


#### Why a database?

A database allows us to achieve guarenteed processing of your data. If the user kills your application, or the phone runs out of batteries, or just loses internet connection, your data will still be delivered when the device recovers connection.

There is no performance hit to enqueueing an action into the Android sql-lite database.


### Flushing thread

The flushing thread is seperate from the database thread, and is responsible for taking information from the database and sending it to our servers using a HTTPS request. This is designed to happen less frequently because each outbound HTTP request can take a toll on the user's battery life.


### Flush timer thread

The timer thread asks the flushing thread to flush the database at regular intervals.


### Settings cache refresh thread

The timer thread refreshes your Segment destination settings every one hour, by default. This is so, if you enable Mixpanel on the interface, your mobile users will start sending data to Mixpanel as well.


### Resource-Constrained

We'll never use more than one thread for either the database, flushing, settings cache refresh, or flush timer thread. This is to make sure our library doesn't take up valuable processing time from your app.


## Batching

Every method you call **does not** result in an HTTP request to Segment, but is queued in a sql-lite database instead. Messages are flushed in batch in the background, which allows for much more efficient operation.

By default, our library will flush:

+ every 20 messages (control with the `flushAt` option)
+ every 10 seconds (control with `flushAfter`)


### How do I turn batching off?

Sometimes you might not want batching (eg. when debugging). You can turn off batching by [setting](#configuration) the `flushAt` argument to `1`, and your requests will always be sent right away.


### How can I tune batching for my app?

If you want to adjust the batching characteristics for your app, just [set](#configuration) `flushAt` and `flushAfter` when you initialize Analytics.

Increasing `flushAt` and `flushAfter` will mean your app flushes analytics data less often and saves on battery life. To get the data faster into your system, decrease these values.


### How can I block until all messages are flushed?

```java
Analytics.flush(false);
```

### What happens if there are just too many messages?

If the module detects that it can't flush faster than it's receiving messages, it'll simply stop accepting messages. This means your program will never crash because of a backed up analytics queue. The `maxQueueSize` defaults to `10000`, and you can use the Configuration resources to modify this value.


## Configuration

If you hate defaults, than you'll love how configurable the analytics-android is.

You can edit your `res/values/analytics.xml` to configure the library:

```xml
<?xml version="1.0" encoding="utf-8" ?>

<resources>
  <!--Your Segment project write key-->
  <string name="analytics_write_key">YOUR_WRITE_KEY</string>

  <!--The maximum amount of analytics eve#nts to queue before dropping to conserve memory-->
  <integer name="analytics_max_queue_size">10000</integer>

  <!--Whether to print additional debug information as you develop.-->
  <string name="analytics_debug">true</string>

  <!--Flush to the server after receiving this many messages-->
  <integer name="analytics_flush_at">20</integer>

  <!--Flush on a timer after this many milliseconds-->
  <integer name="analytics_flush_after">10000</integer>

  <!--Refresh the Segment destination settings after this many milliseconds -->
  <integer name="analytics_settings_cache_expiry">3600000</integer>

  <!--If available, send the device location to Segment. -->
  <integer name="analytics_send_location">true</integer>
</resources>
```

You can find an example `analytics.xml` in the [Android test project](https://github.com/segmentio/analytics-android/blob/master/tests/res/values/analytics.xml).


## Nested Properties

You can provide nested properties to Segment that are useful for some providers.

```java
Analytics.identify("019mr8mf4r", new Traits(
    "name", "Tom Smykowski",
    "email", "tom.smykowski@initch.com",
    "subscriptionPlan", "Premium",
    "friendCount", 29,
    "company", new EasyJSONObject(
        "id", "284738223",
        "name", "Initech"
    )));
```


## Troubleshooting

Luckily, Analytics for Android does lots of logging through LogCat under the tag `analytics`. You'll likely be able to find what's wrong by looking at the logs.

You'll want to **enable debug mode** for the logs to become visible. You can do this by setting `analytics_debug` string value to `true` in your `res/values/analytics.xml` file. Check out the [configuration](#configuration) section for more options.


## Bundled Destinations

There are two ways to send data to your analytics services through this library:

1. Directly from the Android device using bundled providers
2. Through the Segment servers

### Bundled Destinations

If an analytics service offers an Android SDK, we prefer to bundle their SDK with our library. There are a few important reasons for this design:

* The service's SDK is usually the best implementation of their own API, so the end user will get the best analytics experience.
* Changes to the SDK are easy to integrate back into this library.
* Some services don't document a REST API, so its only possible to integrate using their mobile SDK.

The SDKs are bundled with our library so that you can turn them on in the Segment interface without re-building your app, re-publishing it to the Play Store, and waiting for your users to update to the new version.

Analytics for Android knows how to talk to the bundled SDK by its `bundled provider`. [Bundled SDKs live here](https://github.com/segmentio/analytics-android/tree/master/libs), and [bundled providers are here](https://github.com/segmentio/analytics-android/tree/master/src/io/segment/android/providers).


### Through Segment Servers

For the analytics services that don't have Android SDKs, the request goes through the Segment REST API, and is routed to the service's server-side API.


## Contributing

You can contribute to this open source library to make fixes to exsiting analytics destinations or add other analytics destinations.


### Open the Project in IntelliJ / Android Studio

Just import on the `analytics-android` project's root `build.gradle`, with the default Gradle wrapper.


## Manual Install

If you are unable to use a build system such as [Maven](https://maven.apache.org/) or [Gradle](http://tools.android.com/tech-docs/new-build-system/user-guide), you can still use the [latest jar](https://search.maven.org/remote_content?g=io.segment.analytics.android&a=core&v=LATEST). In Eclipse, this is as simple as dropping it into the `libs` folder.
This doesn't include any of the bundled destinations, so you'll have to look up the specific instructions for that SDK to be able to take advantage of native features.

## Custom Builds

By default, our `all` artifact bundles all destinations.
```
compile('io.segment.analytics.android:all:+@aar') {
  transitive = true
}
```

If you would like to only include some, use our `core` artifact instead, and add destinations as needed.

```
compile('io.segment.analytics.android:core:+')
// Add other dependencies as you want here
compile 'com.google.android.gms:play-services:5.0.77'
compile 'com.mixpanel.android:mixpanel-android:4.2.1@aar'
compile files('libs/QuantcastAndroidSdk.jar') // Be sure to copy these to your libs folder
```

### Adding a Bundled Destination

To add a bundled provider to the library, you can follow these steps:

1. If the provider has a mobile SDK, define it in as a [library](https://github.com/segmentio/analytics-android/blob/master/build.gradle#L32) and add it to both the [`core`](https://github.com/segmentio/analytics-android/blob/master/core/build.gradle#L3) and [`all`](https://github.com/segmentio/analytics-android/blob/master/all/build.gradle#L3) artifacts. If the SDK is only available as a jar, add it to the [libs/](https://github.com/segmentio/analytics-android/tree/master/libs) folder.

2. Now you need to add it in the [destination](https://github.com/segmentio/analytics-android/tree/master/core/src/main/java/com/segment/android/integrations) package.

3. Add it to the [destination manager](https://github.com/segmentio/analytics-android/blob/master/src/io/segment/android/provider/destinationManager.java#L46), and test it out with the sample app!

4 Build the project with `./gradlew clean build connectedCheck`. See the [building](#building) section for more info.

5. Send a Pull Request, and [contact us](https://segment.com/help/contact/) to add it to our platform, so that people can toggle it on with one click.

### Destination Sizes

To help you evaluate the baggage each destination comes with, we've compiled a handy chart for you, listing all our destinations, their sizes and method counts.

| Destination              | Size              | Method Count         |
|:-------------------------|:-----------------:|:--------------------:|
| Amplitude                | ~20KB             | ~250                 |
| Bugsnag                  | ~40KB             | ~500                 |
| Countly                  | ~20KB             | ~150                 |
| Crittercism              | ~150KB            | ~200                 |
| Flurry                   | ~120KB            | ~1,150               |
| Google Analytics         | ~3MB              | ~20,300<sup>1</sup>  |
| Localytics               | ~80KB<sup>2</sup> | ~400                 |
| Mixpanel                 | ~260KB            | ~1,200               |
| Quantcast                | ~80KB             | ~700                 |
| Tapstream                | ~30KB             | ~300                 |
| Countly                  | ~20KB             | ~150                 |

<sup>1</sup> *Google Analytics takes up a huge amount since it comes with Play Services, which includes APIs for Google Ads, Google Drive, Google Plus and many more! Chances are you're not using all of them. Luckily if you're a Gradle user, you can [strip away the unused modules](https://gist.github.com/dmarcato/d7c91b94214acd936e42) and reduce bloat.*

<sup>2</sup> *Localytics doesn't provide a jar so we [compiled one ourselves](http://search.maven.org/#artifactdetails%7Cio.segment.analytics.android%7Clocalytics%7C1.4.1%7Cjar).*

## Building

We currently use the [Gradle Android plugin](http://tools.android.com/tech-docs/new-build-system/user-guide) to build the project.

You'll need to download the [Android SDK](https://developer.android.com/tools/index.html) and set a `$ANDROID_HOME` variable that points to the install location. Then you'll have to install the build tools (version 20.0.0) and the correct target SDK level (API 20) from the SDK Manager (included in the tools you just downloaded).

Once you've set up the SDK, simply run `./gradlew clean build` in the root directory of the project to build the project.

If you want to run our tests, execute `./gradlew clean build connectedCheck`. This requires you to have at least one connected device or emulator to run the tests on.
