---
title: Rate Limits and SLA
---
Segment limits the number of both inbound and outbound requests in order to ensure overall system stability.

## Inbound Data Ingestion API Rate Limit

Segment allows customer sources to send up to 60,000,000 events within any 10 minute period (an average of 100,000 events per second). If, without prior arrangement, Segment reserves the right to queue any events that exceeed this threshold, and process those at a rate that does not exceed 60,000,000 events in a 10 minute period.

## Outbound Downstream

Most destinations have their own rate limits that are outside of Segment's control. In some instances, Segment can inngest and attempt to deliver data faster than the downstream destination can accept that data. 

Outbound requests to a destination can also fail for other reasons that are outside of Segment's control. When requests to a downstream destination fail, Segment makes subsequent attempts to deliver the data. 

However, Segment reserves the right to limit or reduce the number of retry attempts until the issue is resolved if either of the following conditions are met:

- Failed requests to a downstream destination exceed 1,000 per second
- The failure rate exceeds 50% for more than 72 hours