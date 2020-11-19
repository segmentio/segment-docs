---
title: Cubitic Destination
beta: true
---

This destination is maintained by Cubitic.

## Getting Started

Once the Segment library is integrated with your mobile app, toggle Cubitic on in your Segment dashboard, and fill in your Cubitic application key.

The Cubitic application key can be obtained by contacting signup@cubitic.io

Cubitic supports the `identify` and `track` methods.

- - -

## Identify

When you `identify` a user, Segment passes that user's information to Cubitic.
Cubitic stores each attribute sent to build a demographic profile of your users.


## Track

When you `track` an event, Segment sends that event to Cubitic to be stored on the Cubitic platform.

Cubitic requires 2 events:

* For churn predicition:

A `Started Session` event that is sent each time a user session starts. This event can be sent with any properties that you like, for e.g.

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Started Session",
  "properties": {
    "category": "Games"
  }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Started Session",
  "properties": {
    "category": "Games"
  }
}
```

* For spend prediction:

We require the above `Started Session` event, in addition to a `Order Completed` event that is fired whenever a user makes a cash purchase.
This event must contain a revenue property that specifies the amount spent using any consistent denomination for all users, for e.g. report all purchases in USD

```js
{
  "type": "track",
  "event": "Order Completed",
  "properties": {
    "revenue": 10.0
  }
  "userId": "97980cfea0067",
  "version": "1.1"
}
```
