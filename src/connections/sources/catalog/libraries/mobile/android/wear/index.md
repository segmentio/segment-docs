---
title: Analytics for Android Wear
---

Analytics for Android Wear makes it simple to send your data to any tool without having to learn, test or implement a new API every time.

All of Segment's client libraries are open-source, so you can [view Analytics for Android on Github](https://github.com/segmentio/analytics-android), or check out our [browser and server-side libraries](/libraries) too.

## Getting Started

To get started with Analytics for Android Wear check out our [quickstart guide](/docs/tutorials/quickstart-android) which will help you install analytics tracking in your mobile app in just a few minutes. Once you've installed the SDK, read on for setting it up the wear part of your App. Please note that you can only use the Android SDK v2 or higher with wear, and that any Beta APIs below are subject to change.

## Adding the Wear dependency

Add the `wear` module to your phone and wear applications.

```
compile('com.segment.analytics.android:wear:+@aar') {
  transitive = true
}
```

## Initializing the client

The entry point of the library is through the `WearAnalytics` class. We maintain a global default instance. Unlike the mobile SDK, this instance is not configurable, simply because it doesn't have it's own settings! It will proxy all the calls to the device, which will then call the analytics client on the phone. We'll show you how to customize the phone client.

```java
WearAnaytics analytics = WearAnalytics.with(context);
analytics.track(...);
```

## Setting up the Phone Manifest

In your `AndroidManifest.xml`, you'll need to register the `PhoneAnalyticsListenerService` service.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="...">

  ...

  <application ...>

    <service
        android:name="com.segment.analytics.PhoneAnalyticsListenerService">
      <intent-filter>
        <action android:name="com.google.android.gms.wearable.BIND_LISTENER"/>
      </intent-filter>
    </service>

    <meta-data android:name="com.google.android.gms.version"
        android:value="@integer/google_play_services_version"/>

  </application>

</manifest>
```

## Custom Client

To customize the analytics client, you can subclass `PhoneAnalyticsListenerService` and override the `getAnalytics()` method. By default we use the singleton instance, but you can provide us with your custom instances. We recommend reusing the same instance in your phone app. Remember to register your subclassed service instead of ours.
The `getAnalytics()` method is consulted for every call, so make sure you return the same instance each time.

## Track

The `track` method lets you record the actions your users perform, and record adiditonal properties the action.

You'll want to track an event whenever the user clicks, taps or submits something in your app. You can read more about [how it works](/docs/connections/spec/track).

```java
analytics.track("Viewed Product", new Properties().putValue("name", "Moto 360"));
analytics.track("Purchased Item", new Properties().putValue("sku", "13d31").putRevenue(199.99));
```

<table class="api-table">
  <tr>
    <td>`name` _String,required_</td>
    <td>A name for the tracked action.</td>
  </tr>
  <tr>
    <td>`properties` _Properties,optional_</td>
    <td>A map of properties for this action, e.g. revenue if the action was a purchase.</td>
  </tr>
</table>

## Screen

The `screen` method lets you record the screens your users view.

You'll want to record a screen event an event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app. You can read more about [how it works](/docs/connections/spec/screen).

Not all services support screen, so when it's not supported explicitly, the screen method tracks as an event with the same parameters.

```java
analytics.screen("Photo Feed", "", new Properties().putValue("Feed Length", "26"));
analytics.screen("Purchase Screen", "Smartwatches", new Properties().putValue("sku", "13d31"));
```

<table class="api-table">
  <tr>
    <td>`name` _String,optional*_</td>
    <td>A name for the screen. Optional if category is provided.</td>
  </tr>
  <tr>
    <td>`category` _String,optional*_</td>
    <td>A category for the screen. Optional if name is provided.</td>
  </tr>
  <tr>
    <td>`properties` _Properties,optional_</td>
    <td>A map of properties for this screen.</td>
  </tr>
</table>
