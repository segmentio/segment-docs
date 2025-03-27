---
rewrite: true
title: Autopilot Destination
id: 5515e05c0a20f4e22f0fb36f
---
[Autopilot](https://www.autopilothq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} helps thousands of organizations around the world automate their marketing with visual and simple customer journey marketing software.

This destination is maintained by Autopilot.  See [Autopilot's documentation](https://support.autopilothq.com/hc/en-us/categories/200396835-Segment){:target="_blank”} for more information.  For any issues with the destination, [contact our friends at Autopilot](https://support.autopilothq.com/hc/en-us/requests/new){:target="_blank”}.

Are you instead trying to set up Autopilot as a Source to get data from Autopilot into your data warehouse or other downstream tools? See our documentation on our [Autopilot source](/docs/connections/sources/catalog/cloud-apps/autopilothq/) instead.

## Getting Started
  1. From the Segment web app, click **Catalog**.
  2. Search for "Autopilot" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. In the destination settings, enter your "API Key" from [your Autopilot Segment Sync settings page](https://login.autopilothq.com/login#settings/app-connections/segment-sync){:target="_blank”} or go to Autopilot: Settings -> App Connections -> Segment and copy/paste the API key which is listed there.
  4. Once enabled 'identify' and 'track' calls will be sent to Autopilot.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('12091906-01011992', {
  name: 'John Joe',
  email: 'john.doe@example.com'
});
```

> info "Engage requires Identify calls from the Autopilot destination to include email or userId"
> If neither are provided in the payload then the Autopilot destination's [Event Delivery](/docs/connections/event-delivery/) tab will show a 400 Bad Request error message : _"Missing unique identifier traits. Either `email` or `user_id` traits must be provided"_.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

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
  - User association using the Autopilot JavaScript library.

For complete details, visit the Autopilot page [How to use Segment with Autopilot](https://support.autopilothq.com/hc/en-us/articles/203658119){:target="_blank”}.
