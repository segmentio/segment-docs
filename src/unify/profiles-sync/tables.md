---
title: Profiles Sync Tables and Materialized Views
plan: unify
---

Through Profiles Sync, Segment provides data sets and models that can help you enrich customer profiles using any warehouse data available to you.

Using a practical example of how Segment connects and then merges anonymous profiles, this page explains the tables that Segment lands, as well as the tables you materialize as part of Profiles Sync.

## Case study: anonymous site visits lead to profile merge
  
To help illustrate the possible entries and values populated into Profiles Sync tables, view the event tabs below and consider the following scenario.

Suppose the following four events lead to the creation of two separate profiles:

{% codeexample %}
{% codeexampletab Event 1 %}
```
// An anonymous visit to twilio.com triggers a Page call:

anonymous_id: 5285bc35-05ef-4d21
context.url: twilio.com
timestamp: May 2, 14:01:00

// Segment generates Profile 1, with a single known ID: 5285bc35-05ef-4d21

```
{% endcodeexampletab %}

{% codeexampletab Event 2 %}
```
// Moments later, the same user signs up to Twilio with their email address.
// This triggers an Identify call:

anonymous_id: 5285bc35-05ef-4d21
context.url: twilio.com/try-twilio
timestamp: May 2, 14:01:47
email: jane.kim@segment.com

// Segment modifies Profile 1, adding an email address to the anonymous ID generated in Event 1.
```
{% endcodeexampletab %}

{% codeexampletab Event 3 %}
```
// Weeks later, an anonymous visit to twilio.com triggers a Page call:

anonymous_id: b50e18a5-1b8d-451c
context.url: twilio.com/education
timestamp: June 22, 10:47:15

// Segment generates Profile 2, with a single known ID: b50e18a5-1b8d-451c.
```
{% endcodeexampletab %}

{% codeexampletab Event 4 %}
```
// Moments later, the same user signs up for a Twilio webinar.
// This triggers an Identify call:

anonymous_id: b50e18a5-1b8d-451c
context.url: twilio.com/events/webinars
timestamp: June 22, 10:48:00
email: jane.kim@segment.com

// Segment understands that Profile 2 and Profile 1 are the same user.
// Segment merges Profile 2 into Profile 1.
// Profile 1 now has two values for anonymous_id: 5285bc35-05ef-4d21 and b50e18a5-1b8d-451c.
```
{% endcodeexampletab %}
{% endcodeexample %}

Initially, Segment generates two profiles for the first three calls. In the final event, though, Segment understands that Profile 2 should be merged into Profile 1.  Segment then merges Profile 2 into Profile 1, merging away Profile 2 in the process.

Profiles Sync tracks and provides information about these events through a set of tables, which you’ll learn about in the next section.


## Profile raw tables 

Profile raw tables contain records of changes to your Segment profiles and Identity Graph over time. 

With raw tables, you have full control over the materialization of Profiles in your warehouse, as well as increased observibility.

Raw tables contain complete historical data when using historical backfill.


### The id_graph_updates table

The `id_graph_updates` table maps between the following:

- `segment_id`: the profile ID that Segment appends to an event or an identifier at the time it was first observed
- `canonical_segment_id`: the fully-merged segment ID (that is, the profile Segment now understands any events or identifiers to map to)

As a result, this table contains information about the creation and merging of profiles, as well as the specific events that triggered those changes.

Using the events from the profile merge case study, Segment would generate three new entries to this table:

<div style="overflow-x:auto;" markdown=1>

| `segment_id` (varchar) | `canonical_segment_id` (varchar) | `triggering_event_type` (varchar) | `triggering_event_id` (varchar) | `timestamp` (datetime) |
| ---------------------- | -------------------------------- | --------------------------------- | ------------------------------- | ---------------------- |
| `profile_1`            | `profile_1`                      | `page`                            | `event_1`                       | 2022-05-02 14:01:00    |
| `profile_2`            | `profile_2`                      | `page`                            | `event_3`                       | 2022-06-22 10:47:15    |
| `profile_2`            | `profile_1`                      | `identify`                        | `event_4`                       | 2022-06-22 10:48:00    |

</div>

In this example, the table shows `profile_2` mapping to two places: first to itself, then, later, to `profile_1` after the merge occurs.


#### Recursive entries

Segment shows the complete history of every profile. If, later, `profile_1` merges into a different `profile_0`, Segment adds recursive entries to show that `profile_1` and `profile_2` both map to `profile_0`.  These entries give you a comprehensive history of all profiles that ever existed.

If you’ll use Profiles Sync to build models, refer to the `id_graph` model, which can help you put together a complete view of a customer.

### The external_id_mapping_updates table

This table maps Segment-generated identifiers, like `segment_id`, to external identifiers that your users provide. It has the following columns:

| field                         | description                                                                                         |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `EXTERNAL_ID_HASH`            | The hash of the identifier sent in the incoming event.                                              |
| `EXTERNAL_ID_TYPE`            | The type of external identifier sent in the incoming event, such as `user_id` or `anonymous_id`. External identifiers become the identities attached to a user profile. |
| `EXTERNAL_ID_VALUE`           | The value of the identifier sent in the incoming event.                                             |
| `ID`                          | A unique identifier for the table row.                                                              |
| `RECEIVED_AT`                 | The timestamp when the Segment API receives the payload from the client or server.                      |
| `SEGMENT_ID`                  | The Profile ID that Segment appends to an event or an identifier at the time it was first observed. |
| `SEQ`                         | A sequential value derived from the timestamp.                                                      |
| `TIMESTAMP`                   | The UTC-converted timestamp set by the Segment library.                                             |
| `TRIGGERING_EVENT_ID`         | The specific ID of the incoming event.                                                              |
| `TRIGGERING_EVENT_NAME`       | The specific name of the incoming event.                                                            |
| `TRIGGERING_EVENT_SOURCE_ID`  | The specific source ID of the incoming event.                                                       |
| `TRIGGERING_EVENT_SOURCE_NAME`| The name of the source that triggered the event.                                                    |
| `TRIGGERING_EVENT_SOURCE_SLUG`| The slug of the source that triggered the event.                                                    |
| `TRIGGERING_EVENT_TYPE`       | The type of tracking method used for triggering the incoming event.                             |
| `UUID_TS`                     | A unique identifier of the timestamp.                                                               |


The anonymous site visits sample used earlier would generate the following events:

<div style="overflow-x:auto;" markdown=1>

| `segment_id` (varchar) | `external_id_type` (varchar) | `external_id_value` (varchar) | `triggering_event_type` (varchar) | `triggering_event_id` (varchar) | `timestamp` (datetime) |
| ---------------------- | ---------------------------- | ----------------------------- | --------------------------------- | ------------------------------- | ---------------------- |
| `profile_1`            | `anonymous_id`               | `5285bc35-05ef-4d21`          | `page`                            | `event_1`                       | 2022-05-02 14:01:00    |
| `profile_1`            | `email`                      | `jane.kim@segment.com`        | `identify`                        | `event_2`                       | 2022-05-02 14:01:47    |
| `profile_2`            | `anonymous_id`               | `b50e18a5-1b8d-451c`          | `page`                            | `event_3`                       | 2022-06-22 10:48:00    |

</div>

In this table, Segment shows three observed identifiers. For each of the three identifiers, Segment outputs the Segment ID initially associated with the identifier.


### The profile_traits_updates table

The `profile_traits_updates` table maps each `segment_id` with all associated profile traits. 

Segment updates this table:
- for each identify call that updates one or more traits for a `segment_id`.
- for any merge where traits from two previously separated profiles are now combined. 

In the event that two profiles merge, Segment only updates the `profile_traits_updates` table for the `canonical_segment_id`, or the fully merged id.

From the `profile_traits_updates` table, use Segment's [open-source dbt models](https://github.com/segmentio/profiles-sync-dbt){:target="_blank"}, or your own tools to materialize the [`profile_traits`](#the-profile-traits-table) table with all profiles and associated profile traits in your data warehouse. 

## Event type tables 

Event type tables provide a complete history for each type of event. Segment syncs events based on the event sources you've connected to Unify.

Identity Resolution processes these events, and includes a `segment_id`, enabling the data to be joined into a single Profile record. 

> success ""
> Event type tables will have 2 months of historical data on backfill.

Event type tables includes the following tables:

- `Identify`
- `Page`
- `Group`
- `Screen`
- `Alias`
- `Track`


These event tables are similar to the tables landed by Segment warehouse integrations, with the following exceptions:

- Events are combined in a single schema. For example, if you have three sources going into a single space, Segment produces one schema, not three.
- These tables have two extra columns:
  * `segment_id`:  the profile ID at the time the event came through. That profile may have since merged.
  * `event_source_id`: the specific source ID of the incoming event

The previous result would generate two entries in the `pages` table:

<div style="overflow-x:auto;" markdown=1>

| `segment_id` (varchar) | `context_url` (array)  | `anonymous_id` (varchar) | `event_source_id` (varchar) | `event_id` (varchar) | `timestamp` (datetime) |
| ---------------------- | ---------------------- | ------------------------ | --------------------------- | -------------------- | ---------------------- |
| `profile_1`            | `twilio.com`           | `5285bc35-05ef-4d21`     | `source_1`                  | `event_1`            | 2022-05-02 14:01:00    |
| `profile_2`            | `twilio.com/education` | `b50e18a5-1b8d-451c`     | `source_1`                  | `event_3`            | 2022-06-22 10:47:15    |

</div>

And two entries in the `identifies` table:

<div style="overflow-x:auto;" markdown=1>

| `segment_id` (varchar) | `context_url` (array)        | `anonymous_id` (varchar) | `email`  (varchar)     | `event_source_id` (varchar) | `event_id` (varchar) | `timestamp` (datetime) |
| ---------------------- | ---------------------------- | ------------------------ | ---------------------- | --------------------------- | -------------------- | ---------------------- |
| `profile_1`            | `twilio.com/try_twilio`      | `5285bc35-05ef-4d21`     | `jane.kim@segment.com` | `source_1`                  | `event_2`            | 2022-05-02 14:01:47    |
| `profile_2`            | `twilio.com/events/webinars` | `b50e18a5-1b8d-451c`     | `jane.kim@segment.com` | `source_2`                  | `event_4`            | 2022-06-22 10:48:00    |

</div>

All these events were performed by the same person. If you use these tables to assemble your data models, though, always join them against `id_graph` to resolve each event’s `canonical_segment_id`.


> info ""
> You might see columns appended with `hidden_entry` or `hidden_entry_joined_at` in profile data of users in Journeys. Segment uses these for internal purposes, and they do not require any attention or action.


### Profiles Sync schema

Profiles Sync uses the following schema: `<profiles_space_name>.<tableName>`.

> info ""
> Note that the Profiles Sync schema is different from the Connections Warehouse schema: `<source_name>.<tableName>`.

If your space has the same name as a source connected to your Segment Warehouse destination, Segment overwrites data to the Event tables.


> success ""
> For more on Profiles Sync logic, table mappings, and data types, download this [Profiles Sync ERD](/docs/unify/files/ERD.png) or visit [schema evolution and compatibility](/docs/connections/storage/warehouses/schema/#schema-evolution-and-compatibility).


{% comment %}

### Update your schema name

Follow the steps below to change your schema name:
{% endcomment %}

## Track event tables

Track event tables provide a complete event history, with one table for each unique named Track event. Segment syncs events based on the event sources you've connected to Unify. 

These tables include a full set of Track event properties, with one column for each property.

Segment's Identity Resolution has processed these events, which contain a `segment_id`, enabling the data to be joined into a single profile record. 

> success ""
> These tables will have two months of historical data on backfill.

> info ""
> To view and select individual track tables, edit your sync settings after you enable Profiles Sync, and wait for the initial sync to complete.



## Tables Segment materializes

With Profiles Sync, you can access the following three tables that Segment materializes for a more complete view of your profile:
- [`user_traits`](#the-user_traits-table)
- [`user_identifiers`](#the-user_identifiers-table)
- [`profile_merges`](#the-profile_merges-table)

These materialized tables provide a snapshot of your Segment profiles, batch updated according to your sync schedule. 

Visit the [selective sync](/docs/unify/profiles-sync/#using-selective-sync) setup page to enable the following materialized tables, which Segment disables by default.

You can also use [historical backfill](/docs/unify/profiles-sync/profiles-sync-setup/#using-historical-backfill) with tables Segment materializes.

> warning ""
> For materialized view tables, you must have delete permissions for your data warehouse. 


### The user_traits table

With the `user_traits` table, you'll see all traits that belong to a profile, represented by the `canonical_segment_id`. Use this table for a complete picture of your Profiles Sync data with external data sources such as customer purchase history, product usage, and more. 

- This view is a fixed schema, and contains a row for each trait associated with the profile.
- As new traits are added to the profile, new rows are added to the table.

When a merge occurs, two things happen:
1. Segment deletes the **merge from** profile in the table, along with with all the traits that belong to it.
2. Segment updates the **merge to** profile with the traits from the profile deleted in step 1.
- For any conflicting traits, Segment appends the most recent trait to the profile.


This table has the following columns:

| field                         | description                                                                                         |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `canonical_segment_id`              | The fully-merged Segment ID (the profile Segment now understands any events or identifiers to map to).                                    |
| `name`                              | The name of the trait provided by a customer's Identify payload.                              |
| `value`                             | The value of the trait provided by the customer's Identify payload.                              |
| `seq`                               | A sequential value derived from the timestamp. Enables ordering/sorting within a given unique trait. |
| `received_at`                       | The timestamp when the Segment API receives the payload from the client or server.                            |
| `uuid_ts`                           | A unique identifier of the timestamp.                           |
| `timestamp`                         | The UTC-converted timestamp set by the Segment library.                            |


### The user_identifiers table

The `user_identifiers` table contains all external ID values that map to a profile, which is represented by the `canonical_segment_id`. 

With the `user_identifiers` table:
- There's one row per identifier associated with the profile. This view has a fixed schema. 
- As new identifiers are added to a profile, new rows are added to the table.

When a merge occurs:
1. Segment deletes the **merge from** profile in the view, along with all associated identifiers.
2. Segment updates the **merge to** profile with the identifiers that belonged to the profile deleted in step 1. 

This table has the following columns:


| field                         | description                                                                                         |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `canonical_segment_id`            | The fully-merged Segment ID (the profile Segment now understands any events or identifiers to map to).       |
| `type`            | The type of external identifier sent in the incoming event, such as `user_id` or `anonymous_id`. External identifiers become the identities attached to a user profile.       |
| `value`            | The value of the trait provided by the customer's Identify payload.        |
| `seq`            | A sequential value derived from the timestamp. Enables ordering/sorting within a given unique trait.       |
| `received_at`                       | The timestamp when the Segment API receives the payload from the client or server.                            |
| `uuid_ts`                           | A unique identifier of the timestamp.                           |
| `timestamp`                         | The UTC-converted timestamp set by the Segment library.                            |

### The profile_merges table

The `profile_merges` table contains all mappings from a `segment_id` to a profile, represented by the `canonical_segment_id`. This mapping indicates that a profile has been created within Segment.

With the `profile_merges` table:
- There's one row per profile associated with the `canonical_segment_id` that represents the profile. This view is a fixed schema. 
- When a profile is created, a new row is created with the `segment_id` and `canonical_segment_id` having the same value.


When a merge occurs:
1. Segment deletes the **merge from** profile, along with all Segment IDs that belong to it. 
2. Segment updates the **merge to** profile with Segment IDs that previously belonged to the profile deleted in step 1. 

This table has the following columns:


| field                         | description                                                                                         |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `canonical_segment_id`            | The fully-merged Segment ID (the profile Segment now understands any events or identifiers to map to).        |
| `segment_id`            | The profile ID that Segment appends to an event or an identifier at the time it was first observed.       |
| `seq`            | A sequential value derived from the timestamp. Enables ordering/sorting within a given unique trait.       |
| `received_at`                       | The timestamp when the Segment API receives the payload from the client or server.                            |
| `uuid_ts`                           | A unique identifier of the timestamp.                           |
| `timestamp`                         | The UTC-converted timestamp set by the Segment library.                            |


## Tables you materialize 
 
You can materialize the following tables with your own tools, or using Segment's [open-source dbt models](https://github.com/segmentio/profiles-sync-dbt){:target="_blank"}:

- [`id_graph`](#the-idgraph-table)
- [`external_id_mapping`](#the-externalidmapping-table)
- [`profile_traits`](#the-profiletraits-table)

You might want to materialize your own tables if, for example, you want to transform additional data or join Segment profile data with external data before materialization.

> success ""
> You can alternatively use tables that Segment materializes and syncs to your data warehouse. [Learn more](/docs/unify/profiles-sync/tables/#tables-segment-materializes) about the tables Segment materializes.

> warning ""
> Please note that dbt models are in beta and need modifications to run efficiently on BigQuery, Synapse, and Postgres warehouses. Segment is actively working on this feature.

Every customer profile (or `canonical_segment_id`) will be represented in each of the following tables.

### The id_graph table

This table represents the current state of your identity graph, showing only where a `segment_id` is now understood to point.

The most recent entry for each `segment_id` from `id_graph_updates` reflects this. After the four example events, `id_graph` would show the following:

| `segment_id` (varchar) | `canonical_segment_id` (varchar) | `timestamp`  (datetime) |
| ---------------------- | -------------------------------- | ----------------------- |
| `profile_1`            | `profile_1`                      | 2022-05-02 14:01:00     |
| `profile_2`            | `profile_1`                      | 2022-06-22 10:48:00     |


Segment drops most diagnostic information from this table, since it’s designed for reference use. In this case, you’d learn that any data references to `profile_2` or `profile_1` now map to the same customer, `profile_1`.

### The external_id_mapping table

Use this table to view the full, current-state mapping between each external identifier you’ve observed and its corresponding, fully-merged `canonical_segment_id`.

In the case study example, you’d see the following:

| `canonical_segment_id` (varchar) | `external_id_type` (varchar) | `external_id_value` (varchar) | `timestamp` (datetime) |
| -------------------------------- | ---------------------------- | ----------------------------- | ---------------------- |
| `profile_1`                      | `anonymous_id`               | `5285bc35-05ef-4d21`          | `2022-05-02 14:01:00`  |
| `profile_1`                      | `email`                      | `jane.kim@segment.com`        | `2022-05-02 14:01:47`  |
| `profile_1`                      | `anonymous_id`               | `b50e18a5-1b8d-451c`          | `2022-06-22 10:48:00`  |


### The profile_traits table

Use the `profile_traits` table for a singular view of your customer. With this table, you can view all custom traits, computed traits, SQL traits, audiences, and journeys associated with a profile in a single row.

The `profile_traits` table contains the last seen value for any of your customer profile traits that Segment processes as an Identify call.

If Segment later merges away a profile, it populates the `segment_id` it merged in the `merged_to` column.

In the case study example, Segment only collected email.  As a result, Segment would generate the following `profile_traits` table:

| `canonical_segment_id` (varchar) | `email`  (varchar)     | `merged_to` (varchar) |
| -------------------------------- | ---------------------- | --------------------- |
| `profile_1`                      | `jane.kim@segment.com` |                       |
| `profile_2`                      |                        | `profile_1`           |

> info "Merged profiles"
> Profiles that Segment merges away are no longer canonical.
