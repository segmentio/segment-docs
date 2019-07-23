---
rewrite: true
---
[ScopeAI](https://www.getscopeai.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) improves communication between support and product teams by aggregating user feedback and tracking the impact of bugs or issues and feature requests.

This destination is maintained by ScopeAI. For any issues with the destination, please [reach out to their team](mailto:support@getscopeai.com).

_**NOTE:** ScopeAI is currently in beta, which means that they are still actively developing the product. This doc was last updated on February 22, 2019. If you are interested in joining their beta program or have any feedback to help improve the ScopeAI Destination and its documentation, please [let  their team know](mailto:support@getscopeai.com)!_


## Getting Started

{{>connection-modes}} 

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "ScopeAI" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. In the Segment Settings UI under "API Key" place the Segment token that can be seen after clicking "Show Token" in the panel of the Segment integration you've  created in the [ScopeAI integrations page](https://www.getscopeai.com/integrations). If you haven't yet created a Segment integration on the ScopeAI app, please follow these [instructions](http://help.getscopeai.com/integrations/integrating-with-segment) to create one.

Data will only display when there are conversations imported into ScopeAI (these must be imported through separate integrations) that have a `userId` or `email` that match with the `userId` or `email` of Segment API calls. More information on this can be found [here](http://help.getscopeai.com/integrations/integrating-with-segment).


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to ScopeAI as a `pageview`. 

You can filter by this data in ScopeAI by finding "Page View" under "User Attributes". 

This data can be used to customize analysis on ScopeAI, information on how can be found [here](http://help.getscopeai.com/getting-started/customizing-analysis).


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to ScopeAI as an `identify` event. The `userId` will be used as the primary key to join your respective user attributes with user conversations. ScopeAI will attempt to fallback on `email` if there is no match.

ScopeAI saves all traits of an `identify` event under "User Attributes" which can be used to filter queries.

This data can be used to customize analysis on ScopeAI, information on how can be found [here](http://help.getscopeai.com/getting-started/customizing-analysis).


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to ScopeAI as a `track` event.

This data can be used to customize analysis on ScopeAI, information on how can be found [here](http://help.getscopeai.com/getting-started/customizing-analysis).