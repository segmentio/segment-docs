---
rewrite: true
---
[New Relic](https://newrelic.com/insights) enables you to better understand, using their real-time analytics, the end-to-end business impact of your software performance.

This document was last updated on August 29, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{{>connection-modes}}

  1. From your Segment UI’s Destinations page click on “Add Destination”.
  2. Search for “New Relic” within the Destinations Catalog and confirm the Source you’d like to connect to.
  3. Drop in your Insights [Account ID](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/account-id) and your [Insert Key](https://docs.newrelic.com/docs/insights/insights-data-sources/custom-data/insert-custom-events-insights-api#register).
  4. Once destination enabled we'll start forwarding your calls to New Relic.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:
```
analytics.track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
```

We forward `track` calls to New Relic in order to [insert custom events via their Insights API](https://docs.newrelic.com/docs/insights/new-relic-insights/adding-querying-data/inserting-custom-events).

Your event `properties` will be included with the event, conforming to the following rules:
- booleans are transformed to strings
- reserved nrql words are wrapped with backticks
- reserved words are removed
- dates are converted to ISO strings
- arrays and objects are removed

By default the events are given an `eventType` of 'Segment'. This can be changed via the optional 'Custom Default Event Type' setting in the Segment UI.

If you pass a revenue property, we'll pass that through as the value of the conversion.
