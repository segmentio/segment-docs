{% assign currentSlug = page.url | split: "/" | last %}
{% assign currentIntegration = site.data.catalog.sources.items | where: "slug", currentSlug | first %}

### Other common errors

If you are experiencing data loss from your {{ currentIntegration.display_name }} source, you may be experiencing one or more of the following common errors:

- **Payload is too large**: If you attempt to send events larger than 32KB per normal API request or batches of events larger than 500KB per request, Segment’s tracking API responds with `400 Bad Request`. Try sending smaller events (or smaller batches) to correct this error.

- **Identifier is not present**: Segment's tracking API requires that each payload has a `userId` and/or `anonymousId`. If you send events without either the `userId` or `anonymousId`, Segment's tracking API responds with an `no_user_anon_id` error. Check the event payload and client instrumentation for more details. 

- **Track event is missing name**: All Track events to Segment must have a name in string format.

- **Event dropped during deduplication**: Segment automatically adds a `messageId` field to all payloads and uses this value to deduplicate events. If you're manually setting a `messageId` value, ensure that each event has a unique value. 

- **Incorrect credentials**: Double check your credentials for your downstream destination(s).

- **Destination incompatibility**: Make sure that the destination you are troubleshooting can accept server-side API calls. You can see compatibility information on the [Destination comparison by category](/docs/connections/destinations/category-compare/) page and in the documentation for your specific destination.

- **Destination-specific requirements**: Check out the [destination's documentation](/docs/connections/destinations/) to see if there are other requirements for using the method and destination that you're trying to get working.