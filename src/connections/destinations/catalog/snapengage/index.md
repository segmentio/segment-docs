---
rewrite: true
title: SnapEngage Destination
---

SnapEngage is an enterprise chat software for businesses. It allows you to capture more leads, drive conversions, reduce response times, and increase customer satisfaction. Our SnapEngage destination code is open source - you can check it out [here](https://github.com/segment-integrations/analytics.js-integration-snapengage).

This document was last updated on October 22, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".

2. Search for "SnapEngage" within the Destinations Catalog and confirm the Source you'd like to connect to - keep in mind that our "SnapEngage" destination is only compatible with our client-side [analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/analytics.js/) library.

3. Add your SnapEngage `Widget ID` to your destination settings in Segment. You can find the `Widget ID` in your SnapEngage Javascript snippet. It will look something like this: 0c739ebb-2016-44a0-b1da-a5b5eb272474. Alternatively, the `Widget ID` can also be found under the _Advanced Widget ID_ section of the _Get the Code_ tab in the Admin Dashboard when logged in to SnapEngage.

4. Once you enable the destination, our CDN is updated within 45 minutes. Analytics.js will start asynchronously loading SnapEngage's javascript onto your page. Please remember to remove SnapEngages's snippet from your page.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('ze8rt1u89', {
  name: 'Zaphod Beeblebrox',
  gender: 'Male',
  email: 'Zaphod@hotmail.com',
});
```

When sending an `Identify` call to SnapEngage be sure to include an `email` field in the `traits` object as outlined above. Otherwise the call will be rejected and you will be unable to set the user's email.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does.

### Record Live Chat Events

With SnapEngage we _only support "Live Chat" `track` events_. When "Record Live Chat Events" in your destination settings is enabled, we will automatically collect the following events on your behalf:
* Live Chat Conversation Started
* Live Chat Conversation Ended
* Live Chat Message Sent
* Live Chat Message Received

These events will then flow out to your other tools, so you can do things like analyze if users who chat spend more money over time.

We will not send any other track events.

To learn more about the live chat events you can capture with this destination, head on over to our [Live Chat spec docs](/docs/connections/spec/live-chat/).
