---
title: Engage Destination
id: 607482568738ee46aaa8404c
---
## Engage Messaging

[Engage Messaging](https://engage.so/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps businesses send personalised messages to customers based on customer traits and actions.

This destination is maintained by Engage Messaging. For any issues with the destination, [contact the Engage Messaging Support team](mailto:hello@engage.so).


## Getting Started


1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Engage Messaging" in the Destinations Catalog, after selecting it, choose the Source that will send data to Engage Messaging.
4. Go to your [Engage dashboard](https://app.engage.so/settings/account), find and copy your "Public API key".
5. Enter the API Key in the destination settings in Segment.

## Supported methods

Engage Messaging supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to identify the user profile and traits on Engage. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

If the user already exists on Engage, identify can also be used to update the user traits.
Segment sends Identify calls to Engage Messaging as an `identify` event.


### Track

Send [Track](/docs/connections/spec/track) calls to track user events and actions. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Engage Messaging as a `track` event.

---
