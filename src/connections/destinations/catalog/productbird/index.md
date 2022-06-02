---
title: ProductBird Destination
rewrite: true
id: 5fe9e8d3dc1fbccfdfbd1490
---
[ProductBird](https://productbird.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides a way for SaaS companies to have conversations with their users at scale, allowing them to make better product decisions.

This destination is maintained by ProductBird. For any issues with the destination, [contact the ProductBird Support team](mailto:harry@getdelighted.co).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "ProductBird" in the Destinations Catalog, and select the ProductBird destination.
3. Choose which Source should send data to the ProductBird destination.
4. Go to your [ProductBird Settings](https://app.productbird.io/settings), find and copy the "Secret API Key".
5. Enter the "Secret API Key" in the ProductBird destination settings in Segment.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  name: "Bobby Tables",
});
```

`firstName` or `fullName` are required fields.

Use the Identify method to pass user properties into user profiles in ProductBird.

Read more about [ProductBird's Special Properties](https://docs.productbird.io/docs/#special-properties) which have reserved meanings.

> success "Success message."
> If the ProductBird widget is implemented, ensure that the `userId` matches exactly with the corresponding ProductBird userID.
