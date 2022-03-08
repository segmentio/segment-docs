---
rewrite: true
title: PersistIQ Destination
id: 5c75e3ca088b680001eb30fa
---
[PersistIQ](https://www.persistiq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the easiest sales engagement software to use. Sales teams use PersistIQ to connect with more prospects using targeted emails, calls, and tasks.

This destination is maintained by PersistIQ. For any issues with the destination, [contact the PersistIQ Support team](mailto:support@persistiq.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "PersistIQ" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find at the bottom of your [PersistIQ Integrations page](https://persistiq.com/app#/integrations).


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:
```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

You can pass in an `email` and `unsubscribed` (with a value of true) in an `identify` call. If the email address matches an email present in PersistIQ, that prospect will be marked as opted out. Here is an example of how to do that:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  unsubscribed: true
});
```
