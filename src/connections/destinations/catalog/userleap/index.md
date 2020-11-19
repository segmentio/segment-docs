---
title: UserLeap
rewrite: true
---

[UserLeap](https://userleap.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a microsurvey platform that continuously identifies opportunities to build better experiences. Gain clarity into customer needs and grow faster.

This destination is maintained by UserLeap. For any issues with the destination, contact [the UserLeap support team](mailto:support@userleap.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "UserLeap" in the Destinations Catalog, and select the UserLeap destination.
3. Choose which Source should send data to the UserLeap destination.
4. Go to the [UserLeap dashboard](https://app.userleap.com/settings/installation), find and copy the **API key**.
5. Enter the UserLeap API Key that you copied in the UserLeap destination settings in Segment.

**Note**: UserLeap's Segment integration does not support In-Product Surveys

## Identify
If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  firstName: 'Laura',
  lastName: 'Gibbon'
})
```

Use Segment's Identify method to identify your users in UserLeap. Segment `traits` map to UserLeap `attributes`.

**Important:** Only Identify calls can create new users in UserLeap.

## Track
If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Button Clicked');
```

Use Track calls to track events and use them as filtering criteria for your Surveys.

Create Triggered Events in your UserLeap [Events dashboard](https://app.userleap.com/events) and map them to your Segment Track event names before you start sending Segment data to UserLeap.

## Page
If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to UserLeap as a `pageview` which you can use as filtering criteria for your surveys.

Add Page URLs  in your UserLeap [Events dashboard](https://app.userleap.com/events) and map them to your Segment Page call's `properties.url` field before you start sending Segment data to UserLeap.

## Alias
If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](https://segment.com/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias('newUserId');
```
