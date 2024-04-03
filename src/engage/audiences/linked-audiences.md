---
title: Linked Audiences
plan: engage-foundations
beta: true
redirect_from: 
    - '/unify/linked-profiles/linked-audiences'
hidden: true
---
> info "Linked Audiences is in public beta"
> Linked Audiences is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

With Linked Audiences, you can use the relational data you've defined in your [Data Graph](docs/unify/linked-profiles/data-graph/) to build audiences and send them to any downstream [actions-based destinations](/docs/connections/destinations/actions/#available-actions-based-destinations).

> info "Linked Audiences warehouse support"
>Linked Audiences supports [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/).
> warning "Linked Audiences permissions requirements"
> To set up Linked Audiences Activation, you must have Workspace Owner or Unify Read-Admin, Entities Admin, and Source Admin permissions.

To learn more about Linked Audiences use cases,  see the [Linked Audiences Use Cases](/docs/engage/audiences/linked-audiences-use-cases/) topic.

## Step 1: Build a Linked Audience

Linked Audiences allows you to filter audience targeting logic based on properties such as profile traits, relational data mapped to the Data Graph, events, and existing audience membership. 

![Choose your audience conditions](/docs/engage/images/conditions.png)

1. Navigate to **Engage > Audiences**.
2. Click **+ New audience**, then select **Audience**.
3. On the Select type screen, select **Linked audience**, then click **Next**.
4. Select the [conditions](#conditions) to build your audience.
5. Preview your audience, then click **Next**.

Within the preview, you can see a count of users that meet the audience criteria as well as a sample list of users.
6. Enter an audience name and description.
7. Click **Save**.

After creating the audience, you'll be redirected to the Overview page. By default, the audience is disabled. Segment recommends that you take the following actions:
1. Add a destination.
2. Configure and create [event selections](#maintain-event-emitters).
3. Enable the audience. 

This triggers a compute for the audience (where the audience conditions run on your data warehouse) and sends events downstream.

#### Audience conditions

As you're building your Linked Audience, you can choose from the following conditions:

| Conditions     | Description                           |
|---------------------------|---------------------------------------|
| Associated with an entity   | Creates a condition that filters profiles associated with entity relationships defined in the [Data Graph](/docs/unify/linked-profiles/data-graph/). With this condition, you can traverse the full nested entity relationship and filter your audience on entity column values. Note: you can only create nested entity conditions up to four levels in depth. For example, an entity condition that queries for relationships between Profiles, Accounts, Credit Cards, and Transactions has four levels of depth.       |
| Where profile trait     | Creates a condition that filters profiles with a specific trait. |
| Part of an audience     | Creates a condition that filters profiles that are part of an existing linked or classic audience. |
| Performed event         | Creates a condition that filters profiles on their event history. Users can also filter on event property values.|

#### Error States

As you’re building or maintaining your audience, you may encounter an error or warning message about possible impacts to your audience. Below are some common reasons errors occur, along with suggested troubleshooting steps.

| Failure | External message | Workflow implication |
|---|---|---|
| Parse error | An unknown error occurred. Execution will retry. If the problem persists, please contact Segment support. | Terminate and execute next run |
| Graph missing entity | Entity missing from Data Graph: <entity> | Terminate and execute next run |
| Graph missing column for entity | Entity column missing from Data Graph for Entity <entity> and Column: <column> | Terminate and execute next run |
| No columns exist for entity | No columns exist for entity in Data Graph: <entity> | Terminate and execute next run |
| Missing join key between entities | Join key missing from Data Graph for relation: <relationship> | Terminate and execute next run |
| Join key is wrong type | Relationship key should be a string: <relationship> | Terminate and execute next run |
| Entity relationship not in Data Graph | Entity relationship not in Data Graph for entity <entity> | Terminate and execute next run |
| Entity relationship not in Data Graph | Entity relationship not in Data Graph for relationship: <relationship slug> | Terminate and execute next run |
| Entity relationship not in Data Graph | Entity relationship not in Data Graph for entity: <entity> and relationship: <relationship slug> | Terminate and execute next run |
| Query fails for unknown internal error | An unexpected error occurred. Execution will retry. If the problem persists, please contact Segment support. | Retry |
| Update model fails | An unexpected error occurred. Execution will retry. If the problem persists, please contact Segment support. | Retry |
| Kick off rETL job | An unexpected error occurred. Execution will retry. If the problem persists, please contact Segment support. | Retry |
| Warehouse errors | Pass through warehouse errors | Terminate and execute next run |
| SQL Compilation execution | Examples: extract phase failed: An unexpected Snowflake error occurred trying to execute your model query: 000904 (42000): SQL compilation error: error line 30 at position 61 invalid identifier '<XX.PROPERTIES>'  extract phase failed: An unexpected Snowflake error occurred trying to execute your model query: 000904 (42000): SQL compilation error: error line 23 at position 19 invalid identifier '<XX.TRAITS>' |  |
| Duplicate records for ID | Examples: extract phase failed: Duplicate records have been detected. This could be because the model query returned multiple records for the same ID column (MATCHID), or the Segment records table itself has duplicate records. |  |
| Check results | An unexpected error occurred attempting to execute this model query. | Retry |
| Process results | Execution is paused due to an identified operational issue. | Pause for manual intervention  |
| Load results | Execution is paused due to an identified operational issue. |  |

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

Note: deleting an audience can't be undone. After you delete an audience, the audience will stop computing and data is no longer sent to your downstream destinations.

#### Compute statuses
Engage displays the following compute statuses for Linked Audiences.

| Computation status        | Description                           |
|---------------------------|---------------------------------------|
| Computing                 | Engage is computing the Linked Audience based on the compute schedule.           |
| Live                      | The latest compute was successful.      |
| Disabled                  | The Linked Audience is disabled.                   |
| Failed                    | The computation was canceled or failed to compute. Contact [Segment support](https://segment.com/help/contact/){:target="_blank"}.            |

## Step 2: Activate your Linked Audience

You can use your Linked Audience to activate any [actions-based destination](/docs/connections/destinations/actions/#available-actions-based-destinations). The steps below provide instructions on how to add a destination to your Linked Audiences, and send an event that best matches your use case. To activate an event, do the following:

-  Add an action destination
-  Add an event
-  Select a destination action
-  Configure the event

> warning ""
> Some action destinations have limitations on nested objects, and the depth of the `_entity_context` property.

### Step 2a: Add an action destination

To activate your Linked Audience, first [add an action destination](/connections/destinations/actions/) in Connections.

### Step 2b: Add an event

After adding a  destination to your audience, configure the data you want to send to the destination. First, select a type of event you want to send to the destination. Events update destinations about changes to your entity or audiences and contain data that can be used in the downstream destination.

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

Send a Track event when an entity condition associated with a profile matches the audience condition. With this event, you must select the entity that triggers Segment to send the Track event.

Example:
- Send a reminder to a customer when a credit card associated with their profile has an outstanding balance.
- Notify a traveler when a flight associated with their profile is delayed.
- Notify a customer when a product associated with their profile's wishlist is back in stock.

#### Entity removed

Send a Track event when an entity condition associated with a profile no longer matches the audience condition. With this event, you must select the entity that triggers Segment to send the Track event.

Example:
- Send a confirmation to a customer when a credit card associated with their profile has been paid off.
- Send a confirmation to the primary doctor when each of their associated patients completes their annual check up.

#### Audience entered

Send a Track event when a profile matches the audience condition.

Example:
- Send a congratulatory email when a traveler qualifies for premium status with a mileage program.
- Send a discount to all customers with a particular product on their wishlist.

#### Audience exited

Send a Track event when a profile no longer matches the audience condition.

Example:
- Send an email to credit card owners to confirm that their credit cards have been paid in full.
- Send a confirmation to a patient when they have completed all their pre-screening forms.

#### Audience membership changed

Send an Identify event when a profile's audience membership changes.

Example:
- Update a user profile in a destination with the most recent audience membership.

### Step 2c: Select a destination action

Select the destination action to call when the event happens. Ensure the action you selected is relevant to the type of event you previously selected. For example, if you selected **Audience membership changed**, ensure your action is also an Identify event.

Segment displays available actions based on the destination action you've connected with your Linked Audience.

> info ""
> Segment has preset mappings for [Braze](/docs/connections/destinations/catalog/braze-cloud-mode-actions/#available-presets), [Iterable](/docs/connections/destinations/catalog/actions-iterable/#available-presets), and [Customer.io](/docs/connections/destinations/catalog/customer-io-actions/#available-presets) with many of the following steps already configured.

See [destination actions](/docs/connections/destinations/actions/) to learn more about destination actions, and view available actions for your destination.

### Step 2d: Configure the event

After you select an action, Segment attempts to automatically configure the data fields that will be sent to the destination. You can review and adjust these settings before enabling this event. 
- Enrich event (optional)
- Map event 
- Test event (optional)

#### Enrich event
Select additional profile traits or entity column values to include when the event is sent.
These traits and properties can be associated with the profile or the entity  conditions that were defined in the audience definition.
As you're configuring your event, click **Show Preview** to view a preview of the enriched event based on your profile and entity property selections.
For example, if your profiles include traits that are required in your downstream destination, this is where you would make the appropriate selections.

[Braze](/docs/connections/destinations/catalog/braze-cloud-mode-actions/#available-presets), [Iterable](/docs/connections/destinations/catalog/actions-iterable/#available-presets), and [Customer.io](/docs/connections/destinations/catalog/customer-io-actions/#available-presets) are pre-set destinations, so you won't need to map your audience to your destination.

#### Test event
You can optionally send a test event to your destination by clicking **Send test event to destination**. You can edit the User ID for the test event, and you'll also see a table with event fields and example values. After sending the test, you'll receive a response from Segment and the destination, which allows you to see what data sent to your destination may look like.

#### Send events for current profiles and entities in the audience checkbox

By default, Segment only sends events for new profiles and entities that match the audience conditions. This means that when the event is created, it will not send events for profiles and entities that currently meet the audience criteria.
If you want to send events for profiles and entities that currently meet the audience criteria, check this box. This is only available for the **entity added**, **audience entered**, and **audience membership changed** event types.

## Step 3: Confirm the payload in your destination

Linked Audiences sends events to your destination after Segment computes the audience.

To confirm your destination is receiving events, Segment recommends that you log in to your destination and perform one of the following:
- Monitor the event activity
- Search for the `UserID` or `Event Name` (for example, `Entity Added`)
