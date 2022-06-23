---
title: Analytics for Go
sourceTitle: 'Go'
sourceCategory: 'Server'
repo: analytics-go
id: yBvi77aEwr
---
Our Go library lets you record analytics data from your Go code. The requests hit our servers, and then we route your data to any analytics service you enable on your destinations page.

This library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/analytics-go).

All of Segment's server-side libraries are built for high-performance, so you can use them in your web server controller code. This library uses a tunable buffer to batch messages, optimized for throughput and reduced network activity.

## Getting Started


Install `analytics-go` using `go get`:

```bash
go get gopkg.in/segmentio/analytics-go.v3
```

Then import it and initialize an instance with your source's **Write Key**. Of course, you'll want to replace `YOUR_WRITE_KEY` with your actual **Write Key** which you can find in Segment under your source settings.

```go
package main

import "gopkg.in/segmentio/analytics-go.v3"

func main() {
  client := analytics.New("YOUR_WRITE_KEY")
  defer client.Close()

  // Use the client.
}
```

That will create a `client` that you can use to send data to Segment for your source.

The default initialization settings are production-ready and queue 20 messages before sending a batch request, and a 5 second interval.

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

```go
client.Enqueue(analytics.Identify{
  UserId: "019mr8mf4r",
  Traits: analytics.NewTraits().
    SetName("Michael Bolton").
    SetEmail("mbolton@example.com").
    Set("plan", "Enterprise").
    Set("friends", 42),
})
```

This call is identifying  Michael by his unique User ID (the one you know him by in your database) and label him with `name`, `email`, `plan` and `friends` traits.

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

Find details on the **identify method payload** in our [Spec](/docs/connections/spec/identify/).

## Track

`track` lets you record the actions your users perform.Every action triggers what we call an "event", which can also have associated properties.

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Example `track` call:

```go
client.Enqueue(analytics.Track{
  UserId: "f4ca124298",
  Event:  "Signed Up",
  Properties: analytics.NewProperties().
    Set("plan", "Enterprise"),
})
```

This example `track` call tells us that your user just triggered the **Signed Up** event choosing the "Enterprise" plan.

`track` event properties can be anything you want to record. In this case, plan type.

The `track` call has the following fields:

<table class="api-table">
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

## Page

The [`page`](/docs/connections/spec/page/) method lets you record page views on your website, along with optional extra information about the page being viewed.

If you're using our client-side set up in combination with the Go library, **page calls are already tracked for you** by default. However, if you want to record your own page views manually and aren't using our client-side library, read on!

Example `page` call:

```go
client.Enqueue(analytics.Page{
  UserId: "f4ca124298",
  Name:   "Go Library",
  Properties: analytics.NewProperties().
    SetURL("https://segment.com/libraries/go/"),
})
```

The `page` call has the following fields:

<table>
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

`group` lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/node/#identify) with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example `group` call:

```go
client.Enqueue(analytics.Group{
  UserId:  "019mr8mf4r",
  GroupId: "56",
  Traits: map[string]interface{}{
    "name":        "Initech",
    "description": "Accounting Software",
  },
})
```

The `group` call has the following fields:

<table class="api-table">
  <tr>
    <td>`groupId` _String_</td>
    <td>The ID for this group in your database.</td>
  </tr>
  <tr>
    <td>`traits` _Traits, optional_</td>
    <td>A dictionary of traits you know about the group. Things like: <code>name</code> or <code>website</code>.</td>
  </tr>
</table>

Find more details about `group` including the **`group` payload** in our [Spec](/docs/connections/spec/group/).

## Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

```go
client.Enqueue(analytics.Alias{
  PreviousId: "anonymousUser",
  UserId:     "019mr8mf4r",
})
```

The `alias` call has the following fields:

<table class="api-table">
  <tr>
    <td>`UserId` _string_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`PreviousId` _string_</td>
    <td>The previous ID to alias from.</td>
  </tr>
</table>

Here's a full example of how we might use the `alias` call:

```go
// the anonymous user does actions ...
client.Enqueue(analytics.Track{
  Event:  "Anonymous Event",
  UserId: anonymousUser,
})

// the anonymous user signs up and is aliased
client.Enqueue(analytics.Alias{
  PreviousId: anonymousUser,
  UserId:     "019mr8mf4r",
})

// the identified user is identified
client.Enqueue(analytics.Identify{
  UserId: "019mr8mf4r",
  Traits: map[string]interface{}{
    "name":    "Michael Bolton",
    "email":   "mbolton@example.com",
    "plan":    "Enterprise",
    "friends": 42,
  },
})

// the identified user does actions ...
client.Enqueue(analytics.Track{
  Event:      "Item Viewed",
  UserId:     "019mr8mf4r",
  Properties: map[string]interface{}{
    "item": "lamp",
  },
})
```

For more details about `alias`, including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).

---


## Development Settings

You can use the `BatchSize` field of your configuration to 1 during development to make the library flush every time a message is submitted, so that you can be sure your calls are working properly.

```go
func main() {
  client, _ := analytics.NewWithConfig("YOUR_WRITE_KEY", analytics.Config{
		BatchSize: 1,
	})
}
```

## Logging

The `Verbose` field of your configuration controls the level of logging, while the `Logger` field provides a hook to capture the log output:

```go
func main() {
  client, _ := analytics.NewWithConfig("YOUR_WRITE_KEY", analytics.Config{
		Verbose: true,
		Logger:  analytics.StdLogger(log.New(os.Stderr, "segment ", log.LstdFlags)),
	})
}
```

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an object of `context.integrations` that lets you turn certain integrations on or off. By default all destinations are enabled.

Here's an example `track` call with the `context.integrations` object shown.

```go
client.Enqueue(analytics.Track{
  Event:  "Membership Upgraded",
  UserId: "019mr8mf4r",
  Integrations: map[string]interface{}{
    "All":      false,
    "Mixpanel": true,
  },
})
```

In this case, we're specifying that we want this `Track` to only go to Vero. `All: false` says that no destination should be enabled unless otherwise specified. `Vero: true` turns on Vero, etc.

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**Note:**

- Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

- If you are on a grandfathered plan, events sent server-side that are filtered through the Segment dashboard will still count towards your API usage.

## Historical Import

You can import historical data by adding the `timestamp` argument to any of your method calls. This can be helpful if you've just switched to Segment.

Historical imports can only be done into destinations that can accept historical timestamped data. Most analytics tools like Mixpanel, Amplitude, Kissmetrics, etc. can handle that type of data just fine. One common destination that does not accept historical data is Google Analytics since their API cannot accept historical data.

**Note:** If you're tracking things that are happening right now, leave out the `timestamp` and our servers will timestamp the requests for you.


## Context

You can send Context fields in two ways with the Go library.

Firstly, you can set a global context field that will be set on all messages from the client.

```go
client, _ := analytics.NewWithConfig("h97jamjwbh", analytics.Config{
  DefaultContext: &analytics.Context{
    App: analytics.AppInfo{
      Name:    "myapp",
      Version: "myappversion",
    },
  },
})
```

Secondly, you can set a context field on specific events.

```go
client.Enqueue(analytics.Identify{
        UserId: "019mr8mf4r",
        Traits: analytics.NewTraits().
            Set("friends", 42),
        Context: &analytics.Context{
            Extra: map[string]interface{}{
                "active": true,
            },
        },
})
```

Note that any custom fields must be set under the `Extra` field. They will automatically be inlined into the serialized `context` structure. For instance, the identify call above would be serialized to:

```json
{
  "type": "identify",
  "userId": "019mr8mf4r",
  "traits": {
    "friends": 42,
  },
  "context": {
    "active": true,
    "library": {
      "name": "analytics-go",
      "version": "3.0.0"
    }
  }
}
```

## Batching

Our libraries are built to support high performance environments. That means it is safe to use analytics-go on a web server that's serving hundreds of requests per second.

Every method you call **does not** result in an HTTP request, but is queued in memory instead. Messages are flushed in batch in the background, which allows for much faster operation. If batch messages are not arriving in your debugger and no error is being thrown you may want to slow the speed of your scipt down. This is because we run a message batching loop in a go-routine so if the script runs too fast it won't execute on the network calls before it exits the loop.

By default, our library will flush:

+ every 20 messages (control with `FlushAt`)
+ if 5 seconds has passed since the last flush (control with `FlushAfter`)

There is a maximum of `500KB` per batch request and `32KB` per call.

{% include content/tracking-api-limit.md %}

Sometimes you might not want batching (eg. when debugging, or in short-lived programs). You can turn off batching by setting the `FlushAt` argument to `1`, and your requests will always be sent right away.


## Options

If you hate defaults you can configure analytics-go has a lot of configuration options. You can read more in the [Godocs](https://godoc.org/gopkg.in/segmentio/analytics-go.v3#Config).

## Version 2 (Deprecated)

If you're looking for documentation for the v2 version of the library, [click here](/docs/connections/sources/catalog/libraries/server/go/v2/).

## Migrating from v2

v3 is a rewrite of our v2 version of the Go Library. We recommend using v3 as it supports many new features, has significant design improvements and is better tested.

v3 is currently in the `v3.0` branch to minimize breaking changes for customers not using a package manager. You can refer to the documentation for your package manager to see how to use the `v3.0` branch.

e.g. with [govendor](https://github.com/kardianos/govendor), you would run the command:

```bash
govendor fetch github.com/segmentio/analytics-go@v3.0
```

Alternatively, you can also use [`gopkg.in`](http://labix.org/gopkg.in). First run `go get gopkg.in/segmentio/analytics-go.v3` and replace your imports with `import "gopkg.in/segmentio/analytics-go.v3"`.

To help with migrating your code, we recommend checking out a simple example that we've written in [v2](https://github.com/segmentio/analytics-go/blob/v2.0/examples/track.go) and [v3](https://github.com/segmentio/analytics-go/blob/v3.0/examples/track.go) so you can easily see the differences.

The first difference you'll notice is that `Client` is now an interface. It has a single method - `Enqueue` that can accept messages of all types.

```go
track := analytics.Track{
  Event:  "Download",
  UserId: "123456",
  Properties: map[string]interface{}{
    "application": "Segment Desktop",
    "version":     "1.1.0",
    "platform":    "osx",
  },
}

// in v2, you would call the `Track` method with a `Track` struct.
client.Track(&track)

// in v3, you would call the `Enqueue` method with a `Track` struct.
// Note that a pointer is not used here.
client.Enqueue(track)
```

Secondly, you'll notice that there are new types such as `analytics.Properties` and `analytics.Traits`. These can be used to replace `map[string]interface{}`. They provide type safety and reduce the chance of accidentally sending fields that are named incorrectly.

For instance, the following two examples are functionally equivalent in v3.

```go
client.Enqueue(analytics.Track{
  UserId: "f4ca124298",
  Event:  "Signed Up",
  Properties: analytics.NewProperties().
    SetCategory("Enterprise").
    Set("application", "Segment Desktop"),
})
```

```go
client.Enqueue(analytics.Track{
  UserId: "f4ca124298",
  Event:  "Signed Up",
  Properties: map[string]interface{}{
    "category": "Segment Desktop",
    "application": "Segment Desktop",
  },
})
```

Lastly, you'll notice that configuration is provided during initialization and cannot be changed after initialization. The various configuration options are documented in the [GoDocs](https://godoc.org/gopkg.in/segmentio/analytics-go.v3#Config).

These are examples of applying same configuration options in v2 and v3.

```go
// Example in v2:
client := analytics.New("h97jamjwbh")
client.Interval = 30 * time.Second
client.Verbose = true
client.Size = 100

// Example in v3:
client, _ := analytics.NewWithConfig("h97jamjwbh", analytics.Config{
  Interval:  30 * time.Second,
  BatchSize: 100,
  Verbose:   true,
})
```

## What's new in v3

v3 is a rewrite of our v2 version of the Go Library with many new features!

* New type safe API to set properties, traits and context fields. This is less error prone than using the `map[string]interface{}` type (though you can still do so).

```go
client.Enqueue(analytics.Track{
  UserId: "f4ca124298",
  Event:  "Signed Up",
  Properties: analytics.NewProperties().
    SetCategory("Enterprise"),
    SetCoupon("synapse"),
    SetDiscount(10),
})
```

* Dynamically split batches into appropriately sized chunks to meet our [API size limits](https://segment.com/docs/connections/sources/catalog/libraries/server/http/#max-request-size). Previously you would have to calculate the batch size depending on this size of your data to figure out the appropriate size.

* Improved logging abstraction. Previously we relied solely on the standard library `log.Logger` type which cannot distinguish between error and non-error logs. v3 has it's own [`Logger`](https://godoc.org/gopkg.in/segmentio/analytics-go.v3#Logger) interface that can be used to capture errors for your own reporting purposes. An adapter for the [standard library logger](https://godoc.org/gopkg.in/segmentio/analytics-go.v3#StdLogger) is also included.

* Ability to configure the retry policy based on the number of attempts.

```go
client, _ := analytics.NewWithConfig("h97jamjwbh", analytics.Config{
  RetryAfter: func(attempt int) time.Duration {
    return time.Duration(attempt * 10)
  },
})
```

* Configurable default context on all messages.

```go
client, _ := analytics.NewWithConfig("h97jamjwbh", analytics.Config{
  DefaultContext: &analytics.Context{
    App: analytics.AppInfo{
      Name:    "myapp",
      Version: "myappversion",
    },
  },
})
```

## Troubleshooting

{% include content/troubleshooting-intro.md %}
{% include content/troubleshooting-server-debugger.md %}
{% include content/troubleshooting-server-integration.md %}
