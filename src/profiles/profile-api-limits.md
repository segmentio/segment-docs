---
title: Profiles Limits
plan: profiles
redirect_from:
  - '/profiles/product-limits'
---

## Profile API

| Name                    | limit                   | Details                                                                                                                                                             |
| ----------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profile API Throughput  | 100 requests per second | If requests exceed 100 per second, the Profile API returns HTTP Error `429 Too Many Requests`.                                                                      |
| Events Lookback History | 14 days                 | The Profile API retrieves up to 14 days of a profile's historical events within a collection. This applies to Track events, not traits sent through Identify calls. |


## Identity

| name              | Limit         | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Identity Merges   | 100 merges    | Engage supports up to 100 merges per profile in its identity graph. Merges occur when a common `external_id` joins two existing profiles. For example, if a user initiates a mobile session but then signs in through a web application, a common identifier like `user_id` will join the two user profiles. Segment drops additional message merge attempts, which usually indicate corrupt profiles. Once the limit is reached, Segment rejects additional events. |
| Identity Mappings | 1000 mappings | Engage supports up to 1000 mappings per profile in its identity graph. Mappings are external identifier values like a `user_id`, email, mobile advertising `id`, or any custom identifier. Segment drops additional message mapping attempts, which usually indicate corrupt profiles. This limit counts mappings across all merged profiles.                                                                                                                    |
| Identify calls    | 300 traits    | Engage rejects Identify events with 300 or more traits. If your use case requires more than 300 traits, you can split the traits into multiple Identify calls.                                                                                                                                                                                                                                                                                                   |
