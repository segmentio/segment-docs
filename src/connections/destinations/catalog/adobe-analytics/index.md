---
title: Adobe Analytics Destination
hide-cmodes: true
strat: adobe
---

Once you enable Adobe Analytics (formerly known as Omniture/Sitecatalyst) in Segment, you can start sending data from any of our [libraries](/docs/connections/sources/catalog/) to an Adobe report suite. When you send events from our mobile SDKs or Cloud-mode libraries, Segment translates that data using a mapping that you configure, and then passes it to the Adobe Analytics `Data Insertion API`.

The following documentation provides detailed explanation of how both destination the Device-mode and Cloud-mode components work. For FAQs about Device- vs Cloud-mode tracking, unique users, identifiers, and more, see the Best Practices page!

<!-- TOC depthFrom:2 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Planning for Adobe Analytics](#planning-for-adobe-analytics)
- [Device-mode - Analytics.js](#device-mode-analytics-js)
- [Cloud-mode - aka Server-side](#cloud-mode-aka-server-side)
- [Implementing Segment for Adobe Analytics](#implementing-segment-for-adobe-analytics)
- [Adobe Analytics List Variables - lVars](#adobe-analytics-list-variables-lvars)
- [Adobe Analytics Properties - props](#adobe-analytics-properties-props)
- [Configuring Adobe Analytics Settings](#configuring-adobe-analytics-settings)
- [Setting up Adobe Analytics for Mobile](mobile/)
- [Setting up Adobe Heartbeat](heartbeat/)
- [Best Practices](best-practices/)

<!-- /TOC -->

## Planning for Adobe Analytics
Adobe Analytics uses a slightly different approach to tracking than Segment, and it's important to understand the difference so you can effectively set up your account. Segment uses a user-action data model, in which we use different types of calls to track different activities of a user on a website or app. Adobe Analytics uses page views as the basic unit of activity, and variables like "props", eVars, lVars, and hVars to add details that allow more nuanced analysis.

For example, a `Welcome Dialog Dismissed` event in Segment (where the action is "dismissed") with properties that contain the user ID (`user123`) and the dialog name `welcome-dialog`, could be modeled in Adobe Analytics as a pageView with variables for the dialog name, visitorID, and with the event name mapping the user action ("dismissed") to a variable.

Both Segment and Adobe Analytics have recommended standard formats for tracking events. Segment has [the Spec](/docs/connections/spec/), and Adobe uses [predefined events](https://marketing.adobe.com/resources/help/en_US/sc/implement/event_predefined.html). Segment automatically maps incoming data that's in the Ecommerce Spec format to Adobe's predefined events, and can also map data in the Ecommerce Spec format to some of Adobe's product level properties. Video calls using the format described in this document are also automatically mapped. If you're using the Mobile SDKs, mobile lifecycle events are also automatically mapped. If you will be creating Page and Track events that are outside the scope of the Ecommerce spec, you'll need to map those to your Adobe events.

We strongly recommend that you create a tracking plan for both your Segment and Adobe Analytics events before you send any events or properties to Adobe. This will help you map your Segment events to Adobe `events`, and Segment properties to Adobe variables. If you decide to set up Adobe Analytics for mobile, you'll have to do this mapping in both the Segment settings, and the Adobe Mobile Services dashboard - so it's good to keep your options open!


### Choosing between Device-mode and Cloud-mode
If you're using device-mode javascript, by default Segment "bundles" (mobile) or "wraps" (when using Analytics.js) the Adobe libraries. In this configuration, Segment sends Events directly from the client using the Adobe Analytics `Appmeasurement.js` library. Adobe's client-side libraries can provide services to other Adobe suites and products, however they can also increase the size of your page.

If you prefer, you can enable [Cloud-mode](/docs/connections/destinations/#connection-modes), and send data through the Segment servers where it is then mapped and sent on to Adobe Analytics. You enable Cloud-mode for Javascript or Legacy sources from the Adobe Analytics source settings in the Segment app.

Our Cloud-mode Adobe Analytics destination also provides support for **Adobe Mobile Services** "states", "actions", and lifecycle events, metrics, and dimensions.

### Connecting Segment to Adobe Analytics
To set up Adobe Analytics as a destination for your Segment data, Segment needs some information on how to connect to Adobe.

- If you're using Device-mode data collection with Analytics.js, or using a server-side library, you need your Adobe Report Suite ID, and your Tracking Server URL. You'll add this information in the Destination settings in the Segment app UI so that Segment can send information to Adobe. An example tracking server is `jimsbrims.sc.omtrdc.net`. You do not  need to include the hypertext transfer protocol (ie. `http://`). For more information on  how to identify your analytics tracking server and report suites see Adobe’s [documentation here](https://docs.adobe.com/content/help/en/analytics-learn/tutorials/implementation/implementation-basics/how-to-identify-your-analytics-tracking-server-and-report-suites.html).  

- If you're collecting data from mobile devices, you can download the `ADBMobileConfig.json` file instead of specifying these settings in the UI which contains that information. Follow the instructions in Adobe's documentation, [here for iOS](https://marketing.adobe.com/resources/help/en_US/mobile/ios/dev_qs.html), and [here for Android](https://marketing.adobe.com/resources/help/en_US/mobile/android/dev_qs.html).

Once you've done that, you can either use the default Ecommerce Spec and the mappings Segment provides, or write custom Page and Track events, and then configure how they map to your Adobe Analytics fields and settings.

### When Will I See Data?

If you just enabled Adobe Analytics for an app already deployed with the Segment library, Adobe can require up to 24 hours to process and display new data. There is also a known [reporting delay](https://helpx.adobe.com/forums/update-forumname/page/en/index.html) on the Adobe side due to [processing times](https://forums.adobe.com/thread/2326058).

It can also take up to an hour for all of the mobile users' Segment settings caches to refresh. Once they refresh, the mobile devices learn about the new service and begin sending data to Adobe Analytics.

Adobe Analytics has a real-time reporting feature which displays web page traffic and ranks page views in real time. Configuring and enabling these reports are restricted to Adobe Admin users. To learn more see Adobe’s [overview on Real-time reporting](https://docs.adobe.com/content/help/en/analytics/components/real-time-reporting/realtime.html)

---

## Device-mode - Analytics.js

Device-mode web data is sent using Analytics.js, with Analytics.js either serving as a wrapper/bundle around the Adobe Analytics code, or sending directly to Segment servers where the data is then sent on to the Adobe destination.

### Initialization

When you use Adobe Analytics with Analytics.js, we first check to see if you have any global properties (such as `window.s_account`) or any properties on the `window.s` object, and use them. However, if we don't find anything, we use the **Report Suite ID**, **Tracking Server URL**, and **Tracking Server Secure URL** (optional) you defined in the destination settings from the Segment app.

Once these required properties are set, we load `appmeasurement.js` version 1.6.

### Marketing Cloud Visitor ID Service

Our Analytics.js destination loads the Adobe `visitorAPI.js` library, but does not initialize it unless you provide your Marketing Cloud Organization ID. When you do, we set `window.s.visitor` with the return value from `window.Visitor.getInstance(<Your Marketing Cloud Org Id>)`. See [the Adobe Marketing Cloud documentation](https://marketing.adobe.com/resources/help/en_US/mcvid/mcvid-setup-analytics.html) for more information.

**Note:** We load `visitorAPI.js` in the same script as `appmeasurement.js` because Adobe Analytics requires synchronous execution of the two scripts. Using the visitor API is **optional** but if you do, we make it available on the page.

To use Adobe's Marketing Cloud Visitor ID Service, enter your **Marketing Cloud Organization ID** in the **Advanced Options** in the Segment app.

## Cloud-mode - aka Server-side

"Cloud-mode" data is data sent _without_ bundling the Segment-Adobe-Analytics SDK. It can be sent using mobile libraries, Analytics.js, and other server-based sources.

*For more information on mobile native integrations using Segment's iOS and Android Adobe Analytics SDKs, see the [next section in this doc](#setting-up-adobe-analytics-for-mobile).*

**Important**: For data sent from server-side libraries, you need to predefine your events and custom properties to send events to Adobe Analytics server-side destination. However, *for data sent from mobile devices*, we send *every* event along automatically, and you can use the Adobe Analytics [processing rules](https://marketing.adobe.com/resources/help/en_US/reference/processing_rules.html) UI to map actions, lifecycle dimensions, and custom properties from `contextData` to events, props and eVars.

When we generate the XML to send to Adobe, there are a few things that happen:

1. If your **Timestamp Option** is **Timestamp Enabled** or **Timestamp Optional**, we set the `<timestamp>`.

2. For `.track()` events, we set `<channel>` as `properties.channel` or fallback to `properties.category`.
   If neither property is provided, we don't set this XML tag.

   For `.page()` events, this XML tag is set as the `category` of the page call, which is sent by providing both `category` and `name` (ie. `.page('Some Category', 'Some Name');`)

3. For `.track()` events, we set `<pageName>` as `properties.pageName`, `properties.page`, `context.page.title`, `context.screen.name` or `'None'` (in order of precedence).
   For `.page()` calls, we set the tag as the `name`. This can be sent by providing the first parameter: `.page('Some Name');`

4. Since Adobe Analytics does not [support sending timestamped hits a `<visitorID>`](https://marketing.adobe.com/resources/help/en_US/sc/implement/timestamps-overview.html), if you have set your Report to **Timestamp Disabled**, we set `<visitorID>` as these values in order of precedence:

   - `visitorId` passed manually from the client. Adobe Analytics sets a cookie with their own `visitorId` on the client. You can read from this cookie and pass it to your servers manually and then send it to Segment. This is generally unnecessary, but may be worth considering if you're concerned about unique user identification.

      (In Node.js)
   ```javascript
   analytics.track({
      userId: '019mr8mf4r',
      event: 'Gotta catch em all',
      properties: {
        caught: 1738
      },
      integrations: {
        'Adobe Analytics': {
          visitorId: '12345'
        }
      }
   });
   ```

 - `userId`
 - `anonymousId`

5. We map a number of other supported XML tags. For example, we set `<ipAddress>` with the `ip` of the call.

 **Note**: For server side libraries, the `ip` is by default be the `ip` address of your company servers, NOT the customers' own. This means that for server side events, it is best practice to record the customer's `ip` from their requests, and manually send that to Segment as `context.ip`.

 We also set your `context.locale` (which is automatically collected if using a mobile library) to `<language>`. Since mobile libraries also send your `traits` from previous `.identify()` calls inside the `context.traits`, we try to send `<state>` and `<zip>` by looking up `context.traits.address.state` and `context.traits.postalCode` respectively, as noted in our [identify spec](/docs/connections/spec/identify). If these lookups fail, we default to `properties.state` and `properties.zip`.

 For mobile libraries, since we can detect whether the event occurred while the user had a wifi connection, we also send the `<connectionType>` as `lan/wifi`. All other events are treated as `Mobile Carrier` inside Adobe's Mobile Web Reports.

 We also calculate your timezone offset from UTC/GMT as required by Adobe, and send `<timezone>` based on your `context.timezone` and the `timestamp` fields.

 Since many out of the box reports from Mobile Web services rely on the `<userAgent>` tag, we also map this to your `context.userAgent`.

 **Important**: The Android library can collect the `userAgent` automatically - however, the iOS library cannot do so. However, since we do collect other contextual metadata about your device, we render a valid iOS userAgent string that populates all your Mobile Web Reports.

6. If you are using the [Marketing Cloud ID Service](https://marketing.adobe.com/resources/help/en_US/mcvid/mcvid_overview.html), you can pass the **Marketing Cloud Visitor ID** as an destination specific setting and we set that as `<marketingCloudVisitorID>`.

 (In Node.js)
 ```javascript
 analytics.track({
    userId: '019mr8mf4r',
    event: 'Gotta catch em all',
    properties: {
     caught: 1738
    },
    integrations: {
      'Adobe Analytics': {
        marketingCloudVisitorId: '12345'
      }
    }
 });
 ```

7. For `.track()` events only, set some custom link report parameters such as:

  - `<linkType>` to `'o'` (stands for `'Other'`)
  - `<linkURL>` to `context.page.url` with a default fallback to `'No linkURL provided'`
  - `<linkName>` to `'Link Name - <whatever was set as the linkURL>'`

8. On the server, we send *all* property values as `contextData.$propertyKey` by default, so you can further map them with Adobe Processing Rules. You can also choose to add a prefix for properties in the destination's advanced settings page. Properties with a prefix are sent as `contextData.<prefix>.$propertyKey`.

9. For Segment [native mobile spec]() events, we automatically translate them and forward them to Adobe Analytics as [Mobile Services Lifecycle Metrics](https://marketing.adobe.com/resources/help/en_US/mobile/ios/metrics.html).

Specifically, we map the following events:

<table>
  <tr>
    <td>Segment Event Name</td>
    <td>Adobe Analytics Event Name</td>
  </tr>
  <tr>
    <td>Application Opened</td>
    <td>`a.LaunchEvent`</td>
  </tr>
  <tr>
    <td>Application Installed</td>
    <td>`a.InstallEvent`</td>
  </tr>
  <tr>
    <td>Application Updated</td>
    <td>`a.UpgradeEvent`</td>
  </tr>
</table>

The following metrics and dimensions are supported:

- `a.AppID`
- `a.HourOfDay`
- `a.DayOfWeek`
- `a.OSVersion`
- `a.DeviceName`
- `a.CarrierName`

Support for additional "stateful" lifecycle dimensions is coming in a future Adobe Analytics release. If there are any missing that are of importance to you, let us know and we'll get them shipped!

10. Set `<userAgent>` with `context.userAgent` (which is automatically populated by our libraries). Note this is omitted for mobile events and superseded by `DeviceName` and `OSVersion`.

11. For any ecommerce events, we try to set `<products>` if possible. The product description has the same logic as the ecommerce event processing done on the client side destination.

13. We follow the same logic as the client side, and look up any mappings for custom properties and generate the proper `<eVar>`, `<prop>`, and `<hVar>` XML tags.

14. Finally, we send the event `POST` request to your **Tracking Server URL**!


## Implementing Segment for Adobe Analytics

This section contains information about how to implement Segment calls for Adobe Analytics. You can choose to use the [automatic Ecommerce Spec mapping](#using-default-ecommerce-spec-events) so you don't have to set up a mapping in Segment and Adobe. If you need more event types or different ones, you can implement custom [Page calls](#creating-page-calls) and [Track events](#creating-track-events) to add to the standard Ecommerce spec. <!-- TODO: You can also override or opt-out of automatically mapping the Ecommerce events by passing `integration: AA: false` as part of your call.-->

### Using default Ecommerce Spec Events

The Adobe Analytics destination automatically works with our standard [Ecommerce API](/docs/connections/spec/ecommerce/v2/), and automatically maps the follwing events between Segment and Adobe Analytics.

<table>
  <tr>
    <td>Segment Event Name</td>
    <td>Adobe Analytics Event Name</td>
  </tr>
  <tr>
    <td>Product Viewed
    <br>Product List Viewed
    </td>
    <td>`prodView`</td>
  </tr>
  <tr>
    <td>Product Added</td>
    <td>`scAdd`</td>
  </tr>
  <tr>
    <td>Product Removed</td>
    <td>`scRemove`</td>
  </tr>
  <tr>
    <td>Cart Viewed</td>
    <td>`scView`</td>
  </tr>
  <tr>
    <td>Checkout Started</td>
    <td>`scCheckout`</td>
  </tr>
  <tr>
    <td>Order Completed</td>
    <td>`purchase`</td>
  <tr>
    <td>Cart Opened</td>
    <td>`scOpen`</td>
  </tr>
  </tr>
</table>

Segment sends the Ecommerce event data like a standard `track` event. If you implement Segment events using the Ecommerce spec and naming conventions, you do **NOT** need create a mapping in your Segment settings. These Ecommerce events are automatically mapped and sent to Adobe Analytics along with product description data. You don't need to map **event names** unless you want to set them as the value of an `eVar`.

Ecommerce properties such as `orderId` and `products` are also sent automatically. However, if you use other custom properties and want to send them to Adobe's `eVar`, `prop`, `hVar`, or `lVar` variables, you *do* need to map them as properties in your Segment settings.

### Example using Segment Ecommerce spec

Given the sample `Order Completed` Segment event below:

```js
analytics.track('Order Completed', {
 orderId: '50314b8e9bcf000000000000',
 total: 30.00,
 revenue: 25.00,
 shipping: 3.00,
 tax: 2.00,
 discount: 2.50,
 coupon: 'hasbros',
 currency: 'USD',
 products: [
   {
     id: '507f1f77bcf86cd799439011',
     sku: '45790-32',
     name: 'Monopoly: 3rd Edition',
     price: 19,
     quantity: 1,
     category: 'Games'
   },
   {
     id: '505bd76785ebb509fc183733',
     sku: '46493-32',
     name: 'Go Pro',
     price: 99,
     quantity: 2,
     category: 'Electronics'
   }
 ]
});
```
Segment does the follwing:

1. Sets `window.s.products` with the product description string.

   The product description is a semi-colon delimited string per product which is additionally delimited by commas if you have multiple products. The string format per product is `[category];[name];[quantity];[total]`. Total is calculated by multiplying price and quantity for each product.

   **Note**: You can choose whether to map the `name`, `sku`, or `id` for each item in the `products` array. So you could alternatively send product descriptions with `[category];[sku];[quantity];[total]`. To configure this option, go to your Adobe Analytics settings in Segment, locate the Advanced Options, and select the mapping from the **Product Identifier**. The `name` is the default identifier.

   For the example above, we would set `window.s.products` to `'Games;Monopoly: 3rd Edition;1;19,Electronics;Go Pro;2;99'`.

   The default fallback value for `quantity` is `1`, and for `price` it is `0`.

   **Important**: You should't use this option if any items in the `products` array have property values that include commas or semi-colons. Adobe Analytics uses these characters as delimiters.

2. Updates common variables such as `channel`, `campaign`, `state`, `zip`, and `pageName`. These values are set if they exist at the property level, your existing Adobe Analytics variables already attached on the `window.s` object, or `context.page.title` (for `pageName`).

3. Sets `window.s.events` with the corresponding Adobe Analytics naming convention. The example above wouild set this as `'purchase'`.

4. Checks if the event name is mapped as an `eVar` and if so, set it on the `window.s`.

5. Checks if any other top level properties (not the custom properties at the item level inside `products` array) have been mapped to a custom variable in the Segment settings such as `eVar`, `prop`, and `hVar`. If so, set them on the `window.s`.

6. Sets `window.s.purchaseID` and `window.s.transactionID` as the `orderId`, which for the example above would be `'50314b8e9bcf000000000000'`.
   Note that this is only for `Order Completed` events.

   The default `currencyCode` we set upon pageload is `USD`. However, we check if you have passed any currency other than this in your event by checking `properties.currency`.

   **Important**: To collect `transactionID`, make sure to enable the transactionID storage setting inside your [Reporting Suite](https://marketing.adobe.com/resources/help/en_US/sc/implement/transactionID.html)!

7. Attaches the `timestamp` as `window.s.timestamp` if your **Timestamp Option** is **Timestamp Enabled** or **Timestamp Optional**.

8. Sets `window.s.linkTrackEvents` to the Adobe Analyics event name, which would be `purchase` for the example above.

9. Sets `window.s.linkTrackVars` which is a string of keys we want Adobe Analytics to read from the `window.s` object when the request is sent. For the example above, the value of `linkTrackVars` would be set as `'pageName,events,products,purchaseID,transactionID,timestamp'`.

10. Finally, fires off the event using `window.s.tl(true, 'o', 'Order Completed');`.

### Creating Page calls

By default, the Segment snippet includes an empty `page` call. Page calls are more similar to the native Adobe tracking methodology, and don't require as extensive a mapping process.

When you make a `page` call, here's what Segment does:

1. Sets the Adobe property `window.s.pageName` to the `name` of the page call.
   By default, a Segment `.page()` call sets this property as `undefined` since no parameters are passed, but if you include a `name` such as `.page('Home')`, Segment sets `window.s.pageName` to `'Home'`.

   **Note**: If you don't pass a `name`, Adobe Analytics uses the `url` as the page name by default.

2. Sets the Adobe property `window.s.events` to the `name` from your `.page(<name>)` call.

3. Checks if the page call is associated with a `userId` from a previous `.identify()` call. If so, we set the `userId` as `window.s.visitorID`.

  **IMPORTANT**: Adobe Analytics [does not support setting visitorID](https://marketing.adobe.com/resources/help/en_US/sc/implement/timestamps-overview.html) if you are sending a timestamped call. So Segment first checks if your **Timestamp Option** is `disabled` _and_ that a `userId` exists on the event, and only then sets `window.s.visitorID`.

4. Checks for some common properties, and sets them on the `window.s` object:

   - `channel`
   - `campaign`
   - `state`
   - `zip`

   We first use the `properties` you sent using the `.page()` call. An example page call in order to set the four properties above would be:

   ```js
   analytics.page({
     channel: 'Laptops',
     campaign: '0813',
     state: 'RI',
     zip: '02818'
   });
   ```

   For `campaign`, we use the [Segment spec](/docs/connections/spec/common) and check `context.campaign.name` first before checking `properties.campaign`.

   Alternatively, if you already set any of these properties on your existing Adobe Analytics instance on the page (`window.s.channel`, `window.s.campaign`, etc.), we use that as the default value. This way you can easily set a default values for all your web pages, but can still programmatically change them for each page if needed.

5. If your **Timestamp Option** is either **Timestamp Enabled** or **Timestamp Optional**, we attach the `timestamp` to `window.s.timestamp`.
   Make sure this setting matches your *actual* timestamp setting inside Adobe Analytics for the same Report Suite ID.

6. Checks if any of the page call's properties are mapped to any custom Adobe Analytics variables such as `eVar`, `props`, and `hVar`.

   Given the mapping setting below:

   ![](images/mapping-1.png)

   If you make the following page call:

   ```js
   analytics.page({
     browser: 'chrome',
     searchTerm: 'swim shorts',
     section: 'swimwear'
   });
   ```

   We set the following properties on the `window.s` object:

   - `window.s.prop1 = 'chrome'`
   - `window.s.eVar7 = 'swim shorts'`
   - `window.s.eVar3` is set to the `url` of the page where the call was made (`.page()` automatically sets a `url` property)
   - `window.s.hier1 = 'swimwear'`

7. Finally, Segment flushes the pageview request to Adobe Analytics using `window.s.t()`.

### Creating Custom Track events

Before you send Events from Segment to Adobe Analytics, you must first list which `events` to collect so you can set up a mapping. This list of `.track()` events must be defined in both Adobe Analytics, and the Segment destination settings UI, including the properties to send as custom variables.

This means that you **must** create a mapping for each event and property to a corresponding Adobe Analytics `event`, `prop`, or `eVar`.

The image below shows an example of how you might map variables in Segment:

![](images/mapping-2.png)

Using the sample settings in the image above, if you make the `.track()` call example below:

```js
analytics.track('Watched Video', {
  plan: 'free',
  videoName: 'The Uptick'
});
```

Here's what happens:

1. First Segment checks if the event name, `'Watched Video'`, is mapped in your Segment settings for Adobe Analytics.
   If you haven't configured a mapping for this event name, Segment does nothing and aborts the call.
   If a mapping is configured, we set `window.s.linkTrackEvents` and `window.s.events` to the corresponding Adobe Analytics event name as specified in the mapping, in this example `'event1'`.

2. Next, if the setting for  **Timestamp Option** is either **Timestamp Enabled** or **Timestamp Optional**, Segment maps the `timestamp` to `window.s.timestamp`.

3. If any properties were included in the event's mapping or on the `window.s` object, we update common variables such as `channel`, `campaign`, `state`, `zip` with the track call values.

4. Next, we check if the Segment event name, `Watched Video` is mapped to an `eVar`. Since it is in the example case above, we set `window.s.eVar3` as `'Watched Video'`.

5. We check if any other properties are mapped to either a `prop`, `eVar`, or `hVar`. For the example above, we'd set `window.s.prop1` as `'free'` and `window.s.eVar4` as `'The Uptick'`.

6. Next, we try to set `window.s.pageName` to one of the following values, in order of precedence:

  - `properties.pageName` (for backward compatibility)
  - `options.pageName` (if you already have `window.s.pageName` defined on the web page)
  - `context.page.title` (which is automatically tracked by our Analytics.js library, and always has a value)
   If you don't configure any other `pageName` mappings, `window.s.pageName` is set to the value of the `<title>` tag in the page where the `.track()` call was fired.

7. Next, we create a comma-delimited joined string of variable keys to send as  `window.s.linkTrackVars`. This tells Adobe Analytics which properties on the `window.s` object to send with this event.
   In the example above, the a string would be `'eVar3,events,pageName,timestamp,eVar3,prop1'`.

8. Finally, we flush the request to Adobe Analytics using `window.s.tl(true, 'o', 'Watched Video')`

  *Note*: `true` sets a `500ms` delay to give your browser time to flush the event. It also signifies to Adobe that this event is something other than a `href` link. The `'o'` stands for `'Other'`, as opposed to `'d'` for `'Downloads'` and `'e'` for `'Exit Links'`. The final parameter is the link name as it appears in reports inside Adobe Analytics.


## Adobe Analytics List Variables - lVars

You can map your Segment properties in your settings to any of your three list variables.

You can either send the property value as a comma delimited string (ie. `'brady,edelman,blount'`) or as an array (`['brady', 'edelman', 'blount']`). If you choose to send them as an array, Segment defaults joins it as a comma delimited string before sending it to Adobe. To set up a custom delimiter, see the [documentation section on custom delimiters](https://segment.com/docs/connections/destinations/catalog/adobe-analytics/#custom-delimiter).

## Adobe Analytics Properties - props

You can map your Segment properties in your settings to any of your Adobe props.

You can either send the property value as a string (ie. `'brady'`) or as an array (`['brady', 'edelman', 'blount']`). If you choose to send them as an array, Segment defaults to join it so that it is a pipe (`|`) delimited string before sending to Adobe (ie. `'brady|edelman|blount'`). If you would like to set up a custom delimiter  see our documentation [here](https://segment.com/docs/connections/destinations/catalog/adobe-analytics/#custom-delimiter) for configuring custom delimiters.

## Options

The Adobe Analytics destination offers a couple of different ways to configure behavior using destination specific options. These are options that are defined in your event payloads rather than in the Segment app. To use these options, you must define them as values of an object in the following property of your Segment event payloads:

```javascript
integrations: {
  'Adobe Analytics': {
    // insert options here...
  }
}
```
Here's an example of a `track` call using this:

```javascript
 analytics.track({
    userId: '019mr8mf4r',
    event: 'Gotta catch em all',
    properties: {
     caught: 1738
    },
    integrations: {
      'Adobe Analytics': {
        // Insert custom options here...
      }
    }
 });
 ```

The section below outlines each of these options and what they do.

### Events
This option allows you to associate specific Adobe events with individual Segment events.

```javascript
 analytics.track({
    userId: '019mr8mf4r',
    event: 'Gotta catch em all',
    properties: {
     caught: 1738
    },
    integrations: {
      'Adobe Analytics': {
        events: ['scAdd', 'event2']
      }
    }
 });
 ```

### IMS Region
This option allows you to associate events with IMS Regions. **Note. If you specify this you must also define a `Marketing Cloud Visitor Id`.**

```javascript
 analytics.track({
    userId: '019mr8mf4r',
    event: 'Gotta catch em all',
    properties: {
     caught: 1738
    },
    integrations: {
      'Adobe Analytics': {
        imsregion: 'aamlh'
      }
    }
 });
 ```

### Marketing Cloud Visitor ID
This option allows you to associate a specific Marketing Cloud Visitor ID (mcvid) with the event.

```javascript
 analytics.track({
    userId: '019mr8mf4r',
    event: 'Gotta catch em all',
    properties: {
     caught: 1738
    },
    integrations: {
      'Adobe Analytics': {
        marketingCloudVisitorId: 'user1234'
      }
    }
 });
 ```

### Visitor ID
This option allows you to associate a standard Visitor ID with the event.

```javascript
 analytics.track({
    userId: '019mr8mf4r',
    event: 'Gotta catch em all',
    properties: {
     caught: 1738
    },
    integrations: {
      'Adobe Analytics': {
        visitorId: 'user1234'
      }
    }
 });
 ```

 ## Link Names, Link URLs, Link Types
 See [this](#setting-custom-linktypes-linknames-and-linkurls) section for information about configuring these as options.

## Configuring Adobe Analytics Settings

### Merchandising Events

The Merchandising Events settings allow you to set eVars and events on a per-product basis within the "products" string, and support increment and currency events. This provides robust product string support, which you can read more about [here](https://marketing.adobe.com/resources/help/en_US/sc/implement/products.html).

The setting operates as follows:

- Keys off of the Segment `track` call event name, or for `page` support, a `property.eventName`
- Maps to the Adobe event to send in as an increment or currency event.
- Reads if the event is scoped to the product or event level.
- [optional] Sets a value on the event. This value is the increment or currency to pass to Adobe. If you don't include a value, Segment sends the event without one, and Adobe understands this as an increment of 1. If you configure a value and the value is not present on the `track` or `page` call, we do not send the event to Adobe.
- Map of product eVars to set on the products string. This is only supported at the product level, as expected by Adobe Analytics.

Let's take the following example:

![](images/merchandising-events.png)

The configuration in the example image above configures a `Product Added` Segment event which sends Adobe Analytics:
- `event1` in `s.events` with the value passed from `properties.increment`.
- `event2` on `s.products` with the value passed from `properties.products.price`.
- the value for `properties.products.priceStatus` in `eVar1`
- the value for `properties.products.coupon` in `eVar2`


_Considerations_:
- We also pass in `event2` without a value on `s.events`, as this is a requirement for Adobe.
- We still map to Adobe's predefined `scAdd` event.
- we use dot notation for product values, for example `products.priceStatus` parses through properties for this value.
  - This includes the product string, so if you want a value nested in products, you would configure `products.priceStatus`.

Once you have the above example mapping configured, you send in the relevant event to Segment.

For example, in a Node.js environment we sent:

```javascript
analytics.track({
    userId: '098094356890',
    event: 'Product Added',
    properties: {
      cart_id: '124efsdovnt4edvsldfpf',
      product_id: '342039402fsl12njfs',
      sku: 'G-32',
      priceStatus:'promo',
      increment: i,
      category: 'Games',
      name: 'The Settlers of Catan',
      brand: 'Kosmos',
      variant: 'Cities and Knights',
      price: 34.99,
      quantity: 1,
      coupon: 'MAYDEALS',
      position: 2,
      url: 'https://www.example.com/product/path',
      image_url: 'https://www.example.com/product/path.jpg'
    }
  });
  ```

The `s.events` call passes in `scAdd` and `event1= 20`, and `s.products` passes in `event2=18.99` and `evar1=discounted|evar2=MAYDEALS`.

The resulting request payload to Adobe looks like:

```xml
<events>scAdd,event1=20,event2</events>
<products>Games;Monopoly: 3rd Edition;1;18.99;event2=18.99;eVar1=discounted|eVar2=MAYDEALS</products></request>
```

#### Page Example:

```javascript
analytics.page({
    userId: '098094356890',
    event: 'Product Added',
    properties: {
      cart_id: '124efsdovnt4edvsldfpf',
      product_id: '342039402fsl12njfs',
      sku: 'G-32',
      priceStatus:'promo',
      increment: i,
      category: 'Games',
      name: 'The Settlers of Catan',
      brand: 'Kosmos',
      variant: 'Cities and Knights',
      price: 34.99,
      quantity: 1,
      coupon: 'MAYDEALS',
      position: 2,
      url: 'https://www.example.com/product/path',
      image_url: 'https://www.example.com/product/path.jpg'
    },
    integrations: {
    "Adobe Analytics": {
      "events": ["scAdd"]
    }
  },
  });
  ```
**Note** To send `<events>` on `page`, you must pass in `events` on the Adobe Analytics integration option. We merge the configured event within the setting with the array passed in. In the example above, we pass in `scAdd`, as this is not automatically mapped on `page`.

### Custom Delimiter

For list variables and props, you can either send the property value as a comma delimited string (ie. `'brady,edelman,blount'`) or as an array (`['brady', 'edelman', 'blount']`). In your Segment settings UI, **List Variable and Prop Custom Delimiter: Server-Side Only**, you can configure a custom delimiter to join the array before sending to Adobe. If you choose to send those properties as an array, without configuring a custom delimiter, we default to join it so that it is a comma delimited string.

**Note:** You must configure the custom delimiter in the Adobe Analytics dashboard for each list variable and prop prior to instantiating this mapping.

For the following List Variable and Prop Mapping configured in the Segment UI:
![](images/list-var-map.png)

![](images/prop-map.png)

Here is an example of how to configure the Segment custom delimiter mapping:
![](images/map-delimiter.png)

When you send an event:
```javascript
analytics.track({
   userId: 'user12345',
   event: 'Event1',
   properties: {
    list_var1: ['hello', 'world'],
    prop1: ['howdy', 'yall']
   }
});
```

Segment concatenates `list_var1` into `hello|world` and `prop1` into `howdy:yall` before sending it to Adobe. The XML request to Adobe includes `<list1>hello|world<list1>` and `<prop1>howdy:yall<prop1>`.

### No Fallbacks for VisitorId
As Adobe Analytics customers begin to migrate from using visitorId to using the marketingCloudVisitorID (MCVID), we introduced a new setting called **No Fallbacks for Visitor ID**, to assist in this transition. If you disable  **Drop Visitor ID**, Segment sends a `<visitorID>` in these three scenarios:

1. A customer isn't sending timestamps (meaning the Timestamp Option setting is set to disabled)
2. A customer is using hybrid timestamp mode and is sending `visitorId`
3. A customer is using hybrid timestamp mode and is sending `visitorId` and timestamp

**NOTE:** If one of these three scenarios is met and a customer does not send a `visitorId` in the integrations object, Segment falls back to setting the visitorId to either a Segment `userId` or `anonymousId`. This timestamp dependent functionality of when Segment sends a visitorID does not change when you enable **No Fallbacks for Visitor ID**. The **No Fallbacks for Visitor ID** setting is added functionality on top of that.

The **No Fallbacks for Visitor ID** setting functionality behaves as such, if a customer is sending data in one of the three above scenarios, Segment checks if the setting is enabled and if they are sending a marketingCloudVisitorId in the integrations object. If they meet both of those criteria Segment removes the fallback behavior and sets `<visitorID>` to the value passed in the destination specific setting for `visitorId`. If that value is not passed, it leaves it blank.
