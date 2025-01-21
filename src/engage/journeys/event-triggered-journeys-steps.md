---
title: Event-Triggered Journeys Steps
plan: engage-foundations
---

Event-Triggered Journeys in Engage are powered by versatile steps that enhance their flexibility and effectiveness. 

Steps are the building blocks of a journey. This page explains the the **Hold Until** and **Send to Destination** steps, which enable precise control over journey progression and data delivery. 

This guide explains how these steps work, their key features, and best practices for using them effectively.

## Hold until: smart pauses in journeys

The **Hold Until** step adds a deliberate pause in a journey, waiting for specific user actions or a predefined time limit before progressing. This lets you create highly personalized experiences by responding to user behavior—or lack thereof—at the right moment.

Because the hold until step introduces a checkpoint in your journey where the next action depends on user behavior, it creates opportunities for:

- Personalization, by tailoring user interactions based on their actions.
- Efficiency, helping you avoid sending irrelevant messages by waiting for meaningful triggers.

### How Hold until works

When a journey reaches a hold until step:

1. It pauses and waits for one of the configured events to occur.
2. If the event occurs, the instance moves down the corresponding branch immediately.
3. If no event occurs within the specified time, the instance moves down the default "maximum hold duration" branch.

### Configurable parameters

The following table explains the parameters you can configure for the Hold until step:

| Parameter             | Details                                                                                                                                                                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Branches              | Configure up to 4 event branches, each tied to a specific event and optional event property filters. <br> Events must share a unique identifier with the entry event if the journey allows re-entry. <br>  Branches must be mutually exclusive to avoid validation errors. |
| Filters               | Event properties refine the triggering conditions for a branch.                                                                                                                                                                                                            |
| Maximum hold duration | The fallback branch activates after the hold period, ranging from 5 minutes to 182 days (approximately 6 months)                                                                                                                                                           |

