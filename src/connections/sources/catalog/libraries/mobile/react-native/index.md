---
title: Analytics for React Native
---

Analytics for React Native makes it easy to send your data to any analytics or marketing tool without having to learn, test or implement a new API every time.

All of Segment's libraries are open-source, and you can [view Analytics for React Native on GitHub](https://github.com/segmentio/analytics-react-native), or see a list of the other [Segment browser and server libraries](/docs/connections/sources/catalog/) too.

Subscribe to the [release feed](https://github.com/segmentio/analytics-react-native/tags.atom).


### Analytics-React and Unique Identifiers

One of the most important parts of any analytics platform is the ability to consistently and accurately identify users. To do this, the platform must assign and persist some form of identification on the device, so you can analyze user actions effectively. This is especially important for funnel conversion analysis and retention analysis.

#### iOS

Apple restricts how you can generate and use unique IDs to help protect end-users' privacy. Segment generates IDs while remaining in compliance with Apple's policies.

Before iOS 5 developers had access to `uniqueIdentifier`, which was a hardware-specific serial number that was consistent across different apps, vendors and installs. Starting with iOS 5, however, [Apple deprecated access to this identifier](https://developer.apple.com/news/?id=3212013a). In iOS 6 Apple introduced the `identifierForVendor` which protects end-users from cross-app identification. In iOS 7 Apple [restricted access to the device’s MAC address](http://techcrunch.com/2013/06/14/ios-7-eliminates-mac-address-as-tracking-option-signaling-final-push-towards-apples-own-ad-identifier-technology/), which many developers used as a workaround to get a similar device-specific serial number to replace  `uniqueIdentifier`.

Segment’s iOS library supports iOS 7+ by generating a UUID and storing it on disk. This complies with Apple’s required privacy policies, maintains compatibility, and also enables correct tracking in situations where multiple people use the same device, since the UUID can be regenerated.

#### Android

The Segment SDK<!-- TODO which? Android or RN?--> also collects the [Advertising ID](https://developer.android.com/google/play-services/id.html) provided by Play Services. Make sure you include the Play Services Ads library as a dependency for your application. <!-- TODO what?-->This is the ID that should be used for advertising purposes. This value is set to `context.device.advertisingId`.

Segment also collects the [Android ID](http://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID) as `context.device.id`. Some destinations rely on this field being the Android ID. Check the documentation for the destinations you use and consider if you really want to override the default value.

### How does the SDK queue API calls?

The Analytics-React library queues API calls and uploads them in batches. This limits the number of network calls made, and helps save battery on the user's device.

When you send an event, the library saves it to disk. When the queue size reaches the maximum size you specify (20 by default), the library flushes the queue and uploads the events in a single batch. Since the data is saved immediately, it isn't lost even if the app is killed or the operating system crashes.

The queue behavior might differ for Device-mode destinations. For example, Mixpanel's SDK queues events and then flushes them only when the app goes to the background.

This is why even if you see events in the debugger, the Device-mode destination may not show them on their dashboards yet because they might still be in their mobile SDK's queue. The opposite may also happen: the Device-mode destination SDK might send events to its servers before Segment sends its queue, so events could show up in the destination's dashboard before they appear in the Segment debugger.

## Getting Started

### Prerequisites

##### React-Native version

You must use React version 0.62 or later.

#### iOS configuration

You should use CocoaPods (**recommended**) to manage your installation and dependencies.
To add CocoaPods to your app, follow [these instructions](https://facebook.github.io/react-native/docs/integration-with-existing-apps#configuring-cocoapods-dependencies).

### Install the SDK

Segment recommends that you use NPM to install Analytics for React Native. This allows you to create a build with specific destinations, and makes it much easier to install and upgrade the library and any components.

First, add the `@segment/analytics-react-native` dependency to your `dependencies` and link it using `react-native-cli`, using the example commands below.

```bash
$ yarn add @segment/analytics-react-native
$ yarn react-native link
```

Then in your application set up the SDK as in the example below.

```js
await analytics.setup('YOUR_WRITE_KEY', {
  // Record screen views automatically!
  recordScreenViews: true,
  // Record certain application events automatically!
  trackAppLifecycleEvents: true
})
```

Next, make sure you import the SDK in any files that you use want to it in. You can use an `import` statement like the example below.

```js
import analytics from '@segment/analytics-react-native'
```

### Dynamic Framework for Manual Installation

Segment **highly recommend** using Cocoapods. Segment does not support sending data to bundled, device-mode integrations unless you are using Cocoapods.

If you absolutely cannot use Cocoapods, you can manually install our dynamic framework which allows you to send data to Segment, and have Segment send it on to enabled cloud-mode destinations.

To install Analytics-React-native manually:

1. Add `analytics-ios` as a npm dependency: `yarn add @segment/analytics-ios@github:segmentio/analytics-ios`
2. In the `General` tab for your project, search for `Embedded Binaries` and add the `Analytics.framework`
   ![Embed Analytics.framework](images/embed-analytics-framework.png)

> warning ""
> **Note**: if you choose not to use a dependency manager, you must keep all of the files up-to-date with regularly scheduled, manual updates.

### Including SDKs for destinations using Device-mode

To keep the Analytics-React library lightweight, it only installs the Segment destination by default. By default, the library sends all of your data first to the Segment servers, which forward the data on to any tools you enabled from the Segment web app. This is known as using "Cloud-mode".

Some destinations offer (and some require) that you include a specific SDK in your build to access features of the destination that must run on the user's device. This is known as a "Device-mode" connection mode. For these destinations, you must take a few additional steps to [include the device-mode destinations SDKs in your project](#packaging-destinations-using-device-mode). You can read [more about connection modes](/docs/connections/destinations/#connection-modes) in the Destination documentation.

Now that the SDK is installed and set up, you're ready to learn about the Segment Tracking methods.

## Tracking methods

### Identify

The [Identify call](/docs/connections/spec/identify/) lets you tie a user to their actions, and record traits about them. It includes a unique User ID, and any optional traits you know about them.

Segment recommends that you make an Identify call when the user first creates an account, and when they update their information.  If users can log out of your app, you should call `identify` when a user logs back in.

Analytics-React works on its own background thread, so it never blocks the main thread for the UI or a calling thread.

**Note:** Segment automatically assigns an `anonymousId` to users before you identify them. The `userId` is what connects anonymous activities across devices.

The example Identify call below identifies a user by their unique User ID (the one you know them by in your database), and labels them with a `name` and `email` traits.

```js
analytics.identify("a user's id", {
  email: "jsmith@example.com"
  name: "John Smith"
})
```

The `identify` call has the following arguments:

<table class="api-table">
  <tr>
    <td>`userId` _string_</td>
    <td>The database ID for this user. If you don't know who the user is yet, you can omit the `userId` and just record `traits`. You can read more in the [identify reference](/docs/connections/spec/identify/).</td>
  </tr>
  <tr>
    <td>`traits` _JSONMap, optional_</td>
    <td>A dictionary of traits you know about the user, like their `email` or `name`. You can read more about traits in the [Identify documentation](/docs/connections/spec/identify/).</td>
  </tr>
</table>


When you call Identify with a `userId`, the library writes that ID to disk so it can be used in subsequent calls. That ID can be removed either when the user uninstalls the app, or when you call [`reset`](#reset).

Find details on the **identify method payload** in our [Spec](/docs/connections/spec/identify/).

## Track

Then [Track call](/docs/connections/spec/track/) lets you record the actions your users perform. Every action triggers what Segment calls an "event", which can also have associated properties.

To get started, Segment's SDK <!-- TODO which? confirm Analytics-React?--> can automatically track a few common events using Segment's [Native Mobile Spec](/docs/connections/spec/mobile/), such as the `Application Installed`, `Application Updated` and `Application Opened`. These events are required for attribution tracking in several frequently-used Segment destinations. Simply enable this option during initialization. <!-- TODO enable which?!? How?-->

You should track events that are indicators of success for your mobile app, like **Signed Up**, **Item Purchased** or **Article Bookmarked**. Segment recommends that you track just a few important events when you first start out. You can always add more later!

The example Track call below tells us that a user just triggered the **Item Purchased** event, which recorded the `item` name of "Sword of Heracles" and a `revenue` of 2.95.

```js
analytics.track('Item Purchased', {
  item: 'Sword of Heracles',
  revenue: 2.95
})
```
Track event properties can be anything you want to record. In this case, item and revenue.

The Track call has the following fields:

<table class="api-table">
  <tr>
    <td>`event` _string_</td>
    <td>The name of the event. Segment recommends that you give events human-readable names, in object-action order, like **Song Played** or **Status Updated**.</td>
  </tr>
  <tr>
    <td>`properties` _JSONMap, optional_</td>
    <td>A dictionary of properties for the event. If the event was `Product Added` to cart, it might have properties like `price` and `productType`.</td>
  </tr>
</table>

You can read more about the Track call fields on [the Segment Spec page about the Track call](/docs/connections/spec/track/).


### Screen

The [Screen call](/docs/connections/spec/screen/) lets you you record whenever a user sees a screen of your mobile app, along with optional extra information about the page being viewed. This is very similar to the [Page call](/docs/connections/spec/page/) that you would use for non-mobile users.

Record a screen event an event whenever the user opens or navigates to a new screen in your app. This could be a view, fragment, dialog or activity depending on your app.

The example Screen call below shows a user viewed the Photo Feed, and that the page was private.

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

You can read more about the Screen call fields on [the Segment Spec page about the Screen call](/docs/connections/spec/screen/).

### Group

The [Group call](/docs/connections/spec/group/) lets you associate an [identified user](#identify) user with a group. A group could be a company, organization, account, project or team. The call also lets you record custom traits about the group, like industry or number of employees.

The Group call is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

The example Group call below adds the current user to the `myGroup` group, and adds a name and description.

```js
analytics.group('myGroup', {
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

You can read more about the Group method, including the group call payload, in [the Segment Spec page on the Group call](/docs/connections/spec/group/).

### Alias

You can use Alias calls to link one identity with another. This is an advanced method, but it is required to manage user identities correctly in *some* destinations.

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

To learn more about the Alias method, including the alias call payload, read through [the Segment Spec page on the Alias call](/docs/connections/spec/alias/)


## Utility methods

## Reset

The `reset` method clears the SDK's internal stores for the current `user` and `group`. If users can use different accounts in your app on the same device, you should call this when they log out.

Clearing all information about the user is as simple as calling:

```js
analytics.reset()
```


### Flush

By default, the library collects 20 events in the queue before flushing (sending) them, but you modify this number.

You can set `flushAt` to `1` to send events as they come in, and not in batches. This approach uses more battery.

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

---

## Submitting to the App Store
<!-- TODO mark-->

When you submit your app to the app store, be aware that Segment collects the IDFA for mobile install attribution with destinations like Mobile App Tracking. Even if you're not currently doing mobile install attribution, if you are asked, "Does this app use the Advertising Identifier (IDFA)?" on [this page](images/IDFA_Page2-1.jpg), you'll want to **check** the following three boxes:

1. "Attribute this app installation to a previously served advertisement"
2. "Attribute an action taken within this app to a previously served advertisement"
3. "I, YOUR_NAME, confirm that this app, and any third party..."

Note, you should *not* check the box labeled "Serve advertisements within the app" unless you are actually going to display ads.

### Destination flags in the Debugger

You might see some of your destinations set to `false` in the raw version of requests in the Segment live debugger, even if you haven't added that specific flag to your requests. You might see an integrations object that looks like the example below.

```json
"integrations": {
  "Segment.io": false,
  "Google Analytics": false,
  "Localytics": false,
  "Mixpanel": false
}
```

These flags tell the Segment servers that a packaged SDK already made a request directly from the device. This prevents the Segment servers from sending a second version to that destination's endpoint, and creating duplicate data.

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
