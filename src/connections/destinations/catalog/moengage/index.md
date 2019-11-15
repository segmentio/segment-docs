---
title: MoEngage Destination
---

## Getting Started

Once the Segment library is integrated with your app, toggle MoEngage on in your Segment
integrations. These new settings will take up to an hour to propagate to all of your existing
users. For new users it'll be instantaneous!

Segment-MoEngage Integration is a bundled integration, requires client-side integration.

Follow the below steps for integration

## Setup MoEngage in Segment Dashboard

To setup MoEngage do the following:
  1. First get your key ([AppID](http://app.moengage.com/v3/#/settings/0/0)) from MoEngage dashboard.
  2. Go to **Segment dashboard**, then go to **Integrations** and select **MoEngage**.
  3. Enable MoEngage Integration.
  4. Go to MoEngage Settings and enter the MoEngage AppID, obtained in **Step1**.
  5. Save the changes.
  6. Make sure the `Connection Mode` is set to `Device-mode`. This is required in order to make use
      of features like push notification and in-app feature of MoEngage SDK.

These new settings will take up to an hour to propagate to all of your existing users. For new
users it'll be instantaneous! Segment-MoEngage Integration is a bundled integration, requires client side integration.

![Settings](images/segment_settings.png)

## iOS


To get started with MoEngage on iOS, first integrate your app with the [MoEngage-Segment-iOS](https://github.com/moengage/MoEngage-Segment-iOS) library. MoEngage can be integrated via Segment using [CocoaPods](http://cocoapods.org).

  * Initialise pod with pod init command, this will create a podfile for your project.
  * Update your podfile by adding pod '**Segment-MoEngage**' as shown below:

  ```ruby
  use_frameworks!
  pod 'Segment-MoEngage'
  ```

   * Update the pod.

    ```
    pod update
    ```

### Setup Segment SDK

Now head to the App Delegate file, and setup the Segment SDK by adding `SEGMoEngageIntegrationFactory` instance to the `SEGAnalyticsConfiguration` as shown below:

 ```
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

 ```[[SEGAnalytics sharedAnalytics] identify:@"a user's id" traits:@{ @"email": @"a user's email address" }];```

For more info refer to this [link](https://segment.com/docs/sources/mobile/ios/#identify).

### Tracking Events

Event tracking is used to track user behaviour in an app. **track** lets you record the actions your users perform. Every action triggers i.e,"event", which can also have associated attributes.

 ```[[SEGAnalytics sharedAnalytics] track:@"Item Purchased" properties:@{ @"item": @"Sword of Heracles"}];```

That's all you need for tracking data. For more info refer this [link](https://segment.com/docs/sources/mobile/ios/#track).

### Reset Users

The *reset* method clears the SDK's internal stores for the current user. This is useful for apps where users can log in and out with different identities over time.

 ```[[SEGAnalytics sharedAnalytics] reset];```

For more info refer to this [link](https://segment.com/docs/sources/mobile/ios/#reset).

### Install / Update Differentiation

Since you might integrate us when your app is already on the App Store, we would need to know whether your app update would be an actual UPDATE or an INSTALL.
To differentiate between those, use one of the method below:

 ```
 //For new Install call following
 [[MoEngage sharedInstance]appStatus:INSTALL];

 //For an app update call following
 [[MoEngage sharedInstance]appStatus:UPDATE];
 ```

For more info on this refer following [link](https://docs.moengage.com/docs/installupdate-differentiation).

### Data Redirection

We support data redirection to our EU servers in our SDK. This can be done by calling `redirectDataToRegion:` method to redirect the data to `MOE_REGION_EU` region defined in DataRedirectionRegion Enumerator. Use the method as shown below:

```
 [MoEngage redirectDataToRegion:MOE_REGION_EU];
```

**IMPORTANT**:
To sign up to our EU environment go to the following [URL](https://app-eu.moengage.com).

### Using features provided in MoEngage SDK

Along with tracking your user's activities, MoEngage iOS SDK also provides additional features which can be used for more effective user engagement:

#### Push Notifications

Push Notifications are a great way to keep your users engaged and informed about your app. You have following options while implementing push notifications in your app:

**Segment Push Implementation:**

1.Follow the directions to register for push using Segment SDK in this [link](https://segment.com/docs/libraries/ios/#how-do-i-use-push-notifications-).

2.In your application's application:didReceiveRemoteNotification: method, add the following:

 ```[[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];```

3.If you integrated the application:didReceiveRemoteNotification:fetchCompletionHandler: in your app, add the following to that method:

 ```[[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];```

4.If you implemented handleActionWithIdentifier:forRemoteNotification:, add the following to that method:

 ```[[SEGAnalytics sharedAnalytics] handleActionWithIdentifier:identifier forRemoteNotification:userInfo];```

**MoEngage Push Implementation:**
 Follow this link to implement Push Notification in your mobile app using MoEngage SDK :
 [**Push Notifications**](https://docs.moengage.com/docs/push-notifications)


#### In-App Messaging:

In-App Messaging are custom views which you can send to a segment of users to show custom messages or give new offers or take to some specific pages. Follow the link to know more about  inApp Messaging and how to implement it in your application:
[**InApp NATIV**](https://docs.moengage.com/docs/in-app-nativ)


#### GDPR Compliance:
MoEngage SDK is GDPR compliant, follow the doc in this [link](https://docs.moengage.com/docs/gdpr-compliance-1) to know how to use opt-outs for different features.

### Segment Docs:
For more info on using **Segment for iOS** refer to [**Developer Docs**](https://segment.com/docs/sources/mobile/ios/) provided by Segment.


## Android

To get up and running with MoEngage on Android, there a couple of steps we will walk you through
to enable its full functionality (like Push Notifications, InApp Messaging), there are still a couple of steps that you have to take care of in your Android app.

#### Adding MoEngage Dependency:

Along with the segment dependency add the below dependency in your build.gradle file.

```groovy
 implementation('com.moengage:moengage-segment-integration:+') {
        transitive = true
    }
```

#### How to Initialise MoEngage SDK:

Get APP ID from the [Settings Page](http://app.moengage.com/v3/#/settings/0/0) on the MoEngage dashboard and initialise the MoEngage SDK in the `Application` class's `onCreate()`

```java
Analytics analytics = new Analytics.Builder(getApplicationContext(),"writeKey")//use your own write key
            .logLevel(Analytics.LogLevel.VERBOSE)// should be added only in debug builds. Make sure this is removed before a signed apk is generated.
            .use(MoEngageIntegration.FACTORY)//enable MoEngage integration
            .build();

// this is the instance of the application class and "XXXXXXXXXXX" is the APP ID from the dashboard.
MoEngage moEngage = new MoEngage.Builder(this, "XXXXXXXXXXX")
            .enableSegmentIntegration()
            .build();
MoEngage.initialise(moEngage);
```

#### Install/Update Differentiation
This is solely required for migration to MoEngage Platform. We need your help to tell the SDK whether the user is a new user for on your app or an existing user who has updated to the latest version.

If the user was already using your application and has just updated to a new version which has MoEngage SDK it is an updated call the below API

```java
MoEHelper.getInstance(getApplicationContext()).setExistingUser(true);
```

In case it is a fresh install call the below API

```java
MoEHelper.getInstance(getApplicationContext()).setExistingUser(false);
```

**This code should be done in your Application class's `onCreate()` and should be called only once.**

**If this code is not added Smart Trigger InApp/Push Campaigns on INSTALL event will not work.**

#### How To - Push Notifications:
##### 1. Adding meta information for push notification.

Along with the App Id and the notification small icon and large icon to the builder.

```java
MoEngage moEngage =
        new MoEngage.Builder(this, "XXXXXXXXXX")
            .setNotificationSmallIcon(R.drawable.icon)
            .setNotificationLargeIcon(R.drawable.ic_launcher)
            .enableSegmentIntegration()
            .build();
MoEngage.initialise(moEngage);
```
##### 2. Push Token

By default the SDK registers for push token. In case your application already has a mechanism to
register for push token disable push token registration by using the opt-out as shown below

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

Once you have opted out of push token registration pass the token to MoEngage SDK,
the application should pass the token to MoEngage SDK from the Registration Service used for getting the push token.

```java
PushManager.getInstance().refreshToken(getApplicationContext(), token);
```

In case you are allowing MoEngage SDK to register for push but also want the token for
internal usage you can get the token by implementing `PushManager.OnTokenReceivedListener` in your **Application class**

```java
public class DemoApp extends Application implements PushManager.OnTokenReceivedListener{
  public void onCreate() {
    PushManager.getInstance().setTokenObserver(this);
  }
  @Override public void onTokenReceived(String token) {
		//save token for your use
	}
}
```
##### 3. Configure FCM

Based on whether you are using FCM move to library specific configuration.

1. [Configuring FCM](https://docs.moengage.com/docs/configuring-fcm)


##### 4. Configure Geo-fence

By default SDK does not track location neither geo-fence campaigns work by default.
To track location and run geo-fence campaigns you need to opt-in for location service in the MoEngage initialiser.
To initialise call the below opt-in API.

```java
    MoEngage moEngage =
        new MoEngage.Builder(this, "XXXXXXXXXXX")
            .enableLocationServices()
            .enableSegmentIntegration()
            .build();
    MoEngage.initialise(moEngage);
```

**Note:** For Geo-fence pushes to work your Application should have location permission and Play Services' Location Library should be included.

For more details on refer to the [Configuring Geo-Fence](https://docs.moengage.com/docs/geo-fence-push) section in the MoEngage documentation.

##### 5. Declaring & configuring Rich Landing Activity:
Add the following snippet and replace `[PARENT_ACTIVITY_NAME]` with the name of the parent
 activity; `[ACTIVITY_NAME]` with the activity name which should be the parent of the Rich Landing Page

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

 ##### 6. Data Redirection
 In case your app wants to re-direct data to a specific zone because of any data regulation policy
please configure the zone in the MoEngage initialiser object as shown below.

 ```java
     MoEngage moEngage =
         new MoEngage.Builder(this, "XXXXXXXXXXX")
             .redirectDataToRegion()// add the required region here.
             .build();
     MoEngage.initialise(moEngage);

 ```

Supported Regions
 ```java
     REGION_INDIA,
     REGION_EU
 ```
Refer to the API [documentation](https://moengage.github.io/MoEngage-Android-SDK/com/moengage/core/MoEngage.DATA_REGION.html) for more details.

 **Note:** If you are redirecting your data to the European Region please sign-up using the
 following [URL](https://app-eu.moengage.com).


##### 7. Configuring your MoEngage Account

Copy the Sever Key from the FCM console and add it to the MoEngage Dashboard(Not sure where to find the Server Key refer to [Getting FCM Server Key](https://docs.moengage.com/docs/getting-fcmgcm-server-key). To upload it, go to the [Settings Page](http://app.moengage.com/v3/#/settings/4/0) and add the Server Key and package name.
**Please make sure you add the keys both in Test and Live environment.**

You are now all setup to receive push notifications from MoEngage. For more information on features provided in MoEngage Android SDK refer to following links:

 * [Push Notifications](http://docs.moengage.com/docs/push-configuration)

 * [In-App messaging](http://docs.moengage.com/docs/configuring-in-app-nativ)

 * [Notification Center](http://docs.moengage.com/docs/notification-center)

 * [Advanced Configuration](https://docs.moengage.com/docs/advanced-integration)

 * [API Reference](https://moengage.github.io/MoEngage-Android-SDK/)

 * [GDPR Compliance](https://docs.moengage.com/docs/gdpr-compliance)


#### Identify
Use [Identify](https://segment.com/docs/sources/mobile/android/#identify) to track user specific attributes. It equivalent to tracking [user attributes](http://docs.moengage.com/docs/identifying-user) on MoEngage. MoEngage supports traits supported by Segment as well as custom traits. If you set traits.id, we set that as the Unique ID for that user.

#### Track
Use [track](https://segment.com/docs/sources/mobile/android/#track) to track events and user behaviour in your app.
This will send the event to MoEngage with the associated properties. Tracking events is essential and will help you create segments for engaging users.

#### Reset
If your app supports the ability for a user to logout and login with a new identity, then you'll need to call reset for the Analytics client.

#### Migrating from older version(One time process)
Please refer to [this](http://docs.moengage.com/docs/migrating-to-7xxx) link to migrate from SDK version less than 2.0.00


#### Sample Implementation

Refer to [this](https://github.com/moengage/SegmentDemo) github repository for sample implementation

## Web

MoEngage WebSDK offers the capability to send push notifications to Google Chrome, Opera and Firefox browsers. There are some additional steps apart from integrating Segment's `analytics.js`.


### Integration

#### 1. Setup your MoEngage Web SDK settings at MoEngage Dashboard
Please setup the [web settings](https://app.moengage.com/v3/#/settings/push/web) on the MoEngage dashboard in order to start using MoEngage <> Segment integration.

If you have selected `HTTPS` mode of integration in the settings, there are some additional steps to be taken

#### 2. Set up for HTTPS websites
#### Download the required files (HTTPS only)
For HTTPS Web Push to work, you need to host two files in the `root` directory of your web server. These two files will be available for you to download at the [web settings page](https://app.moengage.com/v3/#/settings/push/web).
* manifest.json
* serviceworker.js

NOTE: Please make sure the name of the serviceworker file is exactly `serviceworker.js`. Please contact MoEngage support at support@moengage.com if you wish to have some other name for the serviceworker file.

#### Add link to manifest in HTML (HTTPS only)
Add the following line in the <head> tag of your page.

```
<head>
  ...
	<link rel="manifest" href="/manifest.json">
  ...
</head>
```

#### Use your existing manifest or serviceworker file (HTTPS only)
If you already have these files,

1. Manifest

Add the sender ID you saved on MoEngage dashboard as the `gcm_sender_id`. If you've used `MoEngage Shared Project` while setting up, your sender id is `540868316921`.

Please edit your `manifest.json` as follows:
```
{
  ...
  "gcm_sender_id": "GCM_SENDER_ID",
  ...
}
```
2. Service Worker

Just add the following line to the top of your `serviceworker.js` file
```
importScripts("//cdn.moengage.com/webpush/releases/serviceworker_cdn.min.latest.js?date="+
new Date().getUTCFullYear()+""+new Date().getUTCMonth()+""+new Date().getUTCDate());
```

### Identify
Use [Identify](https://segment.com/docs/sources/website/analytics.js/#identify) to track user specific attributes. It equivalent to [tracking user attributes](https://docs.moengage.com/docs/tracking-web-user-attributes) on MoEngage. MoEngage supports traits supported by Segment as well as custom traits.

### Track
Use [track](https://segment.com/docs/sources/website/analytics.js/#track) to track events and user behaviour in your app. This will send the event to MoEngage with the associated properties. Tracking events is essential and will help you create segments for engaging users.

### Reset
If your website supports the ability for a user to logout and login with a new identity, then you'll need to call [reset](https://segment.com/docs/sources/website/analytics.js/#reset-logout) method in `analytics.js`.

### Optional
There are some further optional features you can read about here:
* [Configure opt in type](https://docs.moengage.com/docs/configuring-notification-opt-in)
* [Self-handled opt-ins](https://docs.moengage.com/docs/self-handled-opt-ins)
* [SDK callbacks](https://docs.moengage.com/docs/tracking-opt-ins-on-your-own)

### Test Mode and Debugging
While updating the MoEngage settings on the Segment Dashboard, you can enable the logging functionality of the MoEngage SDK to see the SDK logs on the browser console. Just set `Enable Debug Logging` to `On` and the SDK will be loaded in debug mode.

NOTE: When debug mode is enabled, the events and attributes of the users are sent to the `TEST` environment of your MoEngage App.
