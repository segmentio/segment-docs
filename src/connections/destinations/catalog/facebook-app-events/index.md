---
title: Facebook App Events Destination
rewrite: true
---

[Facebook App Events](https://developers.facebook.com/docs/app-events) collects required information from one of Segment's mobile SDKs ([iOS](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/) or [Android](https://segment.com/docs/connections/sources/catalog/libraries/mobile/android/)) and sends it from Segment's servers to Facebook App Events servers. This *server-to-server* connection will not work with our server-side libraries. The Facebook App Events Destination is open-source. You can browse the code on GitHub for [iOS](https://github.com/segment-integrations/analytics-ios-integration-facebook-app-events).

This document was last updated on October 04, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

**Use Cases**

* [Improve mobile app retention with Facebook Ads](https://segment.com/recipes/mobile-app-retention-facebook-ads/)

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Facebook App Events" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in your Facebook App ID which can be retrieved from your [Facebook Apps dashboard](https://developers.facebook.com/apps/).
4. Once you turn on the Facebook App Events integration in your app's Segment project, we'll start sending `track` data to Facebook's App Events endpoints.

## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. An example call would look like:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Photo Feed"
                            properties:@{ @"Feed Type": @"public" }];
```

Our integration also supports using Segment `screen` events as `track` events. For example, if you had a `screen` event named `Confirmation` you could map the invocation of this to a Facebook app event as you would with Segment `track` events.

To use this functionality you must opt into it via the integration setting named **Use Screen Events as Track Events**. Once enabled, you should start seeing `screen` events populate in Facebook App Events. The screen name you provide will be bookended with the words **Viewed** and **Screen**. So, if you have a `screen` event with the name property set to `Welcome`, it will show up in Facebook as an event called **Viewed Welcome Screen**.

Please note, the integration will not automatically translate `screen` events to spec'd Facebook events as our `track` method does. If you would like to map these events to specific Facebook events you can do this via the **Map your events to Standard FB App Events** setting. Please be sure to specify the event as **Viewed** `name` **Screen** where `name` is the name property of the `screen` event.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```objc
[[SEGAnalytics sharedAnalytics] track:@"Article Completed"
                           properties:@{ @"title": @"How to Create a Tracking Plan", @"course": @"Intro to Analytics" }];
```

When you call `track` we'll automatically send that event and it's properties to Facebook. In the Facebook analytics interface you'll be able to use the event properties to segment your data.

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

We'll automatically translate any of your events that match one of our [spec'd events](/docs/connections/spec/) that map to Facebook's spec'd events. The below table shows the out of the box mappings in our integration:

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

## Other Features

### Facebook Login and Facebook Dialogs
The integration does not automatically support Facebook Login and Facebook Dialogs out of the box (you'd need to write code here regardless!). To use these features you'll need to set up [Facebook's app delegate hooks](https://developers.facebook.com/docs/ios/getting-started#delegate) by accessing [the Facebook SDK directly](/docs/connections/sources/catalog/libraries/mobile/ios/#faq).

### Packaged Integration

In addition to the integration available for both iOS and Android, there is a client-side packaged integration available on iOS. We recommend integrating with the Segment server-to-server integration, but you can use the packaged integration on iOS if you want.


### Pre-defined Events and Parameters

The integration currently only supports the `FBSDKAppEventNameActivatedApp` pre-defined event (via the `activateApp` handler). All other events are forwarded as [custom events](https://developers.facebook.com/docs/app-events/ios#custom). If other [pre-defined events](https://developers.facebook.com/docs/app-events/ios#manual) are important to you, please [contact us](/contact/).

## Troubleshooting

### Not seeing events?

You will have to be sure that the [IDFA](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/#idfa) is working within your app, which involves adding the [iAD framework](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/#idfa).

Simiarly, on Android, you'll need to include the Play Services Ads library as [mentioned here](https://segment.com/docs/connections/sources/catalog/libraries/mobile/android/#how-do-you-handle-unique-identifiers-) in order for the `advertisingId` to populate.

Once you have added these, you will start to see the `context.device.advertisingId` populate and the `context.device.adTrackingEnabled` flag set to `true` unless the user has ad tracking limited or is using a mobile ad blocker.

_Note_: While the network is deprecated, the relevant iOS [framework](https://developer.apple.com/reference/iad) is not.


### Missing custom events

Facebook will only accept custom events with alphanumeric names (you can include spaces, "-" and "\_") that are between 2 and 40 characters in length. Otherwise, Facebook will reject the event payload with a 400 status.
