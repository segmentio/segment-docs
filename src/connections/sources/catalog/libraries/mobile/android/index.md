---
title: Analytics for Android
sourceTitle: 'Android'
sourceCategory: 'Mobile'
---

[![Maven Central](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.android/analytics/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.android/analytics)

Analytics for Android makes it dead simple to send your data to any tool without having to learn, test or implement a new API every time.

All of our client sources are open-source, so you can [view Analytics for Android on Github](https://github.com/segmentio/analytics-android), or check out our [browser and server-side sources](/sources) too.

Want to stay updated on releases? Subscribe to the [release feed](https://github.com/segmentio/analytics-android/releases.atom).

Analytics for Android only supports any Android device running API 14 (Android 4.0) and higher. This includes Amazon Fire devices.

## Getting Started

### Step 1: Install the Library


The recommended way to install the library for Android is with a build system like Gradle. This makes it dead simple to upgrade versions and add destinations. The library is distributed via [Maven Central](http://maven.org/). Simply add the `analytics` module to your `build.gradle`:

```java
dependencies {
  implementation 'com.segment.analytics.android:analytics:4.+'
}
```

### Packaging SDKs for Device-mode destinations

In the interest of keeping our SDK lightweight, the `analytics` artifact only installs the Segment destination. This means that all your data will be sent via Segment's servers to any tools you've enabled with server-side-compatible destinations.

[As described here](/docs/destinations/#connection-modes), some destinations require or offer **Device-mode**. If that's the case, you'll need to take package the destination SDK, which might [require some additional steps](#packaging-device-based-integration-sdks).

Now that the SDK is installed and set up, you're ready to...

### Step 2. Initialize the Client

We recommend initializing the client in your `Application` subclass.  You'll need your [Write Key](/docs/guides/setup/how-do-i-find-my-write-key/).

```java
// Create an analytics client with the given context and Segment write key.
Analytics analytics = new Analytics.Builder(context, YOUR_WRITE_KEY)
  .trackApplicationLifecycleEvents() // Enable this to record certain application events automatically!
  .recordScreenViews() // Enable this to record screen views automatically!
  .build();

// Set the initialized instance as a globally accessible instance.
Analytics.setSingletonInstance(analytics);
```

**Notes**:
- Automatically tracking lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) and is optional, but highly recommended to hit the ground running with core events!
- This only installs the Segment destination. This means that all your data is sent server-side to tools.  To bundle additional destinations client-side, you'll need to take some additional steps as [shown here](/docs/sources/mobile/android/#packaging-sdks-for-device-mode-destinations).

### *Optional* Customizing the Client

The entry point of the library is through the `Analytics` class. As you might have seen in the quickstart, here's how you initialize the Analytics client with it's defaults.

```java
Analytics analytics = new Analytics.Builder(context, writeKey).build();
```

The `Analytics.Builder` class lets you customize settings for the Analytics client, including things like the flush interval and packaging Device-mode destinations. Please refer to the Javadocs for details on customizable parameters.

We also maintain a global default instance which is initialized with defaults suitable to most implementations.

```java
// You can also register your custom instance as a global singleton.
Analytics.setSingletonInstance(analytics);
Analytics.with(context).track(...);
```

In general, we recommend using the Builder method as it provides the greatest flexibility. Keep in mind that you can call `Analytics.setSingletonInstance` only _ONCE_, so it's best to stash the initialization code inside your custom Application class.

```java
public class MyApp extends Application {
  @Override public void onCreate() {
    Analytics analytics = new Analytics.Builder(context, writeKey).build();
    Analytics.setSingletonInstance(analytics);

    // Safely call Analytics.with(context) from anywhere within your app!
    Analytics.with(context).track("Application Started");
  }
}
```

Once you have initialized an Analytics client, you can safely call any of it's tracking methods from any thread. These events are dispatched asynchronously to our servers and Device-mode destinations.

**Note:** You should only ever initialize _ONE_ instance of the Analytics client. These are expensive to create and throw away, and in most cases, you should stick to our singleton implementation to make using the SDK easier.

### Step 3. Add Permissions

Ensure that the necessary permissions are declared in your application's `AndroidManifest.xml`.

```xml
 <!-- Required for internet. -->
<uses-permission android:name="android.permission.INTERNET"/>
```

## Identify

`identify` lets you tie a user to their actions and record traits about them.  It includes a unique User ID and any optional traits you know about them.

We recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits change.

Example `identify` call:

```java
Analytics.with(context).identify("a user's id", new Traits().putName("a user's name"), null);
```

We recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits change. We'll remember the previous user id and merge the new traits with the old ones.

```java
// Initially when you only know the user's name
Analytics.with(context).identify(new Traits().putName("Michael Bolton"));

// Sometime later in your app when the user gives you their email
Analytics.with(context).identify(new Traits().putEmail("mbolton@initech.com"));
```
Hold up though! When you actually put that code in your Android app, you'll need to replace all those hard-coded strings with details about the currently logged-in user.

The `identify` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String,optional_</td>
    <td>The database ID for this user.</td>
  </tr>
  <tr>
    <td>`traits` _Traits,optional_</td>
    <td>A map of traits about the user, such as their name, email, address, etc.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>Extra [options](#selecting-destinations) for the call.</td>
  </tr>
</table>

Currently, the Android library will also send `userId` and `anonymousId` as `traits` as automatically. Additionally, `traits` will be sent in the `context.traits` field with every message.

## Track

`track` lets you record the actions your users perform. Every action triggers what we call an "event", which can also have associated properties.

To get started, our SDK can automatically tracks a few key common events with our [Native Mobile Spec](/docs/spec/mobile/), such as the `Application Installed`, `Application Updated` and `Application Opened`. Simply enable this option during initialization.

You'll also want to track events that are indicators of success for your mobile app, like **Signed Up**, **Item Purchased** or **Article Bookmarked**. We recommend tracking just a few important events. You can always add more later!

Example `track` call:

```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .trackApplicationLifecycleEvents()
  .build();

Analytics.with(context).track("Product Viewed", new Properties().putValue("name", "Moto 360"));

```

This example `track` call tells us that your user just triggered the **Product Viewed** event with a name of "Moto 360."

`track` event properties can be anything you want to record, for example:

```
Analytics.with(context).track("Purchased Item", new Properties().putValue("sku", "13d31").putRevenue(199.99));
```

The `track` call has the following fields:

<table class="api-table">
  <tr>
    <td>`name` _String,required_</td>
    <td>A name for the tracked action.</td>
  </tr>
  <tr>
    <td>`properties` _Properties,optional_</td>
    <td>A map of properties for this action, e.g. revenue if the action was a purchase.</td>
  </tr>
  <tr>
    <td>`options` _Options,optional_</td>
    <td>Extra [options](#selecting-destinations) for the call.</td>
  </tr>
</table>

## Formatting Order Completed Events

Segment's Android library provides a number of helper methods so you can easily construct both properties objects and products lists so your Order Completed events conform to our [ecommerce specification](https://segment.com/docs/spec/ecommerce/v2/). Here's a code example:

```java
import com.segment.analytics.Analytics;
import com.segment.analytics.Properties;
import com.segment.analytics.Properties.Product;

// initialize a new properties object
Properties properties = new Properties();

// add orderId and revenue to the properties object
properties.putValue("orderId", String orderId).putValue("revenue", double revenue);

// initialize a new product
Product product1 = new Product(String id, String sku, double price);

// initialize a second product
Product product2 = new Product(String id, String sku, double price);

// add products to the properties object
properties.putProducts(product1, product2);

// pass the properties object into your Order Completed event
Analytics.with(context).track("Order Completed", properties);
```

Find details on **best practices in event naming** as well as the **`track` method payload** in our [Spec](/docs/spec/track/).

## Screen

The [`screen`](/docs/spec/screen/) method lets you you record whenever a user sees a screen of your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event an event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Not all services support screen, so when it's not supported explicitly, the screen method tracks as an event with the same parameters.

Example `screen` call:

```java
// category "Feed" and a property "Feed Length"
Analytics.with(context).screen("Feed", new Properties().putValue("Feed Length", "26"));

// no category, name "Photo Feed" and a property "Feed Length"
Analytics.with(context).screen(null, "Photo Feed", new Properties().putValue("Feed Length", "26"));

// category "Smartwatches", name "Purchase Screen", and a property "sku"
Analytics.with(context).screen("Smartwatches", "Purchase Screen", new Properties().putValue("sku", "13d31"));
```

The `screen` call has the following fields:

<table class="api-table">
  <tr>
    <td>`category` _String,optional*_</td>
    <td>A category for the screen. Optional if name is provided.</td>
  </tr>
  <tr>
    <td>`name` _String,optional*_</td>
    <td>A name for the screen. Optional if category is provided.</td>
  </tr>
  <tr>
    <td>`properties` _Properties,optional_</td>
    <td>A map of properties for this screen.</td>
  </tr>
  <tr>
    <td>`options` _Options,optional_</td>
    <td>Extra [options](#selecting-destinations) for the call.</td>
  </tr>
</table>

Find details on the **`screen` payload** in our [Spec](/docs/spec/screen/).

## Group

`group` lets you associate an [identified user](/docs/sources/server/java/#identify) user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/destinations/intercom/), [Preact](/docs/destinations/preact/) and [Totango](/docs/destinations/totango/), as it ties the user to a **group** of other users.

Example `group` call:

```java
Analytics.with(context).group("a user's id", "a group id", new Traits().putEmployees(20));
```

The `group` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String,required_</td>
    <td>The database ID for this user.</td>
  </tr>
  <tr>
    <td>`groupdId` _String,required_</td>
    <td>The database ID for this group.</td>
  </tr>
  <tr>
    <td>`traits` _Traits,optional_</td>
    <td>A map of traits about the group, such as the number of employees, industry, etc.</td>
  </tr>
  <tr>
    <td>`options` _Options,optional_</td>
    <td>Extra [options](#selecting-destinations) for the call.</td>
  </tr>
</table>

Find more details about `group` including the **`group` payload** in our [Spec](/docs/spec/group/).

## Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/destinations/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [KISSmetrics](/docs/destinations/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

```java
Analytics.with(context).alias(newId)
Analytics.with(context).identify(newId);
```

The `alias` call has the following fields:

<table class="api-table">
  <tr>
    <td>`newId` _String,required_</td>
    <td>The new ID to track this user with.</td>
  </tr>
  <tr>
    <td>`options` _Options,optional_</td>
    <td>Extra [options](#selecting-destinations) for the call.</td>
  </tr>
</table>

For more details about `alias`, including the **`alias` call payload**, check out our [Spec](/docs/spec/alias/).

Note that the `previousId` will be the value passed in as the `userId`, which we cached after you make an `identify` call. We will pass that value as the `previousId` when you call `alias` and pass in a `newId`. If you have not called `identify`, the `previousId` will be the `anonymousId`.

---

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an `options` object that allows you to turn certain destinations on or off. By default all destinations are enabled. (In our other libraries, you could do this in the list of `integrations` inside the `options` object.)

For instance, in the snippet below, the first event is sent to all destinations, but the second one is sent to all except Mixpanel.

```java
// Sent to all destinations
Analytics.with(context).track("Viewed Item", new Properties());

// Sent to all destinations, except Mixpanel
Analytics.with(context).track("Purchased Item", new Properties(), new Options().setIntegration("Mixpanel", false));

// Sent only to Google Analytics and Countly
Analytics.with(context).track("Purchased Item", new Properties(), new Options().setIntegration(Options.ALL_INTEGRATIONS_KEY, false).setIntegration("Countly", true).setIntegration("Google Analytics", true));
```

If you build your own instance of the client, you can also specify a default options object that will be used for each call. In the snippet below, _NONE_ of the analytics events will be sent to Heap.

```java
// Disable Heap destination
Options defaultOptions = new Options().setIntegration("Heap", false);

// Attach the options to our client
Analytics analytics = new Analytics.Builder(context, writeKey).defaultOptions(defaultOptions).build();
// Set the client as a global singleton so it can be called from anywhere
Analytics.setSingletonInstance(analytics);

// Now any calls made with this Analytics client won't be sent to Heap
Analytics.with(context).track("Viewed Item", new Properties());
```

Notice that in the first snippet, we used an Enum to disable the destination, but in the second snippet, we used a String. In general, we recommend, using the Enum method for Device-mode destinations (this way you get type safety, and don't accidentally disable "GoogleAnalytics" instead of "Google Analytics"), and pass in a String for controlling the behavior of server side destinations.

destination flags are **case sensitive** and match [the destination's name in the docs](/docs/destinations) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**Note:** Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

## Context

Context is a dictionary of extra information you can provide about a specific API call.  You can add any custom data to the context dictionary that you'd like to have access to in the raw logs. Some keys in the context dictionary have semantic meaning and will be collected for you automatically, e.g. the information about the device the user is on.

```java
AnalyticsContext analyticsContext = Analytics.with(context).getAnalyticsContext();
analyticsContext.putValue(...).putReferrer(...).putCampaign(...);
```

You can read more about these [special fields](/docs/spec/common/#context).

If you'd prefer to opt out of automatic data collection, simply clear the context right after initializing the client. It's important to do this _BEFORE_ sending any events.

```java
Analytics analytics = new Analytics.Builder(context, writeKey).defaultOptions(defaultOptions).build();
AnalyticsContext context = analytics.getContext();
context.clear();
```

## AnonymousId

You can retrieve the `anonymousId` set by the library by using:

```java
Analytics.with(context).getAnalyticsContext().traits().anonymousId()
```

## Reset

The `reset` method clears the SDK's internal stores for the current user and group. This is useful for apps where users can log in and out with different identities over time.

Clearing all information about the user is as simple as calling:
```java
Analytics.with(context).reset()
```

Events queued on disk are not cleared and are uploaded the next time the app starts.

> **Note**: Each time you call `reset`, a new AnonymousId is generated the next time the app is opened, which can impact the number of Monthly Tracked Users (MTUs) you process.

## Debugging

If you run into any issues while using the Android library, we recommend turning on logging to help us trace the issue. The default singleton instance will have logging turned on if your application is in debug mode. If you're using a custom instance, simply attach a `LogLevel` to the `Builder`.

```java
Analytics analytics = new Analytics.Builder(context, writeKey).logLevel(LogLevel.VERBOSE)...build();
```

You can choose to disable logging completely (`LogLevel.NONE`), turn on basic logging for the SDK (`LogLevel.BASIC`), turn on basic logging for Device-mode destination (`LogLevel.INFO`), or simply log everything (`LogLevel.VERBOSE`). We recommend turn logging off in production modes of your app. Logging also helps you see how long destinations take to complete their calls and discover bottlenecks.


## Proxy HTTP Calls

You can point the Android SDK to your own hosted [proxy](https://github.com/segmentio/segment-proxy) of the Segment API. This will run the HTTP traffic for the Segment API through the proxy.

```java
Analytics analytics = new Analytics.Builder(this, ANALYTICS_WRITE_KEY) //
        .connectionFactory(new ConnectionFactory() {
          @Override protected HttpURLConnection openConnection(String url) throws IOException {
            String path = Uri.parse(url).getPath();
            // Replace YOUR_PROXY_HOST with the address of your proxy, e.g. https://aba64da6.ngrok.io.
            return super.openConnection("YOUR_PROXY_HOST" + path);
          }
        })
        .build();
```

## Automatic Screen Tracking

Our SDK can automatically instrument screen calls. It uses the label of the activity declared in the manifest as the screen name. Fragments and views do not trigger screen calls. However you can do so manually with the `screen` method directly.

```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .recordScreenViews()
  .build();
```

## Stats

Local device stats help you quickly see how many events you've sent us, the average time taken for bundled destinations to run, etc.

```java
StatsSnapshot snapshot = Analytics.with(context).getSnapshot();
log(snapshot.integrationOperationAverageDuration);
log(snapshot.flushCount);
```

## Bleeding Edge Releases

We publish stable releases every second Wednesday, when we tag and release the `master` branch.

After releasing, we also merge the `dev` branch merged into `master`. In general, code will be available on `master` for two weeks before being tagged as a stable release. During this period, `master` is published as a snapshot — the equivalent of bleeding edge releases. We recommend using the snapshot version to try out upcoming features and fixes that have not been published yet. Simply add the snapshots repo to your repository and Gradle will pull in the latest snapshot build.

```
repositories {
  mavenCentral()
  maven { url 'https://oss.sonatype.org/content/repositories/snapshots/' }
}
```

## Opt-out

Depending on the audience for your app (e.g. children) or the countries where you sell your app (e.g. the EU), you may need to offer the ability for users to opt-out of analytics data collection inside your app. You can turn off ALL destinations including Segment itself:

```
public void optOut(boolean optOut) {
  this.optOut.set(optOut);
}
```

Set the opt-out status for the current device and analytics client combination. This flag is
persisted across device reboots, so you can simply call this once during your application
(such as in a screen where a user can opt out of analytics tracking).

## Middlewares

Middlewares are a powerful mechanism that can augment the events collected by the SDK. A middleware is a simple function that is invoked by the Segment SDK and can be used to monitor, modify or reject events. Middlewares are available on analytics-android 4.3.0 and higher.

You can register middlewares during construction with the `.middleware` method on the builder. Middlewares are invoked for all events, including automatically tracked events, and external event sources like Adjust and Optimizely. This offers you the ability the customize those messages to fit your use case even if the event was sent outside your source code.

For example, you might want to record the [device year class](https://github.com/facebook/device-year-class) with your events. Previously, you would have to do this everywhere you trigger an event with the Segment SDK. With middlewares, you can do this in a single place.

```java
Analytics analytics = new Analytics.Builder(getApplicationContext(), ANALYTICS_WRITE_KEY)
    .middleware(new Middleware() {
      @Override
      public void intercept(Chain chain) {
        // Get the original payload.
        BasePayload payload = chain.payload();

        // Set the device year class on the context object.
        int year = YearClass.get(getApplicationContext());
        Map<String, Object> context = new LinkedHashMap<>(payload.context());
        context.put("device_year_class", year);

        // Build our new payload.
        BasePayload newPayload = payload.toBuilder()
            .context(context)
            .build();

        // Continue with the new payload.
        chain.proceed(newPayload);
      }
    })
    .build();
```

Building on the earlier example, maybe you don't want to collect any events for older devices. To do this, you can register a middleware that will reject events for older devices.

```java
Analytics analytics = new Analytics.Builder(getApplicationContext(), ANALYTICS_WRITE_KEY)
        .middleware(deviceClassMiddleware) // From earlier example.
        .middleware(new Middleware() {
          @Override
          public void intercept(Chain chain) {
            // Get the original payload.
            BasePayload payload = chain.payload();

            // Check the device year class.
            AnalyticsContext context = payload.context();
            int year = context.getInt("device_year_class", 2009);

            // Reject the event if the year class is < 2012.
            if (year < 2012) {
              return;
            }

            // Continue with the event otherwise.
            chain.proceed(payload);
          }
        })
        .build();
```

The key thing to observe here is that the output produced by the first middleware feeds into the second. This allows you to chain and compose independent middlewares!


## Sending Data to destinations

There are two ways to send data to your analytics services through this library:

1. Through the Segment servers
2. Directly from the device using bundled SDK's

**Note:** Refer to the specific destination's docs to see if your tool must be bundled in the app or sent server-side.

### Cloud-Mode in Android

When an destination's SDK is not packaged, but it is enabled from your dashboard, the request goes through the Segment REST API, and is routed to the service's server-side API as [described here](/docs/destinations/#connection-modes).

### Packaging Device-mode destination SDKs

By default, our `analytics` artifact does not package Device-mode destinations.

We recommend using device-mode destinations on a need-to-use basis to reduce the size of your application, and to avoid running into the dreaded 65k method limit.

To package Device-mode destinations, first add the dependencies you need. You can find these in our app when you open the destination for your source.

```
compile('com.segment.analytics.android.integrations:google-analytics:+') {
  transitive = true
}
compile('io.branch.segment.analytics.android.integrations:library:+') {
  transitive = true
}
```

After adding the dependency, you must register the destination with our SDK.

```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .use(GoogleAnalyticsIntegration.FACTORY)
  .use(BranchIntegration.FACTORY)
  ...
  .build();
```

## Anonymizing IP

Segment automatically derives and sets the IP address for client-side (iOS, Android, Analytics.js and Xamarin) events. It is not collected on the device itself, but instead is filled in by our servers when they receive a message. Our servers don't record the IP address of the client for libraries if the `context.ip` field is already set.

If you do not want us to record your tracked users' IP in destinations and S3, you can set your event's `context.ip` field to `0.0.0.0`.

## Migrating to v4

**Note:** If you are using version 2 of the Android SDK, you'll have to make few changes to get up and running with [version 3](/docs/sources/mobile/android/#migrating-to-v4).

In version 3, adding a Device-mode destination looks like this:

```
compile('com.segment.analytics.android:analytics-core:+') {
  transitive = true
}

// Add other dependencies as you want here
compile('com.segment.analytics.android:analytics-integration-google-analytics:+') {
  transitive = true
}
compile('com.segment.analytics.android:analytics-integration-mixpanel:+') {
  transitive = true
}
compile('com.segment.analytics.android:analytics-integration-quantcast:+') {
  transitive = true
}
```

or, if you wanted to use all Device-mode destinations:

```
compile('com.segment.analytics.android:analytics:+') {
  transitive = true
}
```

In version 4, the `analytics-core` artifact is not available any longer. It has been renamed to `analytics` (which previously packaged all Device-mode destinations). Version 4 of `analytics` only includes the Segment destination. Which means, to package a Device-mode destination, you must manually add that dependency.

```
compile 'com.segment.analytics.android:analytics:+'

compile('com.segment.analytics.android.integrations:google-analytics:1.0.0') {
  transitive = true
}
compile('io.branch.segment.analytics.android.integrations:library:1.0.0-RELEASE') {
  transitive = true
}
```

In addition to adding a dependency, you must point our SDK to the destination.

```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .use(GoogleAnalyticsIntegration.FACTORY)
  .use(BranchIntegration.FACTORY)
  ...
  .build();
```

## FAQ

### What is the latest version of the library?

The library is published to [Maven Central](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22com.segment.analytics.android%22%20AND%20a%3A%22analytics%22) where you can see all the published releases.

### Where is the changelog for the library?

We publish a changelog in the [Github repository](https://github.com/segmentio/analytics-android/blob/master/CHANGELOG.md), detailing the changes made in each release.

### Can I use the library with Maven?

Yes! You can use our library with Maven or any custom build system since the `core` SDK is simply a JAR.
```xml
<dependency>
    <groupId>com.segment.analytics.android</groupId>
    <artifactId>analytics</artifactId>
    <version>LATEST</version>
</dependency>
```

### How big is the Segment SDK?

The core Segment SDK is extremely lightweight! It contains just under 1k methods, the JAR weighs in at 123kb and the dex size is 113kb.

### How can I easily swap out debugging and production keys?

This is trivial if you're using Gradle and build flavors. Simply provide an alternate `analytics.xml` for each configuration with different keys in each.

For other cases, you can also construct custom instances of the client, so you can pass in a different key for it. Set it as the singleton instance, and use the same API everywhere else.

```java
class MyApp extends Application {
  @Override public void onCreate() {
    Analytics analytics;
    if(BuildConfig.DEBUG) {
      analytics = new Analytics.Builder(this, debugWriteKey)...build();
    } else {
      analytics = new Analytics.Builder(this, releaseWriteKey)...build();
    }
    Analytics.setSingletonInstance(analytics); // Must be called before any calls to Analytics.with(context)

    // Now Analytics.with will return the custom instance
    Analytics.with(this).track("App Launched");
  }
}
```

### How does the library queue API calls?

Our library queues API calls and uploads them in batches so that we don't drain your user's battery life by making a network request for each event tracked.

As soon as you send as an event, we'll save it to disk, and if queue size reaches your specified maximum queue size (which is 20 by default), we flush the queue and upload all the events in a single batch. Since the data is persisted right away, there is no data loss even if the app is killed, or the operating system crashes.

The queue behavior may differ for Device-mode destinations. For example, Mixpanel's SDK queues events and then flushes them when the app goes to the background only.

This is why even if you see events in the debugger, the Device-mode destination may not show them on their dashboards yet, simply because their mobile SDK may still have them queued. The opposite may also happen, that we have some events queued so they haven't shown up in the debugger, but the Device-mode destination has already sent the events to their servers.

### Will my events be delivered even if the app is killed?

We use a persistent disk queue, so even when the app is killed, the events stay on disk. We'll simply read them from disk and upload the events the next time the app starts. Our queue works on top of [Tape](http://square.github.io/tape/), which is designed to even survive process and system crashes.

We save up to 1000 calls on disk, and these never expire.

### I need to use the SDK on an older version of Android not supported by your library!

Our Android library has support for back to API level 14 (Android 4.0). You should [consider](https://developer.android.com/about/dashboards/index.html#Platform) it too! If you can't do this for your own application, there are three options we've recommended to users:

1. Use an older version of the library that does support your minimum requirements. Keep in mind that there won't be any updates or bug fixes to those versions, but we do still have clients still using old versions of the library in production.
2. Skip analytics for users on older devices - you can wrap calls to our SDK in a Build.VERSION check.
3. Write your own SDK. You can still use most of the tools on Segment via our [HTTP API](/docs/sources/server/http/). You can use either our Android or [Java source](https://github.com/segmentio/analytics-java) to get a quick headstart.


### How can I use an destination specific feature, e.g. Mixpanel's push notifications?

If you're using Device-mode for a mobile destination, you can always access features from that tool's native SDK.

To make sure you use the same instance of these destinations as we do, you can register a listener that notifies you when the destinations are ready. This will be called synchronously if the destinations are notified, and asynchronously if the destinations aren't yet ready.

```java
analytics.onIntegrationReady("Crittercism", new Callback() {
  @Override public void onReady(Object instance) {
    // Crittercism uses static methods only, so the instance returned is null.
    Crittercism.leaveBreadcrumb();
  }
});
analytics.onIntegrationReady("Mixpanel", new Callback() {
  @Override public void onReady(Object instance) {
    MixpanelAPI mixpanelAPI = (MixpanelAPI) instance;
    mixpanelAPI.clearSuperProperties();
  }
});
```

For the destinations that return `Void`, they simply use a shared instance. You can call into the SDK directly. With this API, you're guaranteed that they've been initialized first, and if you ever decide to change the settings for the destination on our dashboard, they'll be reflected here.

```java
analytics.onIntegrationReady(BundledIntegration.FLURRY, new Callback() {
  @Override public void onReady(Object instance) {
    // Flurry uses static methods only, so the instance returned is null.
    Flurry.setLogEnabled(true);
  }
});
```

### Why is my callback not being invoked?

If you're using the destination callbacks described above, and don't receive a callback, check your proguard configuration. Any easy way to verify that Proguard is the issue is to disable it completely for a run and see if the callbacks is invoked.

### Why is Google Analytics not receiving crash reports?

This is a known bug https://code.google.com/p/analytics-issues/issues/detail?id=443 and is being worked on by Google. We recommend using alternatives like Bugsnag or Crittercism in the meantime.

### How should I configure Proguard?

For our SDK, you should add `-keep class com.segment.analytics.** { *; }` to your proguard configuration. You should also look up any proguard configurations recommended by each of the Device-mode destinations on their respective docs and websites.

### How should I use Outbound's push notifications?

Since Outbound isn't a Device-mode destination, you'll have to set it up manually.

First, you'll need to set up the [GCM client as described in the instructions](https://developer.android.com/google/gcm/client.html).

Our server's will look for `context.device.token` key to send to Outbound. Once you have the registration ID from the step above, simply set it on the context. (This convenience method was added in versino 2.1.6).
`analytics.getContext().putDeviceToken(registrationId);`

The entire code flow looks a bit like this:
```java
String registrationId = loadRegistrationId(); // look up a cached value
if(registrationId == null) {
  registrationId = register(SENDER_ID); // using GoogleCloudMessaging
  save(registrationId); // save the registration ID
}
analytics.getContext().putDeviceToken(registrationId);
```

### Migrate from v2 to v3

__NOTE__: Version 3 of the SDK is now replaced by version 4. See the section below on upgrading.
If you are already using version 2 of the Android SDK, you'll have to make few changes to get up and running with version 3.

In version 3, we've organized the destinations to be make the core SDK even leaner and smaller. This is what the old setup looked like:

```java
compile('com.segment.analytics.android:analytics-core:+') {
  transitive = true
}

// Add other dependencies as you want here
compile 'com.google.android.gms:play-services:+'
compile 'com.mixpanel.android:mixpanel-android:+@aar'
compile files('libs/QuantcastAndroidSdk.jar')
```

In the new version, instead of adding the destinations directly, simply add our destination modules as a dependency instead. This also ensures that the version of the Device-mode destination you're using matches the one we depend on.

```java
compile('com.segment.analytics.android:analytics-core:+') {
  transitive = true
}

// Add other dependencies as you want here
compile('com.segment.analytics.android:analytics-integration-google-analytics:+') {
  transitive = true
}
compile('com.segment.analytics.android:analytics-integration-mixpanel:+') {
  transitive = true
}
compile('com.segment.analytics.android:analytics-integration-quantcast:+') {
  transitive = true
}
```

Earlier, you could control the debugging behaviour with a boolean flag. In version 3, this is replaced by the more powerful [`LogLevel`](/docs/libraries/android/#debugging) Enum, that lets you not only control the logging behavior of our SDK, but also for Device-mode destinations.

Version 2 of the SDK also let you customize the behaviour of the SDK by providing resource values in XML. Version 3 ignores these custom options from XML to simplify behaviour and improve performance. The recommended way to customize the Analytics client is to use the [Builder](/docs/libraries/android/#customizing-the-client) methods instead.

### Do you support Phonegap/Cordova?

Yep! You can use our browserify'd [analytics-node](https://github.com/segmentio/analytics-node) package just like any other client-side JavaScript library.

### How do you handle Unique Identifiers?

A key component of any analytics platform is consistently and accurately identifying users. Some kind of ID must be assigned and persisted on the device so that user actions can be effectively studied. This is especially important for funnel conversion analysis and retention analysis.

Naturally the Analytics SDK needs a unique ID for each user. The very first time an app is launched, our SDK will generated a UUID and save it on disk. This is used as the `anonymousId` and stays constant for the user on the device. If you want to create a new user on the same device, call `reset` on the Analytics client.

Our SDK also collects the [Advertising ID](https://developer.android.com/google/play-services/id.html) provided by Play Services. Make sure the Play Services Ads library is included as a dependency for your application. This is the ID that should be used for advertising purposes. This value will be set to `context.device.advertisingId`.

We also collect the [Android ID](http://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID) as `context.device.id`. Some destinations rely on this field being the Android ID, so take care if you choose to override the default value.

## Troubleshooting

### No events in my debugger

1. Verify you have followed all [Getting Started](/docs/sources/mobile/android/#getting-started) steps
2. Verify you have entered the correct writeKey for your source
    - If the writeKey you have entered is something other than a string or an empty string your app may crash
    - If the writeKey you have entered is a valid form but not the correct writeKey for your specific source, you will not see an error response. Data will be accepted by Segment but not able to be correctly routed to your source (debugger).
3. [Enable logging](/docs/sources/mobile/android/#debugging) to confirm if call is being sent to Segment


### No events in my destinations
1. Verify that your destination is enabled
2. Verify your destination credentials entered in your Segment dashboard are correct
3. Make sure the destination can accept what you're sending:
   - Does the integration have device-mode/cloud-mode support? Confirm you are sending via the correct connection mode.
   - Does the destination accept the type of call you are sending? Not all destinations accept all calls: page, track, etc.
4. If you are still not seeing data in your destination, continue debugging based on which type of connection mode you are using.


### Debugging Device-mode Destinations

If you are using device-mode, you should see the value of that integration set to `false` in the `integrations` object. That means that the data is being sent from the device directly to the destination SDK, and not through Segment's servers. This is expected if you chose to use a device-mode destination's SDK with Segment's during installation.

Enable verbose [logging](/docs/sources/mobile/android/#debugging) and trigger the call in question. You should see a call to Segment triggered as well as to the partner SDK.  It will show you exactly which partner method was invoked and the arguments it was invoked with!

### Debugging Cloud-mode Destinations

Look at the raw JSON in your debugger.  Does the call look like what you expect?

Read through [the docs for that destination](docs/connections/destinations/) to see expected event format, behavior and caveats for that destination.


### Still having issues?

Feel free to [reach out to us](/help) with the following information:

- The version of our SDK you are using
- Whether you are using device- or cloud-smode
- Logs of the call in question
- Screenshots of the event in the Segment debugger
- Screenshots of what you are seeing in your destination
