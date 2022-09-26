## Engage

You can send computed traits and audiences created with [Engage](/docs/engage/) to this destination as a **user property**. 

For user-property destinations, Engage sends an [Identify call](/docs/connections/spec/identify/) to the destination for each user that is added or removed from an audience. The property name is the `snake_cased` version of the audience name you provide, with a boolean (`true`/`false`) value to indicate if they're a member of the audience. For example, when a user first completes an order in the last 30 days, Engage sends an identify call with the property `order_completed_last_30days: true`, and when this user no longer satisfies these criteria (if the user does not complete another order over 30 days) Engage sends another Identify call to set that value to `false`.

When Engage first creates the audience, it sends an Identify call for every user in the audience. Later syncs only update users which were added or removed since the last sync.
