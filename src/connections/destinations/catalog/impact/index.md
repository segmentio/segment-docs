---
title: Impact Destination
hidden: true
redirect_from: /connections/destinations/catalog/impact-radius/
---

## Getting Started

{% include content/connection-modes.md %}

To get started, you will need to ensure your account has access to the Impact API and obtain the following keys/tokens from your Impact account:

For tracking on Web, you will need your...

1. Account SID
   Your Account SID can be found by clicking on the gear icon in the top right of your Impact Dashboard and selecting **Technical Settings**.

2. Authentication Token
   Can be found in the same place as your Account SID (labeled **Auth Token**)

3. Tracking Domain
   From your Impact Dashboard, click on Tracking Settings > General. The tracking domain should look something like `projectname.sjv.io`.

   For all tracking sources (web, mobile, server) you will need your...

4. Campaign ID
   Your campaign id will be displayed in the top right corner of your Impact dashboard. It will be the four numbers next to your campaign name.

- - -

## Track

### Web / Server

To track events from web / server locations, you will need to choose the Action Trackers you would like to map your Segment events to. Action Tracker / Segment Event mappings are established in your [destination settings](#settings).

#### Click Id

Impact passes a query parameter named `CLICKID` as a part of their tracking urls. The value associated with this parameter is used to perform attribution analysis on their end. By default, if you are using Segment's [JavaScript source](/docs/connections/sources/catalog/libraries/website/javascript/), Segment will automatically look for this parameter and, if it exists, pass it as a contextual property of any events that happen **on the same pageview**. However, we do not cache this id anywhere so any subsequent events the user takes outside of that initial pageview will not have the ClickId as part of the event.

Impact recommends you cache this value in the users browser (using a cookie or local storage) if you want to attribute any subsequent user interactions to the initial ad source. We ask that you continue doing this if you are using this integration to track web conversions and pass the cached id as part of the `context.referrer` object. It should look like this:

```js
analytics.track('Some Conversion Event' { someProperty: true }, {
  context: {
    referrer: {
      type: 'impactRadius',
      id: <CACHED_CLICK_ID>
    }
  }
})
```

### Mobile

To track events from mobile, you will need to map your mobile event codes in Impact with your Segment events. You can find your Mobile Apps and their associated events/event codes by clicking on Tracking Settings > Mobile Apps in your Impact Dashboard. These event codes need to be mapped to Segment event names as an integration setting.


### Property Mappings

Once you have established Action Tracker / Mobile Event code mappings, we will perform the following data translations laid out in the tables below. Review these carefully as you may need to add some properties to your Segment events to conform to Impact's API requirements. You can learn more about our spec'd event properties [here](/docs/connections/spec/common/).

**Note:** Some of the properties listed below are documented as properties of our [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) event specification. You do not need to use our Order Completed event to use this integration but you may need to add some of the properties that are traditionally included in that event "type" to the events that you would like to integrate with Impact.

#### Mobile Sources

These mappings will occur for data originating from mobile devices.

<table>
    <tr>
      <td>**Segment Property**</td>
      <td>**Impact Parameter**</td>
      <td>**Required**</td>
    </tr>
  <tr>
    <td>`context.app.namespace`</td>
    <td>AppPackage</td>
    <td>True</td>
  </tr>
  <tr>
    <td>`context.device.adTrackingEnabled`</td>
    <td>AppleAdTrack</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.app.name`</td>
    <td>AppName</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.app.version`</td>
    <td>AppVer</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.device.manufacturer`</td>
    <td>DeviceMfr</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.device.model`</td>
    <td>DeviceModel</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.network.carrier`</td>
    <td>DeviceCarrier</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.os.name`</td>
    <td>DeviceOs</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.os.version`</td>
    <td>DeviceOsVer</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.locale`</td>
    <td>DeviceLocale</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.ip`</td>
    <td>IpAddressCarrier</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.network.wifi`</td>
    <td>IpAddressWifi</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.location.latitude`</td>
    <td>Latitude</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.location.longitude`</td>
    <td>Longitude</td>
    <td>False</td>
  </tr>
</table>

#### All Sources

These mappings will occur for events originating from any data source (Web, Mobile, Server)

<table>
    <tr>
      <td>**Segment Property**</td>
      <td>**Impact Parameter**</td>
      <td>**Required**</td>
    </tr>
  <tr>
    <td>`context.traits.status`</td>
    <td>CustomerStatus</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.traits.address.city`</td>
    <td>CustomerCity</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.traits.address.country`</td>
    <td>CustomerCountry</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.traits.email`</td>
    <td>CustomerEmail</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.traits.postalCode`</td>
    <td>CustomerPostCode</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`userId`</td>
    <td>CustomerId</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.orderId`</td>
    <td>OrderId</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.coupon`</td>
    <td>OrderPromoCode</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.discount`</td>
    <td>OrderDiscount</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.revenue`</td>
    <td>OrderSubTotalPreDiscount</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.total`</td>
    <td>OrderSubTotalPostDiscount</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.shipping`</td>
    <td>OrderShipping</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.tax`</td>
    <td>OrderTax</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.currency`</td>
    <td>CurrencyCode</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.userAgent`</td>
    <td>UserAgent</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`context.ip`</td>
    <td>IpAddress</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.products[i].brand`</td>
    <td>ItemBrand${i}</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.products[i].price`</td>
    <td>ItemPrice${i}</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.products[i].name`</td>
    <td>ItemName${i}</td>
    <td>False</td>
  </tr>
  <tr>
    <td>`properties.products[i].sku`</td>
    <td>ItemSku${i}</td>
    <td>True (For Sale Conversions)</td>
  </tr>
  <tr>
    <td>`properties.products[i].category`</td>
    <td>ItemCategory${i}</td>
    <td>True (For Sale Conversions)</td>
  </tr>
  <tr>
    <td>`products[i].quantity` * `products[i].price`</td>
    <td>ItemSubTotal${i}</td>
    <td>True (For Sale Conversions)</td>
  </tr>
</table>

## Deep Link Opened

We integrate with Impact mobile attribution capabilities using our [Deep Link Opened](/docs/connections/spec/mobile/#deep-link-opened) event. When a Deep Link Opened event is fired we will first check to see if the referrer url (sent as the `url` property of the `properties` object) matches your Impact tracking domain. If so, we will look for the following contextual properties and pass them as metadata to Impact.

<table>
  <tr>
    <td>**Segment Property**</td>
    <td>**Impact Parameter**</td>
  </tr>
  <tr>
    <td>`context.ip`</td>
    <td>device_ip</td>
  </tr>
  <tr>
    <td>`context.locale`</td>
    <td>locale</td>
  </tr>
  <tr>
    <td>`context.app.name`</td>
    <td>app_name</td>
  </tr>
  <tr>
    <td>`context.app.namespace`</td>
    <td>package_name</td>
  </tr>
  <tr>
    <td>`context.app.version`</td>
    <td>app_version</td>
  </tr>
  <tr>
    <td>`context.device.model`</td>
    <td>device_model</td>
  </tr>
  <tr>
    <td>`context.device.manufacturer`</td>
    <td>device_brand</td>
  </tr>
  <tr>
    <td>`context.os.version`</td>
    <td>os_version</td>
  </tr>
  <tr>
    <td>`context.network.carrier`</td>
    <td>device_carrier</td>
  </tr>
  <tr>
    <td>`context.location.latitude`</td>
    <td>geo_latitude</td>
  </tr>
  <tr>
    <td>`context.location.longitude`</td>
    <td>geo_longitude</td>
  </tr>
  <tr>
    <td>`context.campaign`</td>
    <td>install_referrer</td>
  </tr>
  <tr>
    <td>`context.device.advertisingId`</td>
    <td>appleifa</td>
  </tr>
  <tr>
    <td>`context.device.advertisingId`</td>
    <td>googleaid</td>
  </tr>
</table>
