---
title: Richpanel Destination
rewrite: true
---

[Richpanel](https://richpanel.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the helpdesk software built for Ecommerce teams to support customers at scale in a fun, easy, collaborative way.

This destination is maintained by Richpanel. For any issues with the destination, please [reach out to their team](mailto:support@richpanel.com).


_**NOTE:** The Richpanel Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on March 13, 2020. If you have any feedback to help improve the Richpanel Destination and its documentation, please [let  their team know](mailto:support@richpanel.com)!_

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Richpanel" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. If this is the first time setting up Richpanel as a destination, you’ll need to install the Segment App in your Richpanel Account.
4. In your Richpanel account, go to Data Sources > Integrations and install the Segment Connector.
5. Drop in the "API Key" into your Segment Settings UI which you can find from your [Richpanel data sources](https://app.richpanel.com/connectors/my/list).

**NOTE**: Richpanel accepts anonymous users, or [Visitors](http://event.richpanel.com/#/customers/understanding-customers), but they will not appear in the Richpanel Customer Section UI unless the customer is first identified using an `identify` call or customer actvity through Richpanel Channels, thereby becoming a [Customer](http://event.richpanel.com/#/customers/understanding-customers).

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [`identify` method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@segment.com',
  richpanel_session_id: 'abc123'
});
```

`identify` calls that are sent to Richpanel will create or update a standard customer object record. If a record with a corresponding `userId` exists, that record will be updated. If a customer record doesn’t already exist, a new customer record will be created.

Each property in Richpanel poses different behaviour, here are the basic properties to identify and create a user:

- `uid` : Unique User Id in a platform
- `email` : User email
- `firstName` : User First Name
- `lastName` : User Last Name
- `phone` : User Phone

`uid` is a *required* field; `email`, `firstName`, and `lastName` are highly recommended.

More details on user properties can be found [here](http://event.richpanel.com/#/properties) and more details on events can be found [here](http://event.richpanel.com/#/events?id=attribute-glossary)

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [`page` method](https://segment.com/docs/spec/page/) does. An example call would look like:

```js
analytics.page('Pricing', {
  title: 'Segment Pricing',
  url: 'https://segment.com/pricing',
  richpanel_session_id: 'abc123'
});
```

Page calls will sent as a tracking event to Richpanel on the timeline of the customer who was tracked. If the `richpanel_session_id` is included, it will cluster this tracking event into a single “session” on the customer’s timeline.

If no `richpanel_session_id` is supplied, we will automatically generate session IDs based on time between tracking events. (Read why Segment doesn’t have session tracking [here](https://segment.com/blog/facts-vs-stories-why-segment-has-no-sessions-api/)). `page` calls can only update `email` traits, not create them.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [`track` method](https://segment.com/docs/spec/track/) does. An example call would look like:

```js
analytics.track('Clicked Login Button', {
    richpanel_session_id: 'abc123'
})
```

Track calls will be sent to Richpanel as a `track` event. `track` calls can only update `email` traits, not create them.

**NOTE**: Richpanel process all events as per Segment Specs. For events like Order Update/Cancelled/Refunded, passing an `order_status` property is recommended.
