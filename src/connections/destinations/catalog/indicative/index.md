---
title: Indicative Destination
rewrite: true
id: 54521fd725e721e32a72eec4
---
[Indicative](https://app.indicative.com/?utm_source=segment&utm_medium=partners&utm_campaign=setupguide#/login/register) is a behavioral analytics platform designed to help Marketing and Product teams optimize user engagement, conversion, and retention.

## Getting Started

{% include content/connection-modes.md %}

1. [Create an Indicative account](https://app.indicative.com/?utm_source=segment&utm_medium=partners&utm_campaign=setupguide#/login/register).

2. To integrate Segment as a data source go to **Settings > Integrations > [Segment](https://app.indicative.com/?utm_source=segment&utm_medium=partners&utm_campaign=setupguide#/onboarding/segment)**

3. Click **Enable with Segment** under One-click Setup.

4. Select which Segment Source you want to connect to Indicative.

5. To connect multiple sources to this project, simply repeat steps 2 - 4.

You're all set! Walkthrough the [Interactive Demo](https://app.indicative.com/?utm_source=segment&utm_medium=partners&utm_campaign=setupguide#/onboard/dashboard) to get ramped up quickly and easily!

For additional information, contact `support@indicative.com`.



## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does.

When you call [`identify`](/docs/connections/spec/identify/), we send the entire call as is to Indicative's server.

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

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does.

When you call [`track`](/docs/connections/spec/track/), we send the entire call as is to Indicative's server.

```javascript
analytics.track("Calculation Completed", {
  calculation: "Launch window",
  mission: "Mercury mission"
  year: 1961
});
```

## Page and Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) and [Screen method](/docs/connections/spec/page/) does.

Both [`page`](/docs/connections/spec/page/) and [`screen`](/docs/connections/spec/screen/) calls will be sent to Indicative as events.

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

Indicative's [documentation](https://support.indicative.com/hc/en-us/articles/360004147512-REST-API-Guide) states that the values in the properties must not exceed 255 characters. Segment will still accept the call, but any values that exceed 255 characters will be trimmed (meaning only the first 255 characters will be sent to Indicative).
