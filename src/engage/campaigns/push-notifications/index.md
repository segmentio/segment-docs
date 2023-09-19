---
title: Push Notifications Onboarding
plan: engage-premier
---

This page walks you through the process of setting up mobile push notifications using Segment, Twilio, and Firebase/Apple Developer.

> info "Before you begin"
> Push notifications in Engage rely on several dependencies. This page provides a high-level overview of the steps required to set up these dependencies and links to the documentation you'll need to follow to complete setup and configuration. 

## Overview

You'll set up push notifications in four steps:

1. [Set up analytics for push notifications](#1-set-up-analytics-for-push-notifications).
2. [Add the Engage SDK plugin](#2-add-the-engage-sdk-plugin).
3. [Configure push credentials](#3-configure-push-credentials).
4. [Configure push notifications in Engage](#4-configure-push-notifications-in-engage).

## 1. Set up analytics for push notifications

Before you can send push notifications, you'll need to set up analytics. In this step, you'll integrate Segment's mobile SDK into your app.

### Add the Segment base SDK

This section outlines the process for adding Segment's base SDK to your app, including the Analytics Kotlin, Analytics-Swift, and React Native libraries.

#### Kotlin

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
3. Use yarn or npm to install `@segment/analytics-react-native`, `@segment/sovran-react-native` and `react-native-get-random-values`.
4. Initialize and configure the Analytics React Native client.

For detailed instructions on integrating Analytics for React Native, follow the steps in the [Analytics for React Native getting started section](/docs/connections/sources/catalog/libraries/mobile/react-native#getting-started). 

## 2. Add the Engage SDK Plugin

Next, you'll add the Engage SDK Plugin to your application. 

### Instructions for iOS

These are the high-level steps required to add the Engage Plugin for iOS:

1. Add the Engage SDK Plugin dependency in your `package.swift` file or using Xcode's Swift packages.
2. Add or modify the methods in the [Additional setup section](https://github.com/segment-integrations/analytics-swift-engage#additional-setup){:target="_blank"} of Segment's Twilio Engage Plugin documentation.

The previous steps are required. For detailed instructions on adding the Engage SDK Plugin for iOS, as well as for configuration options, follow the steps in the [getting started section](https://github.com/segment-integrations/analytics-swift-engage#getting-started){:target="_blank"} of Segment's Twilio Engage Plugin documentation on GitHub.


### Instructions for Android

Follow the instructions in the [getting started section](https://github.com/segment-integrations/analytics-kotlin-engage#getting-started){:target="_blank"} of Segment's Twilio Engage Destination documentation on GitHub.


## 3. Configure push credentials

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

## 4. Configure push notifications in Engage

> success ""
> If you've already configured SMS services for Twilio Engage, you can skip this setp.

To set up push notifications in Twilio Engage and complete push notifications onboarding, follow the steps in the [Create and configure Twilio SMS services documentation](/docs/engage/onboarding/#stage-3-create-and-configure-twilio-sms-services).

## 5. Build a mobile push template

Now that you've completed push notifications setup, you're ready to [build a mobile push template](/docs/engage/content/mobile-push/).