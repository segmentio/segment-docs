---
title: Inspectlet Destination
rewrite: true
id: 54521fd725e721e32a72eec3
---
[Inspectlet](https://www.inspectlet.com/) lets you analyze user behavior instantly with Eye Tracking Heatmaps, Screen Capture (record and playback actual visitor sessions), and User-Interaction Analytics. The Inspectlet Destination is open-source. You can browse the code on [GitHub](https://github.com/segment-integrations/analytics.js-integration-inspectlet).

## Getting Started

 {% include content/connection-modes.md %}

  1. From the Segment web app, click **Catalog**.
  2. Search for "Inspectlet" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. Take your Inspectlet WID (website's ID), you can find it after clicking the Get Install Code button for your site in your Inspectlet dashboard. It will appear near the beginning of your embed code snippet. It should be a series of numbers, like 9492461759.
  4. Add the WID in the "Connection Settings" section in Segment.
  5. Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Inspectlet's tracker.js onto your page. This means you should remove Inspectlet's snippet from your page.
  6. Your Inspectlet dashboard will start showing recordings.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:
```
analytics.page();
```

The Page method is required to load Inspectlet on each new page load. Calling the method after the initial page load doesn't have any effect on Inspectlet.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:
```
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@example.com"
});
```

Calling `identify` tags the Inspectlet session with all the `traits` you include in your `identify` call as well as the `userId`, which will appear in Inspectlet as simply `id`. The identify method only needs to be called once per session and can be called at anytime during the session. You can also call Identify again with a different identity in case the user's identity needs to be updated.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:
```
analytics.track("Purchased Product", {
  product: "book",
  title: "The Name of the Wind"
});
```

Using our Track method to record events will also tag the Inspectlet session. The tag will be the event name, following the example above, "Purchased Product" would be the tag name in Inspectlet. We will also send along the properties of the Track event.
