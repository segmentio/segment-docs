---
rewrite: true
title: 'GraphJSON Destination'
beta: true
id: 61e8726c123c1a81273d00e4
---
[GraphJSON](https://www.graphjson.com/guides/segment){:target="_blank"} provides self-serve analytics to better help you understand your business.

This destination is maintained by GraphJSON. For any issues with the destination, [contact the GraphJSON Support team](mailto:hi@graphjson.com).


## Getting Started

1. From the Destinations catalog page in the Segment App, click Add Destination.
2. Search for “GraphJSON” in the Destinations Catalog, and select the “GraphJSON” destination.
3. Choose which Source should send data to the “GraphJSON” destination.
4. Go to the `https://graphjson.com/dashboard/integrations/segment`, find and copy the “API key”.
5. Enter the “API Key” in the “GraphJSON” destination settings in Segment.
6. Go to `https://graphjson.com/dashboard/integrations/segment` and finish the setup on the GraphJSON side.

## Supported methods

GraphJSON supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to GraphJSON. For example:

```js
analytics.page()
```

Segment sends Page calls to GraphJSON as a `pageview`.


### Screen

Send [Screen](/docs/connections/spec/screen) calls to GraphJSON. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to GraphJSON as a `screenview`.


### Identify

Send [Identify](/docs/connections/spec/identify) calls to GraphJSON. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to GraphJSON as an `identify` event.


### Track

Send [Track](/docs/connections/spec/track) calls to GraphJSON. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to GraphJSON as a `track` event.
