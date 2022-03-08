---
rewrite: true
title: Tamber Destination
id: 5c8ad1622b2a130001a7664a
---
[Tamber](https://tamber.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) enables you to build your own Google-scale recommendation features in minutes. Deploy cutting edge deep learning models, and run A/B tests to optimize results.

This destination is maintained by Tamber. For any issues with the destination, [contact the Tambler Support team](mailto:support@tamber.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From your [Tamber dashboard](https://dashboard.tamber.com), head to Sources > Segment and click enable.
2. Follow the instructions to configure your Destination and optionally defined a custom name for your `item` and click save.
3. You may now use either the one-click activation button to complete your set up or continue reading the below steps to manually add the Tamber Destination from within Segment using the "API Key" displayed.
4. From your Segment UI's Destinations page click on "Add Destination".
5. Search for "Tamber" in the Catalog, select it, and choose which of your sources to connect the destination to.
6. Drop the "API Key" into your Segment Settings UI. If you do not have the key from the steps above, you can find it in your [Tamber dashboard](https://dashboard.tamber.com) as the "Project Key" in your project's dashboard.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  age: 23,
  location: {
    latitude: 40.8,
    longitude: -74.0
  }
});
```

Identify calls will be sent to Tamber as a [`user-update`](https://tamber.com/docs/api/#user-update) call and increment the User count within the Tamber UI. You can also [retrieve](https://tamber.com/docs/api/#user-retrieve) and [list](https://tamber.com/docs/api/#user-list) users from Tamber.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call to Segment would look like:

```
analytics.track("Watched", {
  item: "f8ca1e4de5024d9430b3928bd8ac6b96"
});
```

You may also provide full item objects:

```
analytics.track("Watched", {
  item: {
    id: "f8ca1e4de5024d9430b3928bd8ac6b96", // required
    title: "Kurt Vonnegut 60 Minutes Interview",
    genre: "News"
  }
});
```

Track calls will be sent to Tamber as [`event-track`](https://tamber.com/docs/api/#event-track) calls and increment both Event and Item counts within the Tamber UI. You can also [retrieve](https://tamber.com/docs/api/#event-retrieve) events, and [retrieve](https://tamber.com/docs/api/#item-retrieve) or [list](https://tamber.com/docs/api/#item-list) items from Tamber.

**NOTE:** [`item`](https://tamber.com/docs/api/#item) is a required property but can be renamed within the Tamber UI under Custom Field Definition for Item. Make sure that the name passed into your Track call matches what you have set in the Tamber UI. If you are using Segment's [E-Commerce](/docs/connections/spec/ecommerce/v2) or [Video](/docs/connections/spec/video) APIs, you can configure Tamber to automatically handle item loading – either during set up or at any time in the Tamber Dashboard <strong>Sources</strong> > <strong>Segment</strong> section – and ignore this information.
