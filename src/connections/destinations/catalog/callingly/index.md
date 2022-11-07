---
title: Callingly Destination
rewrite: true
id: 5c953ce33407d0000104d495
---
[Callingly](https://callingly.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) automatically gets your sales team on the phone with your incoming leads within seconds, generating better results and happy customers.

This destination is maintained by Callingly. For any issues with the destination, [contact the Callingly Support team](mailto:support@callingly.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Callingly" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Callingly Integrations page](https://callingly.com/dashboard/integrations). Click "Connect" on the Segment integration to enable it.
4. In the Segment integration settings on the [Callingly Integrations page](https://callingly.com/dashboard/integrations) you can also select which Team will receive the calls triggered from Segment events.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  firstName: 'John',
  lastName: 'Doe',
  phone: '555-555-5555',
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to Callingly as an `identify` event. To trigger a call, you must include a phone number as a`phone` trait.

If the `phone` trait is valid, formatted either in E.164 or your country's local standard, Callingly will add the visitor as a Lead to your account and trigger a phone call to the Team selected in your Integration settings.

To configure agents, schedules, call routing options and retry settings edit the Team settings on the [Callingly Teams Page](https://callingly.com/dashboard/teams).
