---
title: Refiner Source
source-type: event
id: 4pJ1eVPRnJ
---
{% include content/source-region-unsupported.md %}

[Refiner](https://refiner.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a customer survey tool built specifically for SaaS, eCommerce and Membership sites. Ask your users any question while they are using your product with Refiner's beautiful and simple survey widgets - on brand and perfectly timed.

This source allows you to enrich user profiles with survey responses and use them in any tool connected to your Segment account.

This source is maintained by Refiner. For any issues with the source, [contact Refiner Support](mailto:contact@refiner.io).

> success ""
> **Good to know**: This page is about the Refiner Segment source, which sends data _into_ Segment. There's also a page about the [Refiner Segment destination](https://segment.com/docs/connections/destinations/catalog/refiner/), which receives data from Segment!

## Getting Started

1. From your Segment UI's Sources page click on “Add Source”.
2. Search for "Refiner" within the Sources Catalog and click **Connect** to confirm.
3. Give the Source a nickname and follow the set-up flow to "Add Source".
4. Copy the Write key from the Segment UI and log in to your Refiner account.
5. In Refiner, navigate to **Integrations >  Segment** and paste the write key to connect.

## Identify Call

Refiner sends an `identify` call each time a user completes a new survey, and includes the collected survey responses parsed into the `traits` object of the call.

Each trait is prepended with `refiner_` so you can easily identify them. For example, the question `What is your job role?` in Refiner becomes `refiner_what_is_your_job_role` in the `identify` call.

An example `identify` call:

```js
{
  "type": "identify",
  "traits": {
    "refiner_email": "john.doe@example.com",
    "refiner_how_big_is_your_team": "10+",
    "refiner_what_is_your_job_role": "CEO",
  },
  "userId": "your-user-id"
}
```

You can also define a custom property name for each question in Refiner's Survey Editor.

## Group Call

Refiner's internal data structure is based on `User` and `Account` entities, where one Account can have multiple Users.

Each answer given by a user is either attributed to the User directly, or to their parent Account.

To mirror this behavior in Segment, Refiner sends a `group` call right after each `identify` call.

The `group` call includes all collected data which is linked to an account in Refiner, as well as the `userId` used in the `identify` call.

A `group` call issued by Refiner could look like this:

```js
{
  "type": "group",
  "groupId": "your-account-id",
  "userId": "your-user-id"
  "traits": {
    "refiner_employee_count": "1000+",
    "refiner_industry": "acounting"
  }
}
```

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are appearing as expected, and that they contain all of the properties you expect. If your events and properties don't appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If you see any issues with how the events are arriving to Segment, [contact the Refiner support team](mailto:contact@refiner.io).
