---
title: Candu Destination
rewrite: true
---

[Candu](https://www.candu.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a learning platform within your app. Candu empowers you to upskill and retain your customers with in-product courses and just-in-time training.

This destination is maintained by Candu Labs. For any issues with the destination, please [reach out to their team](mailto:support@candu.ai).

_**NOTE:** The Candu Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on March 4th, 2019. If you are interested in joining their beta program or have any feedback to help improve the YOURINTEGRATION Destination and its documentation, please [let  their team know](mailto:support@candu.ai)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Candu" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Candu Settings page](https://app.candu.ai/settings/workplace).

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does.

An example call would look like:

```
analytics.page()
```

Page calls will be sent to Candu as a `page` event. You will be able to use `page` events to ensure content is displayed in the right context.


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/page/) does.

An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to Candu as a `screen` event.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does.

An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to Candu as an `identify` event. The Identify call is used to record the identity of a user, which enables us to send her the most relevant content and update her information.

Additionally, Identify calls will adapt how the customer is using the learning materials.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does.

An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Candu as a `track` event. You will be able to measure how well your content is performing by measuring uplift with any `track` events.
