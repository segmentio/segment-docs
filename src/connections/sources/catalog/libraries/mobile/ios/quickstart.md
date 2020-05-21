---
title: 'Quickstart: iOS'
hidden: true
---

This tutorial gets you started sending data from your iOS app to Segment. When you're done you can turn on [any of Segment's destinations](/docs/connections/destinations/) with the flip of a switch! No more waiting for App Store approval.

If you want to dive deeper at any point, check out the [iOS Library Reference](/docs/libraries/ios/).

_Note: At the moment Segment does not support tracking watchkit extensions for the Apple watch. [Contact us](https://segment.com/help/contact) if you're interested in a watchkit SDK. For now we recommend tracking watch interactions using the native iPhone app code._


## Step 1: Install the SDK

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
> **Tip**: You don't _need_ to use initialization config parameters to track lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) and screen views automatically, but we highly recommend that you do so you can start off already tracking some important core events. See [the track call info below](/#track) for more info!

And of course, import the SDK in the files that you use it by adding the following line:

```objc
#import <Analytics/SEGAnalytics.h>
```

### Including Additional Client Side SDKs

To keep the Segment SDK lightweight, the `Analytics` pod only installs the Segment library. This means that all of your data is sent to Segment's servers, and forwarded to any destination tools you enabled that accept the data from Segment.

Some destinations do not accept data coming from the Segment servers and instead require that you collect the data from the device. In these cases you must bundle some additional destination code with the Segment SDK.

Many advanced marketing automation and analytics tools offer the an SDK or allow you to choose to send data server to server - depending on the features you need. Most optimization, deep linking, error tracking, and survey tools _must_ be included on the device to use their core features.

In those cases, follow the additional steps to [bundle the destination tools](/docs/connections/sources/catalog/libraries/mobile/ios#bundling-destinations).

Now that the SDK is installed and set up, you're ready to start making calls!

## Step 2: Identify Users

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

## Step 3: Track Actions

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

Once you've added a few `track` calls, **you're set up!** You successfully instrumented your app, and can turn on any destination you like from your Segment workspace. However, there are a few important things to know about for mobile app instrumentation, so read on!

## Step 4: Flushing

By default, Segment sends ("flushes") events from the iOS library in batches of `20`, however this is configurable. You can set the `flushAt` value to change the batch size, or you can set it to `1` to disable batching completely.

> note ""
> **Note**: When you disable batching, Segment sends events as they occur. This increases battery use.

```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.flushAt = 1;
[SEGAnalytics setupWithConfiguration:configuration];
```

You can also manually call `flush` in your code to send all the messages in the queue:

```objc
[[SEGAnalytics sharedAnalytics] alias:@"glenncoco"];
[[SEGAnalytics sharedAnalytics] flush]
```

## Step 5: Submitting to the App Store

Segment collects the IDFA of the user's device to use in mobile install attribution with destinations like Mobile App Tracking.

When you submit to the app store, even if you're not currently doing mobile install attribution, **check the following three boxes** in the "Does this app use the Advertising Identifier (IDFA)?" on [this page](images/IDFA_Page2-1.jpg):

1. "Attribute this app installation to a previously served advertisement"
2. "Attribute an action taken within this app to a previously served advertisement"
3. "I, YOUR_NAME, confirm that this app, and any third party..."

> note ""
> **Note**: You should *not* check the box labeled "Serve advertisements within the app" unless you are actually going to display ads.

> info ""
> The information above has changed with the 4.0-beta series. In line with Segment’s privacy stance, the IDFA is no longer collected automatically. Instead, customers who need it for integrations and ad analytics are must [pass it as configuration](#idfa-collection-in-40-beta-and-later) to the library.

---


## What's Next?

We just walked through the quickest way to get started with Segment using Analytics for iOS. You might also want to check out our full [Analytics for iOS reference](/docs/connections/sources/catalog/libraries/mobile/ios) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http-api/) to get a sense for the bigger picture.
