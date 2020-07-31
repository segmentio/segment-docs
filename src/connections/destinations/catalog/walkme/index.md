---
rewrite: true
title: WalkMe Destination
---
[WalkMe](https://www.walkme.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) Digital Adoption Platform provides guidance, engagement, insights and automation to users.

This destination is maintained by WalkMe. For any issues with the destination, [contact the WalkMe Support team](mailto:support@walkme.com).

_**NOTE:** The WalkMe Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on July 29, 2019. If you are interested in joining their beta program or have any feedback to help improve the WalkMe Destination and its documentation, [let their team know](mailto:support@walkme.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "WalkMe" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. In the WalkMe settings, select an Environment (for example Production, Test etc.)
4. Enter your WalkMe system ID which you can find in your WalkMe Editor under Menu > Snippet tab.
5. You're all set! For specific steps on using Segment data within the WalkMe editor, [read here](https://support.walkme.com/?p=15147&post_type=ht_kb&preview=1&_ppp=ab530c4600).

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to WalkMe as a `pageview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to WalkMe as an `identify` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to WalkMe as a `track` event.
