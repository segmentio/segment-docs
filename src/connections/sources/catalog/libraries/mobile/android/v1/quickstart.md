---
title: "Quickstart: Android (v1 - Deprecated)"
hidden: true
---

This tutorial will help you start sending analytics data from your Android app to Segment. Once you're done you'll be able to turn on [any of our destinations](/docs/connections/destinations/) with the flip of a switch! No more waiting for Play Store releases.

If you want to dive deeper at any point, check out the [Android Library Reference](/docs/connections/sources/catalog/libraries/mobile/android).
If you're looking for documentation on our upcoming version, head over to the [Android v2 Beta Docs](/docs/connections/sources/catalog/libraries/mobile/android-beta).

## Step 1: Install the SDK

The Android analytics is distributed via [Maven Central](http://maven.org/). This is recommended since it makes it dead simple to upgrade, and bundle only specific destinations. If you can't use Maven, check out the [manual install instructions](/docs/connections/sources/catalog/libraries/mobile/android#manual-install).

Then simply add the SDK as a dependency.

If you are using [Maven](https://maven.apache.org/), add it to your `pom.xml`:
```xml
<dependency>
  <groupId>io.segment.analytics.android</groupId>
  <artifactId>all</artifactId>
  <version>LATEST</version>
  <type>aar</type>
</dependency>
```

Or if you are using [Gradle](http://www.gradle.org/), add it to your `build.gradle`:

```
compile('io.segment.analytics.android:all:+@aar') {
  transitive = true
}
```

Remember that to use the Google Analytics (and transitively Google Play Services) dependency, you'll have to make sure you've installed the Google Play Services repository under `extras` in the Android SDK Manager.

Now that the SDK is installed and setup, you're ready to...

## 2. Update AndroidManifest.xml

Make sure your `AndroidManifest.xml` has the following permission(s):

```xml
 <!-- Required for internet. -->
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

<!-- The following permissions are optional, but recommended for some bundled destinations. -->

<!-- Allow you to get LOGCAT information when a crash occurs. -->
<uses-permission android:name="android.permission.READ_LOGS"/>

<!-- Allow you to see which activity was active when a crash occurs. -->
<uses-permission android:name="android.permission.GET_TASKS"/>

<!-- Allows location to be tracked -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```

You're not required to include any permission that you're not comfortable with (except for `INTERNET` and `ACCESS_NETWORK_STATE`, which are required). Note that that some analytics services will not work well without their respective permissions.

## 3. Add analytics.xml

Add a file called `analytics.xml` to your app's `res/values/` folder:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<resources>
  <!--Your Segment project write key-->
  <string name="analytics_write_key">YOUR_WRITE_KEY</string>

  <!--Whether to print additional debug information as you develop.-->
  <string name="analytics_debug">false</string>
</resources>
```

Find out more about [configuration settings](#configuration).

## 4. Extend your Activities with TrackedActivity

Extend all your activities with `TrackedActivity`:

```java
import io.segment.android.TrackedActivity;

public class MyActivity extends TrackedActivity {
  // ...
}
```

If you're already extending from another activity, don't worry! [TrackedActivity](https://github.com/segmentio/analytics-android/blob/master/src/io/segment/android/TrackedActivity.java) is as simple as it gets. Here's how to instrument your Activities without extending from `TrackedActivity`:


```java
import io.segment.android.Analytics;
// ...

public class YourActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Analytics.onCreate(this);
    }

    @Override
    protected void onStart() {
        super.onStart();
        Analytics.activityStart(this);
    }

    @Override
    protected void onPause() {
        Analytics.activityPause(this);
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        Analytics.activityResume(this);
    }

    @Override
    protected void onStop() {
        super.onStop();
        Analytics.activityStop(this);
    }
}
```

## 5. Identify Users

The `identify` method is how you tell Segment who the current user is. It takes a unique User ID and any optional traits you know about them. You can read more about it in the [identify reference](/docs/libraries/android#identify).

When and where you `identify` depends on how your users are authenticated, but doing it in the Application's `onCreate` method is most common. If that doesn't work for you, then do it after the `MainActivity`'s `onCreate` method.

Here's what a basic call to `identify` might look like:

```java
Traits traits = new Traits();
traits.put("name", "Michael Bolton");
traits.put("email", "mbolton@example.com");
Analytics.identify("f4ca124298", traits);
```

That's identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

**Hold up though!** When you actually put that code in your Android app, you'll need to replace all those hard-coded strings with details about the currently logged-in user.

Once you've added an `identify` call, you're ready to move on to...

## 6. Track Actions

The `track` method is how you tell Segment about which actions your users are performing inside your app. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the [track reference](/docs/libraries/android#track).

Here's what a call to `track` might look like when a user signs up:

```java
Props props = new Props();
props.put("plan", "Enterprise");
Analytics.track("Signed up", props);
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan. Properties are simple key-value pairs that can be anything you want to record, for example:

```java
Props props = new Props();
props.put("title", "Snow Fall");
props.put("subtitle", "The Avalanche at TunnelCreek");
props.put("author", "John Branch");
Analytics.track("Bookmarked Article", props);
```

You'll want to track events that are indicators of success for your mobile app, like **Signed Up**, **Purchased Item** or **Bookmarked Article**.

To get started, we recommend tracking just a few important events. You can always add more later!

Once you've added a few `track` calls, **you're done!** You successfully instrumented your app! Now you're ready to turn on any destination you fancy from our interface, margarita in hand.

---

## What's Next?

We just walked through the quickest way to get started with Segment using Analytics for Android. You might also want to check out our full [Analytics for Android reference](/docs/connections/sources/catalog/libraries/mobile/android/) to see what else is possible, or read about the [Tracking API methods](docs/connections/sources/catalog/libraries/server/http-api/) to get a sense for the bigger picture.
