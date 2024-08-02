---
title: FL0 Destination
id: 66048cbafa5a03fc49b153d3
---

[FL0](https://fl0.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is the Product Intelligence Platform that converts customer interactions into revenue opportunities.

This destination is maintained by FL0. For any issues with the destination, [contact the FL0 Support team](mailto:support@fl0.com).


## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "FL0".
2. Select FL0 and click **Add Destination**
3. Select an existing source to connect to FL0.
4. Go to your [FL0 Organization](https://go.fl0.com){:target="_blank"}.
5. Click on **Connections** in the left-hand menu.
6. Click **Add source** in the top-right of the page and select **Segment**.
7. Copy the **API Key** from the Segment properties.
8. Enter the **API Key** in the FL0 destination settings in Segment.


## Supported methods

The FL0 destination supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to FL0 to measure what pages your users and companies are visiting. For example:

```js
analytics.page()
```

Segment sends Page calls to FL0 as automatically tagged events called `Page View`.



### Identify

Send [Identify](/docs/connections/spec/identify) calls to notify FL0 of your logged-in users. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to FL0 as an `Identify` event.


### Track

Send [Track](/docs/connections/spec/track) calls to measure custom events that happen within your app. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to FL0 as a tagged event with the same name as the event, for example `Login Button Clicked`.

