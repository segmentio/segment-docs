---
title: Criteo Offline Conversions Destination
rewrite: true
hide-personas-partial: true
---

[Criteo Offline Conversions](https://www.criteo.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) enables offline event tracking so marketers can run Omnichannel Campaigns by leveraging deterministic matching of SKU-level offline sales data with online user profiles.  Criteo can predict which store the shopper prefers to visit and deliver personalized recommendations for products that entice them to visit and purchase.

The Criteo Offline Conversions Destination and this document are maintained by Criteo. For any issues with the destination, please [let us know!](mailto:support@criteo.com).

_**NOTE:** The Criteo Offline Conversions Destination is currently in beta, which means that we are still actively developing the destination. This doc was last updated on October 8, 2019. If you are interested in joining our beta program or have any feedback to help improve the Criteo Offline Conversions Destination and its documentation, please [let  us know](mailto:support@criteo.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Criteo Offline Conversions" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Input "NA" into "API Key" as this information is not required.
4. Drop your client identifier into "Client ID" into your Segment Settings UI.  You can obtain this ID from your Criteo Account Strategist.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Order Completed')
```

Track calls will be sent to the Criteo Offline Conversions as a `track` event. The Criteo Offline Conversions Destination is capable of ingesting Track events for offlines sales originating from any source that conforms to [Segment's V2 Ecommerce Events](https://segment.com/docs/spec/ecommerce/v2/). Offline sales originating from a CRM or other source that map to the Order Completed event may be sent to Criteo using the Criteo Offline Conversions Destination. Each 'track' event for an Order Completed must include the products purchased in the offline transaction. A transaction ID, contained in the event.order.id attribute is also required. In addition, a shopper ID, usually a hashed email address, is needed to identify the individual making the purchse. Each product should contain a product ID, price and quantity. The absence of any of this information will trigger an error, casuing the offline sale to be rejected. Please note that offline sales events sent to Criteo are not visible in Criteo's dashboard. These events are used to optimize your campaign and are not made available for analytics or reporting purposes.
