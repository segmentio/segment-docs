---
title: Reflag Destination
rewrite: true
id: 5fabc0b00f88248bbce4db48
---

[Reflag](https://reflag.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="blank"} is feature flags for SaaS that run on TypeScript.

With Reflag, you can:
- Release features gradually with simple flags.
- Gate features based on customer subscriptions.
- Iterate fast with adoption metrics and feedback.

This destination is maintained by Reflag. For any issues with the destination, [contact the Reflag Support team](mailto:support@reflag.com).

## Getting Started
1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Reflag" in the Destinations Catalog, and select the Reflag destination.
3. Choose which Source should send data to the Reflag destination.
4. Go to [Reflag's Environment Settings](https://app.reflag.com/envs/current/settings/app-environments){:target="blank"} and find and copy the "Publishable Key" for the Production environment.
5. Enter the "Publishable Key" as "Publishable Key" in the "Reflag" destination settings in Segment.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  name: 'John Doe',
  email: 'john.doe@example.com',
});
```

Segment sends Identify calls to Reflag as an `identify` event which updates User profiles.

## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.identify('groupId123', {
  name: 'Acme, Inc',
});
```

Segment sends Group calls to Reflag as a `group` event which updates Company profiles.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked', {});
```

Segment sends Track calls to Reflag as a `track` event which updates the Features page.
