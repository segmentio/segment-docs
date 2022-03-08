---
rewrite: true
title: Asayer Destination
id: 5d00754256e478000114784f
---
[Asayer](https://asayer.io) is a session replay tool for engineering teams. It lets you capture the full picture of each user session on your website so you can quickly solve issues and improve your customer experience.

This destination is maintained by Asayer. For any issues with the destination, [contact the Asayer Support team](mailto:support@asayer.io).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Asayer" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Set your Asayer Site ID into your Destination settings. You can find in the [Asayer dashboard](https://app.openreplay.com){:target="_blank"} by clicking **Preferences > Sites > Tracking Code**. The Site ID is a whole number (e.g. 435).


Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Asayer's tracking code onto your website.

In the meantime, remove Asayer's native snippet from your site.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. Identify calls sent to Segment will be transformed and sent to Asayer's `asayer.vars` method.

An example call which does not include a `userId` will transmit Asayer the value of the `anonymousId` and would look like:
```js
analytics.identify();
```
If an Identify call contains a `userId`, that will be sent to Asayer.

```js
analytics.identify("userId123");
```

In case Segment sends over any traits in the `identify` call, these will be passed as custom fields to Asayer.
```js
analytics.identify("userId123", {
  displayName: "Iron Man",
  email: "iron@man.com"
  plan: "pro"
});
```

**NOTE:** All traits, as well as `userId` and `anonymousId` fields must be explicitly enabled within the Asayer dashboard under [Preferences -> Custom Fields](https://app.openreplay.com/client/custom-fields) before they will successfully send.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('New Order', {
    orderId: '123456',
    productName: 'Shoe',
    price: 44.95,
    currency: 'USD'
});
```

Track calls will be sent to Asayer using its `asayer.event` method as a `track` event.
