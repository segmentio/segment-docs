---
title: Kana Destination
id: 62d130412ffed8c0b170560f
beta: true
---

[Kana](https://www.usekana.com/?utm_source=segment&utm_medium=docs){:target="_blank"} provides pricing infrastructure for internet businesses. This destination allows for a low-code integration of Kana, using Segment events to record the usage of your features in order to measure entitlement, gain insights and ensure customers are charged correctly.

This destination is maintained by Kana. For any issues with the destination, [contact the Kana team](mailto:team@usekana.com).

## Getting Started

 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Kana" in the Destinations Catalog, and select the "Kana" destination.
3. Choose which Source should send data to the "Kana" destination.
4. Go to the [API Key page](https://dashboard.usekana.com/developer){:target="_blank"} within the [Kana dashboard](https://dashboard.usekana.com){:target="_blank"}.
5. Copy the API Key from 'Admin API (Backend) Key'.
6. Enter the API Key in the Kana destination settings in Segment.


## Supported methods

Kana supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to create, update, merge and identify users in Kana.

```js
analytics.identify('userId123', {
  name: "John Doe",
  email: 'john.doe@example.com',
  billingId: 'cus_Lp1bSKob4laHDD'
});
```

Kana looks for the following traits in Identify events which map to [user fields in Kana](https://kana-1.gitbook.io/kana-docs/reference/admin-api-backend-reference/objects#user){:target="_blank"}:

| Field                  | Required?  | Description                                                                                                                     |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `userId`               | *Required* | Maps to the `id` of a user in Kana. This is the external identifier of your user.                                                |
| `traits.name`          | *Optional* | Maps to the `name` of a user in Kana.                                                                                           |
| `traits.email`         | *Optional* | Maps to the `email` of a user in Kana.                                                                                          |
| `traits.billingUserId` | *Optional* | Maps to the `billingId` of a user in Kana. Must be the customer `id` for either Stripe or Chargebee as valid billing providers. |

> warning ""
>  All other traits will be dropped as they do not map to a field in Kana.

#### Creating, updating or merging

Kana looks at the `userId` and `email` to determine when to create, update or merge a user. The `userId` takes precedence as the canonical identifier.  Kana allows for multiple users to have the same `email`. 

> info ""
> Users which were initially imported from Stripe may have no `userId` but could have an `email`. Kana will try update or merge these users when Segment events come in with an `email` that matches. However, in the event these users could not be merged (likely meaning there are multiple users with the same email and one was a Stripe import which has no `userId`), Kana will flag these users to you in the Kana dashboard. There will be two boxes - one calling out users without a `billingId` and one calling out users which have the same `email`. You will be able to merge or delete these users in case it's necessary.

[See more on how creating, updating and merging works](https://kana-1.gitbook.io/kana-docs){:target="_blank"}.

### Track

Send [Track](/docs/connections/spec/track) calls to Kana in order to record when a customer has used a particular feature. For example:

```js
analytics.track('Message Sent', {
  featureId: 'messages',
  delta: 1
});
```

Kana looks at all properties in Track events for [mapping rules](#mapping-rules). However, Kana considers the following properties to be special:

| Field                  | Required?  | Description                                                                                                                                                   |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `properties.featureId` | *Optional* | Used to map events to features directly. Should correspond to the `id` of a feature in Kana. Defaults to the any [mapping rules](#kana-rules) if not present. |
| `properties.delta`     | *Optional* | Used to record how much of a feature someone has used. Defaults to `1`.                                                                                       |

> warning ""
> Events sent in without a `userId` (aka. anonymous events) will be dropped and responded to with a `400 Bad Request` error.

### Mapping Rules
There are two ways to map Segment events to Kana features:

* Providing a `properties.featureId` field within a Segment event
* **Setting rules to map events to features within the Kana dashboard**

The latter can be used as a no-code solution (which also won't muddy data to other destinations), whereby Kana will look at incoming events and process them alongside rules you have defined to attribute them to features.

These rules can be created on the [Segment Integration page](https://dashboard.usekana.com/integrations/segment/rules){:target="_blank"} within the [Kana dashboard](https://dashboard.usekana.com){:target="blank"}. They can be set based on the name and properties of a track event with multiple AND conditions if required.

> info ""
>  All events will be sent from your source to Kana and stored there - no matter whether these will be used to record feature usage or not. Events which could not map to features are exposed within Kana. Any rules created afterwards will retroactively apply to these events, meaning events will reprocess against these new rules in an attempt to map them to features. If there are events you do not want to send to Kana (as they will never be used to record feature usage) then it's recommended that you [filter these events from sending](/docs/guides/filtering-data/).


[See more on how to setup rules in the Kana dashboard](https://kana-1.gitbook.io/kana-docs){:target="_blank"}.