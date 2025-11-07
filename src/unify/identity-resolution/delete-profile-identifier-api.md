---
title: Delete Profile Identifier API
plan: unify
hidden: true
---

The Delete Profile Identifier API removes identifiers from a profile while preserving the profile's history, including traits, events, and merge history. 

Use this API to clean up outdated or incorrectly added identifiers without deleting entire profiles and replaying events.

## Use cases

The Delete Profile Identifier API helps you clean up identifiers that shouldn't be associated with a profile, including:

- Mistakenly imported identifiers, like incorrect email addresses, that prevent accurate targeting in downstream tools
- Obsolete identifiers left over from database migrations or system changes
- Identifiers with a short lifespan that need to transfer between profiles. For example, when a user changes phone numbers or when a prepaid service expires, you can remove the phone number from one profile and add it to another.
- Old identifiers that cause profiles to violate [ID Resolution limits]()
- Extra identifiers from misconfigured identity resolution settings. For example, if you reduced the `user_id` limit from 3 to 1, remove extra `user_id` values to resolve discrepancies between Segment and downstream tools like Braze or Amplitude.

## Before you begin

The Delete Profile Identifier API is available to Unify and Engage customers during private beta.

You need one of these roles to delete identifiers:

- Workspace Owner
- Identity Admin
- Unify and Engage Admin

See [the Roles documentation](/docs/segment-app/iam/roles/) for more details.

If you use [Profiles Sync](/docs/unify/profiles-sync/overview/), you must also:

1. Add the `__operation` column to the `external_id_mapping_updates` table schema in your data warehouse:
   - Default value: `CREATED`
   - Deleted value: `REMOVED`
2. Verify that your analytics workloads (BI tools, data pipelines, ML models) can handle deleted identifiers. Make sure these systems stay operational and account for the `REMOVED` flag.

## How deletion works

When you delete an identifier, Segment removes it from [Identity Resolution](/docs/unify/identity-resolution/) and syncs the change to connected systems.

The API confirms that Segment deleted the identifier from the Real-Time Identity Graph. The deletion then flows through these systems:

| System                       | What happens                                                                                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Real-time Profile storage    | The Profile API and Profile explorer delete the identifier in near real time                                                                               |
| Batch Profile Data lakehouse | Segment soft-deletes the identifier in the append-only table within minutes and filters it from the materialized view within 24 hours                      |
| Customer data warehouse      | Profiles Sync adds a row to `external_id_mapping_updates` with `__operation` set to `REMOVED`. The `user_identifiers` view filters out removed identifiers |


## Send a deletion request

You can only delete identifiers from known profiles. The API requires a valid `user_id` to locate the profile.

The API returns an error if you try to delete:

- All `user_id` values from a profile. Profiles must have at least one `user_id`.
- A `group_id` identifier. The API only supports individual profiles.

### Authentication

The API uses HTTP Basic Authentication. Base64-encode your access token with a trailing colon (the colon represents an empty password):

```bash
echo -n 'your_token:' | base64
```

Use the encoded value in the `Authorization` header of your requests. Generate your access token in **Unify > Unify settings > API access**.

### Request format

The API accepts one identifier per request.

Send requests to this endpoint:

```bash
POST https://{HOST_NAME}/v1/spaces/{SPACE_ID}/collections/users/profiles/user_id:{USER_ID_VALUE}/external_ids/delete
```

Replace the following parameters in the URL:

| Parameter       | Description                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| `HOST_NAME`     | `profiles.segment.com` for North America workspaces or `profiles.euw1.segment.com` for EU workspaces |
| `SPACE_ID`      | Your space ID. Find this in **Unify > Unify settings > API access**.                                 |
| `USER_ID_VALUE` | The `user_id` value that identifies the profile.                                                     |

Include these fields in the request body:

| Field                 | Description                                                                    |
| --------------------- | ------------------------------------------------------------------------------ |
| `delete_external_ids` | Array containing the identifier to delete. Limit: 1 identifier per request     |
| `id`                  | Value of the identifier to delete (for example, `hello@example.com`)           |
| `type`                | Type of identifier to delete (for example, `email`, `anonymous_id`, `user_id`) |

### Example request

The API uses HTTP Basic Authentication. Base64-encode your access token with a trailing colon (the colon represents an empty password):

```bash
echo -n 'your_token:' | base64
```

Then send the delete request:

```bash
curl --location --request POST 'https://profiles.segment.com/v1/spaces/spa_abc123/collections/users/profiles/user_id:user_001/external_ids/delete' \
--header 'Authorization: Basic <base64_encoded_token_colon>' \
--header 'Content-Type: application/json' \
--data '{
  "delete_external_ids": [
    {
      "id": "example@gmail.com",
      "type": "email"
    }
  ]
}'
```
## Responses and error codes

The API returns the following HTTP status codes:

| HTTP Code | Code                   | Message                                                                 |
| --------- | ---------------------- | ----------------------------------------------------------------------- |
| `200`     | `success`              | External identifier has been deleted.                                   |
| `400`     | `unsupported_eid_type` | Unsupported external id type.                                           |
| `400`     | `bad_request`          | Missing required parameters in URL.                                     |
| `400`     | `bad_request`          | Invalid URL: valid `user_id` is required. Unsupported `<id type>`.      |
| `400`     | `bad_request`          | Only one external_id can be deleted at a time.                          |
| `400`     | `bad_request`          | Invalid collection: `<collection>`.                                     |
| `400`     | `bad_request`          | External id specification must differ from lookup id.                   |
| `401`     | `unauthorized`         | The specified token is invalid.                                         |
| `403`     | `forbidden`            | Deleted identifier not activated for space_id `<space_id>`.             |
| `404`     | `not_found`            | The resource was not found.                                             |
| `404`     | `eid_not_found`        | External identifier not found.                                          |
| `404`     | `source_id_not_found`  | No source attached to space_id `<space_id>`.                            |
| `429`     | `rate_limit_error`     | Attempted to delete more than 100 IDs per second for a single profile. |

## Limitations and considerations

<!-- add intro sentence again -->

### Deletion scope

The Delete Profile Identifier API removes identifiers from Unify systems, including Identity Resolution, Profile Storage, and Profile Sync to your data warehouse. However, deletion doesn't extend to all Segment systems. Identifiers remain in the Event Archive and are soft-deleted in the Batch Profile Data Lakehouse.

Segment doesn't delete identifiers from downstream destinations like Braze, Amplitude, Facebook, Engage Audiences, Journeys, Linked Audiences, or Consent settings. You must update these systems separately.

### Rate limits

Segment allows up to 100 deletion requests per second per space and 100 deletions per second for identifiers on a single profile.

### Response time

Most deletion requests complete in under 3 seconds. Deletions on profiles with more than 15 merges or 50 identifier mappings may take longer.

Deletion propagates to connected systems at different speeds:

- **Real-Time Profile Storage**: seconds to 5 minutes
- **Profile Sync**: depends on your sync schedule

### Space rebuilds and replays

If you rebuild a space from Segment Archives, deletions don't replay automatically. You must rerun deletions after the replay completes.

### Identifier reintroduction

Segment may reintroduce deleted identifiers in the following cases:

1. **Event replays**: Replaying events from the Event Archive that reference deleted identifiers adds them back to the profile.
2. **Engage or Journey sync timing**: Deleting an identifier within 5 minutes of sending an event that references it may result in the identifier being reintroduced through Engage-generated events.

### Profile API source

When you first use the Delete Profile Identifier API, Segment creates a `profile-api-source` for internal tracking. This source may appear in your workspace.
