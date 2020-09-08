---
title: ClearBrain Destination
rewrite: true
---
[ClearBrain](https://clearbrain.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides self-serve predictive analytics for growth marketers, leveraging machine learning to automate audience insights and recommendations.

This destination is maintained by ClearBrain. For any issues with the destination, [contact their team](mailto:support@clearbrain.com).

_**NOTE:** ClearBrain is currently in beta, and this doc was last updated on January 23, 2019. This means that there may still be some bugs for us to iron out and we're excited to hear your thoughts. If you are interested in joining or have any feedback to help us improve the ClearBrain Destination and its documentation, [let us know](mailto:support@clearbrain.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "ClearBrain" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [ClearBrain dashboard](https://app.clearbrain.com/connections).

*Optional:* If you would like to sync your past events which were sent through Segment into your ClearBrain instance, you have the option of leveraging [Segment Replay](/docs/connections/data-export-options/#business-plan-customers).


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to ClearBrain as a `pageview`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to ClearBrain as a `screenview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to ClearBrain as an `identify` event. The `userId` will be used as the primary key to join your respective user attributes across subsequent user activity, which are in turn used to train and personalize your ClearBrain predictions.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to ClearBrain as a `track` event and can be used to configure conversion goals to inform their ClearBrain predictive analyses. Any Track call that has been instrumented for at least one week can be used as the basis for a predictive goal in ClearBrain.
