---
title: Emma Destination
rewrite: true
id: 5c8bcba020ab84000148897c
---
[EMMA](https://emma.io/en/) helps you track campaigns from your trusted networks, Google Ads campaigns, Facebook and Instagram campaigns, and Twitter campaigns. You can also track user activities in your app, so you can send personalized push notifications and in-app campaigns like banners, start-views etc.

This destination is maintained by EMMA. For any issues with the destination, [contact the EMMA Support team](mailto:support@emma.io).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page, click "Add Destination".
2. Search for "EMMA" in the Destinations Catalog, and confirm the Source you'd like to connect to.
3. Copy and paste the "API Key" into your Segment Settings UI.
    You can find your API key on your [EMMA Dashboard](https://in.emma.io/index/login/). To find your API Key follow the steps on [this guide](https://support.emma.io/hc/en-us/articles/360019026214).

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  favoriteFood: 'Healthy food',
  restaurant: 'BCN Mediterranean Food'
});
```

This method calls in EMMA to method update the user, processing all traits as user tags. Then in EMMA you can segment data, for example to send Push Notifications. In the EMMA SDK this is equivalent to `trackUserExtraInfo`.

Info can be consulted in all parts on EMMA Dashboard where segmentation is used and [Explore](https://support.emma.io/hc/en-us/articles/115002474285-How-to-use-EMMA-Explore) section to view analitycs data.


## Track

Track calls are sent to EMMA as a `trackEvent`. It's necessary to activate the events in our [Dashboard](https://support.emma.io/hc/en-us/articles/115002413585-Create-and-edit-events).

EMMA identifies the events with a token. This token can be modified using an alias to replace it (only in non-reserved tokens).

Reserved events:

|  Token | Description |
|---|---|
| Register  | Used when user is registered in app |
| Login | Used when user is logged in app  |
| Order Completed  | Used when the user buys a product |

Login or register example:

```js
analitycs.track("Login", {
    userId: "97980cfea0067",
    email: "register@email.com"
});
```

Transaction example:

```js
analitycs.track("Order Completed",{
    "purchase": {
        "orderId": "HTP-123",
        "price": "34",
        "currencyCode":"eur",
        "products": [
            {
                "productId": "PR-890",
                "productName": "Gray jacket",
                "quantity": 1,
                "price": 34
            }
        ]
    }
  }
);
```
