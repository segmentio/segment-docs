---
rewrite: true
---
[Kubric](https://kubric.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows you to create personalised creatives for your users and deliver them using emails, push-notifications, Facebook & various other channels.

This destination is maintained by Kubric. For any issues with the destination, please [reach out to their team](mailto:tom@kubric.io).

_**NOTE:** The Kubric Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on Feburary 28, 2019. If you are interested in joining their beta program or have any feedback to help improve the Kubric Destination and its documentation, please [let  their team know](mailto:tom@kubric.io)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Kubric" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Kubric dashboard](https://app.kubric.io/profile).


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Kubric as a `page`. 


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to Kubric as a `screen`. 


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to Kubric as an `identify` event.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Kubric as a `track` event.

