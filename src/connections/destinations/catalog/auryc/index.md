---
rewrite: true
title: Auryc Destination
---
[Auryc](https://www.auryc.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a client-side journey intelligence platform that surfaces real-time insights with powerful visual context across all of your digital ecommerce journeys. Auryc helps enterprises find and resolve the customer journey issues that directly impact conversions and customer satisfaction.

This source is maintained by Auryc. For any issues with the destination, please [reach out to their team](mailto:segment@auryc.com).

_**NOTE:** The Auryc Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 25, 2019. If you are interested in joining their beta program or have any feedback to help improve the Auryc Destination and its documentation, please [let their team know](mailto:segment@auryc.com)!_ It also means that, for the time being, there is a longer delay for us to deploy it to your analytics.js after you enable; expect about 24 hours for it to render on your site.

## Getting Started

{{>connection-modes}}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for Auryc within the Destinations Catalog and confirm the Source you'd like to connect to. Please note the source must be sending events via our Javascript library Analytics.js.
3. Add your Auryc site id in the destination settings. You can find this in Auryc by navigating to Project Settings > Web > and copying the value found on the line //cdn.auryc.com/auryc_siteid_here/container.js;
4. In about 45 minutes the CDN will be updated and Auryc snippet will be initialized onto your page.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. Identify calls will be sent to Auryc as an `identify` event and `addUserProperties` event.

If the call only contains the user id and does not have the traits, the user id will be sent to Auryc as identity.

An example call would look like:

```
analytics.identify('userId123');
```

If the call contains both user id and traits, the user id will be sent to Auryc as identity, and the traits will be sent as user properties.

An example call would look like:

```
analytics.identify("userId123", {
  email: "test@abc.com"
});
```


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Order Submitted', {price: 234.12})
```

Track calls will be sent to Auryc as a `track` event.
