---
rewrite: true
title: Strikedeck Destination
id: 5c940e99e3498f000177880c
---
[Strikedeck](https://strikedeck.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a Customer Success platform which actively manages customer relationships to reduce churn, increase existing revenue and influence new sales. Strikedeck includes  Customer Engagement Analytics, Health Scorecard, Notifications, Recommendations & Actions.

Strikedeck maintains this documentation. For any issues with the destination, [contact the Strikedeck Support team](mailto:support@strikedeck.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Strikedeck" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your Strikedeck settings page. Go to Settings -> Connector and click on "Segment". Copy the API Key from this page.

## Page

For more information about the Page method, see the [Segment Specs - Page](/docs/connections/spec/page/) documentation.

An example Page call looks like:

```js
analytics.page()
```

Segment sends Page calls to Strikedeck as a `pageview`.


## Screen
For more information about the Screen method, see the [Segment Specs - Screen](/docs/connections/spec/screen/) documentation.

An example Screen call looks like:

```js
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Strikedeck as a `screenview`.


## Identify
For more information about the Screen method, see the [Segment Specs - Screen](/docs/connections/spec/identify/) documentation.

An example Identify call looks like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify to Strikedeck as an `identify` event.


## Group

For more information about the Screen method, see the [Segment Specs - Screen](/docs/connections/spec/group/) documentation.

An example Group call looks like:

```js
analytics.group( {
  groupId: 'abc123'
});
```

Segment sends Group to Strikedeck as a `group` event.


## Track

For more information about the Screen method, see the [Segment Specs - Screen](/docs/connections/spec/track/) documentation.

An example Track call looks like:

```js
analytics.track('Clicked Login Button')
```

Segment sends Track calls to Strikedeck as a `track` event.
