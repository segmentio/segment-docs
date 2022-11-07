---
title: SIGNL4 Alerting
rewrite: true
id: 5fbfbfc64832c185a5fd3faf
---
[SIGNL4](https://www.signl4.com) is a lightweight, app-based alerting service of operational teams supporting app push, SMS text and voice call including tracking, escalation, collaboration and duty planning.

When incidents happen, SIGNL4 can alert your teams, engineers, sales, marketing or workers ‘in the field'. SIGNL4 helps to know what is going on – from anywhere and anytime.

This destination is maintained by Derdack SIGNL4. For any issues with the destination, [contact their support team](mailto:success@signl4.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %} 

1. From the Destinations catalog page in your Segment Workspace, click Add Destination.
2. Search for “SIGNL4” in the Destinations Catalog, and select the SIGNL4 Alerting destination.
3. Choose which Source should send data to the “SIGNL4 Alerting” destination.
4. Enter the “API Key” in the “SIGNL4 Alerting” destination settings in your Segment Workspace, this is your SIGNL4 team secret and the first part of your SIGNL4 email address.

Ife you do not have SIGNL4 installed already, you can download the SIGNL4 App from the [Google Play Store](https://play.google.com/store/apps/details?id=com.derdack.signl4) or from the [Apple App Store](https://itunes.apple.com/us/app/signl4/id1100283480). Alternatively, you can get started on the [SIGNL4 web site](https://www.signl4.com/free-trial-test/). Once registered you will get an email with your SIGNL4 API information which includes your SIGNL4 team secret. This is the first part of your SIGNL4 email address (your-team-secret@mail.signl4.com).

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to SIGNL4 Alerting as a `pageview`, which can also be seen under Signls. 


## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to SIGNL4 Alerting as a `screenview`, which can also be seen under Signls. 


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to SIGNL4 Alerting as an `identify` event, which can also be seen under Signls.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to SIGNL4 Alerting as a `track` event, which can also be seen under Signls.

## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group('0e8c78ea9d97a7b8185e8632', {
  name: 'Initech',
  industry: 'Technology',
  employees: 329,
  plan: 'enterprise',
  "total billed": 830
});
```

Segment sends Group calls to SIGNL4 Alerting as a `group` event, which can also be seen under Signls.

## Alias

If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias("507f191e81");
```

Segment sends Alias calls to SIGNL4 Alerting as an `alias` event, which can also be seen under Signls.
