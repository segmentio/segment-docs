---
title: Linked Audiences
plan: engage-foundations
beta: true
redirect_from: 
    - '/unify/linked-profiles/linked-audiences'
hidden: false
---
info "Linked Audiences is in public beta"
> Linked Audiences is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

With Linked Audiences, you can use the relational data you've defined in your Data Graph to build audiences and send them to any downstream [actions-based destinations](/docs/connections/destinations/actions/#available-actions-based-destinations).

> info "Linked Audiences warehouse support"
>Linked Audiences supports [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/).
> warning "Linked Audiences permissions requirements"
> To set up Linked Audiences Activation, you must have Workspace Owner or Unify Read-Admin, Entities Admin, and Source Admin permissions.

To learn more about Linked Audiences use cases,  see the [Linked Audiences Use Cases](/engage/audiences/linked-audiences-use-cases/) topic.

## Getting started

To help you get started with Linked Audiences, consider the following best practices: 

- It may be helpful to first identify an entity that is directly associated with your users, such as `Accounts`, `Households`, or `Organizations`.
- From there you can define relationships between this entity with any of the other entities that may be associated with it, such as how `Accounts` can have the following: `Subscriptions`, `Purchases`, or `Carts`. 
- You can create entity relationships up to four levels in depth. For example, an entity condition that queries for relationships between `Profiles`, `Accounts`, `Credit Cards`, and `Transactions` has four levels of depth. 
- To further refine your audience, identify column values that you might want to filter your entities by, or configure profile traits and audience membership conditions. 

## Step 1: Build a Linked Audience

You can build a Linked Audience from profiles associated with an entity, trait, event, or existing audience. You can also filter on profile traits and event history, and filter on warehouse entities mapped to the Data Graph.

![Choose your audience conditions](/docs/engage/images/conditions.png)

1. Navigate to **Engage > Audiences**.
2. Click **+ New audience**, then select **Audience**.
3. On the Select type screen, select **Linked audience**, then click **Next**.
4. Select the [conditions](#conditions) to build your audience.
5. Preview your audience, then click **Next**.
- Within the preview, you can see a count of users that meet the audience criteria as well as a sample list of users.
6. Enter an audience name and description.
7. Click **Save**.

After creating the audience, you'll be redirected to the Overview page. By default, the audience is disabled. Segment recommends that you take the following actions:
1. Add a destination.
2. Configure an [event emitter](#maintain-event-emitters).
3. Enable the audience. 

This will trigger a compute for the audience (where the audience conditions will run on your data warehouse) and will send events downstream.

#### Event Conditions

As you're building your Linked Audience, you can choose from the following event conditions:

| Event Conditions     | Description                           |
|---------------------------|---------------------------------------|
| Associated with an entity   | Creates a condition that filters profiles associated with entity relationships defined in the [Data Graph](/docs/unify/linked-profiles/data-graph/). With this condition, you can traverse the full nested entity relationship and filter your audience on entity column values.       |
| Where profile trait     | Creates a condition that filters profiles with a specific trait. |
| Part of an audience     | Creates a condition that filters profiles that are part of an existing linked or classic audience. |
| Performed event         | Creates a condition that filters profiles on their event history. |

### Error states

As you’re building or maintaining your audience, you may encounter an error or warning message about possible impacts to your audience. Below are some common reasons errors occur, along with suggested troubleshooting steps.

| Error        | Description                           | Troubleshooting              |
|---------------------------|---------------------------------------|-------------|
| Column deleted from warehouse  | A column you're trying to use in the builder was deleted from your warehouse (for example, `account_balance`).          | Select a valid column in the audience builder, or re-add the deleted column in your warehouse.        |
| Column data type changed in the warehouse  | A column data type in your warehouse has been changed. (For example, `account_balance` changed from a `number` to a `string`.)          | Update the column data type in your warehouse, or select a different column in the audience builder.        |
| Table deleted from warehouse | A table you're trying to use has been deleted from your warehouse. (For example, the `accounts` table was deleted in your warehouse.)          | You can re-add the table to your warehouse, choose a valid table to use in the audience condition, or remove the audience condition entirely.     |
| Entity deleted from Data Graph | A table you're trying to use has been deleted from your Data Graph. (For example, the `accounts` table was deleted in your Data Graph.) | You can re-add the missing entity in the data graph, remove the entity from the audience condition, or remove the audience condition entirely. Editing the audience definition may require you to update your event emitters. |
| Entity removed from audience condition | An entity was removed from the audience condition. For example, an `accounts` entity was removed from audience condition. | Update your event emitters. Navigate to **Engage > Audiences** and select your destination to view and maintain event emitters.  |
| Warehouse error | You have incorrect permissions or failed to connect to your warehouse. | Check your permissions to ensure you have a valid connection to the Data Graph and your warehouse. |

#### Edit an audience
To edit an audience:
1. Navigate to **Engage > Audiences**, and select the audience you'd like to edit.
2. Select the **Builder** tab.
3. Click **Edit audience**.
4. Edit your audience conditions, then click **Save**.

After you successfully save, the audience will compute with the new changes during the next scheduled compute. You can alternatively click **Compute now** to compute the audience right away.

#### Delete an audience
To delete an audience:
1. Navigate to **Engage > Audiences**, and select the audience you'd like to delete.
2. From the Overview page, select the three dots icon.
3. Select **Delete audience**.

Note: this action can't be undone. After you delete an audience, the audience will stop computing and data is no longer sent to your downstream destinations.

#### Compute statuses
Engage displays the following compute statuses for Linked Audiences.

| Computation status        | Description                           |
|---------------------------|---------------------------------------|
| Computing                 | Engage is computing the Linked Audience based on the compute schedule.           |
| Live                      | The latest compute was successful.      |
| Disabled                  | The Linked Audience is disabled.                   |
| Failed                    | The computation was canceled or failed to compute. Contact [Segment support](https://segment.com/help/contact/){:target="_blank"}.            |

## Step 2: Activate your Linked Audience

You can use your Linked Audience to activate any [actions-based destination](/docs/connections/destinations/actions/#available-actions-based-destinations). The steps below provide instructions on how to add a destination to your Linked Audience(s), and send an event that best matches your use case.

> warning ""
> Some action destinations have limitations on nested objects, and the depth of the `_entity_context` property.

### Step 2a: Add an action destination

To activate your Linked Audience, first add an action destination.

From Add destination, select your destination and click **Next**.

### Step 2b: Select event
After adding an actions-based destination, select what type of event you want to send to the destination. Events update the destination about changes to your entity or audiences. You can then use these actions to orchestrate campaigns in other tools.

You can send events:
- When an entity on a profile changes:
   - [Entity Added](#entity-added)
   - [Entity Removed](#entity-removed)
- Based on profile audience membership updates:
   - [Audience Entered](#audience-entered)
   - [Audience Membership Changed](#audience-membership-changed)
   - [Audience Exited](#audience-exited)

> success ""
> You can also [edit events](#maintain-event-emitters) for existing Linked Audiences.

> info ""
> You can't send events before you identify people. Ensure you're making any profiles known in the destination before you send events. You can do this by sending an `Audience Membership Changed` event first, or by creating an Identify event in Connections.

#### Entity added

Send a Track event when an entity branch at any level of a nested entity condition matches the audience condition. With this event, you must select the entity that triggers Segment to send the Track event.

Example use cases:
- Send a reminder to a customer when a credit card associated with their profile has an outstanding balance.
- Notify a traveler when a flight associated with their profile is delayed.
- Notify a customer when a product associated with their profile's wishlist is back in stock.

#### Entity removed

Send a Track event when an entity associated with a profile no longer matches the audience conditions. With this event, you must select the entity that triggers Segment to send the Track event.

Example use cases:
- Send a confirmation to a customer when a credit card associated with their profile has been paid off.
- Send a confirmation to the primary doctor when each of their associated patients completes their annual check up.

#### Audience entered

Send a Track event when a profile matches the audience condition.

Example use cases:
- Send a congratulatory email when a traveler qualifies for premium status with a mileage program.
- Send a discount to all customers with a particular product on their wishlist.

#### Audience exited

Send a Track event when a profile no longer matches the audience condition.

Example use cases:
- Send an email to credit card owners to confirm that their credit cards have been paid in full.
- Send a confirmation to a patient when they have completed all their pre-screening forms.

#### Audience Membership Changed

Send an Identify event when a profile's audience membership changes.

Example use case:
- Update a user profile in a destination with the most recent audience membership.

#### Maintain event emitters

Event emitters indicate when an audience or entity-related event should trigger a Segment event on a particular destination.

To view event emitters, navigate to **Engage > Audiences** and select your destination. From the destination's **Events** tab:

- Click **Add event** to add a new event
- Enable or disable an event with the status toggle
- Use the three dots icon to edit or delete an event

Selecting **Edit event** allows you to update [event enrichments and mappings](#step-2d-configure-the-event).

### Step 2c: Select an action

Select the destination action to call when the event happens. Ensure the action you selected is relevant to the type of event you previously selected. For example, if you selected **Audience Membership Changed**, ensure your action is also an Identify event.

Segment displays available actions based on the destination action you've connected with your Linked Audience.

> info ""
> Segment has preset mappings for [Braze](/docs/connections/destinations/catalog/braze-cloud-mode-actions/#available-presets), [Iterable](/docs/connections/destinations/catalog/actions-iterable/#available-presets), and [Customer.io](/docs/connections/destinations/catalog/customer-io-actions/#available-presets) with many of the following steps already configured.

See [destination actions](/docs/connections/destinations/actions/) to learn more about destination actions, and view available actions for your destination.

### Step 2d: Configure the event

Select additional user profile properties or entity column values to include in the event. This is where you select any additional context you want to send to the destination.

To configure your event:

1. Select additional user profile properties or entity column values to include with each event. This is where you select the additional context you want to send to your destination.
- As you're configuring your event, click **Show Preview** to view a preview of the enriched event based on your property selections.
2. Map your event from your audience to your destination.
- [Braze](/docs/connections/destinations/catalog/braze-cloud-mode-actions/#available-presets), [Iterable](/docs/connections/destinations/catalog/actions-iterable/#available-presets), and [Customer.io](/docs/connections/destinations/catalog/customer-io-actions/#available-presets) are pre-set destinations, so you won't need to map your audience to your destination.
3. You can optionally send a test event to your destination by clicking **Send test event to destination**. You can edit the User ID for the test event, and you'll also see a table with event fields and example values.
- After sending the test, you'll receive a response from Segment and the destination, which allows you to see what data sent to your destination may look like.
4. Select if you'd like to [send events for current profiles and entities in the audience](#send-events-for-current-profiles-and-entities-in-the-audience).
- This is only available for the **entity added**, **audience entered**, and **audience membership changed** event types.
4. To enable your Linked Audience, click **Save**.

#### Send events for current profiles and entities in the audience

This checkbox is unchecked by default. If you leave this box unchecked, Segment only sends events for new profiles and entities that match the audience conditions.

If you select this checkbox, Segment will also send events for profiles and entities that currently match the audience description.

## Step 3: Confirm the payload in your destination

Linked Audiences sends events to your destination after Segment computes the audience.

To confirm your destination is receiving events, Segment recommends that you log in to your destination and perform one of the following:
- Monitor the event activity
- Search for the `UserID` or `Event Name` (for example, `Entity Added`)
