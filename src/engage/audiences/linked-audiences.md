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

Linked Audiences allows you to build a warehouse-first solution that powers individualized customer experiences using the relational data you've defined in your [Data Graph](/docs/unify/linked-profiles/data-graph/). 

You can:

- Preserve rich relationships between all the data in your warehouse by creating connections with any entity data back to your audience profile.
- Build advanced audience segments that include the rich context needed for personalization downstream.
- Use a low code builder, enabling marketers to activate warehouse data without having to wait for data pull requests before launching campaigns to targeted audiences.

To learn more about specific use cases you can set up with Linked Audiences, see the [Linked Audiences Use Cases](/docs/engage/audiences/linked-audiences-use-cases/) topic.

## Prerequisites

Before you begin setting up your Linked Audience, ensure you have:

- [Set up Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/).
- Set up your warehouse permissions using [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/).
- [Ensure someone has set up your data graph](/docs/unify/linked-profiles/data-graph/).
- Workspace Owner or Unify Read-only, Engage User, Entities Read-only, and Source Admin [roles in Segment](/docs/segment-app/iam/roles/).

## Setting up Linked Audiences

To set up your Linked Audience, complete the following steps:

- [Step 1: Build a Linked Audience](#step-1-build-a-linked-audience)
- [Step 2: Activate your Linked Audiences](#step-2-activate-your-linked-audience)
- [Step 3: Send a test event to your destination](#step-3-send-a-test-event-to-your-destination)
- [Step 4: Enable your Linked Audience](step-4-enable-your-linked-audience)

## Step 1: Build a Linked Audience

Linked Audiences allows you to filter based on properties like [profile traits](/docs/unify/#enrich-profiles-with-traits), [relational data](/docs/glossary/#sql) mapped to the [Data Graph](/docs/unify/linked-profiles/data-graph/), [events](/docs/glossary/#event), and existing [audiences](/docs/glossary/#audience).

![Choose your audience conditions](/docs/engage/images/conditions.png)

To build a Linked Audience:

1. Navigate to **Engage > Audiences**.
2. Select **+ New audience > Audience**.
3. On the **Select Audience Type** screen, select **Linked audience**, then click **Next**.
**Note:** If you cannot select **Linked audience**, ensure you’ve [set up your Data Graph](/docs/unify/linked-profiles/data-graph/) in Unify.
4. Select the [conditions](#Linked-Audience-conditions) on which to build your audience.
5. Click **Preview** to view your audience selection and see a count and list of audience members who meet the criteria.
6. When your audience is complete and accurate, click **Next**.
7. Enter an audience name and description to identify this configuration.
Optionally, select a folder to add this audience.
8. Click **Create Audience**.

### Maintaining Linked Audiences 

After creating your Linked Audience, you will be brought to the Overview page with the Linked Audience in a disabled state. On the Overview page, you can view relevant audience information, such as Profiles in Audience, Run Schedule, Latest run, Next compute. You can edit or delete your Linked Audience. 

If you edit an audience with configured activation events, you should disable or delete impacted events for your audience to successfully compute. Events are impacted if they reference entities that are edited or removed from the audience definition.

You can also clone your linked audience to the same space from the List and Overview pages. Cloning a linked audience creates a new linked audience in the builder create flow with the same conditions as the linked audience that was cloned.

### Linked Audience conditions 

The linked audiences builder sources profile trait and event keys from the data warehouse. This data must be synced to the data warehouse through [Profiles Sync](/docs/unify/profiles-sync/overview/) before you can reference it in the linked audience builder. If there is a profile trait that exists in the Segment Profile that hasn’t successfully synced to the data warehouse yet, it will be grayed out so that it can’t be selected.

The linked audience builder also returns a subset of available entity property key values, event property and context key values, and profile trait key values that you can select in the input field drop-down so that you don’t need to type in the exact value that you want to filter on.If you don’t see the value you’re looking for, you can manually enter it into the input field. Segment displays 

* the first 100 unique string entity property values from the data warehouse.
    * If you want to opt out of displaying entity property values from the data warehouse, contact Segment Support.
* the top 65 event property and context key values.
* the top 65 profile trait key values.

You can only create nested entity conditions up to six levels in depth. For example, an entity condition that queries for relationships between Profiles, Accounts, Credit Cards, and Transactions has four levels of depth.

As you're building your Linked Audience, you can choose from the following conditions:

#### with entity

Creates a condition that filters profiles associated with entity relationships defined in the [Data Graph](/docs/unify/linked-profiles/data-graph/). 

With this condition, you can navigate the full, nested entity relationships, and filter your audience on entity column values.

The event condition type supports these configurations:

* at least: supports 1 or greater
* exactly: supports 0 or greater*
* at most: supports 0 or greater*

*When filtering by 0, you can’t filter on by entity properties or on additional nested entities. 

#### without entity

Creates a condition that filters profiles that are not associated with entity relationships defined in the [Data Graph](/docs/unify/linked-profiles/data-graph/).

#### with [ trait](/docs/unify/#enrich-profiles-with-traits)

Creates a condition that filters profiles with a specific trait.

#### without [ trait](/docs/unify/#enrich-profiles-with-traits)

Creates a condition that filters profiles without a specific trait.

#### part of [audience](/docs/glossary/#audience)

Creates a condition that filters profiles that are part of an existing audience.

#### not part of [audience](/docs/glossary/#audience)

Creates a condition that filters profiles that are not part of an existing audience.

#### with [event](/docs/glossary/#event)

Creates a condition that filters profiles that have a specific event in their event history. You can also filter on event property values. The event condition type supports these configurations:

* at least: supports 1 or greater
* exactly: supports 0 or greater
* at most: supports 0 or greater

#### without [event](/docs/glossary/#event)

Creates a condition that filters profiles that do not have a specific event in their event history. You can also filter on event property values.

You can also duplicate your conditions in the audience builder into the same condition group.

#### Operator Selection

You can create audience definitions using either `AND` or `OR` operators across all condition levels. You can switch between these operators when filtering on multiple entity or event properties, between conditions within a condition group, and between condition groups.

**Example:**

![An example of the operator selection filled out.](/docs/engage/images/operator_selection.png)

#### Entity Explorer

If you have defined entity conditions in your audience definition, you will see a “Matched Entities” tab in the audience preview to help you understand what entities qualified a user to be a part of an audience.

This information appears when you click the user profile generated from the audience preview. The contextual information encompasses entity relationships as well as entity column values that were used as filtering criteria in the audience definition. By default, Segment includes the entity ID.The data being returned is truncated - 10 entities at each level, 6 levels of depth. If you want to opt out of this functionality, contact Segment Support.

![A screenshot of the Entity Explorer.](/docs/engage/images/entity_explorer.png)

#### Dynamic References

**Event Conditions**

When filtering on event properties, you can dynamically reference the value of another profile trait, or enter a constant value. These operators support dynamic references:
equals, not equals, less than, greater than, less than or equal, greater than or equal, contains, does not contain, starts with, ends with.

**Entity Conditions**

When filtering on entity properties, you can dynamically reference the value of another entity column (from the same entity branch at the same level or above it), profile trait, or enter a constant value.
You can only dynamically reference properties of the same data type. Dynamic references are only supported for certain operators depending on the data type:
NUMBER data type: equals, not equals, less than, greater than, less than or equal, greater than or equal
STRING data type: equals, not equals, contains, does not contain, starts with, ends with
TIMESTAMP data type: equals, not equals, less than, greater than, less than or equal, greater than or equal

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

The [Destination Actions](/docs/connections/destinations/actions/) framework allows you to see and control how Segment sends the event data it receives from your sources to actions-based destinations. Each Action in a destination lists the event data it requires and the event data that is optional. Segment displays available Actions based on the destination you've connected to your Linked Audience. You can see details of each option and how to use it in the [Actions Destinations Catalog](/docs/connections/destinations/catalog/) documentation. 

Select the Destination Action to call when the event happens, then click **Next**.

### Step 2c: Define how and when to trigger an event to your destination

Configure how and when events are produced with each audience run. Select the entities referenced in the audience builder to act as a trigger for your events. 

Event Selection                 |Definition                                                                                                                                                                                               |Examples                                                                                                                                                                                                                                                                              
--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Profile enters audience         | Send an event when a profile matches the audience condition.                                                                                                                                        | Send a congratulatory email when a traveler qualifies for premium status with a mileage program.<br>Send a discount to all customers with a particular product on their wishlist.                                                                                                     
Profile exits audience          | Send an event when a profile no longer matches the audience condition.                                                                    | Send an email to credit card owners to confirm that their credit cards have been paid in full.<br> Send a confirmation to a patient when they have completed all their pre-screening forms.                                                                                            
Entity enters audience          | Send an event when an entity condition associated with a profile matches the audience condition. With this event, you must select the entity that triggers Segment to send the event.         | Send a reminder to a customer when a credit card associated with their profile has an outstanding balance.<br> Notify a traveler when a flight associated with their profile is delayed.<br> Notify a customer when a product associated with their profile's wishlist is back in stock.
Entity exits audience           | Send an event when an entity condition associated with a profile no longer matches the audience condition. You must select the entity that triggers Segment to send the event| Send a confirmation to a customer when a credit card associated with their profile has been paid off.<br> Send a confirmation to the primary doctor when each of their associated patients completes their annual check up.                                                            
Profile enters or exits audience| Send an event when a profile's audience membership changes.   | Update a user profile in a destination with the most recent audience membership.     

### Step 2d: Configure the event

After you select an action, Segment attempts to automatically configure the data fields that will be sent to the destination. You can review and adjust these settings before enabling this event.

#### Enrich event 

Select additional traits and properties to include when the event is sent.

#### Show/Hide preview 

As you're enriching your events in Linked Audiences, you should view a preview of the event payload schema based on the properties you select. It might look like the following:

![A screenshot of the Add activation page, where you can review your payload data.](/docs/engage/images/linked_audience_payload.png)

**Important:** It is important to make a copy of the data from your final payload schema; you will need this data later when you set up your destination. 

#### Map event

Only required fields are displayed. All optional & pre-filled fields are hidden.

These fields are pre-filled with properties that will work by default.

## Step 3: Send a test event to your destination

Send a test event to ensure that everything is connected properly and your destination receives the event. 

Enter the destination User id for the profile you want to use to test the event, then click **Send test event to destination**.  

The Event content drop-down shows you a preview of what the data sent to your destination might look like. 

### Step 3a: Configure your multi-channel marketing campaign 

If you're using a multi-channel marketing tool, set up your email campaign before continuing. See detailed instructions for [Braze](/docs/engage/audiences/linked-audiences-braze/) or [Iterable](/docs/engage/audiences/linked-audiences-iterable/) for more details.

## Step 4: Enable your Linked Audience

After building your Linked Audience, choose **Save and Enable**. You'll be redirected to the Audience Overview page, where you can view the audience you created. Segment automatically disables your audience so that it doesn't start computing until you're ready. A compute is when Segment runs the audience conditions on your data warehouse and sends events downstream. 

To enable your audience:
Select the **Enabled** toggle, then select **Enable audience**.

### Run Now

You can trigger a run for your audience if you want to send events to your destination without waiting for the next scheduled run. To do so, select **Run Now**. This triggers a run for the audience and sends events downstream.

### Set a run schedule

Use the Audience Overview page to view the audience profile count, current run schedule, run status, and upcoming run time.

Determine when an audience should run and send data to enabled destinations with a run schedule:
- **Manual**: Trigger audience runs manually by clicking **Run Now** on the Audience Overview page.
- **Interval**: Trigger audience runs based on a predefined set of time intervals. Supported intervals are: 15 minutes, 30 minutes, 1 hour, 2 hours, 4 hours, 6 hours, 8 hours, 12 hours, 1 day. If you select this option, Segment will run your audience after you enable the audience.
- **Day and time**: Trigger audience runs at specific times on selected days of the week. If you select this option, Segment will run your audience at the first selected date and time.

You can maintain your run schedule at any time from the audience's **Settings** tab.

You can also click **Run Now** on the Audience Overview page at any time (even if the run schedule is **Interval** Overview **Day and time**) to manually trigger a run on your warehouse and send data to enabled destinations.

There may be up to a 5 minute delay from the configured start time for audiences that are configured with the **Interval** and **Day and time** run schedules. For example, if you configured an audience with the **Day and time** compute schedule to run on Mondays at 8am, it can compute as late as Monday at 8:05am. This is to help us better manage our system load.
