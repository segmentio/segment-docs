---
rewrite: true
---

[Mutiny](https://mutinyhq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows you to personalize your website content based on customer's activity and 3rd party data. By integrating with [Segment](https://segment.com), you can easily and accurately track conversions and integrate 1st party data for personalization with Mutiny.


This destination is maintained by [Mutiny](https://mutinyhq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners). For any issues with the destination, please [reach out to their team](mailto:mutinylovesyou@mutinyhq.com).

_**NOTE:** Mutiny is currently in beta, which means that they are still actively developing the product. This doc was last updated February 21, 2019. If you are interested in joining their beta program or have any feedback to help improve the Mutiny Destination and its documentation, please [let the Mutiny team know](mailto:mutinylovesyou@mutinyhq.com)!_


## Getting Started

{% include content/connection-modes.md %}

To setup Mutiny to receive Segment data:
1. From your Segment Project's Destinations page click on "Add Destination".
2. Search for "Mutiny" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in your personal "API Key" into Segment's Mutiny integration settings panel UI, which you can find from your [Mutiny dashboard](https://app.mutinyhq.com/integrations/segment).

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Mutiny as an `impression`.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to Mutiny as an `identify` event. We use this in order to associate traits with an individual, which can be targeted for personalization in outbound email campaigns.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Mutiny as a `track` event. Within the Mutiny dashboard, you can select which events signal a conversion for your website visitors. When a `track` event is processed for these events, a visitor will be marked as converted and that information will be displayed in the experiment results for a given experience.
