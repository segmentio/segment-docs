---
title: Unify FAQs
plan: unify
---

## Does your identity model support multiple external ID types?

Yes, Identity Graph supports multiple external IDs.

Identity Graph automatically collects a rich set of external IDs without any additional code:

1. Device level IDs (ex: `anonymous_id`, `ios.idfa` and `android.id`)
2. Device token IDs (ex: `ios.push_token` and `android_push_token`)
3. User level IDs (ex: `user_id`)
4. Common external IDs (`email`)
5. Cross domain analytics IDs (`cross_domain_id`)

If you want Identity Graph to operate on a different custom ID, you can pass it in using `context.externalIds` on an `identify()` or `track()`. If you're interested in this feature, contact your CSM to discuss the best way to implement this feature.

## How does Unify handle identity merging?
Each incoming event is analyzed and external IDs are extracted (`user_id`, `anonymous_id`, `email`). The simplified algorithm works as follows:

1. Segment first searches the Identity Graph for incoming external IDs.
2. If Segment finds no matching profile(s), it creates one.
3. If Segment finds one profile, it merges the incoming event with that profile. (This means that Segment adds the external IDs on the incoming message and resolves the event to the profile.)
4. If Segment finds multiple matching profiles, Segment applies the identity resolution settings for merge protection. Specifically, Segment uses identifier limits and priorities to add the correct identifiers to the profile.
5. Segment then applies [limits](/docs/unify/profile-api-limits/) to ensure profiles remain under these limits. Segment doesn't add any further merges or mappings if the profile is at either limit, but event resolution for the profile will continue.

{% comment %}

![Identity graph merging](images/merging_1.png "Flowchart of Segment receiving an incoming event")

![Identity graph merging](images/merging_2.png "Flowchart of Segment searching for profiles by external ID")

![Identity graph merging](images/merging_3.png "Flowchart of Segment merging profiles")

{% endcomment %}

## Is all matching deterministic, or is there any support for probabilistic matching?
All Profile matching is deterministic and based on first-party data that you've collected.

Segment doesn't support probabilistic matching. Most marketing automation use cases require 100% confidence that a user is who you think they are (sending an email, delivering a recommendation, and so on). The best way to support this is through a deterministic identity algorithm.

## What happens to conflicting and non-conflicting profile attributes?
If two merged user profiles contain conflicting profile attributes, Segment selects the newest, or last updated, attributes when querying the profile.

## What identifiers can the merged profile be queried/updated with?

Any of the external IDs can be used to query a profile. When a profile is requested, Segment traverses the merge graph and resolves all merged profiles. The result is a single profile, with the latest state of all traits, events, and identifiers.

### Can ExternalID's be changed or removed from the profiles?
No. As the Identity Graph uses ExternalIDs, they remain for the lifetime of the user profile.

### Can I delete specific events from a user profile in Unify? 
No. Alternatively, you may delete the entire user profile from Segment using a [GDPR deletion request](/docs/privacy/user-deletion-and-suppression/).

### How does profile creation affect MTUs, particularly where a profile isn't merged with the parent profile due to exceeding the merge limit?
Segment determines the Monthly Tracked Users (MTUs) count by the number of unique user IDs and anonymous IDs processed, regardless of how you manage these profiles in Unify and Engage. This count is taken as events are sent to Segment, before they reach Unify and Engage. Therefore, the creation of new profiles or the merging of profiles in Unify doesn't affect the MTU count. The MTU count only increases when you send new unique user or anonymous IDs to Segment.
 
