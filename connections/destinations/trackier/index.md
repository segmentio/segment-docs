---
rewrite: true
---
[Trackier](https://trackier.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is customisable performance marketing software used by ad networks, agencies and advertisers to manage publisher relations.

This destination is maintained by Trackier. For any issues with the destination, please [reach out to their team](mailto:support@trackier.com).

_**NOTE:** The Trackier Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on May 14, 2019. If you are interested in joining their beta program or have any feedback to help improve the Trackier Destination and its documentation, please [let  their team know](mailto:support@trackier.com)!_


## Getting Started

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Trackier" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your Trackier dashboard Profile section -> Global Security Token


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
  analytics.track(“Item Sold”, {
    click_id: '1233443',
    sale_amount: $12.54,
    txn_id: 'random',
    goal_id: '123234',
    goal_value: 'goal name'
  });
```

**NOTE:** `click_id` is a required property while all other properties in the example above are optional.

Track calls will be sent to Trackier as a `track` event. Some optional properties you can include are:
* `sale_amount`: for tracking product sales value, is used in reporting profit
* `txn_id`: unique transaction ID, set the default value as 'random' to track upsells on a single click
* `goal_id`: unique constant id for each campaign goals
* `goal_value`: short name for goals