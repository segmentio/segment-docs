---
rewrite: true
title: Quora Conversion Pixel Destination
---

[Quora Conversion Pixel](https://www.quora.com/business) enables you to attribute downstream user actions on your website to your ad campaigns running on Quora.com. Our client-side Destination code is open source. You can browse the code in GitHub [here](https://github.com/segment-integrations/analytics.js-integration-quora-conversion-pixel).

This document was last updated on June 15th, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact).

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Quora" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Add your Quora Conversion Pixel Key to your Destination settings. To get this you will need to do the following:

	i. Log into your [Quora Ads Manager Account](https://www.quora.com/ads/account).

	ii. Navigate to the "Quora Pixel" tab in your Quora Dashboard.

	iii. Click the "Setup Pixel" button to open the installation popup modal.

	iv. Under "Option A: Install a Javascript Pixel," find your Quora Conversion Pixel Key in the Quora Javascript Pixel - the key is embedded in a tag that looks like `qp('init', '7cc5a029c2604daa8365d15ff337146e')`. In the example below, the key is `7cc5a029c2604daa8365d15ff337146e`.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```js
analytics.track('Completed Purchase', {
  revenue: 42.99,
  promo: 'COUPON1',
  orderId: '12345',
  productType: 'Clothing'
});
```

Quora Conversion Pixel currently supports a single `Generic Track` event. This is expected to change in the near future. However, for now, you can map any number of event names (e.g. "Completed Purchase") to this Generic event in your Destination settings to fire it.
