---
title: Spideo Destination
id: 6279326f707f2f9bc4882b84
---

[Spideo](https://spideo.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the leading company in video and cultural content recommendation.

This destination is maintained by Spideo. For any issues with the destination, [contact the Spideo Support team](mailto:support@spideo.tv).

## Getting Started

{% include content/connection-modes.md %} 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Spideo" in the Destinations Catalog, and select the "Spideo" destination.
3. Choose which Source should send data to the "Spideo" destination.
4. Use the same API key that you are using for your existing Spideo integration, as provided by the Spideo team.
5. Enter the "API Key" in the "Spideo" destination settings in Segment.


## Supported methods

Spideo supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Track

Send [Track](/docs/connections/spec/track) calls to track user interactions, such as content watched or clicked, on your platform. For example:

```js
analytics.track('Video Content Watched',{
    asset_id: 'xyz'
});
```

`Track` events sent from Segment to Spideo will surface as different Spideo interaction types (for example 'play', 'click', 'buy'), depending on the event contents. These events will be used to personalize future user recommendations, and will feed Spideo's analytics Explore platform.
