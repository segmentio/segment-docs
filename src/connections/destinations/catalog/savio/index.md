---
rewrite: true
title: Savio Destination
---
[Savio](https://savio.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) enables B2B SaaS teams to centrally managed customer feedback so they can make better product decisions.

This destination is maintained by Savio. For any issues with the destination, please [reach out to their team](mailto:support@savio.io).

_**NOTE:** Savio is currently in beta, which means that they are still actively developing the product. This doc was last updated on February 22, 2019. If you are interested in joining their beta program or have any feedback to help improve the Savio Destination and its documentation, please [let  their team know](mailto:support@savio.io)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Savio" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Savio dashboard](https://savio.io/app/accounts/settings).


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com',
  name: 'John Doe',
  phone: '(555) 555-2219'
});
```

Identify calls will be sent to Savio creating a new `Person` if that person doesn't already exist in Savio.io. If an existing person with the corresponding `userId` already exists in Savio the person will be updated.

For the person to be created or updated the `userId` must be included. Identify calls with just the `anonymousId` are not processed.

Once created you will be able to associate the `Person` with feedback in the Savio UI.


## Group

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like:

```
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
});
```

Including the `plan` and `mrr` traits will allow you to filter feedback in Savio by plan and MRR.

```
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  plan: "enterprise",
  mrr: 99
});
```

Group calls will be sent to Savio creating a new `Company` if that company doesn't already exist in Savio. If an existing company with the corresponding `groupId` already exists in Savio the company will be updated.

In addition to creating or updating the company if an existing person with the associated `userId` is found in Savio that person will be linked to the matching company.

Once created you will be able to filter feedback based on companies, plans and MRR depending on the traits you send through.
