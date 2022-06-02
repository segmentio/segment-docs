---
rewrite: true
title: Auryc Destination
id: 5cae592103251a0001c2820a
---
[Auryc](https://www.auryc.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a client-side journey intelligence platform that surfaces real-time insights with powerful visual context across all of your digital ecommerce journeys. Auryc helps enterprises find and resolve the customer journey issues that directly impact conversions and customer satisfaction.

This source is maintained by Auryc. For any issues with the destination, [contact the Auryc Support team](mailto:segment@auryc.com).

{% include content/beta-note.md %}

It also means that, for the time being, there is a longer delay for us to deploy it to your analytics.js after you enable; expect about 24 hours for it to render on your site.

## Getting Started

{% include content/connection-modes.md %}

1. Go to your [Auryc Installation Guides](https://portal.auryc.com/auth/session?modal=integrations) and click  **Install Segment**.
2. On the Segment page, log in and authorize the Auryc Destination.
3. Select the workspace and source you to add Auryc to, and click **Allow**.

And you're done! Once you click "Allow", Auryc shows an installation confirmation message.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. Identify calls will be sent to Auryc as an `identify` event and `addUserProperties` event.

If the call only contains the user id and does not have the traits, the user id will be sent to Auryc as identity.

An example call would look like:

```js
analytics.identify('userId123');
```

If the call contains both user id and traits, the user id will be sent to Auryc as identity, and the traits will be sent as user properties.

An example call would look like:

```js
analytics.identify("userId123", {
  email: "jane.kim@example.com"
});
```


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Order Submitted', {price: 234.12})
```

Track calls will be sent to Auryc as a `track` event.
