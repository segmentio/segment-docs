---
title: Moloco Commerce Media Destination
beta: true
---

[Moloco Commerce Media](https://www.moloco.com/products/moloco-retail-media-platform) (MCM) is a technology solution that empowers marketplaces and online retailers to build and scale a retail media business (i.e., sponsored ads). Moloco’s solution helps platforms leverage and activate their first-party data to deliver highly relevant and performant ads, automate ad decision-making, and scale their ads business.

This Moloco Commerce Media destination can send user events collected using the Segment SDK to Moloco’s platform for simplified performance ads integration.

This allows you to run performance advertising without having to build your own backend system to ingest and send user events data in realtime to Moloco. 

## Getting Started

Before you configure the Moloco Commerce Media destination, make sure that your source data is configured correctly and that you are able to see events flowing in the event stream debugger.

To configure the Moloco Commerce Media destination, you need to get the following 2 elements from your Moloco representative.

1. Moloco Platform ID
2. Moloco Event Service API key

Once you obtain those 2 pieces of information, you can move on to the Segment console.

1. From the Segment web console, click Catalog.
2. On the Catalog page, from the destination tab, Search for “Moloco”, select it, and click on Add destination.
3. Choose which of your sources to connect the destination to.
4. In the Moloco MCM destination settings page, fill the Platform ID and API key fields with the previously collected information and select “APP or SITE” depending on your source endpoint (mobile or website).

## Identify

We strongly recommend that you identify your logged-in users using the [Identify method provided by Segment](https://segment.com/docs/connections/spec/identify/). We also recommended hashing the user ID before sending.

Please find below an example call to identify:

```js
analytics.identify('361b1fdfbeaa9d64a13c033eb9f970dc6740f6bc', {
  email: 'john.doe@example.com'
});
```

Once a user is identified, each call to the [Track method](https://segment.com/docs/connections/spec/track/) will automatically record the user ID.
For non logged-in users, you can still track them using an [anonymous ID](https://segment.com/docs/connections/spec/identify/#anonymous-id) (something like UUID as recommended by Segment) but on the Moloco Commerce Media side, we do not use that field for non logged-in users.

_Note_: if you decided to hash the user ID before sending it to Moloco for event tracking, please make sure you reuse the same hashed ID when calling other Moloco’s APIs like Decision API.

## Moloco Commerce Media’s available presets

MCM currently supports the following [user event data specifications](https://mcm-docs.moloco.com/docs/51-user-event-data-specifications).

<table>
  <tr>
    <td>**Event type**</td>
    <td>**Trigger**</td>
    <td>**Description**</td>
  </tr>
  <tr>
    <td>HOME</td>
    <td>Event type = "page" AND event = "Home"</td>
    <td>HOME event type is when a shopper views your website's main or home page.</td>
  </tr>
  <tr>
    <td>LAND</td>
    <td>Event type = "page" AND event = "Land"</td>
    <td>LAND event type is when a shopper is visiting your website from an external source (ex. Google Shopping)</td>
  </tr>
  <tr>
    <td>ITEM_PAGE_VIEW</td>
    <td>Event type = "track" AND event = "Product Viewed"</td>
    <td>ITEM_PAGE_VIEW event type is when a shopper visits a product detail page.</td>
  </tr>
  <tr>
    <td>ADD_TO_CART</td>
    <td>Event type = "track" AND event = "Product Added"</td>
    <td>ADD_TO_CART event type is when a shopper adds an item to the cart.</td>
  </tr>
  <tr>
    <td>ADD_TO_WISHLIST</td>
    <td>Event type = "track" AND event = "Product Added to Wishlist"</td>
    <td>ADD_TO_WISHLIST event type is when a shopper puts an item into the wish list.</td>
  </tr>
  <tr>
    <td>SEARCH</td>
    <td>Event type = "track" AND event = "Product Searched"</td>
    <td>SEARCH event type is when a shopper searches items with keywords or phrases from your site.</td>
  </tr>
  <tr>
    <td>PAGE_VIEW</td>
    <td>Event type = "page" AND event != "Home"</td>
    <td>PAGE_VIEW event type is when a shopper visits a page other than the product detail pages or the homepage of your site.</td>
  </tr>
  <tr>
    <td>PURCHASE</td>
    <td>Event type = "track" AND event = "Order Completed"</td>
    <td>PURCHASE event type is when a shopper purchases a product.</td>
  </tr>
</table>

## Track

If you’re not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. The mappings in the Moloco Commerce Media destination are pre-built based on the [Segment’s Ecommerce Events](https://segment.com/docs/connections/spec/ecommerce/v2/). 

Please find below an example call to track a product detail page (PDP) view event:

```js
analytics.track("Product Viewed", {
  product_id: "1193",
  name: "Newage Uplift Eye Care Cream",
  price: 19.99
  currency: "USD"
  quantity: 1,
  image_url: "https://www.example.com/iamge.png"
});
```

## Page

If you’re not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. 

Please find below an example call to page:

```js
analytics.page();
```

If you are using the Segment’s Web SDK, this call will automatically collect the page information. Here’s an example of page info automatically collected using the Segment’s Web SDK.

```js
    "page": {
      "path": "/account",
      "referrer": "",
      "search": "",
      "title": "Your Account",
      "url": "https://www.example.com/account"
    },
```

However for iOS and Android, it won’t collect page information.

In Moloco Commercial Media, the [page_id](https://mcm-docs.moloco.com/docs/51-user-event-data-specifications#page_view-event-type) attribute is required for the PAGE_VIEW event. Using the Web SDK, the page_id can be associated with the path attribute. However for iOS/Android, as we do not have an appropriate field for page_id, we recommend using the **Page Identifier Token** field.

This field accepts key:value pairs of strings that can identify the page.
Stringification Logic is: {key}:{value}s concatenated by ";"

As page_id has a higher priority, **Page Identifier Token** will be ignored if page_id is passed

Here’s an example of **Page Identifier Token** that could be tracked in a mobile app.

Say the input had the following schema:

```js
    ...
      "event": "Product List Viewed",
      "vertical": "fruit"
    ...
```

and user chose the following mapping:

```js
    // "event" represents the name of the event
    event: properties.event
    // "vertical" represents which vertical the event happened on
    vertical: properties.vertical

    // The combination of those two tokens can repsent
    // "Which action happened on which vertical"
```

The tokens be stringified into:

```js
    "event:Product List Viewed;vertical:fruit"
```

Logic: 

```js
    {key}:{value} concatenated by ";"
```

_Note_: if you decided to use the **Page Identifier Token** in your mobile app, please make sure you reuse the same **Page Identifier Token** in place of page_id when calling other Moloco’s APIs like Decision API.

## Mappings

![A screenshot of MCM Mappings.](images/mcm-mappings.png)

In the mappings, some fields are chosen by default if some common fields map to Moloco Event’s fields. If the mapped key does not exist in the input data, it won’t trigger an error and will just not pass any value.

If you are using **the default fields in a custom way**, please confirm that your mapping meets Moloco's requirements.

Default Mappings are not hard rules. They can be modified to your convenience.

## Monitoring

Once the mappings are configured correctly, you can verify the flow of events from your source to Moloco’s destination in the “**Delivery Overview**” tab. If things are configured correctly, it should show a growing **Successful delivery** count.

For more details about the monitoring tool, take a look at the [Delivery Overview](https://segment.com/docs/connections/delivery-overview/) docs.