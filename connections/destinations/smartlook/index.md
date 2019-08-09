---

---
[Smartlook](https://smartlook.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a product analytics tool for websites and mobile apps offering visitor recordings, heatmaps, conversion funnels and automatic event tracking.

This destination is maintained by Smartlook. For any issues with the destination, please [reach out to their team](mailto:support@smartlook.com).

_**NOTE:** The Smartlook Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 25, 2019. If you are interested in joining their beta program or have any feedback to help improve the Smartlook Destination and its documentation, please [let  their team know](mailto:support@smartlook.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Smartlook" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "Project Key" into your Segment Settings UI which you can find from your [project settings](https://www.smartlook.com/app/dashboard/settings/projects) after clicking the **Tracking code** link.
4. In about 5-10 minutes the CDN will be updated and Smartlook’s recording snippet will be loaded into your page.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does.
Identify calls sent to Segment will be transformed and sent to [Smartlook’s](https://smartlook.github.io/docs/web/identify-visitor/) `identify` method. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does.
Track calls sent to Segment will be transformed and sent to [Smartlook’s](https://smartlook.github.io/docs/web/custom-events/) `track` method.
An example call would look like:

```
analytics.track('banner_impression', {
    bannerName: 'sample_ad'
});
```