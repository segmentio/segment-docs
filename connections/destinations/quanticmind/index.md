---

---
[QuanticMind](https://quanticmind.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the performance leader in predictive advertising management software for paid search, social, display, and mobile. The `analytics.js` QuanticMind Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-quanticmind).

This document was last updated on January 09, 2019. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

  1. From your Segment UI’s Destinations page click on “Add Destination”.
  2. Search for "QuanticMind" within the Destinations Catalog and confirm the Source you’d like to connect to.
  3. Drop in your `ClientID`, and `Domain` if provided, from QuanticMind account manager.
  4. Under `Events` you can then map any necessary 'track' event/s to QuanticMind numbered event/s. Please note that unless mapped in the settings, no 'track' calls will be sent to QuanticMind.


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```javascript
analytics.page();
```

Page calls to Segment result in us pushing a "click" event to QuanticMind.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('12091906-01011992', {
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```javascript
analytics.track("Button Clicked", {
  property: "test"
});
```

QuanticMind only accepts numbered events like `event1` and `event12`. When you `analytics.track(event, properties)` an event, we need to map that event name to QuanticMind numbered event via your destination settings. Enter an event on the left, and the QuanticMind event number you want on the right.
