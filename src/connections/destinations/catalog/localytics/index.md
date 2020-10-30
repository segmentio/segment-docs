---
title: Localytics Destination
---

Our Localytics mobile destination code is open sourced on GitHub. Feel free to
check it out:
[iOS](https://github.com/segment-integrations/analytics-ios-integration-localytics),
[Android](https://github.com/segment-integrations/analytics-android-integration-localytics).

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
here](https://docs.localytics.com/dev/android.html#include-localytics-xml-file).

Including a settings xml file in conjunction with a Segment-Localytics iOS SDK
is not yet supported.

**Note:** Localytics does not accept server-side data, so you'll have to use one
of our client-side libraries
([Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/),
[iOS](/docs/connections/sources/catalog/libraries/mobile/ios/)/[Android](/docs/connections/sources/catalog/libraries/mobile/android/) SDKs
with Localytics [bundled](/docs/connections/spec/mobile-packaging-sdks/) to send data
to Localytics.

You will also need to add the Maven Localytics repo (since Localytics doesn't
publish it on Maven Central). You can see an example of how to add that
[here](https://github.com/segment-integrations/analytics-android-integration-localytics/blob/master/build.gradle#L44).

- - -

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
  AndroidManifest.xml](http://docs.localytics.com/dev/android.html#modify-androidmanifest-push-android).
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
