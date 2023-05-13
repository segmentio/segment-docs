---
title: Unify Limits
plan: unify
redirect_from:
  - '/profiles/product-limits'
---

###Unify Ingestion Limitations

Unify will silently drop events if:
- The groupId has more than 500 characters.
- Events have more than 300 properties/traits.
- messageId is longer than 100 characters.
- The groupId is empty in a group call or context.groupId is empty in a track call.

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
