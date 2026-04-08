---
title: Wecheer Dynamic Events Destination
---

[Wecheer](https://wecheer.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} s a customer-engagement platform for consumer goods brands selling through third-party points of sale.

This destination is maintained by Wecheer. For any issues with the source, [contact Wecheer Support team](mailto:support@wecheer.io).


## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Wecheer Dynamic Events".
2. Select Wecheer Dynamic Events and click **Add Destination**.
3. Select an existing Source to connect to Wecheer Dynamic Events.
4. Go to the [Wecheer Dynamic Events advertiser page](https://wecheer.me/campaigns/advertisers){:target="_blank"}.
5. Click to **Edit** to open the Advertiser settings in the **Data Connection** tab, then find and copy the **API key** in **Advertiser Consumption Authorization** section.
5. Enter the **API Key** and **Advertiser Id** in the Wecheer Dynamic Events destination settings in Segment.


## Supported methods

Wecheer Dynamic Events supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to record which website pages users have visited. For example:

```js
analytics.page()
```

Segment sends Page calls to Wecheer Dynamic Events as a `pageview`. 


### Screen

Send [Screen](/docs/connections/spec/screen) calls to record which mobile app screens users have viewed. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Wecheer Dynamic Events as a `screenview`. 


### Identify

Send [Identify](/docs/connections/spec/identify) calls to create new user profile or update existing users with new trait values. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Wecheer Dynamic Events as an `identify` event.


### Track

Send [Track](/docs/connections/spec/track) calls to record user behavior in your app. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Wecheer Dynamic Events as a `track` event.