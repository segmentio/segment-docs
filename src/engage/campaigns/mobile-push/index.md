---
title: Mobile Push Onboarding
plan: engage-premier
---

This page walks you through the process of setting up mobile push notifications using Segment, Twilio, and Firebase/Apple Developer.

> info "Prerequisites"
> Please reach out to your CSM or AE prior to trying out this feature.
> This guide assumes familiarity with Swift and Kotlin and is intended for a developer audience. 

## Overview

You'll set up mobile push in four stages:

1. [Set up analytics for mobile push](#1-set-up-analytics-for-mobile-push).
2. [Add the Engage SDK plugin](#2-add-the-engage-sdk-plugin).
3. [Configure iOS push notifications](#3-configure-ios-push-notifications).
4. [Configure Android push notifications](#4-configure-android-push-notifications).
5. [Configure mobile push in Engage](#5-configure-mobile-push-in-engage).

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

## 2. Add the Engage SDK plugin

Next, you'll add the Engage SDK plugins for both iOS and Android to your application.   

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

### Instructions for Android

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

Next, you'll configure your iOS and Android push credentials for use with Twilio Notify and Twilio Notifications.  

## 3. Configure iOS push notifications

### 3a. Set up an App ID

Before you begin, log into your [Apple development account](https://developer.apple.com/account){:target="_blank"} and click on **Identifiers** under the **Certificates, Identifiers & Profiles** section. This will show a list of identifiers, including App IDs.

#### Option 1: Use an existing App ID

1. If your App ID is already on this list, click on it; a list of capabilities will pop up.
2. Check the **Push Notifications** option.
3. Ignore the **Configure** button for now. Click **Save**.

#### Option 2: Create a new App ID

1. If your App ID isn’t on this list, click the **+** symbol to add a new App ID.
2. Choose **App IDs** and click the **Continue** button.
3. Give your app a description.
4. Enter an Explicit Bundle ID that matches the bundle identifier (such as `com.twilio.notify.NotifyQuickstart`) of your app in Xcode.
5. Under **Capabilities**, check **Push Notifications**.
6. Click **Continue**.
7. Click **Register** to confirm and create your new App ID.

### 3b. Create a certificate

Next, you’ll create a push notification certificate, which lets your app receive notifications. You can either make a development certificate or a production certificate. This guide explains how to make a development certificate. Segment recommends that you use Xcode managed certificates.

#### Option 1: Use an Xcode managed certificate

1. In your Xcode project, go to the **General** pane of the target for your iOS application.
2. In the **Signing** section, check **Automatically manage signing**.
3. If you are using the Quickstart app and see a provisioning error message, you may need to rename the bundle ID to a unique identifier. To do so, [give your bundle a new name](https://developer.apple.com/account/resources/certificates/list){:target="_blank"}, then enter your new identifier in the **Identity** section of the General pane.
4. Go to the **Capabilities** tab and make sure that Push Notifications are enabled.
5. Verify that you successfully created your certificates:
- Sign in to the Apple developer portal and click on  **Certificates, IDs & Profile**. In the **Certificates** section, select **Development** or **Production**, depending on the type of certificate you want to verify.
- Alternatively, go to **Applications > Utilities > Keychain Access** and select **Certificates**. Search for `iPhone`, and verify that your certificate has a disclosure triangle, which indicates that your private key exists in the keychain.

#### Option 2: Manually create a certificate

Segment recommends that you use Xcode managed certificates for your application. If you prefer to create your certificate manually, follow these steps:

1. Add a certificate on the [Apple Developer Portal](https://developer.apple.com/account/resources/certificates/add){:target="_blank"}.
2. Under **Services**, select **Apple Push Notification service SSL (Sandbox & Production)**, then click **Continue**.
3. In the text box, select the App ID you previously created, then click **Continue**.
4. You're prompted to create a Certificate Signing Request (CSR) and given instructions on how to do it. Create one.
5. Once you've created a CSR, click **Continue**.
6. Upload the CSR, then click **Generate** to generate your certificate.

You just created an Apple Development iOS Push Services certificate, which you can now download and double-click to add to your Mac’s keychain.

### 3c. Create a credential for Twilio

1. On your Mac, go to **Applications > Utilities > Keychain Access**, then select **My Certificates**.
2. Right-click your new certificate. It should be labeled **Apple Development iOS Push Services**.
3. Choose **Export**.
4. Save your credential file as `cred.p12`; leave the password blank.

You'll extract your certificate key and private key from this file — you need these two keys to create a Twilio credential. First, run this command in Terminal:

```zsh
openssl pkcs12 -in cred.p12 -nokeys -out cert.pem -nodes
```

`cert.pem` is your certificate key file. Next, run the following command in the terminal:

```zsh
openssl pkcs12 -in cred.p12 -nocerts -out key.pem -nodes
```

`key.pem` is your private key file. Next, run this command to process this key:

```zsh
openssl rsa -in key.pem -out key.pem
```

You can now paste your credentials into the modal found in the Twilio Console. Make sure that you strip anything **outside** of the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` boundaries and outside of the `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` boundaries before pasting your credentials. Check the **Sandbox** button if you made a development certificate. Sandbox is synonymous with development mode.

> warning ""
> Once you save a credential, the `CERTIFICATE` and `PRIVATE KEY` fields are hidden for security reasons.

After you've pasted your credentials, click **Save**. You should see an SID appear on the new page; copy it to your clipboard, as you'll need it in the next step.


### 3d. Configure your Twilio Service to use your APNS credentials 

Twilio lets you build multiple applications within a single account. To separate those applications, you need to create Service instances that hold all the data and configuration for a given application.

To do so, you'll need to configure your Service instance to use the Credential that contains your APNS certificate and private key. You can do that using the Services page in the Console. You’ll need to update your Service with the Twilio Push Credential SID.

If you're just getting started, set up the APN credential first, then create your Service by clicking the blue plus button on the [Services Console](https://console.twilio.com/us1/develop/notify/services?frameUrl=%2Fconsole%2Fnotify%2Fservices%3Fx-target-region%3Dus1&_ga=2.170545120.1341805708.1700099403-1979911827.1631664239&_gl=1*1msrgrt*_ga*MTk3OTkxMTgyNy4xNjMxNjY0MjM5*_ga_RRP8K4M4F3*MTcwMDEwNTYwOC45Ny4xLjE3MDAxMDU2MjAuMC4wLjA.){:target="_blank"} page.

For more information, view Twilio's [How to Configure iOS Push Notifications documentation](https://www.twilio.com/docs/notify/configure-ios-push-notifications){:target="_blank"}.

## 4. Configure Android push notifications 

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
> Follow the steps in 5a only if you're new to Twilio Engage Premier. If you've already [configured messaging services](/docs/engage/onboarding/#generate-an-api-key-and-select-your-messaging-services) as part of Twilio Engage Premier onboarding, you can skip to 5b.

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

> info ""
> After creating the messaging service, it cannot be directly removed from the space. To remove the messaging service, you have to edit the Twilio account credentials by clicking the pencil icon. Enter the account credentials (use the API key secret if you remember or create a new API key). Once you've selected the desired services, they will override the existing ones, effectively removing the ones you no longer need.

### 5b. Create a new push service

Complete mobile push onboarding by creating a new push service:

2. In your Segment workspace, navigate to **Engage > Engage settings**.
3. Click the pencil icon next to **Messaging services**, then click **Create new push service**.
    - If you don't see the pencil icon, select **Create new push service**.
4. Name the push service, select or create APN and FCM credentials, then click **Create Push Service**.
5. Your new messaging service appears in the **Add messaging services** dropdown. Select it, then click **Save**.

## Build a mobile push template

Now that you've completed mobile push setup, you're ready to [build a mobile push template](/docs/engage/content/mobile-push/).
