---
title: Delete Profile Identifier API
plan: unify
hidden: true
---

The Delete Profile Identifier API removes identifiers from a profile while preserving the profile's history, including traits, events, and merge history. 

Use this API to clean up outdated or incorrectly added identifiers without deleting entire profiles and replaying events.

## Use cases

Remove identifiers that shouldn't be associated with a profile:

- Remove mistakenly imported identifiers, like incorrect email addresses, to prevent inaccurate targeting in downstream tools.
- Clean up obsolete identifiers after database migrations or system changes.
- Transfer identifiers with a short lifespan between profiles. For example, when a user changes phone numbers or when a prepaid service expires, you can remove the phone number from one profile and add it to another.
- Fix profiles that violate [ID Resolution limits](). Remove old identifiers to bring profiles into compliance with your configured limits.
- Revert misconfigured identity resolution settings. For example, if you reduced the `user_id` limit from 3 to 1, remove extra `user_id` values to resolve discrepancies between Segment and downstream tools like Braze or Amplitude.

## Before you begin

During private beta, the Delete Profile Identifier API is available to Unify and Engage.

You must have one of the following role permissions to delete identifiers:

- Workspace Owner
- Identity Admin
- Unify and Engage Admin

For more information, see [the Roles documentation](/docs/segment-app/iam/roles/).

### Profiles Sync configuration

If you use [Profiles Sync](/docs/unify/profiles-sync/overview/), complete these steps before using the Delete Profile Identifier API:

1. Add the `__operation` column to the `external_id_mapping_updates` table schema in your data warehouse:
   - Default value: `CREATED`
   - Deleted value: `REMOVED`
2. Verify that your analytics workloads (BI tools, data pipelines, ML models) can handle deleted identifiers. Make sure these systems remain operational and account for the `REMOVED` flag.

