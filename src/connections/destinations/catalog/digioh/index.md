---
title: Digioh Destination
rewrite: true
id: 5f73b9dae27ce740818bf92d
---
[Digioh](https://www.digioh.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows you to grow your email lists with personalized forms, landing pages, paywalls and email preference centers. Digioh makes it easy with a drag and drop builder and built-in integrations to your favorite marketing tools.

This destination is maintained by Digioh. For any issues with the destination, [contact the Digioh Support team](mailto:contact@digioh.com).

## Getting Started

{% include content/connection-modes.md %}

1. Open the [Digioh Integrations tab](https://account.digioh.com/Integration/List), click **New Integration**.
2. The Segment App opens in a new window. Log in to authenticate the connection from Digioh.
3. Select the Workspace and Source to connect with Digioh.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Digioh as an `identify` event.

> warning ""
> The `email` field is required. Identify calls without an `email` fail with a `400` code.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Digioh as a `track` event.

> warning ""
> Be sure you send an Identify call for any user who will trigger Track calls. If Digioh receives a Track call for an unknown `userId`, the call is dropped.
