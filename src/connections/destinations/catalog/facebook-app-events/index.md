---
title: Facebook App Events Destination
rewrite: true
strat: facebook
id: 56fc7e4680412f644ff12fb9
---
[Facebook App Events](https://developers.facebook.com/docs/app-events) collects required information from one of Segment's mobile SDKs ([iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) or [Android](/docs/connections/sources/catalog/libraries/mobile/android/)) and sends it from Segment's servers to Facebook App Events servers. This *server-to-server* connection will not work with our server-side libraries. The Facebook App Events Destination is open-source. You can browse the code on GitHub for [iOS](https://github.com/segment-integrations/analytics-ios-integration-facebook-app-events).


## Other Facebook Destinations Supported by Segment
This page is about the **Facebook App Events**. For documentation on other Facebook destinations, see the pages linked below.

| **Facebook Destination**                                                                                    | Supported by Personas |
| ----------------------------------------------------------------------------------------------------------- | --------------------- |
| **[Facebook App Events](/docs/connections/destinations/catalog/facebook-app-events/)**                      | Yes                   |
| **[Facebook Offline Conversions](/docs/connections/destinations/catalog/facebook-offline-conversions/)**    | Yes                   |
| **[Facebook Pixel](/docs/connections/destinations/catalog/facebook-pixel/)**                                | No                    |
| **[Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/)** | Yes                   |
| **[Facebook Conversions API](/docs/connections/destinations/catalog/actions-facebook-conversions-api/)**    | Yes                   |


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Facebook App Events" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Facebook App ID which can be retrieved from your [Facebook Apps dashboard](https://developers.facebook.com/apps/).
4. Once you turn on the Facebook App Events integration in your app's Segment project, we'll start sending `track` data to Facebook's App Events endpoints.

### Using Facebook App Events with React Native Device Mode

{% include content/react-dest.md only="ios" %} 

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An example call would look like:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Photo Feed"
                            properties:@{ @"Feed Type": @"public" }];
```

Our integration also supports using Segment `screen` events as `track` events. For example, if you had a `screen` event named `Confirmation` you could map the invocation of this to a Facebook app event as you would with Segment `track` events.

To use this functionality you must opt into it using the integration setting named **Use Screen Events as Track Events**. Once enabled, you should start seeing `screen` events populate in Facebook App Events. The screen name you provide will be bookended with the words **Viewed** and **Screen**. So, if you have a `screen` event with the name property set to `Welcome`, it will show up in Facebook as an event called **Viewed Welcome Screen**.

Note, the integration will not automatically translate `screen` events to spec'd Facebook events as our `track` method does. If you would like to map these events to specific Facebook events you can do this using the **Map your events to Standard FB App Events** setting. Be sure to specify the event as **Viewed** `name` **Screen** where `name` is the name property of the `screen` event.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```objc
[[SEGAnalytics sharedAnalytics] track:@"Article Completed"
                           properties:@{ @"title": @"How to Create a Tracking Plan", @"course": @"Intro to Analytics" }];
```

When you call `track` Segment automatically sends that event and it's properties to Facebook. In the Facebook analytics interface you'll be able to use the event properties to segment your data.

Facebook App Events doesn't like events with periods in the name so if you send us an event with periods in the name, we'll convert all periods to underscores. So if your event is `friend.added`, we'll send that to Facebook as `friend_added`. We also truncate events that are longer than 40 characters long due to Facebook's API constraints.

### Facebook Parameters

We automatically translate our [spec'd properties](/docs/connections/spec/track/#properties) `revenue` and `currency` to the appropriate Facebook parameters (`valueToSum` and `FBSDKAppEventParameterNameCurrency`), and also send events with revenue to Facebook's purchase logging method (`logPurchase`).

If you don't provide a `currency` explicitly, we send `USD`. If any properties don't match the below, we'll pass them on as they were sent to us.

<table>
  <tr>
    <td>**Revenue**</td>
    <td>_valueToSum</td>
  </tr>
  <tr>
    <td>**Currency**</td>
    <td>fb_currency</td>
  </tr>
  <tr>
    <td>**name**</td>
    <td>fb_description</td>
  </tr>
  <tr>
    <td>**product_id**</td>
    <td>fb_content_id</td>
  </tr>
  <tr>
    <td>**category**</td>
    <td>fb_content_type</td>
  </tr>
  <tr>
    <td>**query**</td>
    <td>fb_search_string</td>
  </tr>
  <tr>
    <td>**timestamp**</td>
    <td>_logTime</td>
  </tr>
  <tr>
    <td>**quantity**</td>
    <td>fb_num_items</td>
  </tr>
</table>

### Facebook Events

Segment automatically translates any of your events that match one of our [spec'd events](/docs/connections/spec/) that map to Facebook's spec'd events. The below table shows the out of the box mappings in our integration:

<table>
  <tr>
    <td>**Application Installed**</td>
    <td>MOBILE_APP_INSTALL</td>
  </tr>
  <tr>
    <td>**Application Opened**</td>
    <td>fb_mobile_activate_app</td>
  </tr>
  <tr>
    <td>**Products Searched**</td>
    <td>fb_mobile_search</td>
  </tr>
  <tr>
    <td>**Product Viewed**</td>
    <td>fb_mobile_content_view</td>
  </tr>
  <tr>
    <td>**Product Added**</td>
    <td>fb_mobile_add_to_cart</td>
  </tr>
  <tr>
    <td>**Product Added to Wishlist**</td>
    <td>fb_mobile_add_to_wishlist</td>
  </tr>
  <tr>
    <td>**Payment Info Entered**</td>
    <td>fb_mobile_add_payment_info</td>
  </tr>
  <tr>
    <td>**Checkout Started**</td>
    <td>fb_mobile_initiated_checkout</td>
  </tr>
  <tr>
    <td>**Order Completed**</td>
    <td>fb_mobile_purchase</td>
  </tr>
</table>

If you send a `track` event that doesn't match one of the above events, we'll send it along to Facebook with the name you provide Segment.

**Facebook Recommended Events**

The most important events that can help advertisers improve campaign ROI are the conversion events or events closest to the conversion. Those events are marked with an "*" within Segment's Facebook App Events settings page.

In addition, there are special requirements for dynamic ads. These events are marked with "m" for dynamic ads for mobile, and "t" for dynamic ads for travel within Segment's Facebook App Events settings page.

## Limited Data Use

{% include content/facebook-ldu-intro.md %}

> info ""
> The **Use Limited Data Use** destination setting is disabled by default for all Facebook destinations except for Facebook Pixel. This must be enabled manually from the destination settings if you're using other Facebook destinations.

{% include content/facebook-ldu-params.md %}

Facebook uses the `context.ip` to determine the geolocation of the event.

You can manually change the Data Processing parameters by adding settings to the `integrations` object.

#### Server-side library

The example below shows how you might set custom Data Processing parameters for a Segment server library.

```javascript
// node library example

analytics.track({
  event: 'Membership Upgraded',
  userId: '97234974',
  integrations: {
    "Facebook App Events": {
      "dataProcessingOptions": [[], 1,1000]
    }
  }
})
```

#### iOS Device Mode

You must use the Facebook App Events integration SDK version `2.0.0` or later to call `setDataProcessingOptions` when you enable the **Use Limited Data Use** destination setting. Events sent from earlier versions of the Facebook App Events integration SDK cannot call `setDataProcessingOptions`, but Facebook still has access to the IP address in the events to process LDU based on geolocation.

When you use Segment's mobile libraries, you must set the Data Processing Options when you declare the destination in your app delegate's instance. The example below shows how you might set custom Data Processing parameters in an iOS project.

```objc
// Add the bundle FB integration SDK
// Set data processing values.
SEGFacebookAppEventsIntegrationFactory *fb = [SEGFacebookAppEventsIntegrationFactory instance];
[fb setDataProcessingOptions:@[ @"LDU" ] forCountry:1 forState: 1000];
[config use:fb];
```

#### Android and iOS Cloud Mode

To send the Data Processing Parameters in cloud mode on iOS or Android, you can set them in the integrations object. The example below shows how you might set custom Data Processing parameters in Android.

```java
Object[] dataProcessingOptions = new Object[3]
dataProcessingOptions[0] = {'LDU'} // options
dataProcessOptions[1] = 1 // country
dataProcessingOptions[2] = 1000 // state

Analytics.with(context).track(
  "Purchased Item",
  new Properties(),
  new Options().setIntegrationOptions(
    "Facebook App Events", new ImmutableMap.Builder<String, Object>().put("dateProcessingOptions", dataProcessingOptions).build());
)
```

#### Additional iOS Cloud Mode Set up for iOS 14

With the release of Segment's latest Analytics-iOS SDK, which includes support for upcoming iOS 14 tracking changes, you must decide if you _need_ to collect the user's IDFA or not. If you do not need to collect IDFA, you can update your Analytics-iOS SDK to the next version, and Segment sets `device.adTrackingEnabled` to `false`, and starts deleting the `device.advertisingId` from the context object in your payloads. If you _do_ need to collect the IDFA, you must import the IDFA closure as a config to the library, or import the Ad Tracking Transparency framework from Apple.

Facebook returns a 4xx error due to lack of required parameters if the `device.advertisingId` key does not appear in the payload. To work around this, enable the  **Fallback to Zeroed IDFA when advertisingId key not present** destination setting for Facebook App Events from the Segment web app. When you enable this setting, Segment checks for the `device.advertisingId` key, and if none is present, sets the `advertiser_id` in the outbound payload to `'00000000-0000-0000-0000-000000000000'`.




## Other Features

### Facebook Login and Facebook Dialogs
The integration does not automatically support Facebook Login and Facebook Dialogs out of the box (you'd need to write code here regardless!). To use these features you'll need to set up [Facebook's app delegate hooks](https://developers.facebook.com/docs/ios/getting-started#delegate) by accessing [the Facebook SDK directly](/docs/connections/sources/catalog/libraries/mobile/ios/#faq).

### Packaged Integration

In addition to the integration available for both iOS and Android, there is a client-side packaged integration available on iOS. We recommend integrating with the Segment server-to-server integration, but you can use the packaged integration on iOS if you want.


### Pre-defined Events and Parameters

The integration currently only supports the `FBSDKAppEventNameActivatedApp` pre-defined event (via the `activateApp` handler). All other events are forwarded as [custom events](https://developers.facebook.com/docs/app-events/getting-started-app-events-ios). If other pre-defined events are important to you, [contact us](https://segment.com/help/contact/).

## Troubleshooting

### Not seeing events?

You will have to be sure that the [IDFA](/docs/connections/sources/catalog/libraries/mobile/ios/#idfa) is working within your app, which involves adding the [iAD framework](/docs/connections/sources/catalog/libraries/mobile/ios/#idfa).

Similarly, on Android, you'll need to include the Play Services Ads library as [mentioned here](/docs/connections/sources/catalog/libraries/mobile/android/#how-do-you-handle-unique-identifiers-) in order for the `advertisingId` to populate.

Once you've added these, you will start to see the `context.device.advertisingId` populate and the `context.device.adTrackingEnabled` flag set to `true` unless the user has ad tracking limited or is using a mobile ad blocker.

> note ""
> While the network is deprecated, the relevant iOS [framework](https://developer.apple.com/reference/iad) is not.

Facebook requires that payloads include the following:
- `context.device.id`
- `context.device.type`
- `context.os.version`

> info ""
> The value of `context.device.type` must be either `ios` or `android`.

For example:

```json
{
  "anonymousId": "507f191e810c19729de860ea",
  "event": "Event Name",
​  "context": {
    "device": {
      "id": "B5372DB0-C21E-11E4-8DFC-AA07A5B093DB",
      "type": "ios"
    },
    "os": {
      "version": "8.1.3"
    }
  },​
  "messageId": "bbac-11e4-8dfc-aa07a53436b09b45567i8245237824",
  "type": "track",
  "userId": "97980cfea0067"
}
```

### Missing custom events

Facebook will only accept custom events with alphanumeric names (you can include spaces, "-" and "\_") that are between 2 and 40 characters in length. Otherwise, Facebook will reject the event payload with a 400 status.
