---
title: Understanding Journeys Logic
---

{% include content/plan-grid.md name="journeys" %}

Journeys are powered by a series of Audiences and Computed Traits. This guide defines the logic used to create sequential campaigns.

By the end of this guide, you'll understand how and why users progress through your Journey. You'll also gain familiarity with the following key Journeys concepts:

- Journey entry conditions and step behavior
- How Segment evaluates Journeys step membership
- How real-time step membership works


## Entry Conditions and Step Behavior

Journeys begin with an entry condition that computes like standard [Personas Audiences](/docs/personas/audiences/). This entry condition queries your customer data in Segment to find users who meet your specified criteria.

After users meet the Journey's entry condition, their progress through the Journey depends on satisfying the criteria of subsequent Journey steps.

Journey steps operate based on the following behaviors:

- Only the entry condition can backfill event data from before Journey publication.
- The entry condition requires no previous step membership.
- Post-entry condition step membership relies on users at some point entering the preceding step.
- When a user first joins a step, Segment adds a  `step_joined_time` trait to their profile.
- Membership is calculated using Segment's [Real-Time Compute System](/docs/personas/audiences/#real-time-compute-vs-batch).
- Segment doesn't calculate Waits and Splits in real-time.

The combination of these traits, audiences, and business rules allows you to create an enforced funnel with the following implications:

- Users enter the Journey when they fulfill the entry conditions.
- Users can't re-enter the same Journey at an earlier step.
- Users can only move forward through a Journey.
- Users remain in a step indefinitely until they fulfill the next step's criteria.

## Step Membership

To enter a Journey, users must satisfy the entry conditions. 

To enter each subsequent step, three conditions must be true:


1. The user previously joined the parent step.
2. The user meets the next step's conditions.
3. The users satisfies wait conditions.


### Condition Steps

“Add a condition” steps operate like [Personas Audiences](/docs/personas/audiences/). The defined conditions provide criteria for each step's membership.

### Wait Times

When you add a “Wait” step to a Journey, Segment automatically includes wait times in the membership criteria of the next condition step.  Journeys represents wait times in relation to the `preceding_step_joined_time trait`, which must be at least N time ago.

The following table summarizes the three step membership conditions and their equivalents in written logic:

| Semantic Logic                                     | Written Logic Condition                              |
|----------------------------------------------------|------------------------------------------------------|
| Has the user ever joined the previous step?        | Does `preceding_step_audience_member` trait exist?     |
| Does the user meet the specified step conditions?  | Defined conditions in "Add a condition" step         |
| Has the user met preceding N wait time conditions? | Trait `preceding_step_joined_time` at least N time ago |

## Real-Time Step Membership

For every step after the entry step, Journeys leverages [the Personas real-time compute system](https://segment.com/docs/personas/audiences/#real-time-compute-vs-batch).

When a user's traits change or they exceed time-based conditions (for example, "within 7 days"), they may no longer fulfill the conditions of a previously joined step. If a user joins a step but no longer meets its conditions, Journeys removes them from that step's preview and analytics.  The user does, however, continue to progress through the Journey.

Consider the following example of Journey conditions for a cart abandonment campaign:


1. Entry Condition: User has clicked `add to cart` and `purchases = 0` within the last 7 days.
2. Wait Time Condition: 5 days.
3. Step Condition: User is member of `Example Audience A`
4. Send to Destination

If a user makes a purchase during the wait time of 5 days, the system would automatically update membership to `false` for the audience created from the entry condition, Step 1. However, the user could still satisfy Step Condition 3 based on the three step membership conditions:


| Semantic Logic                                     | Written Logic Condition                               |
|----------------------------------------------------|-------------------------------------------------------|
| Has the user ever joined the previous step?        | True; `preceding_step_audience_member` remains true.  |
| Does the user meet the specified step conditions?  | True; assuming user is member of `Example Audience A`. |
| Has the user met preceding N wait time conditions? | True; once 5 days has passed from initial entry.      |


To maintain best practices and enforce your funnel, re-check or modify audience conditions that follow wait steps.  For example, adding a `purchases = 0` condition to Step 3 results in Segment not advancing users who made a purchase during the wait time:

1. Entry Condition: User has clicked `add to cart` and `purchases = 0` in the last 7 days
2. Wait Time Condition: 5 days
3. Step Condition: User is member of `Example Audience A` and `purchases = 0` in the last 7 days.
4. Send to Destination

### Send to Destination steps

Because Journey members permanently remain in Destination sync steps, Segment neither sends `Audience Exit` events to Destinations nor removes users from Destinations lists.  As a result, users cannot re-enter or loop within Journeys.


## FAQs

### What happens when a user reaches a single or Multi-Split Condition step and the conditions evaluates to `false`?

Each step's membership conditions evaluate in real time, which means that users remain in a step until the immediate next step's conditions becomes true.

### Can users exit and re-enter a Journey?

Yes. To allow users to re-enter Journeys that they've exited, [enable re-entry](/docs/personas/journeys/build-journey/#journey-re-entry) during initial Journey setup.

### What happens to traits and audiences when I delete a Journey?

Deleting a Journey removes its underlying audiences from profile views in Personas Explorer.  However, the Journey's True/False traits remain in the user's last recorded state.

> info "Note"
> Cloning a Journey generates new, unique traits and sync keys.  Deleting the original Journey won't impact any cloned Journeys.

### Are splits mutually exclusive?

True/false splits enforce mutual exclusivity by ensuring that once users enter either side of a split, they can't enter the other.

Multi-branch splits don't enforce mutual exclusivity. Users can enter multiple branches of a split if they satisfy the split conditions.

### How does “Use Historical Data” backfill work?

Use Historical Data backfills the entry condition to “prime” the Journey.  Future events and existing trait memberships trigger all Journey conditions, except for entry.  As a result, event-based conditions only evaluate events that occurred after you published the Journey.

If you want to check for events that occurred before you published your Journey, base your conditions on computed traits instead.

For example, to evaluate if a user already in a Journey has ever used a discount code, create a Computed Trait for `discount_used`, and set it to `true` or `false`.

### How do time windows within step conditions work?

With time windows within step conditions, you can designate a timeframe for Segment to evaluate whether or not a user has met the condition.  Segment calculates the time window from the current point in time, not relative to any other steps in your Journey.
