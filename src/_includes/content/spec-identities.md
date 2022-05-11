The User ID is a unique identifier for the user performing the actions. Check out the [User ID docs](/docs/connections/spec/identify#user-id) for more detail.

The Anonymous ID can be any pseudo-unique identifier, for cases where you don't know who the user is, but you still want to tie them to an event. Check out the [Anonymous ID docs](/docs/connections/spec/identify#anonymous-id) for more detail.

**Note: In our browser and mobile libraries a User ID is automatically added** from the state stored by a previous [`identify`](/docs/connections/spec/identify/) call, so you do not need to add it yourself. They will also automatically handle Anonymous IDs under the covers.
