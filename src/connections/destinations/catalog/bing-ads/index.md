---
title: Bing Ads Destination
rewrite: true
id: 54521fd525e721e32a72ee97
---
 [Bing Ads](https://bingads.microsoft.com){:target="_blank"} enables marketers to track and monitor campaigns, clicks, CTRs, spend, and budget. Bing Ads lets you place cross-device product ads in front of Bing, Yahoo, and MSN customers and support imported pay-per-click ad campaigns from third-party platforms like Google AdWords. With Bing Ads you can also re-target ads to customers after they complete an action like leaving a shopping cart or viewing a product without purchasing. Learn more about all you can do with [Bing Ads](https://advertise.bingads.microsoft.com/en-us/resources/training/what-is-bing-ads){:target="_blank"}. You can also [browse the code on GitHub](https://github.com/segment-integrations/analytics.js-integration-bing-ads){:target="_blank"}.

## Getting started

Before you can track conversions or target audiences, you need to create a UET tag in Bing Ads and then add it to the destination settings. Follow the steps within [the Bing Ads documentation to create a UET tag](https://advertise.bingads.microsoft.com/en-us/resources/training/universal-event-tracking){:target="_blank"}.

Once you have created the Tag ID, you can follow the steps below:

1. From the Segment web app, click **Catalog**.
2. Search for "Bing Ads" in the Catalog, select it, and choose which of your sources to connect the destination to. Note the source must be sending events using Segment's JavaScript library Analytics.js.
3. In the destination settings, enter your Tag Id

> info ""
> Bing Ads supports one Tag ID per source. Be sure to associate conversion goals to the correct Tag ID in settings.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```javascript
// name and properties are optional
analytics.page();
```

Page events will be sent to Bing Ads as a `Page Load` event where name and properties are optional.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does.

For Segment to map your track events to a Conversion Goal, create the goal in your Bing Ads account:

For information about tracking custom events, see Microsoft's article [How to track custom events with UET](https://help.ads.microsoft.com/#apex/ads/en/56684/2-500){:target="_blank"}

Only the event name is required - other properties are optional. An example track call is shown below:

```javascript
// Segment event
analytics.track('Order Completed', {
    category: 'tools'
    revenue: 25,
    ... // additional properties
});
```

| Property | Description                                   |
| -------- | --------------------------------------------- |
| Label    | Event Name (`'Order Completed'` in this case) |
| Value    | `revenue` property                            |
| Category | `category` property                           |
| Action   | Always set to `track`                         |



## Troubleshooting

{% include content/client-side-script-unverified.md %}
