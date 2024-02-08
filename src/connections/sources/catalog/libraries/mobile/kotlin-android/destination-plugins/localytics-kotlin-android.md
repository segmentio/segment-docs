---
title: Analytics Kotlin Localytics Plugin
id: 54521fd925e721e32a72eed0
---
Our Analytics-Kotlin Localytics Destination Plugin is open sourced on GitHub. Feel free to
[check it out here](https://github.com/segment-integrations/analytics-kotlin-localytics){:target="_blank”}.

## Getting started

1.  From the Segment Destinations page click **Add Destination**.
2.  Search for Localytics and select it in the results that appear.
3.  Choose which source to connect to your Localytics destination.
4.  Add your Localytics App Key to the destination's settings tab.

Once the Segment library is integrated with your site or app, toggle Localytics
on in your Segment destinations, and add your application's **App Key** which
you can find in your Localytics app settings. These new settings will take up to
an hour to propogate to all of your existing users. For new users it'll be
instanteneous!

If you are using version 1.3.0 or higher of the Segment-Localytics Android SDK,
you can include a `localytics.xml` file in your Android project's `res/values`
folder to define your settings. Note that any settings entered in the Segment UI
will override the equivalent values defined in your `localytics.xml` file. You
can read more about the `localytics.xml` file in [Localytics's documentation
here](https://docs.localytics.com/dev/android.html#include-localytics-xml-file){:target="_blank"}.


## Adding the dependency
To install the Segment-Localytics integration, add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:localytics:<latest_version>'
```


Or the following for Kotlin DSL

```
implementation("com.segment.analytics.kotlin.destinations:localytics:<latest_version>")
```

Also add the Maven Localytics repo (since Localytics doesn’t publish it on Maven Central) in project level build.gradle.
```
allprojects {
    repositories {
        mavenCentral()
        maven {
            url 'https://maven.localytics.com/public'
        }
    }
}
```
Or the following for Kotlin DSL
```
allprojects {
    repositories {
        mavenCentral()
        maven {
            url = uri("https://maven.localytics.com/public")
        }
    }
}
```

## Using the plugin in your app

Open the file where you set up and configured the Analytics-Kotlin library.  Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.localytics.LocalyticsDestination
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = LocalyticsDestination())
```

Your events now have Localytics session data and start flowing to Localytics in device-mode.

## Identify

When you make an [Identify](/docs/connections/spec/identify/) call, Segment sets the Localytics
customerId and any special Localytics traits you provide, like `name`,
`email`, or custom traits.

## Track

When you make a [Track](/docs/connections/spec/track/) call, Segment logs an event with Localytics containing the name of the event and any optional event properties.


## Push Notifications

To enable push notifications on your Android app, complete the following steps:

1. To confirm that Localytics is bundled, verify that Localytics is set to `false` in your integrations object. For
  more information about bundled integrations, see Segment's [Android documentation](/docs/connections/sources/catalog/libraries/mobile/android/#about-mobile-connection-modes).
2. Follow steps 1-3 of Localytics' documentation to [set up the permission in your
  AndroidManifest.xml](http://docs.localytics.com/dev/android.html#modify-androidmanifest-push-android){:target="_blank"}.
  
3. Make the AndroidManifest changes to the `GcmReceiver`,
  `GcmListenerService`, `InstanceIDListenerServer`, and `PushTrackingActivity` classes as noted in the [Localytics Push messaging documentation](https://help.uplandsoftware.com/localytics/dev/android.html#migrating-v3-to-v4-push-messaging-android){:target="_blank"}.
4. Register the Push receiver in your Activity or
  Application class within a Segment `onIntegrationReady` method:
 ```java
@Override protected void onResume() {
    super.onResume();
     Analytics.with(this).onIntegrationReady(BundledIntegration.LOCALYTICS, new Callback() {
      @Override public void onIntegrationReady(Object integration) {
        Localytics.registerPush("YOUR-SENDER-ID");
      }
    });
}
```