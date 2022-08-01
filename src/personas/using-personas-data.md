---
title: Using your Personas data
redirect_from: '/personas/activation/'
---




You can send your Personas Computed Traits and Audiences to your Segment Destinations, which allows you to personalize messages across channels, optimize ad spend, and improve targeting. This page provides an overview of different ways to activate Personas data in Segment Destinations.

<!-- TODO: image here? -->

> success ""
> **Tip!** You can also use the [Personas Profile API](/docs/personas/profile-api/) to activate Personas data programmatically.


## Personas Destination types: Event vs. List

There are two ways to send data to Personas Destinations: as **Events** and as **Lists**.

**Event Destinations** receive data one by one, on a streaming basis as *events*, which are behaviors or traits tied to a user and a point in time. Every time a piece of data (such as a track event or identify call) is received in Segment — for example, from your website or your mobile app — Segment then sends this piece of data to the Destination right away.

**List Destinations** periodically receive data in batches, and these batches contain lists of users. In most cases, Segment sends data to a list destination every hour, and sends all data accumulated since the last batch was sent.

Some Destinations, such as Salesforce Marketing Cloud have both “event” and “list” destination types that you can use.

**Personas sends computed traits and audiences to destinations in different ways depending on whether the destination is an Event or List type**:

- [Computed Traits](/docs/personas/computed-traits/) are always sent to Event destinations either using an identify call for user traits, a group call for account-level computed traits, or a track event.

- With [Audiences](/docs/personas/audiences/), Personas sends the audience either as a boolean (true or false) _user property_ to Event Destinations, or as a _user list_ to List Destinations. If you are a B2B company creating account audiences (where each account represents a group of users, like employees at a business) and sending them to list destinations, Personas sends the list of all users within an account that satisfies the audience criteria.


### Event Destinations

<!-- TODO: add link when we have a real chartHere's a list of [Chart of Personas Event Destinations](/docs/connections/destinations/cmodes-compare/) -->

**Event Destinations and Computed traits**
Computed traits can only be sent to Event destinations.
When Personas sends a computed trait to an Event destination, it uses an identify call to send user traits, or a group call to send account-level computed traits.

**Event Destinations and Audiences**

- **`identify` call as a user trait**. When you use identify calls, the trait name is the snake_cased version of the audience name you provided, and the value is “true” if the user is part of the audience. For example, when a user first completes an order in the last 30 days, Segment sends an identify call with the property `order_completed_last_30days: true`, and when this user no longer satisfies that criteria (for example if 30 days elapses and they haven't completed another order), Segment sets that value to `false`.
- **`track` call as two events**: `Audience Entered` and `Audience Exited`, with the event property `order_completed_last_30days` equal to true and false, respectively.

Segment sends an identify or track call for every user in the audience when the audience is first created. Later syncs only send updates for those users who were added or removed from the audience since the last sync.

Most destinations require that you configure a column in your schema to receive the audience data, however, some destinations (like Braze and Iterable) allow you to send audiences without doing this. This depends on the individual destination, so consult the destination's documentation for details.


### List Destinations

<!-- TODO: add link when we have a real chart Here's a list of List Destinations: [Chart of Personas List Destinations](/docs/connections/destinations/cmodes-compare/)-->

List destinations can only receive Audiences, and cannot receive computed traits.

- **User-Level Audiences**: a list of users that belong to an audience
- **Account-Level Audiences**: a list of users within an account that satisfy the audience criteria

When syncing to a list destination Personas uploads lists of users directly to the destination. When you first create an audience, Segment uploads the entire list of audience users to the destination. Later syncs only upload the users that have been added or removed since the last sync.

User-list destinations can have individual limits on how often Segment can sync with them. For example, an AdWords audience is updated once every six hours or more, because that's what AdWords recommends.


## What do the payloads look like for Personas data?

The payloads sent from your Personas space to your destinations will be different depending on if you configured the destination to receive identify or track calls, and whether the payload is coming from a computed trait or audience. As a reminder, identify calls usually update a trait on a user profile or table, whereas track calls send a point-in-time event that can be used as a campaign trigger or a detailed record of when a user's audience membership or computed trait value was calculated.

### Computed Trait generated events

`Identify` events generated by a computed trait have the trait name set to the computed trait value:

```js
{
  "type": "identify",
  "userId": u123,
  "traits": {
     "total_revenue_180_days": 450.00
  }
}
```

`Track` events generated by a computed trait have a key for the trait name, and a key for the computed trait value. The default event name is `Trait Computed`, but you can change it.

```js
{
  "type": "track",
  "event": "Trait Computed",
  "userId": u123,
  "properties": {
     "trait_key": "total_revenue_180_days",
     "total_revenue_180_days": 450.00
  }
}
```

Personas only sends events to the destination if the computed trait value has changed for the user. Personas doesn't send a payload for every user in your trait every time the trait computes.

### Audience generated events

`Identify` events generated by an audience have the audience key set to `true` or `false` based on whether the user is entering or exiting the audience:

```js
{
  "type": "identify",
  "userId": u123,
  "traits": {
     "first_time_shopper": true // false when a user exits the audience
  }
}
```

`Track` events generated by an audience have a key for the audience name, and a key for the audience value:

```js
{
  "type": "track",
  "userId": u123,
  "event": "Audience Entered", // "Audience Exited" when a user exits an audience
  "properties": {
     "audience_key": "first_time_shopper",
     "first_time_shopper": true // false when a user exits the audience
  }
}
```



## Additional identifiers

Personas has a flexible identity resolution layer that allows you to build user profiles based on multiple identifiers like `user_id`, `email`, or `mobile advertisingId`. However, different destinations may require different keys, so they can do their own matching and identification. For example, Zendesk requires that you include the `name` property.
Personas includes logic to automatically enrich payloads going to these destinations with the required keys.

If you send events to a destination that requires specific enrichment Segment doesn't already include, [contact Segment](https://segment.com/help/contact/){:target="_blank"}, and we‘ll do our best to address it.

> note ""
> **Note**: Profiles with multiple identifiers (for example, `user_id` and `email`) will trigger one API call per identifier when the audience or computed trait is first synced to a destination.


## Multiple identifiers of the same type

You might also see that profiles that have multiple values for the same `external_id` type, for example a profile might have multiple email addresses. When this happens, Personas sends one event per email for each audience or computed trait event. This ensures that all downstream email-based profiles receive the complete audience or computed trait.

In some situations this behavior might cause an unexpected volume of API calls. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} if you have a use case which calls for an exemption from this default behavior.

## New external identifiers added to a profile

There are two situations when Personas sends an audience or computed trait to a destination.

The first is when the value of the trait or audience changes.

The second, less common case is that Personas re-syncs an audience or computed trait when a new `external_id` is added to a profile. For example, an ecommerce company has an anonymous visitor with a computed trait called `last_viewed_category = 'Shoes'`. That visitor then creates an account and an email address is added to that profile, even though the computed trait value hasn't changed. When that email address is added to the profile, Personas re-syncs the computed trait that includes an email to downstream tools. This allows the ecommerce company to start personalizing the user's experience from a more complete profile.

If this behavior, re-syncing a computed trait or audience when the underlying trait or audience value hasn't changed, isn't desired in your system, [contact Segment](https://segment.com/help/contact/){:target="_blank"}.


## Rate limits on Personas Event Destinations

Many Destinations have strict rate limits that prevent Segment (and other partners) from sending too much data to a Destination at one time. Personas caps the number of requests per second to certain Destinations to avoid triggering rate limits that would cause data to be dropped. The most common scenario when customers run into rate-limits is when Personas first tries to sync a large set of historical users. Once this initial sync is done, we rarely run into rate-limit issues.

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


When you create a new Computed Trait or Audience in Personas, you can choose to calculate it either using all the available historical data from your Segment implementation, or only using data that arrives after you set up the trait or audience. By default, Segment opts to include historical data. Afterwards, Segment only sends updates to that destination.

> success ""
> **Why would I disable historical data?** You might want to disable historical data if you're sending a triggered campaign. For example, if you want to send an email confirming a purchase, you _probably_ don't want to email users who bought something months ago, but you *do* want to target current users as they make purchases (and thus enter the audience).

**Note**: The Personas Facebook Custom Audiences Website destination does not accept historical data, and so only uses data from after the moment you configure it.

## Personas compatible Destinations: Event type

Connect any Cloud-mode destination that supports Identify or Track calls to Personas as an event type destination.

## Personas compatible Destinations: List type

- [Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/)
- [Google Ads Remarketing Lists](/docs/connections/destinations/catalog/adwords-remarketing-lists/)
- [Google Display & Video 360](/docs/connections/destinations/catalog/personas-display-video-360/)
- [Snapchat Audiences](/docs/connections/destinations/catalog/snapchat-audiences/)
- [Pinterest Audiences](/docs/connections/destinations/catalog/pinterest-audiences/)
- [Marketo Static Lists](/docs/connections/destinations/catalog/marketo-static-lists/)
- [Responsys](/docs/connections/destinations/catalog/responsys/)
