---
title: Planhat Destination
id: 55bbefd70a20f4e22f0fb3e5
---
## Getting Started

Getting data from Segment to Planhat's [Customer Success Tool](http://www.planhat.com/) is easy.

Once the Segment library is integrated with your product, toggle Planhat on in your Segment destinations, and add your Planhat API Key which you can generate in Planhat under App Settings > API Access.

The Segment Planhat destination is 100% handled through our servers, so you don't need to bundle their iOS or Android SDKs. Your Segment SDK will be enough.

Planhat supports the `identify`, `page`, and `track` methods at the moment.

- - -

## Identify

When you `identify` a user, we'll pass that user's information to Planhat with `userId` as Planhat's External User ID. Segment's special traits recognized as Planhat's standard contact profile fields (in parentheses) are:

- `name` (`name`)
- `title` (`title`)
- `email` (`email`)
- `user_id` (`externalId`)


In addition, all calls will get Segment as 'source'.

If the `userId` or `traits.email` matches an existing Contact in Planhat the Identify-call will automatically be associated with that Contact. Otherwise a new Contact will be created in Planhat. New Contacts received from Segment can either be discarded or manually assigned to a Customer profile in Planhat.
