---
title: Bucket Destination
rewrite: true
---
[Bucket](https://bucket.so/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) features analytics for SaaS companies.

This destination is maintained by Bucket. For any issues with the destination, [contact the Bucket Support team](mailto:support@bucket.so).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Bucket" in the Destinations Catalog, and select the Bucket destination.
3. Choose which Source should send data to the Bucket destination.
4. Go to [Bucket's Settings](https://bucket.so) and find and copy the "App ID".
5. Enter the App ID as "API Key" in the "Bucket" destination settings in Segment.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Bucket as an `identify` event to update Users.

## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](https://segment.com/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.identify('groupId123', {
  name: 'Acme, Inc',
});
```

Segment sends Group calls to Bucket as a `group` event to update Companies.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked', {
    // custom properties
})
```

Segment sends Track calls to Bucket as a `track` event to update Features.
