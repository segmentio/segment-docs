---
title: Plotline Destination
id: 669f7b835aae8164929d000e
---

[Plotline](https://www.plotline.so/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a mobile adoption platform that helps product and marketing teams launch experiences like Stories, Videos, Animations, Streaks, Floating buttons and more inside the app - without taking engineering effort.

This destination is maintained by Plotline. For any issues with the destination, contact Plotline's support team at support@plotline.so.

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Plotline".
2. Select and click **Add Destination**.
3. Select an existing source to connect to.
4. Go to [Plotline's dashboard](app.plotline.so){:target="_blank”}, navigate to "Credentials" and copy the API key.
5. Enter the API Key in the destination settings in Segment.

## Supported methods

Plotline supports the following methods, as specified in the [Segment Spec](https://github.com/segmentio/segment-docs/blob/develop/docs/connections/spec).

### Identify

Send Identify calls to update user attributes in Plotline. These user attributes can be used for setting up the audience in campaigns and personalizing the content in the campaigns. For example:  

```
analytics.identify('userId123', {
  name: 'John Doe'
});
```

Segment sends Identify calls to Plotline as an `identify` event.

### Track

Send Track calls to Plotline. Track calls are used for Plotline to know all user events and can be used for setting up the audience in campaigns and defining the goal events. For example:  

```
analytics.track('Checkout Completed')
```

Segment sends Track calls to Plotline as a `track` event.
