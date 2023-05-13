---
rewrite: true
title: Innovid Destination
id: 54521fdb25e721e32a72eefc
---
[Innovid's XP platform](https://www.innovid.com/){:target="_blank"} enables you to pull same-day TV performance analytics so you can manage TV spend and create data-driven TV media plans based on network, days, programs, and genres.

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.

2. Search for "Innovid" in the Catalog, select it, and choose which of your JavaScript sources to connect the destination to.

3. Add your InnovidXP Brand ID and Client ID to your Segment Settings UI. You can find this within your Innovid dashboard.

4. Segment automatically loads InnovidXP's JavaScript tracking snippet onto the page once analytics.js loads. Make sure you remove Innovid's snippet from your code.

5. InnovidXP automatically starts recording events after approximately 45 minutes, once the CDN is updated.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page();
```

When you call `page` in Analytics.js, Segment calls InnovidXP's `Basic Hit Tracker`. Analytics.js library sends a `page` call on every page on which it is loaded, so unless you want to call `Basic Hit Tracker` more than once, you shouldn't need to do anything additional here.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Completed Purchase', {
  revenue: 42.99,
  promo: 'COUPON1',
  orderId: '12345',
  productType: 'Clothing'
});
```

When you call [`track`](/docs/connections/spec/track/) in Analytics.js, Segment calls InnovidXP's `Action Tracker` - where in addition to the `event name`, you can specify a dictionary of properties that will get sent to Innovid.

As per the example above, InnovidXP **requires** that you pass in a `revenue`, `productType`, `orderId`, and `promo` property into each of your calls. If you cannot provide a value for one or more of the aforementioned properties, don't worry, you can simply pass in an empty string to send the event.

### Event Allow-listing

For each event that you want to track (for example, using `analytics.track(your_event_name, …)`), you must allow-list the event in your destination settings (under "Event Allow-list"). For example, if you want `analytics.track('Order Completed')` and `analytics.track('Sale')` events to be sent, then you must add Order Completed and Sale to this list.

### Custom Track Properties

In addition, you can set up your destination to pass in any number of custom properties with your call. For instance, you could expand the example above to include `listViewed` and `browswer`:

```js
analytics.track('Completed Purchase', {
  revenue: 42.99,
  promo: 'COUPON1',
  orderId: '12345',
  productType: 'Clothing',
  listViewed: 'Fashion',
  browser: 'Chrome'
});
```

In order to take advantage of this feature, similar to [Event Allow-listing](#event-allow-listing), you must add "Custom Metrics" to your destination settings. This will let you put in the specific additional metrics you want to send (the required properties are already sent automatically). In this case, you'd add `listViewed` and `browser`.
