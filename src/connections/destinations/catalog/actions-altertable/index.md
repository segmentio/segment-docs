---
title: Altertable Destination
---

{% include content/plan-grid.md name="actions" %}

[Altertable](https://altertable.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="\_blank”} provides the easiest way to sync your Segment events and identities into Altertable. They result in queryable tables that you can use to build custom reports and dashboards instantly.

This destination is maintained by Altertable. For any issues with the destination, [contact their Support team](mailto:support@altertable.ai).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="\_blank”} search for "Altertable".
2. Select "Altertable" and click **Add Destination**.
3. Select an existing Source to connect to Altertable.
4. Go to the [Altertable dashboard](https://altertable.ai){:target="\_blank"}, find and copy your **environment** slug and Product Analytics **API key**.
5. Enter the **environment** slug and **API Key** in the Altertable destination settings in Segment.

{% include components/actions-fields.html %}

## Reference

### Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page();
```

Segment sends Page calls to Altertable, which are stored as a `$pageview` event in the `altertable.main.events` table.

### Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Altertable, which are stored as a `$screen` event in the `altertable.main.events` table.

### Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
});
```

Segment sends Identify calls to Altertable, which in the `altertable.main.identities` and `altertable.main.identity_distinct_ids` tables.

### Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track("Login Button Clicked");
```

Segment sends Track calls to Altertable using the event name you provide, which are stored in the `altertable.main.events` table.

### Alias

If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias("507f191e81");
```

Segment sends Alias calls to Altertable, which are stored in the `altertable.main.identity_distinct_id_overrides` table.

### Group

Group is not supported by Altertable at the moment.

## Additional information

- Data is synced in real-time, so you can explore and analyze it immediately.
- Altertable automatically structures incoming events and identities into resolved & queryable analytical tables under the `altertable.analytics` schema.
