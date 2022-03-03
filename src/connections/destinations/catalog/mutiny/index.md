---
rewrite: true
title: Mutiny Destination
id: 5c6edab8037dcf00014f8f9b
---
[Mutiny](https://mutinyhq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows you to personalize your website content based on customer's activity and 3rd party data. By integrating with [Segment](https://segment.com), you can easily and accurately track conversions and integrate 1st party data for personalization with Mutiny.

This destination is maintained by Mutiny. For any issues with the destination, [contact the Mutiny Support team](mailto:mutinylovesyou@mutinyhq.com).

## Getting Started

{% include content/connection-modes.md %}

To set up Mutiny to receive Segment data:
1. From your Segment Project's Destinations page click on "Add Destination".
2. Search for "Mutiny" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your personal "API Key" into Segment's Mutiny integration settings panel UI, which you can find from your [Mutiny dashboard](https://app.mutinyhq.com/integrations/segment).

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Mutiny as an `impression`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to Mutiny as an `identify` event. We use this in order to associate traits with an individual, which can be targeted for personalization in outbound email campaigns.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Mutiny as a `track` event. Within the Mutiny dashboard, you can select which events signal a conversion for your website visitors. When a `track` event is processed for these events, a visitor will be marked as converted and that information will be displayed in the experiment results for a given experience.
