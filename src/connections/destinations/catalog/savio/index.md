---
rewrite: true
title: Savio Destination
id: 5c6ddad405424a0001ecff86
---
[Savio](https://savio.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) enables B2B SaaS teams to centrally manage customer feedback so they can make better product decisions.

This destination is maintained by Savio. For any issues with the destination, [contact the Savio Support team](mailto:support@savio.io).

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Savio" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Savio dashboard](https://www.savio.io/app/accounts/integration-settings).


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  name: 'John Doe',
  phone: '(555) 555-2219'
});
```

Identify calls will be sent to Savio creating a new `Person` if that person doesn't already exist in Savio.io. If an existing person with the corresponding `userId` already exists in Savio the person will be updated.

For the person to be created or updated the `userId` must be included. Identify calls with just the `anonymousId` are not processed.

Once created you will be able to associate the `Person` with feedback in the Savio UI.


## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

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
