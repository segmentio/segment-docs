---
title: Drip Destination
id: 54521fd525e721e32a72eeaa
cmode-override: true
---
The Drip destination code is all open-source on GitHub if you want to check it out: [JavaScript](https://github.com/segment-integrations/analytics.js-integration-drip),(iOS and Android work using the server destination).

## Getting Started

When you enable Drip in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Drip's `track.js` onto your page. This means you should remove Drip's snippet from your page.
+ Since Drip only records custom events and custom user data, no events or users will appear in Drip until you start using the API outlined below.

## Identify

When you call [`identify`](/docs/connections/spec/identify/) on analytics.js, Segment calls [`identify`](/docs/connections/spec/identify/) on Drip and passes through all of the user traits that were included on that call. You must pass email as a trait to identify the user to Drip. Note that if you want to do cross-domain tracking, after you've enabled it in the Drip UI, you'll need to pass `email` as a trait on the identify call on both domains.

## Track

When you call [`track`](/docs/connections/spec/track/), Segment sends the event to Drip with the event `name` and all `properties` that you specified. If you include `revenue` as a property, it will get passed to Drip as the conversion value of this event.

**Note:**
- If you are sending custom server side events, you must include an `email` property of the user that the event belongs to.

- Only conversions that are attributed to a Drip email delivery will show on the conversions dashboard page.

## Sending data from Drip

Drip supports sending [email events](/docs/connections/spec/email/) to other tools on the Segment platform. These events will be sent as `track` calls to the other destinations you've turned on.
