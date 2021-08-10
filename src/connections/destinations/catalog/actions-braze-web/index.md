---
title: Braze Web-mode (Actions) Destination
hide-boilerplate: true
hide-dossier: true
hidden: true
---
{% include content/plan-grid.md name="actions" %}

[Braze](https://www.braze.com/){:target="_blank"}, formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.

> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Amplitude Segment destination. There's also a page about the [non-Actions Amplitude destination](/docs/connections/destinations/catalog/amplitude/). Both of these destinations receive data _from_ Segment. There's also the [Amplitude Engage Segment source](/docs/connections/sources/catalog/cloud-apps/amplitude-cohorts/), which sends data _to_ Segment!

## Benefits of Braze Web-mode (Actions) vs Braze Classic

Braze Web-mode (Actions) provides the following benefits over the classic Braze destination:
- **Fewer settings**. Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer mapping of data**. Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to the destination.
- ...

## Getting started
1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click the "Braze Web-mode (Actions)" item to select it and click **Configure**.
4. Choose which of your sources to connect the destination to.
5. On the next page enter your Amplitude API key and Secret key and click **Verify credentials**.
6. Next, choose how to create the mapping. You can click Quick Setup to use the defaults provided by Segment, or click Customized Setup to start from a blank mapping.


### iOS

1. Add the Braze Segment Pod to your `Podfile`:

    ```objc
    pod 'Segment-Appboy'
    ```

    Use the latest version of the Braze Segment Pod available on [CocoaPods](https://cocoapods.org/pods/Segment-Appboy) to ensure you have the must up-to-date features and bug fixes.

2. Next, declare Braze's destination in your app delegate instance:

    ```objc
      SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY_HERE"];
      [config use:[SEGAppboyIntegrationFactory instance]];
      [SEGAnalytics setupWithConfiguration:config];
    ```

    [Here](https://github.com/Appboy/appboy-segment-ios/blob/master/CocoapodsExample/Segment-Appboy/SEGAppDelegate.m) is a sample project which shows how to integrate the above.

#### Sample App

Braze created a sample iOS application that integrates Braze using Segment. See the Braze [GitHub repository](https://github.com/Appboy/appboy-segment-ios/tree/master/CocoapodsExample) for more information.

#### Device-mode set up for iOS 14 support

Braze updated the Braze iOS Segment SDK to 3.26.1 to prepare for iOS 14. As of version 3.27.0, Braze removed the `ABK_ENABLE_IDFA_COLLECTION` macro. To configure sending ISFA to Braze, see Braze's [Implementing IDFA Collection](https://www.braze.com/docs/developer_guide/platform_integration_guides/ios/initial_sdk_setup/other_sdk_customizations/#ios-14-apptrackingtransparency) documentation.

To use the latest Braze SDK to collect IDFAs you must do the following:

1. Upgrade to use Xcode12.
2. Update the Braze iOS Segment SDK to version 3.3.0 or greater.
3. Import and add the AppTrackingTransparency (ATT) Framework.
   - Navigate to your project `Info.plist` and add a “Privacy - Tracking Usage Description”. This description appears in a popup when the application initializes in iOS 14. Applications prompt users to select if they want to allow tracking.
4. Add Braze's `ABKIDFADelegate`. For more information on how to add this see [Braze’s IDFA Collection documentation](https://www.braze.com/docs/developer_guide/platform_integration_guides/ios/initial_sdk_setup/other_sdk_customizations/#implementing-idfa-collection).
5. Follow [Segment's guide for collecting IDFA](/docs/connections/sources/catalog/libraries/mobile/ios/#idfa-collection-in-40-beta-and-later)

### Android

1. In the top-level project `build.gradle` add the following as a repository in *all projects > repositories*.

    ```js
    maven { url "http://appboy.github.io/appboy-android-sdk/sdk" }
    maven { url "http://appboy.github.io/appboy-segment-android/sdk" }
    ```

2. Add the Braze Segment destination dependency to your app `build.gradle`:

    ```js
   compile 'com.appboy:appboy-segment-integration:+'
   ```

    To ensure you have the most up-to-date features and bug fixes, use the latest version available on [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22appboy-segment-integration%22).

    **Note:** The `groupId` is `com.appboy` and not `com.segment.analytics.android.integrations`.

3. Next, declare Braze's destination in your `Analytics` instance:

  ```js
  Analytics analytics = new Analytics.Builder(context, "YOUR_WRITE_KEY_HERE")
    .use(AppboyIntegration.FACTORY)
    ...
   .build();
  ```

### React Native device-mode set up

<!-- LR, Mar2021: this should be a `react-dest` include but Braze was originally called Appboy-->

To add the Braze device-mode SDK to a [React Native](/docs/connections/sources/catalog/libraries/mobile/react-native/) project:
1. Navigate to the root folder of your project, and run a `yarn add appboy` command to add the destination SDK to your project.
2. Add an `import` statement to your project, as in the example below.
   ```js
   import Braze from '@segment/analytics-react-native-appboy'
   ```
3. In the same project file, add the destination to the `using` list in the `await` command.
   ```js
   await analytics.setup('YOUR_WRITE_KEY', {
     // Add any of your Device-mode destinations. This ensures they load before continuing.
     using: Braze
     // ...
   })
   ```
4. Change to your iOS development folder ( `cd ios` ) and run `pod install`.


> note ""
> Braze was formerly known as "Appboy", and the Braze React component still uses that name. Be sure to use the old name!

## Important differences from the classic Braze destination

The classic version of the Braze destination provided a single destination for all connection modes. With Actions, there are two destinations available, depending on the connection mode:
- Braze Web Mode (Actions)
- [Braze Cloud Mode (Actions)](/docs/connections/destinations/catalog/actions-braze-cloud)

The two destinations provide a unique set of actions to match the mode through which they connect to the source.
