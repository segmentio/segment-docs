---
title: Journeys Context
plan: engage-foundations
hidden: true
---

[Event-Triggered Journeys](/docs/engage/journeys/event-triggered-journeys/) redefine how you orchestrate and personalize customer experiences. By  **journey context**, you can dynamically adapt each journey to individual user interactions, creating highly relevant, real-time workflows.

Unlike traditional audience-based journeys, which rely solely on user progress through predefined steps, event-triggered Journeys capture and store the details of user-triggered events. This shift allows you to access the data that caused users to reach a specific step and use it to make more precise decisions throughout the journey.

With journey context, you can:

- Split journeys based on event attributes or outcomes.
- Personalize customer experiences using real-time event data.
- Enable advanced use cases like abandonment recovery, dynamic delays, and more.

> info "Private Beta"
> Event-Triggered Journeys is in private beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. During private beta, Event-Triggered Journeys is not HIPAA eligible.

## What is Journey context?

Journey context is a flexible data structure that captures key details about the events and conditions that shape a customer’s journey. Journey context provides a point-in-time snapshot of event properties, ensuring accurate and reliable data is available throughout the journey.

Journey context stores:
- **Event properties**: Information tied to specific user actions, like `Appointment ID` or `Order ID`.
- **Split evaluations**: Results of branch decisions made during the journey, enabling future steps to reference these outcomes.

Journey context doesn't store:
- **Profile traits**, which may change over time.
- **Audience memberships**, which can evolve dynamically.

This focused approach ensures journey decisions are always based on static, reliable data points.

### Examples of stored context

Event properties are the foundation of Journey context. Examples of event properties include:

- **Appointment Scheduled:**
  - `Appointment ID`
  - `Appointment Start Time`
  - `Appointment End Time`
  - `Assigned Provider Name`
- **Order Completed:**
  - `Cart ID`
  - `Order ID`
  - An array of cart contents

Segment captures each event’s properties as a point-in-time snapshot when the event occurs, ensuring that the data remains consistent for use in personalization, branching, and other advanced workflow steps.

## Using Journey context in Event-Triggered Journeys

Journey context provides the framework for capturing and referencing data about events and conditions within a journey. It allows Event-Triggered Journeys to dynamically respond to user behavior by making event-specific data available for decisions and actions at each step.

This is useful for scenarios like:

- **Abandonment recovery:** Checking whether a user completed a follow-up action, like a purchase.
- **Customizing messages:** Using event properties to include relevant details in communications.
- **Scheduling workflows:** Triggering actions based on contextual data, like the time of a scheduled appointment.

By incorporating event-specific data at each step, journey context helps ensure workflows remain relevant and adaptable to user actions.

### Journey steps that use context

Journey context gets referenced and updated at various steps in an event-triggered journey. Each step plays a specific role in adapting the journey to user behavior or conditions.

#### Wait for event split

This step checks whether a user performs a specific event within a given time window. If the event occurs, Segment adds its details to journey context for use in later steps.

For example, a journey may wait to see if a `checkout_completed` event occurs within two hours of a user starting checkout. If the event happens, the workflow can proceed; otherwise, it may take an alternate path. The data captured includes event properties (like `Order ID`) and the results of the split evaluation.

#### Context split

This step evaluates conditions using data already stored in journey context. Based on the conditions, users are routed to different branches of the journey.

For example, a user who triggers an event with a property like `order_value > 100` might be routed to one branch, while other users follow a different path. The split uses attributes from journey context, like event properties or prior split outcomes, to determine the appropriate branch.

#### Profile data split

This step evaluates user traits or audience memberships to determine branching. While Segment doesn't store profile data in journey context, it complements the static data available in the journey.

For example, users in a premium audience can be directed to a tailored experience, while others follow the standard flow. Segment stores the results of this split in journey context for reference in later steps.

#### Contextual delay

A contextual delay introduces a wait period based on time-related data in journey context. This ensures workflows align with real-world events.

For example, a journey can wait until one hour before an `Appointment Start Time` to send a reminder email. The delay reads from journey context but doesn't add any new data to it.

#### Function steps

Function steps process data from journey context through custom logic. The output of the function gets written back to context for use in later steps.

For example, a function might calculate a discount percentage based on an event property, then store that value in journey context for later use. The output gets scoped to a dedicated object (`function_output`) to keep the context structured and reliable.

#### Send to destination

The send to destination step allows journey context data to be included in payloads sent to external tools, like messaging platforms or analytics systems.

For example, a payload sent to a messaging platform might include `Order ID` and `Cart Contents` to personalize the message. Users can select which parts of journey context to include in the payload.

## Context structure

The structure of journey context ensures that event-specific data gets organized and is accessible throughout the journey workflow. By standardizing how data is stored, Segment makes it easier to reference, use, and send this information at different stages of a journey.

### How Journey context is structured

Journey context is organized as a collection of key-value pairs, where each key represents a data point or category, and its value holds the associated data. This structure supports various types of information, like event properties, split outcomes, and function outputs.

For example, when a user triggers an event like `Appointment Scheduled`, Segment stores its properties (like `Appointment ID`, `Appointment Start Time`) as key-value pairs. You can then reference these values in later journey steps or include them in external payloads.

### Example of journey context payload

The following example shows how journey context might look during a workflow. In this case, the user scheduled an appointment, and the workflow added related event data to the context:

```json
{
  "appointment_scheduled": {
    "appointment_id": "12345",
    "start_time": "2024-12-06T10:00:00Z",
    "end_time": "2024-12-06T11:00:00Z",
    "provider_name": "Dr. Smith"
  },
  "split_decision": {
    "split_name": "appointment_type_split",
    "branch_chosen": "existing_patient"
  },
  "function_output": {
    "discount_percentage": 15
  }
}
```

This payload contains:

- **Event properties**: Captured under the `appointment_scheduled` key.
- **Split outcomes**: Documented in the `split_decision` object.
- **Function results**: Stored in the `function_output` object for use in later steps.

## Next steps

Journey context underpins the flexibility and precision of Event-Triggered Journeys. By capturing key details about events and decisions as they happen, journey context lets workflows respond dynamically to user actions and conditions. 

Whether you're orchestrating real-time abandonment recovery, scheduling contextual delays, or personalizing messages with event-specific data, journey context provides the tools to make your workflows more relevant and effective.

To learn more about how Event-Triggered Journeys work and how journey context fits into the bigger picture, visit the [Event-Triggered Journeys documentation](/docs/engage/journeys/event-triggered-journeys/).