---
title: Gameball Destination
hide-cmodes: true
id: 5df6778be7d93d3a5b742b1a
---
[Gameball](https://gameball.co/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a gamified loyalty platform, offering growth, retention, and referral-management programs; and providing self-serve predictive analytics for growth marketers using machine learning to automate audience insights and recommendations.

This destination is maintained by Gameball. For any issues with the destination, [contact Gameball support](mailto:support@gmabell.co).


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment app Destinations page click "Gameball".
2. Search for "Gameball" in the Destinations Catalog and confirm the Source you'd like to connect to.
3. Copy and paste in your ["API Key"](https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key) from your [Account Integration](https://app.gameball.co/settings) page into your Segment Settings UI.


Segment's `track` and `identify` events can only update the following properties in Gameball:

- `email`
- `birthday`
- `name`
- `number`
- `gender`

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [`identify` method does](/docs/connections/spec/identify/). An example call would look like:

```js
analytics.identify('userId123', {
  email: 'ahaddad@example.com',
  name: 'ahmad'
});
```

Segment sends identify() calls to Gameball as an `identify` event.

All events _must_ contain a `userID` property.

Segment `identify` events create or update user/player object records in Gameball. If a record with the same `userId` exists, that record is updated; otherwise, Gameball creates a new customer record with that `userId`.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [track method does](/docs/connections/spec/track/). An example call would look like:

```js
analytics.track('View Product')
```

Set up your [custom `track` events in Gameball](https://help.gameball.co/en/articles/3467130-manage-your-players-events) before you send them from Segment to Gameball.

All `track` events _must_ contain a `userID` property.

Segment sends `track` calls to Gameball as a `track` event.
