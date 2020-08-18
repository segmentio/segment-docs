---
title: Migrating mobile analytics from Google Analytics to Firebase
strat: google
hidden: true
---

Previously, you could use Segment's Google Analytics mobile SDKs to measure and optimize user engagement with your mobile-apps. On [October 31st 2019, Google sunset the Google Analytics mobile-apps reporting](https://support.google.com/firebase/answer/9167112?hl=en) using the Google Analytics Services SDKs for both Android and iOS. This means all data collection and processing stopped for properties that received data from the Google Analytics Service SDK for mobile apps. Google deprecated Google Analytics in favor of its new [Firebase SDKs](/docs/connections/destinations/catalog/firebase/).

The following tutorial explains how to migrate your mobile analytics from Google Analytics to Firebase.


### Is Segment removing the Google Analytics Destination?

Segment is choosing not to remove the Google Analytics mobile SDKs from the catalog to help you with any outstanding migration tasks. However, these SDKs are deprecated and stopped functioning when Google deprecated the original Google Analytics service.

### Can Segment convert my data for me?

You might wonder why Segment can't just send your Google Analytics events in cloud-mode from your mobile applications. We confirmed that Google identified the customers who are impacted by the Google Analytics sunset plan, flagged those accounts, and sent deprecation notices.

If you received this deprecation notice, your property has already been flagged for deprecation - so sending events cloud-mode won't make Google Analytics collect and process that data after October 31st, 2019.


## Getting Started with Firebase

For more detailed information for each of the classes and methods in the Firebase SDK by platform visit the [Firebase Analytics SDK documentation](https://firebase.google.com/docs/reference).

#### Installing the iOS SDK
For information on how to add the Segment-Firebase SDK and register the dependency with the Segment SDK visit [Segment's Firebase for iOS](https://segment.com/docs/connections/destinations/catalog/firebase/#ios) documentation.

#### Installing the Android SDK
For information on how to add the Segment-Firebase SDK and apply the Google Services plugin visit [Segment's Firebase for Android](https://segment.com/docs/connections/destinations/catalog/firebase/#android) documentation.


## Comparing Google Analytics and Firebase Functionality

| **Google Analytics Functionality**              | **Firebase Functionality**                                                   | **Supported?** |
| ----------------------------------------------- | ---------------------------------------------------------------------------- | -------------- |
| Enable/disable anonymize (obfuscate) device IP. | Enforced in Firebase.                                                        | ✅              |
| Automatic reporting of uncaught exceptions .    | Use [Crashlytics](https://firebase.google.com/docs/crashlytics/get-started). | ✅              |
| Report when Android Activity starts and stops.  | On Activity Resumed, we set the current screen.                              | ✅              |

## Migrating Screen Calls

Segment's Google Analytics SDK sends a screen view to Google Analytics for mobile apps when you call `screen` in your mobile app. For Segment's Android GA SDK, Segment sends a hit on product events on Screen calls that use the screen name as the event name for `Product *:` formatted screen names.

The Firebase SDK collects screen information automatically, so when you migrate to Segment's Firebase Analytics SDK, Segment no longer needs to map screen events.

For Android, Segment passes contextual screen information into each screen view on each activity's `onResume` callback. Segment recommends that you add a `label` value to each activity in your app's `AndroidManifest.xml` file to make sure this screen information is not lost. At the time of this writing, Firebase does not allow you to disable automatic screen tracking for Android.

For iOS, you can configure `recordScreenViews` (which automatically tracks screen views), or pass in a screen manually using a [screen](/docs/connections/spec/screen/) call. You can disable Automatic Screen reporting by adding the plist flag `FirebaseScreenReportingEnabled` to `Info.plist` and set its value to `NO` (Boolean).

To send product events in the Firebase SDK you must invoke a track call separately from the screen call.


## Migrating Identify Calls

Previously, if you used Google Analytics on Identify calls, Segment only passed the ID of the call, because passing PII is against the Google Analytics Terms of Service. To pass additional user properties to Google Analytics you had to define custom dimensions and metrics within the Google Analytics UI.

The Firebase Terms of Service also prohibits you from passing PII, however on an Identify call Segment sends all user traits in an Identify payload to Firebase as user properties. To use these in analytics tooling these user properties must be configured in your Firebase console.

If you were previously relying on Segment to strip this PII from your calls, you must re-route or remove this information from your tracking implementation.

Firebase Analytics supports sending up to 25 user properties. Once set, user property values persist throughout the app lifecycle and across sessions. The following user property names are reserved and cannot be used: `first_open_time`, `last_deep_link_referrer`, and `user_id`.

## Migrating Track Calls

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


> note ""
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

### Custom Events and Properties

Segment's Firebase Analytics SDK allows you to send custom events and properties. If you make a `track()` call but the event name is not one of the above mappings, Segment calls `logEventWithName` (iOS) or `logEvent` (Android). This allows you to pass any custom event name you want. Event names must contain 1 to 40 alphanumeric characters or underscores, per the [Firebase documentation](https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics.Event). The Segment Firebase SDKs format custom event names to remove trailing whitespace and replace all spaces and periods with underscores.
Firebase Analytics supports up to 500 event names, and each event can have up to 25 parameters.

> note ""
> **Note**: Firebase has a [list of reserved event names](https://firebase.google.com/docs/reference/ios/firebaseanalytics/api/reference/Classes/FIRAnalytics#/c:objc(cs)FIRAnalytics(cm)logEventWithName:parameters) which cannot be used.


## Recording Uncaught Exceptions

Segment's Google Analytics mobile SDK supports automatic reporting of uncaught exceptions for iOS and Android platforms.

Firebase supports recording of uncaught exceptions through the use of [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics). Firebase Crashlytics is a lightweight, realtime crash reporter that helps you track, prioritize, and fix stability issues that erode your app quality. Crashlytics saves you troubleshooting time by intelligently grouping crashes and highlighting the circumstances that lead up to them.

To get started with Firebase Crashlytics so you can generate comprehensive crash reports in your Firebase console follow the [set up guide outlined in the Firebase documentation](https://firebase.google.com/docs/crashlytics/get-started) for iOS or Android.
