---
title: Planhat Destination
id: 55bbefd70a20f4e22f0fb3e5
---
## Getting started

You can get data from Segment to Planhat's [Customer Success Tool](http://www.planhat.com/){:target="_blank"} following these steps:
1. Once the Segment library is integrated with your product, toggle Planhat on in your Segment destinations.
2. Add your Planhat API Key which you can generate in Planhat under **App Settings > API Access**.

The Segment-Planhat destination is 100% handled through the Segment servers, so you don't need to bundle their iOS or Android SDKs. Your Segment SDK is enough.

The destination also supports Identify, Page, Track, and Group calls. For more information, see the [Segment Spec documentation](/docs/connections/spec/).

## Identify

When you Identify a user, the user's information is passed on to Planhat with `userId` as Planhat's External User ID. Segment's special traits recognized as Planhat's standard contact profile fields (in parentheses) are:

- `name` (`name`).
- `title` (`title`).
- `email` (`email`).
- `user_id` (`externalId`).

In addition, all calls get Segment as 'source'.

If the `userId` or `traits.email` matches an existing Contact in Planhat the Identify-call is automatically associated with that Contact. Otherwise a new Contact is created in Planhat. New Contacts received from Segment can either be discarded or manually assigned to a Customer profile in Planhat.
