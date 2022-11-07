---
rewrite: true
title: QuanticMind Destination
id: 54521fd725e721e32a72eec2
---
[QuanticMind](https://quanticmind.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the performance leader in predictive advertising management software for paid search, social, display, and mobile. The `analytics.js` QuanticMind Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-quanticmind).

## Getting Started

{% include content/connection-modes.md %}

  1. From the Segment web app, click **Catalog**.
  2. Search for "QuanticMind" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. In the destination settings, enter your `ClientID`, and `Domain` if provided, from QuanticMind account manager.
  4. Under `Events` you can then map any necessary 'track' event/s to QuanticMind numbered event/s. Note that unless mapped in the settings, no 'track' calls will be sent to QuanticMind.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```javascript
analytics.page();
```

Page calls to Segment result in us pushing a "click" event to QuanticMind.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('12091906-01011992', {
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track("Button Clicked", {
  property: "test"
});
```

QuanticMind only accepts numbered events like `event1` and `event12`. When you `analytics.track(event, properties)` an event, we need to map that event name to QuanticMind numbered event using your destination settings. Enter an event on the left, and the QuanticMind event number you want on the right.
