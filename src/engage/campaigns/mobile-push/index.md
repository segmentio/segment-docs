---
title: Mobile Push Onboarding
plan: engage-premier
---

This page walks you through the process of setting up mobile push notifications using Segment, Twilio, and Firebase/Apple Developer.

> info "Prerequisites"
> This guide assumes familiarity with Swift and Kotlin and is intended for a developer audience. 

## Overview

You'll set up mobile push in four stages:

1. [Set up analytics for mobile push](#1-set-up-analytics-for-mobile-push).
2. [Add the Engage SDK plugin for iOS](#2-add-the-engage-sdk-plugin-for-ios).
3. [Add the Engage SDK plugin for Android](#3-add-the-engage-sdk-plugin-for-android).
4. [Configure push credentials](#3-configure-push-credentials).
5. [Configure mobile push in Engage](#4-configure-mobile-push-in-engage).

## 1. Set up analytics for mobile push

Before you can send mobile pushes, you'll need to set up analytics. In this step, you'll integrate Segment's mobile SDK into your app.

### Add the Segment base SDK

This section outlines the process for adding Segment's base SDK to your app, including the Analytics Kotlin, Analytics-Swift, and React Native libraries.

#### Kotlin

> info ""
> You must initialize your Analytics instance in the Application class, otherwise you may experience issues with customization and delivery confirmation.

Follow these steps to integrate Analytics Kotlin:

1. Create a source by navigating to **Connections > Sources > Add Source**.
2. Search for **Kotlin (Android)**, then click **Add source**.
3. Add the Analytics dependency to your `build.gradle` file.
4. Initialize and configure the client according to your requirements.
5. Add the following permissions to `AndroidManifest.xml`:

```java
 <uses-permission android:name="android.permission.INTERNET"/>
 <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

```

For detailed instructions on integrating Analytics Kotlin, follow the steps in the [Analytics Kotlin getting started section](/docs/connections/sources/catalog/libraries/mobile/kotlin-android#getting-started).


#### Swift

Follow these steps to integrate Analytics-Swift for iOS & Apple:

1. Create a source by navigating to **Connections > Sources > Add Source**.
2. Search for **Apple**, then click **Add source**.
3. Add the Analytics dependency to your application using either Swift package manager or Xcode.
4. Initialize and configure the Analytics-Swift client.

For detailed instructions on integrating Analytics-Swift, follow the steps in the [Analytics-Swift getting started section](/docs/connections/sources/catalog/libraries/mobile/apple#getting-started).

#### React Native

Follow these steps to integrate the React Native library:

1. Create a source by navigating to **Connections > Sources > Add Source**.
2. Search for **React Native**, then click **Add source**.
3. Use yarn or npm to install `@segment/analytics-react-native`, `@segment/sovran-react-native`, and `react-native-get-random-values`.
4. Initialize and configure the Analytics React Native client.

For detailed instructions on integrating Analytics for React Native, follow the steps in the [Analytics for React Native getting started section](/docs/connections/sources/catalog/libraries/mobile/react-native#getting-started). 

## 2. Add the Engage SDK plugin for iOS

Next, you'll add the Engage SDK plugins for both iOS and Android to your application. This section covers iOS.

### Instructions for iOS

Now that you've integrated Analytics-Swift, follow the steps in this section to add the Engage Plugin for iOS.

#### 2a. Add the Engage SDK plugin dependency

You can add the Engage SDK plugin using either Xcode or `Package.swift`.

**Instructions for adding the plugin with Xcode**

1. In the Xcode `File` menu, click **Add Packages**. 
2. In the Swift packages search dialog, enter the following URL:

    ```
    https://github.com/segment-integrations/analytics-swift-engage
    ```

3. You'll then have the option to pin to a version or a specific branch, as well as to the project in your workspace. Once you've made your selections, click `Add Package`.

**Instructions for adding the plugin with `Package.swift`**

1. Open the `Package.swift` file and add the following to the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-engage.git",
            from: "1.1.2"
        ),
```

#### 2b. Import the plugin 

1. Import the plugin in the file where you configure your Analytics instance:

    ```
    import Segment
    import TwilioEngage // <-- Add this line.
    ```

2. After your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline:

    ```
    let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                        .flushAt(3)
                        .trackApplicationLifecycleEvents(true))

    let engage = TwilioEngage { previous, current in
        print("Push Status Changed /(current)")
    }

    analytics.add(plugin: engage)
    ```

3. To start receiving and handling mobile push notifications, add or modify the following methods in your `AppDelegate`:

```swift
   func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    //Add the following:

        let center  = UNUserNotificationCenter.current()
        center.delegate = self
        center.requestAuthorization(options: [.sound, .alert, .badge]) { (granted, error) in
            guard granted else {
                Analytics.main.declinedRemoteNotifications()
                Tab1ViewController.addPush(s: "User Declined Notifications")
                return
            }
            DispatchQueue.main.async {
                UIApplication.shared.registerForRemoteNotifications()
            }
        }
        
        // The following conditional statement is necessary to handle remote notifications in older versions of iOS.
        if let notification = launchOptions?[UIApplication.LaunchOptionsKey.remoteNotification] as? [String: Codable] {
            Tab1ViewController.addPush(s: "App Launched via Notification \(notification)")
            Analytics.main.receivedRemoteNotification(userInfo: notification)
        }

        ...

        return true
}

func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    // Segment event to register for remote notifications
    Analytics.main.registeredForRemoteNotifications(deviceToken: deviceToken)
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    // Segment event for failure to register for remote notifications
    Analytics.main.failedToRegisterForRemoteNotification(error: error)
}

func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any]) async -> UIBackgroundFetchResult {
    // Segment event for receiving a remote notification
    Analytics.main.receivedRemoteNotification(userInfo: userInfo)

    // TODO: Customize notification handling based on the received userInfo.
    // Implement actions or UI updates based on the notification content.

    return .noData
}

func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse) async {
    let userInfo = response.notification.request.content.userInfo
    //Segment event for receiving a remote notification
    Analytics.main.receivedRemoteNotification(userInfo: userInfo)

    // TODO: Customize notification response handling based on the received userInfo.
    // Implement actions based on the user's response to the notification.
    // Example: Navigate to a specific screen or perform an action based on the notification.

}
```

The previous steps are required. For configuration options, including subscription statuses and media handling, visit the [getting started section](https://github.com/segment-integrations/analytics-swift-engage#getting-started){:target="_blank"} of Segment's Twilio Engage Plugin documentation on GitHub.

## 3. Add the Engage SDK plugin for Android

Now, you'll add the Engage SDK plugin for Android to your application. 

### 3a. Add the Engage SDK plugin dependency

Now that you've integrated Analytics for Kotlin, follow these steps to add the Engage Plugin for Android:

1. Add the following to your Gradle dependencies:

    ```groovy
        implementation 'com.segment.analytics.kotlin.destinations:engage:<LATEST_VERSION>'
    ```

2. Add the following service to the `application` tag of your `AndroidManifest.xml` file:

    ```xml
        <service
            android:name="com.segment.analytics.kotlin.destinations.engage.EngageFirebaseMessagingService"
            android:exported="true">
            <intent-filter>
            <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
            <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
    ```

3. Add this plugin to your Analytics instance:

    ```kotlin
        analytics.add(TwilioEngage(applicationContext))
    ```

The previous steps are required. For configuration options, including subscription statuses and customized actions, visit the [getting started section](https://github.com/segment-integrations/analytics-kotlin-engage#getting-started){:target="_blank"} of Segment's Twilio Engage Destination documentation on GitHub.

### 3b. Additional Android setup

You'll also need to configure how your app responds to push behaviors, like tracking when a user opens a push notification.

#### Track `push opened` 

The following code tracks the `push opened` event.  Add it to your code when you create your intent:

```kotlin
putExtra("push_notification", true)
customization.remoteMessage.data.forEach { (key, value) ->
    putExtra(key, value)
}
```

#### Handle in-app URL opening

If you send a push notification that contains a URL, you might want the URL to open the app when a user opens the notification. Follow these steps to set that up:

1. Add the following [web link filter](https://developer.android.com/training/app-links#web-links){:target="_blank"} to your `AndroidManifest.xml` file:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:host="<yourpersonaldomain.com>"
        android:scheme="https" />
</intent-filter>
```

2. Next, implement an in-app browser using WebView:

```kotlin
intent?.extras?.getString("link")?.let {
    myWebView.loadUrl(it)
}
```

After you've set up in-app URL opening, your app will open when users tap on the push. Once the app opens, users will select either `Just once` or `Set to always open`, and the URL you chose will open as a web page in your app.

For more information, view [click behaviors](/docs/engage/content/mobile-push/#click-behaviors).

## 4. Configure push credentials

In this step, you'll configure your iOS and Android push credentials for use with Twilio Notify and Twilio Notifications.  

### Configure iOS push notifications

Follow the steps in Twilio's [How to Configure iOS Push Notifications documentation](https://www.twilio.com/docs/notify/configure-ios-push-notifications){:target="_blank"}.

### Configure Android push notifications 

Follow the steps in Twilio's [Configuring Android Push Notifications](https://www.twilio.com/docs/notify/configure-android-push-notifications){:target="_blank"}.

During Step 5, [Upload your API Key to Twilio](https://www.twilio.com/docs/notify/configure-android-push-notifications#step-5-upload-your-api-key-to-twilio){:target="_blank"}, follow these steps:

1. In the Firebase console, click the **Cloud Messaging** tab.
2. Select the three dots menu next to **Cloud Messaging API (Legacy) Disabled**, then select **Manage API in Google Cloud Console**. A new window opens.
3. In the new Cloud Messaging window, select **Enable**.
4. Return to the Firebase Cloud Messaging tab and refresh the page.
5. Cloud Messaging API (Legacy) is now enabled. Copy the server key; you'll need it later.

With your server key copied, finish steps 5 and 6 in the Twilio documentation.

## 5. Configure mobile push in Engage

Follow these steps to set up mobile push in Twilio Engage.

### 5a. Set up Twilio credentials

> success ""
> Follow the steps in 4a only if you're new to Twilio Engage Premier. If you've already [configured messaging services](/docs/engage/onboarding/#generate-an-api-key-and-select-your-messaging-services) as part of Twilio Engage Premier onboarding, you can skip to 4b.

1. In your Twilio console, select the **Account** dropdown menu, then **API keys & tokens**.
2. On the Auth tokens & API keys page, click **Create API key**.
3. Enter a name for the API key in the **Friendly name** field.
4. Set the region to **United States (US1) - Default** and key type to **Main**.
5. Click **Create API Key**.
6. Copy and save both the **SID** and **Secret** field contents.
7. Return to the API keys & tokens page. In the **Live credentials** section, copy the Account SID credentials.
8. Return to your Segment workspace and navigate to **Engage > Engage settings > Channels**.  Under **SMS Service with Twilio**, click the **Get Started** button. The **Set up and validate your Twilio account** page appears.
11. Under **Enter your Twilio API Key information**, paste the Account SID, API Key SID, and API Key Secret you copied above into their corresponding fields.
12. Click **Verify**, then select the messaging services you want to use in your space.
13. Click **Save Twilio Account.**

### 5b. Create a new push service

Complete mobile push onboarding by creating a new push service:

1. In your Segment workspace, navigate to **Engage > Engage settings**.
2. Click the pencil icon next to **Messaging services**, then click **Create new push service**.
    - If you don't see the pencil icon, select **Create new push service**.
3. Name the push service, select or create APN and FCM credentials, then click **Create Push Service**.
4. Your new messaging service appears in the **Add messaging services** dropdown. Select it, then click **Save**.

## Next step: build a mobile push template

Now that you've completed mobile push setup, you're ready to [build a mobile push template](/docs/engage/content/mobile-push/).