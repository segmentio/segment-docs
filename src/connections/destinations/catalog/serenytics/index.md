---
rewrite: true
title: Serenytics Destination
id: 5cb99b9cb26aa60001c3a896
---
[Serenytics](https://www.serenytics.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides an all-in-one data platform to create dashboards. It comes with an embedded Redshift data warehouse, an ETL, a Python scheduler and a  dashboard editor. It is dedicated to small/medium data teams looking for a full-featured data stack who don't want to create and maintain it internally.

When the Serenytics destination is enabled in Segment, messages from Segment will be stored in the Serenytics Redshift and will be available for transformation and to create dashboards.

This destination is maintained by the company Serenytics. For any issues with the destination, [contact the Serenytics Support team](mailto:support@serenytics.com).


{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

From Serenytics app using OAuth:
1. In Serenytics, in the [datasources list](https://app.serenytics.com/studio/data_sources), click on the button `New data source` and select the tab `Web services and API` and click on `Segment`.
2. This will redirect you to Segment website where you choose which Segment source you want to connect to Serenytics.
3. Once you have choosen the Segment source, you are redirected to Serenytics in a newly created datasources folder called 'Segment integration'. It contains all the Serenytics datasources where your data will be available to create dashboards.

From Segment Destinations Catalog:
1. From the Segment web app, click **Catalog**.
2. Search for "Serenytics" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Serenytics account page](https://app.serenytics.com/studio/account).
4. In the [Serenytics datasources list](https://app.serenytics.com/studio/data_sources), when the first message from Segment is received, a new folder named 'Segment integration' will be automatically created with datasources that contain your data.



## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```


To view your page calls in Serenytics, open the datasource called `Segment_Pages`.

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

To view your screen calls in Serenytics, open the datasource called `Segment_Screens`.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

To view your identify calls in Serenytics, open the datasource called `Segment_Identifys`.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Article Completed')
```

To view your track calls in Serenytics, open the datasource called `Segment_Tracks`.
