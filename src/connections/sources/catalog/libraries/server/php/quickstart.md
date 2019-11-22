---
title: 'Quickstart: PHP'
hidden: true
sourceTitle: 'PHP'
sourceCategory: 'Server'
---


This tutorial will help you start sending data from your website to Segment and any of our destinations, using our PHP library. As soon as you're set up you'll be able to turn on any new destinations with the flip of a switch!

If you want to dive deeper at any point, check out the [PHP reference](/docs/connections/sources/catalog/libraries/server/php).


## Step 1: Download the library

All set? When you're ready to install the library, clone the repository from github into your desired application directory. (psst, composer users: we've [got you covered too](https://packagist.org/packages/segmentio/analytics-php)!)

```bash
git clone https://github.com/segmentio/analytics-php /my/app/folders/
```

Then, add the following to your PHP script to actually load the Segment analytics library in your code:

```php
require_once("/path/to/analytics-php/lib/Segment.php");
```

Now, you're ready to actually initialize the module. In our examples, we first rename this module to be `Analytics` for convenience. In your initialization script, go ahead and make the following call:

```php
# Setup our Segment tracking and
# alias to Analytics for convenience
class_alias('Segment', 'Analytics');
Segment::init("YOUR_WRITE_KEY");
```

You only need to call `init` once when your php file is requested. All of your files will then have access to the same `Analytics` client.

Of course, you'll want to replace `YOUR_WRITE_KEY` with your actual **Write Key** which you can find in Segment under your project settings. Otherwise all that useful data will be sent straight to `/dev/null`.

The default PHP consumer is the [libcurl consumer](/docs/connections/sources/catalog/libraries/server/php/#lib-curl-consumer). If this is not working well for you, or if you have a high-volume project, you may want to try one of our other consumers like the [fork-curl consumer](/docs/connections/sources/catalog/libraries/server/php/#fork-curl-consumer).

All set? Nice, the library's fully installed! We're now primed and ready to start recording our first analytics calls about our users.

## Step 2: Identify Users

The [`identify`](/docs/connections/spec/identify) method is how you tell Segment who the current user is. It includes a unique User ID and any optional traits that you might know about them.

Here's what a basic call to [`identify`](/docs/connections/spec/identify) might look like:

```php
Segment::identify(array(
  "userId" => "f4ca124298",
  "traits" => array(
    "name" => "Michael Bolton",
    "email" => "mbolton@initech.com"
  )
));
```

That's identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

**Hold up though!** When you actually put that code on your site, you'll need to replace all those hard-coded strings with details about the currently logged-in user. The easiest way is by keeping a `$user` variable around in memory.

```php
Segment::identify(array(
  "userId" => $user->id,
  "traits" => array(
    "name" => $user->fullname,
    "email" => $user->email
  )
));
```

With that call on your page, you're now successfully identifying every user that visits your site.

If you only need to use a basic CRM setup, you can call it a day right now. Just switch on Salesforce, Intercom, or any other CRM you'd like to use from our interface and we'll starting send all of your user data to it!

Of course, lots of analytics tools record more than just _identities_... they record the actions each user performs too! If you're looking for a complete event tracking analytics setup, keep reading...


## Step 3: Track Actions

The [`track`](/docs/connections/spec/track) method is how you tell Segment about which actions your users are performing on your site. Every action triggers what we call an "event", which can also have associated "properties".

Here's what a call to [`track`](/docs/connections/spec/track) might look like when a user signs up:

```php
Segment::track(array(
  "userId" => "f4ca124298",
  "event" => "Signed Up",
  "properties" => array(
    "plan" => "Enterprise"
  )
));
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical **Enterprise** plan. Properties can be anything you want to record, for example:

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

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Once you've added a few [`track`](/docs/connections/spec/track) calls, you're almost done.


## Step 4: Flush the data

Finally, you'll want to call our `flush()` method to ensure that all data is sent to our servers. This is normally done automatically by the runtime, but some PHP installations won't take care of it for you, so it's worth calling at the end of your script, just to be safe.

```php
Segment::flush();
```

And presto, **you're done!** You successfully installed PHP tracking. Now you're ready to turn on any destination you fancy from our interface, margarita in hand.

---


## What's Next?

We just walked through the quickest way to get started with Segment using PHP. You might also want to check out our full [PHP reference](/docs/connections/sources/catalog/libraries/server/php) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http) to get a sense for the bigger picture.
