---
title: Analytics-iOS Frequently asked questions
strat: ios
---

## How big is the Segment SDK?

The core Segment SDK is extremely lightweight. It weighs in at about 212kb.

## Can I install the SDK Manually with a Dynamic Framework?

Segment **highly recommends** using Cocoapods. We cannot guarantee support if you do not use a dependency manager.

However, if you cannot use Cocoapods or Carthage, you can manually install our dynamic framework allowing you to send data to Segment and on to enabled cloud-mode destinations.  We do not support sending data to bundled, device-mode integrations outside of Cocoapods.

Here are the steps for installing manually:

1. Download the [latest built SDK](https://github.com/segmentio/analytics-ios/releases/), and unzip the zip file.
2. Drag the unzipped `Analytics.framework` folder into your XCode project.
3. In the `General Tab` for your project, search for `Embedded Binaries` and add the `Analytics.framework`.


![](images/embeddedbinaries.png)

Once you've installed the framework, just import the header file and install as described above in [Install the SDK](/docs/connections/sources/catalog/libraries/mobile/ios/#install-the-sdk).

If you choose not to use a dependency manager, you must manually keep files up-to-date with regularly scheduled, manual updates.

## What if your SDK doesn't support feature X?

If you're using a Device-mode for a mobile destination, if you want to access a feature from a tool's native SDK, you can include the header file and call the method just as normal.

For example, you might want access to Flurry's location logging or Localytics's attribution parameters. To use the destination's SDK, just import the headers and then access the SDK as you would without Segment. Segment still handles initialization, event, screen and user tracking, plus all the proxied services and data storage for you.

Here's an example for Flurry location logging:

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
#import <Flurry-iOS-SDK/Flurry.h>

CLLocationManager *locationManager = [[CLLocationManager alloc] init];
[locationManager startUpdatingLocation];
CLLocation *location = locationManager.location;
[Flurry setLatitude:location.coordinate.latitude
          longitude:location.coordinate.longitude
 horizontalAccuracy:location.horizontalAccuracy
   verticalAccuracy:location.verticalAccuracy];
```


## How Do I Use Push Notifications?

For services that send push notifications, you first want to [create a Push SSL certificate following these steps](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html). You then want to configure your application delegate to look like the code below, and replace your Segment source write key.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
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
{% endcodeexampletab %}

{% endcodeexample %}



## How does Segment handle unique identifiers?

A key component of any analytics platform is consistently and accurately identifying users. Some kind of ID must be assigned and persisted on the device so that user actions can be effectively studied. This is especially important for funnel conversion analysis and retention analysis.

Naturally the Analytics SDK needs a unique ID for each user. To protect end-users' privacy, Apple places restrictions on how these IDs can be generated and used. Here's an explanation of these policies from Apple, and how Segment generates IDs in compliance.

Before iOS 5 developers had access to uniqueIdentifier which was a hardware-specific serial number that was consistent across different apps, vendors and installs. Starting with iOS 5, however, [Apple deprecated access to this identifier](https://developer.apple.com/news/?id=3212013a). In iOS 6 Apple introduced the identifierForVendor which protects end-users from cross-app identification. In iOS 7 Apple [restricted access to the device's MAC address](http://techcrunch.com/2013/06/14/ios-7-eliminates-mac-address-as-tracking-option-signaling-final-push-towards-apples-own-ad-identifier-technology/), which was being used by many developers as a workaround to get a device-specific serial number similar to like uniqueIdentifier.

Segment's iOS library supports iOS 7+ by generating a UUID and storing it on disk. This is in line with the privacy policies required by Apple, maintains compatibility, and leaves open the option for multiple users on one device since the UUID can be regenerated.


## Should I include each service's SDK alongside Segment?

No. Don't include destination native-SDKs manually for a service Segment supports. In fact, you should remove old SDKs when you install the Segment SDK. Keeping the duplicate native SDK can cause symbol conflicts and namespace collisions, and sometimes even fail silently.

## How does the SDK queue API calls?

The Segment SDK queues API calls rather than making a network request for each event tracked, to help improve the user's battery life.

For server-side destinations, when you make an API call (Track, Page, etc.) the Segment SDK adds that call to the queue, and sends the events to the Segment servers in batches (by default, the batch size is `100`).

Batches are sent either:
- when there are 20 or more events in the queue
- on a scheduled timer every 30 seconds
- when the app goes to the background

To limit memory and disk usage, Segment only queues up to 1000 events.

When the app is terminated, Segment saves the queue to disk and loads that data again at app launch so there is no data loss.

The queue behavior might differ for packaged destinations.

## Can I set user traits without a User ID?

Yes! You can pass a `nil` value for the `userId` in an [Identify call](/docs/connections/spec/identify), like in the following example:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] identify: nil
    traits:@{ @"email": @"example@example.com",
      @"Gender": @"F" }];
```
{% endcodeexampletab %}

{% endcodeexample %}


## Do you support iOS 5?

The Segment Analytics-iOS SDK does not support iOS 5. If you need support for iOS 5 you can forking [the Segment iOS repo on GitHub](https://github.com/segmentio/analytics-ios/) and [build the framework](https://github.com/segmentio/analytics-ios/wiki/Building-the-framework).

## Is The Segment SDK Compatible with Swift?

Yes! Swift's compatibility with Objective-C lets you create a source that contains files written in either language. To use the Segment Analytics-iOS SDK from a Swift source, just [follow these instructions from Apple](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html).

## Can I help develop a destination?

Yes! The Segment [Analytics-iOS SDK is open-source](https://github.com/segmentio/analytics-ios). If you'd like to contribute, fix a bug, or add a destination - here's [see the Contrbuting guide for instructions](https://github.com/segmentio/analytics-ios/blob/master/CONTRIBUTING.md).

If you want to add a destination, contact the [Segment Partners Team](https://github.com/segmentio/analytics-ios/blob/master/CONTRIBUTING.md) first.

## How do I know when a destination is initialized?

The iOS library posts a notification to indicate when it initializes any destination so you can call its methods directly.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
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
{% endcodeexampletab %}

{% endcodeexample %}



## Can I anonymize IP addresses?

Segment collects IP addresses for client-side (iOS, Android, Analytics.js and Xamarin) events automatically.

If you don't want to record your tracked users' IP in destinations and S3, you can set your event's `context.ip` field to `0.0.0.0` . The Segment servers won't record the IP address of the client for libraries if the `context.ip` field is already set. An example would look like this:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
[[SEGAnalytics sharedAnalytics] track: @"Clicked Button"
  properties:nil
  options:@{ @"context": @{@"ip": @"0.0.0.0"}}];
```

{% endcodeexampletab %}

{% endcodeexample %}


If you'd like to centralize this logic, you can write a [middleware](middleware/) for it!

## IDFA

Some destinations, particularly mobile attribution tools (e.g. Kochava), require the IDFA (identifier for advertisers). The IDFA shows up in Segment calls in the debugger under `context.device.advertisingId`. In order for this value to be captured by the Segment SDK, ensure that you include the [AdSupport framework](https://developer.apple.com/documentation/adsupport).

Once you enable this, you will see the `context.device.advertisingId` populate and the `context.device.adTrackingEnabled` flag set to `true`.

_Note_: While the network is deprecated, the relevant [framework](https://developer.apple.com/reference/iad) is not.

## tvOS Support

As of [Version 3.3.0](https://github.com/segmentio/analytics-ios/blob/master/CHANGELOG.md#version-330-08-05-2016) we now have support for tvOS through our `Analytics-iOS` sdk. You can follow the [iOS quickstart documentation](/docs/connections/sources/catalog/libraries/mobile/ios/quickstart/) and you should be good to go! tvOS installation is only supported using Carthage and CocoaPods. The dynamic framework installation method is not supported for tvOS.

## IDFA collection in 4.0-beta and later

Recent 4.0 betas move IDFA collection outside of the library.  You can achieve the old behavior by now doing this:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
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
configuration.adSupportBlock = ^{
    return [[ASIdentifierManager sharedManager] advertisingIdentifier];
}

[SEGAnalytics setupWithConfiguration:configuration];

```
{% endcodeexampletab %}

{% endcodeexample %}
