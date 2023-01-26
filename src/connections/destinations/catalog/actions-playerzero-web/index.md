---
title: PlayerZero Web (Actions)
---
{% include content/plan-grid.md name="actions" %}

[PlayerZero](https://www.playerzero.app/){:target="_blank"} is an application monitoring platform 
that measures the impact of engineering issues on important product outcomes (eg. successful onboardings, checkouts, conversions).

The Segment integration for PlayerZero automatically instruments your web application to send engineering and product analytics events to PlayerZero.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Select PlayerZero Web (Actions), then click **Configure PlayerZero Web**.
4. Select an existing Source to connect to PlayerZero Web.
5. **Enable** the destination and click **Save Changes**.
6. PlayerZero will collect any Segment data as soon as they arrive. You can set up a **View** in the PlayerZero dashboard to enable notifications and be alerted when the first high impact issue is surfaced.

## Identify
If you’re not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:
```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to PlayerZero as an `identify` event, which will be associated with downstream issues and events to calculate conversion impact and debug user journeys. 

## Track
If you’re not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:
```
analytics.track('Completed onboarding')
```
Track calls will be sent to PlayerZero as a `track` event, which will be used to define & monitor the key outcomes of your product.