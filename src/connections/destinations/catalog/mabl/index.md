---
rewrite: true
title: Mabl Destination
id: 5cdc9409f9de1d00017e3e3f
---
Only [mabl](https://mabl.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) offers scriptless cross-browser web testing, auto-healing tests, visual testing, and diagnostics in one simple service. mabl helps you improve the speed and quality of your release pipeline by allowing you to test every release, at scale, on a single platform, with no infrastructure to manage.

This destination is maintained by mabl. For any issues with the destination, [contact the Mabl  Support team](mailto:support@mabl.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}


1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "mabl" in the Destinations Catalog, and select the mabl destination.
3. Choose which Source should send data to the mabl destination.
4. Go to the [mabl api settings page](https://app.mabl.com/workspaces/-/settings/apis) (or navigate in the mabl app to **Settings > APIs**), find and copy the API key.
5. Enter the API Key in the mabl destination settings in Segment.

mabl processes the usage data into rolling 24 hour summaries, every hour.  It can take up to an hour for usage to appear in your test coverage metrics.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```
Page calls are used by mabl to build a model of the pages in your app and determine the number of unique users interacting with each page.  Page calls are particularly useful because they can help inform mabl's model of a page's URL patterns. You can find this information in your workspace's [coverage page](https://app.mabl.com/workspaces/-/coverage) under the "Daily Users" column.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls are used by mabl to build a model of the pages in your app and determine the number of unique users interacting with each page. You can find this information in your workspace's [coverage page](https://app.mabl.com/workspaces/-/coverage) under the "Daily Users" column.
