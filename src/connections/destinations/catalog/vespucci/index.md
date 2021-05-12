---
title: Vespucci Destination
rewrite: true
---

[Vespucci](https://vespuccianalytics.com) is a new kind of analytics solution designed around statistics and AI.

Vespucci is an unsupervised analytics solution relying on models that highlight the elements and content in your app revealing remarkable behaviors.

This destination is maintained by Vespucci. For any issues with the destination, [contact the Vespucci Support team](mailto:info@amerigotechnology.com).



## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Vespucci" in the Destinations Catalog, and select the Vespucci destination.
3. Choose which Source should send data to the Vespucci destination.
4. Go to your "Your Active Projects" section on your [Vespucci Dashboard](https://dashboard.vespuccianalytics.com). Click on the **+** button. Enter a name and select "Segment Destination" as the DataPipe.
5. [Depending on your project configuration](https://vespuccianalytics.com/docs/#segment), select one of the two tracking methods and click "Create" to create your project.
6. Take note of the API key associated with this project. Back in the Segment App, enter your API key in the Vespucci destination settings.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Vespucci as a `screen`.

## Screen
If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](https://segment.com/docs/connections/spec/screen/) to learn about what it does. An example call would look like:
```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```
Segment sends Screen calls to Vespucci as a `screen`.


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Vespucci as an `identify` event.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Vespucci as an `action` event.

---
