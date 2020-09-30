---
title: Worthy Destination
rewrite: true
---​

[Worthy.ai](https://worthy.ai) helps advertisers improve their marketing efficiency through using predictive analytics and signal testing.

[Worthy.ai](https://worthy.ai) maintains this documentation. For any issues with the destination, [contact Worthy support](mailto:engineering@worthy.ai).

## Getting started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in your Segment Workspace, click **Add Destination**.
2. Search for "Worthy" in the Destinations Catalog, and select the **Worthy** destination.
3. Choose which Source should send data to the "Worthy" destination.
4. [Contact Worthy support](mailto:engineering@worthy.ai) to get an API key.
5. Enter the "API Key" in the "Worthy" destination settings in your Segment Workspace.

## Methods

Worthy supports all Segment methods: `Page`, `Screen`, `Identify`, `Track`, `Alias`, and `Group`.

### Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page();
```

Segment sends Page calls to Worthy as a `pageview`.

### Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Worthy as a `screenview`.

### Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
});
```

Segment sends Identify calls to Worthy as an `identify` event.

### Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track("Login Button Clicked");
```

Segment sends Track calls to Worthy as a `track` event.

### Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group("0e8c78ea9d97a7b8185e8632");
```

Segment sends Group calls to Worthy as a `group` event.

### Alias

If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias("507f191e81");
```

Segment sends Alias calls to Worthy as a `alias` event.

## Next Steps

When you complete the integration, [contact Worthy support](mailto:engineering@worthy.ai) to validate the integration.
