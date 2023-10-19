---
title: Inflection Destination
id: 62260e5dbc37b83046a847be
---

[Inflection](https://www.inflection.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} provides a B2B marketing automation platform for product-led growth companies. Combining Segment data with CRM data to create a single view of the customer, Inflection was built with marketing teams in mind, pricing a platform that can drive hyper-contextualized communications to support adoption, expansion, and engagement.

This destination is maintained by Inflection. For any issues with the destination, [contact the Inflection Support team](mailto:support@inflection.io).

## Getting Started


1. From the Destinations catalog page in the Segment App, select **Inflection**.
2. Choose the Source from which events have to be sent to Inflection destination.
3. [Contact the Inflection Support team](mailto:support@inflection.io) and get an **API key** generated for your account.
4. Enter the **API Key** in the Inflection destination settings on Segment.
5. Once data starts flowing in from Segment to Inflection, the stats can be viewed on the Connections page on Inflection App.


## Supported methods

Inflection supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to Identify a user. The traits should have the `email` trait to be processed. All the other reserved traits are optional, but will be used to populate *Person DB* if available.
If a *Data Warehouse* is set to sync *Person DB* data to Inflection, the Identify call will be used only to map the `userId` to the `person.id` on Inflection app.
For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```


### Track

Send [Track](/docs/connections/spec/track) calls to be added to *Product Activity* on Inflection App. For example:

```js
analytics.track('Login Button Clicked')
```

### Group

Send [Group](/docs/connections/spec/group) calls to tie a user to an org. There are two IDs that are relevant in a group call: the userId, which belongs and refers to the user, and the groupId, which belongs and refers to the specific group.  A user can belong to multiple groups, each associated with a different groupId, but the user will have only one userId linked to each of these different groups.

```js
 analytics.group("0e8c78ea9d97a7b8185e8632", {
name: "Initech",
industry: "Technology",
employees: 329,
plan: "enterprise",
"total billed": 830
});
```