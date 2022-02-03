---
title: Analytics for Go v2 (Deprecated)
hidden: true
---


Our Go library lets you record analytics data from your Go code. The requests hit our servers, and then we route your data to any analytics service you enable on your destinations page.

This library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/analytics-go).

All of Segment's server-side libraries are built for high-performance, so you can use them in your web server controller code. This library uses a tunable buffer to batch messages, optimized for throughput and reduced network activity.

## Getting Started

### Install the Package

Install `analytics-go` using `go get`:

```bash
go get github.com/segmentio/analytics-go
```

Then import it and initialize an instance with your source's **Write Key**. Of course, you'll want to replace `YOUR_WRITE_KEY` with your actual **Write Key** which you can find in Segment under your source settings.

```go
package main

import "github.com/segmentio/analytics-go"

func main() {
  client := analytics.New("YOUR_WRITE_KEY")
}
```

That will create a `client` that you can use to send data to Segment for your source.

The default initialization settings are production-ready and queue 20 messages before sending a batch request, and a 5 second interval.

## Identify

`identify` lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

We recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits change.

Example `identify` call:

```go
client.Identify(&analytics.Identify{
  UserId: "019mr8mf4r",
  Traits: map[string]interface{}{
    "name":    "Michael Bolton",
    "email":   "mbolton@example.com",
    "plan":    "Enterprise",
    "friends": 42,
  },
})
```

This call is identifying  Michael by his unique User ID (the one you know him by in your database) and label him with `name`, `email`, `plan` and `friends` traits.

The `identify` call has the following fields:

<table class="api-table">
  <tr>
    <td>`message` _map[string]interface{}_</td>
    <td>Identify message. A `userId` or `anonymousId` is required.</td>
  </tr>
</table>

Find details on the **identify method payload** in our [Spec](/docs/connections/spec/identify/).

## Track

`track` lets you record the actions your users perform.Every action triggers what we call an "event", which can also have associated properties.

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Example `track` call:

```go
client.Track(&analytics.Track{
  Event:      "Signed Up",
  UserId:     "f4ca124298",
  Properties: map[string]interface{}{
    "plan": "Enterprise",
  },
})
```

This example `track` call tells us that your user just triggered the **Signed Up** event choosing the "Enterprise" plan.

`track` event properties can be anything you want to record. In this case, plan type.

The `track` call has the following fields:

<table class="api-table">
  <tr>
    <td>`message` _map[string]interface{}_</td>
    <td>Track message. An `event` name and `userId` or `anonymousId` is required.</td>
  </tr>
</table>

Find details on **best practices in event naming** as well as the **`track` method payload** in our [Spec](/docs/connections/spec/track/).

## Page

The [`page`](/docs/connections/spec/page/) method lets you record page views on your website, along with optional extra information about the page being viewed.

If you're using our client-side set up in combination with the Go library, **page calls are already tracked for you** by default. However, if you want to record your own page views manually and aren't using our client-side library, read on!

Example `page` call:

```go
client.Page(&analytics.Page{
    UserId:     "f4ca124298",
    Category:   "Docs",
    Name:       "Go library",
    Traits:     map[string]interface{}{"url": "https://segment.com/libraries/go/"},
})
```

The `page` call has the following fields:

<table>
  <tr>
    <td>`UserId` _string_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`Category` _string, optional_</td>
    <td>The category of the page. Useful for things like ecommerce where many pages often live under a larger category.</td>
  </tr>
  <tr>
    <td>`Name` _string, optional_</td>
    <td>The name of the of the page, for example **Signup** or **Home**.</td>
  </tr>
  <tr>
    <td>`Traits` _map[string]interface{}, optional_</td>
    <td>A few traits about the page that are specially recognized and automatically translated: `url`, `title`, `referrer` and `path`, but you can add your own too!</td>
  </tr>
  <tr>
    <td>`Timestamp` _string, optional_</td>
    <td>If the track just happened, leave it out and we'll use the server's time. If you're importing data from the past make sure you to send a `timestamp`.  Timestamp should be in [iso8601](http://www.iso.org/iso/home/standards/iso8601.htm) form.</td>
  </tr>
  <tr>
    <td>`Context` _map[string]interface{}, optional_</td>
    <td>Extra [context]() to attach to the call. **Note:** `context` differs from `traits` because it is not attributes of the user itself.</td>
  </tr>
  <tr>
    <td>`AnonymousId` _string, optional_</td>
    <td>An ID to associated with the user when you don't know who they are (eg., [the anonymousId generated by `analytics.js`](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#anonymous-id))</td>
  </tr>
</table>

Find details on the **`page` payload** in our [Spec](/docs/connections/spec/page/).

## Group

`group` lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/node/#identify) with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example `group` call:

```go
client.Group(&analytics.Group{
  UserId:  "019mr8mf4r",
  GroupId: "56",
  Traits:  map[string]interface{}{
    "name":        "Initech",
    "description": "Accounting Software",
  },
})
```

The `group` call has the following fields:

<table class="api-table">
  <tr>
    <td>`message` _map[string]interface{}_</td>
    <td>Group message. An `event` name and `userId` or `anonymousId` is required.</td>
  </tr>
</table>

Find more details about `group` including the **`group` payload** in our [Spec](/docs/connections/spec/group/).

## Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

```go
client.Alias(&analytics.Alias{
  PreviousId: anonymousUser,
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
client.Track(&analytics.Track{
  Event:  "Anonymous Event",
  UserId: anonymousUser,
})

// the anonymous user signs up and is aliased
client.Alias(&analytics.Alias{
  PreviousId: anonymousUser,
  UserId:     "019mr8mf4r",
})

// the identified user is identified
client.Identify(&analytics.Identify{
  UserId: "019mr8mf4r",
  Traits: map[string]interface{}{
    "name":    "Michael Bolton",
    "email":   "mbolton@example.com",
    "plan":    "Enterprise",
    "friends": 42,
  },
})

// the identified user does actions ...
```go
client.Track(&analytics.Track{
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

You can use the `Size` field set to 1 during development to make the library flush every time a message is submitted, so that you can be sure your calls are working properly.

```go
func main() {
  client := analytics.New("YOUR_WRITE_KEY")
  client.Size = 1
}
```

## Logging

The `DEBUG` environment variable can be used to enable logging during runtime, like so:

```
DEBUG=analytics go run test.go
```

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an object of `context.integrations` that lets you turn certain integrations on or off. By default all destinations are enabled.

Here's an example `track` call with the `context.integrations` object shown.

```go
  client.Track(&analytics.Track{
  Event:   "Membership Upgraded",
  UserId:  "019mr8mf4r",
  Integrations: map[string]interface{}{
    "All":              false,
    "Mixpanel":         true,
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


## Batching

Our libraries are built to support high performance environments. That means it is safe to use analytics-go on a web server that's serving hundreds of requests per second.

Every method you call **does not** result in an HTTP request, but is queued in memory instead. Messages are flushed in batch in the background, which allows for much faster operation.

By default, our library will flush:

+ every 20 messages (control with `FlushAt`)
+ if 5 seconds has passed since the last flush (control with `FlushAfter`)

There is a maximum of `500KB` per batch request and `32KB` per call.

{% include content/tracking-api-limit.md %}


Sometimes you might not want batching (eg. when debugging, or in short-lived programs). You can turn off batching by setting the `FlushAt` argument to `1`, and your requests will always be sent right away.


## Options

If you hate defaults you can configure analytics-go with the following fields:

<table>
  <tr>
    <td>`Size` _int_</td>
    <td>The number of messages to queue before flushing.</td>
  </tr>
  <tr>
    <td>`Endpoint` _string_</td>
    <tr>Specify the request url.</tr>
  </tr>
</table>


## Troubleshooting

{% include content/troubleshooting-intro.md %}
{% include content/troubleshooting-server-debugger.md %}
{% include content/troubleshooting-server-integration.md %}
