---
title: Screeb Destination
rewrite: true
id: 60ae0d1120fec1896fa8ff8b
---
[Screeb](https://screeb.app/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps teams to get actionnable feedback without ruining user experience.

This destination is maintained by Screeb. For any issues with the destination, [contact the Screeb Support team](mailto:support@screeb.app).

## Getting Started

{% include content/connection-modes.md %} 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Screeb" in the Destinations Catalog, and select the "Screeb" destination.
3. Choose which Source should send data to the "Screeb" destination.
4. Go to the [Screeb platform](https://admin.screeb.app/) > Integration, and install the Segment connector.
5. Find and copy the "API Key".
6. Enter the "API Key" in the "Screeb" destination settings in Segment.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Screeb as an `identity` event.

The traits provided along with the identity can be listed on the [Screeb platform](https://admin.screeb.app/) > Settings. Surveys can be customized or displayed according to identity properties.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Screeb as an `event.track` event.

The provided events can be listed on the [Screeb platform](https://admin.screeb.app/) > Settings. Surveys can be displayed according to event rules.

## Alias

If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias('newUserId')
```

Segment sends Alias calls to Screeb as an `identity.alias` event.

**Important:** After this call, the Screeb respondent will have 3 aliases for the same identity: previous userId, anonymousId and `newUserId`. Merge of responses and events will be added in the future.

---
