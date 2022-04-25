---
title: Retina AI Destination
rewrite: true
id: 5f287bfa332cce0b1ed18331
---
# Retina AI Segment Destination

[Retina AI](https://retina.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a customer intelligence partner that provides accurate **customer-level lifetime value** metrics at or before their first transaction. You can use this to improve targeting, ad relevance, conversion rates, and customer loyalty.

Retina AI maintains this destination. For any issues with the destination, contact the [Retina AI Support Team](mailto:info@retina.ai).

> note"
> The Retina AI Destination is in beta, which means that they are still actively developing the destination. To join the beta program, or if you have any feedback to help improve the Retina AI Destination and its documentation, contact the [Retina AI Support Team](mailto:info@retina.ai).


## Getting Started

{% include content/connection-modes.md %}

To integrate Retina AI with Segment as a **Destination**:
1. From your Segment UI's Destinations page click on “Add Destination”.
2. Search for “Retina” in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Add the “API Key” that Retina AI provides through a secure data transfer to your Segment workspace.
4. You will receive an email confirming data connectivity once the setup is complete.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Retina AI as a `pageview`.


## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Retina AI as a `screenview`.


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Retina AI as an `identify` event.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Retina AI as a `track` event.

## Group
If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

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
If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias("507f191e81");
```

---
