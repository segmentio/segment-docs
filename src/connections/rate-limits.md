---
title: Rate Limits and SLA
---
These rate limits were added to our product documentation on August 31, 2020.

## Inbound Data Ingestion API Rate Limit

If within a ten minute period a Customer's sources (in aggregate) send more than 60 million events (average of 100,000 events per second) without prior arrangement, Segment reserves the right to queue any additional events and process those at a rate that does not exceed 60 million events in any ten minute period.

## Outbound Downstream Destination Rate Limits

Most destinations have their own rate limits that Segment cannot control. In some instances, Segment is able to ingest and attempt to deliver data faster than the downstream destination is able to accept data. Outbound requests to a destination may also fail for other reasons outside of Segment's control. When requests to downstream destinations fail, Segment makes additional attempts to deliver the data (retries). However, when more than 1,000 requests per second to a downstream destination fail or when the failure rate for a downstream destination exceeds 50% for more than 72 hours, Segment reserves the right to reduce the number of retries until the condition is resolved.