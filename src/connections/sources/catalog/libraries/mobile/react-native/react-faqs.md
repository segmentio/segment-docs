---
title: Analytics-React-Native FAQs
strat: react-native
---



### Can I help develop a destination?

Yes, Segment's SDK is [open-source](https://github.com/segmentio/analytics-react-native){:target="blank"}. If you'd like to contribute, fix a bug, or add a destination - here's [documentation on how to do so](https://github.com/segmentio/analytics-react-native/blob/master/CONTRIBUTING.md){:target="blank"}. To add a destination, make sure you contact Segment's [partners team](https://github.com/segmentio/analytics-react-native/blob/master/CONTRIBUTING.md){:target="blank"} first.



### How big is the Segment SDK?

The core Segment SDK is extremely lightweight. On iOS it weighs in at about 212KB. On Android it contains just under 1k methods, the JAR weighs in at 123KB and the dex size is 113KB.

### Can I also use the native Analytics API?

Yes! You can use the native Analytics API, just note that:
- We only support singleton instances, use `SEGAnalytics.sharedAnalytics` on iOS or `Analytics.with(context)` on Android.
- You cannot call the native singleton before it has been configured. If you need the native Analytics before you call `analytics.setup('your write key')` on your JavaScript code you will need to configure it natively instead.
- If you configure Analytics using its native API you will need to use `analytics.useNativeConfiguration()` on your JavaScript code.


## Why do I see incorrect destination flags in the Debugger?

If you use the [Segment Debugger](/docs/connections/sources/debugger/), you might see raw request payloads where some of the destinations are set to `false`, even though you haven't added that specific flag to your requests. You might see an integrations object that looks like the example below.

```json
"integrations": {
  "Segment.io": false,
  "Google Analytics": false,
  "Localytics": false,
  "Mixpanel": false
}
```
These flags are used both to in code to [prevent data from being sent to specific destinations](/docs/guides/filtering-data/#filtering-with-the-integrations-object), and by the library to tell the Segment servers that a bundled destination SDK sent the request payload directly from the device, to the destination's API endpoint. This prevents the Segment servers from sending a second version to the destination's endpoint and creating duplicate data.


### Why upgrade to React Native 2.0?

React Native 2.0 is a major version upgrade to the existing React Native library that includes several performance upgrades. The older version of the Analytics React Native library was built as a JavaScript wrapper for Segment's native analytics-android and analytics-ios libraries, which made feature development and bug fixes unsustainable, as they often required changes to the underlying libraries. The new Analytics React Native library executes less lines of code in a quicker manner with smaller algorithms. In addition, it no longer relies on analytics-ios or analytics-android. It has been rebuilt to be a standalone JavaScript library which drastically reduces the amount of dependencies required for React Native customers. Overall, it improves Analytics performance, provides a better developer experience, and uses less CPU, battery and memory.
