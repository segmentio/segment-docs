---
title: 'Quickstart: Go v2 (deprecated)'
hidden: true
---


This tutorial will help you start sending data from your Go servers to Segment and any of our destinations, using our Go library. As soon as you're setup you'll be able to turn on any new destinations with the flip of a switch!

If you want to dive deeper at any point, check out the [Go library reference](/docs/sources/server/go/).


## Step 1: Install the Package

Installing our Go library is easy, just run the following:

```bash
go get github.com/segmentio/analytics-go
```

Then just import the library and initialize a new client your Segment source's **Write Key**, like so:

```go
package main

import "github.com/segmentio/analytics-go"

func main() {
  client := analytics.New("YOUR_WRITE_KEY")
}
```

That will create a `client` that you can use to send data to Segment for your source. Once you've got that, you're ready to...


## Step 2: Identify Users

The `identify` method is how you tell Segment who the current user is. It includes a unique User ID and any optional traits you know about them. You can read more about it in the [identify reference](/docs/sources/server/go#identify).

Here's what a basic call to `identify` might look like:

```go
client.Identify(&Identify{
  UserId: "019mr8mf4r",
  Traits: map[string]interface{}{
    "name": "Michael Bolton",
    "email": "mbolton@initech.com",
    "plan": "Enterprise",
    "friends": 42,
  },
})
```

That's identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

When you're using our Go library, you don't need to identify a user on every request they make to your servers. Instead, we recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits are change.

Once you've added an identify call, you can move on to...


## Step 3: Track Actions

The `track` method is how you tell Segment about which actions your users are performing. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the [track reference](/docs/sources/server/go#track).

Here's what a call to `track` might look like when a user signs up:

```go
client.Track(&Track{
  Event:  "Signed Up",
  UserId: "f4ca124298",
  Properties: map[string]interface{}{
    "plan": "Enterprise",
  },
})
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

```go
client.Track(&Track{
  Event:  "Article Bookmarked",
  UserId: "f4ca124298",
  Properties: map[string]interface{}{
    "title": "Snow Fall",
    "subtitle": "The Avalanche at Tunnel Creek",
    "author": "John Branch",
  },
})
```

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Once you've added a few `track` calls, **you're done!** You successfully installed analytics tracking on your servers. Now you're ready to turn on any destination you fancy from our interface, margarita in hand.


---


## What's Next?

We just walked through the quickest way to get started with Segment using go. You might also want to check out our full [Go library reference](/docs/sources/server/go/) to see what else is possible, or read about the [Tracking API methods](/docs/sources/server/http/) to get a sense for the bigger picture.

You might also want to consider installing [Analytics.js](/docs/sources/website/analytics.js/quickstart/) so that you can use destinations that require being loaded in the browser, like live chat tools or user feedback systems.
