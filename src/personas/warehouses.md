---
title: Personas and Warehouses
---

## How does Personas sync to my data warehouse?
Personas provides a complete, up-to-date view of your users customer journey as it unfolds. We know that one of the best ways to understand this journey is through SQL in a Data Warehouses. With Personas, you can send Computed Traits and Audiences into your data warehouse like Redshift, BigQuery, or Snowflake. Common use cases include analysis & reporting around key customer audiences and campaigns, as well as inputs into predictive models.  

Segment makes it easy to load your customer profile data into a clean schema so your analysts can help answer some of your toughest business questions.

### Setup
When building an audience or computed trait, you can configure sending an identify call, a track call, and additionally include mobile ids to your data warehouse.

![](images/warehouse1.png)

#### Identify calls

If you chose an identify call, we will typically send one call per user. For audiences, we will include a boolean trait that matches the audience name. When a user enters an audience this will be true, and when a user exits an audience this will be false.

```
{
  "type": "identify",
  "userId": u123,
  "traits": {
     "first_time_shopper": true // false when a user exits the audience
  }
}
```

For computed traits, we will similarly send an identify call with the computed value for that trait.

```
{
  "type": "identify",
  "userId": u123,
  "traits": {
     "total_revenue_180_days": 450.00
  }
}
```

Similar to identify calls in Connections, these will be represented in your warehouse with two tables, `identifies` and `users`. The former contains a record of every identify call, whereas the latter contains one record per user_id with the latest value. The `personas_*` schema name is currently specific to the Personas space and cannot be modified. Additional audiences and computed traits will appear as additional columns in these tables.

`personas_default.identifies`

| user_id | first_time_shopper | total_revenue_180_days |
| ------- | ------------------ | ---------------------- |
| u123    | true               |                        |
| u123    |                    | 450.0                  |

`personas_default.users`

| user_id | first_time_shopper | total_revenue_180_days |
| ------- | ------------------ | ---------------------- |
| u123    | true               | 450.00                 |

#### Track calls

If you send audiences using track calls, by default Segment sends an `Audience Entered` event when a user enters, and an `Audience Exited` event when the user exits. (These event names are configurable.) Segment also sends two event properties about the audience: the `audience_key` is equivalent to the audience name you enter in the last configuration step, and that name also becomes the next key, and is populated with a boolean value, as in the `first_time_shopper` audience in the example below.

```
{
  "type": "track",
  "userId": u123,
  "event": "Audience Entered",
  "traits": {
     "audience_key": "first_time_shopper",
     "first_time_shopper": true
  }
}
```

Computed Traits work in a similar fashion, but instead Segment sends a  `Trait Computed` event by default, with a property containing the computed value. You can also customize this event.

![](images/warehouse2.png)

```
{
  "type": "track",
  "userId": u123,
  "event": "Trait Computed",
  "traits": {
     "trait_key": "total_revenue_180_days",
     "total_revenue_180_days": 450.00
  }
}
```

Similar to track calls in Connections, these are represented in your warehouse with one table per event name. For example, if you configure Audience Entered and Audience Exited events, and Trait Computed for computed traits, you would have the following tables in your warehouse:

`personas_default.audience_entered`

| user_id | audience_key       | first_time_shopper |
| ------- | ------------------ | ------------------ |
| u123    | first_time_shopper | true               |

`personas_default.audience_exited`

| user_id | audience_key       | first_time_shopper |
| ------- | ------------------ | ------------------ |
| u123    | first_time_shopper | false              |

`personas_default.trait_computed`

| user_id | total_revenue_180_days | trait_key              |
| ------- | ---------------------- | ---------------------- |
| u123    | 450.00                 | total_revenue_180_days |

#### Sync Frequency

Although Personas can compute audiences and traits in realtime, they are still subject to the sync schedule your warehouses plan allows, typically hourly. You can check the warehouse sync history to see details about past and upcoming syncs. You will see a source with the `personas_` prefix that syncs the audiences and computed traits you connect to a warehouse.

![](images/warehouse3.png)


## Common Questions

### Can I disable a table, computed trait, or audience from syncing from my warehouse?

Yes! You can use [Warehouses Selective Sync](https://segment.com/docs/connections/warehouses/faq/#can-i-control-what-data-is-sent-to-my-warehouse/) to manage which traits, audiences, and tables get synced from Personas.

### Why are some users missing from the `users` table?

The users table is an aggregated view based on the `user_id` field. This means that anonymous profiles with just an `anonymous_id` identifier will not get aggregated into this view. You can still view identify calls for anonymous audiences and computed traits in the `identifies` table.

### Can I sync the identities table to my warehouse?

Not yet. We're working on this feature, and if you're interested please let your CSM know or get in touch with us [here](https://segment.com/help/contact/).
