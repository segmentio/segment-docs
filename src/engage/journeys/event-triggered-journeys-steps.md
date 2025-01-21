---
title: Event-Triggered Journeys Steps
plan: engage-foundations
---

[Event-Triggered Journeys](/docs/engage/journeys/event-triggered-journeys/) in Engage are powered by versatile steps that enhance their flexibility and effectiveness. 

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

The Hold Until step can restart when a specified event reoccurs. This ensures that the hold duration resets and the [journey context](/docs/engage/journeys/journey-context/) updates with the most recent event data.

When the same event occurs again, the hold timer resets and the journey context is updated with the latest event data. For example, in an abandoned cart journey, if a user modifies their cart, restarting the step ensures updated cart contents and prevents premature follow-ups.

Enable this feature by selecting Send profiles back to the beginning of this step each time this branch event occurs in the step configuration. Segment recommends putting branches for recurring events at the top of the list to improve readability.

![Flow diagram of an Event-Triggered Journey for an abandoned cart scenario. The journey starts with a trigger event labeled 'Cart_Modified,' followed by a 'Hold Until' step checking if the user buys within two hours. The Hold Until step includes three branches: 'User updated cart, reset timer' for additional cart modifications, 'User purchased' triggered by an 'Order_Confirmation' event, and a 'Maximum hold duration' fallback set to two hours, which leads to a 'Send Abandonment Nudge' step. The flow ends with a 'Completed' state.](images/hold_until.png)

In this example, users enter the journey when they modify their cart and wait for either a purchase or two hours to pass. If the user modifies their cart again during those two hours, the cart contents are updated, and the two-hour timer resets. As a result, follow-ups reflect the latest information.

#### Event name aliases
Aliases let you reuse the same event in multiple branches or steps without losing track of data. Assign unique names to make sure the journey retains both the most recent and earlier occurrences of the event.

By default, the most recent event overwrites previous data. When you use aliases, though, each branch or step can maintain its own version of the event for more granular control. For example, in a user onboarding journey, you can track separate instances of the `Signup Completed` event across different branches by adding the branch name to the event in the journey context.

### Managing Hold until steps

Deleting a Hold until step can impact downstream steps that rely on it. When you delete a configured step, Segment displays a modal that summarizes the potential impact on related branches and steps. Review all dependencies carefully to avoid unintentionally disrupting the journey.

## Send to destination

The **Send to Destination** step lets you send journey data to one of your [configured Engage destinations](/docs/connections/destinations/), enabling real-time integration with tools like marketing platforms, analytics systems, or custom endpoints.

This step supports Actions Destinations (excluding list destinations) and destination functions. It doesn't support storage destinations or classic (non-Actions) destinations.

### How Send to destination works

When a journey reaches the Send to destination step, the journey packages the relevant data and sends it to your chosen destination. This could be a third-party platform, like a marketing tool, or a custom destination built using [Destination Functions](/docs/connections/functions/destination-functions/). The data that Segment sends includes key attributes from the journey context, profile traits, and any mapped fields you’ve configured.

### Configure the Send to destination step

> info "Set a destination up first"
> Before you add configure this step, make sure you've already set up the destination(s) in Engage.

Here’s how to configure this step within a journey:

1. Select and name the step:
   - Choose the destination for the data.
   - (Optional:) Assign a unique name for clarity on the journey canvas.
2. Choose the action:
   - Define the change to trigger in the destination, like adding a user to a list or updating a record.
   - For Destination Functions, the behavior is defined in the function code, so no action selection is needed.
3. Configure and map the event:
   - Name the event sent to the destination.
   - Add profile traits to include in the payload.
   - View a payload preview to map [journey context attributes](/docs/engage/journeys/journey-context/#send-to-destination) to destination fields.
   - Test the payload to ensure proper delivery and validation.

Before activating the journey, **send a test event to verify that the payload matches your expectations** and that it reaches the destination successfully.

### Destination event payload schema

The events that Segment sends to destinations from Event-Triggered Journeys include an object called `journey_context` within the event’s properties. The `journey_context` object contains:
- The triggering event that started the journey.
- Any events received during a Hold until step.
- The properties associated with these events.

You can also optionally include profile traits to provide richer context for the destination. Here's an example of the payload structure:

```json
{
  "event": "<<YOUR CUSTOM EVENT NAME>>",
  "type": "track",
  "userId": "test-user-67",
  "timestamp": "2025-01-15T02:02:15.908Z",
  "receivedAt": "2025-01-15T02:02:15.908Z",
  "originalTimestamp": "2025-01-15T02:02:15.908Z",
  "context": {
    "personas": {
      "computation_class": "journey_step",
      "computation_id": "journey_name__step_name_8943l",
      "computation_key": "journey_name__step_name_8943l",
      "event_emitter_id": "event_tester_lekqCASsZX",
      "namespace": "spa_w5akhv1XwnGj5j2HVT6NWX",
      "space_id": "spa_w5akhv1XwnGj5j2HVT6NWX"
    }
  },
  "properties": {
    "journey_context": {
      "triggering_event": {
        "organization": "Pied Piper",
        "compression_ratio": 5.2,
        "output_code": "not_hotdog"
      },
      "event_from_hold_until_step": {
        "organization": "Tres Commas",
        "user_name": "Russ Hanneman",
        "output_code": "always_blue"
      }
    },
    "journey_metadata": {
      "journey_id": "2GKsjADZkD",
      "epoch_id": "yiC2qPZNIS"
    },
    "user_name": "Richard Hendricks",
    "coding_style": "tabs_only",
    "pivot_count": 12
  },
  "messageId": "personas_up0crko4htawmo2c9ziyq"
}
```

This example shows how data is structured and enriched with contextual details so that destinations receive the information they need to act effectively.

### Managing activations

Activations control the configuration for sending data to destinations, including the destination type, selected action, and mapped attributes. Managing activations allows you to adjust how data flows to a destination without altering the overall journey logic.

#### Editing activations

You can make updates to an existing activation to align mapped attributes with changes in the downstream schema, as well as to add or remove profile traits included in the payload.

To edit or delete an activation, click the destination name in the journey canvas and select the **More** menu. Changes apply only to new journey entries after saving your updates.

#### Deleting activations

If you delete an activation, future instances of the journey step will fail to send data to that destination. To avoid disruptions, make sure you've configured alternative logic or destintions before removing an activation.