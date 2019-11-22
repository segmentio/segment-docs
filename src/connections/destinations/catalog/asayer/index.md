---
rewrite: true
title: Asayer Destination
---
[Asayer](https://asayer.io) is a session replay tool for engineering teams. It lets you capture the full picture of each user session on your website so you can quickly solve issues and improve your customer experience.

This destination is maintained by Asayer. For any issues with the destination, please [reach out to their team](mailto:support@asayer.io).

_**NOTE:** The Asayer Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on July 8, 2019. If you are interested in joining their beta program or have any feedback to help improve the Asayer Destination and its documentation, please [let  their team know](mailto:support@asayer.io)!_

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Asayer" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Set your Asayer Site ID - which you can find in your Asayer dashboard after clicking on Tracking Code in [Preferences -> Sites](https://app.asayer.io/client/sites) - into your Destination settings. Site ID is a whole number (e.g. 435).
4. The CDN takes about 45 minutes to update. Right after that, Asayer's tracking code will automatically initialize onto your website. In the meantime, make sure to remove Asayer's snippet from your site, if there's any.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. Identify calls sent to Segment will be transformed and sent to Asayer's `asayer.vars` method.

An example call which does not include a `userId` will transmit Asayer the value of the `anonymousId` and would look like:
```
analytics.identify();
```
If an Identify call contains a `userId`, that will be sent to Asayer.

```
analytics.identify("userId123");
```

In case Segment sends over any traits in the `identify` call, these will be passed as custom fields to Asayer.
```
analytics.identify("userId123", {
  displayName: "Iron Man",
  email: "iron@man.com"
  plan: "pro"
});
```

**NOTE:** All traits, as well as `userId` and `anonymousId` fields must be explicitly enabled within the Asayer dashboard under [Preferences -> Custom Fields](https://app.asayer.io/client/custom-fields) before they will successfully send.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('New Order', {
    orderId: '123456',
    productName: 'Shoe',
    price: 44.95,
    currency: 'USD'
});
```

Track calls will be sent to Asayer via its `asayer.event` method as a `track` event.
