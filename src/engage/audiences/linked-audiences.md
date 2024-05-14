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

With Linked Audiences, you can build an audience that uses the relational data you've defined in your [Data Graph](/docs/unify/linked-profiles/data-graph/), activate profile audiences, or send relational data to your source.

To learn more about specific use cases you can set up with Linked Audiences, see the [Linked Audiences Use Cases](/docs/engage/audiences/linked_audiences/linked-audiences-use-cases/) topic.

## Setting up Linked Audiences

### Prerequisites

Before you begin setting up your linked audience, ensure you have:

[Set up profiles sync](/unify/profiles-sync/profiles-sync-setup/)
[Familiarized yourself with what an Audience is](/docs/engage/audiences)
Familiarize yourself with the terms and options for Linked Audiences
Set up your warehouse permissions using [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/)
[Set up your data graph](/docs/unify/linked-profiles/data-graph/)
Workspace Owner or Unify Read-Admin, Entities Admin, and Source Admin permissions.

To set up your linked audience, complete the following steps:

- [Build a linked audience](#step-1-build-a-linked-audience)
- [Activate your Linked Audiences](#step-3-activate-your-linked-audience)
- [Enable your linked audience](#step-2-enable-your-linked-audience)
- [Confirm the payload in your destination](#step-4-confirm-the-payload-in-your-destination)

## Step 1: Build a Linked Audience

Linked Audiences allows you to filter based on properties such as profile [traits](/docs/unify/#enrich-profiles-with-traits), relational data mapped to the [Data Graph](/docs/unify/linked-profiles/data-graph/), events, and existing audience memberships.

![Choose your audience conditions](/docs/engage/images/conditions.png)

To build a Linked Audience:

1. Navigate to **Engage > Audiences**.
2. Select **+ New audience > Audience**.
3. On the **Select Audience Type** screen, select **Linked audience**, then click **Next**.
**Note:** if you cannot select **Linked audience**, ensure you’ve [set up your Data Graph](/docs/unify/linked-profiles/data-graph/) in Unify.
4. Select the event conditions on which to build your audience.
5. Click **Preview** to view your audience selection and see a count of audience members who meet the criteria.
6. When your audience is complete and accurate, click Next.
7. Enter an audience name and description to identify this configuration.
Optionally, select a folder to add this Audience.
8. Click **Create Audience**.

## Step 2: Activate your Linked Audience

After you build your Linked Audience, you will be able to send events to your chosen destinations so that you can then use it for personalizing your customer communications. This requires you set up a few steps that will result in activating your Linked Audience. These steps include:

- [Connect to a Destination](#step-2a-select-a-destination)
- [Select your Destination Actions](#step-2b-select-your-destination-actions)
- [Define how and when to trigger an event to your Destination](#step-2c-define-the-events-that-trigger-actions-in-your-destination)
- [Configure the event payload](#step-2d-configure-the-event)

### Step 2a: Connect to a Destination

Destinations are the business tools or apps that Segment forwards your data to. Adding a Destination allows you to act on your data and learn more about your customers in real time. To fully take advantage of Linked Audiences, you must connect and configure your Destination.

Before you can connect your Linked Audience to any Destination, ensure it has been [configured as a Destination](connections/destinations/catalog/).

1. From the audience overview page, select **Add destination**.
2. Select the event destination from the list of pre-connected choices.
3. Click **Configure data to send to destination**.

### Step 2b: Select your Destination Actions

For more information on each supported destination action, see [Supported action destinations for Linked Audience](docs/engage/audiences/linked_audiences/linked_supported_destinations/).

Segment displays available actions based on the destination you've connected with your Linked Audience.

Select the destination action to call when the event happens, then click **Next**.

### Step 2c: Define how and when to trigger an event to your Destination

Configure how and when events are produced with each audience run. You can choose the entities referenced in the audience builder to trigger an event off of. For more details on each option, see Linked Audiences Event Trigger Options.

### Step 2d: Configure the event

After you select an action, Segment attempts to automatically configure the data fields that will be sent to the destination. You can review and adjust these settings before enabling this event.

## Step 3: Enable your Linked Audience

After building your Linked Audience, you'll be redirected to the Audience Overview page. By default, the audience is disabled. To enable your audience:

Select the **Enabled** toggle, then select **Enable audience**.

You can trigger a compute for your audience if you want to send events to your destination without waiting for the next scheduled compute run. To do so, select **Compute Now**. This triggers a compute for the audience (where the audience conditions run on your data warehouse) and sends events downstream.

## Step 4: Confirm the payload in your destination

Linked Audiences sends events to your destination after Segment computes the audience.

To confirm your destination is receiving events, Segment recommends that you log in to your destination and perform one of the following:
- Monitor the event activity
- Search for the `UserID` or `Event Name` (for example, `Entity Added`)