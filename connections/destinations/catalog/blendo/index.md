---
title: Blendo
---

[Blendo](https://www.blendo.co/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is an ELT platform that syncs all your sales, marketing, financial or any other data, from your SaaS tools to your data warehouse.

This destination is maintained by Blendo. For any issues with the destination, please [reach out to their team](mailto:help@blendo.co).

_**NOTE:** Blendo is currently in beta, which means that there may still be some bugs for us to iron out. This doc was last updated on Feb 21, 2019, and we'd love to hear your feedback. If you are interested in joining our beta program or have any feedback to help us improve the Blendo Destination and its documentation, please [let us know](mailto:help@blendo.co)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Blendo" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI that was created when you setup your Segment pipeline. If you don't have it available, log in to your [Blendo account](https://app.blendo.co) and select the Segment pipeline you want to sent data to. Click on the "Edit" button and copy the "API Key" as shown in the modal window that appears.
4. Blendo will collect any Segment data as soon as they arrive but will sync data to your data warehouse according to your pipeline's schedule. By default, this is at the start of each hour. You can also manually sync any collected data by selecting your Segment pipeline from your pipelines' list, and clicking "Sync Now" on the overview section of your pipeline's syncing status.


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Blendo as a `pageview`, which will be copied to your `page` table


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to Blendo as a `screenview`, which will be copied to your `screen` table


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to Blendo as an `identify` event, which will be copied to your `identify` table


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Blendo as a `track` event, which will be copied to your `track` table
