---
rewrite: true
title: Qualaroo Destination
---

[Qualaroo](https://qualaroo.com/home) is a user testing tool that lets you add a survey to any page on your site, so you can get targeted user feedback as the user is performing a task. The `analytics.js` Qualaroo Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-qualaroo).

This document was last updated on September 5, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Qualaroo" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in your `Customer ID` from your Qualaroo Javascript library URL. So if your URL is: `s3.amazonaws.com/ki.js/70009/gAJ.js`, your `Customer ID` would be: `70009`.
4. Drop in your `Site Token` from your Qualaroo Javascript library URL. So if your URL is: `s3.amazonaws.com/ki.js/70009/gAJ.js`, your `Site Token` would be: `gAJ`.
5. We'll initialize Qualaroo with your `Customer ID` and your `Site Token` upon loading `analytics.js`. Qualaroo will automatically start displaying your targeted surveys, according to the configurations you established on Qualaroo.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('8888', {
  name: 'Phil Connors',
  gender: 'Male',
  email: 'weatherman_phil@aol.com',
  phone: '(814) 618-5466',
  address: {
    city: 'Punxsutawney',
    state: 'PA',
    postalCode: '15767'
  }
});
```

When you call `identify` we call `_kiq.push(['identify', userId]);` with the `userId` you provide. We also call `_kiq.push(['set', traits]);` with the `traits` you provide.


## Track

**Note:** The use of [a custom property to trigger a survey](https://help.qualaroo.com/hc/en-us/articles/201441516) made available by utilizing a Segment Track call is currently not supported due to some code changes. The below section will *not* trigger a survey at this time.

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```javascript
analytics.track("Shadow Seen", {
  remainingWeeksOfWinter: 6,
  earlySpring: false,
});
```

Qualaroo doesn't technically have a `track` method yet, but if you enabled the `Record Events to Qualaroo` option in your settings then when you call `track` we will call `_kiq.push(['set', ...]);` with a single trait `'Triggered: ' + event` set to `true` based on the `event` parameter you provide.

_**NOTE:** Qualaroo will only receive traits from Tracks calls and Identify calls that were triggered before the user has answered the Qualaroo survey._

## Sending Data from Qualaroo

Qualaroo makes it easy for you to get the data you collect from surveys back into Segment and off to all your other Segment destinations. Check out their awesome article about [Sending Qualaroo data into Segment](http://help.qualaroo.com/hc/en-us/articles/205436425) to get setup.
