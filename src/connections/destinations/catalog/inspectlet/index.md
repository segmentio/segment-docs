---
title: Inspectlet Destination
rewrite: true
---

[Inspectlet](https://www.inspectlet.com/) lets you analyze user behavior instantly with Eye Tracking Heatmaps, Screen Capture (record and playback actual visitor sessions), and User-Interaction Analytics. The Inspectlet Destination is open-source. You can browse the code on [GitHub](https://github.com/segment-integrations/analytics.js-integration-inspectlet).

This document was last updated on 20th June, 2018. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

 {% include content/connection-modes.md %}

  1. From your Segment UI's Destinations page click on "Add Destination".
  2. Search for "Inspectlet" within the Destinations Catalog and confirm the Source you'd like to connect to.
  3. Take your Inspectlet WID (website's ID), you can find it after clicking the Get Install Code button for your site in your Inspectlet dashboard. It will appear near the beginning of your embed code snippet. It should be a series of numbers, like 9492461759.
  4. Add the WID in the "Connection Settings" section in Segment.
  5. Our CDN is updated within 45 minutes. Then our snippet will start asynchronously loading Inspectlet's tracker.js onto your page. This means you should remove Inspectlet's snippet from your page.
  6. Your Inspectlet dashboard will start showing recordings.

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](/docs/spec/page/) does. An example call would look like:
```
analytics.page();
```

The Page method is required to load Inspectlet on each new page load. Calling the method after the initial page load doesn't have any effect on Inspectlet.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](/docs/spec/identify/) does. An example call would look like:
```
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@initech.com"
});
```

Calling `identify` tags the Inspectlet session with all the `traits` you include in your `identify` call as well as the `userId`, which will appear in Inspectlet as simply `id`. The identify method only needs to be called once per session and can be called at anytime during the session. You can also call Identify again with a different identity in case the user's identity needs to be updated.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](/docs/spec/track/) does. An example call would look like:
```
analytics.track("Purchased Product", {
  product: "book",
  title: "The Name of the Wind"
});
```

Using our Track method to record events will also tag the Inspectlet session. The tag will be the event name, following the example above, "Purchased Product" would be the tag name in Inspectlet. We will also send along the properties of the Track event.
