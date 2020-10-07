---
title: MoEngage Destination
---

## Getting Started

Once you add the Segment-Moengage library to your app, you can enable MoEngage from the Segment App. These new settings can take up to an hour to propagate to your existing users. For new users, it'll be instantaneous!

The Segment-MoEngage Integration is a bundled integration, meaning it requires that you add a client-side integration to your app.

## Setup MoEngage in your Segment Workspace:

To setup MoEngage do the following : 
  1. First get your key([AppID](http://app.moengage.com/v3/#/settings/0/0)) from the MoEngage dashboard. 
  2. Go to your **Segment workspace**, go to **Destinations** and select **MoEngage**. 
  3. Enable the MoEngage Destination.
  4. Go to the MoEngage Settings and enter the MoEngage AppID, obtained in **Step1**.
  5. Save the changes.
  6. Make sure you set the **Connection Mode**  to `Device Mode`. MoEngage requires this setting to use
      of features like push notifications and any in-app features of the MoEngage SDK.
  
These new settings will take up to an hour to propagate to your existing users. For new 
users it’ll be instantaneous! Segment-MoEngage Integration is a bundled integration, requires client side integration.

![Settings](/segmentsdk/segment_settings.png)

## iOS


To get started with MoEngage on iOS, first integrate your app with the [MoEngage-Segment-iOS](https://github.com/moengage/MoEngage-Segment-iOS) library. You can integrate MoEngage and Segment with [CocoaPods](http://cocoapods.org). 

  * Initialise pod with pod init command, this will create a podfile for your project.
  * Update your podfile by adding pod '**Segment-MoEngage**' as shown below:

  ```ruby
  use_frameworks!
  pod 'Segment-MoEngage’
  ```

   * Update the pod. 
   
    pod update

### Configure the Segment SDK:

Now head to the App Delegate file, and setup the Segment SDK by adding `SEGMoEngageIntegrationFactory` instance to the `SEGAnalyticsConfiguration` as shown below:

 ```objc
 #import <SEGMoEngageIntegrationFactory.h> // This line is key for MoEngage integration
 #import <SEGAnalytics.h>

 - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    // Add your configuration key from Segment
    SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"configuration key"];
    
    // Add MoEngageIntegrationFactory. Without this data will not come to MoEngage.
    [config use:[SEGMoEngageIntegrationFactory instance]];
    [SEGAnalytics setupWithConfiguration:config];
  }
  ```

### Tracking User Attribute

User attributes are specific traits of a user, like email, username, mobile, gender etc. **identify** lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

 ```objc
 [[SEGAnalytics sharedAnalytics] identify:@"a user's id" traits:@{ @"email": @"a user's email address" }];
 ```

Read more about [identify calls](/docs/connections/sources/catalog/libraries/mobile/ios/#identify).


### Tracking Events

Segment uses event tracking to track user behavior in an app. `track` calls let you record the actions your users perform. Every action triggers an "event", which can also have associated attributes.

 ```objc
 [[SEGAnalytics sharedAnalytics] track:@"Item Purchased" properties:@{ @"item": @"Sword of Heracles"}];
 ```

Read more about [track calls](/docs/connections/sources/catalog/libraries/mobile/ios/#track).


### Reset Users

The `reset` method clears the SDK's internal stores for the current user. This is useful for apps where users can log in and out with different identities over time.

 ```objc
 [[SEGAnalytics sharedAnalytics] reset];
 ```

Read more about the [reset method](/docs/connections/sources/catalog/libraries/mobile/ios/#reset).


### Install / Update Differentiation 

Since your app might already be on the App Store, you must specify whether your app update would be an `UPDATE` or an `INSTALL`.
To differentiate between those, use one of the method below:

 ```objc
 //For new Install call following
 [[MoEngage sharedInstance]appStatus:INSTALL];

 //For an app update call following
 [[MoEngage sharedInstance]appStatus:UPDATE];
 ```

Read more on [install/update differentiation](https://docs.moengage.com/docs/installupdate-differentiation).

### Data Redirection

You can redirect data to MoEngage' EU servers. To redirect data to, call the `redirectDataToRegion:` method to redirect the data to the `MOE_REGION_EU` region defined in the 'DataRedirectionRegion' Enumerator. Use the method as shown below:

```objc
 [MoEngage redirectDataToRegion:MOE_REGION_EU];
```

> note ""
> **IMPORTANT**: If you use MoEngage in the EU, you must [sign up for the EU environment](https://app-eu.moengage.com).

### Using features provided in the MoEngage SDK

Along with tracking your user's activities, you can use the MoEngage iOS SDK for more effective user engagement:

#### Push Notifications:
Push Notifications are a great way to keep your users engaged and informed about your app. You have following options while implementing push notifications in your app:

**Segment Push Implementation:**

1. Follow the directions to register for push notifications [using Segment's SDK](/docs/connections/sources/catalog/libraries/mobile/ios/#how-do-i-use-push-notifications)..

2. In your application’s application:didReceiveRemoteNotification: method, add the following:
  ```objc
  [[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];
  ```

3. If you integrated the application:didReceiveRemoteNotification:fetchCompletionHandler: in your app, add the following to that method:
  ```objc
  [[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];
  ```

4. If you implemented handleActionWithIdentifier:forRemoteNotification:, add the following to that method:
  ```objc
  [[SEGAnalytics sharedAnalytics] handleActionWithIdentifier:identifier forRemoteNotification:userInfo];
  ```
 
**MoEngage Push Implementation:**
For information about the MoEngage push implementation, see [**Push Notifications**](https://docs.moengage.com/docs/push-notifications) in the MoEngage documentation.


#### In-App Messaging

In-App Messaging are custom views which you can send to a segment of users to show custom messages or give new offers or take to some specific pages. Follow the link to know more about  inApp Messaging and how to use it in your application: 
[**InApp NATIV**](https://docs.moengage.com/docs/in-app-nativ)


#### GDPR Compliance
The MoEngage SDK is GDPR compliant, follow the doc in this [link](https://docs.moengage.com/docs/gdpr-compliance-1) to know how to use opt-outs for different features. 

### Segment Docs
For more info on using **Segment for iOS** refer to [**Developer Docs**](/docs/connections/sources/catalog/libraries/mobile/ios/) provided by Segment.


## Android

To use MoEngage in an Android app, you must perform the following steps to set up your environment.

![Downlaod](https://api.bintray.com/packages/moengage/android-sdk/moengage-segment-integration/images/download.svg)

To enable the full functionality of MoEngage (like Push Notifications, InApp Messaging), complete the following steps in your Android app.

### Adding the MoEngage Dependency

Along with the Segment dependency, add the below dependency in your `build.gradle` file.

```groovy
 implementation("com.moengage:moengage-segment-integration:$sdkVersion") {
        transitive = true
    }
```
with `$sdkVersion` replaced by the latest version of the MoEngage SDK.

The MoEngage SDK depends on the below Jetpack libraries provided by Google for its functioning, make you add them if not
 done already.
 
```groovy
    implementation("androidx.core:core:1.3.1")
    implementation("androidx.appcompat:appcompat:1.2.0")
    implementation("androidx.lifecycle:lifecycle-process:2.2.0")
```
Refer to the [SDK Configuration](https://docs.moengage.com/docs/android-sdk-configuration) documentation to know more about the build config and other libraries used by the SDK.
 
### Register MoEngage with Segment SDK

After adding the dependency, you must register the integration with Segment SDK. To do this, import the MoEngage
 integration:

```java
import com.segment.analytics.android.integrations.moengage.MoEngageIntegration;
```

Add the following line:

```java
Analytics analytics = new Analytics.Builder(this, "write_key")
                .use(MoEngageIntegration.FACTORY)
                .build();
```


### Initialise the MoEngage SDK

Get APP ID from the [Settings Page](http://app.moengage.com/v3/#/settings/0/0) on the MoEngage dashboard and initialise the MoEngage SDK in the `Application` class's `onCreate()`

```java
// this is the instance of the application class and "XXXXXXXXXXX" is the APP ID from the dashboard.
MoEngage moEngage = new MoEngage.Builder(this, "XXXXXXXXXXX")
            .enableSegmentIntegration()
            .build();
MoEngage.initialise(moEngage);
```

### Install/Update Differentiation
This is required for migrations to the MoEngage Platform so the SDK can determine whether the user is a new user on your app, or an existing user who updated to the latest version.

If the user was already using your application and has just updated to a new version which has the MoEngage SDK, below is an example call:

```java
MoEHelper.getInstance(getApplicationContext()).setAppStatus(AppStatus.UPDATE);
```

If this is a fresh install:


```java
MoEHelper.getInstance(getApplicationContext()).setAppStatus(AppStatus.INSTALL);
```

### Configure Push Notifications

Copy the Server Key from the FCM console and add it to the MoEngage Dashboard(Not sure where to find the Server Key refer to [Getting FCM Server Key](https://docs.moengage.com/docs/getting-fcmgcm-server-key). To upload it, go to [Settings Page](https://app.moengage.com/v3/#/settings/push/mobile) and add the Server Key and package name.
**Please make sure you add the keys both in Test and Live environment.**

#### Add meta information for push notification

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

For showing Push notifications there are 2 important steps: 

1. Registration for Push, for example generating push token.
2. Receiving the Push payload from Firebase Cloud Messaging(FCM) service and showing the notification on the device. 


#### Opt out of MoEngage Registration

> note ""
> By default, the MoEngage SDK attempts to register a push token, since your application is handling the push, be sure to opt-out of the SDK's token registration.

To opt-out of MoEngage's token registration mechanism call in the `optOutTokenRegistration()` on the `MoEngage.Builder` as shown below

```java
MoEngage moEngage = new MoEngage.Builder(this, "XXXXXXXXXX")
            .setNotificationSmallIcon(R.drawable.icon)
            .setNotificationLargeIcon(R.drawable.ic_launcher)
            .optOutTokenRegistration()
            .enableSegmentIntegration()
            .build();
MoEngage.initialise(moEngage);
```

#### Pass the Push Token To the MoEngage SDK
The Application would need to pass the Push Token received from FCM to the MoEngage SDK for the MoEngage platform to send out push notifications to the device.
Use the below API to pass the push token to the MoEngage SDK.

```java
MoEFireBaseHelper.Companion.getInstance().passPushToken(getApplicationContext(), token);
```
> note ""
> *Note:* Be sure to pass the token to the MoEngage SDK whenever you refresh the push token, and on every application update. Passing the token on application update is important for migration to the MoEngage Platform.

#### Pass the Push payload to the MoEngage SDK
To pass the push payload to the MoEngage SDK call the MoEngage API from the `onMessageReceived()` from the Firebase receiver.
Before passing the payload to the MoEngage SDK you should check if the payload is from the MoEngage platform using the helper API provided by the SDK.

```java
if (MoEPushHelper.getInstance().isFromMoEngagePlatform(remoteMessage.getData())) {
  MoEFireBaseHelper.Companion.getInstance().passPushPayload(getApplicationContext(), remoteMessage.getData());
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
When the MoEngage SDK handles push registration, it optionally provides a callback to the application whenever a new token is registered or the token is refreshed.
Application can get this callback by implementing `FirebaseEventListener` and registering for a callback in the Application class' `onCreate()` using `MoEFireBaseHelper.Companion.getInstance().setEventListener()` 


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
> **Note:** To ensure that Geo-fence pushes work properly, configure your location to have location permissions enabled, and include the Play Services Location Library.

For more information about configuring the Geo-fence, see the [Configuring Geo-Fence](https://docs.moengage.com/docs/push-configuration#section-geofence-push) section in the MoEngage documentation.

#### 
Declaring & configuring Rich Landing Activity: 
Add the following snippet and replace `[PARENT_ACTIVITY_NAME]` with the name of the parent 
 activity; `[ACTIVITY_NAME]` with the activity name which should be the parent of the Rich Landing Page

```xml
<activity
  android:name="com.moe.pushlibrary.activities.MoEActivity"
  android:label="[ACTIVITY_NAME]"
  android:parentActivityName="[PARENT_ACTIVITY_NAME]" >
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
Use [Identify](/docs/connections/sources/catalog/libraries/mobil/android/#identify) to track user-specific attributes. This is the same as tracking [user attributes](http://docs.moengage.com/docs/identifying-user) on MoEngage. MoEngage supports traits supported by Segment as well as custom traits. If you set traits.id, MoEngage sets that as the Unique ID for that user.

### Track
Use [track](/docs/connections/sources/catalog/libraries/mobil/android/#track) to track events and user behavior in your app.
This will send the event to MoEngage with the associated properties. Tracking events is essential and will help you create segments for engaging users.

### Reset
If your app supports the ability for a user to logout and login with a new identity, then you’ll need to call reset for the Analytics client.

### Sample Implementation

Refer to [this](https://github.com/moengage/moengage-segment-integration) github repository for sample implementation

## Web 

The MoEngage WebSDK offers the ability to send push notifications to Google Chrome, Opera and Firefox browsers. Complete the following steps after you've configured Segment's `analytics.js.`


### Integration

#### 1. Setup your MoEngage Web SDK settings at MoEngage Dashboard
Configure the [web settings](https://app.moengage.com/v3/#/settings/push/web) on the MoEngage dashboard to start using MoEngage <> Segment integration. 

If you have selected `HTTPS` mode of integration in the settings, complete the following steps:

#### 2 Set up for HTTPS websites

#### 2.a Download the required files (HTTPS)
For HTTPS Web Push to work, you need to host two files in the `root` directory of your web server. These two files will be available for you to download at the [web settings page](https://app.moengage.com/v3/#/settings/push/web).
* manifest.json
* serviceworker.js

> note ""
> **Note**: Please make sure the name of the serviceworker file is `serviceworker.js`. Please contact MoEngage support at support@moengage.com if you wish to have some other name for the serviceworker file.

#### 2.b Add link to manifest in HTML (HTTPS)
Add the following line in the <head> tag of your page.

```html
<head>
  ...
	<link rel="manifest" href="/manifest.json">
  ...
</head>
```

#### 2.c Use your existing manifest or serviceworker file (HTTPS)
If you already have these files,

1. **Manifest** - Add the sender ID you saved on MoEngage dashboard as the `gcm_sender_id`. If you've used `MoEngage Shared Project` while setting up, your sender id is `540868316921`. Edit your `manifest.json` as follows:
  ```json
  {
    ...
    "gcm_sender_id": "GCM_SENDER_ID",
    ...
  }
```

2. **Service Worker** - Add the following line to the top of your `serviceworker.js` file
  ```js
  importScripts("//cdn.moengage.com/webpush/releases/serviceworker_cdn.min.latest.js?date="+
  new Date().getUTCFullYear()+""+new Date().getUTCMonth()+""+new Date().getUTCDate());
  ```

### Identify
Use [Identify](/docs/sources/website/analytics.js/#identify) to track user specific attributes. This is equal to [tracking user attributes](https://docs.moengage.com/docs/tracking-web-user-attributes) on MoEngage. MoEngage supports traits supported by Segment as well as custom traits.

### Track
Use [track](/docs/sources/website/analytics.js/#track) to track events and user behaviour in your app. This will send the event to MoEngage with the associated properties. Tracking events is essential and will help you create segments for engaging users.

### Reset
If your website supports the ability for a user to logout and login with a new identity, then you’ll need to call [reset](/docs/sources/website/analytics.js/#reset-logout) method in `analytics.js`.

### Optional
For information about optional feature, see the documentation below:
* [Configure opt in type](https://docs.moengage.com/docs/configuring-notification-opt-in)
* [Self-handled opt-ins](https://docs.moengage.com/docs/self-handled-opt-ins)
* [SDK callbacks](https://docs.moengage.com/docs/tracking-opt-ins-on-your-own)

### Test Mode and Debugging
While updating the MoEngage settings on the Segment Dashboard, you can enable the logging functionality of the MoEngage SDK to see the SDK logs on the browser console. Just set `Enable Debug Logging` to `On` and the SDK loads in debug mode.

> note ""
> **Note**: When you enable debug mode, the events and attributes of the users send to the `TEST` environment of your MoEngage App.
