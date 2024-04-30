---
title: Linked Audiences
plan: engage-foundations
beta: true
redirect_from: 
    - '/unify/linked-profiles/linked-audiences'
hidden: false
---
> info "Linked Audiences is in public beta"
> Linked Audiences is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

With Linked Audiences, you can use the relational data you've defined in your [Data Graph](/docs/unify/linked-profiles/data-graph/) to build audiences, launch precisely targeted, highly personalized operational and marketing use cases.

To learn more about specific use cases you can set up with Linked Audiences,  see the [Linked Audiences Use Cases](/docs/engage/audiences/linked_audiences/linked-audiences-use-cases/) topic.

## Prerequisites

Before you begin setting up your linked audience, ensure you have:

- [Set up profiles sync](/unify/profiles-sync/profiles-sync-setup/)
- [Familiarized yourself with what an Audience is](/docs/engage/audiences)
- [Set up your data graph](/docs/unify/linked-profiles/data-graph/)
- Workspace Owner or Unify Read-Admin, Entities Admin, and Source Admin permissions.

## Supported Sources

The following sources are supported with Linked Audiences:

[Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/)

To set up your linked audience, complete the following steps:

- Step 1: Build a linked audience
- Step 2: Enable your linked audience
- Step 3: Activate your linked audience
- Step 4: Confirm the payload in your destination

## Step 1: Build a Linked Audience

Linked Audiences allows you to filter based on properties such as profile traits, relational data mapped to the Data Graph, events, and existing audience memberships.

![Choose your audience conditions](/docs/engage/images/conditions.png)

To build a linked audience:

1. Navigate to **Engage > Audiences**.
1. Select **+ New audience > Audience**.
1. On the **Select Audience Type** screen, select **Linked audience**, then click **Next**.
**Note:** if you cannot select **Linked audience**, ensure you’ve [set up your data graph](/docs/unify/linked-profiles/data-graph/) in Unify.
1. Select the [linked audience profiles conditions](#conditions) on which to build your audience.
1. Click **Preview** to view your audience selection and see a count of audience members who meet the criteria.
1. When you’re happy with the audience you’ve built, click Next.
1. Enter an audience name and description.
Optionally, select a folder to add this Audience to.
1. Click **Create Audience**.

You’re taken back to the overview page for the linked audience you just built. Next, you must enable your linked audience.

## Step 2: Enable your linked audience

After building your linked audience, you'll be redirected to the Audience Overview page. By default, the audience is disabled. To enable your audience:

Enable the audience by selecting the **Enabled** toggle, then select **Enable audience**.

You can trigger a compute for your audience now by selecting **Compute Now**. This triggers a compute for the audience (where the audience conditions run on your data warehouse) and sends events downstream.

Next, you must activate your linked audience.

## Step 3: Activate your linked audience

After you enable your linked audience, you can send events to your chosen destinations so that you can then use it for personalizing your customer communications.

To activate your linked audience, complete the following steps: 

- Step 3a: Select a destination
- Step 3b: Select your destination actions
- Step 3c: Define the events that trigger actions in your destination
- Step 3d: Configure the event

### Step 3a: Select a destination

Before you add a destination for any linked audience, you must have [configured it as a destination](connections/destinations/catalog/).

1. From the audience overview page, select **Add destination**.
1. Select the event destination from the list of pre-configured choices.
1. Click **Configure data to send to destination**.

### Step 3b: Select your destination actions

Only some actions destinations are supported for Linked Audiences for now.

For more information on each supported destination action, see [Supported action destinations for linked audiences](/docs/engage/audiences/linked_audiences/linked_supported_destinations/).

Select the destination action to call when the event happens, then click **Next**. Ensure the action you selected is relevant to the type of event you previously selected. For example, if you selected **Audience membership changed**, ensure your action is also an Identify event.

Segment displays available actions based on the destination action you've connected with your Linked Audience.

### Step 3c: Define the events that trigger actions in your destination
Configure what kind of events are produced for each audience run. These events will trigger actions 

After filling out all of the options on the page, select **Save** or **Save and Enable**.

### Step 3d: Configure the event

After you select an action, Segment attempts to automatically configure the data fields that will be sent to the destination. You can review and adjust these settings before enabling this event.
As you're configuring your event, click **<< Show Preview** to view a preview of the enriched event based on your profile and entity property selections.

#### Enrich event

Select additional traits and properties to include when the event is sent. These traits and properties can be associated with the profile or the entity  conditions that were defined in the audience definition.

For example, if your profiles include traits that are required in your downstream destination, this is where you would make the appropriate selections.

#### Map event

Only required fields that need to be filled out are displayed. All other optional & pre-filled fields are hidden - These fields are pre-filled with properties that will work by default.

Optional & Pre-filled fields are optional or are pre-filled with properties that will work by default.

#### Send test event to destination (optional)

You can optionally send a test event to your destination by clicking **Send test event to destination** to see what the event will look like in the destination. You can edit the User ID for the test event, and you'll also see a table with event fields and example values. After sending the test, you'll receive a response from Segment and the destination, which allows you to see what data sent to your destination may look like.

#### Send events for current profiles and entities in the audience checkbox

By default, Segment only sends events for new profiles and entities that match the audience conditions. This means that when the event is created, it will not send events for profiles and entities that currently meet the audience criteria.
If you want to send events for profiles and entities that currently meet the audience criteria, check this box. This is only available for the **entity added**, **audience entered**, and **audience membership changed** event types.

## Step 4: Confirm the payload in your destination

Linked Audiences sends events to your destination after Segment computes the audience.

To confirm your destination is receiving events, Segment recommends that you log in to your destination and perform one of the following:
- Monitor the event activity
- Search for the `UserID` or `Event Name` (for example, `Entity Added`)