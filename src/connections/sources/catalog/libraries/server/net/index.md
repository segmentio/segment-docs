---
title: Analytics for .NET
repo: analytics.NET
id: 8HWbgPTt3k
---
Our .NET library is the best way to integrate analytics into your .NET application or website. It lets you record analytics data from your ASP.NET, C#, F#, and Visual Basic code. The library issues requests that hit our servers, and then we route your data to any analytics service you enable on our destinations page. This library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/Analytics.NET).

All of Segment's server-side libraries are built for high-performance, so you can use them in your web server controller code. This library uses an internal queue to make `identify` and `track` calls non-blocking and fast. It also batches messages and flushes asynchronously to our servers.


## Getting Started

### Client-side vs Server-side

The best analytics installation combines both client-side and server-side tracking. A client-side analytics.js installation allows you to install A/B testing, heat mapping, session recording, and ad optimization tools. A server-side .NET installation allows you to accurately track events that aren't available client-side, such as payments. For best practices, [check out our guide client-side vs. server-side](/docs/guides/how-to-guides/collect-on-client-or-server/).


### Step 1: Add Analytics.js to your ASP.NET Master Page

1. In your Segment workspace, click Catalog, and search for "Net".
2. Click the .Net tile, then click **Add Source**.
3. Give the new source a label (which you'll use to identify it later), and apply any labels such as `prod` or `test`.

You will then be presented with an [Analytics.js snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet).

Copy the snippet directly into your ASP.NET [Site.master](https://github.com/segmentio/asp.net-example/blob/master/Site.master#L18-L21).

That snippet will load `analytics.js` onto the page _asynchronously_, so it won't affect your page load speed.

As soon as that snippet is running on your site, you can start turning on any destinations on your Segment destinations page. In fact, if you reload, you can start seeing `page` calls in our debugger.

For more in depth `analytics.js` information, check out our [analytics.js docs](/docs/connections/sources/catalog/libraries/website/javascript/).

Lots of analytics and marketing tools want to know more information about your users, and what they're doing on your app. In the next section, we'll install the .NET library and start sending an event every time a new user registers on your site.

### Step 2: Install our .NET Library

Your website will use our .NET library to `identify` and `track` users.  You can use [NuGet](http://docs.nuget.org/docs/start-here/using-the-package-manager-console) to install the library.

```bash
Install-Package Analytics -Version <version>
```

**Note:** the Analytics package has a dependency on [Newton.JSON](https://www.newtonsoft.com/json).

You can also accomplish the same thing in the Visual Studio `Tools` menu, select `Library Package Manager` and then click `Package Manager Console`.

Now the .NET library needs to know which Segment project you want to send data to. You can initialize the library with your Segment source's `writeKey` in the [Global.asax file](https://github.com/segmentio/asp.net-example/blob/master/Global.asax#L14). Then you can use the `Analytics` singleton in any controller you want.:

```csharp
<%@ Application Language="C#" %>
<%@ Import Namespace="ASP.NET_Example" %>
<%@ Import Namespace="System.Web.Optimization" %>
<%@ Import Namespace="System.Web.Routing" %>
<%@ Import Namespace="Segment" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e)
    {
        RouteConfig.RegisterRoutes(RouteTable.Routes);
        BundleConfig.RegisterBundles(BundleTable.Bundles);
        // this is your project's write key
        Segment.Analytics.Initialize("x24b2rmtvv");
    }

</script>
```

```csharp
using Segment;

// initialize the project #{source.owner.login}/#{source.slug}...
Analytics.Initialize("YOUR_WRITE_KEY");
```

You only need to initialize once at the start of your program. You can then keep using the `Analytics` singleton anywhere in your code.

The default initialization settings are production-ready and queue messages on another thread before sending any requests. In development you might want to use [development settings](/docs/connections/sources/catalog/libraries/server/net/#development-settings).

### Regional configuration
For Business plans with access to [Regional Segment](/docs/guides/regional-segment), you can use the `host` configuration parameter to send data to the desired region:
1. Oregon (Default) — `api.segment.io/v1`
2. Dublin — `events.eu1.segmentapis.com/v1/`

## Identify

> note ""
> **Good to know**: For any of the different methods described on this page, you can replace the properties and traits in the code samples with variables that represent the data collected.

If you're not familiar with the Segment Specs, take a look to understand what the [identify](/docs/connections/spec/identify/) method does.

The `identify` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`Traits` _Traits, optional_</td>
    <td>A dictionary of traits you know about the user. Things like: <code>email</code>, <code>name</code> or <code>friends</code>.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>A custom object which allows you to set a timestamp, an anonymous cookie id, or enable specific destinations.</td>
  </tr>
</table>

An example call would look like:

```csharp
Analytics.Client.Identify("019mr8mf4r", new Traits() {
    { "name", "#{ user.name }" },
    { "email", "#{ user.email }" },
    { "friends", 29 }
});
```

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [track](/docs/connections/spec/track/) method does.

The `track` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`event` _String_</td>
    <td>The name of the event you're tracking. We recommend human-readable names like <strong>Song Played</strong> or <strong>Status Updated</strong>.</td>
  </tr>
  <tr>
    <td>`properties` _Properties, optional_</td>
    <td>A dictionary of properties for the event. If the event was <strong>Product Added</strong> to cart, it might have properties like <code>price</code> or <code>product</code>.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>A custom object which allows you to set a timestamp, an anonymous cookie id, or enable specific destinations.</td>
  </tr>
</table>

An example call would look like:

```csharp
Analytics.Client.Track("019mr8mf4r", "Item Purchased", new Properties() {
    { "revenue", 39.95 },
    { "shipping", "2-day" }
});
```

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [page](/docs/connections/spec/page/) method does.

The `page` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`name` _String_</td>
    <td>The webpage name you're tracking. We recommend human-readable names like <strong>Login</strong> or <strong>Register</strong>.</td>
  </tr>
  <tr>
    <td>`category` _String_</td>
    <td>The webpage category. If you're making a news app, the category could be <strong>Sports</strong>.</td>
  </tr>
  <tr>
    <td>`properties` _Properties, optional_</td>
    <td>A dictionary of properties for the webpage visit. If the event was <strong>Login</strong>, it might have properties like <code>path</code> or <code>title</code>.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>A custom object which allows you to set a timestamp, an anonymous cookie id, or enable specific destinations.</td>
  </tr>
</table>

Example `page` call:

```csharp
Analytics.Client.Page("019mr8mf4r", "Login", new Properties() {
    { "path", "/login" },
    { "title", "Initech Login" }
});
```

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [screen](/docs/connections/spec/screen/) method does.

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
    <td>A dictionary of properties for the screen view. If the screen is <strong>Restaurant Reviews</strong>, it might have properties like <code>reviewCount</code> or <code>restaurantName</code>.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>A custom object which allows you to set a timestamp, an anonymous cookie id, or enable specific destinations.</td>
  </tr>
</table>

Example `screen` call:

```csharp
Analytics.Client.Screen("019mr8mf4r", "Register", new Properties() {
    { "type", "facebook" }
});
```

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [group](/docs/connections/spec/group/) method does.

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
    <td>A dictionary of traits you know about the group. Things like: <code>ma,e</code> or <code>website</code>.</td>
  </tr>
  <tr>
    <td>`options` _Options, optional_</td>
    <td>A custom object which allows you to set a timestamp, an anonymous cookie id, or enable specific destinations.</td>
  </tr>
</table>

Example `group` call:

```csharp
Analytics.Client.Group("userId", "groupId", new Traits() {
    { "name", "Initech, Inc." },
    { "website", "http://www.example.com" }
});
```

## Alias

If you're not familiar with the Segment Specs, take a look to understand what the [alias](/docs/connections/spec/alias/) method does.

The `alias` call has the following fields:

<table class="api-table">
  <tr>
    <td>`previousId` _String_</td>
    <td>The previousId for this user.</td>
  </tr>
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
</table>

Example `alias` call:

```csharp
Analytics.Client.Alias("previousId", "userId")
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

---

## Development Settings

You can use this initialization during development while testing the library. `SetAsync(false)` will make sure the library makes a request to our servers every time it's called.

```csharp
Analytics.Initialize("YOUR_WRITE_KEY", new Config().SetAsync(false));
```

Don't forget to set async back to `true` for production, so that you can advantage of asynchronous flushing on a different thread.


## Historical Import

You can import historical data by adding the `timestamp` argument to any of your method calls. This can be helpful if you've just switched to Segment.

Historical imports can only be done into destinations that can accept historical timestamped data. Most analytics tools like Mixpanel, Amplitude, Kissmetrics, etc. can handle that type of data just fine. One common destination that does not accept historical data is Google Analytics since their API cannot accept historical data.

**Note:** If you're tracking things that are happening right now, leave out the `timestamp` and our servers will timestamp the requests for you.

```csharp
Analytics.Client.Track("sadi89e2jd", "Workout Logged", new Properties() {
    { "distance", "10 miles" },
    { "city", "Boston" },
}, new Options()
    .SetTimestamp(new DateTime(2010, 1, 18))
);
```

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an object of `options` that lets you turn certain destinations on or off. By default all destinations are enabled.

You can specify which analytics destinations you want each action to go to.

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

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**Note:**

- Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

- If you are on a grandfathered plan, events sent server-side that are filtered through the Segment dashboard will still count towards your API usage.

## Context

If you're running a web server, you might want to send [context variables](https://segment.com/docs/connections/spec/common/#context) such as `userAgent` or `ip` with your `page` or `screen` calls. You can do so by setting the `Context` in the `Options` object.

```csharp
Analytics.Client.Page("019mr8mf4r", "Login", new Properties() {
    { "path", "/login" },
    { "title", "Initech Login" }
}, new Options()
    .SetContext (new Context () {
        { "userAgent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"},
        { "ip", "12.212.12.49" },
        { "language", "en-us" },
        { "Google Analytics", new Dict() {
          { "clientId", User.ClientId }
          }
        }
}));
```

## Anonymous ID

All libraries require all messages to have either a `userId` or `anonymousId`. If you would like to use an `anonymousId`, which you should for anonymous users, you can pass it in with options.

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

Our libraries are built to support high performance environments. That means it is safe to use Analytics.NET on a web server that's serving hundreds of requests per second.

By default (in async mode), this library starts a single separate thread on initialization, and flushes all messages on that thread. That means every method you call **does not** result in an HTTP request, but is queued in memory instead. Messages are flushed in batch in the background, which allows for much faster operation.

There is a maximum of `500KB` per batch request and `32KB` per call.

{% include content/tracking-api-limit.md %}



### How do I turn batching off?

Sometimes you might not want batching (for example, when debugging, or in short-lived programs). You can turn off batching by setting the `async` argument to `false`, and your requests will always be sent in a blocking manner.

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

If you hate defaults, than you'll love how configurable the Analytics.NET is. Check out these gizmos:

```csharp
Analytics.Initialize("YOUR_WRITE_KEY", new Config()
    .SetAsync(true)
    .SetTimeout(TimeSpan.FromSeconds(10))
    .SetMaxQueueSize(10000));));
```

<table class="DefinitionTable">
  <tr>
    <td>`async` _boolean_</td>
    <td><code>true</code> to flush on a different thread, <code>false</code> to flush immediately on the same thread.</td>
  </tr>
  <tr>
    <td>`timeout` _TimeSpan_</td>
    <td>The amount of time to wait before calling the HTTP request a timeout.</td>
  </tr>
  <tr>
    <td>`maxQueueSize` _int_</td>
    <td>The maximum number of messages to allow into the queue before no new message are accepted.</td>
  </tr>
</table>


## Multiple Clients

Different parts of your app may require different Segment. In that case, you can initialize different `Analytics.Client` instances instead of using the singleton.

```csharp
Client client = new Client("YOUR_WRITE_KEY", new Config()
    .SetAsync(false)
    .SetTimeout(TimeSpan.FromSeconds(10))
    .SetMaxQueueSize(10000));

client.Track(...);
```


## Troubleshooting

{% include content/troubleshooting-intro.md %}
{% include content/troubleshooting-server-debugger.md %}
{% include content/troubleshooting-server-integration.md %}

### Logging

`Analytics.NET` has detailed logging, which you can enable by attaching your own handler, like so:

```csharp
using Segment;

Logger.Handlers += LoggingHandler;

static void LoggingHandler(Logger.Level level, string message, IDictionary<string, object> args)
{
      if (args != null)
      {
           foreach (string key in args.Keys)
           {
                 message += String.Format(" {0}: {1},", "" + key, "" + args[key]);
           }
      }
      Console.WriteLine(String.Format("[Analytics] [{0}] {1}", level, message));
}
```

Note: the logger requires a minimum version of .NET Core 2.1.

### Json.NET

`Analytics.NET` uses [Json.NET](http://json.codeplex.com/) to serialize JSON payloads. If you have an older version of `Json.NET` in your build path, `Analytics.NET` could create incomplete JSON payloads, which can cause strange API responses. If you're seeing issues, try updating `Json.NET`.


### Mono

`Analytics.NET` has been tested and works in Mono.

### .NET Core
`Analytics.NET` has been tested and works with .NET Core 3.1 and 3.4.2 beta.
