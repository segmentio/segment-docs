---
title: 'Analytics for Android'
strat: android
repo: analytics-android
id: wXNairW5xX
---
  Analytics for Android makes it easier for you to send data to any tool without having to learn, test or implement a new API every time.


Analytics for Android only supports any Android device running API 14 (Android 4.0) and higher. This includes Amazon Fire devices.

> info "Analytics-Kotlin"
> The Analytics-Kotlin library is in General Availability. You can use Analytics-Kotlin for [mobile](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/) or [server](/docs/connections/sources/catalog/libraries/server/kotlin) applications. If you'd like to upgrade to Analytics-Kotlin, see the [migration guide](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/migration/).

> success ""
> In addition to the documentation here, you can also [read the Javadocs for all versions of Analytics-Android on Javadoc.io](https://javadoc.io/doc/com.segment.analytics.android/analytics/latest/index.html).

## Analytics-Android and Unique Identifiers

One of the most important parts of any analytics platform is the ability to consistently and accurately identify users. To do this, the platform must assign and persist some form of identification on the device, so you can analyze user actions effectively. This is especially important for funnel conversion analysis and retention analysis.

Naturally the Analytics SDK needs a unique ID for each user. The very first time an Android app that uses Segment launches, the Segment SDK generates a UUID and saves it on the device's disk. This is used as the `anonymousId` and stays constant for the user on the device. To create a new user on the same device, call `reset` on the Analytics client.

The Segment SDK also collects the [Advertising ID](https://developer.android.com/google/play-services/id.html) provided by Play Services. Make sure the Play Services Ads library is included as a dependency for your application. This is the ID that should be used for advertising purposes. This value is set to `context.device.advertisingId`.

Segment also generates a unique ID by using the [DRM API](https://source.android.com/devices/drm) as `context.device.id`. Some destinations rely on this field being the Android ID, so be sure to double-check the destination's vendor documentation. If you choose to override the default value, make sure the identifier you choose complies with Google's [User Data Policy](https://support.google.com/googleplay/android-developer/answer/10144311). **Note:** If this ID didn't generate previously (for example, because the app was newly installed or updated from an older version), an empty string shows before the ID generation completes.

> warning ""
> **Note:** From `4.10.1`, Segment no longer collects the [Android ID](http://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID){:target="_blank"} to comply with Google's [User Data Policy](https://support.google.com/googleplay/android-developer/answer/10144311){:target="_blank"}. You may need to upgrade your Analytics-Android version and your device-mode destination versions to be compliant with Google Play policies.

## API call queuing in Analytics-Android

The Analytics-Android library queues API calls and uploads them in batches. This limits the number of network calls made, and helps save battery on the user's device.

When you send an event, the library saves it to disk. When the queue size reaches the maximum size you specify (20 by default), the library flushes the queue and uploads the events in a single batch. Since the data is saved immediately, it isn't lost even if the app is killed or the operating system crashes.

The queue behavior might differ for Device-mode destinations. For example, Mixpanel's SDK queues events and then flushes them only when the app goes to the background.

This is why even if you see events in the debugger, the Device-mode destination may not show them on their dashboards yet because they might still be in their mobile SDK's queue. The opposite may also happen: the Device-mode destination SDK might send events to its servers before Segment sends its queue, so events could show up in the destination's dashboard before they appear in the Segment debugger.

### Queue persistance in Analytics-Android

Analytics-Android uses a persistent disk queue, so the events persist even when the app is killed. On app restart, the library reads them from disk and uploads the events. The queue works on top of [Tape](http://square.github.io/tape/), which is designed to even survive process and system crashes.

Analytics-Android saves up to 1000 calls on disk, and these never expire.


## Getting Started

### About mobile connection modes

{% include content/mobile-cmodes.md %}

{% include components/reference-button.html href="https://github.com/segmentio/analytics-android/tree/master/analytics-samples/analytics-sample" icon="guides.svg" title="Android Test Apps" description="Segment maintains test apps for the Android mobile library. Find them here." %}

### Create an Android source

Before you start installing the Analytics-Android library, create an Android Source in Segment. This tells the Segment servers that you'll be sending them data from this type of source.

1. Go to the [Segment App](https://app.segment.com), and sign in to the Workspace you want to send your Android data to.
2. Click **Sources**, then **Add Source**
3. Select an Android source from the catalog and click **Add Source**.
4. Give the new source a name, and optionally any labels that might apply. Click **Add Source** to save the changes.

Once you save the source, go to the **Settings** tab and click **API Keys** in the left navigation. Find and write down your Write Key, as you'll need it later to set up your environment. The Write Key is how Segment knows that data coming from your app is really coming from you!

### Step 1: Install the Library

The easiest way to install the Analytics-Android library is using a build system like Gradle. This makes it simple to upgrade versions and add destinations. The library is distributed using [Maven Central](http://maven.org/). Just add the `analytics` module to your `build.gradle` file as in the example lines below:

```java
dependencies {
  implementation 'com.segment.analytics.android:analytics:4.+'
  }
```

#### Packaging SDKs for Device-mode destinations

To keep the Analytics-Android SDK lightweight, the `analytics` artifact only installs the Segment destination. This means that all your data is sent using Segment's servers to any tools you've enabled with cloud-mode-compatible destinations.

[As described here](/docs/connections/destinations/#connection-modes), some destinations require or offer **Device-mode** SDKs. for these destinations, you must package the destination SDK, which might [require some additional steps](#packaging-device-mode-destination-sdks).

Now that the SDK is installed and set up, you're ready to...

### Step 2. Initialize the Client

We recommend initializing the client in your `Application` subclass.  You'll need your [Segment Write Key](/docs/connections/find-writekey/) for your Android Source.

{% codeexample %}
{% codeexampletab Java %}
```java
// Create an analytics client with the given context and Segment write key.
Analytics analytics = new Analytics.Builder(context, YOUR_WRITE_KEY)
  .trackApplicationLifecycleEvents() // Enable this to record certain application events automatically!
  .recordScreenViews() // Enable this to record screen views automatically!
  .build();

// Set the initialized instance as a globally accessible instance.
Analytics.setSingletonInstance(analytics);
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
// Create an analytics client with the given context and Segment write key.
val analytics = Analytics.Builder(context, YOUR_WRITE_KEY)
  .trackApplicationLifecycleEvents() // Enable this to record certain application events automatically!
  .recordScreenViews() // Enable this to record screen views automatically!
  .build()

// Set the initialized instance as a globally accessible instance.
Analytics.setSingletonInstance(analytics);
```
{% endcodeexampletab %}
{% endcodeexample %}

**Notes**:
- You can automatically track lifecycle events such as `Application Opened`, `Application Installed`, `Application Updated` to start quickly with core events. These are optional, but highly recommended.
- This only installs the Segment destination. This means that all your data is sent server-side to tools.  To bundle additional destinations client-side, you'll need to take some additional steps as [shown here](/docs/connections/sources/catalog/libraries/mobile/android/#packaging-sdks-for-device-mode-destinations).

### Customize the Client (Optional)

The entry point of the library is through the `Analytics` class. As you might have seen in the quickstart, here's how you initialize the Analytics client with it's defaults.

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics analytics = new Analytics.Builder(context, writeKey).build();
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
val analytics = Analytics.Builder(context, writeKey).build()
```
{% endcodeexampletab %}
{% endcodeexample %}

The `Analytics.Builder` class lets you customize settings for the Analytics client, including things like the flush interval and packaging Device-mode destinations. Refer to the Javadocs for details on customizable parameters.

We also maintain a global default instance which is initialized with defaults suitable to most implementations.

{% codeexample %}
{% codeexampletab Java %}
```java
// You can also register your custom instance as a global singleton.
Analytics.setSingletonInstance(analytics);
Analytics.with(context).track(...);
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
// You can also register your custom instance as a global singleton.
Analytics.setSingletonInstance(analytics)
Analytics.with(context).track(...)
```
{% endcodeexampletab %}
{% endcodeexample %}

In general, Segment recommends that you use the Builder method because it provides the most flexibility. Remember you can call `Analytics.setSingletonInstance` only _ONCE_, so it's best to put the initialization code inside your custom Application class.

{% codeexample %}
{% codeexampletab Java %}
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
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
class MyApp : Application() {
  override fun onCreate() {
    val analytics = Analytics.Builder(context, writeKey).build()
    Analytics.setSingletonInstance(analytics)

    // Safely call Analytics.with(context) from anywhere within your app!
    Analytics.with(context).track("Application Started")
  }
}
```
{% endcodeexampletab %}
{% endcodeexample %}

Once you initialize an Analytics client, you can safely call any of its tracking methods from any thread. These events are dispatched asynchronously to the Segment servers and to any Device-mode destinations.

> warning ""
> **Note:** You should only ever initialize _ONE_ instance of the Analytics client. These are expensive to create and throw away, and in most cases, you should stick to Segment's singleton implementation to make using the SDK easier.

### Step 3. Add Permissions

Ensure that the necessary permissions are declared in your application's `AndroidManifest.xml`.

```xml
 <!-- Required for internet. -->
<uses-permission android:name="android.permission.INTERNET"/>
```

## Data Collection - The Basic Segment API calls

The Segment API calls include:
- [Identify](#identify)
- [Track](#track)
- [Screen](#screen)
- [Group](#group)
- [Alias](#alias)

### Identify

> note ""
> **Good to know**: For any of the different methods described in this doc, you can replace the properties and traits in the code samples with variables that represent the data collected.

Identify calls let you tie a user to their actions, and record traits about them.  It includes a unique User ID and any optional traits you know about them.


Example `identify` call:

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics.with(context).identify("a user's id", new Traits().putName("John Doe"), null);
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
Analytics.with(context).identify("a user's id", Traits().putName("John Doe"), null)
```
{% endcodeexampletab %}
{% endcodeexample %}

The example call below sets the `anonymousId` to a custom value of `test_anonymousId`.

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics.with(context).identify(new Traits().putValue("anonymousId","test_anonymousId"));
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
Analytics.with(context).identify(Traits().putValue("anonymousId","test_anonymousId"))
```
{% endcodeexampletab %}
{% endcodeexample %}

Segment recommends that you make an Identify call once when the user's first creates an account, and only using the Identify call later when their traits change. Segment remembers the previous userIDs and merges the new traits with the old ones.

{% codeexample %}
{% codeexampletab Java %}
```java
// Initially when you only know the user's name
Analytics.with(context).identify(new Traits().putName("Michael Bolton"));

// Sometime later in your app when the user gives you their email
Analytics.with(context).identify(new Traits().putEmail("mbolton@example.com"));
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
// Initially when you only know the user's name
Analytics.with(context).identify(Traits().putName("Michael Bolton"))

// Sometime later in your app when the user gives you their email
Analytics.with(context).identify(Traits().putEmail("mbolton@example.com"))
```
{% endcodeexampletab %}
{% endcodeexample %}

Remember, you can replace the properties and traits in the code samples with variables that represent the data you actually collected.

The Identify call has the following fields:

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

The Android library currently automatically sends the `userId` and `anonymousId` as `traits`. Additionally, `traits` are sent in the `context.traits` field with every message.

### Track

The Track call lets you record the actions your users perform. Every action triggers what we call an "event", which can also have associated properties.

To get started, the Analytics-Android SDK can automatically tracks a few key common events using the Segment [Native Mobile Spec](/docs/connections/spec/mobile/), such as the `Application Installed`, `Application Updated` and `Application Opened`. You can enable this option during initialization.

You might also want to track events that indicate success for your mobile app, like **Signed Up**, **Item Purchased** or **Article Bookmarked**. Segment recommends tracking just a few important events. You can always add more later!

Example `track` call:

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .trackApplicationLifecycleEvents()
  .build();

Analytics.with(context).track("Product Viewed", new Properties().putValue("name", "Moto 360"));

```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
val analytics = Analytics.Builder(context, writeKey)
  .trackApplicationLifecycleEvents()
  .build()

Analytics.with(context).track("Product Viewed", Properties().putValue("name", "Moto 360"))

```
{% endcodeexampletab %}
{% endcodeexample %}

This example Track call tells us that your user just triggered the **Product Viewed** event with a name of "Moto 360."

The Track call properties can be anything you want to record, for example:

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics.with(context).track("Purchased Item", new Properties().putValue("sku", "13d31").putRevenue(199.99));
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
Analytics.with(context).track("Purchased Item", Properties().putValue("sku", "13d31").putRevenue(199.99))
```
{% endcodeexampletab %}
{% endcodeexample %}

The Track call includes the following fields:

<table>
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


### Screen

The [Screen](/docs/connections/spec/screen/) method lets you you record whenever a user sees a screen of your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event an event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Not all services support screen, so when it's not supported explicitly, the screen method tracks as an event with the same parameters.

Example `screen` call:

{% codeexample %}
{% codeexampletab Java %}
```java
// category "Feed" and a property "Feed Length"
Analytics.with(context).screen("Feed", new Properties().putValue("Feed Length", "26"));

// no category, name "Photo Feed" and a property "Feed Length"
Analytics.with(context).screen(null, "Photo Feed", new Properties().putValue("Feed Length", "26"));

// category "Smartwatches", name "Purchase Screen", and a property "sku"
Analytics.with(context).screen("Smartwatches", "Purchase Screen", new Properties().putValue("sku", "13d31"));
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
// category "Feed" and a property "Feed Length"
Analytics.with(context).screen("Feed", Properties().putValue("Feed Length", "26"))

// no category, name "Photo Feed" and a property "Feed Length"
Analytics.with(context).screen(null, "Photo Feed", Properties().putValue("Feed Length", "26"))

// category "Smartwatches", name "Purchase Screen", and a property "sku"
Analytics.with(context).screen("Smartwatches", "Purchase Screen", Properties().putValue("sku", "13d31"))
```
{% endcodeexampletab %}
{% endcodeexample %}

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


#### Automatic Screen Tracking

The Segment SDK can automatically instrument screen calls, using the label of the activity you declared in the `manifest` as the screen's name. Fragments and views do not trigger screen calls automatically, however you can manually call the Screen method for these.

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .recordScreenViews()
  .build();
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
val analytics = Analytics.Builder(context, writeKey)
  .recordScreenViews()
  .build()
```
{% endcodeexampletab %}
{% endcodeexample %}

### Group

Group calls let you associate an [identified user](/docs/connections/sources/catalog/libraries/server/java/#identify) user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example `group` call:

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics.with(context).group("a user's id", "a group id", new Traits().putEmployees(20));
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
Analytics.with(context).group("a user's id", "a group id", Traits().putEmployees(20))
```
{% endcodeexampletab %}
{% endcodeexample %}

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

### Alias

Alias is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* Segment destinations, such as Mixpanel or Kissmetrics.

[Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) used the Alais call to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics.with(context).alias(newId);
Analytics.with(context).identify(newId);
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
Analytics.with(context).alias(newId)
Analytics.with(context).identify(newId)
```
{% endcodeexampletab %}
{% endcodeexample %}

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

## Context

Context is a dictionary of extra information you can provide about a specific API call.  You can add any custom data to the context dictionary that you want to have access to in the raw logs. Some keys in the context dictionary [have semantic meaning and are collected for you automatically](/docs/connections/spec/common/#context), such as information about the user's device.

{% codeexample %}
{% codeexampletab Java %}
```java
AnalyticsContext analyticsContext = Analytics.with(context).getAnalyticsContext();
analyticsContext.putValue(...).putReferrer(...).putCampaign(...);
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
val analyticsContext = Analytics.with(context).analyticsContext
analyticsContext.putValue(...).putReferrer(...).putCampaign(...)
```
{% endcodeexampletab %}
{% endcodeexample %}

You can read more about these special fields in the [Segment Common spec documentation](/docs/connections/spec/common/#context).

To alter data specific to the device object you can use the following:

{% codeexample %}
{% codeexampletab Java %}
```java
AnalyticsContext analyticsContext = Analytics.with(context).getAnalyticsContext();
analyticsContext.device().putValue("advertisingId", "1");
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
val analyticsContext = Analytics.with(context).analyticsContext
analyticsContext.device().putValue("advertisingId", "1")
```
{% endcodeexampletab %}
{% endcodeexample %}

To opt out of automatic data collection, clear the context after initializing the client. Do this _BEFORE_ you send any events.

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics analytics = new Analytics.Builder(context, writeKey).defaultOptions(defaultOptions).build();
AnalyticsContext context = getAnalyticsContext();
context.clear();
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
val analytics = Analytics.Builder(context, writeKey).defaultOptions(defaultOptions).build()
val context = analytics.analyticsContext
context.clear()
```
{% endcodeexampletab %}
{% endcodeexample %}

## Routing collected data

Once you set up calls using the basic Segment data collection APIs, choose which destinations to send it to, and how you want to send it to them.

### Sending Data to destinations

There are two ways to send data to your analytics services through this library:

1. Through the Segment servers, also known as "cloud-mode"
2. Directly from the user's device (also known as "device-mode") using bundled SDKs

**Note:** Refer to the specific destination's docs to see if your tool must be bundled in the app or sent server-side.

#### Cloud-Mode in Android

When a destination is enabled for your Android source from the Segment web app, but you haven't packaged its SDK with your app, requests go through the Segment REST API, and are routed to the destination service's API as [described here](/docs/connections/destinations/#connection-modes). Most, but not all destinations offer a cloud-based connection mode, so it's a good idea to [check for destinations that you might _need_ to package](/docs/connections/destinations/cmodes-compare).

#### Packaging device-mode destination SDKs

By default, Segment's `analytics` artifact does not package Device-mode destination SDKs.

We recommend using device-mode destinations on a need-to-use basis _only_, to reduce the size of your application, and to avoid running into the dreaded 65k method limit.

To package Device-mode destinations, first add the dependencies you need to your project. You can find these in the Segment app when you open the destination for your source.

```java
compile('com.segment.analytics.android.integrations:google-analytics:+') {
  transitive = true
}
compile('io.branch.segment.analytics.android.integrations:library:+') {
  transitive = true
}
```

Once you add the dependency, register the destination with the Analytics-Android SDK.

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .use(GoogleAnalyticsIntegration.FACTORY)
  .use(BranchIntegration.FACTORY)
  ...
  .build();
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
val analytics = Analytics.Builder(context, writeKey)
  .use(GoogleAnalyticsIntegration.FACTORY)
  .use(BranchIntegration.FACTORY)
  ...
  .build()
```
{% endcodeexampletab %}
{% endcodeexample %}

### Selecting Destinations

You can pass an `options` object on any of the basic Segment API calls that allows you to turn specific destinations on or off. By default, all destinations are enabled. (In Segment's other libraries, you could do this in the list of `integrations` inside the `options` object.)

In the examples below, the first event is sent to all destinations, but the second one is sent to all except Mixpanel.

{% codeexample %}
{% codeexampletab Java %}
```java
// Sent to all destinations
Analytics.with(context).track("Viewed Item", new Properties());

// Sent to all destinations, except Mixpanel
Analytics.with(context).track("Purchased Item", new Properties(), new Options().setIntegration("Mixpanel", false));

// Sent only to Google Analytics and Countly
Analytics.with(context).track("Purchased Item", new Properties(), new Options().setIntegration(Options.ALL_INTEGRATIONS_KEY, false).setIntegration("Countly", true).setIntegration("Google Analytics", true));
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
// Sent to all destinations
Analytics.with(context).track("Viewed Item", Properties())

// Sent to all destinations, except Mixpanel
Analytics.with(context).track("Purchased Item", Properties(), Options().setIntegration("Mixpanel", false))

// Sent only to Google Analytics and Countly
Analytics.with(context).track("Purchased Item", Properties(), Options().setIntegration(Options.ALL_INTEGRATIONS_KEY, false).setIntegration("Countly", true).setIntegration("Google Analytics", true))
```
{% endcodeexampletab %}
{% endcodeexample %}

If you build your own instance of the client, you can also specify a default `options` object to use for each call. In the example below, _NONE_ of the analytics events are sent to Heap.

{% codeexample %}
{% codeexampletab Java %}
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
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
// Disable Heap destination
val defaultOptions = Options().setIntegration("Heap", false)

// Attach the options to our client
val analytics = Analytics.Builder(context, writeKey).defaultOptions(defaultOptions).build()
// Set the client as a global singleton so it can be called from anywhere
Analytics.setSingletonInstance(analytics)

// Now any calls made with this Analytics client won't be sent to Heap
Analytics.with(context).track("Viewed Item", Properties())
```
{% endcodeexampletab %}
{% endcodeexample %}

Notice that the first example uses an Enum to disable the destination, but the second example uses a String. Segment recommends that you use the Enum method for Device-mode destinations, and use the String method to change the behavior of Cloud-mode destinations. The Enum method ensures type safety, and prevents you from accidentally disabling "GoogleAnalytics" instead of "Google Analytics", while the String method gives you more flexibility in what options you pass to cloud-mode destinations.

Destination name flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/catalog/) In some cases where a destination's name has more than one spelling (for example if it changed names, or brand capitalization styles, or if it was commonly misspelled and we added an alias) the documentation for that destination will include a section called "Adding (destination name) to the integrations object".

> success ""
> **Note:** If you are on a business tier Segment plan, you can filter track calls  right from the Segment App in the source schema page. This is a much simpler way to manage your filters, and you can update it without having to make and publish code changes.


## Utility methods


### Retrieve AnonymousId

You can retrieve the `anonymousId` set by the library by using:

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics.with(context).getAnalyticsContext().traits().anonymousId();
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
Analytics.with(context).analyticsContext().traits().anonymousId()
```
{% endcodeexampletab %}
{% endcodeexample %}

### Reset

The `reset` method clears the SDK's internal stores for the current user and group. This is useful for apps where users log in and out with different identities on the same device over time.

The example code below clears all information about the user.
{% codeexample %}
{% codeexampletab Java %}
```java
Analytics.with(context).reset();
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
Analytics.with(context).reset()
```
{% endcodeexampletab %}
{% endcodeexample %}


**Reset does not clear events in the queue**, and any remaining events in the queue are sent the next time the app starts. You might want to call [Flush](#flush) before you call Reset.

> warning ""
> **Note**: When you call `reset`, the next time the app opens Segment generates a new AnonymousId. This can impact the number of Monthly Tracked Users (MTUs) you process.


### Collecting Stats

Local device stats help you quickly see how many events you sent to Segment, the average time bundled destinations took to run, and similar metrics.

{% codeexample %}
{% codeexampletab Java %}
```java
StatsSnapshot snapshot = Analytics.with(context).getSnapshot();
log(snapshot.integrationOperationAverageDuration);
log(snapshot.flushCount);
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
val snapshot = Analytics.with(context).snapshot()
log(snapshot.integrationOperationAverageDuration)
log(snapshot.flushCount)
```
{% endcodeexampletab %}
{% endcodeexample %}

### Adding debug logging

If you run into issues while using the Android library, you can enable logging to help trace the issue. Logging also helps you see how long destinations take to complete their calls so you can find performance bottlenecks.

The logging is enabled by default in the default singleton instance if your application is running in `debug` mode. If you use a custom instance, attach a `LogLevel` to the `Builder` and set the logging level there, as in the example below.

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics analytics = new Analytics.Builder(context, writeKey).logLevel(LogLevel.VERBOSE)...build();
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
val analytics = Analytics.Builder(context, writeKey).logLevel(LogLevel.VERBOSE)...build()
```
{% endcodeexampletab %}
{% endcodeexample %}

You can choose to disable logging completely (`LogLevel.NONE`), enable basic logging for the SDK (`LogLevel.BASIC`), enable basic logging for Device-mode destination (`LogLevel.INFO`), or simply log everything (`LogLevel.VERBOSE`).

> success ""
> Segment recommends that you turn logging off in _production_ modes of your app.


## Privacy methods

### Opt-out

Depending on the audience for your app (for example, children) or the countries where you sell your app (for example, the EU), you may need to offer the ability for users to opt-out of analytics data collection inside your app. You can turn off ALL destinations including Segment itself:

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics.with(this).optOut(true);
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
Analytics.with(this).optOut(true)
```
{% endcodeexampletab %}
{% endcodeexample %}

Set the opt-out status for the current device and analytics client combination. This flag
persists across device reboots, so you can call it once in your application,
such as in a screen where a user can opt out of analytics tracking.


### Anonymizing IP

The Segment iOS, Android, Analytics.js and Xamarin libraries automatically derive and set the IP address for events recorded on the user's device. The IP is not collected on the device itself, but instead is filled in by Segment's servers when they receive a message.

To prevent Segment from recording the users' IP in destinations and S3, you can set the event's `context.ip` field to `0.0.0.0`. The Segment servers won't overwrite this data if it comes from the client, and so do not record the IP address of the client.


## Formatting Order Completed Events

Segment's Android library provides several helper methods so you can easily construct both properties objects and products lists so your Order Completed events conform to the Segment [ecommerce specification](https://segment.com/docs/connections/spec/ecommerce/v2/). Here's a code example:

{% codeexample %}
{% codeexampletab Java %}
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
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
import com.segment.analytics.Analytics
import com.segment.analytics.Properties
import com.segment.analytics.Properties.Product

// initialize a new properties object
val properties = Properties();

// add orderId and revenue to the properties object
properties.putValue("orderId", orderId).putValue("revenue", revenue)

// initialize a new product
Product product1 = Product(id, sku, price)

// initialize a second product
Product product2 = Product(id, sku, price)

// add products to the properties object
properties.putProducts(product1, product2)

// pass the properties object into your Order Completed event
Analytics.with(context).track("Order Completed", properties)
```
{% endcodeexampletab %}
{% endcodeexample %}

Find details on **best practices in event naming** as well as the **Track method payload** in the [Segment Track call spec](/docs/connections/spec/track/).


## Proxying HTTP Calls

You can point the Android SDK to your own hosted [proxy](https://github.com/segmentio/segment-proxy) of the Segment API. This runs the HTTP traffic for the Segment API through the proxy.

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics analytics = new Analytics.Builder(this, ANALYTICS_WRITE_KEY) //
        .connectionFactory(new ConnectionFactory() {
          @Override protected HttpURLConnection openConnection(String url) throws IOException {
            String path = Uri.parse(url).getPath();
            // Replace YOUR_PROXY_HOST with the address of your proxy
            return super.openConnection("YOUR_PROXY_HOST" + path);
          }
        })
        .build();
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
val analytics = Analytics.Builder(this, ANALYTICS_WRITE_KEY) //
        .connectionFactory(object: ConnectionFactory() {
          @Throws(IOException::class)
          override fun openConnection(url: String): HttpURLConnection {
            val path = Uri.parse(url).path
            // Replace YOUR_PROXY_HOST with the address of your proxy
            return super.openConnection("YOUR_PROXY_HOST$path")
          }
        })
        .build()
```
{% endcodeexampletab %}
{% endcodeexample %}


## Analytics-Android Versions

This section includes information on:
- [Bleeding Edge Releases](#bleeding-edge-releases)
- [Support for Older versions of Android](#support-for-older-versions-of-android)
- [Migrating from v2 to v3](#migrating-from-v2-to-v3)
- [Migrating to v4](#migrating-to-v4)


### Bleeding Edge Releases

Segment publishes stable releases every second Wednesday, when we tag and release the `master` branch.

After releasing, we also merge the `dev` branch merged into `master`. In general, code will be available on `master` for two weeks before being tagged as a stable release. During this period, `master` is published as a snapshot — the equivalent of bleeding edge releases. We recommend using the snapshot version to try out upcoming features and fixes that have not been published yet. Simply add the snapshots repo to your repository and Gradle will pull in the latest snapshot build.

```java
repositories {
  mavenCentral()
  maven { url 'https://oss.sonatype.org/content/repositories/snapshots/' }
}
```

### Support for Older versions of Android

The Analytics-Android library supports back to API level 14 (Android 4.0). You should [consider it too](https://developer.android.com/about/dashboards/index.html#Platform)! If you can't do this for your own application, there are three options we recommend:

1. Use an older version of the Analytics-Android library that supports your minimum requirements. Remember that there won't be any updates or bug fixes to those versions, but you might still have clients using old versions of the library in production.
2. Skip running analytics for users on older devices by wrapping calls to the Analytics-Android SDK in a `Build.VERSION` check.
3. Write your own SDK. You can still use most of the tools on Segment using the [HTTP API](/docs/connections/sources/catalog/libraries/server/http/). You can use either the Analytics-Android or [Java source](https://github.com/segmentio/analytics-java) to get a quick head start.

### Migrating from v2 to v3

> warning "Version 3 deprecated in favor of Version 4"
> See the [section below for instructions on how to upgrade](#migrating-to-v4).

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

### Migrating to v4

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

{% codeexample %}
{% codeexampletab Java %}
```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .use(GoogleAnalyticsIntegration.FACTORY)
  .use(BranchIntegration.FACTORY)
  ...
  .build();
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
val analytics = Analytics.Builder(context, writeKey)
  .use(GoogleAnalyticsIntegration.FACTORY)
  .use(BranchIntegration.FACTORY)
  ...
  .build()
```
{% endcodeexampletab %}
{% endcodeexample %}
