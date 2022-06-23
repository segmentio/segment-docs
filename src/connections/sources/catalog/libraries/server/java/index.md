---
title: Analytics for Java
repo: analytics-java
id: V6ynUvQgbc
---
[![Maven Central](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.java/analytics/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.java/analytics)

Our Java library lets you record analytics data from your Java code. The requests hit our servers, and then we route your data to any analytics service you enable on your destinations page.

This library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/analytics-java).

All of Segment's server-side libraries are built for high-performance, so you can use them in your web server controller code. This library uses an internal queue to make all calls non-blocking and fast. It also batches messages and flushes asynchronously to our servers.

Want to stay updated on releases? Subscribe to the [release feed](https://github.com/segmentio/analytics-java/releases.atom).


## Getting Started

[![Maven Central](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.java/analytics/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.java/analytics)

The recommended way to install the library for Java is with a build system like Gradle or Maven. This makes it simple to upgrade and swap out destinations. The library is distributed using [Maven Central](http://maven.org/){:target="_blank"}  as a `jar` dependency.

Here's what it would look like with Maven:

Add to `pom.xml`:

```xml
<dependency>
  <groupId>com.segment.analytics.java</groupId>
  <artifactId>analytics</artifactId>
  <version>LATEST</version>
</dependency>
```

or if you're using Gradle:

```bash
implementation 'com.segment.analytics.java:analytics:+'
```

### Initialize the SDK

Before you can send events to Segment, you need to initialize an instance of the Analytics class. To do so, you must use the `Analytics.Builder` class.

```java
Analytics analytics = Analytics.builder(writeKey).build();
```

Of course, you'll want to replace writeKey with your actual **Write Key** which you can find in Segment under your source settings.

The Builder can also be used to customize behaviour of the Analytics instance.

**Note:** There is an internal `AnalyticsClient` class. Do not confuse this class with the public `Analytics` class and do not use this class directly.

The Analytics class has a method called `enqueue` that takes a `MessageBuilder`. Each message class has a corresponding builder that is used to construct instances of a message.

Although not enforced at compile time, make sure you provide either of `userId` or `anonymousId` for each message. Failing to do so will raise an exception at runtime.

The following examples use [Guava's](https://github.com/google/guava) immutable maps, but feel free to use plain old Java maps instead.

### Regional configuration
For Business plans with access to [Regional Segment](/docs/guides/regional-segment), you can use the `host` configuration parameter to send data to the desired region:
1. Oregon (Default) — `api.segment.io/v1`
2. Dublin — `events.eu1.segmentapis.com/v1/`
## Identify

> note ""
> **Good to know**: For any of the different methods described on this page, you can replace the properties and traits in the code samples with variables that represent the data collected.

`identify` lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

We recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits change.

Example `identify` call:

```java
Map<String, String> map = new HashMap();
map.put("name", "Michael Bolton");
map.put("email", "mbolton@example.com");

analytics.enqueue(IdentifyMessage.builder()
        .userId("f4ca124298")
        .traits(map));
```

This call is identifying  Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

The `identify` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`traits` _Traits, optional_</td>
    <td>A dictionary of traits you know about the user. Things like: <code>email</code>, <code>name</code> or <code>friends</code>.</td>
  </tr>
</table>

**Note:** The enqueue method takes a `MessageBuilder` instance and not a `Message` instance directly. This is to allow you to use a `MessageTransformer` that applies to all incoming messages and transform or add data. <!-- LR: can't find this section, commenting out.
Read more in our [transformer reference section](/docs/connections/sources/catalog/libraries/server/java#transformer).-->

Find details on the **identify method payload** in our [Spec](/docs/connections/spec/identify/).

## Track

`track` lets you record the actions your users perform.  Every action triggers what we call an "event", which can also have associated properties.

You'll want to track events that you're interested in, such as **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Example `track` call:

```java
analytics.enqueue(TrackMessage.builder("Item Purchased")
    .userId("f4ca124298")
    .properties(ImmutableMap.builder()
        .put("revenue", 39.95)
        .put("shipping", "2-day")
        .build()
    )
);
```
This example `track` call tells us that your user just triggered the **Item Purchased** event with a revenue of $39.95 and chose your hypothetical '2-day' shipping.

`track` event properties can be anything you want to record. In this case, revenue and shipping.

The `track` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`event` _String_</td>
    <td>The name of the event you're tracking. We recommend human-readable names like **Song Played** or **Status Updated**.</td>
  </tr>
  <tr>
    <td>`properties` _Properties, optional_</td>
    <td>A dictionary of properties for the event. If the event was **Product Added**, it might have properties like <code>price</code> or <code>product</code>.</td>
  </tr>
</table>

Find details on **best practices in event naming** as well as the **`track` method payload** in our [Spec](/docs/connections/spec/track/).

## Screen

The [`screen`](/docs/connections/spec/screen/) method lets you record whenever a user sees a screen of your mobile app, along with optional extra information about the screen being viewed.

You'll want to record a screen event an event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Not all services support screen, so when it's not supported explicitly, the screen method tracks as an event with the same parameters.

Example `screen` call:

```java
analytics.enqueue(ScreenMessage.builder("Schedule")
    .userId("f4ca124298")
    .properties(ImmutableMap.builder()
        .put("category", "Sports")
        .put("path", "/sports/schedule")
        .build()
    )
);
```

The `screen` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`name` _String_</td>
    <td>The webpage name you're tracking. We recommend human-readable names like **Login** or **Register**.</td>
  </tr>
  <tr>
    <td>`properties` _Properties, optional_</td>
    <td>A dictionary of properties for the screen visit. If the screen was **Login**, it might have properties like <code>path</code> or <code>title</code>.</td>
  </tr>
</table>

Find details on the **`screen` payload** in our [Spec](/docs/connections/spec/screen/).

## Page

The [`page`](/docs/connections/spec/page/) method lets you record whenever a user sees a page of your website, along with optional extra information about the page being viewed.

Not all services support page, so when it's not supported explicitly, the page method typically tracks as an event with the same parameters.

Example `page` call:

```java
analytics.enqueue(PageMessage.builder("Schedule")
    .userId("f4ca124298")
    .properties(ImmutableMap.builder()
        .put("category", "Sports")
        .put("path", "/sports/schedule")
        .build()
    )
);
```

The `page` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`name` _String_</td>
    <td>The webpage name you're tracking. We recommend human-readable names like **Login** or **Register**.</td>
  </tr>
  <tr>
    <td>`properties` _Properties, optional_</td>
    <td>A dictionary of properties for the page visit. If the page was **Login**, it might have properties like <code>path</code> or <code>title</code>.</td>
  </tr>
</table>

Find details on the **`page` payload** in our [Spec](/docs/connections/spec/page/).

## Group

`group` lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/java/#identify) user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example `group` call:

```java
analytics.enqueue(GroupMessage.builder("some-group-id")
    .userId("f4ca124298")
    .traits(ImmutableMap.builder()
        .put("name", "Segment")
        .put("size", 50)
        .build()
    )
);
```

The `group` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`groupId` _String_</td>
    <td>The ID for this group in your database.</td>
  </tr>
  <tr>
    <td>`traits` _Traits, optional_</td>
    <td>A dictionary of traits you know about the group. Things like: <code>name</code> or <code>website</code>.</td>
  </tr>
</table>

Find more details about `group`, including the **`group` payload**, in our [Spec](/docs/connections/spec/group/).

## Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

```java
analytics.enqueue(AliasMessage.builder("previousId")
    .userId("f4ca124298")
);
```

Here's a full example of how we might use the `alias` call:

```java
// the anonymous user does actions ...
track("anonymous_user", "Anonymous Event");
// the anonymous user signs up and is aliased
alias("anonymous_user", "identified@example.com");
// the signed up user is identified
identify("identified@example.com", new Traits("plan", "Free"));
// the identified user does actions ...
track("identified@example.com", "Identified Action");
```

For more details about `alias`, including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).

---

## Historical Import

You can import historical data by adding the `timestamp` argument to any of your method calls. This can be helpful if you've just switched to Segment.

Historical imports can only be done into destinations that can accept historical timestamped data. Most analytics tools like Mixpanel, Amplitude, Kissmetrics, etc. can handle that type of data just fine. One common destination that does not accept historical data is Google Analytics since their API cannot accept historical data.

**Note:** If you're tracking things that are happening right now, leave out the `timestamp` and our servers will timestamp the requests for you.

```java
Date historicalDate = ...;
analytics.enqueue(TrackMessage.builder("Button Clicked")
    .userId("f4ca124298")
    .timestamp(historicalDate)
);
```

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an object of `integrations` that lets you turn certain destinations on or off. By default all destinations are enabled.

Similar to timestamp, the builders take a map of destinations that control which analytics destinations you want each message to go to.

```java
analytics.enqueue(TrackMessage.builder("Button Clicked")
    .userId("f4ca124298")
    .enableIntegration("All", false)
    .enableIntegration("Amplitude", true)
);
```

In this case, we're specifying that we want this identify to only go to Amplitude. `"all", false` says that no destination should be enabled unless otherwise specified. `{ "Amplitude", true }` turns on Amplitude.

destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**Note:**

- Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

- If you are on a grandfathered plan, events sent server-side that are filtered through the Segment dashboard will still count towards your API usage.

## Context

If you're running a web server, you might want to send context variables such as `userAgent` or `ip` with your `page` or `screen` calls. You can do so by setting the `Context`.

```java
analytics.enqueue(TrackMessage.builder("Button Clicked")
    .userId("f4ca124298")
    .context(ImmutableMap.builder()
        .put("ip", "12.212.12.49")
        .put("language", "en-us")
        .build()
    )
);
```

## Batching

Our libraries are built to support high performance environments. That means it is safe to use analytics-java on a web server that's serving hundreds of requests per second. For more information, check out the [java benchmark](https://github.com/segmentio/analytics-java-benchmark).

Every method you call **does not** result in an HTTP request, but is queued in memory instead. Messages are flushed in batch in the background, which allows for much faster operation.

There is a maximum of `500KB` per batch request and `32KB` per call.

{% include content/tracking-api-limit.md %}


## How do I flush right now?!

You can also flush on demand. For example, at the end of your program, you'll want to flush to make sure there's nothing left in the queue. Just call the `flush` method:

```java
analytics.flush()
```

Calling this method will notify the client to upload any events in the queue.

## How do I gzip requests?

The Java library does not automatically gzip requests, but allows you to do so if you desire using interceptors in [OkHttp](https://github.com/square/okhttp/wiki/Interceptors#rewriting-requests). See the [sample app](https://github.com/segmentio/analytics-java/blob/master/analytics-sample/src/main/java/sample/Main.java) in our repo for a working example.


## Multiple Clients

Different parts of your app may require different types of batching. In that case, you can initialize different `Analytics` instances. Simply use the builder method (you can reuse it with different parameters) to create different instances.

```java
Analytics.Builder builder = Analytics.builder(writeKey);
Analytics first = builder.build();
Analytics second = builder.flushInterval(2, TimeUnit.SECONDS).build();
```

## Logging

You can enable verbose logging to see what data is being sent over HTTP when debugging issues. You can enable logging by initializing the library like this:

```java
Log STDOUT = new Log() {
    @Override
    public void print(Level level, String format, Object... args) {
        System.out.println(level + ":\t" + String.format(format, args));
    }

    @Override
    public void print(Level level, Throwable error, String format, Object... args) {
        System.out.println(level + ":\t" + String.format(format, args));
        System.out.println(error);
    }
};

Analytics analytics = Analytics.builder("<writeKey>")
        .log(STDOUT)
        .build();
```

For more advance logging, you can check out the [sample code](https://github.com/segmentio/analytics-java/tree/master/analytics-sample/src/main/java/sample) in our open-source library.

## Java Support

Segment supports Java 8, 9, 10, and 11. The library may work on other versions of Java as well, however we don't test for compatibility on unsupported versions.

## Snapshots

To add a snapshot dependency to your builds, make sure you add the snapshot repository so your build system can look up the dependency.

Maven users can add the following to their `pom.xml`:
```
<repository>
    <id>ossrh</id>
    <name>Sonatype Snapshot Repository</name>
    <url>https://oss.sonatype.org/content/repositories/snapshots/</url>
    <releases>
        <enabled>false</enabled>
    </releases>
    <snapshots>
        <enabled>true</enabled>
    </snapshots>
</repository>
```

Gradle users should declare this in their repositories block:
```
repositories {
  mavenCentral()
  maven { url 'https://oss.sonatype.org/content/repositories/snapshots/' }
}
```

## Troubleshooting

{% include content/troubleshooting-intro.md %}
{% include content/troubleshooting-server-debugger.md %}
{% include content/troubleshooting-server-integration.md %}
