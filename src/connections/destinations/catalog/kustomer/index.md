---
title: Kustomer Destination
rewrite: true
---
[Kustomer](https://www.kustomer.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the next-generation customer management platform for the people-first enterprise. It enables support teams to get a holistic view of the customers they are engaging with, resulting in meaningful interactions between businesses and customers.

This destination is maintained by Kustomer. For any issues with the destination, please [reach out to their team](mailto:support@kustomer.com).

_**NOTE:** The Kustomer data source is currently in beta, which means that they are still actively developing the integration. This doc was last updated on Feb 28, 2019. If you are interested in joining their beta program or have any feedback to help improve the Kustomer Destination and its documentation, please [let  their team know](mailto:support@kustomer.com)!_

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Kustomer" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. If this is the first time setting up Kustomer as a destination, you'll need to install the Segment App in your Kustomer Account.
4. In your Kustomer account, go to **Settings** > **Apps Directory** and install the **Segment** App.
5. After installing the Segment App, you need to go to the **Segment App Settings Page** listed directly underneath the Apps Directory page. From this page you will need to click the large green "Enable with Segment" button.

**NOTE:** Kustomer stores anonymous activity for 30 days but you will not see this activity in their UI unless the customer is identified using the [Identify](https://segment.com/docs/destinations/kustomer/#identify) call.

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page('Pricing', {
  title: 'Segment Pricing',
  url: 'https://segment.com/pricing',
  kustomer_session_id: 'abc123'
});
```

Page calls will sent as a `tracking event` to Kustomer on the timeline of the customer who was tracked. If the `kustomer_session_id` is included, it will cluster this tracking event into a single "session" on the customer's timeline. If no `kustomer_session_id` is supplied, we will automatically generate session IDs based on time between tracking events. (Read why Segment doesn't have session tracking [here](https://segment.com/blog/facts-vs-stories-why-segment-has-no-sessions-api/)).


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"
properties:@{ @"kustomer_session_id": @"abc123" }];
```

Screen calls will sent as a `tracking event` to Kustomer on the timeline of the customer who was tracked. If the `kustomer_session_id` is included, it will cluster this tracking event into a single "session" on the customer's timeline. If no `kustomer_session_id` is supplied, we will automatically generate session IDs based on time between tracking events. (Read why Segment doesn't have session tracking [here](https://segment.com/blog/facts-vs-stories-why-segment-has-no-sessions-api/)).

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to Kustomer which will create or update a standard customer object record. If a record with a corresponding `userId` exists, that record will be updated. If a customer record doesn't already exist, a new customer record will be created.

All of the overlapping attributes in the Segment [traits](https://segment.com/docs/spec/identify/#traits) documentation are mapped to standard Kustomer attributes by default. In addition to the Segment traits, the following attributes are automatically mapped from Segment to Kustomer:

| Segment          | Kustomer         |
| ------------     | --------         |
| `userId`         | `externalId`     |
| `context.locale` | `locale`         |


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track("Registered", {
  plan: "Pro Annual",
  accountType: "Facebook",
  kustomer_session_id:"abc123"
});
```

Track calls will sent as a `tracking event` to Kustomer on the timeline of the customer who was tracked. If the `kustomer_session_id` is included, it will cluster this tracking event into a single "session" on the customer's timeline. If no `kustomer_session_id` is supplied, we will automatically generate session IDs based on time between tracking events. (Read why Segment doesn't have session tracking [here](https://segment.com/blog/facts-vs-stories-why-segment-has-no-sessions-api/)).
