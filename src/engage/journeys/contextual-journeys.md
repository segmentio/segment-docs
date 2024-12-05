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

## What is Journey Context?

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

Each event’s properties are captured as a point-in-time snapshot when the event occurs. This ensures the data remains consistent for use in personalization, branching, and other advanced workflow steps.

## Using Journey context in Event-Triggered Journeys

Journey context is a system for capturing and referencing data about events and conditions within a customer journey. It allows Event-Triggered Journeys to respond dynamically to user behavior by making event-specific data available for decisions and actions at each step.

Journey context helps you create workflows that use real-time data, instead of relying on predefined, static rules. This is useful for scenarios like:

- **Abandonment recovery:** Checking whether a user completed a follow-up action, like a purchase.
- **Customizing messages:** Using event properties to include relevant details in communications.
- **Scheduling workflows:** Triggering actions based on contextual data, like the time of a scheduled appointment.

By incorporating event-specific data at each step, journey context helps ensure workflows remain relevant and adaptable to user actions.

### Journey steps that use context

Journey context is referenced and updated at various steps in Event-Triggered Journeys. Each of these steps plays a specific role in adapting the journey to user behavior or conditions.

#### **1. Wait for Event Split**

This step checks whether a user performs a specific event within a given time window. If the event occurs, its details are added to journey context for use in later steps.

- **Example:** A journey may wait to see if a `checkout_completed` event occurs within two hours of a user starting checkout. If the event happens, the workflow can proceed; otherwise, it may take an alternate path.
- **Details:** The data captured includes event properties (e.g., `Order ID`) and the results of the split evaluation.

#### **2. Context Split**

This step evaluates conditions using data already stored in journey context. Based on the conditions, users are routed to different branches of the journey.

- **Example:** A user who triggers an event with a property like `order_value > 100` might be routed to one branch, while other users follow a different path.
- **Details:** The split uses attributes from journey context, such as event properties or prior split outcomes, to determine the appropriate branch.

#### **3. Profile Data Split**

This step evaluates user traits or audience memberships to determine branching. While profile data is not stored in journey context, it complements the static data available in the journey.

- **Example:** Users in a premium audience can be directed to a tailored experience, while others follow the standard flow.
- **Details:** The results of this split are stored in journey context for reference in later steps.

#### **4. Contextual Delay**

A Contextual Delay introduces a wait period based on time-related data in journey context. This ensures workflows align with real-world events.

- **Example:** A journey can wait until one hour before an `Appointment Start Time` to send a reminder email.
- **Details:** The delay reads from journey context but does not add any new data to it.

#### **5. Function Steps**

Function Steps process data from journey context through custom logic. The output of the function is written back to context for use in later steps.

- **Example:** A function might calculate a discount percentage based on an event property, then store that value in journey context for later use.
- **Details:** The output is scoped to a dedicated object (`function_output`) to keep the context structured and reliable.

#### **6. Send to Destination**

The Send to Destination step allows journey context data to be included in payloads sent to external tools, such as messaging platforms or analytics systems.

- **Example:** A payload sent to a messaging platform might include `Order ID` and `Cart Contents` to personalize the message.
- **Details:** Users can select which parts of journey context to include in the payload.

<!--

3. Using Journey Context
Overview of how context supports orchestration and personalization.
Examples of event data and their role in customer journeys.
4. Journey Step Features
Subsections for:
Wait for Event Split
Context Split
Profile Data Split
Contextual Delay
Function Steps
Send to Destination
Explain how each step uses or modifies journey context.
5. Context Structure
Explanation of context organization and data flow.
Include a sample payload for reference.
6. Best Practices
Tips for optimizing journeys with context (e.g., using filters, testing).
7. Example Use Cases
Illustrative scenarios demonstrating the power of journey context in real-world applications.
8. Troubleshooting and FAQs
Common issues and resolutions.
Clarifications about limitations (e.g., context doesn’t store dynamic traits).


-->