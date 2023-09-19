---
title: 1Flow Analytics Destination
id: 62bf80378e3d0241ab190594
hidden: true
published: false
---

[1Flow](https://1flow.app/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a leading in-app user survey and messaging platform for Mobile app and SaaS businesses.

Using 1Flow, you can reach users _in-the-moment_ while they are interacting with your website or application, to collect highly contextual user insights that help you improve your product offering and customer experience.

This destination is maintained by 1Flow. For any issues with the destination, [contact the 1Flow Support team](mailto:support@1flow.app).

## Getting Started


1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **1Flow** in the Destinations Catalog, and select the **1Flow** destination.
3. Choose which Source should send data to the 1Flow destination.
4. Go to the [1Flow dashboard](https://dashboard.1flow.app/){:target="\_blank"} and find the **API Key** in Project Settings.
5. Enter the **API Key** in the 1Flow destination settings in Segment.

## Supported methods

1Flow supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to create new user profile or update existing users with new trait values. For example:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
});
```

Segment sends Identify calls to 1Flow as an `identify` event.

### Track

Send [Track](/docs/connections/spec/track) calls to record user behavior in your app. For example:

```js
analytics.track("Login Button Clicked");
```

Segment sends Track calls to 1Flow as a `track` event.

### Page

Send [Page](/docs/connections/spec/page) calls to record which website pages users have visited. For example:

```js
analytics.page("Pricing", {
  title: "Segment Pricing",
  url: "https://segment.com/pricing",
  path: "/pricing",
  referrer: "https://segment.com/warehouses",
});
```

Segment sends Page calls to 1Flow as a `page_[name]` event. (or `page_view` if a page name isn’t provided).

### Screen

Send [Screen](/docs/connections/spec/screen) calls to record which mobile app screens users have viewed. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to 1Flow as a `screen_[name]` event (or `screen_view` if a screen name isn't provided).
