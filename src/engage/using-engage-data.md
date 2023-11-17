---
title: Using Engage Data
plan: engage-foundations
redirect_from:
  - "/personas/using-personas-data"
---
You can send your Computed Traits and Audiences to your Segment Destinations, which allows you to personalize messages across channels, optimize ad spend, and improve targeting. This page provides an overview of different ways to activate Engage data in Segment Destinations.

<!-- TODO: image here? -->

> success ""
> You can also use the [Profile API](/docs/unify/profile-api/) to activate Engage data programmatically.

## Engage Destination types: Event vs. List

There are two ways to send data to Engage Destinations: as **Events** and as **Lists**.

**Event Destinations** receive data one by one, on a streaming basis as *events*, which are behaviors or traits tied to a user and a point in time. Every time a piece of data (such as a track event or identify call) is received in Segment — for example, from your website or your mobile app — Segment then sends this piece of data to the Destination right away.

**List Destinations** periodically receive data in batches, and these batches contain lists of users. In most cases, Segment sends data to a list destination every hour, and sends all data accumulated since the last batch was sent.

Some Destinations, such as Salesforce Marketing Cloud have both “event” and “list” destination types that you can use.

**Engage sends computed traits and audiences to destinations in different ways depending on whether the destination is an Event or List type**:

- [Computed Traits](/docs/engage/audiences/computed-traits/) are always sent to Event destinations either using an identify call for user traits, a group call for account-level computed traits, or a track event.

- With [Audiences](/docs/engage/audiences/), Engage sends the audience either as a boolean (true or false) _user property_ to Event Destinations, or as a _user list_ to List Destinations. If you are a B2B company creating account audiences (where each account represents a group of users, like employees at a business) and sending them to list destinations, Engage sends the list of all users within an account that satisfies the audience criteria.


### Event Destinations


**Event Destinations and Computed traits**
Computed traits can only be sent to Event destinations.
When Engage sends a computed trait to an Event destination, it uses an identify call to send user traits, or a group call to send account-level computed traits.

**Event Destinations and Audiences**

- **`identify` call as a user trait**. When you use identify calls, the trait name is the snake_cased version of the audience name you provided, and the value is “true” if the user is part of the audience. For example, when a user first completes an order in the last 30 days, Segment sends an identify call with the property `order_completed_last_30days: true`, and when this user no longer satisfies that criteria (for example if 30 days elapses and they haven't completed another order), Segment sets that value to `false`.
- **`track` call as two events**: `Audience Entered` and `Audience Exited`, with the event property `order_completed_last_30days` equal to true and false, respectively.

Segment sends an identify or track call for every user in the audience when the audience is first created. Later syncs only send updates for those users who were added or removed from the audience since the last sync.

Most destinations require that you configure a column in your schema to receive the audience data, however, some destinations (like Braze and Iterable) allow you to send audiences without doing this. This depends on the individual destination, so consult the destination's documentation for details.


### List Destinations

List destinations can only receive Audiences, and cannot receive computed traits.

- **User-Level Audiences**: a list of users that belong to an audience
- **Account-Level Audiences**: a list of users within an account that satisfy the audience criteria

When syncing to a list destination Engage uploads lists of users directly to the destination. When you first create an audience, Segment uploads the entire list of audience users to the destination. Later syncs only upload the users that have been added or removed since the last sync.

User-list destinations can have individual limits on how often Segment can sync with them. For example, an AdWords audience is updated once every six hours or more, because that's what AdWords recommends.


## What do the payloads look like for Engage data?

The payloads sent from your Engage space to your destinations will be different depending on if you configured the destination to receive identify or track calls, and whether the payload is coming from a computed trait or audience. As a reminder, identify calls usually update a trait on a user profile or table, whereas track calls send a point-in-time event that can be used as a campaign trigger or a detailed record of when a user's audience membership or computed trait value was calculated.

To view the events generated by an Engage Space's audience or computed traits, navigate to **Unify settings > Debugger** and view the list of sources that are configured to generate events per [each destination instance](/docs/engage/warehouses/#why-are-there-multiple-schemas-prefixed-with-engage_-in-my-warehouse-when-i-only-have-one-space:~:text=Segment%20currently%20can,schemas%20than%20spaces.). Each source will only generate events to connected destinations. From the source's Debugger tab, you'll find the most recent events generated by that source per the connected destinations' audiences and computed traits. 

In the full json body of an audience, computed trait, or journey, you'll find specific details under the `context.personas` object. These fields can be useful when building out [Destination Filters](/docs/connections/destinations/destination-filters/), [Actions destination mappings](/docs/connections/destinations/actions/#set-up-a-destination-action), and [Functions](/docs/connections/functions/).

The integrations object in the payload displays as `{"All" : false,}` and only lists some destinations. This is due to the fact that each source has multiple destinations connected while each audience/trait may only have a subset of destinations connected to it. See [Filtering with the Integrations Object](/docs/guides/filtering-data/#filtering-with-the-integrations-object) for more information. The integrations object routing specific events to its specified destinations is also why a destination's [Delivery Overview](/docs/connections/delivery-overview/) tab will show a large number of events under the [Filtered at destination](/docs/connections/delivery-overview/#:~:text=Filtered%20at%20destination%3A%20Events,will%20be%20filtered%20out.) box, as that destination will only receive the events intended to be sent to it by audiences, traits, or journeys that are connected to that specific destination.

### Computed Trait generated events

`Identify` events generated by a Computed Trait have the trait name set to the Computed Trait value:

```js
{
  "context": {
    "personas": {
      "computation_class": "trait", // the type of computation
      "computation_id": "tra_###", // the trait's id found in the URL
      "computation_key": "aud_###", // the configured trait key that appears on user profile
      "namespace": "spa_###", // the Engage Space's ID
      "space_id": "spa_###" // the Engage Space's ID
    }
  },
  "type": "identify",
  "userId": "u123",
  "traits": {
     "total_revenue_180_days": 450.00
  }
}
```

`Track` events generated by a Computed Trait have a key for the trait name, and a key for the Computed Trait value. The default event name is `Trait Computed`, but you can change it.

```js
{
  "context": {
    "personas": {
      "computation_class": "trait", // the type of computation
      "computation_id": "tra_###", // the trait's id found in the URL
      "computation_key": "aud_###", // the configured trait key that appears on user profile
      "namespace": "spa_###", // the Engage Space's ID
      "space_id": "spa_###" // the Engage Space's ID
    }
  },
  "type": "track",
  "event": "Trait Computed",
  "userId": "u123",
  "properties": {
     "trait_key": "total_revenue_180_days",
     "total_revenue_180_days": 450.00
  }
}
```

Engage only sends events to the destination if the Computed Trait value has changed for the user. Engage doesn't send a payload for every user in your trait every time the trait computes.

### Audience generated events

`Identify` events generated by an Audience have the Audience key set to `true` or `false` based on whether the user is entering or exiting the audience:

```js
{
  "context": {
    "personas": {
      "computation_class": "audience", // the type of computation
      "computation_id": "aud_###", // the audience's id found in the URL
      "computation_key": "aud_###", // the configured audience key that appears on user profile
      "namespace": "spa_###", // the Engage Space's ID
      "space_id": "spa_###" // the Engage Space's ID
    }
  },
  "type": "identify",
  "userId": "u123",
  "traits": {
     "first_time_shopper": true // false when a user exits the audience
  }
}
```

`Track` events generated by an Audience have a key for the Audience name, and for the Audience value:

```js
{
  "context": {
    "personas": {
      "computation_class": "audience", // the type of computation
      "computation_id": "aud_###", // the audience's id found in the URL
      "computation_key": "aud_###", // the configured audience key that appears on user profile
      "namespace": "spa_###", // the Engage Space's ID
      "space_id": "spa_###" // the Engage Space's ID
    }
  },
  "type": "track",
  "userId": "u123",
  "event": "Audience Entered", // "Audience Exited" when a user exits an audience
  "properties": {
     "audience_key": "first_time_shopper",
     "first_time_shopper": true // false when a user exits the audience
  }
}
```

### Journey generated events
_See [this doc](https://segment.com/docs/engage/journeys/send-data/#what-do-i-send-to-destinations) for more information on Journeys events._
`Track` events generated by a journey have a key for the journey name "audience_key", and a key for the journey value:

```js
{
  "context": {
    "personas": {
      "computation_class": "audience", // the type of computation
      "computation_id": "aud_###", // the audience's id found in the URL
      "computation_key": "j_o_###", // the configured journey key that appears on user profile
      "namespace": "spa_###", // the Engage Space's ID
      "space_id": "spa_###" // the Engage Space's ID
    }
  },
  "type": "track",
  "userId": "u123",
  "event": "Audience Entered", // "Audience Exited" when a user exits an audience
  "properties": {
     "audience_key": "j_o_###",
     "recent_buyer": true // false when a user exits the journey
  }
}
```

`Identify` events generated by a Journey have the Journey key set to `true` or `false` based on whether the user is entering or exiting the Journey:

```js
{
  "context": {
    "personas": {
      "computation_class": "audience", // the type of computation
      "computation_id": "aud_###", // the audience's id found in the URL
      "computation_key": "j_o_###", // the configured journey key that appears on user profile
      "namespace": "spa_###", // the Engage Space's ID
      "space_id": "spa_###" // the Engage Space's ID
    }
  },
  "type": "identify",
  "userId": "u123",
  "traits": {
     "recent_buyer": true // false when a user exits the journey
  }
}
```


## Additional identifiers

Engage has a flexible identity resolution layer that allows you to build user profiles based on multiple identifiers like `user_id`, `email`, or `mobile advertisingId`. However, different destinations may require different keys, so they can do their own matching and identification. For example, Zendesk requires that you include the `name` property.
Engage includes logic to automatically enrich payloads going to these destinations with the required keys.

If you send events to a destination that requires specific enrichment Segment doesn't already include, [contact Segment](https://segment.com/help/contact/){:target="_blank"}, and we‘ll do our best to address it.

> info ""
> Profiles with multiple identifiers (for example, `user_id` and `email`) will trigger one API call per identifier when the audience or computed trait is first synced to a destination.


## Multiple identifiers of the same type

You might also see that profiles that have multiple values for the same `external_id` type, for example a profile might have multiple email addresses. When this happens, Engage sends one event per email for each audience or computed trait event. This ensures that all downstream email-based profiles receive the complete audience or computed trait.

In some situations this behavior might cause an unexpected volume of API calls. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} if you have a use case which calls for an exemption from this default behavior.

## New external identifiers added to a profile

There are two situations when Engage sends an audience or computed trait to a destination.

The first is when the value of the trait or audience changes.

The second, less common case is that Engage re-syncs an audience or computed trait when a new `external_id` is added to a profile. For example, an ecommerce company has an anonymous visitor with a computed trait called `last_viewed_category = 'Shoes'`. That visitor then creates an account and an email address is added to that profile, even though the computed trait value hasn't changed. When that email address is added to the profile, Engage re-syncs the computed trait that includes an email to downstream tools. This allows the ecommerce company to start personalizing the user's experience from a more complete profile.

[Contact Segment](https://segment.com/help/contact/){:target="_blank"} if you don't want computed traits or audiences to re-sync when the underlying trait or value hasn't changed.


## Rate limits on Engage Event Destinations

Many Destinations have strict rate limits that prevent Segment (and other partners) from sending too much data to a Destination at one time. Engage caps the number of requests per second to certain Destinations to avoid triggering rate limits that would cause data to be dropped. The most common scenario when customers run into rate-limits is when Engage first tries to sync a large set of historical users. Once this initial sync is done, we rarely run into rate-limit issues.

For additional information on Destination-specific rate limits, check the documentation for that Destination. If you need a higher rate limit, [let Segment know](https://segment.com/contact){:target="_blank"} which Destination you need it for and why.

| **Destination**                  | **Requests Per Second**                |
| -------------------------------- | -------------------------------------- |
| Braze                            | 100                                    |
| Customer.io                      | 30                                     |
| Hubspot                          | 5 obj/second (2 calls send per object) |
| Intercom                         | 8                                      |
| Iterable                         | 500                                    |
| Mailchimp                        | 10                                     |
| Marketo                          | 5                                      |
| Marketo Static Lists             | 5                                      |
| Pardot                           | 2                                      |
| Resci                            | 200                                    |
| Responsys                        | 3                                      |
| Responsys Batch                  | 3                                      |
| Sendgrid                         | 100                                    |
| Sendgrid Lists                   | 100                                    |
| Salesforce                       | 5                                      |
| Salesforce Marketing Cloud       | 20                                     |
| Salesforce Marketing Cloud Lists | 20                                     |
| Zendesk                          | 50                                     |



## Syncing data to a new Destination for the first time


When you create a new Computed Trait or Audience in Engage, you can choose to calculate it either using all the available historical data from your Segment implementation, or only using data that arrives after you set up the trait or audience. By default, Segment opts to include historical data. Afterwards, Segment only sends updates to that destination.

> success ""
> **Why would I disable historical data?** You might want to disable historical data if you're sending a triggered campaign. For example, if you want to send an email confirming a purchase, you _probably_ don't want to email users who bought something months ago, but you *do* want to target current users as they make purchases (and thus enter the audience).

> warning ""
> The Facebook Custom Audiences Website destination does not accept historical data, and so only uses data from after the moment you configure it.

> info ""
> Use the [Engage settings](/docs/engage/settings/#destinations-settings){:target="_blank"} to add a destination to your Engage space.

## Engage compatible Destinations: Event type

Connect any Cloud-mode destination that supports Identify or Track calls to Engage as an event type destination.

## Engage compatible Destinations: List type

- [Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/)
- [Google Ads Remarketing Lists](/docs/connections/destinations/catalog/adwords-remarketing-lists/)
- [Google Display & Video 360](/docs/connections/destinations/catalog/personas-display-video-360/)
- [Snapchat Audiences](/docs/connections/destinations/catalog/snapchat-audiences/)
- [Pinterest Audiences](/docs/connections/destinations/catalog/pinterest-audiences/)
- [Marketo Static Lists](/docs/connections/destinations/catalog/marketo-static-lists/)
- [Responsys](/docs/connections/destinations/catalog/responsys/)
