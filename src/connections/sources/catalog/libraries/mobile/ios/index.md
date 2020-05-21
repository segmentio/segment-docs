---
title: Analytics for iOS
---

Analytics for iOS makes it simple to send your data to any analytics or marketing tool without having to learn, test or implement a new API every time.

All of Segment's libraries are open-source, so you can [view Analytics for iOS on Github](https://github.com/segmentio/analytics-ios), or check out our [browser and server-side libraries](/sources/catalog/) too.

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

Then in your application delegate's `- application:didFinishLaunchingWithOptions:` method, setup the SDK like so:

```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackApplicationLifecycleEvents = YES; // Enable this to record certain application events automatically!
configuration.recordScreenViews = YES; // Enable this to record screen views automatically!
[SEGAnalytics setupWithConfiguration:configuration];
```

**Note:** Automatically tracking lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) and screen views is optional using initialization config parameters, but highly recommended to hit the ground running with core events! See [below](/docs/connections/sources/catalog/libraries/mobile/ios/quickstart/#step-3-track-actions) for more info!

And of course, import the SDK in the files that you use it with:

```objc
#import <Analytics/SEGAnalytics.h>
```

### Including SDKs for destinations using Device-mode

In the interest of keeping our SDK lightweight, the Analytics pod only installs the Segment destination. This means that all your data is sent using Segment's servers to any tools you've enabled using the default Cloud-mode.

[As described here](/docs/connections/destinations/#connection-modes), some integrations require or offer Device-mode connections. In those cases, you'll need to take some additional steps as [shown in the source documentation here](/docs/connections/sources/catalog/libraries/mobile/ios#packaging-destinations-using-device-mode).

Now that the SDK is installed and setup, you're ready to...

### Configure and Setup the SDK

The `SEGAnalyticsConfiguration` class provides a set of properties that control various policies of the `SEGAnalytics` instance. You initialize it with a `writeKey` like so:

```objc
[SEGAnalytics setupWithConfiguration:[SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"]];
```

<table class="api-table">
    <tr>
        <td>`writeKey` _NSString *_</td>
        <td>Your Segment source's **Write Key**.</td>
    </tr>
</table>

### Application Lifecycle Tracking

Our SDK can automatically instrument common application lifecycle events such as "Application Installed", "Application Updated" and "Application Opened". Simply enable this option when you initialize the SDK.

```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackApplicationLifecycleEvents = YES;
[SEGAnalytics setupWithConfiguration:configuration];
```

### Automatic Screen Tracking

Our SDK can automatically instrument screen calls. It uses method swizzling to detect when ViewController's are loaded and uses the label of the view controller (or the class name if a label is not available) as the screen name. It removes the string "ViewController" from the name (if present).

```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.recordScreenViews = YES;
[SEGAnalytics setupWithConfiguration:configuration];
```

### Automatic Push Notification Tracking
Tracking Push notifications will automatically track `Push Notification Received` and `Push Notification Tapped`.

```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackPushNotifications = YES;
[SEGAnalytics setupWithConfiguration:configuration];
```

### Automatic Deep Link Tracking
Tracking deep linking will automatically track `Deep Link Clicked` and `Deep Link Opened`.

```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackDeepLinks = YES;
[SEGAnalytics setupWithConfiguration:configuration];
```

### Flushing

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

## Data Collection

Now that the Segment SDK and any accompanying packaged SDKs are installed, you're ready to collect some data!

### Identify

`identify` lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

We recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits are changed.

**Note:** We automatically assign an `anonymousId` to users before you identify them. The `userId` is what connects anonymous activities across devices (e.g. iPhone and iPad).

Example `identify` call:

```objc
[[SEGAnalytics sharedAnalytics] identify:@"a user's id"
                                traits:@{ @"email": @"a user's email address" }];
```

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
    <td>A dictionary of extra [options](/libraries/ios/#integrations) for the call.</td>
  </tr>
</table>

Analytics for iOS works on its own background thread, so it will never block the main thread for the UI or the calling thread.

Calling `- identify:` with a `userId` will write that ID to disk to be used in subsequent calls. That ID can be removed either by uninstalling the app or by calling [`reset`](#reset).

Find details on the **identify method payload** in our [Spec](/docs/connections/spec/identify/).

### Track

`track` lets you record the actions your users perform.  Every action triggers what we call an "event", which can also have associated properties.

To get started, our SDK can automatically track a few key common events with our [Native Mobile Spec](/docs/connections/spec/mobile/), such as the `Application Installed`, `Application Updated` and `Application Opened`. Simply enable this option during initialization.

You'll also want to track events that are indicators of success for your mobile app, like **Signed Up**, **Item Purchased** or **Article Bookmarked**. We recommend tracking just a few important events. You can always add more later!

Example `track` call:

```objc
[[SEGAnalytics sharedAnalytics] track:@"Item Purchased"
                           properties:@{ @"item": @"Sword of Heracles", @"revenue": @2.95 }];
```

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
    <td>A dictionary of extra [options](/libraries/ios/#selecting-integrations) for the call.</td>
  </tr>
</table>


### Screen

The [`screen`](/docs/connections/spec/screen/) method lets you you record whenever a user sees a screen of your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event an event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Example `screen` call:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Photo Feed"
                            properties:@{ @"Feed Type": @"private" }];
```

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
    <td>A dictionary of extra [options](/libraries/ios/#integrations) for the call.</td>
  </tr>
</table>

Find details on the **`screen` payload** in our [Spec](/docs/connections/spec/screen/).

### Group

`group` lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/java/#identify) user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example `group` call:

```
[[SEGAnalytics sharedAnalytics] group:@"group123"
traits:@{ @"name": @"Initech", @"description": @"Accounting Software" }];
```

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
    <td>An `Options` object lets you set a [timestamp](#historical-import), [enable or disable destinations](#selecting-integrations), or [send additional context](#context).</td>
  </tr>
</table>

Find more details about `group` including the **`group` payload** in our [Spec](/docs/connections/spec/group/).

### Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [KISSmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

```objc
[[SEGAnalytics sharedAnalytics] alias:@"some new id"];
```

The `alias` call has the following fields:

<table class="api-table">
  <tr>
    <td>`newId` _NSString *_</td>
    <td>The newId of the user you want to map to.</td>
  </tr>
  <tr>
    <td>`options` _NSDictionary *, optional_</td>
    <td>A dictionary of extra [options](/libraries/ios/#integrations) for the call.</td>
  </tr>
</table>

For more details about `alias`, including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).

### AnonymousId

You can retrieve the `anonymousId` set by the library by using:

```
[[SEGAnalytics sharedAnalytics] getAnonymousId];
```

### Reset

The `- reset` method clears the SDK's internal stores for the current `user` and `group`. This is useful for apps where users can log in and out with different identities over time.

Clearing all information about the user is as simple as calling:

```objc
[[SEGAnalytics sharedAnalytics] reset];
```

Events queued on disk are not cleared and are uploaded the next time the app starts.

> **Note**: Each time you call `reset`, a new AnonymousId is generated the next time the app is opened, which can impact the number of Monthly Tracked Users (MTUs) you process.

### Disabling Data Collection for Users who opt out

Depending on the audience for your app (e.g. children) or the countries where you sell your app (e.g. the EU), you may need to offer the ability for users to opt-out of analytics data collection inside your app. You can turn off forwarding to ALL destinations including Segment itself:

```objc
[[SEGAnalytics sharedAnalytics] disable];
```

Or if they opt-back-in, you can re-enable data collection:

```objc
[[SEGAnalytics sharedAnalytics] enable];
```

Note: disabling the Segment SDK ensures that all data collection method invocations (eg. `track`, `identify`, etc) are ignored; however, it does not tear down inititialized SDKs. If your packaged SDKs are collecting data automatically or outside of Segment, disabling Segment does not address that. We recommend invoking corresponding disable methods in each of your packaged SDKs in response to user opt-out to ensure any automatic data collection is stopped.

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an object of `destinations` that lets you turn certain destinations on or off. By default all destinations are enabled.

You can enable or disable destinations by specifying an `NSDictionary *` in the options parameter of our methods as follows:


```objc
options:@{
  @"integrations": @{
    @"ENABLED_INTEGRATION_NAME": @YES,
    @"DISABLED_INTEGRATION_NAME: @NO
  }
}
```

Here's an example showing an `- track:` call that is sent to all enabled destinations except Mixpanel:

```objc
[[SEGAnalytics sharedAnalytics] track:@"Product Rated"
                           properties:nil
                              options:@{ @"integrations": @{ @"All": @YES, @"Mixpanel": @NO }}];
```

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**Note:** Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

### Destinations in Debugger

If you are seeing any of your destinations turned off in the raw version of requests in the Segment live debugger, but you haven't added those to your requests, like this:

```javascript
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

```objc
[SEGAnalytics debug:YES];
```

Or disable it like this:

```objc
[SEGAnalytics debug:NO];
```

By default debug logging is disabled.

## Middlewares
Middlewares are a powerful mechanism that can augment the events collected by the SDK. A middleware is a simple function that is invoked by the Segment SDK and can be used to monitor, modify or reject events. Middlewares are available on `analytics-ios ` 3.6.0 and higher.

The middleware API is easily accessible in both Objective-C and Swift.

### Usage

Middleware is any Objective-C class that conforms to the following protocol.

```
@protocol SEGMiddleware
@required
- (void)context:(SEGContext *_Nonnull)context next:(S
EGMiddlewareNext _Nonnull)next;
@end
```

We also provide a block-centric helper class to make it easier to create middlewares using anonymous functions on the fly. (See examples later on in the guide)

```
typedef void (^SEGMiddlewareBlock)(SEGContext *_Nonnull context, SEGMiddlewareNext _Nonnull next);

@interface SEGBlockMiddleware : NSObject <SEGMiddleware>
@property (nonnull, nonatomic, readonly) SEGMiddlewareBlock block;

- (instancetype _Nonnull)initWithBlock:(SEGMiddlewareBlock _Nonnull)block;

@end
```

`context` is an object that encapsulates everything about an event in the stream. `next` is a callback function that should be invoked when the current middleware is done processing the event and can pass the processed event down to the next middleware in the chain.

`SEGContext` object is not very information rich by itself. Typically you will need to use `eventType`  and `payload` to get more information about an event.

```
@interface SEGContext : NSObject <NSCopying>

@property (nonatomic, readonly, nonnull) SEGAnalytics *_analytics;
@property (nonatomic, readonly) SEGEventType eventType;

@property (nonatomic, readonly, nullable) NSString *userId;
@property (nonatomic, readonly, nullable) NSString *anonymousId;
@property (nonatomic, readonly, nullable) NSError *error;
@property (nonatomic, readonly, nullable) SEGPayload *payload;
@property (nonatomic, readonly) BOOL debug;

- (instancetype _Nonnull)initWithAnalytics:(SEGAnalytics *_Nonnull)analytics;

- (SEGContext *_Nonnull)modify:(void (^_Nonnull)(id<SEGMutableContext> _Nonnull ctx))modify;

@end
```

If you look at `SEGEventType` more carefully, you'll realize that middleware is not only capable of handling `track` , `identify` and other normal analytics APIs, even calls like `reset` , `flush` and `openURL` go through and can therefore be processed by the middleware pipeline.

```
typedef NS_ENUM(NSInteger, SEGEventType) {
    // Should not happen, but default state
    SEGEventTypeUndefined,
    // Core Tracking Methods
    SEGEventTypeIdentify,
    SEGEventTypeTrack,
    SEGEventTypeScreen,
    SEGEventTypeGroup,
    SEGEventTypeAlias,

    // General utility
    SEGEventTypeReset,
    SEGEventTypeFlush,

    // Remote Notification
    SEGEventTypeReceivedRemoteNotification,
    SEGEventTypeFailedToRegisterForRemoteNotifications,
    SEGEventTypeRegisteredForRemoteNotifications,
    SEGEventTypeHandleActionWithForRemoteNotification,

    // Application Lifecycle
    SEGEventTypeApplicationLifecycle,

    // Misc.
    SEGEventTypeContinueUserActivity,
    SEGEventTypeOpenURL,
};
```

There are almost as many `SEGPayload` subclasses as there are `SEGEventType` enums. Subclassed payloads may contain call specific information, For example, the `SEGTrackPayload` contains `event` as well as `properties` .

```
@interface SEGTrackPayload : SEGPayload

@property (nonatomic, readonly) NSString *event;

@property (nonatomic, readonly, nullable) NSDictionary *properties;

@end
```

Finally, to use a middleware, you will need to provide it to the `SEGAnalyticsConfiguration` object prior to the initialization of `SEGAnalytics` .

```
@interface SEGAnalyticsConfiguration : NSObject
/**
 * Set custom middlewares. Will be run before all integrations
 */
@property (nonatomic, strong, nullable) NSArray<id<SEGMiddleware>> *middlewares;

// ...
@end
```

Once initialized, the list of middlewares used in `SEGAnalytics` cannot be changed at this time.

### Examples

The following examples will be written in Swift to demonstrate that the middleware API works just as well in Swift as in Objective-C. To start off, this is what initialization looks like

```
let config = SEGAnalyticsConfiguration(writeKey: "YOUR_WRITEKEY_HERE")
config.trackApplicationLifecycleEvents = true
config.trackDeepLinks = true
config.recordScreenViews = true
config.use(SEGMixpanelIntegrationFactory.instance())

config.middlewares = [
    turnScreenIntoTrack,
    enforceEventTaxonomy,
    customizeAllTrackCalls,
    sampleEventsToMixpanel,
    blockScreenCallsToAmplitude,
]
SEGAnalytics.setup(with: config)
```

Changing event names and adding custom attributes

```
let customizeAllTrackCalls = SEGBlockMiddleware { (context, next) in
    if context.eventType == .track {
        next(context.modify { ctx in
            guard let track = ctx.payload as? SEGTrackPayload else {
                return
            }
            let newEvent = "[New] \(track.event)"
            var newProps = track.properties ?? [:]
            newProps["customAttribute"] = "Hello"
            ctx.payload = SEGTrackPayload(
                event: newEvent,
                properties: newProps,
                context: track.context,
                integrations: track.integrations
            )
        })
    } else {
        next(context)
    }
}
```

Turn one kind call into another

```
let turnScreenIntoTrack = SEGBlockMiddleware { (context, next) in
    if context.eventType == .screen {
        next(context.modify { ctx in
            guard let screen = ctx.payload as? SEGScreenPayload else {
                return
            }
            let event = "\(screen.name) Screen Tracked"
            ctx.payload = SEGTrackPayload(
                event: event,
                properties: screen.properties,
                context: screen.context,
                integrations: screen.integrations
            )
            ctx.eventType = .track
        })
    } else {
        next(context)
    }
}
```

Completely block events

```
let   = SEGBlockMiddleware { (context, next) in
    let validEvents = [
        "Application Opened",
        "Order Completed",
        "Home Screen Tracked",
        "AnalyticsIOSTestApp. Screen Tracked",
    ]
    if let track = context.payload as? SEGTrackPayload {
        if !validEvents.contains(track.event) {
            showAlert(title: "Dropping Rogue Event",
                      message: track.event)
            return
        }
    }
    next(context)
}
```

Sample events to Mixpanel

```
let sampleEventsToMixpanel = SEGBlockMiddleware { (context, next) in
    if let track = context.payload as? SEGTrackPayload {
        let numberBetween0To4 = arc4random() % 5
        if numberBetween0To4 != 0 {
            next(context.modify { ctx in
                ctx.payload = SEGTrackPayload(
                    event: track.event,
                    properties: track.properties,
                    context: track.context,
                    integrations: ["Mixpanel": false]
                )
            })
            return
        }
    }
    next(context)
}
```

Block only screen calls to amplitude

```
let blockScreenCallsToAmplitude = SEGBlockMiddleware { (context, next) in
    if let screen = context.payload as? SEGScreenPayload {
        next(context.modify { ctx in
            ctx.payload = SEGScreenPayload(
                name: screen.name,
                properties: screen.properties,
                context: screen.context,
                integrations: ["Amplitude": false]
            )
        })
        return
    }
    next(context)
}
```

## Proxy HTTP Calls

You can point the iOS SDK to your own hosted [proxy](https://github.com/segmentio/segment-proxy) of the Segment API. This will run the HTTP traffic for the Segment API through the proxy.

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

## Submitting to the App Store

When you submit to the app store, be aware that Segment collects the IDFA for use in doing mobile install attribution with destinations like Mobile App Tracking. Even if you're not currently doing mobile install attribution, if you get asked, "Does this app use the Advertising Identifier (IDFA)?" on [this](http://www.brianjcoleman.com/wp-content/uploads/2014/07/IDFA_Page2-1.jpg) page, you'll want to **check** the following three boxes:

1. "Attribute this app installation to a previously served advertisement"
2. "Attribute an action taken within this app to a previously served advertisement"
3. "I, YOUR_NAME, confirm that this app, and any third party..."

Note, you should *not* check the box labeled "Serve advertisements within the app" unless you are actually going to display ads.

> info ""
> The information above has changed with the 4.0-beta series.  In line with Segment’s privacy stance, the IDFA is no longer collected automatically rather customers who need it for integrations and ad analytics are expected to pass it as configuration to the library.

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

## FAQ

### How big is the Segment SDK?

The core Segment SDK is extremely lightweight. It weighs in at about 212kb.

### Can I install the SDK Manually with a Dynamic Framework?

We **highly recommend** using Cocoapods.

However, if you cannot use Cocoapods or Carthage, you can manually install our dynamic framework allowing you to send data to Segment and on to enabled cloud-mode destinations.  We do not support sending data to bundled, device-mode integrations outside of Cocoapods.

Here are the steps for installing manually:

  1. Download the [latest built SDK](https://github.com/segmentio/analytics-ios/releases/), and unzip the zip file.
  2. Drag the unzipped `Analytics.framework` folder into your XCode project.
  3. In the `General Tab` for your project, search for `Embedded Binaries` and add the `Analytics.framework`.


![](images/embeddedbinaries.png)

Once you've installed the framework, just import the header file and install as described above in [Install the SDK](/docs/connections/sources/catalog/libraries/mobile/ios/#install-the-sdk).

Please note, if you are choosing to not use a dependency manager, you must keep files up-to-date with regularly scheduled, manual updates.

### What if your SDK doesn't support feature X?

If you're using a Device-mode for a mobile destination, if you want to access a feature from a tool's native SDK, you can include the header file and call the method just as normal.

For example, you might want access to Flurry's location logging or Localytics's attribution parameters. To use the destination's SDK, just import the headers and then access the SDK as you would without Segment. We'll still handle initialization, event, screen & user tracking, plus all the proxied services and data storage for you.

Here's an example for Flurry location logging:

```objc
#import <Flurry-iOS-SDK/Flurry.h>

CLLocationManager *locationManager = [[CLLocationManager alloc] init];
[locationManager startUpdatingLocation];
CLLocation *location = locationManager.location;
[Flurry setLatitude:location.coordinate.latitude
          longitude:location.coordinate.longitude
 horizontalAccuracy:location.horizontalAccuracy
   verticalAccuracy:location.verticalAccuracy];
```


### How Do I Use Push Notifications?

For services that send push notifications, you first want to [create a Push SSL certificate following these steps](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html). You then want to configure your application delegate to look like the code below, and replace your Segment source write key.

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  SEGAnalyticsConfiguration* configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];

  // Use launchOptions to track tapped notifications
  configuration.launchOptions = launchOptions;
  [SEGAnalytics setupWithConfiguration:configuration];

  if ([[UIApplication sharedApplication] respondsToSelector:@selector(registerForRemoteNotifications)]) {
    UIUserNotificationType types = UIUserNotificationTypeAlert | UIUserNotificationTypeSound |
    UIUserNotificationTypeBadge;
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:types
    categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
  } else {
    UIRemoteNotificationType types = UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeSound |
    UIRemoteNotificationTypeBadge;
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:types];
  }
  return YES;
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [[SEGAnalytics sharedAnalytics] registeredForRemoteNotificationsWithDeviceToken:deviceToken];
}

// A notification has been received while the app is running in the foreground
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  [[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];
}

// iOS 8+ only
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  // register to receive notifications
  [application registerForRemoteNotifications];
}
```

### How Do You Handle Unique Identifiers?

A key component of any analytics platform is consistently and accurately identifying users. Some kind of ID must be assigned and persisted on the device so that user actions can be effectively studied. This is especially important for funnel conversion analysis and retention analysis.

Naturally the Analytics SDK needs a unique ID for each user. To protect end-users' privacy, Apple places restrictions on how these IDs can be generated and used. Here's an explanation of these policies from Apple, and how we generate IDs in compliance.

Before iOS 5 developers had access to uniqueIdentifier which was a hardware-specific serial number that was consistent across different apps, vendors and installs. Starting with iOS 5, however, [Apple deprecated access to this identifier](https://developer.apple.com/news/?id=3212013a). In iOS 6 Apple introduced the identifierForVendor which protects end-users from cross-app identification. In iOS 7 Apple [restricted access to the device's MAC address](http://techcrunch.com/2013/06/14/ios-7-eliminates-mac-address-as-tracking-option-signaling-final-push-towards-apples-own-ad-identifier-technology/), which was being used by many developers as a workaround to get a device-specific serial number similar to like uniqueIdentifier.

Segment's iOS library supports iOS 7+ by generating a UUID and storing it on disk. This is in line with the privacy policies required by Apple, maintains compatibility, and leaves open the option for multiple users on one device since the UUID can be regenerated.


### Should I include each service's SDK alongside Segment?

No, don't include an SDK manually for a service we support. That will cause symbol conflicts/namespace collisions. Sometimes it can even fail silently :( So make sure you remove the old Google Analytics or Mixpanel SDK when you install Segment's SDK.

### How does the SDK queue API calls?

Our SDK queues API calls so that we don't use up your user's battery life by making a network request for each event tracked.

Here's how queuing works for server-side destinations: When you make an API call (e.g. `-track:`) that call is added to the queue. The SDK sends the events to the server in batches (by default, the batch size is `100`). The batches are then sent either when there are 20 or more events in the queue, on a scheduled timer every 30 seconds, or when the app goes to the background. To limit memory and disk usage, we only queue upto 1000 events.

When the app is terminated we persist the queue to disk and load that data at app launch so there is no data loss.
The queue behavior may differ in packaged destinations.

### Can I set user traits without a User ID?

Yes! Just pass a `nil` value for the `userId` into your [`identify`](/docs/connections/spec/identify) call, like this:

```objc
[[SEGAnalytics sharedAnalytics] identify: nil
    traits:@{ @"email": @"example@example.com",
      @"Gender": @"F" }];
```


### Do you support iOS 5?

Our SDK does not support iOS 5. If you need support for iOS 5 it's possible by forking [our iOS repo on GitHub](https://github.com/segmentio/analytics-ios/) and [building the framework](https://github.com/segmentio/analytics-ios/wiki/Building-the-framework).

### Is The Segment SDK Compatible with Swift?

Indeed! Swift's compatibility with Objective-C lets you create a source that contains files written in either language, so to use our SDK from a Swift source just follow the instructions from Apple [here](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html).

### Can I help develop a destination?

Yep! Our SDK is [open-source](https://github.com/segmentio/analytics-ios). If you'd like to contribute, fix a bug, or add a destination - here's [documentation on how to do so](https://github.com/segmentio/analytics-ios/blob/master/CONTRIBUTING.md). to add a destination, make sure you contact our [partners team](https://github.com/segmentio/analytics-ios/blob/master/CONTRIBUTING.md) first.

### How do I know when a destination is initialized?

The iOS library will post a notification to indicate when it initializes any destination so you can call it's methods directly.

```objc
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(integrationDidStart:) name:SEGAnalyticsIntegrationDidStart object:nil];

- (void)integrationDidStart:(nonnull NSNotification *)notification
{
    NSString *integration = notification.object;

    if ([integration.name isEqualToString:@"Mixpanel"]) {
        // Call Mixpanel library methods here.
    }
}
```

### Can I anonymize IP addresses?

We collect IP address for client-side (iOS, Android, Analytics.js and Xamarin) events automatically.

If you don't want us to record your tracked users' IP in destinations and S3, you can set your event's `context.ip` field to `0.0.0.0` . Our server won't record the IP address of the client for libraries if the `context.ip` field is already set. An example would look like this:

```
[[SEGAnalytics sharedAnalytics] track: @"Clicked Button"
  properties:nil
  options:@{ @"context": @{@"ip": @"0.0.0.0"}}];
```

If you'd like to centralize this logic, you can write a middleware for it!

### IDFA

Some destinations, particularly mobile attribution tools (e.g. Kochava), require the IDFA (identifier for advertisers). The IDFA shows up in Segment calls in the debugger under `context.device.advertisingId`. In order for this value to be captured by the Segment SDK, ensure that you include the [AdSupport framework](https://developer.apple.com/documentation/adsupport).

Once you enable this, you will see the `context.device.advertisingId` populate and the `context.device.adTrackingEnabled` flag set to `true`.

_Note_: While the network is deprecated, the relevant [framework](https://developer.apple.com/reference/iad) is not.

### tvOS Support

As of [Version 3.3.0](https://github.com/segmentio/analytics-ios/blob/master/CHANGELOG.md#version-330-08-05-2016) we now have support for tvOS through our `Analytics-iOS` sdk. You can follow the [iOS quickstart documentation](/docs/connections/sources/catalog/libraries/mobile/ios/quickstart/) and you should be good to go! tvOS installation is only supported using Carthage and CocoaPods. The dynamic framework installation method is not supported for tvOS.

### 4.0-beta's no longer include IDFA, how do I use this now?

Recent 4.0 betas move IDFA collection outside of the library.  You can achieve the old behavior by now doing this:

```objc
  @import AdSupport;
  
  ...
  
  SEGAnalyticsConfiguration* configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];

  // Enable advertising collection
  configuration.enableAdvertisingTracking = YES;
  // Set the block to be called when the advertisingID is needed
  configuration.adSupportBlock = ^{
      return [[ASIdentifierManager sharedManager] advertisingIdentifier];
  }
  
  [SEGAnalytics setupWithConfiguration:configuration];

```


## Troubleshooting

### Target has transitive dependencies that include static binaries

This was due to an old [CocoaPods limitation](https://github.com/CocoaPods/CocoaPods/issues/2926).

1. Verify you are not using any previously needed workarounds
2. Verify you are using at least CocoaPods 1.4
   ```bash
   $ pod --version
   1.5.3
   ```
3. Verify you are using the latest Segment pods
   ```bash
   $ pod outdated
   The following pod updates are available:
    - Segment-GoogleAnalytics 1.1.7 -> 1.1.7 (latest version 1.1.8)
   ```

### No events in my debugger
1. Verify you have followed all [Getting Started](/docs/connections/sources/catalog/libraries/mobile/ios/#getting-started) steps
2. Verify you have entered the correct writeKey for your source
    - If the writeKey you have entered is something other than a string or an empty string your app may crash
    - If the writeKey you have entered is a valid form but not the correct writeKey for your specific source, you will not see an error response. Data will be accepted by Segment but not able to be correctly routed to your source (debugger).
3. [Enable logging](/docs/connections/sources/catalog/libraries/mobile/ios/#logging) to confirm if call is being sent to Segment


### No events in my destinations

1. Verify that your destination is enabled
2. Verify your destination credentials entered in your Segment dashboard are correct
3. Make sure the destination can accept what you're sending:
   - Does the integration have device-mode/cloud-mode support? Confirm you are sending using the correct connection mode.
   - Does the destination accept the type of call you are sending? Not all destinations accept all calls: page, track, etc.
4. If you are still not seeing data in your destination, continue debugging based on which type of connection mode you are using.


### Debugging Device-mode Destinations

If you are using device-mode, you should see the value of that integration set to false in the `integrations` object. That means that the data is being sent from the device to the destination SDK, and not through Segment's servers. This is expected if you chose to use a device-mode destination's SDK with Segment's during installation.

Enable verbose [logging](/docs/connections/sources/catalog/libraries/mobile/ios/#logging) and trigger the call in question. You should see a call to Segment triggered as well as to the partner SDK.  It will show you exactly which partner method was invoked and the arguments it was invoked with!

### Debugging Cloud-mode Destinations

Look at the raw JSON in your debugger.  Does the call look like what is expected?

Read through [the docs for that destination](/docs/connections/destinations/) to see expected event format, behavior and caveats for that destination.

### Migrating to v3 from earlier releases

v3 was an API compatible release, but there are a few additional steps for packaging destinations using Device-mode and migrating from the older data format.

Firstly, we changed how the anonymousId was stored between v2 and v3. You'll need to read the old anonymousId and set it so that it's moved to the new location.


```objc
NSString *oldAnonymousId = loadOldAnonymousId();
if (oldAnonymousId) {
  [[SEGAnalytics sharedAnalytics] identify:userId
                           traits:traits
                              options:@{ @"anonymousId": oldAnonymousId }];
  deleteOldAnonymousId();
}
```

In version 3, we've organized the destinations to be make the core SDK even leaner and smaller. The `Analytics/Segmentio` pod is not available any longer. It has been renamed to `Analytics` (which previously packaged all possible destinations). Version 3 of `Analytics` only includes the core library which forwards data directly to . To add a destination using Device-mode, you must manually add that destination's dependencies, like so:

```ruby
pod 'Segment-Bugsnag'
pod 'Segment-Branch'
pod 'Segment-GoogleAnalytics'
...
```

...and then register them in your configuration when you initialize the SDK.

*Note:* If you are unsure about the name of the pod for a given SDK, you can always confirm on by searching for the destination in [our app](https://cloudup.com/cOQk2yX98mW)!

```objc
#import <Segment-GoogleAnalytics/SEGGoogleAnalyticsIntegrationFactory.h>
#import <Segment-Branch/BNCBranchIntegrationFactory.h>

SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];

// Add any of your Device-mode destination components.
[config use:[SEGGoogleAnalyticsIntegrationFactory instance]];
[config use:[BNCBranchIntegrationFactory instance]];
...

[SEGAnalytics setupWithConfiguration:config];
```


### Still having issues?

Please [contact our Product Support team](https://segment.com/help/contact/) with the following information:

- The version of our SDK you are using
- Whether you are using device- or cloud-mode
- Logs of the call in question
- Screenshots of the event in the Segment debugger
- Screenshots of what you are seeing in your destination
