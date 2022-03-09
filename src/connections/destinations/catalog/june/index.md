---
title: June Destination
rewrite: true
id: 5f0c84d048d8688a7049c172
---
[June](https://june.so/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is instant product analytics. June automatically generates graphs of the metrics you should track - just connect your Segment account.

This destination is maintained by June. For any issues with the destination, [contact the June Support team](mailto:ferruccio@june.so).


## Getting Started

{% include content/connection-modes.md %}

1. Go to the [June settings page](https://app.june.so/redirect-to-my-workspace/settings), click **Add your first source**. To add more instances of the June Destination, click on the Segment integration card and **Add more sources**.
2. The Segment App opens in a new window. Log in to authenticate the connection from June.
3. Select the Workspace and Source to connect with June.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```
Segment sends Identify calls to June as an `identify` event.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```
Segment sends Track calls to June as a `track` event.

## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```
Group calls from Segment update `Companies` in June. Each `Company` is associated with a distinct `group_id`.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page('Home')
```

Segment sends Page calls to June as a `pageview` event. View `pageviews` in the [June Activity tab](https://app.june.so/redirect-to-my-workspace/pages).
