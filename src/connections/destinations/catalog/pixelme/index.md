---
rewrite: true
title: PixelMe Destination
hidden: true
---
[PixelMe](https://pixelme.me/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) Smart Attribution works by gathering all your traffic from any source and attributing it instantly using UTMs. Combined with our event tracking, you can easily see which traffic is causing which conversions on your website.

This destination is maintained by PixelMe. For any issues with the destination, [contact the PixelMe team](mailto:team@pixelme.me).

{% include content/beta-note.md %}



## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "PixelMe" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can directly copy-paste from your [PixelMe dashboard](https://app.pixelme.me).
4. To find the API Key, go to Settings > Integrations

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Unique page calls will be sent to PixelMe as a `Visitor`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

`Screen` calls are saved but not processed by default. If you want to use `screen` calls with PixelMe, [let  the PixelMe team know](mailto:team@pixelme.me).



## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

`Identify` calls are saved but not processed at the moment. PixelMe will use these calls shortly to merge users path to attribute a conversion event to the correct anonymous id. Of course, all `Identify` calls received will be used to merge users, so PixelMe recommends to send them as soon as you can.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('SignUp')
```

Track calls will be sent to PixelMe as conversion events. In the previous example, a `SignUp` conversion event will be sent to PixelMe.
