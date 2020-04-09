---
title: MoEngage Destination
---

## Getting Started

Once you add the Segment-Moengage library to your app, you can enable MoEngage from the Segment App. These new settings can take up to an hour to propagate to all of your existing users. For new users, it'll be instantaneous!

The Segment-MoEngage Integration is a bundled integration, meaning it requires that you add a client-side integration to your app.

## Set up MoEngage in the Segment Dashboard

  1. Get your [AppID](http://app.moengage.com/v3/#/settings/0/0) from the MoEngage dashboard.
  2. Go to your **Segment workspace**, then go to **Destinations**, and select **MoEngage**.
  3. Enable the MoEngage Integration.
  4. In the MoEngage Settings, enter the MoEngage AppID that you got in Step 1.
  5. Save the changes.
  6. Make sure the `Connection Mode` is set to `Device-mode`. This is required so you can use push notifications and other in-app features of the MoEngage SDK.

These new settings can take up to an hour to propagate to all of your existing users. For new users, it'll be instantaneous! Segment-MoEngage Integration is a bundled integration, requires client side integration.

![Settings](images/segment_settings.png)

## iOS

To get started with MoEngage on iOS, first add the [MoEngage-Segment-iOS](https://github.com/moengage/MoEngage-Segment-iOS) library to your app, using [CocoaPods](http://cocoapods.org).

- Initialize the pod using the `pod init` command. This creates a podfile for your project.
- Update your podfile by adding the `Segment-MoEngage` pod.

  ```objc
  use_frameworks!
  pod 'Segment-MoEngage'
  ```

- Update the pod.

  ```ruby
  pod update
  ```

### Setup Segment SDK

Go to the App Delegate file and set up the Segment SDK by adding the `SEGMoEngageIntegrationFactory` instance to `SEGAnalyticsConfiguration` as shown below:

```ruby
#import <SEGMoEngageIntegrationFactory.h> // This line is key for MoEngage integration
#import <SEGAnalytics.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

  // Add your configuration key from Segment
  SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"configuration key"];

  // Add MoEngageIntegrationFactory. Without this, data will not come to MoEngage.
  [config use:[SEGMoEngageIntegrationFactory instance]];
  [SEGAnalytics setupWithConfiguration:config];
}
```

### Tracking User Attribute

User attributes are specific traits of a user, such as their email address, username, mobile number, gender, etc. `identify` lets you tie a user to their actions, and record traits about them. It includes a unique User ID and any optional traits you know about them.

```ruby
[[SEGAnalytics sharedAnalytics] identify:@"a user's id" traits:@{ @"email": @"a user's email address" }];
```

Read more about [identify calls](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/#identify).

### Tracking Events

Event tracking is used to track user behavior in an app. `track` calls let you record the actions your users perform. Every action triggers an "event", which can also have associated attributes.

```ruby
[[SEGAnalytics sharedAnalytics] track:@"Item Purchased" properties:@{ @"item": @"Sword of Heracles"}];
```

Read more about [track calls](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/#track).

### Reset Users

The `reset` method clears the SDK's internal stores for the current user. This is useful for apps where users can log in and out with different identities over time.

```ruby
[[SEGAnalytics sharedAnalytics] reset];
```

Read more about the [reset method](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/#reset).

### Install / Update Differentiation

Since your app might already be on the App Store, you must specify whether your app update would be an `UPDATE` or an `INSTALL`.
To differentiate between those, use one of the method below:

```ruby
//For new Install call following
[[MoEngage sharedInstance]appStatus:INSTALL];

//For an app update call following
[[MoEngage sharedInstance]appStatus:UPDATE];
```

Read more on [install/update differentiation](https://docs.moengage.com/docs/installupdate-differentiation).

### Data Redirection

Data redirection to MoEngage's EU servers is supported. This can be done by calling the `redirectDataToRegion:` method to redirect the data to the `MOE_REGION_EU` region defined in the 'DataRedirectionRegion' Enumerator. Use the method as shown below:

```ruby
[MoEngage redirectDataToRegion:MOE_REGION_EU];
```

> warning ""
> **IMPORTANT**: If you will be using MoEngage in the EU, you must [sign up for the EU environment](https://app-eu.moengage.com).

### Using features provided in MoEngage SDK

Along with tracking your users' activities, MoEngage iOS SDK also provides additional features which can be used for more effective user engagement.

#### Push Notifications

Push Notifications are a great way to keep your users engaged and informed about your app. You have following options when implementing push notifications in your app:

**Segment Push Implementation:**

1. Follow the directions to register for push notifications [using Segment's SDK](https://segment.com/docs/libraries/ios/#how-do-i-use-push-notifications-).

2. In your application's `application:didReceiveRemoteNotification:` method, add the following:

   ```ruby
   [[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];
   ```

3. If you integrated the `application:didReceiveRemoteNotification:fetchCompletionHandler:` in your app, add the following to that method:

   ```ruby
   [[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];
   ```

4. If you implemented `handleActionWithIdentifier:forRemoteNotification:`, add the following to that method:

   ```ruby
   [[SEGAnalytics sharedAnalytics] handleActionWithIdentifier:identifier forRemoteNotification:userInfo];
   ```

**MoEngage Push Implementation:**

Follow the directions to implement Push Notifications in your mobile app [using MoEngage's SDK](https://docs.moengage.com/docs/push-notifications).

#### In-App Messaging:

In-App Messaging are custom views that you can send to a segment of users to show custom messages, give new offers, or direct to a specific page. Read more about [inApp Messaging](https://docs.moengage.com/docs/in-app-nativ) and how to implement it in your application.

#### GDPR Compliance:
MoEngage SDK is GDPR compliant. Read more about MoEngage's [GDPR Compliance](https://docs.moengage.com/docs/gdpr-compliance-1) to learn how to use opt-outs for different features.

#### Segment Docs:
For more information on using **Segment for iOS**, refer to the [Segment Developer Docs](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/).

## Android

To use MoEngage in an Android app, you must perform the following steps to set up your environment.

### Adding MoEngage Dependency:

Along with the Segment dependency, add the below dependency in your `build.gradle` file.

```java
implementation('com.moengage:moengage-segment-integration:+') {
      transitive = true
  }
```

### How to Initialize MoEngage SDK:

Get your APP ID from the [Settings Page](http://app.moengage.com/v3/#/settings/0/0) on the MoEngage dashboard and initialise the MoEngage SDK in the `Application` class's `onCreate()`

```java
// this is the instance of the application class and "XXXXXXXXXXX" is the APP ID from the dashboard.
MoEngage moEngage = new MoEngage.Builder(this, "XXXXXXXXXXX")
            .enableSegmentIntegration()
            .build();
MoEngage.initialise(moEngage);
```

### Install/Update Differentiation

This is only required for migrations to MoEngage Platform so the SDK can determine whether the user is a new user on your app, or an existing user who updated to the latest version.

If the user was already using your application and has just updated to a new version which has MoEngage SDK, below is an example call:

```java
MoEHelper.getInstance(getApplicationContext()).setExistingUser(true);
```

In case it is a fresh install:

```java
MoEHelper.getInstance(getApplicationContext()).setExistingUser(false);
```

This code should be done in your Application class's `onCreate()` and should be called only *once*.

**If you do not add this code, you cannot use Smart Trigger InApp/Push Campaigns on INSTALL events.**

### How To - Push Notifications:

Copy the [Server Key](https://docs.moengage.com/docs/getting-fcmgcm-server-key) from the Firebase Cloud Messaging (FCM) console and add it to the MoEngage Dashboard. To upload, go to **Settings** and add the Server Key and package name. Make sure you add the keys in both your `Test` and `Live` environments.

#### Adding meta information for push notification.

Add the AppId, and the small and large notification icons to the builder:

```java
MoEngage moEngage =
        new MoEngage.Builder(this, "XXXXXXXXXX")
            .setNotificationSmallIcon(R.drawable.icon)
            .setNotificationLargeIcon(R.drawable.ic_launcher)
            .enableSegmentIntegration()
            .build();
MoEngage.initialise(moEngage);
```

To display Push notifications, there are 2 important steps:

1) Registration for Push (i.e. generating push token)
2) Receiving the Push payload from Firebase Cloud Messaging (FCM) service and showing the notification on the device.

#### Push Registration and Receiving handled by App

By default, MoEngage's SDK attempts to register for push tokens. Since your application is handling push notifications, you need to opt-out of SDK's token registration.

#### Opting out of MoEngage Registration

To opt-out of MoEngage's token registration mechanism, call optOutTokenRegistration() on the MoEngage.Builder as shown below:

```java
MoEngage moEngage =
        new MoEngage.Builder(this, "XXXXXXXXXX")
            .setNotificationSmallIcon(R.drawable.icon)
            .setNotificationLargeIcon(R.drawable.ic_launcher)
            .optOutTokenRegistration()
            .enableSegmentIntegration()
            .build();
MoEngage.initialise(moEngage);
```

#### Pass the Push Token To MoEngage SDK

The Application must pass the Push Token received from FCM to the MoEngage SDK for the MoEngage platform to send push notifications to the device. Use the call below to pass the push token to the MoEngage SDK.

```java
PushManager.getInstance().refreshToken(getApplicationContext(), token);
```

> note ""
> **Note**: Make sure you pass the push token to MoEngage SDK whenever it is refreshed, and on application update. Passing the token on application update is important for migration to the MoEngage Platform.

#### Pass the Push payload to the MoEngage SDK

To pass the push payload to the MoEngage SDK, call the MoEngage API from `onMessageReceived()` from the Firebase receiver. Before you pass the payload to the MoEngage's SDK, use the helper API provided by the SDK to check if the payload is from the MoEngage platform.

```java
if (MoEPushHelper.getInstance().isFromMoEngagePlatform(remoteMessage.getData())) {
  MoEPushHelper.getInstance().handlePushPayload(getApplicationContext(),remoteMessage.getData());
}else{
  // your app's business logic to show notification
}
```

#### Push Registration and Receiving handled by SDK

Add the below code in your manifest file.

```xml
<service android:name="com.moengage.firebase.MoEFireBaseMessagingService">
 	<intent-filter>
		<action android:name="com.google.firebase.MESSAGING_EVENT" />
 	</intent-filter>
</service>
```
When MoEngage's SDK handles push registration, it optionally provides a callback to the application whenever a new token is registered or the token is refreshed. Applications can get this callback by implementing `PushManager.OnTokenReceivedListener` and registering for a callback in the Application class's `onCreate()` using `PushManager.getInstance().setTokenObserver()`.

#### Configure Geo-fence

By default, the MoEngage SDK does not track location, and geo-fence campaigns do not work. To track location and run geo-fence campaigns you need to opt-in for location services in the MoEngage initializer. To initialize, call the opt-in API below:

```java
MoEngage moEngage =
    new MoEngage.Builder(this, "XXXXXXXXXXX")
        .enableLocationServices()
        .enableSegmentIntegration()
        .build();
MoEngage.initialise(moEngage);
```

> note ""
> **Note**: Your Application must have location permission and include Play Services' Location Library.

For more details see the [Configuring Geo-Fence section](https://docs.moengage.com/docs/push-configuration#section-geofence-push) in the MoEngage documentation.

#### Declaring & Configuring Rich Landing Activity:

Add the following snippet and replace `[PARENT_ACTIVITY_NAME]` with the name of the parent activity, `[ACTIVITY_NAME]` with the activity name that should be the parent of the Rich Landing Page:

 ```xml
 <activity
    android:name="com.moe.pushlibrary.activities.MoEActivity"
    android:label="[ACTIVITY_NAME]"
    android:parentActivityName="[PARENT_ACTIVITY_AME]" >
    <!-- Parent activity meta-data to support 4.0 and lower -->
    <meta-data
        android:name="android.support.PARENT_ACTIVITY"
        android:value="[PARENT_ACTIVITY_AME]" />
 </activity>
 ```

You are now all set up to receive push notifications from MoEngage. For more information on features provided in MoEngage Android SDK refer to the following links:

 * [Push Notifications](http://docs.moengage.com/docs/push-configuration)

 * [In-App messaging](http://docs.moengage.com/docs/configuring-in-app-nativ)

 * [Notification Center](http://docs.moengage.com/docs/notification-center)

 * [Advanced Configuration](https://docs.moengage.com/docs/advanced-integration)

 * [API Reference](https://moengage.github.io/MoEngage-Android-SDK/)

 * [GDPR Compliance](https://docs.moengage.com/docs/gdpr-compliance)

### Identify

Use [identify](https://segment.com/docs/connections/sources/catalog/libraries/mobile/android/#identify) to track user-specific attributes. It is equivalent to tracking [user attributes](http://docs.moengage.com/docs/identifying-user) on MoEngage. MoEngage supports traits supported by Segment as well as custom traits. If you set `traits.id`, we set that as the Unique ID for that user.

### Track

Use [track](https://segment.com/docs/connections/sources/catalog/libraries/mobile/android/#track) to track events and user behavior in your app.

This sends the event to MoEngage with the associated properties. Tracking events is essential and will help you create segments for engaging users.

### Reset

If your app allows the user to log out and log back in with a new identity, you should call `reset` for the Analytics client.

### Migrating from older version (One-time process)

Read more about [migrating from a SDK version less than 2.0.00](http://docs.moengage.com/docs/migrating-to-7xxx).

### Sample Implementation

View a sample implementation in our [Github Repository](https://github.com/moengage/SegmentDemo).

## Web

MoEngage WebSDK offers the capability to send push notifications to Google Chrome, Opera and Firefox browsers. There are some additional steps apart from integrating Segment's `analytics.js`.

### Set up your MoEngage Web SDK settings at MoEngage Dashboard

Configure the [web settings](https://app.moengage.com/v3/#/settings/push/web) on the MoEngage dashboard in order to start using MoEngage-Segment integration.

If you selected `HTTPS` mode, follow the additional instructions in the section below.

#### Set up for HTTPS websites

If you selected `HTTPS` mode, you must take some additional steps:

1. Download the required files (HTTPS only)

    For HTTPS Web Push to work, you must host two files in the `root` directory of your web server. You can find download this file from the [web settings page](https://app.moengage.com/v3/#/settings/push/web).

* serviceworker.js

> note ""
> **Note**: Make sure the name of the serviceworker file is exactly `serviceworker.js`. [Contact MoEngage support](support@moengage.com) if you need to rename the serviceworker file.

2. Use your serviceworker file (HTTPS only)

If you already have an SW file, add the following line to the top of your `serviceworker.js` file:

```js
importScripts("//cdn.moengage.com/webpush/releases/serviceworker_cdn.min.latest.js?date="+ new Date().getUTCFullYear()+""+new Date().getUTCMonth()+""+new Date().getUTCDate());
```

### Identify

Use [Identify](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#identify) to track user specific attributes. It equivalent to [tracking user attributes](https://docs.moengage.com/docs/tracking-web-user-attributes) on MoEngage. MoEngage supports traits supported by Segment as well as custom traits.

### Track

Use [track](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track) to track events and user behaviour in your app. This will send the event to MoEngage with the associated properties. Tracking events is essential and will help you create segments for engaging users.

### Reset

If your website supports the ability for a user to logout and login with a new identity, then you'll need to call [reset](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#reset-logout) method in `analytics.js`.

### Optional

There are some further optional features you can read about here:
* [Configure opt in type](https://docs.moengage.com/docs/configuring-notification-opt-in)
* [Self-handled opt-ins](https://docs.moengage.com/docs/self-handled-opt-ins)
* [SDK callbacks](https://docs.moengage.com/docs/tracking-opt-ins-on-your-own)

### Test Mode and Debugging

While updating the MoEngage settings on the Segment Dashboard, you can enable the logging functionality of the MoEngage SDK to see the SDK logs on the browser console. Just set `Enable Debug Logging` to `On` and the SDK will be loaded in debug mode.

> note ""
> **Note**: When you enable debug mode, the events and user attributes are sent to the `TEST` environment of your MoEngage App.
