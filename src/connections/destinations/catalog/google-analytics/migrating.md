---
title: Migrating mobile analytics from Google Analytics to Firebase
strat: google
---


## Deprecating Mobile SDKs

Using Segment's Google Analytics mobile SDKs you could previously measure and optimize user engagement with your mobile-apps. On October 31st 2019, Google is sunsetting the Google Analytics mobile-apps reporting based on the Google Analytics Services SDKs for Android and iOS. This means all data collection and processing for properties that receive data from the Google Analytics Service SDK for mobile apps will stop. Google is deprecating Google Analytics in favor of Firebase SDKs. View the [migration tutorial below](#migrating-deprecated-google-analytics-mobile-sdks-to-firebase) to learn more about how to migrate your Google Analytics mobile-apps to Segment's Firebase SDK.


### Providing Required Field Display Name

Google Analytics requires the `context.app.name` passed in each call. Since the `analytics-ios` SDK pulls it in [locally](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/20001431-110725), you may see the error "`context.app.name` required" if you are not providing a `CFBundleDisplayName` within your **Info.plist** file.

To resolve this error, ensure you [provide a localized info dictionary](https://github.com/segmentio/analytics-ios/blob/760be85a5119c2e8bd31a745ce2ec30385a0ad69/Pod/Classes/Internal/SEGSegmentIntegration.m#L110) as outlined [here](https://developer.apple.com/library/ios/qa/qa1823/_index.html).



## Migrating Deprecated Google Analytics Mobile SDKs to Firebase


### What's happening with Google Analytics Mobile SDKs?

On October 31st 2019, Google is sunsetting the Google Analytics mobile-apps reporting based on the Google Analytics Services SDKs for Android and iOS. This means all data collection and processing for properties that receive data from the Google Analytics Service SDK for mobile apps will stop. Google is deprecating Google Analytics in favor of Firebase SDKs. To learn more, see the Google [public notice here](https://support.google.com/firebase/answer/9167112?hl=en).


### Is Segment removing the Google Analytics Destination?

The Google Analytics mobile SDKs for Segment will not be removed from the catalog, but they will be marked as deprecated and will stop functioning when Google deprecates the original Google Analytics service. To replace the Google Analytics mobile SDKs, we suggest that you migrate your current Segment Google Analytics Mobile destinations to the Segment Firebase Destinations.


### Getting Started with Firebase

For more detailed information for each of the classes and methods in the Firebase SDK by platform visit the [Firebase Analytics SDK documentation](https://firebase.google.com/docs/reference).

**Installing the iOS SDK**
For information on how to add the Segment-Firebase SDK and register the dependency with the Segment SDK visit [Segment's Firebase for iOS](https://segment.com/docs/connections/destinations/catalog/firebase/#ios) documentation.

**Installing the Android SDK**
For information on how to add the Segment-Firebase SDK and apply the Google Services plugin visit [Segment's Firebase for Android](https://segment.com/docs/connections/destinations/catalog/firebase/#android) documentation.


### Comparing Google Analytics and Firebase Functionality

| **Google Analytics Functionality**              | **Firebase Functionality**                                                   | **Supported?** |
| ----------------------------------------------- | ---------------------------------------------------------------------------- | -------------- |
| Enable/disable anonymize (obfuscate) device IP. | Enforced in Firebase.                                                        | ✅              |
| Automatic reporting of uncaught exceptions .    | Use [Crashlytics](https://firebase.google.com/docs/crashlytics/get-started). | ✅              |
| Report when Android Activity starts and stops.  | On Activity Resumed, we set the current screen.                              | ✅              |

### Migrating Screen Calls

Segment's Google Analytics SDK sends a screen view to Google Analytics for mobile apps when you call `screen` in your mobile app. For Segment's Android GA SDK, we will send a hit on product events on Screen calls using the screen name as the event name for `Product *:` formatted screen names.

The Firebase SDK collects screen information automatically, so when you migrate to Segment's Firebase Analytics SDK, you will notice that Segment no longer needs to map screen events.

For Android, Segment passes contextual screen information into each screen view on each activity's `onResume` callback. To ensure that this screen information is not lost now that we no longer perform a mapping step, we recommend that you add a `label` value to each activity in your app's `AndroidManifest.xml` file. At the moment, Firebase does not allow you to disable automatic screen tracking for Android.

For iOS, you can configure `recordScreenViews` which will automatically track screen views, or pass in a screen manually using a [screen](https://segment.com/docs/connections/spec/screen/) call. You can disable Automatic Screen reporting by adding the plist flag `FirebaseScreenReportingEnabled` to `Info.plist` and set its value to `NO` (Boolean).

To send product events in the Firebase SDK you must invoke a track call separately from the screen call.


### Migrating Identify Calls

Previously, if you used Google Analytics on Identify calls, Segment only passed the ID of the call, because passing PII is against the Google Analytics Terms of Service. In order to pass additional user properties to Google Analytics you had to define custom dimensions and metrics within the Google Analytics UI.

The Firebase Terms of Service, also prohibits you from passing PII, however on an Identify call Segment sends all user traits in an Identify payload to Firebase as user properties. In order to be used in analytics tooling these user properties need to be configured in your Firebase console. If you want to prevent PII from being sent to Firebase, and were previously relying on Segment to strip this information from your calls, you must re-route or remove this from the tracking implementation.

Firebase Analytics supports sending up to 25 user properties. Once set, user property values persist throughout the app lifecycle and across sessions. The following user property names are reserved and cannot be used: `first_open_time`, `last_deep_link_referrer`, and `user_id`.

### Migrating Track Calls

Segment's Google Analytics Mobile SDKs record an event whenever you make a `.track()` call. The events can be generated with an `action`, `category`, `label`, and `value`. You can also set additional custom dimensions and metrics from your payload properties.

When migrating to Segment's Firebase Analytics SDK the following Segment events are mapped to FirebaseAnalytics events:

| **Segment Event**           | **Android Firebase Events** | **iOS Firebase Events**      |
| --------------------------- | --------------------------- | ---------------------------- |
| `Product Added`             | `Event.ADD_TO_CART`         | `kFIREventAddToCart`         |
| `Checkout Started`          | `Event.BEGIN_CHECKOUT`      | `kFIREventBeginCheckout`     |
| `Order Completed`           | `Event.ECOMMERCE_PURCHASE`  | `kFIREventEcommercePurchase` |
| `Order Refunded`            | `Event.PURCHASE_REFUND`     | `kFIREventPurchaseRefund`    |
| `Product Viewed`            | `Event.VIEW_ITEM`           | `kFIREventViewItem`          |
| `Product List Viewed`       | `Event.VIEW_ITEM_LIST`      | `kFIREventViewItemList`      |
| `Payment Info Entered`      | `Event.ADD_PAYMENT_INFO`    | `kFIREventAddPaymentInfo`    |
| `Promotion Viewed`          | `Event.PRESENT_OFFER`       | `kFIREventPresentOffer`      |
| `Product Added to Wishlist` | `Event.ADD_TO_WISHLIST`     | `kFIREventAddToWishlist`     |
| `Product Shared`            | `Event.SHARE`               | `kFIREventShare`             |
| `Product Clicked`           | `Event.SELECT_CONTENT`      | `kFIREventSelectContent`     |
| `Product Searched`          | `Event.SEARCH`              | `kFIREventSearch`            |



> **Note**: Google Analytics supported mapping `Product Removed` to Google Analytics `Product.ACTION_REMOVED`. This event is not mapped in the Segment Firebase mobile SDKs and will be sent as a custom event.

The following Segment properties are mapped to Firebase Analytics properties:

| **Segment Property** | **Android Firebase Property** | **iOS Firebase Property**    |
| -------------------- | ----------------------------- | ---------------------------- |
| `category`           | `Param.ITEM_CATEGORY`         | `kFIRParameterItemCategory`  |
| `product_id`         | `Param.ITEM_ID`               | `kFIRParameterItemID`        |
| `name`               | `Param.ITEM_NAME`             | `kFIRParameterItemName`      |
| `price`              | `Param.PRICE`                 | `kFIRParameterPrice`         |
| `quantity`           | `Param.QUANTITY`              | `kFIRParameterQuantity`      |
| `query`              | `Param.SEARCH_TERM`           | `kFIRParameterSearchTerm`    |
| `shipping`           | `Param.SHIPPING`              | `kFIRParameterShipping`      |
| `tax`                | `Param.TAX`                   | `kFIRParameterTax`           |
| `total`              | `Param.VALUE`                 | `kFIRParameterValue`         |
| `revenu``e`          | `Param.VALUE`                 | `kFIRParameterValue`         |
| `order_id`           | `Param.TRANSACTION_ID`        | `kFIRParameterTransactionID` |
| `currency`           | `Param.CURRENCY`              | `kFIRParameterTransactionID` |



> **Note**: Firebase Analytics does not support `action` or `label` in their [predefined event parameter names](https://firebase.google.com/docs/reference/cpp/group/parameter-names), and Segment's Firebase SDK does not support mapping those properties. If you want to pass those properties to Firebase  send them as a custom property.

**Custom Events and Properties**
Segment's Firebase Analytics SDK allows you to send custom events and properties. If you make a `track()` call but the event name is not one of the above mappings, Segment calls `logEventWithName` (iOS) or `logEvent` (Android). This allows you to pass any custom event name you want. Event names must contain 1 to 40 alphanumeric characters or underscores, per the [Firebase documentation](https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics.Event). The Segment Firebase SDKs format custom event names to remove trailing whitespace and replace all spaces and periods with underscores.
Firebase Analytics supports up to 500 event names, and each event can have up to 25 parameters.


> **Note**: Firebase has a [list of](https://firebase.google.com/docs/reference/ios/firebaseanalytics/api/reference/Classes/FIRAnalytics#/c:objc(cs)FIRAnalytics(cm)logEventWithName:parameters:) [reserved](https://firebase.google.com/docs/reference/ios/firebaseanalytics/api/reference/Classes/FIRAnalytics#/c:objc(cs)FIRAnalytics(cm)logEventWithName:parameters:) [event names](https://firebase.google.com/docs/reference/ios/firebaseanalytics/api/reference/Classes/FIRAnalytics#/c:objc(cs)FIRAnalytics(cm)logEventWithName:parameters:) which cannot be used.


### Recording Uncaught Exceptions

Segment's Google Analytics mobile SDK supports automatic reporting of uncaught exceptions for iOS and Android platforms.

Firebase supports recording of uncaught exceptions through the use of [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics). Firebase Crashlytics is a lightweight, realtime crash reporter that helps you track, prioritize, and fix stability issues that erode your app quality. Crashlytics saves you troubleshooting time by intelligently grouping crashes and highlighting the circumstances that lead up to them.

To get started with Firebase Crashlytics so you can generate comprehensive crash reports in your Firebase console follow the [set up guide outlined in the Firebase documentation](https://firebase.google.com/docs/crashlytics/get-started) for iOS or Android.

### Can Segment do it for me?

You might wonder why Segment can't just send your Google Analytics events cloud-mode from your mobile applications. We've confirmed that Google identified the customers who are impacted by the Google Analytics sunset plan, flagged those accounts, and sent deprecation notices.

If you received this deprecation notice, your property has already been flagged for deprecation - so sending events cloud-mode won't make Google Analytics to collect and process that data after October 31st, 2019.


## Mobile Apps - DEPRECATED

Segment supports Google Analytics mobile app analytics using our iOS and Android sources. For getting started with our mobile sources, check out the [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) and [Android](/docs/connections/sources/catalog/libraries/mobile/android/) technical docs.

When including Segment-GoogleAnalytics in your project, we bundle IDFA support by default. You can choose to exclude IDFA Support by specifying `pod "Segment-GoogleAnalytics/Core"`. Doing this, we will only bundle the Segment and Core GA libraries, excluding GoogleIDFASupport.

You'll need to create a new Google Analytics property for your mobile app. You can't mix website and mobile apps within the same Google Analytics property. You can however mix Android and iOS implementations of the same app, or many different builds of the same app inside the same property.

Here are [Google's Best Practices for Mobile App Analytics](https://support.google.com/analytics/answer/2587087):

  - Track different apps in separate properties
  - Track different platforms of an app in separate properties
  - Track app editions based on feature similarities
  - Track different app versions in the same property


### Add the Mobile Tracking Id Field

The first thing you should do if you're bundling the Segment-GoogleAnalytics SDK is to add your **Mobile Tracking Id** to your Google Analytics settings inside Segment. This ensures that data can flow from each user's mobile device to Google Analytics. Otherwise, Segment won't know where to send your data, and the events will be lost.


### When Will I See Data?

If you already have an app deployed with the Segment library, and you just turned on Google Analytics mobile, it will take up to an hour for all your mobile users to refresh their Segment settings cache, and learn about the new service that you want to send to.

After the settings cache refreshes, our library will automatically start sending data to Google Analytics.


### Android Permissions

You'll need to make sure you added these permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```


### Calling Google Analytics Directly

Since our SDKs bundle the Google Analytics SDK, you can access the Google Analytics `Tracker` object directly. Here's an Android example:
```java
GoogleAnalytics ga = GoogleAnalytics.getInstance(this);
Tracker tracker = ga.newTracker('<your tracking id>');
```
```java
// perform custom actions, such as user timings
tracker.send(new HitBuilders.TimingBuilder()
    .setCategory(getTimingCategory())
    .setValue(getTimingInterval())
    .setVariable(getTimingName())
    .setLabel(getTimingLabel())
    .build());
```

This allows you to perform custom actions with Google Analytics, such as [user timings](https://developers.google.com/analytics/devguides/collection/android/v4/usertimings).
