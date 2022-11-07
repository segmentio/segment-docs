---
title: Bugsnag Destination
rewrite: true
id: 54521fd525e721e32a72ee9b
---
[Bugsnag](https://docs.bugsnag.com/api/data-access/) helps you detect and diagnose crashes in your application. Depending on the data you provide, Bugsnag can filter errors based on user name, user email, timeline, release stages, paying user status, and more.

At the moment, we support the following integrations:

Web | [Analytics.js SDK 2.1.0](https://github.com/segment-integrations/analytics.js-integration-bugsnag)
Android | [Android SDK 2.0.0](https://github.com/segment-integrations/analytics-android-integration-bugsnag)
iOS | [iOS SDK 1.0.3](https://github.com/segment-integrations/analytics-ios-integration-bugsnag)


## Getting Started

{% include content/connection-modes.md %}

### Web

1. From the Segment web app, click **Catalog**.
2. Search for "Bugsnag" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Add your API key to your connection settings. You can find your API key in your Bugsnag dashboard under "Settings", which is located in the upper left-hand corner
4. Segment automatically initializes Bugsnag's JavaScript script with your API key upon loading analytics.js

### Mobile

If you'd like to integrate with Bugsnag's iOS and/or Android SDKs, in addition to completing steps 1-3 in the previous section, you will also need to complete the install steps outlined below:

1. [Android](https://github.com/segment-integrations/analytics-android-integration-bugsnag)

2. [iOS](https://github.com/segment-integrations/analytics-ios-integration-bugsnag)


### React Native

{% include content/react-dest.md %}

- - -

## Identify

Once you've correctly set up your Bugsnag integration, you should [`identify`](/docs/connections/spec/identify/) each of your users as soon as you know their identity (this typically happens after log in or sign up), so that Bugsnag can provide you with more visibility into which user is encountering which error.

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('ze8rt1u89', {
  name: 'Zaphod Kim',
  gender: 'Male',
  email: 'jane.kim@example.com',
});
```

Bugsnag will show you the `userId` and `traits` in the Users tab of each error.

## Error Reporting

In addition to sending Bugsnag user-specific information, you can send handled exceptions and diagnostic data to your Bugsnag dashboard using Bugsnag's native methods. Documentation on these methods is available [on their website](https://docs.bugsnag.com/platforms/browsers/#reporting-handled-exceptions).
