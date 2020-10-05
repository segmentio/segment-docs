---
title: Analytics for Android
strat: android
---


<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

	- [Getting Started](#getting-started)
		- [About mobile connection modes](#about-mobile-connection-modes)
		- [Step 1: Install the Library](#step-1-install-the-library)
		- [Packaging SDKs for Device-mode destinations](#packaging-sdks-for-device-mode-destinations)
		- [Step 2. Initialize the Client](#step-2-initialize-the-client)
		- [*Optional* Customizing the Client](#optional-customizing-the-client)
		- [Step 3. Add Permissions](#step-3-add-permissions)
	- [Identify](#identify)
	- [Track](#track)
	- [Formatting Order Completed Events](#formatting-order-completed-events)
	- [Screen](#screen)
	- [Group](#group)
	- [Alias](#alias)
	- [Selecting Destinations](#selecting-destinations)
	- [Context](#context)
	- [AnonymousId](#anonymousid)
	- [Reset](#reset)
	- [Debugging](#debugging)
	- [Proxy HTTP Calls](#proxy-http-calls)
	- [Automatic Screen Tracking](#automatic-screen-tracking)
	- [Stats](#stats)
	- [Bleeding Edge Releases](#bleeding-edge-releases)
	- [Opt-out](#opt-out)
	- [Sending Data to destinations](#sending-data-to-destinations)
		- [Cloud-Mode in Android](#cloud-mode-in-android)
		- [Packaging device-mode destination SDKs](#packaging-device-mode-destination-sdks)
	- [Anonymizing IP](#anonymizing-ip)
		- [Migrating from v2 to v3](#migrating-from-v2-to-v3)
	- [Migrating to v4](#migrating-to-v4)

<!-- /TOC -->


[![Maven Central](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.android/analytics/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.android/analytics)

Analytics for Android makes it simple to send your data to any tool without having to learn, test or implement a new API every time.

All of Segment's client sources are open-source, so you can [view Analytics for Android on GitHub](https://github.com/segmentio/analytics-android), or check out Segment's other [browser and server-side sources](/docs/connections/sources/catalog/) too.

Want to stay updated on releases? Subscribe to the [release feed](https://github.com/segmentio/analytics-android/releases.atom).

Analytics for Android only supports any Android device running API 14 (Android 4.0) and higher. This includes Amazon Fire devices.

> success ""
> In addition to the documentation here, you can also [read the Javadocs for all versions of Analytics-Android on Javadoc.io](https://javadoc.io/doc/com.segment.analytics.android/analytics/latest/index.html).

## Getting Started

### About mobile connection modes

{% include content/mobile-cmodes.md %}

{% include components/media-icon.html href="https://github.com/segmentio/analytics-android/tree/master/analytics-samples/analytics-sample" icon="media/icon-guides.svg" title="Android Test Apps" content="Segment maintains test apps for the Android mobile library. Find them here." %}


### Step 1: Install the Library


The recommended way to install the library for Android is with a build system like Gradle. This makes it simple to upgrade versions and add destinations. The library is distributed using [Maven Central](http://maven.org/). Simply add the `analytics` module to your `build.gradle`:

```java
dependencies {
  implementation 'com.segment.analytics.android:analytics:4.+'
}
```

### Packaging SDKs for Device-mode destinations

To keep the Analytics-Android SDK lightweight, the `analytics` artifact only installs the Segment destination. This means that all your data is sent using Segment's servers to any tools you've enabled with server-side-compatible destinations.

[As described here](/docs/connections/destinations/#connection-modes), some destinations require or offer **Device-mode**. If that's the case, you'll need to take package the destination SDK, which might [require some additional steps](#packaging-device-mode-destination-sdks).

Now that the SDK is installed and set up, you're ready to...

### Step 2. Initialize the Client

We recommend initializing the client in your `Application` subclass.  You'll need your [Write Key](/docs/connections/find-writekey/).

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
- This only installs the Segment destination. This means that all your data is sent server-side to tools.  To bundle additional destinations client-side, you'll need to take some additional steps as [shown here](/docs/connections/sources/catalog/libraries/mobile/android/#packaging-sdks-for-device-mode-destinations).

### *Optional* Customizing the Client

The entry point of the library is through the `Analytics` class. As you might have seen in the quickstart, here's how you initialize the Analytics client with it's defaults.

```java
Analytics analytics = new Analytics.Builder(context, writeKey).build();
```

The `Analytics.Builder` class lets you customize settings for the Analytics client, including things like the flush interval and packaging Device-mode destinations. Refer to the Javadocs for details on customizable parameters.

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

Once you initialize an Analytics client, you can safely call any of its tracking methods from any thread. These events are dispatched asynchronously to the Segment servers and to any Device-mode destinations.

**Note:** You should only ever initialize _ONE_ instance of the Analytics client. These are expensive to create and throw away, and in most cases, you should stick to Segment's singleton implementation to make using the SDK easier.

### Step 3. Add Permissions

Ensure that the necessary permissions are declared in your application's `AndroidManifest.xml`.

```xml
 <!-- Required for internet. -->
<uses-permission android:name="android.permission.INTERNET"/>
```

## Identify

> note ""
> **Good to know**: For any of the different methods described in this doc, you can replace the properties and traits in the code samples with variables that represent the data collected.

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
Analytics.with(context).identify(new Traits().putEmail("mbolton@example.com"));
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

To get started, the Analytics-Android SDK can automatically tracks a few key common events using the Segment [Native Mobile Spec](/docs/connections/spec/mobile/), such as the `Application Installed`, `Application Updated` and `Application Opened`. You can enable this option during initialization.

You might also want to track events that indicate success for your mobile app, like **Signed Up**, **Item Purchased** or **Article Bookmarked**. Segment recommends tracking just a few important events. You can always add more later!

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

Segment's Android library provides several helper methods so you can easily construct both properties objects and products lists so your Order Completed events conform to the Segment [ecommerce specification](https://segment.com/docs/connections/spec/ecommerce/v2/). Here's a code example:

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

Find details on **best practices in event naming** as well as the **Track method payload** in the [Segment Track call spec](/docs/connections/spec/track/).

## Screen

The [Screen](/docs/connections/spec/screen/) method lets you you record whenever a user sees a screen of your mobile app, along with optional extra information about the page being viewed.

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

Find details on the Screen payload in [the Segment Screen call spec](/docs/connections/spec/screen/).

## Group

Group calls let you associate an [identified user](/docs/connections/sources/catalog/libraries/server/java/#identify) user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

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

Find more details about the Group method, including the Group call payload, in the [Segment Group call spec](/docs/connections/spec/group/).

## Alias

Alias is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* Segment destinations, such as Mixpanel or Kissmetrics.

[Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) used the Alais call to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

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

For more details about `alias`, including the **`alias` call payload**, check out [the Segment Alais call spec](/docs/connections/spec/alias/).

Note that the `previousId` is the value passed in as the `userId`, which Segment cached after you made an `identify` call. Segment passes that value as the `previousId` when you call `alias` and pass in a `newId`. If you have not called `identify`, the `previousId` is set to the `anonymousId`.

---

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an `options` object that allows you to turn certain destinations on or off. By default all destinations are enabled. (In Segment's other libraries, you could do this in the list of `integrations` inside the `options` object.)

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

destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**Note:** Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

## Context

Context is a dictionary of extra information you can provide about a specific API call.  You can add any custom data to the context dictionary that you'd like to have access to in the raw logs. Some keys in the context dictionary have semantic meaning and will be collected for you automatically, e.g. the information about the device the user is on.

```java
AnalyticsContext analyticsContext = Analytics.with(context).getAnalyticsContext();
analyticsContext.putValue(...).putReferrer(...).putCampaign(...);
```

You can read more about these [special fields](/docs/connections/spec/common/#context).

To alter data specific to the device object you can use the following:

```java
AnalyticsContext analyticsContext = Analytics.with(context).getAnalyticsContext();
analyticsContext.device().putValue("advertisingId", "1");
```

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

Local device stats help you quickly see how many events you sent to Segment, the average time taken for bundled destinations to run, and similar metrics.

```java
StatsSnapshot snapshot = Analytics.with(context).getSnapshot();
log(snapshot.integrationOperationAverageDuration);
log(snapshot.flushCount);
```

## Bleeding Edge Releases

We publish stable releases every second Wednesday, when we tag and release the `master` branch.

After releasing, we also merge the `dev` branch merged into `master`. In general, code will be available on `master` for two weeks before being tagged as a stable release. During this period, `master` is published as a snapshot — the equivalent of bleeding edge releases. We recommend using the snapshot version to try out upcoming features and fixes that have not been published yet. Simply add the snapshots repo to your repository and Gradle will pull in the latest snapshot build.

```java
repositories {
  mavenCentral()
  maven { url 'https://oss.sonatype.org/content/repositories/snapshots/' }
}
```

## Opt-out

Depending on the audience for your app (e.g. children) or the countries where you sell your app (e.g. the EU), you may need to offer the ability for users to opt-out of analytics data collection inside your app. You can turn off ALL destinations including Segment itself:

```java
public void optOut(boolean optOut) {
  this.optOut.set(optOut);
}
```

Set the opt-out status for the current device and analytics client combination. This flag is
persisted across device reboots, so you can simply call this once during your application
(such as in a screen where a user can opt out of analytics tracking).

## Sending Data to destinations

There are two ways to send data to your analytics services through this library:

1. Through the Segment servers
2. Directly from the device using bundled SDK's

**Note:** Refer to the specific destination's docs to see if your tool must be bundled in the app or sent server-side.

### Cloud-Mode in Android

When a destination's SDK is not packaged, but it is enabled from your dashboard, the request goes through the Segment REST API, and is routed to the service's server-side API as [described here](/docs/connections/destinations/#connection-modes).

### Packaging device-mode destination SDKs

By default, Segment's `analytics` artifact does not package Device-mode destinations.

We recommend using device-mode destinations on a need-to-use basis to reduce the size of your application, and to avoid running into the dreaded 65k method limit.

To package Device-mode destinations, first add the dependencies you need to your project. You can find these in the Segment app when you open the destination for your source.

```java
compile('com.segment.analytics.android.integrations:google-analytics:+') {
  transitive = true
}
compile('io.branch.segment.analytics.android.integrations:library:+') {
  transitive = true
}
```

After adding the dependency, you must register the destination with the Analytics-Android SDK.

```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .use(GoogleAnalyticsIntegration.FACTORY)
  .use(BranchIntegration.FACTORY)
  ...
  .build();
```

## Anonymizing IP

Segment automatically derives and sets the IP address for client-side (iOS, Android, Analytics.js and Xamarin) events. It is not collected on the device itself, but instead is filled in by Segment's servers when they receive a message. The Segment servers don't record the IP address of the client for libraries if the `context.ip` field is already set.

If you do not want us to record your tracked users' IP in destinations and S3, you can set your event's `context.ip` field to `0.0.0.0`.


### Migrating from v2 to v3

__NOTE__: Version 3 of the SDK is now replaced by version 4. See the section below on upgrading.
If you are already using version 2 of the Android SDK, you'll have to make few changes to get up and running with version 3.

In version 3, we've organized the destinations to be make the core SDK even leaner and smaller. This is what the old set up looked like:

```java
compile('com.segment.analytics.android:analytics-core:+') {
  transitive = true
}

// Add other dependencies as you want here
compile 'com.google.android.gms:play-services:+'
compile 'com.mixpanel.android:mixpanel-android:+@aar'
compile files('libs/QuantcastAndroidSdk.jar')
```

In the new version, instead of adding the destinations directly, simply add the Segment destination modules as a dependency instead. This also ensures that the version of the Device-mode destination you're using matches the one we depend on.

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

Earlier, you could control the debugging behaviour with a boolean flag. In version 3, this is replaced by the more powerful [`LogLevel`](/docs/connections/sources/catalog/libraries/mobile/android/#debugging) Enum, that lets you not only control the logging behavior of the Analytics-Android SDK, but also for Device-mode destinations.

Version 2 of the SDK also let you customize the behaviour of the SDK by providing resource values in XML. Version 3 ignores these custom options from XML to simplify behaviour and improve performance. The recommended way to customize the Analytics client is to use the [Builder](/docs/connections/sources/catalog/libraries/mobile/android/#optional-customizing-the-client) methods instead.

## Migrating to v4

**Note:** If you are using version 2 of the Android SDK, you'll have to make few changes to get up and running with [version 3](/docs/connections/sources/catalog/libraries/mobile/android/#migrating-to-v4).

In version 3, adding a Device-mode destination looks like this:

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

or, if you wanted to use all Device-mode destinations:

```java
compile('com.segment.analytics.android:analytics:+') {
  transitive = true
}
```

In version 4, the `analytics-core` artifact is not available any longer. It has been renamed to `analytics` (which previously packaged all Device-mode destinations). Version 4 of `analytics` only includes the Segment destination. Which means, to package a Device-mode destination, you must manually add that dependency.

```java
compile 'com.segment.analytics.android:analytics:+'

compile('com.segment.analytics.android.integrations:google-analytics:1.0.0') {
  transitive = true
}
compile('io.branch.segment.analytics.android.integrations:library:1.0.0-RELEASE') {
  transitive = true
}
```

In addition to adding a dependency, you must point the Analytics-Android SDK to the destination.

```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .use(GoogleAnalyticsIntegration.FACTORY)
  .use(BranchIntegration.FACTORY)
  ...
  .build();
```
