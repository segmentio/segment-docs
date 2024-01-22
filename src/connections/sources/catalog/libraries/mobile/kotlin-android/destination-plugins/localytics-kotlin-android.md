---
title: Analytics Kotlin Localytics Plugin
id: 54521fd925e721e32a72eed0
---
Our Analytics-Kotlin Localytics Destination Plugin is open sourced on GitHub. Feel free to
[check it out:](https://github.com/segment-integrations/analytics-kotlin-localytics){:target="_blank"}.

## Getting Started

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
To install the Segment-Localytics integration, simply add this line to your gradle file:

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

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library.  Add this plugin to the list of imports.

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

Your events will now begin to flow to Localytics in device mode.


## Identify

When you call [`identify`](/docs/connections/spec/identify/), we'll set the Localytics
customer Id, and set any special Localytics traits you provide, such as `name`,
or `email`, and any custom traits as well.

## Track

Whenever you call [`track`](/docs/connections/spec/track/), we'll log an event with
Localytics. [`track`](/docs/connections/spec/track/) takes the name of the event and any
optional properties you want to associate with the event.

- - -

## Push Notifications

Push notifications on Android require a bit of extra work to setup.

* First, you need to make sure Localytics is being bundled. You can find out
  more information about bundled integrations in our [Android documentation](/docs/connections/sources/catalog/libraries/mobile/android/#about-mobile-connection-modes).

* Follow Localytics' documentation to [set up the permission in your
  AndroidManifest.xml](http://docs.localytics.com/dev/android.html#modify-androidmanifest-push-android){:target="_blank"}.
  Specifically, the **AndroidManifest** changes regarding the `GcmReceiver`,
  `GcmListenerService`, `InstanceIDListenerServer`, and `PushTrackingActivity`
  classes.

* In lieu of step four, you will register the Push receiver in your Activity or
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
