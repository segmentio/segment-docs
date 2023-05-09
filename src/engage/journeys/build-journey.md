---
title: Build a Journey
plan: engage-foundations
redirect_from:
  - "/personas/journeys/build-journey"
---

## Before you begin

Verify that you've connected at least one source to your Engage space, with events streaming in.

For more information, see [Setting up your Sources](/docs/engage/quickstart/#step-3-connect-production-sources).

## Adding the entry condition

1. From your Engage space, click the **Journeys** tab.
2. Click **+ New Journey** to access the Journey builder.
3. Click **+ Add Entry Condition**. Define entry criteria with an entry condition, the first step in the Journey. Before publishing, you can also enable historical data and preview users who meet the entry criteria.
   1. Add a name to describe the step, for example `New users`.
   2. Add inclusion conditions, or import conditions from an existing audience to define users who will enter the Journey.
   3. Check **Use historical data** to allow users who have already matched the entry criteria to enter the Journey. Otherwise, only users who meet the entry conditions after publication will enter the Journey.
   4. Click **Preview** to see the list of users who meet your criteria. Verify that you've defined the right conditions.
   5. Click **Save**.
4. Segment displays the entry condition on the Journey Builder canvas. It may take up to two minutes for Segment to estimate the number of users in the journey.
5. Click **+** to add the next step and view available step types.

### Using historical data for the entry step

If you select the **Use historical data** option, Segment queries all historical data to generate a list of users who enter the Journey upon publication. If you don't select **Use historical data**, only users who satisfy the entry condition *after* you publish enter the Journey.

> info ""
> Your **Use historical data** selection won't impact subsequent Journey steps.  Only future events and existing trait memberships trigger post-entry Journey steps.

## Available step types

Once you've created an entry condition, you can begin adding steps to your Journey.

Journeys offers the following steps:

- **Add a condition**, which defines conditions a user must satisfy to move from one step to the next
- **Add a delay**, which defines the length of time in minutes, hours, days, or weeks that a user must wait before moving to the next step
- **True/false splits**, which divide the previous step's users into two branches
- **Multi-branch splits**, which divide the previous step's users into two or more branches
- **Randomized splits**, which divide users into random groups so that you can test the performance of a Journey branch
- **Connect to existing steps**, which joins two separate branches.
- **Send an email**, which sends a [Channels email](/docs/engage/campaigns/email-campaigns/) to a group of users
- **Send an SMS**, which sends a [Channels SMS](/docs/engage/campaigns/sms-campaigns/) to a group of users
- **Send a WhatsApp** (Beta), which sends a [Channels WhatsApp](/docs/engage/campaigns/whatsapp-campaigns/) to a group of users
- **Send to Destinations**, which delivers information about the Journey to the selected Destination

For more details on each available Journey step, view the [Journey step types documentation](/docs/engage/journeys/step-types).

## Publishing a Journey

Once you've added steps, you're ready to publish the Journey.

To publish and activate a Journey, click **Publish Journey** from the Journey Overview. You can also click **Publish Journey** in the bottom-right corner of the Journey Builder.

> info ""
> Some Journey features can only be edited before publication. For more information, see the difference between Draft and Published Journeys below.

Your Journey is now live. Next, you'll learn about making changes to a published Journey.

## Working with a published Journey

You may find that you need to make changes to a published Journey, like adding new steps or pausing entry to the Journey. This section explains how to pause, resume, and clone a Journey so that you can modify it as needed.

### Pausing and resuming a Journey

Pausing a published Journey prevents new users from joining your Journey. Users already in the Journey, however, will continue their progress.

Follow these steps to pause a Journey:

1. Select the **Journeys** tab within your Engage space.
2. Select the **More Options** icon next to the Journey you want to pause.
3. From the dropdown menu, select **Pause Entry**.
4. A modal window appears. Select **Pause Entry** again to confirm.

> info "Compute Limits"
> Because pausing only affects new Journey members, paused Journeys still count towards compute credit limits.

### Resuming a Journey

You can resume new user entries to a paused Journey at any time. 

After you resume a Journey, users who meet the Journey's entry conditions will join the Journey. New users will not enter the Journey, however, if they met its entry conditions while it was paused. 

Follow these steps to resume entry to a paused Journey:

1. Select the **Journeys** tab within your Engage space.
2. Select the **More Options** icon next to the Journey you want to resume.
3. From the dropdown menu, select **Resume Entry**.
4. A modal window appears. Select **Resume Entry** again to confirm. After the confirmation, editing is locked until the Journey Resume process completes.

### Cloning a Journey

You can duplicate a Journey by cloning it.

Follow these steps to clone a Journey:

1. In the Journey List view, click the **…** icon at the end of a row.
2. Select **Clone Journey**.

Segment then creates a draft of your Journey.

You can also clone a Journey from a Journey's Overview by clicking the **…** icon.

### Archive a Journey

Use the Journey archive setting when you want to end a Journey but preserve its data.

No new users enter archived Journeys, and progress stops for any users already in the Journey. Archived Journeys no longer [send data to Destinations](/docs/engage/journeys/send-data/).

> success "Compute credits"
> Steps in archived Journeys don't count towards your compute credits.

## Journey exits and re-entry

### Journey exits

You can apply exit settings to both single entry and re-entry Journeys. Users who exit a Journey leave all Journey steps and Destinations. 

Configure exit settings during initial Journey setup by enabling exit settings and entering the number of days that should pass before users exit the Journey. Journeys exits users once this time passes.

If you don't apply exit settings to a Journey, users will remain in the Journey indefinitely.

### Journey re-entry

The Journeys re-entry setting allows users to repeat Journeys they've already exited. Common use cases for Journeys re-entry include the following:

- Retargeting users who abandon multiple carts
- Recurring rewards and promotion offers
- Notifying users when to renew a subscription

### Exit and re-entry times

To let users re-enter a Journey they've exited, you'll need to enable two Journeys settings:

- Journeys exit time
- Journeys re-entry time

Journeys exits users based off of the exit time you configure. Users can re-enter the Journey once they meet the Journey's entry condition again and your defined re-entry time has passed. You can configure re-entry time by hour, day, or week. Re-entry time begins once a user exits the Journey.

Suppose, for example, you enable re-entry for an abandoned cart campaign. You set exit to seven days and re-entry to 30 days. A user who abandons their cart will progress through the Journey and exit no later than seven days after entering. Once 30 days after exit have passed, the user can re-enter the Journey.

> info "Ad-based exit settings"
> Exit settings you configure for the [Show an ad step](/docs/engage/journeys/step-types/#show-an-ad) don't impact other Journey steps. Users can exit an ad step but remain in the Journey.

### Setting up re-entry

To enable Journey re-entry for a new Journey, follow these steps:

1. Select the **Journeys** tab within your Engage space, then click **New Journey**.
2. Under **Entry settings**, select **Re-Entry** and enter a re-entry time.
3. Under **Exit settings**, enter an exit time.
4. Click **Build Journey** to complete Journey setup.

### Drafting a Journey

When you've finished creating your Journey, click **Save as Draft** in the bottom-right corner.

#### When Journeys are in a draft state
- Journeys estimates user counts only for the entry step.
- Journeys doesn't send data to connected Destinations.

### About published Journeys

Keep the following in mind when working with a published Journey:

- It may take up to three hours for Journeys to compute user counts after publication.
- You can edit a Journey's name, description, and Destination steps.
- You can't add, edit, or delete other steps in the Journey.
- Once Journeys computes and displays user counts, you'll see the list of users at each step of the Journey.
- Click a user profile to see the Journey list to which they belong.
- Journeys sends and updates data to Destinations in real-time.
