---
title: 'Quickstart: Analytics-Android'
hidden: true
strat: android
---

[![Maven Central](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.android/analytics/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.android/analytics)

This tutorial will help you start sending analytics data from your Android app to Segment and any of our destinations, using our Android library. As soon as you're set up you'll be able to turn on any new destinations with the flip of a switch!

If you want to dive deeper at any point, check out the [Android Source Reference](/docs/connections/sources/catalog/libraries/mobile/android).

## Step 1: Create a Source in the Segment app

Before you begin, you need a Workspace (which is a container that holds all of the sources and destinations which are billed together for an organization). If you already created one, great! If not, you can sign up for a free Segment account and create one.

Next, create an Android source from your Workspace:

1. Click **Add Source**.
2. From the source catalog page, click **Android**.
3. Click **Add Source** again from the informational panel that appears to the right.
4. Give the source a display name, and enter the URL the source will collect data from.

When you create a Source in the Segment web app, it tells the Segment servers that you'll be sending data from a specific source type. When you create (or change!) a Source in the Segment app, Segment generates a new Write Key for that source. You use the write key in your code to tell the Segment servers where the data is coming from, so Segment can route it to your destinations and other tools.


## Step 2: Install the Library

The recommended way to install the library for Android is with a build system like Gradle. This makes it simple to upgrade versions and add destinations. The library is distributed using [Maven Central](http://maven.org/). Simply add the `analytics` SDK to your module's `build.gradle` file:

```java
dependencies {
  implementation 'com.segment.analytics.android:analytics:4.+'
}
```

### Including Additional Client Side SDKs

In the interest of keeping our SDK lightweight, the `analytics` artifact only installs the Segment destination. This means that all your data will be sent using Segment's servers to any tools you've enabled with server-side-compatible destinations.

You'll likely want to bundle some additional destinations client side. For many advanced marketing automation and analytics tools, we offer the option of including their SDK or electing to send data server to server, depending on the features you need. Most optimization, deep linking, error tracking, and survey tools must be included on the device to use their core feature set.

In those cases, you'll need to take some additional steps as shown in the [library reference documentation](/docs/connections/sources/catalog/libraries/mobile/android/#about-mobile-connection-modes).

Now that the SDK is installed and setup, you're ready to...

## Step 3. Initialize the Client

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
- Automatically tracking lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) and is optional, but highly recommended to hit the ground running with core events! See [below](/docs/connections/sources/catalog/libraries/mobile/android/quickstart/#step-6-track-actions) for more info!
- This only installs the Segment destination. This means that all your data will be sent server side to tools.
If you need to bundle additional destinations client side, you'll need to take some additional steps as [shown here](/docs/connections/sources/catalog/libraries/mobile/android/#about-mobile-connection-modes).

## Step 4. Add Permissions

Ensure that the necessary permissions are declared in your application's `AndroidManifest.xml`.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="your.package.name">
  ...
  <!-- Required for internet. -->
  <uses-permission android:name="android.permission.INTERNET"/>
</manifest>
```

## Step 5. Identify Users

> note ""
> **Good to know**: For any of the different methods described in this quickstart, you can replace the properties and traits in the code samples with variables that represent the data collected.

The `identify` method is one of our core API methods. It's how you tie one of your users and their actions to a recognizable userId. It also lets you record traits about the user, like their email, name, account type, etc. You can read more about it in the [identify reference](/docs/connections/sources/catalog/libraries/mobile/android#identify).

When and where you call `identify` depends on how your users are authenticated, but doing it in the `onCreate` method of your [Application](http://developer.android.com/reference/android/app/Application.html) class would be most common, as long as you know who your user is. If your user is still anonymous, you should skip this part and we'll attribute the subsequent events to an `anonymousId` instead.

Here's what a basic call to `identify` might look like:

```java
Analytics.with(context).identify("f4ca124298", new Traits().putName("Michael Bolton").putEmail("mbolton@example.com"));
```

That's identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

**Hold up though!** When you actually put that code in your Android app, you'll need to replace all those hard-coded strings with details about the currently logged-in user.

Once you've added an `identify` call, you're ready to move on to...

## Step 6. Track Actions

The track method is how you record any actions your users perform. Each action is known by a name, like "Purchased a T-Shirt". You can also record properties specific to those actions. You can read more about `track` in the [track reference](/docs/connections/sources/catalog/libraries/mobile/android#track).

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

We just walked through the quickest way to get started with Segment using Analytics for Android. You might also want to check out our full [Analytics for Android reference](/docs/connections/sources/catalog/libraries/mobile/android) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http-api/) to get a sense for the bigger picture.
