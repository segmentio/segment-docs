---
rewrite: true
title: WalkMe Destination
id: 5d25d6e0885427000195bf80
---
[WalkMe](https://www.walkme.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) Digital Adoption Platform provides guidance, engagement, insights and automation to users.

This destination is maintained by WalkMe. For any issues with the destination, [contact the WalkMe Support team](mailto:support@walkme.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "WalkMe" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the WalkMe settings, select an Environment (for example Production, Test etc.)
4. Enter your WalkMe system ID which you can find in your WalkMe Editor under Menu > Snippet tab.
5. You're all set! For specific steps on using Segment data within the WalkMe editor, [read here](https://support.walkme.com/?p=15147&post_type=ht_kb&preview=1&_ppp=ab530c4600).

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to WalkMe as a `pageview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to WalkMe as an `identify` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to WalkMe as a `track` event.
