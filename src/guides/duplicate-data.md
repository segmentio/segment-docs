---
title: Handling Duplicate Data
---

Segment has a special de-duplication service that sits just behind the `api.segment.com` endpoint, and attempts to drop duplicate data. However, that de-duplication service has to hold the entire set of events in memory in order to know whether or not it has seen that event already. Segment stores 24 hours worth of event `message_id`s. This means Segment can de-duplicate any data that appears within a 24 hour rolling window.

An important point to remember is that Segment de-duplicates on the event's `message_id`, _not_ on the contents of an event payload. So if you aren't generating `message_id`s for each event, or are trying to de-duplicate data over a longer period than 24 hours, Segment does not have a built-in way to de-duplicate data.

Since the API layer is de-duplicating during this window, duplicate events that are further than 24 hours apart from one another must be de-duplicated in the Warehouse. Segment also de-duplicates messages going into a Warehouse based on the `message_id`, which is the `id` column in a Segment Warehouse. Note that in these cases you will see duplications in end tools as there is no additional layer prior to sending the event to downstream tools.

Keep in mind that Segment's libraries all generate `message_id`s for you for each event payload, with the exception of the Segment HTTP API, which assigns each event a unique `message_id` when the message is ingested. You can override these default generated IDs and manually assign a `message_id` if necessary.
