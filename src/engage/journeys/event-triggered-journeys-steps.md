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

### Additional features

#### Send profiles back to the beginning of this step

The Hold Until step can restart when a specified event reoccurs. This ensures that the hold duration resets and the journey context updates with the most recent event data.

When the same event occurs again, the hold timer resets and the journey context is updated with the latest event data. For example, in an abandoned cart journey, if a user modifies their cart, restarting the step ensures updated cart contents and prevents premature follow-ups.

Enable this feature by selecting Send profiles back to the beginning of this step each time this branch event occurs in the step configuration. Segment recommends putting branches for recurring events at the top of the list to improve readability.

![Flow diagram of an Event-Triggered Journey for an abandoned cart scenario. The journey starts with a trigger event labeled 'Cart_Modified,' followed by a 'Hold Until' step checking if the user buys within two hours. The Hold Until step includes three branches: 'User updated cart, reset timer' for additional cart modifications, 'User purchased' triggered by an 'Order_Confirmation' event, and a 'Maximum hold duration' fallback set to two hours, which leads to a 'Send Abandonment Nudge' step. The flow ends with a 'Completed' state.](images/hold_until.png)

In this example, users enter the journey when they modify their cart and wait for either a purchase or two hours to pass. If the user modifies their cart again during those two hours, the cart contents are updated, and the two-hour timer resets. As a result, follow-ups reflect the latest information.
