---
rewrite: true
title: Podsights Destination
---

[Podsights](https://podsights.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) measures the effectiveness of podcast advertising. Through integrations with podcast hosting providers, matches downloads with on-site actions,  providing advertisers household-level attribution.

This destination is maintained by Podsights. For any issues with the destination, please [reach out to their team](mailto:hello@podights.com).

_**NOTE:** The Podsights Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on July 26th, 2019. If you are interested in joining their beta program or have any feedback to help improve the Podsights Destination and its documentation, please [let  their team know](mailto:hello@podsights.com)!_

## Getting Started

{% include content/connection-modes.md %}


1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Podsights" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Visit your [Podsights dashboard](https://analytics.podsights.com) and navigate to Manage > Pixels. Copy your Pixel ID which will be your Segment "API Key".
4. Drop the Pixel ID in the "API Key" field in your Segment Settings UI.


Once you start sending data to the Podsights' Destination it will take up to 20 minutes to appear in the Podsights pixel debugger.

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Podsights as a `view` event.

Podsights is an attribution platform, and as such, we need more context about the visitor than just a User ID. Analytics.js [automatically collects context fields](https://segment.com/docs/spec/common/#context-fields-automatically-collected). Podsights requires certain context fields and properties for page calls. Below is an example of a raw JSON payload that contains the minimum requirements.
```
{
  "type": "page",
  "context": {
    "ip": "1.2.3.4",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
  },
  "properties": {
    "referrer": "",
    "url": "https://podsights.com/"
  },
  "timestamp": "2019-07-19T23:56:59.716Z",
  "userId": "3212"
}
```

For page events Podsights requires a ```context``` object that contains a ```userAgent``` and an ```ip``` field and a ```properties``` object that contains a ```referrer``` and a ```url``` field.
As you can see in the page event's raw JSON payload above.

The ```context``` and ```properties``` object are required, along with the fields in them. If you're using Segment server-side please send these attributes. Otherwise Podsights will return a ```400 HTTP Error```.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Order Completed', {
  order_id: '50314b8e9bcf000000000000',
  total: 27.50,
  coupon: 'hasbros',
  currency: 'USD',
});
```

Track calls will be mapped to Podsights events. Podsights' support the following from the Segment Spec:


* [Signed Up](https://segment.com/docs/spec/b2b-saas/#signed-up) as `lead`
* [Product Viewed](https://segment.com/docs/spec/ecommerce/v2/#product-viewed) as `product`
* [Product Added](https://segment.com/docs/spec/ecommerce/v2/#product-added) as `addtocart`
* [Checkout Started](https://segment.com/docs/spec/ecommerce/v2/#checkout-started) as `checkout`
* [Order Completed](https://segment.com/docs/spec/ecommerce/v2/#order-completed) as `purchase`

For track events Podsights requires a ```context``` object that contains a ```userAgent``` and an ```ip``` Podsights also requires a ```page``` object that contains a ```referrer``` and a ```url``` field.
Analytics.js [automatically collects context fields](https://segment.com/docs/spec/common/#context-fields-automatically-collected). Podsights requires certain context fields for track calls. Below is an example of a raw JSON payload that contains the minimum requirements.
```
{
  "type": "track",
  "context": {
    "ip": "1.2.3.4",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    "page": {
      "url": "https://podsights.com/",
      "referrer": ""
    }
  },
  "event": "Test Event Name",
  "userId": "test-user-xip99",
  "timestamp": "2019-04-08T01:19:38.931Z",
  "properties": {}
}
```

The ```context``` and ```page``` object are required, along with the fields in them. If you're using Segment server-side please send these attributes. Otherwise Podsights will return a ```400 HTTP Error```.

## Server
Podsights does not support server-side events out of the box, but you can send server-side events if you follow the requirements of page and track events outlined in the sections for each call.
