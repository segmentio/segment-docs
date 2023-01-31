---
title: SalesWings (Actions) Destinaton
hide-boilerplate: true
hide-dossier: true
private: true
id: 63d17a1e6ab3e62212278cd0
---

{% include content/plan-grid.md name="actions" %}

[SalesWings](https://www.saleswingsapp.com/){:target="_blank"} is a lead scoring platform that offers a user-friendly, no-code solution to identify your leads' true interests. The SalesWings Destination enables using the data collected in Segment to identify, tag and prioritize your leads in SalesWings for your Marketing and Sales teams.

## Getting started

1. From the Segment web app, navigate to **Connections > Catalog** and select the **Destinations** tab of the catalog. 
2. Search for **SalesWings (Actions)** and select the destination. 
3. Click **Configure SalesWings (Actions)**.
4. Select an existing Source to connect to SalesWings (Actions).

{% include components/actions-fields.html %}

## How Segment users are mapped to SalesWings lead-profiles

The SalesWings Destination provides four actions for sending the following Segment event types to SalesWings: Track, Identify, Page and Screen. Each event will be associated with a SalesWings lead-profile based on `userId` and `anonymousId`, as well as the `email` trait.

When you send events to SalesWings, SalesWings creates a lead-profile based on the `userId`, `anonymousId`, and `email` of the tracked user or interaction.

SalesWings displays leads that are identified with an email, but all events sent to SalesWings are registered. When Segment sends Track, Screen, or Page events, it identifies users with an `anonymousId` or `userId`. SalesWings stores these events, but does not show them with a lead-profile until it receives an Identify event with the `email` trait which associates the users email address with the `anonymousId` or `userId` that was previously captured.


## How Segment events are mapped to SalesWings lead activities

Segment Page events are registered as Page-Visit activities in a SalesWings lead. To make use of these activities for tags and scores in the Falcon engine, use the "Page Visit" condition.

Segment Track, Identify, and Screen events are registered as Custom-Event activities of a SalesWings lead. To make use of these activities for tags and scores in the Falcon engine, use the "Custom Event" condition. 

When you add a Track, Identify, or Screen action, you control how a corresponding Custom-Event activity looks in SalesWings. When you see a Custom-Event activity in the SalesWings cockpit or the SalesWings Lead Intent View in Salesforce, the activity is visualized as `[Kind] Data`. When adding an action for Track, Identify or Screen, you can configure how `Kind` and `Data` fields are formed in SalesWings. The action configuration has the following defaults:


| Segment Event | `Kind` value | `Data` value                                                | Custom Event Activity         |
| ------------- | ------------ | ----------------------------------------------------------- | ----------------------------- |
| Track         | Track        | The name of the Track event, for example, `User Registered` | `[Track] User Registered`     |
| Identify      | Identify     | The email address as identified by Segment                  | `[Identify] peter@example.com |
| Screen        | Screen       | The name of the screen                                      | `[Screen] Home View`          |

You can override these defaults in the action configuration and map `Kind` and `Data` to static values, or map them to other properties that are part of the Segment event.


If you have the Custom Attributes feature enabled in SalesWings, you can configure SalesWings Custom Attributes based on Segment events properties (for Track and Screen events) and traits (for Identify events). When you add a Custom Attribute with an id that matches a property or a trait name in Segment, you will see the Custom Attribute values on the lead profiles created for Segment users.

## Configuring multiple actions for the same event type

You can add any number of SalesWings Destination actions for the same Segment event type, for example, Track. But by default, every SalesWings action is added with a trigger that only filters by event type (for example, "Event Type is Track"). If you choose to add multiple actions for the same event type, make sure to configure mutually exclusive triggers (for example, "Event Type is Track and Event Name is Order Completed" and "Event Type is Track and Event Name is Cart Abandoned"). If the triggers are not mutually excelusive, this would result in registering multiple SalesWings lead activities for the same Segment event.
