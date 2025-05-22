---
title: Event-Triggered Journeys Exit Rules
plan: engage-foundations
---

Journey Exit Rules automatically remove users from a journey when certain conditions are met, helping you avoid sending irrelevant messages after a user takes actions like making a purchase or canceling a subscription. 

Exit Rules also reduce the need for complex branching by letting you define clear endpoints.

> info "Public Beta"
> Event-Triggered Journeys is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

## How exit rules work

Segment continuously evaluates exit rules as users move through a journey. If a user performs an event that matches one of the configured rules, they exit immediately from their current step.

You can optionally send a final event to a destination before the user exits. This lets you notify other downstream systems, like marketing or analytics platforms, about the exit.

Exit rules don't wait for a profile to reach a specific step; they apply globally and override any normal progression through the journey. Once a user exits, they won't proceed to any additional steps.

## Configuring exit rules

You'll set up exit rules in the journey’s settings panel. By default, journeys don’t have any exit conditions, but you can choose to add up to five exit events.

## Basic setup

To get started, open your journey settings and look for the Exit Rules section. You’ll see two options:

- **Users don't exit early** (default)
- **Exit when user performs events

Choose the second option to begin defining exit conditions.

### Adding exit events

For each exit rule, choose the event that should trigger the exit. You can also apply filters to narrow down which versions of the event qualify. For example, you might exit only when a `Subscription_Cancelled` event includes `reason = churn`.

You can optionally require that the exit event matches the same identifier used in the entry event. This helps tie the two together, like if a journey starts with a `Cart_Modified` event and should exit only when `Order_Purchased.cart_id` matches the same cart.

Each exit rule must be mutually exclusive. 

### Destination sends (optional)

You can configure a single destination to receive data when a user exits due to an exit rule. To do this:

1. Enable **Send to destination before exit** in the exit rule setup.
2. Choose which exit events should trigger the send.
3. Define the payload using data from the entry event, exit event, and journy context (if available).

Keep in mind that Segment only includes journey context collected before the exit event. The payload preview shows all possible fields, but the actual send includes only the data available at the time of exit.
