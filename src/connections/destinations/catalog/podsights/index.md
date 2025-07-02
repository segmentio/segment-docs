---
rewrite: true
title: Podsights Destination
id: 5d25eddde3ff660001b3adda
---
[Podsights](https://podsights.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} measures the effectiveness of podcast advertising. Through integrations with podcast hosting providers, Podsights matches podcast downloads with on-site actions to provide household-level attribution.

This destination is maintained by Podsights. For any issues with the destination, [contact the Podsights/Spotify support team](https://adshelp.spotify.com/HelpCenter/s/contactsupport?language=en_US){:target="_blank”}.


## Getting started

1. From the Segment web app, click **Catalog**.
2. Search for "Podsights", select it, and choose the source you'd like to connect.
3. Visit your [Podsights dashboard](https://analytics.podsights.com){:target="_blank"}, go to **Manage > Pixels**, then copy your Pixel ID. This is your Segment API Key.
4. Paste the Pixel ID into the **API Key** field in your Segment destination settings.

Once you start sending data to the Podsights' Destination it will take up to 20 minutes to appear in the Podsights pixel debugger.

## Page

If you're not familiar with the Segment Spec, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

Segment sends Page events to Podsights as `view` events.

Podsights needs additional context for attribution, including certain fields inside the `context` and `properties` objects. Analytics.js [automatically collects these fields](/docs/connections/spec/common/#context-fields-automatically-collected), but you must provide them manually when sending events server-side.

Here’s the minimum required structure for a Page call:

```json
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

For page events, Podsights requires a `context` object that contains a `userAgent` and an `ip` field and a `properties` object that contains a `referrer` and a `url` field.
As you can see in the page event's raw JSON payload.

If any of these required fields are missing (especially if you're sending events server-side), Podsights will return a `400` HTTP error.

## Track

If you're not familiar with the Segment Spec, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Order Completed', {
  order_id: '50314b8e9bcf000000000000',
  total: 27.50,
  coupon: 'hasbros',
  currency: 'USD',
});
```

Track calls will be mapped to Podsights events. Podsights supports the following from the Segment Spec:

* [Signed Up](/docs/connections/spec/b2b-saas/#signed-up) as `lead`
* [Product Viewed](/docs/connections/spec/ecommerce/v2/#product-viewed) as `product`
* [Product Added](/docs/connections/spec/ecommerce/v2/#product-added) as `addtocart`
* [Checkout Started](/docs/connections/spec/ecommerce/v2/#checkout-started) as `checkout`
* [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) as `purchase`

Track calls must include:

- a `context` object with `userAgent` and `ip`
- a `context.page` object with `referrer` and `url`

These fields are required whether they're sent through Analytics.js or server-side. Here’s a minimum working example:

```json
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

If you're using Segment server-side, you must send these attributes. Otherwise, Podsights will return a `400` HTTP error.

## Server
Podsights doesn’t support server-side events by default. However, you can send server-side events as long as you include all the required context and page fields described in the Page and Track sections on this page.