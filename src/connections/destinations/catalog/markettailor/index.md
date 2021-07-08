---
title: Markettailor Destination
rewrite: true
---

[Markettailor](https://www.markettailor.io/), helps B2B marketers create personalized websites without code, leveraging company data, audience insights, and recommendations.

This destination is maintained by Markettailor. For any issues with the destination, contact the Markettailor Support team.

## Getting Started
{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click Add Destination.
2. Search for “Markettailor” in the Destinations Catalog search field, and select the “Markettailor” destination.
3. Choose which Source should send data to the Markettailor destination.
4. Go to the Markettailor integrations, find the Segment integration, click Authorize, and copy the API key.
5. Enter the API Key in the Markettailor destination settings in Segment.


## Page

If you aren’t familiar with the Segment Spec, take a look at the Page method documentation to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Markettailor as a page view. These events can be used for specific conversion events such as “Thank you page” viewed.

## Identify
If you aren’t familiar with the Segment Spec, take a look at the Identify method documentation to learn what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
  });
```

Segment sends Identify calls to Markettailor as an identify event.

## Track
If you aren’t familiar with the Segment Spec, take a look at the Track method documentation to learn what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Markettailor as a track event. These events are used to track conversions and measure performance of personalized websites against generic version.
