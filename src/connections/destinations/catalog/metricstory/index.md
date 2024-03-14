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
Send Page calls to ADD WHAT PAGE CALLS ARE USED FOR HERE. For example:

analytics.page()
Segment sends Page calls to MetricStory as a pageview.

Identify
Send Identify calls to ADD WHAT IDENTIFY CALLS ARE USED FOR HERE. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
Segment sends Identify calls to MetricStory as an identify event.

### Track
Send Track calls to ADD WHAT Track CALLS ARE USED FOR HERE. For example:

analytics.track('Login Button Clicked')
Segment sends Track calls to MetricStory as a track event.
