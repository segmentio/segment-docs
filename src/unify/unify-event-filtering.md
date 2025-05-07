---
title: Unify Event Filtering
plan: unify
---

Unify Event Filtering lets you control which events reach your Unify space. 

## Overview

With Unify Event Filtering, you can use block events that aren’t useful for [identity resolution](/docs/unify/identity-resolution/) or downstream activation, keeping your space cleaner and more efficient.

Event Filtering is useful when you’re sending a lot of different event types into Segment but only some of them are relevant to Unify. For example, you might want to:

- Drop telemetry or system events that don’t describe user behavior
- Filter out events from certain regions or user groups
- Keep events in Connections, but exclude them from Unify

Unify Event Filtering works differently from [Destination Filters](/docs/connections/destinations/destination-filters/) in a few important ways:

|                  | Unify Event Filtering                    | Destination Filters                     |
| ---------------- | ---------------------------------------- | --------------------------------------- |
| Where it applies | Unify space                              | Individual destinations                 |
| Filter scope     | All sources connected to the space       | One source for each destination         |
| Filter action    | Drops entire events                      | Can drop or modify events and fields    |
| Setup            | Created through API, visible in Unify UI | Created in UI or API                    |
| Timing           | Before identity resolution               | Before events get sent to a destination |

This helps simplify your setup and reduce noise in profile data without needing repeaters, webhooks, or custom logic.

## How filtering works 

Unify Event Filtering evaluates every incoming event before it enters your Unify space. If the event matches any of your filters, it gets dropped.

Keep the following in mind as you work with Unify Event Filtering:

- Filters are configured at the space level. You don’t create filters per source. Instead, one set of filters applies to all sources connected to the space.
- The filtering logic is based on [Filter Query Language](/docs/api/public-api/fql/). If you’ve used Destination Filters before, it works the same way. You can write expressions to match events based on type, name, traits, properties, or values.
- Matching is inclusive: if an event matches any filter, Segment drops it.
- Filtering happens **before** identity resolution; dropped events never reach the profile graph and won’t affect trait updates or [computed traits](/docs/unify/traits/computed-traits/).

As a result, Unify Event Filtering helps you keep profile data clean from the start, without having to preprocess or transform events outside of Segment.

## Creating and managing filters

During public beta, managing filters requires a mix of API and Segment UI actions. You'll define and create filters using the Space Filter API, then manage their status and visibility in the Segment app.

To create a filter, use the Space Filter API to write a filtering rule using FQL. The API lets you name the filter, enable or disable it, and delete it. You can create up to 10 filters per space, and any event that matches a filter gets dropped before it reaches Unify.

After you create a filter, it shows up in your Segment workspace in **Unify > Unify settings > Filters**. From there, you can view existing filters, turn them on or off, rename them, or delete them. However, you can’t edit the filtering logic from within Segment. If you want to edit filtering logic, you'll need to managed it through the API.

The following table compares what you can do with Event Filtering with the API compared your Segment workspace:

| Action                    | Where it happens    |
| ------------------------- | ------------------- |
| Create a filter           | API only            |
| Define filter logic (FQL) | API only            |
| Enable or disable filters | API or workspace    |
| Rename a filter           | API or workspace    |
| Delete a filter           | API or workspace    |
| View filters              | Workspace only      |
| Edit filter logic         | Replace in API only |

> info "Updating filter logic"
> To update a filter’s logic, you’ll need to delete the existing filter through the Space Filter API and create a new one with the updated expression.

## Best practices