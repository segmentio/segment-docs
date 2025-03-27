---
title: Bucket Destination
rewrite: true
id: 5fabc0b00f88248bbce4db48
---

[Bucket](https://bucket.co/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="blank"} is feature flagging that’s purpose-built for B2B.


With Bucket, you can:
- Release features gradually with simple flags.
- Gate features based on customer subscriptions.
- Iterate fast with adoption metrics and feedback.

This destination is maintained by Bucket. For any issues with the destination, [contact the Bucket Support team](mailto:support@bucket.co).

## Getting Started



1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Bucket" in the Destinations Catalog, and select the Bucket destination.
3. Choose which Source should send data to the Bucket destination.
4. Go to [Bucket's Environment Settings](https://app.bucket.co/envs/current/settings/app-environments){:target="blank"} and find and copy the "Publishable Key" for the Production environment.
5. Enter the "Publishable Key" as "Publishable Key" in the "Bucket" destination settings in Segment.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  name: 'John Doe',
  email: 'john.doe@example.com',
});
```

Segment sends Identify calls to Bucket as an `identify` event which updates User profiles.

## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.identify('groupId123', {
  name: 'Acme, Inc',
});
```

Segment sends Group calls to Bucket as a `group` event which updates Company profiles.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked', {});
```

Segment sends Track calls to Bucket as a `track` event which updates the Features page.
