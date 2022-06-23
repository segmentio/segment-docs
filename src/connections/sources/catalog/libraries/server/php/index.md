---
title: Analytics for PHP
repo: analytics-php
id: TDO70If4mD
---
Our PHP library lets you record analytics data from your PHP code. The requests hit our servers, and then we route your data to any analytics service you enable on your destinations page.

This library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/analytics-php).

PHP is a little different than our other server-side libraries because it is a single-threaded language. We've done everything we can to make our library as performant as possible, while still leaving you room to tune the settings for your application. If you want to learn more about tuning your settings for high performance, be sure to read through our section on [configuration](#configuration) at the end of this guide.

Want to stay updated on releases? Subscribe to the [release feed](https://github.com/segmentio/analytics-php/releases.atom).

## Getting Started

Clone the repository from Github into your desired application directory.

For composer users: we've [got you covered too](https://packagist.org/packages/segmentio/analytics-php).

```bash
git clone https://github.com/segmentio/analytics-php /my/app/folders/
```

Add the following to your PHP script to actually load the Segment analytics library in your code:

```php
require_once("/path/to/analytics-php/lib/Segment.php");
use Segment\Segment;
```

Now, you're ready to actually initialize the module. In our examples, we first rename this module to be `Analytics` for convenience. In your initialization script, go ahead and make the following call:

```php
# set up our Segment tracking and
# alias to Analytics for convenience
class_alias('Segment', 'Analytics');
Segment::init("YOUR_WRITE_KEY");
```

You only need to call `init` once when your php file is requested. All of your files will then have access to the same `Analytics` client.

Of course, you'll want to replace `YOUR_WRITE_KEY` with your actual **Write Key** which you can find in Segment under your source settings.

The default PHP consumer is the [lib-curl consumer](#lib-curl-consumer). If this is not working well for you, or if you have a high-volume project, you may want to try one of our other consumers like the [fork-curl consumer](#fork-curl-consumer).

### Regional configuration
For Business plans with access to [Regional Segment](/docs/guides/regional-segment), you can use the `host` configuration parameter to send data to the desired region:
1. Oregon (Default) — `api.segment.io/v1`
2. Dublin — `events.eu1.segmentapis.com/v1/`

## Identify

> note ""
> **Good to know**: For any of the different methods described on this page, you can replace the properties and traits in the code samples with variables that represent the data collected.


Identify calls let you tie a user to their actions, and record traits about them.  It includes a unique User ID and any optional traits you know about them.

We recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits change.

Here's what a basic call to `identify` might look like:

```php
Segment::identify(array(
  "userId" => "2sfjej334",
  "traits" => array(
    "email" => $user->email,
    "name" => $user->name,
    "friends" => 25
  )
));
```

This will identify the user by his unique User ID (the one you know him by in your database) and label him with `email`, `name` and `friends` traits.

The `identify` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`traits` _Array, optional_</td>
    <td>A hash of traits you know about the user. Things like: `email`, `name` or `friends`.</td>
  </tr>
  <tr>
    <td>`anonymousId` _String, optional_</td>
    <td>If you want to track users anonymously, you can include the Anonymous ID instead of a User ID</td>
  </tr>
  <tr>
    <td>`timestamp` _Number, optional_</td>
    <td>The number of seconds since the unix epoch (`time()`) representing when the identify took place. If the identify just happened, leave it out and we'll use the server's time. If you're importing data from the past, make sure you to provide a `timestamp`.</td>
  </tr>
  <tr>
    <td>`context` _Array, optional_</td>
    <td>An object containing any number of options or context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)</td>
  </tr>
</table>

Find details on the **identify method payload** in our [Spec](/docs/connections/spec/identify/).

## Track

`track` lets you record the actions your users perform.Every action triggers what we call an "event", which can also have associated properties.

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Example `track` call:

```php
Segment::track(array(
  "userId" => "f4ca124298",
  "event" => "Signed Up",
  "properties" => array(
    "plan" => "Enterprise"
  )
));
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical **Enterprise** plan.

`track` event properties can be anything you want to record, for example:

```php
Segment::track(array(
  "userId" => "f4ca124298",
  "event" => "Article Bookmarked",
  "properties" => array(
    "title" => "Snow Fall",
    "subtitle" => "The Avalanche at Tunnel Creek",
    "author" => "John Branch"
  )
));
```
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
    <td>`properties` _Array, optional_</td>
    <td>A hash of properties for the event. If the event was <strong>Product Added</strong> to cart, it might have properties like `price` or `product`.</td>
  </tr>
  <tr>
    <td>`anonymousId` _String, optional_</td>
    <td>If you want to track users anonymously, you can include the Anonymous ID instead of a User ID</td>
  </tr>
  <tr>
    <td>`timestamp` _Number, optional_</td>
    <td>The number of seconds since the unix epoch (`time()`) representing when the identify took place. If the identify just happened, leave it out and we'll use the server's time. If you're importing data from the past, make sure you to provide a `timestamp`.</td>
  </tr>
  <tr>
    <td>`context` _Array, optional_</td>
    <td>An object containing any number of options or context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)</td>
  </tr>
</table>

Find details on **best practices in event naming as well as the `track` method payload** in our [Spec](/docs/connections/spec/track/).

## Page

The [`page`](/docs/connections/spec/page/) method lets you record page views on your website, along with optional extra information about the page being viewed.

If you're using our client-side set up in combination with the PHP library, page calls are **already tracked for you** by default. However, if you want to record your own page views manually and aren't using our client-side library, read on!

Example `page` call:

```php
Segment::page(array(
  "userId" => $user->id,
  "category" => "Docs",
  "name" => "PHP library",
  "properties" => array(
    "url" => "https://segment.com/libraries/php/"
  )
));
```
The `page` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`category` _String, optional_</td>
    <td>The category of the page. Useful for things like ecommerce where many  pages might live under a larger category. _Note: if you only pass one string to `page` we assume it's a `name`, not a `category`. You **must** include a `name` if you want to send a `category`._</td>
  </tr>
  <tr>
    <td>`name` _String, optional_</td>
    <td>The name of the page, for example **Signup** or **Home**.</td>
  </tr>
  <tr>
    <td>`properties` _Object, optional_</td>
    <td>A dictionary of properties of the page. Segment automatically sends the `url`, `title`, `referrer` and `path`, but you can add your own too!</td>
  </tr>
  <tr>
    <td>`anonymousId` _String, optional_</td>
    <td>If you want to track users anonymously, you can include the Anonymous ID instead of a User ID</td>
  </tr>
  <tr>
    <td>`context` _Array, optional_</td>
    <td>An object containing any number of options or context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)</td>
  </tr>
</table>

Find details on the **`page` payload** in our [Spec](/docs/connections/spec/page/).

## Group

`group` lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/php/#identify) with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example `group` call:

```php
Segment::group(array(
  "userId" => $user->id,
  "groupId" => $group->id,
  "traits" => array(
    "name" => $group->name,
    "size" => $group->size
  );
));
```
The `group` call has the following fields:

<table>
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`groupId` _String_</td>
    <td>The ID for the group to associate with the user.</td>
  </tr>
  <tr>
    <td>`traits` _Array, optional_</td>
    <td>An array containing a the traits which the group should be tagged with. These might be things like the group's `name` or `employeeCount`</td>
  </tr>
  <tr>
    <td>`anonymousId` _String, optional_</td>
    <td>If you want to track users anonymously, you can include the Anonymous ID instead of a User ID</td>
  </tr>
  <tr>
    <td>`context` _Array, optional_</td>
    <td>An object containing any number of options or context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)</td>
  </tr>
</table>

Find more details about `group` including the **`group` payload** in our [Spec](/docs/connections/spec/group/).

## Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias) if your user switches IDs, you can use `alias` to rename the `userId`.

Example `alias` call:

```php
Segment::alias(array(
  "previousId" => $previousId,
  "userId" => $userId
))
```
The `alias` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _String_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`previousId` _String_</td>
    <td>The previous ID to alias from.</td>
  </tr>
</table>

Here's a full example of how we might use the [`alias`](/docs/connections/spec/alias/) call:

```php
# the anonymous user does actions ...
Segment::track(array(
  "userId" => "anonymous_user",
  "event" => "Anonymous Event"
));

# the anonymous user signs up and is aliased
Segment::alias(array(
  "previousId" => "anonymous_user",
  "userId" => "identified@example.com"
));

# the identified user is identified
Segment::identify(array(
  "userId" => "identified@example.com",
  "traits" => array(
    "plan" => "Free"
  )
));

# the identified user does actions ...
Segment::track(array(
  "userId" => "identified@example.com",
  "event" => "Identified Action"
));
```

For more details about `alias` including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).

## Historical Import

You can import historical data by adding the `timestamp` argument to any of your method calls. This can be helpful if you've just switched to Segment.

Historical imports can only be done into destinations that can accept historical timestamped data. Most analytics tools like Mixpanel, Amplitude, Kissmetrics, etc. can handle that type of data just fine. One common destination that does not accept historical data is Google Analytics since their API cannot accept historical data.

**Note:** If you're tracking things that are happening right now, leave out the `timestamp` and our servers will timestamp the requests for you.

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an array of `integrations` that lets you turn certain destinations on or off. By default all destinations are enabled.

Using the `integrations` array, you can specify which analytics providers you want each call to go to.

Here's a `track` call with the `integrations` array shown:

```php
Segment::track(array(
  "userId" => "9387459",
  "event" => "Image Uploaded",
  "integrations" => array(
    "All" => false,
    "Mixpanel" => true,
    "Customer.io" => true
  )
))
```

In this case, we're specifying that we want this track to only go to Mixpanel and Customer.io. `"all" => false` says that no destination should be enabled unless otherwise specified. `"Mixpanel" => true` turns on Mixpanel, etc.

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**Note:**

- Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

- If you are on a grandfathered plan, events sent server-side that are filtered through the Segment dashboard will still count towards your API usage.

## Flush

`flush` explicitly tells the PHP runtime to flush the data sent to Segment's servers. In most configurations, this is done automatically by the runtime, but some PHP installations won't take care of it for you, so it's worth calling at the end of your script, just to be safe.

```php
Segment::flush();
```

## Configuration

Because PHP is a single threaded and shared-nothing environment, we can't use a queue in a separate thread or a connection pool to flush messages. Instead, you have the option to specify different consumers to make requests to our servers.

There are few options which you can use to configure your client to aid with debugging. These can be enabled with any of the consumers you use.

```php
Segment::init("YOUR_WRITE_KEY", array(
  "consumer" => "lib_curl",
  "debug" => true,
  "ssl" => false,
  "error_handler" => function ($code, $msg) { [...] }
));
```

<table class="api-table">
  <tr>
    <td>`consumer` _String, optional_</td>
    <td>To explicitly mark which consumer to use. Defaults to `lib_curl`.</td>
  </tr>
  <tr>
    <td>`debug` _Boolean, optional_</td>
    <td>Whether to log messages and wait for a response. Makes any queuing consumers non-async, defaults to `false`.</td>
  </tr>
  <tr>
    <td>`ssl` _Boolean, optional_</td>
    <td>Whether to use SSL for the connection, defaults to `true`. Because this adds significant round-trip time, change to `false` if you make many requests.</td>
  </tr>
  <tr>
    <td>`error_handler` _Function, optional_</td>
    <td>A handler which will be called on errors to aid in debugging, `function ($code, $message) {}`</td>
  </tr>
</table>

### Lib-Curl Consumer

The [lib-curl consumer](https://github.com/segmentio/analytics-php/blob/master/lib/Segment/Consumer/LibCurl.php) is a reliable option for low-volume sources or if you want fast response times under light loads. The library runs synchronously, queuing calls and sending them in batches to Segment's servers. By default, this happens every 100 calls, or at the end of serving the page. By default, we ignore http responses to optimize the library's speed, but you can choose to wait for these responses by enabling debug mode.

If your servers are handling more than 20 requests per second, you may want to look at the [file consumer](#file-consumer) to optimize performance.

There is a maximum of `500KB` per batch request and `32KB` per call.

{% include content/tracking-api-limit.md %}


The lib-curl consumer is Segment's default PHP library, although you may still initialize it explicitly and set queue and batch sizes in the library's initialization settings.

```php
Segment::init("YOUR_WRITE_KEY", array(
    "consumer"       => "lib_curl",
    "debug"          => true,
    "max_queue_size" => 10000,
    "batch_size"     => 100
));
```


### Fork-Curl Consumer

The [fork-curl consumer](https://github.com/segmentio/analytics-php/blob/master/lib/Segment/Consumer/ForkCurl.php) should work best for cases where you can't use persistent sockets, or want to ensure quick response times under light load. It works by creating an in-memory queue which buffers track and identify calls. The queue is flushed by forking an async `curl` process that sends a batch request. By default, this happens every `100` calls, or at the end of serving the page. This consumer will spawn a separate process for each request which tracks events. If  your servers are handling more than 20 requests per second, you may want to look at the [file consumer](#file-consumer).

To initialize the consumer explicitly, use `"consumer" => "fork_curl"` as an entry in your `options` array.

```php
Segment::init("YOUR_WRITE_KEY", array(
    "consumer"       => "fork_curl",
    "debug"          => true,
    "max_queue_size" => 10000,
    "batch_size"     => 100
));
```

<table class="api-table">
  <tr>
    <td>`max_queue_size` _Number, optional_</td>
    <td>The max size of the queue, defaults to `10000` items.</td>
  </tr>
  <tr>
    <td>`batch_size` _Number, optional_</td>
    <td>How many items to send in a single curl request, defaults to `100`.</td>
  </tr>
</table>


### Socket Consumer

If you can't spawn other processes from your PHP scripts, you can use the [socket consumer](https://github.com/segmentio/analytics-php/blob/master/lib/Segment/Consumer/Socket.php), which will allow you to make requests to Segment. Each time a track or identify call is made, it will initiate a socket request to our servers. The socket request is about as async as you can get with PHP, where the request will write the event data and close the connection before waiting for a response. However, if your servers are dealing with more than 100s of requests per second or cannot use a persistent connection, you may want to use one of the other consumers instead.

To initialize the consumer explicitly, use `"consumer" => "socket"` as an entry in your `options` array.

```php
Segment::init("YOUR_WRITE_KEY", array(
    "consumer"      => "socket",
    "timeout"       => 0.5,
    "debug"         => true,
    "error_handler" => function ($code, $msg) { error_log($msg); }
));
```

<table class="api-table">
  <tr>
    <td>`timeout` _Number, optional_</td>
    <td>The number of seconds to wait for the socket request to time out, defaults to `0.5`.</td>
  </tr>
  <tr>
    <td>`debug` _Boolean, optional_</td>
    <td>Whether to check the response for an error, defaults to `false`. This will make the library block until a response has been received from the API, so it is not recommended for production use.</td>
  </tr>
  <tr>
    <td>`error_handler` _Function, optional_</td>
    <td>A function to handle errors, particularly useful for debugging. Note that if debug mode is not specified, then the `error_handler` will only be called on connection level errors and timeouts.</td>
  </tr>
</table>


### File Consumer

The [file consumer](https://github.com/segmentio/analytics-php/blob/master/lib/Segment/Consumer/File.php) is a more performant method for making requests to Segment. Each time a track or identify call is made, it will record that call to a log file. The log file is then uploaded "out of band" by running the `file.php` file found in [our github repository](https://github.com/segmentio/analytics-php/blob/master/lib/Segment/Consumer/File.php).

To initialize this consumer explicitly, use `"consumer" => "file"` as an entry in your `options` array.

```php
Segment::init("YOUR_WRITE_KEY", array(
    "consumer" => "file",
    "filename" => "/tmp/analytics.log"
));
```

<table class="api-table">
  <tr>
    <td>`filename` _String, optional_</td>
    <td>The location to write the log file, defaults to `"/tmp/analytics.log"`.</td>
  </tr>
</table>

To upload your log file to segment.com, simply run the `send.php` file included as part of our repository.

```bash
php send.php --secret YOUR_WRITE_KEY --file /tmp/analytics.log
```

We recommend running this as part of a cron job every few minutes so that your log files stay manageable in size. Every time the `send.php` runs it will remove the old log file for you once it has finished processing.

The easiest way to do this is to create a new cron job to upload your log files. Using the defaults, this cron job must run as the www-user. You should run the following commands in your terminal, but change the location of the PHP script to point at your `analytics-php/send.php`

```bash
$ # create a cron job that runs as www-data every minute
$ echo '*/1 * * * * www-data php /my/path/to/analytics-php/send.php > /dev/null' | sudo tee /etc/cron.d/analytics
$ sudo service cron reload    # reload the cron daemon
```

## Troubleshooting

{% include content/troubleshooting-intro.md %}
{% include content/troubleshooting-server-debugger.md %}
{% include content/troubleshooting-server-integration.md %}


## 3rd-Party Libraries

If you only need support for PHP5, the team at Underground Elephant has released a [3rd-party library](https://github.com/uecode/segment-io-php) based on Guzzle.

If you're using Laravel 4 our friends at Catchet have written a wrapper for you! Docs and GitHub repo can be found here: https://github.com/cachethq/Laravel-Segment
