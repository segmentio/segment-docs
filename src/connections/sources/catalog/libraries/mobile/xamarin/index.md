---
title: Analytics for Xamarin
sourceTitle: 'Xamarin'
sourceCategory: 'Mobile'
id: wcssVcPJrc
---
Our [Xamarin](http://xamarin.com/) Portable Class Library ([PCL](http://developer.xamarin.com/guides/cross-platform/application_fundamentals/pcl/)) is the best way to integrate analytics into your Xamarin application. It lets you record analytics data from your C#, F#, and .NET code, and supports `PCL Profile 4.0 - Profile136`, which targets the following platforms:

- .NET Framework 4 or later
- Windows Phone 8 or later
- Silverlight 5
- Windows 8
- Windows Phone Silverlight 8
- Windows Store apps (Windows 8)
- Xamarin.Android
- Xamarin.iOS

The library issues requests that hit our servers, and then we route your data to any analytics service you enable on our destinations page. This library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/Analytics.Xamarin).

**Note:** Since Xamarin requires our library to be portable to different builds, we can only enable server-side destinations, as opposed to bundling select native SDKs like we do for iOS and Android. Look for the "Server" icon when selecting destinations. For tools for which we offer both bundled and server-side destinations, like Mixpanel, Amplitude, and Google Analytics, our Xamarin library will only be able to use their server-side functionality.

## Getting Started

Clone `Analytics.Xamarin` from [GitHub](https://github.com/segmentio/Analytics.Xamarin)...

```bash
git clone https://github.com/segmentio/Analytics.Xamarin.git
```

Import the `Analytics.Xamarin` project into Xamarin Studio, and add it as a reference to your code.

Now you'll need to initialize the library.

```csharp
using Segment;

// initialize with your Segment source write key ...
Analytics.Initialize("YOUR_WRITE_KEY");
```

You only need to initialize once at the start of your program. You can then keep using the `Analytics` singleton anywhere in your code.

The default initialization settings are production-ready and queue messages on another thread before sending any requests. In development you might want to use [development settings](/docs/connections/sources/catalog/libraries/mobile/xamarin/#development-settings).

## Identify

`identify` lets you tie a user to their actions and record traits about them.  It includes a unique User ID and any optional traits you know about them.

We recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits change.

Example `identify` call:

```csharp
Analytics.Client.Identify("019mr8mf4r", new Traits() {
    { "name", "Tom Smykowski" },
    { "email", "tom@example.com" },
    { "friends", 29 }
});
```

This example call identifies Tom by his unique User ID (the one you know him by in your database) and label him with `name`, `email` and `friends` traits.

The `identify` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`Traits` _Traits, optional_</td>
    <td>A dictionary of traits you know about the user. Things like: `email`, `name` or `friends`.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>An `Options` object lets you set a [timestamp](#historical-import), [enable or disable destinations](#selecting-destinations), or [send additional context](#context).</td>
  </tr>
</table>

Find details on the **identify method payload** in our [Spec](/docs/connections/spec/identify/).

## Track

`track` lets you record the actions your users perform. Every action triggers what we call an "event", which can also have associated properties.

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Example `track` call:

```csharp
Analytics.Client.Track("019mr8mf4r", "Item Purchased", new Properties() {
    { "revenue", 39.95 },
    { "shipping", "2-day" }
});
```
This example `track` call tells us that your user just triggered the **Item Purchased** event with a revenue of $39.95 and chose your hypothetical '2-day' shipping.

`track` event properties can be anything you want to record.

The `track` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`event` _String_</td>
    <td>The name of the event you're tracking. We recommend human-readable names like <strong>Played Song</strong> or <strong>Updated Status</strong>.</td>
  </tr>
  <tr>
    <td>`properties` _Properties, optional_</td>
    <td>A dictionary of properties for the event. If the event was <strong>Added to Cart</strong>, it might have properties like `price` or `product`.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>An `Options` object lets you set a [timestamp](#historical-import), [enable or disable destinations](#selecting-destinations), or [send additional context](#context).</td>
  </tr>
</table>

Find details on **best practices in event naming** as well as the **`track` method payload** in our [Spec](/docs/connections/spec/track/).

## Screen

The [`screen`](/docs/connections/spec/screen/) method lets you you record whenever a user sees a screen of your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event an event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Not all services support screen, so when it's not supported explicitly, the screen method tracks as an event with the same parameters.

Example `screen` call:

```csharp
Analytics.Client.Screen("019mr8mf4r", "Register", new Properties() {
    { "type", "facebook" }
});
```

The `screen` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`name` _String_</td>
    <td>The screen name you're tracking. We recommend human-readable names like <strong>Login</strong> or <strong>Register</strong>.</td>
  </tr>
  <tr>
    <td>`category` _String_</td>
    <td>The screen category. If you're making a news app, the category could be <strong>Sports</strong>.</td>
  </tr>
  <tr>
    <td>`properties` _Properties, optional_</td>
    <td>A dictionary of properties for the screen view. If the screen is <strong>Restaurant Reviews</strong>, it might have properties like `reviewCount` or `restaurantName`.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>An `Options` object lets you set a [timestamp](#historical-import), [enable or disable destinations](#selecting-destinations), or [send additional context](#context).</td>
  </tr>
</table>

Find details on the **`screen` payload** in our [Spec](/docs/connections/spec/screen/).

## Group

`group` lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/java/#identify) user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example `group` call:

```csharp
Analytics.Client.Group("userId", "groupId", new Traits() {
    { "name", "Initech, Inc." },
    { "website", "http://www.example.com" }
});
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
    <td>A dictionary of traits you know about the group. Things like: `name` or `website`.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>An `Options` object lets you set a [timestamp](#historical-import), [enable or disable destinations](#selecting-destinations), or [send additional context](#context).</td>
  </tr>
</table>

Find more details about `group` including the **`group` payload** in our [Spec](/docs/connections/spec/group/).

## Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

```csharp
Analytics.Client.Alias("previousId", "userId");
```

Here's a full example of how we might use the `alias` call:

```csharp
// the anonymous user does actions ...
Analytics.Client.Track("anonymous_user", "Anonymous Event");
// the anonymous user signs up and is aliased
Analytics.Client.Alias("anonymous_user", "identified@example.com");
// the identified user is identified
Analytics.Client.Identify("identified@example.com", new Traits() { plan: "Free" });
// the identified user does actions ...
Analytics.Client.Track("identified@example.com", "Identified Action");
```

For more details about `alias`, including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).

---

## Development Settings

You can use this initialization during development while testing the library. `SetAsync(false)` will make sure the library makes a request to our servers every time it's called.

```csharp
Analytics.Initialize("YOUR_WRITE_KEY", new Config().SetAsync(false));
```

Don't forget to set async back to `true` for production, so that you can advantage of asynchronous flushing on a different thread.

## Options

An `Options` object lets you:

1. Set a [timestamp](#historical-import), [enable or disable destinations](#selecting-destinations)
2. [Send additional context](#context)
3. [Send an anoymousId](#anonymous-id)

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an object of `options` that lets you turn certain destinations on or off. By default all destinations are enabled.

Here's an example `identify` call with the `options` object shown.

```csharp
Analytics.Client.Identify("hj2kf92ds212", new Traits() {
    { "email", "tom@example.com" },
    { "name", "Tom Smykowski" },
}, new Options()
    .SetIntegration("all", false)
    .SetIntegration("Kissmetrics", true)
);
```

In this case, we're specifying that we want this identify to only go to Kissmetrics. `"all", false` says that no destination should be enabled unless otherwise specified. `{ "Kissmetrics", true }` turns on Kissmetrics, etc.

destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**Note:** Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

## Historical Import

You can import historical data by adding the `timestamp` argument to your `identify` and `track` calls. _Note: If you're tracking things that are happening right now, leave out the timestamp and our servers will timestamp the requests for you._

```csharp
Analytics.Client.Track("sadi89e2jd", "Logged Workout", new Properties() {
    { "distance", "10 miles" },
    { "city", "Boston" },
}, new Options()
    .SetTimestamp(new DateTime(2010, 1, 18))
);
```

## Context

If you're running a web server, you might want to send context variables such as `userAgent` or `ip` with your `page` or `screen` calls. You can do so by setting the `Context` in the `Options` object.

```csharp
Analytics.Client.Page("019mr8mf4r", "Login", new Properties() {
    { "path", "/login" },
    { "title", "Initech Login" }
}, new Options()
    .SetContext(new Context() {
        { "app", "Education App 2" }
    }));
```

Learn more on the [Context page](/docs/connections/spec/common/#context).

## Anonymous ID

By default, the Xamarin library requires all messages to have a `userId`. If you would like to use an `anonymousId`, you can pass it in with options.

```csharp
Analytics.Client.Page(null, "Login", new Properties(), new Options()
    .SetAnonymousId("some-id"));
```

## Nested Properties

You can provide nested properties, like so:

```csharp
Analytics.Client.Identify("hj2kf92ds212", new Traits() {
    { "email", "tom@example.com" },
    { "name", "Tom Smykowski" },
    { "address", new Dict() {
        { "street", "123 Fake Street" },
        { "city", "Boston" }
    }}
});
```

## Batching

Our libraries are built to support high performance environments. That means it is safe to use Analytics.Xamarin on a web server that's serving hundreds of requests per second.

By default (in async mode), this library will start a single seperate thread on initialization, and flush all messages on that thread. That means every method you call **does not** result in an HTTP request, but is queued in memory instead. Messages are flushed in batch in the background, which allows for much faster operation.

### How do I turn batching off?

Sometimes you might not want batching (eg. when debugging, or in short-lived programs). You can turn off batching by setting the `async` argument to `false`, and your requests will always be sent in a blocking manner.

```csharp
Analytics.Initialize("YOUR_WRITE_KEY", new Config().SetAsync(false));
```

### What happens if there are just too many messages?

If the module detects that it can't flush faster than it's receiving messages, it'll simply stop accepting messages. This means your program will never crash because of a backing up analytics queue. The maximum size of the queue defaults to `10000`, and here's how you can change it:

```csharp
Analytics.Initialize("YOUR_WRITE_KEY", new Config().SetMaxQueueSize(10000));
```

### How do I flush right now?!

You can also flush on demand. For example, at the end of your program, you'll want to flush to make sure there's nothing left in the queue. Just call the `Flush` method:

```csharp
Analytics.Client.Flush();
```

This method will block until all messages are flushed.

### How do I dispose of the flushing thread at the end of my program?

The Analytics client implements the `IDisposable` interface, and will turn off its flushing thread when you call `Dispose`.

```csharp
Analytics.Client.Dispose();
```

## Configuration

If you hate defaults, than you'll love how configurable the Analytics.Xamarin is. Check out these gizmos:

```csharp
Analytics.Initialize("YOUR_WRITE_KEY", new Config()
    .SetAsync(true)
    .SetTimeout(TimeSpan.FromSeconds(10))
    .SetMaxQueueSize(10000));
```

<table class="DefinitionTable">
  <tr>
    <td>`SetAsync` _boolean_</td>
    <td>`true` to flush on a different thread, `false` to flush immediately on the same thread.</td>
  </tr>
  <tr>
    <td>`SetTimeout` _TimeSpan_</td>
    <td>The amount of time to wait before calling the HTTP request a timeout.</td>
  </tr>
  <tr>
    <td>`SetMaxQueueSize` _int_</td>
    <td>The maximum number of messages to allow into the queue before no new message are accepted.</td>
  </tr>
</table>

## Logging

`Analytics.Xamarin` has detailed logging, which you can enable by attaching your own handler, like so:

```csharp
using Segment;

Segment.Logger.Handlers += Logging_Handler;

void Logging_Handler(Level level, string message, Dict args) {
    if (args != null) {
        foreach (string key in args.Keys) {
            message += String.Format(" {0}: {1},", "" + key, "" + args[key]);
        }
    }
    Console.WriteLine(String.Format("[Analytics] [{0}] {1}", level, message));
}
```

## Anonymizing IP

We collect IP address for client-side (iOS, Android, Analytics.js and Xamarin) events automatically.

If you don't want us to record your tracked users' IP in destinations and S3, you can set your event's `context.ip` field to `0.0.0.0` . Our server won't record the IP address of the client for libraries if the `context.ip` field is already set.
