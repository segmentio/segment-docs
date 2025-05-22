---
title: Event-Triggered Journeys Exit Rules
plan: engage-foundations
---

Journey exit rules automatically remove users from a journey when they meet specific conditions, like completing a purchase or canceling a subscription.

This page explains how exit rules work, how to configure them, when to use them, and how to track exits in your journey analytics. You'll also find example use cases, best practices, and key behavior notes to help you get started.

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
- **Exit when user performs events**

Choose the second option to begin defining exit conditions.

### Adding exit events

For each exit rule, choose the event that should trigger the exit. You can also apply filters to narrow down which versions of the event qualify. For example, you might exit only when a `Subscription_Cancelled` event includes `reason = churn`.

You can optionally require that the exit event matches the same identifier used in the entry event. This helps tie the two together, like if a journey starts with a `Cart_Modified` event and should exit only when `Order_Purchased.cart_id` matches the same cart.

Each exit rule must be mutually exclusive. 

> success "Exit rules Analytics"
> You can track how exit rules are performing from the journey overview, which shows total exits per rule, and from individual step details, which show where users exited.

### Destination sends (optional)

You can configure a single destination to receive data when a user exits due to an exit rule. To do this:

1. Enable **Send to destination before exit** in the exit rule setup.
2. Choose which exit events should trigger the send.
3. Define the payload using data from the entry event, exit event, and journy context (if available).

Segment only includes journey context collected before the exit event. The payload preview shows all possible fields, but the actual send includes only the data available at the time of exit.

> info "Customize messages based on the exit event"
> You can only configure one destination send for all exit events, but the payload includes the exit event details. This means your destination can still adjust messaging based on which event triggered the exit.

## Use cases

Exit rules are helpful in journeys where a user might complete their goal before reaching the end. The following table shows some common scenarios where exit rules would be helpful:

| Use case              | Exit event                                | Notes                                                                |
| --------------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| Cart abandonment      | `Order_Purchased` with matching `cart_id` | Confirms the user completed checkout before follow-up messages       |
| Trial conversion      | `Subscription_Upgraded` with `account_id` | Ends the trial flow once the user becomes a paid customer            |
| Appointment reminders | `Appointment_Cancelled`                   | Prevents reminders from going out after the appointment is canceled  |
| Subscription renewal  | `Renewal_Successful` with `user_id`       | Exits the renewal reminder journey after the subscription is renewed |


## Best practices

Follow these tips to make sure your exit rules behave as expected:

- Make exit conditions specific. Use event property filters to avoid accidental exits.
- Match identifiers when needed. Tie entry and exit events together using a shared ID like `cart_id` or `account_id`.
- Use exit sends to notify other systems. This is helpful for syncing user state across tools.
- Review your rules before publishing. You can’t edit exit rules after the journey goes live.
- Check your analytics. Exit data can help you understand where users are dropping off and why.

As you work with exit rules, keep the following in mind:

- You can configure up to 5 exit events per journey.
- Journeys support only one destination send for exit events.
- You can’t edit exit rules after publishing the journey, so double-check them first.
- If an exit rule is triggered, it overrides all other steps. The user exits immediately, even if they’re mid-delay or hold.
