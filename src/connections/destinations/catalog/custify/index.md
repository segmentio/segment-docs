---
title: Custify Destination
rewrite: true
id: 5cf78a8db6bcdf00017208cd
---
[Custify](https://www.custify.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners)'s Customer Success Platform is designed for B2B SaaS businesses and enables them to reduce their churn and increase customer lifetime value.

This destination is maintained by Custify. For any issues with the destination, [contact the Custify Support team](mailto:contact@custify.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Custify" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Custify Developer area](https://app.custify.com/settings/developer/api-key).

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to Custify as `customers`, with the `userId` being stored as Custify's `user_id`. You can view the Customers by going to Customers > People in your Custify app interface.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will appear in Custify as `events` with the same name, associated with the correct Company and Customer based on the Identify call.

Track calls require the `identify` call to be made in advance to be able to link the `event` to a `customer`.

To view the events, go to their linked Customer and they are displayed in the activity stream (when filtering the view by System > Events).

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

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
