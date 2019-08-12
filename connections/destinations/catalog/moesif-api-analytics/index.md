---
title: Moesif
---

## Moesif API Analytics Destination

[Moesif API Analytics](https://www.moesif.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps you make data-driven product decisions that grows your API platform. Using API analytics, understand how your customers and partners use your APIs and what drives long term engagement and retention.

This destination is maintained by Moesif. For any issues with the destination, please [reach out to their team](mailto:support@moesif.com).

_**NOTE:** The Moesif API Analytics Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on July 19, 2019. If you are interested in joining their beta program or have any feedback to help improve the Moesif API Analytics Destination and its documentation, please [let  their team know](mailto:support@moesif.com)!_

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Moesif" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Moesif account](https://www.moesif.com) and going to the extensions settings.
4. Once integrated, Segment data shows up in Moesif in a few seconds.

_Optional: If you would like to sync your past events which were sent through Segment into your Moesif app, you have the option of leveraging Segment Replay._


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@gmail.com',
      phone: '123-456-7890',
      custom_string_field: 'some_value',
      custom_int_field: 55,
      custom_obj_field: {
          sub_a: 'value_a',
          sub_b: 'value_b'
      }
});
```

Identify calls will be sent to Moesif as an [updateUser()](https://www.moesif.com/docs/getting-started/users/#the-update-user-endpoint?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) event and will be seen under the _User Analytics_ section.
