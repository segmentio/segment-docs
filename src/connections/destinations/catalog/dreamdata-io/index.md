---
title: Dreamdata IO Destination
rewrite: true
---
[Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) uses your Segment data to deliver multitouch, per account attribution. This enables B2B companies to understand the impact on revenue of every touch in their customer journey.

This destination is maintained by [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners). For any issues with the destination, please [reach out to their team](mailto:friends@dreamdata.io).

_**NOTE:** [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is currently in beta, which means that there may still be some bugs for us to iron out. This doc was last updated on February 21, 2019, and we would love to hear your feedback. If you are interested in joining our beta program or have any feedback to help us improve the [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) Destination and its documentation, please [let us know](mailto:friends@dreamdata.io)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Dreamdata IO" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Dreamdata IO settings](https://app.dreamdata.io/settings).
4. You will be able to verify that data is flowing into Dreamdata IO from your [Dreamdata IO settings](https://app.dreamdata.io/settings).


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) as a `pageview`.


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) as a `screenview`.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) as an `identify` event.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) as a `track` event.


## Group

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like:

```
analytics.group("userId123", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise"
});
```

Group calls will be sent to [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) as a `group` event where it is used to join users to accounts.

By default, [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) uses user emails and your CRM data to map user activites to accounts and attribute the value correctly. Adding Group calls via Segment will give a more precise attribution and ensure that all activities are attributed to the right account.
