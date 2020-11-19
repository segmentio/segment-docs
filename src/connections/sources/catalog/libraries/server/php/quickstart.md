---
title: 'Quickstart: PHP'
hidden: true
---


This tutorial gets you started sending data from your website to Segment and any of our destinations, using Segment's PHP library. As soon as you're set up you can turn on new destinations with the flip of a switch!

If you want to dive deeper at any point, check out the [PHP reference](/docs/connections/sources/catalog/libraries/server/php).


## Step 1: Create a Source in the Segment app

Before you begin, you need a Workspace (which is a container that holds all of the sources and destinations which are billed together for an organization). If you already created one, great! If not, you can sign up for a free Segment account and create one.

Next, create a PHP source from your Workspace:

1. Click **Add Source**.
2. From the source catalog page, click **PHP**.
3. Click **Add Source** again from the informational panel that appears to the right.
4. Give the source a display name, and enter the URL the source will collect data from.

When you create a Source in the Segment web app, it tells the Segment servers that you'll be sending data from a specific source type. When you create (or change!) a Source in the Segment app, Segment generates a new Write Key for that source. You use the write key in your code to tell the Segment servers where the data is coming from, so Segment can route it to your destinations and other tools.

## Step 2: Download the library

To install the library, clone the repository from GitHub into your desired application directory. (psst, composer users: we've [got you covered too](https://packagist.org/packages/segmentio/analytics-php)!)

```bash
git clone https://github.com/segmentio/analytics-php /my/application/folders/
```

Then, add the following to your PHP script to load the Segment analytics library in your code:

```php
require_once("/path/to/analytics-php/lib/Segment.php");
```

Now, you're ready to actually initialize the module. In our examples, we first rename this module to `Analytics` for convenience. In your initialization script, make the following call:

```php
# Set up our Segment tracking and
# alias to Analytics for convenience
class_alias('Segment', 'Analytics');
Segment::init("YOUR_WRITE_KEY");
```

Replace `YOUR_WRITE_KEY` with the actual **Write Key**, which you can find in Segment under your project settings. Otherwise all that useful data goes straight to `/dev/null`.

You only need to call `init` once when your php file is requested. All of your files then have access to the same `Analytics` client.


> note ""
> **Note**: The default PHP consumer is the [libcurl consumer](/docs/connections/sources/catalog/libraries/server/php/#lib-curl-consumer). If this is not working well for you, or if you have a high-volume project, you might try one of Segment's other consumers like the [fork-curl consumer](/docs/connections/sources/catalog/libraries/server/php/#fork-curl-consumer).

All set? Nice, the library's fully installed! We're now primed and ready to start recording our first analytics calls about our users.

## Step 3: Identify Users

> note ""
> **Good to know**: For any of the different methods described in this quickstart, you can replace the properties and traits in the code samples with variables that represent the data collected.

The [Identify method](/docs/connections/spec/identify) is how you tell Segment who the current user is. It includes a unique User ID and any optional traits that you might know about them.

Here's what a basic call to [`identify`](/docs/connections/spec/identify) might look like:

```php
Segment::identify(array(
  "userId" => "f4ca124298",
  "traits" => array(
    "name" => "Michael Brown",
    "email" => "mbrown@example.com"
  )
));
```

That identifies Michael by his unique User ID (in this case, `f4ca124298`, which is what you know him by in your database) and labels him with `name` and `email` traits.

**Hold up though!** When you actually put that code on your site, you need to replace those hard-coded trait values with the variables that represent the details of the currently logged-in user. The easiest way in PHP is to keep a `$user` variable in memory.

```php
Segment::identify(array(
  "userId" => $user->id,
  "traits" => array(
    "name" => $user->fullname,
    "email" => $user->email
  )
));
```

With that call on the page, you're now successfully identifying every user that visits your site.

If you only want to use a basic CRM set up, you can stop here. Just enable Salesforce, Intercom, or any other CRM system from your Segment workspace, and Segment starts sending all of your user data to it!

Of course, lots of analytics tools record more than just _identities_... they record the actions each user performs too! If you're looking for a complete event tracking analytics setup, keep reading...


## Step 4: Track Actions

The `track` method is how you tell Segment about the actions your users are performing on your site. Every action triggers what we call an "event", which can also have associated properties.

Here's what a call to [`track`](/docs/connections/spec/track/) might look like when a user signs up:

```php
Segment::track(array(
  "userId" => "f4ca124298",
  "event" => "Signed Up",
  "properties" => array(
    "plan" => "Enterprise"
  )
));
```

That tells us that the user triggered the **Signed Up** event, and chose your hypothetical `Enterprise` plan. Properties can be anything you want to record, for example:

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

If you're just getting started, some of the events you should track are events that indicate the success of your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Once you've added a few [`track`](/docs/connections/spec/track) calls, you're almost done.


## Step 5: Flush the data

Finally, call the Segment `flush()` method. This manually sends all the queued call data, to make sure it makes it to the Segment servers. This is normally done automatically by the runtime, but some PHP installations won't do it for you, so it's worth calling at the end of your script, just to be safe.

```php
Segment::flush();
```

And presto, **you're done!** You successfully installed PHP tracking. Now you're ready to turn on any destination you fancy from our interface, margarita in hand.

---


## What's Next?

We just walked through the quickest way to get started with Segment using PHP. You might also want to check out our full [PHP reference](/docs/connections/sources/catalog/libraries/server/php) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http) to get a sense for the bigger picture.
