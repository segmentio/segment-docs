---
title: Limits
---

These rate limits were added to our product documentation on December 9, 2020.

## Summary of Limits

| Name                                        | Limit                                                       |
| ------------------------------------------- | ----------------------------------------------------------- |
| Inbound Data Throughput                     | 1000 events per second                                      |
| Inbound Historical Replay Throughput        | 1000 events per second                                      |
| Outbound Downstream Destination Rate Limits | Reduced retries when failures exceed 1000 events per second |
| Profile API throughput                      | 100 requests per second                                     |

## Inbound Data Throughput

If within a ten minute period a Customer’s sources (in aggregate) send more than 600,000 events (average of 1,000 events per second) without prior arrangement, Segment reserves the right to queue any additional events and process those at a rate that does not exceed 600,000 events in any ten minute period. Any requests to raise that limit must be made in writing with Segment. Please reach out to friends@segment.com with details on your use case and estimated throughput.

## Inbound Historical Replay Throughput

Similar to live data ingestion, any requests to replay historical customer data into Personas will be capped at a rate of 1000 events per second. Replays are initiated by the Segment support team. If you have a need for a higher replay throughput, please reach out to friends@segment.com with details on your use case.

## Outbound Downstream Destination Rate Limits

Most destinations have their own rate limits that Segment cannot control. In some instances, Segment is able to ingest and attempt to deliver data faster than the downstream destination is able to accept data. Outbound requests to a destination may also fail for other reasons outside of Segment’s control. When requests to downstream destinations fail, Segment makes additional attempts to deliver the data (retries). However, when more than 1,000 requests per second to a downstream destination fail or when the failure rate for a downstream destination exceeds 50% for more than 72 hours, Segment reserves the right to reduce the number of retries until the condition is resolved.

## Profile API throughput

If a Customer sends more than 100 requests a second per space to the Profile API, Segment will return a 429 rate-limiting error. Any requests to raise that limit must be made in writing with Segment. Please reach out to friends@segment.com with details on your use case and estimated throughput.
