---
title: 'Quickstart: iOS'
hidden: true
strat: ios
---

This tutorial gets you started sending data from your iOS app to Segment. When you're done you can turn on [any of Segment's destinations](/docs/connections/destinations/) with the flip of a switch! No more waiting for App Store approval.

If you want to dive deeper at any point, check out the [iOS Library Reference](/docs/connections/sources/catalog/libraries/mobile/ios/).

> note ""
> **Note:** Segment does not support tracking watchkit extensions for the Apple watch. [Contact us](https://segment.com/help/contact) if you're interested in a watchkit SDK. For now we recommend tracking watch interactions using the native iPhone app code.

## Step 1: Create a Source in the Segment app

Before you begin, you need a Workspace (which is a container that holds all of the sources and destinations which are billed together for an organization). If you already created one, great! If not, you can sign up for a free Segment account and create one.

Next, create an iOS source from your Workspace:

1. Click **Add Source**.
2. From the source catalog page, click **iOS**.
3. Click **Add Source** again from the informational panel that appears to the right.
4. Give the source a display name, and enter the URL the source will collect data from.

When you create a Source in the Segment web app, it tells the Segment servers that you'll be sending data from a specific source type. When you create (or change!) a Source in the Segment app, Segment generates a new Write Key for that source. You use the write key in your code to tell the Segment servers where the data is coming from, so Segment can route it to your destinations and other tools.

## Step 2: Install the SDK

Segment recommends you install Analytics for iOS by using either [Cocoapods](http://cocoapods.org/) or your Swift Package Manager. These allow you to create a build with specific bundled destinations, and they have a simplified installation and upgrading process.

First, add the `Analytics` dependency to your `Podfile` by adding the following line:

```ruby
pod 'Analytics', '~> 4.1'
```

Then in your application delegate's `- application:didFinishLaunchingWithOptions:` method, set up the SDK like so:

{% codeexample %}
{% codeexampletab Swift %}
```swift
let configuration = AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")
configuration.trackApplicationLifecycleEvents = true // Enable this to record certain application events automatically!
configuration.recordScreenViews = true // Enable this to record screen views automatically!
Analytics.setup(with: configuration)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackApplicationLifecycleEvents = YES; // Enable this to record certain application events automatically!
configuration.recordScreenViews = YES; // Enable this to record screen views automatically!
[SEGAnalytics setupWithConfiguration:configuration];
```
{% endcodeexampletab %}
{% endcodeexample %}

> success ""
> **Tip**: You don't need to use initialization config parameters to track lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) and screen views automatically, but we highly recommend that you do so you can start off already tracking some important core events. See [the track call info](/docs/connections/sources/catalog/libraries/mobile/ios/quickstart/#track) for more info.

Import the SDK in the files that you use it by adding the following line:

{% codeexample %}
{% codeexampletab Swift %}
```swift
import Segment
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
#import <Analytics/SEGAnalytics.h>
```
{% endcodeexampletab %}
{% endcodeexample %}

### Include additional client side SDKs

To keep the Segment SDK lightweight, the `Analytics` pod installs the Segment library only. This means that your data is sent to Segment's servers, and forwarded to any destination tools you enabled that accept the data from Segment.

Some destinations do not accept data coming from the Segment servers and require that you collect data directly from the device. In these cases you must bundle some additional destination code with the Segment SDK.

Many advanced marketing automation and analytics tools offer an SDK or allow you to choose to send data server to server -- depending on the features you need. Most optimization, deep linking, error tracking, and survey tools *must* be included on the device to use their core features.

In those cases, follow the additional steps to [bundle the destination tools](/docs/connections/sources/catalog/libraries/mobile/ios/#packaging-device-mode-destination-sdks).

Now that the SDK is installed and set up, you're ready to start making calls.


## Step 3: Identify Users

> note ""
> **Good to know**: For any of the different methods described in this quickstart, you can replace the properties and traits in the code samples with variables that represent the data collected.

The `identify` method informs Segment who the current user is. It takes a unique User ID, and any optional traits you know about them. You can read more about it in the [identify reference](/docs/connections/sources/catalog/libraries/mobile/ios#identify).

Here's what a basic call to `identify` might look like:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().identify("f4ca124298", traits: ["name": "Michael Smith", "email": "msmith@example.com"])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] identify:@"f4ca124298"
                                    traits:@{ @"name": @"Michael Brown",
                                    @"email": @"mbrown@example.com" }];
```
{% endcodeexampletab %}
{% endcodeexample %}

That call identifies Michael by his unique User ID (`f4ca124298`, which is the one you know him by in your database) and labels him with `name` and `email` traits.

**Hold up though!** When you put that code in your iOS app, you need to replace those hard-coded trait values with the variables that represent the details of the currently logged-in user.

Once you've added an `identify` call, you're ready to move on to tracking!


## Step 4: Track Actions

The `track` method is tells Segment about the actions your users perform in your app. Every action triggers an “event”, which can also have associated properties. You can read more about `track` in the [track method](/docs/connections/sources/catalog/libraries/mobile/ios#track) reference.

To get started, the Segment iOS SDK can automatically track a few important common events, such as **Application Installed**, **Application Updated** and **Application Opened**. You can enable this option during initialization by adding the following lines.

{% codeexample %}
{% codeexampletab Swift %}
```swift
AnalyticsConfiguration configuration = AnalyticsConfiguration(writeKey:"YOUR_WRITE_KEY")
configuration.trackApplicationLifecycleEvents = true
Analytics.setup(with: configuration)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackApplicationLifecycleEvents = YES;
[SEGAnalytics setupWithConfiguration:configuration];
```
{% endcodeexampletab %}
{% endcodeexample %}

You should also track events that indicate success in your mobile app, like **Signed Up**, **Item Purchased** or **Article Bookmarked**. We recommend tracking just a few important events. You can always add more later!

Here's what a `track` call might look like when a user signs up:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().track("Signed Up", properties: ["plan": "Enterprise"])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] track:@"Signed Up"
                            properties:@{ @"plan": @"Enterprise" }];
```
{% endcodeexampletab %}
{% endcodeexample %}

That tells us that your user triggered the **Signed Up** event, and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().track("Article Bookmarked", properties: ["title": "Snow Fall", "subtitle": "The Avalanche at Tunnel Creek", "author": "John Branch"])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] track:@"Article Bookmarked"
                            properties:@{
                                @"title": @"Snow Fall",
                                @"subtitle": @"The Avalanche at Tunnel Creek",
                                @"author": @"John Branch" }];
```
{% endcodeexampletab %}
{% endcodeexample %}

Once you've added a few `track` calls, **you're set up!** You successfully instrumented your app, and can turn on any destination you like from your Segment workspace. However, there are a few important things to know about for mobile app instrumentation, so read on!


## Step 5: Flushing

By default, Segment sends (“flushes”) events from the iOS library in batches of `20`, however this is configurable. You can set the `flushAt` value to change the batch size, or you can set it to `1` to disable batching completely.

> note ""
> **Note**: When you disable batching, Segment sends events as they occur. This increases battery use.

{% codeexample %}
{% codeexampletab Swift %}
```swift
let configuration = AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")
configuration.flushAt = 1
Analytics.setup(with: configuration)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.flushAt = 1;
[SEGAnalytics setupWithConfiguration:configuration];
```
{% endcodeexampletab %}
{% endcodeexample %}

You can also manually call `flush` in your code to send all the messages in the queue:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().alias("glenncoco")
Analytics.shared().flush()

```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] alias:@"glenncoco"];
[[SEGAnalytics sharedAnalytics] flush]
```
{% endcodeexampletab %}
{% endcodeexample %}

## What's Next?

We just walked through the quickest way to get started with Segment using Analytics for iOS. You might also want to check out our full [Analytics for iOS reference](/docs/connections/sources/catalog/libraries/mobile/ios) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http-api/) to get a sense for the bigger picture.
