## Personas

You can send computed traits and audiences generated through [Segment Personas](/docs/personas/) to this destination as a **user property**. To learn more about Personas, contact us for a [demo](https://segment.com/demo).

For user-property destinations, an [identify](/docs/connections/spec/identify/) call will be sent to the destination for each user being added and removed. The property name will be the snake_cased version of the audience name you provide with a true/false value. For example, when a user first completes an order in the last 30 days, we will send an identify call with the property `order_completed_last_30days: true`, and when this user no longer satisfies we will set that value to `false`. 

When the audience is first created an identify call is sent for every user in the audience. Subsequent syncs will only send updates for those users which were added or removed since the last sync.
