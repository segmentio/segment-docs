---
title: Unify Event Filtering
plan: unify
---

Unify Event Filtering lets you control which events reach your Unify space. 

> info "Public Beta"
> Unify Event Filtering is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. 

## Overview

With Unify Event Filtering, you can use block events that aren’t useful for [Identity Resolution](/docs/unify/identity-resolution/) or downstream activation, which keeps your space cleaner and more efficient.

Event Filtering is useful when you’re sending a lot of different event types into Segment but only some of them are relevant to Unify. For example, you might want to:

- Drop telemetry or system events that don’t describe user behavior
- Filter out events from certain regions or user groups
- Keep events in Connections, but exclude them from Unify

Unify Event Filtering works differently from [Destination Filters](/docs/connections/destinations/destination-filters/) in a few important ways:

|                  | Unify Event Filtering                                            | Destination Filters                     |
| ---------------- | ---------------------------------------------------------------- | --------------------------------------- |
| Where it applies | Unify space                                                      | Individual destinations                 |
| Filter scope     | All [sources](/docs/connections/sources/) connected to the space | One source for each destination         |
| Filter action    | Drops entire events                                              | Can drop or modify events and fields    |
| Setup            | Created through API, visible in Unify UI                         | Created in UI or API                    |
| Timing           | Before Identity Resolution                                       | Before events get sent to a destination |

This helps simplify your setup and reduce noise in profile data without needing repeaters, webhooks, or custom logic.

## How filtering works 

Unify Event Filtering evaluates every incoming event before it enters your Unify space. If the event matches any of your filters, it gets dropped.

Keep the following in mind as you work with Unify Event Filtering:

- Filters are configured at the space level. You don’t create filters per source. Instead, one set of filters applies to all sources connected to the space.
- The filtering logic is based on [Filter Query Language](/docs/api/public-api/fql/). If you’ve used Destination Filters before, it works the same way. You can write expressions to match events based on type, name, traits, properties, or values.
- Matching is inclusive: if an event matches any filter, Segment drops it.
- Filtering happens **before** Identity Resolution: dropped events never reach the profile graph and won’t affect trait updates or [computed traits](/docs/unify/traits/computed-traits/).

As a result, Unify Event Filtering helps you keep profile data clean from the start, without having to preprocess or transform events outside of Segment.

## Creating and managing filters

During public beta, you'll use the [Space Filter API](https://docs.segmentapis.com/tag/Space-Filters/){:target="_blank"} to create and manage all Unify event filters. The API lets you define filters using FQL, name them, enable or disable them, and delete them. Each Unify space can have up to 10 filters. Any event that matches one of those filters gets dropped before it reaches Unify.

After you create a filter through the API, it shows up in your Segment workspace in **Unify > Unify settings > Filters**. From there, you can view existing filters, turn them on or off, rename them, or delete them. However, you can’t edit the filtering logic from within your workspace. If you want to edit filtering logic, you'll need to managed it through the API.

The following table compares what you can do with Event Filtering with the API compared your Segment workspace:

| Action                    | Where it happens    |
| ------------------------- | ------------------- |
| Create a filter           | API only            |
| Define filter logic (FQL) | API only            |
| Enable or disable filters | API or workspace    |
| Rename a filter           | API or workspace    |
| Delete a filter           | API or workspace    |
| View filters              | API or workspace    |
| Edit filter logic         | Replace in API only |

> info "Updating filter logic"
> To update a filter’s logic, you’ll need to delete the existing filter through the Space Filter API and create a new one with the updated expression.

## Best practices

Unify Event Filtering is most useful when you want to keep noisy, irrelevant, or duplicate data out of your Unify space. The following table lists best practices to help you get the most value out of filtering:

| Tip                      | Why it matters                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Filter early             | Prevents irrelevant events from affecting profile data or identity resolution.                                                                                                       |
| Drop obvious noise       | Start with telemetry, test data, or internal events.                                                                                                                                 |
| Keep it simple           | A few targeted filters are easier to manage than multiple, complex filters.                                                                                                          |
| Think at the space level | Filters apply to all sources. Write conditions accordingly.                                                                                                                          |
| Test before enabling     | Use the [preview endpoint](https://docs.segmentapis.com/tag/Destination-Filters#operation/previewDestinationFilter){:target="_blank"} to check filter behavior before turning it on. |


Unify Event Filtering gives you an early control point for managing the quality of data entering your space. It helps reduce noise, control costs, and improve the accuracy of profile data before any Identity Resolution takes place.

To learn more about how Unify spaces work and how Segment processes events after filtering, see the [Unify documentation](/docs/unify/).