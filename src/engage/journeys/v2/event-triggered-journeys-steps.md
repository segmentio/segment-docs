---
title: Event-Triggered Journeys Steps
plan: engage-foundations
redirect_from:
  - "/engage/journeys/event-triggered-journeys-steps"
---

[Event-Triggered Journeys](/docs/engage/journeys/event-triggered-journeys/) in Engage use steps to control how users move through a journey based on their actions or predefined conditions.

Steps are the building blocks of a journey. This page explains the **Hold until**, **Delay**, **Data split**, **Randomized split**, and **Send to Destination** steps, which enable precise control over journey progression and data delivery.

## Hold Until: smart pauses in journeys

The **Hold Until** step adds a deliberate pause in a journey, waiting for specific user actions or a predefined time limit before progressing. This lets you create highly personalized experiences by responding to user behavior (or the lack thereof) at the right moment.

Because the Hold Until step introduces a checkpoint in your journey where the next action depends on user behavior, it creates opportunities for:
- Personalization, by tailoring user interactions based on their actions.
- Efficiency, helping you avoid sending irrelevant messages by waiting for meaningful triggers.

### How Hold Until works

When a journey reaches a Hold Until step:

1. It pauses and waits for one of the configured events to occur.
2. If the event occurs, the journey moves down the corresponding branch immediately.
3. If no event occurs within the specified time, the journey moves down the default maximum hold duration branch.

### Configurable parameters

The following table explains the parameters you can configure for the Hold Until step:

| Parameter             | Details                                                                                                                                                                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Branches              | Configure up to 9 event branches, each tied to a specific event and optional event property filters. <br> Events must share a unique identifier with the entry event if the journey allows re-entry. <br>  Branches must be mutually exclusive to avoid validation errors. |
| Filters               | Event properties refine the triggering conditions for a branch.                                                                                                                                                                                                            |
| Maximum hold duration | The fallback branch activates after the hold period, ranging from 5 minutes to 182 days (about 6 months)                                                                                                                                                           |

### Additional features

The Hold Until step includes optional settings that let you customize how Segment stores and processes events in your journey. These features give you more control over event timing, data inclusion, and journey logic.

#### Send profiles back to the beginning of this step

The Hold Until step can restart when a specified event reoccurs. This resets the hold duration and updates the [journey context](/docs/engage/journeys/journey-context/) with the most recent event data.

When the same event occurs again, the hold timer resets, and Segment updates the journey context with the latest event data. However, Segment only includes events in the journey context if the profile follows the branch where the event was processed. 

For example, in an abandoned cart journey, if a user modifies their cart during the hold period, the cart contents are updated and the two-hour timer resets. This prevents premature follow-ups and keeps the data up-to-date.

Enable this feature by selecting **Send profiles back to the beginning of this step each time this branch event occurs** in the step configuration. For more details about how journey context handles triggering events, see [Destination event payload schema](/docs/engage/journeys/event-triggered-journeys-steps#destination-event-payload-schema).

Segment recommends putting branches for recurring events at the top of the list to improve readability.

![Flow diagram of an Event-Triggered Journey for an abandoned cart scenario. The journey starts with a trigger event labeled 'Cart_Modified,' followed by a 'Hold Until' step checking if the user buys within two hours. The Hold Until step includes three branches: 'User updated cart, reset timer' for additional cart modifications, 'User purchased' triggered by an 'Order_Confirmation' event, and a 'Maximum hold duration' fallback set to two hours, which leads to a 'Send Abandonment Nudge' step. The flow ends with a 'Completed' state.](../images/hold_until.png)

In this example, users enter the journey when they modify their cart and wait for either a purchase or two hours to pass. If the user modifies their cart again during those two hours, the cart contents are updated, and the two-hour timer resets. As a result, follow-ups reflect the latest information.

#### Event name aliases
Event name aliases let you reuse the same event in multiple branches or steps without losing track of data. This approach encourages data clarity and integrity by preserving event-specific context for each branch or step where the alias is applied.

By default, when the same event is triggered multiple times, the most recent event data overwrites earlier occurrences. When you use aliases, though, each branch or step can maintain its own version of the event for more granular control. This is especially useful in journeys that involve repeated events or complex branching logic.

For example, an onboarding journey with a `Signup Completed` event could trigger multiple actions:
- In one branch, the event leads to an email sequence welcoming the user.
- In another branch, the same event triggers a survey request.

As another example, consider the `Cart_Modified` event in an abandoned journey:
1. A user enters the journey by modifying their cart, which triggers the `Cart_Modified` event.
2. During the Hold Until step, the user modifies their cart four more times.

The destination payload after the Hold Until step would look like this:

```json
{
  "properties": {
    "journey_context": {
      "Cart_Modified": {
        "organization": "Duff Brewery",
        "compression_ratio": 5.2,
        "output_code": "not_hotdog"
      },
      "Cart_Modified - user updates cart": {
        "organization": "Acme Corp",
        "user_name": "Homer Simpson",
        "output_code": "always_blue"
      }
    }
  }
}
```

In this example:
- `Cart_Modified` captures the properties of the first event that initiated the journey.
- `Cart_Modified - user updates cart` captures the most recent modification within the Hold Until branch.


Segment generates aliases for each instance of an event by concatenating the event name and branch name (for example, `Cart_Modified - user updates cart`, like in the previous payload example). This approach allows both branches to retain the specific event context needed for their respective actions.

Segment creates these aliases automatically during setup, and they show up in the journey context and downstream payloads. While you can't customize alias names, using clear and meaningful branch names helps maintain clarity and precise tracking.

### Managing Hold Until steps

Deleting a Hold Until step can impact downstream steps that rely on it. When you delete a configured step, Segment displays a modal that summarizes the potential impact on related branches and steps. Review all dependencies carefully to avoid unintentionally disrupting the journey.

## Fixed delays

The **Delay** step helps you control the timing of journey actions by pausing profiles for a set period before they continue in the journey. This enables controlled timing for messages, actions, or other journey events.

Unlike the Hold Until step, Delay doesn't depend on a user action: profiles always move down the journey after the time you set. This makes Delay useful for pacing interactions, like spacing out emails, without requiring user engagement.

### How Delay works

When a journey reaches the Delay step:

1. Profiles enter the step and wait for the configured duration.
2. Segment logs the profile's status in the observability timeline.
3. If the profile meets an exit condition during the hold period, the profile leaves the journey early.
4. After the delay ends, the profile moves to the next step in the journey.

### Configurable parameters

The following table explains the parameters you can configure for the Delay step:

| Parameter          | Details                                                 |
| ------------------ | ------------------------------------------------------- |
| Duration time unit | Set the delay period in minutes, hours, days, or weeks. |
| Minimum delay      | 5 minutes                                               |
| Maximum delay      | 182 days (around 6 months)                              |

To configure the Delay step:

1. Drag the Delay step onto the journey canvas, or click **+** to add it.
2. (*Optional*) Give the step a unique name.
3. Enter a duration and select a time unit (minutes, hours, days, weeks).
4. Click **Save**.

## Data split

The **Data split** step sends profiles down different branches based on event property values, audience membership, or profile traits. This lets you personalize how users move through a journey, like:

1. Sending different messages to new users instead of returning customers.
2. Personalizing campaigns based on user membership tier.
3. Sending different discount codes based on a user's total cart value.

Data split is useful when you want to take different actions based on what you already know about the user or event properties, rather than waiting for a new event. For example, you might use it to separate users who haven’t purchased in 30 days from those who lapsed 90 days ago, or from users who are still actively engaged.

### How Data split works

When a profile reaches a Data split step:

1. Segment checks whether the event properties or profile data matches the first branch’s conditions.
2. If not, it checks the next branch, and so on, in the order shown in the journey.
3. The journey instance moves down the first branch it qualifies for. Each profile can only follow one branch.
4. If none of the logic branches resolve to true, it goes down the everyone else branch.

### Configuration options

You can configure up to nine branches in a Data split step. Each branch can have one or more conditions:

| Condition type       | Description                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------|
| With trait           | The profile includes a specific trait and value.                                                                |
| Without trait        | The profile does not include a specific trait.                                                                  |
| Part of audience     | The profile is a member of a selected audience at the time of evaluation.                                       |
| Not part of audience | The profile is not a member of a selected audience.                                                             |
| With journey context | The event properties in context (from triggering or hold until events) match conditions.                        |

You can also give branches uniques name to differentiate them from each other on the journey canvas.

> info "Evaluation is sequential"
> Segment evaluates branches in the order they appear in the configuration side sheet. If a profile qualifies for multiple branches, Segment sends it down the first one it matches. Profiles can't qualify for more than one branch, and Segment doesn't wait for audience membership to update after the profile enters the step. You can change the evaluation order by dragging branches up or down in the configuration side sheet.

### Example: Target different customer types or event properties

You can use a Data split to branch profiles based on event properties, traits, or audience membership that already exist on the profile when it reaches this step. For example:

- Journey instances where the triggering event had a `transaction_total` > $100 are sent specific messaging about their high-ticket purchase.
- Profiles with a known `email_subscription_status` trait get treated as existing customers.
- Profiles that belong to a `VIP` audience are routed down a separate path for high-value users.
- Profiles with a specific set of traits (like favorite color and a known name) can receive personalized messaging.
- Everyone else continues through a general branch with default messaging.

This setup helps tailor journey experiences using reliable, preexisting data. Because the Data split step evaluates conditions instantly, it works best with traits or audience membership that Segment has already computed before the profile enters the step.

## Randomized Split (V2)

The **Randomized Split** step lets you experiment with and test the performance of different journey paths. You can add up to five branches, assign each one a percentage, and Segment will randomly send users down one of the branches based on the configured distribution.

This step is useful for A/B testing, holdout groups, and comparing different channels or messaging strategies within a single journey.

For example, you might create a randomized split that sends 40% of users to an email campaign, 40% to an SMS campaign, and 20% to a control group. Once users move through the split, you can evaluate which approach performed best.

### How Randomized Split works

When a profile reaches the Randomized Split step:

1. Segment randomly assigns the profile to one of the branches based on the defined percentages.
2. The profile immediately moves down the assigned path.
3. By default, if a user re-enters the journey later, they’re assigned a new random branch. You can optionally choose to keep them in the same branch each time they re-enter.

Segment evaluates each journey instance independently. This means a user could be assigned to different branches across multiple entries, unless you enable consistent assignment.

### Configuration options

You can configure a Randomized Split step with the following options:

| Setting                  | Description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| Branches                 | Add up to five branches. Each branch must be assigned a percentage.          |
| Distribution percentages | Define what portion of users should go down each branch. Total must be 100%. |
| Branch naming            | Branches are labeled alphabetically (for example, Branch A, Branch B).       |
| Assign same branch       | Optionally ensure a user always enters the same branch on re-entry.          |

Segment won't let you save or publish your journey if the percentages don’t add up to 100%, or if any percentage is left blank.

> info "Actual branch counts may differ from percentages"  
> The Randomized Split step assigns users to branches based on probability, not fixed rules. At lower volumes, the actual distribution may not match your configured percentages exactly, but results typically even out with more traffic.

To add a Randomized Split to your journey:

1. From the journey canvas, click **+** to add a new step.
2. Select **Randomized Split**.
3. Give the step a unique name.
4. Add up to five branches and assign a percentage to each one.
5. (Optional) Enable **Assign same branch** if you want users to always go down the same branch on re-entry.
6. Click **Save**.

Once configured, Segment routes profiles through this step based on your distribution settings.

### Analyze performance

After users pass through the Randomized Split step, you can view historical and in-progress counts for each branch in the Journey Overview.

You can measure results by total journey instances, unique profiles, funnel view, and in-progress view.

This helps you evaluate which branch is performing best and informs how you might structure future journeys.

## Send to Destination

The **Send to Destination** step lets you send journey data to one of your [configured Engage destinations](/docs/connections/destinations/), enabling real-time integration with tools like marketing platforms, analytics systems, or custom endpoints.

This step supports Actions Destinations (excluding list destinations) and destination functions. It doesn't support storage destinations or classic (non-Actions) destinations.

### How Send to Destination works

When a journey reaches the Send to Destination step, the journey packages the relevant data and sends it to your chosen destination. This could be a third-party platform, like a marketing tool, or a custom destination built using [Destination Functions](/docs/connections/functions/destination-functions/). The data that Segment sends includes key attributes from the journey context, profile traits, and any mapped fields you’ve configured.

### Configure the Send to Destination step

> info "Set a destination up first"
> Before you add configure this step, make sure you've already set up the destination(s) in Engage.

Here’s how to configure this step within a journey:

1. Select and name the step:
   - Choose the destination for the data.
   - (Optional:) Assign a unique name for clarity on the journey canvas.
2. Choose the action:
   - Define the change to trigger in the destination, like updating a record.
   - For Destination Functions, the behavior is defined in the function code, so no action selection is needed.
3. Configure and map the event:
   - Name the event sent to the destination.
   - Add profile traits to include in the payload.
   - View a payload preview to map [journey context attributes](/docs/engage/journeys/journey-context/#send-to-destination) to destination fields.
   - Test the payload to ensure proper delivery and validation.

Before activating the journey, **send a test event to verify that the payload matches your expectations** and that it reaches the destination successfully.

### Destination event payload schema

The events that Segment sends to destinations from Event-Triggered Journeys include an object called `journey_context` within the event’s properties. The `journey_context` object contains:
- The event that triggered the journey, unless it was replaced by a new event in a Hold Until step.
- Events received during a Hold Until step, but only if the profile followed the branch where the event happened.
- The properties associated with these events.

You can also optionally include profile traits to provide richer context for the destination. 

Here’s a detailed example of a payload structure, highlighting the journey context and how Segment enriches event data:

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

### Warehouse enrichment (Data Graph)

If your workspace uses [Data Graph](/docs/unify/data-graph/), you can add attributes from warehouse entities to the destination payload. Segment joins entity data using an ID in journey context and includes the selected attributes alongside existing journey context. Enrichment doesn’t change the underlying journey events.

> info "Setup checklist"
> Before you add warehouse entities, verify that Data Graph is set up and synced. Choose the entity with the attributes you need. Confirm the join ID exists in journey context when the step runs.

#### Configure enrichment

Follow these steps to add attributes from the warehouse:

1. Select the Data Graph entity you want to pull attributes from.
2. Choose the join ID in journey context that matches the entity’s primary key.
3. Pick the attributes to include; the preview updates as you add them.
4. Check the payload preview. Attributes appear under `properties.journey_context.<EntityName>`.
5. (Optional:) Map the enriched fields to your destination schema.

Here's an example of an enriched payload:

```json
{
  "properties": {
    "journey_context": {
      "Reservation Booked": {
        "reservation_id": 12345,
        "hotel_id": 67890
      },
      "Reservations": {
        "check_in_time": "2025-11-01T20:00:00Z",
        "check_out_time": "2025-11-04T15:00:00Z"
      },
      "Hotels": {
        "hotel_name": "Hotel California",
        "hotel_address": "1000 Sunset Boulevard, Los Angeles, CA"
      }
    }
  }
}
```

> warning "Publish timing for enrichment"
> When you publish a journey with enrichment enabled, Segment starts a job to prepare enrichment.The journey stays in a publishing state until enrichment is available. If the cache isn’t populated within 5 hours, the publish fails. Resolve Data Graph sync or join-ID issues, then publish again.


### Managing activations

Activations control the configuration for sending data to destinations, including the destination type, selected action, and mapped attributes. Managing activations allow you to adjust how data flows to a destination without altering the overall journey logic.

#### Editing activations

You can make updates to an existing activation to align mapped attributes with changes in the downstream schema and add or remove profile traits included in the payload.

To edit or delete an activation, click the destination name in the journey canvas and select the **More** menu. Changes apply only to new journey entries after saving your updates.

#### Deleting activations

If you delete an activation, future instances of the journey step will fail to send data to that destination. To avoid disruptions, make sure you've configured alternative logic or destinations before removing an activation.

### Handling missing attributes

There may be cases where events sent to Segment are missing specific properties or when profile traits are unavailable. How Segment handles these scenarios depends on whether the attribute is explicitly mapped.

#### If values are not mapped

- When an event property is configured but it's not present in the incoming [Track event](/docs/connections/spec/track/), that property gets excluded from the payload sent to the destination.
- Similarly, if a trait is configured but isn't present on the profile, the trait gets excluded from the payload.

#### If values are mapped

- If an event property is mapped but is missing in the Track event, Segment still includes the mapped key in the payload but with a value of `undefined`.
- Similarly, if a mapped trait is missing on the profile, the key is included in the payload with a value of `undefined`.

Carefully configuring mappings and handling missing attributes can help you maintain data integrity and avoid errors in downstream systems.
