---
title: Product Limits
---
These limits were updated on February 22, 2023.

## Event properties ingestion limit

Events ingested by Segment have a limit of **10,000** properties per individual event received. For example, two Track events named "Page Viewed" and "Signup completed" each have their own limit. Segment will not persist properties beyond this limit, and will drop any corresponding values.

## Inbound data ingestion API rate limit

If any sources send more than 20,000 events per second in a workspace without prior arrangement, Segment reserves the right to queue any additional events and process those at a rate that doesn't exceed this limit.

> warning "Engage rate limit"
> Engage has a limit of 1,000 events per second for inbound data. Visit the [Engage Default Limits documentation](/docs/engage/product-limits/) to learn more.

## Outbound downstream destination rate limits

Most destinations have their own rate limits that Segment cannot control. In some instances, Segment is able to ingest and attempt to deliver data faster than the downstream destination is able to accept data. Outbound requests to a destination may also fail for other reasons outside of Segment's control. When requests to downstream destinations fail, Segment makes additional attempts to deliver the data (retries). However, when more than 1,000 requests per second to a downstream destination fail or when the failure rate for a downstream destination exceeds 50% for more than 72 hours, Segment reserves the right to reduce the number of retries until the condition is resolved.