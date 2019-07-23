Our Google AdWords destination code is open-source on GitHub if you want to check it out.
[Our clientside javascript destination.](https://github.com/segment-integrations/analytics.js-integration-adwords).
## Web

### Getting Started

**Please note:** Google AdWords recently started rolling out the [beta version of Global Site Tag](https://support.google.com/adwords/answer/7548399?hl=en). We do not currently support this but are investigating the possibility of this in the near future.

With Segment your events can be used to fire an AdWords conversion pixel from your website **in client-side javascript.**
It can also be used to trigger AdWords conversion from your mobile app via **Server to Server** destination so you don't have to include the SDK in your app. Our server to server connection requires mobile device specific details to forward the events to Adwords. Adwords will **not work with any server-side libraries**. Make sure when you're setting up your Adwords conversions that you choose the appropriate tracking method.

From your Segment Destinations Catalog click on AdWords. You'll need to enter your Conversion ID from your AdWords account first. Next, enter the name of the event exactly as it appears in your [`track`](/docs/spec/track) call on the left and map it to your Adwords conversion's `google_conversion_label` on the right.


### Conversion ID

To find a conversion ID look inside of your AdWords account and navigate to Tools -> Conversions, then click the red +Conversion button. You'll be prompted to choose what types of conversions you'd like to track. For the purposes of integrating with Segment, you'll choose either "Website" or "App".

If you select "Website," click through to the "Review and Install" step in the AdWords dashboard. Scroll down to the "Install your tag" section and look for `w.google_conversion_id`. Copy the string directly to the right of it, and paste it into the AdWords section of your Segment destination tab.

If you select "App" you can choose to track conversions from Firebase, Google Play, or first opens and in-app actions. For more on setting up moble tracking, see [Server to Server Destination for Mobile Apps](#server-to-server-destination-for-mobile-apps) further down on this page.

_**NOTE:** If using the New Adwords Experience, the Conversion ID can now be found in a different location. Navigate to Tools, Billing, and Settings menu and, then, select "Measurement: Conversions", which opens to the "Conversion Actions" table. From here you can drill down to the conversion "Tag setup" to view the tag details. From here, select Use Google Tag Manager card in order to expose the Conversion ID._

### Conversion Value

If you want to pass a value along with the conversion event include an event property labeled `revenue`, like this:

```javascript
analytics.track('Order Completed', { revenue: 33 });
```
### Dynamic Remarketing Tags

If you enable **Send Remarketing Tag** for an event mapping in your settings, we will send a dynamic remarketing tag in addition to a normal conversion tag. You can use these properties in your Adwords account to create audiences to remarket to!

If you'd like to **only** send a Dynamic Remarketing Tag you can just leave the **Label** field blank. 

### Multiple Conversion IDs

If you wish to map multiple conversion IDs for a single event, you can simply create multiple mappings in the **Event Mappings** setting with the same event name and different conversion IDs.

## Troubleshooting

### Testing Conversion Pixels

To test Google AdWords conversion tracking you'll have to click through one of your existing ads.

Keep in mind that the conversion data must be processed by Google before it shows up in your AdWords reporting, which can take up to 24 hours.

### Inconsistent Conversions

The most common reason for AdWords conversion pixels to fire inconsistently is that the page redirects or reloads before the pixel has time to be loaded on the page. Make sure your page does not redirect or reload for at least 300ms after the conversion event happens.

We recommend using our `trackLink` or `trackForm` helpers to delay the page redirect. [Documentation here](/docs/sources/website/analytics.js#track-link).

## Mobile & Server

### Legacy Migration

Our server-to-server integration with AdWords integrates with the [App Conversion Tracking and Remarketing API](https://developers.google.com/app-conversion-tracking/api/) which is responsible for receiving and processing in-app conversion events. Google recently released an entirely new version of this API that is slated to completely replace the [legacy API](https://developers.google.com/app-conversion-tracking/api/legacy/android-conversion-tracking-server) in the near future. If you are an existing user of this integration and are migrating to this new version, there are three important changes to be aware of:

1) App Event Mappings

Google has replaced the concept of associating conversion events with **conversion ids** and **conversion labels**. Instead, conversion events are simply associated with their event name. Once you've enabled the new integration in your settings, you can begin creating and tracking new conversion events in AdWords that are tied to your Segment `track` event names and ignore the legacy [Event Mappings](/docs/destinations/adwords/#event-mappings) configuration step.

2) App Event Types

The API has a new concept of **event types**. Each of these types are meant to be associated with common in-app actions that a user could take (app installs, product views, etc.). This is the same concept as our [Semantic Event Spec](https://segment.com/docs/spec/semantic/). The event type mappings we support are outlined in the sections below.

**Important:** if you have migrated from a legacy AdWords account to a new one, AdWords will automatically migrate your existing conversion events to your new account. We will continue to respect these event mappings even if they share the same event names as the new "spec'd" event mappings outlined below and ignore the new **event type** mapping. This is to ensure there is no disruption in your data. If you wish to bypass this, you simply need to delete the event mapping in your [settings](/docs/destinations/adwords/#event-mappings).

3) Authorization/Authentication

The new API has a new authentication and authorization process that will require some configuration steps both in your AdWords account and your Segment Account. This process is outlined below.

### Authorization / Authentication
To authorize Segment to track conversion events using the AdWords API on your behalf, you must complete the following steps:

#### Generate a Link ID in your AdWords Account

Authorization between an AdWords account and a third-party-application is done via the use of a Link Id. This process is detailed [here](https://support.google.com/adwords/answer/7365001).

**Important:** During this process, you will be required to enter a Provider ID. Segment's is the following: 7552494388

Once this step is complete, you should see a screen that looks like this showing the new Link Id:

![link id process](images/link-id-process.png)

#### Add your Link ID as an Integration Setting

Once you have a Link ID, you need to add them to your AdWords [integration settings](/docs/destinations/adwords/#settings) in your Segment account. **Please also ensure the API version setting is set to 2.**

### Track
All `track` events are by default sent to your AdWords account and from there, you can choose which ones you want to designate as **Conversion Events**. All events sent to AdWords require an **event type** specification. This is an enumerated list of nine potential values:

 1. first_open
 2. session_start
 3. in_app_purchase
 4. view_item_list
 5. view_item
 6. view_search_results
 7. add_to_cart
 8. ecommerce_purchase
 9. custom

 We integrate with these event types via the use of our [Semantic Event Spec](https://segment.com/docs/spec/semantic/). Each individual mapping we support is documented in the sections below. Any event we recieve that is not a mapped semantic event will be sent to AdWords as a `custom` event type.

### Application Installed

Our [Application Installed](/docs/spec/mobile/#application-installed) event is sent to AdWords as a `first_open` event type. This event is used to attribute successful app installs.

### Order Completed

Our [Order Completed](/docs/spec/ecommerce/v2/#order-completed) event is sent to AdWords as a `ecommerce_purchase` event type. This event is used to attribute successful revenue generating conversions.

**Important:** if you are tracking a successful purchase from an App Store (either the iOS App Store or the Google Play Store) please be sure to set the `affiliation` property of the event to either `App Store` (for iOS) or `Google Store` (for Android). If these are present, we will properly map the event as an `in_app_purchase` event type. Here is an example for Android:

```javascript
analytics.track('Order Completed', {
  // This is a required property.
  affiliation: 'Google Store',
  revenue: 25.00,
  orderId: '50314b8e9bcf000000000000',
  products: [
    {
      productId: '507f1f77bcf86cd799439011',
      sku: '45790-32',
      name: 'Monopoly: 3rd Edition',
      price: 19,
      quantity: 1,
      category: 'Games',
      url: 'https://www.example.com/product/path',
      imageUrl: 'https:///www.example.com/product/path.jpg'
    }
  ]
})
```

### Product List Viewed

Our [Product List Viewed](/docs/spec/ecommerce/v2/#product-list-viewed) event is sent to AdWords as a `view_item_list` event type. This event is used to attribute views of a product list page.

### Product Added

Our [Product Added](/docs/spec/ecommerce/v2/#product-added) event is sent to AdWords as an `add_to_cart` event type. This event is used to attribute additions of a product to a user's shopping cart.

### Products Searched

Our [Products Searched](/docs/spec/ecommerce/v2/#products-searched) event is sent to AdWords as a `view_search_results` event type. This event is used to attribute product searches.

### Product Viewed

Our [Products Viewed](/docs/spec/ecommerce/v2/#product-viewed) event is sent to AdWords as a `view_item` event type. This event is used to attribute views of a specific product page.

### Other Features

#### Attribution Postbacks
If a conversion event is successfully attributed to an active campaign, AdWords will respond with information about the campaign. If the conversion event was an `Application Installed` event (used to track successful app installs), we will map the attribution information to an [`Install Attributed`](/docs/spec/mobile/#install-attributed) event and send it back to your Segment source to get proliferated out to your other downstream integrations. You can enable this functionality in your integration settings.

#### Tracking Value and Currency
To track the monetary value of a conversion, please ensure your event contains a `.revenue` property with a Number designating the total value of the conversion. You may also pass a three letter `currency` property (ex. USD, EUR, etc...).

## Mobile & Server (Legacy)

**Important:** AdWords has plans to deprecate the API that the functionality outlined here relies on. Please reference our documentation that supports their new API version above.

You can specify your key mobile events as conversion events inside of Google AdWords conversion dashboard. When these events fire from your mobile apps, we'll trigger these AdWords conversions. Our SDKs should include the following properties, which are required to send the conversions. If you notice these properties aren't being logged, you will want to check your debugger to ensure the properties are in fact included in your events.

<table>
  <tr>
    <td>**label**</td>
    <td>Your Advertising Label from the destination settings panel</td>
  </tr>
  <tr>
    <td>**rdid**</td>
    <td>`context.device.advertisingId`</td>
  </tr>
  <tr>
    <td>**bundleid**</td>
    <td>`context.app.namespace`</td>
  </tr>
  <tr>
    <td>**appversion**</td>
    <td>`context.app.version`</td>
  </tr>
  <tr>
    <td>**osversion**</td>
    <td>`context.os.version`</td>
  </tr>
  <tr>
    <td>**sdkversion**</td>
    <td>`context.app.build`</td>
  </tr>
</table>

The following properties are optional, if you'd like to see more, please get in touch with us.

<table>
  <tr>
    <td>**referrer**</td>
    <td>context.referrer.id</td>
  </tr>
  <tr>
    <td>**value**</td>
    <td>`properties.revenue`</td>
  </tr>
  <tr>
    <td>**currency_code**</td>
    <td>`properties.currency`</td>
  </tr>
  <tr>
</table>

Here's Google documentation for the endpoint we hit [for iOS apps](https://developers.google.com/app-conversion-tracking/ios/conversion-tracking-server#reporting_in-app_conversions_from_an_analytics_server) and [for Android Apps](https://developers.google.com/app-conversion-tracking/android/conversion-tracking-server#in-app_conversions). It can take 24-48 hours for conversions to show up in the conversions dashboard.
