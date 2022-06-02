---
title: HeadsUp AI Destination
rewrite: true
id: 60900f0a60033befef038889
---
[HeadsUp AI](https://headsup.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows customers to build metrics on top of their existing Segment analytics to better understand customer behavior and gauge health scores.

This destination is maintained by HeadsUp. For any issues with the destination, [contact the HeadsUp AI Support team](mailto:administration@headsup.ai).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "HeadsUp AI" in the Destinations Catalog, and select the HeadsUp AI Destination.
3. Choose which Source should send data to the HeadsUp AI destination.
4. Go to the [HeadsUp Onboarding](https://app.headsup.ai/welcome) page, find and copy the "Segment API key".
5. Back in the Segment App, go back to the the HeadsUp AI Destination settings, and enter the "API Key".

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```
Segment sends Identify calls to HeadsUp as an `identify` event. The `email` field is required. Identify calls without an email fail with a `400` code.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```
Segment sends Track calls to HeadsUp as a `track` event. Use Track events to perform metric aggregations, such as how many times a user logged into your application in the past 30 days.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```
Segment sends Page calls to HeadsUp as a `pageview`.

## Group
If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "HeadsUp"
});
```
Segment sends Group calls to HeadsUp as a `group` event. Use Group events to aggregate user behavior across organizations.
