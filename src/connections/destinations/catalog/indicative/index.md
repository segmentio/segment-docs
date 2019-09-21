---
title: Indicative
---

[Indicative]( https://app.indicative.com/#/login/register?utm_source=partners&utm_medium=segment&utm_campaign=integration) is a behavioral analytics platform designed to help Marketing and Product teams optimize user engagement, conversion, and retention.

This document was last updated on 18th October, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. [Create an Indicative account](https://app.indicative.com/#/login/register?utm_source=partners&utm_medium=segment&utm_campaign=integration).

2. To integrate Segment as a data source go to **Settings > Integrations > [Segment](https://app.indicative.com/#/onboarding/segment?utm_source=partners&utm_medium=segment&utm_campaign=integration)**

3. Click **Enable with Segment** under One-click Setup.

4. Select which Segment Source you want to connect to Indicative.

5. To connect multiple sources to this project, simply repeat steps 2 - 4.

You’re all set! Walkthrough the [Interactive Demo](https://app.indicative.com/#/onboard/tutorial?utm_source=partners&utm_medium=segment&utm_campaign=integration) to get ramped up quickly and easily!

For additional information, contact `support@indicative.com`.



## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does.

When you call [`identify`](/docs/spec/identify/), we send the entire call as is to Indicative's server.

```javascript
analytics.identify('ze8rt1u89', {
  name: 'Katherine Johnson',
  gender: 'Female',
  email: 'katherine@example.com',
  pioneer: true,
  building: 'Katherine G. Johnson Computational Research Facility'
  address: {
    city: 'Hampton',
    state: 'VA',
    postalCode: '23681'
  }
});
```

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does.

When you call [`track`](/docs/spec/track/), we send the entire call as is to Indicative's server.

```javascript
analytics.track("Calculation Completed", {
  calculation: "Launch window",
  mission: "Mercury mission"
  year: 1961
});
```

## Page and Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) and [Screen method](https://segment.com/docs/spec/page/) does.

Both [`page`](/docs/spec/page/) and [`screen`](/docs/spec/screen/) calls will be sent to Indicative as events.

```js
analytics.page({
  userId: "some_user_id", // on A.js client-side, you can leave out the `userId`
  category: "Merchant",
  name: "Settings",
})

// Note: `screen` calls are not possible from the A.js client-side.
analytics.screen({
  userId: "some_user_id",
  category: "Merchant",
  name: "Settings",
})
```

- - -

## Troubleshooting

### Property values have maximum length of 255 characters

Indicative's [documentation](https://support.indicative.com/hc/en-us/articles/360004149152-REST-API-Track-Events?utm_source=partners&utm_medium=segment&utm_campaign=integration) states that the values in the properties must not exceed 255 characters. Segment will still accept the call, but any values that exceed 255 characters will be trimmed (meaning only the first 255 characters will be sent to Indicative).
