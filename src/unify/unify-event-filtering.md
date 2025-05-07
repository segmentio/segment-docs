---
title: Unify Event Filtering
plan: unify
---

Unify Event Filtering lets you control which events reach your Unify space. 

## Overview

With Unify Event Filtering, you can use block events that aren’t useful for identity resolution or downstream activation, keeping your space cleaner and more efficient.

Event Filtering is useful when you’re sending a lot of different event types into Segment but only some of them are relevant to Unify. For example, you might want to:

- Drop telemetry or system events that don’t describe user behavior
- Filter out events from certain regions or user groups
- Keep events in Connections, but exclude them from Unify

Unify Event Filtering works differently from Destination Filters in a few important ways:

|                  | Unify Event Filtering                    | Destination Filters                     |
| ---------------- | ---------------------------------------- | --------------------------------------- |
| Where it applies | Unify space                              | Individual destinations                 |
| Filter scope     | All sources connected to the space       | One source for each destination         |
| Filter action    | Drops entire events                      | Can drop or modify events and fields    |
| Setup            | Created through API, visible in Unify UI | Created in UI or API                    |
| Timing           | Before identity resolution               | Before events get sent to a destination |
