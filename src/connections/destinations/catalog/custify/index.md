---
title: Custify Destination
rewrite: true
---

[Custify](https://www.custify.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners)'s Customer Success Platform is designed for B2B SaaS businesses and enables them to reduce their churn and increase customer lifetime value.

This destination is maintained by Custify. For any issues with the destination, please [reach out to their team](mailto:contact@custify.com).

_**NOTE:** The Custify Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on June 26, 2019. If you are interested in joining their beta program or have any feedback to help improve the Custify Destination and its documentation, please [let  their team know](mailto:contact@custify.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Custify" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Custify Developer area](https://app.custify.com/settings/developer/api-key).

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to Custify as `customers`, with the `userId` being stored as Custify's `user_id`. You can view the Customers by going to Customers > People in your Custify app interface.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will appear in Custify as `events` with the same name, associated with the correct Company and Customer based on the Identify call.

Track calls require the `identify` call to be made in advance to be able to link the `event` to a `customer`.

To view the events, go to their linked Customer and they are displayed in the activity stream (when filtering the view by System > Events).

## Group

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like:

```
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

Group calls will be sent to Custify as `companies` and the identified `customer` will be linked to the `company`. You can view Companies by going to Customers > Companies in your Custify app interface
