---
title: MetricStory Destination
id: 65e8b496eec9c40dbccbf749
beta: true
---

[MetricStory](https://www.metricstory.ai){:target="_blank”} lets you run AI on your product analytics. Create and generate charts and analyze data in minutes.

This destination is maintained by MetricStoryAI. For any issues with the destination, contact the [MetricStory support team](support@metricstory.a).

## Getting started
1. From the Destination catalog page in the Segment app, search for MetricStory
2. Select and click Add Destination
3. Select an existing Source to connect to.
4.  Go to the [API Keys](https://www.metricstory.ai/account/apikeys){:target="_blank"} page in MetricStory.ai.
5. Copy your API key
6. Enter the API key in the destination settings in Segment

## Supported methods
MetricStory supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page
The Page method triggers a call to our `page` method which lets users query drop off in the funnel.

```js
analytics.page()
```

### Identify
The Identify call identifies users for tracking purposes within MetricStory. MetricStory uses this data to group users together in cohorts, track individual user data and more.

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

### Track
MetricStory uses this data to understand how users are interacting with apps and lets users query data with AI through the events.

```js
analytics.track('Login Button Clicked')
```