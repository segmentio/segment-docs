---
rewrite: true
title: Watchtower Destination
---

[Watchtower](https://www.watchtower.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a platform to discover, classify, and protect sensitive data, like customer PII, across cloud services & data infrastructure. This enables you to identify sensitive data that you're ingesting and sending to various business-critical systems -- so you can manage the customer data you're disseminating across services.

This destination is maintained by Watchtower. For any issues with the destination, please [reach out to their team](mailto:support@watchtower.ai).

_**NOTE:** The Watchtower Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on February 27, 2019. If you are interested in joining their beta program or have any feedback to help improve the Watchtower Destination and its documentation, please [let  their team know](mailto:support@watchtower.ai)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Watchtower" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find on the Settings page of your Watchtower dashboard.

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Watchtower as a `pageview`.


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to Watchtower as a `screenview`.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to Watchtower as an `identify` event.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Watchtower as a `track` event.
