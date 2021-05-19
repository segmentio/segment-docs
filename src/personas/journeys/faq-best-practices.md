---
title: Journeys Best Practices and FAQ
---
## Best practices

### Enforce exclusivity in multi-branch splits

When you create a multi-branch split, do not create overlapping conditions that might lead a user to qualify for more than one step at a time.

For example:
  - If a multi-branch split has the following conditions, a user who has performed both `webinar attended` and `registration form submitted` will end up in both branches.
  - To set a priority, branch 2 should then be `who performed registration form submitted and did not perform webinar attended` to ensure mutual exclusivity

### Add time windows whenever possible
Where possible, add a time window when defining conditions to ensure that users eventually exit the step or Journey, rather than remain at the step forever. This prevents Journeys from collecting stale users which can muddle your data for analytics, or cause you to over-target.

### Review your Journey in drafts first
Save your Journey in a draft state so that you can review before you publish it. Once a Journey is published, limited edits can be made and data is being sent to destinations.

### Make a copy to edit published Journeys
Once a Journey is published, you cannot add, delete, or edit the steps within the Journey. You can only edit the Journey name, description, and destinations.

To edit the steps within a published Journey, make a copy of the Journey you wish to edit, make adjustments, delete the original Journey, and then publish the revised Journey.

When you do this, the key used for syncing to destinations will be different from the copied Journey. Make sure you change the reference key used in the downstream destinations accordingly.

## Frequently asked questions

### How often do Journeys run?
Journeys run in real-time, similar to real-time Audiences in Personas. This means that users will progress through Journeys as Segment receives new events.

### What destinations are supported by Journeys?
Journeys supports all Personas destinations, including Destination Functions. Read more in Send data to destinations.

### What are the reporting capabilities of Journeys?
When building a Journey, you will be able to see the estimated number of users in the initial cohort, if “Use historical data” is checked.

Once published, you will see how many users are in each step of the Journey at any given time.

### How are users sent to downstream destinations?
The type of data you send to a destination depends on whether the destination is configured as an Event Destination or a List Destination. 
