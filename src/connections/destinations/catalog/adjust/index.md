---
rewrite: true
title: Adjust Destination
id: 56f6ce7280412f644ff12fb2
---
[Adjust](https://adjust.com) is the mobile attribution provider of choice for hundreds of organizations across the globe. They unify all your marketing activities into one powerful platform, giving you the insights you need to scale your business. The Adjust Destination is open-source. You can browse the code on GitHub for [iOS](https://github.com/segment-integrations/analytics-ios-integration-adjust) and [Android](https://github.com/segment-integrations/analytics-android-integration-adjust).

If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Adjust" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Do not need to include Adjust's SDK natively as this prevent you from successfully implementing the Adjust.
4. Depending on the source you've selected, include Adjust's library by adding the following lines to your dependency configuration.

### iOS

> info ""
> **Note**: The Adjust SDK requires these [frameworks from Apple](https://github.com/adjust/ios_sdk#add-ios-frameworks) to enable advanced features like attribution. For best results, add these frameworks to your application.

If you are using iOS, add this line to your [CocoaPods](http://cocoapods.org) `Podfile`:

```ruby
pod "Segment-Adjust"
```

After adding the dependency, you must register the destination with our SDK.  To do this, import the Adjust destination in your `AppDelegate`:

```objc
#import <Segment-Adjust/SEGAdjustIntegrationFactory.h>
```

And add the following lines:

```objc
NSString *const SEGMENT_WRITE_KEY = @" ... ";
SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:SEGMENT_WRITE_KEY];

[config use:[SEGAdjustIntegrationFactory instance]];

[SEGAnalytics setupWithConfiguration:config];

```

In cases where the Adjust integration sometimes does not track the install attribution properly, you can configure a delay for the Adjust reporting to ensure all session parameters have been loaded properly. Segment allows you to configure this using our UI by enabling `setDelay` and providing a `delayTime` in seconds. Segment then calls the [Adjust iOS SDK's configuration](https://github.com/adjust/ios_sdk#delay-start) to set a delay. The maximum delay start time of the Adjust SDK is 10 seconds.

#### Additional device-mode set up for iOS 14 support

Segment's Adjust SDK was updated to use Adjust version 4.23.0 to prepare for iOS 14. The updated Adjust SDK offers iOS 14 support, AppTrackingTransparency (ATT) and SKAdNetwork dashboard features.

See Adjust's [Steps to Support iOS 14 documentation](https://help.adjust.com/manage-data/data-privacy/ios-14-user-privacy-frameworks#Steps-to-support-iOS-14) for more information.

To use the latest Adjust SDK to collect IDFAs you must do the following:

1. Upgrade to use Xcode12.
2. Update your Segment Adjust SDK to version 3.0.0 or later.
   The latest SDK has integrated support for the SKAdNetwork, which is enabled by default. For access to the SKAdNetwork, make sure your ad networks are registered with Apple. Adjust automatically registers for SKAdNetwork attribution on SDK initialization, and can handle the conversion value update. You can choose to disable this by calling `[adjustConfig deactivateSKAdNetworkHandling];` on the config object in your `AppDelegate.m` file.
3. Import and implement the AppTrackingTransparency (ATT) Framework.
   Navigate to your project `Info.plist` and add a “Privacy - Tracking Usage Description”. This description appears in a popup when the application initializes in iOS 14. Users are prompted to indicate whether or not they want to allow tracking.
4. Launch an opt-in popup using Adjust's SDK wrapper, built on top of `requestTrackingAuthorizationWithCompletionHandler` for the ATT Framework. An iOS pop-up launches when the wrapper is called the first time. When it is called again, the wrapper retrieves the tracking authorization status, which is sent to the Adjust backend. Adjust relays the information directly to you. The example below shows how to use this wrapper.

   ```swift
   [Adjust requestTrackingAuthorizationWithCompletionHandler:^(NSUInteger status) {
       switch (status) {
           case 0:
               // ATTrackingManagerAuthorizationStatusNotDetermined case
               break;
           case 1:
               // ATTrackingManagerAuthorizationStatusRestricted case
               break;
           case 2:
               // ATTrackingManagerAuthorizationStatusDenied case
               break;
           case 3:
               // ATTrackingManagerAuthorizationStatusAuthorized case
               break;
     }];
   ```

5. Follow [Segment's guide for collecting IDFA](/docs/connections/sources/catalog/libraries/mobile/ios/#idfa-collection-in-40-beta-and-later)

### Android

If you are using Android, add this line to your gradle file:

```java
compile 'com.segment.analytics.android.integrations:adjust:+'

```

After adding the dependency, you must register the destination with our SDK.  To do this, import the Adjust destination:

```java
import com.segment.analytics.android.integrations.adjust.AdjustIntegration;

```

And add the following line:

```javascript
analytics = new Analytics.Builder(this, "write_key")
                .use(AdjustIntegration.FACTORY)
                .build();
```

After you build and release to the App Store, Segment automatically starts translating and sending your data to Adjust.

### React Native

{% include content/react-dest.md %}

### Server

The Cloud-mode integration allows you to send *supplemental* data to Adjust.  This *does not* include attribution events. If you rely on the Adjust server-side component, and do not bundle the Segment-Adjust SDK, your installs will not be attributed. E-commerce events and other general `track` events are supported out of the box. You **must** map your `track` events to your custom Adjust Event Token in your [Adjust destination settings](#map-your-events-to-custom-adjust-event-tokens).

Additionally, to send any events to Adjust from the server, you must include the `device.id` as well as the `device.type` in the context object of your event. For example:

```javascript
analytics.track({
  userId: '019mr8mf4r',
  event: 'Item Purchased',
  properties: {
    revenue: 39.95,
    shippingMethod: '2-day'
  },
  context: {
    device: {
      id: '3e9ffbefafe0d903',
      type: 'Android'
    }
  }
});
```

For iOS and Android, Device ID and Advertising ID map to Segment as follows:

| Segment                        | iOS    | Android      |
| ------------------------------ | ------ | ------------ |
| `context.device.advertisingId` | `idfa` | `gps_adid`   |
| `context.device.id`            | `idfv` | `android_id` |

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('12091906-01011992', {
  name: 'Grace Hopper',
  email: 'grace@usnavy.gov'
});
```

When you call `identify`, Segment will call Adjust's [addSessionPartnerParameter](https://github.com/adjust/ios_sdk#session-partner-parameters) method and set the `userId` and/or `anonymousId`. This will set these values within Adjust, and allow Adjust to send back attribution data from their servers.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
```

When you call `track` Segment maps the event to your pre-defined Adjust custom event. You **must** map your `track` events to your custom Adjust Event Token in your Adjust destination settings.

If you don't provide a mapping, Adjust cannot accept the event. We include all the event `properties` as callback parameters on the Adjust event, and automatically translate `revenue` and `currency` to the appropriate Adjust event properties based on our [spec'd properties](/docs/connections/spec/track/#properties).


## Install Attributed

### Client

Segment will trigger an `Install Attributed` event if you have **trackAttributionData** enabled in your settings, and the Segment-Adjust integration installed in your app.

Using Adjust's [Attribution callback](https://github.com/adjust/ios_sdk#attribution-callback), Segment listens for an attribution change from Adjust's SDK and triggers the call with the following Adjust attribution parameters:

| Key                 | Value                    | Description                                        |
| ------------------- | ------------------------ | -------------------------------------------------- |
| provider            | Adjust                   | hardcoded by Segment                               |
| trackerToken        | attribution.trackerToken | the tracker token of the current install           |
| trackerName         | attribution.trackerName  | the tracker name of the current install            |
| campaign.source     | attribution.network      | the network grouping level of the current install  |
| campaign.name       | attribution.campaign     | the campaign grouping level of the current install |
| campaign.content    | attribution.clickLabel   | the click label of the current install             |
| campaign.adCreative | attribution.creative     | the creative grouping level of the current install |
| campaign.adGroup    | attribution.adgroup      | the ad group grouping level of the current install |

If any value is unavailable, it will default to nil.  This call will be sent to all enabled [device and cloud mode](/docs/connections/destinations/#connection-modes) destinations.

#### Troubleshooting

If you are also loading Adjust's SDK natively in addition to loading using the Segment-Adjust integration, `Install Attributed` event callback will likely be affected/unable to be triggered. **Remove native Adjust implementation**.

Since there will not be a change in attribution for registered testing devices you are currently using to send data to Adjust, you will need to unregister that device in Adjust.

To do so:
1. Take note of the IDFA/advertisingId (you can find this in the raw view of an event in your Segment debugger)
2. Uninstall the app from your device
3. Delete the `IDFA`/`advertisingId` from [Adjust's testing console](https://docs.adjust.com/en/testing-console/)
4. Re-install the app on the device and you should now see the device register in Adjust and an `Install Attributed` triggered.

### Server

Unlike the Device-mode option to send `Install Attributed` to Segment, the Cloud-mode option will not include device context information nor will it be sent to enabled device mode destinations.

If you are bundling the Segment-Adjust integration and would like attribution data sent from Adjust's servers back to Segment, you can [enable Segment as a Special Partner in Adjust](https://docs.adjust.com/en/special-partners/segment/#sending-partner-parameters-to-segment). Once set up, Install Attributed will be sent to Segment, and on to enabled Cloud-mode destinations.

contact the Adjust team at `support@adjust.com` for questions related to enabling Segment as a Adjust Special Partner.


## Additional Features

### Environments

By default, our destination sends data to the Adjust Sandbox Environment. When you release your app to the App Store, enable the `Production` option in the Adjust destination settings on Segment (or use two separate sources, one for dev and one for prod, with different environment settings for Adjust).

### Callback Parameters

The destination sends all event `properties` as callback parameters to Adjust. To set [Partner Parameters](https://github.com/adjust/ios_sdk#partner-parameters), you can [access the Adjust SDK directly](https://docs.adjust.com/en/special-partners/segment/).

**Note** that we now support setting these Partner Parameters. Be sure you are pulling in the minimum versions for [iOS 1.1.0](https://github.com/segment-integrations/analytics-ios-integration-adjust/blob/master/CHANGELOG.md#version-110-6th-july-2017) and [Android 0.3.0](https://github.com/segment-integrations/analytics-android-integration-adjust/blob/master/CHANGELOG.md#version-030-6th-july-2017).

### Transaction Deduplication

The destination will automatically recognize the spec'd `orderId` property, and send it as the transaction ID to Adjust for revenue de-duplication.

### Duplicate Purchase Events

If you're using Adjust's iOS SDK, it will automatically takes care of duplicate purchase events. We use Adjust's default deduplication (using `transactionId`) when you send an `orderId` (see the [ecommerce spec](/docs/connections/spec/ecommerce/v2/#order-completed)).

### In-App Purchase Receipts

The destination does not currently support in-app purchase receipts. If this is important to you, [let us know](https://segment.com/help/contact/).

### Push Notifications

The destination automatically forwards push notification tokens through to Adjust.

### Event Buffering

By default, our destination enables event buffering for Adjust. This saves your customers' battery life. However, you can disable this in the options on the Adjust destination settings on Segment.

### Deep Linking

The destination does not automatically support deep linking out of the box (you'd need to write code here regardless). This means you can use [Adjust's deep-linking](https://github.com/adjust/ios_sdk#7-set-up-deep-link-reattributions) by accessing [the Adjust SDK directly](/docs/connections/sources/catalog/libraries/mobile/ios/#faq).
