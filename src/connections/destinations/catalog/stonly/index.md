---
title: Stonly Destination
rewrite: true
id: 5f354f1a928763feb8caf724
---
[Stonly](https://stonly.com) helps make customers more successful and employees more productive by letting you easily create interactive guides and put them inside and around your website or app – without having to code anything.

This destination is maintained by Stonly. For any issues with the destination, [contact their support team](mailto:support@stonly.com).

> "Note:"
> Stonly Destination is currently in beta, which means that they are still actively developing the destination. To join their beta program, or if you have any feedback to help improve Stonly Destination and its documentation, [contact Stonly support team](mailto:support@stonly.com)!

## Getting Started

Before you start, make sure Stonly destination supports the source type and connection mode you've chosen to implement. You can learn more about [connection modes here](/docs/connections/destinations/#connection-modes).

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Stonly" within the Destinations Catalog, and select Stonly destination.
3. Choose which Source should send data to Stonly destination.
4. Log in to your Stonly account and go to Team Management.
5. Select "Integrations" in left navigation and copy Stonly API key.
6. Enter the "API Key" in Stonly destination settings in Segment.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the Identify method does. An example call would look like this [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify("userId", {
  email: "john.doe@example.com"
});
```

Segment sends Identify calls to Stonly as an `identify` event.

Stonly uses strong typing for user traits thus all the traits are converted to matching type.

Following types are supported:

- boolean
- number
- string
- date

If one of your traits is of the date property type it should be sent as an ISO string.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track("TicketCreated", {
  ticketId: 123,
  creationDate: "2020-05-30T10:03:06.716Z"
});
```

Segment sends Track calls to Stonly as a `track` event.

If one of your properties is of the date property type, it should be sent as an ISO string.

---

## Troubleshooting

### Nested Objects and Arrays

Stonly does not accept nested properties or arrays, so such properties will be flattened and stringified. Stringified properties names are period delimited. For example:

```js
analytics.track("AddedToBasket", {
  metadata: {
    content: {
      productCode: 462,
      price: 847.63,
      attributes: [{ size: "M" }, { color: "red" }]
    }
  }
});
```

The resulting set of properties will look as:

```js
{
'metadata.content.productCode': 462,
'metadata.content.price': 847.63,
'metadata.content.attributes.0.size': 'M',
'metadata.content.attributes.1.color': 'red'
}
```
