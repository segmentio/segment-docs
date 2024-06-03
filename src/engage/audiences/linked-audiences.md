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

Linked Audiences allows you to build a warehouse first solution that powers individualized customer experiences using the relational data you've defined in your [Data Graph](/docs/unify/linked-profiles/data-graph/). You can:

- Preserve rich relationships between all the data in your warehouse by creating connections with any entity data back to your audience profile.
- Build advanced audience segments that include the rich context needed for personalization downstream.
- Use a low code builder, enabling marketers to activate warehouse data without having to wait for data pull requests before launching campaigns to targeted audiences.

To learn more about specific use cases you can set up with Linked Audiences, see the [Linked Audiences Use Cases](/docs/engage/audiences/linked-audiences-use-cases/) topic.

## Prerequisites

Before you begin setting up your Linked Audience, ensure you have:

- [Set up Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/).
- Set up your warehouse permissions using [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/).
- [Ensure someone has set up your data graph](/docs/unify/linked-profiles/data-graph/).
- Workspace Owner or Unify Read-Admin, Entities Admin, and Source Admin [roles in Segment](/docs/segment-app/iam/roles/).

## Setting up Linked Audiences

To set up your Linked Audience, complete the following steps:

- [Step 1: Build a Linked Audience](#step-1-build-a-linked-audience)
- [Step 2: Activate your Linked Audiences](#step-2-activate-your-linked-audience)
- [Step 3: Enable your Linked Audience](#step-3-enable-your-linked-audience)
- [Step 4: Confirm the payload in your destination](#step-4-confirm-the-payload-in-your-destination)

## Step 1: Build a Linked Audience

Linked Audiences allows you to filter based on properties like [profile traits](/docs/unify/#enrich-profiles-with-traits), [relational data](/docs/glossary/#sql) mapped to the [Data Graph](/docs/unify/linked-profiles/data-graph/), [events](/docs/glossary/#event), and existing [audiences](/docs/glossary/#audience).

![Choose your audience conditions](/docs/engage/images/conditions.png)

To build a Linked Audience:

1. Navigate to **Engage > Audiences**.
2. Select **+ New audience > Audience**.
3. On the **Select Audience Type** screen, select **Linked audience**, then click **Next**.
**Note:** If you cannot select **Linked audience**, ensure you’ve [set up your Data Graph](/docs/unify/linked-profiles/data-graph/) in Unify.
4. Select the [profiles conditions](#Linked-Audience-profiles-conditions) on which to build your audience.
5. Click **Preview** to view your audience selection and see a count of audience members who meet the criteria.
6. When your audience is complete and accurate, click **Next**.
7. Enter an audience name and description to identify this configuration.
Optionally, select a folder to add this audience.
8. Click **Create Audience**.

### Linked Audience profiles conditions 

As you're building your Linked Audience, you can choose from the following profiles conditions:

| Profiles Conditions     | Description                           |
|---------------------------|---------------------------------------|
| associated with an entity   | Creates a condition that filters profiles associated with entity relationships defined in the [Data Graph](/docs/unify/linked-profiles/data-graph/). With this condition, you can navigate the full nested entity relationship and filter your audience on entity column values. 
| not associated with an entity   | Creates a condition that filters profiles that are not associated with entity relationships defined in the [Data Graph](/docs/unify/linked-profiles/data-graph/). 
| with [profile trait](/docs/unify/#enrich-profiles-with-traits)     | Creates a condition that filters profiles with a specific trait. |
| without [profile trait](/docs/unify/#enrich-profiles-with-traits)     | Creates a condition that filters profiles without a specific trait. |
| part of an [audience](/docs/glossary/#audience)     | Creates a condition that filters profiles that are part of an existing audience. |
| not part of an [audience](/docs/glossary/#audience)     | Creates a condition that filters profiles that are not part of an existing |
| that performed [event](/docs/glossary/#event)         | Creates a condition that filters profiles that have a specific event in their event history. You can also filter on event property values.|
| that did not performed [event](/docs/glossary/#event)         | Creates a condition that filters profiles that do not have a specific event in their event history. You can also filter on event property values.|

**Note:** you can only create nested entity conditions up to four levels in depth. For example, an entity condition that queries for relationships between Profiles, Accounts, Credit Cards, and Transactions has four levels of depth.

## Step 2: Activate your Linked Audience

After you build your Linked Audience, you can send events to your chosen destinations and use them for personalizing your customer communications.  

To activate your Linked Audience:

- [Step 2a: Connecting to a Destination](#step-2a-connecting-to-a-destination)
- [Step 2b: Selecting your Destination Actions](#step-2b-select-your-destination-actions)
- [Step 2c: Defining how and when to trigger an event to your Destination](#step-2c-define-how-and-when-to-trigger-an-event-to-your-destination)
- [Step 2d: Configuring the event payload](#step-2d-configure-the-event)

### Step 2a: Connecting to a destination

[Destinations](/docs/connections/destinations/) are the business tools or apps that Segment forwards your data to. Adding a destination allows you to act on your data and learn more about your customers in real time. To fully take advantage of Linked Audiences, you must connect and configure at least one destination.

**Note:** Ensure your [destination has been enabled](/connections/destinations/catalog/) in Segment before you begin the steps below. 

1. Navigate to **Engage > Audiences**.
2. Select the Linked Audience you set up in the previous step. 
3. Select **Add destination**.
4. Select a destination from the catalog.
5. Click **Configure data to send to destination**.

### Step 2b: Select your Destination Actions

The [Destination Actions](/docs/connections/destinations/actions/) framework allows you to see and control how Segment sends the event data it receives from your sources to actions-based destinations. Each Action in a destination lists the event data it requires, and the event data that is optional.

Segment displays available actions based on the destination you've connected to your Linked Audience.

Select the Destination Action to call when the event happens, then click **Next**.

### Step 2c: Define how and when to trigger an event to your destination

Configure how and when events are produced with each audience run. Select the entities referenced in the audience builder to act as a trigger for your events. 

Event Selection                 |Definition                                                                                                                                                                                               |Examples                                                                                                                                                                                                                                                                              
--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Profile enters audience         | Send a Track event when a profile matches the audience condition.                                                                                                                                        | Send a congratulatory email when a traveler qualifies for premium status with a mileage program.<br>- Send a discount to all customers with a particular product on their wishlist.                                                                                                     
Profile exits audience          | Send a Track event when a profile no longer matches the audience condition.                                                                    | Send an email to credit card owners to confirm that their credit cards have been paid in full.<br> Send a confirmation to a patient when they have completed all their pre-screening forms.                                                                                            
Entity enters audience          | Send a Track event when an entity condition associated with a profile matches the audience condition. With this event, you must select the entity that triggers Segment to send the Track event.         | Send a reminder to a customer when a credit card associated with their profile has an outstanding balance.<br> Notify a traveler when a flight associated with their profile is delayed.<br> Notify a customer when a product associated with their profile's wishlist is back in stock.
Entity exits audience           | Send a Track event when an entity condition associated with a profile no longer matches the audience condition. With this event, you must select the entity that triggers Segment to send the Track event| Send a confirmation to a customer when a credit card associated with their profile has been paid off.<br> Send a confirmation to the primary doctor when each of their associated patients completes their annual check up.                                                            
Profile enters or exits audience| Send an Identify event when a profile's audience membership changes.   | Update a user profile in a destination with the most recent audience membership.     
                                                              
### Step 2d: Configure the event

After you select an action, Segment attempts to automatically configure the data fields that will be sent to the destination. You can review and adjust these settings before enabling this event.

#### Send a Test Event 

You can send a test event to see if your action-based campaign is rendering correctly. If the test event is not successful, adjust the Segment test event user id to match the existing Source user id. Or if you need to create a new user in your Source, you can define a unique user id in the Segment test event.

## Step 3: Enable your Linked Audience

After building your Linked Audience, you'll be redirected to the Audience Overview page. Segment automatically disables your audience so that it does not start computing until you're ready. To enable your audience:

Select the **Enabled** toggle, then select **Enable audience**.

You can trigger a compute for your audience if you want to send events to your destination without waiting for the next scheduled compute run. To do so, select **Compute Now**. This triggers a compute for the audience (where the audience conditions run on your data warehouse) and sends events downstream.

## Step 4: Confirm the payload in your destination

Linked Audiences sends events to your destination after Segment computes the audience.

To confirm your destination is receiving events, Segment recommends that you log in to your destination and perform one of the following:

- Monitor the event activity
- Search for the `UserID` or `Event Name` (for example, `Entity Added`)
