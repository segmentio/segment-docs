---
rewrite: true
title: Trackier Destination
id: 5cd62e29299eb40001acff12
---
[Trackier](https://trackier.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is customisable performance marketing software used by ad networks, agencies and advertisers to manage publisher relations.

This destination is maintained by Trackier. For any issues with the destination, [contact the Trackier Support team](mailto:support@trackier.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Trackier" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your Trackier dashboard Profile section -> Global Security Token


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
  analytics.track("Item Sold", {
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
