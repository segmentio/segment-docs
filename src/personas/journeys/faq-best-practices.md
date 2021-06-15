---
title: Journeys Best Practices and FAQ
---
{% include content/plan-grid.md name="journeys" %}


## Best practices

### Enforce exclusivity in multi-branch splits

When you create a multi-branch split, do not create overlapping conditions that might lead a user to qualify for more than one step at a time.

For example:
  - If a multi-branch split has the following conditions, a user who has performed both `webinar attended` and `registration form submitted` will end up in both branches.
  - To set a priority, branch 2 should then be `who performed registration form submitted and did not perform webinar attended` to ensure mutual exclusivity

### Add time windows whenever possible

Where possible, add a time window when defining conditions to ensure that users exit the step or Journey, rather than remain at the step forever. This prevents Journeys from collecting stale users which can muddle your data for analytics, or cause you to over-target.

### Review your Journey in drafts first

Save your Journey in a draft state so that you can review before you publish it. Once you publish a Journey, you cannot edit select portions of a Journey and Journeys sends data to destinations.

### Make a copy to edit published Journeys

Once you publish a Journey, you cannot add, delete, or edit the steps within the Journey. You can edit the Journey name, description, and destinations.

To edit the steps within a published Journey, make a copy of the Journey you wish to edit, make adjustments, delete the original Journey, and then publish the revised Journey.

When you do this, the key used for syncing to destinations will be different from the copied Journey. Make sure you change the reference key used in the downstream destinations accordingly.

## Frequently asked questions

### How often do Journeys run?

Journeys run in real-time, like real-time Audiences in Personas. This means that users will progress through Journeys as Segment receives new events.

### What destinations does Journeys support?

Journeys supports all Personas destinations, including Destination Functions. Read more in Send data to destinations.

### What are the reporting capabilities of Journeys?

When building a Journey, if you check **Use historical data**, you can see the estimated number of users in the initial cohort.

Once published, Journeys displays the number of users are in each step of the Journey at any given time.

### How are users sent to downstream destinations?

The data type you send to a destination depends on whether the destination is an Event Destination or a List Destination. 

### Which roles can access Journeys?
For Personas Advanced customers, users with either the Personas User or Personas Admin roles can create, edit, and delete journeys. Users with the Personas Read-only role are restricted to view-only access.
