---
rewrite: true
---

[Bugsnag](https://docs.bugsnag.com/api/data-access/) helps you detect and diagnose crashes in your application. Depending on the data you provide, Bugsnag can filter errors based on user name, user email, timeline, release stages, paying user status, and more.

At the moment, we support the following integrations: 

Web | [Analytics.js SDK 2.1.0](https://github.com/segment-integrations/analytics.js-integration-bugsnag)
Android | [Android SDK 2.0.0](https://github.com/segment-integrations/analytics-android-integration-bugsnag)
iOS | [iOS SDK 1.0.3](https://github.com/segment-integrations/analytics-ios-integration-bugsnag)

This document was last updated on July 11th, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!


## Getting Started

{{>connection-modes}}

### Web

1. From your Segment UI’s Destinations page click on “Add Destination”.
2. Search for “Bugsnag” within the Destinations Catalog and confirm the project you’d like to connect to
3. Add your API key to your connection settings. You can find your API key in your Bugsnag dashboard under "Settings", which is located in the upper left-hand corner
4. We’ll automatically initialize Bugsnag's javascript script with your API key upon loading analytics.js

### Mobile

If you'd like to integrate with Bugsnag's iOS and/or Android SDKs, in addition to completing steps 1-3 in the previous section, you will also need to complete the install steps outlined below:

1. [Android](https://github.com/segment-integrations/analytics-android-integration-bugsnag)

2. [iOS](https://github.com/segment-integrations/analytics-ios-integration-bugsnag)

- - -

## Identify

Once you've correctly set up your Bugsnag integration, you should [`identify`](/docs/spec/identify/) each of your users as soon as you know their identity (this typically happens after log in or sign up), so that Bugsnag can provide you with more visibility into which user is encountering which error.

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('ze8rt1u89', {
  name: 'Zaphod Beeblebrox',
  gender: 'Male',
  email: 'Zaphod@hotmail.com',
});
```

Bugsnag will show you the `userId` and `traits` in the Users tab of each error.

## Error Reporting

In addition to sending Bugsnag user-specific information, you can send handled exceptions and diagnostic data to your Bugsnag dashboard using Bugsnag's native methods. Documentation on these methods is available [on their website](https://docs.bugsnag.com/platforms/browsers/#reporting-handled-exceptions).
