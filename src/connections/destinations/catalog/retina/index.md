---
title: Retina AI Destination
rewrite: true
---

# Retina AI Segment Destination



[Retina AI](https://retina.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a customer intelligence partner that provides accurate **customer-level lifetime value** metrics at or before their first transaction. This can easily be leveraged to improve targeting, ad relevance, conversion rates, and customer loyalty.

This destination is maintained by Retina AI. For any issues with the destination, [contact their support team](mailto:info@retina.ai).

> The Retina AI Destination is currently in beta, which means that they are still actively developing the destination. To join their beta program, or if you have any feedback to help improve the Retina AI Destination and its documentation, [contact the Retina support team](mailto:info@retina.ai )!


## Getting Started

{% include content/connection-modes.md %}

To integrate Retina AI with Segment as a **Destination**:
1. From your Segment UI’s Destinations page click on “Add Destination”.
2. Search for “Retina” within the Destinations Catalog and confirm the source you’d like to connect to.
3. Drop in the “API Key” into your Segment Settings UI that Retina AI provides via secure data transfer.
4. You will receive an email confirming data connectivity once the setup is complete.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Retina AI as a `pageview`.


## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](https://segment.com/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Retina AI as a `screenview`.


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Retina AI as an `identify` event.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Retina AI as a `track` event.

## Group
If you aren’t familiar with the Segment Spec, take a look at the [Group method documentation](https://segment.com/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group("e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  total billed: 830
});
```

## Alias
If you aren’t familiar with the Segment Spec, take a look at the [Alias method documentation](https://segment.com/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias("507f191e81");
```

---
