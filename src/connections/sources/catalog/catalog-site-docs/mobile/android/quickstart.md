---
title: 'Quickstart: Android'
hidden: true
sourceTitle: 'Android'
sourceCategory: 'Mobile'
---

[![Maven Central](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.android/analytics/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.android/analytics)

This tutorial will help you start sending analytics data from your Android app to Segment and any of our destinations, using our Android library. As soon as you're setup you'll be able to turn on any new destinations with the flip of a switch!

If you want to dive deeper at any point, check out the [Android Source Reference](/docs/sources/mobile/android).

## Step 1: Install the Library

The recommended way to install the library for Android is with a build system like Gradle. This makes it dead simple to upgrade versions and add destinations. The library is distributed via [Maven Central](http://maven.org/). Simply add the `analytics` module to your `build.gradle`:

```
dependencies {
  compile 'com.segment.analytics.android:analytics:4.+'
}
```

### Including Additional Client Side SDKs

In the interest of keeping our SDK lightweight, the `analytics` artifact only installs the Segment destination. This means that all your data will be sent via Segment's servers to any tools you've enabled with server-side-compatible destinations.

You'll likely want to bundle some additional destinations client side. For many advanced marketing automation and analytics tools, we offer the option of including their SDK or electing to send data server to server, depending on the features you need. Most optimization, deep linking, error tracking, and survey tools must be included on the device to leverage their core feature set.

In those cases, you'll need to take some additional steps as shown in the [library reference documentation](/docs/sources/mobile/android#bundling-integrations).

Now that the SDK is installed and setup, you're ready to...

## Step 2. Initialize the Client

We recommend initializing the client in your `Application` subclass.
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
- Automatically tracking lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) and is optional, but highly recommended to hit the ground running with core events! See [below](/docs/sources/mobile/android/quickstart/#step-5-track-actions) for more info!
- This only installs the Segment destination. This means that all your data will be sent server side to tools.
If you need to bundle additional destinations client side, you'll need to take some additional steps as [shown here](/docs/sources/mobile/android#bundling-integrations).

## Step 3. Add Permissions

Ensure that the necessary permissions are declared in your application's `AndroidManifest.xml`.

```xml
 <!-- Required for internet. -->
<uses-permission android:name="android.permission.INTERNET"/>
```

## Step 4. Identify Users

The `identify` method is one of our core API methods. It's how you tie one of your users and their actions to a recognizable userId. It also lets you record traits about the user, like their email, name, account type, etc. You can read more about it in the [identify reference](/docs/sources/mobile/android#identify).

When and where you call `identify` depends on how your users are authenticated, but doing it in the `onCreate` method of your [Application](http://developer.android.com/reference/android/app/Application.html) class would be most common, as long as you know who your user is. If your user is still anonymous, you should skip this part and we'll attribute the subsequent events to an `anonymousId` instead.

Here's what a basic call to `identify` might look like:

```java
Analytics.with(context).identify("f4ca124298", new Traits().putName("Michael Bolton").putEmail("mbolton@initech.com"));
```

That's identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

**Hold up though!** When you actually put that code in your Android app, you'll need to replace all those hard-coded strings with details about the currently logged-in user.

Once you've added an `identify` call, you're ready to move on to...

## Step 5. Track Actions

The track method is how you record any actions your users perform. Each action is known by a name, like "Purchased a T-Shirt". You can also record properties specific to those actions. You can read more about `track` in the [track reference](/docs/sources/mobile/android#track).

To get started, our SDK can automatically track a few key common events, such as the **Application Installed**, **Application Updated** and **Application Opened**. Simply enable this option during initialization.

```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .trackApplicationLifecycleEvents()
  .build();
```

You'll also want to track events that are indicators of success for your mobile app, like **Signed Up**, **Purchased Item** or **Bookmarked Article**. We recommend tracking just a few important events. You can always add more later!

Here's what a call to `track` might look like when a user signs up:

```java
Analytics.with(context).track("Signed up", new Properties().putValue("plan", "Enterprise"));
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan. Properties are simple key-value pairs that can be anything you want to record, for example:

```java
Analytics.with(context).track("Bookmarked Article", new Properties()
  .putValue("title", "Snow Fall")
  .putValue("subtitle", "The Avalance at Tunnel Creek")
  .putValue("author", "John Branch"));
```

You'll want to track events that are indicators of success for your mobile app, like **Signed Up**, **Purchased Item** or **Bookmarked Article**.

To get started, we recommend tracking just a few important events. You can always add more later!

Once you've added a few `track` calls, **you're done!** You successfully instrumented your app! Now you're ready to turn on any destination you fancy from our interface, margarita in hand.

---

## What's Next?

We just walked through the quickest way to get started with Segment using Analytics for Android. You might also want to check out our full [Analytics for Android reference](/docs/sources/mobile/android) to see what else is possible, or read about the [Tracking API methods](/docs/tracking-api#api-methods) to get a sense for the bigger picture.
