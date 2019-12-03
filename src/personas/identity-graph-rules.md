---
title: Identity Graph Rules
---
## Searching for Matching Profiles

When a new Track or Identify call flows through a source to Personas, the Identity Graph automatically searches for any pre-existing user profiles with one or more matching externalIds.

There are three cases that can occur:

**Case One: Create New Profile**
When there are no pre-existing profiles that have matching identifiers to the event, we create a new user profile.

**Case Two: Add Event to Existing Profile**
When there is only one profile that matches all identifiers in an event, we add the event to that existing profile.

**Case Three: Merge Existing Profiles**
When there are multiple profiles that match the identifiers in an event, we have three merge protection rules to protect from multiple users sharing a device. 
