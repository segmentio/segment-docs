---
rewrite: true
title: Smartlook Destination
id: 5c9b332f4a9ac00001e97649
---
[Smartlook](https://smartlook.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a product analytics tool for websites and mobile apps offering visitor recordings, heatmaps, conversion funnels and automatic event tracking.

This destination is maintained by Smartlook. For any issues with the destination, [contact the Smartlook Support team](mailto:support@smartlook.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Smartlook" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "Project Key" into your Segment Settings UI which you can find from your [project settings](https://www.smartlook.com/app/dashboard/settings/projects) after clicking the **Tracking code** link.


Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Smartlook's recording snippet onto your page.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does.
Identify calls sent to Segment will be transformed and sent to [Smartlook's](https://smartlook.github.io/docs/web/identify-visitor/) `identify` method. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does.
Track calls sent to Segment will be transformed and sent to [Smartlook's](https://smartlook.github.io/docs/web/custom-events/) `track` method.
An example call would look like:

```
analytics.track('banner_impression', {
    bannerName: 'sample_ad'
});
```
