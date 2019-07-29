---
rewrite: true
---
[AppsFlyer](https://www.appsflyer.com/) is the world's leading mobile attribution & marketing analytics platform, helping app marketers around the world make better decisions. Our AppsFlyer destination code is open-source. You can browse the code on GitHub for [iOS](https://github.com/AppsFlyerSDK/segment-appsflyer-ios) and [Android](https://github.com/AppsFlyerSDK/AppsFlyer-Segment-Integration).

This document was last updated on April 27, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

  1. From your Segment UI’s Destinations page click on “Add Destination”.
  2. Search for “AppsFlyer“ within the Destinations Catalog and confirm the Source you’d like to connect to.
  3. Drop in your `AppsFlyer Dev Key`, which can be retrieved from the App Settings section of your AppsFlyer account.
  4. Follow the instructions in the Github repos: [iOS SDK](https://github.com/AppsFlyerSDK/segment-appsflyer-ios) and [Android SDK](https://github.com/AppsFlyerSDK/AppsFlyer-Segment-Integration).
  5. After you build and release to the app store, we start translating and sending your data to AppsFlyer automatically.

**Important:** If you plan on using the server-side destination for an Android project, please make sure to enter your **Android App ID**. If you are using only the mobile SDK, Android projects only require the **AppsFlyer Dev Key**. iOS projects always require both the **AppsFlyer Dev Key** and the **Apple App ID**. Also, note that if you do use the server-side destination, you will not be able to selectively disable calls sent to AppsFlyer via your Segment dashboard.

### Server

AppsFlyer offers an **augmentative** server-side [HTTP API](https://support.appsflyer.com/hc/en-us/articles/207034486-Server-to-Server-In-App-Events-API-HTTP-API-) intended for use along side their mobile SDK. Use the server-side destination alongside the mobile SDK to associate out-of-app events such as website or offline purchases with attributed users/devices. Please read further for more information on this functionality.

**Important**: Keep in mind that the server-side destination is not meant to *supplant* the client side SDK! In order for AppsFlyer to properly attribute, you must bundle their mobile SDK! The server-side destination should not be used alone. Also, keep in mind if you are passing in `appsFlyerId` for server-side calls, you will not be able to disable events from sending to AppsFlyer via your Segment dashboard.

If you'd like to use AppsFlyer fully server-side, this can be done but it is a Enterprise Customer Feature and you need to contact your AppsFlyer representative to enable this feature. 

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example iOS call would look like:

```ios
[[SEGAnalytics sharedAnalytics] identify:@"12091906-01011992"
                                traits:@{ @"email": @"john.doe@example.com" }];
```

When you call `.identify()`, we will use AppsFlyer's `setCustomerUserID` to send the `userId` that was passed in.

**Note:** `identify` calls are not supported via AppsFlyer's HTTP API at the moment. You can only send `.identify` calls if you have the AppsFlyer SDK bundled.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example iOS call would look like:

```ios
[[SEGAnalytics sharedAnalytics] track:@"Article Completed"
                           properties:@{ @"title": @"How to Create a Tracking Plan", @"course": @"Intro to Analytics" }];
```

When you call `track`, we translate it automatically and send the event to AppsFlyer.

We include all the event properties as callback parameters on the AppsFlyer event, and automatically translate `properties.revenue` to the appropriate AppsFlyer purchase event properties based on our spec’d properties.

Finally, we automatically use AppsFlyer’s transactionId-based de-duplication when you send an an `orderId` (see the [e-commerce spec](https://segment.com/docs/spec/ecommerce/v2/)).

### Server

If you'd like to attribute offline events with a certain user or device, the server-side destination may be employed.

AppsFlyer requires the following properties for this attribution: 

**AppsFlyer Device ID** 

Send the **AppsFlyer Device ID** with each event at `integrations.AppsFlyer.appsFlyerId`, see example below.
This identifier is unique to each device and can be [retrieved using the AppsFlyer SDK](https://support.appsflyer.com/hc/en-us/articles/207034486-Server-to-Server-In-App-Events-API-HTTP-API-). It is a good idea to store this value in an external database where it may be easily accessible by a server or website environments. 

**Device Type** 

AppsFlyer requires the user's device type as either `'ios'` or `'android'`, passed at `context.device.type` object, see example below.

**Advertising ID**

AppsFlyer requires the passing of an **Advertising ID** (referred to as **IDFA** on iOS and **Advertising ID** on Android) at `context.device.advertisingId`, see example below:

```js
// node.js library example
analytics.track({
  event: 'Membership Upgraded',
  userId: '97234974',
  context: {
    device: {
      type: 'ios',
      advertisingId: '159358'
    }
  },
  integrations: {
    AppsFlyer: {
      appsFlyerId: '1415211453000-6513894'
    }
  }
});
```
> Check your specific [serverside library docs](https://segment.com/docs/sources/#server) for specifics on how to format the method properly.

Finally, the serverside component will look for the following `properties` and handle them specially:

- `ip` (this should be the `ip` of your customer--this is not collected by Segment's libraries out-of-the-box)
- `timestamp` (refer to AppsFlyer's docs on [how they process timestamps](https://support.appsflyer.com/hc/en-us/articles/207034486-Server-to-Server-In-App-Events-API-HTTP-API-). Since our libraries generate a [timestamp](/docs/spec/common/#timestamps), we will always set this value)
- `currency` (defaults to `"USD"`)
- `revenue` (For `Order Completed / Completed Order` events, precedence is given to `total`, falling back to `properties.revenue`)

All other `properties` will be sent to AppsFlyer as custom properties inside `eventValue`.

> **Note:** Be sure to calibrate/update the time window in AppsFlyer's dashboard to see your events!

## Install Attributed

### Client
Segment will automatically trigger an `Install Attributed` event if you have **trackAttributionData** enabled in your settings, and the Segment-AppsFlyer integration installed in your app. The event payload will adhere to our `Install Attributed` event specification documented [here](/docs/spec/mobile/#install-attributed) and will propagate to your other downstream destinations.

### Server
If you are tracking events server-side, AppsFlyer can still send attribution postbacks but you will need to configure this functionality in your AppsFlyer account. To enable this, navigate to your AppsFlyer app and on the sidebar of the main screen click on **Integrated Partners** and search for Segment. You will be prompted with a couple of configuration options and asked to input your Segment Write Key. Once enabled, successfully attributed app installs will begin showing up as `Install Attributed` events similar to the client side behavior documented above. 

If you are sending in the attribution data yourself, for iOS be sure the following properties are sent in within the campaign object on the `Install Attributed` or `Application Opened` event so Appsflyer can correctly attribute it as an Apple Search Ad event. These values should be returned by the [Apple Search Ads API](https://searchads.apple.com/advanced/help/measure-results/#attribution-api):

```
"campaign": {
        "content": "keyword1keyword2",
        "ad_creative": "OrgName",
        "conversion_date": "2018-03-07T04:05:50Z",
        "ad_group": "US-iOS-campaign-Exact",
        "id": "123",
        "ad_group_id": "456",
        "name": "US-iOS-campaign",
        "click_date": "2018-03-06T04:05:50Z",
        "lineitem_id":"789",
        "attribution":"true",
        "lineitem_name":"US-iOS-campaign-Name"
      }
```

For example, an attribution event coming from an attribution partner would look like:

```objc
[[SEGAnalytics sharedAnalytics] track:@"Install Attributed", properties: @{
    @"provider" : @"Appsflyer/Tune/Kochava/Branch",
    @"campaign" : @{
        @"source" : @"Network/FB/AdWords/MoPub/Source",
        @"name" : @"Campaign Name",
        @"content" : @"Organic Content Title",
        @"ad_creative" : @"Red Hello World Ad",
        @"ad_group" : @"Red Ones",
        @"conversion_date": @"2018-03-07T04:05:50Z",
        @"id": @"123",
        @"ad_group_id": @"456",
        @"click_date": @"2018-03-06T04:05:50Z",
        @"lineitem_id":@"789",
        @"attribution":@"true",
        @"lineitem_name":@"US-iOS-campaign-Name"
    }
}];
```

## Other Features

### Revenue Tracking

The destination automatically recognizes spec’d `revenue` property and translates them to AppsFlyer’s revenue tracking method.

### Transaction De-duplication

The destination automatically recognizes the spec’d `orderId` property, and sends it as the Transaction ID to AppsFlyer for revenue de-duplication.

### In-App Purchase Receipts

The destination does not currently support in-app purchase receipts. If this is important to you, please email support@appsflyer.com.

### Deeplinking

The destination does not automatically support out-of-the-box deeplinking (you need to write code here regardless!).

Therefore, you can use AppsFlyer’s OneLink integration which is a single, smart, tracking link that can be used to track on both Android and iOS. OneLink tracking links can launch your app when it is already installed instead of redirecting the user to the app store.

For more details, please review the [AppsFlyer OneLink Setup Guide](https://support.appsflyer.com/hc/en-us/articles/207032246-OneLink-Setup-Guide). More information is available in the AppsFlyer SDK Integration Guides ([iOS](https://support.appsflyer.com/hc/en-us/articles/207032066-AppsFlyer-SDK-Integration-iOS), [Android](https://support.appsflyer.com/hc/en-us/articles/207032126-AppsFlyer-SDK-Integration-Android)) and Segment's mobile FAQs ([iOS](/docs/server/mobile/ios/#faq), [Android](/docs/libraries/android/#faq)).
