---
title: 'Quickstart: analytics-java'
hidden: true
sourceTitle: 'Java'
sourceCategory: 'Server'
---

[![Maven Central](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.java/analytics/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.segment.analytics.java/analytics)

This tutorial will help you start sending data from your program to Segment and any of our destinations, using our analytics-java library. As soon as you're setup you'll be able to turn on any new destinations with the flip of a switch!

If you want to dive deeper at any point, check out the [analytics-java reference](/docs/connections/sources/catalog/libraries/server/java).


## Step 1: Install the Library

The recommended way to install the library for Java is with a build system like Gradle or Maven. This makes it dead simple to upgrade and swap out destinations. The library is distributed via [Maven Central](http://maven.org/) as a `jar` dependency.

Here's what it would look like with Maven:

*Add to `pom.xml`:*

```xml
<dependency>
  <groupId>com.segment.analytics.java</groupId>
  <artifactId>analytics</artifactId>
  <version>LATEST</version>
</dependency>
```

*or if you're using Gradle:*

```bash
compile 'com.segment.analytics.java:analytics:+'
```

## Step 2: Initialize the SDK

Before you can send us events, you need to initialize an instance of the Analytics class. To do so, you must use the `Analytics.Builder` class.

```java
Analytics analytics = Analytics.builder(writeKey).build();
```

The Builder can also be used to customize behaviour of the Analytics instance.

*Note*: There is an internal `AnalyticsClient` class. Do not confuse this class with the public `Analytics` class and do not use this class directly.

The Analytics class has a method called `enqueue` that takes a `MessageBuilder`. Each message class has a corresponding builder that is used to construct instances of a message.

Although not enforced at compile time, make sure you provide either of `userId` or `anonymousId` for each message. Failing to do so will raise an exception at runtime.

The following examples use [Guava's](https://github.com/google/guava) immutable maps, but feel free to use plain old Java maps instead.

## Step 3: Identify Users

The `identify` message is how you tell Segment who the current user is. It includes a unique User ID and any optional traits you know about them. You can read more about it in the [identify reference](/docs/connections/sources/catalog/libraries/server/java#identify).

Here's what a basic call to `identify` a user might look like:

```java
analytics.enqueue(IdentifyMessage.builder()
    .userId("f4ca124298")
    .traits(ImmutableMap.builder()
        .put("name", "Michael Bolton")
        .put("email", "mbolton@initech.com")
        .build()
    )
);
```

**Note:** The enqueue method takes a `MessageBuilder` instance and not a `Message` instance directly. This is to allow you to use a `MessageTransformer` that applies to all incoming messages and transform or add data. Read more about it in the [transformer reference docs](/docs/connections/sources/catalog/libraries/server/java#transformer).

That's identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

**Fun Fact:** if you only want to use a basic CRM setup, you can call it a day right now. Just switch on Salesforce, Intercom, or any other CRM you'd like to use from our interface and we'll starting send all of your user data to it!

Of course, lots of analytics tools record more than just _identities_... they record the actions each user performs too! If you're looking for a complete event tracking analytics setup, keep reading...


## Step 4: Track Actions

The `track` method is how you tell Segment about which actions your users are performing on your site. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the [track reference](/docs/connections/sources/catalog/libraries/server/java#track).

Here's what a call to `track` might look like when a user signs up:

```java
analytics.enqueue(TrackMessage.builder("Signed Up")
    .userId("f4ca124298")
    .properties(ImmutableMap.builder()
        .put("plane", "Enterprise")
        .build()
    )
);
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

You'll want to track events that you're interested in, such as **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Once you've added a few `track` calls, **you're done!** You successfully installed Analytics tracking. Now you're ready to turn on any destination you fancy from our interface, margarita in hand.


---


## What's Next?

We just walked through the quickest way to get started with Segment using our Java library. You might also want to check out our full [reference](/docs/connections/sources/catalog/libraries/server/java) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http/) to get a sense for the bigger picture.

If you're running an **Ecommerce** site or app you should also check out our [Ecommerce API reference](/docs/connections/spec/ecommerce/v2/) to make sure your products and checkout experience are instrumented properly!
