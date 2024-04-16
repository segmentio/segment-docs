---
title: Handling Duplicate Data
---

Segment guarantees that 99% of your data won't have duplicates within an approximately 24 hour look-back window. Warehouses and Data Lakes also have their own secondary deduplication process to ensure you store clean data.

## 99% deduplication

Segment has a special deduplication service that sits behind the `api.segment.com` endpoint and attempts to drop 99% of duplicate data. Segment stores at least 24 hours' worth of event `messageId`s, which allows Segment to deduplicate any data that appears with the same `messageId` within the stored values. 

Segment deduplicates on the event's `messageId`, _not_ on the contents of the event payload. Segment doesn't have a built-in way to deduplicate data for events that don't generate `messageId`s. The message de-duplication is not scoped to a specific source or a workspace, and applies to all events being received by Segment.

> info ""
> Keep in mind that Segment's libraries all generate `messageId`s for each event payload, with the exception of the Segment HTTP API, which assigns each event a unique `messageId` when the message is ingested. You can override these default generated IDs and manually assign a `messageId` if necessary.

## Warehouse deduplication
Duplicate events that are more than 24 hours apart from one another deduplicate in the Warehouse. Segment deduplicates messages going into a Warehouse ([including Profiles Sync data](/docs/unify/profiles-sync/)) based on the `messageId`, which is the `id` column in a Segment Warehouse.

## Data Lake deduplication
To ensure clean data in your Data Lake, Segment removes duplicate events at the time your Data Lake ingests data. The Data Lake deduplication process dedupes the data the Data Lake syncs within the last 7 days with Segment deduping the data based on the `messageId`.
