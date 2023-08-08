---
title: Engage Default Limits
plan: engage-foundations
redirect_from: 
  - '/personas/rate-limits'
  - '/personas/product-limits'
---

To provide consistent performance and reliability at scale, Segment enforces default use and rate limits within Engage. Most customers do not exceed these limits.

To learn more about custom limits and upgrades, contact your dedicated Customer Success Manager or [friends@segment.com](mailto:friends@segment.com).

> info ""
> Beginning August 18, 2023, Segment has [updated product limits](/docs/unify/product-limits/) that apply to new Engage and Unify users. 

## Default limits

| Name                                        | limit                                                       | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inbound Data Throughput                     | 1000 events per second                                      | Total event stream from sources connected to Engage, including historical data replays. Segment may slow request processing once this limit is reached.                                                                                                                                                                                                                                                                                                                                                          |
| Outbound Downstream Destination Rate Limits | Reduced retries when failures exceed 1000 events per second | Outbound Destination requests may fail for reasons outside of Segment's control.  For example, most Destinations enforce their own rate limits. As a result, Segment may deliver data faster than the Destination can accept. <br><br>  When Destination requests fail, Segment tries to deliver the data again. However, if more than 1000 requests per second fail or if the failure rate exceeds 50% for over 72 hours, Segment may reduce additional delivery attempts until the failure condition resolves. |


## Audiences and Computed Traits

| name                                          | limit                                 | Details                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Compute Concurrency                           | 5 concurrent audiences or computed traits               | Segment computes five new audiences or computed traits at a time. Once the limit is reached, Segment queues additional computations until one of the five finishes computing.                                                                                                                                                                               |
| Edit Concurrency                           | 2 concurrent audiences or computed traits               | You can edit two concurrent audiences or computed traits at a time. Once the limit is reached, Segment queues and locks additional computations until one of the two finishes computing.                                                                                                                                                                               |
| Compute Throughput                            | 10000 computations per second         | Computations include any Track or Identify call that triggers an audience or computed trait re-computation. Once the limit is reached, Segment may slow audience processing.                                                                                                                                                                                                   |
| Events Lookback History                       | 3 years                               | The period of time for which Segment stores audience and computed traits computation events.                                                                                                                                                                                                                                                                                   |
| Real-time to batch destination sync frequency | 2-3 hours                             | The frequency with which Segment syncs real-time audiences to batch destinations.                                                                                                                                                                                                                                                                                              |
| Event History                                 | `1970-01-01`                          | Events with a timestamp less than `1970-01-01` aren't always ingested, which could impact audience backfills with event timestamps prior to this date.                                                                                                                                                                                                                         |
| Engage Data Ingest                            | 1x the data ingested into Connections | The amount of data transferred into the Compute Engine.                                                                                                                                                                                                                                                                                                                        |
| Audience Frequency Update                     | 1 per 8 hours                         | Audiences that require time windows, [funnels](/docs/engage/audiences/#funnel-audiences), [dynamic properties](/docs/engage/audiences/#dynamic-property-references), or [account-level membership](/docs/engage/audiences/#account-level-audiences) are processed on chronological schedules. Unless otherwise agreed upon, the audiences will compute at the limit set forth. |
| Event Properties (Computed Traits)            | 10,000                                | For Computed Traits that exceed this limit, Segment will not persist any new Event Properties and will drop new trait keys and corresponding values.                                                  |


## SQL Traits

| name                        | limit                      | Details                                                                                                      |
| --------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| SQL Traits                  | 25                         | The number of SQL traits you can sync to your Space.                                                         |
| SQL Traits - Sync Frequency | customizable, up to hourly | The frequency with which Segment runs your SQL traits. Contact your account team to customize your schedule. |
| SQL Traits - Rows           | 25 million                 | The number of rows each SQL trait can return.                                                                |
| SQL Traits - Columns        | 25                         | The number of columns each SQL trait can return.                                                             |


## Journeys

> info ""
> These limits only apply to existing users who started with Engage prior to August 18, 2023. Visit Segment's updated Unify and Engage [limits](/docs/unify/product-limits/) to learn more.


| Item            | Limit description                | Details                                                                      |
| --------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| Steps           | 500                              | The maximum number of steps per Journey.                                     |
| Step Name       | Maximum length of 170 characters | Once the limit is reached, you cannot add additional characters to the name. |
| Key             | Maximum length of 255 characters | Once the limit is reached, you cannot add additional characters to the key.  |
| Journey Name    | Maximum length of 73 characters  | Once the limit is reached, you cannot add additional characters to the name. |
| Compute credits | Half a credit for each step     | Each step in a published Journey consumes half of one compute credit.       |


## Channels

| Item     | Limit description                                                   | Details                                                                                             |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Channels | Does not support [Regional Segment](/docs/guides/regional-segment/) | Workspaces with Channels functionality enabled must be deployed in the default region (Oregon, US). |
