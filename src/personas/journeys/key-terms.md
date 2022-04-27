---
title: Journeys Key Terms
---

{% include content/plan-grid.md name="journeys" %}


Keep the following terms in mind as you begin to explore Journeys.

## General

| Term              | Definition                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Journey           | A multi-step workflow that progresses users through steps based on time logic, real-time customer interactions, and customer traits. |
| Journey list view | The Journeys tab shows all Journeys in the selected Personas space.                                                                  |
| Journey builder   | A visual canvas where you can view and edit step definitions and types.                                                              |
| Journey overview  | A visual canvas where you can view all steps and definitions.                                     |

## Steps

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

## Statuses

| Term                     | Definition                                                                                                                        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Draft Journey            | A Journey which is not yet computing nor sending data to destinations. <br /><br />For more information, see [Draft Journeys](#draft-journeys). |
| Published (live) Journey | A Journey that is computing and sending data to destinations. <br /><br />For more information, see [Published Journeys](#published-journeys).                  |

## Steps with Audiences

| Step             | Audience definition                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Entry condition  | All users who fulfill the entry condition criteria. "Use Historical Data" evaluates events before Journey publication.        |
| Condition        | All users who fulfill condition criteria, at one point fulfilled preceding step criteria, and have met any step wait conditions. |
| Destination Sync | All users who, at one point, fulfilled parent step criteria and have met any following wait conditions.                        |

## Steps without Audiences

| Step                | Details                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Delay               | No audience. Segment appends the wait duration as a condition to the following step's audience.                    |
| T/F split           | The split's resulting conditions contain two mutually exclusive audiences.  The split node itself has no audience. |
| Multi-branch splits | The split's resulting conditions contain audiences.  The split node itself has no audience.                        |
