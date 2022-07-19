---
rewrite: true
title: tvsquared Destination
id: 54521fdb25e721e32a72eefc
---
[TV Squared](https://tvsquared.com/) enables you to pull same-day TV performance analytics so you can manage TV spend, and create data-driven TV media plans based on network, days, programs, and genres. Our TV Squared Destination is open-source. You can browse the code [in GitHub](https://github.com/segmentio/analytics.js-integrations/tree/master/integrations/tvsquared).

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.

2. Search for "TV Squared" in the Catalog, select it, and choose which of your JavaScript sources to connect the destination to.

3. Add your TV Squared Brand ID and Client ID to your Segment Settings UI. You can find this within your TV Squared dashboard.

4. Segment automatically loads TV Squared's JavaScript tracking snippet onto the page once analytics.js loads. Make sure you remove TV Squared's snippet from your code.

5. TV Squared starts automatically recording events after approximately 45 minutes, once our CDN is updated.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page();
```

When you call `page` in Analytics.js, we call TV Squared's `Basic Hit Tracker`. Keep in mind, our Analytics.js library will **automatically fire a `page` call on every page on which it is loaded**, and so unless you want to call `Basic Hit Tracker` more than once, you shouldn't need to do anything additional here.

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

When you call [`track`](/docs/connections/spec/track/) in Analytics.js, we call TV Squared's `Action Tracker` - where in addition to the `event name`, you can specify a dictionary of properties that will get sent to TV Squared.

As per the example above, TV Squared **requires** that you pass in a `revenue`, `productType`, `orderId`, and `promo` property into each of your calls. If you cannot provide a value for one or more of the aforementioned properties, don't worry, you can simply pass in an empty string to send the event.

### Event Allow-listing

For each event that you want to track (e.g. using `analytics.track(your_event_name, …)`), you must allow-list the event in your destination settings (under "Event Allow-list"). For example, if you want `analytics.track('Order Completed')` and `analytics.track('Sale')` events to be sent, then you must add Order Completed and Sale to this list.

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
