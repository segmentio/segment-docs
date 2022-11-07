---
rewrite: true
title: Perfect Audience Destination
id: 54521fda25e721e32a72eee5
---
[Perfect audience](http://www.perfectaudience.com/) is a retargeting platform that lets marketers bring back lost web visitors through Facebook ads and banner ads in the web.

If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Perfect Audience" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Add your `Advertiser ID` (located in the User tracking session in Perfect Audience) and enable the destination in Segment.
4. Segment automatically starts sending data from the source you selected

When you enable Perfect Audience from the Segment web app,Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Perfect Audience's JavaScript onto your page.

Remember to remove Perfect Audience's snippet from your page.

Perfect Audience is only supported on the client-side.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track("My Custom Event", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```

When you call `track` on analytics.js, we call Perfect Audience's `track` with the exact same parameters.

Perfect Audience requires that you define your goals ahead of time in their interface. If that hasn't happened, then they don't track the events.

### Order Completed

If you're using our [ecommerce spec](/docs/connections/spec/ecommerce/v2/) and passing the `Order Completed` event the `orderId` and `total` will be passed along to Perfect Audience.

## Troubleshooting

{% include content/client-side-script-unverified.md %}
