---
rewrite: true
title: EnjoyHQ Destination
id: 5fb411aeff3f6d1023f2ae8d
---
[EnjoyHQ](https://getenjoyhq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps UX and product teams learn from customers faster by streamlining their customer research process. EnjoyHQ makes it easy to centralize, organize and share all their customer insights and user research data in one place.


This destination is maintained by EnjoyHQ. For any issues with the destination, [contact the EnjoyHQ support team](mailto:support@getenjoyhq.com).

> note "Note:"
> The EnjoyHQ Destination is currently in beta, which means that they are still actively developing the destination. To join their beta program, or if you have any feedback to help improve the EnjoyHQ Destination and its documentation, [contact the EnjoyHQ support team](mailto:support@getenjoyhq.com)!


## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "EnjoyHQ" in the Destinations Catalog, and select the EnjoyHQ destination.
3. Choose which Source should send data to the EnjoyHQ destination.
4. Go to the [EnjoyHQ's integrations page](https://app.enjoyhq.com/account/integrations), find Segment and create a new API key.
5. Enter the API Key in the EnjoyHQ destination settings in the Segment web app.



## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  age: 37,
  role: "admin",
  "company.name" : "Umbrella Corp",
  "company.number of employees" : 120
  }
});
```

Segment sends Identify calls to EnjoyHQ as an `identify` event. These events can create or update an existing customer profile with a matching email address. Data imported using Segment Identify calls [is merged with the data already stored in your EnjoyHQ account](https://documentation.getenjoyhq.com/article/v9liiusghf-customer-profiles#how_is_customer_data_merged).

You can find profiles connected to at least one document in the **People tab** using the global search. You can also find any profile (connected or not) when you [associate a customer with a piece of feedback](https://documentation.getenjoyhq.com/article/v9liiusghf-customer-profiles#assigning_customers_to_documents).

> note "Note:"
> The EnjoyHQ destination only accepts Identify calls if they contain a correctly formed email address in the "email" field. Otherwise, the event is ignored and is not forwarded to EnjoyHQ.
