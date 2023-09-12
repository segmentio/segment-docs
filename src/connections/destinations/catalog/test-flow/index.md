---
title: 1Flow (Actions) Destination
---

[1Flow](https://1flow.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a leading in-app user survey and messaging platform for Mobile app and SaaS businesses.

Using 1Flow, you can reach users _in-the-moment_ while they are interacting with your website or application, to collect highly contextual user insights that help you improve your product offering and customer experience

This destination is maintained by 1Flow. For any issues with the destination, [contact their Support team](mailto:support@1flow.app).

## Getting started

1. From the Segment web app, click **Catalog**, then click **1Flow**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure 1Flow**.
4. Select an existing Source to connect to 1Flow (Actions).
5. Go to 1flow.ai -> Settings -> Project Settings -> Copy 1Flow project key and paste it into the Connection Settings in Segment.


## Supported methods

### Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```swift
analytics.identify(userId: "peter@example.com", traits: [
    "name": "Peter Gibbons",
    "email": "peter@example.com",
    "mobile": 1234567890
])
```
When you call identify method of segment, it will be equivalent to `logUser` of 1Flow. `userId` will be `userID` and `traits` will be `userDetails`.

### Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```swift
analytics.track(name: "ButtonClicked")
```
Any value passed in `name`, will be eventName and if you have passed any event property, then it will be event `parameters`.

### Screen

Send [Screen](/docs/connections/spec/screen) calls to record which mobile app screens users have viewed. For example:

```swift
analytics.screen(title: "Home")
```

Segment sends Screen calls to 1Flow as a `screen_[name]` event (or `screen_view` if a screen name isn't provided).
