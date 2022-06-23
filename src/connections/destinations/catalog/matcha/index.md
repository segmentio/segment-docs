---
title: Matcha Destination
id: 6286930129cf5f85d889854f
---

[Matcha](https://www.matcha.co/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} provides scoring and insights based on product usage data for Product-Led Growth companies to better detect and use upsell opportunities.

This destination is maintained by Matcha. For any issues with the destination, [contact the Matcha Support team](mailto:support@matcha.co).

## Getting Started

{% include content/connection-modes.md %} 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **Matcha** in the Destinations Catalog, and select the **Matcha** destination.
3. Choose which Source should send data to the Matcha destination.
4. Ask your Account Manager for your **API key** or [contact the Matcha Support team](mailto:support@matcha.co).
5. Enter the **API Key** in the Matcha destination settings in Segment.

## Supported methods

Matcha supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to allow Matcha to use pageviews information in the scoring. For example:

```js
analytics.page()
```

Segment sends Page calls to Matcha as a `pageview`. 


### Screen

Send [Screen](/docs/connections/spec/screen) calls to Matcha to use mobile information in the scoring. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Matcha as a `screenview`. 


### Identify

Send [Identify](/docs/connections/spec/identify) calls to relay identification information that will be used for cross references in Matcha's scoring. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Matcha as an `identify` event.


### Track

Send [Track](/docs/connections/spec/track) calls to allow Matcha to better understand user interactions with your product and use it in the scoring. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Matcha as a `track` event.
