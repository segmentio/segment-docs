---
title: Mapping Segment to Adobe Analytics
strat: adobe
---

This page explains in detail how to configure your Segment Adobe Analytics Destination settings to customize how your Segment calls are formatted when they're sent to Adobe Analytics.

Segment uses a user-action data model, which uses different types of calls to track a user's different activities on a website or app. Adobe Analytics uses page views as the basic unit of activity, and specific data variables such as "props", eVars, lVars, and hVars to add details that allow more granular analysis. The Adobe Analytics destination settings in the Segment App allow you to create mappings between properties in your Segment calls and Adobe's expected format.

> success ""
> **Tip**: Mobile implementations use the `ADBMobileConfig.json` file to store the settings that you would otherwise enter in the Adobe Analytics destination settings in the Segment app. This file includes the Report Suite ID, Timestamp Option, Tracking Server Secure URL, Tracking Server URL, and Use Secure URL for Server-side settings. See the [Segment Adobe Analytics Mobile documentation](/docs/connections/destinations/catalog/adobe-analytics/mobile) to learn more.

## Implementing Success Events

You can choose to use the [automatic Ecommerce Spec mapping](#using-default-ecommerce-spec-events) when you start sending Success Events to Adobe, which means you don't have to set up mappings in Segment and Adobe. If you need event support beyond the the [standard Ecommerce spec](/docs/connections/spec/ecommerce/v2/), for example to support more event types or different ones, you can implement custom [Track events](#creating-custom-track-events) or [Page calls](#creating-page-calls).

### Using default Ecommerce Spec Events

The Adobe Analytics destination automatically works with Segment's standard [Ecommerce Spec](/docs/connections/spec/ecommerce/v2/). Segment automatically maps the following events to Adobe Analytics events if you are using a device-mode ("bundled") destination for iOS, Android, Analytics.js, or if you are sending unbundled events from a [Server library](/docs/connections/sources/catalog/).

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

Segment sends the Ecommerce event data to Adobe just as it would send a standard Track event. These Ecommerce events are automatically mapped and sent to Adobe Analytics along with product description data. If you implement Segment events using the Ecommerce spec and naming conventions, you do **NOT** need to create a mapping in your Segment Adobe destination settings. You only need to map **event names** if you want to set them as the value of an `eVar`. To learn more about configuring `eVars` see [the section below on configuring conversion variables in your destination settings.](#conversion-variables---evars)

Ecommerce properties such as `orderId` and `products` are also sent automatically. However, if you use other custom properties and want to send them to Adobe's `eVar`, `prop`, `hVar`, or `lVar` variables, you *do* need to map them as properties in your Segment Adobe Analytics destination settings.

### Example using Segment Ecommerce spec

Given the sample `Order Completed` Segment event below, you can see how the original Track event is mapped to the Adobe event in the tab to the right.

{% codeexample %}
{% codeexampletab JavaScript Track event payload %}

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
{% endcodeexampletab %}
{% codeexampletab Settings JSON %}

```json
{
   "reportSuiteId":"segmenttestreportsuite",
   "trackingServerUrl":"jimsbrims.sc.omtrdc.net",
   "trackingServerSecureUrl":"jimsbrims.sc.omtrdc.net",
   "useSecureServerUrl":false,
   "timestampOption":"disabled",
   "enableTrackPageName":true,
   "productIdentifier":"name",
   "disableVisitorId":false,
   "preferVisitorId":false,
   "sendBothTimestampVisitorId":false,
   "events":[

   ],
   "customDelimiter":{

   },
   "removeFallbackVisitorId":false,
   "useLegacyLinkName":true
}
```

{% endcodeexampletab %}
{% codeexampletab Outbound Server-Side XML Payload %}

```xml
<request>
   <scXmlVer>1.0</scXmlVer>
   <reportSuiteID>segmenttestreportsuite</reportSuiteID>
   <trackingServerUrl>jimsbrims.sc.omtrdc.net</trackingServerUrl>
   <visitorID>user-id</visitorID>
   <pageName>None</pageName>
   <pageURL>http://www.mysite.com</pageURL>
   <ipAddress>0.0.0.0</ipAddress>
   <currencyCode>USD</currencyCode>
   <contextData>
      <total>30</total>
      <transactionID>50314b8e9bcf000000000000</transactionID>
      <purchaseID>50314b8e9bcf000000000000</purchaseID>
      <revenue>25</revenue>
      <shipping>3</shipping>
      <tax>2</tax>
      <discount>2.5</discount>
      <coupon>hasbros</coupon>
      <currency>USD</currency>
      <a>
         <action>Order Completed</action>
         <HourOfDay>0</HourOfDay>
         <DayOfWeek>3</DayOfWeek>
      </a>
   </contextData>
   <linkType>o</linkType>
   <linkURL>http://www.mysite.com</linkURL>
   <linkName>Link Name - http://www.mysite.com</linkName>
   <events>purchase</events>
   <products>Games;Monopoly: 3rd Edition;1;19.00,Electronics;Go Pro;2;198.00</products>
</request>
```

{% endcodeexampletab %}
{% endcodeexample %}

When you use Segment's Analytics.js Device Mode integration, Segment does the following:

1. Sets `window.s.products` with the product description string.

   The product description is a semi-colon delimited string per product which is additionally delimited by commas if you have multiple products. The string format per product is `[category];[name];[quantity];[total]`. Total is calculated by multiplying price and quantity for each product.

   **Note**: You can choose whether to map the `name`, `sku`, or `id` for each item in the `products` array. So you could alternatively send product descriptions with `[category];[sku];[quantity];[total]`. To configure this option, go to your Adobe Analytics settings in Segment, locate the Advanced Options, and select the mapping from the **Product Identifier**. The `name` is the default identifier.

   For the example above, Segment would set `window.s.products` to `'Games;Monopoly: 3rd Edition;1;19,Electronics;Go Pro;2;198'`.

   The default fallback value for `quantity` is `1`, and for `price` it is `0`.

   **Important**: Don't use this option if any items in the `products` array have property values that include commas or semi-colons. Adobe Analytics uses these characters as delimiters.

2. Updates common variables such as `channel`, `campaign`, `state`, `zip`, and `pageName`. These values are set if they exist at the property level, your existing Adobe Analytics variables already attached on the `window.s` object, or `context.page.title` (for `pageName`).

3. Sets `window.s.events` with the corresponding Adobe Analytics naming convention. The example above would set this as `'purchase'`.

4. Checks if the event name is mapped as an `eVar` and if so, sets it on the `window.s`.

5. Checks if any other top-level properties (not the custom properties at the item level inside `products` array) have been mapped to a custom variable in the Segment settings such as `eVar`, `prop`, and `hVar`. If so, set them on the `window.s`.

6. Sets `window.s.purchaseID` and `window.s.transactionID` as the `orderId`, which for the example above would be `'50314b8e9bcf000000000000'`.
   Note that this is only for `Order Completed` events.

   However, Segment checks the `properties.currency` property to see if you passed a currency in your event. If you did not, the default `currencyCode` set on page load is `USD`.

   **Important**: To collect `transactionID`, make sure you enable the transactionID storage setting inside your [Adobe Reporting Suite](https://marketing.adobe.com/resources/help/en_US/sc/implement/transactionID.html)!

7. Attaches the `timestamp` as `window.s.timestamp` if your **Timestamp Option** (in the Adobe settings in Segment) is set to **Timestamp Enabled** or **Timestamp Optional**.

8. Sets `window.s.linkTrackEvents` to the Adobe Analytics event name. In the example above, this is `purchase`.

9. Sets `window.s.linkTrackVars` which is a string of keys that Adobe Analytics reads from the `window.s` object when you send the request. For the example above, the value of `linkTrackVars` would be set as `'pageName,events,products,purchaseID,transactionID,timestamp'`.

10. Finally, sends the event using `window.s.tl(true, 'o', 'Order Completed');`.

### Creating Custom Track events

You can send custom Track events to Adobe to create events that are not included in the standard Ecommerce spec. Segment strongly recommends that you create a tracking plan for both your Segment and Adobe Analytics events _before_ you send any events or properties to Adobe. Once you have your tracking plan prepared, you can use the list of `events` to set up a mapping in the Segment destination settings UI.

When configuring the mapping, the list of Track events must be defined in both Adobe Analytics, and the Segment destination settings UI, including the properties to send as custom data variables.

This means that you **must** create a mapping for each event and property to a corresponding Adobe Analytics `event`, `prop`, or `eVar`.

The image below shows an example of how you might map an event and the corresponding custom variables in the Segment destination settings UI:

![](/docs/connections/destinations/catalog/adobe-analytics/images/event-mapping.png)

![](/docs/connections/destinations/catalog/adobe-analytics/images/prop-mapping.png)

![](/docs/connections/destinations/catalog/adobe-analytics/images/eVar-mapping.png)

Using the sample settings in the image above, if you make the Track call example below:

```js
analytics.track('Watched Video', {
  plan: 'free',
  videoName: 'The Uptick'
});
```

Here's what happens to this event sent from the browser using Segment's Analytics.js library or another Device Mode integration:

1. First Segment checks if the event name, `'Watched Video'`, is mapped in your Segment settings for Adobe Analytics.
   If you haven't configured a mapping for this event name, Segment does nothing and aborts the call.
   If a mapping is configured, Segment sets `window.s.linkTrackEvents` and `window.s.events` to the corresponding Adobe Analytics event name as specified in the mapping, in this example `'event1'`.

2. Next, if the setting for  **Timestamp Option** is either **Timestamp Enabled** or **Timestamp Optional**, Segment maps the `timestamp` to `window.s.timestamp`.

3. If any properties were included in the event's mapping or on the `window.s` object, Segment updates common variables such as `channel`, `campaign`, `state`, `zip` with the track call values.

4. Next, Segment checks if the Segment event name, `Watched Video` is mapped to an `eVar`. Because it _is_ mapped in the example case above, Segment sets `window.s.eVar3` as `'Watched Video'`.

5. Segment checks if any other properties are mapped to either a `prop`, `eVar`, or `hVar`. For the example above, `window.s.prop1` is set as `'free'` and `window.s.eVar4` is set as `'The Uptick'`.

6. Next, Segment tries to set `window.s.pageName` to one of the following values, in order of precedence:

  - `properties.pageName` (for backward compatibility)
  - `options.pageName` (if you already have `window.s.pageName` defined on the web page)
  - `context.page.title` (which is automatically tracked by Analytics.js, and always has a value)
   If you don't configure any other `pageName` mappings, `window.s.pageName` is set to the value of the `<title>` tag in the page where the `.track()` call was fired.

7. Next, Segment creates a comma-delimited joined string of variable keys to send as `window.s.linkTrackVars`. This tells Adobe Analytics which properties on the `window.s` object to send with this event.
   In the example above, the string would be `'eVar3,events,pageName,timestamp,eVar3,prop1'`.

8. Finally, Segment flushes the request to Adobe Analytics using `window.s.tl(true, 'o', 'Watched Video')`

  *Note*: `true` sets a `500ms` delay to give your browser time to flush the event. It also tells Adobe that this event is something other than a `href` link. The `'o'` stands for `'Other'`, as opposed to `'d'` for `'Downloads'` and `'e'` for `'Exit Links'`. The final parameter is the link name as it appears in reports inside Adobe Analytics.

### Creating Page calls

By default, the Segment snippet includes an empty Page call. Page calls are more similar to the native Adobe tracking methodology, and don't require as extensive a mapping process.

When you make a `page` call, here's what Segment does from the browser when you use Segment's Analytics.js or another Device Mode integration:

1. Sets the Adobe property `window.s.pageName` to the `name` of the page call.
   By default, a Segment `.page()` call sets this property as `undefined` since no parameters are passed, but if you include a `name` such as `.page('Home')`, Segment sets `window.s.pageName` to `'Home'`.

   **Note**: If you don't pass a `name`, Adobe Analytics uses the `url` as the page name by default.

2. Sets the Adobe property `window.s.events` to the `name` from your `.page(<name>)` call.

3. Checks if the page call is associated with a `userId` from a previous `.identify()` call. If so, Segment sets the `userId` as `window.s.visitorID`.

  **IMPORTANT**: Adobe Analytics doesn't support setting visitorID if you send a timestamped call. So Segment first checks if your **Timestamp Option** is `disabled` _and_ that a `userId` exists on the event, and only then sets `window.s.visitorID`.

4. Checks for some common properties, and sets them on the `window.s` object:

   - `channel`
   - `campaign`
   - `state`
   - `zip`

   Segment first uses the `properties` you sent using the `.page()` call. An example page call in order to set the four properties above would be:

   ```js
   analytics.page({
     channel: 'Laptops',
     campaign: '0813',
     state: 'RI',
     zip: '02818'
   });
   ```

   For `campaign`, Segment uses the [Segment spec](/docs/connections/spec/common) and checks `context.campaign.name` first before checking `properties.campaign`.

   If you already set any of these properties on your existing Adobe Analytics instance on the page (`window.s.channel`, `window.s.campaign`, etc.), Segment uses those as the default value. This way you can easily set a default values for all your web pages, but can still programmatically change them for each page if needed.

5. If your **Timestamp Option** is either **Timestamp Enabled** or **Timestamp Optional**, Segment attaches the `timestamp` to `window.s.timestamp`.
   Make sure this setting matches your *actual* timestamp setting inside Adobe Analytics for the same Report Suite ID.

6. Checks if any of the page call's properties are mapped to any custom Adobe Analytics variables such as `eVar`, `props`, and `hVar`.

   Given the mapping setting below:

   ![](/docs/connections/destinations/catalog/adobe-analytics/images/props-page-mapping.png)
   ![](/docs/connections/destinations/catalog/adobe-analytics/images/eVar-page-mapping.png)
   ![](/docs/connections/destinations/catalog/adobe-analytics/images/hier-page-mapping.png)

   If you make the following page call:

   ```js
   analytics.page({
     browser: 'chrome',
     searchTerm: 'swim shorts',
     section: 'swimwear'
   });
   ```

   Segment sets the following properties on the `window.s` object:

   - `window.s.prop1 = 'chrome'`
   - `window.s.eVar7 = 'swim shorts'`
   - `window.s.eVar3` is set to the `url` of the page where the call was made (`.page()` automatically sets a `url` property)
   - `window.s.hier1 = 'swimwear'`

7. Finally, Segment flushes the page view request to Adobe Analytics using `window.s.t()`.


## Conversion Variables - eVars

Custom Conversion variables, also known as eVars, are how Adobe segments conversion success metrics in custom marketing reports. To learn more, see the [Adobe documentation about eVars and how to configure them](https://docs.adobe.com/content/help/en/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html).

You must configure an eVar mapping in your Segment destination settings to send eVars to Adobe on Track and Page calls. When configuring the mapping, the list of eVars must be defined in the Adobe Analytics UI. Map your Adobe Analytics eVar names to the Segment property names you're using in your Segment events. Enter a Segment property name on the left and an Adobe Analytics eVar number on the right. You can view your Segment events and properties in your Schema.

An example eVar mapping in the Segment Destination settings UI should look like this:
![](/docs/connections/destinations/catalog/adobe-analytics/images/eVar-mapping.png)

## Merchandising events

The Merchandising Events setting allows you to set eVars and events on a per-product basis within the "products" string, and supports increment and currency events. This provides robust product string support, which you can read more about [in the Adobe Analytics Compontents guide](https://marketing.adobe.com/resources/help/en_US/sc/implement/products.html).

Per the Adobe documentation, Segment formats the `s.products` as `[category][item][quantity][total][incrementor][merchString]`. Segment automatically assigns the product category, quantity, and total. The `[item]` defaults to the Product Name. If you want to use the SKU or ID instead, you can change this by using the [Product Identifier setting](#product-identifier-setting).

The success event incrementor and merchandising string are determined by your Segment Adobe destination settings. These rely on the "Segment Event", "Adobe Analytics Event", and "Segment Property". You do not need to select an incrementor for product-scoped merchandising events. You can use the merchandising string to send Segment property values to Adobe as eVars. Each eVar is separated from the next eVar by a `|`.

The Segment Adobe Analytics Merchandising setting runs as follows:

- Looks for the Segment event name if a `track` call, or for the `property.eventName`if a `page` call.
- Maps to the Adobe event to send in as an increment or currency event.
- Reads if the event is scoped to the product or event level.
- _Optional_: Sets a value on the event. This value is the increment or currency to pass to Adobe.
  If you don't include a value, Segment sends the event without one, and Adobe understands this as an increment of `1`. If you configure a value and the value is not present on the `track` or `page` call, Segment does not send the event to Adobe.
- Map of product eVars to set on the products string. This is only supported at the product level, as expected by Adobe Analytics. <!-- TODO LR Note: this whole section could use work, but this part is especially confusing-->

> note ""
> **Note**: Some events in the Ecommerce spec do not use the "products" array and product information is located in the top level property object, for example the [Product Added Spec](/docs/connections/spec/ecommerce/v2/#product-added). Make sure you specify `properties.key` as the Segment key in the mapping when adding an eVar for **Product Added**, **Product Removed**, and **Product Viewed**.

Let's take the following example:

![](/docs/connections/destinations/catalog/adobe-analytics/images/merchandising-event.png)

The configuration in the example image above configures an `Order Completed` Segment event which sends Adobe Analytics:
- `event1` in `s.events` with the value passed from `properties.increment`.
- `event2` on `s.products` with the value passed from `properties.products.price`.
- the value for `properties.products.priceStatus` in `eVar1` on `s.products`.
- the value for `properties.products.coupon` in `eVar2` on `s.products`.

_Considerations_:
- Segment also passes in `event2` without a value on `s.events`, as this is a requirement for Adobe.
- Segment still maps to Adobe's predefined `scAdd` event. See the default [Ecommerce Spec events](#using-default-ecommerce-spec-events).
- Segment uses dot notation for product values, for example `products.priceStatus` parses through properties for this value. This includes the product string, so if you want a value nested in products, you would configure `products.priceStatus`.

Once you have the above example mapping configured, you send the relevant event to Segment.

For example, in a Node.js environment Segment sends:

```javascript
  analytics.track('Order Completed', {
  orderId: '50314b8e9bcf000000000000',
  total: 30.00,
  revenue: 25.00,
  shipping: 3.00,
  tax: 2.00,
  discount: 2.50,
  coupon: 'hasbros',
  currency: 'USD',
  increment: 1,
  products: [
    {
      id: '507f1f77bcf86cd799439011',
      sku: '45790-32',
      name: 'Monopoly: 3rd Edition',
      price: 34.99,
      quantity: 1,
      category: 'Games',
      priceStatus: 'promo',
      coupon: 'MAYDEALS'
    }
  ]
  });
  ```

The `s.events` call passes in `purchase` and `event1=1`, and `s.products` passes in `event2=34.99` and `evar1=promo|evar2=MAYDEALS`.

The resulting request payload to Adobe looks like:

```xml
<events>purchase,event1=1,event2</events>
<products>Games;Monopoly: 3rd Edition;1;34.99;event2=34.99;eVar1=promo|eVar2=MAYDEALS</products>
```

### Product Identifier Setting

Adobe Analytics only accepts a single product identifier. Use this option in the settings to choose whether Segment sends the product name, ID, or SKU.

### Page Example

You can send Merchandising events on Page calls. To send `<events>` on `page`, you must use the `integrations` object to pass an `events` string for Adobe Analytics. Segment merges the configured event within the setting with the array passed in. The example below passes in `scAdd`, as this is not automatically mapped on `page`.

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

## Custom Traffic Variables - props

Custom Traffic Variables, also known as props, allow you to correlate custom data with specific traffic-related events in Adobe. To learn more about props and how to configure them in the Adobe UI, see the documentation [here](https://docs.adobe.com/content/help/en/analytics/admin/admin-tools/traffic-variables/traffic-var.html). You can map your Segment properties in your destination settings to any of your Adobe props.

![](/docs/connections/destinations/catalog/adobe-analytics/images/prop-mapping.png)

You can either send the property value as a string (ie. `'brady'`) or as an array (`['brady', 'edelman', 'blount']`). If you choose to send them as an array, Segment defaults to join it so that it is a pipe (`|`) delimited string before sending to Adobe (ie. `'brady|edelman|blount'`). See the [documentation on setting a custom delimiter](#custom-delimiter) to learn more.

![](/docs/connections/destinations/catalog/adobe-analytics/images/prop-custom-delimiter.png)

## List Variables - lVars

List variables are similar to eVars except you can send multiple values for the same event. You can map your Segment properties in your settings to any of your list variables. To learn more about list variables and how to configure them in the Adobe UI, see [the list vars documentation](https://docs.adobe.com/content/help/en/analytics/implementation/vars/page-vars/list.html).

To represent the multiple values in a list, you can either send the property value as a comma delimited string (ie. `'brady,edelman,blount'`) or as an array (`['brady', 'edelman', 'blount']`). If you choose to send them as an array, Segment joins it as a comma delimited string by default before sending it to Adobe. To set up a custom delimiter, see the [documentation section below on custom delimiters](#custom-delimiter).

### Custom Delimiter

For list variables and props you can either send the property value as a comma delimited string (`'brady,edelman,blount'`) or as an array (`['brady', 'edelman', 'blount']`). You can configure a custom delimiter to join the array before sending to Adobe by entering one in the **List Variables** or **Props** setting in the Segment app. If you do not set a custom delimiter, Segment defaults to joining properties in an array as a comma delimited string.

**Note:** You must configure the custom delimiter in _both_ the Adobe Analytics dashboard, and in the Segment Adobe Analytics destination settings, for each list variable and prop. Do this in the Adobe Analytics dashboard before setting up this mapping in the Segment destination settings.

The example below shows how to configure the Segment custom delimiter mapping for a List Variable.
![](/docs/connections/destinations/catalog/adobe-analytics/images/list-var-delimiter.png)

When you send an event:
```javascript
analytics.track({
   userId: 'user12345',
   event: 'Event1',
   properties: {
    list_var1: ['hello', 'world']
   }
});
```

Segment concatenates `list_var1` into `hello|world` before sending it to Adobe. The XML request to Adobe includes `<list1>hello|world<list1>`.

## Hierarchy Variables - hVars

Hierarchy variables mirror how customers can track “breadcrumbs” or “breadcrumb trails”  which are a type of secondary navigation scheme that reveals the user's location in a website or Web application. See the Adobe documentation to learn more about [`hier` variables and how to configure them](https://docs.adobe.com/content/help/en/analytics/implementation/vars/page-vars/hier.html).

Map your Adobe Analytics hVars to the property names you use in your Segment Page calls. Enter a Segment property name on the left, and an Adobe Analytics hVar number on the right. You can view your Segment page calls and properties in your Schema.

![](/docs/connections/destinations/catalog/adobe-analytics/images/hier-mapping.png)

## Context Data Variables
Context data variables let you define custom variables on each page that processing rules can read. See  the Adobe documentation to learn more about [how to use Adobe Analytics `contextData` and use processing rules](https://docs.adobe.com/content/help/en/analytics/implementation/vars/page-vars/contextdata.html) to populate analytics variables from that data.

Segment will automatically sends all event properties as context data on specced eccommerce events, `page()`, `track()`, and `screen()` calls if you are using a device-mode ("bundled") destination for Analytics.js, or if you are sending unbundled events from a [Server library](/docs/connections/sources/catalog/). If you want to send additional context data from within your context data object ini your Segment payload, you can configure the Context Data Variables mapping in your destination settings to tell Segment which context variables to send to Adobe as context data.

> note ""
> **Note**: The context data value cannot be an object or an array as this not an Adobe accepted data type by Adobe Analytics.

For more information on how to set up Context Data for iOS and Android see the [Sending Custom Properties section](/docs/connections/destinations/catalog/adobe-analytics/mobile/#sending-custom-properties) in [Setting up Adobe Analytics for Mobile](/docs/connections/destinations/catalog/adobe-analytics/mobile). For more information on how to set up Context Data for Heartbeat Events see the [Custom Video Metadata section](/docs/connections/destinations/catalog/adobe-analytics/heartbeat/#custom-video-metadata) in [Setting up Adobe Analytics Heartbeat guide](/docs/connections/destinations/catalog/adobe-analytics/heartbeat).

## Segment Destination Specific Options

The Adobe Analytics destination offers several different ways to configure behavior using destination specific options. These are options that are defined in the `integrations` section of your event payloads rather than in the Segment app. To use these options, you must define them as values of an object in the following property of your Segment event payloads:

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

The sections below explain each of these options and what they do.

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

This option allows you to associate events with IMS Regions.

> note ""
> **Note**: If you specify this you must also define a `Marketing Cloud Visitor Id`.

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

This option allows you to associate a specific Marketing Cloud Visitor ID (`mcvid`) with the event.

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

### Link Names, Link URLs, Link Types

This option is only available when you use a cloud mode (also called server-side) connection mode. This option allows you to customize link report parameters for link names, link URLs, and link types. The default `linkType` in Segment is `o` which is a custom link. For `linkType` you can also choose to pass `d` or `e` for download and exit links. For more detailed information on sending LinkNames, Link Names, Link URLs, and Link Types using the integrations object see the the ["Best Practices for Adobe Analytics" section.](best-practices/#setting-custom-linktypes-linknames-and-linkurls)

```javascript
 analytics.track({
    userId: '019mr8mf4r',
    event: 'Gotta catch em all',
    properties: {
     caught: 1738
    },
    integrations: {
      'Adobe Analytics': {
        linkUrl: 'http://customLinkNameUrl.com',
        linkType: 'e',
        linkName: 'Custom Exit Link'
      }
    }
 });
```
