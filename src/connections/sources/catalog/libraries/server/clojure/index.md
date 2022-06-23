---
title: Analytics for Clojure
sourceTitle: 'Clojure'
sourceCategory: 'Server'
shortName: 'clojure'
id: B6L7qzHmhI
---
The clojure library lets you record analytics data from your clojure code. The requests hit our servers, and then we route your data to any analytics service you enable on your destinations page.

The library is open-source and was contributed by the very awesome [CircleCI](https://circleci.com/), thanks! You can [check it out on GitHub](https://github.com/circleci/analytics-clj). The clojure library is a wrapper around our [Java library](https://github.com/segmentio/analytics-java).

The clojure library (like our other server side libraries) is built for high-performance, so you can use them in your web server controller code. This library uses an internal queue to make calls non-blocking and fast. It also batches messages and flushes asynchronously to our servers.

## Getting Started

If you're using Maven add this repository definition to your `pom.xml`:

```xml
<repository>
  <id>clojars.org</id>
  <url>http://clojars.org/repo</url>
</repository>
```

Then, if you're using Leiningen:

```
[circleci/analytics-clj "0.8.0"]
```

or with Maven

```xml
<dependency>
  <groupId>circleci</groupId>
  <artifactId>analytics-clj</artifactId>
  <version>0.8.0</version>
</dependency>
```

You only need to initialize once at the start of your program. You can then keep
using the `Analytics` singleton anywhere in your code.

```
(use '[circleci.analytics-clj.core])
(def analytics (initialize "<writeKey>"))
```

The default initialization settings are production-ready.

### Regional configuration
For Business plans with access to [Regional Segment](/docs/guides/regional-segment), you can use the `host` configuration parameter to send data to the desired region:
1. Oregon (Default) — `api.segment.io/v1`
2. Dublin — `events.eu1.segmentapis.com/v1/`

## Identify

`identify` lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

We recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits are change.

Example `identify` call:

```
(identify analytics "user-id" {:email "bob@acme.com"})
```

This call is identifying the user by his unique User ID (the one you know him by in your database) and labeling him with an `email` trait.

The `identify` call has the following fields:

<table class="api-table">
  <tr>
    <td>`user-id` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`traits` _Map, optional_</td>
    <td>A map of traits you know about the user. Things like: <code>email</code>, <code>name</code> or <code>friends</code>.</td>
  </tr>
</table>

Find details on the **identify method payload** in our [Spec](/docs/connections/spec/identify/).

## Track

`track` lets you record the actions your users perform.  Every action triggers what we call an "event", which can also have associated properties.

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Example `track` call:

```
(track analytics "user-id" "Signed Up" {:plan "trial"})
```

```
(track analytics (:id user) "signup" {:company "Acme Inc."} {:context {:language "en-us"}
   :integrations {"AdRoll" false}
   :integration-options {"Amplitude" {:session-id (:id session)}}})
```

This example `track` call tells us that your user just triggered the **Signed Up** event on a "trial" plan.

`track` event properties can be anything you want to record. In this case, plan type.

The `track` call has the following fields:

<table class="api-table">
  <tr>
    <td>`user-id` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`event` _String_</td>
    <td>The name of the event you're tracking. We recommend human-readable names like <strong>Song Played</strong> or <strong>Status Updated</strong>.</td>
  </tr>
  <tr>
    <td>`properties` _Map, optional_</td>
    <td>A map of properties for the event. If the event was <strong>Added to Cart</strong>, it might have properties like <code>price</code> or <code>product</code>.</td>
  </tr>
</table>

Find details on **best practices in event naming** as well as the **`track` method payload** in our [Spec](/docs/connections/spec/track/).

## Group

`group` lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/java/#identify) user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.


```
(group analytics "1234" "group-5678" {:name "Segment"})
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

## Screen

The [`screen`](/docs/connections/spec/screen/) method lets you record whenever a user sees a screen of your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event an event whenever the user opens a screen in your app.

Not all services support screen, so when it's not supported explicitly, the screen method tracks as an event with the same parameters.

```
(screen analytics "1234" "Login" {:path "/users/login"})
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
    <td>A dictionary of properties for the webpage visit. If the event was **Login**, it might have properties like <code>path</code> or <code>title</code>.</td>
  </tr>
</table>

## Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

```
(alias analytics "user-id" "real-id")
```

For more details about `alias`, including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).

---

## Builder

If the above methods don't meet your needs, you can use the builder types directly.

```
(enqueue analytics (doto (YourMessageType/builder)
 (.userId "user-id")
 (.properties {"company" "Acme Inc."})))
```

## Logging

You can set a custom logger on the client using:

```
(defn logger []
  (reify com.segment.analytics.Log
    (print [this level format args]
      (println (str (java.util.Date.) "\t" level "\t" args)))
    (print [this level error format args]
      (println error))))

(def analytics (initialize "<writeKey>" {:log (logger)}))
```

## Troubleshooting

{% include content/troubleshooting-intro.md %}

<!-- LR: no quickstart for this file. removing this include and manually putting in a flat text version that can be customized {% include content/troubleshooting-server-debugger.md %} -->

### No events in my debugger

1. Double check that you've set up the library correctly.

2. Make sure that you're calling one of our API methods once the library is successfully installed—[`identify`](#identify), [`track`](#track), etc.



{% include content/troubleshooting-server-integration.md %}
