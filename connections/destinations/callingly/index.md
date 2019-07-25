---
rewrite: true
---

[Callingly](https://callingly.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) automatically gets your sales team on the phone with your incoming leads within seconds, generating better results and happy customers.

This destination is maintained by Callingly. For any issues with the destination, please [reach out to their team](mailto:support@callingly.com).

_**NOTE:** The Callingly Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 2, 2019. If you are interested in joining their beta program or have any feedback to help improve the Callingly Destination and its documentation, please [let  their team know](mailto:support@callingly.com)!_


## Getting Started

<!-- {{>connection-modes}} --> 

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Callingly" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Callingly Integrations page](https://callingly.com/dashboard/integrations). Click "Connect" on the Segment integration to enable it.
4. In the Segment integration settings on the [Callingly Integrations page](https://callingly.com/dashboard/integrations) you can also select which Team will receive the calls triggered from Segment events. 

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  firstName: 'John',
  lastName: 'Doe',
  phone: '555-555-5555',
  email: 'john.doe@segment.com' 
});
```

Identify calls will be sent to Callingly as an `identify` event. To trigger a call, you must include a phone number as a`phone` trait.

If the `phone` trait is valid, formatted either in E.164 or your country's local standard, Callingly will add the visitor as a Lead to your account and trigger a phone call to the Team selected in your Integration settings.

To configure agents, schedules, call routing options and retry settings edit the Team settings on the [Callingly Teams Page](https://callingly.com/dashboard/teams).
