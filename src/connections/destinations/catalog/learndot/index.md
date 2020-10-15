---
title: Learndot Destination
rewrite: true
---

[Learndot](https://www.learndot.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a product focussed customer education platform that enables companies to rapidly produce and distribute engaging training content.

This destination is maintained by Learndot. For any issues with the destination, [contact the Learndot Support team](mailto:help@learndot.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Learndot" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Learndot admin](https://admin.learndotx.com/settings).


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Learndot uses the `identify` event in order to map events in Segment back to learners in Learndot.

**IMPORTANT:** `email` is a required trait as Learndot will use this as the primary field to complete the mapping.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

The `track` call is used in conjunction with the `identify` to determine when to mark lessons complete for learners.

The `track` and `identify` are tightly coupled in Learndot. We use the `identify` to map your user back to the Learner in Learndot and the `track` to determine if the user has completed the task you gave them. If Learndot receives a `track` call without an accompanying `identify` call it won't be able to determine which Learner the completed the task.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to Learndot as a `pageview`and will be used to help further segment the users and power more detailed analytics in Learndot.

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to Learndot as a `screenview` and will be used to help further segment the users and power more detailed analytics in Learndot.

## Page, Screen & Group

Page, Screen and Group calls are used to help further segment the users and power more detailed analytics in Learndot.
