---
title: Dreamdata IO Destination
rewrite: true
id: 5c6ef3322a6fb40001a71bf7
---
[Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) uses your Segment data to deliver multitouch, per account attribution. This enables B2B companies to understand the impact on revenue of every touch in their customer journey.

This destination is maintained by Dreamdata IO. For any issues with the destination, [contact the Dreamdata Support team](mailto:friends@dreamdata.io).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Dreamdata IO" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Dreamdata IO settings](https://app.dreamdata.io/settings).
4. You will be able to verify that data is flowing into Dreamdata IO from your [Dreamdata IO settings](https://app.dreamdata.io/settings).


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) as a `pageview`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) as a `screenview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) as an `identify` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) as a `track` event.


## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```
analytics.group("userId123", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise"
});
```

Group calls will be sent to [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) as a `group` event where it is used to join users to accounts.

By default, [Dreamdata IO](https://dreamdata.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) uses user emails and your CRM data to map user activites to accounts and attribute the value correctly. Adding Group calls using Segment will give a more precise attribution and ensure that all activities are attributed to the right account.
