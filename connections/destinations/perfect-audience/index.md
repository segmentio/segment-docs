---
rewrite: true
---

[Perfect audience](http://www.perfectaudience.com/) is a retargeting platform that lets marketers bring back lost web visitors through Facebook ads and banner ads in the web.

This document was last updated on October 24th, 2018. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Perfect Audience" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Add your `Advertiser ID` (located in the User tracking session in Perfect Audience) and enable the destination in Segment.
4. We'll automatically start recording data.

When Perfect Audience in enabled in Segment, our CDN will update within 5-10 minutes, and Perfect Audience's javascript is asynchronously loaded onto your page. Please remember to remove Perfect Audience's snippet from your page.

Perfect Audience is only supported on the client-side.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```javascript
analytics.track("My Custom Event", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```

When you call `track` on analytics.js, we call Perfect Audience's `track` with the exact same parameters.

Perfect Audience requires that you define your goals ahead of time in their interface. If that hasn’t happened, then they don’t track the events.

[Here’s their video of how to set that up](http://support.perfectaudience.com/knowledgebase/articles/234037-how-to-create-and-track-conversion-goals-with-perf) - you’ll need to match event names between Perfect Audience and your Segment track calls.


### Completed Order

If you're using our [ecommerce spec](/docs/spec/ecommerce/v2/) and passing the `Order Completed` event the `orderId` and `total` will be passsed along to Perfect Audience.

## Troubleshooting

{% include content/client-side-script-unverified.md %}
