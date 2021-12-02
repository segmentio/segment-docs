---
title: DataBrain Destination
rewrite: true
redirect_from: '/connections/destinations/catalog/supervised-ai/'
---

[DataBrain](https://usedatabrain.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a tool for product-led companies that helps Sales and Customer Success teams close deals, adopt products, and retain customers through data and analytics. It ingests data from Segment and leverages machine learning techniques to send users automated alerts, and predict churn, conversion, and retention on any event you need to track.

This destination is maintained by DataBrain. For any issues with the destination, [contact the DataBrain Support team](mailto:support@supervisedai.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment App's Destinations catalog page, click **Add Destination**.
2. Search for "DataBrain" in the Destinations Catalog, and select the DataBrain destination.
3. Go to your [DataBrain dashboard](https://usedatabrain.com/integrations), and copy your "API Key".
4. Back in the Segment app, paste the API key into the settings for the DataBrain destination.

> info ""
> You should see data in DataBrain within 48 hours. DataBrain notifies you by email when your model is generated.

*Optional:* You can use Segment [Replays](/docs/guides/what-is-replay/) to sync your past events which were sent through Segment into your DataBrain instance.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to DataBrain as a `pageview`.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to DataBrain as an `identify` event.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to DataBrain as a `track` event.

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. Below are two example calls:

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
Segment sends Screen calls to DataBrain as a `screenview`.

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```js
{
  "type": "group",
  "groupId": "0e8c78ea9d97a7b8185e8632",
  "traits": {
    "name": "FooBar",
    "industry": "Insurance",
    "employees": 329,
    "plan": "enterprise",
    "total billed": 830
  }
}
```
Segment sends Group calls to DataBrain as a `group` event.
