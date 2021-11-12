---
title: Houseware Destination
rewrite: true
beta: true
---

[Houseware](https://houseware.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps teams to generate actionable sales/conversion touchpoints in the user journeys to clock more revenue.

This destination is maintained by Houseware. For any issues with the destination, [contact the Houseware Support team](mailto:support@houseware.io).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Houseware" in the Destinations Catalog, and select the **Houseware** destination.
3. Choose which Source should send data to the "Houseware" destination.
4. Write an email to [Houseware Support team](mailto:support@houseware.io) and we will get back to you with an API Key in under 24 hours.
5. Enter the "API Key" in the "Houseware" destination settings in Segment.

Once the customer authorizes Segment to send their events to Houseware, the specific events in the Track calls are visible in the dropdown. Upon the successful delivery of the Segment data feed in the Houseware database, the user would be able to click on the event dropdown on the `Create Rule` page.

## Supported methods

Houseware supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

If you aren’t familiar with the Segment Spec, take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page('Home')
```

Segment sends Page calls to Houseware as a `pageview`. 


### Identify

If you aren’t familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Houseware as an `identify` event.


### Track

If you aren’t familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:
```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Houseware as a `track` event.


## Support

Segment lets you change these destination settings from the Segment app without having to touch any code.

If you have any trouble with configuring your API Key, or see issues in your event delivery logs on Segment, feel free to reach out to our [Houseware Support team](mailto:support@houseware.io).