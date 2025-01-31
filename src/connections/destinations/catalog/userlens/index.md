---
title: Userlens By Wudpecker Destination
id: 678b412b643761937104abb2
---


[Userlens By Wudpecker](https://userlens.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is the Next-Gen of Product Intelligence. Userlens combines quantitative data from products like Segment and PostHog, and qualitative feedback from products like Intercom and Wudpecker user interviews, to give you a full picture of how your users are using your products and features.

This destination is maintained by Wudpecker. For any issues with the destination, [contact the Wudpecker Support team](mailto:ankur@wudpecker.io).


## Getting started


1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for *Userlens*.
2. Select *Userlens* and click **Add Destination**.
3. Select an existing Source to connect to the Userlens destination.
4. Go to the [Userlens settings](https://app.userlens.io/settings?tab=integrations&subtab=SEGMENT){:target="_blank"} in the Userlens app to copy the **API key**.
5. Enter the **API Key** in the Userlens destination settings in Segment.


## Supported methods

Userlens supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).


### Identify

Send [Identify](/docs/connections/spec/identify) calls to identify users in Userlens. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Userlens as an `identify` event.


### Track

Send [Track](/docs/connections/spec/track) calls to add events in Userlens. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Userlens as a `track` event.
