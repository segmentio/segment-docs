---
title: 'Quickstart: iOS'
hidden: true
sourceTitle: 'iOS'
sourceCategory: 'Mobile'
---


This tutorial will help you start sending analytics data from your iOS app to Segment. Once you're done you'll be able to turn on [any of our destinations](/docs/connections/destinations/) with the flip of a switch! No more waiting for App Store approval.

If you want to dive deeper at any point, check out the [iOS Library Reference](/docs/libraries/ios/).

_Note: At the moment we can't support tracking of watchkit extensions for tha Apple watch. [Email us](/contact/advice) if you're interested in a watchkit SDK. For now we recommend tracking watch interactions via the native iPhone app code._


## Step 1: Install the SDK

The recommended way to install Analytics for iOS is via [Cocoapods](http://cocoapods.org), since it means you can create a build with specific destinations, and because it makes it dead simple to install and upgrade.

First, add the `Analytics` dependency to your `Podfile`, like so:

```ruby
pod 'Analytics', '~> 3.0'
```

Then in your application delegate's `- application:didFinishLaunchingWithOptions:` method, setup the SDK like so:

```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackApplicationLifecycleEvents = YES; // Enable this to record certain application events automatically!
configuration.recordScreenViews = YES; // Enable this to record screen views automatically!
[SEGAnalytics setupWithConfiguration:configuration];
```

**Note**: Automatically tracking lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) and screen views is optional via initialization config parameters, but highly recommended to hit the ground running with core events! See [below](/docs/connections/sources/catalog/libraries/mobile/ios/#track) for more info!

And of course, import the SDK in the files that you use it with:

```objc
#import <Analytics/SEGAnalytics.h>
```

### Including Additional Client Side SDKs

In the interest of keeping our SDK lightweight, the `Analytics` pod only installs the Segment destination. This means that all your data will be sent via Segment's servers to any tools you've enabled with server-side-compatible destinations.

You'll likely want to bundle some additional destinations client side. Many advanced marketing automation and analytics tools will offer the option of including their SDK or electing to send data server to server depending on the features you need. Most optimization, deep linking, error tracking, and survey tools must be included on the device to leverage their core feature set.

In those cases, you'll need to take some additional steps as [shown in the source documentation here](/docs/connections/sources/catalog/libraries/mobile/ios#bundling-destinations).

Now that the SDK is installed and setup, you're ready to...

## Step 2: Identify Users

The `identify` method is how you tell Segment who the current user is. It takes a unique User ID and any optional traits you know about them. You can read more about it in the [identify reference](/docs/connections/sources/catalog/libraries/mobile/ios#identify).

Here's what a basic call to `identify` might look like:

```objc
[[SEGAnalytics sharedAnalytics] identify:@"f4ca124298"
                                  traits:@{ @"name": @"Michael Bolton",
                                    @"email": @"mbolton@initech.com" }];
```

That's identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

**Hold up though!** When you actually put that code in your iOS app, you'll need to replace all those hard-coded strings with details about the currently logged-in user.

Once you've added an `identify` call, you're ready to move on to...


## Step 3: Track Actions

The `track` method is how you tell Segment about which actions your users are performing inside your app. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the [track reference](/docs/connections/sources/catalog/libraries/mobile/ios#track).

To get started, our SDK can automatically track a few key common events, such as the **Application Installed**, **Application Updated** and **Application Opened**. Simply enable this option during initialization.

```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackApplicationLifecycleEvents = YES;
[SEGAnalytics setupWithConfiguration:configuration];
```

You'll also want to track events that are indicators of success for your mobile app, like **Signed Up**, **Item Purchased** or **Article Bookmarked**. We recommend tracking just a few important events. You can always add more later!

Here's what a call to `track` might look like when a user signs up:

```objc
[[SEGAnalytics sharedAnalytics] track:@"Signed Up"
                           properties:@{ @"plan": @"Enterprise" }];
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

```objc
[[SEGAnalytics sharedAnalytics] track:@"Article Bookmarked"
                           properties:@{
                               @"title": @"Snow Fall",
                               @"subtitle": @"The Avalanche at Tunnel Creek",
                               @"author": @"John Branch" }];
```

Once you've added a few `track` calls, **you're done!** You successfully instrumented your app! Now you're ready to turn on any destination you fancy from our interface, margarita in hand.

## Step 4: Flushing

You can set the number of events should queue before flushing. Setting this to `1` will send events as they come in (i.e. not send batched events) and will use more battery. `20` by default.

```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.flushAt = 1;
[SEGAnalytics setupWithConfiguration:configuration];
```

You can also manually `flush` the queue:

```objc
[[SEGAnalytics sharedAnalytics] alias:@"glenncoco"];
[[SEGAnalytics sharedAnalytics] flush]
```

## Step 5: Submitting to the App Store
When you submit to the app store, be aware that Segment collects the IDFA for use in doing mobile install attribution with destinations like Mobile App Tracking. Even if you're not currently doing mobile install attribution, if you get asked, "Does this app use the Advertising Identifier (IDFA)?" on [this](http://www.brianjcoleman.com/wp-content/uploads/2014/07/IDFA_Page2-1.jpg) page, you'll want to **check** the following three boxes:

1. "Attribute this app installation to a previously served advertisement"
2. "Attribute an action taken within this app to a previously served advertisement"
3. "I, YOUR_NAME, confirm that this app, and any third party..."

Note, you should *not* check the box labeled "Serve advertisements within the app" unless you are actually going to display ads.

---


## What's Next?

We just walked through the quickest way to get started with Segment using Analytics for iOS. You might also want to check out our full [Analytics for iOS reference](/docs/connections/sources/catalog/libraries/mobile/ios) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/website/tracking-api#api-methods) to get a sense for the bigger picture.
