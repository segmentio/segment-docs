---
title: 'Quickstart: Rust'
hidden: true
---

<!-- LR 4/21/2020: TODO: none of the quickstarts actually walk you through creating the source in the workspace -->

This tutorial will help you start sending data from your Rust servers to Segment and any of our destinations, using our Rust library. As soon as you're setup you'll be able to turn on any new destinations with the flip of a switch!

If you want to dive deeper at any point, check out the [Rust library reference](/docs/connections/sources/catalog/libraries/server/rust/).


## Step 1: Install the Package

Installing our Rust library is easy, just run the following from your code's root directory:

```bash
cargo add analytics
```

which will add the following to you `Cargo.toml` file:
```toml
[dependencies]
analytics = "0.2"
```

Then use it with your source's **Write Key**. Of course, you'll want to replace `YOUR_WRITE_KEY` with your actual **Write Key** which you can find in Segment under your source settings.

```rust
use analytics::http::HttpClient;
use analytics::client::Client;
use analytics::message::{BatchMessage, Track, User};
use analytics::batcher::Batcher;
use serde_json::json;

fn main() {
    let write_key = "YOUR_WRITE_KEY";
    let client = HttpClient::default();
    let mut batcher = Batcher::new(None);

    // Pretend this is reading off of a queue, a file, or some other data
    // source.
    for i in 0..100 {
        let msg = BatchMessage::Track(Track {
            user: User::UserId { user_id: format!("user-{}", i) },
            event: "Example Event".to_owned(),
            properties: json!({
                "foo": format!("bar-{}", i),
            }),
            ..Default::default()
        });

        // An error here indicates a message is too large. In real life, you
        // would probably want to put this message in a deadletter queue or some
        // equivalent.
        if let Some(msg) = batcher.push(msg).unwrap() {
            client.send(write_key, &batcher.into_message()).unwrap();

            batcher = Batcher::new(None);
            batcher.push(msg).unwrap(); // Same error condition as above.
        }
    }
}
```

That will create a `client` that you can use to send data to Segment for your source. Once you've got that, you're ready to...


## Step 2: Identify Users

The `identify` method is how you tell Segment who the current user is. It includes a unique User ID and any optional traits you know about them. You can read more about it in the [identify reference](/docs/connections/sources/catalog/libraries/server/rust#identify).

Here's what a basic call to `identify` might look like:

```rust
Identify{
  user: User::UserId { user_id: format!("user-{}", i) },
  traits: json!({
    "name":"Michael Bolton",
    "email":"mbolton@example.com",
    "plan":"Enterprise",
    "friends":"42"
  }),
  ..Default::default()
}
```

That's identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

When you're using our Rust library, you don't need to identify a user on every request they make to your servers. Instead, we recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits are change.

Once you've added an identify call, you can move on to...


## Step 3: Track Actions

The `track` method is how you tell Segment about which actions your users are performing. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the [track reference](/docs/connections/sources/catalog/libraries/server/rust#track).

Here's what a call to `track` might look like when a user signs up:

```rust
Track {
    user: User::UserId { user_id: "f4ca124298".to_owned() },
    event: "Signed Up".to_owned(),
    properties: json!({
        "plan": "Enterprise",
    }),
    ..Default::default()
}
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

```rust
Track {
    user: User::UserId { user_id: "f4ca124298".to_owned() },
    event: "Article Bookmarked".to_owned(),
    properties: json!({
        "title": "Snow Fall",
        "subtitle": "The Avalanche at Tunnel Creek",
        "author": "John Branch"
    }),
    ..Default::default()
}
```

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Once you've added a few `track` calls, **you're done!** You successfully installed analytics tracking on your servers. Now you're ready to turn on any destination you fancy from our interface, margarita in hand.


---


## What's Next?

We just walked through the quickest way to get started with Segment using go. You might also want to check out our full [Go library reference](/docs/connections/sources/catalog/libraries/server/rust/) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http/) to get a sense for the bigger picture.

You might also want to consider installing [Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) so that you can use destinations that require being loaded in the browser, like live chat tools or user feedback systems.
