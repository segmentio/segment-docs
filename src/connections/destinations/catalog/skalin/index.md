---
title: Skalin Destination
id: 6256de4a1fe40d47ffb0b707
---


[Skalin](https://skalin.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} calculates your customer health score and alerts you as needed. This allows you to be more proactive, save time, and generate more revenue.

This destination is maintained by Skalin. For any issues with the destination, [contact the Skalin Support team](mailto:contact@skalin.io).


## Getting Started

{% include content/connection-modes.md %} 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **Skalin** in the Destinations Catalog, and select the **Skalin** destination.
3. Choose which Source should send data to the Skalin destination.
4. Go to the [Segment integration page in the Skalin platform](https://app.skalin.io/#/integration/segment){:target="_blank"}, and click **Connect** to create a configuration. Find and copy the **API Key** and and **Skalin Client ID** in the Segment connection section.
5. Enter the **API Key** and **ClientID** in the Skalin destination settings in Segment.

## Supported methods

Skalin supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to Skalin. For example:

```js
analytics.page('myFeature')
```

Segment sends Page calls to Skalin as a `feature`. 


### Screen

Send [Screen](/docs/connections/spec/screen) calls to Skalin. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Skalin as a `feature`. 


### Identify

Send [Identify](/docs/connections/spec/identify) calls to Skalin. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Optionally, you can provide your CustomerID:
```js
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  trait: {
      groupId: 'myCustomerID'
  }
});
```

Segment sends Identify calls to Skalin as an `identity`.


### Track

Send [Track](/docs/connections/spec/track) calls to Skalin. For example:

```js
analytics.track('myFeature')
```

Segment sends Track calls to Skalin as a `feature` event.
