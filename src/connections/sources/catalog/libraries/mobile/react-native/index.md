---
title: Analytics for React Native
sourceTitle: 'React Native'
sourceCategory: 'Mobile'
---

Analytics for React Native makes it simple to send your data to any analytics or marketing tool without having to learn, test or implement a new API every time.

All of Segment's libraries are open-source, so you can [view Analytics for React Native on GitHub](https://github.com/segmentio/analytics-react-native), or check out our [browser and server-side libraries](/docs/connections/sources/catalog/) too.

Subscribe to the [release feed](https://github.com/segmentio/analytics-react-native/tags.atom).

## Getting Started

### Prerequisite

#### React-Native

- 0.62 or greater is required.

#### iOS

- CocoaPods (**recommended**)
  - To add CocoaPods to your app, follow [these instructions](https://facebook.github.io/react-native/docs/integration-with-existing-apps#configuring-cocoapods-dependencies).

### Install the SDK

The recommended way to install Analytics for React Native is using npm, since it means you can create a build with specific destinations, and because it makes it simple to install and upgrade.

First, add the `@segment/analytics-react-native` dependency to your `dependencies` and link it using `react-native-cli`, like so:

```bash
$ yarn add @segment/analytics-react-native
$ yarn react-native link
```

Then somewhere your application, set up the SDK like so:

```js
await analytics.setup('YOUR_WRITE_KEY', {
  // Record screen views automatically!
  recordScreenViews: true,
  // Record certain application events automatically!
  trackAppLifecycleEvents: true
})
```

And of course, import the SDK in the files that you use it with:

```js
import analytics from '@segment/analytics-react-native'
```

### Dynamic Framework for Manual Installation

We **highly recommend** using Cocoapods.

However, if you cannot use Cocoapods, you can manually install our dynamic framework allowing you to send data to Segment and on to enabled cloud-mode destinations. We do not support sending data to bundled, device-mode integrations outside of Cocoapods.

Here are the steps for installing manually:

1. Add `analytics-ios` as a npm dependency: `yarn add @segment/analytics-ios@github:segmentio/analytics-ios`
2. In the `General` tab for your project, search for `Embedded Binaries` and add the `Analytics.framework`
   ![Embed Analytics.framework](images/embed-analytics-framework.png)

Note, if you are choosing to not use a dependency manager, you must keep files up-to-date with regularly scheduled, manual updates.

### Including SDKs for destinations using Device-mode

In the interest of keeping our SDK lightweight, Analytics only installs the Segment destination. This means that all your data is sent using Segment's servers to any tools you've enabled using the default Cloud-mode.

[As described here](/docs/connections/destinations/#connection-modes), some integrations require or offer Device-mode connections. In those cases, you'll need to take some additional steps as [shown in the source documentation here](#packaging-destinations-using-device-mode).

Now that the SDK is installed and setup, you're ready to...

## Identify

`identify` lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

We recommend that you call `identify` when the user first creates their account, and when a user's traits change.  If users can log out of your app, you should call `identify` when a user logs back in.

**Note:** We automatically assign an `anonymousId` to users before you identify them. The `userId` is what connects anonymous activities across devices.

Example `identify` call:

```js
analytics.identify("a user's id", {
  email: "a user's email address"
})
```

This call identifies a user by his unique User ID (the one you know him by in your database) and labels him with `name` and `email` traits.

The `identify` call has the following arguments:

<table class="api-table">
  <tr>
    <td>`userId` _string_</td>
    <td>The database ID for this user. If you don't know who the user is yet, you can omit the `userId` and just record `traits`. You can read more in the [identify reference](/docs/connections/spec/identify).</td>
  </tr>
  <tr>
    <td>`traits` _JSONMap, optional_</td>
    <td>A dictionary of traits you know about the user, like their `email` or `name`. You can read more about traits in the [identify reference](/docs/connections/spec/identify).</td>
  </tr>
</table>

Analytics works on its own background thread, so it will never block the main thread for the UI or the calling thread.

Calling `identify` with a `userId` will write that ID to disk to be used in subsequent calls. That ID can be removed either by uninstalling the app or by calling [`reset`](#reset).

Find details on the **identify method payload** in our [Spec](/docs/connections/spec/identify/).

## Track

`track` lets you record the actions your users perform.  Every action triggers what we call an "event", which can also have associated properties.

To get started, our SDK can automatically track a few key common events with our [Native Mobile Spec](/docs/connections/spec/mobile/), such as the `Application Installed`, `Application Updated` and `Application Opened`. These events are required for attribution tracking in several commonly used Segment destinations. Simply enable this option during initialization.

You'll also want to track events that are indicators of success for your mobile app, like **Signed Up**, **Item Purchased** or **Article Bookmarked**. We recommend tracking just a few important events. You can always add more later!

Example `track` call:

```js
analytics.track('Item Purchased', {
  item: 'Sword of Heracles',
  revenue: 2.95
})
```

This example `track` call tells us that your user just triggered the **Item Purchased** event recording the `item` name of "Sword of Heracles" and `revenue` of 2.95.

`track` event properties can be anything you want to record. In this case, item and revenue.

The `track` call has the following fields:

<table class="api-table">
  <tr>
    <td>`event` _string_</td>
    <td>The name of the event. We recommend human-readable names like **Song Played** or **Status Updated**.</td>
  </tr>
  <tr>
    <td>`properties` _JSONMap, optional_</td>
    <td>A dictionary of properties for the event. If the event was `Product Added` to cart, it might have properties like `price` and `productType`.</td>
  </tr>
</table>


## Screen

The [`screen`](/docs/connections/spec/screen/) method lets you you record whenever a user sees a screen of your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event an event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Example `screen` call:

```js
analytics.screen('Photo Feed', {
  'Feed Type': 'private'
})
```

The `screen` call has the following fields:

<table class="api-table">
  <tr>
    <td>`name` _string_</td>
    <td>The name of the screen, for example **Signup** or **Home**.</td>
  </tr>
  <tr>
    <td>`properties` _JSONMap, optional_</td>
    <td>A dictionary of properties for the screen. A screen **Photo Feed** might have properties like `Feed Type` or `Sort Order`.</td>
  </tr>
</table>

Find details on the **`screen` payload** in our [Spec](/docs/connections/spec/screen/).

## Group

`group` lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/java/#identify) user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example `group` call:

```js
analytics.group('group123', {
  name: 'Initech',
  description: 'Accounting Software'
})
```

The `group` call has the following fields:

<table class="api-table">
  <tr>
    <td>`groupId` _string_</td>
    <td>The ID for this group in your database.</td>
  </tr>
  <tr>
    <td>`traits` _JSONMap, optional_</td>
    <td>A dictionary of traits you know about the group. Things like: `name` or `website`.</td>
  </tr>
</table>

Find more details about `group` including the **`group` payload** in our [Spec](/docs/connections/spec/group/).

## Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

```js
analytics.alias('some new id')
```

The `alias` call has the following fields:

<table class="api-table">
  <tr>
    <td>`newId` _string_</td>
    <td>The newId of the user you want to map to.</td>
  </tr>
</table>

For more details about `alias`, including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/)

## Reset

The `reset` method clears the SDK's internal stores for the current `user` and `group`. This is useful for apps where users can log in and out with different identities over time.

Clearing all information about the user is as simple as calling:

```js
analytics.reset()
```

---

## Submitting to the App Store

When you submit to the app store, be aware that Segment collects the IDFA for use in doing mobile install attribution with destinations like Mobile App Tracking. Even if you're not currently doing mobile install attribution, if you get asked, "Does this app use the Advertising Identifier (IDFA)?" on [this](http://www.brianjcoleman.com/wp-content/uploads/2014/07/IDFA_Page2-1.jpg) page, you'll want to **check** the following three boxes:

1. "Attribute this app installation to a previously served advertisement"
2. "Attribute an action taken within this app to a previously served advertisement"
3. "I, YOUR_NAME, confirm that this app, and any third party..."

Note, you should *not* check the box labeled "Serve advertisements within the app" unless you are actually going to display ads.

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

These flags tell the Segment servers that a request was already made directly from the device through a packaged SDK. That way we don't send a duplicate request using our servers to those services.


## Configuration

The `Configuration` interface provides a set of properties that control various policies of the `Analytics` instance. You can configure using the `setup` method like so:

```js
analytics.setup('YOUR_WRITE_KEY', {
  // ...
})
```

<table class="api-table">
    <tr>
        <td>`writeKey` _string_</td>
        <td>Your Segment source's **Write Key**.</td>
    </tr>
</table>

### Native configuration

You can also use the native Analytics API to configure the Analytics instance by calling `analytics.useNativeConfiguration()` in your JavaScript code. This prevents the Analytics instance from waiting for additional configuration.
You should wrap the call under a conditional, as in the following example:

```js
import analytics from '@segment/analytics-react-native';

if (!analytics.ready) { // checks if analytics is already ready; if not we can safely call `useNativeConfiguration`
    analytics.useNativeConfiguration();
}
```

### Flushing

You can set the number of events should queue before flushing. Setting this to `1` will send events as they come in (i.e. not send batched events) and will use more battery. `20` by default.

```js
await analytics.setup('YOUR_WRITE_KEY', {
  flushAt: 1
})
```

You can also manually `flush` the queue:

```js
analytics.alias('glenncoco')
analytics.flush()
```

### Application Lifecycle Tracking

Our SDK can automatically instrument common application lifecycle events such as "Application Installed", "Application Updated" and "Application Opened". Simply enable this option when you initialize the SDK.

```js
await analytics.setup('YOUR_WRITE_KEY', {
  trackAppLifecycleEvents: true
})
```

## Logging

To see a trace of your data going through the SDK, you can enable debug logging with the `debug` method:

```js
await analytics.setup('YOUR_WRITE_KEY', {
  debug: true
})
```

By default debug logging is disabled.

## Opt-out

Depending on the audience for your app (e.g. children) or the countries where you sell your app (e.g. the EU), you may need to offer the ability for users to opt-out of analytics data collection inside your app. You can turn off forwarding to ALL destinations including Segment itself:

```js
analytics.disable()
```

Or if they opt-back-in, you can re-enable data collection:

```js
analytics.enable()
```

Note: disabling the Segment SDK ensures that all data collection method invocations (eg. `track`, `identify`, etc) are ignored; however, it does not tear down inititialized SDKs. If your packaged SDKs are collecting data automatically or outside of Segment, disabling Segment does not address that. We recommend invoking corresponding disable methods in each of your packaged SDKs in response to user opt-out to ensure any automatic data collection is stopped.

## Packaging Destinations using Device-mode

By default, our `@segment/analytics-react-native` npm packages no external SDKs.

To add destinations using Device-mode, first add the dependencies you need. You can find these in our app when you open the destination sheet for any mobile destination with a Device-mode option.



```bash
yarn add @segment/analytics-react-native-{bugsnag,branch,google-analytics}
```

After adding the dependency, you must register the destination with our SDK.

```js
import analytics from '@segment/analytics-react-native'
import Bugsnag from '@segment/analytics-react-native-bugsnag'
import Branch from '@segment/analytics-react-native-branch'
import Firebase from '@segment/analytics-react-native-firebase'

await analytics.setup('YOUR_WRITE_KEY', {
  // Add any of your Device-mode destinations.
  using: [Bugsnag, Branch, Firebase]
  // ...
})
```

We recommend using Device-mode destinations sparingly to reduce the size of your application.

## Anonymizing IP

We collect IP address for client-side (iOS, Android, Analytics.js and Xamarin) events automatically.

If you don't want us to record your tracked users' IP in destinations and S3, you can set your event's `context.ip` field to `0.0.0.0` . Our server won't record the IP address of the client for libraries if the `context.ip` field is already set.

## FAQ

### How big is the Segment SDK?

The core Segment SDK is extremely lightweight! On iOS it weighs in at about 212kb. On Android it contains just under 1k methods, the JAR weighs in at 123kb and the dex size is 113kb.

### Can I also use the native Analytics API?

Yes! You can use the native Analytics API, just note that:
- We only support singleton instances, use `SEGAnalytics.sharedAnalytics` on iOS or `Analytics.with(context)` on Android.
- You cannot call the native singleton before it has been configured. If you need the native Analytics before you call `analytics.setup('your write key')` on your JavaScript code you will need to configure it natively instead.
- If you configure Analytics using its native API you will need to use `analytics.useNativeConfiguration()` on your JavaScript code.

### How Do I Use Push Notifications?

As of today, React Native doesn't provide an official JavaScript API to handle push notifications. For this reason, Analytics for React Native doesn't provide an API to do so, you can workaround this by using the underlying native SDK.

#### On iOS

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

#### On Android

If you're using Device-mode for a mobile destination, you can always access features from that tool's native SDK.

To make sure you use the same instance of these destinations as we do, you can register a listener that notifies you when the destinations are ready. This will be called synchronously if the destinations are notified, and asynchronously if the destinations aren't yet ready.

```java
analytics = Analytics.with(myActivity) // typically `this` will suffice here.

...

analytics.onIntegrationReady("Crittercism", new Callback() {
  @Override public void onReady(Object instance) {
    // Crittercism uses static methods only, so the instance returned is null.
    Crittercism.leaveBreadcrumb();
  }
});
analytics.onIntegrationReady("Mixpanel", new Callback() {
  @Override public void onReady(Object instance) {
    MixpanelAPI mixpanelAPI = (MixpanelAPI) instance;
    mixpanelAPI.clearSuperProperties();
  }
});
```

For the destinations that return `Void`, they simply use a shared instance. You can call into the SDK directly. With this API, you're guaranteed that they've been initialized first, and if you ever decide to change the settings for the destination on our dashboard, they'll be reflected here.

```java
analytics.onIntegrationReady(BundledIntegration.FLURRY, new Callback() {
  @Override public void onReady(Object instance) {
    // Flurry uses static methods only, so the instance returned is null.
    Flurry.setLogEnabled(true);
  }
});
```

### How Do You Handle Unique Identifiers?

A key component of any analytics platform is consistently and accurately identifying users. Some kind of ID must be assigned and persisted on the device so that user actions can be effectively studied. This is especially important for funnel conversion analysis and retention analysis. Naturally the Analytics SDK needs a unique ID for each user.

#### iOS

To protect end-users' privacy, Apple places restrictions on how these IDs can be generated and used. Here's an explanation of these policies from Apple, and how we generate IDs in compliance.

Before iOS 5 developers had access to uniqueIdentifier which was a hardware-specific serial number that was consistent across different apps, vendors and installs. Starting with iOS 5, however, [Apple deprecated access to this identifier](https://developer.apple.com/news/?id=3212013a). In iOS 6 Apple introduced the identifierForVendor which protects end-users from cross-app identification. In iOS 7 Apple [restricted access to the device's MAC address](http://techcrunch.com/2013/06/14/ios-7-eliminates-mac-address-as-tracking-option-signaling-final-push-towards-apples-own-ad-identifier-technology/), which was being used by many developers as a workaround to get a device-specific serial number similar to like uniqueIdentifier.

Segment's iOS library supports iOS 7+ by generating a UUID and storing it on disk. This is in line with the privacy policies required by Apple, maintains compatibility, and leaves open the option for multiple users on one device since the UUID can be regenerated.

#### Android

Our SDK also collects the [Advertising ID](https://developer.android.com/google/play-services/id.html) provided by Play Services. Make sure the Play Services Ads library is included as a dependency for your application. This is the ID that should be used for advertising purposes. This value will be set to `context.device.advertisingId`.

We also collect the [Android ID](http://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID) as `context.device.id`. Some destinations rely on this field being the Android ID, so take care if you choose to override the default value.

### How does the SDK queue API calls?

Our library queues API calls and uploads them in batches so that we don't drain your user's battery life by making a network request for each event tracked.

As soon as you send as an event, we'll save it to disk, and if queue size reaches your specified maximum queue size (which is 20 by default), we flush the queue and upload all the events in a single batch. Since the data is persisted right away, there is no data loss even if the app is killed, or the operating system crashes.

The queue behavior may differ for Device-mode destinations. For instance, Mixpanel's SDK queues events and then flushes them when the app goes to the background only.

This is why even if you see events in the debugger, the Device-mode destination may not show them on their dashboards yet, simply because their mobile SDK may still have them queued. The opposite may also happen, that we have some events queued so they haven't shown up in the debugger, but the Device-mode destination has already sent the events to their servers.

### Can I help develop a destination?

Yep! Our SDK is [open-source](https://github.com/segmentio/analytics-react-native). If you'd like to contribute, fix a bug, or add a destination - here's [documentation on how to do so](https://github.com/segmentio/analytics-react-native/blob/master/CONTRIBUTING.md). to add a destination, make sure you contact our [partners team](https://github.com/segmentio/analytics-react-native/blob/master/CONTRIBUTING.md) first.

### IDFA

Some destinations, especially mobile attribution tools (such as Kochava), require the IDFA (identifier for advertisers). The IDFA appears in Segment calls in the debugger as `context.device.advertisingId`. In the [React Native library version 1.3.0](https://github.com/segmentio/analytics-react-native/blob/master/CHANGELOG.md) and later Segment no longer automatically collects the IDFA. IDFA collection must be done outside of Segment, and can be set using the following method:

```java
import analytics from '@segment/analytics-react-native';
analytics.setIDFA("123");
```

To get the IDFA you can use an external package such as [react-native-idfa](https://www.npmjs.com/package/react-native-idfa).

### Using a custom anonymousID

You might want to use a custom `anonymousID` to better integrate with other systems in your deployment. The best way to do this is to override the default using the `options` parameter when you call `analytics.identify`, as in the example below.

```js
analytics.identify('brandon', null, { anonymousId: '0123456789' })
```

### Adding data to the context

In some cases, you might want to add information to [the `context` object](/docs/connections/spec/common/#context) in the Segment message payload. This can be useful for adding context or session data for an event that doesn't have another logical place to add it, such as in an Identify, Screen or Group.

```js
analytics.identify('brandon', null, { context: { myValue: false, loginFailures: 3 }})
```

The data passed in the `context` dictionary (as in the example above) are merged with data already present in the context object for this event.

### Block specific events from going to a given destination

There are some situations where you might not want to send an event to a specific cloud-mode destination.  You can block events from destinations on a per-event basis by setting customizing the `integrations` object as shown in the example below. Learn more about [filtering data with the integrations object here](/docs/guides/filtering-data/#filtering-with-the-integrations-object).

```js
analytics.track('MyEvent', null, { integrations: { Mixpanel: false }})
```

By default, events are delivered to any cloud-mode destinations currently enabled on Segment.com. You can override this delivery by adding a list, as in the example above. In this example, the event does not reach the  Mixpanel destination.  Remember that destination flags are **case sensitive** and must match the actual destination name. (Many destination documentation pages include a list of acceptable names when the correct name is not clear.)

## Troubleshooting

### No events in my debugger
1. Verify you have followed all [Getting Started](/docs/connections/sources/catalog/libraries/mobile/react-native/#getting-started) steps
2. Verify you have entered the correct writeKey for your source
    - If the writeKey you have entered is something other than a string or an empty string your app may crash
    - If the writeKey you have entered is a valid form but not the correct writeKey for your specific source, you will not see an error response. Data will be accepted by Segment but not able to be correctly routed to your source (debugger).
3. [Enable logging](/docs/connections/sources/catalog/libraries/mobile/react-native/#logging) to confirm if call is being sent to Segment


### No events in my destinations
1. Verify that your destination is enabled
2. Verify your destination credentials entered in your Segment dashboard are correct
3. Make sure the destination can accept what you're sending:
   - Does the integration have device-mode/cloud-mode support? Confirm you are sending using the correct connection mode.
   - Does the destination accept the type of call you are sending? Not all destinations accept all calls: page, track, etc.
4. If you are still not seeing data in your destination, continue debugging based on which type of connection mode you are using.


### Debugging Device-mode Destinations

If you are using device-mode, you should see the value of that integration set to false in the `integrations` object. That means that the data is being sent from the device to the destination SDK, and not through Segment's servers. This is expected if you chose to use a device-mode destination's SDK with Segment's during installation.

Enable verbose [logging](/docs/connections/sources/catalog/libraries/mobile/react-native/#logging) and trigger the call in question. You should see a call to Segment triggered as well as to the partner SDK.  It will show you exactly which partner method was invoked and the arguments it was invoked with!

### Debugging Cloud-mode Destinations

Look at the raw JSON in your debugger.  Does the call look like what is expected?

Read through [the docs for that destination](/docs/connections/destinations/) to see expected event format, behavior and caveats for that destination.


### Still having issues?

[contact our Product Support team](https://segment.com/help/contact/) with the following information:

- The version of our SDK you are using
- Whether you are using device- or cloud-mode
- Logs of the call in question
- Screenshots of the event in the Segment debugger
- Screenshots of what you are seeing in your destination
