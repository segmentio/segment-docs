---
title: Journeys Overview
---

Journeys, a feature of Segment Personas, provide a way for marketers to personalize experiences through planning how and when to engage customers with the right campaigns and messages.

Journeys enable you to define steps in a user's journey based on event behavior and traits. You can build Journeys from your tracking events, traits, computed traits, or audiences. At each step of a journey, you can send your list of users to any personas-compatible destination.

## Key terms

Keep the following terms in mind as you begin to explore Journeys.

### General

| Term              | Definition                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Journey           | A multi-step workflow that progresses users through steps based on time logic, real-time customer interactions, and customer traits. |
| Journey list view | The Journeys tab shows all Journeys in the selected Personas space.                                                                  |
| Journey builder   | A visual canvas where you can view and edit step definitions and types.                                                              |
| Journey overview  | A visual canvas where you can view all steps and definitions.                                     |

### Steps

| Term                 | Definition                                                                                                                                                                                                                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Step                 | An individual point in the Journey that can be any of the following: **Wait for condition**, **Wait for duration**, **True/false split**, **Multi-branch split**, **Send to destinations**.                                                                                                                            |
| Branch               | Paths that lead users away from a step. For example, A True/false split creates one True branch and one False branch.                                                                                                                                                                                                  |
| Entry condition      | The first step in the Journey where you define the entry criteria. In this step, you can backfill historical data and preview users before you publish the Journey.                                                                                                                                      |
| Wait for condition   | A step in which you define one or more conditions which a user must fulfill to move to this step.                                                                                                                                                                                                                      |
| Wait for duration    | A step in which you define the amount of time before the user moves to the next step.                                                                                                                                                                                                                                  |
| True/false split     | A step in which you define a condition to direct a user to A step in which you define a condition to direct user to one of two steps. <br /> <br />Users who fulfill the condition move to the `true` branch. Users who do not move to the `false` branch.                                                             |
| Multi-branch split   | A step in which you define any number of conditions. Each condition represents a separate branch leading away from the step. Users travel down the branch of the condition they meet. <br /> <br /> Journeys does not enforce mutual exclusivity in branch conditions . For more information, see [Best Practices](#). |
| Send to destinations | A step in which you can send track or identify calls to Event destinations, or a list of users to a List destination.                                                                                                                                                                                                  |
| Step name            | The name of the step that displays in the Journey builder and overview.                                                                                                                                                                                                                                             |
| Key                  | Name of the Send to Destination step used to identify the step users are on when Journeys sends information to the destination. For Track events, the property name uses this key. For Identify events, the trait name uses this key. <br /><br />For more information, see [Send data to Destinations](#).                   |

### Statuses

| Term                     | Definition                                                                                                                        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Draft Journey            | A Journey which is not yet computing nor sending data to destinations. <br /><br />For more information, see [Draft Journeys](#draft-journeys). |
| Published (live) Journey | A Journey that is computing and sending data to destinations. <br /><br />For more information, see [Published Journeys](#published-journeys).                  |


### Journeys Product Limits

For information about Product Limits related to journeys, see [Product Limits - Journeys](/docs/personas/product-limits#journeys).






