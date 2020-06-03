---
title: Supervised AI Destination
rewrite: true
---

[Supervised AI](https://supervisedai.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides proactive customer health monitoring for customer facing teams, leveraging machine learning to automate churn prediction and generating playbook recommendations.

This destination is maintained by Supervised AI. For any issues with the destination, please [contact the Supervised AI Support team](mailto:support@supervisedai.com).

## Getting Started

{% include content/connection-modes.md %}


1. From the Segment App's Destinations catalog page, click **Add Destination**.
2. Search for "Supervised AI" in the Destinations Catalog, and select the Supervised AI destination.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Supervised AI dashboard](https://supervisedai.com/integrations).
4. Expect to see data in under 48 hours. We will notify you via email when your model is generated.

*Optional:* If you would like to sync your past events which were sent through Segment into your Supervised AI instance, you have the option of leveraging Segment's [Replay](https://segment.com/docs/guides/what-is-replay/) feature.

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```js
analytics.page()
```

Page calls will be sent to Supervised AI as a `pageview`.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to Supervised AI as an `identify` event.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```js
analytics.track('Clicked Login Button')
```

Track calls will be sent to Supervised AI as a `track` event.

## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. Below are two example calls:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

```js
{
  "type": "screen",
  "name": "Home",
  "properties": {
    "Feed Type": "private"
  }
}
```
Screen calls are sent to Supervised AI as a `screenview`.
