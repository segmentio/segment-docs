---
title: Digioh Destination
rewrite: true
---
[Digioh](https://www.digioh.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners)  allows you to grow your email lists with personalized forms, landing pages, paywalls and email preference centers. Digioh makes it easy with a drag and drop builder and built-in integrations to your favorite marketing tools.

This destination is maintained by Digioh. For any issues with the destination, [contact the Digioh Support team](mailto:contact@digioh.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Digioh" in the Destinations Catalog, and select the Digioh destination.
3. Choose which Source should send data to the Digioh destination.
4. Go to the [Digioh dashboard](https://account.digioh.com/HQ/Installation), find and copy the "API key" parameter in your `<script>` tag.
`<script async type='text/javascript' src='https://www.lightboxcdn.com/vendor/API_KEY/lightbox_inline.js'></script>`
5. Enter the "API Key" and your Digioh account email in the Digioh destination settings in Segment.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Digioh as an `identify` event.

> warning ""
> The `email` field is required. Identify calls without an `email` will fail with a `400` code.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Digioh as a `track` event.

> warning ""
> You must send an Identify call for a user before you send a Track call for them otherwise the Track call will be dropped.
