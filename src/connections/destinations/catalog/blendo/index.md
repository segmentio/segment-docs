---
title: Blendo Destination
rewrite: true
id: 5c6db002edda600001b2af8b
---
[Blendo](https://www.blendo.co/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is an ELT platform that syncs all your sales, marketing, financial or any other data, from your SaaS tools to your data warehouse.

This destination is maintained by Blendo. For any issues with the destination, [contact the Blendo Support team](mailto:help@blendo.co).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Blendo" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI that was created when you set up your Segment pipeline. If you don't have it available, log in to your [Blendo account](https://app.blendo.co) and select the Segment pipeline you want to sent data to. Click on the "Edit" button and copy the "API Key" as shown in the modal window that appears.
4. Blendo will collect any Segment data as soon as they arrive but will sync data to your data warehouse according to your pipeline's schedule. By default, this is at the start of each hour. You can also manually sync any collected data by selecting your Segment pipeline from your pipelines' list, and clicking "Sync Now" on the overview section of your pipeline's syncing status.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Blendo as a `pageview`, which will be copied to your `page` table


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to Blendo as a `screenview`, which will be copied to your `screen` table


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to Blendo as an `identify` event, which will be copied to your `identify` table


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Blendo as a `track` event, which will be copied to your `track` table
