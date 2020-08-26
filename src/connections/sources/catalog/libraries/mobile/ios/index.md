---
title: Analytics for iOS
strat: ios
---


Analytics for iOS makes it simple to send your data to any analytics or marketing tool without having to learn, test or implement a new API every time.

All of Segment's libraries are open-source, so you can [view Analytics for iOS on Github](https://github.com/segmentio/analytics-ios), or check out our [browser and server-side libraries](/docs/connections/sources/catalog/) too.

Want to stay updated on releases? Subscribe to the [release feed](https://github.com/segmentio/analytics-ios/tags.atom).

> note ""
> **Note:** Segment does not currently support tracking of watchkit extensions for the Apple watch. [Email us](https://segment.com/requests/integrations/) if you're interested in a watchkit SDK. For now we recommend tracking watch interactions using the iPhone app code.

## Getting Started


### About mobile connection modes

{% include content/mobile-cmodes.md %}


{% include components/media-icon.html href="https://github.com/segmentio/analytics-test-apps" icon="media/icon-guides.svg" title="iOS Test Apps" content="Segment maintains test apps for the iOS mobile library. Find them here." %}


### Install the SDK

The recommended way to install Analytics for iOS is using [Cocoapods](http://cocoapods.org), since it means you can create a build with specific destinations, and because it makes it simple to install and upgrade.

First, add the `Analytics` dependency to your `Podfile`, like so:

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

**Note:** Automatically tracking lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) and screen views is optional using initialization config parameters, but highly recommended to hit the ground running with core events! See [below](/docs/connections/sources/catalog/libraries/mobile/ios/quickstart/#step-4-track-actions) for more info!

And of course, import the SDK in the files that you use it with:


{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
#import <Analytics/SEGAnalytics.h>
```
{% endcodeexampletab %}

{% endcodeexample %}


### Including SDKs for destinations using Device-mode

In the interest of keeping our SDK lightweight, the Analytics pod only installs the Segment destination. This means that all your data is sent using Segment's servers to any tools you've enabled using the default Cloud-mode.

[As described here](/docs/connections/destinations/#connection-modes), some integrations require or offer Device-mode connections. In those cases, you'll need to take some additional steps as [shown in the source documentation here](/docs/connections/sources/catalog/libraries/mobile/ios/#packaging-device-mode-destination-sdks).

Now that the SDK is installed and setup, you're ready to...

### Configure and set up the SDK

The `SEGAnalyticsConfiguration` class provides a set of properties that control various policies of the `SEGAnalytics` instance. You initialize it with a `writeKey` like so:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[SEGAnalytics setupWithConfiguration:[SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"]];
```

{% endcodeexampletab %}

{% endcodeexample %}


<table class="api-table">
    <tr>
        <td>`writeKey` _NSString *_</td>
        <td>Your Segment source's **Write Key**.</td>
    </tr>
</table>

### Application Lifecycle Tracking

Our SDK can automatically instrument common application lifecycle events such as "Application Installed", "Application Updated" and "Application Opened". Simply enable this option when you initialize the SDK.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
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



### Automatic Screen Tracking

Our SDK can automatically instrument screen calls. It uses method swizzling to detect when ViewController's are loaded and uses the label of the view controller (or the class name if a label is not available) as the screen name. It removes the string "ViewController" from the name (if present).

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.recordScreenViews = YES;
[SEGAnalytics setupWithConfiguration:configuration];
```
{% endcodeexampletab %}

{% endcodeexample %}



### Automatic Push Notification Tracking
Tracking Push notifications will automatically track `Push Notification Received` and `Push Notification Tapped`.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackPushNotifications = YES;
[SEGAnalytics setupWithConfiguration:configuration];
```
{% endcodeexampletab %}

{% endcodeexample %}



### Automatic Deep Link Tracking
Tracking deep linking will automatically track `Deep Link Opened`.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackDeepLinks = YES;
[SEGAnalytics setupWithConfiguration:configuration];
```
{% endcodeexampletab %}

{% endcodeexample %}



### Flushing

You can set the number of events should queue before flushing. Setting this to `1` will send events as they come in (i.e. not send batched events) and will use more battery. `20` by default.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
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


You can also manually `flush` the queue:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] alias:@"glenncoco"];
[[SEGAnalytics sharedAnalytics] flush]
```
{% endcodeexampletab %}

{% endcodeexample %}



## Data Collection

Now that the Segment SDK and any accompanying packaged SDKs are installed, you're ready to collect some data!

> note ""
> **Good to know**: For any of the different methods described in this doc, you can replace the properties and traits in the code samples with variables that represent the data collected.

### Identify

Segment's Identify method lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

We recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits are changed.

**Note:** Segment automatically assigns an `anonymousId` to users before you identify them. The `userId` is what connects anonymous activities across devices (for example, iPhone and iPad).

Example `identify` call:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] identify:@"a user's id"
                                traits:@{ @"email": @"a user's email address" }];
```
{% endcodeexampletab %}

{% endcodeexample %}



This call identifies a user by his unique User ID (the one you know him by in your database) and labels him with `name` and `email` traits.

The `identify` call has the following fields:

<table class="api-table">
  <tr>
    <td>`userId` _NSString *, optional_</td>
    <td>The database ID for this user. If you don't know who the user is yet, you can omit the `userId` and just record `traits`. You can read more in the [identify reference](/docs/connections/spec/identify).</td>
  </tr>
  <tr>
    <td>`traits` _NSDictionary *, optional_</td>
    <td>A dictionary of traits you know about the user, like their `email` or `name`. You can read more about traits in the [identify reference](/docs/connections/spec/identify).</td>
  </tr>
  <tr>
    <td>`options` _NSDictionary *, optional_</td>
    <td>A dictionary of extra [options](/docs/connections/sources/catalog/libraries/mobile/ios/#selecting-destinations) for the call.</td>
  </tr>
</table>

Analytics for iOS works on its own background thread, so it will never block the main thread for the UI or the calling thread.

Calling `- identify:` with a `userId` will write that ID to disk to be used in subsequent calls. That ID can be removed either by uninstalling the app or by calling [`reset`](#reset).

Find details on the **identify method payload** in our [Spec](/docs/connections/spec/identify/).

### Track

Segment's Track method lets you record the actions your users perform.  Every action triggers what we call an "event", which can also have associated properties.

To get started, our SDK can automatically track a few key common events with our [Native Mobile Spec](/docs/connections/spec/mobile/), such as the `Application Installed`, `Application Updated` and `Application Opened`. Simply enable this option during initialization.

You'll also want to track events that are indicators of success for your mobile app, like **Signed Up**, **Item Purchased** or **Article Bookmarked**. We recommend tracking just a few important events. You can always add more later!

Example `track` call:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] track:@"Item Purchased"
                           properties:@{ @"item": @"Sword of Heracles", @"revenue": @2.95 }];
```
{% endcodeexampletab %}

{% endcodeexample %}

This example `track` call tells us that your user just triggered the **Item Purchased** event recording the `item` name of "Sword of Heracles" and `revenue` of 2.95.

`track` event properties can be anything you want to record. In this case, item and revenue.

The `track` call has the following fields:

<table class="api-table">
  <tr>
    <td>`event` _NSString *_</td>
    <td>The name of the event. We recommend human-readable names like **Song Played** or **Status Updated**.</td>
  </tr>
  <tr>
    <td>`properties` _NSDictionary *, optional_</td>
    <td>A dictionary of properties for the event. If the event was `Product Added` to cart, it might have properties like `price` and `productType`.</td>
  </tr>
  <tr>
    <td>`options` _NSDictionary *, optional_</td>
    <td>A dictionary of extra [options](/docs/connections/sources/catalog/libraries/mobile/ios/#selecting-destinations) for the call.</td>
  </tr>
</table>


### Screen

The [`screen`](/docs/connections/spec/screen/) method lets you you record whenever a user sees a screen of your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event an event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Example `screen` call:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] screen:@"Photo Feed"
                            properties:@{ @"Feed Type": @"private" }];
```
{% endcodeexampletab %}

{% endcodeexample %}



The `screen` call has the following fields:

<table class="api-table">
  <tr>
    <td>`name` _NSString *_</td>
    <td>The name of the screen, for example **Signup** or **Home**.</td>
  </tr>
  <tr>
    <td>`properties` _NSDictionary *, optional_</td>
    <td>A dictionary of properties for the screen. A screen **Photo Feed** might have properties like `Feed Type` or `Sort Order`.</td>
  </tr>
  <tr>
    <td>`options` _NSDictionary *, optional_</td>
    <td>A dictionary of extra [options](/docs/connections/sources/catalog/libraries/mobile/ios/#selecting-destinations) for the call.</td>
  </tr>
</table>

Find details on the **`screen` payload** in our [Spec](/docs/connections/spec/screen/).

### Group

`group` lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/java/#identify) user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example `group` call:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] group:@"group123"
traits:@{ @"name": @"Initech", @"description": @"Accounting Software" }];
```
{% endcodeexampletab %}

{% endcodeexample %}


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
    <td>An `Options` object lets you set a [timestamp](/docs/connections/spec/common/#timestamps), [enable or disable destinations](#selecting-destinations), or [send additional context](/docs/connections/spec/common/#context).</td>
  </tr>
</table>

Find more details about `group` including the **`group` payload** in our [Spec](/docs/connections/spec/group/).

### Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [KISSmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] alias:@"some new id"];
```
{% endcodeexampletab %}

{% endcodeexample %}



The `alias` call has the following fields:

<table class="api-table">
  <tr>
    <td>`newId` _NSString *_</td>
    <td>The newId of the user you want to map to.</td>
  </tr>
  <tr>
    <td>`options` _NSDictionary *, optional_</td>
    <td>A dictionary of extra [options](/docs/connections/sources/catalog/libraries/mobile/ios/#selecting-destinations) for the call.</td>
  </tr>
</table>

For more details about `alias`, including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).

### AnonymousId

You can retrieve the `anonymousId` set by the library by using:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] getAnonymousId];
```
{% endcodeexampletab %}

{% endcodeexample %}


### Reset

The `- reset` method clears the SDK's internal stores for the current `user` and `group`. This is useful for apps where users can log in and out with different identities over time.

Clearing all information about the user is as simple as calling:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] reset];
```

{% endcodeexampletab %}

{% endcodeexample %}

Events queued on disk are not cleared and are uploaded the next time the app starts.

> **Note**: Each time you call `reset`, a new AnonymousId is generated the next time the app is opened, which can impact the number of Monthly Tracked Users (MTUs) you process.

### Disabling Data Collection for Users who opt out

Depending on the audience for your app (e.g. children) or the countries where you sell your app (e.g. the EU), you may need to offer the ability for users to opt-out of analytics data collection inside your app. You can turn off forwarding to ALL destinations including Segment itself:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] disable];
```
{% endcodeexampletab %}

{% endcodeexample %}



Or if they opt-back-in, you can re-enable data collection:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] enable];
```

{% endcodeexampletab %}

{% endcodeexample %}


Note: If you disable the Segment SDK, it ensures that all data collection method invocations (eg. `track`, `identify`, etc) are ignored; however, it does not tear down inititialized SDKs. If your packaged SDKs are collecting data automatically or outside of Segment, disabling Segment does not address that. We recommend invoking corresponding `disable` methods for each of your packaged SDKs in response to user opt-out to ensure that any automatic data collection is stopped.

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an object of `destinations` that lets you turn certain destinations on or off. By default all destinations are enabled.

You can enable or disable destinations by specifying an `NSDictionary *` in the options parameter of our methods as follows:


{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}

```objc
options:@{
  @"integrations": @{
    @"ENABLED_INTEGRATION_NAME": @YES,
    @"DISABLED_INTEGRATION_NAME: @NO
  }
}
```
{% endcodeexampletab %}

{% endcodeexample %}



Here's an example showing an `- track:` call that is sent to all enabled destinations except Mixpanel:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] track:@"Product Rated"
                           properties:nil
                              options:@{ @"integrations": @{ @"All": @YES, @"Mixpanel": @NO }}];
```
{% endcodeexampletab %}

{% endcodeexample %}



Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**Note:** Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

### Destinations in Debugger

If you are seeing any of your destinations turned off in the raw version of requests in the Segment live debugger, but you haven't added those to your requests, like this:

```js
"integrations": {
  "Segment.io": false,
  "Google Analytics": false,
  "Localytics": false,
  "Mixpanel": false
}
```

These flags tell the Segment servers that a request was already made directly from the device through a packaged SDK. That way we don't send a duplicate request through our servers to those services.

## Logging

To see a trace of your data going through the SDK, you can enable debug logging with `- debug:`:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[SEGAnalytics debug:YES];
```
{% endcodeexampletab %}

{% endcodeexample %}



Or disable it like this:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[SEGAnalytics debug:NO];
```
{% endcodeexampletab %}

{% endcodeexample %}



By default debug logging is disabled.


## Proxy HTTP Calls

You can point the iOS SDK to your own hosted [proxy](https://github.com/segmentio/segment-proxy) of the Segment API. This will run the HTTP traffic for the Segment API through the proxy.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];

// Set a custom request factory which allows you to modify the way the library creates an HTTP request.
// In this case, we're transforming the URL to point to our own custom non-Segment host.
configuration.requestFactory = ^(NSURL *url) {
    NSURLComponents *components = [NSURLComponents componentsWithURL:url resolvingAgainstBaseURL:NO];
    // Replace YOUR_PROXY_HOST with the address of your proxy, e.g. aba64da6.ngrok.io.
    components.host = @"YOUR_PROXY_HOST";
    NSURL *transformedURL = components.URL;
    return [NSMutableURLRequest requestWithURL:transformedURL];
};

// Set any other custom configuration options.
...

// Initialize the SDK with the configuration.
[SEGAnalytics setupWithConfiguration:configuration];
```
{% endcodeexampletab %}

{% endcodeexample %}



## Submitting to the App Store

When you submit to the app store, be aware that Segment collects the IDFA for use in doing mobile install attribution with destinations like Mobile App Tracking. Even if you're not currently doing mobile install attribution, if you get asked, "Does this app use the Advertising Identifier (IDFA)?" on [this](http://www.brianjcoleman.com/wp-content/uploads/2014/07/IDFA_Page2-1.jpg) page, you'll want to **check** the following three boxes:

1. "Attribute this app installation to a previously served advertisement"
2. "Attribute an action taken within this app to a previously served advertisement"
3. "I, YOUR_NAME, confirm that this app, and any third party..."

Note, you should *not* check the box labeled "Serve advertisements within the app" unless you are actually going to display ads.

> info ""
> The information above has changed with the 4.0-beta series. In line with Segment’s privacy stance, the IDFA is no longer collected automatically. Instead, customers who need it for integrations and ad analytics are must [pass it as configuration](#idfa-collection-in-40-beta-and-later) to the library.

### Limited Ad Tracking

iOS users can opt into limited ad tracking (similar to ad-blocking for browsers). For those users that have opted in, `adTrackingEnabled` will come through as `false`; however there will still be an `advertisingId` present. Since the iOS 10 release, those who opt in for limited ad tracking will have `adTrackingEnabled` set to `false` AND there will either be no `advertisingId` or the `advertisingId` will be a series of zeroes.


## Bleeding Edge Releases

We publish stable releases every second Wednesday, when we tag and release the `master` branch.

After releasing, we also merge the `dev` branch merged into `master`. In general, code will be available on `master` for two weeks before being tagged as a stable release. During this two week period, it is available for use using Cocoapods and Carthage — our equivalent of bleeding edge releases. We recommend using this version to try out upcoming features and fixes that have not been published yet.

To use the `master` branch for CocoaPods users, use this line in your `Podfile`:

```
pod 'Analytics', :git => 'https://github.com/segmentio/analytics-ios.git', :branch => 'master'
```

To use the `master` branch for Carthage users, use this line in your `Cartfile`:

```
github "segmentio/analytics-ios" "master"
```

## Packaging device-mode destination SDKs

By default, our `Analytics` pod packages no external SDKs.

```ruby
pod 'Analytics', '~> 3.1.0'
```

To add destinations using Device-mode, first add the dependencies you need. You can find these in our app when you open the destination sheet for any mobile destination with a Device-mode option.

```ruby
pod 'Segment-Bugsnag'
pod 'Segment-Branch'
pod 'Segment-GoogleAnalytics'
...
```

After adding the dependency, you must register the destination with our SDK.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
#import <Analytics/SEGAnalytics.h>
```
{% endcodeexampletab %}

{% endcodeexample %}

```objc
#import <Segment-GoogleAnalytics/SEGGoogleAnalyticsIntegrationFactory.h>
#import <Segment-Branch/BNCBranchIntegrationFactory.h>

SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];

// Add any of your Device-mode destinations.
[config use:[SEGGoogleAnalyticsIntegrationFactory instance]];
[config use:[BNCBranchIntegrationFactory instance]];
...

[SEGAnalytics setupWithConfiguration:config];
```

We recommend using Device-mode destinations sparingly to reduce the size of your application.
