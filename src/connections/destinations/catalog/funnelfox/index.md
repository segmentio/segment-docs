---
title: FunnelFox Destination
rewrite: true
---
[FunnelFox](https://www.funnelfox.com/integrations/segment?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows you to sort your sales operations in just a few clicks. Integrate your sales tools to eliminate data silos, get accurate CRM data to make the right decisions and know when opportunities require attention.

This destination is maintained by FunnelFox. For any issues with the destination, [contact their team](mailto:support@funnelfox.com).

_**NOTE:** The FunnelFox Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on July 15th, 2019. If you are interested in joining their beta program or have any feedback to help improve the FunnelFox Destination and its documentation, [let their team know](mailto:support@funnelfox.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "FunnelFox" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find on your personal [FunnelFox Homepage](https://app.funnelfox.com/#/home) under Data Sources > Websites.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to FunnelFox as a `Customer Action: pageview`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to FunnelFox as a `Customer Action`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to FunnelFox as an `New or Updated Customer` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to FunnelFox as an `Customer Action` event.
