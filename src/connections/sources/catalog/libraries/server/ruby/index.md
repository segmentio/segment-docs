---
title: Analytics for Ruby
sourceTitle: 'Ruby'
sourceCategory: 'Server'
id: aACTBqIbWT
---
Our Ruby library lets you record analytics data from your ruby code. The requests hit our servers, and then we route your data to any analytics service you enable on your destinations page.

This library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/analytics-ruby).

All of Segment's server-side libraries are built for high-performance, so you can use them in your web server controller code. This library uses an internal queue to make `identify` and `track` calls non-blocking and fast. It also batches messages and flushes asynchronously to our servers.

 Want to stay updated on releases? Subscribe to the [release feed](https://github.com/segmentio/analytics-ruby/releases.atom).

## Getting Started

If you're using Bundler, add the following line to your project's `Gemfile`:

```ruby
gem 'analytics-ruby', '~> 2.4.0', :require => 'segment/analytics'
```

Or, if you're using the gem directly from your application, you'll need to:

```bash
gem install analytics-ruby
```

Then initialize the gem with your Segment source's **Write Key** and an optional error handler, like so:

```ruby
require 'segment/analytics'

Analytics = Segment::Analytics.new({
    write_key: 'YOUR_WRITE_KEY',
    on_error: Proc.new { |status, msg| print msg }
})
```

That will create an instance of `Analytics` that you can use to send data to Segment for your source.

If you're using Rails, you can stick that initialization logic in `config/initializers/analytics_ruby.rb` and omit the `require` call.

> info ""
> The analytics-ruby gem makes requests asynchronously, which can sometimes be suboptimal and difficult to debug if you're pairing it with a queuing system like Sidekiq/delayed job/sucker punch/resqueue. If you'd prefer to use a gem that makes requests synchronously, you can check out [`simple_segment`](https://github.com/whatthewhat/simple_segment){:target="_blank"} , an API-compatible drop-in replacement for the standard gem that does its work synchronously inline. Big thanks to [Mikhail Topolskiy](https://github.com/whatthewhat){:target="_blank"}  for his stewardship of this alternative gem!

### Regional configuration
For Business plans with access to [Regional Segment](/docs/guides/regional-segment), you can use the `host` configuration parameter to send data to the desired region:
1. Oregon (Default) — `api.segment.io/v1`
2. Dublin — `events.eu1.segmentapis.com/v1/`

## Identify

> note ""
> **Good to know**: For any of the different methods described on this page, you can replace the properties and traits in the code samples with variables that represent the data collected.

The `identify` method is how you associate your users and their actions to a recognizable `userId` and `traits`. You can [find details on the identify method payload in our Spec](/docs/connections/spec/identify/).

The `identify` call has the following fields:

<table class="api-table">
  <tr>
    <td>**Field**</td>
    <td>**Type**</td>
    <td>**Description**</td>
  </tr>
  <tr>
   <td>`user_id`</td>
   <td>String</td>
   <td>ID for this user in your database. Optional if `anonymous_id` is provided.</td>
  </tr>
  <tr>
    <td>`anonymous_id`</td>
    <td>String</td>
    <td>The ID associated with the user when you don't know who they are. Optional if `user_id` is provided.</td>
  </tr>
  <tr>
    <td>`traits`</td>
    <td>Hash</td>
    <td>A `Hash` of traits you know about the user. Things like: `email`, `name` or `friends`.</td>
  </tr>
  <tr>
    <td>`context`, optional</td>
    <td>Hash</td>
    <td>A `Hash` that can include things like `user_agent` or `ip`.</td>
  </tr>
  <tr>
    <td>`integrations`, optional</td>
    <td>Hash</td>
    <td>Specifies which destinations this should be sent to.</td>
  </tr>
  <tr>
    <td>`timestamp`, optional</td>
    <td>Time</td>
    <td>Represents the time when the action took place. This is most useful if you're importing historical data. If the `identify` just happened, leave it blank and we'll use the server's time.</td>
  </tr>
  <tr>
    <td>`message_id`, optional</td>
    <td>String</td>
    <td>Unique identifier for each message that lets you find an individual message across the API.</td>
  </tr>
</table>

Example `identify`:

```ruby
Analytics.identify(
    user_id: '019mr8mf4r',
    traits: { email: "#{ user.email }", friends: 872 },
    context: {ip: '8.8.8.8'})
```
This example call will identify your user by their unique User ID (the one you know him by in your database) and label them with `email` and `friends` traits.

## Track

The `track` method lets you record any actions your users perform. You can find details on [the track method payload](/docs/connections/spec/track).

The `track` call has the following fields:

<table class="api-table">
  <tr>
    <td>**Field**</td>
    <td>**Type**</td>
    <td>**Description**</td>
  </tr>
  <tr>
   <td>`user_id`</td>
   <td>String</td>
   <td>ID for this user in your database. Optional if `anonymous_id` is provided.</td>
  </tr>
  <tr>
    <td>`anonymous_id`</td>
    <td>String</td>
    <td>The ID associated with the user when you don't know who they are. Optional if `user_id` is provided.</td>
  </tr>
  <tr>
    <td>`event`</td>
    <td>String</td>
    <td>The name of the event you're tracking. We recommend human-readable names like <strong>Song Played</strong> or <strong>Status Updated</strong>.</td>
  </tr>
  <tr>
    <td>`properties`, optional</td>
    <td>Hash</td>
    <td>A `Hash` of properties for the event. If the event was <strong>Product Added</strong> to their cart, it might have properties like `price` or `product`.</td>
  </tr>
  <tr>
    <td>`context`, optional</td>
    <td>Hash</td>
    <td>A `Hash` that can include things like `user_agent` or `ip`.</td>
  </tr>
  <tr>
    <td>`integrations`, optional</td>
    <td>Hash</td>
    <td>Specifies which destinations this should be sent to.</td>
  </tr>
  <tr>
    <td>`timestamp`, optional</td>
    <td>Time</td>
    <td>Represents the time when the action took place. This is most useful if you're importing historical data. If the `identify` just happened, leave it blank and we'll use the server's time.</td>
  </tr>
  <tr>
    <td>`message_id`, optional</td>
    <td>String</td>
    <td>Unique identifier for each message that lets you find an individual message across the API.</td>
  </tr>
</table>

You should track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Example `track` call:

```ruby
Analytics.track(
    user_id: '019mr8mf4r',
    event: 'Item Purchased',
    properties: { revenue: 39.95, shipping: '2-day' })
```

This example `track` call tells us that your user just triggered the **Item Purchased** event with a revenue of $39.95 and chose your hypothetical '2-day' shipping.

`track` event properties can be anything you want to record, for example:

```ruby
Analytics.track(
    user_id: 'f4ca124298',
    event: 'Article Bookmarked',
    properties: {
      title: 'Snow Fall',
      subtitle: 'The Avalance at Tunnel Creek',
      author: 'John Branch'
    })
```

For more information about choosing which events to track, event naming and more, check out [Analytics Academy](https://segment.com/academy/)

## Page

The [`page`](/docs/connections/spec/page/) method lets you record page views on your website, along with optional extra information about the page being viewed.

If you're using our client-side set up in combination with the Ruby library, page calls are **already tracked for you** by default. However, if you want to record your own page views manually and aren't using our client-side library, read on!

The `page` call has the following fields:

<table class="api-table">
  <tr>
    <td>**Field**</td>
    <td>**Type**</td>
    <td>**Description**</td>
  </tr>
  <tr>
   <td>`user_id`</td>
   <td>String</td>
   <td>ID for this user in your database. Optional if `anonymous_id` is provided.</td>
  </tr>
  <tr>
    <td>`anonymous_id`</td>
    <td>String</td>
    <td>The ID associated with the user when you don't know who they are. Optional if `user_id` is provided.</td>
  </tr>
  <tr>
    <td>`name`</td>
    <td>String</td>
    <td>The name of the page, for example <strong>Signup</strong> or <strong>Home</strong>.</td>
  </tr>
  <tr>
    <td>`category` optional</td>
    <td>String</td>
    <td>The category of the page. Useful for things like ecommerce where many  pages might live under a larger category. _Note: if you only pass one string to `page` we assume it's a `name`, not a `category`. You **must** include a `name` if you want to send a `category`._</td>
  </tr>
  <tr>
    <td>`properties`, optional</td>
    <td>Hash</td>
    <td>A `Hash` of properties for the page.</td>
  </tr>
  <tr>
    <td>`context`, optional</td>
    <td>Hash</td>
    <td>A `Hash` that can include things like `user_agent` or `ip`.</td>
  </tr>
  <tr>
    <td>`integrations`, optional</td>
    <td>Hash</td>
    <td>Specifies which destinations this should be sent to.</td>
  </tr>
  <tr>
    <td>`timestamp`, optional</td>
    <td>Time</td>
    <td>Represents the time when the action took place. This is most useful if you're importing historical data. If the `identify` just happened, leave it blank and we'll use the server's time.</td>
  </tr>
  <tr>
    <td>`message_id`, optional</td>
    <td>String</td>
    <td>Unique identifier for each message that lets you find an individual message across the API.</td>
  </tr>
</table>

Example `page` call:

```ruby
Analytics.page(
  user_id: user_id,
  category: 'Docs',
  name: 'Ruby library',
  properties: { url: 'https://segment.com/libraries/ruby/' })
```

Find details on the **`page` payload** in our [Spec](/docs/connections/spec/page/).

## Group

The `group` method associates an [identified user](/docs/connections/sources/catalog/libraries/website/javascript/#identify) with a company, organization, project, workspace, team, tribe, platoon, assemblage, cluster, troop, gang, party, society or any other name you came up with for the same concept.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

The `group` call has the following fields:

<table class="api-table">
  <tr>
   <td>`user_id`</td>
   <td>String</td>
   <td>ID for this user in your database. Optional if `anonymous_id` is provided.</td>
  </tr>
  <tr>
    <td>`anonymous_id`</td>
    <td>String</td>
    <td>The ID associated with the user when you don't know who they are. Optional if `user_id` is provided.</td>
  </tr>
  <tr>
    <td>`group_id`</td>
     <td>String</td>
    <td>The ID of the group.</td>
  </tr>
  <tr>
    <td>`traits` optional</td>
    <td>Hash</td>
    <td>A hash of traits you know about the group. For a company, they might be things like `name`, `address`, or `phone`.</td>
  </tr>
  <tr>
    <td>`context`, optional</td>
    <td>Hash</td>
    <td>A `Hash` that can include things like `user_agent` or `ip`.</td>
  </tr>
  <tr>
    <td>`integrations`, optional</td>
    <td>Hash</td>
    <td>Specifies which destinations this should be sent to.</td>
  </tr>
  <tr>
    <td>`timestamp`, optional</td>
    <td>Time</td>
    <td>Represents the time when the action took place. This is most useful if you're importing historical data. If the `identify` just happened, leave it blank and we'll use the server's time.</td>
  </tr>
  <tr>
    <td>`message_id`, optional</td>
    <td>String</td>
    <td>Unique identifier for each message that lets you find an individual message across the API.</td>
  </tr>
</table>

Example `group` call:

```ruby
Analytics.group(
  user_id: '019mr8mf4r',
  group_id: '56',
  traits: { name: 'Initech', description: 'Accounting Software'})
```

Find more details about `group` including the **`group` payload** in our [Spec](/docs/connections/spec/group/).

## Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

 `alias` method definition:

```ruby
Analytics.alias(previous_id: 'previous id', user_id: 'new id')
```
The `alias` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId`</td>
     <td>String</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`previousId` </td>
     <td>String </td>
    <td>The previous ID to alias from.</td>
  </tr>
</table>

Here's a full example of how we might use the `alias` call:

```ruby
# the anonymous user does actions ...
Analytics.track(user_id: 'anonymous_user', event: 'Anonymous Event')
# the anonymous user signs up and is aliased
Analytics.alias(previous_id: 'anonymous id', user_id: 'user id')
# the identified user is identified
Analytics.identify(user_id: 'user id', traits: { plan: 'Free' })
# the identified user does actions ...
Analytics.track(user_id: 'user id', event: 'Identified Action')
```

For more details about `alias`, including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).

---
## Historical Import

You can import historical data by adding the `timestamp` argument to any of your method calls. This can be helpful if you've just switched to Segment.

Historical imports can only be done into destinations that can accept historical timestamped data. Most analytics tools like Mixpanel, Amplitude, Kissmetrics, etc. can handle that type of data just fine. One common destination that does not accept historical data is Google Analytics since their API cannot accept historical data.

**Note:** If you're tracking things that are happening right now, leave out the `timestamp` and our servers will timestamp the requests for you.

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an object of `integrations` that lets you turn certain destinations on or off. By default all destinations are enabled.

Here's an example `track` call with the `integrations` object shown.

```ruby
Analytics.track({
  user_id: '83489',
  event: 'Song Paused',
  integrations: { All: false, Kissmetrics: true }
})
```

In this case, we're specifying that we want this identify to only go to Kissmetrics. `all: false` says that no destination should be enabled unless otherwise specified. `Kissmetrics: true` turns on Kissmetrics, etc.

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**Note:**

- Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

- If you are on a grandfathered plan, events sent server-side that are filtered through the Segment dashboard will still count towards your API usage.

## Performance

Our libraries are built to support high performance environments. That means it is safe to use analytics-ruby on a web server that's serving hundreds of requests per second.

Every method you call **does not** result in an HTTP request, but is queued in memory instead. Messages are flushed in batch in the background, which allows for much faster operation.

By default, our library will flush:

+ the very first time it gets a message
+ whenever messages are queued and there is no outstanding request

There is a maximum of `500KB` per batch request and `32KB` per call.

{% include content/tracking-api-limit.md %}

The queue consumer makes only **a single outbound request** at a time to avoid saturating your server's resources. If multiple messages are in the queue, they are sent together in a batch call.

You can specify the following additional options to determine how the queue operates and to help debug possible errors. None of them are required for normal operation.

```ruby
# Error handler to log statements

Segment::Analytics.new({
  write_key: 'YOUR_WRITE_KEY',
  on_error: Proc.new { |status, msg| print msg },
  max_queue_size: 10000,
  batch_size: 100,
  stub: true
})
```

<table>
  <tr>
    <td>`on_error` optional</td>
    <td>Proc</td>
    <td>A handler which is called whenever errors are returned from the API. Useful for debugging and first time destinations.</td>
  </tr>
  <tr>
    <td>`max_queue_size` optional</td>
    <td>FixNum</td>
    <td>The max number of messages to put in the queue before refusing to queue more (defaults to <code>10,000</code>).</td>
  </tr>
  <tr>
    <td>`batch_size` optional</td>
    <td>FixNum</td>
    <td>The max number of events/identifies to send in a single batch (defaults to <code>100</code>). The API servers will not respond to messages over a certain size, so <code>100</code> is a safe default.</td>
  </tr>
  <tr>
    <td>`stub`    optional</td>
    <td>TrueClass|FalseClass</td>
    <td>If true, the requests don't hit the server and are stubbed to be successful (defaults to <code>false</code>).</td>
  </tr>
</table>

## Flush

If you're running a script or internal queue system to upload data, you should call `Analytics.flush` at the end of execution to ensure that all of your messages are sent to our servers. Segment also recommendeds that you call `flush` on shutdown, so that all queued messages are sent to Segment instead of waiting for the next launch.

```ruby
AppAnalytics = Segment::Analytics.new({
  write_key: 'ONE_WRITE_KEY'
})
AppAnalytics.flush
```

> success "" 
> **Tip**: When you call `flush`, the call blocks execution on the thread until it finishes processing all the messages in the queue. If you want to call `flush` during the normal operation of your application, you can spawn a local worker thread and call flush on the worker. This prevents the call from blocking the main thread.


## Turbolinks

If you're using Ruby on Rails with the [Turbolinks](https://github.com/rails/turbolinks/) setting enabled, and you're adding [Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript) on your website, you'll need to tweak the default configuration.

Instead of having the entire snippet in the `<head>` of your site, you need to move the `analytics.page()` call that is included in the snippet by default into the `<body>` so that it will get triggered on every new page load. But you **must** have the first part of the snippet in the `<head>` or the library will fail to load properly.

## Serialization

The Ruby library will automatically handle serializating your data into JSON for our servers. It uses [`JSON.generate`](http://ruby-doc.org/stdlib-2.0.0/libdoc/json/rdoc/JSON.html#method-i-generate) under the hood. Note that `BigDecimal` values are intentionally sent as Strings rather than floats so that our Node servers don't lose precision. If you'd prefer to use a float, you can coerce values to a float before sending the data to Segment.

## Multiple Clients

Different parts of your application may require different types of batching, or even sending to multiple Segment sources. In that case, you can initialize multiple instances of `Analytics` with different settings:

``` ruby
AppAnalytics = Segment::Analytics.new({
  write_key: 'ONE_WRITE_KEY'
})

MarketingAnalytics = Segment::Analytics.new({
  write_key: 'ANOTHER_WRITE_KEY'
})
```

## Troubleshooting

{% include content/troubleshooting-intro.md %}
{% include content/troubleshooting-server-debugger.md %}
{% include content/troubleshooting-server-integration.md %}
