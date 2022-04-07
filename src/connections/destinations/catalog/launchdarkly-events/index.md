---
title: LaunchDarkly Events Destination
rewrite: true
redirect_from: /connections/destinations/catalog/launchdarkly-subscription
hide-personas-partial: true
hidden: true
maintenance: true
---
LaunchDarkly is a feature management platform that empowers development teams to safely deliver and control software through feature flags.

LaunchDarkly users can run experiments on any feature flag, with custom events as metrics. You can look for an existing custom event from Segment, and start recording data against it as a metric in your LaunchDarkly experiment.

This destination is maintained by LaunchDarkly. For any issues with the destination, [contact the LaunchDarkly support team](mailto:support@launchdarkly.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for “LaunchDarkly” in the Destinations Catalog, and select the LaunchDarkly destination.
3. Choose which Source should send data to the LaunchDarkly destination.
4. Go to the LaunchDarkly [Account Settings](https://app.launchdarkly.com/settings/projects), and find and copy the client-side ID from your default project.
5. Enter this ID as the **API Key** in the “LaunchDarkly” destination settings in Segment.

## Track
If you aren't familiar with the Segment Spec,  take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```json
{
  "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c8955",
  "type": "track",
  "properties": {
    "value": 99.84,
  },
  "userId": "test-user-s6dndc",
  "event": "Order Completed"
}
```

LaunchDarkly ingests that call as:

```json
{
  "kind": "custom",
  "key": "Order Completed",
  "userKey": "userId",
  "creationDate": 1592588370692,
  "metricValue": 99.84,
  "data": {
    "value": 99.84,
  }
}
```

> note ""
> **Note**: The LaunchDarkly Metric must be actively recording and have a Feature Flag attached for Segment events to appear in your LaunchDarkly Project.

Segment sends Track calls to LaunchDarkly as a `track` event. It appears on your [Debugger page](https://app.launchdarkly.com/default/production/debugger/goals).

`track` events map to a Metric if the Segment event name exactly matches the Name of an active LaunchDarkly experiment metric.

The `userKey` field maps to the `userId` field; if there is no `userId` field, LaunchDarkly uses `anonymousId` field for the `userKey` field.
