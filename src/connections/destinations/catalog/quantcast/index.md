---
title: Quantcast Destination
id: 54521fda25e721e32a72eeeb
---
## Getting Started

We have both web and mobile destinations with Quantcast. The two integrations are outlined below. Our Quantcast destination code is also open source on GitHub. Feel free to check it out: [analytics-ios-integration-quantcast](https://github.com/segment-integrations/analytics-ios-integration-quantcast), [analytics.js-integration-quantcast](https://github.com/segment-integrations/analytics.js-integration-quantcast).

## Web Destination
When you enable Quantcast for a website from the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously `loadingquant.js` onto your page. This means you should remove Quantcast's snippet from your page.

+ Quantcast will automatically start recording data. If this is the first time sending data to Quantcast it can take them up to **12 days** to process your new data.

Quantcast supports the `identify` and `track` methods on our API.

Note: For Quantcast to load you must call our page method. There is a call to page in your JavaScript snippet by default, so as long as you don't remove it Quantcast will load whenever your snippet loads!

## React Native set up

{% include content/react-dest.md only="android" %}

### Page
When you call `.page()`, we will automatically pass the labels. [See below for details](#labels).

### Identify
When you call `.identify()` with a `userId`, we'll stringify it and pass it to Quantcast. This allows you to accurately measure your audience size across multiple platforms and devices.

### Track
Our `.track()` method will append Quantcast labels automatically. [See below for details](#labels).

#### Order ID
When you call `.track()` and include a property labeled `orderId` and `revenue` according to our spec, we will pass that along to Quantcast in the format they expect.

### Order Completed
For purchase events, you should send an event called `Order Completed` per our spec [seen here](/docs/connections/spec/ecommerce/v2/#order-completed) that includes properties of `order_id` and `total` in dollars (eg `16.50`, representing the order total, including taxes and fees). If you don't use a `total` property, you can pass `revenue` - and note that if you pass both as properties, `total` takes precedence. If available, you should also include properties of `category` and `repeat` with a value of `true` or `false` indicating whether or not the visitor is new or returning. This will cause the appropriate Quantcast custom lables to be populated properly.

### Features
#### Labels
When you call `page`, `track` or `screen`, we'll pass the page name, event name or screen name and the category (if provided) to Quantcast as a label. The standard label will look like this "<title>" for page or screen, and "<name>" for track events. If you enable Quantcast for advertisers then we'll send "_fp.event.<name>" to match Quantcast's internal data structures for advertisers. If you do not pass any `category` or `name` for a `.page()` call, we will fallback on Quantcast's default label.

Here's an example for Quantcast Advertisers:

```js
analytics.page('Blog'); // sends label _fp.event.Blog
analytics.page(); /// sends default label _fp.event.Default
```

For non-advertisers:

```js
analytics.page('Blog'); // sends label "Blog"
analytics.page(); // does not send any label
```

If you opt to send multiple custom labels, you can do so in a few ways. You can attach a property called `label` and define a custom label there or send them using the `Quantcast.labels` in the `options` object.

For advertisers:

```js
analytics.page('Home', {
  label: 'customLabel'
});

// This will send label as _fp.event.Home,_fp.event.customLabel

analytics.page('Home', {}, {
  Quantcast: {
    labels: ['customLabel1', 'customLabel2']
  }
});

// This will send label as _fp.event.Home,_fp.event.customLabel1,_fp.event.customLabel2
```

**IMPORTANT**: Labels cannot contain any special characters so we will strip them out!

### Troubleshooting

{% include content/client-side-script-unverified.md %}

## Mobile Destination

To enable Quantcast for a mobile app in Segment:

+ Follow the instructions on the Quantcast sheet on the destinations page for adding the packaged Quantcast SDK (a simple one-liner to add to your Podfile).
+ After you build and release to the app store, Segment automatically starts translating and sending your data to Quantcast. If this is the first time sending data to Quantcast it can take them up to **12 days** to process your new data.

### Identify
When you call `identify` with a `userId`, we'll pass that to Quantcast. This allows you to accurately measure your audience size across multiple platforms and devices.

### Track
When you call `track` Segment automatically logs the events to Quantcast.

### Screen
When you call `screen` Segment automatically logs an event like `Viewed ABC Screen` to Quantcast.

### Other Features
#### Labels
The destination does not currently support labels. If this is important to you, [let us know](https://segment.com/help/contact/).
