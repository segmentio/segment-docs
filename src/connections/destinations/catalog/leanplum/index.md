---
title: Leanplum Destination
rewrite: true
id: 54521fd925e721e32a72eece
---
[Leanplum](https://www.leanplum.com/) helps mobile teams orchestrate multi-channel campaigns — from messaging to the in-app experience — all from a single mobile marketing platform.

> success ""
> **Good to know**: This page is about the Leanplum Segment destination, which receives data from Segment. There's also a page about the [Leanplum Segment source](/docs/connections/sources/catalog/cloud-apps/leanplum/), which sends data _to_ Segment!


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Leanplum" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Navigate to your "App Settings" within the Leanplum UI and open up your "Keys & Settings"
4. Copy the "App ID" into the Segment Settings UI under "Leanplum Application ID"
5. We recommend creating 2 Leanplum Destinations, 1 for production and 1 for development.
6. Copy the "Production" or "Development" value into the corresponding Leanplum destination and add it to the Segment Settings UI under "Leanplum Client Key" depending on your chosen environment.

If you have opted to use our [server-side sources](/docs/connections/sources/#server), we will begin passing data through our servers or from your users' devices to Leanplum within minutes after you enable it on your source destinations page.

In order to use Leanplum's Push Notifications, Messaging channels or A/B testing in your mobile app, you will need to use our [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) or [Android](/docs/connections/sources/catalog/libraries/mobile/android/) SDKs. Read on to find out how to set this up.

### iOS

CocoaPods is the dependency manager we use for Objective-C projects. If you already have CocoaPods installed and have a podfile, skip to step 3.

1. Install CocoaPods by running the following command:

    `sudo gem install cocoapods`

    For issues with installing CocoaPods, refer [here](https://cocoapods.org/)

2. Add a podfile. In your terminal, navigate to your app's directory. Add a podfile to your app by running the following command:

    `pod init `

3. Open your podfile by running the following command:

    `open -a Xcode Podfile`

4. Insert the following line of code into your Podfile:

    `pod 'LeanplumSegment', '~> 1.0.1' `

5. Now, install the SDK by running the following command:

    `pod install`

6. Import the `LeanplumSegment` integration:

    `#import <LeanplumSegment/SEGLeanplumIntegrationFactory.h> `

    Add the following lines into your AppDelegate:

    ```objc
    String *const SEGMENT_WRITE_KEY = @" [YOUR_SEGMENT_WRITE_KEY] ";
    SEGAnalyticsConfiguration *config =
        [SEGAnalyticsConfiguration configurationWithWriteKey:SEGMENT_WRITE_KEY];
    [config use:[SEGLeanplumIntegrationFactory instance]];
    [SEGAnalytics setupWithConfiguration:config];
    ```

    Make sure to place your Segment Write Key within the code. This block of code also calls for Leanplum start.

For addition documentation you can also check [Leanplum docs](https://support.leanplum.com/hc/en-us/articles/213146343-App-Setup-How-to-integrate-Segment-Leanplum-iOS-).

### Android

1. Install the Segment-Leanplum Android SDK by adding the following maven URL to your project `build.gradle` file:

    ```groovy
    allprojects {
        repositories {
            jcenter()
            maven {
              url "http://www.leanplum.com/leanplum-sdks/"
            }
        }
    }
    ```

2. Install the Segment-Leanplum integration by adding these lines to your module's `build.gradle` file:

    ```groovy
    dependencies {
      compile 'com.segment.analytics.android:analytics:4.0.4'
      compile 'com.leanplum.segment:LeanplumIntegration:1.1.0'
    }
    ```

3. Add the following permissions to your applications AndroidManifest.xml:

    ```xml
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="android.permission.INTERNET"/>
    ```

    If you want to use the advanced features of Leanplum, also add the additional permissions, as described [here](https://www.leanplum.com/docs#/setup/android).

4. Add the following lines to your Application or Controller:

    ```java
    private static final String SEGMENT_WRITE_KEY = " ... ";

    Analytics analytics = new Analytics
      .Builder(getApplicationContext(), SEGMENT_WRITE_KEY)
      .use(LeanplumIntegration.FACTORY)
      .build();
    ```

    _**Note:** There is no need to explicitly call `Leanplum.start`, as it is called within the `LeanplumIntegration`._

5. In addition to that you can also use the advanced features of Leanplum. Once the Leanplum SDK is successfully registered, Segment executes a callback:
    ```java
    analytics.onIntegrationReady(LeanplumIntegration.LEANPLUM_SEGMENT_KEY,
        new Analytics.Callback() {
          @Override
          public void onReady(Object instance) {
            Leanplum.addVariablesChangedHandler( ... );
          }
        });
    ```

That's it! Now you can use the Segment SDK and also the [advanced features](https://www.leanplum.com/docs#/docs) of the Leanplum SDK.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```javascript
analytics.page()
```

When you call `page` as a user moves to a new area, you can advance your user's 'state' through your application. We will call Leanplum's `advance` method when this happens.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:
```javascript
analytics.identify({
  userId: 'user123',
  traits: {
    name: 'Michael Bolton',
    gender: 'male'
  }
})
```

As soon as a user logs-in or signs-up, you'll want to make an `identify` call which takes the `userId` of a user and any `traits` you know before setting them in Leanplum.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:
```javascript
analytics.track({
  userId: 'user123',
  event: 'Item Purchased',
  properties: {
    revenue: 39.95,
    shippingMethod: '2-day'
  }
})
```
Calling a `track` event will log a user event with Leanplum so that you can figure out how to increase engagement, virality, or whatever key action is critical to your business.

## Additional Features
The features listed below are only supported if you have installed our [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) or [Android](/docs/connections/sources/catalog/libraries/mobile/android/) SDKs.

### Push Notifications

As every analytics provider deals with push notifications and in-app messaging differently, we currently don't support them out of the box. To use these features with your Leanplum account, you can add a couple of small code snippets to your app, then you're ready to go!

#### iOS
1. Login to the iOS provisioning portal.

2. In the Identifiers > App IDs, select your app, click Edit, and enable Push Notifications.

3. Click Create Certificate for each of the Development and Production certificates and follow the onscreen instructions. You should not reuse existing certificates so that we can track delivery failures properly.

4. Download your new certificate files from your browser. Open the files on your computer, which will launch Keychain.

5. In Keychain, select the new certificates, expand them to view the private key, and then right click to export them as .p12 files. You must enter a password.

6. In Leanplum, go to your app's Keys & Settings (App Settings > {Your app} > Keys & Settings). Under Push Notifications, upload your .p12 files to Leanplum and enter your passphrase from step 5 above.

7. Configure your app to use push notifications in your app delegate's `applicationDidFinishLaunching` method (you may choose any combination of formats.


You are now ready to send push notifications from your Leanplum UI! If you need some code snippets, [check out the Leanplum docs here](https://www.leanplum.com/docs/ios/messaging#push-notifications).

#### Android

1. Copy the permissions XML below into the AndroidManifest.xml and insert your package name into the name fields where it says [com.YOUR_PACKAGE].

  ```xml
      <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="[com.YOUR_PACKAGE]" xmlns:tools="http://schemas.android.com/tools">
      <uses-sdk
        android:minSdkVersion="16"
        tools:overrideLibrary="com.leanplum, com.google.android.gms"/>
      <uses-permission android:name="android.permission.GET_ACCOUNTS"/>
    <!-- Optional. Prevents the device from sleeping when a message is received. -->
      <uses-permission android:name="android.permission.WAKE_LOCK"/>
      <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
      <uses-permission android:name="android.permission.INTERNET"/>
  ```

2. Add the receiver XML below into the same manifest file and replace [com.YOUR_PACKAGE] with your package name.

  ```xml
    <receiver
        android:name="com.leanplum.GcmBroadcastReceiver"
        android:permission="com.google.android.c2dm.permission.SEND" >
        <intent-filter>
            <action android:name="com.google.android.c2dm.intent.RECEIVE" />
            <action android:name="com.google.android.c2dm.intent.REGISTRATION" />
            <category android:name="[com.YOUR_PACKAGE].gcm" />
        </intent-filter>
    </receiver>
  ```

3. Register your service in the manifest file using the below code.

  ```xml
    <service android:name="com.leanplum.LeanplumPushService" />
  ```

We've put together two example projects for sending push notifications through GCM and Firebase for you to check out:
 - [LP-Segment-GCM-Example](https://github.com/Leanplum/Leanplum-Android-Samples/tree/master/SegmentExample)
 - [LP-Segment-Firebase-Example](https://github.com/Leanplum/Leanplum-Android-Samples/tree/master/SegmentExample_Firebase)


### A/B Testing

As with push notifications, A/B testing variables are dealt with in different ways by each of our destinations. Leanplum only requires two lines of code for each of your variables to get you set up!

#### iOS

1. Set the value with the macro `DEFINE_VAR_FLOAT` in ObjC, or `LPVar.define` in Swift. To access the value in your code, use the `floatValue` method. This should be set any time before calling `Leanplum.start`.

  ```
// Objective-C
  DEFINE_VAR_FLOAT(shootSpeed, 1.0);  // How fast your ship shoots.
    ...
    [Leanplum onVariablesChanged:^() {
      // Move ship according to its speed.
      [myShip moveWithSpeed:shootSpeed.floatValue];
    }];
  ```

  ```
  // Swift
  var shootSpeed = LPVar.define("shootSpeed", with:1.0); // How fast your ship shoots.
    ...
    Leanplum.onVariablesChanged {
    // Move ship according to its speed.
      myShip.moveWithSpeed(shootSpeed?.floatValue())
    }
  ```
For more information about A/B Testing Variables on iOS in Leanplum, [see their docs](https://www.leanplum.com/docs/ios/variables).

2. If you want to define any other type of data, Boolean, String, Color, Assets, Dictionary, or Array, take a look at [the Leanplum docs here](https://www.leanplum.com/docs/ios/variables#modeling-structured-data)


#### Android

1. Define your variable using var.define any time before calling `Leanplum.start`.

  ```java
    static Var<String> welcomeLabel = Var.define("welcomeLabel", "Welcome!");
  ```

2. Register a valueChangedHandler on that variable.

  ```java
    welcomeLabel.addValueChangedHandler(new VariableCallback<String>() {
      @Override public void handle(Var<String> stringVar) {
        stringVar.value();
      }
    });
  ```

For more information about A/B Testing Variables on Android in Leanplum, [see their docs](https://www.leanplum.com/docs#/docs/android).
