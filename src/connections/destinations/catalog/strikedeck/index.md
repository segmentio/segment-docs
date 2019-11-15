---
rewrite: true
title: Strikedeck Destination
---
[Strikedeck](https://strikedeck.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a Customer Success platform which actively manages customer relationships to reduce churn, increase existing revenue and influence new sales. Strikedeck includes  Customer Engagement Analytics, Health Scorecard, Notifications, Recommendations & Actions.

This destination is maintained by Strikedeck. For any issues with the destination, please [reach out to their team](mailto:support@strikedeck.com).

_**NOTE:** The Strikedeck Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 23, 2019. If you are interested in joining their beta program or have any feedback to help improve the Strikedeck Destination and its documentation, please [let  their team know](mailto:support@strikedeck.com)!_


## Getting Started

{{>connection-modes}}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Strikedeck" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your Strikedeck settings page. Go to Settings -> Connector and click on "Segment". Copy the API Key from this page.

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Strikedeck as a `pageview`.


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to Strikedeck as a `screenview`.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to Strikedeck as an `identify` event.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Strikedeck as a `track` event.
