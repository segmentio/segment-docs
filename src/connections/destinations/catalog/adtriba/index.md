---
rewrite: true
title: Adtriba Destination
id: 5c7550de16b530000157a2d5
---
[Adtriba](https://www.adtriba.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows advertisers to track, control and optimize their marketing activities across all digital marketing channels through AI and user journey analysis.

This destination is maintained by Adtriba. For any issues with the destination, [contact the Adtriba Support team](mailto:support@adtriba.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Adtriba" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "Project Tracker ID / API Key" into your Segment Settings UI which you can find on the Adtriba dashboard.
4. Validate the forwarded events by checking the Tracking Report under the "Tracking" tab.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Adtriba as a `pageview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to Adtriba as an `identify` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Conversion', {
  id: 'daaa61a2-7682-4ece-9adc-6b07d8020b94',
  revenue: 19.99,
  currency: 'USD'
})
```

Track calls will be sent to Adtriba as a `track` event.

Trigger additional events by using [Semantic Events](/docs/connections/spec/semantic/) in order to enrich the Adtriba machine learning process.
