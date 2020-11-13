---
title: Analytics-React FAQs
strat: react-native
---



### Can I help develop a destination?

Yep! Our SDK is [open-source](https://github.com/segmentio/analytics-react-native). If you'd like to contribute, fix a bug, or add a destination - here's [documentation on how to do so](https://github.com/segmentio/analytics-react-native/blob/master/CONTRIBUTING.md). to add a destination, make sure you contact our [partners team](https://github.com/segmentio/analytics-react-native/blob/master/CONTRIBUTING.md) first.



### How big is the Segment SDK?

The core Segment SDK is extremely lightweight! On iOS it weighs in at about 212kb. On Android it contains just under 1k methods, the JAR weighs in at 123kb and the dex size is 113kb.

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
