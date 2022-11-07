---
rewrite: true
title: Quora Conversion Pixel Destination
id: 5952698570a3e552b9575519
---
[Quora Conversion Pixel](https://www.quora.com/business) enables you to attribute downstream user actions on your website to your ad campaigns running on Quora.com. Our client-side Destination code is open source. You can browse the code in GitHub [here](https://github.com/segmentio/analytics.js-integrations/tree/master/integrations/quora-conversion-pixel).

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Quora" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Add your Quora Conversion Pixel Key to your Destination settings. To get this you will need to do the following:

	i. Log into your [Quora Ads Manager Account](https://www.quora.com/ads/account).

	ii. Navigate to the "Quora Pixel" tab in your Quora Dashboard.

	iii. Click the "Setup Pixel" button to open the installation popup modal.

	iv. Under "Option A: Install a JavaScript Pixel," find your Quora Conversion Pixel Key in the Quora JavaScript Pixel - the key is embedded in a tag that looks like `qp('init', '7cc5a029c2604daa8365d15ff337146e')`. In the example below, the key is `7cc5a029c2604daa8365d15ff337146e`.


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

Quora Conversion Pixel currently supports a single `Generic Track` event. This is expected to change in the near future. However, for now, you can map any number of event names (e.g. "Completed Purchase") to this Generic event in your Destination settings to fire it.
