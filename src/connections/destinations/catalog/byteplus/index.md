---
rewrite: true
title: BytePlus
redirect_from:
  - '/connections/destinations/catalog/datarangers/'
beta: true
id: 60347eb973e8ce37bc360568
---
BytePlus provides product analytics for mobile and web applications, including event/retention/funnel/error analysis, user segmentation, user paths, behavior lookup, A/B testing, and other functions.

In addition to the docs below, please reference the [BytePlus integration guide](https://docs.byteplus.com/data-intelligence/docs/sdk-integration-1){:target="_blank"}.

This destination is maintained by BytePlus. For any issues with the destination, please [contact the BytePlus Support team](mailto:support@byteplus.com)

## Getting Started

{% include content/connection-modes.md %}


1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "BytePlus" in the Destinations Catalog, and select the "BytePlus" destination.
3. Choose which Source should send data to the "BytePlus" destination.
4. In BytePlus, go to Organization Settings > Project List and find the targeted project.
5. Click on **Details** for the targeted project and find the API key ("App Key") on the pop-out information page. This should be a 32-character string of numbers and letters.
6. Enter the "API Key" in the "BytePlus" destination settings in Segment.


## Page

If you aren't familiar with the Segment Spec, take a look at the Page method documentation (/docs/connections/spec/page/) to learn about what it does. An example call would look like:


```js
analytics.page() 
```


Segment sends Page calls to BytePlus as a `page` event.

## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:
```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to BytePlus as a`screen`event.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```
Segment sends Identify calls to BytePlus as an `identify `event with `SSID`.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:
```js
analytics.track('Login Button Clicked')
```
Segment sends Track calls to BytePlus as a `track` event with event name and properties.

