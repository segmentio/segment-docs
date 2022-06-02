---
title: Criteo Offline Conversions Destination
rewrite: true
hide-personas-partial: true
id: 5d433ab511dfe7000134faca
---
[Criteo Offline Conversions](https://www.criteo.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) enables offline event tracking so marketers can run Omnichannel Campaigns by leveraging deterministic matching of SKU-level offline sales data with online user profiles.  Criteo can predict which store the shopper prefers to visit and deliver personalized recommendations for products that entice them to visit and purchase.

The Criteo Offline Conversions Destination and this document are maintained by Criteo. For any issues with the destination, [let the Criteo team know](mailto:support@criteo.com)!


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Criteo Offline Conversions" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Input "NA" into "API Key" as this information is not required.
4. Drop your client identifier into "Client ID" into your Segment Settings UI.  You can obtain this ID from your Criteo Account Strategist.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Order Completed')
```

Track calls will be sent to the Criteo Offline Conversions as a `track` event. The Criteo Offline Conversions Destination is capable of ingesting Track events for offlines sales originating from any source that conforms to [Segment's V2 Ecommerce Events](/docs/connections/spec/ecommerce/v2/). Offline sales originating from a CRM or other source that map to the Order Completed event may be sent to Criteo using the Criteo Offline Conversions Destination. Each 'track' event for an Order Completed must include the products purchased in the offline transaction. A transaction ID, contained in the event.order.id attribute is also required. In addition, a shopper ID, usually a hashed email address, is needed to identify the individual making the purchse. Each product should contain a product ID, price and quantity. The absence of any of this information will trigger an error, casuing the offline sale to be rejected. Note that offline sales events sent to Criteo are not visible in Criteo's dashboard. These events are used to optimize your campaign and are not made available for analytics or reporting purposes.
