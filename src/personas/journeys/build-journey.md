---
title: Build a Journey
---
{% include content/plan-grid.md name="journeys" %}

## Before you begin

Verify that you've connected at least one source to your Personas space, with events streaming in.

For more information, see [Setting up your Sources](/docs/personas/quickstart/#step-3-connect-production-sources).

## Adding the entry condition

1. From your Personas space, click the **Journeys** tab.
2. Click **+ New Journey** to access the Journey builder.
3. Click **+ Add Entry Condition**. Define entry criteria with an entry condition, the first step in the Journey. Before publishing, you can also enable historical data and preview users who meet the entry criteria.
   1. Add a name to describe the step, for example `New users`.
   2. Add inclusion conditions, or import conditions from an existing audience to define users who will enter the Journey.
   3. Check **Use historical data** to allow users who have already matched the entry criteria to enter the Journey. Otherwise, only users who meet the entry conditions after publication will enter the Journey.
   4. Click **Preview** to see the list of users who meet your criteria. Verify that you've defined the right conditions.
   5. Click **Save**.
4. Segment displays the entry condition on the Journey Builder canvas. It may take up to two minutes for Segment to estimate the number of users in the journey.
5. Click **+** to add the next step and view available step types.

> info ""
> Users can only enter a Journey once.

### Using historical data for the entry step

If you select the **Use historical data** option, Segment queries all historical data to generate a list of users who enter the Journey upon publication. If you don't select **Use historical data**, only users who satisfy the entry condition *after* you publish enter the Journey.

> info ""
> Your **Use historical data** selection won't impact subsequent Journey steps.  Only future events and existing trait memberships trigger post-entry Journey steps.

## Available step types

Journeys provides five step types, which you can add after the entry condition.

![Step types](images/journey_step-types.png)

**Wait for condition** defines the conditions that a user must satisfy to move from one step to the next. You can define new conditions or import conditions from an existing audience.

![wait for condition](images/journey_wait-for-condition.png)

**Wait for duration** defines the length of time in minutes, hours, days, or weeks that a user must wait before moving to the next step.

**True/false split** divides the previous step's user group into two branches, based on Boolean logic against a defined condition. Users who satisfy the condition(s) move to the **True** branch. Otherwise, they move to the **False** branch. To enforce mutual exclusivity, Journeys evaluates true/false conditions when a user reaches the relevant step.  

You can add Step Names to describe the users in the True and False branch.

![true/false split](images/journey_t-f-split.png)

**Multi-branch split** divides the group of users from the previous step into two or more branches based on each branch's defined conditions. 

Define the number of branches you want to create, then add a **Wait for condition** step to define each branch's condition.

> info ""
> Journeys doesn't enforce mutual exclusivity in branch conditions. For more information about ensuring branch exclusivity, see [Best Practices](#).

**Send to Destinations** delivers information about the Journey to the selected Destination. For more information, see [Send data to Destinations](/docs/personas/journeys/send-data)

## Cloning a Journey

To clone a Journey: 
1. In Journey List view, click the **…** icon at the end of a row.  
2. Select **Clone Journey**. 

Segment then creates a draft of your Journey. 

You can also clone a Journey from a Journey’s Overview by clicking the **…** icon. 

## Publishing a Journey

To publish and activate a Journey, click **Publish Journey** from the Journey Overview. You can also click **Publish Journey** in the bottom-right corner of the Journey Builder.

> info ""
> After publication, Segment limits which Journeys features you can edit. For more information, see the difference between Draft and Published Journeys below.

## Pausing and Resuming a Journey

Pausing a published Journey prevents new users from joining your Journey. Users already in the Journey, however, will continue their progress.

Follow these steps to pause a Journey:

1. Select the **Journeys** tab within your Personas space.
2. Select the **More Options** icon next to the Journey you want to pause.
3. From the dropdown menu, select **Pause Entry**.
4. A modal window appears. Select **Pause Entry** again to confirm.

> info "Compute Limits"
> Because pausing only affects new Journey members, paused Journeys still count towards compute credit limits.

### Resuming a Journey

You can resume new user entries to a paused Journey at any time. 

After you resume Journey entry, users who meet the Journey's entry conditions will join the Journey. New users will not enter the Journey, however, if they met its conditions while it was paused. 

Follow these steps to resume entry to a paused Journey:

1. Select the **Journeys** tab within your Personas space.
2. Select the **More Options** icon next to the Journey you want to resume.
3. From the dropdown menu, select **Resume Entry**.
4. A modal window appears. Select **Resume Entry** again to confirm.

### Drafting a Journey

When you’ve finished creating your Journey, click **Save as Draft** in the bottom-right corner.

#### When Journeys are in a draft state
- Journeys estimates user counts only for the entry step.
- Journeys doesn't send data to connected Destinations.

### About Published Journeys

Keep the following considerations in mind when working with a published Journey:

- It may take up to three hours for Journeys to compute user counts after publication.
- You can edit a Journey's name, description, and Destination steps.
- You can't add, edit, or delete other steps in the Journey.
- Once Journeys computes and displays user counts, you’ll see the list of users at each step of the Journey.
- Click a user profile to see the Journey list to which they belong.
- Journeys sends and updates data to Destinations in real-time.
