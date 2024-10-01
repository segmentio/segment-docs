---
title: Moloco Commerce Media Destination
id: 65f05e455b125cddd886b793
---

[Moloco Commerce Media](https://www.moloco.com/products/moloco-retail-media-platform){:target="_blank”} (MCM) is a technology solution that empowers marketplaces and online retailers to build and scale a retail media business (for example, sponsored ads). Moloco’s solution helps platforms leverage and activate their first-party data to deliver highly relevant and performant ads, automate ad decision-making, and scale their ads business.

The Moloco Commerce Media destination can send user events collected using the Segment SDK to Moloco’s platform for a simplified performance ads integration.

This allows you to run performance advertising without having to build your own backend system to ingest and send user events data in realtime to Moloco. 

## Getting started

### Prerequisites 
Before you configure the Moloco Commerce Media destination, add a source to Segment and use the [Source Debugger](/docs/connections/sources/debugger/) to verify Segment is receiving events. 

Before you configure the Moloco Commerce Media destination, reach out to your Moloco representative about the following account information: 
- Moloco Platform ID
- Moloco Event Service API key

After you obtain that account information, you can move on to the Segment app.

### Set up your Moloco destination
1. From the Segment web console, click **Catalog**.
2. On the Catalog page, search for “Moloco”, select it, and click **Add destination**.
3. Choose which of your sources to connect the destination to.
4. In the Moloco MCM destination settings page, fill the Platform ID and API key fields with your Moloco Platform ID and Event Service API key. 
5. Select “APP" if your source endpoint is a mobile app, and "SITE" if it is a website.

## Identify

Moloco strongly recommends that you identify your logged-in users using Segment's [Identify method](/docs/connections/spec/identify/) and that you hash the user ID before sending it to Moloco.

Please find an example Identify call below:

```js
analytics.identify('361b1fdfbeaa9d64a13c033eb9f970dc6740f6bc', {
  email: 'john.doe@example.com'
});
```

Once a user is identified, each call to Segment's [Track method](/docs/connections/spec/track/) automatically records the user ID.
Users that are not logged in can be tracked using an [anonymousID](/docs/connections/spec/identify/#anonymous-id). Moloco Commerce Media does not use anonymousIDs for users that are not logged in. Segment recommends formatting your anonymousID in UUID format.

> info " "
> If you hash the user ID before sending it to Moloco, ensure you reuse the same hashed ID when calling other Moloco APIs.


## Track

If you’re not familiar with the Segment Spec, take a look to understand what the [Track method](/docs/connections/spec/track/) does. The mappings in the Moloco Commerce Media destination are built based on the Segment [Ecommerce Spec](/docs/connections/spec/ecommerce/v2/). 

Please find below an example call to track a product detail page (PDP) view event:

```js
analytics.track("Product Viewed", {
  product_id: "1193",
  name: "Newage Uplift Eye Care Cream",
  price: 19.99
  currency: "USD"
  quantity: 1,
  image_url: "https://www.example.com/image.png"
});
```

## Page

If you’re not familiar with the Segment Spec, take a look to understand what the [Page method](/docs/connections/spec/page/) does. 

Please find below an example call to page:

```js
analytics.page();
```

If you use Segment’s Web SDK, this call automatically collects the page information. Here’s an example of page information automatically collected using Segment’s Web SDK.

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

Moloco Commercial Media requires the [page_id](https://mcm-docs.moloco.com/docs/51-user-event-data-specifications#page_view-event-type){:target="_blank”} attribute for a PAGE_VIEW event. Using the Web SDK, the page_id can be associated with the path attribute. However for iOS/Android, Moloco Commercial Media recommends using the Page Identifier Token field.

The Page Identifier Token field accepts key:value pairs of strings that can identify the page.
Stringification Logic is: {key}:{value}s concatenated by ";"

Moloco Commercial Media ignores the Page Identifier Token if page_id is passed, as page_id has a higher priority.

Here’s an example of a Page Identifier Token that could be tracked in a mobile app.

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

The tokens are stringified into the following:

```js
    "event:Product List Viewed;vertical:fruit"
```

The tokens are stringified in the format of the above example because they are key-value pairs concatenated by a semicolon (;). 

> info " "
> if you decide to use the Page Identifier Token in your mobile app, reuse the same Page Identifier Token in place of page_id when calling Moloco’s APIs.

## Mappings

In the Mappings tab, some fields are chosen by default if some common fields map to Moloco Event’s fields. If the mapped key does not exist in the input data, it won’t trigger an error. Instead, the mapping will not pass any value.

If you are using **the default fields in a custom way**, please confirm that your mapping meets Moloco's requirements.

Default Mappings are not hard rules. They can be modified to your convenience.

{% include components/actions-fields.html %}
## Monitoring

Once the mappings are configured correctly, you can verify the flow of events from your source to Moloco’s destination in the [Delivery Overview](/docs/connections/delivery-overview/) tab of your Moloco destination. If you correctly configured your destination, you should see a growing **Successful delivery** count.
