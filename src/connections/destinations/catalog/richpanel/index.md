---
title: Richpanel Destination
rewrite: true
id: 5ddd4f68758f3b16e86a6332
---
[Richpanel](https://richpanel.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the helpdesk software built for Ecommerce teams to support customers at scale in a fun, easy, collaborative way.

This destination is maintained by Richpanel. For any issues with the destination, [contact the Richpanel Support team](mailto:support@richpanel.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Richpanel" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. If this is the first time setting up Richpanel as a destination, you'll need to install the Segment App in your Richpanel Account.
4. In your Richpanel account, go to Data Sources > Integrations and install the Segment Connector.
5. Enter the "API Key" into your Segment Settings UI which you can find from your [Richpanel data sources](https://app.richpanel.com/connectors/my/list).

**NOTE**: Richpanel accepts anonymous users, or Visitors, but they will not appear in the Richpanel Customer Section UI unless the customer is first identified using an `identify` call or customer activity through Richpanel Channels, thereby becoming a Customer.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [`identify` method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@segment.com',
  richpanel_session_id: 'abc123'
});
```

`identify` calls sent to Richpanel create or update a standard customer object record. If a record with a corresponding `userId` exists, that record is updated. If no customer record exists, a new customer record is created.

The basic properties to identify and create a user are:

- `uid` : Unique User Id (required)
- `email` : User's email
- `firstName` : User's First Name
- `lastName` : User's Last Name
- `phone` : User's Phone

`uid` is a *required* field; `email`, `firstName`, and `lastName` are optional, but highly recommended.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [`page` method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page('Pricing', {
  title: 'Segment Pricing',
  url: 'https://segment.com/pricing',
  richpanel_session_id: 'abc123'
});
```

Page calls are sent as a tracking event to Richpanel on the timeline of the customer who was tracked. If the `richpanel_session_id` is included, it clusters this tracking event into a single “session” on the customer's timeline.

If no `richpanel_session_id` is supplied, Richpanel will automatically generate sessionIDs based on time between tracking events. (Read why [Segment doesn't have session tracking](https://segment.com/blog/facts-vs-stories-why-segment-has-no-sessions-api/) for more details). `page` calls can only update `email` traits, not create them.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [`track` method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Clicked Login Button', {
    richpanel_session_id: 'abc123'
})
```

Track calls are sent to Richpanel as a `track` event. `track` calls can only update `email` traits, but do not create them.

**NOTE**: Richpanel accepts all events listed in [Segment's Specs](/docs/connections/spec/ecommerce/v2/). For events like Order Updated, Order Cancelled, and Order Refunded, we recommend that you pass an `order_status` property.
