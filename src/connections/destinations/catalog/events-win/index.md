---
title: events.win Destination
id: 662d3328d029f89724a0c294
---

[events.win](https://events.win/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="\_blank”} provides a single platform to create your tracking plan, sync event definitions to your code, and see detailed metrics on how correct your data is. With events.win, you can ensure that your tracking is accurate and up-to-date.

This destination is maintained by events.win. For any issues with the destination, [contact the events.win support team](mailto:hi@events.win).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="\_blank”} search for "events.win".
2. Select events.win and click **Add Destination**.
3. Select an existing Source to connect to events.win.
4. Go to the [events.win dashboard](https://app.events.win/developers){:target="\_blank"}, find and copy the **Developer key**.
5. Return to Segment and enter the **Developer Key** in the events.win destination settings.
6. events.win starts to receive data from Segment. There may be a delay before data is visible in the events.win dashboard.

## Supported methods

events.win supports Segment's [Track](/docs/connections/spec/track) method, as specified in the [Segment Spec](/docs/connections/spec).

### Track

events.win consumes and validates [Track](/docs/connections/spec/track) calls against the tracking plan you've previously defined in events.win. events.win doesn't store the data, but instead provides a detailed report on how correct your data is.

You can use the [@events.win/cli](https://www.npmjs.com/package/@events.win/cli){:target="\_blank”} to generate type-safe tracking code for your events.

```js
/**
 * Example:
 * events.win will look at your spec for the event `login-button-clicked` and validate the properties `handle` and `id` are present and have the correct data type.
 */
analytics.track("login-button-clicked", {
  user: {
    handle: "frodo.baggins",
    id: "123456789",
  },
});
```
