---
title: Personas Default Limits
redirect_from: '/personas/rate-limits'
---

To provide consistent performance and reliability at scale, Segment enforces default use and rate limits within Personas. Most customers do not exceed these limits.

To learn more about custom limits and upgrades, contact your dedicated Customer Success Manager or [friends@segment.com](mailto:friends@segment.com).

> info "Plan-Dependent Limits"
> Some limits, noted in bold, depend on your Personas plan.

## Default Limits

| Name                                        | limit                                                       | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inbound Data Throughput                     | 1000 events per second                                      | Total event stream from sources connected to Personas, including historical data replays. Segment may slow request processing once this limit is reached.                                                                                                                                                                                                                                                                                                                                               |
| Outbound Downstream Destination Rate Limits | Reduced retries when failures exceed 1000 events per second | Outbound Destination requests may fail for reasons outside of Segment's control.  For example, most Destinations enforce their own rate limits. As a result, Segment may deliver data faster than the Destination can accept. <br><br>  When Destination requests fail, Segment tries to deliver the data again. However, if more than 1000 requests per second fail or if the failure rate exceeds 50% for over 72 hours, Segment may reduce additional delivery attempts until the failure condition resolves. |


## Profile API

| Name                    | limit                   | Details                                                                                                                                                             |
| ----------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profile API Throughput  | 100 requests per second | If requests exceed 100 per second, the Profile API returns HTTP Error `429 Too Many Requests`.                                                                      |
| Events Lookback History | 14 days                 | The Profile API retrieves up to 14 days of a profile's historical events within a collection. This applies to Track events, not traits sent through Identify calls. |


## Identity

| name              | Limit         | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Identity Merges   | 100 merges    | Personas supports up to 100 merges per profile in its identity graph. Merges occur when a common `external_id` joins two existing profiles. For example, if a user initiates a mobile session but then signs in through a web application, a common identifier like `user_id` will join the two user profiles. Segment drops additional message merge attempts, which usually indicate corrupt profiles. Once the limit is reached, Segment rejects additional events. |
| Identity Mappings | 1000 mappings | Personas supports up to 1000 mappings per profile in its identity graph. Mappings are external identifier values like a `user_id`, email, mobile advertising `id`, or any custom identifier. Segment drops additional message mapping attempts, which usually indicate corrupt profiles. This limit counts mappings across all merged profiles.                                                                                                                    |
| Identify calls    | 300 traits    | Personas rejects Identify events with 300 or more traits. If your use case requires more than 300 traits, you can split the traits into multiple Identify calls.                                                                                                                                                                                                                                                                                                   |


## Audiences and Computed Traits

| name                                          | limit                                                 | Details                                                                                                                                                                                                |     |
| --------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| Compute Concurrency                           | 5 concurrent audiences                                | Segment computes five new audiences or computed traits at a time. Once the limit is reached, Segment queues additional audience computations until one of the five audiences finishes computing.       |     |
| Compute Throughput                            | 10000 computations per second                         | Computations include any Track or Identify call that triggers an audience or computed trait re-computation. Once the limit is reached, Segment may slow audience processing.                           |     |
| Events Lookback History                       | **Essentials**: 1 year <br><br> **Advanced**: 3 years | The period of time for which Segment stores audience and computed traits computation events.  This limit depends on your Personas service. Contact your account team to upgrade your Personas service. |     |
| Real-time to batch destination sync frequency | 2-3 hours                                             | The frequency with which Segment syncs real-time audiences to batch destinations.                                                                                                                      |     |
| Event History                                 | `1970-01-01`                                          | Events with a timestamp less than `1970-01-01` aren't always ingested, which could impact audience backfills with event timestamps prior to this date.                                                |

## SQL Traits

| name                        | limit                                                                         | Details                                                                                                                   |
| --------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| SQL Traits                  | **Essentials**: 5 <br><br> **Advanced**: 25                                       | The number of SQL traits you can sync to your Personas space. Contact your account team to upgrade your Personas service. |
| SQL Traits - Sync Frequency | **Essentials**: <br> twice daily <br><br> **Advanced**: customizable, up to hourly | The frequency with which Segment runs your SQL traits. Contact your account team to customize your schedule.              |
| SQL Traits - Rows           | 25 million                                                                    | The number of rows each SQL trait can return.                                                                             |
| SQL Traits - Columns        | 25                                                                            | The number of columns each SQL trait can return.                                                                          |


## Journeys

| Item            | Limit description                | Details                                                                      |
| --------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| Steps           | 500                              | The maximum number of steps per Journey.                                     |
| Step Name       | Maximum length of 170 characters | Once the limit is reached, you cannot add additional characters to the name. |
| Key             | Maximum length of 255 characters | Once the limit is reached, you cannot add additional characters to the key.  |
| Journey Name    | Maximum length of 73 characters  | Once the limit is reached, you cannot add additional characters to the name. |
| Compute credits | Half a credit for each step      | Each step in a published Journey consumes half of one compute credit.        | 
