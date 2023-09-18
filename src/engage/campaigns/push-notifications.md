---
title: Push Notifications
plan: engage-premier
---

This page walks you through the process of setting up mobile push notifications using Segment, Twilio, and Firebase/Apple Developer.

## Before you begin

Push notifications in Engage rely on several dependencies. This page provides a high-level overview of the steps required to set up these dependencies and links to the documentation you'll need to follow to complete setup and configuration. 

## Overview

## 1. Set up analytics for push notifications

Before you can send push notifications, you'll need to set up analytics to track user interactions. In this step, you'll integrate Segment's mobile SDK into your app.

### Add the Segment base SDK

This section outlines the process for adding Segment's base SDK to your app, including the Analytics Kotlin, Analytics Swift, and React Native libraries.

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

For detailed instructions on integrating Analytics for React Native, follow the steps in the [Analytics for React Native started section](/docs/connections/sources/catalog/libraries/mobile/react-native#getting-started).

## Add the Engage SDK Plugin

Next, you'll add the Engage SDK Plugin to your application. 

### Instructions for iOS

These are the high-level steps required to add the Engage Plugin for iOS:

1. Add the Engage SDK Plugin dependency in your `package.swift` file or using Xcode's Swift packages.
2. Add or modify the methods in the [Additional setup section](https://github.com/segment-integrations/analytics-swift-engage#additional-setup){:target="_blank"} of Segment's Twilio Engage Plugin documentation.

The previous steps are required. For detailed instructions on adding the Engage SDK Plugin for iOS, as well as for configuration options, follow the steps in the [getting started section](https://github.com/segment-integrations/analytics-swift-engage#additional-setup){:target="_blank"} of Segment's Twilio Engage Plugin documentation on GitHub.


### Instructions for Android

1. Follow the instructions in the [getting started section](https://github.com/segment-integrations/analytics-kotlin-engage#getting-started){:target="_blank"} of Segment's Twilio Engage Destination documentation on GitHub.


## Configure Firecloud/Firebase or Apple Developer

