---
title: Analytics for iOS
strat: ios
repo: analytics-ios
id: UBrsG9RVzw
---
With Analytics for iOS, you can send your data to analytics or marketing tool, without needing to learn, test, or implement a new API with each update or addition.
<br />
<br />
<br />

> note ""
> **Note:** Segment does not currently support tracking of watchkit extensions for the Apple Watch. [Email us](https://segment.com/requests/integrations/) if you're interested in a Watchkit SDK. For now we recommend tracking watch interactions using the iPhone app code.


> info "Analytics-Swift"
> The [Analytics-Swift](/docs/connections/sources/catalog/libraries/mobile/swift-ios/) library is in General Availability. If you'd like to migrate to Analytics-Swift, see the [migration guide](/docs/connections/sources/catalog/libraries/mobile/swift-ios/migration/).

## Analytics-iOS and Unique Identifiers

One of the most important parts of any analytics platform is the ability to consistently and accurately identify users. To do this, the platform must assign and persist some form of identification on the device, so you can analyze user actions effectively. This is especially important for funnel conversion analysis and retention analysis.

Naturally the Analytics SDK needs a unique ID for each user. To protect end-users' privacy, Apple places restrictions on how these IDs can be generated and used. This section explains Apple's policies, and how Segment generates IDs in compliance with these policies.

Before iOS 5 developers had access to `uniqueIdentifier`, which was a hardware-specific serial number that was consistent across different apps, vendors and installs. Starting with iOS 5, however, [Apple deprecated access to this identifier](https://developer.apple.com/news/?id=3212013a). In iOS 6 Apple introduced the `identifierForVendor` which protects end-users from cross-app identification. In iOS 7 Apple [restricted access to the device's MAC address](http://techcrunch.com/2013/06/14/ios-7-eliminates-mac-address-as-tracking-option-signaling-final-push-towards-apples-own-ad-identifier-technology/), which many developers used as a workaround to get a similar device-specific serial number to replace  `uniqueIdentifier`.

Segment's iOS library supports iOS 7+ by generating a UUID and storing it on disk. This complies with Apple's required privacy policies, maintains compatibility, and also enables correct tracking in situations where multiple people use the same device, since the UUID can be regenerated.


## API call queueing in Analytics-iOS

The Segment SDK queues API calls rather than making a network request for each event tracked, to help improve the user's battery life.

Packaged, or “device-mode” destinations (where Segment sends data directly from the user's device using the destination's integration SDK), might have their own queue behavior. Check the destination vendor's documentation for details.

For cloud-mode destinations, when you make an API call (Track, Page, etc.) the Segment library adds that call to the queue, and sends the events to the Segment servers in batches. By default, the batch size is `100`.

Batches are sent either:

- when there are 20 or more events in the queue
- on a scheduled timer, every 30 seconds
- when the app goes to the background

To limit memory and disk usage, Segment only queues up to 1000 events.
When the app is terminated, Segment saves the queue to disk, and loads that data again at app launch so there is no data loss.


## Getting Started

### About mobile connection modes

{% include content/mobile-cmodes.md %}


{% include components/reference-button.html href="https://github.com/segmentio/analytics-test-apps" icon="guides.svg" title="iOS Test Apps" description="Segment maintains test apps for the iOS mobile library. Find them here." %}

### Install the SDK

The recommended way to install Analytics for iOS is using [Cocoapods](http://cocoapods.org/), since it means you can create a build with specific destinations, and because it makes it simple to install and upgrade.

First, add the `Analytics` dependency to your `Podfile`, like so:

```ruby
pod 'Analytics', '~> 4.1'
```

Then in your application delegate's `- application:didFinishLaunchingWithOptions:` method, set up the SDK like so:

{% codeexample %}
{% codeexampletab Swift%}
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

> note ""
> **Note:** Automatically tracking lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) and screen views is optional using initialization config parameters, but highly recommended to hit the ground running with core events! See [below](/docs/connections/sources/catalog/libraries/mobile/ios/quickstart/#step-4-track-actions) for more info!

And of course, import the SDK in the files that you use it with:
{% codeexample %}
{% codeexampletab Swift %}
```swift
import Segment
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
#import <Segment/SEGAnalytics.h>
```
{% endcodeexampletab %}
{% endcodeexample %}


### Including the SDKs for destinations using Device-mode

To keep the Analytics-iOS SDK lightweight, the Analytics pod only installs the Segment destination. This means that all your data is sent through Segment's servers to any tools you enable using the default Cloud-mode.

Some destinations [require or offer Device-mode connections](/docs/connections/destinations/#connection-modes). For those destinations, you must take some additional steps as [to package the device-mode SDKs](/docs/connections/sources/catalog/libraries/mobile/ios/#packaging-device-mode-destination-sdks).

Now that the Segment Analytics-iOS SDK is installed and set up, you're ready to…

### Configure and set up the SDK

The `SEGAnalyticsConfiguration` class provides a set of properties that control various policies of the `SEGAnalytics` instance. You initialize it with a `writeKey` as in the examples below:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.setup(with: AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY"))
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

The Segment Analytics-iOS SDK can automatically instrument [common application lifecycle events](/docs/connections/spec/mobile/) such as "Application Installed", "Application Updated" and "Application Opened". Simply enable this option when you initialize the SDK.

{% codeexample %}
{% codeexampletab Swift %}
```swift
let configuration = AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")
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


### Automatic Screen Tracking

The Segment Analytics-iOS SDK can automatically instrument screen calls. It uses method swizzling to detect when `ViewController`s are loaded, and uses the label of the view controller (or the class name if a label is not available) as the screen name. It removes the string "ViewController" from the name if one is present.

{% codeexample %}
{% codeexampletab Swift %}
```swift
let configuration = AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")
configuration.recordScreenViews = true
Analytics.setup(with: configuration)
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

When you set `trackPushNotifications` to `YES`, the SDK automatically sends a Track event for `Push Notification Received` and `Push Notification Tapped`.

{% codeexample %}
{% codeexampletab Swift %}
```swift
let configuration = AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")
configuration.trackPushNotifications = true
Analytics.setup(with: configuration)
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

When you set `trackDeepLinks` to `YES`, the SDK automatically sends a Track event for `Deep Link Opened`.
{% codeexample %}
{% codeexampletab Swift %}
```swift
let configuration = AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")
configuration.trackDeepLinks = true
Analytics.setup(with: configuration)
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

You can set the number of events that should queue before flushing. Setting this to `1` will send events as they come in (i.e. not send batched events) and will use more battery. `20` by default.

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

You can also manually `flush` the queue:

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


## Data Collection

Now that the Segment SDK and any accompanying packaged SDKs are installed, you're ready to collect some data!

> note ""
> **Good to know**: For any of the methods described in this doc, you can replace the properties and traits in the code samples with variables that represent the data collected.

### Identify

Segment's Identify method lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

Segment recommends that you call Identify once when you first create the user's account, and only call it again later when they update their traits or you change them.


> note ""
> **Note:** Segment automatically assigns an `anonymousId` to users before you identify them. The `userId` is what connects anonymous activities across devices (for example, iPhone and iPad).

Example `identify` call:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().identify("a user's id", traits: ["email": "a user's email address"])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] identify:@"a user's id"
                                traits:@{ @"email": @"a user's email address" }];
```
{% endcodeexampletab %}
{% endcodeexample %}


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

Find details on the identify method payload in the [Identify Spec documentation](/docs/connections/spec/identify/).


### Track

Segment's Track method lets you record the actions your users perform. Every action triggers what we call an "event", which can also have associated properties.

To get started, the Segment iOS SDK can automatically track a few key common events with the [Segment Native Mobile Spec](/docs/connections/spec/mobile/), such as the `Application Installed`, `Application Updated` and `Application Opened`. Enable this option during initialization.

You might also want to track events that are indicators of success for your mobile app, like **Signed Up**, **Item Purchased** or **Article Bookmarked**. Segment recommends tracking just a few important events to start out. You can always add more later!
An example Track call might look like this:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().track("Item Purchased", properties: ["item": "Sword of Heracles", "revenue": 2.95])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] track:@"Item Purchased"
                            properties:@{ @"item": @"Sword of Heracles", @"revenue": @2.95 }];
```
{% endcodeexampletab %}
{% endcodeexample %}

This example Track call above tells you that your user just triggered the **Item Purchased** event, and records the `item` name of "Sword of Heracles" and `revenue` of 2.95.

Track event properties can be anything you want to record. In this case, item and revenue.

The Track call has the following fields:

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

The [Screen](/docs/connections/spec/screen/) method lets you you record whenever a user sees a screen of your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event an event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Example Screen call:
{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().screen("Photo Feed", properties: ["Feed Type": "private"])
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

Find details on the Screen payload in the [Screen Spec documentation](/docs/connections/spec/screen/).

### Group

The Segment Group method lets you associate an [identified user](/docs/connections/sources/catalog/libraries/mobile/ios/#identify) user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

An example Group call might look like this:
{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().group("group123", traits: ["name": "Initech", "description": "Accounting Software"])
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] group:@"group123"
traits:@{ @"name": @"Initech", @"description": @"Accounting Software" }];
```
{% endcodeexampletab %}
{% endcodeexample %}

The Group call has the following fields:

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
    <td>An `Options` object lets you [enable or disable destinations](#selecting-destinations), or [send additional context](/docs/connections/spec/common/#context).</td>
  </tr>
</table>

Find more details about `group` including the `group` **payload** in our [Spec](/docs/connections/spec/group/).

### Alias

The Segment Alias method is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in some destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use ‘alias' to rename the ‘userId'.

Example Alias call:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().alias("some new id")
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] alias:@"some new id"];
```
{% endcodeexampletab %}
{% endcodeexample %}

The Alias call has the following fields:

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

For more details about the Alias method, including the Alias call payload, check out the [Alias Spec documentation](/docs/connections/spec/alias/).


### AnonymousId

You can retrieve the `anonymousId` set by the library by using:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().getAnonymousId
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] getAnonymousId];
```
{% endcodeexampletab %}
{% endcodeexample %}

To set the `anonymousId` to a custom value you can set this via the `options` parameter:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().identify(nil, traits: ["email": "a user's email address"], options: ["anonymousId" : "test_anonymousId"]);
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] identify:nil traits:@{ @"email": @"a user's email address" } options: @{ @"anonymousId":@"test_anonymousId"}];
```
{% endcodeexampletab %}
{% endcodeexample %}

### Reset

The `- reset` method clears the SDK's internal stores for the current `user` and `group`. This is useful for apps where users can log in and out with different identities over time.

The example code below clears all information about the user.

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().reset()
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] reset];
```
{% endcodeexampletab %}
{% endcodeexample %}


**Reset does not clear events in the queue**, and any remaining events in the queue are sent the next time the app starts. You might want to call [Flush](#flush) before you call Reset.


> info ""
> **Note**: Each time you call `reset`, a new AnonymousId is generated the next time the app is opened, which can impact the number of Monthly Tracked Users (MTUs) you process.


### Disabling Data Collection for Users who opt out

Depending on the audience for your app (for example, children) or the countries where you sell your app (for example, the EU), you might need to offer the ability for users to opt-out of analytics data collection from inside your app. You can turn off forwarding to ALL destinations including Segment itself using the following code:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().disable()
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] disable];
```
{% endcodeexampletab %}
{% endcodeexample %}

Or if the user opts back in, you can re-enable data collection:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().enable()
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] enable];
```
{% endcodeexampletab %}
{% endcodeexample %}


> warning ""
> If you disable the Segment SDK in response to user opt-out, all Segment method invocations (Track, Screen, Identify, etc) are ignored. However, this does not disable any destination SDKs that you bundled along with Segment. You should consult the vendor documentation for those destinations, and invoke the corresponding `disable` methods for each packaged SDK to ensure that any automatic data collection stops.


## Selecting Destinations

You can pass an `integrations` object on Page, Track, Alias, Group and Identify calls to turn specific destinations on or off. All destinations are enabled by default.

You can enable or disable destinations by specifying an `NSDictionary *` in the `options` parameter of the Segment methods as in the examples below:

{% codeexample %}
{% codeexampletab Swift %}
```swift
options: [
  "integrations": [
    "ENABLED_INTEGRATION_NAME": true,
    "DISABLED_INTEGRATION_NAME": false
  ]
]
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


The example below shows a Track call that is sent to all enabled destinations except Mixpanel:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.shared().track("Product Rated", properties: nil, options: ["integrations": ["All": true, "Mixpanel": false]])
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

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (for example "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).


> note ""
> **Note:** Business level customers can filter track calls from the Segment App from the source schema page. Segment recommends that you use this method when possible, because simpler, and can be updated without any code changes in your app.


### Disabled destinations in the debugger

When you view raw payload data in the [Segment Debugger](/docs/connections/sources/debugger/), you might see an `integrations` object in the payload that indicates that some of your destinations are turned off, even if you didn't specifically turn them off. You might see a payload that like the example below:

```js
"integrations": {
  "Segment.io": false,
  "Google Analytics": false,
  "Localytics": false,
  "Mixpanel": false
}
```

When Segment sends data in Device-mode (directly from a user's device) it sets the destination to `false` in the `integrations` object of the data that it sends to the Segment servers. This indicates that the data was sent directly from the user's device to the destination endpoint, and prevents the Segment servers from sending the destination that same data again.


## Logging

To see a trace of your data going through the SDK, you can enable debug logging with `- debug:`:

{% codeexample %}
{% codeexampletab Swift %}
```swift
Analytics.debug(true)
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
Analytics.debug(false)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
[SEGAnalytics debug:NO];
```
{% endcodeexampletab %}
{% endcodeexample %}

By default debug logging is disabled.


## Proxy HTTP(S) Calls

You can point the iOS SDK to your own hosted [proxy](/docs/connections/sources/catalog/libraries/website/javascript/custom-proxy/) of the Segment API.

This runs the HTTP traffic for the Segment API through the proxy.

{% codeexample %}
{% codeexampletab Swift %}
```swift
let configuration = AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")

// Set a custom request factory which allows you to modify the way the library creates an HTTP request.
// In this case, we're transforming the URL to point to our own custom non-Segment host.
configuration.requestFactory = { (url: URL) -> URLRequest in
    var result = URLRequest(url: url)
    if var components = URLComponents(url: url, resolvingAgainstBaseURL: false) {
        components.host = "YOUR_PROXY_HOST"
        if let transformedURL = components.url {
            result = URLRequest(url: transformedURL)
        }
    }
    return result
}

// Set any other custom configuration options.
...

// Initialize the SDK with the configuration.
Analytics.setup(with: configuration)
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


## Ad Tracking and IDFA

Starting iOS 14, applications must prompt users if that app needs to collect their Identifier for Advertisers (IDFA). Going forward with analytics-ios-4.1 and later, Segment doesn't auto-collect IDFA. If your app or any integrations require the use of IDFA, you need to:

1. import the [AdSupport](https://developer.apple.com/documentation/adsupport) and [App Tracking Transparency](https://developer.apple.com/documentation/apptrackingtransparency) Frameworks by Apple
2. pass the below code snippet to Segment config and start tracking events
3. prompt the user for consent and collect the IDFA

You can use the following closure snippet to pass the value to `analytics-ios` as configurations:

{% codeexample %}
{% codeexampletab Swift %}
```swift
import AdSupport

...

let configuration = AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")

// Enable advertising collection
configuration.enableAdvertisingTracking = true
// Set the block to be called when the advertisingID is needed
// NOTE: In iOS 14, you'll need to manually do authorization elsewhere and only when it has been authorized, return the advertisingIdentifier to segment via the block below
configuration.adSupportBlock = { () -> String in
    return ASIdentifierManager.shared().advertisingIdentifier.uuidString
}

Analytics.setup(with: configuration)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
@import AdSupport;

...

SEGAnalyticsConfiguration* configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
// Enable advertising collection
configuration.enableAdvertisingTracking = YES;
// Set the block to be called when the advertisingID is needed
// NOTE: In iOS 14, you'll need to manually do authorization elsewhere and only when it has been authorized, return the advertisingIdentifier to segment via the block below
    configuration.adSupportBlock = ^{
        return [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    };
[SEGAnalytics setupWithConfiguration:configuration];
```
{% endcodeexampletab %}
{% endcodeexample %}


The same value for IDFA will used across all (device and cloud-mode) integrations.


> note ""
> **Note:** analytics-ios can continue to collect events without the IDFA until user is prompted and only upon user consent the `advertisingId` field is added to the event payload

Ad-tracking affects two keys under the `context` object of every event:

<table class="api-table">
  <tr>
    <td>`device.adTrackingEnabled`</td>
    <td>`true` if SDK is setup with closure and user has consented, `false` otherwise</td>
  </tr>
  <tr>
    <td>`device.advertisingId` </td>
    <td>`idfa_value` if user opts-in otherwise this key is skipped from event payload</td>
  </tr>
</table>

If your use cases don't require the need for IDFA collection you can skip this setup and under your event context you will see not see the `device.adTrackingEnabled`  and `device.advertisingId` key/value in your event payload.

## Bleeding Edge Releases

Segment publishes stable releases every second Wednesday by tagging and releasing the `master`branch.

After release, Segment also merges the release's `dev` branch into `master`. In general, code is available on `master` for two weeks before it is tagged as a stable release. During this period, the code is available using Cocoapods and Carthage — our equivalent of bleeding edge releases. Segment recommends that you use this version to try out upcoming features and fixes that have not been published yet.

To use the `master` branch, use one of the following methods:

### CocoaPods

Add this line in your `Podfile`:

```ruby
pod 'Analytics', :git => 'https://github.com/segmentio/analytics-ios.git', :branch => 'master'
```


## Packaging device-mode destination SDKs

By default, the Segment `Analytics` pod does not package any destination SDKs.

```ruby
pod 'Analytics', '~> 4.1.0'
```

To add destinations using Device-mode, first add the dependencies you need. You can find these in the Segment app when you open the destination sheet for [any mobile destination with a Device-mode option](/docs/connections/destinations/cmodes-compare/).

```ruby
pod 'Segment-Bugsnag'
pod 'Segment-Branch'
pod 'Segment-GoogleAnalytics'
...
```

After you add the dependency, you must register the destination with the Segment SDK:

{% codeexample %}
{% codeexampletab Swift %}
```swift
import Segment
import Segment-GoogleAnalytics
import Segment-Branch

AnalyticsConfiguration *config = AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")

// Add any of your Device-mode destinations.
config.use(SEGGoogleAnalyticsIntegrationFactory.instance())
config.use(BNCBranchIntegrationFactory.instance())
...

Analyitcs.setup(with: config)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
#import <Segment/SEGAnalytics.h>
#import <Segment-GoogleAnalytics/SEGGoogleAnalyticsIntegrationFactory.h>
#import <Segment-Branch/BNCBranchIntegrationFactory.h>

SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];

// Add any of your Device-mode destinations.
[config use:[SEGGoogleAnalyticsIntegrationFactory instance]];
[config use:[BNCBranchIntegrationFactory instance]];
...

[SEGAnalytics setupWithConfiguration:config];
```
{% endcodeexampletab %}
{% endcodeexample %}

Segment recommends that you use Device-mode destinations sparingly, to reduce the size of your application.
