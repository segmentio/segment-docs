---
title: "How does Segment handle duplicate data?"
---

Segment has a special de-duplication service that sits just behind the api.segment.com endpoint, and attempts to drop duplicate data. However, that de-duplication api has to hold the entire set of events in memory in order to know whether or not it has seen that event already. Segment will store 24 hours worth of event `message_id`'s. Effectively, this means Segment will de-duplicate data that appears inside a 24 hour sliding window.

An important point of stress about the above is that Segment de-duplicates on the event's `message_id`, not on the contents of an event payload. So unless you're generating `message_id`s for each event on your end, and trying duplicate data within a 24 hour period, Segment has no built-in mechanism to de-duplicate data.

Since the api layer is de-duping during this window, duplicate events that are further than 24 hours apart from one another will need to be de-duped in the Warehouse. Segment also dedupes messages going into a Warehouse based on the `message_id`, which is the `id` column in a Segment Warehouse. Note that in these cases you will see duplications in end tools as there is no additional layer prior to sending the event to downstream tools.

Keep in mind that Segment's libraries all generate `message_id`s for you for each event payload, with the exception of our HTTP API, which assigns each event a unique `message_id` when the message is ingested, although you could of course override and manually assign a `message_id` if you wanted.

### What identifiers can the merged profile be queried/updated with?"

Any of the external IDs can be used to query a profile. When a profile is requested, we will traverse the merge graph and resolve all merged profiles. The result is a single profile, with the latest state of all traits, events, and identifiers.
