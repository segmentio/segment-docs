---
title: Vidora Destination
rewrite: true
id: 5ff67d3d4b6491271c0deae0
---
[Vidora](https://vidora.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides a Machine Learning Platform for Marketing, AdTech, and Product teams to quickly and easily transform raw consumer data into valuable business decisions. Examples include: [next-best-action](https://www.vidora.com/general/video-building-real-time-decisioning-in-cortex-for-next-best-offer-and-next-best-action), next-best-offer, [dynamic decisioning](https://www.vidora.com/ml-in-business/dynamic-decisioning-using-real-time-machine-learning), [predictions](https://segment.com/recipes/using-predictive-purchase-behavior-to-increase-campaign-roi/), and prescriptive modeling.

This destination is maintained by Vidora. For any issues with the destination, [contact the Vidora Support team](mailto:support@vidora.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Vidora" in the Destinations Catalog, and select the "Vidora" destination.
3. Choose which Source should send data to the "Vidora" destination.
4. Go to the [Vidora dashboard](https://app.vidora.com/#!/api/docs), find and copy the "API key".
5. Enter the "API Key" in the "Vidora" destination settings in Segment.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track("event_name", {
    property1: "example",
});
```

When sending any data to Vidora, a `timestamp` and either a `userId` or `anonymousId` are required.

Segment sends Track calls to Vidora as a `track` event with the `event_name` as the event type and will include any corresponding `properties`.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page({
    name: "page_name",
    properties: {
        property1: "example",
    },
});
```

When sending any data to Vidora, a `timestamp` and either a `userId` or `anonymousId` are required.

Segment sends Page calls to Vidora as a `pageview` event along with the `page name` and corresponding `properties`.

## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"screen_name"
                            properties:@{ @"property1": @"example" }];
```

When sending any data to Vidora, a `timestamp` and either a `userId` or `anonymousId` are required.

Segment sends Screen calls to Vidora as a `screenview` event along with the `screen name` and corresponding `properties`.


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify("userId123", {
    trait1: "example",
});
```

When sending any data to Vidora, a `timestamp` and either a `userId` or `anonymousId` are required.

Segment sends Identify calls to Vidora as an `identify` event along with any corresponding user `traits`.

## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group("groupId", {
    name: "Group Name",
    trait1: "example",
});
```

When sending any data to Vidora, a `timestamp` and either a `userId` or `anonymousId` are required.

Segment sends Group calls to Vidora as an `group` event along with any corresponding user `traits`.
