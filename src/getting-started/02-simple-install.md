---
title: A Simple Segment Installation
---


When you implement Segment, you add Segment code to your website, app, or server. This code generates messages based on specific triggers you define.


In the simplest implementation, the code can be a snippet of Javascript that you copy and paste into the HTML of a website to track page views. It can also be as complex as Segment calls embedded in a React mobile app to send messages when the app is opened or closed, when the user performs different actions, or when time based conditions are met (for example "ticket reservation expired" or "cart abandoned after 2 hours").

The best way to learn about how Segment works is to see it in action. This tutorial walks you though an installation using one of our libraries: either our Javascript, PHP, or iOS library.

## Before you begin

Before you start, you need a Segment user account and a workspace. If you're not already part of an organization with a Segment Workspace, you can [sign up for a free account and workspace](https://app.segment.com/signup/?ref=docs).

For the quickstart portion below, you also need access to the code for a basic website, PHP website, or an iOS app.

> success ""
> **Tip**! If you don't have any of those things, you might consider creating a simple [GitHub Pages website](https://pages.github.com/).

## A note on Dev and Prod Sources

When developing and testing, you should create and use separate sources for each of your environments (production, development, staging, etc.) to prevent testing and development activities from filling production systems with invalid data.

You can give each source an `environment` label when you create it, and we strongly suggest that you use these labels to sort your sources. When you create a source during the steps below, make sure you enter an environment label.

> warning ""
> **Caution**! Double-check when you enter write keys for dev and production environments to make sure that you'll send the right data to the right place!


## Create a Segment source

Go to your Segment workspace, and navigate to [the Sources catalog](https://app.segment.com/goto-my-workspace/sources/catalog).

Choose either the [Javascript source](https://app.segment.com/goto-my-workspace/sources/catalog/javascript), [PHP source](https://app.segment.com/goto-my-workspace/sources/catalog/php), or [iOS source](https://app.segment.com/goto-my-workspace/sources/catalog/ios), and click **Add Source**.

On the next screen, give the source a name. (We recommend that you include the word `demo`, `test`, or `quickstart` in the name so you can easily find and delete this source later.)

We also recommend that you add an Environment Label of `dev` to the source, so you know that this demo source isn't part of a production installation.


## Find your write key

The write key is the unique identifier for a source which tells Segment which source data comes from, to which workspace it belongs, and which destinations should receive the data.

When you create a new library source, you can find the write key in the **Settings** tab for the source, under **API Keys**. Any time you change a library's settings in the Segment App, the write key regenerates.

![](/docs/connections/images/find_writekey.png)

> info ""
> [Cloud-sources](/docs/connections/sources/about-cloud-sources/) do not have write keys, as they use a token or key from your account with that service. Cloud sources have other considerations, and aren't part of this tutorial.

Make note of or write down your write key, as you'll need it in the next steps.


## Installing Segment

<!--TODO: Need to restyle these tabs so they're less subtle in contrast to the bulk of the text. Text in tabs is pulled from cleaned-up versions of our Quickstarts for these libraries -->

Click a tab below to see the tutorial content for the specific library you chose.

{% codeexample %}
{% codeexampletab Javascript quickstart %}

<!-- marker JS start -->


### Step 1: Copy the Snippet

Installing Segment is easy, just paste the snippet from the Javascript Source overview page into the `<head>` tag of your site.

That snippet loads Analytics.js onto the page _asynchronously_, so it won't affect your page load speed. Once the snippet is running on your site, you can turn on destinations from the destinations page in your workspace and they start loading on your site automatically!

**Fun fact:** if you only want the most basic Google Analytics set up you can stop reading right now. You're done! Just switch on Google Analytics from the Segment App.

However, lots of analytics and marketing tools need to record _who_ each user is on your site. If you want to use any tool that deals with the identity of your users, read on about the `identify` method.

### Step 2: Identify Users

The `identify` method is how you tell Segment who the current user is. It includes a unique User ID, and any optional traits you know about them. You can read more about it in the [identify method reference](/docs/connections/sources/catalog/libraries/website/javascript#identify).

**Note:** You don't need to call `identify` for anonymous visitors to your site. Segment automatically assigns them an `anonymousId`, so just calling `page` and `track` works just fine without `identify`.

Here's what a basic call to `identify` might look like:

```js
analytics.identify('f4ca124298', {
  name: 'Michael Brown',
  email: 'mbrown@example.com'
});
```
That identifies Michael by his unique User ID (in this case, `f4ca124298`, which is what you know him by in your database) and labels him with `name` and `email` traits.

**Hold up though!** When you actually put that code on your site, you need to replace those hard-coded trait values with the variables that represent the details of the currently logged-in user.

To do that, we recommend that you use a backend template to inject an `identify` call into the footer of **every page** of your site where the user is logged in. That way, no matter what page the user first lands on, they will always be identified. You don't need to call `identify` if your unique identifier (`userId`) is not known.

Depending on your templating language, your actual identify call might look something like this:

```js
{% raw %}
analytics.identify(' {{user.id}} ', {
  name: '{{user.fullname}}',
  email: '{{user.email}}'
});
{% endraw %}
```

With that call in your page footer, you successfully identify every user that visits your site.

**Second fun fact:** if you only want to use a basic CRM set up, you can stop here. Just enable Salesforce, Intercom, or any other CRM system from your Segment workspace, and Segment starts sending all of your user data to it!

Of course, lots of analytics tools record more than just _identities_... they record the actions each user performs too! If you're looking for a complete event tracking analytics setup, keep reading...


### Step 3: Track Actions

The `track` method is how you tell Segment about the actions your users are performing on your site. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the [track method reference](/docs/connections/sources/catalog/libraries/website/javascript#track).

Here's what a call to `track` might look like when a user signs up:

```js
analytics.track('Signed Up', {
  plan: 'Enterprise'
});
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

```js
analytics.track('Article Bookmarked', {
  title: 'Snow Fall',
  subtitle: 'The Avalanche at Tunnel Creek',
  author: 'John Branch'
});
```

If you're just getting started, some of the events you should track are events that indicate the success of your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend that you track just a few important events. You can always add more later!

Once you add a few `track` calls, **you're done with this tutorial!** You successfully installed Analytics.js tracking. Now you're ready to turn on any destination you like from the Segment App.

<!-- marker JS end -->


{% endcodeexampletab %}


{% codeexampletab iOS Mobile quickstart %}


<!-- marker iOS start -->


### Step 1: Install the SDK

The recommended way to install Analytics for iOS is using [Cocoapods](http://cocoapods.org), since it means you can create a build with specific bundled destinations, and because it makes it simple to install and upgrade.

First, add the `Analytics` dependency to your `Podfile` by adding the following line:

```ruby
pod 'Analytics', '~> 3.0'
```

Then in your application delegate's `- application:didFinishLaunchingWithOptions:` method, set up the SDK like so:

```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackApplicationLifecycleEvents = YES; // Enable this to record certain application events automatically!
configuration.recordScreenViews = YES; // Enable this to record screen views automatically!
[SEGAnalytics setupWithConfiguration:configuration];
```

> success ""
> **Tip**: You don't _need_ to use initialization config parameters to track lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) and screen views automatically, but we highly recommend that you do so you can start off already tracking some important core events.

And of course, import the SDK in the files that you use it by adding the following line:

```objc
#import <Analytics/SEGAnalytics.h>
```

#### Bundling Client Side SDKs

To keep the Segment SDK lightweight, the `Analytics` pod only installs the Segment library. This means all of the data goes first to Segment's servers, and is then forwarded to any destination tools which accept the data _from Segment_.

Some destinations do not accept data from the Segment servers, and instead require that you collect the data from the device. In these cases you must bundle some additional destination code with the Segment SDK.

We're going to skip over this part for now, but you can see the instructions on [how to bundle the destination tools](/docs/connections/sources/catalog/libraries/mobile/ios/#about-mobile-connection-modes).

Now that the SDK is installed and set up, you're ready to start making calls!

### Step 2: Identify Users

The `identify` method is how you tell Segment who the current user is. It takes a unique User ID, and any optional traits you know about them. You can read more about it in the [identify reference](/docs/connections/sources/catalog/libraries/mobile/ios#identify).

Here's what a basic call to `identify` might look like:

```objc
[[SEGAnalytics sharedAnalytics] identify:@"f4ca124298"
                                  traits:@{ @"name": @"Michael Brown",
                                    @"email": @"mbrown@example.com" }];
```

That call identifies Michael by his unique User ID (`f4ca124298`, which is the one you know him by in your database) and labels him with `name` and `email` traits.

**Hold up though!** When you actually put that code in your iOS app, you need to replace those hard-coded trait values with the variables that represent the details of the currently logged-in user.

Once you've added an `identify` call, you're ready to move on to tracking!

### Step 3: Track Actions

The `track` method is how you tell Segment about the actions your users are performing in your app. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the [track method reference](/docs/connections/sources/catalog/libraries/mobile/ios#track).

To get started, the Segment iOS SDK can automatically track a few important common events, such as **Application Installed**, **Application Updated** and **Application Opened**. You can enable this option during initialization by adding the following lines.

```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackApplicationLifecycleEvents = YES;
[SEGAnalytics setupWithConfiguration:configuration];
```

You should also track events that indicate success in your mobile app, like **Signed Up**, **Item Purchased** or **Article Bookmarked**. We recommend tracking just a few important events. You can always add more later!

Here's what a `track` call might look like when a user signs up:

```objc
[[SEGAnalytics sharedAnalytics] track:@"Signed Up"
                           properties:@{ @"plan": @"Enterprise" }];
```

That tells us that your user triggered the **Signed Up** event, and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

```objc
[[SEGAnalytics sharedAnalytics] track:@"Article Bookmarked"
                           properties:@{
                               @"title": @"Snow Fall",
                               @"subtitle": @"The Avalanche at Tunnel Creek",
                               @"author": @"John Branch" }];
```

Once you've added a few `track` calls, **you're set up!** You successfully instrumented your app, and can enable destinations from your Segment workspace.

<!-- marker iOS end -->


{% endcodeexampletab %}


{% codeexampletab PHP quickstart %}

<!-- marker PHP start -->

### Step 1: Download the library

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

Replace `YOUR_WRITE_KEY` with the actual write key, which you can find in Segment under your project settings. Otherwise all that useful data goes straight to `/dev/null`.

You only need to call `init` once when your php file is requested. All of your files then have access to the same `Analytics` client.


> note ""
> **Note**: The default PHP consumer is the [libcurl consumer](/docs/connections/sources/catalog/libraries/server/php/#lib-curl-consumer). If this is not working well for you, or if you have a high-volume project, you might try one of Segment's other consumers like the [fork-curl consumer](/docs/connections/sources/catalog/libraries/server/php/#fork-curl-consumer).

All set? Nice, the library's fully installed! We're now primed and ready to start recording our first analytics calls about our users.

### Step 2: Identify Users

The [`identify`](/docs/connections/spec/identify) method is how you tell Segment who the current user is. It includes a unique User ID and any optional traits that you might know about them.

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


### Step 3: Track Actions

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


### Step 4: Flush the data

Finally, call the Segment `flush()` method. This manually sends all the queued call data, to make sure it makes it to the Segment servers. This is normally done automatically by the runtime, but some PHP installations won't do it for you, so it's worth calling at the end of your script, just to be safe.

```php
Segment::flush();
```

And presto, **you're done!** You successfully installed PHP tracking. Now you're ready to turn on any destination you fancy from the Segment App.


<!-- marker PHP end -->
{% endcodeexampletab %}
{% endcodeexample %}



## Test that it’s working

Once you've set up your Segment library, and instrumented at least one call, you can look at the Debugger tab for the Source to check that it produces data as you expected.

The Source Debugger is a real-time tool that helps you confirm that API calls made from your website, mobile app, or servers arrive at your Segment Source, so you can quickly see how calls are received by your Segment source, so you can troubleshoot quickly without having to wait for data processing.

![](/docs/connections/sources/images/debugger_view.png)

The Debugger is separate from your workspace's data pipeline, and is not an exhaustive view of all the events ever sent to your Segment workspace. The Debugger only shows a sample of the events that the Source receives in real time, with a cap of 500 events. The Debugger is a great way to test specific parts of your implementation to validate that events are being fired successfully and arriving to your Source.

> success ""
> **Tip**: To see a more complete view of all your events, you might consider setting up either a [warehouse](/docs/connections/storage/warehouses/) or an [S3 destination](/docs/connections/storage/catalog/amazon-s3/).

The Debugger shows a live stream of sampled events arriving at the Source, but you can also toggled from "Live" to "Pause", to stop the stream and prevent it from displaying new events. Events continue to arrive to your Source while you Pause the stream, they just are not displayed.

You can search on any information you know is available in an event payload to search in the Debugger and show only matching payloads. You can also use advanced search options to limit the results to a specific event.

![](/docs/connections/sources/images/debugger_search.png)


Two views are available when viewing a payload:

* The **Pretty view** is a recreation of the API call you made that was sent to Segment.
* The **Raw view** is the complete JSON object Segment received from the calls you sent. These calls include all the details about what is being tracked: timestamps, properties, traits, ids, and [contextual information Segment automatically collects](/docs/connections/spec/common/#context-fields-automatically-collected) the moment the data is sent.

We'll talk more about debugging and troubleshooting [in a later page](/docs/getting-started/06-testing-debugging/).

## Set up your first destination

Once you're satisfied that data is arriving from your new source, it's time to set up your first destination! As long as you have `page` or `screen` data, coming from the source, you can quickly enable Google Analytics to look at the page view statistics.

If you don't have a Google Analytics account, you can either set up a free account, or look at the Destination Catalog for a different destination to enable.

You'll need a tracking ID for Google Analytics (either a "website" or "serverside" tracking ID), or another API key if you're substituting another destination. Make note of this ID or key as you'll need it to connect your destination.

To set up your first destination:

1. Go to your Segment workspace, click **Destinations**, and click **Add Destination** to go to the [Catalog](https://app.segment.com/goto-my-workspace/destinations/catalog).
2. Search for the destination you want to add. In this case, search for `Google Analytics`.
3. Click the tile for the destination to see information about it.
4. Click **Configure Google Analytics**.
5. Select the source that you set up earlier in this quickstart, then click **Confirm Source**.
6. On the settings page, locate the setting line for the tracking ID or other API key to connect to your destination.
7. Enter the ID or API key and click **Save**.
8. Click **Back to Destination**, then click the toggle to enable the destination.

<!--TODO LR note: this seems like a lot. are 6/7 needed?-->

Congratulations! Data is now flowing from the source you set up, to the first destination. Do some test browsing on your site or app, then log in to your downstream tool to see the data in place.

You can click around and load pages to see your Segment calls in action, watch them arrive in the Debugger, and see them arrive in the destination tool.

> warning ""
> **Note**: When you're done with this test source and destination, you can delete them. This prevents you from getting unplanned "demo" data in your production environment later.



<div class="double">
  {% include components/reference-button.html href="/getting-started/01-what-is-segment/" newtab="false" icon="symbols/arrow-left.svg" title="What is Segment" description="The basics of the Segment platform and what you can do with it." variant="related" subtitle="back" %}

  {% include components/reference-button.html href="/getting-started/03-planning-full-install/" newtab="false" icon="symbols/arrow-right.svg" title="Planning a Full Installation" description="Think through your goals, plan your calls, and set yourself up for success." variant="related" subtitle="next" %}
</div>
