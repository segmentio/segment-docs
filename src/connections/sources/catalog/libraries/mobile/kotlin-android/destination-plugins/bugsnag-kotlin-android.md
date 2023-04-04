---
title: Analytics Kotlin BugSnag Plugin
strat: kotlin-android
---

Bugsnag helps you detect and diagnose crashes in your application. Depending on the data you provide, Bugsnag can filter errors based on user name, user email, timeline, release stages, paying user status, and more. Add BugSnag tracking support to your applications via this plugin for [Analytics-Kotlin](https://github.com/segmentio/analytics-kotlin).

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "BugSnag" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Add your API key to your connection settings. You can find your API key in your Bugsnag dashboard under “Settings”, which is located in the upper left-hand corner.

## Adding the dependency
To install the Segment-bugsnag integration, simply add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:bugsnag:<latest_version>'
```
Or the following for Kotlin DSL
```
implementation("com.segment.analytics.kotlin.destinations:bugsnag:<latest_version>")
```

Also add the BugSnag Gradle plugin dependency to your project level build.gradle.

```
buildscript {
    dependencies {
        // ...
        classpath "com.bugsnag:bugsnag-android-gradle-plugin:7.4.1"
    }
}
```
Or the following for Kotlin DSL
```
buildscript {
    dependencies {
        // ...
        classpath("com.bugsnag:bugsnag-android-gradle-plugin:7.4.1")
    }
}
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library. Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.bugsnag.BugsnagDestination
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = BugsnagDestination())
```

Your events will now begin to flow to bugsnag in device mode.

## Identify

Once you've correctly set up your Bugsnag integration, you should [`identify`](/docs/connections/spec/identify/) each of your users as soon as you know their identity (this typically happens after log in or sign up), so that Bugsnag can provide you with more visibility into which user is encountering which error.

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```java
analytics.identify("user-123", buildJsonObject {
    put("username", "MisterWhiskers")
    put("email", "hello@test.com")
    put("plan", "premium")
});
```

Bugsnag will show you the `userId` and `traits` in the Users tab of each error.

## Error Reporting

In addition to sending Bugsnag user-specific information, you can send handled exceptions and diagnostic data to your Bugsnag dashboard using Bugsnag's native methods. Documentation on these methods is available [on their website](https://docs.bugsnag.com/platforms/browsers/#reporting-handled-exceptions).
