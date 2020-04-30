---
title: Refiner Source
source-type: event
---
[Refiner](https://refiner.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a customer survey tool built specifically for SaaS, eCommerce and Membership sites. Ask your users any question while they are using your product with our beautiful & simple survey widgets - on brand and perfectly timed.

This source allows you to enrich your user profiles with  survey responses in leverage them in any tool connecteed to your Segment account.

This source is maintained by Refiner. For any issues with the source, please [contact Refiner Support](mailto:contact@refiner.io).

> success ""
> **Good to know**: This page is about the Leanplum Segment source, which sends data _into_ Segment. There's also a page about the [Leanplum Segment destination](https://segment.com/docs/connections/destinations/catalog/leanplum/), which receives data from Segment!

## Getting Started

1. From your Segment UI’s Sources page click on “Add Source”.
2. Search for "Refiner" within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the setup flow to "Add Source".
4. Copy the Write key from the Segment UI and log in to your Refiner account.
5. Navigate to Integrations >  Segment and paste the key to connect.

## Identify Call

Refiner issues an `identify` call each time a new survey is completed by a user, with the collected survey reponses parsed into the traits object of the call.

Each trait is prepended with `refiner_` so that you can easily identify them later. For example, the question `What is your job role?` in Refiner becomes `refiner_what_is_your_job_role` in the `identify` call.

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

You also have the option to define a custom property name for each question in Refiner's Survey Editor.

## Group Call

Refiner's internal data structure is based on `User` and `Account` entities, where one Account can have multiple Users.

Each answer given by a user is either attributed to the User directly or to their parent Account.

To mirror this behavior in Segment, Refiner issues a `group` call right after each `identify` call.

The `group` call will include all collected data which is linked to an account in Refiner, as well as the `userId` used in the `identify` call.

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

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If there are any issues with how the events are arriving to Segment, please [contact the support team](mailto:contact@refiner.io).

---
