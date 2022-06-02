---
rewrite: true
title: journy.io Destination
id: 607d4f97829762f3b69a807b
---
[journy.io](https://www.journy.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) empowers your marketing, sales and support teams with actionable customer insights, needed to improve conversions, increase sales, and reduce churn, right in the tools they already use.

This destination is maintained by journy.io. For any issues with the destination, [contact the journy.io Support team](mailto:hi@journy.io).

> note "Note:"
> The journy.io Destination is currently in beta, which means that they are still actively developing the destination. To join their beta program, or if you have any feedback to help improve the journy.io Destination and its documentation, [contact the journy.io support team](mailto:hi@journy.io)!


## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "journy.io" in the Destinations Catalog, and select the "journy.io" destination.
3. Choose which Source should send data to the "journy.io" destination.
4. Go to the [journy.io app](https://system.journy.io), add Segment as source in the connections, choose "Manual setup" and copy the "API key".
5. Enter the "API Key" in the "journy.io" destination settings in Segment.


## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to journy.io as a `pageview`. Only page calls with `anonymousId` and `properties.url` are accepted.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to journy.io where they create a new, or update an existing user.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to journy.io as a new events.

Set `context.groupId` to record the event and attribute it to a specific account. This is useful in B2B use cases where you need to attribute your non-group calls to an account.

## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group('groupId123', {
    name: "ACME"
});
```

Segment sends Group calls to journy.io where they create a new, or update existing accounts. If a `userId` is set, the user is linked to the account.
