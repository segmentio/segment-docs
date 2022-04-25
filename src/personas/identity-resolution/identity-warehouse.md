---
title: Identity Warehouse (Limited Availability)
---




> warning ""
> **Note:** The Identity warehouse currently has limited availability, and does not support GDPR deletion requests. Contact your Segment customer success manager to enable this feature.

The Personas Identity Warehouse allows customers to export all the identifiers associated with any one user.

When enabled, customers see a source called Personas Identities `<space_name>`. This automatically synchronizes to warehouses in a customer's workspace. To disable, use Selective Sync.

To query the underlying data, customers can query:

```sql
SELECT * FROM personas_<space_name>_identities.users_identities
```

The columns in the tables are:

| Name              | Metadata                                                                   |
| ----------------- | -------------------------------------------------------------------------- |
| created_source    | the source key that sent the message containing the external_id to Personas               |
| external_id_type  | the type of external_id (email, user_id, cross_domain_id, etc)             |
| external_id_value | the value of the external_id                                        |
| merged_at         | the timestamp of when this profile was merged                              |
| merged_from       | the previous segment_id that this external_id belonged to before the merge |
| segment_id        | the index of the user profile                                       |
| synced_at         | when the data was synced to the Identities source                          |
| created_at        | when the mapping or merging was created                                    |

## Example Queries

To see all the identifiers associated with a certain user, first look up the `segment_id` associated with the `external_id_value`. Then, query all `external_id_value`'s associated with the `segment_id`.

```sql
 with t1 AS
  (SELECT segment_id
   FROM personas_identities.users_identities
   WHERE external_id_value = 'jane.doe@example1.com')
SELECT u.segment_id, created_source, external_id_type, external_id_value
FROM personas_identities.users_identities u
JOIN t1 on u.segment_id = t1.segment_id
```

| segment_id         | created_source    | external_id_type|   external_id_value |
| ----------------- | -------------------------------------------------------------------------- |
| use_abc123         | 640YebQ2Ri    | email|   jane.doe@example1.com |
| use_abc123         | fHz4PsaUf8    | email|   jane.doe@example2.com |
| use_abc123         | fHz4PsaUf8    | anonymous_id|   feaa68e5-1057-4e32-8702-a2462b454474 |
| use_abc123         | fHz4PsaUf8    | user_id|   0P1Qls5jrj |
| use_abc123         | 640YebQ2Ri    | android.id |   4f0bf0e9-44db-4127-8c0c-90f8b261b08e|
| use_abc123         | 640YebQ2Ri    | ios.id |   0440f065-9291-4601-aabe-218620e3c69d|
