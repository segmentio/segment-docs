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

**Note**: Only Email Surveys and Link Surveys are supported through Segment's Userleap integration. To utilize In-Product Surveys, you must install UserLeap's SDK.

## Identify
If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  firstName: 'Laura',
  lastName: 'Gibbon'
})
```
Identify your users in UserLeap using Segment's Identify method. Segment `traits` map to UserLeap `attributes`.

**Important:** You can only create new users with Identify calls.

## Track
If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:
```js
analytics.track('Clicked Button');
```
Use Track calls to track events and use them as filtering criteria for your Surveys.

**Important:** Add Triggered Events mapped to your Segment Track event names in your UserLeap [Events dashboard](https://app.userleap.com/events) before sending them through Segment.

## Page
If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like:
```js
analytics.page()
```
Segment sends Page calls to UserLeap as a `pageview` which you can use as filtering criteria for your surveys.

**Important:** Add Page URLs mapped to your Segment Page call's `properties.url` field in your UserLeap [Events dashboard](https://app.userleap.com/events) before sending them through Segment.


## Alias
If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](https://segment.com/docs/connections/spec/alias/) to learn about what it does. An example call would look like:
```js
analytics.alias('newUserId');
```
