---
rewrite: true
title: New Relic Destination
id: 54521fd925e721e32a72eee0
---
[New Relic](https://newrelic.com/) enables you to better understand, using their real-time analytics, the end-to-end business impact of your software performance.

## Getting Started

{% include content/connection-modes.md %}

  1. From the Segment web app, click **Catalog**.
  2. Search for "New Relic" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. In the destination settings, enter your Insights [Account ID](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/account-id) and your [Insert Key](https://docs.newrelic.com/docs/insights/insights-data-sources/custom-data/insert-custom-events-insights-api#register).
  4. Once destination enabled we'll start forwarding your calls to New Relic.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:
```
analytics.track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
```

We forward `track` calls to New Relic in order to [insert custom events using their Insights API](https://docs.newrelic.com/docs/insights/new-relic-insights/adding-querying-data/inserting-custom-events).

Your event `properties` will be included with the event, conforming to the following rules:
- booleans are transformed to strings
- reserved nrql words are wrapped with backticks
- reserved words are removed
- dates are converted to ISO strings
- arrays and objects are removed

By default the events are given an `eventType` of 'Segment'. This can be changed using the optional 'Custom Default Event Type' setting in the Segment UI.

If you pass a revenue property, we'll pass that through as the value of the conversion.
