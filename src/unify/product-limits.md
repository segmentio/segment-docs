---
title: Unify Limits
plan: unify-plus
redirect_from:
  - '/profiles/product-limits'
  - '/unify/profile-api-limits'
---

> info ""
> Beginning August 18, 2023, new Unify Plus and Engage users can refer to this page for Segment's updated product limits. Existing users prior to this date can continue to refer to the Engage product limits [here](/docs/engage/product-limits/).


To provide consistent performance and reliability at scale, Segment enforces default use and rate limits within Unify. Most customers do not exceed these limits.

To learn more about custom limits and upgrades, contact your dedicated Customer Success Manager or [friends@segment.com](mailto:friends@segment.com){:target="_blank"}.

## Unify Plus limits

Beginning August 18, 2023, new Unify Plus users will receive 50 Computed or SQL Traits in addition to five AI Traits. 

In addition, new Engage users will receive the following: 
- **Engage Foundations**: 100 Audiences and 75 Journey Steps
- **Engage Premier**: 125 Audiences and 100 Journey Steps

Visit Segment's [pricing page](https://segment.com/pricing/){:target="_blank"} to learn more about Unify Plus. 


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


## Profile API

| Name                    | limit                   | Details                                                                                                                                                             |
| ----------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profile API Throughput  | 100 requests per second | If requests exceed 100 per second, the Profile API returns HTTP Error `429 Too Many Requests`.                                                                      |
| Events Lookback History | 14 days                 | The Profile API retrieves up to 14 days of a profile's historical events within a collection. This applies to Track events, not traits sent through Identify calls. |


## Identity

| name              | Limit         | Details                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identity Merges   | 100 merges    | Engage supports up to 100 merges per profile in its identity graph. Merges occur when a common `external_id` joins two existing profiles. For example, if a user initiates a mobile session but then signs in through a web application, a common identifier like `user_id` will join the two user profiles. No additional merges will be added once the profile reaches this limit. Event resolution for the profile, however, will continue. |
| Identity Mappings | 1000 mappings | Engage supports up to 1000 mappings per profile in its identity graph. Mappings are external identifier values like a `user_id`, email, mobile advertising `id`, or any custom identifier. No additional mappings will be added once the profile reaches this limit. Event resolution for the profile, however, will continue.                                                                                                                 |
| Identify calls    | 300 traits    | Engage rejects Identify events with 300 or more traits. If your use case requires more than 300 traits, you can split the traits into multiple Identify calls.                                                                                                                                                                                                                                                                                 |

### Unify ingestion limitations

Unify will silently drop events if:
- The groupId has more than 500 characters.
- Events have more than 300 properties/traits.
- messageId is longer than 100 characters.
- The groupId is empty in a group call or context.groupId is empty in a track call.

