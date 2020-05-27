---
title: Gameball Destination
rewrite: true
---
Gameball is a gamified loyalty platform, offering growth, retention, and referrals management programs, helping businesses increase engagement with customers which translates to higher revenues and long-term relationships between businesses and their customers.

[Gameball](https://gameball.co/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides self-serve predictive analytics for growth marketers, leveraging machine learning to automate audience insights and recommendations.

This destination is maintained by Gameball. For any issues with the destination, please [contact their support](mailto:support@gmabell.co).


## Getting Started

> Do not remove this line. It will auto-populate the following information for your integration: https://cl.ly/23e637f055f7

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Gameball".
2. Search for "Gameball" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in your ["API Key"](https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key) from your [Account Integration](https://app.gameball.co/settings) page into your Segment Settings UI.

Note: `track` and `identify` events can only update the following properties:

* `email`
* `birthday`
* `name`
* `number`
* `gender`

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [`identify` method does](https://segment.com/docs/connections/spec/identify/). An example call would look like:

```js
analytics.identify('userId123', {
  email: 'nazih@gmail',
  name: 'ahmad'
});
```
Segment sends identify() calls to Gameball as an `identify` event.

`userID` is a **required** property in all events.

`identify` events create or update user/player object records within Gameball. If a record with the same `userId` exists, that record is updated; otherwise, a new customer record with that `userId` is created.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [track method does](https://segment.com/docs/connections/spec/track/). An example call would look like:

```js
analytics.track('View Product')
```
Configure your [custom`track` events in Gameball](https://help.gameball.co/en/articles/3467130-manage-your-players-events)  before sending them to Gameball from Segment.

`userID` is a **required** property in all events.

Segment sends track() calls to Gameball as a `track` event.
