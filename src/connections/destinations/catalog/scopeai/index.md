---
rewrite: true
title: ScopeAI Destination
id: 5c6cb84c9d413f0001804a42
---
[ScopeAI](https://www.getscopeai.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) improves communication between support and product teams by aggregating user feedback and tracking the impact of bugs or issues and feature requests.

This destination is maintained by ScopeAI. For any issues with the destination, [contact the ScopeAI Support team](mailto:support@getscopeai.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "ScopeAI" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the Segment Settings UI under "API Key" place the Segment token that can be seen after clicking "Show Token" in the panel of the Segment integration you've  created in the [ScopeAI integrations page](https://www.getscopeai.com/integrations). If you haven't yet created a Segment integration on the ScopeAI app, follow these [instructions](http://help.getscopeai.com/integrations/integrating-with-segment) to create one.

Data will only display when there are conversations imported into ScopeAI (these must be imported through separate integrations) that have a `userId` or `email` that match with the `userId` or `email` of Segment API calls.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to ScopeAI as a `pageview`.

You can filter by this data in ScopeAI by finding "Page View" under "User Attributes".

This data can be used to customize analysis on ScopeAI.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to ScopeAI as an `identify` event. The `userId` will be used as the primary key to join your respective user attributes with user conversations. ScopeAI will attempt to fallback on `email` if there is no match.

ScopeAI saves all traits of an `identify` event under "User Attributes" which can be used to filter queries.

This data can be used to customize analysis on ScopeAI.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to ScopeAI as a `track` event.

This data can be used to customize analysis on ScopeAI.
