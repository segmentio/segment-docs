---
title: Identity Graph Rules
---
## Searching for Matching Profiles

When a new Track or Identify call flows through a source to Personas, the Identity Graph automatically searches for any pre-existing user profiles with one or more matching externalIds.

There are three cases that can occur:

**Case One: Create New Profile**
When there are no pre-existing profiles that have matching identifiers to the event, we create a new user profile.

**Case Two: Add Event to Existing Profile**
When there is only one profile that matches all identifiers in an event, we map the traits, identifiers and events on the call to that existing profile.

**Case Three: Merge Existing Profiles**
When there are multiple profiles that match the identifiers in an event, we attempt to merge profiles. However, we first check the three rules we have in place to protect the identity graph from inaccurate merges.

One common example of a use-case that can cause inaccurate merges is the Shared iPad setup. For example, many companies now have iPads available in-store for customers to register for an account or submit order information. If different users submit information on the same device, there will now be multiple events sent with the same deviceID. Without merge protection rules in place, we would see all these different users merged into the same user profile based on this common identifier.

Thus, we have default checks set in place to ensure that user profiles maintain their integrity.

First, we check to make sure that the profiles matching the identifiers won't have more than 100 merges in total.

Next, we check to make sure that user_id is unique on these merged profiles. When there exists more than one user_id, we demote the lowest priority identifier from the event, and look again for profiles that now match the remaining identifiers. By default, the order of trust priority from highest to lowest is user_id, followed by email and then followed by all other identifiers.

Lastly, we check to make sure that there are no more than 5 values per identifier on the event in the final profile. For example, if an event is sent in with email and ios.id, we'll make sure that we don't have more than five emails or ios.ids on the final merged profile. If we find that we have more than 5 values per matched identifier, we'll demote that inputted externalId and try to find matching profiles with the remaining identifiers.
