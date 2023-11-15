---
title: Podscribe (Actions) Destination
id: 643fdecd5675b7a6780d0d67
beta: true
---

[Podscribe](https://podscribe.com/){:target="\_blank”} measures the effectiveness of podcast advertising. Through integrations with podcast hosting providers, matches downloads with on-site actions, providing advertisers household-level attribution.

{% include content/beta-note.md %}

## Getting started

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for "Podscribe", select it, and choose which of your sources to connect the destination to.

Once you start sending data to the Podscribe's Destination it will take up to 20 minutes to appear in the Podscribe postbacks page.

{% include components/actions-fields.html %}

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page();
```

Page calls will be sent to Podscribe as a View event.

Podscribe is an attribution platform, and as such, Podscribe needs more context about the visitor than just a User ID. Analytics.js [automatically collects context fields](/docs/connections/spec/common/#context-fields-automatically-collected). Podscribe requires certain context fields and properties for Page calls. Below is an example of a raw JSON payload that contains the minimum requirements.

```js
{
  "type": "page",
  "context": {
    "ip": "111.111.111.111",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko Chrome/118.0.0.0 Safari/537.36"
  },
  "properties": {
    "referrer": "",
    "url": "https://url.com"
  },
  "timestamp": "2023-11-05T01:00:00.000Z",
  "userId": "3212"
}
```

For Page events Podscribe requires:
- A `context` object that contains a `userAgent` and an `ip` field 
- A `properties` object that contains a `referrer` and a `url` field.

You'll see these in the Page event's raw JSON payload above.

The `context` and `properties` objects are required, along with the fields in them. If you're using Segment server-side you must send these attributes.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track("Order Completed", {
  order_id: "50314b8e9bcf000000000000",
  total: 27.5,
  coupon: "hasbros",
  currency: "USD",
});
```

Track calls will be mapped to Podscribe events. Podscribe supports the following from the Segment Spec:

- [Signed Up](/docs/connections/spec/b2b-saas/#signed-up) as `signup`
- [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) as `purchase`

For Track events, Podscribe requires:
- A `context` object that contains a `userAgent` 
- An `ip` Podscribe also requires a `page` object that contains a `referrer` and a `url` field

Analytics.js [automatically collects context fields](/docs/connections/spec/common/#context-fields-automatically-collected). Podscribe requires certain context fields for Track calls. Below is an example of a raw JSON payload that contains the minimum requirements.

```js
{
  "type": "track",
  "context": {
    "ip": "1.2.3.4",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko Chrome/118.0.0.0 Safari/537.36"
    "page": {
      "url": "https://url.com",
      "referrer": ""
    }
  },
  "event": "Test Event Name",
  "userId": "test-user-xip99",
  "timestamp": "2023-11-05T01:00:00.000Z",
  "properties": {}
}
```
