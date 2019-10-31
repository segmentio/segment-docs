---
title: PersistIQ
---
[PersistIQ](https://www.persistiq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the easiest sales engagement software to use. Sales teams use PersistIQ to connect with more prospects using targeted emails, calls, and tasks.

This destination is maintained by PersistIQ. For any issues with the destination, please [reach out to their team](mailto:support@persistiq.com).

_**NOTE:** The PersistIQ Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on February 28, 2019. If you are interested in joining their beta program or have any feedback to help improve the PersistIQ Destination and its documentation, please [let  their team know](mailto:support@persistiq.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "PersistIQ" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find at the bottom of your [PersistIQ Integrations page](https://persistiq.com/app#/integrations).


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:
```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

You can pass in an `email` and `unsubscribed` (with a value of true) in an `identify` call. If the email address matches an email present in PersistIQ, that prospect will be marked as opted out. Here is an example of how to do that:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com',
  unsubscribed: true
});
```
