---
title: Algolia Insights Destination
rewrite: true
beta: true
redirect_from: '/connections/destinations/catalog/algolia-insights/'
---

[Algolia Insights](https://www.algolia.com/products/analytics/) lets you push events related to how your product is being used. Sending those events is a required step for using several Algolia features:

- Click analytics
- A/B Testing
- Personalization

This destination is maintained by [Algolia](https://www.algolia.com/). For any issues with the destination, please [reach out to their team](mailto:hey@algolia.com).

_**NOTE:** The Algolia Insights Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on February 13, 2020. If you are interested in joining their beta program or have any feedback to help improve the Algolia Insights Destination and its documentation, please [let their team know](mailto:hey@algolia.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Algolia" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "App ID" & "API Key" into your Segment Settings UI which you can find from your [Algolia Dashboard](https://www.algolia.com/apps/), under API Keys menu.

_**NOTE:** The Algolia Insights Destination is not a plug-and-play integration. It requires you to modify your frontend code to send additional Algolia-related data like index name, queryID, etc._


You can read more about how to send Algolia-related data to Segment from [the documentation at Algolia](https://www.algolia.com/doc/guides/getting-insights-and-analytics/connectors/segment/).


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does.

Algolia supports the following five events from Segment's [Ecommerce Spec](https://segment.com/docs/connections/spec/ecommerce/v2/).

<table>
  <tr>
   <td>Supported Events</td>
   <td>Description</td>
  </tr>
  <tr>
   <td><code>Product List Viewed</code></td>
   <td>Fire this event when a visitor views a product list or category.</td>
  </tr>
  <tr>
   <td><code>Product List Filtered</code></td>
   <td>Fire this event when a visitor filters a product list or category.</td>
  </tr>
  <tr>
   <td><code>Product Viewed</code></td>
   <td>Fire this event when a visitor views a product.</td>
  </tr>
  <tr>
   <td><code>Product Clicked</code></td>
   <td>Fire this event when a visitor clicks a product.</td>
  </tr>
  <tr>
   <td><code>Order Completed</code></td>
   <td>Fire this event whenever an order/transaction was successfully completed by the customer.</td>
  </tr>
</table>

```js
analytics.track('Product List Viewed', {
    products: [{
        product_id: "hit objectID",
        position: "hit position on index",
        index: "my-index-name",
        queryID: "Algolia queryID" // required only for Click Analytics,
    }]
})

analytics.track('Product List Filtered', {
    index: "my-index-name",
    filters: [
        { type : "free_delivery", value: "true" }
    ]
})

analytics.track('Product Viewed', {
    product_id: "hit objectID",
    position: "hit position on index",
    index: "my-index-name",
    queryID: "Algolia queryID" // required only for Click Analytics,
})


analytics.track('Product Clicked', {
    product_id: "hit objectID",
    position: "hit position on index",
    index: "my-index-name",
    queryID: "Algolia queryID" // required only for Click Analytics,
})

analytics.track('Order Completed', {
    product_id: "hit objectID",
    index: "my-index-name",
    queryID: "Algolia queryID" // required only for Click Analytics,
})

```

Track calls will be sent to Algolia as a `track` event, and appear in your Click Analytics, A/B Testing and Personalization dashboard.


_**NOTE:** If you send anonymous activity to Algolia, it will not be connected to activity attributed to that same user once they are identified._


## Renaming Events

If you are already sending events of which the names are out of the spec, you need to rename them for Algolia to understand correctly. It doesn't necessarily mean you need to modify your code.

Go to the destination settings and click "Rename Events".

![Destination Settings](images/destination_settings.png)

You can put your current event names on the left and the event names following the spec on the right.

![Rename Events](images/rename_events.png)
