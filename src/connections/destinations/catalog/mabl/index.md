---
rewrite: true
title: Mabl Destination
---

Only [mabl](https://mabl.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) offers scriptless cross-browser web testing, auto-healing tests, visual testing, and diagnostics in one simple service. mabl helps you improve the speed and quality of your release pipeline by allowing you to test every release, at scale, on a single platform, with no infrastructure to manage.

This destination is maintained by mabl. For any issues with the destination, [contact the mabl team](mailto:support@mabl.com).

_**NOTE:** The mabl Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on 10 June, 2019. If you are interested in joining their beta program or have any feedback to help improve the mabl Destination and its documentation, [let their team know](mailto:support@mabl.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "mabl" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. The mabl API Key is available in the mabl app under settings > APIs or by navigating directly to https://app.mabl.com/workspaces/-/settings/apis.
4. mabl processes the usage data into rolling 24 hour summaries hourly.  It may take up to an hour for usage to begin to populate in your test coverage metrics.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```
Page calls are used by mabl to build a model of the pages in your app and determine the number of unique users interacting with each page.  Page calls are particularly useful because they can help inform mabl's model of a page's URL patterns. You can find this information in your workspace's [coverage page](https://app.mabl.com/workspaces/-/coverage) under the "Daily Users" column.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls are used by mabl to build a model of the pages in your app and determine the number of unique users interacting with each page. You can find this information in your workspace's [coverage page](https://app.mabl.com/workspaces/-/coverage) under the "Daily Users" column.
