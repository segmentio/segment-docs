---
title: Userlens By Wudpecker - Destination
---


[Userlens By Wudpecker](https://userlens.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is the Next-Gen of Product Intelligence. Userlens combines quantitative data from segment, posthog, etc and qualitative feedback from Intercom, Wudpecker user interviews, etc to give you a full picture of how your users are using your products and features.

This destination is maintained by Wudpecker. For any issues with the destination, [contact the Wudpecker Support team](mailto:ankur@wudpecker.io).


## Getting started


1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for "<Userlens>".
2. Select <Userlens> and click **Add Destination**.
3. Select an existing Source to connect to <Userlens>.
4. Go to the [<Userlens> settings](https://app.userlens.io/settings?tab=integrations&subtab=SEGMENT){:target="_blank"}, find and copy the **API key**.
5. Enter the **API Key** in the <Userlens> destination settings in Segment.


## Supported methods

Userlens supports the following methods, as specified in the [Segment Spec](https://segment.com/docs/connections/spec).


### Identify

Send [Identify](https://segment.com/docs/connections/spec/identify) calls to Identify users in Userlens. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Userlens as an `identify` event.


### Track

Send [Track](https://segment.com/docs/connections/spec/track) calls to add events in Userlens. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Userlens as a `track` event.
