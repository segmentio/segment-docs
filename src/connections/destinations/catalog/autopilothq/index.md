---
rewrite: true
title: Autopilot Destination
---
[Autopilot](https://www.autopilothq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps thousands of organizations around the world automate their marketing with visual and simple customer journey marketing software.

This destination is maintained by Autopilot.  See [Autopilot's documentation](https://support.autopilothq.com/hc/en-us/categories/200396835-Segment) for more information.  For any issues with the destination, please [reach out to our friends at Autopilot](https://support.autopilothq.com/hc/en-us/requests/new).

Are you instead trying to setup Autopilot as a Source to get data from Autopilot into your data warehouse or other downstream tools? See our documentation on our [Autopilot source](https://segment.com/docs/connections/sources/catalog/cloud-apps/autopilothq/) instead.

This document was last updated on October 12, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

  1. From your Segment UI's Destinations page click on "Add Destination".
  2. Search for "Autopilot" within the Destinations Catalog and confirm the Source you'd like to connect to.
  3. Drop in your "API Key" from [here](https://login.autopilothq.com/login#settings/app-connections/segment-sync) or go to Autopilot: Settings -> App Connections -> Segment and copy/paste the API key which is listed there.
  4. Once enabled 'identify' and 'track' calls will be sent to Autopilot.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('12091906-01011992', {
  name: 'John Joe',
  email: 'john.doe@example.com'
});
```

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track("Step Activated", {
  property: "test"
});
```

## Appendices

Additional Autopilot Tracking code will be required on your site to unlock the following features:

  - Website activity for anonymous and known visitors ('page' calls).
  - Capturing form submissions.
  - Triggering Headsup messages.
  - User association via the Autopilot Javascript library.

For complete details, visit the Autopilot page [How to use Segment with Autopilot](https://autopilothq.zendesk.com/hc/en-us/articles/203658119).
