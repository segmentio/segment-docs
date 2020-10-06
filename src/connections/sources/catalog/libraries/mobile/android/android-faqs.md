---
title: Analytics-Android Frequently asked questions
strat: android
---

## What is the latest version of the library?

Analytics-Android is published to [Maven Central](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22com.segment.analytics.android%22%20AND%20a%3A%22analytics%22) where you can see all published releases.

## Where is the changelog for the library?

You can see a changelog in the [GitHub repository](https://github.com/segmentio/analytics-android/blob/master/CHANGELOG.md), detailing the changes made in each release.

## Can I use the library with Maven?

Yes! You can use the Segment library with Maven, or any other custom build system because the `core` SDK is simply a JAR.

```xml
<dependency>
    <groupId>com.segment.analytics.android</groupId>
    <artifactId>analytics</artifactId>
    <version>LATEST</version>
</dependency>
```

## How big is the Segment SDK?

The core Segment SDK is extremely lightweight! It contains just under 1k methods, the JAR weighs in at 123kb and the dex size is 113kb.

## How can I swap out debugging and production keys?

If you're using Gradle and build flavors, you can provide an `analytics.xml` for each configuration with different Writekeys in each.

For other cases, you can also construct custom instances of the client and pass in a different key for each instance. Set it as the singleton instance, and use the same API everywhere else.

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

## How does the library queue API calls?

The Analytics-Android library queues API calls and uploads them in batches. This limits the number of network calls made, and helps save battery on the user's device.

When you send an event, the library saves it to disk. When the queue size reaches the maximum size you specify (20 by default), the library flushes the queue and uploads the events in a single batch. Since the data is saved immediately, it isn't lost even if the app is killed or the operating system crashes.

The queue behavior might differ for Device-mode destinations. For example, Mixpanel's SDK queues events and then flushes them only when the app goes to the background.

This is why even if you see events in the debugger, the Device-mode destination may not show them on their dashboards yet, simply because their mobile SDK may still have them queued. The opposite may also happen, that we have some events queued so they haven't shown up in the debugger, but the Device-mode destination has already sent the events to their servers.

## Will my events be delivered even if the app is killed?

Analytics-Android uses a persistent disk queue, so the events persist even when the app is killed. The library simply reads them from disk, and uploads the events the next time the app starts. The queue works on top of [Tape](http://square.github.io/tape/), which is designed to even survive process and system crashes.

Analytics-Android saves up to 1000 calls on disk, and these never expire.

## I need to use the SDK on an older version of Android not supported by your library!

The Analytics-Android library supports back to API level 14 (Android 4.0). You should [consider](https://developer.android.com/about/dashboards/index.html#Platform) it too! If you can't do this for your own application, there are three options we recommended:

1. Use an older version of the Analytics-Android library that supports your minimum requirements. Remember that there won't be any updates or bug fixes to those versions, but you might still have clients using old versions of the library in production.
2. Skip running analytics for users on older devices by wrapping calls to the Analytics-Android SDK in a `Build.VERSION` check.
3. Write your own SDK. You can still use most of the tools on Segment using the [HTTP API](/docs/connections/sources/catalog/libraries/server/http/). You can use either the Analytics-Android or [Java source](https://github.com/segmentio/analytics-java) to get a quick head start.


## How can I use a destination-specific feature?

...for example, Mixpanel's push notifications?

If you're using Device-mode for a mobile destination, meaning that you are bundling the destination's mobile SDK, you can always access features from that tool's native SDK.

To make sure you use the same instance of these destinations as Segment does, you can register a listener that notifies you when the destinations are ready. This listener is called synchronously if the destinations are notified, and asynchronously if the destinations aren't yet ready.

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

Destinations that return `Void` use a shared instance, and you can call into the SDK directly. This API guarantees that the destinations are initialized first. If you ever decide to change the settings for the destination from the Segment App, the changes are reflected here.

```java
analytics.onIntegrationReady(BundledIntegration.FLURRY, new Callback() {
  @Override public void onReady(Object instance) {
    // Flurry uses static methods only, so the instance returned is null.
    Flurry.setLogEnabled(true);
  }
});
```

## Why is my callback not being invoked?

If you use the destination callbacks described above, and don't receive a callback, check your Proguard configuration. Any easy way to verify that Proguard is the issue is to disable it completely for a run and see if the callbacks is invoked.

<!-- Per linked site, this bug has been fixed. Hiding until I can confirm.
## Why is Google Analytics not receiving crash reports?

This is a known bug https://code.google.com/p/analytics-issues/issues/detail?id=443 and is being worked on by Google. We recommend using alternatives like Bugsnag or Crittercism in the meantime. -->

## How should I configure Proguard?

For the Segment SDKs, add `-keep class com.segment.analytics.** { *; }` to your Proguard configuration. You should also check the vendor documentation for any Device-mode destinations you are bundling, to see if they include any recommended Proguard configurations.

## How should I use Outbound's push notifications?

Outbound isn't a Device-mode destination, so you must set it up manually.

First, set up the [GCM client as described in the instructions](https://developer.android.com/google/gcm/client.html).

The Segment servers look for a `context.device.token` key to send to Outbound. If you are using Analytics-Android version 2.1.6 or later, you can then set the registration ID from the step above on the `context`, as in the example below:

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

## Do you support Phonegap or Cordova?

Yes! You can use Segment's browserify'd [analytics-node](https://github.com/segmentio/analytics-node) package just like any other client-side JavaScript library.

## How do you handle Unique Identifiers?

One of the most important parts of any analytics platform is the ability to consistently and accurately identify users. To do this, the platform must assign and persist some form of identification on the device so you can analyze user actions effectively. This is especially important for funnel conversion analysis and retention analysis.

Naturally the Analytics SDK needs a unique ID for each user. The very first time an Android app that uses Segment launches, the Segment SDK generates a UUID and saves it on the device's disk. This is used as the `anonymousId` and stays constant for the user on the device. To create a new user on the same device, call `reset` on the Analytics client.

The Segment SDK also collects the [Advertising ID](https://developer.android.com/google/play-services/id.html) provided by Play Services. Make sure the Play Services Ads library is included as a dependency for your application. This is the ID that should be used for advertising purposes. This value is set to `context.device.advertisingId`.

Segment also collects the [Android ID](http://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID) as `context.device.id`. Some destinations rely on this field being the Android ID, so double check your destinations vendor documentation if you choose to override the default value.
