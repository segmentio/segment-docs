---
title: Analytics for Rust
sourceTitle: 'Rust'
sourceCategory: 'Server'
published: false
hidden: true
---

Our Rust library lets you record analytics data from your Rust code. The requests hit our servers, and then we route your data to any analytics service you enable on your destinations page.

This library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/analytics-rust).

All of Segment's server libraries are built for high-performance, so you can use them in your web server controller code. This library contains the building blocks to batch and efficiently send data to Segment.

## Getting Started

### Install the Package

Install `analytics-rust` using `cargo` to your project:

```bash
cargo add analytics
```

which adds the following to you `Cargo.toml` file:

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

This outlines the primitive building blocks used in creating an ETL-like operation you can use to send data to Segment for your source.

The default initialization settings are production-ready.

## Identify

> note ""
> **Good to know**: For any of the different methods described on this page, you can replace the properties and traits in the code samples with variables that represent the data collected.

`identify` lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

We recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits change.

Example `identify` call:

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

If you're using our client-side set up in combination with the Rust library, **page calls are already tracked for you** by default. However, if you want to record your own page views manually and aren't using our client-side library, read on!

Example `page` call:

```rust
Page {
    user: User::UserId { user_id: "f4ca124298".to_owned() },
    name: "Rust Library".to_owned(),
    properties: json!({
        "url": "[Enterprise](https://segment.com/libraries/rust/)",
    }),
    ..Default::default()
}
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

```Rust
Group {
    user: User::UserId { user_id: "019mr8mf4r".to_owned() },
    group_id: "56".to_owned(),
    traits: json!({
        "name": "Initech",
        "description": "Accounting Software",
    }),
    ..Default::default()
}
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

```rust
Alias {
    user: User::Both { user_id: "019mr8mf4r".to_owned(), anonymous_id: "anonymousUser".to_owned() },
    ..Default::default()
}
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

```rust
// the anonymous user does actions ...
Track {
    user: User::AnonymousId { anonymous_id: "anonymousUser".to_owned() },
    event: "Anonymous Event".to_owned(),
    ..Default::default()
}

// the anonymous user signs up and is aliased
Alias {
    user: User::Both { user_id: "019mr8mf4r".to_owned(), anonymous_id: "anonymousUser".to_owned() },
    ..Default::default()
}

// the identified user is identified
Identify{
  user: User::UserId { user_id: "019mr8mf4r".to_owned() },
  traits: json!({
    "name":"Michael Bolton",
    "email":"mbolton@example.com",
    "plan":"Enterprise",
    "friends":"42"
  }),
  ..Default::default()
}

// the identified user does actions ...
Track {
    user: User::UserId { user_id: "019mr8mf4r".to_owned() },
    event: "Item Viewed".to_owned(),
    properties: json!({
        "item": "lamp",
    }),
    ..Default::default()
}
```

For more details about `alias`, including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).

---

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an object of `context.integrations` that lets you turn certain integrations on or off. By default all destinations are enabled.

Here's an example `track` call with the `context.integrations` object shown.

```rust
Track {
    user: User::UserId { user_id: "019mr8mf4r".to_owned() },
    event: "Membership Upgraded".to_owned(),
    integrations: Some(json!({
        "All": "false",
        "Mixpanel": true,
    })),
    ..Default::default()
}
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

You can send Context fields in two ways with the Rust library.

Firstly, you can set a global context field that will be set on all messages from the client.

```rust
let context = json!({
  "app":{
    "name":    "myapp",
    "version": "myappversion"
  }
});
Track {
    user: User::UserId { user_id: "019mr8mf4r".to_owned() },
    event: "Membership Upgraded".to_owned(),
    integrations: Some(json!({
        "All": "false",
        "Mixpanel": true,
    })),
    context: Some(context),
    ..Default::default()
}
```

Secondly, you can set a context field on specific events.

```rust
Identify{
  user: User::UserId { user_id: "019mr8mf4r".to_owned() },
  traits: json!({
    "friends":"42"
  }),
  context: Some(json!({
    "active":true
  })),
  ..Default::default()
}
```

## Batching

Our libraries are built to support high performance environments using Batch Message. Until Rust's async IO story matures we're
leaving the flushing of Messages up to you to implement.

There is a maximum of `500KB` per batch request and `32KB` per call.

{% include content/tracking-api-limit.md %}


## Troubleshooting

{% include content/troubleshooting-intro.md %}
{% include content/troubleshooting-server-debugger.md %}
{% include content/troubleshooting-server-integration.md %}
