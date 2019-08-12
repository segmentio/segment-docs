---
title: SlicingDice
---
[SlicingDice](https://slicingdice.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is an all-in-one data warehouse. It's a fully managed cloud data warehouse with optional built-in tools for data integration, exploration, visualization and machine learning.

This destination is maintained by SlicingDice. For any issues with the destination, please [reach out to their team](mailto:support@slicingdice.com).

_**NOTE:** The SlicingDice Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on May 8, 2019. If you are interested in joining their beta program or have any feedback to help improve the SlicingDice Destination and its documentation, please [let  their team know](mailto:support@slicingdice.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. Login into your SlicingDice’s Control Panel account to create a connection between SlicingDice and Segment.
2. Follow the [Connecting to Segment guide](https://docs.slicingdice.com/data_warehouse_module/connecting_external_tools/segment.html) available in SlicingDice documentation to create and allow this connection.


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will save your data in SlicingDice using the following columns:
* `{source_name}-pages-page-event`: contains the `name` attribute of the call
* `{source_name}-pages-{attribute_name}`: contains the `properties` attributes of the call, saving each one as an individual column
* `{source_name}-pages-context-{attribute_name}`: contains the `context` attributes of the call, saving each one as an individual column

## Screen

If you haven’t had a chance to review our spec, please take a look to understand what the Screen method does. An example call would look like:
```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to SlicingDice using the following columns:

* `{source_name}-screens-screen-event`: contains the `name` attribute of a Screen call
* `{source_name}-screens-{attribute_name}`: contains the `properties` attributes of a Screen call, saving each one as an individual column
* `{source_name}-screens-context-{attribute_name}`: contains the `context` attributes of a Screen call, saving each one as an individual column


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to SlicingDice using the following columns:
* `{source_name}-identifies-user-id`: contains the “userId” attribute of an Identify call
* `{source_name}-identifies-{attribute_name}`: contains the “traits” attributes of an Identify call, saving each one as an individual column
* `{source_name}-identifies-context-{attribute_name}`: contains the “context” attributes of an Identify call, saving each one as an individual column


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to SlicingDice using the following columns:

* `{source_name}-track-event`: contains the “event” attribute of a Track call
* `{source_name}-track-{attribute_name}`: contains the “properties” attributes of a Track call, saving each one as an individual column
* `{source_name}-track-context-{attribute_name}`: contains the “context” attributes of a Track call, saving each one as an individual column

*Observation: if your* `context` *attribute has nested attributes, your column names will follow this pattern:* `{source_name}-track-context-{attribute_name}{nested_attribute_name}`

## Groups

If you haven’t had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/spec/group/) does. An example call would look like:
```
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

Group calls will be sent to SlicingDice using the following columns:

* `{source_name}-groups-group-id`: contains the `groupID` attribute of a Group call
* `{source_name}-groups-{attribute_name}`: contains the `traits` attributes of a Group call, saving each one as an individual column
* `{source_name}-groups-context-{attribute_name}`: contains the “context” attributes of a Group call, saving each one as an individual column

    *Observation: Group calls will also be sent to SlicingDice using the following [Account](https://segment.com/docs/destinations/#warehouse-schemas) columns that holds the latest state of a group.*
    * `{source_name}-accounts-group-id`: contains the `groupId` attribute of a Group call
    * `{source_name}-accounts-{attribute_name}`: contains the `traits` attributes of a Track call, saving each one as an individual column
    * `{source_name}-accounts-context-{attribute_name}`: contains the `context` attributes of a Track call, saving each one as an individual column
